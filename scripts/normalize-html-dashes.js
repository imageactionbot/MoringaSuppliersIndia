/**
 * Replace UTF-8 em/en dashes in HTML with ASCII-safe entities outside JSON-LD,
 * and JSON \u escapes inside application/ld+json blocks (avoids mojibake if charset is wrong).
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const LD_JSON_RE =
  /<script\b[^>]*\btype\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

function fixHtml(content) {
  let out = '';
  let last = 0;
  let m;
  const s = String(content);
  const re = new RegExp(LD_JSON_RE.source, LD_JSON_RE.flags);
  while ((m = re.exec(s)) !== null) {
    out += s
      .slice(last, m.index)
      .replace(/\u2014/g, '&mdash;')
      .replace(/\u2013/g, '&ndash;');
    const inner = m[1].replace(/\u2014/g, '\\u2014').replace(/\u2013/g, '\\u2013');
    const openLen = m[0].indexOf(m[1]);
    const openTag = m[0].slice(0, openLen);
    const closeTag = m[0].slice(openLen + m[1].length);
    out += openTag + inner + closeTag;
    last = m.index + m[0].length;
  }
  out += s.slice(last).replace(/\u2014/g, '&mdash;').replace(/\u2013/g, '&ndash;');
  return out;
}

module.exports = { fixHtml };

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    if (name.name === 'node_modules' || name.name === '.git') continue;
    const p = path.join(dir, name.name);
    if (name.isDirectory()) walk(p, acc);
    else if (name.name.endsWith('.html')) acc.push(p);
  }
  return acc;
}

if (require.main === module) {
  const files = walk(root).filter((p) => !p.includes(`${path.sep}node_modules${path.sep}`));
  let changed = 0;
  for (const file of files) {
    const raw = fs.readFileSync(file, 'utf8');
    const next = fixHtml(raw);
    if (next !== raw) {
      fs.writeFileSync(file, next, 'utf8');
      changed++;
      console.log('updated', path.relative(root, file));
    }
  }
  console.log('done, files changed:', changed);
}
