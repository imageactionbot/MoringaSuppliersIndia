(function () {
  'use strict';

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
    if (toggle && mobileMenu) {
      toggle.addEventListener('click', function () {
        mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
      });
      mobileMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          mobileMenu.style.display = 'none';
        });
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
