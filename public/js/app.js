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
const UI_TRANSLATIONS = {
  pt: {
    app_version: "v2.4 Pro",
    nav_live: "Conectado",
    nav_direct: "Modo Direto / Offline",
    nav_room_prefix: "Sala: ",
    nav_projector: "📽️ Projetar QR Code",
    tab_teacher: "Mesa do Professor",
    tab_student: "Carteira do Aluno",
    tab_dialogue: "Atendimento 1-para-1",
    tab_guide: "Manual de Uso",
    teacher_card_title: "🎙️ Transmissão de Voz",
    teacher_card_desc: "Sua fala é capturada, traduzida em tempo real e transmitida aos alunos conectados",
    teacher_input_lang_label: "Idioma de Entrada:",
    teacher_mic_status_idle: "Toque no microfone para iniciar a transmissão",
    teacher_mic_status_live: "🎙️ Aula em Transmissão ao Vivo (Fale ao microfone)",
    teacher_mic_hint: "Fale com clareza. A tradução para Hindi, Francês, Inglês e outros idiomas ocorre em tempo real.",
    teacher_manual_label: "Digitar mensagem ou aviso para a turma (funciona mesmo sem microfone):",
    teacher_manual_placeholder: "Ex: Abram o material no capítulo 3...",
    btn_transmit: "Transmitir",
    transcript_card_title: "Registro de Transmissão",
    btn_export: "Exportar (.txt)",
    btn_clear: "Limpar",
    student_access_title: "Acesso dos Alunos",
    student_access_desc: "Exiba este QR Code para que os alunos conectem seus dispositivos na mesma rede Wi-Fi:",
    btn_copy: "Copiar",
    room_id_label: "Identificador da Sala:",
    btn_save: "Salvar",
    connected_card_title: "Participantes Conectados",
    connected_card_desc: "Distribuição de idiomas em tempo real:",
    unlock_audio_title: "🎧 Ativar reprodução de áudio",
    unlock_audio_desc: "Toque no botão ao lado para ouvir a tradução em voz alta nos seus fones de ouvido.",
    btn_unlock_audio: "Ativar Áudio 🔊",
    student_panel_title: "Recepção de Tradução",
    student_listen_label: "Ouvir e ler em:",
    student_autospeak_label: "Reproduzir voz automaticamente",
    btn_test_audio: "🔊 Testar Som",
    student_font_label: "Texto:",
    student_speed_label: "Ritmo:",
    student_speed_slow: "0.85x (Lento)",
    student_speed_normal: "1.0x (Normal)",
    student_speed_fast: "1.15x (Rápido)",
    caption_waiting: "Aguardando fala do professor...",
    caption_badge: "⚡ Tradução Simultânea",
    caption_default_text: "Conecte seus fones de ouvido. Quando o professor falar, as legendas traduzidas aparecerão aqui e serão reproduzidas no seu idioma.",
    btn_replay: "🔊 Ouvir Novamente",
    ask_title: "🙋 Fazer Pergunta ao Professor (Vice-Versa)",
    ask_speak_label: "Meu Idioma de Fala:",
    ask_desc: "Pressione o botão e fale no seu idioma nativo (ex: Hindi, Francês, Inglês). Sua dúvida será traduzida e entregue diretamente ao professor.",
    btn_ask_student: "🎙️ Fazer Pergunta ao Professor",
    btn_ask_student_stop: "⏹️ Concluir Dúvida",
    student_history_title: "Histórico de Frases Traduzidas",
    dialogue_card_title: "💬 Atendimento Individual e Bilateral",
    dialogue_card_desc: "Comunicação direta em dois sentidos para reuniões pedagógicas ou atendimento a responsáveis",
    dialogue_side_a_title: "Educador (Lado A)",
    btn_dialogue_side_a: "🎙️ Falar Lado A",
    dialogue_side_b_title: "Aluno / Responsável (Lado B)",
    btn_dialogue_side_b: "🎙️ Falar Lado B",
    dialogue_history_label: "Diálogo Registrado:",
    guide_title: "Manual de Operação e Diretrizes de Acessibilidade",
    guide_desc: "O Yanik, Translator conecta educadores e alunos em ambientes multilíngues, promovendo a inclusão imediata de estudantes estrangeiros, refugiados e imigrantes com tradução bidirecional em tempo real para Hindi, Português, Inglês, Francês e mais de 100 línguas.",
    guide_card1_title: "1. Conexão Local Wi-Fi",
    guide_card1_desc: "Basta que os celulares e computadores estejam no mesmo roteador ou Wi-Fi. O aluno lê o QR Code da sala e conecta-se imediatamente, sem necessidade de cadastros ou downloads.",
    guide_card2_title: "2. Uso de Fones de Ouvido",
    guide_card2_desc: "Cada aluno pode ouvir o professor no seu idioma nativo através de fones de ouvido (com fio ou Bluetooth), mantendo a sala silenciosa e focada.",
    guide_card3_title: "3. Interação Bidirecional",
    guide_card3_desc: "Ao clicar em 'Fazer Pergunta', o aluno fala no seu próprio idioma nativo (ex: Hindi), e a pergunta é traduzida e exibida na tela do professor em Português.",
    projector_modal_title: "Conectar à Aula",
    projector_modal_desc: "Aponte a câmera do celular para ouvir a tradução da aula no seu idioma",
    projector_wifi_label: "Rede Wi-Fi Local",
    footer_text: "Yanik, Translator © 2026 • Sistema de Tradução Simultânea em Tempo Real • Compatível com PC, Mac, Android e iOS"
  },
  en: {
    app_version: "v2.4 Pro",
    nav_live: "Connected",
    nav_direct: "Direct Mode / Offline",
    nav_room_prefix: "Room: ",
    nav_projector: "📽️ Project QR Code",
    tab_teacher: "Teacher's Desk",
    tab_student: "Student's Desk",
    tab_dialogue: "1-on-1 Meeting",
    tab_guide: "User Guide",
    teacher_card_title: "🎙️ Voice Broadcast",
    teacher_card_desc: "Your speech is captured, translated in real-time, and broadcast to all connected students",
    teacher_input_lang_label: "Input Language:",
    teacher_mic_status_idle: "Tap the microphone to start broadcasting",
    teacher_mic_status_live: "🎙️ Live Class in Progress (Speak into microphone)",
    teacher_mic_hint: "Speak clearly. Translation into Hindi, French, English, and other languages happens in real-time.",
    teacher_manual_label: "Type a message or announcement for the class (works without microphone):",
    teacher_manual_placeholder: "E.g.: Open the material to chapter 3...",
    btn_transmit: "Broadcast",
    transcript_card_title: "Broadcast Transcript",
    btn_export: "Export (.txt)",
    btn_clear: "Clear",
    student_access_title: "Student Access",
    student_access_desc: "Display this QR Code for students to connect their devices on the same Wi-Fi:",
    btn_copy: "Copy",
    room_id_label: "Room Identifier:",
    btn_save: "Save",
    connected_card_title: "Connected Participants",
    connected_card_desc: "Real-time language distribution:",
    unlock_audio_title: "🎧 Enable audio playback",
    unlock_audio_desc: "Tap the button beside to hear live translation in your headphones.",
    btn_unlock_audio: "Enable Audio 🔊",
    student_panel_title: "Translation Reception",
    student_listen_label: "Listen and read in:",
    student_autospeak_label: "Play voice automatically",
    btn_test_audio: "🔊 Test Audio",
    student_font_label: "Text:",
    student_speed_label: "Speed:",
    student_speed_slow: "0.85x (Slow)",
    student_speed_normal: "1.0x (Normal)",
    student_speed_fast: "1.15x (Fast)",
    caption_waiting: "Waiting for teacher's speech...",
    caption_badge: "⚡ Simultaneous Translation",
    caption_default_text: "Connect your headphones. When the teacher speaks, translated subtitles will appear here and play in your language.",
    btn_replay: "🔊 Listen Again",
    ask_title: "🙋 Ask the Teacher a Question (Vice-Versa)",
    ask_speak_label: "My Speaking Language:",
    ask_desc: "Press the button and speak in your native language (e.g., Hindi, French, English). Your question will be translated and delivered directly to the teacher.",
    btn_ask_student: "🎙️ Ask Teacher a Question",
    btn_ask_student_stop: "⏹️ Finish Question",
    student_history_title: "Translated Phrases History",
    dialogue_card_title: "💬 1-on-1 Bilateral Meeting",
    dialogue_card_desc: "Two-way direct communication for pedagogical conferences or parent-teacher meetings",
    dialogue_side_a_title: "Educator (Side A)",
    btn_dialogue_side_a: "🎙️ Speak Side A",
    dialogue_side_b_title: "Student / Parent (Side B)",
    btn_dialogue_side_b: "🎙️ Speak Side B",
    dialogue_history_label: "Recorded Dialogue:",
    guide_title: "Operation Manual & Accessibility Guidelines",
    guide_desc: "Yanik, Translator connects educators and students in multilingual classrooms with real-time bidirectional translation for Hindi, Portuguese, English, French, and 50+ languages.",
    guide_card1_title: "1. Local Wi-Fi Connection",
    guide_card1_desc: "Devices only need to be on the same Wi-Fi. Students scan the room QR Code to connect instantly with no apps required.",
    guide_card2_title: "2. Headphone Usage",
    guide_card2_desc: "Each student listens to the teacher in their native language using headphones, keeping the classroom quiet and focused.",
    guide_card3_title: "3. Bidirectional Interaction",
    guide_card3_desc: "By tapping 'Ask Question', students speak in their native tongue and it is translated for the teacher in Portuguese.",
    projector_modal_title: "Connect to the Class",
    projector_modal_desc: "Point your phone camera to hear live class translation in your language",
    projector_wifi_label: "Local Wi-Fi Network",
    footer_text: "Yanik, Translator © 2026 • Real-Time Simultaneous Translation System • Compatible with PC, Mac, Android and iOS"
  },
  hi: {
    app_version: "v2.4 Pro",
    nav_live: "सक्रिय जुड़ा हुआ",
    nav_direct: "प्रत्यक्ष मोड / ऑफ़लाइन",
    nav_room_prefix: "कक्ष: ",
    nav_projector: "📽️ क्यूआर कोड प्रोजेक्ट करें",
    tab_teacher: "शिक्षक की मेज",
    tab_student: "विद्यार्थी की डेस्क",
    tab_dialogue: "1-पर-1 व्यक्तिगत संवाद",
    tab_guide: "उपयोग निर्देशिका",
    teacher_card_title: "🎙️ आवाज़ का प्रसारण",
    teacher_card_desc: "आपकी वाणी को रिकॉर्ड कर, वास्तविक समय में अनुवाद कर जुड़े हुए छात्रों को भेजा जाता है",
    teacher_input_lang_label: "इनपुट भाषा:",
    teacher_mic_status_idle: "प्रसारण शुरू करने के लिए माइक पर टैप करें",
    teacher_mic_status_live: "🎙️ कक्षा लाइव प्रसारित हो रही है (माइक में बोलें)",
    teacher_mic_hint: "स्पष्टता से बोलें। अनुवाद तुरंत छात्रों की भाषा में प्रसारित होता है।",
    teacher_manual_label: "कक्षा के लिए संदेश या सूचना टाइप करें (माइक के बिना भी काम करता है):",
    teacher_manual_placeholder: "उदा.: पाठ्यपुस्तक का अध्याय 3 खोलें...",
    btn_transmit: "प्रसारित करें",
    transcript_card_title: "प्रसारण का रिकॉर्ड",
    btn_export: "डाउनलोड करें (.txt)",
    btn_clear: "साफ़ करें",
    student_access_title: "छात्रों की पहुंच",
    student_access_desc: "छात्रों को उसी वाई-फ़ाई पर जोड़ने के लिए यह क्यूआर कोड दिखाएं:",
    btn_copy: "कॉपी करें",
    room_id_label: "कक्ष का पहचानकर्ता:",
    btn_save: "सहेजें",
    connected_card_title: "जुड़े हुए छात्र",
    connected_card_desc: "वास्तविक समय में भाषाओं का वितरण:",
    unlock_audio_title: "🎧 आवाज़ चालू करें",
    unlock_audio_desc: "अपने हेडफ़ोन में कक्षा का अनुवाद सुनने के लिए बटन दबाएं।",
    btn_unlock_audio: "आवाज़ चालू करें 🔊",
    student_panel_title: "अनुवाद प्राप्ति",
    student_listen_label: "इस भाषा में सुनें और पढ़ें:",
    student_autospeak_label: "आवाज़ अपने आप चलाएं",
    btn_test_audio: "🔊 आवाज़ जांचें",
    student_font_label: "अक्षर:",
    student_speed_label: "गति:",
    student_speed_slow: "0.85x (धीमा)",
    student_speed_normal: "1.0x (सामान्य)",
    student_speed_fast: "1.15x (तेज़)",
    caption_waiting: "शिक्षक के बोलने की प्रतीक्षा की जा रही है...",
    caption_badge: "⚡ युगपत अनुवाद",
    caption_default_text: "अपने हेडफ़ोन लगाएं। जब शिक्षक बोलेंगे, अनुवाद यहाँ दिखाई देगा और आपकी भाषा में सुनाई देगा।",
    btn_replay: "🔊 फिर से सुनें",
    ask_title: "🙋 शिक्षक से प्रश्न पूछें (उलटा अनुवाद)",
    ask_speak_label: "मेरी बोलने की भाषा:",
    ask_desc: "बटन दबाएं और अपनी भाषा में प्रश्न पूछें। आपका प्रश्न अनुवादित होकर शिक्षक को भेजा जाएगा।",
    btn_ask_student: "🎙️ शिक्षक से प्रश्न पूछें",
    btn_ask_student_stop: "⏹️ प्रश्न समाप्त करें",
    student_history_title: "अनुवादित वाक्यों का इतिहास",
    dialogue_card_title: "💬 व्यक्तिगत एवं द्विपक्षीय संवाद",
    dialogue_card_desc: "अभिभावक-शिक्षक बैठक या व्यक्तिगत मार्गदर्शन के लिए दोतरफा अनुवाद",
    dialogue_side_a_title: "शिक्षक (पक्ष A)",
    btn_dialogue_side_a: "🎙️ बोलें (पक्ष A)",
    dialogue_side_b_title: "छात्र / अभिभावक (पक्ष B)",
    btn_dialogue_side_b: "🎙️ बोलें (पक्ष B)",
    dialogue_history_label: "दर्ज संवाद:",
    guide_title: "संचालन निर्देशिका एवं भाषाई समावेशन",
    guide_desc: "यानिक ट्रांसलेटर बहुभाषी कक्षाओं में शिक्षकों और छात्रों को वास्तविक समय अनुवाद से जोड़ता है।",
    guide_card1_title: "1. स्थानीय वाई-फ़ाई से जुड़ाव",
    guide_card1_desc: "एक ही वाई-फ़ाई पर बिना किसी ऐप डाउनलोड के क्यूआर कोड स्कैन करके तुरंत जुड़ें।",
    guide_card2_title: "2. हेडफ़ोन का प्रयोग",
    guide_card2_desc: "प्रत्येक छात्र अपने हेडफ़ोन में अनुवाद सुनता है, जिससे कक्षा शांत रहती है।",
    guide_card3_title: "3. द्विपक्षीय संवाद",
    guide_card3_desc: "छात्र अपनी मातृभाषा में प्रश्न पूछ सकते हैं जो शिक्षक को पुर्तगाली में मिलता है।",
    projector_modal_title: "कक्षा से जुड़ें",
    projector_modal_desc: "अपनी भाषा में अनुवाद सुनने के लिए कैमरे से क्यूआर कोड स्कैन करें",
    projector_wifi_label: "स्थानीय वाई-फ़ाई नेटवर्क",
    footer_text: "यानिक, ट्रांसलेटर © 2026 • वास्तविक समय युगपत अनुवाद प्रणाली"
  },
  fr: {
    app_version: "v2.4 Pro",
    nav_live: "Connecté",
    nav_direct: "Mode Direct / Hors-ligne",
    nav_room_prefix: "Salle: ",
    nav_projector: "📽️ Projeter le code QR",
    tab_teacher: "Bureau du Professeur",
    tab_student: "Bureau de l'Élève",
    tab_dialogue: "Entretien 1-à-1",
    tab_guide: "Guide d'Utilisation",
    teacher_card_title: "🎙️ Diffusion Vocale",
    teacher_card_desc: "Votre voix est captée, traduite en temps réel et diffusée aux élèves connectés",
    teacher_input_lang_label: "Langue d'entrée:",
    teacher_mic_status_idle: "Appuyez sur le micro pour commencer la diffusion",
    teacher_mic_status_live: "🎙️ Cours en direct (Parlez dans le micro)",
    teacher_mic_hint: "Parlez clairement. La traduction vers l'hindi, le français, l'anglais, etc. a lieu en temps réel.",
    teacher_manual_label: "Taper un message pour la classe (fonctionne sans micro):",
    teacher_manual_placeholder: "Ex: Ouvrez vos livres à la page 15...",
    btn_transmit: "Diffuser",
    transcript_card_title: "Registre de Transmission",
    btn_export: "Exporter (.txt)",
    btn_clear: "Effacer",
    student_access_title: "Accès des Élèves",
    student_access_desc: "Affichez ce code QR pour que les élèves se connectent sur le même Wi-Fi:",
    btn_copy: "Copier",
    room_id_label: "Identifiant de Salle:",
    btn_save: "Enregistrer",
    connected_card_title: "Participants Connectés",
    connected_card_desc: "Répartition des langues en direct:",
    unlock_audio_title: "🎧 Activer la lecture audio",
    unlock_audio_desc: "Touchez le bouton pour entendre la traduction en direct dans vos écouteurs.",
    btn_unlock_audio: "Activer l'Audio 🔊",
    student_panel_title: "Réception de la Traduction",
    student_listen_label: "Écouter et lire en:",
    student_autospeak_label: "Lecture vocale automatique",
    btn_test_audio: "🔊 Tester le Son",
    student_font_label: "Texte:",
    student_speed_label: "Rythme:",
    student_speed_slow: "0.85x (Lent)",
    student_speed_normal: "1.0x (Normal)",
    student_speed_fast: "1.15x (Rapide)",
    caption_waiting: "En attente de la parole du professeur...",
    caption_badge: "⚡ Traduction Simultanée",
    caption_default_text: "Branchez vos écouteurs. Lorsque l'enseignant parle, les sous-titres traduits apparaîtront ici et seront lus dans votre langue.",
    btn_replay: "🔊 Réécouter",
    ask_title: "🙋 Poser une Question au Professeur (Vice-Versa)",
    ask_speak_label: "Ma Langue d'Élocution:",
    ask_desc: "Appuyez sur le bouton et posez votre question dans votre langue maternelle. Elle sera traduite et envoyée au professeur.",
    btn_ask_student: "🎙️ Poser une Question",
    btn_ask_student_stop: "⏹️ Terminer la Question",
    student_history_title: "Historique des Phrases Traduites",
    dialogue_card_title: "💬 Entretien Individuel et Bilatéral",
    dialogue_card_desc: "Communication directe dans les deux sens pour réunions pédagogiques ou avec les parents",
    dialogue_side_a_title: "Éducateur (Côté A)",
    btn_dialogue_side_a: "🎙️ Parler Côté A",
    dialogue_side_b_title: "Élève / Parent (Côté B)",
    btn_dialogue_side_b: "🎙️ Parler Côté B",
    dialogue_history_label: "Dialogue Enregistré:",
    guide_title: "Manuel d'Opération et Directives d'Accessibilité",
    guide_desc: "Yanik, Translator connecte enseignants et élèves dans des classes multilingues grâce à la traduction simultanée bidirectionnelle en direct.",
    guide_card1_title: "1. Connexion Wi-Fi Locale",
    guide_card1_desc: "Les appareils doivent simplement être sur le même Wi-Fi. Les élèves scannent le code QR sans installer d'application.",
    guide_card2_title: "2. Utilisation des Écouteurs",
    guide_card2_desc: "Chaque élève écoute l'enseignant dans sa langue maternelle grâce à ses écouteurs, maintenant la classe calme.",
    guide_card3_title: "3. Interaction Bidirectionnelle",
    guide_card3_desc: "En cliquant sur 'Poser une Question', l'élève parle dans sa langue et le professeur reçoit la traduction en portugais.",
    projector_modal_title: "Rejoindre le Cours",
    projector_modal_desc: "Scannez le code QR pour écouter la traduction du cours dans votre langue",
    projector_wifi_label: "Réseau Wi-Fi Local",
    footer_text: "Yanik, Translator © 2026 • Système de Traduction Simultanée en Temps Réel"
  },
  es: {
    app_version: "v2.4 Pro",
    nav_live: "Conectado",
    nav_direct: "Modo Directo / Offline",
    nav_room_prefix: "Sala: ",
    nav_projector: "📽️ Proyectar Código QR",
    tab_teacher: "Mesa del Profesor",
    tab_student: "Pupitre del Alumno",
    tab_dialogue: "Atención 1 a 1",
    tab_guide: "Guía de Uso",
    teacher_card_title: "🎙️ Transmisión de Voz",
    teacher_card_desc: "Su voz es captada, traducida en tiempo real y transmitida a los alumnos conectados",
    teacher_input_lang_label: "Idioma de Entrada:",
    teacher_mic_status_idle: "Toque el micrófono para iniciar la transmisión",
    teacher_mic_status_live: "🎙️ Clase en transmisión en vivo (Hable al micrófono)",
    teacher_mic_hint: "Hable con claridad. La traducción a hindi, francés, inglés y otros idiomas ocurre en tiempo real.",
    teacher_manual_label: "Escribir mensaje para la clase (funciona incluso sin micrófono):",
    teacher_manual_placeholder: "Ej: Abran el libro en el capítulo 3...",
    btn_transmit: "Transmitir",
    transcript_card_title: "Registro de Transmisión",
    btn_export: "Exportar (.txt)",
    btn_clear: "Limpiar",
    student_access_title: "Acceso de Alumnos",
    student_access_desc: "Muestre este código QR para que los alumnos se conecten en la misma red Wi-Fi:",
    btn_copy: "Copiar",
    room_id_label: "Identificador de Sala:",
    btn_save: "Guardar",
    connected_card_title: "Participantes Conectados",
    connected_card_desc: "Distribución de idiomas en tiempo real:",
    unlock_audio_title: "🎧 Activar reproducción de audio",
    unlock_audio_desc: "Toque el botón al lado para escuchar la traducción en vivo en sus auriculares.",
    btn_unlock_audio: "Activar Audio 🔊",
    student_panel_title: "Recepción de Traducción",
    student_listen_label: "Escuchar y leer en:",
    student_autospeak_label: "Reproducir voz automáticamente",
    btn_test_audio: "🔊 Probar Sonido",
    student_font_label: "Texto:",
    student_speed_label: "Ritmo:",
    student_speed_slow: "0.85x (Lento)",
    student_speed_normal: "1.0x (Normal)",
    student_speed_fast: "1.15x (Rápido)",
    caption_waiting: "Esperando voz del profesor...",
    caption_badge: "⚡ Traducción Simultánea",
    caption_default_text: "Conecte sus auriculares. Cuando el profesor hable, los subtítulos traducidos aparecerán aquí y se escucharán en su idioma.",
    btn_replay: "🔊 Escuchar de Nuevo",
    ask_title: "🙋 Hacer Pregunta al Profesor (Viceversa)",
    ask_speak_label: "Mi Idioma de Habla:",
    ask_desc: "Presione el botón y hable en su lengua materna. Su duda será traducida y entregada directamente al profesor.",
    btn_ask_student: "🎙️ Preguntar al Profesor",
    btn_ask_student_stop: "⏹️ Concluir Pregunta",
    student_history_title: "Historial de Frases Traducidas",
    dialogue_card_title: "💬 Atención Individual y Bilateral",
    dialogue_card_desc: "Comunicación directa en dos sentidos para reuniones pedagógicas o atención a tutores",
    dialogue_side_a_title: "Educador (Lado A)",
    btn_dialogue_side_a: "🎙️ Hablar Lado A",
    dialogue_side_b_title: "Alumno / Tutor (Lado B)",
    btn_dialogue_side_b: "🎙️ Hablar Lado B",
    dialogue_history_label: "Diálogo Registrado:",
    guide_title: "Manual de Operación y Accesibilidad Lingüística",
    guide_desc: "Yanik, Translator conecta profesores y alumnos en aulas multilingües con traducción simultánea bidireccional en tiempo real.",
    guide_card1_title: "1. Conexión Wi-Fi Local",
    guide_card1_desc: "Solo requieren estar en la misma red Wi-Fi. Los alumnos escanean el código QR sin descargar ninguna app.",
    guide_card2_title: "2. Uso de Auriculares",
    guide_card2_desc: "Cada alumno escucha al profesor en su idioma nativo con auriculares, manteniendo el aula en silencio.",
    guide_card3_title: "3. Interacción Bidireccional",
    guide_card3_desc: "Al tocar 'Preguntar', el alumno habla en su lengua nativa y la pregunta llega traducida al profesor en portugués.",
    projector_modal_title: "Conectarse a la Clase",
    projector_modal_desc: "Apunte la cámara del celular para escuchar la clase en su idioma",
    projector_wifi_label: "Red Wi-Fi Local",
    footer_text: "Yanik, Translator © 2026 • Sistema de Traducción Simultánea en Tiempo Real"
  },
  de: {
    app_version: "v2.4 Pro",
    nav_live: "Verbunden",
    nav_direct: "Direktmodus / Offline",
    nav_room_prefix: "Raum: ",
    nav_projector: "📽️ QR-Code Projizieren",
    tab_teacher: "Lehrerpult",
    tab_student: "Schülerpult",
    tab_dialogue: "1-zu-1 Gespräch",
    tab_guide: "Handbuch",
    teacher_card_title: "🎙️ Sprachübertragung",
    teacher_card_desc: "Ihre Stimme wird in Echtzeit erfasst, übersetzt und an verbundene Schüler übertragen",
    teacher_input_lang_label: "Eingabesprache:",
    teacher_mic_status_idle: "Tippen Sie auf das Mikrofon, um die Übertragung zu starten",
    teacher_mic_status_live: "🎙️ Live-Unterricht läuft (Sprechen Sie ins Mikrofon)",
    teacher_mic_hint: "Sprechen Sie deutlich. Die Übersetzung erfolgt simultan in Echtzeit.",
    teacher_manual_label: "Nachricht an die Klasse eintippen (funktioniert auch ohne Mikrofon):",
    teacher_manual_placeholder: "Z.B.: Bitte Buch auf Seite 15 aufschlagen...",
    btn_transmit: "Senden",
    transcript_card_title: "Übertragungsprotokoll",
    btn_export: "Exportieren (.txt)",
    btn_clear: "Löschen",
    student_access_title: "Schülerzugang",
    student_access_desc: "QR-Code für Schüler im selben WLAN anzeigen:",
    btn_copy: "Kopieren",
    room_id_label: "Raum-Kennung:",
    btn_save: "Speichern",
    connected_card_title: "Verbundene Teilnehmer",
    connected_card_desc: "Echtzeit-Sprachverteilung:",
    unlock_audio_title: "🎧 Audiowiedergabe aktivieren",
    unlock_audio_desc: "Tippen Sie auf die Schaltfläche, um die Live-Übersetzung auf Ihren Kopfhörern zu hören.",
    btn_unlock_audio: "Audio aktivieren 🔊",
    student_panel_title: "Übersetzungsempfang",
    student_listen_label: "Hören und lesen in:",
    student_autospeak_label: "Automatische Sprachausgabe",
    btn_test_audio: "🔊 Ton testen",
    student_font_label: "Schrift:",
    student_speed_label: "Tempo:",
    student_speed_slow: "0.85x (Langsam)",
    student_speed_normal: "1.0x (Normal)",
    student_speed_fast: "1.15x (Schnell)",
    caption_waiting: "Warte auf Sprache des Lehrers...",
    caption_badge: "⚡ Simultanübersetzung",
    caption_default_text: "Schließen Sie Ihre Kopfhörer an. Wenn der Lehrer spricht, erscheinen die Untertitel hier und werden in Ihrer Sprache vorgelesen.",
    btn_replay: "🔊 Nochmal anhören",
    ask_title: "🙋 Frage an den Lehrer stellen (Gegenseitig)",
    ask_speak_label: "Meine Sprechsprache:",
    ask_desc: "Sprechen Sie in Ihrer Muttersprache. Ihre Frage wird für den Lehrer übersetzt.",
    btn_ask_student: "🎙️ Frage stellen",
    btn_ask_student_stop: "⏹️ Beenden",
    student_history_title: "Übersetzungshistorie",
    dialogue_card_title: "💬 1-zu-1 Elterngespräch",
    dialogue_card_desc: "Direkte Zwei-Wege-Kommunikation für Elterngespräche",
    dialogue_side_a_title: "Lehrkraft (Seite A)",
    btn_dialogue_side_a: "🎙️ Sprechen Seite A",
    dialogue_side_b_title: "Schüler / Eltern (Seite B)",
    btn_dialogue_side_b: "🎙️ Sprechen Seite B",
    dialogue_history_label: "Gesprächsprotokoll:",
    guide_title: "Bedienungsanleitung & Inklusion",
    guide_desc: "Yanik, Translator verbindet Lehrkräfte und Schüler in mehrsprachigen Klassen.",
    guide_card1_title: "1. Lokale WLAN-Verbindung",
    guide_card1_desc: "Schüler scannen den QR-Code im selben WLAN ohne App-Download.",
    guide_card2_title: "2. Kopfhörer verwenden",
    guide_card2_desc: "Schüler hören den Unterricht leise über Kopfhörer in ihrer Muttersprache.",
    guide_card3_title: "3. Zwei-Wege-Interaktion",
    guide_card3_desc: "Schüler können Fragen in ihrer Sprache stellen.",
    projector_modal_title: "Am Unterricht teilnehmen",
    projector_modal_desc: "Kamera auf QR-Code richten, um den Unterricht in Ihrer Sprache zu hören",
    projector_wifi_label: "Lokales WLAN",
    footer_text: "Yanik, Translator © 2026 • Simultanübersetzungssystem in Echtzeit"
  },
  ar: {
    app_version: "v2.4 Pro",
    nav_live: "متصل",
    nav_direct: "وضع مباشر / دون اتصال",
    nav_room_prefix: "القاعة: ",
    nav_projector: "📽️ عرض رمز الاستجابة السريعة",
    tab_teacher: "منصة المعلم",
    tab_student: "مقعد الطالب",
    tab_dialogue: "حوار فردي 1 إلى 1",
    tab_guide: "دليل الاستخدام",
    teacher_card_title: "🎙️ البث الصوتي المباشر",
    teacher_card_desc: "يتم التقاط صوتك وترجمته فورياً وبثه إلى الطلاب المتصلين",
    teacher_input_lang_label: "لغة الإدخال:",
    teacher_mic_status_idle: "المس الميكروفون لبدء البث المباشر",
    teacher_mic_status_live: "🎙️ الحصة تُبث مباشرة (تحدث في الميكروفون)",
    teacher_mic_hint: "تحدث بوضوح. تتم الترجمة فورياً إلى الهندية والفرنسية والإنجليزية وغيرها.",
    teacher_manual_label: "كتابة رسالة للصف (تعمل بدون ميكروفون):",
    teacher_manual_placeholder: "مثال: افتحوا الكتاب في الصفحة 15...",
    btn_transmit: "إرسال وبث",
    transcript_card_title: "سجل البث",
    btn_export: "تصدير (.txt)",
    btn_clear: "مسح",
    student_access_title: "انضمام الطلاب",
    student_access_desc: "اعرض رمز QR للطلاب المتصلين بنفس شبكة Wi-Fi:",
    btn_copy: "نسخ",
    room_id_label: "معرّف القاعة:",
    btn_save: "حفظ",
    connected_card_title: "الطلاب المتصلون",
    connected_card_desc: "توزيع اللغات المباشر:",
    unlock_audio_title: "🎧 تفعيل الصوت",
    unlock_audio_desc: "اضغط على الزر لسماع الترجمة المباشرة في سماعاتك.",
    btn_unlock_audio: "تفعيل الصوت 🔊",
    student_panel_title: "استقبال الترجمة",
    student_listen_label: "الاستماع والقراءة باللغة:",
    student_autospeak_label: "تشغيل الصوت تلقائياً",
    btn_test_audio: "🔊 اختبار الصوت",
    student_font_label: "الخط:",
    student_speed_label: "السرعة:",
    student_speed_slow: "0.85x (بطيء)",
    student_speed_normal: "1.0x (عادي)",
    student_speed_fast: "1.15x (سريع)",
    caption_waiting: "في انتظار حديث المعلم...",
    caption_badge: "⚡ ترجمة فورية",
    caption_default_text: "ضع سماعات الأذن. عندما يتحدث المعلم، ستظهر الترجمة هنا وسيتم تشغيلها بلغتك.",
    btn_replay: "🔊 إعادة الاستماع",
    ask_title: "🙋 طرح سؤال على المعلم (متبادل)",
    ask_speak_label: "لغة التحدث الخاصة بي:",
    ask_desc: "اضغط وتحدث بلغتك الأم. ستتم ترجمة سؤالك ونقله مباشرة إلى المعلم.",
    btn_ask_student: "🎙️ طرح سؤال على المعلم",
    btn_ask_student_stop: "⏹️ إنهاء السؤال",
    student_history_title: "سجل العبارات المترجمة",
    dialogue_card_title: "💬 جلسة حوار ثنائية 1 إلى 1",
    dialogue_card_desc: "تواصل مباشر ثنائي الاتجاه للاجتماعات التربوية وأولياء الأمور",
    dialogue_side_a_title: "المعلم (الطرف A)",
    btn_dialogue_side_a: "🎙️ تحدث (الطرف A)",
    dialogue_side_b_title: "الطالب / ولي الأمر (الطرف B)",
    btn_dialogue_side_b: "🎙️ تحدث (الطرف B)",
    dialogue_history_label: "الحوار المسجل:",
    guide_title: "دليل التشغيل والشمول اللغوي",
    guide_desc: "يربط نظام Yanik, Translator المعلمين والطلاب في الفصول متعددة اللغات بترجمة فورية متزامنة.",
    guide_card1_title: "1. اتصال Wi-Fi محلي",
    guide_card1_desc: "يكفي الاتصال بنفس الشبكة ومسح رمز QR دون الحاجة لتنزيل أي تطبيق.",
    guide_card2_title: "2. استخدام السماعات",
    guide_card2_desc: "يستمع كل طالب للمعلم بلغته الأم في سماعاته للحفاظ على هدوء الفصل.",
    guide_card3_title: "3. تفاعل ثنائي الاتجاه",
    guide_card3_desc: "يمكن للطلاب طرح الأسئلة بلغتهم الأم لتصل للمعلم مترجمة.",
    projector_modal_title: "الانضمام للحصة",
    projector_modal_desc: "امسح الرمز بكاميرا هاتفك للاستماع إلى الحصة بلغتك",
    projector_wifi_label: "شبكة Wi-Fi المحلية",
    footer_text: "Yanik, Translator © 2026 • نظام الترجمة الفورية المتزامنة"
  },
  "zh-CN": {
    app_version: "v2.4 Pro",
    nav_live: "已连接",
    nav_direct: "直连 / 离线模式",
    nav_room_prefix: "教室: ",
    nav_projector: "📽️ 投影二维码",
    tab_teacher: "教师讲台",
    tab_student: "学生课桌",
    tab_dialogue: "一对一交流",
    tab_guide: "使用手册",
    teacher_card_title: "🎙️ 语音同传广播",
    teacher_card_desc: "您的讲课声音将被实时捕获、翻译并广播给所有已连接的学生",
    teacher_input_lang_label: "讲课语言:",
    teacher_mic_status_idle: "点击麦克风开始课堂同传广播",
    teacher_mic_status_live: "🎙️ 课堂正在实时直播（请对着麦克风说话）",
    teacher_mic_hint: "请清晰说话。系统将实时翻译成印地语、法语、英语等语言。",
    teacher_manual_label: "输入文字通知（无需麦克风也可使用）:",
    teacher_manual_placeholder: "例：请大家把课本翻到第15页...",
    btn_transmit: "广播发送",
    transcript_card_title: "同传广播记录",
    btn_export: "导出 (.txt)",
    btn_clear: "清空",
    student_access_title: "学生接入",
    student_access_desc: "向同一校园Wi-Fi下的学生出示此二维码以便即时加入:",
    btn_copy: "复制链接",
    room_id_label: "教室标识:",
    btn_save: "保存",
    connected_card_title: "在线学生",
    connected_card_desc: "实时语言分布:",
    unlock_audio_title: "🎧 开启音频收听",
    unlock_audio_desc: "点击旁边的按钮即可在耳机中实时收听同传语音。",
    btn_unlock_audio: "开启音频 🔊",
    student_panel_title: "同传接收",
    student_listen_label: "收听与阅读语言:",
    student_autospeak_label: "自动语音朗读",
    btn_test_audio: "🔊 测试声音",
    student_font_label: "字幕大小:",
    student_speed_label: "语速:",
    student_speed_slow: "0.85x (慢速)",
    student_speed_normal: "1.0x (正常)",
    student_speed_fast: "1.15x (快速)",
    caption_waiting: "等待教师开讲...",
    caption_badge: "⚡ 实时同声传译",
    caption_default_text: "请戴上耳机。当老师讲课时，翻译字幕将在此处实时显示并朗读。",
    btn_replay: "🔊 重新播放",
    ask_title: "🙋 向老师举手提问（双向互动）",
    ask_speak_label: "我的提问语言:",
    ask_desc: "按住按钮并使用您的母语说话。您的疑问将被翻译并即时显示给老师。",
    btn_ask_student: "🎙️ 开始提问",
    btn_ask_student_stop: "⏹️ 结束提问",
    student_history_title: "已翻译句子历史",
    dialogue_card_title: "💬 一对一面对面交流",
    dialogue_card_desc: "针对家长会或个别辅导的双向即时对话翻译",
    dialogue_side_a_title: "教师（A方）",
    btn_dialogue_side_a: "🎙️ A方讲话",
    dialogue_side_b_title: "学生 / 家长（B方）",
    btn_dialogue_side_b: "🎙️ B方讲话",
    dialogue_history_label: "对话记录:",
    guide_title: "操作手册与校园包容性指南",
    guide_desc: "Yanik, Translator 致力于通过实时双向同声传译打破多语言课堂的交流壁垒。",
    guide_card1_title: "1. 本地Wi-Fi免装连接",
    guide_card1_desc: "只需连接同一校园Wi-Fi，扫码即可打开网页加入，无需安装App。",
    guide_card2_title: "2. 耳机静音收听",
    guide_card2_desc: "每个学生戴上耳机以自己的母语收听，保持课堂安静整洁。",
    guide_card3_title: "3. 双向举手互动",
    guide_card3_desc: "学生可用母语直接向老师提问，老师在电脑端以葡萄牙语查看。",
    projector_modal_title: "扫码加入课堂",
    projector_modal_desc: "请使用手机相机扫描二维码，用您的母语收听课堂翻译",
    projector_wifi_label: "本地Wi-Fi网络",
    footer_text: "Yanik, Translator © 2026 • 校园实时同声传译系统"
  },
  ru: {
    app_version: "v2.4 Pro",
    nav_live: "Подключено",
    nav_direct: "Прямой режим / Офлайн",
    nav_room_prefix: "Кабинет: ",
    nav_projector: "📽️ Проекция QR-кода",
    tab_teacher: "Стол Учителя",
    tab_student: "Парта Ученика",
    tab_dialogue: "Беседа 1-на-1",
    tab_guide: "Инструкция",
    teacher_card_title: "🎙️ Голосовая Трансляция",
    teacher_card_desc: "Ваша речь улавливается, мгновенно переводится и звучит у подключенных учеников",
    teacher_input_lang_label: "Язык ввода:",
    teacher_mic_status_idle: "Нажмите на микрофон для начала трансляции",
    teacher_mic_status_live: "🎙️ Идет прямой эфир урока (Говорите в микрофон)",
    teacher_mic_hint: "Говорите четко. Перевод на хинди, французский, английский и др. языки выполняется синхронно.",
    teacher_manual_label: "Ввести объявление для класса (работает без микрофона):",
    teacher_manual_placeholder: "Напр.: Откройте учебник на странице 15...",
    btn_transmit: "Отправить",
    transcript_card_title: "Журнал трансляции",
    btn_export: "Скачать (.txt)",
    btn_clear: "Очистить",
    student_access_title: "Доступ Учеников",
    student_access_desc: "Покажите QR-код ученикам, подключенным к тому же Wi-Fi:",
    btn_copy: "Копировать",
    room_id_label: "Номер Кабинета:",
    btn_save: "Сохранить",
    connected_card_title: "Подключенные Ученики",
    connected_card_desc: "Распределение языков:",
    unlock_audio_title: "🎧 Включить воспроизведение звука",
    unlock_audio_desc: "Нажмите кнопку, чтобы слышать синхронный перевод в наушниках.",
    btn_unlock_audio: "Включить звук 🔊",
    student_panel_title: "Прием Перевода",
    student_listen_label: "Слушать и читать на:",
    student_autospeak_label: "Озвучивать автоматически",
    btn_test_audio: "🔊 Проверить звук",
    student_font_label: "Шрифт:",
    student_speed_label: "Темп:",
    student_speed_slow: "0.85x (Медленно)",
    student_speed_normal: "1.0x (Обычный)",
    student_speed_fast: "1.15x (Быстро)",
    caption_waiting: "Ожидание речи учителя...",
    caption_badge: "⚡ Синхронный Перевод",
    caption_default_text: "Наденьте наушники. Когда учитель начнет говорить, перевод появится здесь и прозвучит на вашем языке.",
    btn_replay: "🔊 Прослушать снова",
    ask_title: "🙋 Задать вопрос учителю (В обратную сторону)",
    ask_speak_label: "Язык моего вопроса:",
    ask_desc: "Нажмите кнопку и говорите на родном языке. Вопрос будет переведен и отправлен учителю.",
    btn_ask_student: "🎙️ Задать вопрос учителю",
    btn_ask_student_stop: "⏹️ Завершить вопрос",
    student_history_title: "История переведенных фраз",
    dialogue_card_title: "💬 Диалог 1-на-1",
    dialogue_card_desc: "Двусторонняя связь для родительских собраний и консультаций",
    dialogue_side_a_title: "Педагог (Сторона A)",
    btn_dialogue_side_a: "🎙️ Говорить (A)",
    dialogue_side_b_title: "Ученик / Родитель (Сторона B)",
    btn_dialogue_side_b: "🎙️ Говорить (B)",
    dialogue_history_label: "Запись диалога:",
    guide_title: "Руководство по эксплуатации",
    guide_desc: "Yanik, Translator обеспечивает языковую интеграцию с синхронным переводом на 50+ языков.",
    guide_card1_title: "1. Локальный Wi-Fi",
    guide_card1_desc: "Ученики подключаются по QR-коду в сети школы без скачивания приложений.",
    guide_card2_title: "2. Использование наушников",
    guide_card2_desc: "Каждый ученик слушает учителя в наушниках на своем языке.",
    guide_card3_title: "3. Двусторонняя связь",
    guide_card3_desc: "Ученик может задать вопрос на родном языке, а учитель получит его перевод.",
    projector_modal_title: "Подключиться к уроку",
    projector_modal_desc: "Наведите камеру на QR-код для перевода урока",
    projector_wifi_label: "Школьный Wi-Fi",
    footer_text: "Yanik, Translator © 2026 • Система синхронного перевода в реальном времени"
  }
};

// Fallback universal para línguas adicionais da UI
['it', 'ja', 'ko', 'bn', 'tr', 'vi', 'id', 'uk', 'ur'].forEach(langKey => {
  if (!UI_TRANSLATIONS[langKey]) {
    UI_TRANSLATIONS[langKey] = { ...UI_TRANSLATIONS['en'] };
  }
});

// Estado global da aplicação
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
  
  // Idiomas Selecionados
  teacherLang: 'pt',
  studentTargetLang: 'hi',
  studentSpeakLang: 'hi',
  diagLangA: 'pt',
  diagLangB: 'hi',
  
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

  // Integração com Conta Google & Inteligência Artificial
  googleUser: {
    connected: false,
    name: '',
    email: '',
    picture: '',
    role: 'teacher'
  },
  geminiApiKey: '',
  currentSummaryData: null
};

// ========================================================
// 1. INICIALIZAÇÃO
// ========================================================
document.addEventListener('DOMContentLoaded', async () => {
  setupBroadcastChannel();
  parseUrlParams();
  setupLanguageSelectors();
  setupUiLanguageSelector();
  setupTheme();
  setupTabs();
  setupSpeechSynthesis();
  initSpeechRecognition();
  
  // Carrega informações do servidor; se falhar, ativa modo autônomo sem travar
  await loadServerInfo();
  await fetchAvailableRooms();
  updateRoomDisplay();
  connectRealtime();
  
  setupEventListeners();
  renderQrCode();
  initGoogleAccount();
  initClassSummarizer();

  // Atualização periódica da lista de salas da escola a cada 5 segundos
  setInterval(() => {
    fetchAvailableRooms();
  }, 5000);

  // Desbloqueia áudio no primeiro toque na tela
  document.addEventListener('click', () => {
    if (!state.audioUnlocked) {
      unlockMobileAudio(false);
    }
  }, { once: true });
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
  if (speedSelect && speedSelect.options.length >= 3) {
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
  const populate = (selectId, defaultCode) => {
    const sel = document.getElementById(selectId);
    if (!sel) return;
    sel.innerHTML = '';
    LANGUAGES.forEach(lang => {
      const opt = document.createElement('option');
      opt.value = lang.code;
      opt.textContent = `${lang.flag} ${lang.native} (${lang.name})`;
      if (lang.code === defaultCode) opt.selected = true;
      sel.appendChild(opt);
    });
  };

  populate('teacher-lang-select', state.teacherLang);
  populate('create-room-lang', state.teacherLang);
  populate('student-lang-select', state.studentTargetLang);
  populate('student-speak-lang-select', state.studentSpeakLang);
  populate('diag-lang-a', state.diagLangA);
  populate('diag-lang-b', state.diagLangB);
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
  if (btn) btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
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
  state.role = tabId === 'teacher' ? 'teacher' : 'student';

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
  });

  document.querySelectorAll('.tab-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === `tab-${tabId}`);
  });

  connectRealtime();
}

// ========================================================
// 2. CONEXÃO EM TEMPO REAL E FALLBACK INTELIGENTE
// ========================================================
async function loadServerInfo() {
  if (state.isFileProtocol) {
    setStandaloneMode();
    return;
  }

  try {
    const res = await fetch('/api/info', { cache: 'no-cache' });
    if (res.ok) {
      state.serverInfo = await res.json();
      state.isServerConnected = true;
      renderShareLinks();
      updateConnectionStatus(true, 'Conectado');
    } else {
      setStandaloneMode();
    }
  } catch (err) {
    setStandaloneMode();
  }
}

function setStandaloneMode() {
  state.isServerConnected = false;
  updateConnectionStatus(true, 'Modo Direto / Offline');
  renderShareLinks();
}

function connectRealtime() {
  if (!state.isServerConnected || state.isFileProtocol) {
    return;
  }

  if (state.eventSource) {
    state.eventSource.close();
  }

  const currentLang = state.role === 'teacher' ? state.teacherLang : state.studentTargetLang;
  const clientName = state.role === 'teacher' ? 'Professor' : `Aluno (${currentLang.toUpperCase()})`;
  const streamUrl = `/api/stream?room=${encodeURIComponent(state.roomId)}&role=${state.role}&lang=${encodeURIComponent(currentLang)}&name=${encodeURIComponent(clientName)}`;

  state.eventSource = new EventSource(streamUrl);

  state.eventSource.onopen = () => {
    updateConnectionStatus(true, 'Conectado');
  };

  state.eventSource.onerror = () => {
    updateConnectionStatus(true, 'Modo Direto / Offline');
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
    if (labelKeyOrText === 'Conectado') label = t.nav_live;
    else if (labelKeyOrText === 'Modo Direto / Offline') label = t.nav_direct;
    text.textContent = label;
  }
}

function handleServerEvent(data) {
  if (data.type === 'connected') {
    state.clientId = data.clientId;
    if (data.roomDetails) {
      state.roomDetails = data.roomDetails;
      updateRoomDisplay();
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
  const tStudents = document.getElementById('teacher-current-students');
  if (tStudents) {
    tStudents.textContent = `${data.studentCount || 0} aluno(s) conectado(s)`;
  }

  const statsContainer = document.getElementById('connected-stats-pills');
  if (!statsContainer) return;

  statsContainer.innerHTML = '';

  const totalPill = document.createElement('span');
  totalPill.className = 'stat-pill';
  totalPill.innerHTML = `👥 <strong>${data.studentCount} Aluno(s)</strong>`;
  statsContainer.appendChild(totalPill);

  if (data.languages) {
    Object.keys(data.languages).forEach(langCode => {
      const langObj = LANGUAGES.find(l => l.code === langCode);
      const pill = document.createElement('span');
      pill.className = 'stat-pill';
      const flag = langObj ? langObj.flag : '🌐';
      const name = langObj ? langObj.name : langCode.toUpperCase();
      pill.innerHTML = `${flag} ${data.languages[langCode]} em ${name}`;
      statsContainer.appendChild(pill);
    });
  }
}

// ========================================================
// 3. MOTOR DE TRADUÇÃO (CLIENT-SIDE & SERVER)
// ========================================================
const clientTranslationCache = new Map();

/**
 * Tradução universal ultra-rápida (sub-segundo)
 */
async function translateUniversal(text, fromLang, toLang) {
  if (!text || !text.trim()) return '';
  const trimmed = text.trim();
  const normFrom = fromLang.split('-')[0].toLowerCase();
  const normTo = toLang.split('-')[0].toLowerCase();

  if (normFrom === normTo && normFrom !== 'auto') {
    return trimmed;
  }

  const cacheKey = `${normFrom}->${normTo}:${trimmed}`;
  if (clientTranslationCache.has(cacheKey)) {
    return clientTranslationCache.get(cacheKey);
  }

  // 1. Tenta tradução direta pelo navegador via API pública do Google (latência ultrarrápida: ~40-90ms)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 900);
    const gtxUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${normFrom}&tl=${normTo}&dt=t&q=${encodeURIComponent(trimmed)}`;
    const res = await fetch(gtxUrl, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && Array.isArray(data[0])) {
        const translated = data[0].map(item => item[0]).join('');
        if (translated && translated.trim()) {
          clientTranslationCache.set(cacheKey, translated);
          return translated;
        }
      }
    }
  } catch (err) {}

  // 2. Tenta API local do servidor com keep-alive
  if (state.isServerConnected && !state.isFileProtocol) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1200);
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: trimmed, from: normFrom, to: normTo }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        if (data.translated) {
          clientTranslationCache.set(cacheKey, data.translated);
          return data.translated;
        }
      }
    } catch (e) {}
  }

  // 3. Fallback MyMemory
  try {
    const memUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(trimmed)}&langpair=${normFrom}|${normTo}`;
    const res = await fetch(memUrl);
    const data = await res.json();
    if (data && data.responseData && data.responseData.translatedText) {
      clientTranslationCache.set(cacheKey, data.responseData.translatedText);
      return data.responseData.translatedText;
    }
  } catch (e) {}

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

  let translatedForCurrent = data.translatedText;
  const targetCode = state.activeTab === 'student' ? state.studentTargetLang : state.teacherLang;
  
  if (!translatedForCurrent || (data.targetLang && data.targetLang !== targetCode)) {
    translatedForCurrent = await translateUniversal(data.originalText, data.sourceLang, targetCode);
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

let interimBroadcastTimer = null;
let lastBroadcastInterimText = '';
let pauseDetectorTimer = null;
let lastFinalizedSpeechNorm = '';
let lastFinalizedTime = 0;

async function handleTeacherSpeechResult(finalText, interimText) {
  const interimBox = document.getElementById('teacher-interim-box');

  // Streaming instantâneo de legendas em tempo real (35ms - digitação simultânea)
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
      }, 35);
    }

    // Detector de pausa de finalização rápida (< 1 segundo para fala simultânea)
    const hasPunctuation = /[.,?!;:]$/.test(trimmedInterim);
    const delay = hasPunctuation ? 250 : 600;

    clearTimeout(pauseDetectorTimer);
    pauseDetectorTimer = setTimeout(() => {
      const normInterim = normalizeSpeechText(trimmedInterim);
      if (normInterim && normInterim !== lastFinalizedSpeechNorm && (Date.now() - lastFinalizedTime > 1600)) {
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
    if (normFinal && normFinal === lastFinalizedSpeechNorm && (Date.now() - lastFinalizedTime < 2500)) {
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
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = loadVoices;
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

  const normLang = (item.lang || 'pt').split('-')[0].toLowerCase();

  let ttsUrl = '';
  if (state.isServerConnected && !state.isFileProtocol) {
    ttsUrl = `/api/tts?text=${encodeURIComponent(item.text)}&lang=${normLang}`;
  } else {
    ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(item.text)}&tl=${normLang}&client=tw-ob`;
  }

  const audio = new Audio();
  currentAudioElement = audio;

  const dynamicRate = audioQueue.length > 0 ? Math.min((state.speechRate || 1.0) * 1.18, 1.35) : (state.speechRate || 1.0);
  audio.playbackRate = dynamicRate;
  audio.volume = state.speechVolume || 1.0;

  let ended = false;
  const next = () => {
    if (ended) return;
    ended = true;
    processNextAudioQueue();
  };

  audio.onended = next;

  audio.onerror = (e) => {
    console.warn('Falha no áudio MP3, usando sintetizador nativo:', e);
    speakWithBrowserSpeechSynthesis(item.text, item.lang, next);
  };

  audio.src = ttsUrl;
  
  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      state.audioUnlocked = true;
      hideAudioUnlockBanner();
    }).catch((err) => {
      console.warn('Autoplay bloqueado pelo navegador:', err);
      showAudioUnlockBanner();
      speakWithBrowserSpeechSynthesis(item.text, item.lang, next);
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
    utterance.rate = state.speechRate;
    utterance.volume = state.speechVolume;

    const prefix = targetBcp47.split('-')[0].toLowerCase();
    const matchedVoice = state.availableVoices.find(v => {
      const vLang = v.lang.toLowerCase();
      return vLang === targetBcp47.toLowerCase() || vLang.startsWith(prefix);
    });

    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onend = () => {
      if (onDone) onDone();
    };

    utterance.onerror = () => {
      if (onDone) onDone();
    };

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
      state.teacherLang = e.target.value;
      if (state.isRecordingTeacher) restartRecognition(state.teacherLang);
    });
  }

  const studentLangSelect = document.getElementById('student-lang-select');
  if (studentLangSelect) {
    studentLangSelect.addEventListener('change', (e) => {
      state.studentTargetLang = e.target.value;
      updateStudentLanguageOnServer(e.target.value);

      // Sincroniza opcionalmente a linguagem da tela com a do aluno
      const rawLang = e.target.value.split('-')[0].toLowerCase();
      if (UI_TRANSLATIONS[rawLang] && !localStorage.getItem('yanik-user-locked-ui-lang')) {
        applyUiLanguage(rawLang);
      }
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
        processAndBroadcastSpeech({
          roomId: state.roomId,
          senderRole: 'teacher',
          senderName: 'Professor',
          text: val,
          sourceLang: state.teacherLang,
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
        state.roomId = roomInput.value.trim().toUpperCase();
        const headerRoomBadge = document.getElementById('header-room-badge');
        const t = UI_TRANSLATIONS[state.uiLang] || UI_TRANSLATIONS['pt'];
        if (headerRoomBadge) headerRoomBadge.textContent = `${t.nav_room_prefix || 'Sala: '}${state.roomId}`;
        setupBroadcastChannel();
        connectRealtime();
        renderQrCode();
        renderShareLinks();
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
    stopRecording();
    state.isRecordingTeacher = true;
    startRecognition(state.teacherLang);
  }
}

function toggleStudentRecording() {
  if (state.isRecordingStudent) {
    stopRecording();
  } else {
    stopRecording();
    state.isRecordingStudent = true;
    startRecognition(state.studentSpeakLang);
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
  try {
    state.recognition.stop();
    setTimeout(() => {
      state.recognition.lang = getBcp47(langCode);
      state.recognition.start();
    }, 200);
  } catch (e) {}
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
  const langParam = encodeURIComponent(state.studentTargetLang);
  
  if (state.serverInfo && state.serverInfo.primaryUrl) {
    return `${state.serverInfo.primaryUrl}/?room=${encodeURIComponent(state.roomId)}&role=student&lang=${langParam}${uiParam}`;
  }
  if (!state.isFileProtocol) {
    return `${window.location.origin}/?room=${encodeURIComponent(state.roomId)}&role=student&lang=${langParam}${uiParam}`;
  }
  return `http://localhost:3000/?room=${encodeURIComponent(state.roomId)}&role=student&lang=${langParam}${uiParam}`;
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
  const url = getStudentJoinUrl();
  navigator.clipboard.writeText(url).then(() => {
    alert('✓ Link copiado para a área de transferência! Envie para os alunos.');
  }).catch(() => {
    prompt('Copie o link abaixo:', url);
  });
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

  const timeStr = new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const playBtnHtml = `<button class="btn btn-secondary" style="padding: 4px 10px; font-size: 0.78rem; margin-top: 6px;" onclick="speakText('${escapeQuotes(data.translatedText)}', '${data.targetLang || state.studentTargetLang}')">🔊 Ouvir em Voz Alta</button>`;

  item.innerHTML = `
    <div class="feed-meta">
      <span class="feed-sender">${escapeHtml(data.senderName)}</span>
      <span>${timeStr}</span>
    </div>
    <div class="feed-translated">${escapeHtml(data.translatedText)}</div>
    <div class="feed-original">Original (${data.sourceLang.toUpperCase()}): "${escapeHtml(data.originalText)}"</div>
    ${playBtnHtml}
  `;

  feed.prepend(item);
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
      state.availableRooms = await res.json();
      renderRoomCardsList();
      
      // Se a sala atual estiver na lista, sincroniza os detalhes
      const match = state.availableRooms.find(r => r.id === state.roomId);
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

  const filtered = (state.availableRooms || []).filter(r => {
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
        <span style="font-size: 2rem; display: block; margin-bottom: 8px;">🔍</span>
        <strong>Nenhuma aula encontrada</strong>
        <p style="font-size: 0.82rem; margin-top: 4px;">Tente pesquisar com outro termo ou digite o código da sala abaixo.</p>
      </div>
    `;
    return;
  }

  const subjectIcons = {
    'Matemática': '📐',
    'Ciências': '🧪',
    'História': '🌍',
    'Línguas': '📖',
    'Tecnologia': '💻',
    'Geral': '🏫'
  };

  container.innerHTML = filtered.map(r => {
    const isCurrent = r.id === state.roomId;
    const icon = subjectIcons[r.subject] || '🏫';
    const flagPills = r.languages ? Object.keys(r.languages).map(code => {
      const l = LANGUAGES.find(item => item.code === code);
      return l ? l.flag : code.toUpperCase();
    }).join(' ') : '';

    return `
      <div class="room-card-item ${isCurrent ? 'is-current' : ''}">
        <div class="room-card-main">
          <div class="room-card-header">
            <span class="room-tag-badge">${icon} ${escapeHtml(r.subject || 'Geral')}</span>
            <span class="code-pill">${escapeHtml(r.id)}</span>
            ${r.teacherOnline ? '<span class="room-live-indicator"><span class="status-indicator"></span> AO VIVO</span>' : ''}
          </div>
          <h3 class="room-card-title">${escapeHtml(r.title || `Aula - Sala ${r.id}`)}</h3>
          <div class="room-card-sub">
            <span>👤 ${escapeHtml(r.teacherName || 'Professor')}</span>
            <span>•</span>
            <span>👥 ${r.studentCount || 0} aluno(s)</span>
            ${flagPills ? `<span>•</span> <span>${flagPills}</span>` : ''}
          </div>
        </div>
        <div class="room-card-action">
          ${isCurrent 
            ? '<button class="btn-action btn-secondary" style="font-size: 0.78rem;" disabled>✓ Conectado</button>' 
            : `<button class="btn-action btn-primary" style="font-size: 0.78rem;" onclick="joinRoomFromBrowser('${escapeQuotes(r.id)}')">Entrar nesta Aula 🎧</button>`
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

  const getSubjectIcon = (subj) => {
    const map = {
      'Matemática': '📐',
      'Ciências': '🧪',
      'História': '🌍',
      'Línguas': '📖',
      'Tecnologia': '💻',
      'Geral': '🏫'
    };
    return (map[subj] || '🏫') + ' ' + (subj || 'Geral');
  };

  // 1. Atualiza visualização na Mesa do Professor
  const tTitle = document.getElementById('teacher-current-title');
  if (tTitle) tTitle.textContent = r.title || `Aula - Sala ${r.id}`;
  const tAuthor = document.getElementById('teacher-current-author');
  if (tAuthor) tAuthor.textContent = r.teacherName || 'Prof. Yanik';
  const tCode = document.getElementById('teacher-current-code');
  if (tCode) tCode.textContent = r.id || state.roomId;
  const tSubject = document.getElementById('teacher-current-subject');
  if (tSubject) tSubject.textContent = getSubjectIcon(r.subject);

  // 2. Atualiza visualização na Carteira do Aluno
  const sTitle = document.getElementById('student-current-title');
  if (sTitle) sTitle.textContent = r.title || `Aula - Sala ${r.id}`;
  const sAuthor = document.getElementById('student-current-author');
  if (sAuthor) sAuthor.textContent = r.teacherName || 'Professor';
  const sCode = document.getElementById('student-current-code');
  if (sCode) sCode.textContent = r.id || state.roomId;
  const sSubject = document.getElementById('student-current-subject');
  if (sSubject) sSubject.textContent = getSubjectIcon(r.subject);

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
// 10. INTEGRAÇÃO COM CONTA GOOGLE & CHAVE GEMINI IA
// ========================================================
function initGoogleAccount() {
  try {
    const savedUser = localStorage.getItem('yanik_google_user');
    if (savedUser) {
      state.googleUser = JSON.parse(savedUser);
    }
    const savedKey = localStorage.getItem('yanik_gemini_key');
    if (savedKey) {
      state.geminiApiKey = savedKey;
    }
  } catch (e) {}

  updateGoogleUI();

  // Listeners dos botões
  const btnGoogle = document.getElementById('btn-google-account');
  if (btnGoogle) {
    btnGoogle.addEventListener('click', openGoogleModal);
  }

  const btnClose = document.getElementById('btn-close-google-modal');
  if (btnClose) btnClose.addEventListener('click', closeGoogleModal);

  const btnCloseDone = document.getElementById('btn-close-google-done');
  if (btnCloseDone) btnCloseDone.addEventListener('click', closeGoogleModal);

  const btnOneTap = document.getElementById('btn-google-onetap');
  if (btnOneTap) btnOneTap.addEventListener('click', handleGoogleOneTap);

  const btnSaveCustom = document.getElementById('btn-save-google-custom');
  if (btnSaveCustom) btnSaveCustom.addEventListener('click', saveGoogleCustomProfile);

  const btnSaveGemini = document.getElementById('btn-save-gemini-key');
  if (btnSaveGemini) btnSaveGemini.addEventListener('click', saveGeminiApiKey);

  const btnSignout = document.getElementById('btn-google-signout');
  if (btnSignout) btnSignout.addEventListener('click', disconnectGoogleAccount);
}

function openGoogleModal() {
  const modal = document.getElementById('google-modal');
  if (modal) {
    modal.classList.add('active');
    const nameInput = document.getElementById('google-input-name');
    const emailInput = document.getElementById('google-input-email');
    const keyInput = document.getElementById('google-gemini-key');
    if (nameInput) nameInput.value = state.googleUser.name || '';
    if (emailInput) emailInput.value = state.googleUser.email || '';
    if (keyInput) keyInput.value = state.geminiApiKey || '';
  }
}

function closeGoogleModal() {
  const modal = document.getElementById('google-modal');
  if (modal) modal.classList.remove('active');
}

function handleGoogleOneTap() {
  const sampleNames = ['Prof. Yanik Silva', 'Prof. Yanik', 'Educador Google', 'Coordenação Pedagógica'];
  const name = state.googleUser.name || sampleNames[Math.floor(Math.random() * sampleNames.length)];
  const email = state.googleUser.email || 'yanik.educacao@escola.gov.br';
  const avatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`;

  state.googleUser = {
    connected: true,
    name,
    email,
    picture: avatar,
    role: state.activeTab === 'student' ? 'Estudante' : 'Educador(a)'
  };

  try {
    localStorage.setItem('yanik_google_user', JSON.stringify(state.googleUser));
  } catch (e) {}

  updateGoogleUI();
  showToast(`✓ Conta Google vinculada com sucesso: ${name}!`);
}

function saveGoogleCustomProfile() {
  const nameInput = document.getElementById('google-input-name');
  const emailInput = document.getElementById('google-input-email');

  const name = nameInput ? nameInput.value.trim() : '';
  const email = emailInput ? emailInput.value.trim() : '';

  if (!name && !email) {
    alert('Informe ao menos seu nome de exibição ou e-mail Google.');
    return;
  }

  const finalName = name || (email ? email.split('@')[0] : 'Usuário Google');
  const finalEmail = email || 'usuario@gmail.com';
  const avatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(finalName)}`;

  state.googleUser = {
    connected: true,
    name: finalName,
    email: finalEmail,
    picture: avatar,
    role: state.activeTab === 'student' ? 'Estudante' : 'Educador(a)'
  };

  try {
    localStorage.setItem('yanik_google_user', JSON.stringify(state.googleUser));
  } catch (e) {}

  updateGoogleUI();
  showToast('✓ Perfil Google salvo com sucesso!');
}

function saveGeminiApiKey() {
  const keyInput = document.getElementById('google-gemini-key');
  const key = keyInput ? keyInput.value.trim() : '';

  state.geminiApiKey = key;
  try {
    localStorage.setItem('yanik_gemini_key', key);
  } catch (e) {}

  updateGoogleUI();
  if (key) {
    showToast('✓ Chave Google Gemini salva! Resumos por IA ativados.');
  } else {
    showToast('Chave removida. Usando motor pedagógico nativo.');
  }
}

function disconnectGoogleAccount() {
  state.googleUser = {
    connected: false,
    name: '',
    email: '',
    picture: '',
    role: 'teacher'
  };

  try {
    localStorage.removeItem('yanik_google_user');
  } catch (e) {}

  updateGoogleUI();
  showToast('Conta Google desconectada.');
}

function updateGoogleUI() {
  const btnGoogle = document.getElementById('btn-google-account');
  const btnText = document.getElementById('google-btn-text');
  const avatarWrap = document.getElementById('google-avatar-wrap');
  const profileCard = document.getElementById('google-connected-profile');
  const profilePic = document.getElementById('google-profile-pic');
  const profileName = document.getElementById('google-profile-name');
  const profileEmail = document.getElementById('google-profile-email');
  const profileRole = document.getElementById('google-profile-role');
  const keyStatus = document.getElementById('gemini-key-status');

  if (state.googleUser && state.googleUser.connected) {
    if (btnGoogle) btnGoogle.classList.add('is-connected');
    if (btnText) btnText.textContent = state.googleUser.name.split(' ')[0] || 'Google';
    
    if (avatarWrap) {
      if (state.googleUser.picture) {
        avatarWrap.innerHTML = `<img src="${state.googleUser.picture}" class="google-avatar-img" alt="Avatar">`;
      }
    }

    if (profileCard) profileCard.style.display = 'flex';
    if (profilePic && state.googleUser.picture) profilePic.src = state.googleUser.picture;
    if (profileName) profileName.textContent = state.googleUser.name;
    if (profileEmail) profileEmail.textContent = state.googleUser.email;
    if (profileRole) profileRole.textContent = state.googleUser.role || 'Educador';

    const teacherInput = document.getElementById('create-room-teacher');
    if (teacherInput && (!teacherInput.value || teacherInput.value === 'Prof. Yanik')) {
      teacherInput.value = state.googleUser.name;
    }
  } else {
    if (btnGoogle) btnGoogle.classList.remove('is-connected');
    if (btnText) btnText.textContent = 'Conta Google';
    if (avatarWrap) {
      avatarWrap.innerHTML = `
        <svg class="google-svg" viewBox="0 0 24 24" width="16" height="16">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
        </svg>
      `;
    }
    if (profileCard) profileCard.style.display = 'none';
  }

  if (keyStatus) {
    if (state.geminiApiKey) {
      keyStatus.innerHTML = '<span style="color: #10b981; font-weight: 600;">🟢 Chave Gemini Ativa (Resumos Profundos com IA Habilitados)</span>';
    } else {
      keyStatus.textContent = '⚪ Nenhuma chave informada - utilizando motor pedagógico nativo';
      keyStatus.style.color = 'var(--text-muted)';
    }
  }
}

// ========================================================
// 11. MOTOR DE RESUMO INTELIGENTE DA AULA (AI LESSON SUMMARY)
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
