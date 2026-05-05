/**
 * Idempotent: upgrade footer affiliate line to dual Amazon + IndiaMART disclosure.
 * Matches legacy variants (anchor text may differ).
 * Run from repo root: node scripts/patch-footer-affiliate-dual.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const SKIP = new Set(['node_modules', '.git', 'content']);

const FOOTER_LEGACY_RE =
  /<div class="footer-affiliate-line">\s*<strong>Amazon Associates:<\/strong> <em>As an Amazon Associate, I earn from qualifying purchases\.<\/em>\s*<a href="\/legal\/affiliate-disclosure\.html">[^<]*<\/a>\s*<\/div>/g;

const NEW_BLOCK = `      <div class="footer-affiliate-line">
        <strong>Affiliate disclosure:</strong>
        <em>Amazon Associate</em> &mdash; we earn from qualifying Amazon purchases.
        <span class="footer-affiliate-sep" aria-hidden="true">&middot;</span>
        <em>IndiaMART</em> &mdash; we may earn a referral fee on labelled bulk-quote links.
        <a href="/legal/affiliate-disclosure.html">Full policy</a>
      </div>`;

function walkHtml(dir, out) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(ent.name)) continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkHtml(p, out);
    else if (ent.name.endsWith('.html')) out.push(p);
  }
}

function main() {
  const files = [];
  walkHtml(root, files);
  let n = 0;
  for (const p of files) {
    let s = fs.readFileSync(p, 'utf8');
    const orig = s;
    FOOTER_LEGACY_RE.lastIndex = 0;
    s = s.replace(FOOTER_LEGACY_RE, NEW_BLOCK);
    if (s !== orig) {
      fs.writeFileSync(p, s, 'utf8');
      n++;
      console.log(path.relative(root, p).replace(/\\/g, '/'));
    }
  }
  console.log('patched:', n);
}

main();
