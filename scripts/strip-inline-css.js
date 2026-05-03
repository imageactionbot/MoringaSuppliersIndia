const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const htmlPath = path.join(root, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');
const lines = html.split(/\r?\n/);

const link = '  <link rel="stylesheet" href="/assets/css/main.css?v=10" />';
const part1 = lines.slice(0, 311).join('\n');
const part2 = lines.slice(1958, 2018).join('\n');
const part3 = lines.slice(2045).join('\n');
let out = part1 + '\n' + link + '\n' + part2 + '\n' + part3;

out = out.replace(
  /<script>\s*\/\/ Nav scroll[\s\S]*?<\/script>\s*(?=<\/body>)/m,
  '  <script defer src="/assets/js/main.js?v=10"></script>\n'
);

fs.writeFileSync(htmlPath, out, 'utf8');
console.log('OK: index.html updated');
