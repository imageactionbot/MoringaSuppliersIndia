/**
 * Primary Open Graph locale en_US (US English readers / Amazon.com angle).
 * Keeps en_IN as og:locale:alternate for honest India sourcing context.
 * Run: node scripts/set-og-locale-en-us-primary.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const SKIP = new Set(['node_modules', '.git', 'content', 'docs']);

const OLD = /<meta property="og:locale" content="en_IN" \/>/g;

const NEW = `<meta property="og:locale" content="en_US" />
  <meta property="og:locale:alternate" content="en_IN" />`;

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
  if (!html.includes('content="en_IN"') || !html.includes('og:locale')) return;
  if (html.includes('content="en_US"') && html.includes('og:locale:alternate')) return;
  const next = html.replace(OLD, NEW);
  if (next !== html) {
    fs.writeFileSync(file, next, 'utf8');
    files += 1;
  }
});

console.log(`set-og-locale-en-us-primary: updated ${files} HTML file(s)`);
