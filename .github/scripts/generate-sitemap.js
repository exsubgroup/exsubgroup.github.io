const fs   = require('fs');
const path = require('path');

/* ── CONFIG ─────────────────────────────────────────────
   Change these two values to match your project. */
const BASE_URL   = 'https://exsubgroup.github.io';
const ROOT_DIR   = path.resolve(__dirname, '..', '..');   // repo root
const OUTPUT     = path.join(ROOT_DIR, 'sitemap.xml');

/* ── PAGES TO EXCLUDE ──────────────────────────────────── */
const EXCLUDE_FILES = new Set([
  'index.html',          // optional — include if you want
  'test.html',           // test pages
  '404.html'
]);

/* Directories to skip entirely */
const EXCLUDE_DIRS = new Set([
  'node_modules',
  '.git',
  '.github',
  'images',
  'js',
  'css',
  'assets',
  'fonts'
]);

/* Priority rules based on filename */
function getPriority(file) {
  const name = file.toLowerCase();
  if (name === 'index.html')            return '1.0';
  if (name.includes('signup') || name.includes('signin')) return '0.9';
  if (name.includes('analytics') || name.includes('dashboard')) return '0.9';
  if (name.includes('members') || name.includes('groups'))    return '0.8';
  return '0.64';   // your existing default
}

function getChangeFreq(file) {
  const name = file.toLowerCase();
  if (name === 'index.html')  return 'daily';
  if (name.includes('task') || name.includes('proof')) return 'hourly';
  return 'weekly';
}

/* ── RECURSIVELY WALK THE REPO ─────────────────────────── */
function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (EXCLUDE_DIRS.has(entry.name)) continue;
    if (entry.name.startsWith('.')) continue;

    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      if (EXCLUDE_FILES.has(entry.name)) continue;
      files.push(full);
    }
  }
  return files;
}

/* ── BUILD URL FROM FILE PATH ──────────────────────────── */
function fileToUrl(filePath) {
  const rel = path.relative(ROOT_DIR, filePath).split(path.sep).join('/');
  // Strip .html extension for cleaner URLs
  const clean = rel.replace(/\.html$/, '');
  return BASE_URL + '/' + clean;
}

/* ── GENERATE XML ──────────────────────────────────────── */
function generate() {
  const files = walk(ROOT_DIR).sort();
  const today = new Date().toISOString();

  const urls = files.map(file => {
    const rel      = path.relative(ROOT_DIR, file).split(path.sep).join('/');
    const loc      = fileToUrl(file);
    const priority = getPriority(rel);
    const freq     = getChangeFreq(rel);

    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;

  fs.writeFileSync(OUTPUT, xml, 'utf8');
  console.log(`✅ sitemap.xml generated with ${files.length} URLs`);
  files.forEach(f => console.log('   •', fileToUrl(f)));
}

generate();
