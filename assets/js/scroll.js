/* ============================================================
   SCROLL — Smooth scroll por âncora + Dots do carrossel de vídeos
   Chamado por main.js via window.RF.initSmoothScroll() e initVideoDots()
============================================================ */
(function () {
  "use strict";

  /* --- Smooth Scroll -------------------------------------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        var target = document.querySelector(this.getAttribute("href"));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  /* --- Video Carousel Dots -------------------------------- */
  // function initVideoDots() {
  //   var grid = document.querySelector('.video-grid');
  //   var dots = document.querySelectorAll('.video-dots span');
  //   if (!grid || !dots.length) return;

  //   // Atualiza dot ativo ao rolar o carrossel
  //   grid.addEventListener('scroll', function () {
  //     var index = Math.round(grid.scrollLeft / grid.offsetWidth);
  //     dots.forEach(function (dot, i) {
  //       dot.classList.toggle('active', i === index);
  //     });
  //   });

  //   // Clique no dot navega para o vídeo correspondente
  //   dots.forEach(function (dot, i) {
  //     dot.addEventListener('click', function () {
  //       grid.scrollTo({ left: i * grid.offsetWidth, behavior: 'smooth' });
  //     });
  //   });
  // }

  /* Substitua a função initVideoDots no seu assets/js/scroll.js */
  function initVideoDots() {
    var grid = document.querySelector(".video-grid");
    var dots = document.querySelectorAll(".video-dots span");
    if (!grid || !dots.length) return;

    var isScrolling = false;

    // Atualiza dot ativo ao rolar o carrossel
    grid.addEventListener("scroll", function () {
      if (!isScrolling) {
        window.requestAnimationFrame(function () {
          var index = Math.round(grid.scrollLeft / grid.offsetWidth);
          dots.forEach(function (dot, i) {
            dot.classList.toggle("active", i === index);
          });
          isScrolling = false;
        });
        isScrolling = true;
      }
    });
    // Clique no dot navega para o vídeo correspondente
    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        grid.scrollTo({ left: i * grid.offsetWidth, behavior: "smooth" });
      });
    });
  }

  // Expõe para main.js
  window.RF = window.RF || {};
  window.RF.initSmoothScroll = initSmoothScroll;
  window.RF.initVideoDots = initVideoDots;
})();
