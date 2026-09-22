/* RomsFull-Init-v2.0.js | Autor: Robinson Avila | By: WinDroidMODs */

(function() {
  'use strict';

  // Configuración global que se inyecta desde el XML de Blogger
  var CONFIG = window.ROMSFULL_CONFIG || {};

  // 1. Aplicar tema guardado (dark/light)
  var themeCheckbox = document.getElementById('theme-toggle');
  var currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'light') {
    document.body.classList.add('light-theme');
    if (themeCheckbox) themeCheckbox.checked = true;
  } else {
    document.body.classList.remove('light-theme');
    if (themeCheckbox) themeCheckbox.checked = false;
  }
  if (themeCheckbox) {
    themeCheckbox.addEventListener('change', function() {
      var isLight = this.checked;
      if (isLight) {
        document.body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
      } else {
        document.body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
      }
    });
  }

  // 2. Inyectar URLs base de Blogger para los scripts de feed
  if (CONFIG.homepageUrl) {
    window.ROMSFULL_BLOG_URL = CONFIG.homepageUrl;
  }
  if (CONFIG.searchUrl) {
    window.ROMSFULL_SEARCH_URL = CONFIG.searchUrl;
  }

  // 3. Inicializar filtros de etiquetas (w, z, v) en breadcrumbs y widget
  function shouldHideLabel(text) {
    var t = text.trim();
    if (/^v\d+(\.\d+)?$/i.test(t)) return true;
    if (/^z\d+(\.\d+)?$/i.test(t)) return true;
    if (/^w[a-zA-Z0-9-]+/i.test(t)) return true;
    return false;
  }
  function filterBreadcrumbs() {
    var breadcrumbs = document.querySelectorAll('.breadcrumbs a');
    breadcrumbs.forEach(function(link) {
      if (shouldHideLabel(link.textContent)) {
        var prev = link.previousElementSibling;
        if (prev && prev.classList.contains('separator')) prev.remove();
        link.remove();
      }
    });
  }
  function filterLabelWidget() {
    var labelWidgets = document.querySelectorAll('.sidebar .tag-cloud, .sidebar .widget-content, #Label1 .widget-content');
    labelWidgets.forEach(function(widget) {
      widget.querySelectorAll('a').forEach(function(link) {
        if (shouldHideLabel(link.textContent)) {
          var parentLi = link.closest('li');
          if (parentLi) parentLi.remove();
          else link.remove();
        }
      });
    });
  }
  function runFilters() { filterBreadcrumbs(); filterLabelWidget(); }
  document.addEventListener('DOMContentLoaded', function() {
    runFilters();
    setTimeout(runFilters, 1000);
    setTimeout(runFilters, 2500);
  });

  // 4. Lógica de comentarios (toggle, reply)
  window.toggleCommentForm = function() {
    var wrapper = document.getElementById('comment-form-wrapper');
    var btn = document.getElementById('comment-toggle-btn');
    if (!wrapper || !btn) return;
    wrapper.classList.toggle('show');
    if (wrapper.classList.contains('show')) {
      btn.innerHTML = '<i class="fas fa-times"></i><span>Cancelar</span>';
      setTimeout(function() { wrapper.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 100);
    } else {
      btn.innerHTML = '<i class="fas fa-comment-dots"></i><span>Dejar un comentario</span>';
    }
  };

  window.replyToComment = function(button) {
    var commentId = button.getAttribute('data-comment-id');
    var author = button.getAttribute('data-comment-author');
    var notice = document.getElementById('reply-notice');
    var authorSpan = document.getElementById('reply-author-name');
    var editor = document.getElementById('comment-editor');
    var formSrc = document.getElementById('comment-editor-src') ? document.getElementById('comment-editor-src').href : null;
    var wrapper = document.getElementById('comment-form-wrapper');
    var toggleBtn = document.getElementById('comment-toggle-btn');
    if (wrapper && !wrapper.classList.contains('show')) {
      wrapper.classList.add('show');
      if (toggleBtn) toggleBtn.innerHTML = '<i class="fas fa-times"></i><span>Cancelar</span>';
    }
    if (notice && authorSpan && editor && formSrc) {
      authorSpan.textContent = 'Respondiendo a ' + author;
      notice.classList.add('show');
      editor.src = formSrc + '&parentID=' + commentId;
      editor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  window.cancelReply = function() {
    var notice = document.getElementById('reply-notice');
    var editor = document.getElementById('comment-editor');
    var formSrc = document.getElementById('comment-editor-src') ? document.getElementById('comment-editor-src').href : null;
    if (notice && editor && formSrc) { notice.classList.remove('show'); editor.src = formSrc; }
  };

})();
