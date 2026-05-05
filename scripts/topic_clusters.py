# -*- coding: utf-8 -*-
"""Topic cluster (silo) assignments for MoringaSuppliersIndia articles."""
from __future__ import annotations

# All article slugs (filename without .html), excluding articles/index.html
ALL_SLUGS: frozenset[str] = frozenset(
    {
        "best-countries-moringa-export-2026",
        "diy-moringa-face-masks",
        "find-verified-moringa-buyers-online",
        "global-moringa-demand-trends-2026-2030",
        "global-moringa-market-size-forecast-2030",
        "high-quality-moringa-suppliers-india",
        "how-much-money-moringa-export-india",
        "how-to-contact-indian-moringa-suppliers",
        "import-moringa-from-india-step-by-step",
        "is-moringa-profitable-business-2026",
        "moringa-anemia",
        "moringa-benefits-every-age",
        "moringa-bulk-buyer-checklist",
        "moringa-business-models-farming-trading-export",
        "moringa-buyers-worldwide-usa-europe-middle-east",
        "moringa-capsules-benefits-guide",
        "moringa-certification-organic-export-grade",
        "moringa-climate-yield-quality",
        "moringa-cooking-daily",
        "moringa-demand-usa-europe-middle-east-analysis",
        "moringa-detox-tea-recipes",
        "moringa-diabetes",
        "moringa-eu-market",
        "moringa-export-business-india-guide",
        "moringa-export-business-registration-india",
        "moringa-export-business-start-step-by-step-2026",
        "moringa-export-license-india-guide",
        "moringa-export-profit-margin-breakdown-beginners",
        "moringa-export-profit-margin-explained",
        "moringa-export-quality-standards",
        "moringa-export-requirements-usa-europe",
        "moringa-farming-business-plan-beginners-2026",
        "moringa-farming-cost-per-acre-breakdown",
        "moringa-farming-investment-return-analysis",
        "moringa-farming-profit-per-acre",
        "moringa-farming-risk-management",
        "moringa-farming-vs-cash-crops-comparison",
        "moringa-for-pets",
        "moringa-global-demand-2030-trends",
        "moringa-hair-skin",
        "moringa-high-yield-farming-maximum-profit",
        "moringa-honey-benefits-guide",
        "moringa-international-buyers-contact-guide",
        "moringa-international-shipping-logistics-cost-guide",
        "moringa-irrigation-commercial-farming",
        "moringa-leaf-drying-process-powder",
        "moringa-oil-benefits-guide",
        "moringa-oil-extraction-business-profit-india",
        "moringa-one-acre-case-study",
        "moringa-packaging-international",
        "moringa-packaging-standards-export-business",
        "moringa-powder-benefits-complete-guide",
        "moringa-powder-manufacturing-cost-setup-india",
        "moringa-powder-manufacturing-process",
        "moringa-powder-vs-capsules",
        "moringa-private-label-india",
        "moringa-quality-control-export-grade",
        "moringa-scale-local-to-global-market",
        "moringa-side-effects-safety",
        "moringa-skincare-products-guide",
        "moringa-supply-chain-farmer-to-exporter",
        "moringa-vs-kale-spinach",
        "moringa-vs-spirulina",
        "moringa-weight-loss",
        "moringa-wholesale-export-pricing-strategy",
        "moringa-wholesale-market-strategy-high-profit",
        "moringa-yield-per-acre-profit-techniques",
        "one-acre-moringa-income-reality-check",
        "organic-india-vs-vahdam-vs-kuli-kuli",
        "organic-vs-chemical-moringa-farming-profit",
        "pure-vs-adulterated-moringa",
        "sell-moringa-products-international-companies",
        "small-scale-moringa-processing-unit-cost-india",
        "start-small-scale-moringa-powder-factory",
        "top-moringa-states-india",
        "ultimate-moringa-encyclopedia",
        "verified-moringa-buyers-usa-europe-guide",
        "why-moringa-demand-increasing-worldwide",
        "how-to-contact-indian-moringa-suppliers",
        "import-moringa-from-india-step-by-step",
        "moringa-bulk-buyer-checklist",
        "moringa-private-label-india",
        "ultimate-moringa-encyclopedia",
        "moringa-benefits-every-age",
        "moringa-side-effects-safety",
        "pure-vs-adulterated-moringa",
        "moringa-powder-benefits-complete-guide",
        "moringa-capsules-benefits-guide",
        "moringa-oil-benefits-guide",
        "moringa-skincare-products-guide",
        "moringa-powder-vs-capsules",
        "moringa-honey-benefits-guide",
    }
)

FARMING_SLUGS: frozenset[str] = frozenset(
    {
        "moringa-climate-yield-quality",
        "moringa-farming-business-plan-beginners-2026",
        "moringa-farming-cost-per-acre-breakdown",
        "moringa-farming-investment-return-analysis",
        "moringa-farming-profit-per-acre",
        "moringa-farming-risk-management",
        "moringa-farming-vs-cash-crops-comparison",
        "moringa-high-yield-farming-maximum-profit",
        "moringa-irrigation-commercial-farming",
        "moringa-one-acre-case-study",
        "moringa-yield-per-acre-profit-techniques",
        "one-acre-moringa-income-reality-check",
        "organic-vs-chemical-moringa-farming-profit",
        "top-moringa-states-india",
    }
)

EXPORT_SLUGS: frozenset[str] = frozenset(
    {
        "best-countries-moringa-export-2026",
        "how-much-money-moringa-export-india",
        "moringa-certification-organic-export-grade",
        "moringa-eu-market",
        "moringa-export-business-india-guide",
        "moringa-export-business-registration-india",
        "moringa-export-business-start-step-by-step-2026",
        "moringa-export-license-india-guide",
        "moringa-export-profit-margin-breakdown-beginners",
        "moringa-export-profit-margin-explained",
        "moringa-export-quality-standards",
        "moringa-export-requirements-usa-europe",
        "moringa-international-shipping-logistics-cost-guide",
        "moringa-packaging-international",
        "moringa-packaging-standards-export-business",
        "moringa-wholesale-export-pricing-strategy",
    }
)

PROCESSING_SLUGS: frozenset[str] = frozenset(
    {
        "moringa-leaf-drying-process-powder",
        "moringa-oil-extraction-business-profit-india",
        "moringa-powder-manufacturing-cost-setup-india",
        "moringa-powder-manufacturing-process",
        "moringa-quality-control-export-grade",
        "small-scale-moringa-processing-unit-cost-india",
        "start-small-scale-moringa-powder-factory",
    }
)

ClusterId = str  # "farming" | "export" | "processing" | "market"

MARKET_SLUGS: frozenset[str] = ALL_SLUGS - FARMING_SLUGS - EXPORT_SLUGS - PROCESSING_SLUGS

CLUSTER_HUB: dict[ClusterId, str] = {
    "farming": "/topics/farming-cluster.html",
    "export": "/topics/export-cluster.html",
    "processing": "/topics/processing-cluster.html",
    "market": "/topics/buyers-market-cluster.html",
}

CLUSTER_LABEL: dict[ClusterId, str] = {
    "farming": "🌿 Farming cluster",
    "export": "💰 Export cluster",
    "processing": "🏭 Processing cluster",
    "market": "🌍 Buyers &amp; market cluster",
}

MONEY_PAGE_BY_CLUSTER: dict[ClusterId, tuple[str, str]] = {
    "farming": ("/find-moringa-suppliers.html", "Find Moringa suppliers (India)"),
    "export": ("/export-inquiry.html", "Export inquiry — India to your port"),
    "processing": ("/find-moringa-suppliers.html", "Find processors & toll partners"),
    "market": ("/buy-moringa-from-india.html", "Buy Moringa from India (B2B &amp; retail paths)"),
}

# Title fragments for internal link text (slug -> short label)
_SLUG_TITLES: dict[str, str] = {
    "moringa-farming-profit-per-acre": "Farming profit per acre",
    "moringa-export-business-india-guide": "Export business from India",
    "moringa-powder-manufacturing-process": "Powder manufacturing process",
    "how-to-contact-indian-moringa-suppliers": "Contact Indian suppliers",
    "moringa-bulk-buyer-checklist": "Bulk buyer checklist",
    "import-moringa-from-india-step-by-step": "Import from India (step by step)",
    "moringa-export-quality-standards": "Export quality standards",
    "high-quality-moringa-suppliers-india": "Vet high-quality suppliers",
    "moringa-one-acre-case-study": "One-acre case study",
    "moringa-quality-control-export-grade": "QC for export grade",
}


def slug_to_cluster(slug: str) -> ClusterId:
    if slug in FARMING_SLUGS:
        return "farming"
    if slug in EXPORT_SLUGS:
        return "export"
    if slug in PROCESSING_SLUGS:
        return "processing"
    if slug in MARKET_SLUGS:
        return "market"
    raise KeyError(f"Unknown article slug: {slug}")


def cluster_members(cluster: ClusterId) -> list[str]:
    m = {
        "farming": FARMING_SLUGS,
        "export": EXPORT_SLUGS,
        "processing": PROCESSING_SLUGS,
        "market": MARKET_SLUGS,
    }[cluster]
    return sorted(m)


def link_label(slug: str) -> str:
    if slug in _SLUG_TITLES:
        return _SLUG_TITLES[slug]
    parts = slug.replace("moringa-", "").split("-")
    return " ".join(w.capitalize() for w in parts[:5]) + ("…" if len(parts) > 5 else "")


def internal_link_html(current_slug: str) -> str:
    """Five internal links: hub + 3 peers + 1 money page."""
    cluster = slug_to_cluster(current_slug)
    hub_url = CLUSTER_HUB[cluster]
    hub_emoji_title = {
        "farming": "🌿 Farming cluster hub",
        "export": "💰 Export cluster hub",
        "processing": "🏭 Processing cluster hub",
        "market": "🌍 Buyers &amp; market cluster hub",
    }[cluster]
    peers = [s for s in cluster_members(cluster) if s != current_slug]
    picks: list[str] = []
    idx = abs(hash(current_slug)) % len(peers) if peers else 0
    rotated = peers[idx:] + peers[:idx] if peers else []
    for s in rotated:
        if len(picks) >= 3:
            break
        picks.append(s)
    money_href, money_label = MONEY_PAGE_BY_CLUSTER[cluster]
    lis = [
        f'<li><a href="{hub_url}"><strong>{hub_emoji_title}</strong></a></li>',
    ]
    for s in picks:
        lis.append(f'<li><a href="/articles/{s}.html">{link_label(s)}</a></li>')
    lis.append(f'<li><a href="{money_href}"><strong>{money_label}</strong></a></li>')
    items = "\n".join(f"    {x}" for x in lis)
    return f"""<!-- cluster-internal-links:v1 -->
<section class="topic-cluster-nav topic-cluster-nav--inline" aria-label="Topic cluster navigation">
<h2>Keep reading in this topic cluster</h2>
<p class="topic-cluster-lead">Three to five internal jumps—same silo, different job-to-be-done. (Site map rule: every article links deeper into its cluster plus one conversion path.)</p>
<ul class="topic-cluster-list">
{items}
</ul>
</section>

"""


def validate_partition() -> None:
    assert len(ALL_SLUGS) == 78, len(ALL_SLUGS)
    assert FARMING_SLUGS | EXPORT_SLUGS | PROCESSING_SLUGS | MARKET_SLUGS == ALL_SLUGS
    assert not (FARMING_SLUGS & EXPORT_SLUGS)
    assert not (FARMING_SLUGS & PROCESSING_SLUGS)
    assert not (EXPORT_SLUGS & PROCESSING_SLUGS)


validate_partition()
