# -*- coding: utf-8 -*-
"""Add emoji role labels to existing SEO envelope sections (one-time / idempotent)."""
from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ART = ROOT / "articles"

REPL = (
    ("<h3>Farmers and producers</h3>", "<h3>🧑‍🌾 Farmers / Producers</h3>"),
    ("<h3>Manufacturers and processors</h3>", "<h3>🏭 Manufacturers</h3>"),
    ("<h3>Exporters and importers</h3>", "<h3>🚢 Exporters / Importers</h3>"),
    ("<h3>Buyers and wholesale purchasers</h3>", "<h3>🛒 Buyers / Wholesale buyers</h3>"),
    ("<h3>Business investors and strategists</h3>", "<h3>💼 Business investors</h3>"),
)


def main() -> None:
    nfiles = 0
    for f in sorted(ART.glob("*.html")):
        if f.name == "index.html":
            continue
        t = f.read_text(encoding="utf-8")
        orig = t
        for a, b in REPL:
            t = t.replace(a, b)
        if t != orig:
            f.write_text(t, encoding="utf-8")
            nfiles += 1
    print(f"Updated role headings in {nfiles} files.")


if __name__ == "__main__":
    main()
