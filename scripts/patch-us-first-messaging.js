/**
 * Bulk footer + “home” nav label: audience priority U.S. → India → global.
 * Idempotent. Run from repo root: node scripts/patch-us-first-messaging.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const SKIP = new Set(['node_modules', '.git', 'content']);

const OLD_STANDARD_TAGLINE =
  '<p class="footer-tagline">Independent guides for buyers sourcing Moringa from India and trusted retail options on Amazon (US).</p>';
const NEW_STANDARD_TAGLINE =
  '<p class="footer-tagline">U.S. readers first &mdash; Amazon.com retail (USD) and IndiaMART bulk RFQs (both usable from the United States). India export &amp; supplier verification second. Global readers welcome third. Independent editorial.</p>';

const OLD_INDEX_TAGLINE =
  '<p class="footer-tagline">Independent informational resource for international buyers sourcing Moringa from India. Researched from publicly available trade and government sources.</p>';
const NEW_INDEX_TAGLINE =
  '<p class="footer-tagline">U.S. visitors first: Amazon.com (USD) &amp; IndiaMART bulk quotes (usable from the U.S.). India export documentation &amp; supplier checks second. Global readers third. Research from public trade &amp; government sources where cited.</p>';

const OLD_HOME_LI = '<li><a href="/">India buyer guide (home)</a></li>';
const NEW_HOME_LI = '<li><a href="/">Home &mdash; U.S. retail + India sourcing</a></li>';

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
    const rel = path.relative(root, p).replace(/\\/g, '/');
    if (rel === 'index.html') {
      if (s.includes(OLD_INDEX_TAGLINE)) s = s.split(OLD_INDEX_TAGLINE).join(NEW_INDEX_TAGLINE);
    }
    if (s.includes(OLD_STANDARD_TAGLINE)) s = s.split(OLD_STANDARD_TAGLINE).join(NEW_STANDARD_TAGLINE);
    if (s.includes(OLD_HOME_LI)) s = s.split(OLD_HOME_LI).join(NEW_HOME_LI);
    if (s !== orig) {
      fs.writeFileSync(p, s, 'utf8');
      n++;
      console.log(rel);
    }
  }
  console.log('patched files:', n);
}

main();
