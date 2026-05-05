"""Report word counts inside <div class="article-prose"> (text only, all descendants)."""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ARTICLES = ROOT / "articles"
SKIP = {"index.html"}


def strip_tags(html: str) -> str:
    txt = re.sub(r"<script\b[^>]*>[\s\S]*?</script>", " ", html, flags=re.I)
    txt = re.sub(r"<style\b[^>]*>[\s\S]*?</style>", " ", txt, flags=re.I)
    txt = re.sub(r"<[^>]+>", " ", txt)
    txt = re.sub(r"&nbsp;", " ", txt)
    txt = re.sub(r"&#(\d+);", lambda m: chr(int(m.group(1))), txt)
    txt = re.sub(r"&[a-z]+;", " ", txt, flags=re.I)
    return txt


def extract_article_prose_inner(html: str) -> str | None:
    start_pat = r'<div class="article-prose">'
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


def word_count(text: str) -> int:
    clean = strip_tags(text)
    parts = re.findall(r"[\w'-]+", clean)
    return len(parts)


def main() -> None:
    rows: list[tuple[int, str]] = []
    for path in sorted(ARTICLES.glob("*.html")):
        if path.name in SKIP:
            continue
        html = path.read_text(encoding="utf-8", errors="replace")
        inner = extract_article_prose_inner(html)
        if inner is None:
            rows.append((-1, path.name))
            continue
        n = word_count(inner)
        rows.append((n, path.name))
    rows.sort(key=lambda x: (x[0] if x[0] >= 0 else 99999, x[1]))
    under = [r for r in rows if 0 <= r[0] < 900]
    print(f"articles/*.html (excl index): {len(rows)} files")
    print(f"under 900 words in .article-prose: {len(under)}")
    print("--- lowest 35 ---")
    for n, name in rows[:35]:
        flag = " <900" if 0 <= n < 900 else ""
        print(f"{n:5d}  {name}{flag}")
    print("---")
    if under:
        print("needs expansion:")
        for n, name in sorted(under, key=lambda x: x[0]):
            print(f"  {n:5d}  {name}")


if __name__ == "__main__":
    main()
