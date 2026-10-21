# Yanik, Translator - Tradução Simultânea Escolar em Tempo Real

Software completo de **tradução simultânea de voz e legendas** desenvolvido especificamente para ambientes escolares multiculturais.

Permite que o **professor fale ao microfone** no seu idioma nativo e que os **alunos ouçam a tradução em tempo real pelo fone de ouvido nos seus celulares ou computadores**, além de possibilitar que os alunos façam perguntas de volta no idioma deles (**vice-versa**).

---

## 🌟 Principais Recursos

1. **Tradução Simultânea Multilíngue Bidirecional**:
   - 🇮🇳 **Hindi (हिन्दी)**
   - 🇧🇷 **Português (Brasil e Portugal)**
   - 🇺🇸 **Inglês (English)**
   - 🇫🇷 **Francês (Français)**
   - 🇪🇸 **Espanhol (Español)**
   - 🇩🇪 **Alemão (Deutsch)**
   - 🇮🇹 **Italiano**
   - 🇸🇦 **Árabe (العربية)**
   - 🇨🇳 **Mandarim (中文)**
   - 🇯🇵 **Japonês**, 🇷🇺 **Russo**, 🇰🇷 **Coreano** e mais de 100 idiomas!

2. **Dois Modos de Acesso Disponíveis**:
   - **Modo 1: Com Servidor (Recomendado para Celulares e Rede Wi-Fi)**:
     - Dê 2 cliques no arquivo **`iniciar.bat`**.
     - O servidor subirá e abrirá a página em `http://localhost:3000`.
     - Permite que qualquer celular conectado ao Wi-Fi da escola escaneie o QR Code e ouça a aula traduzida!
   - **Modo 2: Modo Direto / Offline (Sem Servidor)**:
     - Dê 2 cliques no arquivo **`ABRIR_YANIK_TRANSLATOR.html`** (ou abra `public/index.html`).
     - Funciona direto no navegador com reconhecimento de fala, tradução instantânea e sintetizador de voz, mesmo sem terminal ou Node.js aberto!

3. **Modo Sala de Aula (Transmissão 1-para-Muitos)**:
   - **Professor (Transmissor)**: Fala ao microfone com captura contínua e redução de ruído. Exibe transcrição ao vivo e monitora quantos alunos estão ouvindo em cada idioma.
   - **Alunos (Receptores)**: Cada aluno escolhe seu idioma nativo e ouve a voz sintetizada pelo fone de ouvido no celular, acompanhando a legenda sincronizada na tela.

4. **Recurso Vice-Versa (Aluno Pergunta ao Professor)**:
   - O aluno toca em *"Falar com o Professor"* no celular, fala no idioma dele (ex: Hindi) e o professor ouve e lê a pergunta traduzida na tela do computador em Português!

5. **Modo Diálogo Bilateral 1-para-1**:
   - Ideal para reuniões pedagógicas individuais de professores com pais de alunos estrangeiros ou conversas diretas entre 2 pessoas com tela dividida.

---

## 🚀 Como Executar

### Opção A (Recomendada): Iniciar com o Servidor Local
1. Abra a pasta `Yanik-Translator`.
2. Dê 2 cliques no arquivo **`iniciar.bat`**.
3. O navegador abrirá automaticamente em `http://localhost:3000`.

### Opção B: Abrir Direto sem Servidor
1. Abra a pasta `Yanik-Translator`.
2. Dê 2 cliques no arquivo **`ABRIR_YANIK_TRANSLATOR.html`**.
3. Abrirá diretamente no Google Chrome ou Edge pronto para usar!
