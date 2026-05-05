/**
 * Build static JSON index for /search.html (client-side search).
 * Run from repo root: node scripts/build-search-index.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const BASE = 'https://www.moringasuppliersindia.com';
const SKIP_DIRS = new Set(['node_modules', '.git', 'content', 'docs']);

function walk(dir, out) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(ent.name)) continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (ent.name.endsWith('.html')) out.push(p);
  }
}

function extract(html) {
  const t = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const d = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  return {
    title: t ? t[1].replace(/\s+/g, ' ').trim() : '',
    desc: d ? d[1] : '',
  };
}

function skipNoindex(html) {
  const m = html.match(/<meta\s+name="robots"\s+content="([^"]*)"/i);
  return m && /noindex/i.test(m[1]);
}

function toUrl(rel) {
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return '/' + rel.slice(0, -'index.html'.length).replace(/\/$/, '') + '/';
  return '/' + rel;
}

function section(rel) {
  if (rel.startsWith('articles/')) return 'articles';
  if (rel.startsWith('products/')) return 'products';
  if (rel.startsWith('brands/')) return 'brands';
  if (rel.startsWith('compare/')) return 'compare';
  if (rel.startsWith('topics/')) return 'topics';
  if (rel.startsWith('legal/')) return 'legal';
  return 'pages';
}

const files = [];
walk(root, files);

const index = [];
for (const file of files) {
  const rel = path.relative(root, file).replace(/\\/g, '/');
  if (rel === 'search.html') continue;

  const html = fs.readFileSync(file, 'utf8');
  if (skipNoindex(html)) continue;

  const { title, desc } = extract(html);
  if (!title) continue;

  const urlPath = toUrl(rel);
  index.push({
    u: BASE + urlPath,
    t: title,
    d: desc,
    s: section(rel),
  });
}

index.sort((a, b) => a.t.localeCompare(b.t));

const outPath = path.join(root, 'search-index.json');
fs.writeFileSync(outPath, JSON.stringify(index), 'utf8');
console.log('search-index.json entries:', index.length);
