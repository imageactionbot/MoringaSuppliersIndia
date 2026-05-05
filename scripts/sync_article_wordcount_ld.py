# -*- coding: utf-8 -*-
"""Rewrite Article schema wordCount inside JSON-LD to match .article-prose text count."""
from __future__ import annotations

import re
from pathlib import Path

import sys

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "scripts"))

from moringa_article_seo_envelope import (  # noqa: E402
    extract_article_prose_inner,
    prose_word_count_from_inner,
)

ART = ROOT / "articles"


def main() -> None:
    pat = re.compile(r'"wordCount"\s*:\s*\d+')
    for f in sorted(ART.glob("*.html")):
        if f.name == "index.html":
            continue
        html = f.read_text(encoding="utf-8", errors="replace")
        inner = extract_article_prose_inner(html)
        if inner is None:
            print(f"skip {f.name}")
            continue
        n = prose_word_count_from_inner(inner)
        if not pat.search(html):
            continue
        new_html = pat.sub(f'"wordCount": {n}', html, count=1)
        if new_html != html:
            f.write_text(new_html, encoding="utf-8")
            print(f"{f.name} -> {n}")


if __name__ == "__main__":
    main()
