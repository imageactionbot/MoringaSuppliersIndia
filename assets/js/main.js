/**
 * Site UI: expects markup/CSS from /assets/css/main.css and shared nav/footer.
 * Elements: #navbar, #scrollTopBtn, #mobileToggle, #mobileMenu, #navMobileBackdrop,
 *           #cookieNotice, #acceptCookies, a[href^="#"], .reveal
 */
(function () {
  'use strict';

  function setMobileNavOpen(open) {
    var toggle = document.getElementById('mobileToggle');
    var mobileMenu = document.getElementById('mobileMenu');
    var backdrop = document.getElementById('navMobileBackdrop');
    if (!toggle || !mobileMenu) return;

    if (open) {
      mobileMenu.removeAttribute('hidden');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
      toggle.classList.add('is-open');
      document.body.classList.add('has-mobile-nav');
      if (backdrop) {
        backdrop.removeAttribute('hidden');
        backdrop.setAttribute('aria-hidden', 'false');
      }
    } else {
      mobileMenu.setAttribute('hidden', '');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      toggle.classList.remove('is-open');
      document.body.classList.remove('has-mobile-nav');
      if (backdrop) {
        backdrop.setAttribute('hidden', '');
        backdrop.setAttribute('aria-hidden', 'true');
      }
    }
  }

  function init() {
    var navbar = document.getElementById('navbar');
    var scrollTopBtn = document.getElementById('scrollTopBtn');

    if (navbar && scrollTopBtn) {
      window.addEventListener('scroll', function () {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
        scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
      });
    }

    var toggle = document.getElementById('mobileToggle');
    var mobileMenu = document.getElementById('mobileMenu');
    var backdrop = document.getElementById('navMobileBackdrop');

    if (toggle && mobileMenu) {
      toggle.addEventListener('click', function () {
        var open = toggle.getAttribute('aria-expanded') === 'true';
        setMobileNavOpen(!open);
      });

      mobileMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          setMobileNavOpen(false);
        });
      });

      if (backdrop) {
        backdrop.addEventListener('click', function () {
          setMobileNavOpen(false);
        });
      }

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && document.body.classList.contains('has-mobile-nav')) {
          setMobileNavOpen(false);
          toggle.focus();
        }
      });
    }

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href.length > 1) {
          var target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });

    if (scrollTopBtn) {
      scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    var cookieNotice = document.getElementById('cookieNotice');
    var acceptBtn = document.getElementById('acceptCookies');
    if (cookieNotice && acceptBtn) {
      if (!localStorage.getItem('cookiesAccepted')) {
        cookieNotice.style.display = 'flex';
      }
      acceptBtn.addEventListener('click', function () {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieNotice.style.display = 'none';
      });
    }

    var reveals = document.querySelectorAll('.reveal');
    if (reveals.length && 'IntersectionObserver' in window) {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      reveals.forEach(function (el) {
        revealObserver.observe(el);
      });
    }

    var priceBar = document.getElementById('priceRealityBar');
    var priceDismiss = document.getElementById('priceRealityDismiss');
    if (priceBar && priceDismiss) {
      if (sessionStorage.getItem('priceRealityDismissed') === '1') {
        priceBar.style.display = 'none';
        priceBar.setAttribute('hidden', '');
      } else {
        priceBar.removeAttribute('hidden');
        document.body.classList.add('has-price-bar');
      }
      priceDismiss.addEventListener('click', function () {
        sessionStorage.setItem('priceRealityDismissed', '1');
        priceBar.style.display = 'none';
        priceBar.setAttribute('hidden', '');
        document.body.classList.remove('has-price-bar');
      });
    }

    var gToggle = document.getElementById('guideAssistToggle');
    var gPanel = document.getElementById('guideAssistPanel');
    var gClose = document.getElementById('guideAssistClose');
    var gRoot = document.getElementById('guideAssist');
    function guideOpen(yes) {
      if (!gPanel || !gToggle) return;
      if (yes) {
        gPanel.removeAttribute('hidden');
        gToggle.setAttribute('aria-expanded', 'true');
      } else {
        gPanel.setAttribute('hidden', '');
        gToggle.setAttribute('aria-expanded', 'false');
      }
    }
    if (gToggle && gPanel) {
      gToggle.addEventListener('click', function () {
        guideOpen(gPanel.hasAttribute('hidden'));
      });
      if (gClose) gClose.addEventListener('click', function () { guideOpen(false); });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && gPanel && !gPanel.hasAttribute('hidden')) guideOpen(false);
      });
      if (gRoot) {
        document.addEventListener('click', function (e) {
          if (!gPanel.hasAttribute('hidden') && !gRoot.contains(e.target)) guideOpen(false);
        });
      }
    }

    var kgEl = document.getElementById('kgInput');
    var lbEl = document.getElementById('lbInput');
    if (kgEl && lbEl) {
      var convLock = false;
      var LB_PER_KG = 2.20462262;
      function trimNum(s) {
        return s.replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '');
      }
      kgEl.addEventListener('input', function () {
        if (convLock) return;
        convLock = true;
        var v = parseFloat(kgEl.value);
        lbEl.value = v >= 0 && !isNaN(v) ? trimNum((v * LB_PER_KG).toFixed(6)) : '';
        convLock = false;
      });
      lbEl.addEventListener('input', function () {
        if (convLock) return;
        convLock = true;
        var v = parseFloat(lbEl.value);
        kgEl.value = v >= 0 && !isNaN(v) ? trimNum((v / LB_PER_KG).toFixed(6)) : '';
        convLock = false;
      });
    }

    var printChk = document.getElementById('printChecklistBtn');
    if (printChk) {
      printChk.addEventListener('click', function () {
        window.print();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
