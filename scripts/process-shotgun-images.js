/**
 * Converts the natively-extracted brochure images (./brochure-extract) into
 * optimised WebP under public/images/products/shotgun/.
 *
 * Product cut-outs are small native rasters, so they are re-encoded at their
 * source resolution (no upscaling) at a high quality setting. Full-bleed
 * lifestyle photography is capped and compressed more aggressively.
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SRC = path.join(__dirname, '..', 'brochure-extract');
const DEST = path.join(__dirname, '..', 'public', 'images', 'products', 'shotgun');

const LIFESTYLE_MAX = 1600;
const LIFESTYLE_QUALITY = 80;
const PRODUCT_QUALITY = 90;

async function main() {
  fs.mkdirSync(DEST, { recursive: true });

  const files = fs
    .readdirSync(SRC)
    .filter((f) => /\.(jpe?g|png)$/i.test(f))
    .sort();

  let total = 0;
  for (const file of files) {
    const base = file.replace(/\.[^.]+$/, '');
    const isLifestyle = base.startsWith('shotgun-');
    const out = path.join(DEST, `${base}.webp`);

    let pipeline = sharp(path.join(SRC, file)).rotate();
    if (isLifestyle) {
      pipeline = pipeline.resize({
        width: LIFESTYLE_MAX,
        height: LIFESTYLE_MAX,
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    const info = await pipeline
      .webp({ quality: isLifestyle ? LIFESTYLE_QUALITY : PRODUCT_QUALITY })
      .toFile(out);

    total += info.size;
    console.log(
      `${base}.webp  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`
    );
  }

  console.log(`\n${files.length} images -> ${(total / 1024 / 1024).toFixed(2)} MB total`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
