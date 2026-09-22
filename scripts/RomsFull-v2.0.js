/* RomsFull-v2.0.js | Autor: Robinson Avila | By: WinDroidMODs */

(function(){
  'use strict';

  // ===== COOKIE BANNER =====
  var cookieBanner = document.getElementById('cookie-banner');
  if (cookieBanner && !localStorage.getItem('cookieConsent')) {
    cookieBanner.style.display = 'flex';
    document.getElementById('cookie-accept').addEventListener('click', function(){
      localStorage.setItem('cookieConsent', 'accepted');
      cookieBanner.style.display = 'none';
    });
    document.getElementById('cookie-reject').addEventListener('click', function(){
      localStorage.setItem('cookieConsent', 'rejected');
      cookieBanner.style.display = 'none';
    });
  }

  // ===== BACK TO TOP =====
  var header = document.getElementById('header');
  var backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 80) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
    var umbralScroll = document.documentElement.scrollHeight * 0.4;
    if (window.scrollY > umbralScroll) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
  });
  if (backToTop) {
    backToTop.addEventListener('click', function(){
      window.scrollTo({top:0, behavior:'smooth'});
    });
  }

  // ===== UTILIDAD GLOBAL: FILTRAR ETIQUETAS PERMITIDAS =====
  window.getAllowedTag = function(categories) {
    var allowed = ['PSP', 'APK', 'PC', 'IOS'];
    for (var i = 0; i < categories.length; i++) {
      var c = categories[i].trim().toUpperCase();
      if (allowed.indexOf(c) !== -1) return c;
    }
    return '';
  };

  // ===== WIDGET WHATSAPP (tooltip) =====
  document.addEventListener("DOMContentLoaded", function() {
    var btn = document.querySelector("#whatsapp-floating-widget a");
    var tooltip = document.querySelector("#whatsapp-floating-widget .tooltip");
    var shown = false;
    var timer;
    if (!btn || !tooltip) return;

    function showTooltip() {
      tooltip.style.visibility = "visible";
      tooltip.style.opacity = "1";
      tooltip.style.left = window.innerWidth <= 768 ? "70px" : "85px";
    }
    function hideTooltip() {
      tooltip.style.opacity = "0";
      tooltip.style.visibility = "hidden";
    }
    timer = setTimeout(function() {
      if (!shown) { showTooltip(); shown = true; setTimeout(hideTooltip, 5000); }
    }, 10000);
    btn.addEventListener("mouseenter", function() { clearTimeout(timer); showTooltip(); });
    btn.addEventListener("mouseleave", function() { hideTooltip(); });
    btn.addEventListener("click", function() {
      hideTooltip();
      shown = true;
      clearTimeout(timer);
    });
  });

})();
