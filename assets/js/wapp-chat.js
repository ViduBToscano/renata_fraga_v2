/* ============================================================
   WAPP CHAT — Simulação de conversa em tempo real
   Anima o mockup do WhatsApp como uma conversa real:
   typing indicator → mensagem → delay → próxima mensagem.
   Faz loop suave e contínuo sem ficar repetitivo.
============================================================ */
(function () {
  "use strict";

  /*
   * CONFIG
   * Ajuste os tempos para calibrar o ritmo humano da conversa.
   */
  var CONFIG = {
    initialDelay: 1000, // ms antes de iniciar (após entrar na viewport)
    typingDuration: 1000, // ms que o "digitando..." aparece antes de cada msg
    msgDelay: 1800, // ms entre o fim de uma msg e o início da próxima
    loopPause: 4000, // ms de pausa antes de reiniciar o loop
    restartFade: 600, // ms para apagar todas as msgs antes de reiniciar
  };

  /* ---- Helpers ------------------------------------------- */
  function showTyping(typingEl) {
    typingEl.classList.add("is-visible");
  }

  function hideTyping(typingEl) {
    typingEl.classList.remove("is-visible");
  }

  function showMessage(msgEl) {
    msgEl.classList.add("is-visible");
  }

  // function hideAllMessages(msgEls) {
  //   msgEls.forEach(function (el) {
  //     el.classList.remove('is-visible');
  //     /* Reset para permitir re-animação */
  //     void el.offsetWidth;
  //   });
  // }
  /* Substitua a função hideAllMessages no seu assets/js/wapp-chat.js */
  function hideAllMessages(msgEls) {
    // 1. Removemos a classe de todos primeiro (sem ler propriedades)
    msgEls.forEach(function (el) {
      el.classList.remove("is-visible");
    });

    // 2. Forçamos o reflow UMA ÚNICA VEZ no container pai,
    // em vez de forçar em cada mensagem individualmente.
    if (msgEls.length > 0) {
      void msgEls[0].parentNode.offsetWidth;
    }
  }

  /* ---- Loop principal ------------------------------------ */
  function runLoop(typingEl, msgEls, index) {
    if (index >= msgEls.length) {
      /* Fim do loop: pausa → apaga tudo → reinicia */
      setTimeout(function () {
        hideTyping(typingEl);
        hideAllMessages(msgEls);
        setTimeout(function () {
          runLoop(typingEl, msgEls, 0);
        }, CONFIG.restartFade);
      }, CONFIG.loopPause);
      return;
    }

    var msg = msgEls[index];
    var isLast = index === msgEls.length - 1;

    /* Mostra typing antes de cada mensagem */
    showTyping(typingEl);

    setTimeout(function () {
      hideTyping(typingEl);
      showMessage(msg);

      /* Próxima mensagem (se não for a última) */
      if (!isLast) {
        setTimeout(function () {
          runLoop(typingEl, msgEls, index + 1);
        }, CONFIG.msgDelay);
      } else {
        /* Última mensagem: aguarda e reinicia */
        setTimeout(function () {
          hideAllMessages(msgEls);
          setTimeout(function () {
            runLoop(typingEl, msgEls, 0);
          }, CONFIG.restartFade);
        }, CONFIG.loopPause);
      }
    }, CONFIG.typingDuration);
  }

  /* ---- Init ---------------------------------------------- */
  function initWappChat() {
    var mockup = document.querySelector(".wapp-mockup");
    var typingEl = document.querySelector(".wapp-typing");
    var msgEls = document.querySelectorAll(".wapp-row");

    if (!mockup || !typingEl || !msgEls.length) return;

    /* Observa quando o mockup entra na viewport para iniciar */
    var started = false;
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !started) {
            started = true;
            observer.unobserve(mockup);

            setTimeout(function () {
              runLoop(typingEl, Array.from(msgEls), 0);
            }, CONFIG.initialDelay);
          }
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(mockup);
  }

  /* ---- Expõe para main.js -------------------------------- */
  window.RF = window.RF || {};
  window.RF.initWappChat = initWappChat;
})();
