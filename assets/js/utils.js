/* ============================================================
   UTILS — Funções auxiliares reutilizáveis
   Não acessa o DOM diretamente. Exporta via window.RF.utils
============================================================ */
(function () {
  "use strict";

  /**
   * Limita a frequência de chamadas de uma função (ex: resize, scroll).
   * @param {Function} fn
   * @param {number} delay — milissegundos
   * @returns {Function}
   */
  function debounce(fn, delay) {
    var timer;
    return function () {
      var ctx = this;
      var args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(ctx, args);
      }, delay);
    };
  }

  /**
   * Sanitiza string para uso seguro em seletores CSS / IDs.
   * Remove caracteres inválidos, substitui espaços por traços.
   * @param {string} str
   * @returns {string}
   */
  function sanitizeSelector(str) {
    return str
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-_]/g, "");
  }

  // Expõe para outros módulos
  window.RF = window.RF || {};
  window.RF.utils = {
    debounce: debounce,
    sanitizeSelector: sanitizeSelector,
  };
})();
