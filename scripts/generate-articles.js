/**
 * Builds /articles/ hub + all catalogued authority pages from HTML fragments.
 * Run: node scripts/generate-articles.js
 * Source fragments: content/article-bodies/<slug>.html (edit these).
 * If a new stub is short, run once: node scripts/materialize-missing-bodies.cjs (pads under 1000 words).
 */
const fs = require('fs');
const path = require('path');
const {
  SITE,
  AMZ,
  INDIAMART,
  AFFILIATE_BOX,
  DEFAULT_AUTHOR,
  layout,
  write,
  amazonBtn,
  amazonBtnSmall,
  indiamartBtn,
  indiamartBtnSmall,
} = require('./lib/site-shell');

const root = path.join(__dirname, '..');
const bodiesDir = path.join(root, 'content', 'article-bodies');
const { ARTICLES } = require('./lib/articles-catalog');
const { patchIndexAuthority } = require('./lib/patch-index-authority');

// Articles are intentionally evergreen: no visible dates in the hero, no
// datePublished / dateModified in JSON-LD. This keeps the content from
// looking stale six months from now and lines up with the "no date stamps"
// editorial decision.

function escHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Estimate reading time from body HTML. ~225 words/min is a common average. */
function readingTimeFromHtml(html) {
  const text = String(html).replace(/<[^>]*>/g, ' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 225));
  return { words, minutes, label: `${minutes} min read` };
}

function relatedBlock(slug) {
  const others = ARTICLES.filter((a) => a.slug !== slug).slice(0, 8);
  const lis = others.map((a) => `<li><a href="/articles/${a.slug}.html">${escHtml(a.h1)}</a></li>`).join('\n');
  return `<div class="related-articles" style="margin-top:2.5rem;padding-top:2rem;border-top:1px solid var(--green-pale);">
<h2>More authority topics</h2>
<ul class="related-articles-list">${lis}</ul>
<p><a href="/articles/">&larr; All guides</a> (${ARTICLES.length} articles) &middot; <a href="/products/">Product guides</a> &middot; <a href="/brands/">Brand guides</a> &middot; <a href="/compare/">Comparisons</a></p>
</div>`;
}

/** Insert HTML immediately after the first </p> in body (for mid-article CTA). */
function insertAfterFirstParagraph(html, block) {
  const idx = html.indexOf('</p>');
  if (idx === -1) return block + '\n' + html;
  return html.slice(0, idx + 4) + '\n' + block + html.slice(idx + 4);
}

function amazonMidCta(slug) {
  if (slug === 'moringa-skincare-products-guide') {
    return `<aside class="article-mid-cta" role="complementary" aria-label="Amazon retail shortcuts">
<p class="article-mid-cta-note">Retail shortcuts (affiliate &mdash; see disclosure at top):</p>
<div class="article-mid-cta-row">
${amazonBtnSmall(AMZ.skincare, 'Moringa skincare search')}
${amazonBtnSmall(AMZ.oil, 'Moringa seed oil')}
${amazonBtnSmall(AMZ.organicIndiaPowder, 'Leaf powder (DIY masks)')}
</div>
</aside>`;
  }
  if (slug === 'moringa-oil-benefits-guide') {
    return `<aside class="article-mid-cta" role="complementary" aria-label="Amazon retail shortcuts">
<p class="article-mid-cta-note">Retail shortcuts (affiliate &mdash; see disclosure at top):</p>
<div class="article-mid-cta-row">
${amazonBtnSmall(AMZ.oil, 'Moringa seed oil')}
${amazonBtnSmall(AMZ.skincare, 'Moringa skincare')}
${amazonBtnSmall(AMZ.organicIndiaPowder, 'Leaf powder (oral beauty stack)')}
</div>
</aside>`;
  }
  const capFirst = slug === 'moringa-capsules-benefits-guide';
  const powder = amazonBtnSmall(AMZ.organicIndiaPowder, 'Organic India — leaf powder');
  const caps = amazonBtnSmall(AMZ.organicIndiaCapsules, 'Organic India — capsules');
  const rowBtns = capFirst ? `${caps}\n${powder}` : `${powder}\n${caps}`;
  return `<aside class="article-mid-cta" role="complementary" aria-label="Amazon retail shortcuts">
<p class="article-mid-cta-note">Retail shortcuts (affiliate &mdash; see disclosure at top):</p>
<div class="article-mid-cta-row">
${rowBtns}
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
  } else if (slug === 'moringa-skincare-products-guide') {
    row1a = amazonBtn(AMZ.skincare, 'Moringa skincare — creams, serums, soaps on Amazon');
    row1b = amazonBtn(AMZ.oil, 'Moringa seed oil for face & hair');
    smallParts = [
      amazonBtnSmall(AMZ.indusValley, 'Indus Valley'),
      amazonBtnSmall(AMZ.organicIndiaPowder, 'Leaf powder'),
      amazonBtnSmall(AMZ.organicIndiaCapsules, 'Capsules'),
      amazonBtnSmall(AMZ.tea, 'Tea picks'),
    ];
  } else if (slug === 'diy-moringa-face-masks' || slug === 'moringa-hair-skin') {
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
  } else if (
    slug === 'moringa-weight-loss' ||
    slug === 'moringa-diabetes' ||
    slug === 'moringa-anemia' ||
    slug === 'moringa-powder-benefits-complete-guide'
  ) {
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
  } else if (slug === 'moringa-capsules-benefits-guide') {
    row1a = amazonBtn(AMZ.organicIndiaCapsules, 'Organic India moringa capsules on Amazon');
    row1b = amazonBtn(AMZ.organicIndiaPowder, 'Organic India leaf powder — cost per gram check');
    smallParts = [
      amazonBtnSmall(AMZ.kuliKuli, 'Kuli Kuli'),
      amazonBtnSmall(AMZ.vahdam, 'Vahdam'),
      amazonBtnSmall(AMZ.organicIndia, 'Brand storefront'),
      amazonBtnSmall(AMZ.tea, 'Tea picks'),
    ];
  } else if (slug === 'moringa-oil-benefits-guide') {
    row1a = amazonBtn(AMZ.oil, 'Moringa seed oil on Amazon');
    row1b = amazonBtn(AMZ.skincare, 'Moringa skincare, serums & face oils');
    smallParts = [
      amazonBtnSmall(AMZ.organicIndiaCapsules, 'Leaf capsules'),
      amazonBtnSmall(AMZ.organicIndiaPowder, 'Leaf powder'),
      amazonBtnSmall(AMZ.indusValley, 'Indus Valley'),
      amazonBtnSmall(AMZ.tea, 'Tea picks'),
    ];
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
<div class="article-cta-more"><span class="article-cta-more-label">More options:</span>${smallParts.join('')}</div>
<p class="article-cta-fineprint">Prices and Prime eligibility can change without notice.</p>
</section>
<aside class="b2b-strip article-b2b-strip" role="complementary" aria-label="Bulk buyer shortcut">
  <div>
    <span class="b2b-strip-eyebrow">Buying in bulk?</span>
    <h3>Get the best price on Moringa from <strong>Indian suppliers</strong> directly</h3>
    <p>If you are sourcing moringa <strong>by the kilo or the ton</strong>, IndiaMART connects you with verified Indian moringa suppliers in minutes. Compare quotes, MOQ and certifications in one place.</p>
  </div>
  <div class="b2b-strip-cta">${indiamartBtn('Get best price on IndiaMART')}</div>
  <p class="b2b-strip-disclosure"><strong>Disclosure:</strong> Affiliate link &mdash; we may earn a small referral fee at no cost to you. <a href="/legal/affiliate-disclosure.html" style="color:#c8451f;font-weight:600;">Policy</a>.</p>
</aside>`;
}

function readBody(slug) {
  const p = path.join(bodiesDir, `${slug}.html`);
  if (!fs.existsSync(p)) {
    throw new Error(`Missing body fragment: ${p}`);
  }
  return fs.readFileSync(p, 'utf8');
}

/** Slug → SEO keyword shortlist. Keeps per-page keyword meta unique without manual upkeep. */
function keywordsForSlug(slug, h1) {
  const base = 'moringa, moringa oleifera, moringa india, moringa suppliers in india, moringa suppliers india, organic moringa, organic moringa india';
  const map = {
    'how-to-contact-indian-moringa-suppliers': 'how to contact moringa suppliers in india, contact indian moringa suppliers, moringa exporter india contact, how to find moringa suppliers in india, moringa wholesale india, moringa B2B india, moringa indiamart',
    'import-moringa-from-india-step-by-step': 'import moringa from india, import moringa step by step, moringa import guide, moringa from india to usa, moringa from india to europe, moringa import customs, moringa FOB CIF india',
    'moringa-private-label-india': 'moringa private label india, moringa contract manufacturing india, private label moringa supplements, indian moringa manufacturer, moringa OEM india, moringa white label',
    'moringa-bulk-buyer-checklist': 'moringa bulk buyer checklist, moringa wholesale due diligence, verify moringa supplier india, moringa import checklist, moringa procurement checklist',
    'ultimate-moringa-encyclopedia': 'moringa encyclopedia, moringa guide, moringa research, moringa history, moringa science',
    'moringa-benefits-every-age': 'moringa benefits, moringa for kids, moringa for seniors, moringa for adults, moringa nutrition age',
    'moringa-side-effects-safety': 'moringa side effects, moringa safety, moringa pregnancy, moringa drug interactions',
    'pure-vs-adulterated-moringa': 'pure moringa, adulterated moringa, moringa purity test, fake moringa powder, moringa fillers',
    'moringa-vs-spirulina': 'moringa vs spirulina, spirulina vs moringa, superfood comparison, green powders',
    'moringa-vs-kale-spinach': 'moringa vs kale, moringa vs spinach, nutrition comparison, leafy greens',
    'moringa-powder-vs-capsules': 'moringa powder vs capsules, moringa absorption, moringa dosage format',
    'moringa-powder-benefits-complete-guide':
      'moringa powder benefits, moringa powder for skin, moringa powder for women, moringa powder for men, how to use moringa powder, how to take moringa powder, moringa powder liver, moringa powder weight loss, moringa powder testosterone, moringa powder side effects',
    'moringa-capsules-benefits-guide':
      'moringa capsules, moringa capsules benefits, moringa capsules uses, moringa capsules for men, moringa capsules for women, moringa capsules amazon, moringa capsules price, organic moringa capsules, moringa leaf capsules dosage',
    'moringa-oil-benefits-guide':
      'moringa oil, moringa oil benefits, moringa oil for hair, moringa oil for skin, moringa oil for face, moringa seed oil, moringa oil uses, moringa oil price, moringa oil capsules, moringa hair oil, moringa face oil',
    'moringa-skincare-products-guide':
      'moringa skincare, moringa skin care products, moringa skin cream, moringa cream for face, moringa soap, moringa serum, moringa face mask, moringa skin benefits, moringa hair benefits, moringa for skin and hair',
    'organic-india-vs-vahdam-vs-kuli-kuli': 'organic india vs vahdam vs kuli kuli, top moringa brands, brand comparison',
    'moringa-weight-loss': 'moringa weight loss, moringa fat burning, moringa metabolism, moringa blood sugar',
    'moringa-diabetes': 'moringa diabetes, moringa blood sugar, moringa type 2 diabetes, moringa glycemic',
    'moringa-hair-skin': 'moringa hair, moringa skin, moringa beauty, moringa serum',
    'moringa-anemia': 'moringa anemia, moringa iron, moringa hemoglobin, moringa iron deficiency',
    'moringa-export-quality-standards': 'moringa export standards, haccp moringa, iso 22000, gmp moringa, moringa quality',
    'top-moringa-states-india': 'top moringa states india, tamil nadu moringa, maharashtra moringa, india production',
    'moringa-packaging-international': 'moringa packaging export, moringa shelf life, moringa moisture, export packaging',
    'moringa-eu-market': 'moringa eu market, novel food eu, moringa europe, eu organic moringa',
    'moringa-cooking-daily': 'moringa recipes, moringa cooking, moringa smoothie, moringa daily use',
    'moringa-detox-tea-recipes': 'moringa tea recipes, moringa detox tea, moringa blends, morning ritual',
    'diy-moringa-face-masks': 'diy moringa face mask, moringa skincare diy, moringa acne, patch test',
    'moringa-for-pets': 'moringa for dogs, moringa for cats, moringa for pets, pet supplement safety',
  };
  const extra = map[slug] || h1.toLowerCase();
  return `${base}, ${extra}`;
}

/**
 * B2B-funnel articles target bulk buyers, importers and brand owners.
 * They get an IndiaMART-led footer (single primary CTA + small secondary
 * Amazon row) and skip the Amazon mid-article CTA so the Amazon push does
 * not feel out of place in a wholesale context.
 */
const B2B_SLUGS = new Set([
  'how-to-contact-indian-moringa-suppliers',
  'import-moringa-from-india-step-by-step',
  'moringa-private-label-india',
  'moringa-bulk-buyer-checklist',
]);

function indiamartFooterCta() {
  return `<section class="article-cta-panel article-cta-panel--b2b" aria-label="Get supplier quotes on IndiaMART">
<h2>Talk to verified Indian moringa suppliers</h2>
<p class="article-cta-lead">If you are sourcing moringa <strong>by the kilo or the ton</strong>, the fastest way to get real quotes is to post a single buy lead on IndiaMART and let multiple verified Indian suppliers respond with their pricing, MOQ, certifications and sample terms.</p>
<div class="article-cta-buttons">
<a href="https://IndiaMART.in/v/yNRgBEqn" class="indiamart-btn" target="_blank" rel="sponsored nofollow noopener" aria-label="Get best price for Moringa on IndiaMART (affiliate link)">&#127981; Get best price on IndiaMART</a>
</div>
<div class="article-cta-more"><span class="article-cta-more-label">Retail / sample comparison:</span>${amazonBtnSmall(AMZ.organicIndiaPowder, 'Organic India powder')}${amazonBtnSmall(AMZ.organicIndiaCapsules, 'OI capsules')}${amazonBtnSmall(AMZ.tea, 'Tea picks')}</div>
<p class="article-cta-fineprint"><strong>Disclosure:</strong> The IndiaMART link above is an affiliate link. We may earn a small referral fee at no extra cost to you. Amazon links are affiliate too. <a href="/legal/affiliate-disclosure.html">Full policy</a>.</p>
</section>`;
}

function articlePage(meta) {
  const { slug, title, description, h1, lead } = meta;
  const body = readBody(slug);
  const rt = readingTimeFromHtml(body);
  const isB2B = B2B_SLUGS.has(slug);

  let inner = body;
  // B2B-funnel articles skip the Amazon mid-article CTA; the body itself
  // already contains an IndiaMART strip (in the contact-suppliers article)
  // plus contextual links to other B2B articles.
  if (!isB2B) {
    inner = insertAfterFirstParagraph(inner, amazonMidCta(slug));
  }
  const footerCta = isB2B ? indiamartFooterCta() : amazonFooterCtas(slug);
  const content = `${AFFILIATE_BOX}
<div class="article-prose">
${inner}
${footerCta}
${relatedBlock(slug)}
</div>`;

  const canonical = `${SITE}/articles/${slug}.html`;

  return layout({
    section: 'article',
    articleType: true,
    title: `${title} | Moringa Suppliers India`,
    description,
    keywords: keywordsForSlug(slug, h1),
    canonical,
    breadcrumbTrail: [
      { name: 'Home', url: '/' },
      { name: 'Articles', url: '/articles/' },
      { name: h1 },
    ],
    h1,
    lead,
    eyebrow: 'Editorial guide',
    author: DEFAULT_AUTHOR,
    readingTime: rt.label,
    content,
    schemaJson: {
      '@type': 'Article',
      headline: h1,
      description,
      url: canonical,
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
      wordCount: rt.words,
      timeRequired: `PT${rt.minutes}M`,
      inLanguage: 'en',
      articleSection: 'Moringa guides',
      keywords: keywordsForSlug(slug, h1),
      author: { '@type': 'Person', name: DEFAULT_AUTHOR.name, url: DEFAULT_AUTHOR.url },
      publisher: { '@id': `${SITE}/#organization` },
      image: {
        '@type': 'ImageObject',
        url: `${SITE}/og-brand.svg`,
        width: 1200,
        height: 630,
      },
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
<div class="articles-hub-more-links"><span class="article-cta-more-label">Also browse:</span>${amazonBtnSmall(AMZ.organicIndia, 'Organic India hub')}${amazonBtnSmall(AMZ.kuliKuli, 'Kuli Kuli')}${amazonBtnSmall(AMZ.vahdam, 'Vahdam')}${amazonBtnSmall(AMZ.tea, 'Tea search')}</div>
</section>
<p class="articles-hub-backlinks"><a href="/">&larr; Home buyer guide</a> &middot; <a href="/products/">Product guides</a></p>`;
  return layout({
    section: 'article',
    title: 'Moringa Guides | Sourcing, Safety, Recipes \u2014 Moringa Suppliers India',
    description: 'Moringa guides on organic leaf powder and capsules, safety and purity, India export standards, EU compliance, brand comparisons, recipes, tea, skincare, and pets \u2014 written for global buyers sourcing moringa suppliers in India.',
    keywords: 'moringa guides, moringa suppliers in india, moringa articles, organic india moringa, moringa safety, moringa recipes, moringa export, eu moringa',
    canonical: `${SITE}/articles/`,
    breadcrumbTrail: [
      { name: 'Home', url: '/' },
      { name: 'Articles' },
    ],
    h1: 'Moringa guides',
    eyebrow: 'Editorial hub',
    lead: 'India organic Moringa &mdash; sourcing, safety, comparisons, and everyday use.',
    heroStats: [
      { value: String(ARTICLES.length), label: 'Authority articles' },
      { value: '100%', label: 'Editorial only' },
      { value: 'Evergreen', label: 'Maintained' },
    ],
    content,
    schemaJson: {
      '@type': 'CollectionPage',
      name: 'Moringa Articles',
      url: `${SITE}/articles/`,
      hasPart: ARTICLES.map((a) => ({
        '@type': 'Article',
        headline: a.h1,
        url: `${SITE}/articles/${a.slug}.html`,
      })),
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
