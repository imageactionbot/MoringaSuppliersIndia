# -*- coding: utf-8 -*-
"""Patch articles/index.html, sitemap, and footers for batch-3 business articles."""
from __future__ import annotations

import html as html_lib
import importlib.util
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
INDEX = ROOT / "articles" / "index.html"
SITEMAP = ROOT / "sitemap.xml"


def load_batch3():
    path = Path(__file__).resolve().parent / "moringa_business_article_batch3.py"
    spec = importlib.util.spec_from_file_location("batch3", path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod.BATCH3_ARTICLES


def main() -> None:
    batch3 = load_batch3()
    text = INDEX.read_text(encoding="utf-8")
    text = text.replace('<div class="phs-value">58</div>', '<div class="phs-value">78</div>', 1)

    lis = []
    for a in batch3:
        title = a["h1"]
        desc = html_lib.escape(a["meta_desc"])
        fn = a["filename"]
        lis.append(
            f'<li><a href="/articles/{fn}"><strong>{title}</strong></a><br>'
            f'<span class="articles-hub-desc">{desc}</span></li>'
        )
    block = "\n".join(lis)
    needle = '<li><a href="/articles/ultimate-moringa-encyclopedia.html"'
    if needle not in text:
        raise SystemExit("Hub insert marker not found")
    text = text.replace(needle, block + "\n" + needle, 1)

    m = re.search(r'<script type="application/ld\+json">(.+?)</script>', text, re.DOTALL)
    if not m:
        raise SystemExit("ld+json not found")
    data = json.loads(m.group(1))
    coll = next(x for x in data["@graph"] if x.get("@type") == "CollectionPage")
    base = "https://www.moringasuppliersindia.com/articles/"
    for a in batch3:
        coll["hasPart"].append(
            {
                "@type": "Article",
                "headline": a["headline_schema"],
                "url": f"{base}{a['filename']}",
            }
        )
    new_json = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
    text = text[: m.start(1)] + new_json + text[m.end(1) :]
    INDEX.write_text(text, encoding="utf-8")
    print("index.html: hasPart count", len(coll["hasPart"]))

    sm = SITEMAP.read_text(encoding="utf-8")
    insert_before = "  <url><loc>https://www.moringasuppliersindia.com/legal/disclaimer.html</loc>"
    new_urls = [
        f'  <url><loc>https://www.moringasuppliersindia.com/articles/{a["filename"]}</loc>'
        f"<lastmod>2026-05-05</lastmod><changefreq>monthly</changefreq><priority>0.85</priority></url>"
        for a in batch3
    ]
    blob = "\n".join(new_urls) + "\n"
    if insert_before not in sm:
        raise SystemExit("sitemap marker missing")
    sm = sm.replace(insert_before, blob + insert_before, 1)
    SITEMAP.write_text(sm, encoding="utf-8")
    print("sitemap: appended", len(batch3), "article URLs")

    n = 0
    for p in (ROOT / "articles").glob("*.html"):
        if p.name == "index.html":
            continue
        t = p.read_text(encoding="utf-8")
        if "(58 articles)" in t:
            p.write_text(t.replace("(58 articles)", "(78 articles)"), encoding="utf-8")
            n += 1
    print("article footers updated:", n, "files")


if __name__ == "__main__":
    main()
