/**
 * Injects the 20-article grid into index.html between HTML markers (UTF-8).
 * Run from generate-articles.js and generate-site.js after catalog changes.
 */
const fs = require('fs');
const path = require('path');
const { ARTICLES } = require('./articles-catalog');

const START = '<!-- HOME_AUTHORITY_ARTICLES_AUTOGEN_START -->';
const END = '<!-- HOME_AUTHORITY_ARTICLES_AUTOGEN_END -->';

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Short card blurb for layout (avoids overflow; full text stays on article + hub). */
function blurb(text, max = 120) {
  const t = String(text).replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const slice = t.slice(0, max);
  const i = slice.lastIndexOf(' ');
  const cut = (i > 35 ? slice.slice(0, i) : slice).trim();
  return `${cut}...`;
}

function renderHomeAuthorityBlock() {
  const items = ARTICLES.map((a) => {
    const title = escapeHtml(a.h1);
    const desc = escapeHtml(blurb(a.description));
    return `      <li class="home-article-item">
        <a class="home-article-card" href="/articles/${a.slug}.html" aria-label="${title} — read full guide">
          <span class="home-article-title">${title}</span>
          <span class="home-article-desc">${desc}</span>
          <span class="home-article-cta"><span class="home-article-cta-text">Learn more</span><span class="home-article-cta-arrow" aria-hidden="true">→</span></span>
        </a>
      </li>`;
  }).join('\n');
  return `<ul class="home-articles-grid" aria-label="Moringa guides">\n${items}\n      </ul>
      <p class="home-articles-footer"><a class="home-articles-hub-link" href="/articles/">All guides &amp; Amazon shortcuts &rarr;</a></p>`;
}

function patchIndexAuthority(repoRoot) {
  const indexPath = path.join(repoRoot, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.warn('patch-index-authority: index.html not found');
    return;
  }
  let html = fs.readFileSync(indexPath, 'utf8');
  if (!html.includes(START) || !html.includes(END)) {
    console.warn('patch-index-authority: markers missing in index.html — add HOME_AUTHORITY_ARTICLES_AUTOGEN_START/END');
    return;
  }
  const re = new RegExp(`${START}[\\s\\S]*?${END}`, 'm');
  html = html.replace(re, `${START}\n${renderHomeAuthorityBlock()}\n      ${END}`);
  fs.writeFileSync(indexPath, html, 'utf8');
  console.log('patched index.html (authority articles block)');
}

module.exports = { patchIndexAuthority, renderHomeAuthorityBlock };
