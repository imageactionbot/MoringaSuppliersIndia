# -*- coding: utf-8 -*-
"""Generate 10 Moringa business / farming HTML articles for MoringaSuppliersIndia.com"""
from __future__ import annotations

import json
from pathlib import Path

from moringa_business_article_bodies import EXTRA_ARTICLES
from moringa_business_article_batch2 import BATCH2_ARTICLES
from moringa_business_article_batch3 import BATCH3_ARTICLES

ROOT = Path(__file__).resolve().parent.parent
ART_DIR = ROOT / "articles"

NAV_AND_FOOTER_TAIL = r"""
<footer class="footer-pro">
  <div class="footer-pro-inner">
    <div class="footer-cols">
      <div class="footer-col">
        <div class="footer-brand-logo">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M16 4C10 4 5 10 5 18C5 24 10 28 16 28C22 28 27 24 27 18C27 10 22 4 16 4Z" fill="#4cae5a" opacity="0.25"/><path d="M16 4C16 4 8 8 8 18C8 24 11.5 28 16 28" stroke="#b8e0c0" stroke-width="2" stroke-linecap="round"/><path d="M16 4C16 4 24 8 24 18C24 24 20.5 28 16 28" stroke="#b8e0c0" stroke-width="2" stroke-linecap="round"/><path d="M16 28V14" stroke="#d4a53a" stroke-width="1.5" stroke-linecap="round"/></svg>
          Moringa<span>Suppliers</span>India
        </div>
        <p class="footer-tagline">U.S. readers first &mdash; Amazon.com retail (USD) and IndiaMART bulk RFQs (both usable from the United States). India export &amp; supplier verification second. Global readers welcome third. Independent editorial.</p>
        <p class="footer-owner-line">Avinash Chauhan &middot; Publisher &middot; B.Sc. CS (University of Mumbai) &middot; <a href="https://imageactionbot.com" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:underline;text-underline-offset:2px;">ImageActionBot</a></p>
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
        <li><a href="/">Home &mdash; U.S. retail + India sourcing</a></li>
      </ul></div>
      <div class="footer-col"><h4>Legal</h4><ul>
        <li><a href="/legal/disclaimer.html">Disclaimer</a></li>
        <li><a href="/legal/privacy.html">Privacy</a></li>
        <li><a href="/legal/terms.html">Terms</a></li>
        <li><a href="/legal/cookies.html">Cookies</a></li>
        <li><a href="/legal/affiliate-disclosure.html">Affiliate disclosure</a></li>
      </ul></div>
      <div class="footer-col footer-col--tools">
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
      </div>
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
<div class="page-tools-dock" id="pageToolsDock">
<div class="guide-assist" id="guideAssist">
  <button type="button" class="guide-assist-fab" id="guideAssistToggle" aria-expanded="false" aria-controls="guideAssistPanel" aria-label="Help: retail, wholesale, and purity checklist">Help</button>
  <div class="guide-assist-panel" id="guideAssistPanel" role="dialog" aria-modal="true" aria-label="Quick choices" hidden>
    <p class="guide-assist-lead">Pick a path &mdash; we send you to the right retail guide or B2B marketplace listing.</p>
    <a class="guide-assist-link guide-assist-link--amz" href="/products/">&#128717;&#65039; Buy small quantity (Amazon guides)</a>
    <a class="guide-assist-link guide-assist-link--b2b" href="https://IndiaMART.in/v/yNRgBEqn" target="_blank" rel="sponsored nofollow noopener">&#127981; Source in bulk (IndiaMART)</a>
    <a class="guide-assist-link guide-assist-link--doc" href="/purity-checklist.html">&#128196; Purity checklist (print / save as PDF)</a>
    <button type="button" class="guide-assist-close" id="guideAssistClose">Close</button>
  </div>
</div>
<button class="scroll-top" id="scrollTopBtn" aria-label="Scroll to top">&uarr;</button>
</div>
<script defer src="/assets/js/main.js?v=45"></script>
</body>
</html>
"""

MID_CTA = """
<aside class="article-mid-cta" role="complementary" aria-label="Amazon retail shortcuts">
<p class="article-mid-cta-note">Retail shortcuts (affiliate &mdash; see disclosure at top):</p>
<div class="article-mid-cta-row">
<a href="https://amzn.to/4tgLfJV" class="amazon-btn-small" target="_blank" rel="sponsored nofollow noopener">Organic India &mdash; leaf powder</a>
<a href="https://amzn.to/3P1LYAz" class="amazon-btn-small" target="_blank" rel="sponsored nofollow noopener">Organic India &mdash; capsules</a>
<a href="https://amzn.to/4unGter" class="amazon-btn-small" target="_blank" rel="sponsored nofollow noopener">Moringa / herbal teas</a>
</div>
</aside>
"""

def article_footer(related_slug_titles: list[tuple[str, str]]) -> str:
    lis = "".join(
        f'<li><a href="/articles/{slug}">{title}</a></li>\n' for slug, title in related_slug_titles
    )
    return f"""
<h2>More on Moringa (editorial hub)</h2>
<p>Pair this with <a href="/articles/import-moringa-from-india-step-by-step.html">import step-by-step</a>, <a href="/articles/moringa-export-quality-standards.html">export quality standards</a>, and <a href="/articles/how-to-contact-indian-moringa-suppliers.html">contacting Indian suppliers</a>. For retail benchmarking, see <a href="/brands/">brand guides</a>. Bulk RFQs: <a href="https://IndiaMART.in/v/yNRgBEqn" target="_blank" rel="sponsored nofollow noopener">IndiaMART</a> (affiliate).</p>
<p><em>Last updated: May 2026.</em></p>
<section class="article-cta-panel" aria-label="Amazon shopping">
<h2>Compare on Amazon</h2>
<p class="article-cta-lead">Amazon runs checkout, returns, and pricing. Re-check the listing title and organic seal before you order.</p>
<div class="amazon-compare-row article-cta-buttons">
<a href="https://amzn.to/4tgLfJV" class="amazon-btn" target="_blank" rel="sponsored nofollow noopener" aria-label="Organic India powder (affiliate)">&#128722; Organic India leaf powder</a>
<a href="https://amzn.to/3P1LYAz" class="amazon-btn" target="_blank" rel="sponsored nofollow noopener" aria-label="Organic India capsules (affiliate)">&#128722; Organic India capsules</a>
</div>
<div class="article-cta-more"><span class="article-cta-more-label">More options:</span><a href="https://amzn.to/4eoPUWq" class="amazon-btn-small" target="_blank" rel="sponsored nofollow noopener">Vahdam</a><a href="https://amzn.to/4wck5Xo" class="amazon-btn-small" target="_blank" rel="sponsored nofollow noopener">Kuli Kuli</a><a href="https://amzn.to/4unGter" class="amazon-btn-small" target="_blank" rel="sponsored nofollow noopener">Tea picks</a></div>
<p class="article-cta-fineprint">Prices and Prime eligibility can change without notice.</p>
</section>
<aside class="b2b-strip article-b2b-strip" role="complementary" aria-label="Bulk buyer shortcut">
  <div>
    <span class="b2b-strip-eyebrow">Buying in bulk?</span>
    <h3>Get the best price on Moringa from <strong>Indian suppliers</strong> directly</h3>
    <p>If you are sourcing moringa <strong>by the kilo or the ton</strong>, <a href="https://IndiaMART.in/v/yNRgBEqn" target="_blank" rel="sponsored nofollow noopener">IndiaMART</a> connects you with verified Indian moringa suppliers in minutes (affiliate).</p>
  </div>
  <div class="b2b-strip-cta"><a href="https://IndiaMART.in/v/yNRgBEqn" class="indiamart-btn" target="_blank" rel="sponsored nofollow noopener" aria-label="Get best price on IndiaMART (affiliate)">&#127981; Get best price on IndiaMART</a></div>
  <p class="b2b-strip-disclosure"><strong>Disclosure:</strong> Affiliate link &mdash; we may earn a small referral fee at no cost to you. <a href="/legal/affiliate-disclosure.html" style="color:#c8451f;font-weight:600;">Policy</a>.</p>
</aside>
<div class="related-articles" style="margin-top:2.5rem;padding-top:2rem;border-top:1px solid var(--green-pale);">
<h2>More authority topics</h2>
<ul class="related-articles-list">
{lis}
</ul>
<p><a href="/articles/">&larr; All guides</a> (78 articles) &middot; <a href="/products/">Product guides</a> &middot; <a href="/brands/">Brand guides</a> &middot; <a href="/compare/">Comparisons</a></p>
</div>
</div>
"""


def build_nav_main_open(breadcrumb_label: str, h1: str, lead: str) -> str:
    return f"""<a class="skip-link" href="#main">Skip to main content</a>
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
    <a href="/#start-here"><strong>Start here &mdash; how to use this site</strong></a>
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
<div class="nav-mobile-backdrop" id="navMobileBackdrop" hidden aria-hidden="true"></div>
<main id="main" class="page-shell page-shell--article">
  <nav class="breadcrumb-nav breadcrumb-nav--pill" aria-label="Breadcrumb"><ol class="breadcrumb-list"><li class="crumb"><a href="/">Home</a></li><li class="crumb-sep" aria-hidden="true">&rsaquo;</li><li class="crumb"><a href="/articles/">Articles</a></li><li class="crumb-sep" aria-hidden="true">&rsaquo;</li><li class="crumb crumb--current" aria-current="page">{breadcrumb_label}</li></ol></nav>
  <header class="page-hero page-hero--article" data-hero-section="article">
    <div class="page-hero-ornament" aria-hidden="true"></div>
    <div class="container page-hero-inner">
      <span class="page-eyebrow" aria-hidden="false"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="14" height="14"><path d="M5 4h11l3 3v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" stroke="currentColor" stroke-width="1.6"/><path d="M8 10h8M8 14h8M8 18h5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg><span>Business guide</span></span>
      <h1>{h1}</h1>
      <p class="lead">{lead}</p>
    </div>
  </header>
  <article class="page-content wide page-content--article">
    <div class="container">
      <div class="affiliate-disclosure affiliate-disclosure--compact" role="note" aria-label="Amazon Associates disclosure">
  <span class="icon" aria-hidden="true">&#9432;</span>
  <div><strong>Disclosure:</strong> <strong>As an Amazon Associate, I earn from qualifying purchases.</strong> Amazon links on this page are affiliate links (no extra cost to you). IndiaMART links may be affiliate. <a href="/legal/affiliate-disclosure.html">Full policy</a></div>
</div>
<div class="article-prose">
"""


def build_head(
    title: str,
    meta_desc: str,
    keywords: str,
    canonical_path: str,
    og_title: str,
    og_desc: str,
    og_alt: str,
    json_ld_article: dict,
) -> str:
    base = "https://www.moringasuppliersindia.com"
    url = f"{base}{canonical_path}"
    graph = [
        {
            "@type": "Organization",
            "@id": f"{base}/#organization",
            "name": "Moringa Suppliers India",
            "alternateName": ["MoringaSuppliersIndia", "Moringa Suppliers in India"],
            "url": base,
            "logo": {
                "@type": "ImageObject",
                "url": f"{base}/logo.svg",
                "width": 256,
                "height": 256,
                "caption": "Moringa Suppliers India",
            },
            "image": {
                "@type": "ImageObject",
                "url": f"{base}/Moringa_All_Products.webp",
                "caption": "Moringa products from India: powder, capsules, oil, tea, soap",
            },
            "email": "moringasuppliersindia@gmail.com",
            "founder": {"@type": "Person", "name": "Avinash Chauhan"},
            "knowsAbout": [
                "Moringa oleifera",
                "Moringa suppliers in India",
                "Organic moringa powder",
                "Moringa export from India",
            ],
            "areaServed": {"@type": "Place", "name": "Worldwide"},
        },
        {
            "@type": "WebSite",
            "@id": f"{base}/#website",
            "name": "Moringa Suppliers India",
            "alternateName": "Moringa Suppliers in India",
            "url": base,
            "publisher": {"@id": f"{base}/#organization"},
            "inLanguage": "en",
        },
        {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": "Home", "item": f"{base}/"},
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Articles",
                    "item": f"{base}/articles/",
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": json_ld_article["headline"][:80],
                },
            ],
            "@id": f"{url}#breadcrumb",
        },
        json_ld_article,
    ]
    ld_json = json.dumps({"@context": "https://schema.org", "@graph": graph}, ensure_ascii=False)
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>{title}</title>
  <meta name="description" content="{meta_desc}" />
  <meta name="keywords" content="{keywords}" />
  <meta name="author" content="Avinash Chauhan" />
  <meta name="publisher" content="Moringa Suppliers India" />
  <meta name="application-name" content="Moringa Suppliers India" />
  <meta name="apple-mobile-web-app-title" content="Moringa Suppliers India" />
  <link rel="canonical" href="{url}" />
  <link rel="alternate" hreflang="en" href="{url}" />
  <link rel="alternate" hreflang="x-default" href="{url}" />
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
  <meta name="google-site-verification" content="f08AcNGqwN3eeVx55GkFpMA4CDRYx7Sr5cw9_V4g7OQ" />
  <link rel="icon" href="/logo.svg" type="image/svg+xml" sizes="any" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="64x64" />
  <link rel="shortcut icon" href="/logo.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/logo.svg" sizes="180x180" />
  <link rel="mask-icon" href="/logo.svg" color="#2d8a3a" />
  <link rel="manifest" href="/site.webmanifest" />
  <link rel="dns-prefetch" href="//fonts.googleapis.com" />
  <link rel="dns-prefetch" href="//fonts.gstatic.com" />
  <link rel="dns-prefetch" href="//pagead2.googlesyndication.com" />
  <meta property="og:type" content="article" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:locale:alternate" content="en_IN" />
  <meta property="og:site_name" content="Moringa Suppliers India" />
  <meta property="og:title" content="{og_title}" />
  <meta property="og:description" content="{og_desc}" />
  <meta property="og:url" content="{url}" />
  <meta property="og:image" content="{base}/Moringa_All_Products.webp" />
  <meta property="og:image:secure_url" content="{base}/Moringa_All_Products.webp" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="900" />
  <meta property="og:image:alt" content="{og_alt}" />
  <meta property="og:image:type" content="image/webp" />
  <meta property="article:author" content="Avinash Chauhan" />
  <meta property="article:section" content="Moringa business" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@MoringaIndia" />
  <meta name="twitter:title" content="{og_title}" />
  <meta name="twitter:description" content="{og_desc}" />
  <meta name="twitter:image" content="{base}/Moringa_All_Products.webp" />
  <meta name="twitter:image:alt" content="{og_alt}" />
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-C7LEYP2M1L"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){{dataLayer.push(arguments);}}
    gtag('js', new Date());
    gtag('config', 'G-C7LEYP2M1L');
  </script>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5368355682383000" crossorigin="anonymous"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/main.css?v=45" />
  <script type="application/ld+json">{ld_json}</script>
</head>
<body data-section="article">
"""


RELATED_DEFAULT = [
    ("moringa-farming-profit-per-acre.html", "Moringa farming profit per acre"),
    ("moringa-export-business-india-guide.html", "Moringa export business from India"),
    ("moringa-powder-manufacturing-process.html", "Moringa powder manufacturing"),
    ("moringa-buyers-worldwide-usa-europe-middle-east.html", "Moringa buyers worldwide (methodology)"),
    ("moringa-farming-vs-cash-crops-comparison.html", "Moringa vs other cash crops"),
    ("moringa-one-acre-case-study.html", "One-acre moringa case study"),
    ("moringa-global-demand-2030-trends.html", "Global moringa demand to 2030"),
    ("high-quality-moringa-suppliers-india.html", "Vetting high-quality moringa suppliers"),
    ("moringa-business-models-farming-trading-export.html", "Moringa business models"),
    ("is-moringa-profitable-business-2026.html", "Is moringa profitable in 2026+?"),
    ("moringa-export-profit-margin-explained.html", "Export profit margin explained"),
    ("how-much-money-moringa-export-india.html", "How much money from moringa export"),
    ("moringa-export-requirements-usa-europe.html", "Export requirements: USA &amp; Europe"),
    ("moringa-wholesale-export-pricing-strategy.html", "Wholesale export pricing strategy"),
    ("moringa-farming-cost-per-acre-breakdown.html", "Farming cost per acre breakdown"),
    ("moringa-powder-manufacturing-cost-setup-india.html", "Powder manufacturing cost &amp; setup"),
    ("why-moringa-demand-increasing-worldwide.html", "Why moringa demand is rising"),
    ("moringa-international-shipping-logistics-cost-guide.html", "International shipping &amp; logistics"),
    ("moringa-supply-chain-farmer-to-exporter.html", "Supply chain: farmer to exporter"),
    ("moringa-quality-control-export-grade.html", "QC for export-grade moringa"),
]


def write_article(
    filename: str,
    title: str,
    meta_desc: str,
    keywords: str,
    breadcrumb: str,
    h1: str,
    lead: str,
    body: str,
    headline_schema: str,
    desc_schema: str,
    word_count: int,
    related: list[tuple[str, str]] | None = None,
) -> None:
    canonical_path = f"/articles/{filename}"
    url = f"https://www.moringasuppliersindia.com{canonical_path}"
    article_ld = {
        "@type": "Article",
        "headline": headline_schema,
        "description": desc_schema,
        "url": url,
        "mainEntityOfPage": {"@type": "WebPage", "@id": url},
        "wordCount": word_count,
        "timeRequired": f"PT{max(5, word_count // 250)}M",
        "inLanguage": "en",
        "articleSection": "Moringa business",
        "keywords": keywords,
        "author": {
            "@type": "Person",
            "name": "Avinash Chauhan",
            "url": "https://www.moringasuppliersindia.com/about.html",
        },
        "publisher": {"@id": "https://www.moringasuppliersindia.com/#organization"},
        "image": {
            "@type": "ImageObject",
            "url": "https://www.moringasuppliersindia.com/og-brand.svg",
            "width": 1200,
            "height": 630,
        },
    }
    if related is None:
        rel = [(s, t) for s, t in RELATED_DEFAULT if s != filename]
    else:
        rel = related
    html = (
        build_head(
            title,
            meta_desc.replace('"', "&quot;"),
            keywords,
            canonical_path,
            og_title=title.replace("&amp;", "&")[:200],
            og_desc=meta_desc.replace('"', "&quot;")[:300],
            og_alt=headline_schema[:120],
            json_ld_article=article_ld,
        )
        + build_nav_main_open(breadcrumb, h1, lead)
        + body
        + MID_CTA
        + article_footer(rel)
        + "\n    </div>\n  </article>\n</main>\n"
        + NAV_AND_FOOTER_TAIL
    )
    (ART_DIR / filename).write_text(html, encoding="utf-8")
    print("Wrote", filename)


def main() -> None:
    # --- 1 ---
    write_article(
        "moringa-farming-profit-per-acre.html",
        title="Moringa Farming Profit Per Acre: Costs, Revenue &amp; ROI Breakdown (2026) | MoringaSuppliersIndia",
        meta_desc="Moringa farming profit per acre: define your product (fresh vs dry vs powder intent), cost buckets, revenue sensitivity, and planning ranges for India and global investors.",
        keywords="moringa farming profit per acre, moringa ROI, moringa cultivation cost, moringa farm India, moringa leaf yield, moringa business",
        breadcrumb="Moringa profit per acre",
        h1="Moringa Farming Profit Per Acre",
        lead="ROI is a system output: harvest peaks, dry-down losses, and buyer specs matter more than a headline number.",
        headline_schema="Moringa Farming Profit Per Acre",
        desc_schema="Cost and ROI breakdown for moringa leaf farming with planning ranges and export-grade quality context.",
        word_count=1650,
        body=r"""<p>Profit per acre for <em>Moringa oleifera</em> leaf systems depends on what you sell. Fresh leaf, dried leaf, and &ldquo;powder-intent&rdquo; material are different SKUs with different hygiene and moisture rules.</p>
<h2>Define the product before you model profit</h2>
<p>Export-oriented buyers ultimately behave like ingredient purchasers: they react to <strong>moisture</strong>, <strong>microbiology</strong>, foreign matter, and consistency across lots.</p>
<h2>Revenue levers</h2>
<ul>
<li><strong>Harvest schedule and recovery:</strong> labor peaks can cap real output.</li>
<li><strong>Post-harvest losses:</strong> spoilage and poor drying shrink sellable kilograms faster than-field &ldquo;promise.&rdquo;</li>
<li><strong>Market channel:</strong> local mandi liquidity differs from certified dried channels.</li>
</ul>
<h2>Cost buckets (build from quotes)</h2>
<ul>
<li>Establishment and irrigation</li>
<li>Inputs and field operations</li>
<li>Harvest labor (often underestimated)</li>
<li>Drying, sorting, bags, storage</li>
<li>Testing / certification allocation if you pursue organic export narratives</li>
</ul>
<h2>Planning table (illustrative USD ranges only)</h2>
<table style="width:100%;border-collapse:collapse;margin:1rem 0;font-size:0.95rem;">
<thead><tr style="border-bottom:2px solid var(--green-pale);text-align:left;"><th style="padding:0.5rem;">Line</th><th style="padding:0.5rem;">Notes</th></tr></thead>
<tbody>
<tr style="border-bottom:1px solid var(--green-pale);"><td style="padding:0.5rem;">Operating cash costs / acre / year</td><td style="padding:0.5rem;">Replace with local budgets; swings are normal.</td></tr>
<tr style="border-bottom:1px solid var(--green-pale);"><td style="padding:0.5rem;">Dry leaf equivalent output</td><td style="padding:0.5rem;">Sensitivity #1&mdash;track moisture honestly.</td></tr>
<tr style="border-bottom:1px solid var(--green-pale);"><td style="padding:0.5rem;">Effective price / kg dry equivalent</td><td style="padding:0.5rem;">Depends on quality and contract, not social media.</td></tr>
</tbody></table>
<h2>India ecosystem note</h2>
<p>India offers dense clusters of dryers and exporters; many farms improve <strong>realized</strong> margin by partnering with processors who publish serious COA discipline.</p>
<h2>Pro tips</h2>
<ul>
<li>Model a <strong>bad week</strong> (labor shortage) and a <strong>failed micro trial</strong> before you invest.</li>
<li>Treat export price lists as conditional on <strong>spec matching</strong>.</li>
</ul>
<h2>Common mistakes</h2>
<ul>
<li>Using one bumper harvest as a lifetime assumption.</li>
<li>Confusing fresh yield photos with sellable dried mass.</li>
</ul>
<h2>FAQ</h2>
<p><strong>Is organic always more profitable?</strong> Only if premium covers audit time, compliance, and yield risk.</p>
<p><strong>What should I validate first?</strong> Labor scheduling and drying pathway.</p>
<p><strong>Where can I connect to bulk buyers?</strong> Use importer education first: <a href="/articles/how-to-contact-indian-moringa-suppliers.html">supplier contact guide</a>.</p>
<h2>Conclusion</h2>
<p>Build profit per acre from <strong>loss reduction</strong> and <strong>spec stability</strong>. Numbers without post-harvest discipline are fiction.</p>
""",
    )

    for spec in EXTRA_ARTICLES:
        write_article(**spec)
    for spec in BATCH2_ARTICLES:
        write_article(**spec)
    for spec in BATCH3_ARTICLES:
        write_article(**spec)

    print("Done. Wrote", 1 + len(EXTRA_ARTICLES) + len(BATCH2_ARTICLES) + len(BATCH3_ARTICLES), "business articles.")

if __name__ == "__main__":
    main()
