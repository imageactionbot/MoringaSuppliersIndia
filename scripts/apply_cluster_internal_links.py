# -*- coding: utf-8 -*-
"""Inject topic-cluster internal link block before SEO tail marker (or editorial hub)."""
from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "scripts"))

from topic_clusters import ALL_SLUGS, internal_link_html  # noqa: E402

MARKER = "<!-- cluster-internal-links:v1 -->"
ART = ROOT / "articles"


def inject(html: str, slug: str) -> str:
    if MARKER in html:
        return html
    block = internal_link_html(slug)
    for anchor in (
        "<!-- article-seo-envelope:tail-v1 -->",
        '<h2>More on Moringa (editorial hub)</h2>',
        "<p><em>Last updated:",
        '<div class="related-articles"',
    ):
        i = html.find(anchor)
        if i >= 0:
            return html[:i] + block + html[i:]
    return html


def main() -> None:
    n = 0
    for f in sorted(ART.glob("*.html")):
        if f.name == "index.html":
            continue
        slug = f.stem
        if slug not in ALL_SLUGS:
            print(f"skip unknown slug: {f.name}")
            continue
        text = f.read_text(encoding="utf-8", errors="replace")
        new_text = inject(text, slug)
        if new_text != text:
            f.write_text(new_text, encoding="utf-8")
            n += 1
            print(f"OK {f.name}")
    print(f"Done. Updated {n} articles.")


if __name__ == "__main__":
    main()
