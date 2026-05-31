# Capapie Products Data

Product data lives in `lib/capapie-products.ts` and is **auto-generated** by the
scraper `scripts/scrape-capapie.js` from the official site `capapiesports.com`.

## Regenerating

```bash
pnpm scrape-products   # or: node scripts/scrape-capapie.js
```

This will:

- Crawl every Capapie category (paginated) for product URLs
- Parse name, **Item Code (SKU)**, features, colour/sizing options, gallery images
- Download all gallery images into `public/images/products/` (named `<slug>_<n>.<ext>`)
- Regenerate `lib/capapie-products.ts` and write a snapshot to `data/capapie-scrape.json`

It is idempotent and skips re-downloading images that already exist. Re-run it
whenever Capapie adds or updates products.

## Schema

See `types/product-data.ts` (`CapapieProduct` / `DisplayProduct`). Key points:

- `product_code` is the Capapie Item Code shown as SKU. It is **not unique**
  (rifle/pistol variants reuse codes), so routing uses the unique `slug`.
- `colors` / `sizing` are best-effort parsed from free text and may need manual
  tidy-up for a few products.

## Routes

- `/shop` — all products + category grid
- `/shop/<slug>` — individual product (slug, not code)
- `/shop/<category-slug>` — category listing

The dynamic handler resolves slug → product first, then → category.

## Pricing

There are **no prices**. The site is quote-based: products have an "Add to Quote
Request" button that emails the owner via `/api/orders` (`lib/email.ts`).
