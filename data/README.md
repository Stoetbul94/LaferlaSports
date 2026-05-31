# Data Directory

## capapie-scrape.json

Snapshot of the last Capapie scrape (raw parsed products, for debugging/diffing).
It is regenerated alongside `lib/capapie-products.ts` by:

```bash
pnpm scrape-products   # node scripts/scrape-capapie.js
```

The scraper pulls live data from `capapiesports.com` — there is no longer an
Excel source file. See `lib/README-CAPAPIE-PRODUCTS.md` for details.
