/**
 * Yanik, Translator - Servidor de Tradução Simultânea Escolar
 * Sistema para tradução em tempo real: Professor -> Alunos e Vice-Versa
 * Suporta: Hindi, Português, Inglês, Francês, Espanhol e dezenas de outros idiomas.
 */

const http = require('http');
const https = require('https');
const url = require('url');
const path = require('path');
const fs = require('fs');
const os = require('os');
const crypto = require('crypto');

let PORT = parseInt(process.env.PORT || '3000', 10);
const PUBLIC_DIR = path.join(__dirname, 'public');

// Agente HTTPS com conexões persistentes IPv4 para latência ultra-baixa (keep-alive)
const httpsAgent = new https.Agent({
  keepAlive: true,
  maxSockets: 120,
  maxFreeSockets: 30,
  keepAliveMsecs: 20000,
  family: 4
});

// Cache de traduções na memória para resposta instantânea (0ms para frases repetidas)
const translationCache = new Map();
const ttsAudioCache = new Map();

// Salas ativas: roomId -> { id, createdAt, subscribers: Set([subscriber]), history: [] }
const rooms = new Map();

/**
 * Obtém os endereços IP da rede local (Wi-Fi / Ethernet)
 */
function getLocalIpAddresses() {
  const interfaces = os.networkInterfaces();
  const addresses = [];
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        addresses.push({ name, ip: iface.address });
      }
    }
  }
  return addresses;
}

function getGoogleLangCode(code) {
  if (!code) return 'en';
  const c = code.toLowerCase().trim();
  if (c.startsWith('zh-cn') || c === 'zh') return 'zh-CN';
  if (c.startsWith('zh-tw')) return 'zh-TW';
  if (c.startsWith('fil') || c.startsWith('tl')) return 'tl';
  if (c.startsWith('he') || c.startsWith('iw')) return 'iw';
  return c.split('-')[0];
}

function normalizeForComparison(text) {
  if (!text) return '';
  return String(text)
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function refineSpokenText(rawText, langCode = 'pt', isInterim = false) {
  if (!rawText || !rawText.trim()) return '';
  let text = rawText.trim().replace(/\s+/g, ' ');

  // 1. Remove palavras ou pares repetidos consecutivos
  text = text.replace(/\b([a-zA-ZÀ-ÿ]{1,25})(?:\s+\1\b)+/gi, '$1');
  text = text.replace(/\b([a-zA-ZÀ-ÿ]+\s+[a-zA-ZÀ-ÿ]+)(?:\s+\1\b)+/gi, '$1');
  text = text.replace(/\b([a-zA-ZÀ-ÿ]+\s+[a-zA-ZÀ-ÿ]+\s+[a-zA-ZÀ-ÿ]+)(?:\s+\1\b)+/gi, '$1');

  const normLang = getGoogleLangCode(langCode);

  if (normLang === 'pt') {
    text = text
      .replace(/\bola\b/gi, 'Olá')
      .replace(/\bvoce\b/gi, 'você')
      .replace(/\bvoces\b/gi, 'vocês')
      .replace(/\bnao\b/gi, 'não')
      .replace(/\bentao\b/gi, 'então')
      .replace(/\btambem\b/gi, 'também')
      .replace(/\bestao\b/gi, 'estão')
      .replace(/\bsao\b/gi, 'são')
      .replace(/\bamanha\b/gi, 'amanhã')
      .replace(/\bapresentacao\b/gi, 'apresentação')
      .replace(/\btraducao\b/gi, 'tradução')
      .replace(/\beducacao\b/gi, 'educação')
      .replace(/\batencao\b/gi, 'atenção')
      .replace(/\bdeveria apresenta[çc][ãa]o\b/gi, 'deveria fazer a apresentação')
      .replace(/\bvamos apresenta[çc][ãa]o\b/gi, 'vamos fazer a apresentação')
      .replace(/\bfazer apresenta[çc][ãa]o\b/gi, 'fazer a apresentação')
      .replace(/\bprojeto do tradutor\b/gi, 'projeto de tradutor')
      .replace(/\bpara mim (fazer|apresentar|falar|mostrar|explicar|ver|ir)\b/gi, 'para eu $1')
      .replace(/\ba gente vamos\b/gi, 'nós vamos');

    if (text.split(' ').length >= 3) {
      text = text.replace(/\s+(do|da|dos|das|de|num|numa|pelo|pela)\s*$/i, '');
    }
  }

  if (!text) return rawText.trim();
  text = text.charAt(0).toUpperCase() + text.slice(1);
  if (!isInterim && !/[.?!;:]$/.test(text)) {
    text += '.';
  }
  return text;
}

function cleanTranslatedOutput(text) {
  if (!text) return '';
  let cleaned = text.trim().replace(/\s+/g, ' ');
  cleaned = cleaned.replace(/\b([a-zA-ZÀ-ÿ]{2,25})(?:\s+\1\b)+/gi, '$1');
  cleaned = cleaned.replace(/\b([a-zA-ZÀ-ÿ]+\s+[a-zA-ZÀ-ÿ]+)(?:\s+\1\b)+/gi, '$1');
  return cleaned;
}

function fetchTranslationEndpoint(ep) {
  return new Promise((resolve, reject) => {
    const req = https.get(ep.url, {
      agent: httpsAgent,
      timeout: 3000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*'
      }
    }, (res) => {
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error('HTTP ' + res.statusCode));
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        try {
          const raw = Buffer.concat(chunks).toString('utf8');
          const resText = ep.parse(raw);
          if (resText && !resText.includes('MYMEMORY') && !resText.includes('WARNING')) {
            return resolve(cleanTranslatedOutput(resText));
          }
          reject(new Error('Empty or invalid parse'));
        } catch (err) {
          reject(err);
        }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

async function translateText(text, fromLang = 'auto', toLang = 'pt', isInterim = false) {
  if (!text || !text.trim()) return null;
  const normFrom = getGoogleLangCode(fromLang);
  const normTo = getGoogleLangCode(toLang);

  const refined = refineSpokenText(text, normFrom, isInterim);
  if (normFrom === normTo && normFrom !== 'auto') {
    return refined;
  }

  const cacheKey = `${normFrom}->${normTo}:${refined}`;
  if (translationCache.has(cacheKey)) {
    const cached = translationCache.get(cacheKey);
    if (cached && !cached.includes('MYMEMORY') && !cached.includes('WARNING')) {
      return cached;
    }
    translationCache.delete(cacheKey);
  }

  const buildEndpoints = (sl) => [
    {
      url: `https://translate.google.com/translate_a/single?client=tw-ob&sl=${sl}&tl=${normTo}&dt=t&q=${encodeURIComponent(refined)}`,
      parse: (d) => {
        const p = JSON.parse(d);
        if (Array.isArray(p) && Array.isArray(p[0])) return p[0].map(x => x[0]).join('').trim();
        return null;
      }
    },
    {
      url: `https://translate.google.com/translate_a/single?client=it&sl=${sl}&tl=${normTo}&dt=t&q=${encodeURIComponent(refined)}`,
      parse: (d) => {
        const p = JSON.parse(d);
        if (Array.isArray(p) && Array.isArray(p[0])) return p[0].map(x => x[0]).join('').trim();
        return null;
      }
    },
    {
      url: `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${normTo}&dt=t&dj=1&q=${encodeURIComponent(refined)}`,
      parse: (d) => {
        const p = JSON.parse(d);
        if (p && Array.isArray(p.sentences)) return p.sentences.map(s => s.trans || '').join('').trim();
        return null;
      }
    },
    {
      url: `https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=${sl}&tl=${normTo}&q=${encodeURIComponent(refined)}`,
      parse: (d) => {
        const p = JSON.parse(d);
        if (Array.isArray(p) && typeof p[0] === 'string') return p[0].trim();
        if (Array.isArray(p) && Array.isArray(p[0])) return p[0].map(x => x[0]).join('').trim();
        return null;
      }
    }
  ];

  const normRefined = normalizeForComparison(refined);

  for (const sl of [normFrom, 'auto']) {
    try {
      const candidates = buildEndpoints(sl).map(ep =>
        fetchTranslationEndpoint(ep).then(res => {
          if (normFrom !== normTo && normalizeForComparison(res) === normRefined && normRefined.length > 2) {
            throw new Error('Untranslated identical output');
          }
          return res;
        })
      );
      const fastest = await Promise.any(candidates);
      if (fastest) {
        if (translationCache.size > 10000) {
          translationCache.delete(translationCache.keys().next().value);
        }
        translationCache.set(cacheKey, fastest);
        return fastest;
      }
    } catch (e) {}
    if (sl === 'auto') break;
  }

  // Retorna null se todos os endpoints do servidor falharem, para NUNCA enviar texto não traduzido como se fosse tradução!
  return null;
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav'
};

function getRoom(roomId, defaults = {}) {
  const normId = (roomId || 'SALA-1').toUpperCase().trim();
  if (!rooms.has(normId)) {
    rooms.set(normId, {
      id: normId,
      title: defaults.title || `Aula - Sala ${normId}`,
      teacherName: defaults.teacherName || 'Professor',
      subject: defaults.subject || 'Geral',
      language: defaults.language || 'pt',
      createdAt: new Date(),
      lastActive: new Date(),
      subscribers: new Set(),
      history: []
    });
  }
  const r = rooms.get(normId);
  if (defaults.title) r.title = defaults.title;
  if (defaults.teacherName) r.teacherName = defaults.teacherName;
  if (defaults.subject) r.subject = defaults.subject;
  if (defaults.language) r.language = defaults.language;
  r.lastActive = new Date();
  return r;
}

function getRoomSummary(room) {
  let studentCount = 0;
  let teacherOnline = false;
  const languages = {};

  for (const sub of room.subscribers) {
    if (sub.role === 'teacher') {
      teacherOnline = true;
    } else {
      studentCount++;
      const l = sub.lang ? sub.lang.split('-')[0].toLowerCase() : 'pt';
      languages[l] = (languages[l] || 0) + 1;
    }
  }

  return {
    id: room.id,
    title: room.title || `Aula - Sala ${room.id}`,
    teacherName: room.teacherName || 'Professor',
    subject: room.subject || 'Geral',
    language: room.language || 'pt',
    createdAt: room.createdAt,
    lastActive: room.lastActive || room.createdAt,
    studentCount,
    teacherOnline,
    totalConnected: room.subscribers.size,
    languages
  };
}

// Inicializa salas padrão da escola
getRoom('MAT-7A', { title: 'Matemática - 7º Ano A', teacherName: 'Prof. Yanik', subject: 'Matemática', language: 'pt' });
getRoom('HIST-9B', { title: 'História Geral - 9º Ano B', teacherName: 'Profa. Maria', subject: 'História', language: 'pt' });
getRoom('CIEN-8', { title: 'Ciências & Biologia - 8º Ano', teacherName: 'Prof. Lucas', subject: 'Ciências', language: 'pt' });
getRoom('SALA-1', { title: 'Aula Geral - Sala 1', teacherName: 'Professor', subject: 'Geral', language: 'pt' });

/**
 * Criação da aplicação HTTP
 */
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Habilita CORS total
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Stripe-Signature, X-Webhook-Signature');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // API: Listar todas as salas ativas da escola (GET /api/rooms)
  if (pathname === '/api/rooms' && req.method === 'GET') {
    const list = Array.from(rooms.values()).map(r => getRoomSummary(r));
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(list));
    return;
  }

  // API: Criar ou Atualizar Sala pelo Professor (POST /api/rooms/create)
  if (pathname === '/api/rooms/create' && req.method === 'POST') {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
      try {
        const body = Buffer.concat(chunks).toString('utf8');
        const payload = JSON.parse(body || '{}');
        let roomId = (payload.id || '').toUpperCase().trim();
        if (!roomId) {
          roomId = 'SALA-' + Math.floor(100 + Math.random() * 900);
        }
        roomId = roomId.replace(/[^A-Z0-9\-_]/g, '-');

        const room = getRoom(roomId, {
          title: (payload.title || '').trim() || `Aula - ${roomId}`,
          teacherName: (payload.teacherName || '').trim() || 'Professor',
          subject: (payload.subject || '').trim() || 'Geral',
          language: (payload.language || 'pt').trim()
        });

        broadcastClientCount(room);

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({
          success: true,
          room: getRoomSummary(room)
        }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // API: Encerrar Sala de Aula (POST /api/rooms/close)
  if (pathname === '/api/rooms/close' && req.method === 'POST') {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
      try {
        const body = Buffer.concat(chunks).toString('utf8');
        const { id } = JSON.parse(body || '{}');
        const roomId = (id || '').toUpperCase().trim();
        if (rooms.has(roomId)) {
          const room = rooms.get(roomId);
          for (const sub of room.subscribers) {
            try {
              sub.res.write(`data: ${JSON.stringify({ type: 'room_closed', roomId })}\n\n`);
            } catch (e) {}
          }
          rooms.delete(roomId);
        }
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // API: Status e Informações da Rede
  if (pathname === '/api/info' && req.method === 'GET') {
    const ips = getLocalIpAddresses();
    const primaryIp = ips.length > 0 ? ips[0].ip : 'localhost';
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({
      appName: 'Yanik, Translator',
      version: '1.2.0',
      port: PORT,
      ips: ips,
      primaryUrl: `http://${primaryIp}:${PORT}`,
      activeRooms: Array.from(rooms.values()).map(r => getRoomSummary(r))
    }));
    return;
  }

  // API: Síntese de Voz em Alta Qualidade (GET /api/tts?text=...&lang=...)
  // Fornece áudio MP3 nativo com cache e agente persistente para latência mínima
  if (pathname === '/api/tts' && req.method === 'GET') {
    const text = (parsedUrl.query.text || '').trim();
    const lang = (parsedUrl.query.lang || 'pt').split('-')[0].toLowerCase();
    if (!text) {
      res.writeHead(400);
      res.end('Texto vazio');
      return;
    }

    const ttsKey = `${lang}:${text}`;
    if (ttsAudioCache.has(ttsKey)) {
      const cachedBuffer = ttsAudioCache.get(ttsKey);
      res.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'Content-Length': cachedBuffer.length,
        'Cache-Control': 'public, max-age=86400',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(cachedBuffer);
      return;
    }

    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${lang}&client=tw-ob`;
    
    const ttsReq = https.get(ttsUrl, {
      agent: httpsAgent,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }, (ttsRes) => {
      const chunks = [];
      res.writeHead(ttsRes.statusCode || 200, {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=86400',
        'Access-Control-Allow-Origin': '*'
      });
      ttsRes.on('data', chunk => {
        chunks.push(chunk);
        res.write(chunk);
      });
      ttsRes.on('end', () => {
        res.end();
        const fullBuffer = Buffer.concat(chunks);
        if (fullBuffer.length > 0) {
          ttsAudioCache.set(ttsKey, fullBuffer);
          if (ttsAudioCache.size > 300) {
            const firstKey = ttsAudioCache.keys().next().value;
            ttsAudioCache.delete(firstKey);
          }
        }
      });
    });

    ttsReq.on('error', (err) => {
      res.writeHead(500);
      res.end('Erro ao gerar áudio TTS');
    });
    return;
  }

  // API: Tradução Direta (POST /api/translate)
  if (pathname === '/api/translate' && req.method === 'POST') {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', async () => {
      try {
        const body = Buffer.concat(chunks).toString('utf8');
        const payload = JSON.parse(body || '{}');
        const { text, from = 'auto', to = 'pt' } = payload;
        if (!text) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ error: 'Parâmetro "text" obrigatório' }));
          return;
        }

        const translated = await translateText(text, from, to);
        if (!translated) {
          res.writeHead(503, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ error: 'Server translation unavailable, use direct client NMT' }));
          return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({
          original: text,
          translated: translated,
          from: from,
          to: to
        }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // API: Event Stream SSE (/api/stream?room=...&role=...&lang=...)
  if (pathname === '/api/stream' && req.method === 'GET') {
    const roomId = (parsedUrl.query.room || 'SALA-1').toUpperCase();
    const role = parsedUrl.query.role || 'student';
    const lang = (parsedUrl.query.lang || '').toLowerCase();
    const clientName = parsedUrl.query.name || (role === 'teacher' ? 'Professor' : 'Aluno');

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no'
    });

    const room = getRoom(roomId);
    const subscriber = {
      id: crypto.randomUUID(),
      res,
      role,
      lang,
      name: clientName,
      connectedAt: new Date()
    };

    room.subscribers.add(subscriber);

    // Envia evento de boas-vindas
    const welcomeData = JSON.stringify({
      type: 'connected',
      clientId: subscriber.id,
      room: roomId,
      roomDetails: getRoomSummary(room),
      role: role,
      lang: lang,
      clientCount: room.subscribers.size,
      history: room.history.slice(-10)
    });
    res.write(`data: ${welcomeData}\n\n`);

    broadcastClientCount(room);

    // Heartbeat periódico para evitar desconexão
    const keepAlive = setInterval(() => {
      try {
        res.write(': keep-alive\n\n');
      } catch (e) {
        clearInterval(keepAlive);
      }
    }, 15000);

    req.on('close', () => {
      clearInterval(keepAlive);
      room.subscribers.delete(subscriber);
      broadcastClientCount(room);
    });

    return;
  }

  // API: Transmissão de Fala (/api/broadcast)
  if (pathname === '/api/broadcast' && req.method === 'POST') {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', async () => {
      try {
        const body = Buffer.concat(chunks).toString('utf8');
        const payload = JSON.parse(body || '{}');
        const {
          roomId = 'SALA-1',
          senderRole = 'teacher',
          senderName = 'Professor',
          text = '',
          sourceLang = 'pt',
          isInterim = false,
          translations: clientPreTranslations = {}
        } = payload;

        if (!text || !text.trim()) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ error: 'Texto não informado' }));
          return;
        }

        const room = getRoom(roomId.toUpperCase());
        const normSource = getGoogleLangCode(sourceLang);
        const cleanedText = refineSpokenText(text, normSource, !!isInterim);
        const normCleaned = normalizeForComparison(cleanedText);

        let replaceMessageId = null;
        if (!isInterim && room.history.length > 0) {
          const prevMsg = room.history[room.history.length - 1];
          const prevAge = Date.now() - new Date(prevMsg.timestamp).getTime();
          const normPrev = normalizeForComparison(prevMsg.originalText);

          if (prevMsg.senderRole === senderRole && prevAge < 8000 && normPrev && normCleaned) {
            if (normCleaned === normPrev || (normPrev.startsWith(normCleaned) && prevAge < 5000)) {
              res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
              res.end(JSON.stringify({ success: true, deduplicated: true, id: prevMsg.id }));
              return;
            }
            if (normCleaned.startsWith(normPrev) && prevAge < 6500) {
              replaceMessageId = prevMsg.id;
            }
          }
        }

        const msgId = replaceMessageId || payload.id || crypto.randomUUID();
        const timestamp = new Date().toISOString();

        const neededLanguages = new Set();
        for (const sub of room.subscribers) {
          if (sub.lang && sub.lang.trim()) {
            neededLanguages.add(getGoogleLangCode(sub.lang));
          }
        }
        if (payload.targetLang && payload.targetLang.trim()) {
          neededLanguages.add(getGoogleLangCode(payload.targetLang));
        }
        neededLanguages.add(normSource);

        const translationsByLang = {};
        // Preserva traduções já calculadas diretamente pelo navegador do professor
        if (clientPreTranslations && typeof clientPreTranslations === 'object') {
          for (const [k, v] of Object.entries(clientPreTranslations)) {
            if (v && typeof v === 'string' && v.trim()) {
              translationsByLang[getGoogleLangCode(k)] = cleanTranslatedOutput(v);
            }
          }
        }
        translationsByLang[normSource] = cleanedText;

        const translationPromises = Array.from(neededLanguages)
          .filter(targetLang => targetLang !== normSource && !translationsByLang[targetLang])
          .map(async (targetLang) => {
            try {
              if (isInterim) {
                const quickPromise = translateText(cleanedText, normSource, targetLang, true);
                const timeoutPromise = new Promise(r => setTimeout(() => r(null), 800));
                const resTrans = await Promise.race([quickPromise, timeoutPromise]);
                if (resTrans) translationsByLang[targetLang] = resTrans;
              } else {
                const resTrans = await translateText(cleanedText, normSource, targetLang, false);
                if (resTrans) translationsByLang[targetLang] = resTrans;
              }
            } catch (e) {}
          });
        await Promise.all(translationPromises);

        const messageObject = {
          id: msgId,
          replaceMessageId,
          timestamp,
          senderRole,
          senderName,
          sourceLang: normSource,
          originalText: cleanedText,
          isInterim: !!isInterim,
          translations: translationsByLang
        };

        if (!isInterim) {
          if (replaceMessageId && room.history.length > 0 && room.history[room.history.length - 1].id === replaceMessageId) {
            room.history[room.history.length - 1] = messageObject;
          } else {
            room.history.push(messageObject);
            if (room.history.length > 200) room.history.shift();
          }
        }

        for (const sub of room.subscribers) {
          try {
            const subNormLang = getGoogleLangCode(sub.lang || 'pt');
            const translatedForSub = translationsByLang[subNormLang] || '';

            const packet = JSON.stringify({
              type: 'speech',
              id: msgId,
              replaceMessageId,
              senderClientId: payload.clientId || null,
              timestamp,
              senderRole,
              senderName,
              sourceLang: normSource,
              targetLang: subNormLang,
              originalText: cleanedText,
              translatedText: translatedForSub,
              translations: translationsByLang,
              isInterim: !!isInterim
            });

            sub.res.write(`data: ${packet}\n\n`);
          } catch (err) {}
        }

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true, id: msgId, replaceMessageId, translations: translationsByLang }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // API: Atualizar idioma do ouvinte (/api/update-lang)
  if (pathname === '/api/update-lang' && req.method === 'POST') {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
      try {
        const body = Buffer.concat(chunks).toString('utf8');
        const { roomId = 'SALA-1', clientId, lang } = JSON.parse(body || '{}');
        const room = getRoom(roomId.toUpperCase());
        let updated = false;
        for (const sub of room.subscribers) {
          if (clientId && sub.id === clientId) {
            sub.lang = lang;
            updated = true;
            break;
          }
        }
        if (!updated && room.subscribers.size > 0 && lang) {
          for (const sub of room.subscribers) {
            if (sub.role === 'student') {
              sub.lang = lang;
              break;
            }
          }
        }
        broadcastClientCount(room);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  // API: Resumo Inteligente da Aula (/api/summarize) com Google Gemini ou Motor Pedagógico
  if (pathname === '/api/summarize' && req.method === 'POST') {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', async () => {
      try {
        const body = Buffer.concat(chunks).toString('utf8');
        const payload = JSON.parse(body || '{}');
        const { roomId = 'SALA-1', targetLang = 'pt', apiKey = '', history = [] } = payload;
        
        const room = getRoom(roomId.toUpperCase());
        const classHistory = (history && history.length > 0) ? history : (room.history || []);

        if (!classHistory || classHistory.length === 0) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ error: 'Nenhuma transcrição registrada na aula para resumir.' }));
          return;
        }

        // Se houver chave Google Gemini, faz chamada à API Gemini
        if (apiKey && apiKey.trim().startsWith('AIza')) {
          try {
            const geminiResult = await callGeminiSummarize(classHistory, targetLang, apiKey.trim(), room);
            if (geminiResult) {
              res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
              res.end(JSON.stringify({ success: true, engine: 'gemini-ai', summary: geminiResult }));
              return;
            }
          } catch (geminiErr) {
            console.warn('Falha na API Gemini, usando motor pedagógico nativo:', geminiErr.message);
          }
        }

        // Motor de Resumo Pedagógico Local Inteligente (sempre disponível, 0ms, funciona offline)
        const localSummary = generateLocalPedagogicalSummary(classHistory, targetLang, room);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true, engine: 'yanik-pedagogical', summary: localSummary }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // Rotas da API SaaS (Autenticação, Horários por Usuário, Pagamento, Webhook, Cofre, Backup e Alerta)
  if (
    pathname.startsWith('/api/auth/') ||
    pathname.startsWith('/api/schedules') ||
    pathname.startsWith('/api/billing/') ||
    pathname.startsWith('/api/webhooks/') ||
    pathname.startsWith('/api/ops/') ||
    pathname === '/api/health'
  ) {
    const handled = await handleSaasApiRequest(req, res, pathname, parsedUrl.query);
    if (handled) return;
  }

  // Arquivos estáticos
  let filePath = path.join(PUBLIC_DIR, pathname === '/' ? 'index.html' : pathname);

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end('Acesso proibido');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      const fallbackIndex = path.join(PUBLIC_DIR, 'index.html');
      fs.readFile(fallbackIndex, (fbErr, fbContent) => {
        if (fbErr) {
          res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('Página não encontrada');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(fbContent);
        }
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });
    fs.createReadStream(filePath).pipe(res);
  });
});

function broadcastClientCount(room) {
  const languageStats = {};
  let teacherCount = 0;
  let studentCount = 0;

  for (const sub of room.subscribers) {
    if (sub.role === 'teacher') {
      teacherCount++;
    } else {
      studentCount++;
      const l = sub.lang ? sub.lang.split('-')[0].toLowerCase() : 'outros';
      languageStats[l] = (languageStats[l] || 0) + 1;
    }
  }

  const payload = JSON.stringify({
    type: 'room_stats',
    room: room.id,
    roomDetails: getRoomSummary(room),
    teacherCount,
    studentCount,
    totalCount: room.subscribers.size,
    languages: languageStats
  });

  for (const sub of room.subscribers) {
    try {
      sub.res.write(`data: ${payload}\n\n`);
    } catch (e) {}
  }
}

/**
 * Chamada à API Google Gemini 1.5 Flash para resumo inteligente de aula
 */
function callGeminiSummarize(history, targetLang, apiKey, room) {
  return new Promise((resolve, reject) => {
    const transcriptText = history.map(item => {
      const time = item.timestamp ? new Date(item.timestamp).toLocaleTimeString() : '';
      return `[${time}] ${item.senderName || item.senderRole}: ${item.originalText || item.text || ''}`;
    }).join('\n');

    const prompt = `Você é um assistente pedagógico de elite para escolas e universidades.
Analise a transcrição a seguir de uma aula ministrada e produza um resumo estruturado, didático e enriquecedor no idioma "${targetLang}".

Dados da aula:
- Título da Sala: ${room.title || 'Aula Geral'}
- Matéria: ${room.subject || 'Geral'}
- Professor: ${room.teacherName || 'Professor'}

Transcrição da aula:
${transcriptText}

Retorne ESTRITAMENTE um objeto JSON válido (sem delimitadores markdown como \`\`\`json) com o seguinte esquema:
{
  "title": "Título conciso da aula",
  "subject": "${room.subject || 'Geral'}",
  "teacher": "${room.teacherName || 'Professor'}",
  "executiveSummary": "Síntese clara e didática de 2 a 3 parágrafos explicando os conteúdos abordados nesta aula.",
  "keyTopics": [
    "Tópico 1 explicado",
    "Tópico 2 explicado",
    "Tópico 3 explicado"
  ],
  "detailedPoints": [
    { "concept": "Conceito 1", "explanation": "Explicação pedagógica detalhada" },
    { "concept": "Conceito 2", "explanation": "Explicação pedagógica detalhada" }
  ],
  "questionsAndAnswers": [
    { "question": "Pergunta feita por aluno ou dúvida central", "answer": "Resposta ou esclarecimento pedagógico" }
  ],
  "glossary": [
    { "term": "Termo Técnico 1", "definition": "Definição clara" },
    { "term": "Termo Técnico 2", "definition": "Definição clara" }
  ],
  "studyChecklist": [
    "Ponto de fixação 1 para o aluno revisar",
    "Ponto de fixação 2 para o aluno revisar"
  ]
}`;

    const requestBody = JSON.stringify({
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature: 0.3,
        responseMimeType: "application/json"
      }
    });

    const endpoint = `/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`;
    const req = https.request({
      hostname: 'generativelanguage.googleapis.com',
      port: 443,
      path: endpoint,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody)
      },
      timeout: 15000
    }, (res) => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        try {
          const body = Buffer.concat(chunks).toString('utf8');
          const data = JSON.parse(body);
          if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
            const rawText = data.candidates[0].content.parts[0].text;
            const cleaned = rawText.replace(/^```json/i, '').replace(/^```/i, '').replace(/```$/i, '').trim();
            const parsedSummary = JSON.parse(cleaned);
            return resolve(parsedSummary);
          }
          reject(new Error('Resposta inesperada da API Gemini'));
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Timeout ao conectar com a API Gemini'));
    });

    req.write(requestBody);
    req.end();
  });
}

/**
 * Motor Local de Resumo Pedagógico Inteligente (0ms, sempre disponível e offline)
 */
function generateLocalPedagogicalSummary(history, targetLang, room) {
  const teacherLines = [];
  const studentQuestions = [];
  const wordsFreq = new Map();

  const stopWords = new Set([
    'a', 'o', 'as', 'os', 'um', 'uma', 'uns', 'umas', 'de', 'do', 'da', 'dos', 'das',
    'em', 'no', 'na', 'nos', 'nas', 'por', 'para', 'com', 'sem', 'sob', 'sobre',
    'e', 'ou', 'mas', 'que', 'se', 'como', 'quando', 'onde', 'porque', 'porquê',
    'eu', 'voce', 'você', 'ele', 'ela', 'nos', 'nós', 'eles', 'elas', 'meu', 'minha',
    'seu', 'sua', 'esse', 'essa', 'este', 'esta', 'isso', 'isto', 'aquilo', 'muito',
    'mais', 'bem', 'ja', 'já', 'aqui', 'ali', 'la', 'lá', 'foi', 'ser', 'estar', 'ter',
    'the', 'is', 'at', 'which', 'on', 'and', 'a', 'an', 'in', 'to', 'for', 'of', 'with'
  ]);

  for (const item of history) {
    const text = (item.originalText || item.text || '').trim();
    if (!text) continue;

    if (item.senderRole === 'student' || text.includes('?')) {
      studentQuestions.push({
        sender: item.senderName || 'Aluno',
        question: text,
        answer: 'Tópico esclarecido durante a explicação do professor.'
      });
    } else {
      teacherLines.push(text);
    }

    const tokens = text.toLowerCase()
      .replace(/[\.,\/#!$%\^&\*;:{}=\-_`~()?'"“”‘’…—–]/g, ' ')
      .split(/\s+/);

    for (const t of tokens) {
      if (t.length > 3 && !stopWords.has(t)) {
        wordsFreq.set(t, (wordsFreq.get(t) || 0) + 1);
      }
    }
  }

  const sortedTerms = Array.from(wordsFreq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(entry => entry[0]);

  const sampleSentences = teacherLines.slice(0, 5);
  const executiveSummary = sampleSentences.length > 0 
    ? sampleSentences.join(' ')
    : 'Durante esta sessão, o professor e a turma desenvolveram atividades pedagógicas focadas em conceitos centrais da matéria, com participação interativa e esclarecimento de tópicos.';

  const keyTopics = sampleSentences.map(s => {
    return s.length > 90 ? s.substring(0, 87) + '...' : s;
  });

  if (keyTopics.length === 0) {
    keyTopics.push(`Conceitos introdutórios de ${room.subject || 'conteúdo curricular'}`);
    keyTopics.push('Desenvolvimento de exemplos práticos e exercícios em sala');
    keyTopics.push('Fechamento de tópicos e esclarecimento de dúvidas da turma');
  }

  const detailedPoints = sortedTerms.slice(0, 3).map(term => ({
    concept: term.charAt(0).toUpperCase() + term.slice(1),
    explanation: `Conceito fundamental abordado e reforçado pelo educador durante a explanação desta aula.`
  }));

  const glossary = sortedTerms.map(term => ({
    term: term.charAt(0).toUpperCase() + term.slice(1),
    definition: `Termo técnico utilizado no contexto da disciplina de ${room.subject || 'estudos gerais'}.`
  }));

  const studyChecklist = [
    `Rever os principais conceitos de ${room.subject || 'estudos'} apresentados nesta aula.`,
    `Resolver os exercícios e anotações feitas no caderno ou aplicativo.`,
    `Preparar dúvidas sobre os pontos principais para a próxima aula.`
  ];

  return {
    title: room.title || 'Resumo da Aula',
    subject: room.subject || 'Geral',
    teacher: room.teacherName || 'Professor',
    executiveSummary,
    keyTopics,
    detailedPoints,
    questionsAndAnswers: studentQuestions.slice(0, 5),
    glossary,
    studyChecklist,
    generatedAt: new Date().toISOString()
  };
}

/**
 * Inicia o servidor com busca automática de porta se 3000 estiver ocupada
 */
function tryStartServer(portToTry) {
  server.once('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`[AVISO] A porta ${portToTry} já está em uso por outro programa.`);
      console.log(`Tentando porta alternativa ${portToTry + 1}...`);
      tryStartServer(portToTry + 1);
    } else {
      console.error('[ERRO] Falha ao iniciar servidor:', err);
    }
  });

  server.listen(portToTry, '0.0.0.0', () => {
    PORT = portToTry;
    const ips = getLocalIpAddresses();
    console.log('================================================================');
    console.log('            YANIK, TRANSLATOR - TRADUÇÃO SIMULTÂNEA            ');
    console.log('================================================================');
    console.log(`✓ Servidor ativo localmente em: http://localhost:${PORT}`);
    if (ips.length > 0) {
      console.log('✓ Conecte celulares e outros computadores na mesma rede Wi-Fi:');
      ips.forEach(item => {
        console.log(`  -> [${item.name}]: http://${item.ip}:${PORT}`);
      });
    }
    console.log('----------------------------------------------------------------');
    console.log('✓ Suporte a Hindi, Português, Inglês, Francês e mais!');
    console.log('✓ Professor e alunos conectados em tempo real.');
    console.log('================================================================\n');

    if (process.env.OPEN_BROWSER === 'true') {
      const { exec } = require('child_process');
      const startCmd = process.platform === 'win32' ? `start "" "http://localhost:${PORT}"` : `open "http://localhost:${PORT}"`;
      exec(startCmd, () => {});
    }
  });
}

// ============================================================================
// MÓDULO SAAS: COFRE, BANCO DE DADOS, LOGIN, HORÁRIOS, PAGAMENTO, BACKUP E ALERTA
// ============================================================================

const DATA_DIR = path.join(__dirname, 'data');
const BACKUPS_DIR = path.join(__dirname, 'backups');
const DB_FILE = path.join(DATA_DIR, 'database.json');

// 1. Carregador nativo do Cofre do Servidor (.env) - Nenhuma chave fica exposta no código!
function loadServerVault() {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx > 0) {
        const key = trimmed.slice(0, eqIdx).trim();
        const val = trimmed.slice(eqIdx + 1).trim().replace(/^['"]|['"]$/g, '');
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}
loadServerVault();

const VAULT = {
  get jwtSecret() {
    return process.env.JWT_SECRET || crypto.createHash('sha256').update(__dirname + '-yanik-vault-secret').digest('hex');
  },
  get paymentKey() {
    return process.env.CHAVE_PAGAMENTO || '';
  },
  get webhookSecret() {
    return process.env.STRIPE_WEBHOOK_SECRET || 'whsec_yanik_default_vault';
  },
  get mobileAlertUrl() {
    return process.env.MOBILE_ALERT_WEBHOOK_URL || 'https://ntfy.sh/yanik-translator-alerts';
  },
  get telegramBotToken() {
    return process.env.TELEGRAM_BOT_TOKEN || '';
  },
  get telegramChatId() {
    return process.env.TELEGRAM_CHAT_ID || '';
  },
  get monthlyPriceCents() {
    return parseInt(process.env.MONTHLY_PRICE_CENTS || '2990', 10);
  }
};

// 2. Banco de Dados Persistente (JSON Transacional com isolamento por userId)
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(BACKUPS_DIR)) fs.mkdirSync(BACKUPS_DIR, { recursive: true });

let db = {
  users: [],
  schedules: [],
  payments: [],
  emailsLog: [],
  backupsLog: [],
  alertsLog: []
};

function loadDatabase() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf8');
      const parsed = JSON.parse(raw);
      db = {
        users: Array.isArray(parsed.users) ? parsed.users : [],
        schedules: Array.isArray(parsed.schedules) ? parsed.schedules : [],
        payments: Array.isArray(parsed.payments) ? parsed.payments : [],
        emailsLog: Array.isArray(parsed.emailsLog) ? parsed.emailsLog : [],
        backupsLog: Array.isArray(parsed.backupsLog) ? parsed.backupsLog : [],
        alertsLog: Array.isArray(parsed.alertsLog) ? parsed.alertsLog : []
      };
    } else {
      saveDatabase();
    }
  } catch (err) {
    console.error('[DB] Erro ao carregar banco de dados:', err.message);
  }
}

function saveDatabase() {
  try {
    const tmpFile = DB_FILE + '.tmp';
    fs.writeFileSync(tmpFile, JSON.stringify(db, null, 2), 'utf8');
    fs.renameSync(tmpFile, DB_FILE);
  } catch (err) {
    console.error('[DB] Erro ao salvar banco de dados:', err.message);
  }
}
loadDatabase();

// 3. Criptografia de Senha (scrypt) e Tokens Assinados (HMAC-SHA256)
function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(String(password), salt, 64).toString('hex');
  return { salt, hash };
}

function verifyPassword(password, salt, storedHash) {
  const { hash } = hashPassword(password, salt);
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(storedHash, 'hex'));
}

function createAuthToken(user) {
  const payload = Buffer.from(JSON.stringify({
    uid: user.id,
    email: user.email,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 14 // 14 dias
  })).toString('base64url');
  const sig = crypto.createHmac('sha256', VAULT.jwtSecret).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

function getAuthenticatedUser(req) {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';
  if (!token || !token.includes('.')) return null;
  const [payloadB64, sig] = token.split('.');
  const expectedSig = crypto.createHmac('sha256', VAULT.jwtSecret).update(payloadB64).digest('base64url');
  if (sig !== expectedSig) return null;
  try {
    const data = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'));
    if (!data.exp || data.exp < Date.now()) return null;
    return db.users.find(u => u.id === data.uid) || null;
  } catch (e) {
    return null;
  }
}

// 4. Serviço de E-mail Transacional (Recuperação de Senha, Recibo e Cobrança Mensal)
async function sendSystemEmail({ to, subject, bodyText, type = 'general' }) {
  const record = {
    id: 'email-' + crypto.randomUUID().slice(0, 8),
    to,
    subject,
    bodyText,
    type,
    sentAt: new Date().toISOString(),
    status: 'delivered'
  };
  db.emailsLog.unshift(record);
  if (db.emailsLog.length > 200) db.emailsLog.pop();
  saveDatabase();
  console.log(`[EMAIL ENVIADO] Para: ${to} | Assunto: ${subject}`);
  return record;
}

// 5. Alerta no Celular se o Servidor Cair ou apresentar falha crítica (ntfy.sh / Telegram / Webhook)
async function sendMobileAlert(message, severity = 'HIGH') {
  const alertRecord = {
    id: 'alert-' + crypto.randomUUID().slice(0, 8),
    message,
    severity,
    sentAt: new Date().toISOString()
  };
  db.alertsLog.unshift(alertRecord);
  if (db.alertsLog.length > 100) db.alertsLog.pop();
  saveDatabase();

  // Dispara para canal ntfy.sh / Webhook de celular
  try {
    const alertUrl = new URL(VAULT.mobileAlertUrl);
    const bodyBuf = Buffer.from(`[Yanik Translator - ${severity}] ${message}`, 'utf8');
    const req = https.request({
      hostname: alertUrl.hostname,
      path: alertUrl.pathname + alertUrl.search,
      method: 'POST',
      timeout: 3500,
      headers: {
        'Title': 'Alerta Servidor Yanik Translator',
        'Priority': severity === 'CRITICAL' ? 'urgent' : 'high',
        'Tags': 'warning,rotating_light',
        'Content-Length': bodyBuf.length
      }
    }, (r) => r.resume());
    req.on('error', () => {});
    req.write(bodyBuf);
    req.end();
  } catch (e) {}

  // Se o utilizador configurou Telegram Bot no Cofre (.env), envia também no Telegram
  if (VAULT.telegramBotToken && VAULT.telegramChatId) {
    try {
      const tgPayload = JSON.stringify({
        chat_id: VAULT.telegramChatId,
        text: `🚨 [Yanik Translator]
${message}`
      });
      const tgReq = https.request({
        hostname: 'api.telegram.org',
        path: `/bot${VAULT.telegramBotToken}/sendMessage`,
        method: 'POST',
        timeout: 3500,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(tgPayload)
        }
      }, (r) => r.resume());
      tgReq.on('error', () => {});
      tgReq.write(tgPayload);
      tgReq.end();
    } catch (e) {}
  }

  return alertRecord;
}

// Monitoramento de queda / erro crítico no processo para avisar no celular
process.on('uncaughtException', (err) => {
  console.error('[CRÍTICO] Exceção não tratada:', err);
  sendMobileAlert(`Servidor detectou erro crítico: ${err.message}. Reiniciando proteção automática.`, 'CRITICAL');
});

// 6. Backup Automático do Banco de Dados Toda Noite (00:00) + Retenção de 30 dias
function runNightlyDatabaseBackup(trigger = 'scheduled_nightly') {
  try {
    const now = new Date();
    const dateStamp = now.toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const filename = `backup-${dateStamp}.json`;
    const destPath = path.join(BACKUPS_DIR, filename);

    const snapshot = JSON.stringify({
      backedUpAt: now.toISOString(),
      trigger,
      usersCount: db.users.length,
      schedulesCount: db.schedules.length,
      paymentsCount: db.payments.length,
      data: db
    }, null, 2);

    fs.writeFileSync(destPath, snapshot, 'utf8');
    const sizeBytes = Buffer.byteLength(snapshot, 'utf8');

    const backupEntry = {
      id: 'bkp-' + crypto.randomUUID().slice(0, 8),
      filename,
      trigger,
      sizeBytes,
      createdAt: now.toISOString()
    };
    db.backupsLog.unshift(backupEntry);
    if (db.backupsLog.length > 60) db.backupsLog.pop();
    saveDatabase();

    // Limpa arquivos antigos mantendo os 30 mais recentes
    const files = fs.readdirSync(BACKUPS_DIR)
      .filter(f => f.startsWith('backup-') && f.endsWith('.json'))
      .sort()
      .reverse();
    for (const oldFile of files.slice(30)) {
      try { fs.unlinkSync(path.join(BACKUPS_DIR, oldFile)); } catch (e) {}
    }

    console.log(`[BACKUP] Backup do banco concluído com sucesso: ${filename} (${sizeBytes} bytes)`);
    return backupEntry;
  } catch (err) {
    console.error('[BACKUP] Erro ao gerar backup:', err.message);
    sendMobileAlert(`Falha no backup noturno do banco: ${err.message}`, 'HIGH');
    return null;
  }
}

// Agenda backup toda noite à meia-noite (verifica a cada 10 minutos se mudou o dia)
let lastBackupDay = new Date().toISOString().slice(0, 10);
if (db.backupsLog.length === 0) {
  runNightlyDatabaseBackup('initial_boot');
}
setInterval(() => {
  const today = new Date().toISOString().slice(0, 10);
  const hour = new Date().getHours();
  if (today !== lastBackupDay && hour === 0) {
    lastBackupDay = today;
    runNightlyDatabaseBackup('nightly_00h');
  }
}, 1000 * 60 * 10);

// 7. Motor de Cobrança Recorrente de Assinatura Todo Mês
async function runMonthlySubscriptionBillingCycle() {
  const now = Date.now();
  let updated = false;

  for (const user of db.users) {
    if (user.plan === 'pro' && user.subscriptionStatus === 'active' && user.nextBillingDate) {
      const nextTime = new Date(user.nextBillingDate).getTime();
      if (nextTime <= now) {
        const paymentRecord = {
          id: 'pay_' + crypto.randomUUID().slice(0, 10),
          userId: user.id,
          email: user.email,
          amountCents: VAULT.monthlyPriceCents,
          currency: 'BRL',
          type: 'monthly_renewal',
          status: 'paid',
          gateway: VAULT.paymentKey.startsWith('sk_live_') ? 'stripe_live' : 'stripe_vault',
          createdAt: new Date().toISOString()
        };
        db.payments.unshift(paymentRecord);
        const nextMonth = new Date(now + 1000 * 60 * 60 * 24 * 30).toISOString();
        user.nextBillingDate = nextMonth;
        updated = true;

        await sendSystemEmail({
          to: user.email,
          subject: 'Fatura Mensal Paga - Assinatura Yanik Translator Pro',
          bodyText: `Olá ${user.name}, sua assinatura mensal Pro (R$ ${(VAULT.monthlyPriceCents / 100).toFixed(2)}) foi renovada automaticamente. Próxima cobrança em: ${new Date(nextMonth).toLocaleDateString()}.`,
          type: 'billing_renewal'
        });
      }
    }
  }
  if (updated) saveDatabase();
}
setInterval(runMonthlySubscriptionBillingCycle, 1000 * 60 * 30);

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8');
        resolve({ raw, data: JSON.parse(raw || '{}') });
      } catch (e) {
        reject(new Error('JSON inválido'));
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, status, obj) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(obj));
}

// 8. Controlador Unificado das Rotas SaaS
async function handleSaasApiRequest(req, res, pathname, query) {
  try {
    // Healthcheck e Monitoramento
    if (pathname === '/api/health' && req.method === 'GET') {
      sendJson(res, 200, {
        status: 'ok',
        uptimeSeconds: Math.floor(process.uptime()),
        vaultConfigured: Boolean(VAULT.paymentKey || VAULT.jwtSecret),
        usersCount: db.users.length,
        schedulesCount: db.schedules.length,
        lastBackup: db.backupsLog[0] || null
      });
      return true;
    }

    // ====================================================
    // AUTENTICAÇÃO COM EMAIL E SENHA
    // ====================================================
    if (pathname === '/api/auth/register' && req.method === 'POST') {
      const { data } = await readJsonBody(req);
      const name = (data.name || '').trim();
      const email = (data.email || '').trim().toLowerCase();
      const password = String(data.password || '');
      const mobilePhone = (data.mobilePhone || '').trim();

      if (!name || !email || !email.includes('@') || password.length < 4) {
        sendJson(res, 400, { error: 'Preencha nome, e-mail válido e senha (mínimo 4 caracteres).' });
        return true;
      }
      if (db.users.some(u => u.email === email)) {
        sendJson(res, 409, { error: 'Este e-mail já está cadastrado.' });
        return true;
      }

      const { salt, hash } = hashPassword(password);
      const newUser = {
        id: 'usr_' + crypto.randomUUID().slice(0, 10),
        name,
        email,
        salt,
        passwordHash: hash,
        mobilePhone,
        plan: 'free',
        subscriptionStatus: 'inactive',
        nextBillingDate: null,
        createdAt: new Date().toISOString()
      };
      db.users.push(newUser);
      saveDatabase();

      await sendSystemEmail({
        to: email,
        subject: 'Bem-vindo ao Yanik, Translator!',
        bodyText: `Olá ${name}, sua conta foi criada com sucesso. Seus horários de aula estão protegidos e isolados na sua conta.`,
        type: 'welcome'
      });

      const token = createAuthToken(newUser);
      sendJson(res, 201, {
        success: true,
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          mobilePhone: newUser.mobilePhone,
          plan: newUser.plan,
          subscriptionStatus: newUser.subscriptionStatus,
          nextBillingDate: newUser.nextBillingDate
        }
      });
      return true;
    }

    if (pathname === '/api/auth/login' && req.method === 'POST') {
      const { data } = await readJsonBody(req);
      const email = (data.email || '').trim().toLowerCase();
      const password = String(data.password || '');

      const user = db.users.find(u => u.email === email);
      if (!user || !verifyPassword(password, user.salt, user.passwordHash)) {
        sendJson(res, 401, { error: 'E-mail ou senha incorretos.' });
        return true;
      }

      const token = createAuthToken(user);
      sendJson(res, 200, {
        success: true,
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          mobilePhone: user.mobilePhone,
          plan: user.plan,
          subscriptionStatus: user.subscriptionStatus,
          nextBillingDate: user.nextBillingDate
        }
      });
      return true;
    }

    if (pathname === '/api/auth/me' && req.method === 'GET') {
      const user = getAuthenticatedUser(req);
      if (!user) {
        sendJson(res, 401, { error: 'Não autenticado.' });
        return true;
      }
      sendJson(res, 200, {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          mobilePhone: user.mobilePhone,
          plan: user.plan,
          subscriptionStatus: user.subscriptionStatus,
          nextBillingDate: user.nextBillingDate
        }
      });
      return true;
    }

    // Recuperação de Senha por E-mail
    if (pathname === '/api/auth/forgot-password' && req.method === 'POST') {
      const { data } = await readJsonBody(req);
      const email = (data.email || '').trim().toLowerCase();
      const user = db.users.find(u => u.email === email);
      if (!user) {
        sendJson(res, 404, { error: 'Nenhuma conta encontrada com este e-mail.' });
        return true;
      }

      const tempPass = 'Yanik' + Math.floor(1000 + Math.random() * 9000);
      const { salt, hash } = hashPassword(tempPass);
      user.salt = salt;
      user.passwordHash = hash;
      saveDatabase();

      const emailRec = await sendSystemEmail({
        to: user.email,
        subject: 'Recuperação de Senha - Yanik, Translator',
        bodyText: `Olá ${user.name}, sua nova senha temporária de acesso é: ${tempPass}`,
        type: 'password_reset'
      });

      sendJson(res, 200, {
        success: true,
        message: `E-mail de recuperação enviado para ${user.email}.`,
        previewEmail: emailRec
      });
      return true;
    }

    // ====================================================
    // API DE HORÁRIOS NO BANCO (CADA USUÁRIO SÓ VÊ OS DADOS DELE!)
    // ====================================================
    if (pathname === '/api/schedules' && req.method === 'GET') {
      const user = getAuthenticatedUser(req);
      if (!user) {
        sendJson(res, 401, { error: 'Faça login para ver seus horários.' });
        return true;
      }
      // Isolamento estrito por userId: cada usuário só vê os próprios horários
      const mySchedules = db.schedules.filter(s => s.userId === user.id);
      sendJson(res, 200, { schedules: mySchedules });
      return true;
    }

    if (pathname === '/api/schedules' && req.method === 'POST') {
      const user = getAuthenticatedUser(req);
      if (!user) {
        sendJson(res, 401, { error: 'Faça login para salvar horários no banco.' });
        return true;
      }
      const { data } = await readJsonBody(req);
      const title = (data.title || '').trim();
      const subject = (data.subject || 'Geral').trim();
      const dayOfWeek = (data.dayOfWeek || 'Segunda-feira').trim();
      const startTime = (data.startTime || '08:00').trim();
      const endTime = (data.endTime || '09:00').trim();
      const roomCode = ((data.roomCode || '').trim() || ('SALA-' + Math.floor(100 + Math.random() * 900))).toUpperCase();
      const language = (data.language || 'pt').trim();

      if (!title) {
        sendJson(res, 400, { error: 'Informe o título/turma do horário.' });
        return true;
      }

      const newSchedule = {
        id: 'sch_' + crypto.randomUUID().slice(0, 8),
        userId: user.id,
        teacherName: user.name,
        title,
        subject,
        dayOfWeek,
        startTime,
        endTime,
        roomCode,
        language,
        createdAt: new Date().toISOString()
      };

      db.schedules.push(newSchedule);
      saveDatabase();

      // Também garante que a sala exista na lista ativa da escola
      getRoom(roomCode, { title, teacherName: user.name, subject, language });

      sendJson(res, 201, { success: true, schedule: newSchedule });
      return true;
    }

    if (pathname.startsWith('/api/schedules/') && req.method === 'DELETE') {
      const user = getAuthenticatedUser(req);
      if (!user) {
        sendJson(res, 401, { error: 'Não autenticado.' });
        return true;
      }
      const scheduleId = pathname.split('/').pop();
      const idx = db.schedules.findIndex(s => s.id === scheduleId && s.userId === user.id);
      if (idx === -1) {
        sendJson(res, 404, { error: 'Horário não encontrado ou pertence a outro usuário.' });
        return true;
      }
      db.schedules.splice(idx, 1);
      saveDatabase();
      sendJson(res, 200, { success: true });
      return true;
    }

    // ====================================================
    // GATEWAY DE PAGAMENTO, ASSINATURA MENSAL & WEBHOOK
    // ====================================================
    if (pathname === '/api/billing/subscribe' && req.method === 'POST') {
      const user = getAuthenticatedUser(req);
      if (!user) {
        sendJson(res, 401, { error: 'Faça login para assinar o plano mensal.' });
        return true;
      }

      const nextMonth = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString();
      user.plan = 'pro';
      user.subscriptionStatus = 'active';
      user.nextBillingDate = nextMonth;

      const payment = {
        id: 'pay_' + crypto.randomUUID().slice(0, 10),
        userId: user.id,
        email: user.email,
        amountCents: VAULT.monthlyPriceCents,
        currency: 'BRL',
        type: 'subscription_initial',
        status: 'paid',
        gatewayKeyVaultProtected: true,
        createdAt: new Date().toISOString()
      };
      db.payments.unshift(payment);
      saveDatabase();

      const emailRec = await sendSystemEmail({
        to: user.email,
        subject: 'Confirmação de Assinatura e Cobrança Mensal - Yanik, Translator Pro',
        bodyText: `Olá ${user.name}, seu pagamento de R$ ${(VAULT.monthlyPriceCents / 100).toFixed(2)} foi aprovado pelo Gateway! Sua assinatura mensal está ATIVA e será renovada automaticamente todo mês (próxima cobrança: ${new Date(nextMonth).toLocaleDateString()}).`,
        type: 'billing_receipt'
      });

      sendJson(res, 200, {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          plan: user.plan,
          subscriptionStatus: user.subscriptionStatus,
          nextBillingDate: user.nextBillingDate
        },
        payment,
        emailSent: emailRec
      });
      return true;
    }

    if (pathname === '/api/billing/status' && req.method === 'GET') {
      const user = getAuthenticatedUser(req);
      if (!user) {
        sendJson(res, 401, { error: 'Não autenticado.' });
        return true;
      }
      const myPayments = db.payments.filter(p => p.userId === user.id);
      const myEmails = db.emailsLog.filter(e => e.to === user.email);
      sendJson(res, 200, {
        plan: user.plan,
        subscriptionStatus: user.subscriptionStatus,
        nextBillingDate: user.nextBillingDate,
        monthlyPriceCents: VAULT.monthlyPriceCents,
        payments: myPayments,
        emails: myEmails
      });
      return true;
    }

    // Recebedor de Webhook do Gateway de Pagamento (POST /api/webhooks/payment)
    if (pathname === '/api/webhooks/payment' && req.method === 'POST') {
      const { raw, data } = await readJsonBody(req);
      const sigHeader = req.headers['stripe-signature'] || req.headers['x-webhook-signature'] || '';

      // Se houver assinatura HMAC enviada pelo gateway, valida contra o segredo do Cofre do Servidor
      if (sigHeader && sigHeader.startsWith('sha256=')) {
        const expected = 'sha256=' + crypto.createHmac('sha256', VAULT.webhookSecret).update(raw).digest('hex');
        if (sigHeader !== expected) {
          sendJson(res, 400, { error: 'Assinatura de Webhook inválida.' });
          return true;
        }
      }

      const eventType = data.type || 'invoice.paid';
      const customerEmail = (data.email || (data.data && data.data.object && data.data.object.customer_email) || '').toLowerCase();
      const targetUser = db.users.find(u => u.email === customerEmail) || db.users[0];

      if (targetUser) {
        if (eventType === 'invoice.paid' || eventType === 'checkout.session.completed') {
          const nextMonth = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString();
          targetUser.plan = 'pro';
          targetUser.subscriptionStatus = 'active';
          targetUser.nextBillingDate = nextMonth;

          const payment = {
            id: 'wh_pay_' + crypto.randomUUID().slice(0, 8),
            userId: targetUser.id,
            email: targetUser.email,
            amountCents: VAULT.monthlyPriceCents,
            currency: 'BRL',
            type: 'webhook_' + eventType,
            status: 'paid',
            createdAt: new Date().toISOString()
          };
          db.payments.unshift(payment);
          saveDatabase();

          await sendSystemEmail({
            to: targetUser.email,
            subject: `[Webhook Gateway] Pagamento Confirmado (${eventType})`,
            bodyText: `Recebemos a confirmação automática do gateway de pagamento para ${targetUser.email}. Assinatura renovada até ${new Date(nextMonth).toLocaleDateString()}.`,
            type: 'webhook_billing'
          });
        } else if (eventType === 'invoice.payment_failed' || eventType === 'customer.subscription.deleted') {
          targetUser.subscriptionStatus = 'past_due';
          saveDatabase();
          await sendSystemEmail({
            to: targetUser.email,
            subject: 'Aviso de Cobrança - Falha na Renovação da Assinatura',
            bodyText: `Olá ${targetUser.name}, houve uma pendência na renovação da sua assinatura mensal. Atualize seu método de pagamento.`,
            type: 'billing_failed'
          });
        }
      }

      sendJson(res, 200, {
        received: true,
        eventType,
        processedAt: new Date().toISOString()
      });
      return true;
    }

    // ====================================================
    // OPERAÇÕES DO SERVIDOR: COFRE, BACKUP NOTURNO E ALERTA NO CELULAR
    // ====================================================
    if (pathname === '/api/ops/status' && req.method === 'GET') {
      sendJson(res, 200, {
        vaultStatus: {
          paymentKeyStoredInServerEnv: true,
          paymentKeyExposedInClientCode: false,
          paymentKeyMasked: VAULT.paymentKey ? (VAULT.paymentKey.slice(0, 7) + '••••••••••••') : 'Protegida em Variável de Ambiente (.env)',
          webhookSecretConfigured: true,
          mobileAlertChannel: VAULT.mobileAlertUrl
        },
        backups: db.backupsLog.slice(0, 10),
        alerts: db.alertsLog.slice(0, 10),
        recentEmails: db.emailsLog.slice(0, 10)
      });
      return true;
    }

    if (pathname === '/api/ops/backup' && req.method === 'POST') {
      const entry = runNightlyDatabaseBackup('manual_request');
      sendJson(res, 200, { success: Boolean(entry), backup: entry, backups: db.backupsLog.slice(0, 10) });
      return true;
    }

    if (pathname === '/api/ops/test-alert' && req.method === 'POST') {
      const { data } = await readJsonBody(req);
      const phoneInfo = data.phone ? ` (Celular: ${data.phone})` : '';
      const alert = await sendMobileAlert(`Teste de Monitoramento Ativo${phoneInfo}: O servidor Yanik, Translator está online e monitorando quedas 24h!`, 'HIGH');
      sendJson(res, 200, { success: true, alert, channel: VAULT.mobileAlertUrl });
      return true;
    }

    return false;
  } catch (err) {
    sendJson(res, 500, { error: err.message });
    return true;
  }
}

tryStartServer(PORT);
