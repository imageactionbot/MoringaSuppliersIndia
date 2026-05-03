/**
 * Shared layout shell for generated pages (legal, products, brands, compare, articles).
 * Root = repo root (parent of scripts/).
 */
const fs = require('fs');
const path = require('path');
const { fixHtml } = require('../normalize-html-dashes');
const root = path.join(__dirname, '..', '..');

/** Must match GitHub Pages CNAME (www) so canonicals match the live host Google indexes. */
const SITE = 'https://www.moringasuppliersindia.com';
/** Default Open Graph / Twitter preview (repo asset; hero uses Moringa_All_Products.webp). */
const OG_DEFAULT_IMAGE = `${SITE}/og-brand.svg`;
/** Bust CDN/browser cache when CSS/JS change; bump after edits to main.css or main.js. */
const ASSET_VER = '15';

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

const FONTS = `  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/main.css?v=${ASSET_VER}" />`;

function topBar() {
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
    <a href="/about.html">About us</a>
    <a href="/articles/">Moringa guides</a>
    <a href="/products/">Product guides</a>
    <a href="/brands/">Brand guides</a>
    <a href="/compare/">Comparisons</a>
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
        <p class="footer-owner-line">Avinash Chauhan · Independent developer &amp; site owner</p>
        <div class="footer-contact-mini">
          ✉️ <a href="mailto:moringasuppliersindia@gmail.com">moringasuppliersindia@gmail.com</a>
        </div>
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
    </div>
    <div class="footer-bottom" style="flex-direction:column;align-items:flex-start;gap:0.6rem;">
      <div class="footer-affiliate-line">
        <strong>Amazon Associates:</strong> <em>As an Amazon Associate, I earn from qualifying purchases.</em>
        <a href="/legal/affiliate-disclosure.html">Details</a>
      </div>
      <div style="display:flex;flex-wrap:wrap;justify-content:space-between;width:100%;padding-top:0.8rem;border-top:1px solid rgba(255,255,255,0.06);">
        <div>© 2026 MoringaSuppliersIndia.com</div>
        <div class="last-updated">Last updated: May 3, 2026</div>
      </div>
    </div>
  </div>
</footer>
<button class="scroll-top" id="scrollTopBtn" aria-label="Top">↑</button>
<div class="cookie-notice" id="cookieNotice" role="dialog" aria-label="Cookie notice"><span>🍪 Analytics cookies.</span><button type="button" id="acceptCookies">Accept</button></div>
<script defer src="/assets/js/main.js?v=${ASSET_VER}"></script>`;
}

function amazonBtn(href, label) {
  return `<a href="${href}" class="amazon-btn" target="_blank" rel="sponsored nofollow noopener" aria-label="${label} (affiliate)">🛒 ${label}</a>`;
}

function amazonBtnSmall(href, label) {
  return `<a href="${href}" class="amazon-btn-small" target="_blank" rel="sponsored nofollow noopener">${label}</a>`;
}

function layout({ title, description, canonical, ogImage, breadcrumb, h1, lead, content, schemaJson }) {
  const img = ogImage || OG_DEFAULT_IMAGE;
  const titleEsc = title.replace(/"/g, '&quot;');
  const descEsc = description.replace(/"/g, '&quot;');
  const schema = schemaJson
    ? `<script type="application/ld+json">${JSON.stringify(schemaJson)}</script>`
    : '';
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${descEsc}" />
  <link rel="canonical" href="${canonical}" />
  <meta name="robots" content="index, follow" />
  <meta name="theme-color" content="#2d8a3a" />
  <meta name="msapplication-TileColor" content="#2d8a3a" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any" />
  <link rel="icon" href="/logo.svg" type="image/svg+xml" sizes="256x256" />
  <link rel="apple-touch-icon" href="/logo.svg" sizes="180x180" />
  <link rel="mask-icon" href="/favicon.svg" color="#2d8a3a" />
  <link rel="manifest" href="/site.webmanifest" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Moringa Suppliers India" />
  <meta property="og:title" content="${titleEsc}" />
  <meta property="og:description" content="${descEsc}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${img}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:type" content="image/svg+xml" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${titleEsc}" />
  <meta name="twitter:description" content="${descEsc}" />
  <meta name="twitter:image" content="${img}" />
  ${GA}
  ${FONTS}
  ${schema}
</head>
<body>
${topBar()}
${nav()}
<main id="main">
  <nav class="breadcrumb-nav" aria-label="Breadcrumb">${breadcrumb}</nav>
  <header class="page-hero">
    <div class="container">
      <h1>${h1}</h1>
      <p class="lead">${lead}</p>
    </div>
  </header>
  <article class="page-content wide">
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
  AFFILIATE_BOX,
  GA,
  FONTS,
  topBar,
  nav,
  footer,
  amazonBtn,
  amazonBtnSmall,
  layout,
  write,
};
