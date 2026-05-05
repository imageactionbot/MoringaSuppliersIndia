/**
 * Replace inline SVG + text brand mark with /logo.svg + alt (nav + footer).
 * Run from repo root: node scripts/patch-brand-logo-markup.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const SKIP = new Set(['node_modules', '.git', 'content', 'docs']);

const NAV_RE =
  /(\s*)<a href="\/" class="logo">\s*<svg[\s\S]*?<\/svg>\s*Moringa<span>Suppliers<\/span>India\s*<\/a>/g;
const FOOT_RE =
  /(\s*)<div class="footer-brand-logo">\s*<svg[\s\S]*?<\/svg>\s*Moringa<span>Suppliers<\/span>India\s*<\/div>/g;

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
  html = html.replace(
    NAV_RE,
    (_, indent) =>
      `${indent}<a href="/" class="logo"><img src="/logo.svg" width="32" height="32" alt="Moringa Suppliers India" decoding="async" /></a>`
  );
  html = html.replace(
    FOOT_RE,
    (_, indent) =>
      `${indent}<div class="footer-brand-logo"><img src="/logo.svg" width="28" height="28" alt="Moringa Suppliers India" decoding="async" /></div>`
  );
  if (html !== orig) {
    fs.writeFileSync(file, html, 'utf8');
    files += 1;
  }
});
console.log(`patch-brand-logo-markup: updated ${files} HTML file(s)`);
