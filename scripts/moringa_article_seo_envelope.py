# -*- coding: utf-8 -*-
"""Reusable HTML blocks for article SEO upgrades (role sections, BI, FAQ)."""
from __future__ import annotations

import re
from typing import Literal

Profile = Literal["business", "consumer", "mixed"]

HEAD_MARKER = "<!-- article-seo-envelope:head-v1 -->"
TAIL_MARKER = "<!-- article-seo-envelope:tail-v1 -->"

_BUSINESS_KW = (
    "export",
    "margin",
    "fob",
    "wholesale",
    "buyer",
    "import",
    "registration",
    "license",
    "logistics",
    "shipping",
    "farming",
    "acre",
    "processing",
    "factory",
    "certification",
    "packaging",
    "supply-chain",
    "profit",
    "business",
    "market",
    "pricing",
    "verified-buyers",
    "countries",
    "eu-market",
    "requirements",
    "quality-control",
    "irrigation",
    "yield",
    "investment",
    "manufacturing",
    "cost",
    "demand",
    "scale",
    "strategy",
    "organic-vs-chemical",
    "cash-crops",
    "oil-extraction",
    "drying",
    "high-yield",
    "risk-management",
    "states-india",
    "suppliers-india",
    "one-acre",
    "income-reality",
    "high-quality-moringa-suppliers",
)

_CONSUMER_KW = (
    "benefits",
    "recipes",
    "detox-tea",
    "cooking",
    "hair-skin",
    "diabetes",
    "weight-loss",
    "anemia",
    "pets",
    "face-mask",
    "skincare",
    "versus",
    "vs-",
    "capsules-benefits",
    "powder-benefits",
    "honey-benefits",
    "side-effects",
    "pure-vs-adulterated",
    "encyclopedia",
    "brands",
    "organic-india-vs",
)


def detect_profile(slug: str) -> Profile:
    s = slug.lower()
    b = sum(1 for k in _BUSINESS_KW if k in s)
    c = sum(1 for k in _CONSUMER_KW if k in s)
    if b and c:
        return "mixed"
    if b >= 1:
        return "business"
    if c >= 1:
        return "consumer"
    return "mixed"


def head_block(title: str, profile: Profile) -> str:
    """Introduction framing + five role sections (insert after first <p>)."""
    t = title.strip()
    if profile == "consumer":
        farmers = f"""<h3>🧑‍🌾 Farmers / Producers</h3>
<p>If you grow Moringa for leaf or drumstick, culinary and tea-cut markets reward <strong>clean drying and consistent leaf size</strong>. Buyers for beverage blends care about ash, fiber feel, and whether leaves were shade-dried versus sun-baked.</p>
<p>Local sales of dried leaf for home steeping can complement export lanes when you document moisture and keep metal-out equipment on the milling line.</p>"""
        mfg = f"""<h3>🏭 Manufacturers</h3>
<p>Tea SKUs need <strong>allergen segregation</strong>, honest flavor claims, and stable microbiology on blended botanicals. Powder inclusions change dispersion; tea-bag fill weights must match label declarations.</p>
<p>Lot-level COAs and retain samples protect you if a retailer questions a sensory shift between harvests.</p>"""
        exp = f"""<h3>🚢 Exporters / Importers</h3>
<p>Even consumer-oriented ingredients move through B2B specifications: destination microbiological limits, pesticide MRLs, and organic integrity across handlers. Dual-language labels and compliant health-copy reduce border delays.</p>
<p>Importer due diligence on <strong>moringa suppliers in India</strong> should match the same rigor as industrial powder purchases—especially for blended SKUs.</p>"""
        buyers = f"""<h3>🛒 Buyers / Wholesale buyers</h3>
<p>Cafés, D2C tea brands, and supplement makers should request <strong>pilot lots</strong>, steeping protocols from the supplier, and clear shelf-life assumptions. MOQ and lead time drive working capital; blended SKUs multiply component risk.</p>
<p>Compare quotes against published EU or FDA-aligned specs even when the sale looks “small.”</p>"""
        inv = f"""<h3>💼 Business investors</h3>
<p>Functional beverage and botanical tea categories remain crowded in 2026; differentiation comes from traceability stories, third-party testing cadence, and margin after influencer spend—not from generic “detox” packaging alone.</p>
<p>Model scenarios with realistic return rates, compliance retests, and ingredient inflation in ginger, tulsi, or organic citrus peel inputs.</p>"""
    elif profile == "business":
        farmers = f"""<h3>🧑‍🌾 Farmers / Producers</h3>
<p>Your cost structure shows up in export quotations faster than marketing ever will. For leaf destined for powder or tea, document <strong>harvest-to-dry time, dryer curve, and moisture at pack-out</strong>.</p>
<p>Farm-gate discipline—foreign material control, pesticide notebooks, organic buffers—unlocks NPOP/EU/NOP pathways that lift net price per kilo even when spot dried-leaf bids look soft.</p>"""
        mfg = f"""<h3>🏭 Manufacturers</h3>
<p>Process mapping is margin: metal detection, sieving, blend homogeneity checks, and documented rework on failed micro pulls. Private-label buyers increasingly ask for <strong>video walk-throughs and electronic COA portals</strong>.</p>
<p>Invest in water-activity monitoring and odour-controlled storage; export-grade reputation is a repeat-game, not a single-container score.</p>"""
        exp = f"""<h3>🚢 Exporters / Importers</h3>
<p>Treat every PO as a compliance bundle—HS code precision, phytosanitary or buyer-specific declarations, insurance clauses, and a negotiated retest window on arrival.</p>
<p>India-origin competitiveness in 2026 still hinges on <strong>documented traceability and fewer lot surprises</strong>; importers will pay a premium for predictability when macro freight and FX volatility persist.</p>"""
        buyers = f"""<h3>🛒 Buyers / Wholesale buyers</h3>
<p>Request matched samples to production path, not “golden” lab samples from an adjacent lot. Align on moisture method (oven vs. Karl Fischer where relevant), sieve mesh, and microbiological release criteria before you fix price.</p>
<p>For multi-container programs, negotiate escalation paths on variance in colour, fibre, or foam height in aqueous dispersion—objective tolerances beat arguments at discharge.</p>"""
        inv = f"""<h3>💼 Business investors</h3>
<p>Moringa in 2026 competes inside wider “green nutrition” budgets. diligence should stress <strong>unit economics after QC failure, not headline gross margin</strong>.</p>
<p>Look for teams with ERP-level lot traceability, retainer labs under SLA, and diversified corridors (EU, Gulf, North America) to smooth demand shocks.</p>"""
    else:
        farmers = f"""<h3>🧑‍🌾 Farmers / Producers</h3>
<p>Whether you sell domestically or into export aggregators, <strong>post-harvest hygiene and moisture discipline</strong> decide whether your leaf becomes export-grade powder, tea-cut, or distressed animal-feed pricing.</p>
<p>Organic and residue-clear panels take seasons to build—start documentation before the first audit, not after a buyer asks.</p>"""
        mfg = f"""<h3>🏭 Manufacturers</h3>
<p>Scale-up mistakes show up as silent margin leaks: inconsistent PSD curves, blend segregation in totes, or carton moisture ingress during monsoon dispatches.</p>
<p>Standard operating procedures for changeovers and cleaning validation matter as much as capital equipment when customers benchmark you against other Indian botanical processors.</p>"""
        exp = f"""<h3>🚢 Exporters / Importers</h3>
<p>Regulatory harmonisation is incomplete; treat each destination as a dossier. Keep harmonised COA templates, bilingual packing declarations, and proof of organic chain-of-custody where claimed.</p>
<p>Forwarders are partners, not magicians—book humidity-managed stuffing where carton specs demand it.</p>"""
        buyers = f"""<h3>🛒 Buyers / Wholesale buyers</h3>
<p>Map total landed cost including duty, inland haulage, and potential arrival retests. For India-origin Moringa, vet <strong>farm-to-dryer mapping, pesticide panels, and heavy-metal baselines</strong> against your own risk policy.</p>
<p>Smaller importers sometimes win by moving fewer, cleaner lots than by chasing the cheapest FOB quote.</p>"""
        inv = f"""<h3>💼 Business investors</h3>
<p>Valuation hinges on repeat purchase from disciplined buyers, not one-off spikes in superfood hype. Model downside cases with FX, energy, and freight assumptions grounded in 2024–2026 volatility regimes.</p>
<p>Prefer teams that publish transparent non-conformance rates over those promising impossible yields.</p>"""

    intro_consumer = f"""<p>In retail and wellness media, interest in botanical teas and “daily ritual” products remains high entering 2026—while regulators and educated consumers keep pressing for <strong>truthful claims and verifiable quality</strong>. That balance affects everyone from small growers to global importers.</p>"""
    intro_business = f"""<p>Commodity and botanical supply chains entered 2026 with familiar pressures—costlier compliant inputs, choosier importers, and thinner patience for documentation gaps. Moringa is no exception: the win goes to teams that treat quality and paperwork as <strong>product features, not overhead</strong>.</p>"""
    intro_mixed = f"""<p>Readers land on this topic from different angles—kitchen use, retail merchandising, or industrial procurement. Shared theme for 2026: <strong>traceable processing and honest positioning</strong> beat volume claims that evaporate on first lab retest.</p>"""

    intro = {"intro_consumer": intro_consumer, "intro_business": intro_business, "intro_mixed": intro_mixed}
    key = f"intro_{profile}"
    intro_para = intro[key]

    return f"""{HEAD_MARKER}
<h2>Why this topic matters in the 2026 market</h2>
{intro_para.strip()}
<p>This guide frames <strong>{t}</strong> with India’s export strengths and global buyer expectations in mind—without drifting into hype language that fails regulatory or B2B scrutiny.</p>
<h2>Who this guide serves, by role</h2>
<p>Use the sections below as a checklist for decisions that sync with how Moringa actually moves through Indian supply chains and international trade.</p>
{farmers}
{mfg}
{exp}
{buyers}
{inv}
"""


def tail_block(
    title: str,
    profile: Profile,
    *,
    include_faq: bool,
    include_conclusion: bool,
) -> str:
    t = title.strip()
    if profile == "consumer":
        bi = f"""<h2>Business intelligence snapshot (2026)</h2>
<p>Functional tea and botanical blends continue to pull shelf space from sugary drinks in many markets, but <strong>promotion sensitivity</strong>—especially around “detox” wording—has tightened. Retailers ask for substantiation files even when suppliers are small.</p>
<p>India remains a competitive origin for dried leaf and powder when moisture, microbiology, and metals are controlled; EU and North American buyers increasingly expect <strong>digital COAs, QR traceability pilots, or blockchain-adjacent provenance proofs</strong> on mid-tier SKUs, not only premium lines.</p>
<p>Watch input costs on companion botanicals (ginger, tulsi, citrus peel) and glassine or compostable tea-bag materials—these lines often swing gross margin more than nominal Moringa leaf price moves.</p>"""
    elif profile == "business":
        bi = f"""<h2>Business intelligence snapshot (2026)</h2>
<p>Indian Moringa exporters compete on <strong>documented reliability</strong> as much as unit price. Buyers remembered which origins maintained shipment cadence and clean paperwork through 2023–2025 logistics stress; that memory shows up in tender shortlists.</p>
<p>Differentiation vectors include vertical integration (farm + dryer + mill), rapid micro turnaround on retests, and export packaging engineered for humid transshipment. Weak nodes—informal blending, hand-written traceability—are priced as commodity.</p>
<p>Regulatory overlays (EU contaminant vigilance, US Prop 65 consciousness for California-bound goods, Middle East label language norms) reward teams that maintain <strong>destination-specific art packs and COA panels</strong> without last-minute rework.</p>"""
    else:
        bi = f"""<h2>Business intelligence snapshot (2026)</h2>
<p>Across consumer and B2B lanes, Moringa’s growth is constrained by <strong>trust infrastructure</strong>—labs, traceability, ethical claims—more than by agronomic yield alone.</p>
<p>India’s advantage is depth of skilled dryers and mill operators; the gap to close is variance reduction lot-to-lot. Exporters who publish non-conformance trends internally usually outperform traders who only market “organic” adjectives.</p>
<p>Near-term watch items include energy tariffs affecting drying costs, ocean-air spreads, and currency hedging behaviour among mid-size importers.</p>"""

    faq = f"""<h2>Frequently asked questions</h2>
<p><strong>Is India still a competitive origin for Moringa in 2026?</strong><br />
Yes when quality documentation matches price—buyers compare India with alternate origins on micro, metals, pesticide policy, and logistics reliability, not headline FOB alone.</p>
<p><strong>What is the fastest way to vet a new supplier?</strong><br />
Ask for a lot-specific COA tied to the exact pack line, confirm retest policy on arrival, and where possible audit drying and milling in person or via structured video.</p>
<p><strong>How should brands talk about health benefits responsibly?</strong><br />
Stay within structure/function guardrails for your market, cite realistic serving sizes, and route disease claims to qualified professionals—this protects both compliance and consumer trust.</p>
<p><strong>Where do margins usually leak for new exporters?</strong><br />
Moisture disputes, sample-to-PO mismatch, FX timing, informal rework labour, and rejected micro on arrival—model these explicitly, not optimistically.</p>"""

    conc = f"""<h2>Conclusion</h2>
<p><strong>{t}</strong> rewards readers who connect agronomic and processing reality with how Moringa is bought, regulated, and sold in 2026. Treat testing and traceability as negotiable assets, keep language honest, and align every commercial promise to a documented lot.</p>
<p>Next step: cross-check your own risk map against our <a href="/articles/moringa-export-quality-standards.html">export quality standards</a>, <a href="/articles/moringa-bulk-buyer-checklist.html">bulk buyer checklist</a>, and <a href="/articles/how-to-contact-indian-moringa-suppliers.html">supplier contact playbook</a>—then validate assumptions with your logistics partner and lab before you scale.</p>"""

    faq_addon = f"""<h2>Trade and documentation FAQ (add-on)</h2>
<p><strong>What documents do importers re-check first in 2026?</strong><br />
Lot-level COAs with method citations, packing list-to-label match, organic chain-of-custody where claimed, and sometimes social or allergen addenda—not just the commercial invoice.</p>
<p><strong>How do buyers treat arrival retests?</strong><br />
Negotiate windows, sampling location rules, and dispute pathways before the vessel sails. Silence equals default blame on the exporter when micro drifts at border laboratories.</p>
<p><strong>Does IEC alone clear every corridor?</strong><br />
No. Product rules, destination health claims, and channel-specific paperwork still apply. Treat IEC as table stakes, not a universal passport.</p>
<p><strong>Where do “almost organic” claims fail audits?</strong><br />
Handler commingling, undocumented buffer zones, and missing transactional certificates. Fix process before marketing premium tiers.</p>"""

    conc_addon = f"""<h2>Execution recap</h2>
<p>Use this guide as a bridge between <strong>regulatory literacy and batch discipline</strong>: align licences, labels, and lab panels to the exact SKU you intend to ship—then rehearse the paperwork path with your forwarder before the first paid invoice.</p>"""

    parts = [TAIL_MARKER, bi]
    parts.append(faq if include_faq else faq_addon)
    parts.append(conc if include_conclusion else conc_addon)
    return "\n".join(parts) + "\n"


def prose_word_count_from_inner(inner_html: str) -> int:
    t = re.sub(r"<script\b[^>]*>[\s\S]*?</script>", " ", inner_html, flags=re.I)
    t = re.sub(r"<style\b[^>]*>[\s\S]*?</style>", " ", t, flags=re.I)
    t = re.sub(r"<[^>]+>", " ", t)
    t = re.sub(r"&nbsp;", " ", t)
    t = re.sub(r"&[a-z]+;", " ", t, flags=re.I)
    return len(re.findall(r"[\w'-]+", t))


def extract_h1(html: str) -> str | None:
    m = re.search(r"<h1[^>]*>([\s\S]*?)</h1>", html, re.I)
    if not m:
        return None
    return re.sub(r"<[^>]+>", "", m.group(1)).strip()


def extract_article_prose_inner(html: str) -> str | None:
    start_pat = '<div class="article-prose">'
    i = html.find(start_pat)
    if i < 0:
        return None
    start = i + len(start_pat)
    depth = 1
    pos = start
    while depth > 0 and pos < len(html):
        next_open = html.find("<div", pos)
        next_close = html.find("</div>", pos)
        if next_close < 0:
            break
        if next_open >= 0 and next_open < next_close:
            depth += 1
            pos = next_open + 4
        else:
            depth -= 1
            if depth == 0:
                return html[start:next_close]
            pos = next_close + 6
    return None


def inject_head(html: str, head_html: str) -> str | None:
    if HEAD_MARKER in html:
        return html
    m = re.search(r'(<div class="article-prose">\s*)(<p\b[^>]*>[\s\S]*?</p>)', html, re.I)
    if not m:
        m2 = re.search(r'(<div class="article-prose">\s*)()', html, re.I)
        if not m2:
            return None
        insert_at = m2.end(1)
        return html[:insert_at] + "\n" + head_html + html[insert_at:]
    insert_at = m.end(2)
    return html[:insert_at] + "\n" + head_html + html[insert_at:]


def inject_tail(html: str, tail_html: str) -> str | None:
    if TAIL_MARKER in html:
        return html
    anchor = '<h2>More on Moringa (editorial hub)</h2>'
    idx = html.find(anchor)
    if idx < 0:
        anchor2 = '<p><em>Last updated:'
        idx = html.find(anchor2)
    if idx < 0:
        anchor3 = '<div class="related-articles"'
        idx = html.find(anchor3)
    if idx < 0:
        return None
    return html[:idx] + tail_html + html[idx:]


def has_closing_section(inner: str) -> bool:
    low = inner.lower()
    if "<h2>takeaway</h2>" in low or "<h2>conclusion</h2>" in low:
        return True
    if "<h2>closing" in low:
        return True
    if "<h2>summary</h2>" in low:
        return True
    return False


def has_faq_section(inner: str) -> bool:
    return bool(re.search(r"<h2\b[^>]*>\s*FAQ\s*</h2>", inner, re.I))


def update_article_wordcount_json_ld(html: str, inner: str) -> str:
    n = prose_word_count_from_inner(inner)
    pat = r'"wordCount"\s*:\s*\d+'

    def repl(m: re.Match[str]) -> str:
        return f'"wordCount": {n}'

    if not re.search(pat, html):
        return html
    return re.sub(pat, repl, html, count=1)


def rebuild_inner_after_patch(html: str) -> str | None:
    start = html.find('<div class="article-prose">')
    if start < 0:
        return None
    start += len('<div class="article-prose">')
    depth = 1
    pos = start
    while depth > 0 and pos < len(html):
        next_open = html.find("<div", pos)
        next_close = html.find("</div>", pos)
        if next_close < 0:
            break
        if next_open >= 0 and next_open < next_close:
            depth += 1
            pos = next_open + 4
        else:
            depth -= 1
            if depth == 0:
                return html[start:next_close]
            pos = next_close + 6
    return None
