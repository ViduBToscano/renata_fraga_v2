/* ============================================================
   MAIN — Entry point
   Inicializa todos os módulos na ordem correta.

   Ordem dos scripts no HTML:
     1. assets/js/utils.js
     2. assets/js/animations.js
     3. assets/js/scroll.js
     4. assets/js/wapp-chat.js
     5. assets/js/main.js  < este arquivo
============================================================ */
(function () {
  "use strict";

  function init() {
    var RF = window.RF || {};

    /* 1. Fade-in genérico (IntersectionObserver) */
    if (RF.initFadeIn) RF.initFadeIn();

    /* 2. Smooth scroll por âncora */
    if (RF.initSmoothScroll) RF.initSmoothScroll();

    /* 3. Dots do carrossel de vídeos (mobile) */
    if (RF.initVideoDots) RF.initVideoDots();

    /* 4. Contador animado nos Big Numbers */
    if (RF.initCounters) RF.initCounters();

    /* 5. Linha conectora + ativação sequencial dos process steps */
    if (RF.initProcessSteps) RF.initProcessSteps();

    /* 6. Simulação de conversa no mockup WhatsApp */
    if (RF.initWappChat) RF.initWappChat();
  }

  /* Garante execução após o DOM estar pronto */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
