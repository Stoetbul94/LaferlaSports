/**
 * Post-build QC for the shotgun integration.
 * Verifies referenced images exist and that slugs / SEO metadata are unique.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');

function readFile(p) {
  return fs.readFileSync(path.join(ROOT, p), 'utf8');
}

let failures = 0;
function check(ok, message) {
  if (!ok) {
    failures += 1;
    console.error(`FAIL  ${message}`);
  }
}

// --- 1. Every image path referenced in source resolves on disk ---
const sources = [
  'lib/shotgun-products.ts',
  'lib/shotgun-categories.ts',
  'app/shop/shotgun/page.tsx',
  'app/shop/page.tsx',
  'app/page.tsx',
];

const referenced = new Set();
for (const file of sources) {
  const text = readFile(file);
  for (const m of text.matchAll(/['"`](\/images\/[^'"`\s]+)['"`]/g)) {
    referenced.add(m[1]);
  }
  // Template-literal image paths, e.g. `${IMAGE_BASE}/capapie-ammo-bag.webp`.
  // Skip the CAPIVEST helper, whose path also interpolates the model number;
  // those are expanded explicitly below.
  for (const m of text.matchAll(/\$\{IMAGE_BASE\}(\/[a-z0-9/.-]+\.webp)/g)) {
    referenced.add(`/images/products/shotgun${m[1]}`);
  }
}

// Expand the CAPIVEST template (front/back per model number).
const vestNumbers = ['01', '02', '03', '05', '06', '07', '08', '09', '10', '12', '13', '14'];
for (const n of vestNumbers) {
  referenced.add(`/images/products/shotgun/capapie-capivest-${n}-shotgun-vest-front.webp`);
  referenced.add(`/images/products/shotgun/capapie-capivest-${n}-shotgun-vest-back.webp`);
}

let missing = 0;
for (const rel of [...referenced].sort()) {
  if (rel.includes('${')) continue; // unresolved template fragment
  if (!fs.existsSync(path.join(PUBLIC, rel))) {
    console.error(`FAIL  missing image: ${rel}`);
    missing += 1;
    failures += 1;
  }
}
console.log(`Images referenced: ${referenced.size}, missing: ${missing}`);

// --- 2. Orphaned shotgun images (extracted but unused) ---
const shotgunDir = path.join(PUBLIC, 'images', 'products', 'shotgun');
const onDisk = fs.readdirSync(shotgunDir).filter((f) => f.endsWith('.webp'));
const orphans = onDisk.filter(
  (f) => !referenced.has(`/images/products/shotgun/${f}`)
);
console.log(`Shotgun images on disk: ${onDisk.length}, unreferenced: ${orphans.length}`);
if (orphans.length) console.log('  ' + orphans.join('\n  '));

// --- 3. Slug + SEO uniqueness across the whole catalogue ---
const precision = [...readFile('lib/capapie-products.ts').matchAll(/slug: "([^"]+)"/g)].map(
  (m) => m[1]
);
const shotgunSrc = readFile('lib/shotgun-products.ts');
const shotgunSlugs = [
  ...[...shotgunSrc.matchAll(/^\s{4}slug: '([^']+)'/gm)].map((m) => m[1]),
  ...vestNumbers.map((n) => `capapie-capivest-${n}`),
];

const allSlugs = [...precision, ...shotgunSlugs];
const dupes = allSlugs.filter((s, i) => allSlugs.indexOf(s) !== i);
check(dupes.length === 0, `duplicate product slugs: ${dupes.join(', ')}`);
console.log(`Slugs: ${allSlugs.length} total (${precision.length} precision, ${shotgunSlugs.length} shotgun), duplicates: ${dupes.length}`);

const seoTitles = [...shotgunSrc.matchAll(/seo_title: '([^']+)'/g)].map((m) => m[1]);
const dupeTitles = seoTitles.filter((t, i) => seoTitles.indexOf(t) !== i);
check(dupeTitles.length === 0, `duplicate SEO titles: ${dupeTitles.join(' | ')}`);

const seoDescs = [...shotgunSrc.matchAll(/seo_description:\s*\n?\s*'([^']+)'/g)].map((m) => m[1]);
const dupeDescs = seoDescs.filter((d, i) => seoDescs.indexOf(d) !== i);
check(dupeDescs.length === 0, `duplicate SEO descriptions: ${dupeDescs.length}`);
console.log(`Shotgun SEO titles: ${seoTitles.length} (dupes ${dupeTitles.length}), descriptions: ${seoDescs.length} (dupes ${dupeDescs.length})`);

// --- 4. Sitemap contains the new routes ---
const sitemapPath = path.join(ROOT, '.next', 'server', 'app', 'sitemap.xml.body');
if (fs.existsSync(sitemapPath)) {
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  check(urls.some((u) => u.endsWith('/shop/shotgun')), 'sitemap missing /shop/shotgun');
  const catCount = urls.filter((u) => /\/shop\/shotgun\/[a-z-]+$/.test(u)).length;
  check(catCount === 7, `sitemap shotgun categories: expected 7, got ${catCount}`);
  const productCount = shotgunSlugs.filter((s) =>
    urls.some((u) => u.endsWith(`/shop/${s}`))
  ).length;
  check(
    productCount === shotgunSlugs.length,
    `sitemap shotgun products: expected ${shotgunSlugs.length}, got ${productCount}`
  );
  console.log(`Sitemap: ${urls.length} URLs (${catCount} shotgun categories, ${productCount} shotgun products)`);
} else {
  console.log('Sitemap: not found in .next (run pnpm build first)');
}

console.log(failures === 0 ? '\nQC PASSED' : `\nQC FAILED (${failures} problems)`);
process.exit(failures === 0 ? 0 : 1);
