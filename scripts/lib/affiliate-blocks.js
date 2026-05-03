/**
 * Long-form editorial + Amazon CTA blocks for generate-site.js (retail guides).
 * All blocks assume AFFILIATE_BOX already precedes them on the page.
 */
const { AMZ, amazonBtn, amazonBtnSmall, indiamartBtn } = require('./site-shell');

/**
 * Reusable B2B "Get best price on IndiaMART" strip.
 * Used on retail-focused hub pages so bulk buyers always see the alternative
 * route (instead of bouncing to a competitor when Amazon is the wrong fit).
 */
function indiamartStrip({ title, body } = {}) {
  const h = title || 'Get the best price on Moringa from <strong>Indian suppliers</strong> directly';
  const p = body || 'If you are buying moringa <strong>in bulk or wholesale</strong>, IndiaMART connects you with thousands of verified Indian suppliers in minutes &mdash; compare quotes, MOQ and certifications in one place.';
  return `<aside class="b2b-strip" role="complementary" aria-label="Bulk / wholesale buyer shortcut">
  <div>
    <span class="b2b-strip-eyebrow">Bulk / wholesale buyer?</span>
    <h3>${h}</h3>
    <p>${p}</p>
  </div>
  <div class="b2b-strip-cta">${indiamartBtn('Get best price on IndiaMART')}</div>
  <p class="b2b-strip-disclosure"><strong>Disclosure:</strong> Affiliate link &mdash; we may earn a small referral fee at no cost to you. <a href="/legal/affiliate-disclosure.html" style="color:#c8451f;font-weight:600;">Policy</a>.</p>
</aside>`;
}

function buyStrip() {
  return `<div class="buy-strip" role="region" aria-label="Amazon shopping shortcuts">
<p class="buy-strip-note">Buttons below: Amazon Associates (affiliate). Confirm title and seals on Amazon before checkout. <a href="/legal/affiliate-disclosure.html">Policy</a></p>
<div class="amazon-compare-row">
${amazonBtn(AMZ.organicIndiaPowder, 'See Organic India leaf powder on Amazon')}
${amazonBtn(AMZ.organicIndiaCapsules, 'See Organic India capsules on Amazon')}
</div>
<div class="article-cta-more"><span class="article-cta-more-label">More formats:</span>${amazonBtnSmall(AMZ.tea, 'Moringa tea')}${amazonBtnSmall(AMZ.oil, 'Moringa oil')}${amazonBtnSmall(AMZ.skincare, 'Skincare search')}${amazonBtnSmall(AMZ.kuliKuli, 'Kuli Kuli store')}</div>
</div>
${indiamartStrip()}`;
}

function productsHubLong() {
  return `<div class="guide-prose">
<h2>Start here if you are new to Moringa retail</h2>
<p>If this is your first purchase, skim <strong>powder vs capsules</strong> in the articles library, then return here to pick a format. Impulse-buying three formats at once usually wastes money; mastering one habit loop—morning smoothie, office capsules, or evening tea—builds adherence. Once a format sticks, you can branch into oil or skincare without abandoning half-full bags.</p>
<h2>How to use these guides (and why we link to Amazon)</h2>
<p>Most readers landing here are in one of two situations: you want <strong>certified organic Moringa for personal use</strong> with easy US checkout, or you are <strong>researching quality markers</strong> before you ever contact an Indian exporter. These product pages serve both paths. We explain label literacy first, then give direct Amazon shortcuts so you can compare live prices, reviews, and ingredient panels in the same tab where you already shop.</p>
<h2>What to verify on every Amazon listing (60-second checklist)</h2>
<ul>
<li><strong>Plant part and Latin name:</strong> leaf powder vs seed vs blend — <em>Moringa oleifera</em> leaf should match your goal.</li>
<li><strong>Organic claim:</strong> USDA Organic / India Organic on-pack, not only in the hero image.</li>
<li><strong>Heavy metals &amp; microbiology:</strong> reputable brands publish or summarize testing; absence of data is a yellow flag.</li>
<li><strong>Serving math:</strong> capsules list mg per capsule; powders list grams per scoop — compare cost per gram of leaf, not pack size alone.</li>
<li><strong>Blends vs single-ingredient:</strong> superfood blends can be great, but they dilute Moringa grams per dollar — know which you are buying.</li>
</ul>
<h2>Pick your format, then open the deep guide</h2>
<p>Powder is best for kitchens and smoothies. Capsules win for travel and bitterness avoidance. Tea fits ritual and gifting. Oil and skincare are different supply chains—grade and extraction method matter. Each guide below repeats this page’s disclosure near the top, then walks format-specific pitfalls before showing brand rows you can click when you are ready to buy.</p>
<h2>When to skip Amazon and read the India sourcing guide</h2>
<p>If you need drum quantities, phytosanitary certificates, and custom packaging, start at the <a href="/">home buyer guide</a> sections on suppliers and documents. Retail links cannot replace export diligence—but they <em>can</em> help you benchmark what “good” looks like in finished goods before you fly to Chennai or Mumbai for factory visits.</p>
<h2>Shipping, subscriptions, and “Subscribe &amp; Save” math</h2>
<p>Amazon’s subscribe flows can lower per-unit cost when you know your monthly consumption. Underestimating consumption creates pantry clutter; overestimating creates stale powder. For first trials, buy the smallest sensible unit even if per-gram cost is higher—you are buying information about your own taste tolerance, not only grams of leaf.</p>
<h2>Gifting, office shares, and “trial packs”</h2>
<p>Smaller tins and sampler-friendly teas make better gifts than economy tubs nobody asked for. If you are buying for a skeptical relative, pair a mild tea with clear brewing instructions rather than a bitter powder that demands a blender. Office desk shares work best with capsules or single-serve tea bags—hygiene and convenience beat communal scoops.</p>
</div>`;
}

function productGuideLong(slug, h1Plain) {
  const topic = h1Plain.replace(/—.*/, '').trim();
  return `<div class="guide-prose">
<h2>Why ${topic} is worth a dedicated guide</h2>
<p>Amazon’s search results rotate with inventory, promotions, and new sellers. A static blog cannot promise a single SKU forever. What we <em>can</em> do is teach the decision rules—organic integrity, mesh size for powders, extraction labels for oils, capsule excipients—then give stable affiliate paths to brands that routinely stock compliant Moringa lines in the US marketplace.</p>
<p>If you already know your format, scroll to the comparison table for one-tap Amazon checks. If you are still deciding, read this section once: it saves refunds and disappointment later.</p>
<h2>Label patterns that separate serious products from noise</h2>
<p>Look for <strong>lot traceability cues</strong> (some brands publish COA summaries), <strong>country of manufacture vs origin of leaf</strong> (both can be legitimate, but they should be stated), and <strong>allergen statements</strong> if you buy from facilities that also pack tree nuts or soy. For powders, fine mesh dissolves cleaner in drinks; coarse mesh can feel gritty unless you blend hot liquids.</p>
<p>For capsules, scan for flow agents like rice flour—they are common and safe, but you should know they are there. Vegan capsules (HPMC) vs gelatin matters for lifestyle buyers. For teas, scan the ingredients list for stevia or cane sugar if you are limiting sweeteners. For oil, “cold-pressed” should appear where the product is positioned as cosmetic-grade; culinary use may prefer a different spec—your guide above calls out the split.</p>
<h2>How we order the “Other brands” table</h2>
<p>Rows are not rankings. We mix <strong>India-origin organic heritage</strong> brands with <strong>US-facing moringa-native</strong> labels so you can compare positioning, not just star ratings. Click any Amazon cell when you want to see today’s price; come back to this guide when you want the checklist again.</p>
<h2>Buy with confidence—after you verify the listing</h2>
<p>When you are ready, use the featured button first—it is the closest match to this format’s typical use case. Then use the table to cross-shop. If Prime shipping or coupons change the economics, Amazon wins—that is fine. Our interest is that you pick a <em>real</em> product you will finish, because half-used bags help nobody.</p>
<h2>Common Amazon checkout mistakes (easy to avoid)</h2>
<p>Buyers accidentally order the wrong item when they click a variant color or size dropdown without noticing, when they confuse <strong>leaf powder</strong> with <strong>seed powder</strong> (very different products), or when they add a “blend” thinking it is pure leaf. Another frequent issue is buying an enormous bag for a first trial—if taste or routine does not stick, the bag sits half-open in humid air and quality drops before you finish it.</p>
<p>If you are price-sensitive, still prioritize <strong>COA transparency</strong> and <strong>organic integrity</strong> over the cheapest green dust. Saving a few dollars while importing unknown ash or microbiology risk is poor economics for food you ingest daily. Use the table above to cross-shop within a quality band, not to race to the bottom.</p>
<h2>Keep learning on this site</h2>
<p>Deep dives live in <a href="/articles/">authority articles</a> (safety, purity, comparisons) and <a href="/brands/">brand guides</a>. Serious buyers should also skim <a href="/compare/">brand comparisons</a> before locking a favorite.</p>
</div>`;
}

function brandsHubLong() {
  return `<div class="guide-prose">
<h2>Map the brand to your actual routine</h2>
<p>Before opening ten tabs, answer one question: <strong>Do you drink tea daily, blend smoothies, or swallow capsules on a train?</strong> Tea-forward brands reward ritualists. Powder-forward portfolios reward cooks. Capsule-first lines reward commuters. Mis-matching format to habit is the main reason “superfoods” expire in cabinets—not lack of efficacy.</p>
<h2>Brand guides: who should read them</h2>
<p>These pages are for shoppers who already saw a logo on Amazon but want context—where the brand plays in organic certification, which formats it actually sells, and what trade-offs to expect (bitterness, price per gram, tea vs powder focus). Each guide ends with a direct Amazon affiliate button; the site-wide disclosure applies.</p>
<h2>How to choose faster (without regret buys)</h2>
<p>Pick one primary goal—<strong>daily leaf powder</strong>, <strong>capsule convenience</strong>, <strong>tea ritual</strong>, or <strong>skincare</strong>—then open only the guides that match. Cross-shopping five open tabs raises confusion; two focused tabs beats five chaotic ones.</p>
<h2>Transparency on incentives</h2>
<p>We earn through Amazon Associates on qualifying purchases; Amazon handles checkout and delivery.</p>
<h2>Cross-links that save you from duplicate buys</h2>
<p>After you pick a brand lane, open the matching <a href="/products/">product guide</a> for that format so you do not buy powder and capsules redundantly unless you intentionally want both. If you are stuck between two heritage names, jump to <a href="/compare/">comparisons</a> before you spend.</p>
<h2>India heritage vs US-native storytelling (both can be legitimate)</h2>
<p>Some brands lead with Ayurvedic herbal catalogs and NPOP/USDA organic stacks; others lead with American founders and nonprofit angles. Neither story automatically predicts leaf quality—both can stock excellent or mediocre lots. Use the same checklist everywhere: Latin name, plant part, organic seal on the pack image, and whether the line is single-ingredient leaf or a diluted blend.</p>
<h2>Allergens, shared facilities, and capsule excipients</h2>
<p>If you react to common fillers, read the full allergen panel—not only the front “vegan” badge. Facilities that pack tree nuts, soy, or gluten on shared lines carry cross-contact language you should not ignore. Capsules often list rice flour or similar flow aids; that is normal, but you should know it exists before you assume “100% leaf only” inside the shell.</p>
<h2>Price hunting without losing the plot</h2>
<p>Chasing the lowest price per ounce feels rational until you factor spoilage, taste rejection, and repurchase friction. A slightly more expensive SKU you actually finish beats a bargain bag that oxidizes in the pantry. When two SKUs tie on specs, favor fresher review clusters and clearer COA language over a two-dollar spread.</p>
<h2>When to escalate from retail to B2B sourcing</h2>
<p>Cafes, meal-prep brands, and supplement formulators should not treat Amazon retail as their supply base. Use these guides to benchmark consumer packaging and label norms, then read the home buyer guide’s export sections for COA, phytosanitary paperwork, and MOQ reality before you email a Coimbatore or Andhra Pradesh processor.</p>
<h2>One-sentence rule before you click any brand</h2>
<p>If you cannot state your goal out loud—“I want USDA organic leaf powder for smoothies” or “I need travel capsules without stevia”—pause and write it on paper. Clarity beats tab overload, and it protects you from pretty packaging that solves a problem you do not have.</p>
${buyStrip()}
</div>`;
}

function brandPageLong(name, href) {
  return `<div class="guide-prose">
<h2>What this ${name} guide is (and is not)</h2>
<p>This is an independent orientation page—not a sponsored takeover. We summarize how ${name} typically positions Moringa on Amazon US, what formats shoppers see most, and what to double-check on the listing (organic seals, blends, capsule counts). It is not a medical claim and not an importer endorsement.</p>
<h2>How ${name} usually shows up in US search results</h2>
<p>Brand presence on Amazon changes seasonally with inventory, distributor agreements, and new ASINs. You may see multiple powders with different mesh claims, capsule counts, or bundled teas. Treat the storefront link as a <strong>starting compass</strong>, then filter by verified reviews, ingredient order, and whether the unit economics match your routine (cost per gram, servings per bottle).</p>
<p>If ${name} sells both <strong>single-ingredient leaf</strong> and <strong>multi-green blends</strong>, decide which bucket you want before sorting by price. Blends can taste milder and market “superfood stacks,” but they dilute how many milligrams of Moringa you get per dollar. Single-ingredient leaf is the better laboratory for judging bitterness, solubility, and whether you will use the product daily.</p>
<h2>Certification vocabulary that actually changes risk</h2>
<p>USDA Organic and India Organic (NPOP) pathways involve audits of agronomy and handling; they reduce—but do not zero—certain pesticide and adulteration risks. Kosher, halal, vegan capsule, and non-GMO claims answer different questions. None replace heavy-metal testing, yet together they signal a brand that expects scrutiny.</p>
<h2>Practical shopping moves before you click “Add to Cart”</h2>
<ul>
<li>Open the <strong>Questions &amp; answers</strong> and newest reviews for batch drift (color, taste, seal).</li>
<li>Compare <strong>price per gram</strong> of leaf for powders; per capsule for caps.</li>
<li>If you need kosher/halal, verify the specific SKU—not every line extension shares the same cert.</li>
<li>Watch <strong>sold-by / fulfilled-by</strong> lines when authenticity matters; unfamiliar sellers deserve extra caution.</li>
</ul>
<h2>Reviews: how to read them like a QC analyst</h2>
<p>Sort by <strong>most recent</strong> first. Look for clusters mentioning <strong>seal failures</strong>, <strong>unexpected sweetness</strong>, or <strong>color shifts</strong>—those can signal supply-chain changes, not random grumpiness. Ignore one-line five-star reviews with no detail; weight multi-sentence reviews that mention preparation method (water temperature for tea, blender type for smoothies).</p>
<h2>Primary storefront for ${name}</h2>
<p>When the listing matches your goal, use this button to jump straight to Amazon’s live page for price, coupons, and delivery options.</p>
<p>${amazonBtn(href, `Check price — ${name} on Amazon`)}</p>
<h2>If the Amazon page does not feel right, pause</h2>
<p>Wrong photo, missing organic seal, or a ship-from address that does not match your risk tolerance are valid reasons to abort. No affiliate commission is worth a product you will not trust on your kitchen counter.</p>
<h2>Batch variance: why your friend’s bag tasted different</h2>
<p>Leaf is an agricultural product. Rainfall, harvest timing, and drying curves shift bitterness and color between lots. That is not automatically fraud—sometimes it is terroir and process. What <em>is</em> a red flag is wild swings without explanation, mismatched photos, or reviews that suddenly pivot from “earthy green” to “gray dust.” When in doubt, pick a different seller or wait for listing cleanup.</p>
<h2>Storage after Amazon drops the box on your porch</h2>
<p>Heat and humidity destroy delicate greens faster than calendar dates imply. Reseal tightly, keep powder out of steamy dishwashers nearby, and write the open date on the lid if the brand omits a “use within X weeks of opening” cue. Capsules resist moisture better than open powder, which matters in tropical kitchens and shared fridges.</p>
<h2>Customer service expectations (set them before you buy)</h2>
<p>Amazon handles most logistics tickets. The brand may still matter for formulation questions—excipients, tea bases, or mesh size—so keep screenshots of the listing you intended to buy. If a question-and-answer thread contradicts the title, trust the title and images on the day you purchase, not anonymous replies from last year.</p>
<h2>Final nudge: buy the smallest honest experiment</h2>
<p>Large bags look cheaper per gram but punish hesitation. If you are new to ${name}, favor a modest unit, finish it on schedule, then scale up once the habit is real. That pattern saves money even when per-gram math whispers “go big.”</p>
${buyStrip()}
</div>`;
}

function compareHubLong() {
  return `<div class="guide-prose">
<h2>Pick a comparison only when you are stuck between two carts</h2>
<p>If you already love one brand, you do not need a comparison page to validate joy—keep using it. These write-ups help when <strong>two credible options</strong> split your priorities: organic heritage vs gifting packaging, or India-centric herbal lines vs US-native moringa storytelling. We keep tables compact so you can screenshot and discuss with family or teammates before spending.</p>
<h2>How to read our comparisons</h2>
<p>We do not crown a permanent “winner.” Brands change SKUs, harvests shift flavor, and your personal use case (tea drinker vs meal-prep powder user) matters more than a headline. Each comparison pairs factual positioning with “best for” callouts, then gives affiliate buttons so you can validate price when you are ready.</p>
<h2>Before you buy: two minutes of friction saves two weeks of returns</h2>
<p>Confirm organic claims on the pack shot, read ingredient order for blends, and check ship-from/sold-by when authenticity matters. If a listing looks unlike the rest, pause—commingling risk exists on high-volume marketplaces.</p>
<h2>What we never do in comparisons</h2>
<p>We do not fabricate lab scores, invent sales ranks, or claim medical cures. We do not tell you to megadose. If a regulatory angle matters to your import business, hire counsel—our EU and export articles are orientation, not law memos.</p>
<h2>Tea-first vs powder-first families: pick one anchor SKU</h2>
<p>Households that already drink chai or herbal tea twice daily should bias comparisons toward infusion behavior—aroma, dust level in the bag, whether sweeteners hide poor leaf. Smoothie-first households should bias toward solubility, mesh fineness, and how the powder behaves with frozen fruit and yogurt. Capsule-first households should bias toward excipient tolerance and per-capsule milligram honesty.</p>
<h2>How we expect you to use the Amazon buttons</h2>
<p>Open both storefronts in two tabs, align the same format (apples to apples on leaf vs blend), then compare live price, coupons, and delivery dates. If one brand’s listing is a chaotic bundle page, use the search bar inside Amazon with the exact product name from our table—sometimes cleaner ASINs exist than the first search hit.</p>
<h2>Returns, refunds, and “not as described”</h2>
<p>Amazon’s policies—not ours—govern returns. Keep photos if seals arrive broken or colors look off; that evidence speeds resolution. If you bought the wrong variant because the dropdown reset, that is a common user error—slow down on mobile checkout.</p>
<h2>International readers shopping US listings</h2>
<p>Forwarding services and relatives carrying parcels add time and heat risk. If you are not the final consumer in the US, double-check import rules for your destination country before you optimize for Prime speed stateside.</p>
<h2>After purchase: a simple quality ritual</h2>
<p>On first open, smell and visual-check the lot. For powders, whisk a teaspoon into warm water before you ruin an expensive smoothie. For teas, steep with a timer the first session so you learn baseline strength. Small rituals prevent silent pantry abandonment.</p>
<h2>Bookmark discipline (sounds silly, saves money)</h2>
<p>Save this hub and the two comparison articles you actually read—do not hoard fifteen open tabs “for later.” Decision fatigue is how duplicate powders arrive in the same week. Close loops: read, verify the listing, buy or don’t, then cook.</p>
<h2>When comparisons disagree with your taste buds</h2>
<p>Tables summarize market positioning; your tongue still wins. If you bought Brand A because a column favored it but you dislike the mouthfeel, that is valid data—return or gift responsibly, then try Brand B without shame. Affiliate links are supposed to shorten search, not override preference.</p>
${buyStrip()}
</div>`;
}

function comparePageLong() {
  return `<div class="guide-prose">
<h2>Using this comparison page on mobile</h2>
<p>Tables scroll sideways on small screens—swipe horizontally to read every column. The Amazon buttons below the “Best for” cards are the fastest path to check both brands’ current storefronts without retyping names into search.</p>
<h2>How to read the table without tribal loyalty</h2>
<p>Each row states positioning, not moral worth. A “premium tea &amp; gifting” identity is not better than an “organic herbal pioneer” identity—it is different. Your job is to match identity to your kitchen reality: if you never finish tea tins, do not optimize for tea aesthetics. If you capsule-stack on work trips, do not romanticize giant powder bags that sit unopened.</p>
<p>When two cells sound similar, open both Amazon pages and compare <strong>nutrition facts density</strong>, <strong>organic certifier IDs</strong>, and <strong>review themes mentioning taste and consistency</strong>. Star averages lie when review volume is low or when recent batches shifted supply chains.</p>
<h2>Affiliate incentives in plain language</h2>
<p>We earn a commission on qualifying Amazon purchases through these links. That does not raise your price. It does mean we want you to find a product you will keep using—return churn helps nobody. If a listing looks off versus this table, trust your eyes and skip the buy.</p>
<h2>After you choose a lane, commit for 30 days</h2>
<p>Jumping brands weekly makes it hard to know what helped your routine. Pick the format that matches your mornings, finish a reasonable quantity, then iterate.</p>
<h2>Still undecided? Use the articles hub</h2>
<p>Longer explorations of safety, purity, and format trade-offs live in <a href="/articles/">twenty authority articles</a>. Powder vs capsules, spirulina cross-talk, and export-grade QC vocabulary all have dedicated pages—read one, then return here with a sharper question.</p>
<h2>Side-by-side taste test (same evening, same water)</h2>
<p>If you can afford two small units, brew or blend both with identical temperatures and timers. Differences in drying style pop faster in plain water than in mango smoothies that mask bitterness. Take notes once—memory lies after a week.</p>
<h2>Household politics: one buyer, one veto rule</h2>
<p>Partners and roommates veto products for smell, clutter, or “weird green drinks.” If Moringa is new to your home, choose the least polarizing format first—often mild tea or capsules—before you graduate to kitchen-counter powder jars that invite commentary.</p>
<h2>When the table says “similar,” trust the listing images</h2>
<p>Two brands can share organic certs and still diverge in grind, blend ratios, or tea base quality. Our rows summarize positioning; Amazon’s gallery shows foil color, seal design, and whether the pack is single-origin marketing or transparent sourcing text.</p>
<h2>Carbon and packaging (practical, not preachy)</h2>
<p>Loose refill bags can beat plastic tubs on waste—if you actually transfer the powder to an airtight jar immediately. Tea sachets trade convenience for envelope waste. None of this changes heavy-metal science, but it may matter to your household values when two SKUs tie.</p>
<h2>Translation for busy shoppers: what to do in ninety seconds</h2>
<p>Read the “Best for” cards once, open both Amazon buttons in separate tabs, confirm the same format (powder vs tea vs capsules), scan organic seals and ingredient order, check the latest ten reviews for batch drift, then buy the smaller unit if you are still unsure. Ninety disciplined seconds beat forty-five minutes of anxious tab cycling.</p>
<h2>If neither brand wins, that is still a decision</h2>
<p>Sometimes the right move is a third brand from the <a href="/brands/">brand index</a> or a different format from <a href="/products/">product guides</a>. Comparisons narrow the field—they do not obligate a purchase. Walking away until you have a clearer use case is financially and mentally cheaper than forcing a tie-breaker.</p>
</div>`;
}

module.exports = {
  buyStrip,
  indiamartStrip,
  productsHubLong,
  productGuideLong,
  brandsHubLong,
  brandPageLong,
  compareHubLong,
  comparePageLong,
};
