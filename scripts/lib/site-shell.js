/**
 * Shared layout shell for generated pages (legal, products, brands, compare, articles, about).
 * Root = repo root (parent of scripts/).
 *
 * Design goals (v16 refresh):
 *   - Each section (article / product / brand / compare / legal / about / hub) is visually
 *     distinct via a body[data-section="..."] theme (accent colour, hero gradient, ornament).
 *   - Every inner page ships the same strong SEO baseline: canonical, OG (with og:type logic),
 *     Twitter card, per-page keywords, theme-color, BreadcrumbList + WebSite + the page's own
 *     JSON-LD, and (on articles) Article schema with published/modified/author.
 *   - The hero always has an eyebrow tag, h1, optional meta row (date · author · reading time)
 *     and optional stat chips — so no two sections look identical.
 */
const fs = require('fs');
const path = require('path');
const { fixHtml } = require('../normalize-html-dashes');
const root = path.join(__dirname, '..', '..');

/** Must match GitHub Pages CNAME (www) so canonicals match the live host Google indexes. */
const SITE = 'https://www.moringasuppliersindia.com';
/**
 * Default Open Graph / Twitter preview.
 * Use the products photo by default so Google's right-hand panel and social
 * shares show the real product line-up (powder, capsules, oil, tea, soap)
 * rather than a generic logo card.
 */
const OG_DEFAULT_IMAGE = `${SITE}/Moringa_All_Products.webp`;
/** SVG fallback used by some legacy share targets (kept for reference). */
const OG_BRAND_SVG = `${SITE}/og-brand.svg`;
/** Bust CDN/browser cache when CSS/JS change; bump after edits to main.css or main.js. */
const ASSET_VER = '37';

const AMZ = {
  organicIndia: 'https://amzn.to/3QKamqU',
  organicIndiaPowder: 'https://amzn.to/4tgLfJV',
  organicIndiaCapsules: 'https://amzn.to/3P1LYAz',
  tea: 'https://amzn.to/4unGter',
  oil: 'https://amzn.to/4w5y3Kt',
  skincare: 'https://amzn.to/4epFTbp',
  vahdam: 'https://amzn.to/4eoPUWq',
  mantra24: 'https://amzn.to/4d4Tu5K',
  indusValley: 'https://amzn.to/4t7o98x',
  banyan: 'https://amzn.to/4d2pHL2',
  kuliKuli: 'https://amzn.to/4wck5Xo',
  sunfood: 'https://amzn.to/4tQXPR8',
  terrasoul: 'https://amzn.to/4uoNlIq',
  microIngredients: 'https://amzn.to/42vnGSN',
};

/**
 * IndiaMART (B2B / bulk) affiliate link. Used wherever the page is talking
 * to a wholesale buyer, importer, exporter, or someone asking "where do I
 * actually contact moringa suppliers in India?". Kept separate from AMZ
 * because it is a different commercial relationship (B2B marketplace, not
 * Amazon Associates retail).
 */
const INDIAMART = {
  moringa: 'https://IndiaMART.in/v/yNRgBEqn',
};

/** Fixed row: guide FAB + scroll-to-top. */
function pageToolsDockHtml() {
  return `<div class="page-tools-dock" id="pageToolsDock">
${guideAssistHtml()}
<button class="scroll-top" id="scrollTopBtn" aria-label="Scroll to top">&uarr;</button>
</div>`;
}

/** Floating Help assistant (links to guides + affiliates). */
function guideAssistHtml() {
  return `<div class="guide-assist" id="guideAssist">
  <button type="button" class="guide-assist-fab" id="guideAssistToggle" aria-expanded="false" aria-controls="guideAssistPanel" aria-label="Help: retail, wholesale, and purity checklist">Help</button>
  <div class="guide-assist-panel" id="guideAssistPanel" role="dialog" aria-modal="true" aria-label="Quick choices" hidden>
    <p class="guide-assist-lead">Pick a path &mdash; we send you to the right retail guide or B2B marketplace listing.</p>
    <a class="guide-assist-link guide-assist-link--amz" href="/products/">&#128717;&#65039; Buy small quantity (Amazon guides)</a>
    <a class="guide-assist-link guide-assist-link--b2b" href="${INDIAMART.moringa}" target="_blank" rel="sponsored nofollow noopener">&#127981; Source in bulk (IndiaMART)</a>
    <a class="guide-assist-link guide-assist-link--doc" href="/purity-checklist.html">&#128196; Purity checklist (print / save as PDF)</a>
    <button type="button" class="guide-assist-close" id="guideAssistClose">Close</button>
  </div>
</div>`;
}

function footerToolsColumn() {
  return `<div class="footer-col footer-col--tools">
        <h4>Weight converter</h4>
        <div class="unit-converter" id="unitConverter">
          <label class="unit-converter-label" for="kgInput">Kilograms &harr; pounds</label>
          <div class="unit-converter-row">
            <input type="number" class="unit-converter-input" id="kgInput" inputmode="decimal" min="0" step="any" placeholder="kg" aria-label="Weight in kilograms" />
            <span class="unit-converter-eq" aria-hidden="true">&harr;</span>
            <input type="number" class="unit-converter-input" id="lbInput" inputmode="decimal" min="0" step="any" placeholder="lb" aria-label="Weight in pounds" />
          </div>
          <p class="unit-converter-hint">1 kg &asymp; 2.205 lb (avoirdupois). Confirm whether your supplier quotes metric <strong>kg</strong> or other units on the invoice.</p>
        </div>
      </div>`;
}

const AFFILIATE_BOX = `<div class="affiliate-disclosure affiliate-disclosure--compact" role="note" aria-label="Amazon Associates disclosure">
  <span class="icon" aria-hidden="true">&#9432;</span>
  <div><strong>Disclosure:</strong> <strong>As an Amazon Associate, I earn from qualifying purchases.</strong> Amazon links on this page are affiliate links (no extra cost to you). <a href="/legal/affiliate-disclosure.html">Full policy</a></div>
</div>`;

const GA = `  <script async src="https://www.googletagmanager.com/gtag/js?id=G-C7LEYP2M1L"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-C7LEYP2M1L');
  </script>`;

/** Google AdSense loader (single publisher ID for all templated pages). */
const ADSENSE = `  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5368355682383000" crossorigin="anonymous"></script>`;

const FONTS = `  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/main.css?v=${ASSET_VER}" />`;

const ORG_NODE = {
  '@type': 'Organization',
  '@id': `${SITE}/#organization`,
  name: 'Moringa Suppliers India',
  alternateName: ['MoringaSuppliersIndia', 'Moringa Suppliers in India'],
  url: SITE,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE}/logo.svg`,
    width: 256,
    height: 256,
    caption: 'Moringa Suppliers India',
  },
  // Knowledge-panel image: the products lineup so Google's right-side SERP
  // panel can render the real Moringa products instead of just the logo.
  image: {
    '@type': 'ImageObject',
    url: `${SITE}/Moringa_All_Products.webp`,
    caption: 'Moringa products from India: powder, capsules, oil, tea, soap',
  },
  email: 'moringasuppliersindia@gmail.com',
  founder: { '@type': 'Person', name: 'Avinash Chauhan' },
  knowsAbout: [
    'Moringa oleifera',
    'Moringa suppliers in India',
    'Organic moringa powder',
    'Moringa capsules',
    'Moringa oil',
    'Moringa tea',
    'NPOP organic certification',
    'USDA organic moringa',
    'EU organic moringa',
    'Moringa export from India',
  ],
  areaServed: { '@type': 'Place', name: 'Worldwide' },
};

const WEBSITE_NODE = {
  '@type': 'WebSite',
  '@id': `${SITE}/#website`,
  name: 'Moringa Suppliers India',
  alternateName: 'Moringa Suppliers in India',
  url: SITE,
  publisher: { '@id': `${SITE}/#organization` },
  inLanguage: 'en',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE}/?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

/** Default editorial author used on articles when the generator does not pass one. */
const DEFAULT_AUTHOR = {
  '@type': 'Person',
  name: 'Avinash Chauhan',
  url: `${SITE}/about.html`,
};

/**
 * Infer the "section" (data-section attribute + default theme) from a URL path.
 * Explicit opts.section always wins — this is just the fallback.
 */
function sectionFromCanonical(canonical) {
  try {
    const u = new URL(canonical);
    const p = u.pathname;
    if (p.startsWith('/articles/')) return 'article';
    if (p.startsWith('/products/')) return 'product';
    if (p.startsWith('/brands/')) return 'brand';
    if (p.startsWith('/compare/')) return 'compare';
    if (p.startsWith('/legal/')) return 'legal';
    if (p === '/about.html') return 'about';
    return 'home';
  } catch {
    return 'home';
  }
}

/** Short, human eyebrow tag shown above H1 — keeps each section feeling different. */
function eyebrowFor(section) {
  switch (section) {
    case 'article': return 'Editorial guide';
    case 'product': return 'Product buyer guide';
    case 'brand': return 'Brand guide';
    case 'compare': return 'Side-by-side comparison';
    case 'legal': return 'Legal notice';
    case 'about': return 'About the site';
    default: return 'Moringa Suppliers India';
  }
}

/**
 * Accent icon shown in the page-hero eyebrow pill per section.
 * Plain SVG (aria-hidden) — no external requests.
 */
function heroIconFor(section) {
  if (section === 'article') {
    return `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="14" height="14"><path d="M5 4h11l3 3v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" stroke="currentColor" stroke-width="1.6"/><path d="M8 10h8M8 14h8M8 18h5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`;
  }
  if (section === 'product') {
    return `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="14" height="14"><path d="M4 7h16l-1.5 12a2 2 0 0 1-2 1.8H7.5a2 2 0 0 1-2-1.8L4 7Z" stroke="currentColor" stroke-width="1.6"/><path d="M9 7a3 3 0 0 1 6 0" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`;
  }
  if (section === 'brand') {
    return `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="14" height="14"><path d="M12 3l2.5 5.5L20 10l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-1.5L12 3Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`;
  }
  if (section === 'compare') {
    return `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="14" height="14"><path d="M6 4v16M18 4v16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M3 8l3-3 3 3M15 16l3 3 3-3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }
  if (section === 'legal') {
    return `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="14" height="14"><path d="M6 3h9l3 3v15H6V3Z" stroke="currentColor" stroke-width="1.6"/><path d="M9 9h6M9 13h6M9 17h4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`;
  }
  if (section === 'about') {
    return `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="14" height="14"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.6"/><path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`;
  }
  return '';
}

function nav() {
  return `<a class="skip-link" href="#main">Skip to main content</a>
<nav class="navbar" id="navbar">
  <div class="nav-inner">
    <a href="/" class="logo">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M16 4C10 4 5 10 5 18C5 24 10 28 16 28C22 28 27 24 27 18C27 10 22 4 16 4Z" fill="#2d8a3a" opacity="0.15"/>
        <path d="M16 4C16 4 8 8 8 18C8 24 11.5 28 16 28" stroke="#2d8a3a" stroke-width="2" stroke-linecap="round"/>
        <path d="M16 4C16 4 24 8 24 18C24 24 20.5 28 16 28" stroke="#2d8a3a" stroke-width="2" stroke-linecap="round"/>
        <path d="M16 28V14" stroke="#2d8a3a" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
      Moringa<span>Suppliers</span>India
    </a>
    <ul class="nav-links" id="navDesktopLinks">
      <li><a href="/#start-here">Start here</a></li>
      <li><a href="/#what-is-moringa">The plant</a></li>
      <li><a href="/articles/">Articles</a></li>
      <li><a href="/about.html">About us</a></li>
      <li><a href="/products/">Products</a></li>
      <li><a href="/brands/">Brands</a></li>
      <li><a href="/compare/">Compare</a></li>
      <li><a href="/#why-india">Why India</a></li>
      <li><a href="/#buy" class="nav-link-buy">Buy</a></li>
      <li><a href="/#suppliers">Suppliers</a></li>
      <li><a href="/#documents">Buyer Docs</a></li>
      <li><a href="/#faq">FAQ</a></li>
      <li><a href="/#contact" class="nav-cta">Contact</a></li>
    </ul>
    <button type="button" class="mobile-toggle" id="mobileToggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobileMenu">
      <span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span>
    </button>
  </div>
</nav>
<div class="mobile-menu" id="mobileMenu" role="navigation" aria-label="Main navigation" hidden>
  <div class="mobile-menu-inner">
    <a href="/">Home</a>
    <a href="/#start-here"><strong>Start here — how to use this site</strong></a>
    <a href="/about.html">About us</a>
    <a href="/articles/">Moringa guides</a>
    <a href="/products/">Product guides</a>
    <a href="/brands/">Brand guides</a>
    <a href="/compare/">Comparisons</a>
    <a href="/#export-flow">Export flow (home)</a>
    <a href="/#supplier-credentials">FSSAI &amp; GMP (home)</a>
    <a href="/#why-india">Why India</a>
    <a href="/#buy" class="mobile-menu-buy"><strong>Buy on Amazon</strong></a>
    <a href="/#suppliers">Suppliers</a>
    <a href="/#documents">Buyer docs</a>
    <a href="/#contact"><strong>Contact</strong></a>
  </div>
</div>
<div class="nav-mobile-backdrop" id="navMobileBackdrop" hidden aria-hidden="true"></div>`;
}

function footer() {
  return `<footer class="footer-pro">
  <div class="footer-pro-inner">
    <div class="footer-cols">
      <div class="footer-col">
        <div class="footer-brand-logo">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M16 4C10 4 5 10 5 18C5 24 10 28 16 28C22 28 27 24 27 18C27 10 22 4 16 4Z" fill="#4cae5a" opacity="0.25"/><path d="M16 4C16 4 8 8 8 18C8 24 11.5 28 16 28" stroke="#b8e0c0" stroke-width="2" stroke-linecap="round"/><path d="M16 4C16 4 24 8 24 18C24 24 20.5 28 16 28" stroke="#b8e0c0" stroke-width="2" stroke-linecap="round"/><path d="M16 28V14" stroke="#d4a53a" stroke-width="1.5" stroke-linecap="round"/></svg>
          Moringa<span>Suppliers</span>India
        </div>
        <p class="footer-tagline">Independent guides for buyers sourcing Moringa from India and trusted retail options on Amazon (US).</p>
        <p class="footer-owner-line">Avinash Chauhan &middot; Independent developer &amp; site owner</p>
        <div class="footer-contact-mini">
          &#9993; <a href="mailto:moringasuppliersindia@gmail.com">moringasuppliersindia@gmail.com</a>
        </div>
        <h4 class="footer-sub">Quick paths</h4>
        <ul class="footer-quick-paths">
          <li><a href="/#start-here">How to use this site (home)</a></li>
          <li><a href="/#decision-hub">Buyer decision hub (home)</a></li>
          <li><a href="/purity-checklist.html">Printable purity checklist</a></li>
          <li><a href="/#export-flow">Export flow diagram (home)</a></li>
          <li><a href="/#supplier-credentials">Credential checklist (home)</a></li>
          <li><a href="/products/">Retail product guides</a></li>
          <li><a href="/articles/">Articles library</a></li>
          <li><a href="/#suppliers">Bulk sourcing &amp; suppliers</a></li>
        </ul>
      </div>
      <div class="footer-col"><h4>Guides</h4><ul>
        <li><a href="/about.html">About us</a></li>
        <li><a href="/articles/">Moringa guides</a></li>
        <li><a href="/products/">Products hub</a></li>
        <li><a href="/brands/">Brands hub</a></li>
        <li><a href="/compare/">Compare hub</a></li>
        <li><a href="/">India buyer guide (home)</a></li>
      </ul></div>
      <div class="footer-col"><h4>Legal</h4><ul>
        <li><a href="/legal/disclaimer.html">Disclaimer</a></li>
        <li><a href="/legal/privacy.html">Privacy</a></li>
        <li><a href="/legal/terms.html">Terms</a></li>
        <li><a href="/legal/cookies.html">Cookies</a></li>
        <li><a href="/legal/affiliate-disclosure.html">Affiliate disclosure</a></li>
      </ul></div>
      ${footerToolsColumn()}
    </div>
    <div class="footer-bottom" style="flex-direction:column;align-items:flex-start;gap:0.6rem;">
      <div class="footer-affiliate-line">
        <strong>Amazon Associates:</strong> <em>As an Amazon Associate, I earn from qualifying purchases.</em>
        <a href="/legal/affiliate-disclosure.html">Details</a>
      </div>
      <div style="display:flex;flex-wrap:wrap;justify-content:space-between;width:100%;padding-top:0.8rem;border-top:1px solid rgba(255,255,255,0.06);">
        <div>&copy; MoringaSuppliersIndia.com &middot; Independent buyer guide</div>
        <div class="footer-evergreen">Evergreen reference &middot; Made in India &#127470;&#127475;</div>
      </div>
    </div>
  </div>
</footer>
${pageToolsDockHtml()}
<script defer src="/assets/js/main.js?v=${ASSET_VER}"></script>`;
}

function amazonBtn(href, label) {
  return `<a href="${href}" class="amazon-btn" target="_blank" rel="sponsored nofollow noopener" aria-label="${label} (affiliate)">&#128722; ${label}</a>`;
}

function amazonBtnSmall(href, label) {
  return `<a href="${href}" class="amazon-btn-small" target="_blank" rel="sponsored nofollow noopener">${label}</a>`;
}

/**
 * IndiaMART (bulk / B2B) CTA buttons. Visually distinct from Amazon yellow
 * so users instantly understand "this is where I contact actual moringa
 * suppliers in India for wholesale", not retail Amazon.
 */
function indiamartBtn(label, href) {
  const url = href || INDIAMART.moringa;
  return `<a href="${url}" class="indiamart-btn" target="_blank" rel="sponsored nofollow noopener" aria-label="${label} on IndiaMART (affiliate)">&#127981; ${label}</a>`;
}

function indiamartBtnSmall(label, href) {
  const url = href || INDIAMART.moringa;
  return `<a href="${url}" class="indiamart-btn-small" target="_blank" rel="sponsored nofollow noopener">${label}</a>`;
}

/**
 * Render the hero block for inner pages. Keeps each section visually distinct via
 * the data-section theme (gradient + accent set in CSS).
 */
function renderPageHero({ section, eyebrow, h1, lead, dateModified, datePublished, author, readingTime, heroStats }) {
  const icon = heroIconFor(section);
  const eyebrowHtml = eyebrow
    ? `<span class="page-eyebrow" aria-hidden="false">${icon}<span>${eyebrow}</span></span>`
    : '';

  // Hero meta row is intentionally suppressed site-wide:
  // - No "Updated <date>" stamp (keeps content evergreen).
  // - No "By <author>" (every article shouldn't shout the same byline).
  // - No "Read X min" stamp (looks repetitive on every page).
  // Author / dates still flow into JSON-LD when needed for E-E-A-T, but
  // the visible hero stays clean: eyebrow + H1 + lead + (optional stats).
  const metaBits = [];
  const metaHtml = metaBits.length
    ? `<div class="page-hero-meta">${metaBits.join('<span class="page-meta-sep" aria-hidden="true">&middot;</span>')}</div>`
    : '';

  const statsHtml = Array.isArray(heroStats) && heroStats.length
    ? `<div class="page-hero-stats" role="list">${heroStats
        .map((s) => `<div class="page-hero-stat" role="listitem"><div class="phs-value">${s.value}</div><div class="phs-label">${s.label}</div></div>`)
        .join('')}</div>`
    : '';

  return `<header class="page-hero page-hero--${section}" data-hero-section="${section}">
    <div class="page-hero-ornament" aria-hidden="true"></div>
    <div class="container page-hero-inner">
      ${eyebrowHtml}
      <h1>${h1}</h1>
      <p class="lead">${lead}</p>
      ${metaHtml}
      ${statsHtml}
    </div>
  </header>`;
}

function formatPrettyDate(iso) {
  // Accepts YYYY-MM-DD and returns e.g. "May 3, 2026"
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return iso;
  }
}

/** Resolve a possibly-relative URL against the canonical SITE host. */
function absUrl(u) {
  if (!u) return u;
  if (/^https?:\/\//i.test(u)) return u;
  if (u.startsWith('/')) return `${SITE}${u}`;
  return `${SITE}/${u}`;
}

/** Build a BreadcrumbList JSON-LD node from a trail array. Always uses absolute URLs. */
function breadcrumbSchema(trail) {
  if (!Array.isArray(trail) || trail.length === 0) return null;
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      ...(t.url ? { item: absUrl(t.url) } : {}),
    })),
  };
}

/**
 * Main page layout. Backwards-compatible with prior callers that pass
 * { title, description, canonical, breadcrumb, h1, lead, content, schemaJson, ogImage }.
 * New optional keys: section, keywords, dateModified, datePublished, author, readingTime,
 * eyebrow, breadcrumbTrail, heroStats, articleType, extraHeadTags.
 */
function layout(opts) {
  const {
    title,
    description,
    canonical,
    ogImage,
    breadcrumb,
    h1,
    lead,
    content,
    schemaJson,
    keywords,
    dateModified,
    datePublished,
    author,
    readingTime,
    eyebrow,
    breadcrumbTrail,
    heroStats,
    articleType, // if truthy, og:type=article (else website)
    extraHeadTags = '',
  } = opts;

  const section = opts.section || sectionFromCanonical(canonical);
  const effectiveEyebrow = eyebrow || eyebrowFor(section);
  const img = ogImage || OG_DEFAULT_IMAGE;
  const titleEsc = String(title).replace(/"/g, '&quot;');
  const descEsc = String(description).replace(/"/g, '&quot;');
  const isArticleLike = !!articleType || section === 'article';

  // Combined JSON-LD graph: Organization + WebSite + BreadcrumbList + page-specific node(s).
  const graphNodes = [ORG_NODE, WEBSITE_NODE];
  const bc = breadcrumbSchema(breadcrumbTrail);
  if (bc) graphNodes.push({ ...bc, '@id': `${canonical}#breadcrumb` });

  if (schemaJson) {
    const pageNodes = Array.isArray(schemaJson) ? schemaJson : [schemaJson];
    for (const node of pageNodes) {
      if (!node || typeof node !== 'object') continue;
      const cleaned = { ...node };
      // Promote WebPage / Article / CollectionPage etc. into the graph without duplicate @context.
      delete cleaned['@context'];
      graphNodes.push(cleaned);
    }
  }

  const schemaBlock = `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graphNodes,
  })}</script>`;

  const ogType = isArticleLike ? 'article' : 'website';
  const articleMeta = isArticleLike
    ? `
  ${datePublished ? `<meta property="article:published_time" content="${datePublished}" />` : ''}
  ${dateModified ? `<meta property="article:modified_time" content="${dateModified}" />` : ''}
  ${author && author.name ? `<meta property="article:author" content="${author.name}" />` : ''}
  <meta property="article:section" content="${section === 'article' ? 'Moringa guides' : section}" />`
    : '';

  const keywordsMeta = keywords
    ? `<meta name="keywords" content="${String(keywords).replace(/"/g, '&quot;')}" />`
    : '';

  const heroBlock = renderPageHero({
    section,
    eyebrow: effectiveEyebrow,
    h1,
    lead,
    dateModified,
    datePublished,
    author,
    readingTime,
    heroStats,
  });

  // Breadcrumb bar (visible). If breadcrumbTrail provided, render a pill-style bar;
  // otherwise fall back to the legacy plain string (breadcrumb prop).
  let breadcrumbHtml = '';
  if (Array.isArray(breadcrumbTrail) && breadcrumbTrail.length) {
    const items = breadcrumbTrail
      .map((t, i, arr) => {
        const isLast = i === arr.length - 1;
        if (isLast || !t.url) {
          return `<li class="crumb crumb--current" aria-current="page">${t.name}</li>`;
        }
        return `<li class="crumb"><a href="${t.url}">${t.name}</a></li>`;
      })
      .join('<li class="crumb-sep" aria-hidden="true">&rsaquo;</li>');
    breadcrumbHtml = `<nav class="breadcrumb-nav breadcrumb-nav--pill" aria-label="Breadcrumb"><ol class="breadcrumb-list">${items}</ol></nav>`;
  } else if (breadcrumb) {
    breadcrumbHtml = `<nav class="breadcrumb-nav" aria-label="Breadcrumb">${breadcrumb}</nav>`;
  }

  // Pick the right MIME type for og:image so Slack/Facebook/LinkedIn parse it.
  const imgIsWebp = /\.webp(?:[?#].*)?$/i.test(img);
  const imgIsPng = /\.png(?:[?#].*)?$/i.test(img);
  const imgIsJpg = /\.jpe?g(?:[?#].*)?$/i.test(img);
  const ogImageType = imgIsWebp ? 'image/webp' : imgIsPng ? 'image/png' : imgIsJpg ? 'image/jpeg' : 'image/svg+xml';
  // Most non-SVG OG images on this site are 1200x900 (Moringa_All_Products.webp).
  const ogImageWidth = imgIsWebp || imgIsPng || imgIsJpg ? '1200' : '1200';
  const ogImageHeight = imgIsWebp || imgIsPng || imgIsJpg ? '900' : '630';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>${title}</title>
  <meta name="description" content="${descEsc}" />
  ${keywordsMeta}
  <meta name="author" content="${author && author.name ? author.name : 'MoringaSuppliersIndia.com'}" />
  <meta name="publisher" content="Moringa Suppliers India" />
  <meta name="application-name" content="Moringa Suppliers India" />
  <meta name="apple-mobile-web-app-title" content="Moringa Suppliers India" />
  <link rel="canonical" href="${canonical}" />
  <link rel="alternate" hreflang="en" href="${canonical}" />
  <link rel="alternate" hreflang="x-default" href="${canonical}" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1" />
  <meta name="bingbot" content="index, follow" />
  <meta name="theme-color" content="#2d8a3a" />
  <meta name="msapplication-TileColor" content="#2d8a3a" />
  <meta name="color-scheme" content="light" />
  <meta name="format-detection" content="telephone=no" />
  <meta name="referrer" content="strict-origin-when-cross-origin" />
  <meta http-equiv="X-Content-Type-Options" content="nosniff" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <!-- Google Search Console: HTML meta-tag verification method (works alongside DNS TXT). -->
  <meta name="google-site-verification" content="f08AcNGqwN3eeVx55GkFpMA4CDRYx7Sr5cw9_V4g7OQ" />
  <!--
    Favicon priority (matters for Google's SERP brand mark):
      1. /logo.svg   = primary brand mark, 256x256, used on the search result favicon dot.
      2. /favicon.svg = same green leaf, smaller viewBox for tabs that prefer 64x64.
    Listing logo.svg first with sizes="any" tells Google we have a high-quality square brand
    icon, which is what's needed to replace the generic globe in search results.
  -->
  <link rel="icon" href="/logo.svg" type="image/svg+xml" sizes="any" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="64x64" />
  <link rel="shortcut icon" href="/logo.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/logo.svg" sizes="180x180" />
  <link rel="mask-icon" href="/logo.svg" color="#2d8a3a" />
  <link rel="manifest" href="/site.webmanifest" />
  <link rel="dns-prefetch" href="//fonts.googleapis.com" />
  <link rel="dns-prefetch" href="//fonts.gstatic.com" />
  <link rel="dns-prefetch" href="//pagead2.googlesyndication.com" />
  <meta property="og:type" content="${ogType}" />
  <meta property="og:locale" content="en_IN" />
  <meta property="og:site_name" content="Moringa Suppliers India" />
  <meta property="og:title" content="${titleEsc}" />
  <meta property="og:description" content="${descEsc}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${img}" />
  <meta property="og:image:secure_url" content="${img}" />
  <meta property="og:image:width" content="${ogImageWidth}" />
  <meta property="og:image:height" content="${ogImageHeight}" />
  <meta property="og:image:alt" content="${titleEsc}" />
  <meta property="og:image:type" content="${ogImageType}" />
  ${articleMeta}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@MoringaIndia" />
  <meta name="twitter:title" content="${titleEsc}" />
  <meta name="twitter:description" content="${descEsc}" />
  <meta name="twitter:image" content="${img}" />
  <meta name="twitter:image:alt" content="${titleEsc}" />
${GA}
${ADSENSE}
${FONTS}
  ${schemaBlock}
  ${extraHeadTags}
</head>
<body data-section="${section}">
${nav()}
<main id="main" class="page-shell page-shell--${section}">
  ${breadcrumbHtml}
  ${heroBlock}
  <article class="page-content wide page-content--${section}">
    <div class="container">
      ${content}
    </div>
  </article>
</main>
${footer()}
</body>
</html>`;
}

function write(rel, html) {
  const p = path.join(root, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, fixHtml(html), 'utf8');
  console.log('wrote', rel);
}

module.exports = {
  SITE,
  OG_DEFAULT_IMAGE,
  ASSET_VER,
  AMZ,
  INDIAMART,
  AFFILIATE_BOX,
  GA,
  FONTS,
  ORG_NODE,
  WEBSITE_NODE,
  DEFAULT_AUTHOR,
  topBar: () => '',
  nav,
  footer,
  amazonBtn,
  amazonBtnSmall,
  indiamartBtn,
  indiamartBtnSmall,
  layout,
  write,
  sectionFromCanonical,
  breadcrumbSchema,
  absUrl,
};
