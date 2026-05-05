/**
 * One-shot: add Search nav + footer link across static HTML (skip if already present).
 * Run: node scripts/inject-site-search-nav.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const SKIP = new Set(['node_modules', '.git', 'content', 'docs']);

const DESK_NEEDLE = '      <li><a href="/articles/">Articles</a></li>';
const DESK_REPL =
  '      <li><a href="/articles/">Articles</a></li>\n      <li><a href="/search.html">Search</a></li>';
const MOB_NEEDLE = '    <a href="/articles/">Moringa guides</a>';
const MOB_REPL =
  '    <a href="/articles/">Moringa guides</a>\n    <a href="/search.html">Search</a>';
const FOOT_NEEDLE = '          <li><a href="/articles/">Articles library</a></li>';
const FOOT_REPL =
  '          <li><a href="/articles/">Articles library</a></li>\n          <li><a href="/search.html">Site search</a></li>';

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(ent.name)) continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p);
    else if (ent.name.endsWith('.html')) patch(p);
  }
}

function patch(file) {
  let html = fs.readFileSync(file, 'utf8');
  const orig = html;

  // Patch independently: desktop adds href="/search.html">Search first, which must not block mobile/footer.
  if (html.includes(DESK_NEEDLE) && !html.includes(DESK_REPL))
    html = html.replace(DESK_NEEDLE, DESK_REPL);

  if (html.includes(MOB_NEEDLE) && !html.includes(MOB_REPL))
    html = html.replace(MOB_NEEDLE, MOB_REPL);

  if (html.includes(FOOT_NEEDLE) && !html.includes(FOOT_REPL))
    html = html.replace(FOOT_NEEDLE, FOOT_REPL);

  if (html !== orig) fs.writeFileSync(file, html, 'utf8');
}

walk(root);
console.log('inject-site-search-nav: done');
