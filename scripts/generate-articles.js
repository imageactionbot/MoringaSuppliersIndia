/**
 * Builds /articles/ hub + 20 long-form authority pages from HTML fragments.
 * Run: node scripts/generate-articles.js
 * Source fragments: content/article-bodies/<slug>.html (edit these).
 * If a new stub is short, run once: node scripts/materialize-missing-bodies.cjs (pads under 1000 words).
 */
const fs = require('fs');
const path = require('path');
const {
  SITE,
  AMZ,
  AFFILIATE_BOX,
  layout,
  write,
  amazonBtn,
  amazonBtnSmall,
} = require('./lib/site-shell');

const root = path.join(__dirname, '..');
const bodiesDir = path.join(root, 'content', 'article-bodies');
const { ARTICLES } = require('./lib/articles-catalog');
const { patchIndexAuthority } = require('./lib/patch-index-authority');

function escHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function relatedBlock(slug) {
  const others = ARTICLES.filter((a) => a.slug !== slug).slice(0, 8);
  const lis = others.map((a) => `<li><a href="/articles/${a.slug}.html">${escHtml(a.h1)}</a></li>`).join('\n');
  return `<div class="related-articles" style="margin-top:2.5rem;padding-top:2rem;border-top:1px solid var(--green-pale);">
<h2>More authority topics</h2>
<ul class="related-articles-list">${lis}</ul>
<p><a href="/articles/">← All 20 articles</a> · <a href="/products/">Product guides</a> · <a href="/brands/">Brand guides</a> · <a href="/compare/">Comparisons</a></p>
</div>`;
}

/** Insert HTML immediately after the first </p> in body (for mid-article CTA). */
function insertAfterFirstParagraph(html, block) {
  const idx = html.indexOf('</p>');
  if (idx === -1) return block + '\n' + html;
  return html.slice(0, idx + 4) + '\n' + block + html.slice(idx + 4);
}

function amazonMidCta() {
  return `<aside class="article-mid-cta" role="complementary" aria-label="Amazon retail shortcuts">
<p class="article-mid-cta-note">Retail shortcuts (affiliate — see disclosure at top):</p>
<div class="article-mid-cta-row">
${amazonBtnSmall(AMZ.organicIndiaPowder, 'Organic India — leaf powder')}
${amazonBtnSmall(AMZ.organicIndiaCapsules, 'Organic India — capsules')}
${amazonBtnSmall(AMZ.tea, 'Moringa / herbal teas')}
</div>
</aside>`;
}

function amazonFooterCtas(slug) {
  let row1a = amazonBtn(AMZ.organicIndiaPowder, 'See Organic India leaf powder on Amazon');
  let row1b = amazonBtn(AMZ.organicIndiaCapsules, 'See Organic India capsules on Amazon');
  let smallParts = [
    amazonBtnSmall(AMZ.vahdam, 'Vahdam'),
    amazonBtnSmall(AMZ.kuliKuli, 'Kuli Kuli'),
    amazonBtnSmall(AMZ.tea, 'Tea picks'),
    amazonBtnSmall(AMZ.skincare, 'Skincare search'),
  ];

  if (slug === 'moringa-detox-tea-recipes') {
    row1a = amazonBtn(AMZ.tea, 'See moringa & herbal tea listings on Amazon');
    row1b = amazonBtn(AMZ.organicIndia, 'Organic India storefront (teas & wellness)');
  } else if (slug === 'moringa-cooking-daily') {
    row1a = amazonBtn(AMZ.organicIndiaPowder, 'Leaf powder for cooking (Amazon)');
    row1b = amazonBtn(AMZ.terrasoul, 'Terrasoul organic powder (Amazon)');
  } else if (slug === 'diy-moringa-face-masks' || slug === 'moringa-hair-skin') {
    row1a = amazonBtn(AMZ.skincare, 'Moringa skincare search on Amazon');
    row1b = amazonBtn(AMZ.organicIndiaPowder, 'Pure leaf powder (DIY masks / smoothies)');
  } else if (slug === 'organic-india-vs-vahdam-vs-kuli-kuli') {
    row1a = amazonBtn(AMZ.organicIndia, 'Organic India — Amazon');
    row1b = amazonBtn(AMZ.vahdam, 'Vahdam — Amazon');
    smallParts = [
      amazonBtnSmall(AMZ.kuliKuli, 'Kuli Kuli'),
      amazonBtnSmall(AMZ.organicIndiaPowder, 'OI powder'),
      amazonBtnSmall(AMZ.tea, 'Teas'),
    ];
  } else if (slug === 'moringa-for-pets') {
    row1a = amazonBtn(AMZ.organicIndiaPowder, 'Organic India powder (tiny amounts only — ask your vet)');
    row1b = amazonBtn(AMZ.organicIndiaCapsules, 'Capsules (only if your vet approves)');
  } else if (slug === 'moringa-vs-spirulina') {
    row1a = amazonBtn(AMZ.organicIndiaPowder, 'Moringa leaf powder (Amazon)');
    row1b = amazonBtn(AMZ.microIngredients, 'Greens / spirulina style search (Amazon)');
  } else if (slug === 'moringa-weight-loss' || slug === 'moringa-diabetes' || slug === 'moringa-anemia') {
    row1a = amazonBtn(AMZ.organicIndiaPowder, 'Organic India powder — compare nutrition facts');
    row1b = amazonBtn(AMZ.organicIndiaCapsules, 'Organic India capsules — compare serving size');
  } else if (
    slug === 'moringa-export-quality-standards' ||
    slug === 'top-moringa-states-india' ||
    slug === 'moringa-packaging-international' ||
    slug === 'moringa-eu-market'
  ) {
    row1a = amazonBtn(AMZ.organicIndiaPowder, 'Retail reference: Organic India powder (cup-testing)');
    row1b = amazonBtn(AMZ.organicIndia, 'Organic India brand hub on Amazon');
    smallParts.push(amazonBtnSmall(AMZ.mantra24, '24 Mantra'));
  } else if (slug === 'moringa-powder-vs-capsules') {
    row1a = amazonBtn(AMZ.organicIndiaPowder, 'Compare powder listings');
    row1b = amazonBtn(AMZ.organicIndiaCapsules, 'Compare capsule listings');
  } else if (slug === 'moringa-vs-kale-spinach') {
    row1a = amazonBtn(AMZ.organicIndiaPowder, 'Shelf-stable greens: OI powder');
    row1b = amazonBtn(AMZ.kuliKuli, 'Kuli Kuli greens / moringa blends');
  }

  return `<section class="article-cta-panel" aria-label="Amazon shopping">
<h2>Compare on Amazon</h2>
<p class="article-cta-lead">Amazon runs checkout, returns, and pricing. Re-check the listing title and organic seal before you order.</p>
<div class="amazon-compare-row article-cta-buttons">
${row1a}
${row1b}
</div>
<p class="article-cta-more">More: ${smallParts.join(' ')}</p>
<p class="article-cta-fineprint">Prices and Prime eligibility can change without notice.</p>
</section>`;
}

function readBody(slug) {
  const p = path.join(bodiesDir, `${slug}.html`);
  if (!fs.existsSync(p)) {
    throw new Error(`Missing body fragment: ${p}`);
  }
  return fs.readFileSync(p, 'utf8');
}

function articlePage(meta) {
  const { slug, title, description, h1, lead } = meta;
  let inner = readBody(slug);
  inner = insertAfterFirstParagraph(inner, amazonMidCta());
  const content = `${AFFILIATE_BOX}
<div class="article-prose">
${inner}
${amazonFooterCtas(slug)}
${relatedBlock(slug)}
</div>`;
  return layout({
    title: `${title} | Moringa Suppliers India`,
    description,
    canonical: `${SITE}/articles/${slug}.html`,
    breadcrumb: `<a href="/">Home</a> / <a href="/articles/">Articles</a> / ${escHtml(h1)}`,
    h1,
    lead,
    content,
    schemaJson: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: h1,
      url: `${SITE}/articles/${slug}.html`,
      dateModified: '2026-05-03',
    },
  });
}

function hubPage() {
  const lis = ARTICLES.map(
    (a) =>
      `<li><a href="/articles/${a.slug}.html"><strong>${escHtml(a.h1)}</strong></a><br><span class="articles-hub-desc">${escHtml(a.description)}</span></li>`
  ).join('\n');
  const content = `${AFFILIATE_BOX}
<div class="guide-prose articles-hub-intro">
<h2>Guides by topic</h2>
<p>Organic <strong>Moringa oleifera</strong> from India: safety, purity, powder and capsules, brand comparisons, export paperwork, EU market rules, cooking, tea, skincare, and pets. Affiliate links appear only in the Amazon section below.</p>
</div>
<div class="articles-hub-grid">
<ul class="articles-hub-list">${lis}</ul>
</div>
<section class="article-cta-panel" aria-label="Amazon shopping">
<h2>Amazon shortcuts</h2>
<p class="articles-hub-cta-hint">Affiliate links (same disclosure as above). Confirm the live listing before checkout.</p>
<div class="amazon-compare-row articles-hub-amazon-row">
${amazonBtn(AMZ.organicIndiaPowder, 'Organic India leaf powder — Amazon')}
${amazonBtn(AMZ.organicIndiaCapsules, 'Organic India capsules — Amazon')}
</div>
<p class="articles-hub-more-links">Also: ${amazonBtnSmall(AMZ.organicIndia, 'Organic India hub')} ${amazonBtnSmall(AMZ.kuliKuli, 'Kuli Kuli')} ${amazonBtnSmall(AMZ.vahdam, 'Vahdam')} ${amazonBtnSmall(AMZ.tea, 'Tea search')}</p>
</section>
<p class="articles-hub-backlinks"><a href="/">← Home buyer guide</a> · <a href="/products/">Product guides</a></p>`;
  return layout({
    title: 'Moringa Guides — Organic India Sourcing, Safety, Recipes | Moringa Suppliers India',
    description: 'Moringa guides: organic leaf powder and capsules, safety and purity, India export standards, EU compliance, brand comparisons, recipes, tea, skincare, and pets.',
    canonical: `${SITE}/articles/`,
    breadcrumb: `<a href="/">Home</a> / Articles`,
    h1: 'Moringa guides',
    lead: 'India organic Moringa — sourcing, safety, comparisons, and everyday use.',
    content,
    schemaJson: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Moringa Articles',
      url: `${SITE}/articles/`,
    },
  });
}

function main() {
  write('articles/index.html', hubPage());
  for (const meta of ARTICLES) {
    write(`articles/${meta.slug}.html`, articlePage(meta));
  }
  patchIndexAuthority(root);
  console.log('generate-articles.js done — wrote', ARTICLES.length + 1, 'pages');
}

main();
