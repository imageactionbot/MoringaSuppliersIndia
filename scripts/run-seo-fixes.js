/**
 * One-shot SEO hygiene pass (safe to re-run):
 * - Unify main.css / main.js ?v= with site-shell ASSET_VER
 * - Articles hub: CollectionPage uses numberOfItems (full count), drops incomplete hasPart
 * - Articles hub hero stat sync
 * - Publisher aside on article detail pages (before container closes)
 * - Footer owner line → publisher credentials + ImageActionBot link
 *
 * Run from repo root: node scripts/run-seo-fixes.js
 */
const fs = require('fs');
const path = require('path');

const ASSET_VER = require('./lib/site-shell').ASSET_VER;
const root = path.join(__dirname, '..');

const SKIP_DIRS = new Set(['node_modules', '.git', 'content']);

const FOOTER_OLD =
  '<p class="footer-owner-line">Avinash Chauhan &middot; Independent developer &amp; site owner</p>';
/** Some pages used U+00B7 middle dot instead of &middot; */
const FOOTER_OLD_MIDDLEDOT =
  '<p class="footer-owner-line">Avinash Chauhan · Independent developer &amp; site owner</p>';
const FOOTER_NEW =
  '<p class="footer-owner-line">Avinash Chauhan &middot; Publisher &middot; B.Sc. CS (University of Mumbai) &middot; <a href="https://imageactionbot.com" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:underline;text-underline-offset:2px;">ImageActionBot</a></p>';

function walkHtml(dir, cb) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(ent.name)) continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkHtml(p, cb);
    else if (ent.name.endsWith('.html')) cb(p);
  }
}

function normalizeAssets(html) {
  return html
    .replace(/\/assets\/css\/main\.css\?v=\d+/g, `/assets/css/main.css?v=${ASSET_VER}`)
    .replace(/\/assets\/js\/main\.js\?v=\d+/g, `/assets/js/main.js?v=${ASSET_VER}`);
}

function injectPublisherAside(html) {
  const MARKER = 'article-publisher-aside:v1';
  if (html.includes(MARKER)) return html;
  const ra = html.lastIndexOf('class="related-articles"');
  if (ra === -1) return html;
  const tail = html.slice(ra);
  const re = /\r?\n(?:\r?\n)?    <\/div>\r?\n  <\/article>\r?\n<\/main>/;
  const m = tail.match(re);
  if (!m) return html;
  const nl = m[0].startsWith('\r\n') ? '\r\n' : '\n';
  const aside =
    `${nl}<!-- article-publisher-aside:v1 -->${nl}<aside class="article-publisher-aside" role="note" style="margin-top:2rem;padding:1rem 1.25rem;background:var(--green-ultra);border-radius:var(--radius-sm);border-left:4px solid var(--green-main);font-size:0.95rem;line-height:1.65;color:var(--text-body);"><strong>About the publisher:</strong> Avinash Chauhan publishes this site independently &mdash; disclosures &amp; roadmap on <a href="/about.html">About us</a>. Sourcing introductions: <a href="mailto:moringasuppliersindia@gmail.com">moringasuppliersindia@gmail.com</a>.</aside>`;
  const insertPos = ra + m.index;
  return html.slice(0, insertPos) + aside + html.slice(insertPos);
}

function patchArticlesHub() {
  const articlesDir = path.join(root, 'articles');
  const nArticle = fs.readdirSync(articlesDir).filter((f) => f.endsWith('.html') && f !== 'index.html').length;
  const hubPath = path.join(articlesDir, 'index.html');
  let hubHtml = fs.readFileSync(hubPath, 'utf8');

  const scriptMatch = hubHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (scriptMatch) {
    const data = JSON.parse(scriptMatch[1]);
    const graph = data['@graph'];
    const cp = graph.find((x) => x['@type'] === 'CollectionPage');
    if (cp) {
      delete cp.hasPart;
      cp.numberOfItems = nArticle;
      cp.description =
        cp.description ||
        'Editorial guides on Moringa oleifera from India — farming, export, processing, buyers, retail education and verification.';
    }
    const newScript = `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
    hubHtml = hubHtml.replace(scriptMatch[0], newScript);
  }

  hubHtml = hubHtml.replace(
    /<div class="phs-value">\d+<\/div><div class="phs-label">Authority articles<\/div>/,
    `<div class="phs-value">${nArticle}</div><div class="phs-label">Authority articles</div>`
  );

  hubHtml = normalizeAssets(hubHtml);
  fs.writeFileSync(hubPath, hubHtml, 'utf8');
  console.log('patched articles/index.html — CollectionPage numberOfItems:', nArticle);
}

function main() {
  walkHtml(root, (filePath) => {
    let html = fs.readFileSync(filePath, 'utf8');
    let next = normalizeAssets(html);
    if (html.includes(FOOTER_OLD)) next = next.split(FOOTER_OLD).join(FOOTER_NEW);
    if (html.includes(FOOTER_OLD_MIDDLEDOT))
      next = next.split(FOOTER_OLD_MIDDLEDOT).join(FOOTER_NEW);

    const rel = path.relative(root, filePath).replace(/\\/g, '/');
    if (rel.startsWith('articles/') && rel !== 'articles/index.html') {
      next = injectPublisherAside(next);
    }

    if (next !== html) fs.writeFileSync(filePath, next, 'utf8');
  });

  patchArticlesHub();
  console.log('run-seo-fixes.js done — asset ver', ASSET_VER);
}

main();
