/**
 * Articles hub: client-side search + topic chips (slug heuristics).
 * Loaded only from /articles/index.html.
 */
(function () {
  'use strict';

  function categoriesForSlug(slug) {
    var out = new Set();
    if (
      /supplier|contact-indian|bulk-buyer|private-label|high-quality-moringa|find-verified|verified-moringa-buyers|sell-moringa|international-buyers|moringa-bulk-sourcing-alibaba|indiamart-moringa-buyers-seo/.test(
        slug
      )
    ) {
      out.add('buyers');
    }
    if (
      /export|import-moringa|wholesale|shipping|logistics|countries-moringa|registration-india|license-india|supply-chain|scale-local-to-global|demand-usa|market-size|global-moringa|buyers-worldwide|eu-market|packaging-international|export-quality|profit-margin|profitable-business|earn-from|pricing-strategy|best-countries|international-shipping|sell-moringa-products|export-business|export-requirements|export-license|global-demand|demand-increasing|demand-trends|freight/.test(
        slug
      )
    ) {
      out.add('export');
    }
    if (
      /farming|per-acre|irrigation|climate-yield|risk-management|investment-return|high-yield-farming|vs-cash-crops|one-acre|cost-per-acre|organic-vs-chemical|states-india|income-reality|business-plan-beginners|yield-per-acre|farm\b/.test(
        slug
      )
    ) {
      out.add('farming');
    }
    if (
      /powder-manufacturing|manufacturing-cost|processing-unit|oil-extraction-business|leaf-drying|quality-control-export|packaging-standards-export|certification-organic-export|start-small-scale-moringa-powder|small-scale-moringa-processing|processing/.test(
        slug
      )
    ) {
      out.add('processing');
    }
    if (
      /diabetes|weight-loss|hair-skin|anemia|for-pets|recipes|cooking-daily|detox-tea|face-mask|honey-benefits|benefits-every-age|side-effects|pure-vs-adulterated|vs-spirulina|vs-kale|powder-vs-capsules|powder-benefits|capsules-benefits|oil-benefits|skincare-products|ultimate-moringa|organic-india-vs|diy-moringa|encyclopedia/.test(
        slug
      )
    ) {
      out.add('wellness');
    }
    if (out.size === 0) out.add('general');
    return out;
  }

  function init() {
    var list = document.getElementById('articlesHubList');
    if (!list) return;

    var items = list.querySelectorAll('li');
    var searchEl = document.getElementById('articlesHubSearch');
    var chips = document.querySelectorAll('.articles-hub-chip');
    var countEl = document.getElementById('articlesHubCount');
    var activeFilter = 'all';
    var slugRe = /^\/articles\/([^/]+)\.html$/;

    items.forEach(function (li) {
      var a = li.querySelector('a[href^="/articles/"]');
      if (!a) return;
      var href = a.getAttribute('href') || '';
      var m = href.match(slugRe);
      var slug = m ? m[1] : '';
      li.dataset.hubCats = categoriesForSlug(slug).join(' ');
    });

    function visibleCount() {
      var n = 0;
      items.forEach(function (li) {
        if (!li.classList.contains('is-filter-hidden')) n++;
      });
      return n;
    }

    function apply() {
      var q = searchEl && searchEl.value ? searchEl.value.trim().toLowerCase() : '';
      items.forEach(function (li) {
        var matchText = !q || li.textContent.toLowerCase().indexOf(q) !== -1;
        var cats = li.dataset.hubCats || '';
        var matchCat = activeFilter === 'all' || cats.indexOf(activeFilter) !== -1;
        li.classList.toggle('is-filter-hidden', !(matchText && matchCat));
      });
      if (countEl) {
        countEl.textContent = 'Showing ' + visibleCount() + ' of ' + items.length + ' guides';
      }
    }

    if (searchEl) {
      searchEl.addEventListener('input', apply);
      searchEl.addEventListener('search', apply);
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        activeFilter = chip.getAttribute('data-filter') || 'all';
        chips.forEach(function (c) {
          c.classList.toggle('is-active', c === chip);
        });
        apply();
      });
    });

    apply();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
