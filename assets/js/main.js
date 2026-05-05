/**
 * Site UI: expects markup/CSS from /assets/css/main.css and shared nav/footer.
 * Elements: #navbar, #scrollTopBtn, #mobileToggle, #mobileMenu, #navMobileBackdrop,
 *           a[href^="#"], .reveal
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
    if (gToggle && gPanel && gToggle.tagName === 'BUTTON') {
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

    function injectRetailUsdInrHint() {
      var sec = document.body && document.body.getAttribute('data-section');
      var path = location.pathname.replace(/\/$/, '') || '/';
      var retail =
        sec === 'product' ||
        sec === 'brand' ||
        sec === 'compare' ||
        path === '/' ||
        path === '/products' ||
        path.indexOf('/brands') === 0 ||
        path.indexOf('/compare') === 0 ||
        path.indexOf('/products') === 0;
      if (!retail) return;
      if (document.getElementById('retailUsdInrHint')) return;
      var el = document.createElement('div');
      el.id = 'retailUsdInrHint';
      el.className = 'retail-usd-inr-hint';
      el.setAttribute('role', 'note');
      el.innerHTML =
        '<strong>USA retail focus:</strong> Amazon guides here quote <strong>US dollars ($)</strong> because listings target Amazon.com (USD checkout). Loading today’s indicative <strong>USD → INR</strong> rate…';
      if (path === '/') {
        var heroC = document.querySelector('.hero .container');
        if (heroC) heroC.insertBefore(el, heroC.firstChild);
      } else {
        var main = document.querySelector('main#main') || document.querySelector('main');
        if (main) main.insertBefore(el, main.firstChild);
      }
      fetch('https://api.frankfurter.app/latest?from=USD&to=INR')
        .then(function (r) {
          return r.json();
        })
        .then(function (data) {
          var rate = data && data.rates && data.rates.INR;
          var date = data && data.date;
          if (!rate) throw new Error('no rate');
          el.innerHTML =
            '<strong>USA retail focus:</strong> Amazon guides quote <strong>US dollars ($)</strong> (Amazon.com). <strong>Indicative FX:</strong> <strong>1 USD ≈ ' +
            rate.toFixed(2) +
            ' INR</strong> <span class="retail-usd-inr-hint__meta">(ECB reference via Frankfurter, date ' +
            date +
            ' — not a bank rate).</span> Farming &amp; export articles may still show <strong>₹</strong> for India-only operating costs.';
        })
        .catch(function () {
          el.innerHTML =
            '<strong>Retail pricing:</strong> Guides quote <strong>US dollars ($)</strong> on Amazon.com. For rough mental math many readers use bands like <strong>1 USD ≈ 83–93 INR</strong>; confirm conversions with your bank or a live FX feed. India domestic cost articles may still use ₹.';
        });
    }

    injectRetailUsdInrHint();

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
