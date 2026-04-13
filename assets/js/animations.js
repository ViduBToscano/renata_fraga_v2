/* ============================================================
   ANIMATIONS — IntersectionObserver + Counter + Process Steps
   Módulo principal de animações scroll-triggered.
============================================================ */
(function () {
  "use strict";

  /* ---- 1. Fade-in base ----------------------------------- */
  function initFadeIn() {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -60px 0px",
        threshold: 0.12,
      },
    );

    document
      .querySelectorAll(".fade-in, .fade-in-group")
      .forEach(function (el) {
        observer.observe(el);
      });
  }

  /* ---- 2. Counter animado (Big Numbers) ------------------ */
  /*
   * Anima o número de 0 até data-target com easing out-cubic.
   * Suporta prefixo (ex: "+") e sufixo (ex: " mil").
   * Adiciona classe .is-counting para o pop de entrada.
   */
  function animateCounter(el, target, duration) {
    var prefix = el.dataset.prefix || "";
    var suffix = el.dataset.suffix || "";
    var startTs = null;

    el.classList.add("is-counting");

    function step(timestamp) {
      if (!startTs) startTs = timestamp;
      var progress = Math.min((timestamp - startTs) / duration, 1);
      // Ease out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * target);
      el.textContent = prefix + current + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = prefix + target + suffix;
        el.classList.remove("is-counting");
      }
    }
    requestAnimationFrame(step);
  }

  function initCounters() {
    var counters = document.querySelectorAll(".stat-number[data-target]");
    if (!counters.length) return;

    var triggered = false;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !triggered) {
            triggered = true;
            counters.forEach(function (el) {
              var target = parseInt(el.dataset.target, 10);
              var duration = parseInt(el.dataset.duration, 10) || 1800;
              animateCounter(el, target, duration);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );

    // Observa a stats-bar como trigger
    var statsBar = document.querySelector(".stats-bar");
    if (statsBar) observer.observe(statsBar);
  }

  /* ---- 3. Process Steps — linha conectora + ativação ------ */
  /*
   * Quando .process-grid entra na viewport:
   * 1. Adiciona .is-active no grid → linha começa a crescer (CSS transition)
   * 2. Ativa cada step com delay escalonado
   *    (match com a duração da transition de 1.8s)
   *
   * Delays calculados para a linha "alcançar" cada step:
   *   Step 1 → 200ms  (imediato, left: 12.5%)
   *   Step 2 → 700ms  (~33% da linha, 1.8s × 0.33 + 0.2s)
   *   Step 3 → 1200ms (~66%)
   *   Step 4 → 1700ms (~99%)
   */
  var STEP_DELAYS = [200, 700, 1200, 1700];

  function initProcessSteps() {
    var grid = document.querySelector(".process-grid");
    if (!grid) return;

    var steps = grid.querySelectorAll(".process-step");

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Linha começa a crescer
            grid.classList.add("is-active");

            // Cada step ativa quando a linha "chega"
            steps.forEach(function (step, i) {
              var delay =
                STEP_DELAYS[i] !== undefined ? STEP_DELAYS[i] : i * 500;
              setTimeout(function () {
                step.classList.add("is-active");
              }, delay);
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(grid);
  }

  /* ---- Expõe para main.js -------------------------------- */
  window.RF = window.RF || {};
  window.RF.initFadeIn = initFadeIn;
  window.RF.initCounters = initCounters;
  window.RF.initProcessSteps = initProcessSteps;
})();
