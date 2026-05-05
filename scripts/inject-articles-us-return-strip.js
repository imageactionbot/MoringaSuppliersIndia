/**
 * Every article detail page (articles/*.html except index):
 * 1) Replace boilerplate "India export strengths / global buyer" paragraph with US-first wording.
 * 2) Inject repeat-visit shortcut strip before Related articles (idempotent via HTML comment marker).
 *
 * Run from repo root: node scripts/inject-articles-us-return-strip.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const articlesDir = path.join(root, 'articles');

const MARKER = '<!-- reader-return-strip-us:v1 -->';

const STRIP = `${MARKER}
<aside class="reader-return-strip" role="complementary" aria-label="U.S. visitor shortcuts — bookmark for repeat visits">
  <h2 class="reader-return-strip__title">Save for your next U.S. checkout or import</h2>
  <p class="reader-return-strip__lede">Most readers use <strong>Amazon.com</strong> (USD retail) or run <strong>IndiaMART</strong> bulk RFQs from the United States—same verification tools on every guide:</p>
  <ul class="reader-return-strip__list">
    <li><a href="/products/"><strong>Amazon product guides</strong></a> — powder, capsules, tea, oil &amp; skincare.</li>
    <li><a href="/brands/"><strong>Brand guides</strong></a> — who sells what with NPOP/USDA context.</li>
    <li><a href="/purity-checklist.html"><strong>Printable purity checklist</strong></a> — quick sensory pass before any pouch.</li>
    <li><a href="/find-moringa-suppliers.html"><strong>Supplier RFQ discipline</strong></a> — five gates before FOB.</li>
    <li><a href="/articles/how-to-contact-indian-moringa-suppliers.html"><strong>First-message template</strong></a> — email India factories cleanly.</li>
    <li><a href="/buy-moringa-from-india.html"><strong>Retail vs bulk vs import</strong></a> — pick one lane.</li>
    <li><a href="/search.html"><strong>Site search</strong></a> — jump back to any topic.</li>
    <li><a href="https://IndiaMART.in/v/yNRgBEqn" target="_blank" rel="sponsored nofollow noopener"><strong>Bulk quotes — IndiaMART</strong></a> (affiliate).</li>
  </ul>
</aside>
`;

/** Matches editorial boilerplate with ASCII or curly apostrophe in India's, em/en/hyphen dash. */
const BOILERPLATE_RE =
  /<p>This guide frames (<strong>[^<]+<\/strong>) with India['\u2019]s export strengths and global buyer expectations in mind(?:\u2014|\u2013|-)without drifting into hype language that fails regulatory or B2B scrutiny\.<\/p>/g;

function replaceBoilerplate(html) {
  return html.replace(BOILERPLATE_RE, (_, inner) => {
    return `<p>This guide frames ${inner} with <strong>U.S. buyer reality first</strong> (Amazon.com retail benchmarks and bulk RFQs many readers run from the United States), <strong>India export mechanics second</strong>, and other regions third&mdash;without hype that fails regulatory or B2B scrutiny.</p>`;
  });
}

const RELATED_RE = /\r?\n(\s*)(<div class="related-articles" style="margin-top:2\.5rem)/;

function main() {
  const files = fs
    .readdirSync(articlesDir)
    .filter((f) => f.endsWith('.html') && f !== 'index.html')
    .sort();

  let boiler = 0;
  let strips = 0;
  let skippedRelated = 0;

  for (const name of files) {
    const p = path.join(articlesDir, name);
    let html = fs.readFileSync(p, 'utf8');
    const orig = html;

    const afterBoiler = replaceBoilerplate(html);
    if (afterBoiler !== html) {
      boiler++;
      html = afterBoiler;
    }

    if (!html.includes(MARKER)) {
      RELATED_RE.lastIndex = 0;
      const beforeStrip = html;
      html = html.replace(RELATED_RE, `\r\n\r\n${STRIP}\r\n$1$2`);
      if (html !== beforeStrip) strips++;
      else {
        skippedRelated++;
        console.warn('no related-articles anchor:', name);
      }
    }

    if (html !== orig) fs.writeFileSync(p, html, 'utf8');
  }

  console.log('articles scanned:', files.length);
  console.log('boilerplate paragraphs updated:', boiler);
  console.log('return strips inserted:', strips);
  if (skippedRelated) console.log('skipped (no related-articles match):', skippedRelated);
}

main();
