/**
 * Scrapes the full Capapie catalogue (capapiesports.com) and:
 *  - downloads every product's gallery images into public/images/products/
 *  - generates lib/capapie-products.ts (extended schema: features, colors, sizing, gallery)
 *  - writes a raw snapshot to data/capapie-scrape.json for debugging / diffing
 *
 * The site is plain server-rendered HTML, so no headless browser is needed.
 *
 * Usage:  node scripts/scrape-capapie.js
 *
 * Re-run any time Capapie adds products. It is idempotent: images are
 * overwritten, the generated .ts is fully regenerated.
 */

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const BASE = 'https://capapiesports.com';
const PAGE_SIZE = 6;

// Capapie category slug -> clean display category used on the Laferla site.
const CATEGORIES = {
  'jacket-trouser': 'Jackets & Trousers',
  gloves: 'Gloves',
  inners: 'Inners',
  shoes: 'Shoes',
  accessories: 'Accessories',
  bags: 'Bags',
};

const IMAGES_DIR = path.join(__dirname, '../public/images/products');
const OUT_TS = path.join(__dirname, '../lib/capapie-products.ts');
const OUT_JSON = path.join(__dirname, '../data/capapie-scrape.json');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getHtml(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36',
    },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res.text();
}

function absolute(url) {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return BASE + (url.startsWith('/') ? '' : '/') + url.replace(/^\/+/, '');
}

// Collect every product_details URL for a category, walking pagination.
async function collectCategoryProducts(catSlug) {
  const found = new Map(); // url -> { url, primaryImage }
  let offset = 0;

  while (true) {
    const url = offset === 0 ? `${BASE}/products/${catSlug}` : `${BASE}/products/${catSlug}/${offset}`;
    let html;
    try {
      html = await getHtml(url);
    } catch (e) {
      break;
    }
    const $ = cheerio.load(html);

    const before = found.size;
    $('a[href*="product_details/"]').each((_, a) => {
      const href = absolute($(a).attr('href'));
      if (!href.includes('/product_details/')) return;
      // primary image sits inside or near the card
      const img =
        $(a).find('img').attr('src') ||
        $(a).closest('div').find('img').attr('src') ||
        '';
      if (!found.has(href)) {
        found.set(href, { url: href, primaryImage: absolute(img) });
      }
    });

    const added = found.size - before;
    // Stop when a page yields no new products (end of pagination).
    if (added === 0) break;
    offset += PAGE_SIZE;
    await sleep(250);
    if (offset > 600) break; // hard safety
  }

  return [...found.values()];
}

const ENTITIES = {
  '&nbsp;': ' ', '&amp;': '&', '&quot;': '"', '&apos;': "'", '&#39;': "'",
  '&lt;': '<', '&gt;': '>', '&rsquo;': "'", '&lsquo;': "'", '&ldquo;': '"',
  '&rdquo;': '"', '&ndash;': '\u2013', '&mdash;': '\u2014', '&reg;': '\u00ae',
  '&trade;': '\u2122', '&deg;': '\u00b0', '&hellip;': '\u2026',
};

function decodeEntities(s) {
  return (s || '')
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&[a-z]+\d*;/gi, (m) => (ENTITIES[m] !== undefined ? ENTITIES[m] : m));
}

function cleanText(s) {
  return decodeEntities(s || '')
    .replace(/\u00a0/g, ' ')
    .replace(/\r/g, '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .join('\n')
    .trim();
}

function slugFromUrl(url) {
  const m = url.match(/product_details\/([^/]+)\/([^/?#]+)/);
  return m ? { slug: m[1], hash: m[2] } : { slug: '', hash: '' };
}

function parseProduct(html, meta) {
  const $ = cheerio.load(html);

  const product_name = cleanText($('h2.product_name').first().text()) || cleanText($('h2.desktop_title').first().text());
  const { slug, hash } = slugFromUrl(meta.url);

  const codeRaw = $('span.item_code').first().text();
  const codeMatch = codeRaw.match(/(\d+)/);
  const product_code = codeMatch ? codeMatch[1] : '';

  // Description / feature blocks. Convert <br> to newlines first.
  const detailBlocks = [];
  $('.product_details_text').each((_, el) => {
    const inner = $(el).html() || '';
    const text = cleanText(
      inner
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/(p|div|li)>/gi, '\n')
        .replace(/<[^>]+>/g, '')
    );
    if (text) detailBlocks.push(text);
  });
  const long_description = detailBlocks.join('\n\n');

  // Numbered feature lines across all detail blocks.
  const features = long_description
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => /^\d+\s*[.)]/.test(l))
    .map((l) => l.replace(/^\d+\s*[.)]\s*/, '').trim())
    .filter(Boolean);

  // Colors + sizing live in free text; cut off the "OTHER PRODUCTS" tail.
  let bodyText = cleanText($('body').text());
  const cut = bodyText.search(/OTHER PRODUCTS/i);
  if (cut > -1) bodyText = bodyText.slice(0, cut);

  const colors = [];
  bodyText.split('\n').forEach((line) => {
    const m = line.match(/^(.*?colou?r)\s*:\s*(.+)$/i);
    if (m) {
      const values = m[2]
        .split(/[|,/]/)
        .map((v) => v.trim())
        .filter(Boolean);
      if (values.length) colors.push({ label: m[1].trim(), values });
    }
  });

  let sizing = '';
  const sizeLine = bodyText
    .split('\n')
    .find((l) => /(AVAILABLE IN|MADE TO MEASURE|STANDARD SIZES|JTFP)/i.test(l));
  if (sizeLine) sizing = sizeLine.trim();

  // Gallery images: the drift_trigger imgs are the product's OWN gallery.
  const gallery = [];
  $('img.drift_trigger').each((_, img) => {
    const src = absolute($(img).attr('src') || $(img).attr('data-zoom'));
    if (src && !gallery.includes(src)) gallery.push(src);
  });
  if (gallery.length === 0 && meta.primaryImage) gallery.push(meta.primaryImage);

  // short description: first feature, else first sentence of description.
  const short_description =
    features[0] ||
    (long_description.split('\n')[0] || '').slice(0, 240);

  return {
    product_code,
    slug,
    hash,
    product_name,
    category: meta.category,
    short_description,
    long_description,
    features,
    colors,
    sizing,
    images: gallery,
    product_link: meta.url,
  };
}

function extFromUrl(url) {
  const m = url.split('?')[0].match(/\.([a-z0-9]{2,5})$/i);
  return m ? m[1].toLowerCase() : 'png';
}

async function downloadImage(url, destPath) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
  });
  if (!res.ok) throw new Error(`${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(destPath, buf);
}

function tsEscape(value) {
  return JSON.stringify(value == null ? '' : value);
}

function generateTs(products) {
  const items = products
    .map((p) => {
      const colorsTs = JSON.stringify(p.colors);
      const featuresTs = JSON.stringify(p.features);
      const imagesTs = JSON.stringify(p.images);
      return `  {
    product_code: ${tsEscape(p.product_code)},
    slug: ${tsEscape(p.slug)},
    product_name: ${tsEscape(p.product_name)},
    category: ${tsEscape(p.category)},
    short_description: ${tsEscape(p.short_description)},
    long_description: ${tsEscape(p.long_description)},
    features: ${featuresTs},
    colors: ${colorsTs},
    sizing: ${tsEscape(p.sizing)},
    image_filename: ${tsEscape(p.image_filename)},
    images: ${imagesTs},
    product_link: ${tsEscape(p.product_link)},
  }`;
    })
    .join(',\n');

  return `import { CapapieProduct, DisplayProduct } from '@/types/product-data';

// Auto-generated from capapiesports.com by scripts/scrape-capapie.js
// DO NOT EDIT MANUALLY - run \`node scripts/scrape-capapie.js\` to regenerate.

export const capapieProductsData: CapapieProduct[] = [
${items}
];

function toDisplayProduct(product: CapapieProduct): DisplayProduct {
  const images = (product.images && product.images.length > 0
    ? product.images
    : [product.image_filename]
  ).map((f) => (f.startsWith('/') ? f : \`/images/products/\${f}\`));

  return {
    product_code: product.product_code,
    slug: product.slug,
    name: product.product_name,
    category: product.category,
    short_description: product.short_description,
    long_description: product.long_description || '',
    features: product.features || [],
    colors: product.colors || [],
    sizing: product.sizing || '',
    image_path: images[0] || '/images/products/placeholder.png',
    images,
    product_link: product.product_link,
  };
}

export function getAllCapapieProducts(): DisplayProduct[] {
  return capapieProductsData.map(toDisplayProduct);
}

export function getCapapieProductByCode(product_code: string): DisplayProduct | undefined {
  const product = capapieProductsData.find((p) => p.product_code === product_code);
  return product ? toDisplayProduct(product) : undefined;
}

export function getCapapieProductBySlug(slug: string): DisplayProduct | undefined {
  const product = capapieProductsData.find((p) => p.slug === slug);
  return product ? toDisplayProduct(product) : undefined;
}

export function getCapapieProductsByCategory(category: string): DisplayProduct[] {
  return capapieProductsData
    .filter((p) => p.category.toLowerCase() === category.toLowerCase())
    .map(toDisplayProduct);
}

export function getCapapieCategories(): string[] {
  const categories = new Set(capapieProductsData.map((p) => p.category));
  return Array.from(categories).sort();
}

export function getFeaturedCapapieProducts(): DisplayProduct[] {
  const featuredCodes = ['1015', '1005', '1017', '1079'];
  const all = getAllCapapieProducts();
  const featured = all.filter((p) => featuredCodes.includes(p.product_code));
  // Fall back to first 4 products if the curated codes are missing.
  return (featured.length >= 4 ? featured : all).slice(0, 4);
}
`;
}

async function main() {
  if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });

  console.log('Collecting product URLs per category...');
  const productMetas = [];
  for (const [slug, display] of Object.entries(CATEGORIES)) {
    const list = await collectCategoryProducts(slug);
    console.log(`  ${display}: ${list.length} products`);
    list.forEach((p) => productMetas.push({ ...p, category: display }));
  }

  // Dedupe by URL (a product can appear in multiple lists).
  const byUrl = new Map();
  productMetas.forEach((m) => {
    if (!byUrl.has(m.url)) byUrl.set(m.url, m);
  });
  const metas = [...byUrl.values()];
  console.log(`\nTotal unique products: ${metas.length}\n`);

  const products = [];
  for (const meta of metas) {
    try {
      const html = await getHtml(meta.url);
      const product = parseProduct(html, meta);
      if (!product.product_code) {
        console.warn(`  ! no item code: ${meta.url}`);
        continue;
      }
      console.log(`  [${product.product_code}] ${product.product_name} (${product.images.length} imgs)`);
      products.push(product);
      await sleep(250);
    } catch (e) {
      console.warn(`  ! failed ${meta.url}: ${e.message}`);
    }
  }

  // Guarantee unique slugs (route + image keys). Append code on collision.
  const seenSlugs = new Set();
  products.forEach((p) => {
    let s = p.slug || p.product_code;
    if (seenSlugs.has(s)) s = `${s}-${p.product_code}`;
    let n = 2;
    while (seenSlugs.has(s)) s = `${p.slug}-${n++}`;
    seenSlugs.add(s);
    p.slug = s;
  });

  // Download images with clean deterministic names (keyed by unique slug).
  console.log('\nDownloading images...');
  for (const p of products) {
    const localImages = [];
    for (let i = 0; i < p.images.length; i++) {
      const url = p.images[i];
      const ext = extFromUrl(url);
      const filename = `${p.slug}_${i + 1}.${ext}`;
      const dest = path.join(IMAGES_DIR, filename);
      if (fs.existsSync(dest)) {
        localImages.push(filename);
        continue;
      }
      try {
        await downloadImage(url, dest);
        localImages.push(filename);
      } catch (e) {
        console.warn(`  ! image ${url}: ${e.message}`);
      }
      await sleep(80);
    }
    p.images = localImages;
    p.image_filename = localImages[0] || 'placeholder.png';
  }

  // Sort: category, then code.
  products.sort((a, b) =>
    a.category === b.category
      ? a.product_code.localeCompare(b.product_code)
      : a.category.localeCompare(b.category)
  );

  fs.writeFileSync(OUT_JSON, JSON.stringify(products, null, 2), 'utf-8');
  fs.writeFileSync(OUT_TS, generateTs(products), 'utf-8');

  console.log(`\nDone. ${products.length} products written.`);
  console.log(`  -> ${OUT_TS}`);
  console.log(`  -> ${OUT_JSON}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
