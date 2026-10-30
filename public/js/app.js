/**
 * Yanik, Translator - Software Profissional de Tradução Simultânea Escolar
 * Professor <-> Alunos em Tempo Real
 * Suporta 50+ Idiomas Globais e Regionais com Internacionalização Completa da Tela
 */

// Catálogo Global de 52 Idiomas com Códigos BCP-47, Bandeiras e Nomes Nativos
const LANGUAGES = [
  { code: 'pt', bcp47: 'pt-BR', name: 'Português', native: 'Português (Brasil)', flag: '🇧🇷' },
  { code: 'pt-PT', bcp47: 'pt-PT', name: 'Português (Portugal)', native: 'Português (Portugal)', flag: '🇵🇹' },
  { code: 'hi', bcp47: 'hi-IN', name: 'Hindi', native: 'हिन्दी (Hindi)', flag: '🇮🇳' },
  { code: 'en', bcp47: 'en-US', name: 'Inglês (EUA)', native: 'English (US)', flag: '🇺🇸' },
  { code: 'en-GB', bcp47: 'en-GB', name: 'Inglês (Reino Unido)', native: 'English (UK)', flag: '🇬🇧' },
  { code: 'fr', bcp47: 'fr-FR', name: 'Francês', native: 'Français', flag: '🇫🇷' },
  { code: 'es', bcp47: 'es-ES', name: 'Espanhol', native: 'Español', flag: '🇪🇸' },
  { code: 'de', bcp47: 'de-DE', name: 'Alemão', native: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', bcp47: 'it-IT', name: 'Italiano', native: 'Italiano', flag: '🇮🇹' },
  { code: 'ar', bcp47: 'ar-SA', name: 'Árabe', native: 'العربية', flag: '🇸🇦' },
  { code: 'zh-CN', bcp47: 'zh-CN', name: 'Mandarim (Simplificado)', native: '中文 (简体)', flag: '🇨🇳' },
  { code: 'zh-TW', bcp47: 'zh-TW', name: 'Mandarim (Tradicional)', native: '繁體中文', flag: '🇹🇼' },
  { code: 'ja', bcp47: 'ja-JP', name: 'Japonês', native: '日本語', flag: '🇯🇵' },
  { code: 'ru', bcp47: 'ru-RU', name: 'Russo', native: 'Русский', flag: '🇷🇺' },
  { code: 'ko', bcp47: 'ko-KR', name: 'Coreano', native: '한국어', flag: '🇰🇷' },
  { code: 'bn', bcp47: 'bn-IN', name: 'Bengali', native: 'বাংলা', flag: '🇮🇳' },
  { code: 'ur', bcp47: 'ur-PK', name: 'Urdu', native: 'اردو', flag: '🇵🇰' },
  { code: 'pa', bcp47: 'pa-IN', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'gu', bcp47: 'gu-IN', name: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'mr', bcp47: 'mr-IN', name: 'Marathi', native: 'मराठी', flag: '🇮🇳' },
  { code: 'ta', bcp47: 'ta-IN', name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', bcp47: 'te-IN', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
  { code: 'kn', bcp47: 'kn-IN', name: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ml', bcp47: 'ml-IN', name: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳' },
  { code: 'tr', bcp47: 'tr-TR', name: 'Turco', native: 'Türkçe', flag: '🇹🇷' },
  { code: 'vi', bcp47: 'vi-VN', name: 'Vietnamita', native: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'id', bcp47: 'id-ID', name: 'Indonésio', native: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'th', bcp47: 'th-TH', name: 'Tailandês', native: 'ไทย', flag: '🇹🇭' },
  { code: 'uk', bcp47: 'uk-UA', name: 'Ucraniano', native: 'Українська', flag: '🇺🇦' },
  { code: 'pl', bcp47: 'pl-PL', name: 'Polonês', native: 'Polski', flag: '🇵🇱' },
  { code: 'nl', bcp47: 'nl-NL', name: 'Holandês', native: 'Nederlands', flag: '🇳🇱' },
  { code: 'el', bcp47: 'el-GR', name: 'Grego', native: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'he', bcp47: 'he-IL', name: 'Hebraico', native: 'עברית', flag: '🇮🇱' },
  { code: 'fa', bcp47: 'fa-IR', name: 'Persa (Farsi)', native: 'فارسی', flag: '🇮🇷' },
  { code: 'sv', bcp47: 'sv-SE', name: 'Sueco', native: 'Svenska', flag: '🇸🇪' },
  { code: 'ro', bcp47: 'ro-RO', name: 'Romeno', native: 'Română', flag: '🇷🇴' },
  { code: 'hu', bcp47: 'hu-HU', name: 'Húngaro', native: 'Magyar', flag: '🇭🇺' },
  { code: 'cs', bcp47: 'cs-CZ', name: 'Tcheco', native: 'Čeština', flag: '🇨🇿' },
  { code: 'da', bcp47: 'da-DK', name: 'Dinamarquês', native: 'Dansk', flag: '🇩🇰' },
  { code: 'fi', bcp47: 'fi-FI', name: 'Finlandês', native: 'Suomi', flag: '🇫🇮' },
  { code: 'no', bcp47: 'nb-NO', name: 'Norueguês', native: 'Norsk', flag: '🇳🇴' },
  { code: 'fil', bcp47: 'fil-PH', name: 'Filipino (Tagalog)', native: 'Filipino', flag: '🇵🇭' },
  { code: 'ms', bcp47: 'ms-MY', name: 'Malaio', native: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'sw', bcp47: 'sw-KE', name: 'Suaíli', native: 'Kiswahili', flag: '🇰🇪' },
  { code: 'sk', bcp47: 'sk-SK', name: 'Eslovaco', native: 'Slovenčina', flag: '🇸🇰' },
  { code: 'bg', bcp47: 'bg-BG', name: 'Búlgaro', native: 'Български', flag: '🇧🇬' },
  { code: 'hr', bcp47: 'hr-HR', name: 'Croata', native: 'Hrvatski', flag: '🇭🇷' },
  { code: 'sr', bcp47: 'sr-RS', name: 'Sérvio', native: 'Српски', flag: '🇷🇸' },
  { code: 'ca', bcp47: 'ca-ES', name: 'Catalão', native: 'Català', flag: '🇪🇸' },
  { code: 'af', bcp47: 'af-ZA', name: 'Africâner', native: 'Afrikaans', flag: '🇿🇦' },
  { code: 'sq', bcp47: 'sq-AL', name: 'Albanês', native: 'Shqip', flag: '🇦🇱' },
  { code: 'am', bcp47: 'am-ET', name: 'Amárico', native: 'አማርኛ', flag: '🇪🇹' }
];

// Dicionário de Internacionalização da Interface (Idioma da Tela / Screen Language)

// ========================================================
// SISTEMA DE ÍCONES VETORIAIS MINIMALISTAS (SVG)
// ========================================================
const UI_ICONS = {
  search: '<svg class="ui-icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  sun: '<svg class="ui-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
  moon: '<svg class="ui-icon" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
  user: '<svg class="ui-icon" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  users: '<svg class="ui-icon" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  headphones: '<svg class="ui-icon" viewBox="0 0 24 24"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>',
  mic: '<svg class="ui-icon" viewBox="0 0 24 24"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>',
  volume: '<svg class="ui-icon" viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>',
  check: '<svg class="ui-icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>',
  plus: '<svg class="ui-icon" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>'
};

function getSubjectIconSvg(subject) {
  switch (subject) {
    case 'Matemática':
      return '<svg class="ui-icon" viewBox="0 0 24 24"><path d="M3 3v18h18L3 3z"/><path d="M9 15v3m-3-3v3m6-3v3m3-3v3"/></svg>';
    case 'Ciências':
      return '<svg class="ui-icon" viewBox="0 0 24 24"><path d="M10 2v7.31L4.69 19a2 2 0 0 0 1.7 3h11.22a2 2 0 0 0 1.7-3L14 9.31V2h-4z"/><path d="M8.5 2h7M7 16h10"/></svg>';
    case 'História':
      return '<svg class="ui-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>';
    case 'Línguas':
      return '<svg class="ui-icon" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>';
    case 'Tecnologia':
      return '<svg class="ui-icon" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>';
    case 'Geral':
    default:
      return '<svg class="ui-icon" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>';
  }
}

const UI_TRANSLATIONS = {"pt": {"app_version":"v2.4 Pro","nav_live":"Conectado","nav_direct":"Modo Direto / Offline","nav_room_prefix":"Sala:","nav_projector":"Projetar QR Code","tab_teacher":"Mesa do Professor","tab_student":"Carteira do Aluno","tab_dialogue":"Atendimento 1-para-1","tab_guide":"Manual de Uso","teacher_card_title":"Transmissão de Voz","teacher_card_desc":"Sua fala é capturada, traduzida em tempo real e transmitida aos alunos conectados","teacher_input_lang_label":"Idioma de Entrada:","teacher_mic_status_idle":"Toque no microfone para iniciar a transmissão","teacher_mic_status_live":"Aula em Transmissão ao Vivo (Fale ao microfone)","teacher_mic_hint":"Fale com clareza. A tradução para Hindi, Francês, Inglês e outros idiomas ocorre em tempo real.","teacher_manual_label":"Digitar mensagem ou aviso para a turma (funciona mesmo sem microfone):","teacher_manual_placeholder":"Ex: Abram o material no capítulo 3...","btn_transmit":"Transmitir","transcript_card_title":"Registro de Transmissão","btn_export":"Exportar (.txt)","btn_clear":"Limpar","student_access_title":"Acesso dos Alunos","student_access_desc":"Exiba este QR Code para que os alunos conectem seus dispositivos na mesma rede Wi-Fi:","btn_copy":"Copiar","room_id_label":"Identificador da Sala:","btn_save":"Salvar","connected_card_title":"Participantes Conectados","connected_card_desc":"Distribuição de idiomas em tempo real:","unlock_audio_title":"Ativar reprodução de áudio","unlock_audio_desc":"Toque no botão ao lado para ouvir a tradução em voz alta nos seus fones de ouvido.","btn_unlock_audio":"Ativar Áudio","student_panel_title":"Recepção de Tradução","student_listen_label":"Ouvir e ler em:","student_autospeak_label":"Reproduzir voz automaticamente","btn_test_audio":"Testar Som","student_font_label":"Texto:","student_speed_label":"Ritmo:","student_speed_slow":"0.85x (Lento)","student_speed_normal":"1.0x (Normal)","student_speed_fast":"1.15x (Rápido)","caption_waiting":"Aguardando fala do professor...","caption_badge":"Tradução Simultânea","caption_default_text":"Conecte seus fones de ouvido. Quando o professor falar, as legendas traduzidas aparecerão aqui e serão reproduzidas no seu idioma.","btn_replay":"Ouvir Novamente","ask_title":"Fazer Pergunta ao Professor (Vice-Versa)","ask_speak_label":"Meu Idioma de Fala:","ask_desc":"Pressione o botão e fale no seu idioma nativo (ex: Hindi, Francês, Inglês). Sua dúvida será traduzida e entregue diretamente ao professor.","btn_ask_student":"Fazer Pergunta ao Professor","btn_ask_student_stop":"⏹ Concluir Dúvida","student_history_title":"Histórico de Frases Traduzidas","dialogue_card_title":"Atendimento Individual e Bilateral","dialogue_card_desc":"Comunicação direta em dois sentidos para reuniões pedagógicas ou atendimento a responsáveis","dialogue_side_a_title":"Educador (Lado A)","btn_dialogue_side_a":"Falar Lado A","dialogue_side_b_title":"Aluno / Responsável (Lado B)","btn_dialogue_side_b":"Falar Lado B","dialogue_history_label":"Diálogo Registrado:","guide_title":"Manual de Operação e Diretrizes de Acessibilidade","guide_desc":"O Yanik, Translator conecta educadores e alunos em ambientes multilíngues, promovendo a inclusão imediata de estudantes estrangeiros, refugiados e imigrantes com tradução bidirecional em tempo real para Hindi, Português, Inglês, Francês e mais de 100 línguas.","guide_card1_title":"1. Conexão Local Wi-Fi","guide_card1_desc":"Basta que os celulares e computadores estejam no mesmo roteador ou Wi-Fi. O aluno lê o QR Code da sala e conecta-se imediatamente, sem necessidade de cadastros ou downloads.","guide_card2_title":"2. Uso de Fones de Ouvido","guide_card2_desc":"Cada aluno pode ouvir o professor no seu idioma nativo através de fones de ouvido (com fio ou Bluetooth), mantendo a sala silenciosa e focada.","guide_card3_title":"3. Interação Bidirecional","guide_card3_desc":"Ao clicar em 'Fazer Pergunta', o aluno fala no seu próprio idioma nativo (ex: Hindi), e a pergunta é traduzida e exibida na tela do professor em Português.","projector_modal_title":"Conectar à Aula","projector_modal_desc":"Aponte a câmera do celular para ouvir a tradução da aula no seu idioma","projector_wifi_label":"Rede Wi-Fi Local","footer_text":"Yanik, Translator © 2026 • Sistema de Tradução Simultânea em Tempo Real • Compatível com PC, Mac, Android e iOS","btn_create_room":"Criar / Mudar Sala","btn_summarize_teacher":"Resumir Aula com IA","btn_browse_rooms":"Procurar / Trocar de Aula","btn_class_summary":"Resumo da Aula","modal_create_title":"Criar ou Configurar Sala de Aula","label_room_title":"Título da Aula / Assunto:","label_teacher_name":"Nome do Professor:","label_subject":"Disciplina / Matéria:","label_room_code":"Código da Sala (para os alunos entrarem):","label_teacher_speech_lang":"Idioma de Fala do Professor:","btn_generate":"Gerar","btn_cancel":"Cancelar","btn_start_room":"Iniciar Aula nesta Sala","modal_browse_title":"Procurar Aulas Disponíveis na Escola","btn_refresh":"Atualizar","placeholder_search_rooms":"Buscar aula por matéria, professor ou código...","btn_join_room":"Entrar na Aula","btn_copy_summary":"Copiar Resumo","btn_download_summary":"Baixar (.txt)","btn_print_summary":"Imprimir / PDF","btn_speak_summary":"Ouvir Resumo","btn_close_summary":"Fechar","initial_modal_title":"Selecione o seu Idioma","initial_modal_subtitle":"Escolha seu idioma para continuar na plataforma","initial_modal_btn":"Confirmar Idioma e Começar","filter_all":"Todas","subject_math":"Matemática","subject_science":"Ciências","subject_history":"História / Geo","subject_languages":"Línguas","subject_tech":"Tecnologia","subject_general":"Geral"
  },"en": {"nav_live":"Connected","nav_direct":"Direct Mode / Offline","nav_room_prefix":"Room:","nav_projector":"Project QR Code","tab_teacher":"Teacher's Desk","tab_student":"Student's Desk","tab_dialogue":"1-on-1 Meeting","tab_guide":"User Guide","teacher_card_title":"Voice Broadcast","app_version":"v2.4 Pro","teacher_card_desc":"Your speech is captured, translated in real-time, and broadcast to all connected students","teacher_input_lang_label":"Input Language:","teacher_mic_status_idle":"Tap the microphone to start broadcasting","teacher_mic_status_live":"Live Class in Progress (Speak into microphone)","teacher_mic_hint":"Speak clearly. Translation into Hindi, French, English, and other languages happens in real-time.","teacher_manual_label":"Type a message or announcement for the class (works without microphone):","teacher_manual_placeholder":"E.g.: Open the material to chapter 3...","btn_transmit":"Broadcast","transcript_card_title":"Broadcast Transcript","btn_export":"Export (.txt)","btn_clear":"Clear","student_access_title":"Student Access","student_access_desc":"Display this QR Code for students to connect their devices on the same Wi-Fi:","btn_copy":"Copy","room_id_label":"Room Identifier:","btn_save":"Save","connected_card_title":"Connected Participants","connected_card_desc":"Real-time language distribution:","unlock_audio_title":"Enable audio playback","unlock_audio_desc":"Tap the button beside to hear live translation in your headphones.","btn_unlock_audio":"Enable Audio","student_panel_title":"Translation Reception","student_listen_label":"Listen and read in:","student_autospeak_label":"Play voice automatically","btn_test_audio":"Test Audio","student_font_label":"Text:","student_speed_label":"Speed:","student_speed_slow":"0.85x (Slow)","student_speed_fast":"1.15x (Fast)","student_speed_normal":"1.0x (Normal)","caption_waiting":"Waiting for teacher's speech...","caption_badge":"Simultaneous Translation","caption_default_text":"Connect your headphones. When the teacher speaks, translated subtitles will appear here and play in your language.","btn_replay":"Listen Again","ask_title":"Ask the Teacher a Question (Vice-Versa)","ask_speak_label":"My Speaking Language:","ask_desc":"Press the button and speak in your native language (e.g., Hindi, French, English). Your question will be translated and delivered directly to the teacher.","btn_ask_student":"Ask Teacher a Question","btn_ask_student_stop":"⏹ Finish Question","student_history_title":"Translated Phrases History","dialogue_card_title":"1-on-1 Bilateral Meeting","dialogue_card_desc":"Two-way direct communication for pedagogical conferences or parent-teacher meetings","dialogue_side_a_title":"Educator (Side A)","btn_dialogue_side_a":"Speak Side A","dialogue_side_b_title":"Student / Parent (Side B)","btn_dialogue_side_b":"Speak Side B","dialogue_history_label":"Recorded Dialogue:","guide_title":"Operation Manual & Accessibility Guidelines","guide_desc":"Yanik, Translator connects educators and students in multilingual classrooms with real-time bidirectional translation for Hindi, Portuguese, English, French, and 50+ languages.","guide_card1_title":"1. Local Wi-Fi Connection","guide_card1_desc":"Devices only need to be on the same Wi-Fi. Students scan the room QR Code to connect instantly with no apps required.","guide_card2_title":"2. Headphone Usage","guide_card2_desc":"Each student listens to the teacher in their native language using headphones, keeping the classroom quiet and focused.","guide_card3_title":"3. Bidirectional Interaction","guide_card3_desc":"By tapping 'Ask Question', students speak in their native tongue and it is translated for the teacher in Portuguese.","projector_modal_title":"Connect to the Class","projector_modal_desc":"Point your phone camera to hear live class translation in your language","projector_wifi_label":"Local Wi-Fi Network","footer_text":"Yanik, Translator © 2026 • Real-Time Simultaneous Translation System • Compatible with PC, Mac, Android and iOS","btn_create_room":"Create/Change Room","btn_summarize_teacher":"Summarize Class with AI","btn_browse_rooms":"Search/Switch Classes","btn_class_summary":"Class Summary","modal_create_title":"Create or Configure Classroom","label_room_title":"Class Title/Subject:","label_teacher_name":"Teacher's Name:","label_subject":"Discipline/Subject:","label_room_code":"Room Code (for students to enter):","label_teacher_speech_lang":"Teacher's Speech Language:","btn_generate":"To generate","btn_cancel":"Cancel","btn_start_room":"Start Class in this Room","modal_browse_title":"Search for Available Classes at the School","btn_refresh":"Update","placeholder_search_rooms":"Search for class by subject, teacher or code...","btn_join_room":"Join Class","btn_copy_summary":"Copy Summary","btn_download_summary":"Download (.txt)","btn_print_summary":"Print/PDF","btn_speak_summary":"Listen Summary","btn_close_summary":"To close","initial_modal_title":"Select your Language","initial_modal_subtitle":"Choose your language to continue on the platform","initial_modal_btn":"Confirm Language and Get Started","filter_all":"All","subject_math":"Mathematics","subject_science":"Science","subject_history":"History / Geo","subject_languages":"Languages","subject_tech":"Technology","subject_general":"General"
  },"es": {"nav_direct":"Modo Directo / Offline","nav_projector":"Proyectar Código QR","tab_teacher":"Mesa del Profesor","tab_student":"Pupitre del Alumno","tab_dialogue":"Atención 1 a 1","tab_guide":"Guía de Uso","teacher_card_title":"Transmisión de Voz","nav_live":"Conectado","nav_room_prefix":"Habitación:","app_version":"v2.4 Pro","teacher_card_desc":"Su voz es captada, traducida en tiempo real y transmitida a los alumnos conectados","teacher_mic_status_idle":"Toque el micrófono para iniciar la transmisión","teacher_mic_status_live":"Clase en transmisión en vivo (Hable al micrófono)","teacher_mic_hint":"Hable con claridad. La traducción a hindi, francés, inglés y otros idiomas ocurre en tiempo real.","teacher_manual_label":"Escribir mensaje para la clase (funciona incluso sin micrófono):","teacher_manual_placeholder":"Ej: Abran el libro en el capítulo 3...","transcript_card_title":"Registro de Transmisión","btn_transmit":"Arroyo","teacher_input_lang_label":"Idioma de entrada:","btn_export":"Exportar (.txt)","btn_clear":"Limpiar","student_access_title":"Acceso de Alumnos","student_access_desc":"Muestre este código QR para que los alumnos se conecten en la misma red Wi-Fi:","room_id_label":"Identificador de Sala:","btn_save":"Guardar","connected_card_desc":"Distribución de idiomas en tiempo real:","unlock_audio_title":"Activar reproducción de audio","unlock_audio_desc":"Toque el botón al lado para escuchar la traducción en vivo en sus auriculares.","btn_copy":"Copiar","connected_card_title":"Participantes conectados","btn_unlock_audio":"Activar Audio","student_panel_title":"Recepción de Traducción","student_listen_label":"Escuchar y leer en:","student_autospeak_label":"Reproducir voz automáticamente","btn_test_audio":"Probar Sonido","student_font_label":"Texto:","student_speed_label":"Ritmo:","student_speed_slow":"0,85x (lento)","student_speed_fast":"1,15x (rápido)","student_speed_normal":"1,0x (Normal)","caption_waiting":"Esperando voz del profesor...","caption_badge":"Traducción Simultánea","caption_default_text":"Conecte sus auriculares. Cuando el profesor hable, los subtítulos traducidos aparecerán aquí y se escucharán en su idioma.","btn_replay":"Escuchar de Nuevo","ask_title":"Hacer Pregunta al Profesor (Viceversa)","ask_speak_label":"Mi Idioma de Habla:","ask_desc":"Presione el botón y hable en su lengua materna. Su duda será traducida y entregada directamente al profesor.","btn_ask_student":"Preguntar al Profesor","btn_ask_student_stop":"⏹ Concluir Pregunta","student_history_title":"Historial de Frases Traducidas","dialogue_card_title":"Atención Individual y Bilateral","dialogue_card_desc":"Comunicación directa en dos sentidos para reuniones pedagógicas o atención a tutores","btn_dialogue_side_a":"Hablar Lado A","dialogue_side_b_title":"Alumno / Tutor (Lado B)","btn_dialogue_side_b":"Hablar Lado B","guide_title":"Manual de Operación y Accesibilidad Lingüística","guide_desc":"Yanik, Translator conecta profesores y alumnos en aulas multilingües con traducción simultánea bidireccional en tiempo real.","guide_card1_title":"1. Conexión Wi-Fi Local","dialogue_side_a_title":"Educador (Lado A)","dialogue_history_label":"Diálogo registrado:","guide_card1_desc":"Solo requieren estar en la misma red Wi-Fi. Los alumnos escanean el código QR sin descargar ninguna app.","guide_card2_title":"2. Uso de Auriculares","guide_card2_desc":"Cada alumno escucha al profesor en su idioma nativo con auriculares, manteniendo el aula en silencio.","guide_card3_title":"3. Interacción Bidireccional","guide_card3_desc":"Al tocar 'Preguntar', el alumno habla en su lengua nativa y la pregunta llega traducida al profesor en portugués.","projector_modal_title":"Conectarse a la Clase","projector_modal_desc":"Apunte la cámara del celular para escuchar la clase en su idioma","projector_wifi_label":"Red Wi-Fi Local","footer_text":"Yanik, Translator © 2026 • Sistema de Traducción Simultánea en Tiempo Real","btn_create_room":"Crear/Cambiar Sala","btn_summarize_teacher":"Resumir clase con IA","btn_browse_rooms":"Buscar/Cambiar clases","btn_class_summary":"Resumen de clase","modal_create_title":"Crear o configurar Classroom","label_room_title":"Título/Asunto de la clase:","label_teacher_name":"Nombre del maestro:","label_subject":"Disciplina/Materia:","label_room_code":"Código de habitación (para que los estudiantes ingresen):","label_teacher_speech_lang":"Lenguaje del habla del profesor:","btn_generate":"para generar","btn_cancel":"Cancelar","btn_start_room":"Comienza la clase en esta sala","modal_browse_title":"Búsqueda de clases disponibles en la escuela","btn_refresh":"Actualización","placeholder_search_rooms":"Buscar clase por materia, profesor o código...","btn_join_room":"Unirse a la clase","btn_copy_summary":"Copiar resumen","btn_download_summary":"Descargar (.txt)","btn_print_summary":"Imprimir/PDF","btn_speak_summary":"Escuchar resumen","btn_close_summary":"para cerrar","initial_modal_title":"Selecciona tu idioma","initial_modal_subtitle":"Elige tu idioma para continuar en la plataforma","initial_modal_btn":"Confirme el idioma y comience","filter_all":"Todas","subject_math":"Matemáticas","subject_science":"Ciencias","subject_history":"Historia / Geo","subject_languages":"Idiomas","subject_tech":"Tecnología","subject_general":"General"
  },"fr": {"nav_live":"Connecté","nav_direct":"Mode Direct / Hors-ligne","nav_room_prefix":"Salle:","nav_projector":"Projeter le code QR","tab_teacher":"Bureau du Professeur","tab_student":"Bureau de l'Élève","tab_dialogue":"Entretien 1-à-1","tab_guide":"Guide d'Utilisation","teacher_card_title":"Diffusion Vocale","app_version":"v2.4 Professionnel","teacher_card_desc":"Votre voix est captée, traduite en temps réel et diffusée aux élèves connectés","teacher_input_lang_label":"Langue d'entrée:","teacher_mic_status_idle":"Appuyez sur le micro pour commencer la diffusion","teacher_mic_status_live":"Cours en direct (Parlez dans le micro)","teacher_mic_hint":"Parlez clairement. La traduction vers l'hindi, le français, l'anglais, etc. a lieu en temps réel.","teacher_manual_label":"Taper un message pour la classe (fonctionne sans micro):","teacher_manual_placeholder":"Ex: Ouvrez vos livres à la page 15...","btn_transmit":"Diffuser","transcript_card_title":"Registre de Transmission","btn_export":"Exporter (.txt)","btn_clear":"Effacer","student_access_title":"Accès des Élèves","student_access_desc":"Affichez ce code QR pour que les élèves se connectent sur le même Wi-Fi:","btn_copy":"Copier","room_id_label":"Identifiant de Salle:","btn_save":"Enregistrer","connected_card_title":"Participants Connectés","connected_card_desc":"Répartition des langues en direct:","unlock_audio_title":"Activer la lecture audio","unlock_audio_desc":"Touchez le bouton pour entendre la traduction en direct dans vos écouteurs.","btn_unlock_audio":"Activer l'Audio","student_panel_title":"Réception de la Traduction","student_listen_label":"Écouter et lire en:","student_autospeak_label":"Lecture vocale automatique","btn_test_audio":"Tester le Son","student_font_label":"Texte:","student_speed_label":"Rythme:","student_speed_slow":"0.85x (Lent)","student_speed_fast":"1.15x (Rapide)","student_speed_normal":"1,0x (normal)","caption_waiting":"En attente de la parole du professeur...","caption_badge":"Traduction Simultanée","caption_default_text":"Branchez vos écouteurs. Lorsque l'enseignant parle, les sous-titres traduits apparaîtront ici et seront lus dans votre langue.","btn_replay":"Réécouter","ask_title":"Poser une Question au Professeur (Vice-Versa)","ask_speak_label":"Ma Langue d'Élocution:","ask_desc":"Appuyez sur le bouton et posez votre question dans votre langue maternelle. Elle sera traduite et envoyée au professeur.","btn_ask_student":"Poser une Question","btn_ask_student_stop":"⏹ Terminer la Question","student_history_title":"Historique des Phrases Traduites","dialogue_card_title":"Entretien Individuel et Bilatéral","dialogue_card_desc":"Communication directe dans les deux sens pour réunions pédagogiques ou avec les parents","dialogue_side_a_title":"Éducateur (Côté A)","btn_dialogue_side_a":"Parler Côté A","dialogue_side_b_title":"Élève / Parent (Côté B)","btn_dialogue_side_b":"Parler Côté B","dialogue_history_label":"Dialogue Enregistré:","guide_title":"Manuel d'Opération et Directives d'Accessibilité","guide_desc":"Yanik, Translator connecte enseignants et élèves dans des classes multilingues grâce à la traduction simultanée bidirectionnelle en direct.","guide_card1_title":"1. Connexion Wi-Fi Locale","guide_card1_desc":"Les appareils doivent simplement être sur le même Wi-Fi. Les élèves scannent le code QR sans installer d'application.","guide_card2_title":"2. Utilisation des Écouteurs","guide_card2_desc":"Chaque élève écoute l'enseignant dans sa langue maternelle grâce à ses écouteurs, maintenant la classe calme.","guide_card3_title":"3. Interaction Bidirectionnelle","guide_card3_desc":"En cliquant sur 'Poser une Question', l'élève parle dans sa langue et le professeur reçoit la traduction en portugais.","projector_modal_title":"Rejoindre le Cours","projector_modal_desc":"Scannez le code QR pour écouter la traduction du cours dans votre langue","projector_wifi_label":"Réseau Wi-Fi Local","footer_text":"Yanik, Translator © 2026 • Système de Traduction Simultanée en Temps Réel","btn_create_room":"Créer/Changer de salle","btn_summarize_teacher":"Résumer la classe avec l'IA","btn_browse_rooms":"Rechercher/changer de classe","btn_class_summary":"Résumé du cours","modal_create_title":"Créer ou configurer une salle de classe","label_room_title":"Titre/sujet du cours :","label_teacher_name":"Nom de l'enseignant :","label_subject":"Discipline/Sujet :","label_room_code":"Code de la chambre (à saisir par les étudiants) :","label_teacher_speech_lang":"Langue parlée de l'enseignant :","btn_generate":"Pour générer","btn_cancel":"Annuler","btn_start_room":"Commencez le cours dans cette salle","modal_browse_title":"Recherche des cours disponibles à l'école","btn_refresh":"Mise à jour","placeholder_search_rooms":"Rechercher une classe par matière, professeur ou code...","btn_join_room":"Rejoindre la classe","btn_copy_summary":"Copier le résumé","btn_download_summary":"Télécharger (.txt)","btn_print_summary":"Imprimer/PDF","btn_speak_summary":"Écouter le résumé","btn_close_summary":"Pour fermer","initial_modal_title":"Sélectionnez votre langue","initial_modal_subtitle":"Choisissez votre langue pour continuer sur la plateforme","initial_modal_btn":"Confirmez la langue et commencez","filter_all":"Toutes","subject_math":"Mathématiques","subject_science":"Sciences","subject_history":"Histoire / Géo","subject_languages":"Langues","subject_tech":"Technologie","subject_general":"Général"
  },"de": {"nav_live":"Verbunden","nav_direct":"Direktmodus / Offline","nav_room_prefix":"Raum:","nav_projector":"QR-Code Projizieren","tab_teacher":"Lehrerpult","tab_student":"Schülerpult","tab_dialogue":"1-zu-1 Gespräch","tab_guide":"Handbuch","teacher_card_title":"Sprachübertragung","app_version":"v2.4 Pro","teacher_card_desc":"Ihre Stimme wird in Echtzeit erfasst, übersetzt und an verbundene Schüler übertragen","teacher_input_lang_label":"Eingabesprache:","teacher_mic_status_idle":"Tippen Sie auf das Mikrofon, um die Übertragung zu starten","teacher_mic_status_live":"Live-Unterricht läuft (Sprechen Sie ins Mikrofon)","teacher_mic_hint":"Sprechen Sie deutlich. Die Übersetzung erfolgt simultan in Echtzeit.","teacher_manual_label":"Nachricht an die Klasse eintippen (funktioniert auch ohne Mikrofon):","teacher_manual_placeholder":"Z.B.: Bitte Buch auf Seite 15 aufschlagen...","btn_transmit":"Senden","transcript_card_title":"Übertragungsprotokoll","btn_export":"Exportieren (.txt)","btn_clear":"Löschen","student_access_title":"Schülerzugang","student_access_desc":"QR-Code für Schüler im selben WLAN anzeigen:","btn_copy":"Kopieren","room_id_label":"Raum-Kennung:","btn_save":"Speichern","connected_card_title":"Verbundene Teilnehmer","connected_card_desc":"Echtzeit-Sprachverteilung:","unlock_audio_title":"Audiowiedergabe aktivieren","unlock_audio_desc":"Tippen Sie auf die Schaltfläche, um die Live-Übersetzung auf Ihren Kopfhörern zu hören.","btn_unlock_audio":"Audio aktivieren","student_panel_title":"Übersetzungsempfang","student_listen_label":"Hören und lesen in:","student_autospeak_label":"Automatische Sprachausgabe","btn_test_audio":"Ton testen","student_font_label":"Schrift:","student_speed_label":"Tempo:","student_speed_slow":"0.85x (Langsam)","student_speed_fast":"1.15x (Schnell)","student_speed_normal":"1,0x (Normal)","caption_waiting":"Warte auf Sprache des Lehrers...","caption_badge":"Simultanübersetzung","caption_default_text":"Schließen Sie Ihre Kopfhörer an. Wenn der Lehrer spricht, erscheinen die Untertitel hier und werden in Ihrer Sprache vorgelesen.","btn_replay":"Nochmal anhören","ask_title":"Frage an den Lehrer stellen (Gegenseitig)","ask_speak_label":"Meine Sprechsprache:","ask_desc":"Sprechen Sie in Ihrer Muttersprache. Ihre Frage wird für den Lehrer übersetzt.","btn_ask_student":"Frage stellen","btn_ask_student_stop":"⏹ Beenden","student_history_title":"Übersetzungshistorie","dialogue_card_title":"1-zu-1 Elterngespräch","dialogue_card_desc":"Direkte Zwei-Wege-Kommunikation für Elterngespräche","dialogue_side_a_title":"Lehrkraft (Seite A)","btn_dialogue_side_a":"Sprechen Seite A","dialogue_side_b_title":"Schüler / Eltern (Seite B)","btn_dialogue_side_b":"Sprechen Seite B","dialogue_history_label":"Gesprächsprotokoll:","guide_title":"Bedienungsanleitung & Inklusion","guide_desc":"Yanik, Translator verbindet Lehrkräfte und Schüler in mehrsprachigen Klassen.","guide_card1_title":"1. Lokale WLAN-Verbindung","guide_card1_desc":"Schüler scannen den QR-Code im selben WLAN ohne App-Download.","guide_card2_title":"2. Kopfhörer verwenden","guide_card2_desc":"Schüler hören den Unterricht leise über Kopfhörer in ihrer Muttersprache.","guide_card3_title":"3. Zwei-Wege-Interaktion","guide_card3_desc":"Schüler können Fragen in ihrer Sprache stellen.","projector_modal_title":"Am Unterricht teilnehmen","projector_modal_desc":"Kamera auf QR-Code richten, um den Unterricht in Ihrer Sprache zu hören","projector_wifi_label":"Lokales WLAN","footer_text":"Yanik, Translator © 2026 • Simultanübersetzungssystem in Echtzeit","btn_create_room":"Raum erstellen/ändern","btn_summarize_teacher":"Klasse mit KI zusammenfassen","btn_browse_rooms":"Klassen suchen/wechseln","btn_class_summary":"Klassenzusammenfassung","modal_create_title":"Klassenzimmer erstellen oder konfigurieren","label_room_title":"Titel/Thema der Klasse:","label_teacher_name":"Name des Lehrers:","label_subject":"Disziplin/Thema:","label_room_code":"Raumcode (zur Eingabe durch Studierende):","label_teacher_speech_lang":"Sprechsprache des Lehrers:","btn_generate":"Generieren","btn_cancel":"Stornieren","btn_start_room":"Beginnen Sie den Unterricht in diesem Raum","modal_browse_title":"Suchen Sie nach verfügbaren Klassen in der Schule","btn_refresh":"Aktualisieren","placeholder_search_rooms":"Suchen Sie nach einer Klasse nach Fach, Lehrer oder Code ...","btn_join_room":"Treten Sie der Klasse bei","btn_copy_summary":"Zusammenfassung kopieren","btn_download_summary":"Herunterladen (.txt)","btn_print_summary":"Drucken/PDF","btn_speak_summary":"Zusammenfassung anhören","btn_close_summary":"Zum Schließen","initial_modal_title":"Wählen Sie Ihre Sprache aus","initial_modal_subtitle":"Wählen Sie Ihre Sprache, um auf der Plattform fortzufahren","initial_modal_btn":"Bestätigen Sie die Sprache und legen Sie los","filter_all":"Alle","subject_math":"Mathematik","subject_science":"Wissenschaft","subject_history":"Geschichte / Geo","subject_languages":"Sprachen","subject_tech":"Technologie","subject_general":"Allgemein"
  },"it": {"nav_live":"Collegato","nav_room_prefix":"Camera:","app_version":"v2.4Pro","tab_guide":"Manuale dell'utente","tab_teacher":"Tavolo dell'insegnante","tab_dialogue":"Supporto 1 a 1","tab_student":"Carta dello studente","nav_projector":"Progetta il codice QR","nav_direct":"Modalità live/offline","teacher_card_title":"Trasmissione vocale","btn_transmit":"Flusso","transcript_card_title":"Registro della trasmissione","btn_export":"Esporta (.txt)","teacher_input_lang_label":"Lingua di input:","teacher_card_desc":"Il tuo discorso viene catturato, tradotto in tempo reale e trasmesso agli studenti collegati","teacher_manual_label":"Digita un messaggio o un annuncio per la classe (funziona anche senza microfono):","teacher_mic_status_live":"Lezione in live streaming (parla al microfono)","teacher_manual_placeholder":"Esempio: aprire il materiale al capitolo 3...","teacher_mic_hint":"Parla chiaramente. La traduzione in hindi, francese, inglese e altre lingue avviene in tempo reale.","teacher_mic_status_idle":"Tocca il microfono per avviare lo streaming","btn_copy":"Copia","btn_save":"Salva","btn_clear":"Per pulire","connected_card_title":"Partecipanti collegati","unlock_audio_desc":"Tocca il pulsante accanto per ascoltare la traduzione ad alta voce sulle cuffie.","student_access_desc":"Visualizza questo codice QR affinché gli studenti possano connettere i propri dispositivi alla stessa rete Wi-Fi:","unlock_audio_title":"Abilita la riproduzione audio","connected_card_desc":"Distribuzione della lingua in tempo reale:","room_id_label":"Identificatore della stanza:","student_access_title":"Accesso degli studenti","student_speed_label":"Ritmo:","student_speed_normal":"1,0x (normale)","student_speed_slow":"0,85x (lento)","student_speed_fast":"1,15x (Veloce)","student_font_label":"Testo:","student_autospeak_label":"Riproduci automaticamente la voce","student_panel_title":"Ricevimento di traduzione","btn_test_audio":"Prova il suono","btn_unlock_audio":"Abilita l'audio","student_listen_label":"Ascolta e leggi su:","btn_replay":"Ascolta ancora","btn_ask_student_stop":"⏹Domanda completa","student_history_title":"Storia delle frasi tradotte","caption_badge":"Traduzione simultanea","ask_title":"Fai una domanda all'insegnante (viceversa)","ask_desc":"Premi il pulsante e parla nella tua lingua madre (ad esempio hindi, francese, inglese). La tua domanda verrà tradotta e consegnata direttamente al docente.","ask_speak_label":"La mia lingua parlata:","caption_default_text":"Collega le cuffie. Quando l'insegnante parla, i sottotitoli tradotti appariranno qui e verranno riprodotti nella tua lingua.","btn_ask_student":"Fai una domanda all'insegnante","caption_waiting":"Aspetto che parli l'insegnante...","dialogue_history_label":"Dialogo registrato:","dialogue_side_a_title":"Educatore (Lato A)","btn_dialogue_side_a":"Parla lato A","dialogue_side_b_title":"Studente/Tutore (Lato B)","dialogue_card_title":"Servizio individuale e bilaterale","guide_title":"Manuale operativo e linee guida per l'accessibilità","guide_card1_title":"1. Connessione alla rete locale Wi-Fi","btn_dialogue_side_b":"Parla del lato B","dialogue_card_desc":"Comunicazione bidirezionale diretta per riunioni pedagogiche o presenza con i tutori","guide_desc":"Yanik, Translator collega educatori e studenti in ambienti multilingue, promuovendo l'inclusione immediata di studenti stranieri, rifugiati e immigrati con traduzione bidirezionale in tempo reale in hindi, portoghese, inglese, francese e più di 100 lingue.","guide_card2_desc":"Ogni studente può ascoltare l'insegnante nella propria lingua madre tramite cuffie (cablate o Bluetooth), mantenendo la stanza silenziosa e concentrata.","projector_modal_desc":"Punta la fotocamera del tuo cellulare per ascoltare la traduzione della lezione nella tua lingua","footer_text":"Yanik, Traduttore © 2026 • Sistema di traduzione simultanea in tempo reale • Compatibile con PC, Mac, Android e iOS","guide_card2_title":"2. Utilizzo delle cuffie","projector_wifi_label":"Rete Wi-Fi locale","projector_modal_title":"Connettiti alla classe","guide_card3_title":"3. Interazione bidirezionale","guide_card3_desc":"Facendo clic su \"Fai domanda\", lo studente parla nella propria lingua madre (ad esempio l'hindi) e la domanda viene tradotta e visualizzata sullo schermo dell'insegnante in portoghese.","guide_card1_desc":"Tutti i telefoni cellulari e i computer devono essere sullo stesso router o Wi-Fi. Lo studente legge il QR Code della stanza e si connette subito, senza bisogno di registrazioni o download.","btn_create_room":"Crea/Cambia stanza","btn_summarize_teacher":"Riassumi la lezione con l'intelligenza artificiale","btn_browse_rooms":"Cerca/Cambia classe","btn_class_summary":"Riepilogo della lezione","modal_create_title":"Crea o configura la classe","label_room_title":"Titolo/Oggetto della lezione:","label_teacher_name":"Nome dell'insegnante:","label_subject":"Disciplina/Materia:","label_room_code":"Codice camera (da inserire per gli studenti):","label_teacher_speech_lang":"Linguaggio dell'insegnante:","btn_generate":"Per generare","btn_cancel":"Cancellare","btn_start_room":"Inizia la lezione in questa stanza","modal_browse_title":"Cerca le classi disponibili presso la scuola","btn_refresh":"Aggiornamento","placeholder_search_rooms":"Cerca la classe per materia, insegnante o codice...","btn_join_room":"Partecipa alla lezione","btn_copy_summary":"Copia riepilogo","btn_download_summary":"Scarica (.txt)","btn_print_summary":"Stampa/PDF","btn_speak_summary":"Ascolta il riepilogo","btn_close_summary":"Per chiudere","initial_modal_title":"Seleziona la tua lingua","initial_modal_subtitle":"Scegli la tua lingua per continuare sulla piattaforma","initial_modal_btn":"Conferma la lingua e inizia","filter_all":"Tutte","subject_math":"Matematica","subject_science":"Scienze","subject_history":"Storia / Geo","subject_languages":"Lingue","subject_tech":"Tecnologia","subject_general":"Generale"
  },"hi": {"nav_live":"सक्रिय जुड़ा हुआ","nav_direct":"प्रत्यक्ष मोड / ऑफ़लाइन","nav_room_prefix":"कक्ष:","nav_projector":"क्यूआर कोड प्रोजेक्ट करें","tab_teacher":"शिक्षक की मेज","tab_student":"विद्यार्थी की डेस्क","tab_dialogue":"1-पर-1 व्यक्तिगत संवाद","tab_guide":"उपयोग निर्देशिका","teacher_card_title":"आवाज़ का प्रसारण","app_version":"v2.4 प्रो","teacher_card_desc":"आपकी वाणी को रिकॉर्ड कर, वास्तविक समय में अनुवाद कर जुड़े हुए छात्रों को भेजा जाता है","teacher_input_lang_label":"इनपुट भाषा:","teacher_mic_status_idle":"प्रसारण शुरू करने के लिए माइक पर टैप करें","teacher_mic_status_live":"कक्षा लाइव प्रसारित हो रही है (माइक में बोलें)","teacher_mic_hint":"स्पष्टता से बोलें। अनुवाद तुरंत छात्रों की भाषा में प्रसारित होता है।","teacher_manual_label":"कक्षा के लिए संदेश या सूचना टाइप करें (माइक के बिना भी काम करता है):","teacher_manual_placeholder":"उदा.: पाठ्यपुस्तक का अध्याय 3 खोलें...","btn_transmit":"प्रसारित करें","transcript_card_title":"प्रसारण का रिकॉर्ड","btn_export":"डाउनलोड करें (.txt)","btn_clear":"साफ़ करें","student_access_title":"छात्रों की पहुंच","student_access_desc":"छात्रों को उसी वाई-फ़ाई पर जोड़ने के लिए यह क्यूआर कोड दिखाएं:","btn_copy":"कॉपी करें","room_id_label":"कक्ष का पहचानकर्ता:","btn_save":"सहेजें","connected_card_title":"जुड़े हुए छात्र","connected_card_desc":"वास्तविक समय में भाषाओं का वितरण:","unlock_audio_title":"आवाज़ चालू करें","unlock_audio_desc":"अपने हेडफ़ोन में कक्षा का अनुवाद सुनने के लिए बटन दबाएं।","btn_unlock_audio":"आवाज़ चालू करें","student_panel_title":"अनुवाद प्राप्ति","student_listen_label":"इस भाषा में सुनें और पढ़ें:","student_autospeak_label":"आवाज़ अपने आप चलाएं","btn_test_audio":"आवाज़ जांचें","student_font_label":"अक्षर:","student_speed_label":"गति:","student_speed_slow":"0.85x (धीमा)","student_speed_normal":"1.0x (सामान्य)","student_speed_fast":"1.15x (तेज़)","caption_waiting":"शिक्षक के बोलने की प्रतीक्षा की जा रही है...","caption_badge":"युगपत अनुवाद","caption_default_text":"अपने हेडफ़ोन लगाएं। जब शिक्षक बोलेंगे, अनुवाद यहाँ दिखाई देगा और आपकी भाषा में सुनाई देगा।","btn_replay":"फिर से सुनें","ask_title":"शिक्षक से प्रश्न पूछें (उलटा अनुवाद)","ask_speak_label":"मेरी बोलने की भाषा:","ask_desc":"बटन दबाएं और अपनी भाषा में प्रश्न पूछें। आपका प्रश्न अनुवादित होकर शिक्षक को भेजा जाएगा।","btn_ask_student":"शिक्षक से प्रश्न पूछें","btn_ask_student_stop":"⏹ प्रश्न समाप्त करें","student_history_title":"अनुवादित वाक्यों का इतिहास","dialogue_card_title":"व्यक्तिगत एवं द्विपक्षीय संवाद","dialogue_card_desc":"अभिभावक-शिक्षक बैठक या व्यक्तिगत मार्गदर्शन के लिए दोतरफा अनुवाद","dialogue_side_a_title":"शिक्षक (पक्ष A)","btn_dialogue_side_a":"बोलें (पक्ष A)","dialogue_side_b_title":"छात्र / अभिभावक (पक्ष B)","btn_dialogue_side_b":"बोलें (पक्ष B)","dialogue_history_label":"दर्ज संवाद:","guide_title":"संचालन निर्देशिका एवं भाषाई समावेशन","guide_desc":"यानिक ट्रांसलेटर बहुभाषी कक्षाओं में शिक्षकों और छात्रों को वास्तविक समय अनुवाद से जोड़ता है।","guide_card1_title":"1. स्थानीय वाई-फ़ाई से जुड़ाव","guide_card1_desc":"एक ही वाई-फ़ाई पर बिना किसी ऐप डाउनलोड के क्यूआर कोड स्कैन करके तुरंत जुड़ें।","guide_card2_title":"2. हेडफ़ोन का प्रयोग","guide_card2_desc":"प्रत्येक छात्र अपने हेडफ़ोन में अनुवाद सुनता है, जिससे कक्षा शांत रहती है।","guide_card3_title":"3. द्विपक्षीय संवाद","guide_card3_desc":"छात्र अपनी मातृभाषा में प्रश्न पूछ सकते हैं जो शिक्षक को पुर्तगाली में मिलता है।","projector_modal_title":"कक्षा से जुड़ें","projector_modal_desc":"अपनी भाषा में अनुवाद सुनने के लिए कैमरे से क्यूआर कोड स्कैन करें","projector_wifi_label":"स्थानीय वाई-फ़ाई नेटवर्क","footer_text":"यानिक, ट्रांसलेटर © 2026 • वास्तविक समय युगपत अनुवाद प्रणाली","btn_create_room":"कक्ष बनाएं/बदलें","btn_summarize_teacher":"एआई के साथ कक्षा को सारांशित करें","btn_browse_rooms":"कक्षाएं खोजें/स्विच करें","btn_class_summary":"कक्षा सारांश","modal_create_title":"कक्षा बनाएं या कॉन्फ़िगर करें","label_room_title":"कक्षा शीर्षक/विषय:","label_teacher_name":"शिक्षक का नाम:","label_subject":"अनुशासन/विषय:","label_room_code":"कक्ष कोड (छात्रों के प्रवेश के लिए):","label_teacher_speech_lang":"शिक्षक की भाषण भाषा:","btn_generate":"उत्पन्न करना","btn_cancel":"रद्द करना","btn_start_room":"इस कमरे में कक्षा प्रारंभ करें","modal_browse_title":"स्कूल में उपलब्ध कक्षाएं खोजें","btn_refresh":"अद्यतन","placeholder_search_rooms":"विषय, शिक्षक या कोड के आधार पर कक्षा खोजें...","btn_join_room":"कक्षा में शामिल हों","btn_copy_summary":"सारांश कॉपी करें","btn_download_summary":"डाउनलोड करें (.txt)","btn_print_summary":"प्रिंट/पीडीएफ","btn_speak_summary":"सारांश सुनें","btn_close_summary":"बंद कर देना","initial_modal_title":"अपनी भाषा का चयन करें","initial_modal_subtitle":"प्लेटफ़ॉर्म पर जारी रखने के लिए अपनी भाषा चुनें","initial_modal_btn":"भाषा की पुष्टि करें और आरंभ करें","filter_all":"सभी","subject_math":"गणित","subject_science":"विज्ञान","subject_history":"इतिहास / भूगोल","subject_languages":"भाषाएँ","subject_tech":"प्रौद्योगिकी","subject_general":"सामान्य"
  },"ar": {"nav_live":"متصل","nav_direct":"وضع مباشر / دون اتصال","nav_room_prefix":"القاعة:","nav_projector":"عرض رمز الاستجابة السريعة","tab_teacher":"منصة المعلم","tab_student":"مقعد الطالب","tab_dialogue":"حوار فردي 1 إلى 1","tab_guide":"دليل الاستخدام","teacher_card_title":"البث الصوتي المباشر","app_version":"v2.4 برو","teacher_card_desc":"يتم التقاط صوتك وترجمته فورياً وبثه إلى الطلاب المتصلين","teacher_input_lang_label":"لغة الإدخال:","teacher_mic_status_idle":"المس الميكروفون لبدء البث المباشر","teacher_mic_status_live":"الحصة تُبث مباشرة (تحدث في الميكروفون)","teacher_mic_hint":"تحدث بوضوح. تتم الترجمة فورياً إلى الهندية والفرنسية والإنجليزية وغيرها.","teacher_manual_label":"كتابة رسالة للصف (تعمل بدون ميكروفون):","teacher_manual_placeholder":"مثال: افتحوا الكتاب في الصفحة 15...","btn_transmit":"إرسال وبث","transcript_card_title":"سجل البث","btn_export":"تصدير (.txt)","btn_clear":"مسح","student_access_title":"انضمام الطلاب","student_access_desc":"اعرض رمز QR للطلاب المتصلين بنفس شبكة Wi-Fi:","btn_copy":"نسخ","room_id_label":"معرّف القاعة:","btn_save":"حفظ","connected_card_title":"الطلاب المتصلون","connected_card_desc":"توزيع اللغات المباشر:","unlock_audio_title":"تفعيل الصوت","unlock_audio_desc":"اضغط على الزر لسماع الترجمة المباشرة في سماعاتك.","btn_unlock_audio":"تفعيل الصوت","student_panel_title":"استقبال الترجمة","student_listen_label":"الاستماع والقراءة باللغة:","student_autospeak_label":"تشغيل الصوت تلقائياً","btn_test_audio":"اختبار الصوت","student_font_label":"الخط:","student_speed_label":"السرعة:","student_speed_slow":"0.85x (بطيء)","student_speed_normal":"1.0x (عادي)","student_speed_fast":"1.15x (سريع)","caption_waiting":"في انتظار حديث المعلم...","caption_badge":"ترجمة فورية","caption_default_text":"ضع سماعات الأذن. عندما يتحدث المعلم، ستظهر الترجمة هنا وسيتم تشغيلها بلغتك.","btn_replay":"إعادة الاستماع","ask_title":"طرح سؤال على المعلم (متبادل)","ask_speak_label":"لغة التحدث الخاصة بي:","ask_desc":"اضغط وتحدث بلغتك الأم. ستتم ترجمة سؤالك ونقله مباشرة إلى المعلم.","btn_ask_student":"طرح سؤال على المعلم","btn_ask_student_stop":"⏹ إنهاء السؤال","student_history_title":"سجل العبارات المترجمة","dialogue_card_title":"جلسة حوار ثنائية 1 إلى 1","dialogue_card_desc":"تواصل مباشر ثنائي الاتجاه للاجتماعات التربوية وأولياء الأمور","dialogue_side_a_title":"المعلم (الطرف A)","btn_dialogue_side_a":"تحدث (الطرف A)","dialogue_side_b_title":"الطالب / ولي الأمر (الطرف B)","btn_dialogue_side_b":"تحدث (الطرف B)","dialogue_history_label":"الحوار المسجل:","guide_title":"دليل التشغيل والشمول اللغوي","guide_desc":"يربط نظام Yanik, Translator المعلمين والطلاب في الفصول متعددة اللغات بترجمة فورية متزامنة.","guide_card1_title":"1. اتصال Wi-Fi محلي","guide_card1_desc":"يكفي الاتصال بنفس الشبكة ومسح رمز QR دون الحاجة لتنزيل أي تطبيق.","guide_card2_title":"2. استخدام السماعات","guide_card2_desc":"يستمع كل طالب للمعلم بلغته الأم في سماعاته للحفاظ على هدوء الفصل.","guide_card3_title":"3. تفاعل ثنائي الاتجاه","guide_card3_desc":"يمكن للطلاب طرح الأسئلة بلغتهم الأم لتصل للمعلم مترجمة.","projector_modal_title":"الانضمام للحصة","projector_modal_desc":"امسح الرمز بكاميرا هاتفك للاستماع إلى الحصة بلغتك","projector_wifi_label":"شبكة Wi-Fi المحلية","footer_text":"Yanik, Translator © 2026 • نظام الترجمة الفورية المتزامنة","btn_create_room":"إنشاء/تغيير الغرفة","btn_summarize_teacher":"تلخيص الفصل باستخدام الذكاء الاصطناعي","btn_browse_rooms":"بحث / تبديل الفئات","btn_class_summary":"ملخص الفصل","modal_create_title":"إنشاء أو تكوين الفصل الدراسي","label_room_title":"عنوان الفصل/الموضوع:","label_teacher_name":"اسم المعلم:","label_subject":"الانضباط / الموضوع:","label_room_code":"رمز الغرفة (للطلاب للدخول):","label_teacher_speech_lang":"لغة كلام المعلم:","btn_generate":"لتوليد","btn_cancel":"يلغي","btn_start_room":"ابدأ الدرس في هذه الغرفة","modal_browse_title":"البحث عن الفصول المتوفرة في المدرسة","btn_refresh":"تحديث","placeholder_search_rooms":"البحث عن الفصل حسب المادة أو المعلم أو الكود...","btn_join_room":"انضم إلى الفصل","btn_copy_summary":"ملخص النسخ","btn_download_summary":"تحميل (.txt)","btn_print_summary":"طباعة/PDF","btn_speak_summary":"استمع للملخص","btn_close_summary":"للإغلاق","initial_modal_title":"اختر لغتك","initial_modal_subtitle":"اختر لغتك للمتابعة على المنصة","initial_modal_btn":"تأكيد اللغة والبدء","filter_all":"الكل","subject_math":"رياضيات","subject_science":"علوم","subject_history":"تاريخ / جغرافيا","subject_languages":"لغات","subject_tech":"تكنولوجيا","subject_general":"عام"
  },"zh-CN": {"nav_live":"已连接","nav_direct":"直连 / 离线模式","nav_room_prefix":"教室:","nav_projector":"投影二维码","tab_teacher":"教师讲台","tab_student":"学生课桌","tab_dialogue":"一对一交流","tab_guide":"使用手册","teacher_card_title":"语音同传广播","app_version":"v2.4 专业版","teacher_card_desc":"您的讲课声音将被实时捕获、翻译并广播给所有已连接的学生","teacher_input_lang_label":"讲课语言:","teacher_mic_status_idle":"点击麦克风开始课堂同传广播","teacher_mic_status_live":"课堂正在实时直播（请对着麦克风说话）","teacher_mic_hint":"请清晰说话。系统将实时翻译成印地语、法语、英语等语言。","teacher_manual_label":"输入文字通知（无需麦克风也可使用）:","teacher_manual_placeholder":"例：请大家把课本翻到第15页...","btn_transmit":"广播发送","transcript_card_title":"同传广播记录","btn_export":"导出 (.txt)","btn_clear":"清空","student_access_title":"学生接入","student_access_desc":"向同一校园Wi-Fi下的学生出示此二维码以便即时加入:","btn_copy":"复制链接","room_id_label":"教室标识:","btn_save":"保存","connected_card_title":"在线学生","connected_card_desc":"实时语言分布:","unlock_audio_title":"开启音频收听","unlock_audio_desc":"点击旁边的按钮即可在耳机中实时收听同传语音。","btn_unlock_audio":"开启音频","student_panel_title":"同传接收","student_listen_label":"收听与阅读语言:","student_autospeak_label":"自动语音朗读","btn_test_audio":"测试声音","student_font_label":"字幕大小:","student_speed_label":"语速:","student_speed_slow":"0.85x (慢速)","student_speed_normal":"1.0x (正常)","student_speed_fast":"1.15x (快速)","caption_waiting":"等待教师开讲...","caption_badge":"实时同声传译","caption_default_text":"请戴上耳机。当老师讲课时，翻译字幕将在此处实时显示并朗读。","btn_replay":"重新播放","ask_title":"向老师举手提问（双向互动）","ask_speak_label":"我的提问语言:","ask_desc":"按住按钮并使用您的母语说话。您的疑问将被翻译并即时显示给老师。","btn_ask_student":"开始提问","btn_ask_student_stop":"⏹ 结束提问","student_history_title":"已翻译句子历史","dialogue_card_title":"一对一面对面交流","dialogue_card_desc":"针对家长会或个别辅导的双向即时对话翻译","dialogue_side_a_title":"教师（A方）","btn_dialogue_side_a":"A方讲话","dialogue_side_b_title":"学生 / 家长（B方）","btn_dialogue_side_b":"B方讲话","dialogue_history_label":"对话记录:","guide_title":"操作手册与校园包容性指南","guide_desc":"Yanik, Translator 致力于通过实时双向同声传译打破多语言课堂的交流壁垒。","guide_card1_title":"1. 本地Wi-Fi免装连接","guide_card1_desc":"只需连接同一校园Wi-Fi，扫码即可打开网页加入，无需安装App。","guide_card2_title":"2. 耳机静音收听","guide_card2_desc":"每个学生戴上耳机以自己的母语收听，保持课堂安静整洁。","guide_card3_title":"3. 双向举手互动","guide_card3_desc":"学生可用母语直接向老师提问，老师在电脑端以葡萄牙语查看。","projector_modal_title":"扫码加入课堂","projector_modal_desc":"请使用手机相机扫描二维码，用您的母语收听课堂翻译","projector_wifi_label":"本地Wi-Fi网络","footer_text":"Yanik, Translator © 2026 • 校园实时同声传译系统","btn_create_room":"创建/更改房间","btn_summarize_teacher":"AI 总结课堂","btn_browse_rooms":"搜索/切换类别","btn_class_summary":"课程总结","modal_create_title":"创建或配置教室","label_room_title":"班级名称/主题：","label_teacher_name":"老师姓名：","label_subject":"学科/主题：","label_room_code":"房间代码（供学生输入）：","label_teacher_speech_lang":"老师演讲语言：","btn_generate":"生成","btn_cancel":"取消","btn_start_room":"在这个房间开始上课","modal_browse_title":"搜索学校可用的课程","btn_refresh":"更新","placeholder_search_rooms":"按科目、教师或代码搜索课程...","btn_join_room":"加入班级","btn_copy_summary":"复制摘要","btn_download_summary":"下载（.txt）","btn_print_summary":"打印/PDF","btn_speak_summary":"听总结","btn_close_summary":"关闭","initial_modal_title":"选择您的语言","initial_modal_subtitle":"选择您的语言以继续在平台上使用","initial_modal_btn":"确认语言并开始","filter_all":"全部","subject_math":"数学","subject_science":"科学","subject_history":"历史 / 地理","subject_languages":"语言","subject_tech":"技术","subject_general":"通用"
  },"ja": {"nav_room_prefix":"部屋：","tab_guide":"ユーザーマニュアル","nav_live":"接続済み","tab_teacher":"先生のテーブル","nav_projector":"QRコードをデザインする","app_version":"v2.4 プロ","teacher_card_title":"音声ブロードキャスト","tab_dialogue":"1対1のサポート","tab_student":"学生証","nav_direct":"ライブ/オフラインモード","btn_transmit":"ストリーム","teacher_manual_placeholder":"例: 資料を第 3 章まで開きます...","teacher_card_desc":"あなたのスピーチはキャプチャされ、リアルタイムで翻訳され、接続されている生徒に送信されます。","teacher_manual_label":"クラスのメッセージまたはアナウンスを入力します (マイクがなくても機能します)。","teacher_mic_status_live":"ライブストリームクラス (マイクに向かって話します)","teacher_input_lang_label":"入力言語:","teacher_mic_status_idle":"マイクをタップしてストリーミングを開始します","transcript_card_title":"送信記録","btn_export":"エクスポート (.txt)","teacher_mic_hint":"はっきりと話してください。ヒンディー語、フランス語、英語、その他の言語への翻訳はリアルタイムで行われます。","btn_copy":"コピー","btn_save":"保存","unlock_audio_desc":"隣のボタンをタップすると、ヘッドフォンで翻訳が音声で聞こえます。","student_access_desc":"生徒が自分のデバイスを同じ Wi-Fi ネットワークに接続できるように、次の QR コードを表示します。","connected_card_title":"接続された参加者","student_access_title":"学生のアクセス","room_id_label":"部屋の識別子:","btn_clear":"掃除するには","unlock_audio_title":"オーディオ再生を有効にする","connected_card_desc":"リアルタイムの言語配信:","student_font_label":"文章：","student_speed_label":"リズム：","student_panel_title":"翻訳受付","student_speed_slow":"0.85x (遅い)","student_autospeak_label":"音声を自動再生する","student_speed_normal":"1.0倍（通常）","btn_test_audio":"テストサウンド","student_speed_fast":"1.15倍（高速）","btn_unlock_audio":"オーディオを有効にする","student_listen_label":"聞いたり読んだりするには:","btn_ask_student":"先生に質問する","caption_waiting":"先生のお話しを待っています...","ask_title":"先生に質問する（その逆）","ask_desc":"ボタンを押して、母国語 (ヒンディー語、フランス語、英語など) で話してください。あなたの質問は翻訳されて教師に直接届けられます。","caption_default_text":"ヘッドフォンを接続します。教師が話すと、翻訳された字幕がここに表示され、あなたの言語で再生されます。","caption_badge":"同時翻訳","student_history_title":"翻訳語句の歴史","ask_speak_label":"私の話す言語:","btn_replay":"もう一度聞いてください","btn_ask_student_stop":"⏹ 完全な質問","dialogue_card_desc":"教育会議や保護者への出席のための直接の双方向コミュニケーション","guide_title":"操作マニュアルとアクセシビリティガイドライン","btn_dialogue_side_b":"トーク サイド B","dialogue_side_b_title":"生徒・保護者（B面）","dialogue_card_title":"個人および双方向サービス","guide_card1_title":"1. Wi-Fiローカルエリア接続","guide_desc":"Yanik, Translator は、ヒンディー語、ポルトガル語、英語、フランス語、および 100 以上の言語へのリアルタイムの双方向翻訳により、多言語環境で教育者と学生を結び付け、外国人学生、難民、移民の即時受け入れを促進します。","dialogue_side_a_title":"教育者 (A面)","btn_dialogue_side_a":"トーク サイド A","dialogue_history_label":"登録済みダイアログ:","projector_wifi_label":"ローカル Wi-Fi ネットワーク","guide_card2_title":"2. ヘッドフォンの使用","guide_card3_desc":"「質問する」をクリックすると、生徒は自分の母国語 (ヒンディー語など) で話し、質問はポルトガル語に翻訳されて教師の画面に表示されます。","footer_text":"Yanik、翻訳者 © 2026 • 同時リアルタイム翻訳システム • PC、Mac、Android、iOS と互換性あり","projector_modal_title":"クラスに接続する","guide_card2_desc":"各生徒はヘッドフォン (有線または Bluetooth) を介して母国語で教師の話を聞くことができるため、部屋を静かに保ち、集中することができます。","guide_card1_desc":"すべての携帯電話とコンピュータは同じルーターまたは Wi-Fi 上にある必要があります。学生はルームの QR コードを読み取ると、登録やダウンロードを必要とせずにすぐに接続します。","guide_card3_title":"3. 双方向のインタラクション","projector_modal_desc":"携帯電話のカメラを向けると、あなたの言語でのクラスの翻訳を聞くことができます","btn_create_room":"ルームの作成/変更","btn_summarize_teacher":"AIで授業を要約","btn_browse_rooms":"クラスの検索/切り替え","btn_class_summary":"クラス概要","modal_create_title":"クラスルームを作成または構成する","label_room_title":"クラスのタイトル/件名:","label_teacher_name":"先生の名前:","label_subject":"分野/主題:","label_room_code":"ルームコード (学生が入力するための):","label_teacher_speech_lang":"教師のスピーチ言語:","btn_generate":"生成するには","btn_cancel":"キャンセル","btn_start_room":"この部屋でクラスを開始します","modal_browse_title":"学校で利用可能なクラスを検索する","btn_refresh":"アップデート","placeholder_search_rooms":"科目、教師、またはコードでクラスを検索...","btn_join_room":"クラスに参加する","btn_copy_summary":"概要をコピー","btn_download_summary":"ダウンロード (.txt)","btn_print_summary":"印刷/PDF","btn_speak_summary":"聞く概要","btn_close_summary":"閉じるには","initial_modal_title":"言語を選択してください","initial_modal_subtitle":"プラットフォームで続行するには言語を選択してください","initial_modal_btn":"言語を確認して開始する","filter_all":"すべて","subject_math":"数学","subject_science":"科学","subject_history":"歴史・地理","subject_languages":"語学","subject_tech":"技術","subject_general":"一般"
  },"ru": {"nav_live":"Подключено","nav_direct":"Прямой режим / Офлайн","nav_room_prefix":"Кабинет:","nav_projector":"Проекция QR-кода","tab_teacher":"Стол Учителя","tab_student":"Парта Ученика","tab_dialogue":"Беседа 1-на-1","tab_guide":"Инструкция","teacher_card_title":"Голосовая Трансляция","app_version":"v2.4 Про","teacher_card_desc":"Ваша речь улавливается, мгновенно переводится и звучит у подключенных учеников","teacher_input_lang_label":"Язык ввода:","teacher_mic_status_idle":"Нажмите на микрофон для начала трансляции","teacher_mic_status_live":"Идет прямой эфир урока (Говорите в микрофон)","teacher_mic_hint":"Говорите четко. Перевод на хинди, французский, английский и др. языки выполняется синхронно.","teacher_manual_label":"Ввести объявление для класса (работает без микрофона):","teacher_manual_placeholder":"Напр.: Откройте учебник на странице 15...","btn_transmit":"Отправить","transcript_card_title":"Журнал трансляции","btn_export":"Скачать (.txt)","btn_clear":"Очистить","student_access_title":"Доступ Учеников","student_access_desc":"Покажите QR-код ученикам, подключенным к тому же Wi-Fi:","btn_copy":"Копировать","room_id_label":"Номер Кабинета:","btn_save":"Сохранить","connected_card_title":"Подключенные Ученики","connected_card_desc":"Распределение языков:","unlock_audio_title":"Включить воспроизведение звука","unlock_audio_desc":"Нажмите кнопку, чтобы слышать синхронный перевод в наушниках.","btn_unlock_audio":"Включить звук","student_panel_title":"Прием Перевода","student_listen_label":"Слушать и читать на:","student_autospeak_label":"Озвучивать автоматически","btn_test_audio":"Проверить звук","student_font_label":"Шрифт:","student_speed_label":"Темп:","student_speed_slow":"0.85x (Медленно)","student_speed_normal":"1.0x (Обычный)","student_speed_fast":"1.15x (Быстро)","caption_waiting":"Ожидание речи учителя...","caption_badge":"Синхронный Перевод","caption_default_text":"Наденьте наушники. Когда учитель начнет говорить, перевод появится здесь и прозвучит на вашем языке.","btn_replay":"Прослушать снова","ask_title":"Задать вопрос учителю (В обратную сторону)","ask_speak_label":"Язык моего вопроса:","ask_desc":"Нажмите кнопку и говорите на родном языке. Вопрос будет переведен и отправлен учителю.","btn_ask_student":"Задать вопрос учителю","btn_ask_student_stop":"⏹ Завершить вопрос","student_history_title":"История переведенных фраз","dialogue_card_title":"Диалог 1-на-1","dialogue_card_desc":"Двусторонняя связь для родительских собраний и консультаций","dialogue_side_a_title":"Педагог (Сторона A)","btn_dialogue_side_a":"Говорить (A)","dialogue_side_b_title":"Ученик / Родитель (Сторона B)","btn_dialogue_side_b":"Говорить (B)","dialogue_history_label":"Запись диалога:","guide_title":"Руководство по эксплуатации","guide_desc":"Yanik, Translator обеспечивает языковую интеграцию с синхронным переводом на 50+ языков.","guide_card1_title":"1. Локальный Wi-Fi","guide_card1_desc":"Ученики подключаются по QR-коду в сети школы без скачивания приложений.","guide_card2_title":"2. Использование наушников","guide_card2_desc":"Каждый ученик слушает учителя в наушниках на своем языке.","guide_card3_title":"3. Двусторонняя связь","guide_card3_desc":"Ученик может задать вопрос на родном языке, а учитель получит его перевод.","projector_modal_title":"Подключиться к уроку","projector_modal_desc":"Наведите камеру на QR-код для перевода урока","projector_wifi_label":"Школьный Wi-Fi","footer_text":"Yanik, Translator © 2026 • Система синхронного перевода в реальном времени","btn_create_room":"Создать/Изменить комнату","btn_summarize_teacher":"Подведение итогов занятий с помощью ИИ","btn_browse_rooms":"Поиск/переключение классов","btn_class_summary":"Итог занятий","modal_create_title":"Создать или настроить класс","label_room_title":"Название класса/предмет:","label_teacher_name":"Имя учителя:","label_subject":"Дисциплина/предмет:","label_room_code":"Код комнаты (для входа студентов):","label_teacher_speech_lang":"Язык речи учителя:","btn_generate":"Чтобы создать","btn_cancel":"Отмена","btn_start_room":"Начните занятие в этой комнате","modal_browse_title":"Поиск доступных классов в школе","btn_refresh":"Обновление","placeholder_search_rooms":"Поиск класса по предмету, учителю или коду...","btn_join_room":"Присоединиться к классу","btn_copy_summary":"Копировать сводку","btn_download_summary":"Скачать (.txt)","btn_print_summary":"Распечатать/PDF","btn_speak_summary":"Краткое описание прослушивания","btn_close_summary":"Закрыть","initial_modal_title":"Выберите свой язык","initial_modal_subtitle":"Выберите язык, чтобы продолжить работу на платформе","initial_modal_btn":"Подтвердите язык и начните","filter_all":"Все","subject_math":"Математика","subject_science":"Наука","subject_history":"История / Гео","subject_languages":"Языки","subject_tech":"Технологии","subject_general":"Общее"
  },"ko": {"nav_room_prefix":"방:","tab_guide":"사용 설명서","nav_live":"연결됨","nav_projector":"QR 코드 디자인","tab_teacher":"선생님의 테이블","app_version":"v2.4 프로","tab_student":"학생증","teacher_card_title":"음성 방송","nav_direct":"라이브/오프라인 모드","tab_dialogue":"1:1 지원","btn_transmit":"개울","teacher_manual_label":"수업에 대한 메시지나 공지 사항을 입력하세요(마이크 없이도 작동).","teacher_mic_hint":"명확하게 말하세요. 힌디어, 프랑스어, 영어 및 기타 언어로의 번역이 실시간으로 이루어집니다.","teacher_mic_status_live":"라이브 스트림 수업(마이크에 대고 말하기)","teacher_card_desc":"귀하의 연설이 캡처되어 실시간으로 번역되어 연결된 학생들에게 전송됩니다.","teacher_input_lang_label":"입력 언어:","btn_export":"내보내기(.txt)","transcript_card_title":"전송기록","teacher_mic_status_idle":"스트리밍을 시작하려면 마이크를 탭하세요.","teacher_manual_placeholder":"예: 3장 자료를 엽니다...","btn_copy":"복사","btn_save":"구하다","btn_clear":"청소하다","room_id_label":"방 식별자:","student_access_title":"학생 액세스","connected_card_title":"연결된 참가자","unlock_audio_desc":"헤드폰에서 번역 내용을 소리내어 들으려면 옆에 있는 버튼을 탭하세요.","student_access_desc":"학생들이 자신의 장치를 동일한 Wi-Fi 네트워크에 연결할 수 있도록 이 QR 코드를 표시하십시오.","unlock_audio_title":"오디오 재생 활성화","connected_card_desc":"실시간 언어 배포:","student_font_label":"텍스트:","student_speed_label":"율:","student_panel_title":"번역접수","student_speed_slow":"0.85x(느림)","btn_unlock_audio":"오디오 활성화","student_autospeak_label":"자동으로 음성 재생","student_listen_label":"듣고 읽어보세요:","student_speed_normal":"1.0x(일반)","btn_test_audio":"테스트 사운드","student_speed_fast":"1.15x(빠름)","ask_desc":"버튼을 누르고 모국어(예: 힌디어, 프랑스어, 영어)로 말하세요. 귀하의 질문은 번역되어 교사에게 직접 전달됩니다.","caption_waiting":"선생님의 말씀을 기다리며...","student_history_title":"번역문의 역사","btn_ask_student":"선생님에게 질문하기","btn_ask_student_stop":"⏹ 완전한 질문","ask_speak_label":"내가 말하는 언어:","btn_replay":"다시 듣기","caption_default_text":"헤드폰을 연결하세요. 교사가 말하면 번역된 자막이 여기에 표시되고 귀하의 언어로 재생됩니다.","ask_title":"선생님에게 질문하기(반대)","caption_badge":"동시번역","dialogue_history_label":"등록된 대화:","btn_dialogue_side_a":"토크사이드 A","dialogue_side_a_title":"교육자(A면)","btn_dialogue_side_b":"토크사이드 B","guide_desc":"Yanik, Translator는 다국어 환경에서 교육자와 학생을 연결하여 힌디어, 포르투갈어, 영어, 프랑스어 및 100개 이상의 언어로 실시간 양방향 번역을 통해 외국 학생, 난민 및 이민자의 즉각적인 포함을 촉진합니다.","guide_card1_title":"1. Wi-Fi 로컬 영역 연결","dialogue_side_b_title":"학생/보호자(B면)","dialogue_card_desc":"교육 회의 또는 보호자 참석을 위한 직접적인 양방향 통신","guide_title":"운영 매뉴얼 및 접근성 지침","dialogue_card_title":"개별 및 양자간 서비스","projector_modal_title":"수업에 연결","projector_wifi_label":"로컬 Wi-Fi 네트워크","footer_text":"Yanik, 번역가 © 2026 • 동시 실시간 번역 시스템 • PC, Mac, Android 및 iOS와 호환 가능","guide_card2_desc":"각 학생은 헤드폰(유선 또는 블루투스)을 통해 교사의 모국어로 수업을 들을 수 있어 교실을 조용하고 집중할 수 있습니다.","guide_card1_desc":"모든 휴대폰과 컴퓨터는 동일한 라우터나 Wi-Fi에 연결되어 있어야 합니다. 학생은 등록이나 다운로드 없이 강의실의 QR 코드를 읽고 즉시 연결됩니다.","guide_card3_desc":"'질문하기'를 클릭하면 학생은 자신의 모국어(예: 힌디어)로 말하고, 질문은 포르투갈어로 번역되어 교사 화면에 표시됩니다.","guide_card2_title":"2. 헤드폰 사용","projector_modal_desc":"귀하의 언어로 수업이 번역되는 것을 들으려면 휴대폰 카메라를 가리키세요.","guide_card3_title":"3. 양방향 상호작용","btn_create_room":"방 생성/변경","btn_summarize_teacher":"AI로 수업 요약","btn_browse_rooms":"검색/클래스 전환","btn_class_summary":"수업 요약","modal_create_title":"교실 생성 또는 구성","label_room_title":"수업 제목/주제:","label_teacher_name":"선생님 이름:","label_subject":"규율/주제:","label_room_code":"방 코드(학생들이 입장할 수 있는 경우):","label_teacher_speech_lang":"교사의 언어:","btn_generate":"생성하려면","btn_cancel":"취소","btn_start_room":"이 방에서 수업을 시작하세요","modal_browse_title":"학교에서 수강 가능한 수업 검색","btn_refresh":"업데이트","placeholder_search_rooms":"과목, 교사 또는 코드별로 수업을 검색하세요...","btn_join_room":"수업에 참여하기","btn_copy_summary":"복사 요약","btn_download_summary":"다운로드(.txt)","btn_print_summary":"인쇄/PDF","btn_speak_summary":"듣기 요약","btn_close_summary":"닫으려면","initial_modal_title":"언어를 선택하세요","initial_modal_subtitle":"플랫폼에서 계속하려면 언어를 선택하세요","initial_modal_btn":"언어를 확인하고 시작하세요","filter_all":"전체","subject_math":"수학","subject_science":"과학","subject_history":"역사 / 지리","subject_languages":"외국어","subject_tech":"기술","subject_general":"일반"
  },"bn": {"nav_room_prefix":"রুম:","nav_live":"সংযুক্ত","tab_student":"স্টুডেন্ট কার্ড","tab_guide":"ব্যবহারকারীর ম্যানুয়াল","app_version":"v2.4 প্রো","nav_direct":"লাইভ/অফলাইন মোড","nav_projector":"QR কোড ডিজাইন করুন","teacher_card_title":"ভয়েস ব্রডকাস্ট","tab_dialogue":"1-টু-1 সমর্থন","tab_teacher":"শিক্ষকের টেবিল","teacher_input_lang_label":"ইনপুট ভাষা:","btn_transmit":"প্রবাহ","teacher_mic_status_idle":"স্ট্রিমিং শুরু করতে মাইক্রোফোনে আলতো চাপুন৷","teacher_manual_placeholder":"যেমন: 3 অধ্যায়ে উপাদান খুলুন...","btn_export":"রপ্তানি (.txt)","teacher_mic_hint":"স্পষ্ট করে কথা বলুন। হিন্দি, ফরাসি, ইংরেজি এবং অন্যান্য ভাষায় অনুবাদ রিয়েল টাইমে সঞ্চালিত হয়।","teacher_mic_status_live":"লাইভ স্ট্রিম ক্লাস (মাইক্রোফোনে কথা বলুন)","teacher_card_desc":"আপনার বক্তৃতা ক্যাপচার করা হয়, রিয়েল টাইমে অনুবাদ করা হয় এবং সংযুক্ত শিক্ষার্থীদের কাছে প্রেরণ করা হয়","transcript_card_title":"ট্রান্সমিশন রেকর্ড","teacher_manual_label":"ক্লাসের জন্য একটি বার্তা বা ঘোষণা টাইপ করুন (মাইক্রোফোন ছাড়াও কাজ করে):","btn_save":"সংরক্ষণ করুন","student_access_title":"ছাত্র অ্যাক্সেস","btn_copy":"কপি","room_id_label":"রুম শনাক্তকারী:","connected_card_title":"সংযুক্ত অংশগ্রহণকারীদের","btn_clear":"পরিষ্কার করতে","connected_card_desc":"রিয়েল-টাইম ভাষা বিতরণ:","unlock_audio_title":"অডিও প্লেব্যাক সক্ষম করুন","student_access_desc":"ছাত্ররা তাদের ডিভাইসগুলিকে একই Wi-Fi নেটওয়ার্কে সংযুক্ত করতে এই QR কোডটি প্রদর্শন করুন:","unlock_audio_desc":"আপনার হেডফোনে উচ্চস্বরে অনুবাদ শুনতে পাশের বোতামটি আলতো চাপুন।","student_speed_label":"ছন্দ:","student_font_label":"পাঠ্য:","student_speed_fast":"1.15x (দ্রুত)","student_autospeak_label":"স্বয়ংক্রিয়ভাবে ভয়েস প্লে করুন","student_speed_normal":"1.0x (সাধারণ)","btn_test_audio":"টেস্ট সাউন্ড","student_panel_title":"অনুবাদ অভ্যর্থনা","btn_unlock_audio":"অডিও সক্ষম করুন","student_speed_slow":"0.85x (ধীরে)","student_listen_label":"এখানে শুনুন এবং পড়ুন:","ask_speak_label":"আমার কথা বলার ভাষা:","btn_ask_student_stop":"⏹ সম্পূর্ণ প্রশ্ন","student_history_title":"অনুবাদিত বাক্যাংশের ইতিহাস","caption_badge":"যুগপত অনুবাদ","btn_ask_student":"শিক্ষককে একটি প্রশ্ন জিজ্ঞাসা করুন","caption_default_text":"আপনার হেডফোন সংযুক্ত করুন. যখন শিক্ষক কথা বলবেন, অনুবাদিত সাবটাইটেলগুলি এখানে উপস্থিত হবে এবং আপনার ভাষায় প্লে হবে৷","caption_waiting":"শিক্ষকের কথা বলার অপেক্ষায়...","btn_replay":"আবার শুনুন","ask_title":"শিক্ষককে একটি প্রশ্ন জিজ্ঞাসা করুন (ভাইস উল্টো)","ask_desc":"বোতাম টিপুন এবং আপনার স্থানীয় ভাষায় কথা বলুন (যেমন হিন্দি, ফ্রেঞ্চ, ইংরেজি)। আপনার প্রশ্ন অনুবাদ করে সরাসরি শিক্ষকের কাছে পৌঁছে দেওয়া হবে।","guide_title":"অপারেশন ম্যানুয়াল এবং অ্যাক্সেসিবিলিটি নির্দেশিকা","btn_dialogue_side_b":"টক সাইড বি","btn_dialogue_side_a":"টক সাইড এ","dialogue_side_a_title":"শিক্ষাবিদ (সাইড এ)","dialogue_side_b_title":"ছাত্র/অভিভাবক (সাইড বি)","guide_card1_title":"1. Wi-Fi লোকাল এরিয়া সংযোগ","dialogue_card_title":"ব্যক্তিগত এবং দ্বিপাক্ষিক পরিষেবা","guide_desc":"Yanik, অনুবাদক বহুভাষিক পরিবেশে শিক্ষাবিদ এবং ছাত্রদের সংযুক্ত করে, বিদেশী ছাত্র, উদ্বাস্তু এবং অভিবাসীদের রিয়েল-টাইম, হিন্দি, পর্তুগিজ, ইংরেজি, ফরাসি এবং 100 টিরও বেশি ভাষায় দ্বিমুখী অনুবাদের সাথে অবিলম্বে অন্তর্ভুক্তির প্রচার করে।","dialogue_card_desc":"শিক্ষাগত সভা বা অভিভাবকদের উপস্থিতির জন্য সরাসরি দ্বিমুখী যোগাযোগ","dialogue_history_label":"নিবন্ধিত সংলাপ:","projector_wifi_label":"স্থানীয় Wi-Fi নেটওয়ার্ক","guide_card3_title":"3. দ্বিমুখী মিথস্ক্রিয়া","guide_card2_desc":"প্রতিটি শিক্ষার্থী হেডফোনের (তারযুক্ত বা ব্লুটুথ) মাধ্যমে তাদের মাতৃভাষায় শিক্ষকের কথা শুনতে পারে, ঘরটি শান্ত এবং ফোকাস করে।","guide_card2_title":"2. হেডফোন ব্যবহার","footer_text":"Yanik, অনুবাদক © 2026 • যুগপত রিয়েল-টাইম অনুবাদ সিস্টেম • PC, Mac, Android এবং iOS এর সাথে সামঞ্জস্যপূর্ণ","guide_card1_desc":"সমস্ত সেল ফোন এবং কম্পিউটার একই রাউটার বা Wi-Fi এ থাকা দরকার। শিক্ষার্থী রুমের QR কোড পড়ে এবং অবিলম্বে সংযোগ করে, নিবন্ধন বা ডাউনলোডের প্রয়োজন ছাড়াই।","projector_modal_title":"ক্লাসের সাথে সংযোগ করুন","projector_modal_desc":"আপনার ভাষায় ক্লাসের অনুবাদ শুনতে আপনার সেল ফোনের ক্যামেরাটি নির্দেশ করুন","guide_card3_desc":"'প্রশ্ন জিজ্ঞাসা করুন'-এ ক্লিক করার সময়, শিক্ষার্থী তাদের নিজস্ব মাতৃভাষায় কথা বলে (যেমন হিন্দি), এবং প্রশ্নটি পর্তুগিজ ভাষায় শিক্ষকের স্ক্রিনে অনুবাদ করে প্রদর্শিত হয়।","btn_create_room":"রুম তৈরি/পরিবর্তন করুন","btn_summarize_teacher":"AI এর সাথে ক্লাসের সংক্ষিপ্ত বিবরণ দিন","btn_browse_rooms":"অনুসন্ধান/ক্লাস পরিবর্তন করুন","btn_class_summary":"ক্লাস সারাংশ","modal_create_title":"ক্লাসরুম তৈরি বা কনফিগার করুন","label_room_title":"ক্লাস শিরোনাম/বিষয়:","label_teacher_name":"শিক্ষকের নাম:","label_subject":"শৃঙ্খলা/বিষয়:","label_room_code":"রুম কোড (শিক্ষার্থীদের প্রবেশের জন্য):","label_teacher_speech_lang":"শিক্ষকের বক্তৃতা ভাষা:","btn_generate":"উৎপন্ন করতে","btn_cancel":"বাতিল করুন","btn_start_room":"এই রুমে ক্লাস শুরু করুন","modal_browse_title":"স্কুলে উপলব্ধ ক্লাসের জন্য অনুসন্ধান করুন","btn_refresh":"আপডেট","placeholder_search_rooms":"বিষয়, শিক্ষক বা কোড অনুসারে ক্লাস অনুসন্ধান করুন...","btn_join_room":"ক্লাসে যোগ দিন","btn_copy_summary":"কপি সারাংশ","btn_download_summary":"ডাউনলোড করুন (.txt)","btn_print_summary":"প্রিন্ট/পিডিএফ","btn_speak_summary":"সারাংশ শুনুন","btn_close_summary":"বন্ধ করতে","initial_modal_title":"আপনার ভাষা নির্বাচন করুন","initial_modal_subtitle":"প্ল্যাটফর্মে চালিয়ে যেতে আপনার ভাষা বেছে নিন","initial_modal_btn":"ভাষা নিশ্চিত করুন এবং শুরু করুন","filter_all":"সব","subject_math":"গণিত","subject_science":"বিজ্ঞান","subject_history":"ইতিহাস / ভূগোল","subject_languages":"ভাষা","subject_tech":"প্রযুক্তি","subject_general":"সাধারণ"
  },"tr": {"nav_room_prefix":"Oda:","nav_live":"Bağlı","tab_guide":"Kullanım Kılavuzu","nav_projector":"QR Kodunu Tasarla","teacher_card_title":"Sesli Yayın","app_version":"v2.4 Pro","nav_direct":"Canlı/Çevrimdışı Modu","tab_dialogue":"1'e 1 destek","tab_student":"Öğrenci Kartı","tab_teacher":"Öğretmen Masası","btn_transmit":"Aktarım","teacher_manual_placeholder":"Örn: 3. bölümdeki materyali açın...","teacher_input_lang_label":"Giriş Dili:","btn_export":"Dışa aktar (.txt)","transcript_card_title":"İletim Kaydı","teacher_mic_hint":"Açıkça konuşun. Hintçe, Fransızca, İngilizce ve diğer dillere çeviri gerçek zamanlı olarak gerçekleşir.","teacher_manual_label":"Sınıf için bir mesaj veya duyuru yazın (mikrofon olmadan bile çalışır):","teacher_card_desc":"Konuşmanız kaydedilir, gerçek zamanlı olarak çevrilir ve bağlantılı öğrencilere iletilir","teacher_mic_status_live":"Canlı Yayın Dersi (Mikrofona konuşun)","teacher_mic_status_idle":"Akışı başlatmak için mikrofona dokunun","btn_copy":"Kopyala","btn_save":"Kaydetmek","student_access_desc":"Öğrencilerin cihazlarını aynı Wi-Fi ağına bağlamaları için bu QR Kodunu görüntüleyin:","unlock_audio_desc":"Çeviriyi kulaklığınızda yüksek sesle dinlemek için yanındaki düğmeye dokunun.","room_id_label":"Oda Tanımlayıcı:","btn_clear":"Temizlemek için","student_access_title":"Öğrenci Erişimi","connected_card_title":"Bağlantılı Katılımcılar","unlock_audio_title":"Ses çalmayı etkinleştir","connected_card_desc":"Gerçek zamanlı dil dağıtımı:","student_speed_label":"Ritim:","student_font_label":"Metin:","student_speed_slow":"0,85x (Yavaş)","student_speed_normal":"1,0x (Normal)","student_speed_fast":"1,15x (Hızlı)","student_panel_title":"Çeviri Resepsiyonu","btn_unlock_audio":"Sesi Etkinleştir","btn_test_audio":"Sesi Test Et","student_autospeak_label":"Sesi otomatik olarak çal","student_listen_label":"Dinleyin ve okuyun:","caption_badge":"Simultane Çeviri","caption_waiting":"Öğretmenin konuşmasını bekliyorum...","btn_ask_student":"Öğretmene Soru Sor","btn_ask_student_stop":"⏹ Soruyu Tamamla","ask_desc":"Düğmeye basın ve ana dilinizde (örneğin Hintçe, Fransızca, İngilizce) konuşun. Sorunuz tercüme edilecek ve doğrudan öğretmene iletilecektir.","caption_default_text":"Kulaklığınızı bağlayın. Öğretmen konuştuğunda çevrilmiş altyazılar burada görünecek ve sizin dilinizde oynatılacaktır.","ask_title":"Öğretmene Soru Sor (Tersi)","student_history_title":"Çevrilmiş İfadelerin Tarihi","btn_replay":"Tekrar Dinle","ask_speak_label":"Konuşma Dilim:","dialogue_history_label":"Kayıtlı Diyalog:","btn_dialogue_side_b":"B Tarafını Konuşun","dialogue_card_desc":"Pedagojik toplantılar veya velilere katılım için doğrudan iki yönlü iletişim","dialogue_card_title":"Bireysel ve İkili Hizmet","guide_card1_title":"1. Wi-Fi Yerel Alan Bağlantısı","dialogue_side_a_title":"Eğitimci (A Tarafı)","btn_dialogue_side_a":"A Yüzüyle Konuşun","dialogue_side_b_title":"Öğrenci / Veli (B Tarafı)","guide_title":"Kullanım Kılavuzu ve Erişilebilirlik Yönergeleri","guide_desc":"Yanik, Çevirmen, Hintçe, Portekizce, İngilizce, Fransızca ve 100'den fazla dile gerçek zamanlı, iki yönlü çeviri ile yabancı öğrencilerin, mültecilerin ve göçmenlerin anında katılımını teşvik ederek eğitimcileri ve öğrencileri çok dilli ortamlarda birbirine bağlar.","guide_card2_title":"2. Kulaklık Kullanımı","guide_card3_title":"3. Çift Yönlü Etkileşim","projector_modal_desc":"Dersin kendi dilinizdeki tercümesini duymak için cep telefonunuzun kamerasını doğrultun","footer_text":"Yanık, Çevirmen © 2026 • Eşzamanlı Gerçek Zamanlı Çeviri Sistemi • PC, Mac, Android ve iOS ile uyumlu","guide_card1_desc":"Tüm cep telefonlarının ve bilgisayarların aynı yönlendirici veya Wi-Fi üzerinde olması gerekir. Öğrenci, odanın QR Kodunu okur ve kayıt veya indirmeye gerek kalmadan hemen bağlanır.","guide_card2_desc":"Her öğrenci, öğretmeni kendi ana dilinde kulaklık (kablolu veya Bluetooth) aracılığıyla dinleyerek odanın sessiz ve odaklanmasını sağlayabilir.","projector_modal_title":"Sınıfa Bağlan","guide_card3_desc":"'Soru Sor'a tıklandığında, öğrenci kendi ana dilinde konuşur (örneğin Hintçe) ve soru öğretmenin ekranına Portekizce olarak çevrilir ve görüntülenir.","projector_wifi_label":"Yerel Wi-Fi Ağı","btn_create_room":"Oda Oluştur/Değiştir","btn_summarize_teacher":"Dersi AI ile Özetleyin","btn_browse_rooms":"Sınıfları Ara/Değiştir","btn_class_summary":"Sınıf Özeti","modal_create_title":"Sınıf Oluşturun veya Yapılandırın","label_room_title":"Ders Başlığı/Konusu:","label_teacher_name":"Öğretmenin Adı:","label_subject":"Disiplin/Konu:","label_room_code":"Oda Kodu (öğrencilerin girebileceği):","label_teacher_speech_lang":"Öğretmenin Konuşma Dili:","btn_generate":"Oluşturmak","btn_cancel":"İptal etmek","btn_start_room":"Derse Bu Odada Başlayın","modal_browse_title":"Okuldaki Mevcut Dersleri Arayın","btn_refresh":"Güncelleme","placeholder_search_rooms":"Dersi konuya, öğretmene veya koda göre arayın...","btn_join_room":"Sınıfa Katılın","btn_copy_summary":"Özeti Kopyala","btn_download_summary":"İndir (.txt)","btn_print_summary":"Baskı/PDF","btn_speak_summary":"Özeti Dinle","btn_close_summary":"Kapatmak için","initial_modal_title":"Dilinizi seçin","initial_modal_subtitle":"Platforma devam etmek için dilinizi seçin","initial_modal_btn":"Dili Onaylayın ve Başlayın","filter_all":"Tümü","subject_math":"Matematik","subject_science":"Fen Bilimleri","subject_history":"Tarih / Coğrafya","subject_languages":"Diller","subject_tech":"Teknoloji","subject_general":"Genel"
  },"vi": {"nav_live":"Đã kết nối","nav_room_prefix":"Phòng:","tab_guide":"Hướng dẫn sử dụng","tab_student":"Thẻ sinh viên","tab_dialogue":"Hỗ trợ 1-1","nav_projector":"Thiết kế mã QR","teacher_card_title":"Phát sóng bằng giọng nói","app_version":"v2.4 chuyên nghiệp","nav_direct":"Chế độ trực tiếp/ngoại tuyến","tab_teacher":"Bàn giáo viên","btn_transmit":"Suối","teacher_input_lang_label":"Ngôn ngữ đầu vào:","transcript_card_title":"Bản ghi truyền","btn_export":"Xuất (.txt)","teacher_manual_placeholder":"Ví dụ: Mở tài liệu sang chương 3...","teacher_mic_status_idle":"Nhấn vào micrô để bắt đầu phát trực tuyến","teacher_mic_hint":"Nói rõ ràng. Việc dịch sang tiếng Hindi, tiếng Pháp, tiếng Anh và các ngôn ngữ khác diễn ra trong thời gian thực.","teacher_card_desc":"Bài phát biểu của bạn được ghi lại, dịch theo thời gian thực và truyền đến các học sinh được kết nối","teacher_manual_label":"Nhập tin nhắn hoặc thông báo cho lớp học (hoạt động ngay cả khi không có micrô):","teacher_mic_status_live":"Lớp Live Stream (Nói vào micro)","btn_save":"Cứu","btn_clear":"Để làm sạch","btn_copy":"Sao chép","student_access_title":"Quyền truy cập của sinh viên","room_id_label":"Mã nhận dạng phòng:","connected_card_title":"Người tham gia được kết nối","connected_card_desc":"Phân phối ngôn ngữ theo thời gian thực:","unlock_audio_title":"Cho phép phát lại âm thanh","student_access_desc":"Hiển thị Mã QR này để học sinh kết nối thiết bị của mình với cùng một mạng Wi-Fi:","unlock_audio_desc":"Nhấn vào nút bên cạnh để nghe to bản dịch trên tai nghe của bạn.","student_speed_label":"Nhịp điệu:","student_font_label":"Chữ:","student_autospeak_label":"Tự động phát giọng nói","btn_unlock_audio":"Bật âm thanh","student_speed_normal":"1,0x (Bình thường)","student_speed_fast":"1,15x (Nhanh)","student_speed_slow":"0,85x (Chậm)","student_listen_label":"Nghe và đọc tại:","btn_test_audio":"Kiểm tra âm thanh","student_panel_title":"Lễ tân dịch thuật","ask_desc":"Nhấn nút và nói bằng ngôn ngữ mẹ đẻ của bạn (ví dụ: tiếng Hindi, tiếng Pháp, tiếng Anh). Câu hỏi của bạn sẽ được dịch và gửi trực tiếp đến giáo viên.","ask_speak_label":"Ngôn ngữ nói của tôi:","btn_replay":"Nghe lại","btn_ask_student_stop":"⏹ Câu hỏi hoàn chỉnh","caption_waiting":"Chờ thầy lên tiếng...","caption_badge":"Dịch đồng thời","btn_ask_student":"Hỏi giáo viên một câu hỏi","ask_title":"Hỏi giáo viên một câu hỏi (Ngược lại)","student_history_title":"Lịch sử của các cụm từ được dịch","caption_default_text":"Kết nối tai nghe của bạn. Khi giáo viên nói, phụ đề đã dịch sẽ xuất hiện ở đây và phát bằng ngôn ngữ của bạn.","btn_dialogue_side_b":"Nói chuyện bên B","dialogue_history_label":"Đối thoại đã đăng ký:","btn_dialogue_side_a":"Nói chuyện bên A","dialogue_side_a_title":"Nhà giáo dục (Bên A)","guide_title":"Hướng dẫn vận hành và hướng dẫn tiếp cận","dialogue_card_desc":"Giao tiếp hai chiều trực tiếp cho các cuộc họp sư phạm hoặc tham dự với người giám hộ","dialogue_side_b_title":"Học sinh / Người giám hộ (Bên B)","dialogue_card_title":"Dịch vụ cá nhân và song phương","guide_card1_title":"1. Kết nối Wi-Fi cục bộ","guide_desc":"Yanik, Translator kết nối các nhà giáo dục và sinh viên trong môi trường đa ngôn ngữ, thúc đẩy sự hòa nhập ngay lập tức của sinh viên nước ngoài, người tị nạn và người nhập cư bằng bản dịch hai chiều, thời gian thực sang tiếng Hindi, tiếng Bồ Đào Nha, tiếng Anh, tiếng Pháp và hơn 100 ngôn ngữ.","guide_card3_title":"3. Tương tác hai chiều","projector_modal_title":"Kết nối với lớp","projector_wifi_label":"Mạng Wi-Fi cục bộ","guide_card2_title":"2. Sử dụng tai nghe","guide_card1_desc":"Tất cả điện thoại di động và máy tính cần phải sử dụng cùng một bộ định tuyến hoặc Wi-Fi. Học viên đọc mã QR Code của phòng và kết nối ngay lập tức mà không cần đăng ký hay tải xuống.","projector_modal_desc":"Hướng camera điện thoại di động của bạn để nghe bản dịch của lớp học bằng ngôn ngữ của bạn","footer_text":"Yanik, Translator © 2026 • Hệ thống dịch thuật đồng thời theo thời gian thực • Tương thích với PC, Mac, Android và iOS","guide_card2_desc":"Mỗi học sinh có thể nghe giáo viên giảng bằng ngôn ngữ mẹ đẻ của mình thông qua tai nghe (có dây hoặc Bluetooth), giữ cho căn phòng yên tĩnh và tập trung.","guide_card3_desc":"Khi nhấp vào 'Đặt câu hỏi', học sinh sẽ nói bằng ngôn ngữ mẹ đẻ của mình (ví dụ: tiếng Hindi) và câu hỏi sẽ được dịch và hiển thị trên màn hình của giáo viên bằng tiếng Bồ Đào Nha.","btn_create_room":"Tạo/Thay đổi phòng","btn_summarize_teacher":"Tóm tắt lớp học bằng AI","btn_browse_rooms":"Tìm kiếm/Chuyển lớp","btn_class_summary":"Tóm tắt lớp học","modal_create_title":"Tạo hoặc Định cấu hình Lớp học","label_room_title":"Tên lớp/Chủ đề:","label_teacher_name":"Tên giáo viên:","label_subject":"Kỷ luật/Chủ đề:","label_room_code":"Mã phòng (dành cho sinh viên nhập):","label_teacher_speech_lang":"Ngôn ngữ lời nói của giáo viên:","btn_generate":"Để tạo ra","btn_cancel":"Hủy bỏ","btn_start_room":"Bắt đầu lớp học tại phòng này","modal_browse_title":"Tìm kiếm các lớp có sẵn tại trường","btn_refresh":"Cập nhật","placeholder_search_rooms":"Tìm kiếm lớp học theo môn học, giáo viên hoặc mã số...","btn_join_room":"Tham gia lớp học","btn_copy_summary":"Sao chép tóm tắt","btn_download_summary":"Tải xuống (.txt)","btn_print_summary":"In/PDF","btn_speak_summary":"Nghe tóm tắt","btn_close_summary":"Để đóng","initial_modal_title":"Chọn ngôn ngữ của bạn","initial_modal_subtitle":"Chọn ngôn ngữ của bạn để tiếp tục trên nền tảng","initial_modal_btn":"Xác nhận ngôn ngữ và bắt đầu","filter_all":"Tất cả","subject_math":"Toán học","subject_science":"Khoa học","subject_history":"Lịch sử / Địa lý","subject_languages":"Ngôn ngữ","subject_tech":"Công nghệ","subject_general":"Chung"
  },"id": {"nav_room_prefix":"Ruang:","tab_guide":"Panduan Pengguna","nav_live":"Terhubung","nav_projector":"Desain Kode QR","nav_direct":"Modus Langsung/Luring","app_version":"v2.4 Pro","teacher_card_title":"Siaran Suara","tab_teacher":"Meja Guru","tab_dialogue":"dukungan 1 lawan 1","tab_student":"Kartu Pelajar","btn_transmit":"Sungai kecil","btn_export":"Ekspor (.txt)","teacher_manual_placeholder":"Contoh: Buka materi ke bab 3...","teacher_card_desc":"Pidato Anda ditangkap, diterjemahkan secara real time dan dikirimkan ke siswa yang terhubung","teacher_mic_status_live":"Kelas Streaming Langsung (Bicaralah ke mikrofon)","transcript_card_title":"Catatan Transmisi","teacher_input_lang_label":"Bahasa Masukan:","teacher_mic_status_idle":"Ketuk mikrofon untuk mulai streaming","teacher_manual_label":"Ketik pesan atau pengumuman untuk kelas (berfungsi bahkan tanpa mikrofon):","teacher_mic_hint":"Bicaralah dengan jelas. Terjemahan ke dalam bahasa Hindi, Prancis, Inggris, dan bahasa lainnya dilakukan secara real time.","btn_clear":"Untuk membersihkan","btn_copy":"Menyalin","btn_save":"Menyimpan","unlock_audio_title":"Aktifkan pemutaran audio","connected_card_desc":"Distribusi bahasa waktu nyata:","connected_card_title":"Peserta yang Terhubung","room_id_label":"Pengidentifikasi Kamar:","unlock_audio_desc":"Ketuk tombol di sebelah untuk mendengar terjemahannya dengan lantang di headphone Anda.","student_access_title":"Akses Siswa","student_access_desc":"Tampilkan Kode QR ini agar siswa dapat menghubungkan perangkat mereka ke jaringan Wi-Fi yang sama:","student_font_label":"Teks:","student_speed_label":"Irama:","student_speed_fast":"1,15x (Cepat)","student_speed_normal":"1,0x (Biasa)","student_panel_title":"Penerimaan Terjemahan","student_autospeak_label":"Memutar suara secara otomatis","btn_test_audio":"Uji Suara","btn_unlock_audio":"Aktifkan Audio","student_listen_label":"Simak dan baca di:","student_speed_slow":"0,85x (Lambat)","ask_title":"Ajukan Pertanyaan kepada Guru (Sebaliknya)","btn_ask_student":"Ajukan Pertanyaan kepada Guru","student_history_title":"Sejarah Frasa yang Diterjemahkan","caption_badge":"Terjemahan Simultan","caption_waiting":"Menunggu guru berbicara...","btn_ask_student_stop":"⏹ Pertanyaan Lengkap","caption_default_text":"Hubungkan headphone Anda. Saat guru berbicara, subtitle terjemahan akan muncul di sini dan diputar dalam bahasa Anda.","ask_speak_label":"Bahasa Bicara Saya:","ask_desc":"Tekan tombol dan bicaralah dalam bahasa ibu Anda (misalnya Hindi, Prancis, Inggris). Pertanyaan Anda akan diterjemahkan dan disampaikan langsung kepada guru.","btn_replay":"Dengarkan Lagi","guide_card1_title":"1. Koneksi Area Lokal Wi-Fi","dialogue_card_title":"Layanan Perorangan dan Bilateral","guide_title":"Manual Pengoperasian dan Pedoman Aksesibilitas","dialogue_side_b_title":"Siswa / Wali (Sisi B)","guide_desc":"Yanik, Penerjemah menghubungkan pendidik dan siswa dalam lingkungan multibahasa, mempromosikan inklusi langsung pelajar asing, pengungsi, dan imigran dengan terjemahan dua arah secara real-time ke dalam bahasa Hindi, Portugis, Inggris, Prancis, dan lebih dari 100 bahasa.","dialogue_side_a_title":"Pendidik (Sisi A)","dialogue_history_label":"Dialog Terdaftar:","btn_dialogue_side_b":"Bicara Sisi B","btn_dialogue_side_a":"Bicara Sisi A","dialogue_card_desc":"Komunikasi dua arah langsung untuk pertemuan pedagogis atau kehadiran kepada wali","guide_card3_title":"3. Interaksi Dua Arah","projector_wifi_label":"Jaringan Wi-Fi Lokal","guide_card2_title":"2. Penggunaan Headphone","projector_modal_title":"Hubungkan ke Kelas","footer_text":"Yanik, Penerjemah © 2026 • Sistem Terjemahan Real-Time Simultan • Kompatibel dengan PC, Mac, Android dan iOS","guide_card1_desc":"Semua ponsel dan komputer harus berada di router atau Wi-Fi yang sama. Siswa membaca Kode QR ruangan dan langsung terhubung, tanpa perlu registrasi atau download.","guide_card2_desc":"Setiap siswa dapat mendengarkan guru dalam bahasa ibu mereka melalui headphone (berkabel atau Bluetooth), sehingga ruangan tetap tenang dan fokus.","guide_card3_desc":"Ketika mengklik 'Ajukan Pertanyaan', siswa berbicara dalam bahasa ibu mereka (misalnya bahasa Hindi), dan pertanyaan tersebut diterjemahkan dan ditampilkan di layar guru dalam bahasa Portugis.","projector_modal_desc":"Arahkan kamera ponsel Anda untuk mendengarkan terjemahan kelas dalam bahasa Anda","btn_create_room":"Buat/Ganti Ruangan","btn_summarize_teacher":"Ringkas Kelas dengan AI","btn_browse_rooms":"Cari/Ganti Kelas","btn_class_summary":"Ringkasan Kelas","modal_create_title":"Buat atau Konfigurasikan Kelas","label_room_title":"Judul/Mata Pelajaran Kelas:","label_teacher_name":"Nama Guru:","label_subject":"Disiplin/Mata Pelajaran:","label_room_code":"Kode Kamar (untuk dimasuki siswa):","label_teacher_speech_lang":"Bahasa Pidato Guru:","btn_generate":"Untuk menghasilkan","btn_cancel":"Membatalkan","btn_start_room":"Mulai Kelas di Ruangan ini","modal_browse_title":"Cari Kelas yang Tersedia di Sekolah","btn_refresh":"Pembaruan","placeholder_search_rooms":"Cari kelas berdasarkan mata pelajaran, guru atau kode...","btn_join_room":"Bergabunglah dengan Kelas","btn_copy_summary":"Salin Ringkasan","btn_download_summary":"Unduh (.txt)","btn_print_summary":"Cetak/PDF","btn_speak_summary":"Dengarkan Ringkasan","btn_close_summary":"Untuk menutup","initial_modal_title":"Pilih Bahasa Anda","initial_modal_subtitle":"Pilih bahasa Anda untuk melanjutkan di platform","initial_modal_btn":"Konfirmasikan Bahasa dan Memulai","filter_all":"Semua","subject_math":"Matematika","subject_science":"Sains","subject_history":"Sejarah / Geografi","subject_languages":"Bahasa","subject_tech":"Teknologi","subject_general":"Umum"
  },"uk": {"nav_live":"Підключено","tab_guide":"Посібник користувача","nav_room_prefix":"кімната:","nav_direct":"Режим живого/офлайн","app_version":"v2.4 Pro","tab_dialogue":"Підтримка 1-на-1","tab_teacher":"Стіл вчителя","nav_projector":"Дизайн QR-коду","tab_student":"Студентський квиток","teacher_card_title":"Голосове мовлення","btn_transmit":"Потік","teacher_mic_hint":"Говоріть чітко. Переклад на хінді, французьку, англійську та інші мови відбувається в режимі реального часу.","teacher_manual_label":"Введіть повідомлення або оголошення для класу (працює навіть без мікрофона):","teacher_card_desc":"Ваше мовлення записується, перекладається в реальному часі та передається підключеним студентам","teacher_mic_status_live":"Заняття в прямому ефірі (говоріть у мікрофон)","teacher_manual_placeholder":"Наприклад: Відкрийте матеріал до розділу 3...","teacher_mic_status_idle":"Торкніться мікрофона, щоб почати трансляцію","btn_export":"Експорт (.txt)","teacher_input_lang_label":"Мова введення:","transcript_card_title":"Запис передачі","btn_copy":"Копія","btn_save":"зберегти","unlock_audio_desc":"Торкніться кнопки поруч, щоб почути переклад вголос у навушниках.","student_access_desc":"Покажіть цей QR-код, щоб учні могли підключити свої пристрої до однієї мережі Wi-Fi:","unlock_audio_title":"Увімкніть відтворення аудіо","connected_card_desc":"Розповсюдження мови в реальному часі:","connected_card_title":"Підключені учасники","btn_clear":"Чистити","student_access_title":"Студентський доступ","room_id_label":"Ідентифікатор кімнати:","student_autospeak_label":"Автоматичне відтворення голосу","student_speed_normal":"1,0x (звичайний)","student_speed_slow":"0,85x (повільно)","student_panel_title":"Прийом перекладу","student_speed_label":"Ритм:","btn_unlock_audio":"Увімкнути аудіо","student_font_label":"Текст:","btn_test_audio":"Перевірте звук","student_listen_label":"Слухайте та читайте за адресою:","student_speed_fast":"1,15x (швидко)","btn_replay":"Слухайте ще раз","student_history_title":"Історія перекладних фраз","ask_title":"Поставте запитання вчителю (навпаки)","btn_ask_student_stop":"⏹ Повне питання","caption_waiting":"Чекаємо, поки вчитель скаже...","btn_ask_student":"Задайте запитання вчителю","caption_badge":"Синхронний переклад","ask_speak_label":"Моя мова:","caption_default_text":"Підключіть навушники. Коли вчитель говорить, тут з’являться перекладені субтитри, які відтворюватимуться вашою мовою.","ask_desc":"Натисніть кнопку та говоріть рідною мовою (наприклад, хінді, французькою, англійською). Ваше запитання буде перекладено та доставлено безпосередньо вчителю.","dialogue_card_desc":"Прямий двосторонній зв'язок для педагогічних зборів або відвідування опікунів","guide_card1_title":"1. Підключення по локальній мережі Wi-Fi","guide_title":"Керівництво з експлуатації та рекомендації щодо доступності","dialogue_card_title":"Індивідуальне та двостороннє обслуговування","dialogue_side_b_title":"Студент / опікун (сторона B)","btn_dialogue_side_b":"Сторона обговорення B","btn_dialogue_side_a":"Сторона обговорення A","dialogue_history_label":"Зареєстрований діалог:","dialogue_side_a_title":"Вихователь (сторона А)","guide_desc":"Yanik, Translator об’єднує викладачів і студентів у багатомовному середовищі, сприяючи негайному залученню іноземних студентів, біженців та іммігрантів за допомогою двостороннього перекладу в реальному часі на гінді, португальську, англійську, французьку та понад 100 мовами.","guide_card3_title":"3. Двонаправлена ​​взаємодія","projector_wifi_label":"Локальна мережа Wi-Fi","guide_card2_title":"2. Використання навушників","projector_modal_title":"Підключіться до класу","guide_card1_desc":"Усі мобільні телефони та комп’ютери мають бути підключені до одного маршрутизатора або Wi-Fi. Студент зчитує QR-код кімнати та негайно підключається, не потребуючи реєстрації чи завантажень.","projector_modal_desc":"Наведіть камеру мобільного телефону, щоб почути переклад уроку вашою мовою","guide_card2_desc":"Кожен учень може слухати вчителя рідною мовою через навушники (дротові або Bluetooth), зберігаючи в кімнаті тишу та зосередженість.","footer_text":"Янік, перекладач © 2026 • Система синхронного перекладу в реальному часі • Сумісність із ПК, Mac, Android та iOS","guide_card3_desc":"Коли натискається «Поставити запитання», учень говорить своєю рідною мовою (наприклад, гінді), а запитання перекладається та відображається на екрані вчителя португальською мовою.","btn_create_room":"Створити/змінити кімнату","btn_summarize_teacher":"Підведення підсумків уроку за допомогою ШІ","btn_browse_rooms":"Пошук/перемикання класів","btn_class_summary":"Підсумок заняття","modal_create_title":"Створіть або налаштуйте класну кімнату","label_room_title":"Назва/Тема класу:","label_teacher_name":"Ім'я вчителя:","label_subject":"Дисципліна/Предмет:","label_room_code":"Код кімнати (для студентів):","label_teacher_speech_lang":"Мова виступу вчителя:","btn_generate":"Генерувати","btn_cancel":"Скасувати","btn_start_room":"Розпочніть заняття в цій кімнаті","modal_browse_title":"Шукайте доступні заняття в школі","btn_refresh":"Оновлення","placeholder_search_rooms":"Пошук класу за предметом, учителем або кодом...","btn_join_room":"Приєднатися до класу","btn_copy_summary":"Копіювати резюме","btn_download_summary":"Завантажити (.txt)","btn_print_summary":"Друк/PDF","btn_speak_summary":"Слухайте резюме","btn_close_summary":"Щоб закрити","initial_modal_title":"Виберіть свою мову","initial_modal_subtitle":"Виберіть мову, щоб продовжити роботу на платформі","initial_modal_btn":"Підтвердьте мову та почніть","filter_all":"Всі","subject_math":"Математика","subject_science":"Природничі науки","subject_history":"Історія / Гео","subject_languages":"Мови","subject_tech":"Технології","subject_general":"Загальне"
  },"ur": {"nav_live":"جڑا ہوا","tab_student":"سٹوڈنٹ کارڈ","nav_room_prefix":"کمرہ:","tab_guide":"صارف دستی","app_version":"v2.4 پرو","nav_projector":"ڈیزائن QR کوڈ","teacher_card_title":"صوتی نشریات","tab_teacher":"ٹیچر کی میز","nav_direct":"لائیو/آف لائن موڈ","tab_dialogue":"1 سے 1 سپورٹ","btn_transmit":"سلسلہ","btn_export":"برآمد کریں (.txt)","teacher_manual_placeholder":"مثال کے طور پر: مواد کو باب 3 میں کھولیں...","teacher_manual_label":"کلاس کے لیے پیغام یا اعلان ٹائپ کریں (مائیکروفون کے بغیر بھی کام کرتا ہے):","teacher_card_desc":"آپ کی تقریر کو کیپچر کیا جاتا ہے، حقیقی وقت میں ترجمہ کیا جاتا ہے اور منسلک طلباء کو منتقل کیا جاتا ہے۔","teacher_input_lang_label":"ان پٹ زبان:","transcript_card_title":"ٹرانسمیشن ریکارڈ","teacher_mic_status_idle":"سلسلہ بندی شروع کرنے کے لیے مائیکروفون کو تھپتھپائیں۔","teacher_mic_hint":"صاف صاف بولو۔ ہندی، فرانسیسی، انگریزی اور دیگر زبانوں میں ترجمہ حقیقی وقت میں ہوتا ہے۔","teacher_mic_status_live":"لائیو سٹریم کلاس (مائیکروفون میں بات کریں)","btn_save":"محفوظ کریں۔","btn_clear":"صاف کرنا","btn_copy":"کاپی","unlock_audio_desc":"اپنے ہیڈ فون پر ترجمے کو بلند آواز میں سننے کے لیے اگلے بٹن کو تھپتھپائیں۔","student_access_desc":"یہ QR کوڈ طلباء کے لیے دکھائیں تاکہ وہ اپنے آلات کو اسی Wi-Fi نیٹ ورک سے منسلک کر سکیں:","connected_card_desc":"ریئل ٹائم زبان کی تقسیم:","student_access_title":"طلباء تک رسائی","unlock_audio_title":"آڈیو پلے بیک کو فعال کریں۔","room_id_label":"کمرے کا شناخت کنندہ:","connected_card_title":"منسلک شرکاء","student_font_label":"متن:","btn_unlock_audio":"آڈیو کو فعال کریں","student_speed_fast":"1.15x (تیز)","student_panel_title":"ترجمہ استقبالیہ","student_autospeak_label":"خود بخود آواز چلائیں۔","student_speed_label":"تال:","student_speed_slow":"0.85x (آہستہ)","student_speed_normal":"1.0x (عام)","student_listen_label":"سنیں اور پڑھیں:","btn_test_audio":"ٹیسٹ ساؤنڈ","btn_ask_student":"استاد سے ایک سوال پوچھیں۔","student_history_title":"ترجمہ شدہ فقروں کی تاریخ","caption_waiting":"استاد کے بولنے کا انتظار ہے...","btn_replay":"دوبارہ سنیں۔","btn_ask_student_stop":"⏹ مکمل سوال","ask_speak_label":"میری بولنے کی زبان:","caption_default_text":"اپنے ہیڈ فون کو جوڑیں۔ جب استاد بولے گا، ترجمہ شدہ سب ٹائٹلز یہاں ظاہر ہوں گے اور آپ کی زبان میں چلیں گے۔","ask_desc":"بٹن دبائیں اور اپنی مادری زبان میں بات کریں (جیسے ہندی، فرانسیسی، انگریزی)۔ آپ کا سوال ترجمہ کر کے براہ راست استاد کو پہنچا دیا جائے گا۔","ask_title":"استاد سے ایک سوال پوچھیں (اس کے برعکس)","caption_badge":"بیک وقت ترجمہ","btn_dialogue_side_a":"ٹاک سائیڈ اے","guide_card1_title":"1. Wi-Fi لوکل ایریا کنکشن","guide_title":"آپریشن دستی اور قابل رسائی رہنما خطوط","dialogue_side_b_title":"طالب علم / سرپرست (سائیڈ بی)","btn_dialogue_side_b":"ٹاک سائیڈ بی","dialogue_card_title":"انفرادی اور دو طرفہ خدمت","dialogue_card_desc":"تدریسی میٹنگز یا سرپرستوں کی حاضری کے لیے براہ راست دو طرفہ مواصلت","dialogue_side_a_title":"معلم (سائیڈ اے)","dialogue_history_label":"رجسٹرڈ ڈائیلاگ:","guide_desc":"یانک، مترجم اساتذہ اور طلباء کو کثیر لسانی ماحول میں جوڑتا ہے، غیر ملکی طلباء، پناہ گزینوں اور تارکین وطن کو حقیقی وقت میں، ہندی، پرتگالی، انگریزی، فرانسیسی اور 100 سے زیادہ زبانوں میں دو طرفہ ترجمہ کے ساتھ فوری شمولیت کو فروغ دیتا ہے۔","projector_wifi_label":"مقامی وائی فائی نیٹ ورک","guide_card2_title":"2۔ ہیڈ فون کا استعمال","footer_text":"یانک، مترجم © 2026 • بیک وقت ریئل ٹائم ٹرانسلیشن سسٹم • PC، Mac، Android اور iOS کے ساتھ ہم آہنگ","projector_modal_title":"کلاس سے جڑیں۔","guide_card3_title":"3. دو طرفہ تعامل","guide_card1_desc":"تمام سیل فونز اور کمپیوٹرز کا ایک ہی روٹر یا وائی فائی پر ہونا ضروری ہے۔ طالب علم کمرے کا QR کوڈ پڑھتا ہے اور رجسٹریشن یا ڈاؤن لوڈ کی ضرورت کے بغیر فوری طور پر جڑ جاتا ہے۔","projector_modal_desc":"کلاس کا ترجمہ اپنی زبان میں سننے کے لیے اپنے سیل فون کیمرہ کی طرف اشارہ کریں۔","guide_card2_desc":"ہر طالب علم کمرے کو خاموش اور توجہ مرکوز رکھتے ہوئے ہیڈ فون (وائرڈ یا بلوٹوتھ) کے ذریعے استاد کو اپنی مادری زبان میں سن سکتا ہے۔","guide_card3_desc":"'سوال پوچھیں' پر کلک کرنے پر، طالب علم اپنی مادری زبان (جیسے ہندی) میں بات کرتا ہے، اور سوال کا ترجمہ اور استاد کی سکرین پر پرتگالی میں دکھایا جاتا ہے۔","btn_create_room":"کمرہ بنائیں/تبدیل کریں۔","btn_summarize_teacher":"AI کے ساتھ کلاس کا خلاصہ کریں۔","btn_browse_rooms":"کلاسز تلاش کریں/سوئچ کریں۔","btn_class_summary":"کلاس کا خلاصہ","modal_create_title":"کلاس روم بنائیں یا کنفیگر کریں۔","label_room_title":"کلاس کا عنوان/موضوع:","label_teacher_name":"ٹیچر کا نام:","label_subject":"نظم و ضبط/موضوع:","label_room_code":"کمرے کا کوڈ (طلبہ کے داخلے کے لیے):","label_teacher_speech_lang":"استاد کی تقریر کی زبان:","btn_generate":"پیدا کرنا","btn_cancel":"منسوخ کریں۔","btn_start_room":"اس کمرے میں کلاس شروع کریں۔","modal_browse_title":"سکول میں دستیاب کلاسز تلاش کریں۔","btn_refresh":"اپ ڈیٹ","placeholder_search_rooms":"مضمون، استاد یا کوڈ کے لحاظ سے کلاس تلاش کریں...","btn_join_room":"کلاس میں شامل ہوں۔","btn_copy_summary":"سمری کاپی کریں۔","btn_download_summary":"ڈاؤن لوڈ کریں (.txt)","btn_print_summary":"پرنٹ/پی ڈی ایف","btn_speak_summary":"خلاصہ سنیں۔","btn_close_summary":"بند کرنا","initial_modal_title":"اپنی زبان منتخب کریں۔","initial_modal_subtitle":"پلیٹ فارم پر جاری رکھنے کے لیے اپنی زبان کا انتخاب کریں۔","initial_modal_btn":"زبان کی تصدیق کریں اور شروع کریں۔","filter_all":"تمام","subject_math":"ریاضی","subject_science":"سائنس","subject_history":"تاریخ / جغرافیہ","subject_languages":"زبانیں","subject_tech":"ٹیکنالوجی","subject_general":"عام"
  }
};
const state = {
  activeTab: 'teacher',
  roomId: 'SALA-1',
  role: 'teacher',
  clientId: null,
  uiLang: 'pt',
  
  // Reconhecimento de Fala
  recognition: null,
  isRecordingTeacher: false,
  isRecordingStudent: false,
  isRecordingDiagA: false,
  isRecordingDiagB: false,
  
  // Idiomas Selecionados - NÃO selecionados automaticamente na abertura da página
  teacherLang: sessionStorage.getItem('yanik_chosen_teacher_lang') || '',
  studentTargetLang: sessionStorage.getItem('yanik_chosen_student_lang') || '',
  studentSpeakLang: sessionStorage.getItem('yanik_chosen_student_lang') || '',
  diagLangA: '',
  diagLangB: '',
  
  // Áudio e Síntese
  audioUnlocked: false,
  autoSpeak: true,
  speechRate: 1.0,
  speechVolume: 1.0,
  availableVoices: [],
  
  // Conectividade
  isServerConnected: false,
  isFileProtocol: window.location.protocol === 'file:',
  eventSource: null,
  serverInfo: null,
  localChannel: null,
  
  // Histórico
  teacherHistory: [],
  studentHistory: [],
  dialogueHistory: [],

  // Sistema de Gerenciamento de Salas Múltiplas
  roomDetails: {
    id: 'SALA-1',
    title: 'Aula - Sala 1',
    teacherName: 'Prof. Yanik',
    subject: 'Geral',
    language: 'pt'
  },
  availableRooms: [],
  roomSearchQuery: '',
  roomFilterSubject: 'all',
  currentSummaryData: null
};

// ========================================================
// 1. INICIALIZAÇÃO
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Inicializa imediatamente toda a interface, seletores e escutas de eventos (0ms, instantâneo)
  setupBroadcastChannel();
  parseUrlParams();
  setupLanguageSelectors();
  setupUiLanguageSelector();
  setupTheme();
  setupTabs();
  setupSpeechSynthesis();
  initSpeechRecognition();
  setupInitialLanguageModal();
  setupEventListeners();
  updateRoomDisplay();
  renderShareLinks();
  renderQrCode();
  initClassSummarizer();
  initSaasPlatform();

  // 2. Conecta ao servidor e carrega salas em segundo plano (sem travar botões ou renderização)
  loadServerInfo();
  fetchAvailableRooms();

  // 3. Atualização periódica da lista de salas da escola a cada 5 segundos
  setInterval(() => {
    fetchAvailableRooms();
  }, 5000);

  // 4. Desbloqueia áudio no primeiro toque na tela
  document.addEventListener('click', () => {
    if (!state.audioUnlocked) {
      unlockMobileAudio(false);
    }
  }, { once: true });

  // 5. Solicita explicitamente a seleção de idioma inicial se não tiver sido escolhido
  setTimeout(() => {
    if (state.activeTab === 'teacher' && !state.teacherLang) {
      openInitialLanguageModal('teacher');
    } else if (state.activeTab === 'student' && !state.studentTargetLang) {
      openInitialLanguageModal('student');
    }
  }, 400);
});

function setupBroadcastChannel() {
  try {
    if (state.localChannel) {
      try { state.localChannel.close(); } catch (e) {}
      state.localChannel = null;
    }
    if ('BroadcastChannel' in window) {
      state.localChannel = new BroadcastChannel(`yanik_translator_${state.roomId}`);
      state.localChannel.onmessage = (event) => {
        if (event.data) {
          handleIncomingSpeech(event.data);
        }
      };
    }
  } catch (e) {
    console.warn('BroadcastChannel não disponível:', e);
  }
}

function parseUrlParams() {
  const params = new URLSearchParams(window.location.search);
  if (params.has('room')) state.roomId = params.get('room').toUpperCase();
  if (params.has('role')) {
    state.role = params.get('role');
    state.activeTab = state.role;
  }
  if (params.has('lang')) {
    if (state.role === 'student') state.studentTargetLang = params.get('lang');
    if (state.role === 'teacher') state.teacherLang = params.get('lang');
  }

  // Define idioma da interface (Linguagem da Tela)
  const savedUiLang = localStorage.getItem('yanik-translator-ui-lang');
  if (params.has('uiLang') && UI_TRANSLATIONS[params.get('uiLang')]) {
    state.uiLang = params.get('uiLang');
  } else if (savedUiLang && UI_TRANSLATIONS[savedUiLang]) {
    state.uiLang = savedUiLang;
  } else if (params.has('lang')) {
    const rawLang = params.get('lang').split('-')[0].toLowerCase();
    if (UI_TRANSLATIONS[rawLang]) {
      state.uiLang = rawLang;
    }
  }

  const roomInput = document.getElementById('room-id-input');
  if (roomInput) roomInput.value = state.roomId;
  
  applyUiLanguage(state.uiLang);
}

/**
 * Aplica as traduções da interface dinamicamente na tela
 */
function applyUiLanguage(langCode) {
  if (!UI_TRANSLATIONS[langCode]) {
    langCode = 'pt';
  }
  state.uiLang = langCode;
  localStorage.setItem('yanik-translator-ui-lang', langCode);

  const t = UI_TRANSLATIONS[langCode] || UI_TRANSLATIONS['pt'];

  // 1. Textos estáticos
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.textContent = t[key];
    }
  });

  // 2. Placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key]) {
      el.setAttribute('placeholder', t[key]);
    }
  });

  // 3. Titles / Tooltips
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    if (t[key]) {
      el.setAttribute('title', t[key]);
    }
  });

  // 4. Badge da sala
  const headerRoomBadge = document.getElementById('header-room-badge');
  if (headerRoomBadge) {
    headerRoomBadge.textContent = `${t.nav_room_prefix || 'Sala: '}${state.roomId}`;
  }

  // 5. Status do microfone se ocioso
  const teacherStatus = document.getElementById('teacher-mic-status');
  if (teacherStatus && !state.isRecordingTeacher) {
    teacherStatus.textContent = t.teacher_mic_status_idle;
  }

  // 6. Atualiza o seletor da UI se necessário
  const uiSelect = document.getElementById('ui-lang-select');
  if (uiSelect && uiSelect.value !== langCode) {
    uiSelect.value = langCode;
  }

  // 7. Atualiza opções de velocidade de fala
  const speedSelect = document.getElementById('speech-rate-select');
  if (speedSelect && speedSelect.options && speedSelect.options.length >= 3) {
    speedSelect.options[0].textContent = t.student_speed_slow || '0.85x (Lento)';
    speedSelect.options[1].textContent = t.student_speed_normal || '1.0x (Normal)';
    speedSelect.options[2].textContent = t.student_speed_fast || '1.15x (Rápido)';
  }
}

function setupUiLanguageSelector() {
  const uiSelect = document.getElementById('ui-lang-select');
  if (!uiSelect) return;

  uiSelect.value = state.uiLang;

  uiSelect.addEventListener('change', (e) => {
    localStorage.setItem('yanik-user-locked-ui-lang', 'true');
    applyUiLanguage(e.target.value);
  });
}

function setupLanguageSelectors() {
  const populate = (selectId, selectedCode, placeholderText) => {
    const sel = document.getElementById(selectId);
    if (!sel) return;
    sel.innerHTML = '';

    const placeholderOpt = document.createElement('option');
    placeholderOpt.value = '';
    placeholderOpt.textContent = placeholderText || '-- Selecione o Idioma --';
    if (!selectedCode) {
      placeholderOpt.selected = true;
      placeholderOpt.disabled = true;
    }
    sel.appendChild(placeholderOpt);

    LANGUAGES.forEach(lang => {
      const opt = document.createElement('option');
      opt.value = lang.code;
      opt.textContent = `${lang.native} (${lang.name})`;
      if (selectedCode && lang.code === selectedCode) opt.selected = true;
      sel.appendChild(opt);
    });
  };

  populate('teacher-lang-select', state.teacherLang, '👉 Selecione seu Idioma de Fala...');
  populate('create-room-lang', state.teacherLang, '👉 Selecione o Idioma do Professor...');
  populate('student-lang-select', state.studentTargetLang, '👉 Selecione seu Idioma de Tradução...');
  populate('student-speak-lang-select', state.studentSpeakLang, '👉 Selecione seu Idioma de Fala...');
  populate('diag-lang-a', state.diagLangA, '👉 Selecione o Idioma Lado A...');
  populate('diag-lang-b', state.diagLangB, '👉 Selecione o Idioma Lado B...');
}

let currentLanguageModalRole = 'teacher';

function setupInitialLanguageModal() {
  const modal = document.getElementById('initial-lang-modal');
  const closeBtn = document.getElementById('btn-close-initial-lang');
  const confirmBtn = document.getElementById('btn-confirm-initial-lang');
  const select = document.getElementById('initial-lang-select');
  const chips = document.querySelectorAll('.quick-lang-btn');

  if (select) {
    select.innerHTML = '<option value="" disabled selected>-- Selecione na lista completa --</option>';
    LANGUAGES.forEach(lang => {
      const opt = document.createElement('option');
      opt.value = lang.code;
      opt.textContent = `${lang.native} (${lang.name})`;
      select.appendChild(opt);
    });

    select.addEventListener('change', () => {
      chips.forEach(b => b.classList.toggle('active', b.getAttribute('data-lang') === select.value));
    });
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const lang = chip.getAttribute('data-lang');
      chips.forEach(b => b.classList.remove('active'));
      chip.classList.add('active');
      if (select) select.value = lang;
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  if (confirmBtn && modal) {
    confirmBtn.addEventListener('click', () => {
      const chosenLang = select ? select.value : '';
      if (!chosenLang) {
        showToast('⚠️ Por favor, escolha um idioma antes de confirmar.', 'warning');
        return;
      }
      applyChosenLanguage(currentLanguageModalRole, chosenLang);
      modal.classList.remove('active');
    });
  }
}

function openInitialLanguageModal(role, force = false) {
  currentLanguageModalRole = role || (state.activeTab === 'teacher' ? 'teacher' : 'student');
  const modal = document.getElementById('initial-lang-modal');
  if (!modal) return;

  const title = document.getElementById('initial-lang-title');
  const subtitle = document.getElementById('initial-lang-subtitle');
  const select = document.getElementById('initial-lang-select');
  const chips = document.querySelectorAll('.quick-lang-btn');

  if (currentLanguageModalRole === 'teacher') {
    if (title) title.textContent = '🎙️ Idioma de Entrada do Professor';
    if (subtitle) subtitle.textContent = 'Em qual idioma você vai falar na aula? Os alunos receberão traduzido para a língua deles.';
    if (select) select.value = state.teacherLang || '';
  } else {
    if (title) title.textContent = '🎧 Idioma de Tradução do Aluno';
    if (subtitle) subtitle.textContent = 'Em qual idioma você deseja ouvir e ler a aula transmitida pelo professor?';
    if (select) select.value = state.studentTargetLang || '';
  }

  const curVal = select ? select.value : '';
  chips.forEach(b => b.classList.toggle('active', b.getAttribute('data-lang') === curVal));

  modal.classList.add('active');
}


// ========================================================
// RE-TRADUÇÃO IMEDIATA E CONTROLE DE IDIOMA EM TEMPO REAL
// ========================================================
window.lastStudentSpeech = null;

async function onStudentTargetLanguageChange(newLang) {
  if (!newLang) return;
  state.studentTargetLang = newLang;
  if (!state.studentSpeakLang) state.studentSpeakLang = newLang;
  sessionStorage.setItem('yanik_chosen_student_lang', newLang);

  const sel = document.getElementById('student-lang-select');
  if (sel && sel.value !== newLang) sel.value = newLang;
  const speakSel = document.getElementById('student-speak-lang-select');
  if (speakSel && speakSel.value !== newLang) speakSel.value = newLang;

  const langObj = LANGUAGES.find(l => l.code === newLang);
  const langName = langObj ? `${langObj.native}` : newLang;

  // 1. Atualiza no servidor central e reconecta o stream
  updateStudentLanguageOnServer(newLang);
  connectRealtime();

  // 2. Sincroniza a linguagem visual da interface se não bloqueada pelo usuário
  const rawUi = newLang.split('-')[0].toLowerCase();
  if (UI_TRANSLATIONS[rawUi] && !localStorage.getItem('yanik-user-locked-ui-lang')) {
    applyUiLanguage(rawUi);
  }

  // 3. Imediatamente retraduz o texto atual da lousa do aluno
  await retranslateCurrentStudentCaption(newLang);

  // 4. Retraduz o histórico de mensagens do feed do aluno
  retranslateStudentFeed(newLang);

  showToast(`✅ Idioma do aluno atualizado: ${langName}`, 'info');
}

function onTeacherLanguageChange(newLang) {
  if (!newLang) return;
  state.teacherLang = newLang;
  sessionStorage.setItem('yanik_chosen_teacher_lang', newLang);

  const sel = document.getElementById('teacher-lang-select');
  if (sel && sel.value !== newLang) sel.value = newLang;
  const createRoomSel = document.getElementById('create-room-lang');
  if (createRoomSel && createRoomSel.value !== newLang) createRoomSel.value = newLang;

  const rawUi = newLang.split('-')[0].toLowerCase();
  if (UI_TRANSLATIONS[rawUi] && !localStorage.getItem('yanik-user-locked-ui-lang')) {
    applyUiLanguage(rawUi);
  }

  if (state.isRecordingTeacher) {
    restartRecognition(newLang);
  }

  // Notifica o servidor sobre a alteração de idioma na sala
  if (state.roomId && state.isServerConnected) {
    fetch('/api/create-room', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        roomId: state.roomId,
        language: newLang
      })
    }).catch(() => {});
  }

  const langObj = LANGUAGES.find(l => l.code === newLang);
  const langName = langObj ? `${langObj.native}` : newLang;
  showToast(`✅ Idioma do professor atualizado: ${langName}`, 'info');
}

async function retranslateCurrentStudentCaption(newLang) {
  const captionEl = document.getElementById('student-live-text');
  const sourceBadge = document.getElementById('student-source-badge');
  if (!captionEl || !newLang) return;

  const langObj = LANGUAGES.find(l => l.code === newLang);
  const langName = langObj ? langObj.native : newLang;

  if (!window.lastStudentSpeech || !window.lastStudentSpeech.originalText) {
    captionEl.textContent = `Aguardando o professor falar... Sua tradução simultânea será exibida em ${langName}.`;
    if (sourceBadge) {
      sourceBadge.innerHTML = `Ouvindo em <strong>${(newLang || '').toUpperCase()}</strong>`;
    }
    return;
  }

  const { originalText, sourceLang, translations, senderName } = window.lastStudentSpeech;
  const normTarget = getGoogleLangCode(newLang);
  const normSource = getGoogleLangCode(sourceLang);
  const normOrig = normalizeSpeechText(originalText);

  if (sourceBadge) {
    sourceBadge.innerHTML = `<strong style="color: var(--primary);">Traduzindo para ${newLang.toUpperCase()}...</strong>`;
  }

  let translated = '';
  if (normTarget === normSource) {
    translated = originalText;
  } else if (translations && translations[normTarget] && normalizeSpeechText(translations[normTarget]) !== normOrig) {
    translated = translations[normTarget];
  } else {
    translated = await translateUniversal(originalText, sourceLang, newLang, false);
  }

  if (translated) {
    captionEl.textContent = translated;
    if (sourceBadge) {
      sourceBadge.innerHTML = `<strong>${escapeHtml(senderName || 'Professor')}</strong> (${(sourceLang || 'pt').toUpperCase()} → ${newLang.toUpperCase()})`;
    }
    if (translations) translations[normTarget] = translated;
  }
}

async function retranslateStudentFeed(newLang) {
  if (!newLang) return;
  const feedItems = document.querySelectorAll('#student-feed .feed-item');
  if (!feedItems || feedItems.length === 0) return;

  const normTarget = getGoogleLangCode(newLang);
  feedItems.forEach(async (item) => {
    const originalText = item.getAttribute('data-original-text');
    const sourceLang = item.getAttribute('data-source-lang') || 'pt';
    const normSource = getGoogleLangCode(sourceLang);
    const normOrig = normalizeSpeechText(originalText);
    const textEl = item.querySelector('.feed-text');
    const metaEl = item.querySelector('.feed-meta');
    const senderName = item.getAttribute('data-sender-name') || 'Professor';
    const storedTranslationsJson = item.getAttribute('data-translations');
    let storedTranslations = {};
    try { if (storedTranslationsJson) storedTranslations = JSON.parse(storedTranslationsJson); } catch (e) {}

    if (!originalText || !textEl) return;

    let translated = '';
    if (normSource === normTarget) {
      translated = originalText;
    } else if (storedTranslations[normTarget] && normalizeSpeechText(storedTranslations[normTarget]) !== normOrig) {
      translated = storedTranslations[normTarget];
    } else {
      translated = await translateUniversal(originalText, sourceLang, newLang, false);
    }

    if (translated) {
      textEl.textContent = translated;
      storedTranslations[normTarget] = translated;
      item.setAttribute('data-translations', JSON.stringify(storedTranslations));
      item.setAttribute('data-target-lang', newLang);
      if (metaEl) {
        const timeText = metaEl.getAttribute('data-time') || '';
        metaEl.innerHTML = `<span class="feed-sender">${escapeHtml(senderName)}</span> <span>${timeText} (${newLang.toUpperCase()})</span>`;
      }
    }
  });
}

function applyChosenLanguage(role, langCode) {
  if (role === 'teacher') {
    onTeacherLanguageChange(langCode);
  } else {
    onStudentTargetLanguageChange(langCode);
  }
}

function setupTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('yanik-translator-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('yanik-translator-theme', next);
      updateThemeIcon(next);
    });
  }
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.innerHTML = theme === 'dark' ? UI_ICONS.sun : UI_ICONS.moon;
}

function setupTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabTarget = btn.getAttribute('data-tab');
      switchTab(tabTarget);
    });
  });

  switchTab(state.activeTab);
}

function switchTab(tabId) {
  state.activeTab = tabId;
  if (tabId === 'teacher' || tabId === 'student') {
    state.role = tabId;
  }

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
  });

  document.querySelectorAll('.tab-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === `tab-${tabId}`);
  });

  if (tabId === 'teacher') {
    renderShareLinks();
  } else if (tabId === 'student' && state.studentTargetLang) {
    retranslateCurrentStudentCaption(state.studentTargetLang);
    retranslateStudentFeed(state.studentTargetLang);
  }

  if (tabId === 'teacher' && !state.teacherLang) {
    openInitialLanguageModal('teacher');
  } else if (tabId === 'student' && !state.studentTargetLang) {
    openInitialLanguageModal('student');
  }

  connectRealtime();
}

// ========================================================
// 2. CONEXÃO EM TEMPO REAL E RESILIÊNCIA INTELIGENTE
// ========================================================
let serverInfoRetryTimer = null;
let sseReconnectTimer = null;

async function loadServerInfo() {
  if (state.isFileProtocol) {
    setStandaloneMode();
    return;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    const res = await fetch('/api/info', { cache: 'no-cache', signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      if (serverInfoRetryTimer) {
        clearTimeout(serverInfoRetryTimer);
        serverInfoRetryTimer = null;
      }
      state.serverInfo = await res.json();
      state.isServerConnected = true;
      updateConnectionStatus(true, 'Conectado');
      connectRealtime();
      fetchAvailableRooms();
      renderShareLinks();
    } else {
      scheduleServerInfoRetry();
    }
  } catch (err) {
    scheduleServerInfoRetry();
  }
}

function scheduleServerInfoRetry() {
  if (state.isFileProtocol) return;
  setStandaloneMode();
  updateConnectionStatus(false, 'Conectando...');
  if (!serverInfoRetryTimer) {
    serverInfoRetryTimer = setTimeout(() => {
      serverInfoRetryTimer = null;
      loadServerInfo();
    }, 2500);
  }
}

function setStandaloneMode() {
  state.isServerConnected = false;
  renderShareLinks();
}

function connectRealtime(force = false) {
  if (state.isFileProtocol) {
    return;
  }

  const currentLang = (state.role === 'teacher' ? state.teacherLang : state.studentTargetLang) || '';
  const clientName = state.role === 'teacher' ? 'Professor' : (currentLang ? `Aluno (${currentLang.toUpperCase()})` : 'Aluno');
  const streamUrl = `/api/stream?room=${encodeURIComponent(state.roomId)}&role=${state.role}&lang=${encodeURIComponent(currentLang)}&name=${encodeURIComponent(clientName)}`;

  if (!force && state.eventSource && state.eventSource.readyState !== EventSource.CLOSED && state.currentStreamUrl === streamUrl) {
    return;
  }

  if (state.eventSource) {
    try { state.eventSource.close(); } catch (e) {}
    state.eventSource = null;
  }

  state.currentStreamUrl = streamUrl;
  state.eventSource = new EventSource(streamUrl);

  state.eventSource.onopen = () => {
    state.isServerConnected = true;
    if (sseReconnectTimer) {
      clearTimeout(sseReconnectTimer);
      sseReconnectTimer = null;
    }
    updateConnectionStatus(true, 'Conectado');
  };

  state.eventSource.onerror = () => {
    if (state.eventSource && state.eventSource.readyState === EventSource.CONNECTING) {
      updateConnectionStatus(false, 'Reconectando...');
    } else {
      updateConnectionStatus(false, 'Modo Direto / Offline');
      if (!sseReconnectTimer) {
        sseReconnectTimer = setTimeout(() => {
          sseReconnectTimer = null;
          connectRealtime(true);
        }, 2500);
      }
    }
  };

  state.eventSource.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      handleServerEvent(data);
    } catch (e) {
      console.error('Erro ao ler pacote SSE', e);
    }
  };
}

function updateConnectionStatus(online, labelKeyOrText) {
  const t = UI_TRANSLATIONS[state.uiLang] || UI_TRANSLATIONS['pt'];
  const dot = document.getElementById('connection-dot');
  const text = document.getElementById('connection-text');
  if (dot) {
    dot.style.background = online ? '#10b981' : '#f59e0b';
    dot.className = online ? 'status-indicator' : 'status-indicator';
  }
  if (text) {
    let label = labelKeyOrText;
    if (labelKeyOrText === 'Conectado') label = t.nav_live || 'Ao Vivo';
    else if (labelKeyOrText === 'Modo Direto / Offline') label = t.nav_direct || 'Modo Direto / Offline';
    else if (labelKeyOrText === 'Conectando...') label = state.uiLang === 'en' ? 'Connecting...' : (t.nav_connecting || 'Conectando...');
    else if (labelKeyOrText === 'Reconectando...') label = state.uiLang === 'en' ? 'Reconnecting...' : (t.nav_reconnecting || 'Reconectando...');
    text.textContent = label;
  }
}

function handleServerEvent(data) {
  if (data.type === 'connected') {
    state.isServerConnected = true;
    state.clientId = data.clientId;
    updateConnectionStatus(true, 'Conectado');
    if (data.roomDetails) {
      state.roomDetails = data.roomDetails;
      updateRoomDisplay();
      updateRoomStats({
        studentCount: data.roomDetails.studentCount || 0,
        languages: data.roomDetails.languages || {}
      });
    }
    if (data.history && data.history.length > 0) {
      data.history.forEach(msg => appendToHistory(msg, false));
    }
  } else if (data.type === 'room_stats') {
    if (data.roomDetails) {
      state.roomDetails = data.roomDetails;
      updateRoomDisplay();
    }
    updateRoomStats(data);
  } else if (data.type === 'speech') {
    handleIncomingSpeech(data);
  } else if (data.type === 'room_closed') {
    alert('Esta sala de aula foi encerrada pelo professor.');
    openBrowseRoomsModal();
  }
}

function updateRoomStats(data) {
  const count = (data && typeof data.studentCount === 'number') ? data.studentCount : 0;
  const tStudents = document.getElementById('teacher-current-students');
  if (tStudents) {
    tStudents.textContent = `${count} aluno(s) conectado(s)`;
  }

  const statsContainer = document.getElementById('connected-stats-pills');
  if (!statsContainer) return;

  statsContainer.innerHTML = '';

  const totalPill = document.createElement('span');
  totalPill.className = 'stat-pill';
  totalPill.innerHTML = `${UI_ICONS.users} <strong>${count} Aluno(s)</strong>`;
  statsContainer.appendChild(totalPill);

  if (data && data.languages) {
    Object.keys(data.languages).forEach(langCode => {
      const langObj = LANGUAGES.find(l => l.code === langCode);
      const pill = document.createElement('span');
      pill.className = 'stat-pill';
      const flag = langObj ? langObj.flag : UI_ICONS.globe;
      const name = langObj ? langObj.name : langCode.toUpperCase();
      pill.innerHTML = `${flag} ${data.languages[langCode]} em ${name}`;
      statsContainer.appendChild(pill);
    });
  }
}

// ========================================================
// 3. MOTOR DE TRADUÇÃO NEURAL CONTEXTUALIZADO (DIRETO NO NAVEGADOR & TEMPO REAL)
// ========================================================
const clientTranslationCache = new Map();

function getGoogleLangCode(code) {
  if (!code) return 'en';
  const c = code.toLowerCase().trim();
  if (c.startsWith('zh-cn') || c === 'zh') return 'zh-CN';
  if (c.startsWith('zh-tw')) return 'zh-TW';
  if (c.startsWith('fil') || c.startsWith('tl')) return 'tl';
  if (c.startsWith('he') || c.startsWith('iw')) return 'iw';
  return c.split('-')[0];
}

function refineSpokenText(rawText, langCode = 'pt', isInterim = false) {
  if (!rawText || !rawText.trim()) return '';
  let text = rawText.trim().replace(/\s+/g, ' ');

  // 1. Remove gaguejos e palavras repetidas consecutivas ("eu eu", "o o", "de um de um")
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

/**
 * Tradução Neural Direta no Navegador (CORS: *), 100% Ilimitada, com verificação anti-texto-original
 */
async function translateUniversal(text, fromLang, toLang, isInterim = false) {
  if (!text || !text.trim()) return '';
  const normFrom = getGoogleLangCode(fromLang || 'pt');
  const normTo = getGoogleLangCode(toLang || 'en');
  const refined = refineSpokenText(text, normFrom, isInterim);
  const normRefined = normalizeSpeechText(refined);

  if (normFrom === normTo && normFrom !== 'auto') {
    return refined;
  }

  const cacheKey = `${normFrom}->${normTo}:${refined}`;
  if (clientTranslationCache.has(cacheKey)) {
    const cached = clientTranslationCache.get(cacheKey);
    if (cached && !cached.includes('MYMEMORY') && !cached.includes('WARNING') && normalizeSpeechText(cached) !== normRefined) {
      return cached;
    }
    clientTranslationCache.delete(cacheKey);
  }

  const tryTranslateWithSl = async (sl) => {
    const fetchGtx = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${normTo}&dt=t&dj=1&q=${encodeURIComponent(refined)}`;
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (!res.ok) throw new Error('GTX HTTP ' + res.status);
      const data = await res.json();
      if (data && Array.isArray(data.sentences)) {
        const trans = cleanTranslatedOutput(data.sentences.map(s => s.trans || '').join(''));
        if (trans && !trans.includes('MYMEMORY') && !trans.includes('WARNING')) {
          if (normRefined.length > 2 && normalizeSpeechText(trans) === normRefined) {
            throw new Error('Identical to source');
          }
          return trans;
        }
      }
      throw new Error('Invalid GTX');
    };

    const fetchClients5 = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);
      const cUrl = `https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=${sl}&tl=${normTo}&q=${encodeURIComponent(refined)}`;
      const res = await fetch(cUrl, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (!res.ok) throw new Error('Clients5 HTTP ' + res.status);
      const data = await res.json();
      let trans = '';
      if (Array.isArray(data) && typeof data[0] === 'string') trans = data[0].trim();
      else if (Array.isArray(data) && Array.isArray(data[0])) trans = data[0].map(x => x[0]).join('').trim();
      trans = cleanTranslatedOutput(trans);
      if (trans && !trans.includes('MYMEMORY') && !trans.includes('WARNING')) {
        if (normRefined.length > 2 && normalizeSpeechText(trans) === normRefined) {
          throw new Error('Identical to source');
        }
        return trans;
      }
      throw new Error('Invalid Clients5');
    };

    return Promise.any([fetchGtx(), fetchClients5()]);
  };

  // 1. Tenta com o idioma de origem selecionado (em paralelo GTX + Clients5)
  try {
    const result = await tryTranslateWithSl(normFrom);
    if (result) {
      if (clientTranslationCache.size > 5000) {
        clientTranslationCache.delete(clientTranslationCache.keys().next().value);
      }
      clientTranslationCache.set(cacheKey, result);
      return result;
    }
  } catch (e) {}

  // 2. Se retornou igual ao original (ex: palavra sem acento ou idioma de entrada diferente), tenta com detecção automática sl=auto
  if (normFrom !== 'auto') {
    try {
      const autoResult = await tryTranslateWithSl('auto');
      if (autoResult) {
        clientTranslationCache.set(cacheKey, autoResult);
        return autoResult;
      }
    } catch (e) {}
  }

  // 3. Fallback pelo servidor central (rejeita se vier igual ao original)
  if (state.isServerConnected && !state.isFileProtocol) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: refined, from: normFrom, to: normTo }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        const trans = cleanTranslatedOutput(data.translated || '');
        if (trans && normalizeSpeechText(trans) !== normRefined) {
          clientTranslationCache.set(cacheKey, trans);
          return trans;
        }
      }
    } catch (e) {}
  }

  return refined;
}

// ========================================================
// 4. RECEPÇÃO E REPRODUÇÃO DE FALA (SINCRONIZADA EM TODAS AS ABAS)
// ========================================================
function normalizeSpeechText(text) {
  if (!text) return '';
  return String(text)
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[\.,\/#!$%\^&\*;:{}=\-_~`()?'"“”‘’…—–]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const processedSpeechIds = new Set();
let lastFinalizedSpeechKey = '';
let lastFinalizedSpeechNorm = '';
let lastFinalizedSpeechTime = 0;
let latestInterimSeq = 0;

async function handleIncomingSpeech(data) {
  if (!data) return;

  if (data.id && !data.isInterim && !data.replaceMessageId) {
    if (processedSpeechIds.has(data.id)) {
      return;
    }
    processedSpeechIds.add(data.id);
    if (processedSpeechIds.size > 500) {
      const first = processedSpeechIds.values().next().value;
      processedSpeechIds.delete(first);
    }
  }

  const currentSeq = data.isInterim ? (++latestInterimSeq) : latestInterimSeq;
  const sourceLang = data.sourceLang || state.teacherLang || 'pt';
  const cleanedOriginal = refineSpokenText(data.originalText || data.text || '', sourceLang, !!data.isInterim);
  const normOriginal = normalizeSpeechText(cleanedOriginal);
  const now = Date.now();

  let isProgressiveExpansion = !!data.replaceMessageId;
  if (!data.isInterim) {
    const speechKey = `${data.senderRole || ''}:${normOriginal}`;
    if (normOriginal && (now - lastFinalizedSpeechTime) < 6000) {
      if (speechKey === lastFinalizedSpeechKey || (lastFinalizedSpeechNorm && lastFinalizedSpeechNorm.startsWith(normOriginal))) {
        return;
      }
      if (lastFinalizedSpeechNorm && normOriginal.startsWith(lastFinalizedSpeechNorm)) {
        isProgressiveExpansion = true;
      }
    }
    lastFinalizedSpeechKey = speechKey;
    lastFinalizedSpeechNorm = normOriginal;
    lastFinalizedSpeechTime = now;
  }

  // Idioma de destino do aluno (mesmo que o usuário esteja na aba do professor, traduz em segundo plano para a Carteira do Aluno estar sempre pronta!)
  const studentLangCode = state.studentTargetLang || 'en';
  const teacherLangCode = state.teacherLang || 'pt';
  const targetCode = data.senderRole === 'student' ? teacherLangCode : studentLangCode;

  const normTarget = getGoogleLangCode(targetCode);
  const normSource = getGoogleLangCode(sourceLang);

  let translatedText = '';
  // Verifica se já veio uma tradução válida e diferente do original
  if (data.translations && data.translations[normTarget]) {
    const candidate = cleanTranslatedOutput(data.translations[normTarget]);
    if (normSource === normTarget || normalizeSpeechText(candidate) !== normOriginal) {
      translatedText = candidate;
    }
  }

  if (!translatedText) {
    translatedText = await translateUniversal(cleanedOriginal, sourceLang, targetCode, !!data.isInterim);
  }

  if (data.isInterim && currentSeq < latestInterimSeq) {
    return;
  }

  const allTranslations = { ...(data.translations || {}) };
  allTranslations[normSource] = cleanedOriginal;
  allTranslations[normTarget] = translatedText;

  if (data.senderRole === 'teacher' && !data.isInterim) {
    window.lastStudentSpeech = {
      originalText: cleanedOriginal,
      sourceLang: sourceLang,
      translations: allTranslations,
      senderName: data.senderName || 'Professor'
    };
  }

  const enrichedData = {
    ...data,
    sourceLang,
    originalText: cleanedOriginal,
    translatedText: translatedText,
    targetLang: targetCode,
    translations: allTranslations,
    isProgressiveExpansion
  };

  // 1. Atualiza SEMPRE o Quadro Digital e o Feed da Carteira do Aluno (mesmo se o professor estiver na aba Mesa do Professor!)
  if (data.senderRole === 'teacher') {
    const captionEl = document.getElementById('student-live-text');
    const sourceBadge = document.getElementById('student-source-badge');

    if (captionEl) {
      if (data.isInterim) {
        captionEl.innerHTML = `<span style="opacity: 0.96;">${escapeHtml(translatedText)}</span><span class="typing-cursor"></span>`;
      } else {
        captionEl.textContent = translatedText;
      }
    }

    if (sourceBadge) {
      if (data.isInterim) {
        sourceBadge.innerHTML = `<strong style="color: #ef4444;">Traduzindo simultaneamente...</strong> (${sourceLang.toUpperCase()} → ${targetCode.toUpperCase()})`;
      } else {
        sourceBadge.innerHTML = `<strong>${escapeHtml(data.senderName || 'Professor')}</strong> (${sourceLang.toUpperCase()} → ${targetCode.toUpperCase()})`;
        sourceBadge.style.color = '';
      }
    }

    if (!data.isInterim) {
      appendStudentFeed(enrichedData);
      // Reproduz voz se o usuário estiver na Carteira do Aluno e tiver escolhida a língua
      if (state.activeTab === 'student' && state.autoSpeak && state.studentTargetLang) {
        speakText(translatedText, state.studentTargetLang);
      }
    }
  }

  // 2. Atualiza SEMPRE o Feed da Mesa do Professor (com pré-visualização da tradução!)
  if (!data.isInterim) {
    appendTeacherFeed(enrichedData);
    if (data.senderRole === 'student') {
      showTeacherQuestionAlert(enrichedData);
      if (state.activeTab === 'teacher' && state.autoSpeak) {
        speakText(translatedText, teacherLangCode);
      }
    }
    appendToHistory(enrichedData, true);
  }
}

function showTeacherQuestionAlert(data) {
  const container = document.getElementById('teacher-alert-box');
  if (!container) return;

  container.style.display = 'block';
  container.innerHTML = `
    <div class="alert-banner">
      <div>
        <strong>Pergunta de ${escapeHtml(data.senderName)} (${data.sourceLang.toUpperCase()}):</strong>
        <p style="margin-top: 4px; font-size: 1.05rem;">"${escapeHtml(data.translatedText)}"</p>
        <small style="color: var(--text-muted); font-style: italic;">Original: "${escapeHtml(data.originalText)}"</small>
      </div>
      <button class="btn btn-secondary" onclick="speakText('${escapeQuotes(data.translatedText)}', '${state.teacherLang || 'pt'}')">${UI_ICONS.volume} Ouvir</button>
    </div>
  `;
}

// ========================================================
// 5. RECONHECIMENTO DE FALA EM TEMPO REAL (ZERO REPETIÇÕES)
// ========================================================
const committedCharsByResultIndex = new Map();

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
    committedCharsByResultIndex.clear();
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
    committedCharsByResultIndex.clear();
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
    let activeInterimIdx = -1;
    let activeInterimRawLen = 0;

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      const rawTranscript = event.results[i][0].transcript || '';
      const committedLen = committedCharsByResultIndex.get(i) || 0;
      const uncommittedSlice = rawTranscript.slice(committedLen);

      if (event.results[i].isFinal) {
        committedCharsByResultIndex.set(i, rawTranscript.length);
        if (uncommittedSlice.trim()) {
          finalTranscript += (finalTranscript ? ' ' : '') + uncommittedSlice.trim();
        }
      } else {
        if (uncommittedSlice.trim()) {
          interimTranscript += (interimTranscript ? ' ' : '') + uncommittedSlice.trim();
          activeInterimIdx = i;
          activeInterimRawLen = rawTranscript.length;
        }
      }
    }

    if (state.isRecordingTeacher) {
      handleTeacherSpeechResult(finalTranscript, interimTranscript, activeInterimIdx, activeInterimRawLen);
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
let longUtteranceSafetyTimer = null;
let lastTeacherCommittedNorm = '';
let lastTeacherCommittedTime = 0;

async function handleTeacherSpeechResult(finalText, interimText, activeInterimIdx = -1, activeInterimRawLen = 0) {
  const interimBox = document.getElementById('teacher-interim-box');

  // 1. Streaming de legenda em tempo real no Quadro Digital (NÃO dispara voz nem cria cards parciais repetidos)
  if (interimText && !finalText) {
    const refinedInterim = refineSpokenText(interimText, state.teacherLang, true);
    if (interimBox) {
      interimBox.style.display = 'block';
      interimBox.innerHTML = `${UI_ICONS.mic} <em>${escapeHtml(refinedInterim)}</em><span class="typing-cursor"></span>`;
    }

    if (refinedInterim !== lastBroadcastInterimText) {
      clearTimeout(interimBroadcastTimer);
      interimBroadcastTimer = setTimeout(() => {
        lastBroadcastInterimText = refinedInterim;
        processAndBroadcastSpeech({
          roomId: state.roomId,
          senderRole: 'teacher',
          senderName: 'Professor',
          text: refinedInterim,
          sourceLang: state.teacherLang || 'pt',
          isInterim: true
        });
      }, 45);
    }

    // Salvaguarda apenas para discursos muito longos (> 14 palavras + 1.8s de silêncio completo sem isFinal nativo)
    clearTimeout(longUtteranceSafetyTimer);
    const wordsCount = refinedInterim.split(/\s+/).length;
    if (wordsCount >= 14 || (wordsCount >= 5 && /[.,?!;:]$/.test(refinedInterim))) {
      longUtteranceSafetyTimer = setTimeout(() => {
        if (activeInterimIdx >= 0 && activeInterimRawLen > 0) {
          committedCharsByResultIndex.set(activeInterimIdx, activeInterimRawLen);
        }
        const finalClause = refineSpokenText(interimText, state.teacherLang, false);
        const normClause = normalizeSpeechText(finalClause);
        if (!normClause || (normClause === lastTeacherCommittedNorm && (Date.now() - lastTeacherCommittedTime < 5000))) {
          return;
        }
        lastTeacherCommittedNorm = normClause;
        lastTeacherCommittedTime = Date.now();
        if (interimBox) interimBox.style.display = 'none';
        processAndBroadcastSpeech({
          roomId: state.roomId,
          senderRole: 'teacher',
          senderName: 'Professor',
          text: finalClause,
          sourceLang: state.teacherLang || 'pt',
          isInterim: false
        });
      }, 1750);
    }
  }

  // 2. Finalização única e limpa da frase completa (isFinal: true) -> Traduz, adiciona 1 card e fala 1 única vez!
  if (finalText) {
    clearTimeout(longUtteranceSafetyTimer);
    clearTimeout(interimBroadcastTimer);
    if (interimBox) interimBox.style.display = 'none';

    const refinedFinal = refineSpokenText(finalText, state.teacherLang, false);
    const normFinal = normalizeSpeechText(refinedFinal);
    if (!normFinal || normFinal.length < 2) return;

    if (normFinal === lastTeacherCommittedNorm && (Date.now() - lastTeacherCommittedTime < 5000)) {
      return;
    }
    lastTeacherCommittedNorm = normFinal;
    lastTeacherCommittedTime = Date.now();

    processAndBroadcastSpeech({
      roomId: state.roomId,
      senderRole: 'teacher',
      senderName: 'Professor',
      text: refinedFinal,
      sourceLang: state.teacherLang || 'pt',
      isInterim: false
    });
  }
}

let lastStudentFinalizedNorm = '';
let lastStudentFinalizedTime = 0;

async function handleStudentSpeechResult(finalText, interimText) {
  const preview = document.getElementById('student-question-preview');
  const speakLang = state.studentSpeakLang || state.studentTargetLang || 'en';
  if (interimText && preview) {
    preview.textContent = `Ouvindo: "${refineSpokenText(interimText, speakLang, true)}"...`;
  }

  if (finalText) {
    const refined = refineSpokenText(finalText, speakLang, false);
    const norm = normalizeSpeechText(refined);
    const now = Date.now();
    if (!norm || (norm === lastStudentFinalizedNorm && (now - lastStudentFinalizedTime < 3500))) {
      return;
    }
    lastStudentFinalizedNorm = norm;
    lastStudentFinalizedTime = now;

    if (preview) preview.textContent = `Enviando pergunta: "${refined}"`;
    
    processAndBroadcastSpeech({
      roomId: state.roomId,
      senderRole: 'student',
      senderName: `Aluno (${speakLang.toUpperCase()})`,
      text: refined,
      sourceLang: speakLang,
      isInterim: false
    });

    setTimeout(() => {
      stopRecording();
      if (preview) preview.textContent = '';
    }, 1000);
  }
}

async function processAndBroadcastSpeech(payload) {
  const sourceLang = payload.sourceLang || state.teacherLang || 'pt';
  const cleanedText = refineSpokenText(payload.text || '', sourceLang, !!payload.isInterim);
  if (!cleanedText) return;

  const msgId = payload.id || ('msg-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8));
  const primaryTarget = payload.senderRole === 'teacher' ? (state.studentTargetLang || 'en') : (state.teacherLang || 'pt');
  const normSource = getGoogleLangCode(sourceLang);
  const normPrimaryTarget = getGoogleLangCode(primaryTarget);

  // Calcula a tradução diretamente no navegador do remetente (CORS: *, sem bloqueio de IP em nuvem!)
  const preTranslations = { [normSource]: cleanedText };
  const targetLangsToPrecompute = new Set([normPrimaryTarget]);

  if (!payload.isInterim && state.roomDetails && state.roomDetails.languages) {
    Object.keys(state.roomDetails.languages).forEach(l => targetLangsToPrecompute.add(getGoogleLangCode(l)));
  }
  if (!payload.isInterim && normSource !== 'en') {
    targetLangsToPrecompute.add('en');
  }

  await Promise.all(
    Array.from(targetLangsToPrecompute)
      .filter(tl => tl && tl !== normSource)
      .map(async (tl) => {
        try {
          const t = await translateUniversal(cleanedText, normSource, tl, !!payload.isInterim);
          if (t) preTranslations[tl] = t;
        } catch (e) {}
      })
  );

  const outgoingPayload = {
    ...payload,
    id: msgId,
    clientId: state.clientId,
    sourceLang: normSource,
    targetLang: normPrimaryTarget,
    text: cleanedText,
    translations: preTranslations
  };

  // Atualiza a interface local imediatamente (0ms de espera de rede para quem enviou!)
  const localPacket = {
    id: msgId,
    timestamp: new Date().toISOString(),
    senderRole: payload.senderRole,
    senderName: payload.senderName,
    sourceLang: normSource,
    targetLang: normPrimaryTarget,
    originalText: cleanedText,
    translatedText: preTranslations[normPrimaryTarget] || cleanedText,
    translations: preTranslations,
    isInterim: !!payload.isInterim
  };

  handleIncomingSpeech(localPacket);

  if (state.localChannel) {
    try { state.localChannel.postMessage(localPacket); } catch (e) {}
  }

  // Envia ao servidor central para todos os dispositivos conectados na sala
  if (state.isServerConnected && !state.isFileProtocol) {
    try {
      fetch('/api/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(outgoingPayload)
      }).catch(() => {});
    } catch (e) {}
  }
}

// ========================================================
// 6. SÍNTESE DE VOZ NATURAL NATIVA POR IDIOMA (SEM SOTAQUE ESTRANGEIRO E SEM REPETIÇÕES)
// ========================================================
const audioQueue = [];
let isAudioProcessing = false;
let currentAudioElement = null;
let lastSpokenTextNorm = '';
let lastSpokenWords = [];
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
  let cleaned = cleanTranslatedOutput(text);
  const normCleaned = normalizeSpeechText(cleaned);
  if (!normCleaned) return;

  const now = Date.now();

  // 1. Previne qualquer repetição da mesma frase ou fragmento nos últimos 8 segundos
  if ((now - lastSpokenTimestamp) < 8000 && lastSpokenTextNorm) {
    if (normCleaned === lastSpokenTextNorm || lastSpokenTextNorm.includes(normCleaned)) {
      return;
    }
    if (normCleaned.startsWith(lastSpokenTextNorm)) {
      const newWords = cleaned.split(/\s+/);
      if (newWords.length > lastSpokenWords.length && lastSpokenWords.length > 0) {
        cleaned = newWords.slice(lastSpokenWords.length).join(' ');
      } else {
        return;
      }
    }
  }

  // 2. Se houver um item na fila que seja prefixo ou igual, substitui ou ignora
  for (let i = 0; i < audioQueue.length; i++) {
    const qNorm = audioQueue[i].norm;
    if (qNorm === normCleaned || qNorm.includes(normCleaned)) {
      return;
    }
    if (normCleaned.startsWith(qNorm)) {
      audioQueue[i] = { text: cleaned, lang: langCode, norm: normCleaned, fullWords: text.trim().split(/\s+/) };
      return;
    }
  }

  if (audioQueue.length >= 2) {
    audioQueue.shift();
  }

  audioQueue.push({
    text: cleaned,
    lang: langCode,
    norm: normCleaned,
    fullWords: text.trim().split(/\s+/)
  });

  if (!isAudioProcessing) {
    processNextAudioQueue();
  }
}

/**
 * Seleciona EXCLUSIVAMENTE uma voz nativa do idioma solicitado, priorizando vozes Neurais / Natural / Online.
 * NUNCA retorna uma voz de outro idioma (evita sotaque estrangeiro!).
 */
function findBestMaleVoice(targetBcp47) {
  if (!state.availableVoices || state.availableVoices.length === 0) {
    if ('speechSynthesis' in window) {
      state.availableVoices = window.speechSynthesis.getVoices();
    }
  }
  const voices = state.availableVoices || [];
  if (voices.length === 0) return null;

  const targetLangLower = (targetBcp47 || 'en-US').toLowerCase().replace('_', '-');
  const prefix = targetLangLower.split('-')[0];

  // Filtra ESTRITAMENTE vozes nativas do idioma alvo (NUNCA usa voz de outro idioma!)
  const langVoices = voices.filter(v => {
    const vLang = (v.lang || '').toLowerCase().replace('_', '-');
    return vLang === targetLangLower || vLang.startsWith(prefix + '-') || vLang === prefix;
  });

  if (langVoices.length === 0) {
    return null;
  }

  const naturalKeywords = ['natural', 'neural', 'online', 'google', 'premium', 'enhanced', 'wavenet'];
  const maleKeywords = [
    'male', 'homem', 'masculin', 'antonio', 'daniel', 'jorge', 'fabio', 'julio', 'nicolas',
    'guy', 'christopher', 'eric', 'steffan', 'andrew', 'brian', 'david', 'mark', 'ryan',
    'thomas', 'george', 'paul', 'madhur', 'prabhat', 'henri', 'remy', 'alvaro', 'dario',
    'conrad', 'killian', 'diego', 'jorge', 'hamed', 'shakir', 'yunxi', 'kunjun', 'keita', 'dmitry'
  ];

  // Pontua cada voz do idioma para escolher a mais natural, clara e com sotaque nativo autêntico
  let bestVoice = langVoices[0];
  let bestScore = -100;

  for (const v of langVoices) {
    let score = 0;
    const vLang = (v.lang || '').toLowerCase().replace('_', '-');
    const vName = (v.name || '').toLowerCase();

    // Sotaque regional exato (ex: pt-BR vs pt-PT, en-US vs en-GB)
    if (vLang === targetLangLower) score += 35;

    // Prioridade máxima para vozes de Alta Definição Neurais / Naturais (sotaque 100% humano e perceptível)
    if (naturalKeywords.some(kw => vName.includes(kw))) score += 50;

    // Preferência por timbre masculino claro
    if (maleKeywords.some(kw => vName.includes(kw))) score += 20;

    if (!v.localService) score += 10;

    if (score > bestScore) {
      bestScore = score;
      bestVoice = v;
    }
  }

  return bestVoice;
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
  lastSpokenWords = item.fullWords || item.text.trim().split(/\s+/);
  lastSpokenTimestamp = Date.now();

  let ended = false;
  const next = () => {
    if (ended) return;
    ended = true;
    processNextAudioQueue();
  };

  const targetBcp47 = getBcp47(item.lang);
  const nativeVoice = ('speechSynthesis' in window) ? findBestMaleVoice(targetBcp47) : null;

  // Se o dispositivo tiver voz nativa instalada para o idioma alvo, usa a voz nativa;
  // Caso contrário (ex: Hindi, Árabe, Mandarim, Francês sem pacote de voz local no Windows),
  // usa o stream de áudio neural nativo (/api/tts) para NUNCA ler com sotaque estrangeiro!
  if (nativeVoice) {
    speakWithBrowserSpeechSynthesis(item.text, item.lang, nativeVoice, next);
  } else {
    playFallbackAudioElement(item.text, item.lang, next);
  }
}

function playFallbackAudioElement(text, langCode, next) {
  const normLang = getGoogleLangCode(langCode || 'pt');
  let ttsUrl = '';
  if (state.isServerConnected && !state.isFileProtocol) {
    ttsUrl = `/api/tts?text=${encodeURIComponent(text)}&lang=${normLang}`;
  } else {
    ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${normLang}&client=tw-ob`;
  }

  try {
    if (currentAudioElement) {
      currentAudioElement.pause();
      currentAudioElement = null;
    }
    const audio = new Audio(ttsUrl);
    currentAudioElement = audio;
    audio.playbackRate = state.speechRate || 1.0;
    audio.volume = state.speechVolume || 1.0;

    const timer = setTimeout(next, Math.max(8000, text.length * 220));
    audio.onended = () => { clearTimeout(timer); next(); };
    audio.onerror = () => {
      clearTimeout(timer);
      speakWithBrowserSpeechSynthesis(text, langCode, null, next);
    };
    audio.play().catch(() => {
      clearTimeout(timer);
      speakWithBrowserSpeechSynthesis(text, langCode, null, next);
    });
  } catch (e) {
    next();
  }
}

function speakWithBrowserSpeechSynthesis(text, langCode, matchedVoice, onDone) {
  if (!('speechSynthesis' in window)) {
    if (onDone) onDone();
    return;
  }

  try {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const targetBcp47 = getBcp47(langCode);
    utterance.lang = targetBcp47;
    utterance.rate = state.speechRate || 1.0;
    utterance.volume = state.speechVolume || 1.0;
    // Pitch 0.96 preserva a clareza e naturalidade da dicção nativa sem distorção metálica
    utterance.pitch = 0.96;

    const voiceToUse = matchedVoice || findBestMaleVoice(targetBcp47);
    if (voiceToUse) {
      utterance.voice = voiceToUse;
    }

    let finished = false;
    const safetyTimer = setTimeout(() => {
      if (finished) return;
      finished = true;
      if (onDone) onDone();
    }, Math.max(8000, text.length * 240));

    const finish = () => {
      if (finished) return;
      finished = true;
      clearTimeout(safetyTimer);
      if (onDone) onDone();
    };

    utterance.onend = finish;
    utterance.onerror = finish;

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    if (onDone) onDone();
  }
}

function updateAudioPlayingVisual(isPlaying) {
  const badge = document.getElementById('student-source-badge');
  if (badge) {
    if (isPlaying) {
      if (!badge.getAttribute('data-orig-html')) {
        badge.setAttribute('data-orig-html', badge.innerHTML);
      }
      badge.innerHTML = `${UI_ICONS.volume} <span>Reproduzindo tradução em voz alta...</span>`;
      badge.style.color = '#38bdf8';
    } else {
      const orig = badge.getAttribute('data-orig-html');
      if (orig) {
        badge.innerHTML = orig;
        badge.removeAttribute('data-orig-html');
      }
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
  const targetLang = state.studentTargetLang || 'pt';
  const testPhrase = phrases[targetLang] || phrases[targetLang.split('-')[0]] || phrases.pt;
  speakText(testPhrase, targetLang);

  if (showAlert) {
    const t = UI_TRANSLATIONS[state.uiLang] || UI_TRANSLATIONS['pt'];
    alert(t.unlock_audio_title || 'Áudio ativado com sucesso!');
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
  const url = getStudentJoinUrl();
  const fallbackImg = (size) => `<img src="https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&margin=6&data=${encodeURIComponent(url)}" width="${size}" height="${size}" alt="QR Code da Sala" style="display:block;border-radius:8px;" />`;

  const qrBox = document.getElementById('qrcode');
  if (qrBox) {
    qrBox.innerHTML = '';
    try {
      if (typeof QRCode !== 'undefined') {
        new QRCode(qrBox, {
          text: url,
          width: 170,
          height: 170,
          colorDark: '#0f172a',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.L
        });
      } else {
        qrBox.innerHTML = fallbackImg(170);
      }
    } catch (err) {
      console.warn('Usando fallback para QR Code:', err);
      qrBox.innerHTML = fallbackImg(170);
    }
  }

  const qrProjector = document.getElementById('qrcode-projector');
  const projectorUrlText = document.getElementById('projector-url-text');
  if (projectorUrlText) projectorUrlText.textContent = url;

  if (qrProjector) {
    qrProjector.innerHTML = '';
    try {
      if (typeof QRCode !== 'undefined') {
        new QRCode(qrProjector, {
          text: url,
          width: 280,
          height: 280,
          colorDark: '#0f172a',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.L
        });
      } else {
        qrProjector.innerHTML = fallbackImg(280);
      }
    } catch (err) {
      qrProjector.innerHTML = fallbackImg(280);
    }
  }
}

function renderShareLinks() {
  try {
    const shareInput = document.getElementById('share-url-input');
    if (shareInput) {
      shareInput.value = getStudentJoinUrl();
    }
    renderQrCode();
  } catch (err) {
    console.warn('Erro em renderShareLinks:', err);
  }
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

  const timeStr = new Date(data.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const roleBadge = data.senderRole === 'student' ? `${UI_ICONS.user} Pergunta do Aluno` : `${UI_ICONS.mic} Professor`;
  const normCurrent = normalizeSpeechText(data.originalText || '');
  const now = Date.now();
  const targetLang = (data.targetLang || state.studentTargetLang || 'en').toUpperCase();
  const showTrans = data.translatedText && normalizeSpeechText(data.translatedText) !== normCurrent;

  const topItem = feed.firstElementChild;
  if (topItem) {
    const topMsgId = topItem.getAttribute('data-msg-id');
    const topNorm = topItem.getAttribute('data-norm-original') || '';
    const topTime = parseInt(topItem.getAttribute('data-created-ms') || '0', 10);
    const topRole = topItem.getAttribute('data-sender-role') || '';

    if (
      (data.replaceMessageId && topMsgId === data.replaceMessageId) ||
      (topRole === data.senderRole && (now - topTime) < 7000 && topNorm && normCurrent && (normCurrent.startsWith(topNorm) || data.isProgressiveExpansion))
    ) {
      topItem.setAttribute('data-msg-id', data.id || topMsgId);
      topItem.setAttribute('data-norm-original', normCurrent);
      topItem.setAttribute('data-created-ms', String(now));
      const origEl = topItem.querySelector('.feed-translated');
      if (origEl) origEl.textContent = data.originalText;
      const subEl = topItem.querySelector('.feed-original');
      if (subEl && showTrans) {
        subEl.textContent = `Tradução (${targetLang}): "${data.translatedText}"`;
      }
      return;
    }
  }

  const item = document.createElement('div');
  item.className = `feed-item ${data.senderRole === 'student' ? 'student-question' : 'teacher'}`;
  item.setAttribute('data-msg-id', data.id || '');
  item.setAttribute('data-norm-original', normCurrent);
  item.setAttribute('data-created-ms', String(now));
  item.setAttribute('data-sender-role', data.senderRole || 'teacher');

  item.innerHTML = `
    <div class="feed-meta">
      <span class="feed-sender">${roleBadge} (${(data.sourceLang || 'pt').toUpperCase()})</span>
      <span>${timeStr}</span>
    </div>
    <div class="feed-translated">${escapeHtml(data.originalText)}</div>
    ${showTrans ? `<div class="feed-original" style="color: var(--accent); font-style: normal; font-weight: 500; margin-top: 4px;">Tradução (${targetLang}): "${escapeHtml(data.translatedText)}"</div>` : '<div class="feed-original"></div>'}
  `;

  feed.prepend(item);
}

function appendStudentFeed(data) {
  const feed = document.getElementById('student-feed');
  if (!feed) return;

  const origText = data.originalText || data.text || '';
  const normCurrent = normalizeSpeechText(origText);
  const now = Date.now();
  const timeStr = new Date(data.timestamp || now).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const targetLang = data.targetLang || state.studentTargetLang || 'en';

  const topItem = feed.firstElementChild;
  if (topItem) {
    const topMsgId = topItem.getAttribute('data-msg-id');
    const topNorm = topItem.getAttribute('data-norm-original') || '';
    const topTime = parseInt(topItem.getAttribute('data-created-ms') || '0', 10);
    const topRole = topItem.getAttribute('data-sender-role') || '';

    if (
      (data.replaceMessageId && topMsgId === data.replaceMessageId) ||
      (topRole === data.senderRole && (now - topTime) < 7000 && topNorm && normCurrent && (normCurrent.startsWith(topNorm) || data.isProgressiveExpansion))
    ) {
      topItem.setAttribute('data-msg-id', data.id || topMsgId);
      topItem.setAttribute('data-norm-original', normCurrent);
      topItem.setAttribute('data-created-ms', String(now));
      topItem.setAttribute('data-original-text', origText);
      if (data.translations) {
        topItem.setAttribute('data-translations', JSON.stringify(data.translations));
      }
      const textEl = topItem.querySelector('.feed-text');
      if (textEl) textEl.textContent = data.translatedText;
      const origEl = topItem.querySelector('.feed-original');
      if (origEl) origEl.textContent = `Original (${(data.sourceLang || 'pt').toUpperCase()}): "${origText}"`;
      return;
    }
  }

  const item = document.createElement('div');
  item.className = `feed-item ${data.senderRole === 'student' ? 'student-question' : 'teacher'}`;
  item.setAttribute('data-msg-id', data.id || '');
  item.setAttribute('data-norm-original', normCurrent);
  item.setAttribute('data-created-ms', String(now));
  item.setAttribute('data-sender-role', data.senderRole || 'teacher');
  item.setAttribute('data-original-text', origText);
  item.setAttribute('data-source-lang', data.sourceLang || 'pt');
  item.setAttribute('data-target-lang', targetLang);
  item.setAttribute('data-sender-name', data.senderName || 'Professor');
  if (data.translations) {
    item.setAttribute('data-translations', JSON.stringify(data.translations));
  }

  const playBtnHtml = `<button class="btn btn-secondary feed-play-btn" style="padding: 4px 10px; font-size: 0.78rem; margin-top: 6px;" onclick="speakFeedItem(this)">${UI_ICONS.volume} <span>Ouvir</span></button>`;

  item.innerHTML = `
    <div class="feed-meta" data-time="${timeStr}">
      <span class="feed-sender">${escapeHtml(data.senderName || 'Professor')}</span>
      <span>${timeStr} (${targetLang.toUpperCase()})</span>
    </div>
    <div class="feed-translated feed-text">${escapeHtml(data.translatedText)}</div>
    <div class="feed-original">Original (${(data.sourceLang || 'pt').toUpperCase()}): "${escapeHtml(origText)}"</div>
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
        updateRoomStats({
          studentCount: match.studentCount || 0,
          languages: match.languages || {}
        });
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

// ========================================================
// 11. MÓDULO CLIENTE SAAS: LOGIN, HORÁRIOS, PAGAMENTO, BACKUP E ALERTA
// ========================================================
let saasAuthToken = localStorage.getItem('yanik_saas_token') || '';
let saasCurrentUser = null;

function initSaasPlatform() {
  const openBtn = document.getElementById('btn-open-saas-modal');
  const closeBtn = document.getElementById('btn-close-saas-modal');
  const modal = document.getElementById('saas-modal');

  if (openBtn && modal) {
    openBtn.addEventListener('click', () => {
      modal.classList.add('active');
      refreshSaasSession();
      loadSaasOpsStatus();
    });
  }
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }

  document.querySelectorAll('.saas-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-saas-tab');
      switchSaasSubTab(target);
    });
  });

  const btnLogin = document.getElementById('btn-saas-login');
  if (btnLogin) btnLogin.addEventListener('click', handleSaasLogin);

  const btnReg = document.getElementById('btn-saas-register');
  if (btnReg) btnReg.addEventListener('click', handleSaasRegister);

  const btnForgot = document.getElementById('btn-saas-forgot-pass');
  if (btnForgot) btnForgot.addEventListener('click', handleSaasForgotPassword);

  const btnLogout = document.getElementById('btn-saas-logout');
  if (btnLogout) btnLogout.addEventListener('click', handleSaasLogout);

  const btnGotoSch = document.getElementById('btn-saas-goto-schedules');
  if (btnGotoSch) btnGotoSch.addEventListener('click', () => switchSaasSubTab('schedules'));

  const btnSaveSch = document.getElementById('btn-sch-save');
  if (btnSaveSch) btnSaveSch.addEventListener('click', handleSaveSchedule);

  const btnSub = document.getElementById('btn-saas-subscribe');
  if (btnSub) btnSub.addEventListener('click', handleSaasSubscribe);

  const btnWh = document.getElementById('btn-saas-test-webhook');
  if (btnWh) btnWh.addEventListener('click', handleSaasTestWebhook);

  const btnBackupNow = document.getElementById('btn-ops-backup-now');
  if (btnBackupNow) btnBackupNow.addEventListener('click', handleTriggerBackupNow);

  const btnTestAlert = document.getElementById('btn-ops-test-alert');
  if (btnTestAlert) btnTestAlert.addEventListener('click', handleTriggerMobileAlert);

  if (saasAuthToken) {
    refreshSaasSession();
  }
}

function switchSaasSubTab(tabName) {
  document.querySelectorAll('.saas-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-saas-tab') === tabName);
  });
  ['auth', 'schedules', 'billing', 'ops'].forEach(id => {
    const el = document.getElementById('saas-panel-' + id);
    if (el) el.style.display = id === tabName ? 'block' : 'none';
  });
  if (tabName === 'schedules') loadUserSchedules();
  if (tabName === 'billing') loadBillingStatus();
  if (tabName === 'ops') loadSaasOpsStatus();
}

async function refreshSaasSession() {
  if (!saasAuthToken) {
    updateSaasAuthUi(null);
    return;
  }
  try {
    const res = await fetch('/api/auth/me', {
      headers: { 'Authorization': 'Bearer ' + saasAuthToken }
    });
    if (res.ok) {
      const data = await res.json();
      saasCurrentUser = data.user;
      updateSaasAuthUi(saasCurrentUser);
      loadUserSchedules();
      loadBillingStatus();
    } else {
      saasAuthToken = '';
      localStorage.removeItem('yanik_saas_token');
      updateSaasAuthUi(null);
    }
  } catch (e) {}
}

function updateSaasAuthUi(user) {
  const badge = document.getElementById('saas-user-badge');
  const navLabel = document.getElementById('nav-saas-btn-label');
  const loggedOutBox = document.getElementById('saas-auth-logged-out');
  const loggedInBox = document.getElementById('saas-auth-logged-in');

  if (user) {
    if (badge) {
      badge.textContent = `${user.name} (${user.plan === 'pro' ? 'PRO ATIVO' : ' Conta Gratuita'})`;
      badge.style.color = '#10b981';
    }
    if (navLabel) navLabel.textContent = user.name.split(' ')[0];
    if (loggedOutBox) loggedOutBox.style.display = 'none';
    if (loggedInBox) loggedInBox.style.display = 'block';

    const pName = document.getElementById('saas-profile-name');
    const pEmail = document.getElementById('saas-profile-email');
    const pPlan = document.getElementById('saas-profile-plan');
    if (pName) pName.textContent = user.name;
    if (pEmail) pEmail.textContent = user.email;
    if (pPlan) {
      pPlan.textContent = user.plan === 'pro'
        ? `Assinatura Mensal PRO Ativa • Próxima cobrança: ${user.nextBillingDate ? new Date(user.nextBillingDate).toLocaleDateString() : 'Automática'}`
        : 'Plano: Gratuito (Assine na aba 3 para ativar cobrança recorrente)';
    }
  } else {
    if (badge) {
      badge.textContent = 'Visitante (Não autenticado)';
      badge.style.color = '';
    }
    if (navLabel) navLabel.textContent = 'Horários & Conta';
    if (loggedOutBox) loggedOutBox.style.display = 'grid';
    if (loggedInBox) loggedInBox.style.display = 'none';
  }
}

async function handleSaasLogin() {
  const email = (document.getElementById('saas-login-email')?.value || '').trim();
  const password = document.getElementById('saas-login-password')?.value || '';
  if (!email || !password) {
    showToast('Informe seu e-mail e senha.', 'warning');
    return;
  }
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) {
      showToast(data.error || 'Falha no login.', 'warning');
      return;
    }
    saasAuthToken = data.token;
    saasCurrentUser = data.user;
    localStorage.setItem('yanik_saas_token', saasAuthToken);
    updateSaasAuthUi(saasCurrentUser);
    showToast('Login realizado com sucesso!', 'success');
    switchSaasSubTab('schedules');
  } catch (e) {
    showToast('Erro de conexão com o servidor.', 'warning');
  }
}

async function handleSaasRegister() {
  const name = (document.getElementById('saas-reg-name')?.value || '').trim();
  const email = (document.getElementById('saas-reg-email')?.value || '').trim();
  const password = document.getElementById('saas-reg-password')?.value || '';
  const mobilePhone = (document.getElementById('saas-reg-phone')?.value || '').trim();

  if (!name || !email || !password) {
    showToast('Preencha nome, e-mail e senha para cadastrar.', 'warning');
    return;
  }
  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, mobilePhone })
    });
    const data = await res.json();
    if (!res.ok) {
      showToast(data.error || 'Erro ao criar conta.', 'warning');
      return;
    }
    saasAuthToken = data.token;
    saasCurrentUser = data.user;
    localStorage.setItem('yanik_saas_token', saasAuthToken);
    updateSaasAuthUi(saasCurrentUser);
    showToast('Conta criada e isolada no banco com sucesso!', 'success');
    switchSaasSubTab('schedules');
  } catch (e) {
    showToast('Erro ao conectar ao servidor.', 'warning');
  }
}

async function handleSaasForgotPassword() {
  const email = (document.getElementById('saas-login-email')?.value || '').trim();
  if (!email) {
    showToast('Digite seu e-mail no campo de login para recuperar a senha.', 'warning');
    return;
  }
  try {
    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (!res.ok) {
      showToast(data.error || 'E-mail não encontrado.', 'warning');
      return;
    }
    showToast(data.message || 'E-mail de recuperação enviado!', 'info');
    if (data.previewEmail && data.previewEmail.bodyText) {
      alert(`E-mail enviado para ${email}:\n\n${data.previewEmail.bodyText}`);
    }
  } catch (e) {
    showToast('Erro ao solicitar recuperação de senha.', 'warning');
  }
}

function handleSaasLogout() {
  saasAuthToken = '';
  saasCurrentUser = null;
  localStorage.removeItem('yanik_saas_token');
  updateSaasAuthUi(null);
  showToast('Sessão encerrada.', 'info');
}

async function loadUserSchedules() {
  const listEl = document.getElementById('saas-schedules-list');
  if (!listEl) return;
  if (!saasAuthToken) {
    listEl.innerHTML = '<p style="font-size: 0.84rem; color: var(--text-muted); text-align: center; padding: 20px;">Faça login na aba 1 para ver e salvar seus horários exclusivos no banco.</p>';
    return;
  }
  try {
    const res = await fetch('/api/schedules', {
      headers: { 'Authorization': 'Bearer ' + saasAuthToken }
    });
    if (!res.ok) return;
    const data = await res.json();
    const schedules = data.schedules || [];
    if (schedules.length === 0) {
      listEl.innerHTML = '<p style="font-size: 0.84rem; color: var(--text-muted); text-align: center; padding: 20px;">Nenhum horário cadastrado na sua conta ainda. Adicione um horário acima!</p>';
      return;
    }
    listEl.innerHTML = schedules.map(s => `
      <div style="display: flex; justify-content: space-between; align-items: center; gap: 10px; padding: 10px 14px; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-sm);">
        <div>
          <strong style="font-size: 0.9rem; color: var(--text-primary);">${escapeHtml(s.title)}</strong>
          <div style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 2px;">
            <span>${escapeHtml(s.dayOfWeek)} • ${escapeHtml(s.startTime)} às ${escapeHtml(s.endTime)}</span>
            <span> • Sala: <strong class="code-pill">${escapeHtml(s.roomCode)}</strong></span>
          </div>
        </div>
        <div style="display: flex; gap: 6px;">
          <button type="button" class="btn-action btn-primary" style="font-size: 0.75rem; padding: 5px 10px;" onclick="openScheduleRoom('${escapeQuotes(s.roomCode)}')">Abrir Sala</button>
          <button type="button" class="btn-action btn-secondary" style="font-size: 0.75rem; padding: 5px 10px;" onclick="deleteUserSchedule('${escapeQuotes(s.id)}')">Excluir</button>
        </div>
      </div>
    `).join('');
  } catch (e) {}
}

async function handleSaveSchedule() {
  if (!saasAuthToken) {
    showToast('Faça login primeiro na aba 1 para salvar seus horários.', 'warning');
    switchSaasSubTab('auth');
    return;
  }
  const title = (document.getElementById('sch-title')?.value || '').trim();
  const dayOfWeek = document.getElementById('sch-day')?.value || 'Segunda-feira';
  const startTime = document.getElementById('sch-start')?.value || '08:00';
  const endTime = document.getElementById('sch-end')?.value || '09:00';
  const roomCode = (document.getElementById('sch-room')?.value || '').trim().toUpperCase();

  if (!title) {
    showToast('Informe o nome da turma ou horário.', 'warning');
    return;
  }

  try {
    const res = await fetch('/api/schedules', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + saasAuthToken
      },
      body: JSON.stringify({
        title,
        dayOfWeek,
        startTime,
        endTime,
        roomCode,
        language: state.teacherLang || 'pt'
      })
    });
    const data = await res.json();
    if (!res.ok) {
      showToast(data.error || 'Erro ao salvar horário.', 'warning');
      return;
    }
    const titleInput = document.getElementById('sch-title');
    if (titleInput) titleInput.value = '';
    showToast('Horário salvo no banco com sucesso!', 'success');
    loadUserSchedules();
    fetchAvailableRooms();
  } catch (e) {
    showToast('Erro de rede ao salvar horário.', 'warning');
  }
}

async function deleteUserSchedule(id) {
  if (!saasAuthToken || !id) return;
  try {
    const res = await fetch('/api/schedules/' + encodeURIComponent(id), {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + saasAuthToken }
    });
    if (res.ok) {
      showToast('Horário removido.', 'info');
      loadUserSchedules();
    }
  } catch (e) {}
}

function openScheduleRoom(roomCode) {
  if (!roomCode) return;
  joinRoom(roomCode);
  const modal = document.getElementById('saas-modal');
  if (modal) modal.classList.remove('active');
  showToast('Conectado à sala do seu horário: ' + roomCode, 'success');
}

async function handleSaasSubscribe() {
  if (!saasAuthToken) {
    showToast('Faça login na aba 1 antes de ativar a assinatura.', 'warning');
    switchSaasSubTab('auth');
    return;
  }
  try {
    const res = await fetch('/api/billing/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + saasAuthToken
      }
    });
    const data = await res.json();
    if (!res.ok) {
      showToast(data.error || 'Falha ao processar assinatura.', 'warning');
      return;
    }
    saasCurrentUser = data.user;
    updateSaasAuthUi(saasCurrentUser);
    loadBillingStatus();
    showToast('Assinatura Mensal Pro ativada e recibo enviado por e-mail!', 'success');
  } catch (e) {
    showToast('Erro ao processar assinatura.', 'warning');
  }
}

async function handleSaasTestWebhook() {
  const email = saasCurrentUser ? saasCurrentUser.email : '';
  try {
    const res = await fetch('/api/webhooks/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'invoice.paid',
        email
      })
    });
    if (res.ok) {
      showToast('Webhook de pagamento recebido e processado com sucesso!', 'success');
      loadBillingStatus();
      loadSaasOpsStatus();
    }
  } catch (e) {}
}

async function loadBillingStatus() {
  const statusLine = document.getElementById('saas-billing-status-line');
  const logsBox = document.getElementById('saas-billing-logs');
  if (!saasAuthToken) {
    if (statusLine) statusLine.textContent = 'Faça login para gerenciar sua assinatura mensal.';
    return;
  }
  try {
    const res = await fetch('/api/billing/status', {
      headers: { 'Authorization': 'Bearer ' + saasAuthToken }
    });
    if (!res.ok) return;
    const data = await res.json();
    if (statusLine) {
      statusLine.textContent = data.plan === 'pro'
        ? `Status: ATIVA (Cobrança automática todo mês • Próxima: ${data.nextBillingDate ? new Date(data.nextBillingDate).toLocaleDateString() : 'Em 30 dias'})`
        : 'Status: Plano Gratuito (Sem cobrança ativa)';
    }
    if (logsBox) {
      const payItems = (data.payments || []).map(p => `<div><strong>[PAGAMENTO ${p.status.toUpperCase()}]</strong> R$ ${(p.amountCents / 100).toFixed(2)} (${p.type}) — ${new Date(p.createdAt).toLocaleString()}</div>`);
      const emailItems = (data.emails || []).map(e => `<div style="margin-top:4px; color: var(--text-secondary);"><strong>[E-MAIL ENVIADO]</strong> ${escapeHtml(e.subject)} — ${escapeHtml(e.bodyText)}</div>`);
      const combined = [...payItems, ...emailItems];
      logsBox.innerHTML = combined.length > 0 ? combined.join('<hr style="border:0;border-top:1px solid var(--border);margin:6px 0;">') : 'Nenhuma cobrança ou e-mail registrado ainda.';
    }
  } catch (e) {}
}

async function loadSaasOpsStatus() {
  const vaultInfo = document.getElementById('ops-vault-info');
  const logsBox = document.getElementById('saas-ops-logs');
  try {
    const res = await fetch('/api/ops/status');
    if (!res.ok) return;
    const data = await res.json();
    if (vaultInfo && data.vaultStatus) {
      vaultInfo.textContent = `Chave no Cofre: ${data.vaultStatus.paymentKeyMasked} • Exposta no código: NÃO`;
    }
    if (logsBox) {
      const bkpHtml = (data.backups || []).map(b => `<div><strong>[BACKUP BANCO]</strong> ${escapeHtml(b.filename)} (${b.sizeBytes} bytes) — ${new Date(b.createdAt).toLocaleString()}</div>`);
      const alertHtml = (data.alerts || []).map(a => `<div style="color: #f59e0b;"><strong>[ALERTA CELULAR]</strong> ${escapeHtml(a.message)} — ${new Date(a.sentAt).toLocaleString()}</div>`);
      const all = [...alertHtml, ...bkpHtml];
      logsBox.innerHTML = all.length > 0 ? all.join('<hr style="border:0;border-top:1px solid var(--border);margin:6px 0;">') : 'Nenhum registro ainda.';
    }
  } catch (e) {}
}

async function handleTriggerBackupNow() {
  try {
    const res = await fetch('/api/ops/backup', { method: 'POST' });
    if (res.ok) {
      showToast('Backup completo do banco salvo com sucesso!', 'success');
      loadSaasOpsStatus();
    }
  } catch (e) {}
}

async function handleTriggerMobileAlert() {
  try {
    const res = await fetch('/api/ops/test-alert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: saasCurrentUser ? saasCurrentUser.mobilePhone : '' })
    });
    if (res.ok) {
      showToast('Alerta de monitoramento enviado para o celular!', 'success');
      loadSaasOpsStatus();
    }
  } catch (e) {}
}
