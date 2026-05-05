"""
Remove duplicated 'Further reading and procurement' tail blocks from article HTML.
Adds a single editorial cross-link block + last-updated line before the first Amazon/B2B CTA.
"""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "articles"

REPLACEMENT = """<h2>More on Moringa (editorial hub)</h2>
<p>Continue with our <a href="/articles/ultimate-moringa-encyclopedia.html">Moringa encyclopedia</a>, <a href="/articles/moringa-side-effects-safety.html">safety &amp; interactions guide</a>, and <a href="/articles/pure-vs-adulterated-moringa.html">pure vs adulterated powder</a> checklist. Importing or vetting <strong>moringa suppliers in India</strong>? Start at the <a href="/">home buyer guide</a> and <a href="/articles/moringa-bulk-buyer-checklist.html">bulk buyer checklist</a>.</p>
<p><em>Last updated: May 2026.</em></p>
"""

FURTHER_PROC = re.compile(
    r"<h2>Further reading and procurement context</h2>[\s\S]*?(?=<section class=\"article-cta-panel\")",
    re.MULTILINE,
)


def inject_last_updated(html: str) -> str:
    if "Last updated: May 2026" in html:
        return html
    start = html.find('<div class="article-prose">')
    if start == -1:
        return html
    rel = html[start:]
    cta = rel.find('<section class="article-cta-panel"')
    if cta == -1:
        return html
    ins = start + cta
    prefix = '<p><em>Last updated: May 2026.</em></p>\n\n'
    return html[:ins] + prefix + html[ins:]


def main() -> None:
    tail_fixes = 0
    for f in sorted(ROOT.glob("*.html")):
        if f.name == "index.html":
            continue
        text = f.read_text(encoding="utf-8")
        new_text, n = FURTHER_PROC.subn(REPLACEMENT, text, count=1)
        if n:
            tail_fixes += 1
        final = inject_last_updated(new_text)
        if final != text:
            f.write_text(final, encoding="utf-8")
            print(f"OK {f.name}" + (" [tail]" if n else " [date-only]"))
    print(f"Done. Rewrote procurement tail in {tail_fixes} files; last-updated ensured on all touched articles.")


if __name__ == "__main__":
    main()
