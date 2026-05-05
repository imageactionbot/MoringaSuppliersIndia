# -*- coding: utf-8 -*-
"""Apply SEO envelope (role sections, BI, FAQ) to articles under target word count."""
from __future__ import annotations

from pathlib import Path

from moringa_article_seo_envelope import (
    detect_profile,
    extract_article_prose_inner,
    extract_h1,
    has_closing_section,
    has_faq_section,
    head_block,
    inject_head,
    inject_tail,
    prose_word_count_from_inner,
    rebuild_inner_after_patch,
    tail_block,
    update_article_wordcount_json_ld,
)

ROOT = Path(__file__).resolve().parent.parent
ARTICLES = ROOT / "articles"
MIN_WORDS = 900


def main() -> None:
    touched = 0
    skipped_high = 0
    failed = []

    for path in sorted(ARTICLES.glob("*.html")):
        if path.name == "index.html":
            continue
        html = path.read_text(encoding="utf-8", errors="replace")
        inner = extract_article_prose_inner(html)
        if inner is None:
            failed.append((path.name, "no article-prose"))
            continue
        wc = prose_word_count_from_inner(inner)
        if wc >= MIN_WORDS:
            skipped_high += 1
            continue

        h1 = extract_h1(html) or path.stem.replace("-", " ").title()
        slug = path.stem
        profile = detect_profile(slug)

        hb = head_block(h1, profile)
        include_faq = not has_faq_section(inner)
        include_conclusion = not has_closing_section(inner)
        tb = tail_block(h1, profile, include_faq=include_faq, include_conclusion=include_conclusion)

        new_html = inject_head(html, hb)
        if new_html is None:
            failed.append((path.name, "inject_head failed"))
            continue
        new_html = inject_tail(new_html, tb)
        if new_html is None:
            failed.append((path.name, "inject_tail failed"))
            continue

        new_inner = rebuild_inner_after_patch(new_html)
        if new_inner:
            new_html = update_article_wordcount_json_ld(new_html, new_inner)

        path.write_text(new_html, encoding="utf-8")
        new_wc = prose_word_count_from_inner(new_inner) if new_inner else 0
        print(f"OK {path.name}: {wc} -> {new_wc} words")
        touched += 1

    print(f"\nDone. Updated {touched} articles; skipped (already >= {MIN_WORDS} words): {skipped_high}.")
    if failed:
        print("Issues:")
        for name, msg in failed:
            print(f"  {name}: {msg}")


if __name__ == "__main__":
    main()
