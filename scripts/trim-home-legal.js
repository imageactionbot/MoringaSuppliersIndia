const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, '..', 'index.html');
let s = fs.readFileSync(p, 'utf8');
const start = s.indexOf('<!-- Privacy Policy -->');
const end = s.indexOf('<!-- Pro Footer -->');
if (start === -1 || end === -1 || end <= start) {
  console.error('markers not found', start, end);
  process.exit(1);
}
const replacement = `<!-- Legal hub: full text on dedicated pages -->
<section id="legal-hub" class="legal-section" style="padding:2.5rem 0;">
  <div class="container" style="text-align:center;max-width:720px;">
    <h2 style="margin-bottom:0.5rem;">Policies &amp; disclosures</h2>
    <p style="color:var(--text-muted); margin-bottom:1.2rem;">Full legal texts (privacy, terms, cookies, affiliate program) live on dedicated pages — faster load and cleaner reading.</p>
    <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:0.75rem;">
      <a href="/legal/disclaimer.html" class="pill">Disclaimer</a>
      <a href="/legal/privacy.html" class="pill">Privacy Policy</a>
      <a href="/legal/terms.html" class="pill">Terms of Use</a>
      <a href="/legal/cookies.html" class="pill">Cookie Policy</a>
      <a href="/legal/affiliate-disclosure.html" class="pill">Affiliate Disclosure</a>
    </div>
  </div>
</section>

`;
s = s.slice(0, start) + replacement + s.slice(end);
s = s.replace(/href="#affiliate-disclosure"/g, 'href="/legal/affiliate-disclosure.html"');
s = s.replace(/href="#cookies"/g, 'href="/legal/cookies.html"');
fs.writeFileSync(p, s, 'utf8');
console.log('trim-home-legal OK');
