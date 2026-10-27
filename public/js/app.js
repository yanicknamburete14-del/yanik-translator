/**
 * Tradução Universal 100% ILIMITADA (Motor Oficial Google Translate - Zero Limites)
 */
async function translateUniversal(text, fromLang, toLang) {
  if (!text || !text.trim()) return '';
  const trimmed = text.trim();
  const normFrom = getGoogleLangCode(fromLang);
  const normTo = getGoogleLangCode(toLang);

  if (normFrom === normTo && normFrom !== 'auto') {
    return trimmed;
  }

  const cacheKey = `${normFrom}->${normTo}:${trimmed}`;
  if (clientTranslationCache.has(cacheKey)) {
    const cached = clientTranslationCache.get(cacheKey);
    if (cached && !cached.includes('MYMEMORY') && !cached.includes('WARNING')) {
      return cached;
    }
    clientTranslationCache.delete(cacheKey);
  }

  // 1. Prioridade 1: API do Servidor Central (multi-endpoint Google com IPv4 keep-alive)
  if (state.isServerConnected && !state.isFileProtocol) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: trimmed, from: normFrom, to: normTo }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        if (data.translated && data.translated.trim()) {
          const trans = data.translated.trim();
          if (!trans.includes('MYMEMORY') && !trans.includes('WARNING')) {
            clientTranslationCache.set(cacheKey, trans);
            return trans;
          }
        }
      }
    } catch (e) {}
  }

  // 2. Prioridade 2: Google Chrome CDN direto pelo navegador (clients5.google.com)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);
    const cUrl = `https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=${normFrom}&tl=${normTo}&q=${encodeURIComponent(trimmed)}`;
    const res = await fetch(cUrl, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      let trans = '';
      if (Array.isArray(data) && typeof data[0] === 'string') trans = data[0].trim();
      else if (Array.isArray(data) && Array.isArray(data[0])) trans = data[0].map(x => x[0]).join('').trim();
      if (trans && !trans.includes('MYMEMORY') && !trans.includes('WARNING')) {
        clientTranslationCache.set(cacheKey, trans);
        return trans;
      }
    }
  } catch (err) {}

  // 3. Prioridade 3: Google Translate (client=dict-chrome-ex)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);
    const url = `https://translate.google.com/translate_a/single?client=dict-chrome-ex&sl=${normFrom}&tl=${normTo}&dt=t&q=${encodeURIComponent(trimmed)}`;
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && Array.isArray(data[0])) {
        const trans = data[0].map(item => (item && item[0]) ? item[0] : '').join('').trim();
        if (trans && !trans.includes('MYMEMORY') && !trans.includes('WARNING')) {
          clientTranslationCache.set(cacheKey, trans);
          return trans;
        }
      }
    }
  } catch (err) {}

  // 4. Prioridade 4: Google Translate (client=it - iOS app endpoint)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);
    const url = `https://translate.google.com/translate_a/single?client=it&sl=${normFrom}&tl=${normTo}&dt=t&q=${encodeURIComponent(trimmed)}`;
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && Array.isArray(data[0])) {
        const trans = data[0].map(item => (item && item[0]) ? item[0] : '').join('').trim();
        if (trans && !trans.includes('MYMEMORY') && !trans.includes('WARNING')) {
          clientTranslationCache.set(cacheKey, trans);
          return trans;
        }
      }
    }
  } catch (err) {}

  return trimmed;
}

// ========================================================
// 4. RECEPÇÃO E REPRODUÇÃO DE FALA (COM DEDUPLICAÇÃO)
// ========================================================
function normalizeSpeechText(text) {
  if (!text) return '';
  return String(text)
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[\.,\/#!$%\^&\*;:{}=\-_`~()?'"“”‘’…—–]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const processedSpeechIds = new Set();
let lastFinalizedSpeechKey = '';
let lastFinalizedSpeechTime = 0;

async function handleIncomingSpeech(data) {
  if (!data) return;

  // 1. Deduplicação por ID de mensagem única (descarta entrega dupla SSE + BroadcastChannel)
  if (data.id) {
    if (processedSpeechIds.has(data.id)) {
      return;
    }
    processedSpeechIds.add(data.id);
    if (processedSpeechIds.size > 500) {
      const first = processedSpeechIds.values().next().value;
      processedSpeechIds.delete(first);
    }
  }

  // 2. Deduplicação por conteúdo na janela temporal de 3.5s (evita duplicatas de finalização)
  if (!data.isInterim) {
    const normOriginal = normalizeSpeechText(data.originalText || '');
    const now = Date.now();
    const speechKey = `${data.senderRole || ''}:${normOriginal}`;
    if (normOriginal && speechKey === lastFinalizedSpeechKey && (now - lastFinalizedSpeechTime) < 3500) {
      return;
    }
    lastFinalizedSpeechKey = speechKey;
    lastFinalizedSpeechTime = now;
  }

    let translatedForCurrent = (data.translatedText || '').trim();
  const targetCode = state.activeTab === 'student' ? state.studentTargetLang : state.teacherLang;
  if (!targetCode) {
    if (state.activeTab === 'student') {
      const captionEl = document.getElementById('student-live-text');
      if (captionEl) {
        captionEl.innerHTML = '<span style="color: #f59e0b; font-weight: 600;">⚠️ Por favor, selecione seu idioma acima para ouvir e ler a tradução da aula.</span>';
      }
      openInitialLanguageModal('student');
    }
    return;
  }
  const normTarget = getGoogleLangCode(targetCode);
  const normSource = getGoogleLangCode(data.sourceLang);

  // Se o servidor já forneceu a tradução pré-calculada para este idioma no SSE broadcast
  if (data.translations && data.translations[normTarget]) {
    translatedForCurrent = data.translations[normTarget];
  }

  // Se a tradução veio vazia ou veio igual ao texto original quando os idiomas são distintos, traduz imediatamente
  const isUntranslated = !translatedForCurrent || (normSource !== normTarget && translatedForCurrent.toLowerCase() === (data.originalText || '').trim().toLowerCase());

  if (isUntranslated || (data.targetLang && getGoogleLangCode(data.targetLang) !== normTarget)) {
    translatedForCurrent = await translateUniversal(data.originalText, data.sourceLang, targetCode);
  }

  if (data.senderRole === 'teacher' && !data.isInterim) {
    window.lastStudentSpeech = {
      originalText: data.originalText,
      sourceLang: data.sourceLang,
      translations: data.translations || {},
      senderName: data.senderName
    };
    if (window.lastStudentSpeech.translations) {
      window.lastStudentSpeech.translations[normTarget] = translatedForCurrent;
    }
  }

  // 1. Atualiza modo Aluno
  if (state.activeTab === 'student') {
    const captionEl = document.getElementById('student-live-text');
    const sourceBadge = document.getElementById('student-source-badge');
    
    if (captionEl) {
      if (data.isInterim) {
        captionEl.innerHTML = `<span style="opacity: 0.95;">${escapeHtml(translatedForCurrent)}</span><span class="typing-cursor"></span>`;
      } else {
        captionEl.textContent = translatedForCurrent;
      }
    }

    if (sourceBadge) {
      if (data.isInterim) {
        sourceBadge.innerHTML = `🔴 <strong style="color: #ef4444;">Traduzindo fala em tempo real...</strong> (${data.sourceLang.toUpperCase()} → ${targetCode.toUpperCase()})`;
      } else {
        sourceBadge.innerHTML = `✓ <strong>${data.senderName}</strong> (${data.sourceLang.toUpperCase()} → ${targetCode.toUpperCase()})`;
        sourceBadge.style.color = '';
      }
    }

    if (!data.isInterim) {
      if (state.autoSpeak) {
        speakText(translatedForCurrent, targetCode);
      }
      appendStudentFeed({ ...data, translatedText: translatedForCurrent, targetLang: targetCode });
    }
  }

  // 2. Atualiza modo Professor
  if (state.activeTab === 'teacher') {
    if (data.senderRole === 'student' && !data.isInterim) {
      showTeacherQuestionAlert({ ...data, translatedText: translatedForCurrent });
      if (state.autoSpeak) {
        speakText(translatedForCurrent, state.teacherLang);
      }
    }

    if (!data.isInterim) {
      appendTeacherFeed(data);
    }
  }

  if (!data.isInterim) {
    appendToHistory(data, true);
  }
}

function showTeacherQuestionAlert(data) {
  const container = document.getElementById('teacher-alert-box');
  if (!container) return;

  container.style.display = 'block';
  container.innerHTML = `
    <div class="alert-banner">
      <div>
        <strong>🙋 Pergunta de ${escapeHtml(data.senderName)} (${data.sourceLang.toUpperCase()}):</strong>
        <p style="margin-top: 4px; font-size: 1.05rem;">"${escapeHtml(data.translatedText)}"</p>
        <small style="color: var(--text-muted); font-style: italic;">Original: "${escapeHtml(data.originalText)}"</small>
      </div>
      <button class="btn btn-secondary" onclick="speakText('${escapeQuotes(data.translatedText)}', '${state.teacherLang}')">🔊 Ouvir</button>
    </div>
  `;
}

// ========================================================
// 5. RECONHECIMENTO DE FALA (SPEECH-TO-TEXT)
// ========================================================
function initSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.warn('Reconhecimento de fala nativo não suportado. Utilize o Chrome, Edge ou Safari.');
    return;
  }

  state.recognition = new SpeechRecognition();
  state.recognition.continuous = true;
  state.recognition.interimResults = true;
  state.recognition.maxAlternatives = 1;

  state.recognition.onstart = () => {
    updateMicVisuals(true);
  };

  state.recognition.onerror = (event) => {
    console.error('Erro de reconhecimento de fala:', event.error);
    if (event.error === 'not-allowed') {
      alert('Permissão de microfone negada. Autorize o microfone nas permissões do navegador.');
    }
    updateMicVisuals(false);
  };

  state.recognition.onend = () => {
    if (isRestartingRecognition) {
      return;
    }
    if (state.isRecordingTeacher) {
      try {
        state.recognition.lang = getBcp47(state.teacherLang);
        state.recognition.start();
      } catch (e) {
        updateMicVisuals(false);
      }
    } else {
      updateMicVisuals(false);
    }
  };

  state.recognition.onresult = (event) => {
    let interimTranscript = '';
    let finalTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript;
      } else {
        interimTranscript += transcript;
      }
    }

    if (state.isRecordingTeacher) {
      handleTeacherSpeechResult(finalTranscript, interimTranscript);
    } else if (state.isRecordingStudent) {
      handleStudentSpeechResult(finalTranscript, interimTranscript);
    } else if (state.isRecordingDiagA || state.isRecordingDiagB) {
      handleDialogueSpeechResult(finalTranscript, interimTranscript);
    }
  };
}

let isRestartingRecognition = false;
let interimBroadcastTimer = null;
let lastBroadcastInterimText = '';
let pauseDetectorTimer = null;
let lastFinalizedSpeechNorm = '';
let lastFinalizedTime = 0;

async function handleTeacherSpeechResult(finalText, interimText) {
  const interimBox = document.getElementById('teacher-interim-box');

  // Streaming instantâneo de legendas em tempo real (25ms - digitação simultânea)
  if (interimText && interimText.trim()) {
    const trimmedInterim = interimText.trim();
    if (interimBox) {
      interimBox.style.display = 'block';
      interimBox.innerHTML = `🎙️ <em>${escapeHtml(trimmedInterim)}</em><span class="typing-cursor"></span>`;
    }

    if (trimmedInterim !== lastBroadcastInterimText) {
      clearTimeout(interimBroadcastTimer);
      interimBroadcastTimer = setTimeout(() => {
        lastBroadcastInterimText = trimmedInterim;
        processAndBroadcastSpeech({
          roomId: state.roomId,
          senderRole: 'teacher',
          senderName: 'Professor',
          text: trimmedInterim,
          sourceLang: state.teacherLang,
          isInterim: true
        });
      }, 25);
    }

    // Detector de pausa de finalização rápida (< 500ms para fala simultânea)
    const hasPunctuation = /[.,?!;:]$/.test(trimmedInterim);
    const delay = hasPunctuation ? 180 : 480;

    clearTimeout(pauseDetectorTimer);
    pauseDetectorTimer = setTimeout(() => {
      const normInterim = normalizeSpeechText(trimmedInterim);
      if (normInterim && normInterim !== lastFinalizedSpeechNorm && (Date.now() - lastFinalizedTime > 1200)) {
        lastFinalizedSpeechNorm = normInterim;
        lastFinalizedTime = Date.now();
        if (interimBox) interimBox.style.display = 'none';
        processAndBroadcastSpeech({
          roomId: state.roomId,
          senderRole: 'teacher',
          senderName: 'Professor',
          text: trimmedInterim,
          sourceLang: state.teacherLang,
          isInterim: false
        });
      }
    }, delay);
  }

  // Finalização nativa pelo motor de fala do navegador (isFinal: true)
  if (finalText && finalText.trim()) {
    clearTimeout(pauseDetectorTimer);
    clearTimeout(interimBroadcastTimer);
    const trimmedFinal = finalText.trim();
    const normFinal = normalizeSpeechText(trimmedFinal);

    if (interimBox) interimBox.style.display = 'none';

    // Se já foi finalizado recentemente (pelo detector de pausa ou eco de voz), descarta
    if (normFinal && normFinal === lastFinalizedSpeechNorm && (Date.now() - lastFinalizedTime < 2000)) {
      return;
    }

    lastFinalizedSpeechNorm = normFinal;
    lastFinalizedTime = Date.now();

    processAndBroadcastSpeech({
      roomId: state.roomId,
      senderRole: 'teacher',
      senderName: 'Professor',
      text: trimmedFinal,
      sourceLang: state.teacherLang,
      isInterim: false
    });
  }
}

let lastStudentFinalizedNorm = '';
let lastStudentFinalizedTime = 0;

async function handleStudentSpeechResult(finalText, interimText) {
  const preview = document.getElementById('student-question-preview');
  if (interimText && interimText.trim() && preview) {
    preview.textContent = `🎙️ Ouvindo: "${interimText}"...`;
  }

  if (finalText && finalText.trim()) {
    const trimmed = finalText.trim();
    const norm = normalizeSpeechText(trimmed);
    const now = Date.now();
    if (norm && norm === lastStudentFinalizedNorm && (now - lastStudentFinalizedTime < 3500)) {
      return;
    }
    lastStudentFinalizedNorm = norm;
    lastStudentFinalizedTime = now;

    if (preview) preview.textContent = `✓ Enviando pergunta: "${trimmed}"`;
    
    processAndBroadcastSpeech({
      roomId: state.roomId,
      senderRole: 'student',
      senderName: `Aluno (${state.studentSpeakLang.toUpperCase()})`,
      text: trimmed,
      sourceLang: state.studentSpeakLang,
      isInterim: false
    });

    setTimeout(() => {
      stopRecording();
      if (preview) preview.textContent = '';
    }, 1000);
  }
}

function processAndBroadcastSpeech(payload) {
  const cleanedText = (payload.text || '').trim();
  if (!cleanedText) return;

  const msgId = payload.id || ('msg-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8));
  const targetLang = payload.senderRole === 'teacher' ? state.studentTargetLang : state.teacherLang;

  const outgoingPayload = {
    ...payload,
    id: msgId,
    clientId: state.clientId,
    text: cleanedText
  };

  // 1. Envia ao servidor central (se conectado)
  if (state.isServerConnected && !state.isFileProtocol) {
    try {
      fetch('/api/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(outgoingPayload)
      }).catch(() => {});
    } catch (e) {}
  }

  // 2. Se for modo Offline ou Direto (sem servidor), usamos o BroadcastChannel e execução local
  if (!state.isServerConnected || state.isFileProtocol) {
    translateUniversal(cleanedText, payload.sourceLang, targetLang).then((translated) => {
      const packet = {
        id: msgId,
        timestamp: new Date().toISOString(),
        senderRole: payload.senderRole,
        senderName: payload.senderName,
        sourceLang: payload.sourceLang,
        targetLang: targetLang,
        originalText: cleanedText,
        translatedText: translated,
        isInterim: !!payload.isInterim
      };

      if (state.localChannel) {
        try { state.localChannel.postMessage(packet); } catch (e) {}
      }

      handleIncomingSpeech(packet);
    });
  }
}

// ========================================================
// 6. SÍNTESE DE VOZ (FILA DE ÁUDIO HD CONTÍNUA E DEDUPLICADA)
// ========================================================
const audioQueue = [];
let isAudioProcessing = false;
let currentAudioElement = null;
let lastSpokenTextNorm = '';
let lastSpokenTimestamp = 0;

function setupSpeechSynthesis() {
  if (!('speechSynthesis' in window)) return;

  const loadVoices = () => {
    state.availableVoices = window.speechSynthesis.getVoices();
  };

  loadVoices();
  if (window.speechSynthesis && window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }
}

function speakText(text, langCode) {
  if (!text || !text.trim()) return;
  const cleaned = text.trim();
  const normCleaned = normalizeSpeechText(cleaned);
  const now = Date.now();

  // Previne repetição imediata da mesma frase (< 3.5 segundos)
  if (normCleaned && normCleaned === lastSpokenTextNorm && (now - lastSpokenTimestamp < 3500)) {
    return;
  }

  // Previne repetição se a mesma frase já estiver aguardando na fila de áudio
  if (normCleaned && audioQueue.some(item => (item.norm || normalizeSpeechText(item.text)) === normCleaned)) {
    return;
  }

  if (audioQueue.length > 5) {
    audioQueue.shift();
  }

  audioQueue.push({ text: cleaned, lang: langCode, norm: normCleaned });

  if (!isAudioProcessing) {
    processNextAudioQueue();
  }
}

function findBestMaleVoice(targetBcp47) {
  if (!state.availableVoices || state.availableVoices.length === 0) {
    if ('speechSynthesis' in window) {
      state.availableVoices = window.speechSynthesis.getVoices();
    }
  }
  const voices = state.availableVoices || [];
  if (voices.length === 0) return null;

  const targetLangLower = (targetBcp47 || '').toLowerCase();
  const prefix = targetLangLower.split('-')[0];

  // Vozes compatíveis com o idioma alvo
  const langVoices = voices.filter(v => {
    const vLang = (v.lang || '').toLowerCase();
    return vLang === targetLangLower || vLang.startsWith(prefix);
  });

  const maleKeywords = [
    'male', 'homem', 'masculin', 'david', 'daniel', 'jorge', 'antonio', 'guy',
    'thomas', 'george', 'paul', 'stefan', 'nicolas', 'alvares', 'mark', 'brian',
    'tom', 'helmut', 'alex', 'reed', 'alberto', 'ricardo', 'felipe', 'carlos',
    'enrique', 'pablo', 'sergio', 'pedro', 'manuel', 'marcos'
  ];
  const femaleKeywords = [
    'female', 'mulher', 'femin', 'maria', 'francisca', 'helena', 'luciana',
    'victoria', 'zira', 'samantha', 'karen', 'monica', 'alice', 'catherine',
    'anna', 'laura', 'yuri', 'fabiola', 'claudia', 'camila'
  ];

  // 1. Voz no idioma com nome masculino explícito
  const maleLangVoice = langVoices.find(v => {
    const name = (v.name || '').toLowerCase();
    return maleKeywords.some(kw => name.includes(kw));
  });
  if (maleLangVoice) return maleLangVoice;

  // 2. Voz no idioma que NÃO seja explicitamente feminina
  const nonFemaleLangVoice = langVoices.find(v => {
    const name = (v.name || '').toLowerCase();
    return !femaleKeywords.some(kw => name.includes(kw));
  });
  if (nonFemaleLangVoice) return nonFemaleLangVoice;

  // 3. Qualquer voz do idioma
  if (langVoices.length > 0) return langVoices[0];

  // 4. Se não houver voz para o idioma, tenta qualquer voz masculina instalada
  const globalMale = voices.find(v => {
    const name = (v.name || '').toLowerCase();
    return maleKeywords.some(kw => name.includes(kw));
  });
  return globalMale || null;
}

function processNextAudioQueue() {
  if (audioQueue.length === 0) {
    isAudioProcessing = false;
    updateAudioPlayingVisual(false);
    return;
  }

  isAudioProcessing = true;
  updateAudioPlayingVisual(true);

  const item = audioQueue.shift();
  lastSpokenTextNorm = item.norm || normalizeSpeechText(item.text);
  lastSpokenTimestamp = Date.now();

  let ended = false;
  const next = () => {
    if (ended) return;
    ended = true;
    processNextAudioQueue();
  };

  // PRIORIZA SÍNTESE NATIVA DO NAVEGADOR COM VOZ DE HOMEM (LATÊNCIA ZERO E INSTANTÂNEA)
  if ('speechSynthesis' in window) {
    speakWithBrowserSpeechSynthesis(item.text, item.lang, next);
  } else {
    playFallbackAudioElement(item.text, item.lang, next);
  }
}

function playFallbackAudioElement(text, langCode, next) {
  const normLang = (langCode || 'pt').split('-')[0].toLowerCase();
  let ttsUrl = '';
  if (state.isServerConnected && !state.isFileProtocol) {
    ttsUrl = `/api/tts?text=${encodeURIComponent(text)}&lang=${normLang}`;
  } else {
    ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${normLang}&client=tw-ob`;
  }

  const audio = new Audio();
  currentAudioElement = audio;
  audio.playbackRate = state.speechRate || 1.0;
  audio.volume = state.speechVolume || 1.0;
  audio.onended = next;
  audio.onerror = next;
  audio.src = ttsUrl;

  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      state.audioUnlocked = true;
      hideAudioUnlockBanner();
    }).catch(() => {
      next();
    });
  }
}

function speakWithBrowserSpeechSynthesis(text, langCode, onDone) {
  if (!('speechSynthesis' in window)) {
    if (onDone) onDone();
    return;
  }

  try {
    window.speechSynthesis.resume();
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const targetBcp47 = getBcp47(langCode);
    utterance.lang = targetBcp47;
    utterance.rate = state.speechRate || 1.0;
    utterance.volume = state.speechVolume || 1.0;
    
    // TIMBRE DE HOMEM: Pitch 0.82 produz modulação vocal masculina grave e encorpada
    utterance.pitch = 0.82;

    const matchedVoice = findBestMaleVoice(targetBcp47);
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      if (onDone) onDone();
    };

    utterance.onend = finish;
    utterance.onerror = finish;

    // Timeout de salvaguarda caso o navegador não emita onend
    setTimeout(finish, Math.max(3000, text.length * 150));

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    if (onDone) onDone();
  }
}

function updateAudioPlayingVisual(isPlaying) {
  const badge = document.getElementById('student-source-badge');
  if (badge) {
    if (isPlaying) {
      badge.setAttribute('data-orig-text', badge.textContent);
      badge.textContent = `🔊 Reproduzindo áudio em voz alta...`;
      badge.style.color = '#38bdf8';
    } else {
      const orig = badge.getAttribute('data-orig-text');
      if (orig) badge.textContent = orig;
      badge.style.color = '';
    }
  }
}

function showAudioUnlockBanner() {
  const banner = document.getElementById('audio-unlock-banner');
  if (banner) banner.style.display = 'flex';
}

function hideAudioUnlockBanner() {
  const banner = document.getElementById('audio-unlock-banner');
  if (banner) banner.style.display = 'none';
}

function unlockMobileAudio(showAlert = true) {
  state.audioUnlocked = true;
  hideAudioUnlockBanner();

  const phrases = {
    hi: "नमस्ते! आवाज़ चालू कर दी गई है।",
    pt: "Áudio ativado com sucesso!",
    en: "Audio enabled successfully!",
    fr: "Audio activé avec succès!",
    es: "¡Audio activado con éxito!",
    de: "Audio erfolgreich aktiviert!",
    ar: "تم تفعيل الصوت بنجاح!",
    "zh-CN": "音频已成功开启！",
    ru: "Звук успешно активирован!"
  };
  const testPhrase = phrases[state.studentTargetLang] || phrases[state.studentTargetLang.split('-')[0]] || phrases.pt;
  speakText(testPhrase, state.studentTargetLang);

  if (showAlert) {
    const t = UI_TRANSLATIONS[state.uiLang] || UI_TRANSLATIONS['pt'];
    alert('✓ ' + (t.unlock_audio_title || 'Áudio ativado com sucesso!'));
  }
}

// ========================================================
// 7. MODO DIÁLOGO 1-PARA-1 (BILATERAL)
// ========================================================
async function handleDialogueSpeechResult(finalText, interimText) {
  if (!finalText || !finalText.trim()) return;

  const isSideA = state.isRecordingDiagA;
  const fromLang = isSideA ? state.diagLangA : state.diagLangB;
  const toLang = isSideA ? state.diagLangB : state.diagLangA;

  const translated = await translateUniversal(finalText.trim(), fromLang, toLang);
  renderDialogueBubble(isSideA, finalText.trim(), translated);
  
  if (state.autoSpeak) {
    speakText(translated, toLang);
  }
}

function renderDialogueBubble(isSideA, original, translated) {
  const container = document.getElementById('dialogue-messages');
  if (!container) return;

  const bubble = document.createElement('div');
  bubble.className = `bubble ${isSideA ? 'me' : 'other'}`;
  bubble.innerHTML = `
    <div style="font-size: 0.72rem; opacity: 0.8; margin-bottom: 2px;">
      ${isSideA ? '👤 Lado A' : '👤 Lado B'}
    </div>
    <div style="font-weight: 600; font-size: 1.05rem;">${escapeHtml(translated)}</div>
    <div style="font-size: 0.78rem; opacity: 0.85; margin-top: 4px; font-style: italic;">Original: ${escapeHtml(original)}</div>
  `;

  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
}

// ========================================================
// 8. EVENT LISTENERS E CONTROLES DE UI
// ========================================================
function setupEventListeners() {
  const teacherMicBtn = document.getElementById('teacher-mic-btn');
  if (teacherMicBtn) {
    teacherMicBtn.addEventListener('click', toggleTeacherRecording);
  }

  const teacherLangSelect = document.getElementById('teacher-lang-select');
  if (teacherLangSelect) {
    teacherLangSelect.addEventListener('change', (e) => {
      onTeacherLanguageChange(e.target.value);
    });
  }

  const studentLangSelect = document.getElementById('student-lang-select');
  if (studentLangSelect) {
    studentLangSelect.addEventListener('change', (e) => {
      onStudentTargetLanguageChange(e.target.value);
    });
  }

  const studentSpeakLangSelect = document.getElementById('student-speak-lang-select');
  if (studentSpeakLangSelect) {
    studentSpeakLangSelect.addEventListener('change', (e) => {
      state.studentSpeakLang = e.target.value;
    });
  }

  const studentQuestionBtn = document.getElementById('student-question-btn');
  if (studentQuestionBtn) {
    studentQuestionBtn.addEventListener('click', toggleStudentRecording);
  }

  const unlockBtn = document.getElementById('unlock-audio-btn');
  if (unlockBtn) {
    unlockBtn.addEventListener('click', () => unlockMobileAudio(true));
  }

  const autoSpeakToggle = document.getElementById('auto-speak-toggle');
  if (autoSpeakToggle) {
    autoSpeakToggle.addEventListener('change', (e) => {
      state.autoSpeak = e.target.checked;
    });
  }

  const speedSelect = document.getElementById('speech-rate-select');
  if (speedSelect) {
    speedSelect.addEventListener('change', (e) => {
      state.speechRate = parseFloat(e.target.value);
    });
  }

  const btnFontSm = document.getElementById('btn-font-sm');
  const btnFontMd = document.getElementById('btn-font-md');
  const btnFontLg = document.getElementById('btn-font-lg');
  const captionBox = document.getElementById('student-caption-box');

  if (captionBox) {
    if (btnFontSm) btnFontSm.onclick = () => setFontSize(captionBox, 'size-sm');
    if (btnFontMd) btnFontMd.onclick = () => setFontSize(captionBox, 'size-md');
    if (btnFontLg) btnFontLg.onclick = () => setFontSize(captionBox, 'size-lg');
  }

  // Modal Projetor de QR Code
  const btnOpenProjector = document.getElementById('btn-open-projector');
  const btnCloseProjector = document.getElementById('btn-close-projector');
  const projectorModal = document.getElementById('projector-modal');

  if (btnOpenProjector && projectorModal) {
    btnOpenProjector.onclick = () => {
      renderQrCode();
      projectorModal.classList.add('active');
    };
  }

  if (btnCloseProjector && projectorModal) {
    btnCloseProjector.onclick = () => {
      projectorModal.classList.remove('active');
    };
  }

  if (projectorModal) {
    projectorModal.onclick = (e) => {
      if (e.target === projectorModal) {
        projectorModal.classList.remove('active');
      }
    };
  }

  // Entrada manual de texto para transmissão rápida
  const manualInput = document.getElementById('manual-teacher-input');
  const manualSendBtn = document.getElementById('manual-send-btn');
  if (manualSendBtn && manualInput) {
    const sendManual = () => {
      const val = manualInput.value.trim();
      if (val) {
        const lang = state.teacherLang || 'pt';
        processAndBroadcastSpeech({
          roomId: state.roomId,
          senderRole: 'teacher',
          senderName: 'Professor',
          text: val,
          sourceLang: lang,
          isInterim: false
        });
        manualInput.value = '';
      }
    };
    manualSendBtn.onclick = sendManual;
    manualInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendManual();
    });
  }

  // Teste de som da voz
  const testAudioBtn = document.getElementById('test-audio-btn');
  if (testAudioBtn) {
    testAudioBtn.onclick = () => {
      if (!state.studentTargetLang) {
        showToast('⚠️ Por favor, selecione seu idioma de tradução primeiro.', 'warning');
        openInitialLanguageModal('student');
        return;
      }
      const phrases = {
        pt: "Olá! O som do Yanik Translator está funcionando perfeitamente.",
        en: "Hello! Yanik Translator audio is working properly.",
        hi: "नमस्ते! यानिक ट्रांसलेटर की आवाज़ ठीक से काम कर रही है।",
        fr: "Bonjour! L'audio de Yanik Translator fonctionne très bien.",
        es: "¡Hola! El audio de Yanik Translator está funcionando perfectamente.",
        de: "Hallo! Der Ton von Yanik Translator funktioniert einwandfrei.",
        it: "Ciao! L'audio di Yanik Translator funziona perfettamente.",
        ar: "مرحبًا! صوت مترجم يانيك يعمل بشكل مثالي.",
        "zh-CN": "你好！Yanik 翻译器音频正常工作。",
        ja: "こんにちは！Yanik Translatorの音声は正常に動作しています。",
        ru: "Здравствуйте! Звук в Yanik Translator работает отлично.",
        ko: "안녕하세요! Yanik Translator 오디오가 정상적으로 작동합니다."
      };
      const phrase = phrases[state.studentTargetLang] || phrases[state.studentTargetLang.split('-')[0]] || phrases.pt;
      speakText(phrase, state.studentTargetLang);
    };
  }

  // Reouvir legenda ao vivo
  const replayBtn = document.getElementById('btn-replay-live-caption');
  if (replayBtn) {
    replayBtn.onclick = () => {
      if (!state.studentTargetLang) {
        showToast('⚠️ Por favor, selecione seu idioma de tradução primeiro.', 'warning');
        openInitialLanguageModal('student');
        return;
      }
      const captionEl = document.getElementById('student-live-text');
      if (captionEl && captionEl.textContent) {
        speakText(captionEl.textContent, state.studentTargetLang);
      }
    };
  }

  const btnChangeRoom = document.getElementById('btn-change-room');
  if (btnChangeRoom) {
    btnChangeRoom.addEventListener('click', () => {
      const roomInput = document.getElementById('room-id-input');
      if (roomInput && roomInput.value.trim()) {
        const newRoom = roomInput.value.trim().toUpperCase();
        joinRoom(newRoom);
        showToast('✓ Conectado à sala ' + newRoom + '!', 'success');
      }
    });
  }

  const btnCopyLink = document.getElementById('btn-copy-link');
  if (btnCopyLink) btnCopyLink.addEventListener('click', copyStudentLink);

  // Modais de Criação e Exploração de Salas de Aula
  const btnOpenCreate = document.getElementById('btn-open-create-room');
  const btnCloseCreate = document.getElementById('btn-close-create-room');
  const btnCancelCreate = document.getElementById('btn-cancel-create-room');
  const createModal = document.getElementById('create-room-modal');

  if (btnOpenCreate) btnOpenCreate.onclick = openCreateRoomModal;
  if (btnCloseCreate) btnCloseCreate.onclick = closeCreateRoomModal;
  if (btnCancelCreate) btnCancelCreate.onclick = closeCreateRoomModal;
  if (createModal) {
    createModal.onclick = (e) => {
      if (e.target === createModal) closeCreateRoomModal();
    };
  }

  const btnGenerateCode = document.getElementById('btn-generate-room-code');
  if (btnGenerateCode) {
    btnGenerateCode.onclick = () => {
      const subj = document.getElementById('create-room-subject').value || 'AULA';
      const prefix = subj.substring(0, 3).toUpperCase();
      const code = prefix + '-' + Math.floor(100 + Math.random() * 900);
      const idInput = document.getElementById('create-room-id');
      if (idInput) idInput.value = code;
    };
  }

  const formCreate = document.getElementById('form-create-room');
  if (formCreate) {
    formCreate.onsubmit = handleCreateRoomSubmit;
  }

  const btnOpenBrowse = document.getElementById('btn-open-browse-rooms');
  const btnCloseBrowse = document.getElementById('btn-close-browse-rooms');
  const browseModal = document.getElementById('browse-rooms-modal');

  if (btnOpenBrowse) btnOpenBrowse.onclick = openBrowseRoomsModal;
  if (btnCloseBrowse) btnCloseBrowse.onclick = closeBrowseRoomsModal;
  if (browseModal) {
    browseModal.onclick = (e) => {
      if (e.target === browseModal) closeBrowseRoomsModal();
    };
  }

  const btnRefreshRooms = document.getElementById('btn-refresh-rooms');
  if (btnRefreshRooms) {
    btnRefreshRooms.onclick = () => {
      fetchAvailableRooms();
    };
  }

  const inputSearchRooms = document.getElementById('input-search-rooms');
  if (inputSearchRooms) {
    inputSearchRooms.addEventListener('input', (e) => {
      state.roomSearchQuery = e.target.value;
      renderRoomCardsList();
    });
  }

  document.querySelectorAll('.room-filter-chips .chip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.room-filter-chips .chip-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.roomFilterSubject = btn.getAttribute('data-filter') || 'all';
      renderRoomCardsList();
    });
  });

  const btnManualJoin = document.getElementById('btn-manual-join-room');
  const inputManualJoin = document.getElementById('manual-student-room-code');
  if (btnManualJoin && inputManualJoin) {
    const doManualJoin = () => {
      const code = inputManualJoin.value.trim().toUpperCase();
      if (code) {
        joinRoomFromBrowser(code);
      }
    };
    btnManualJoin.onclick = doManualJoin;
    inputManualJoin.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') doManualJoin();
    });
  }

  const btnClearHistory = document.getElementById('btn-clear-history');
  if (btnClearHistory) {
    btnClearHistory.addEventListener('click', () => {
      if (confirm('Deseja limpar as transcrições da tela?')) {
        document.getElementById('teacher-feed').innerHTML = '';
        document.getElementById('student-feed').innerHTML = '';
      }
    });
  }

  const btnExport = document.getElementById('btn-export-transcript');
  if (btnExport) btnExport.addEventListener('click', exportTranscriptFile);

  const micDiagA = document.getElementById('mic-diag-a');
  const micDiagB = document.getElementById('mic-diag-b');
  if (micDiagA) micDiagA.onclick = () => toggleDiagRecording('A');
  if (micDiagB) micDiagB.onclick = () => toggleDiagRecording('B');
}

function setFontSize(el, sizeClass) {
  el.classList.remove('size-sm', 'size-md', 'size-lg', 'size-projector');
  el.classList.add(sizeClass);
}

function toggleTeacherRecording() {
  if (state.isRecordingTeacher) {
    stopRecording();
  } else {
    if (!state.teacherLang) {
      showToast('⚠️ Por favor, selecione seu idioma de fala antes de iniciar a aula.', 'warning');
      openInitialLanguageModal('teacher');
      return;
    }
    stopRecording();
    state.isRecordingTeacher = true;
    startRecognition(state.teacherLang);
  }
}

function toggleStudentRecording() {
  if (state.isRecordingStudent) {
    stopRecording();
  } else {
    const langToSpeak = state.studentSpeakLang || state.studentTargetLang;
    if (!langToSpeak) {
      showToast('⚠️ Por favor, selecione seu idioma primeiro.', 'warning');
      openInitialLanguageModal('student');
      return;
    }
    stopRecording();
    state.isRecordingStudent = true;
    startRecognition(langToSpeak);
  }
}

function toggleDiagRecording(side) {
  if (side === 'A') {
    if (state.isRecordingDiagA) {
      stopRecording();
    } else {
      stopRecording();
      state.isRecordingDiagA = true;
      startRecognition(state.diagLangA);
    }
  } else {
    if (state.isRecordingDiagB) {
      stopRecording();
    } else {
      stopRecording();
      state.isRecordingDiagB = true;
      startRecognition(state.diagLangB);
    }
  }
}

function startRecognition(langCode) {
  if (!state.recognition) {
    alert('Reconhecimento de voz não está disponível neste navegador. Use o Google Chrome ou Edge.');
    return;
  }
  try {
    state.recognition.lang = getBcp47(langCode);
    state.recognition.start();
  } catch (err) {
    console.warn('Erro ao iniciar reconhecimento:', err);
  }
}

function stopRecording() {
  state.isRecordingTeacher = false;
  state.isRecordingStudent = false;
  state.isRecordingDiagA = false;
  state.isRecordingDiagB = false;

  if (state.recognition) {
    try { state.recognition.stop(); } catch (e) {}
  }
  updateMicVisuals(false);
}

function restartRecognition(langCode) {
  if (!state.recognition) return;
  isRestartingRecognition = true;
  try {
    state.recognition.stop();
  } catch (e) {}

  setTimeout(() => {
    try {
      state.recognition.lang = getBcp47(langCode || state.teacherLang);
      state.recognition.start();
    } catch (err) {
      console.warn('Erro ao reiniciar reconhecimento:', err);
    } finally {
      isRestartingRecognition = false;
    }
  }, 300);
}

function updateMicVisuals(recording) {
  const t = UI_TRANSLATIONS[state.uiLang] || UI_TRANSLATIONS['pt'];
  const teacherBtn = document.getElementById('teacher-mic-btn');
  const teacherPodium = document.querySelector('.teacher-podium');
  const teacherStatus = document.getElementById('teacher-mic-status');

  if (teacherBtn) {
    teacherBtn.classList.toggle('recording', state.isRecordingTeacher);
  }
  if (teacherPodium) {
    teacherPodium.classList.toggle('recording', state.isRecordingTeacher);
  }
  if (teacherStatus) {
    teacherStatus.textContent = state.isRecordingTeacher
      ? t.teacher_mic_status_live
      : t.teacher_mic_status_idle;
  }

  const studentBtn = document.getElementById('student-question-btn');
  if (studentBtn) {
    studentBtn.classList.toggle('active-ask', state.isRecordingStudent);
    studentBtn.innerHTML = state.isRecordingStudent
      ? t.btn_ask_student_stop
      : t.btn_ask_student;
  }

  const micA = document.getElementById('mic-diag-a');
  const micB = document.getElementById('mic-diag-b');
  if (micA) micA.classList.toggle('btn-edu-green', state.isRecordingDiagA);
  if (micB) micB.classList.toggle('btn-edu-green', state.isRecordingDiagB);
}

function updateStudentLanguageOnServer(newLang) {
  if (!state.clientId || !state.isServerConnected) return;
  fetch('/api/update-lang', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      roomId: state.roomId,
      clientId: state.clientId,
      lang: newLang
    })
  }).catch(() => {});
}

// ========================================================
// 9. QR CODE & COMPARTILHAMENTO ESCOLAR
// ========================================================
function getStudentJoinUrl() {
  const uiParam = state.uiLang && state.uiLang !== 'pt' ? `&uiLang=${encodeURIComponent(state.uiLang)}` : '';
  const langParam = state.studentTargetLang ? `&lang=${encodeURIComponent(state.studentTargetLang)}` : '';
  const roomParam = encodeURIComponent(state.roomId || 'SALA-1');

  // Se estiver hospedado em domínio público na web (como https://yanik-translator.onrender.com)
  if (typeof window !== 'undefined' && window.location && window.location.origin && !state.isFileProtocol) {
    const host = window.location.hostname;
    if (host !== 'localhost' && host !== '127.0.0.1' && !host.startsWith('192.168.') && !host.startsWith('10.') && !host.startsWith('172.')) {
      return `${window.location.origin}/?room=${roomParam}&role=student${langParam}${uiParam}`;
    }
  }

  // Se estiver na rede local Wi-Fi, usa o IP da máquina para os celulares dos alunos
  if (state.serverInfo && state.serverInfo.primaryUrl) {
    return `${state.serverInfo.primaryUrl}/?room=${roomParam}&role=student${langParam}${uiParam}`;
  }

  if (typeof window !== 'undefined' && window.location && window.location.origin && !state.isFileProtocol) {
    return `${window.location.origin}/?room=${roomParam}&role=student${langParam}${uiParam}`;
  }

  return `http://localhost:3000/?room=${roomParam}&role=student${langParam}${uiParam}`;
}

function renderQrCode() {
  if (typeof QRCode === 'undefined') return;
  const url = getStudentJoinUrl();

  const qrBox = document.getElementById('qrcode');
  if (qrBox) {
    qrBox.innerHTML = '';
    new QRCode(qrBox, {
      text: url,
      width: 170,
      height: 170,
      colorDark: '#0f172a',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.M
    });
  }

  const qrProjector = document.getElementById('qrcode-projector');
  const projectorUrlText = document.getElementById('projector-url-text');
  if (projectorUrlText) projectorUrlText.textContent = url;

  if (qrProjector) {
    qrProjector.innerHTML = '';
    new QRCode(qrProjector, {
      text: url,
      width: 280,
      height: 280,
      colorDark: '#0f172a',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.M
    });
  }
}

function renderShareLinks() {
  const shareInput = document.getElementById('share-url-input');
  if (shareInput) {
    shareInput.value = getStudentJoinUrl();
  }
  renderQrCode();
}

function copyStudentLink() {
  const input = document.getElementById('share-url-input');
  if (input) {
    input.select();
    input.setSelectionRange(0, 99999);
  }
  const url = getStudentJoinUrl();
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(() => {
      showToast('✓ Link da sala copiado com sucesso!', 'success');
    }).catch(() => {
      try {
        document.execCommand('copy');
        showToast('✓ Link da sala copiado!', 'success');
      } catch (e) {
        prompt('Copie o link da sala abaixo:', url);
      }
    });
  } else {
    try {
      document.execCommand('copy');
      showToast('✓ Link da sala copiado!', 'success');
    } catch (e) {
      prompt('Copie o link da sala abaixo:', url);
    }
  }
}

// ========================================================
// 10. FEEDS E EXPORTAÇÃO
// ========================================================
function appendTeacherFeed(data) {
  const feed = document.getElementById('teacher-feed');
  if (!feed) return;

  const item = document.createElement('div');
  item.className = `feed-item ${data.senderRole === 'student' ? 'student-question' : 'teacher'}`;

  const timeStr = new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const roleBadge = data.senderRole === 'student' ? '🙋 Pergunta do Aluno' : '👨‍🏫 Professor';

  item.innerHTML = `
    <div class="feed-meta">
      <span class="feed-sender">${roleBadge} (${data.sourceLang.toUpperCase()})</span>
      <span>${timeStr}</span>
    </div>
    <div class="feed-translated">${escapeHtml(data.originalText)}</div>
  `;

  feed.prepend(item);
}

function appendStudentFeed(data) {
  const feed = document.getElementById('student-feed');
  if (!feed) return;

  const item = document.createElement('div');
  item.className = `feed-item ${data.senderRole === 'student' ? 'student-question' : 'teacher'}`;
  item.setAttribute('data-original-text', data.originalText || data.text || '');
  item.setAttribute('data-source-lang', data.sourceLang || 'pt');
  item.setAttribute('data-target-lang', data.targetLang || state.studentTargetLang);
  item.setAttribute('data-sender-name', data.senderName || 'Professor');
  if (data.translations) {
    item.setAttribute('data-translations', JSON.stringify(data.translations));
  }

  const timeStr = new Date(data.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const playBtnHtml = `<button class="btn btn-secondary feed-play-btn" style="padding: 4px 10px; font-size: 0.78rem; margin-top: 6px;" onclick="speakFeedItem(this)">${UI_ICONS.volume} <span>Ouvir</span></button>`;

  item.innerHTML = `
    <div class="feed-meta" data-time="${timeStr}">
      <span class="feed-sender">${escapeHtml(data.senderName)}</span>
      <span>${timeStr} (${(data.targetLang || state.studentTargetLang).toUpperCase()})</span>
    </div>
    <div class="feed-translated feed-text">${escapeHtml(data.translatedText)}</div>
    <div class="feed-original">Original (${(data.sourceLang || 'pt').toUpperCase()}): "${escapeHtml(data.originalText)}"</div>
    ${playBtnHtml}
  `;

  feed.prepend(item);
}

function speakFeedItem(btn) {
  const item = btn.closest('.feed-item');
  if (!item) return;
  const textEl = item.querySelector('.feed-text');
  const targetLang = item.getAttribute('data-target-lang') || state.studentTargetLang;
  if (textEl && textEl.textContent) {
    speakText(textEl.textContent, targetLang);
  }
}

function appendToHistory(msg, isNew) {
  state.teacherHistory.push(msg);
}

function exportTranscriptFile() {
  if (state.teacherHistory.length === 0) {
    alert('Nenhuma transcrição para exportar ainda.');
    return;
  }

  let text = `# Transcrição da Aula - Yanik, Translator\n`;
  text += `Sala: ${state.roomId}\n`;
  text += `Data: ${new Date().toLocaleString()}\n`;
  text += `----------------------------------------------------\n\n`;

  state.teacherHistory.forEach(item => {
    const time = new Date(item.timestamp).toLocaleTimeString();
    text += `[${time}] ${item.senderName} (${item.sourceLang.toUpperCase()}):\n`;
    text += `Original: ${item.originalText}\n`;
    if (item.translatedText) {
      text += `Tradução: ${item.translatedText}\n`;
    }
    text += `\n`;
  });

  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `yanik-translator-${state.roomId}-${Date.now()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

function getBcp47(langCode) {
  const found = LANGUAGES.find(l => l.code === langCode);
  return found ? found.bcp47 : langCode;
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function escapeQuotes(str) {
  if (!str) return '';
  return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

// ========================================================
// 11. SISTEMA DE SALAS MÚLTIPLAS & EXPLORADOR ESCOLAR
// ========================================================
function openCreateRoomModal() {
  const modal = document.getElementById('create-room-modal');
  if (!modal) return;
  
  const titleInput = document.getElementById('create-room-title');
  const teacherInput = document.getElementById('create-room-teacher');
  const idInput = document.getElementById('create-room-id');
  const subjectInput = document.getElementById('create-room-subject');
  const langInput = document.getElementById('create-room-lang');

  const cur = state.roomDetails || {};
  if (titleInput) titleInput.value = cur.title || `Aula - Sala ${state.roomId}`;
  if (teacherInput) teacherInput.value = cur.teacherName || 'Prof. Yanik';
  if (idInput) idInput.value = state.roomId || 'MAT-7A';
  if (subjectInput && cur.subject) subjectInput.value = cur.subject;
  if (langInput) langInput.value = state.teacherLang || 'pt';

  modal.classList.add('active');
}

function closeCreateRoomModal() {
  const modal = document.getElementById('create-room-modal');
  if (modal) modal.classList.remove('active');
}

function openBrowseRoomsModal() {
  const modal = document.getElementById('browse-rooms-modal');
  if (!modal) return;
  modal.classList.add('active');
  fetchAvailableRooms();
}

function closeBrowseRoomsModal() {
  const modal = document.getElementById('browse-rooms-modal');
  if (modal) modal.classList.remove('active');
}

async function handleCreateRoomSubmit(e) {
  e.preventDefault();
  const title = document.getElementById('create-room-title').value.trim();
  const teacherName = document.getElementById('create-room-teacher').value.trim();
  const subject = document.getElementById('create-room-subject').value;
  let roomId = document.getElementById('create-room-id').value.trim().toUpperCase();
  const language = document.getElementById('create-room-lang').value;

  if (!title) {
    alert('Por favor, informe o título da aula.');
    return;
  }

  if (!roomId) {
    const prefix = (subject || 'AULA').substring(0, 3).toUpperCase();
    roomId = prefix + '-' + Math.floor(100 + Math.random() * 900);
  }
  roomId = roomId.replace(/[^A-Z0-9\-_]/g, '-');

  const payload = { id: roomId, title, teacherName, subject, language };

  if (state.isServerConnected && !state.isFileProtocol) {
    try {
      const res = await fetch('/api/rooms/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.room) {
          state.roomDetails = data.room;
        }
      }
    } catch (err) {
      console.warn('Erro ao criar sala no servidor:', err);
    }
  } else {
    state.roomDetails = { ...payload, createdAt: new Date() };
  }

  state.teacherLang = language;
  const tLangSelect = document.getElementById('teacher-lang-select');
  if (tLangSelect) tLangSelect.value = language;

  closeCreateRoomModal();
  joinRoom(roomId);
  fetchAvailableRooms();
  alert(`✓ Sala de aula "${title}" (Código: ${roomId}) criada com sucesso! Você já está pronto para transmitir.`);
}

async function fetchAvailableRooms() {
  if (state.isFileProtocol) {
    state.availableRooms = [
      { id: 'MAT-7A', title: 'Matemática - 7º Ano A', teacherName: 'Prof. Yanik', subject: 'Matemática', language: 'pt', studentCount: 3, teacherOnline: true, languages: { hi: 2, en: 1 } },
      { id: 'HIST-9B', title: 'História Geral - 9º Ano B', teacherName: 'Profa. Maria', subject: 'História', language: 'pt', studentCount: 1, teacherOnline: true, languages: { fr: 1 } },
      { id: 'CIEN-8', title: 'Ciências & Biologia - 8º Ano', teacherName: 'Prof. Lucas', subject: 'Ciências', language: 'pt', studentCount: 0, teacherOnline: false, languages: {} },
      { id: 'SALA-1', title: 'Aula Geral - Sala 1', teacherName: 'Professor', subject: 'Geral', language: 'pt', studentCount: 0, teacherOnline: false, languages: {} }
    ];
    renderRoomCardsList();
    return;
  }

  try {
    const res = await fetch('/api/rooms', { cache: 'no-cache' });
    if (res.ok) {
      const data = await res.json();
      state.availableRooms = Array.isArray(data) ? data : (Array.isArray(data.rooms) ? data.rooms : []);
      renderRoomCardsList();
      
      // Se a sala atual estiver na lista, sincroniza os detalhes
      const match = state.availableRooms.find(r => r && r.id === state.roomId);
      if (match) {
        state.roomDetails = match;
        updateRoomDisplay();
      }
    }
  } catch (err) {
    console.warn('Erro ao carregar salas:', err);
  }
}

function renderRoomCardsList() {
  const container = document.getElementById('room-cards-list');
  if (!container) return;

  const query = (state.roomSearchQuery || '').toLowerCase().trim();
  const filterSubj = state.roomFilterSubject || 'all';

  const list = Array.isArray(state.availableRooms) ? state.availableRooms : [];
  const filtered = list.filter(r => {
    if (filterSubj !== 'all' && r.subject !== filterSubj) {
      return false;
    }
    if (query) {
      const matchTitle = (r.title || '').toLowerCase().includes(query);
      const matchTeacher = (r.teacherName || '').toLowerCase().includes(query);
      const matchSubject = (r.subject || '').toLowerCase().includes(query);
      const matchId = (r.id || '').toLowerCase().includes(query);
      return matchTitle || matchTeacher || matchSubject || matchId;
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 32px 16px; color: var(--text-muted);">
        <span style="font-size: 2rem; display: inline-flex; justify-content: center; margin-bottom: 8px;">${UI_ICONS.search}</span>
        <strong style="display: block;">Nenhuma aula encontrada</strong>
        <p style="font-size: 0.82rem; margin-top: 4px;">Tente pesquisar com outro termo ou digite o código da sala abaixo.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(r => {
    const isCurrent = r.id === state.roomId;
    const iconSvg = getSubjectIconSvg(r.subject);
    const flagPills = r.languages ? Object.keys(r.languages).map(code => {
      const l = LANGUAGES.find(item => item.code === code);
      return l ? l.flag : code.toUpperCase();
    }).join(' ') : '';

    return `
      <div class="room-card-item ${isCurrent ? 'is-current' : ''}">
        <div class="room-card-main">
          <div class="room-card-header">
            <span class="room-tag-badge">${iconSvg} <span>${escapeHtml(r.subject || 'Geral')}</span></span>
            <span class="code-pill">${escapeHtml(r.id)}</span>
            ${r.teacherOnline ? '<span class="room-live-indicator"><span class="status-indicator"></span> AO VIVO</span>' : ''}
          </div>
          <h3 class="room-card-title">${escapeHtml(r.title || `Aula - Sala ${r.id}`)}</h3>
          <div class="room-card-sub">
            <span>${UI_ICONS.user} ${escapeHtml(r.teacherName || 'Professor')}</span>
            <span>•</span>
            <span>${UI_ICONS.users} ${r.studentCount || 0} aluno(s)</span>
            ${flagPills ? `<span>•</span> <span>${flagPills}</span>` : ''}
          </div>
        </div>
        <div class="room-card-action">
          ${isCurrent 
            ? `<button class="btn-action btn-secondary" style="font-size: 0.78rem;" disabled>${UI_ICONS.check} Conectado</button>` 
            : `<button class="btn-action btn-primary" style="font-size: 0.78rem;" onclick="joinRoomFromBrowser('${escapeQuotes(r.id)}')">${UI_ICONS.headphones} Entrar nesta Aula</button>`
          }
        </div>
      </div>
    `;
  }).join('');
}

function joinRoomFromBrowser(roomId) {
  if (!roomId) return;
  joinRoom(roomId);
  closeBrowseRoomsModal();
}

function joinRoom(roomId) {
  state.roomId = roomId.toUpperCase().trim();
  
  // Atualiza URL do navegador sem recarregar
  const url = new URL(window.location);
  url.searchParams.set('room', state.roomId);
  window.history.replaceState({}, '', url);

  // Reconecta canais
  setupBroadcastChannel();
  connectRealtime();
  renderQrCode();
  renderShareLinks();

  // Limpa feeds da sala anterior
  const sFeed = document.getElementById('student-feed');
  if (sFeed) sFeed.innerHTML = '';
  const tFeed = document.getElementById('teacher-feed');
  if (tFeed) tFeed.innerHTML = '';

  // Atualiza badge de sala
  const headerRoomBadge = document.getElementById('header-room-badge');
  const t = UI_TRANSLATIONS[state.uiLang] || UI_TRANSLATIONS['pt'];
  if (headerRoomBadge) headerRoomBadge.textContent = `${t.nav_room_prefix || 'Sala: '}${state.roomId}`;

  // Sincroniza detalhes
  const match = (state.availableRooms || []).find(r => r.id === state.roomId);
  if (match) {
    state.roomDetails = match;
  } else {
    state.roomDetails = { id: state.roomId, title: `Aula - Sala ${state.roomId}`, teacherName: 'Professor', subject: 'Geral', language: 'pt' };
  }
  updateRoomDisplay();
}

function updateRoomDisplay() {
  const t = UI_TRANSLATIONS[state.uiLang] || UI_TRANSLATIONS['pt'];
  const r = state.roomDetails || { id: state.roomId, title: `Aula - ${state.roomId}`, teacherName: 'Professor', subject: 'Geral' };

  const getSubjectElement = (subj) => {
    return `${getSubjectIconSvg(subj)} <span>${escapeHtml(subj || 'Geral')}</span>`;
  };

  // 1. Atualiza visualização na Mesa do Professor
  const tTitle = document.getElementById('teacher-current-title');
  if (tTitle) tTitle.textContent = r.title || `Aula - Sala ${r.id}`;
  const tAuthor = document.getElementById('teacher-current-author');
  if (tAuthor) tAuthor.textContent = r.teacherName || 'Prof. Yanik';
  const tCode = document.getElementById('teacher-current-code');
  if (tCode) tCode.textContent = r.id || state.roomId;
  const tSubject = document.getElementById('teacher-current-subject');
  if (tSubject) tSubject.innerHTML = getSubjectElement(r.subject);

  // 2. Atualiza visualização na Carteira do Aluno
  const sTitle = document.getElementById('student-current-title');
  if (sTitle) sTitle.textContent = r.title || `Aula - Sala ${r.id}`;
  const sAuthor = document.getElementById('student-current-author');
  if (sAuthor) sAuthor.textContent = r.teacherName || 'Professor';
  const sCode = document.getElementById('student-current-code');
  if (sCode) sCode.textContent = r.id || state.roomId;
  const sSubject = document.getElementById('student-current-subject');
  if (sSubject) sSubject.innerHTML = getSubjectElement(r.subject);

  // 3. Atualiza badge do cabeçalho
  const headerRoomBadge = document.getElementById('header-room-badge');
  if (headerRoomBadge) {
    headerRoomBadge.textContent = `${t.nav_room_prefix || 'Sala: '}${r.id || state.roomId}`;
  }

  // 4. Atualiza input do painel lateral do professor
  const roomInput = document.getElementById('room-id-input');
  if (roomInput && roomInput.value !== r.id) {
    roomInput.value = r.id;
  }
}

// ========================================================
// 10. MOTOR DE RESUMO INTELIGENTE DA AULA (AI LESSON SUMMARY)
// ========================================================
function initClassSummarizer() {
  const btnTeacher = document.getElementById('btn-summarize-teacher');
  if (btnTeacher) btnTeacher.addEventListener('click', () => openSummaryModal());

  const btnStudent = document.getElementById('btn-summarize-student');
  if (btnStudent) btnStudent.addEventListener('click', () => openSummaryModal());

  const btnClose = document.getElementById('btn-close-summary-modal');
  if (btnClose) btnClose.addEventListener('click', closeSummaryModal);

  const btnCloseFooter = document.getElementById('btn-close-summary-footer');
  if (btnCloseFooter) btnCloseFooter.addEventListener('click', closeSummaryModal);

  const langSelect = document.getElementById('summary-lang-select');
  if (langSelect) {
    langSelect.innerHTML = LANGUAGES.map(l => `<option value="${l.code}">${l.flag} ${l.name}</option>`).join('');
    langSelect.value = state.activeTab === 'student' ? state.studentTargetLang : state.teacherLang;
    langSelect.addEventListener('change', (e) => {
      generateClassSummary(e.target.value);
    });
  }

  const btnCopy = document.getElementById('btn-copy-summary');
  if (btnCopy) btnCopy.addEventListener('click', copySummaryToClipboard);

  const btnDownload = document.getElementById('btn-download-summary');
  if (btnDownload) btnDownload.addEventListener('click', downloadSummaryFile);

  const btnPrint = document.getElementById('btn-print-summary');
  if (btnPrint) btnPrint.addEventListener('click', printSummaryDocument);

  const btnSpeak = document.getElementById('btn-speak-summary');
  if (btnSpeak) btnSpeak.addEventListener('click', speakSummaryAloud);
}

function openSummaryModal() {
  const modal = document.getElementById('summary-modal');
  if (!modal) return;

  const targetLang = state.activeTab === 'student' ? state.studentTargetLang : state.teacherLang;
  const langSelect = document.getElementById('summary-lang-select');
  if (langSelect) langSelect.value = targetLang;

  modal.classList.add('active');
  generateClassSummary(targetLang);
}

function closeSummaryModal() {
  const modal = document.getElementById('summary-modal');
  if (modal) modal.classList.remove('active');
}

async function generateClassSummary(targetLang) {
  const bodyEl = document.getElementById('summary-body-content');
  const titleText = document.getElementById('summary-title-text');
  const authorSub = document.getElementById('summary-author-subject');
  const roomBadge = document.getElementById('summary-room-badge');
  const engineBadge = document.getElementById('summary-engine-badge');
  const datetimeEl = document.getElementById('summary-datetime');

  if (roomBadge) roomBadge.textContent = state.roomId;
  if (datetimeEl) datetimeEl.textContent = new Date().toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  
  const room = state.roomDetails || { title: 'Aula Geral', subject: 'Geral', teacherName: 'Prof. Yanik' };
  if (authorSub) authorSub.textContent = `${room.teacherName || 'Professor'} • ${room.subject || 'Geral'}`;

  if (!state.teacherHistory || state.teacherHistory.length === 0) {
    if (bodyEl) {
      bodyEl.innerHTML = `
        <div style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
          <div style="font-size: 2.2rem; margin-bottom: 12px;">🎙️</div>
          <h3 style="font-size: 1.1rem; font-weight: 600; color: var(--text-primary); margin-bottom: 8px;">Nenhuma fala registrada ainda</h3>
          <p style="font-size: 0.88rem; max-width: 480px; margin: 0 auto; line-height: 1.5;">
            Inicie a transmissão no microfone do professor ou faça perguntas como aluno. Assim que as frases forem faladas, a IA gerará um resumo pedagógico completo e detalhado.
          </p>
        </div>
      `;
    }
    return;
  }

  if (bodyEl) {
    bodyEl.innerHTML = `
      <div style="text-align: center; padding: 44px 20px; color: var(--text-muted);">
        <div class="typing-cursor" style="display: inline-block; width: 14px; height: 14px; background: var(--accent); border-radius: 50%; margin-bottom: 12px;"></div>
        <h4 style="font-size: 1.0rem; font-weight: 600; color: var(--text-primary);">Sintetizando conceitos da aula...</h4>
        <p style="font-size: 0.82rem; margin-top: 4px;">Analisando falas do educador, dúvidas dos alunos e vocabulário chave no idioma selecionado.</p>
      </div>
    `;
  }

  try {
    let summaryData = null;
    let engineName = 'yanik-pedagogical';

    if (state.isServerConnected && !state.isFileProtocol) {
      try {
        const res = await fetch('/api/summarize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            roomId: state.roomId,
            targetLang: targetLang,
            apiKey: state.geminiApiKey || '',
            history: state.teacherHistory
          })
        });

        if (res.ok) {
          const json = await res.json();
          if (json.summary) {
            summaryData = json.summary;
            engineName = json.engine || 'gemini-ai';
          }
        }
      } catch (netErr) {}
    }

    if (!summaryData) {
      summaryData = generateClientLocalSummary(state.teacherHistory, targetLang, room);
      engineName = 'yanik-pedagogical';
    }

    summaryData = await translateSummaryData(summaryData, targetLang);
    state.currentSummaryData = summaryData;

    if (engineBadge) {
      if (engineName === 'gemini-ai') {
        engineBadge.textContent = '✨ Resumo por Google Gemini 1.5 Flash';
      } else {
        engineBadge.textContent = '✨ Motor Pedagógico Integrado (Offline HD)';
      }
    }

    renderSummaryUI(summaryData);
  } catch (err) {
    if (bodyEl) {
      bodyEl.innerHTML = `
        <div style="padding: 24px; color: var(--danger); text-align: center;">
          <p>Ocorreu um erro ao processar o resumo: ${escapeHtml(err.message)}</p>
        </div>
      `;
    }
  }
}

function generateClientLocalSummary(history, targetLang, room) {
  const teacherLines = [];
  const studentQuestions = [];
  const wordsFreq = new Map();

  const stopWords = new Set([
    'a', 'o', 'as', 'os', 'um', 'uma', 'uns', 'umas', 'de', 'do', 'da', 'dos', 'das',
    'em', 'no', 'na', 'nos', 'nas', 'por', 'para', 'com', 'sem', 'sob', 'sobre',
    'e', 'ou', 'mas', 'que', 'se', 'como', 'quando', 'onde', 'porque', 'porquê',
    'eu', 'voce', 'você', 'ele', 'ela', 'nos', 'nós', 'eles', 'elas', 'meu', 'minha',
    'seu', 'sua', 'esse', 'essa', 'este', 'esta', 'isso', 'isto', 'aquilo', 'muito',
    'mais', 'bem', 'ja', 'já', 'aqui', 'ali', 'la', 'lá', 'foi', 'ser', 'estar', 'ter'
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
    : 'Nesta aula, foram abordados conceitos curriculares importantes, promovendo a fixação de temas centrais com o auxílio da tradução simultânea.';

  const keyTopics = sampleSentences.map(s => {
    return s.length > 110 ? s.substring(0, 107) + '...' : s;
  });

  if (keyTopics.length === 0) {
    keyTopics.push(`Conceitos essenciais da aula de ${room.subject || 'Geral'}`);
    keyTopics.push('Exemplos de aplicação e contextualização');
    keyTopics.push('Conclusão pedagógica e direcionamentos de estudo');
  }

  const detailedPoints = sortedTerms.slice(0, 3).map(term => ({
    concept: term.charAt(0).toUpperCase() + term.slice(1),
    explanation: `Conceito fundamental abordado e reforçado durante a explicação pedagógica desta aula.`
  }));

  const glossary = sortedTerms.map(term => ({
    term: term.charAt(0).toUpperCase() + term.slice(1),
    definition: `Conceito técnico trabalhado na aula de ${room.subject || 'estudos gerais'}.`
  }));

  const studyChecklist = [
    `Rever os conceitos e vocabulário de ${room.subject || 'estudos'} apresentados nesta aula.`,
    `Anotar os pontos de atenção e esclarecer dúvidas na próxima aula.`,
    `Realizar os exercícios práticos propostos pelo professor.`
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

async function translateSummaryData(summary, targetLang) {
  if (!targetLang || targetLang === 'pt') return summary;

  try {
    const translated = { ...summary };
    translated.title = await translateUniversal(summary.title, 'pt', targetLang);
    translated.executiveSummary = await translateUniversal(summary.executiveSummary, 'pt', targetLang);

    if (Array.isArray(summary.keyTopics)) {
      translated.keyTopics = await Promise.all(summary.keyTopics.map(t => translateUniversal(t, 'pt', targetLang)));
    }

    if (Array.isArray(summary.detailedPoints)) {
      translated.detailedPoints = await Promise.all(summary.detailedPoints.map(async p => ({
        concept: await translateUniversal(p.concept, 'pt', targetLang),
        explanation: await translateUniversal(p.explanation, 'pt', targetLang)
      })));
    }

    if (Array.isArray(summary.questionsAndAnswers)) {
      translated.questionsAndAnswers = await Promise.all(summary.questionsAndAnswers.map(async qa => ({
        question: await translateUniversal(qa.question, 'auto', targetLang),
        answer: await translateUniversal(qa.answer, 'pt', targetLang)
      })));
    }

    if (Array.isArray(summary.glossary)) {
      translated.glossary = await Promise.all(summary.glossary.map(async g => ({
        term: await translateUniversal(g.term, 'pt', targetLang),
        definition: await translateUniversal(g.definition, 'pt', targetLang)
      })));
    }

    if (Array.isArray(summary.studyChecklist)) {
      translated.studyChecklist = await Promise.all(summary.studyChecklist.map(c => translateUniversal(c, 'pt', targetLang)));
    }

    return translated;
  } catch (e) {
    return summary;
  }
}

function renderSummaryUI(data) {
  const bodyEl = document.getElementById('summary-body-content');
  if (!bodyEl) return;

  const topicsHtml = (data.keyTopics || []).map(topic => `
    <li class="summary-bullet-item">${escapeHtml(topic)}</li>
  `).join('');

  const detailedHtml = (data.detailedPoints && data.detailedPoints.length > 0) ? `
    <div class="summary-card-section">
      <h3 class="summary-section-heading">💡 Conceitos Fundamentais Explicados</h3>
      <div style="display: flex; flex-direction: column; gap: 10px;">
        ${data.detailedPoints.map(p => `
          <div>
            <strong style="color: var(--accent); font-size: 0.88rem;">${escapeHtml(p.concept || '')}:</strong>
            <span style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-left: 4px;">${escapeHtml(p.explanation || '')}</span>
          </div>
        `).join('')}
      </div>
    </div>
  ` : '';

  const qaHtml = (data.questionsAndAnswers && data.questionsAndAnswers.length > 0) ? `
    <div class="summary-card-section">
      <h3 class="summary-section-heading">🙋 Perguntas dos Alunos & Respostas em Sala</h3>
      <div>
        ${data.questionsAndAnswers.map(qa => `
          <div class="summary-qa-box">
            <div class="summary-q-text">❓ "${escapeHtml(qa.question || '')}"</div>
            <div class="summary-a-text">✓ ${escapeHtml(qa.answer || '')}</div>
          </div>
        `).join('')}
      </div>
    </div>
  ` : '';

  const glossaryHtml = (data.glossary && data.glossary.length > 0) ? `
    <div class="summary-card-section">
      <h3 class="summary-section-heading">📖 Glossário & Vocabulário Chave</h3>
      <div class="summary-glossary-grid">
        ${data.glossary.map(g => `
          <div class="summary-glossary-item">
            <div class="summary-glossary-term">${escapeHtml(g.term || '')}</div>
            <div class="summary-glossary-def">${escapeHtml(g.definition || '')}</div>
          </div>
        `).join('')}
      </div>
    </div>
  ` : '';

  const checklistHtml = (data.studyChecklist && data.studyChecklist.length > 0) ? `
    <div class="summary-card-section">
      <h3 class="summary-section-heading">🎯 Guia de Revisão para os Alunos</h3>
      <ul class="summary-bullet-list">
        ${data.studyChecklist.map(c => `<li class="summary-bullet-item">${escapeHtml(c)}</li>`).join('')}
      </ul>
    </div>
  ` : '';

  bodyEl.innerHTML = `
    <!-- 1. Síntese Geral -->
    <div class="summary-card-section">
      <h3 class="summary-section-heading">📌 Síntese da Aula</h3>
      <p class="summary-p">${escapeHtml(data.executiveSummary || '')}</p>
    </div>

    <!-- 2. Tópicos Abordados -->
    <div class="summary-card-section">
      <h3 class="summary-section-heading">📝 Tópicos Ministrados</h3>
      <ul class="summary-bullet-list">
        ${topicsHtml}
      </ul>
    </div>

    <!-- 3. Conceitos Detalhados -->
    ${detailedHtml}

    <!-- 4. Perguntas e Respostas -->
    ${qaHtml}

    <!-- 5. Glossário Multilíngue -->
    ${glossaryHtml}

    <!-- 6. Checklist de Estudos -->
    ${checklistHtml}
  `;
}

function getFormattedSummaryText() {
  const d = state.currentSummaryData;
  if (!d) return '';

  let text = `# RESUMO DA AULA: ${d.title || 'Yanik, Translator'}\n`;
  text += `Matéria: ${d.subject || 'Geral'} | Professor: ${d.teacher || 'Professor'}\n`;
  text += `Data: ${new Date().toLocaleString()}\n`;
  text += `=======================================================\n\n`;

  text += `## SÍNTESE DA AULA\n${d.executiveSummary || ''}\n\n`;

  if (d.keyTopics && d.keyTopics.length > 0) {
    text += `## TÓPICOS ABORDADOS\n`;
    d.keyTopics.forEach(t => text += `• ${t}\n`);
    text += `\n`;
  }

  if (d.detailedPoints && d.detailedPoints.length > 0) {
    text += `## CONCEITOS FUNDAMENTAIS\n`;
    d.detailedPoints.forEach(p => text += `• ${p.concept}: ${p.explanation}\n`);
    text += `\n`;
  }

  if (d.questionsAndAnswers && d.questionsAndAnswers.length > 0) {
    text += `## DÚVIDAS & PERGUNTAS DE SALA\n`;
    d.questionsAndAnswers.forEach(qa => text += `Q: ${qa.question}\nA: ${qa.answer}\n\n`);
  }

  if (d.glossary && d.glossary.length > 0) {
    text += `## GLOSSÁRIO DE CONCEITOS\n`;
    d.glossary.forEach(g => text += `• ${g.term}: ${g.definition}\n`);
    text += `\n`;
  }

  if (d.studyChecklist && d.studyChecklist.length > 0) {
    text += `## GUIA DE REVISÃO\n`;
    d.studyChecklist.forEach(c => text += `[ ] ${c}\n`);
    text += `\n`;
  }

  text += `Gerado automaticamente por Yanik, Translator (v2.4 Pro)\n`;
  return text;
}

function copySummaryToClipboard() {
  const text = getFormattedSummaryText();
  if (!text) {
    alert('Nenhum resumo gerado para copiar.');
    return;
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('📋 Resumo copiado para a área de transferência!');
    }).catch(() => {
      fallbackCopyText(text);
    });
  } else {
    fallbackCopyText(text);
  }
}

function fallbackCopyText(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  showToast('📋 Resumo copiado com sucesso!');
}

function downloadSummaryFile() {
  const text = getFormattedSummaryText();
  if (!text) return;

  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `resumo-aula-${state.roomId}-${Date.now()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('📥 Arquivo baixado com sucesso!');
}

function printSummaryDocument() {
  window.print();
}

function speakSummaryAloud() {
  const d = state.currentSummaryData;
  if (!d || !d.executiveSummary) {
    alert('Nenhum resumo disponível para leitura.');
    return;
  }

  const langSelect = document.getElementById('summary-lang-select');
  const langCode = langSelect ? langSelect.value : (state.studentTargetLang || 'pt');
  
  const speechText = `${d.title}. ${d.executiveSummary}`;
  speakText(speechText, langCode);
  showToast('🔊 Reproduzindo leitura do resumo...');
}

function showToast(message) {
  const toast = document.getElementById('app-toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
