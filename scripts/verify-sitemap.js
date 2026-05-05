/**
 * Compare articles/*.html (except index) with <loc> entries in sitemap.xml.
 * Run: node scripts/verify-sitemap.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const base = 'https://www.moringasuppliersindia.com';

const sm = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const locs = new Set([...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));

const arts = fs
  .readdirSync(path.join(root, 'articles'))
  .filter((f) => f.endsWith('.html') && f !== 'index.html')
  .map((f) => `${base}/articles/${f}`);

const missing = arts.filter((u) => !locs.has(u));
const extras = [...locs].filter(
  (u) => u.includes('/articles/') && u.endsWith('.html') && !arts.includes(u)
);

console.log('Articles on disk:', arts.length);
console.log('Missing from sitemap:', missing.length);
if (missing.length) console.log(missing.join('\n'));
console.log('Sitemap article URLs not on disk:', extras.length);
if (extras.length) console.log(extras.join('\n'));
process.exit(missing.length || extras.length ? 1 : 0);
