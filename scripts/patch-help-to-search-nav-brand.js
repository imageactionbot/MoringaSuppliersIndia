/**
 * Replace Help FAB + panel with Search link + icon; wrap logo + nav search icon in .nav-brand.
 * Run: node scripts/patch-help-to-search-nav-brand.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const SKIP = new Set(['node_modules', '.git', 'content', 'docs']);

const GUIDE_OLD =
  /<div class="guide-assist" id="guideAssist">\s*<button type="button" class="guide-assist-fab" id="guideAssistToggle"[^>]*>Help<\/button>\s*<div class="guide-assist-panel"[\s\S]*?<\/div>\s*<\/div>/g;

const GUIDE_NEW = `<div class="guide-assist" id="guideAssist">
  <a href="/search.html" class="guide-assist-fab guide-assist-fab--search" aria-label="Search all moringa guides and pages on this site"><svg class="guide-assist-fab-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2.2"/><path d="M20 20l-3.5-3.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg><span>Search</span></a>
</div>`;

const NAV_RE =
  /<a href="\/" class="logo"><img src="\/logo\.svg" width="32" height="32" alt="Moringa Suppliers India" decoding="async" \/><\/a>\s*<ul class="nav-links" id="navDesktopLinks">/g;

const NAV_REP = `<div class="nav-brand">
    <a href="/" class="logo"><img src="/logo.svg" width="32" height="32" alt="Moringa Suppliers India" decoding="async" /></a>
    <a href="/search.html" class="nav-search-ic" aria-label="Search site — moringa guides and products"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2.2"/><path d="M20 20l-3.5-3.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg></a>
    </div>
    <ul class="nav-links" id="navDesktopLinks">`;

function walk(dir, cb) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(ent.name)) continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, cb);
    else if (ent.name.endsWith('.html')) cb(p);
  }
}

let files = 0;
walk(root, (file) => {
  let html = fs.readFileSync(file, 'utf8');
  const orig = html;
  if (!html.includes('nav-brand')) html = html.replace(NAV_RE, NAV_REP);
  html = html.replace(GUIDE_OLD, GUIDE_NEW);
  if (html !== orig) {
    fs.writeFileSync(file, html, 'utf8');
    files += 1;
  }
});

console.log(`patch-help-to-search-nav-brand: updated ${files} HTML file(s)`);
