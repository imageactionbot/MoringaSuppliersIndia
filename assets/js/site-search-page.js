/**
 * Client-side search for /search.html using /search-index.json.
 */
(function () {
  'use strict';

  var input = document.getElementById('siteSearchInput');
  var resultsEl = document.getElementById('siteSearchResults');
  var statusEl = document.getElementById('siteSearchStatus');
  var indexCache = null;
  var debounceTimer;
  var ORIGIN = 'https://www.moringasuppliersindia.com';

  function decodeEntities(s) {
    var ta = document.createElement('textarea');
    ta.innerHTML = s;
    return ta.value;
  }

  function tokenize(q) {
    return q
      .toLowerCase()
      .replace(/[^\w\s-]/g, ' ')
      .split(/\s+/)
      .filter(function (w) {
        return w.length > 1;
      });
  }

  function scoreEntry(entry, words) {
    var title = decodeEntities(entry.t).toLowerCase();
    var desc = decodeEntities(entry.d || '').toLowerCase();
    var path = entry.u.replace(/^https?:\/\/[^/]+/i, '').toLowerCase();
    var sc = 0;
    words.forEach(function (w) {
      if (title.indexOf(w) !== -1) sc += 12;
      if (desc.indexOf(w) !== -1) sc += 4;
      if (path.indexOf(w) !== -1) sc += 3;
    });
    return sc;
  }

  function render(rows) {
    if (!resultsEl) return;
    resultsEl.innerHTML = '';
    if (!rows.length) {
      resultsEl.innerHTML =
        '<p class="site-search-empty">No matches — try broader words (e.g. &ldquo;export&rdquo;, &ldquo;powder&rdquo;, &ldquo;organic&rdquo;).</p>';
      return;
    }
    var ul = document.createElement('ul');
    ul.className = 'site-search-results-list';
    rows.forEach(function (r) {
      var li = document.createElement('li');
      li.className = 'site-search-hit';
      var a = document.createElement('a');
      a.href = r.u;
      var span = document.createElement('span');
      span.className = 'site-search-hit-title';
      span.textContent = decodeEntities(r.t);
      a.appendChild(span);
      var meta = document.createElement('span');
      meta.className = 'site-search-hit-meta';
      meta.textContent = r.s + ' · ' + r.u.replace(ORIGIN, '');
      li.appendChild(a);
      li.appendChild(meta);
      if (r.d) {
        var snip = document.createElement('p');
        snip.className = 'site-search-hit-desc';
        var dd = decodeEntities(r.d);
        snip.textContent = dd.length > 220 ? dd.slice(0, 220) + '…' : dd;
        li.appendChild(snip);
      }
      ul.appendChild(li);
    });
    resultsEl.appendChild(ul);
  }

  function run(q) {
    if (!resultsEl || !statusEl) return;
    q = (q || '').trim();
    if (!indexCache) {
      statusEl.textContent = 'Loading index…';
      return;
    }
    if (!q) {
      statusEl.textContent = 'Type a keyword — titles and descriptions are searched.';
      render([]);
      return;
    }
    var words = tokenize(q);
    if (!words.length) {
      statusEl.textContent = 'Try letters or numbers (minimum 2 characters per word).';
      render([]);
      return;
    }

    var scored = indexCache
      .map(function (e) {
        return { e: e, sc: scoreEntry(e, words) };
      })
      .filter(function (x) {
        return x.sc > 0;
      })
      .sort(function (a, b) {
        return b.sc - a.sc || a.e.t.localeCompare(b.e.t);
      })
      .slice(0, 40);

    statusEl.textContent = scored.length ? 'Top matches (' + scored.length + ')' : 'No matches for those terms.';
    render(
      scored.map(function (x) {
        return x.e;
      })
    );
  }

  function loadIndex(cb) {
    if (indexCache) return cb();
    fetch('/search-index.json', { credentials: 'same-origin' })
      .then(function (r) {
        return r.json();
      })
      .then(function (data) {
        indexCache = Array.isArray(data) ? data : [];
        cb();
      })
      .catch(function () {
        indexCache = [];
        if (statusEl) statusEl.textContent = 'Could not load search index. Refresh or try again later.';
        cb();
      });
  }

  function init() {
    loadIndex(function () {
      var params = new URLSearchParams(window.location.search);
      var qParam = params.get('q');
      if (input && qParam) input.value = qParam;
      run(input ? input.value : '');
    });

    if (input) {
      input.addEventListener('input', function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function () {
          var q = input.value.trim();
          try {
            var u = new URL(window.location.href);
            if (q) u.searchParams.set('q', q);
            else u.searchParams.delete('q');
            window.history.replaceState({}, '', u.pathname + u.search);
          } catch (e) {}
          run(q);
        }, 180);
      });
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          input.value = '';
          run('');
        }
      });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
