/**
 * One-shot generator for multi-page Moringa Suppliers India site.
 * Run: node scripts/generate-site.js
 */
const {
  SITE,
  AMZ,
  AFFILIATE_BOX,
  layout,
  write,
  amazonBtn,
  amazonBtnSmall,
} = require('./lib/site-shell');
const {
  buyStrip,
  productsHubLong,
  productGuideLong,
  brandsHubLong,
  brandPageLong,
  compareHubLong,
  comparePageLong,
} = require('./lib/affiliate-blocks');
const {
  disclaimerBody,
  privacyBody,
  termsBody,
  cookiesBody,
  affiliateDisclosureBody,
} = require('./lib/legal-blocks');

function stripTags(s) {
  return String(s).replace(/<[^>]*>/g, '');
}

// --- Legal ---
write('legal/disclaimer.html', layout({
  title: 'Disclaimer | Moringa Suppliers India',
  description: 'Disclaimer for MoringaSuppliersIndia.com — informational use, no endorsement of suppliers, affiliate transparency.',
  canonical: `${SITE}/legal/disclaimer.html`,
  breadcrumb: `<a href="/">Home</a> / Disclaimer`,
  h1: 'Disclaimer',
  lead: 'How we publish information and what we do not guarantee.',
  content: disclaimerBody(),
  schemaJson: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Disclaimer',
    url: `${SITE}/legal/disclaimer.html`,
    isPartOf: { '@type': 'WebSite', url: SITE },
  },
}));

write('legal/privacy.html', layout({
  title: 'Privacy Policy | Moringa Suppliers India',
  description: 'Privacy policy for MoringaSuppliersIndia.com — analytics, cookies, WhatsApp/email contact, and your rights.',
  canonical: `${SITE}/legal/privacy.html`,
  breadcrumb: `<a href="/">Home</a> / Privacy`,
  h1: 'Privacy Policy',
  lead: 'What we collect and how we use it.',
  content: privacyBody(),
  schemaJson: { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Privacy Policy', url: `${SITE}/legal/privacy.html` },
}));

write('legal/terms.html', layout({
  title: 'Terms of Use | Moringa Suppliers India',
  description: 'Terms of use for MoringaSuppliersIndia.com — informational site, no warranty, governing law India.',
  canonical: `${SITE}/legal/terms.html`,
  breadcrumb: `<a href="/">Home</a> / Terms`,
  h1: 'Terms of Use',
  lead: 'Rules for using this website.',
  content: termsBody(),
  schemaJson: { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Terms of Use', url: `${SITE}/legal/terms.html` },
}));

write('legal/cookies.html', layout({
  title: 'Cookie Policy | Moringa Suppliers India',
  description: 'Cookie policy — Google Analytics on MoringaSuppliersIndia.com and how to manage cookies.',
  canonical: `${SITE}/legal/cookies.html`,
  breadcrumb: `<a href="/">Home</a> / Cookies`,
  h1: 'Cookie Policy',
  lead: 'Cookies used on this site.',
  content: cookiesBody(),
  schemaJson: { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Cookie Policy', url: `${SITE}/legal/cookies.html` },
}));

write('legal/affiliate-disclosure.html', layout({
  title: 'Affiliate Disclosure | Moringa Suppliers India',
  description: 'Amazon Associates disclosure — as an Amazon Associate I earn from qualifying purchases. FTC transparency.',
  canonical: `${SITE}/legal/affiliate-disclosure.html`,
  breadcrumb: `<a href="/">Home</a> / Affiliate disclosure`,
  h1: 'Affiliate Disclosure',
  lead: 'Amazon Associates Program participation and how we label links.',
  content: affiliateDisclosureBody(),
  schemaJson: { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Affiliate Disclosure', url: `${SITE}/legal/affiliate-disclosure.html` },
}));

// --- About (site owner & editorial) ---
const aboutContent = `${AFFILIATE_BOX}
<p><strong>MoringaSuppliersIndia.com</strong> is an independent editorial project focused on one goal: help global buyers and curious consumers understand <em>Moringa oleifera</em> from India with clear sourcing context, certifications, and honest retail options (Amazon US affiliate links where relevant).</p>
<p>We do <strong>not</strong> sell Moringa as a merchant, and we do <strong>not</strong> take fees from suppliers listed for informational reference. Commercial pages disclose Amazon Associates participation so you always know when a click may earn a small commission at no extra cost to you.</p>
<div class="about-card" style="margin-top:1.75rem;">
  <h3 style="margin-bottom:0.75rem;color:var(--green-deep);font-size:1.2rem;">Site owner</h3>
  <p style="font-size:1rem;line-height:1.75;color:var(--text-body);margin-bottom:0.75rem;"><strong>Avinash Chauhan</strong> publishes and maintains this website. Editorial updates prioritize accuracy, plain-language explanations, and practical checklists (organic seals, lab vocabulary, export documents) over hype.</p>
  <p style="font-size:0.95rem;line-height:1.75;color:var(--text-body);margin-bottom:0;">Primary contact: <a href="mailto:moringasuppliersindia@gmail.com">moringasuppliersindia@gmail.com</a> &mdash; for corrections, partnership notes on disclosures, or sourcing questions we can answer in an editorial capacity.</p>
  <div class="editorial-meta" style="margin-top:1.25rem;">
    <div><div class="em-label">Also on home</div><div class="em-value"><a href="/#about">Editorial standards block</a></div></div>
    <div><div class="em-label">Retail guides</div><div class="em-value"><a href="/products/">Product hub</a> &middot; <a href="/brands/">Brands</a></div></div>
    <div><div class="em-label">Deep reads</div><div class="em-value"><a href="/articles/">Articles index</a></div></div>
  </div>
</div>
<p style="margin-top:2rem;font-size:0.9rem;color:var(--text-muted);">Nothing on this site is medical advice. Always confirm certificates and listings with suppliers or your healthcare professional as appropriate.</p>`;

write('about.html', layout({
  title: 'About Us | Moringa Suppliers India',
  description: 'About MoringaSuppliersIndia.com, owner Avinash Chauhan, editorial standards, and how to contact us.',
  canonical: `${SITE}/about.html`,
  breadcrumb: `<a href="/">Home</a> / About us`,
  h1: 'About MoringaSuppliersIndia',
  lead: 'Who runs this site, how we make money (and how we do not), and how to reach us.',
  content: aboutContent,
  schemaJson: {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Moringa Suppliers India',
    url: `${SITE}/about.html`,
    description: 'About the MoringaSuppliersIndia.com editorial project and site owner.',
    isPartOf: { '@type': 'WebSite', name: 'Moringa Suppliers India', url: SITE },
    about: {
      '@type': 'Organization',
      name: 'Moringa Suppliers India',
      url: SITE,
      email: 'moringasuppliersindia@gmail.com',
      founder: { '@type': 'Person', name: 'Avinash Chauhan' },
    },
  },
}));

// --- Products hub ---
const productsHubContent = `${AFFILIATE_BOX}
<p>Deep-dive guides by product type — each page explains what to look for (organic certs, heavy metals, packaging) and lists vetted Amazon options with affiliate links.</p>
<div class="grid-2" style="margin-top:2rem;">
  <a class="card" href="/products/moringa-powder.html" style="text-decoration:none;color:inherit;"><h3>🌿 Moringa powder</h3><p>Leaf powder — the core retail format. <strong>Guide →</strong></p></a>
  <a class="card" href="/products/moringa-capsules.html" style="text-decoration:none;color:inherit;"><h3>💊 Capsules</h3><p>Daily convenience. <strong>Guide →</strong></p></a>
  <a class="card" href="/products/moringa-tea.html" style="text-decoration:none;color:inherit;"><h3>🍵 Tea</h3><p>Wellness &amp; gifting. <strong>Guide →</strong></p></a>
  <a class="card" href="/products/moringa-oil.html" style="text-decoration:none;color:inherit;"><h3>🌰 Oil</h3><p>Cosmetic &amp; culinary grades. <strong>Guide →</strong></p></a>
  <a class="card" href="/products/moringa-skincare.html" style="text-decoration:none;color:inherit;"><h3>🧴 Skincare</h3><p>Serums, creams, soaps. <strong>Guide →</strong></p></a>
</div>
${productsHubLong()}
${buyStrip()}
<p style="margin-top:2rem;"><a href="/">← Full India sourcing guide (home)</a></p>`;

write('products/index.html', layout({
  title: 'Moringa Product Buyer Guides (Amazon US) | Moringa Suppliers India',
  description: 'Guides for Moringa powder, capsules, tea, oil, and skincare on Amazon — organic certs, what to check, and affiliate links to top brands.',
  canonical: `${SITE}/products/`,
  breadcrumb: `<a href="/">Home</a> / Products`,
  h1: 'Moringa product guides',
  lead: 'Retail buyer guides for the most common Moringa formats on Amazon.com (US).',
  content: productsHubContent,
  schemaJson: {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Moringa product guides',
    url: `${SITE}/products/`,
    hasPart: [
      { '@type': 'WebPage', name: 'Moringa powder', url: `${SITE}/products/moringa-powder.html` },
      { '@type': 'WebPage', name: 'Moringa capsules', url: `${SITE}/products/moringa-capsules.html` },
    ],
  },
}));

function productPage({ slug, title, description, h1, lead, featuredHref, featuredLabel, extraRows }) {
  const canonical = `${SITE}/products/${slug}.html`;
  const rows = extraRows
    .map(
      (r) =>
        `<tr><td>${r.name}</td><td>${r.note}</td><td>${amazonBtnSmall(r.href, 'Amazon')}</td></tr>`
    )
    .join('');
  const content = `${AFFILIATE_BOX}
<section class="prime-buy-block" aria-label="Featured Amazon pick">
<h3>Featured pick — tap when you have 30 seconds to verify the listing</h3>
<p style="font-size:0.95rem;color:var(--text-muted);max-width:42rem;">Use this button the moment you are ready to read ingredients and reviews on Amazon. If the title, organic seal, or pack size does not match what you want, hit back and re-open this guide—we would rather you skip a purchase than buy the wrong SKU.</p>
<p>${amazonBtn(featuredHref, featuredLabel)}</p>
</section>
${productGuideLong(slug, stripTags(h1))}
<h3>Other brands readers compare</h3>
<div class="table-wrapper"><table><thead><tr><th>Brand</th><th>Note</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>
${buyStrip()}
<p style="margin-top:1.5rem;font-size:0.85rem;color:var(--text-muted);">We do not guarantee Amazon search results for shortened links point to a single SKU — always confirm product title and organic seals on Amazon before purchase.</p>
<p><a href="/products/">← All product guides</a> · <a href="/">India sourcing guide</a></p>`;
  return layout({
    title,
    description,
    canonical,
    breadcrumb: `<a href="/">Home</a> / <a href="/products/">Products</a> / ${h1.replace(/<[^>]+>/g, '')}`,
    h1,
    lead,
    content,
    schemaJson: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: h1,
      url: canonical,
      numberOfItems: extraRows.length + 1,
    },
  });
}

write(
  'products/moringa-powder.html',
  productPage({
    slug: 'moringa-powder',
    title: 'Best Organic Moringa Powder on Amazon (2026 Guide) | Moringa Suppliers India',
    description: 'How to choose Moringa leaf powder on Amazon — USDA organic, India-grown options from Organic India, Terrasoul, Kuli Kuli, 24 Mantra, Banyan & more.',
    h1: 'Moringa leaf powder — Amazon buyer guide',
    lead: 'Powder is the most popular format. Compare trusted organic brands without hype.',
    featuredHref: AMZ.organicIndiaPowder,
    featuredLabel: 'Check price — Organic India powder (affiliate)',
    extraRows: [
      { name: 'Terrasoul Superfoods', note: 'USDA organic leaf powder; smoothie-friendly', href: AMZ.terrasoul },
      { name: 'Kuli Kuli', note: 'US-focused moringa brand; powder & blends', href: AMZ.kuliKuli },
      { name: '24 Mantra Organic', note: 'Indian organic grocery line; popular in US', href: AMZ.mantra24 },
      { name: 'Banyan Botanicals', note: 'Ayurvedic herb supplier; India-sourced lines', href: AMZ.banyan },
      { name: 'Sunfood Superfoods', note: 'Broad superfoods catalog', href: AMZ.sunfood },
      { name: 'Micro Ingredients', note: 'Bulk-style organic powders', href: AMZ.microIngredients },
      { name: 'Vahdam India', note: 'Premium tea & superfoods packaging', href: AMZ.vahdam },
      { name: 'Indus Valley', note: 'Ayurvedic / organic personal care & foods', href: AMZ.indusValley },
    ],
  })
);

write(
  'products/moringa-capsules.html',
  productPage({
    slug: 'moringa-capsules',
    title: 'Moringa Capsules on Amazon — Buyer Guide | Moringa Suppliers India',
    description: 'Moringa capsules on Amazon.com: Organic India, Kuli Kuli, Banyan, Micro Ingredients — what to verify on the label before you buy.',
    h1: 'Moringa capsules — Amazon buyer guide',
    lead: 'Convenient dosing; check organic certification and fill material (vegan vs gelatin).',
    featuredHref: AMZ.organicIndiaCapsules,
    featuredLabel: 'Check price — Organic India capsules (affiliate)',
    extraRows: [
      { name: 'Kuli Kuli', note: 'Organic moringa capsules', href: AMZ.kuliKuli },
      { name: 'Banyan Botanicals', note: 'Ayurvedic capsules', href: AMZ.banyan },
      { name: 'Micro Ingredients', note: 'High-volume powder / capsule formats', href: AMZ.microIngredients },
    ],
  })
);

write(
  'products/moringa-tea.html',
  productPage({
    slug: 'moringa-tea',
    title: 'Moringa Tea on Amazon — Buyer Guide | Moringa Suppliers India',
    description: 'Moringa herbal tea on Amazon: blends, pure leaf tea bags, and premium Indian tea houses.',
    h1: 'Moringa tea — Amazon buyer guide',
    lead: 'Great for gifting and daily ritual; watch for added flavors vs pure moringa.',
    featuredHref: AMZ.tea,
    featuredLabel: 'Check price — Moringa tea picks (affiliate)',
    extraRows: [
      { name: 'Vahdam India', note: 'Premium Indian teas & superfood blends', href: AMZ.vahdam },
      { name: 'Organic India', note: 'Herbal infusions & wellness line', href: AMZ.organicIndia },
      { name: 'Indus Valley', note: 'Ayurvedic wellness products', href: AMZ.indusValley },
    ],
  })
);

write(
  'products/moringa-oil.html',
  productPage({
    slug: 'moringa-oil',
    title: 'Moringa Oil on Amazon — Buyer Guide | Moringa Suppliers India',
    description: 'Cold-pressed Moringa seed oil for skin and hair — how to read labels on Amazon.',
    h1: 'Moringa oil — Amazon buyer guide',
    lead: 'Cosmetic vs food grade differs; check extraction method on the listing.',
    featuredHref: AMZ.oil,
    featuredLabel: 'Check price — Moringa oil (affiliate)',
    extraRows: [
      { name: 'Indus Valley', note: 'Ayurvedic oils & hair care', href: AMZ.indusValley },
      { name: 'Organic India', note: 'Wellness brand portfolio', href: AMZ.organicIndia },
    ],
  })
);

write(
  'products/moringa-skincare.html',
  productPage({
    slug: 'moringa-skincare',
    title: 'Moringa Skincare on Amazon — Buyer Guide | Moringa Suppliers India',
    description: 'Moringa in serums, creams, and soaps on Amazon — clean-label tips and affiliate links.',
    h1: 'Moringa skincare — Amazon buyer guide',
    lead: 'Moringa oil and extracts appear across face and hair categories.',
    featuredHref: AMZ.skincare,
    featuredLabel: 'Check price — Moringa skincare search (affiliate)',
    extraRows: [{ name: 'Indus Valley', note: 'Ayurvedic beauty & care', href: AMZ.indusValley }],
  })
);

// --- Brands hub ---
const brandCards = [
  ['organic-india.html', 'Organic India', 'Certified organic wellness brand from India'],
  ['vahdam-india.html', 'Vahdam India', 'Premium teas & superfoods; strong US presence'],
  ['24-mantra-organic.html', '24 Mantra Organic', 'Major Indian organic grocery competitor'],
  ['indus-valley.html', 'Indus Valley', 'Ayurvedic & organic lifestyle products'],
  ['banyan-botanicals.html', 'Banyan Botanicals', 'US Ayurvedic herb leader; India sourcing'],
  ['kuli-kuli.html', 'Kuli Kuli', 'US moringa-focused brand — bars, powder, shots'],
  ['sunfood-superfoods.html', 'Sunfood Superfoods', 'Large organic superfoods catalog'],
  ['terrasoul-superfoods.html', 'Terrasoul Superfoods', 'Organic moringa powder staple'],
  ['micro-ingredients.html', 'Micro Ingredients', 'Bulk powders & capsules'],
]
  .map(
    ([f, t, d]) =>
      `<a class="card" href="/brands/${f}" style="text-decoration:none;color:inherit;"><h3>${t}</h3><p>${d} →</p></a>`
  )
  .join('');

write(
  'brands/index.html',
  layout({
    title: 'Moringa Brand Guides (Amazon US) | Moringa Suppliers India',
    description: 'Independent guides to Organic India, Vahdam, Kuli Kuli, Terrasoul, 24 Mantra, Banyan, Sunfood, Micro Ingredients & Indus Valley.',
    canonical: `${SITE}/brands/`,
    breadcrumb: `<a href="/">Home</a> / Brands`,
    h1: 'Brand guides',
    lead: 'Who each brand is, what moringa formats they sell on Amazon, and a direct affiliate link.',
    content: `${AFFILIATE_BOX}<div class="grid-2">${brandCards}</div>${brandsHubLong()}<p style="margin-top:2rem;"><a href="/">← Home</a></p>`,
    schemaJson: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Brand guides', url: `${SITE}/brands/` },
  })
);

function brandPage({ file, title, description, h1, lead, href, body }) {
  return layout({
    title,
    description,
    canonical: `${SITE}/brands/${file}`,
    breadcrumb: `<a href="/">Home</a> / <a href="/brands/">Brands</a> / ${h1}`,
    h1,
    lead,
    content: `${AFFILIATE_BOX}${body}${brandPageLong(h1, href)}<p><a href="/brands/">← All brands</a></p>`,
    schemaJson: { '@context': 'https://schema.org', '@type': 'Article', headline: h1, url: `${SITE}/brands/${file}` },
  });
}

write(
  'brands/organic-india.html',
  brandPage({
    file: 'organic-india.html',
    title: 'Organic India Moringa — Brand Guide | Moringa Suppliers India',
    description: 'Organic India moringa powder and capsules on Amazon — NPOP / USDA organic positioning and buyer notes.',
    h1: 'Organic India',
    lead: 'Indian certified-organic pioneer; moringa is one line in a broad herbal portfolio.',
    href: AMZ.organicIndia,
    body: `<p>Organic India is widely distributed in India and internationally for tulsi, moringa, and other herbal supplements. On Amazon US you will typically see leaf powder and capsules with USDA Organic labeling.</p>
<ul><li><a href="/products/moringa-powder.html">Powder guide</a> (featured Organic India powder link)</li><li><a href="/products/moringa-capsules.html">Capsules guide</a></li></ul>`,
  })
);

write(
  'brands/vahdam-india.html',
  brandPage({
    file: 'vahdam-india.html',
    title: 'Vahdam India Moringa & Tea — Brand Guide | Moringa Suppliers India',
    description: 'Vahdam India on Amazon — premium tea and superfood packaging; moringa green tea and powders.',
    h1: 'Vahdam India',
    lead: 'Global tea brand with strong US retail; premium gifting positioning.',
    href: AMZ.vahdam,
    body: `<p>Vahdam is known for Indian-origin teas and giftable tins. Their catalog includes moringa-forward teas and superfood SKUs suited to wellness and gifting use cases.</p><p><a href="/products/moringa-tea.html">Tea buyer guide</a></p>`,
  })
);

write(
  'brands/24-mantra-organic.html',
  brandPage({
    file: '24-mantra-organic.html',
    title: '24 Mantra Organic Moringa — Brand Guide | Moringa Suppliers India',
    description: '24 Mantra Organic moringa powder on Amazon US — Indian organic grocery competitor to Organic India.',
    h1: '24 Mantra Organic',
    lead: 'Large Indian organic food brand; moringa powder is a common US listing.',
    href: AMZ.mantra24,
    body: `<p>24 Mantra sits alongside other India-origin organic pantry brands. Useful for buyers comparing value-focused organic moringa powder.</p><p><a href="/products/moringa-powder.html">Powder guide</a></p>`,
  })
);

write(
  'brands/indus-valley.html',
  brandPage({
    file: 'indus-valley.html',
    title: 'Indus Valley Moringa & Ayurveda — Brand Guide | Moringa Suppliers India',
    description: 'Indus Valley on Amazon — ayurvedic foods, oils, and personal care with moringa ingredients.',
    h1: 'Indus Valley',
    lead: 'Ayurvedic and organic-positioned lifestyle brand.',
    href: AMZ.indusValley,
    body: `<p>Indus Valley spans hair, skin, and wellness categories. Moringa appears in oils and herbal formulations — read each Amazon listing for whether the hero ingredient is moringa or a blend.</p>`,
  })
);

write(
  'brands/banyan-botanicals.html',
  brandPage({
    file: 'banyan-botanicals.html',
    title: 'Banyan Botanicals Moringa — Brand Guide | Moringa Suppliers India',
    description: 'Banyan Botanicals organic moringa powder on Amazon — US Ayurvedic supplier with India-sourced herbs.',
    h1: 'Banyan Botanicals',
    lead: 'Ayurvedic practitioner–friendly brand with transparent herb sourcing story.',
    href: AMZ.banyan,
    body: `<p>Banyan focuses on classical Ayurvedic herbs including moringa (shigru). Powder format is common for practitioners and home users following Ayurvedic diet patterns.</p>`,
  })
);

write(
  'brands/kuli-kuli.html',
  brandPage({
    file: 'kuli-kuli.html',
    title: 'Kuli Kuli Moringa — Brand Guide | Moringa Suppliers India',
    description: 'Kuli Kuli on Amazon — US moringa brand: pure leaf powder, smoothie mixes, bars, and shots.',
    h1: 'Kuli Kuli',
    lead: 'Moringa-first US brand expanding retail-ready formats.',
    href: AMZ.kuliKuli,
    body: `<p>Kuli Kuli popularised moringa in US natural channels. Product mix spans pure powder, beverage mixes, and snack formats — check each listing for added sweeteners or blends.</p><p><a href="/compare/organic-india-vs-kuli-kuli.html">Compare vs Organic India</a></p>`,
  })
);

write(
  'brands/sunfood-superfoods.html',
  brandPage({
    file: 'sunfood-superfoods.html',
    title: 'Sunfood Superfoods Moringa — Brand Guide | Moringa Suppliers India',
    description: 'Sunfood Superfoods moringa on Amazon — broad organic superfoods catalog.',
    h1: 'Sunfood Superfoods',
    lead: 'California-based superfoods brand with wide Amazon distribution.',
    href: AMZ.sunfood,
    body: `<p>Sunfood carries many single-ingredient organic powders. Moringa listings should be checked for country of origin and organic certifier named on pack.</p>`,
  })
);

write(
  'brands/terrasoul-superfoods.html',
  brandPage({
    file: 'terrasoul-superfoods.html',
    title: 'Terrasoul Superfoods Moringa — Brand Guide | Moringa Suppliers India',
    description: 'Terrasoul organic moringa leaf powder on Amazon — smoothie staple positioning.',
    h1: 'Terrasoul Superfoods',
    lead: 'Organic moringa powder commonly used in home blending.',
    href: AMZ.terrasoul,
    body: `<p>Terrasoul competes in the value organic powder segment. Compare unit price per ounce across pack sizes on Amazon before buying.</p>`,
  })
);

write(
  'brands/micro-ingredients.html',
  brandPage({
    file: 'micro-ingredients.html',
    title: 'Micro Ingredients Moringa — Brand Guide | Moringa Suppliers India',
    description: 'Micro Ingredients moringa powder and capsules on Amazon — bulk formats and blends.',
    h1: 'Micro Ingredients',
    lead: 'Large-format powders and multi-ingredient greens — read labels for pure moringa vs blends.',
    href: AMZ.microIngredients,
    body: `<p>Micro Ingredients lists both straight moringa leaf powder and products where moringa is combined with other greens. The affiliate link below goes to Amazon search / category results — select a listing that matches your goal (pure powder vs blend).</p>`,
  })
);

// --- Compare ---
write(
  'compare/index.html',
  layout({
    title: 'Compare Moringa Brands | Moringa Suppliers India',
    description: 'Side-by-side brand comparisons — Organic India vs Vahdam, Organic India vs Kuli Kuli — use-case guidance, not a single winner.',
    canonical: `${SITE}/compare/`,
    breadcrumb: `<a href="/">Home</a> / Compare`,
    h1: 'Brand comparisons',
    lead: 'Factual tables plus “best for” use cases. We do not pick an overall winner.',
    content: `${AFFILIATE_BOX}
<div class="grid-2">
  <a class="card" href="/compare/organic-india-vs-vahdam.html" style="text-decoration:none;color:inherit;"><h3>Organic India vs Vahdam</h3><p>Ayurvedic organic pioneer vs premium tea &amp; gifting brand. →</p></a>
  <a class="card" href="/compare/organic-india-vs-kuli-kuli.html" style="text-decoration:none;color:inherit;"><h3>Organic India vs Kuli Kuli</h3><p>India organic heritage vs US moringa-native brand. →</p></a>
</div>
${compareHubLong()}
<p><a href="/">← Home</a></p>`,
    schemaJson: { '@context': 'https://schema.org', '@type': 'CollectionPage', url: `${SITE}/compare/` },
  })
);

const compareOIvV = `${AFFILIATE_BOX}
${comparePageLong()}
<h3>Snapshot</h3>
<div class="table-responsive"><table class="compare-table"><thead><tr><th>Topic</th><th>Organic India</th><th>Vahdam India</th></tr></thead><tbody>
<tr><td>Core identity</td><td>Certified organic herbal &amp; wellness company (India)</td><td>Premium Indian tea &amp; superfoods with global D2C packaging</td></tr>
<tr><td>Moringa strengths</td><td>Powder &amp; capsules under strict organic positioning</td><td>Moringa green tea &amp; superfood SKUs; gifting &amp; café-at-home</td></tr>
<tr><td>Typical buyer</td><td>Ayurveda-aligned daily supplement user</td><td>Tea drinkers, gift buyers, premium pantry</td></tr>
</tbody></table></div>
<h3>Best for… (guidance only)</h3>
<div class="compare-use-grid">
  <div class="use-case-card"><strong>Daily organic moringa powder / capsules</strong>Lean Organic India SKUs with clear USDA Organic copy on the listing.</div>
  <div class="use-case-card"><strong>Premium tea + beautiful packaging</strong>Lean Vahdam for moringa green tea and presentation.</div>
</div>
<div class="amazon-compare-row">
<div>${amazonBtn(AMZ.organicIndiaPowder, 'Organic India — powder')}</div>
<div>${amazonBtn(AMZ.vahdam, 'Vahdam — store')}</div>
</div>
<p style="margin-top:1rem;"><a href="/compare/">← Compare hub</a></p>`;

write(
  'compare/organic-india-vs-vahdam.html',
  layout({
    title: 'Organic India vs Vahdam Moringa — Honest Comparison | Moringa Suppliers India',
    description: 'Organic India vs Vahdam for moringa on Amazon — differences in brand focus, formats, and which use case each fits.',
    canonical: `${SITE}/compare/organic-india-vs-vahdam.html`,
    breadcrumb: `<a href="/">Home</a> / <a href="/compare/">Compare</a> / Organic India vs Vahdam`,
    h1: 'Organic India vs Vahdam',
    lead: 'Same superfood, different brand DNA — choose by how you consume moringa.',
    content: compareOIvV,
    schemaJson: { '@context': 'https://schema.org', '@type': 'Article', headline: 'Organic India vs Vahdam', url: `${SITE}/compare/organic-india-vs-vahdam.html` },
  })
);

const compareOIvK = `${AFFILIATE_BOX}
${comparePageLong()}
<div class="table-responsive"><table class="compare-table"><thead><tr><th>Topic</th><th>Organic India</th><th>Kuli Kuli</th></tr></thead><tbody>
<tr><td>Origin story</td><td>India-based organic movement &amp; herbs</td><td>US brand built around moringa nutrition &amp; social impact narrative</td></tr>
<tr><td>Formats</td><td>Powder, capsules, teas in herbal range</td><td>Powder, beverage mixes, bars, shots</td></tr>
<tr><td>Positioning</td><td>Ayurvedic / organic certification focus</td><td>Moringa category leader in US natural retail</td></tr>
</tbody></table></div>
<h3>Best for…</h3>
<div class="compare-use-grid">
  <div class="use-case-card"><strong>Traditional organic powder / capsules</strong>Compare Organic India listings for single-ingredient leaf products.</div>
  <div class="use-case-card"><strong>On-the-go snacks &amp; drinks</strong>Browse Kuli Kuli for bars and ready-to-mix formats.</div>
</div>
<div class="amazon-compare-row">
<div>${amazonBtn(AMZ.organicIndia, 'Organic India')}</div>
<div>${amazonBtn(AMZ.kuliKuli, 'Kuli Kuli')}</div>
</div>
<p style="margin-top:1rem;"><a href="/compare/">← Compare hub</a></p>`;

write(
  'compare/organic-india-vs-kuli-kuli.html',
  layout({
    title: 'Organic India vs Kuli Kuli Moringa — Comparison | Moringa Suppliers India',
    description: 'Organic India vs Kuli Kuli on Amazon — powder vs lifestyle brand, formats, and use-case guidance (not a single winner).',
    canonical: `${SITE}/compare/organic-india-vs-kuli-kuli.html`,
    breadcrumb: `<a href="/">Home</a> / <a href="/compare/">Compare</a> / Organic India vs Kuli Kuli`,
    h1: 'Organic India vs Kuli Kuli',
    lead: 'India organic herbal leader vs US moringa-native brand.',
    content: compareOIvK,
    schemaJson: { '@context': 'https://schema.org', '@type': 'Article', headline: 'Organic India vs Kuli Kuli', url: `${SITE}/compare/organic-india-vs-kuli-kuli.html` },
  })
);

const pathGen = require('path');
const { patchIndexAuthority } = require('./lib/patch-index-authority');
patchIndexAuthority(pathGen.join(__dirname, '..'));

console.log('generate-site.js done');
