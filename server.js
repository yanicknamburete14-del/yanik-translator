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

/**
 * Tradução ultra-rápida via Google Translate (client=dict-chrome-ex) com keep-alive (~80-150ms)
 */
function translateText(text, fromLang = 'auto', toLang = 'pt') {
  if (!text || !text.trim()) return Promise.resolve('');
  const trimmed = text.trim();
  const normFrom = getGoogleLangCode(fromLang);
  const normTo = getGoogleLangCode(toLang);

  if (normFrom === normTo && normFrom !== 'auto') {
    return Promise.resolve(trimmed);
  }

  const cacheKey = `${normFrom}->${normTo}:${trimmed}`;
  if (translationCache.has(cacheKey)) {
    return Promise.resolve(translationCache.get(cacheKey));
  }

  return new Promise((resolve) => {
    // Usa endpoint translate.google.com (latência comprovada de ~100-150ms)
    const url = `https://translate.google.com/translate_a/single?client=dict-chrome-ex&sl=${normFrom}&tl=${normTo}&dt=t&q=${encodeURIComponent(trimmed)}`;
    
    const req = https.get(url, {
      agent: httpsAgent,
      family: 4,
      timeout: 3800,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': '*/*'
      }
    }, (res) => {
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        try {
          const raw = Buffer.concat(chunks).toString('utf8');
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && Array.isArray(parsed[0])) {
            const translated = parsed[0].map(item => (item && item[0]) ? item[0] : '').join('').trim();
            if (translated) {
              if (translationCache.size > 10000) {
                const first = translationCache.keys().next().value;
                translationCache.delete(first);
              }
              translationCache.set(cacheKey, translated);
              return resolve(translated);
            }
          }
          throw new Error('Resposta vazia');
        } catch (e) {
          // Fallback rápido com client=gtx
          translateGoogleFallback(trimmed, normFrom, normTo)
            .then(res => {
              if (res && res !== trimmed) translationCache.set(cacheKey, res);
              resolve(res);
            })
            .catch(() => {
              translateMyMemory(trimmed, normFrom, normTo)
                .then(res => {
                  if (res && res !== trimmed) translationCache.set(cacheKey, res);
                  resolve(res);
                })
                .catch(() => resolve(trimmed));
            });
        }
      });
    });

    req.on('error', () => {
      translateGoogleFallback(trimmed, normFrom, normTo)
        .then(res => {
          if (res && res !== trimmed) translationCache.set(cacheKey, res);
          resolve(res);
        })
        .catch(() => resolve(trimmed));
    });

    req.on('timeout', () => {
      req.destroy();
      resolve(trimmed);
    });
  });
}

function translateGoogleFallback(text, from, to) {
  return new Promise((resolve, reject) => {
    const url = `https://translate.google.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
    https.get(url, { agent: httpsAgent, family: 4, timeout: 3500 }, (res) => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(Buffer.concat(chunks).toString('utf8'));
          if (Array.isArray(parsed) && Array.isArray(parsed[0])) {
            const translated = parsed[0].map(item => (item && item[0]) ? item[0] : '').join('').trim();
            if (translated) return resolve(translated);
          }
          reject(new Error('Falha no fallback'));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function translateMyMemory(text, from, to) {
  return new Promise((resolve, reject) => {
    const fromCode = from === 'auto' ? 'pt' : from;
    const memoryUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromCode}|${to}`;
    https.get(memoryUrl, { timeout: 4500 }, (res) => {
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        try {
          const raw = Buffer.concat(chunks).toString('utf8');
          const parsed = JSON.parse(raw);
          if (parsed && parsed.responseData && parsed.responseData.translatedText) {
            resolve(parsed.responseData.translatedText);
          } else {
            reject(new Error('Falha no MyMemory'));
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

/**
 * MIME Types dos arquivos estáticos
 */
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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

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
          isInterim = false
        } = payload;

        if (!text || !text.trim()) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ error: 'Texto não informado' }));
          return;
        }

        const room = getRoom(roomId.toUpperCase());
        const cleanedText = text.trim();
        const msgId = payload.id || crypto.randomUUID();
        const timestamp = new Date().toISOString();

        // Identifica todos os idiomas demandados pelos ouvintes na sala
        const neededLanguages = new Set();
        for (const sub of room.subscribers) {
          if (sub.lang) {
            neededLanguages.add(sub.lang.split('-')[0].toLowerCase());
          }
        }
        const normSource = sourceLang.split('-')[0].toLowerCase();
        neededLanguages.add(normSource);

        const translationsByLang = {};
        translationsByLang[normSource] = cleanedText;

        if (isInterim) {
          // Para legendas em tempo real (interim streaming), responde em sub-segundo sem travar o SSE
          const interimPromises = Array.from(neededLanguages)
            .filter(targetLang => targetLang !== normSource)
            .map(async (targetLang) => {
              const cacheKey = `${normSource}->${targetLang}:${cleanedText}`;
              if (translationCache.has(cacheKey)) {
                translationsByLang[targetLang] = translationCache.get(cacheKey);
              } else {
                try {
                  const quickPromise = translateText(cleanedText, normSource, targetLang);
                  const timeoutPromise = new Promise(r => setTimeout(() => r(cleanedText), 150));
                  translationsByLang[targetLang] = await Promise.race([quickPromise, timeoutPromise]);
                } catch (e) {
                  translationsByLang[targetLang] = cleanedText;
                }
              }
            });
          await Promise.all(interimPromises);
        } else {
          // Para frases finalizadas, executa tradução de alta prioridade
          const translationPromises = Array.from(neededLanguages)
            .filter(targetLang => targetLang !== normSource)
            .map(async (targetLang) => {
              try {
                const trans = await translateText(cleanedText, normSource, targetLang);
                translationsByLang[targetLang] = trans;
              } catch (e) {
                translationsByLang[targetLang] = cleanedText;
              }
            });
          await Promise.all(translationPromises);
        }

        const messageObject = {
          id: msgId,
          timestamp,
          senderRole,
          senderName,
          sourceLang: normSource,
          originalText: cleanedText,
          isInterim: !!isInterim,
          translations: translationsByLang
        };

        if (!isInterim) {
          room.history.push(messageObject);
          if (room.history.length > 200) room.history.shift();
        }

        // Distribui para cada inscrito na sala no seu respectivo idioma
        for (const sub of room.subscribers) {
          try {
            const subNormLang = (sub.lang || 'pt').split('-')[0].toLowerCase();
            const translatedForSub = translationsByLang[subNormLang] || cleanedText;

            const packet = JSON.stringify({
              type: 'speech',
              id: msgId,
              senderClientId: payload.clientId || null,
              timestamp,
              senderRole,
              senderName,
              sourceLang: normSource,
              targetLang: subNormLang,
              originalText: cleanedText,
              translatedText: translatedForSub,
              isInterim: !!isInterim
            });

            sub.res.write(`data: ${packet}\n\n`);
          } catch (err) {}
        }

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true, id: msgId, translations: translationsByLang }));
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
        for (const sub of room.subscribers) {
          if (sub.id === clientId) {
            sub.lang = lang;
            break;
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

    res.writeHead(200, { 'Content-Type': contentType });
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

tryStartServer(PORT);
