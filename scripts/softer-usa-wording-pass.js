/**
 * One-time pass (idempotent): reduce repetitive “U.S.” phrasing in HTML —
 * mix USA / American / neutral wording for readability + SEO variety.
 * Run from repo root: node scripts/softer-usa-wording-pass.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const SKIP = new Set(['node_modules', '.git', 'content']);

const PAIRS = [
  [
    '<p class="reader-return-strip__lede">Most readers use <strong>Amazon.com</strong> (USD retail) or run <strong>IndiaMART</strong> bulk RFQs from the United States—same verification tools on every guide:</p>',
    '<p class="reader-return-strip__lede">Many readers shop <strong>Amazon.com</strong> (USD listings) or run <strong>IndiaMART</strong> bulk RFQs &mdash; often from the USA. Same verification tools on every guide:</p>',
  ],
  [
    '<p class="reader-return-strip__lede">Most readers use <strong>Amazon.com</strong> (USD retail) or run <strong>IndiaMART</strong> bulk RFQs from the United States:</p>',
    '<p class="reader-return-strip__lede">Many readers shop <strong>Amazon.com</strong> (USD listings) or run <strong>IndiaMART</strong> bulk RFQs &mdash; often from the USA:</p>',
  ],
  [
    'aria-label="U.S. visitor shortcuts — bookmark for repeat visits"',
    'aria-label="Shortcuts to bookmark — retail and India sourcing"',
  ],
  [
    '<h2 class="reader-return-strip__title">Save for your next U.S. checkout or import</h2>',
    '<h2 class="reader-return-strip__title">Save for your next checkout or import</h2>',
  ],
  [
    '<p class="footer-tagline">U.S. readers first &mdash; Amazon.com retail (USD) and IndiaMART bulk RFQs (both usable from the United States). India export &amp; supplier verification second. Global readers welcome third. Independent editorial.</p>',
    '<p class="footer-tagline">American and USA shoppers first &mdash; Amazon.com retail (USD) plus IndiaMART bulk RFQs you can run from the USA. India export &amp; supplier verification second. Global readers welcome third. Independent editorial.</p>',
  ],
  [
    '<p class="footer-tagline">U.S. visitors first: Amazon.com (USD) &amp; IndiaMART bulk quotes (usable from the U.S.). India export documentation &amp; supplier checks second. Global readers third. Research from public trade &amp; government sources where cited.</p>',
    '<p class="footer-tagline">American and USA visitors first: Amazon.com (USD) and IndiaMART bulk quotes you can place from the USA. India export documentation &amp; supplier checks second. Global readers welcome third. Research from public trade &amp; government sources where cited.</p>',
  ],
  [
    '<li><a href="/">Home &mdash; U.S. retail + India sourcing</a></li>',
    '<li><a href="/">Home &mdash; USA retail + India sourcing</a></li>',
  ],
  [
    'with <strong>U.S. buyer reality first</strong> (Amazon.com retail benchmarks and bulk RFQs many readers run from the United States),',
    'with <strong>American buyer context first</strong> (Amazon.com retail benchmarks and bulk RFQs many readers run from the USA),',
  ],
];

function walkHtml(dir, out) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(ent.name)) continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkHtml(p, out);
    else if (ent.name.endsWith('.html')) out.push(p);
  }
}

function main() {
  const files = [];
  walkHtml(root, files);
  let changed = 0;
  for (const p of files) {
    let s = fs.readFileSync(p, 'utf8');
    const orig = s;
    for (const [from, to] of PAIRS) {
      if (s.includes(from)) s = s.split(from).join(to);
    }
    if (s !== orig) {
      fs.writeFileSync(p, s, 'utf8');
      changed++;
      console.log(path.relative(root, p).replace(/\\/g, '/'));
    }
  }
  console.log('files updated:', changed);
}

main();
