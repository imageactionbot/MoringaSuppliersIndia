import re
from pathlib import Path

def wc(path: Path) -> int:
    t = path.read_text(encoding="utf-8")
    i = t.find("article-prose")
    if i < 0:
        return 0
    sub = t[i : i + 80000]
    sub = re.sub(r"<[^>]+>", " ", sub)
    return len(re.findall(r"[\w'-]+", sub))


ROOT = Path(__file__).resolve().parent.parent
for rel in (
    "topics/farming-cluster.html",
    "topics/export-cluster.html",
    "topics/processing-cluster.html",
    "topics/buyers-market-cluster.html",
    "buy-moringa-from-india.html",
    "find-moringa-suppliers.html",
    "export-inquiry.html",
):
    print(rel, wc(ROOT / rel))
