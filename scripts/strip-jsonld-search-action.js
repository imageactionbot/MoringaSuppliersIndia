/**
 * Removes WebSite SearchAction from JSON-LD (Google expects a working on-site search).
 * Safe to re-run after pulls.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const SKIP_DIRS = new Set(['node_modules', '.git', 'content']);

/** Matches compact + pretty-printed blocks emitted by site-shell / generators. */
const BLOCK_RE =
  /,\s*"potentialAction"\s*:\s*\{\s*"@type"\s*:\s*"SearchAction"[\s\S]*?"query-input"\s*:\s*"required name=search_term_string"\s*\}/g;

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(ent.name)) continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p);
    else if (ent.name.endsWith('.html')) {
      let html = fs.readFileSync(p, 'utf8');
      if (!html.includes('"SearchAction"')) continue;
      const next = html.replace(BLOCK_RE, '');
      if (next !== html) fs.writeFileSync(p, next, 'utf8');
    }
  }
}

walk(root);
console.log('strip-jsonld-search-action: done');
