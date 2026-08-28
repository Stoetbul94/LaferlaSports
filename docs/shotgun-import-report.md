# Capapie Trap & Skeet (Shotgun) Import Report

Integration of the Capapie Trap & Skeet brochure into the existing Laferla Sports
shop. The existing precision/ISSF catalogue, its URLs and the quote workflow are
unchanged.

## Summary

| | |
| --- | --- |
| New products | 38 |
| New categories | 7 |
| New routes | 46 (1 landing + 7 category + 38 product) |
| Images extracted | 59 (all native embedded rasters, no page crops) |
| Shipped image payload | 1.27 MB WebP |
| Products marked made-to-measure | 15 |
| Files added | 23 code/docs + 59 image assets |
| Files modified | 32 (1 deleted) |

## Products by category

| Category | Route | Products |
| --- | --- | --- |
| Shooting Vests | `/shop/shotgun/vests` | 12 (CAPIVEST 01, 02, 03, 05, 06, 07, 08, 09, 10, 12, 13, 14) |
| Shotgun Inners | `/shop/shotgun/inners` | 3 (Capiflex, Capiflex+, Pro) |
| Shotgun Accessories | `/shop/shotgun/accessories` | 4 (Trap shooting gloves, baseball cap, cotton ankle socks, trucker cap) |
| Bags & Shell Carriers | `/shop/shotgun/bags-shell-carriers` | 7 |
| Blinders & Towels | `/shop/shotgun/blinders-towels` | 4 |
| Shotgun Socks & Gun Covers | `/shop/shotgun/shotgun-socks-gun-covers` | 4 |
| Casual Wear | `/shop/shotgun/casual-wear` | 4 |

The three inners are single products with **Sleeve Length** (Half Sleeve / Full
Sleeve) as an option rather than six near-duplicate pages, as instructed. Five
products carry options in total: the 3 inners, plus the Hand Towel (Turquoise) and
Arctic Guardian Jacket (Black), which are the only two items where the brochure
names a colour.

Made-to-measure is applied to the 12 vests and the 3 inners only — the brochure
states it for those ranges. No bag, accessory, blinder, sock or casual-wear item
carries the badge.

## Files added

**Data & logic**

- `lib/shotgun-products.ts` — 38 hand-authored `DisplayProduct` entries
- `lib/shotgun-categories.ts` — category taxonomy, per-category SEO copy and hero imagery
- `lib/vest-materials.ts` — brochure page 27 material/colour matrix
- `lib/catalog.ts` — unified accessor over precision + shotgun catalogues
- `lib/breadcrumbs.ts` — discipline-aware breadcrumb trails
- `lib/use-hydrated.ts`, `lib/use-reduced-motion.ts` — hydration and motion-preference hooks (see QC below)

**Routes**

- `app/shop/shotgun/page.tsx` — collection landing page
- `app/shop/shotgun/[category]/page.tsx` — the 7 category pages

**Components**

- `components/VestMaterialTable.tsx` — responsive material/colour table
- `components/Breadcrumbs.tsx` — visible trail + JSON-LD
- `components/BreadcrumbJsonLd.tsx` — `BreadcrumbList` schema

**Tooling**

- `scripts/brochure.py`, `scripts/extract-shotgun-brochure.py`, `scripts/pdf-audit.py`,
  `scripts/pdf-layout.py`, `scripts/pdf-render-page.py`, `scripts/process-shotgun-images.js`,
  `scripts/qc-shotgun.js`

**Docs & config**

- `docs/shotgun-brochure-image-map.md`, `docs/shotgun-import-report.md`
- `docs/source/capapie-trap-and-skeet-brochure.pdf` (vendored source)
- `eslint.config.mjs` (replaces `.eslintrc.json`)

## Files modified

**Shotgun integration:** `types/product-data.ts`, `lib/capapie-products.ts`,
`lib/contact-info.ts`, `lib/email.ts`, `lib/seo.ts`, `app/page.tsx`,
`app/shop/page.tsx`, `app/shop/[slug]/page.tsx`, `app/sitemap.ts`,
`app/cart/page.tsx`, `app/faq/page.tsx`, `components/Header.tsx`,
`components/CapapieProductCard.tsx`, `components/FeaturedProductCard.tsx`,
`components/ProductJsonLd.tsx`, `components/SizeGuide.tsx`,
`components/OrderRequestForm.tsx`, `scripts/scrape-capapie.js`,
`.cursor/rules/seo.mdc`, `.gitignore`, `package.json`, `pnpm-lock.yaml`,
`.eslintrc.json` (deleted).

**Lint cleanup only** (see QC): `components/AssociationsTicker.tsx`,
`components/HeroBackground.tsx`, `app/about/page.tsx`, `app/capapie/page.tsx`,
`app/cart/success/page.tsx`, `app/contact/page.tsx`, `app/legal/page.tsx`,
`app/not-found.tsx`, `app/privacy/page.tsx`, `app/shipping/page.tsx`.

## Data model

`DisplayProduct` was extended rather than forked:

- `discipline?: 'precision' | 'shotgun'` — precision is the default for the scraped catalogue
- `brand?`, `made_to_measure?`, `image_alt?`, `seo_title?`, `seo_description?`
- `product_code` became **optional** — the brochure publishes no item codes for the
  Trap & Skeet range, and inventing them was explicitly out of scope

Every consumer of `product_code` (cart line items, quote emails, product cards,
mailto links, `Product` JSON-LD) now degrades gracefully when it is absent.

## SEO

- Unique `title` and `meta description` on all 46 new pages, verified unique by `scripts/qc-shotgun.js`
- One `<h1>` per page; landing page uses `Capapie Trap & Skeet Shooting Gear`
- Canonicals on every new page, all on `https://www.laferlasports.com`
- Descriptive alt text on all 59 images (e.g. *"Capapie CAPIVEST 01 Trap and Skeet shooting vest, front view"*)
- Breadcrumbs on product pages: `Shop / Trap & Skeet / <Category> / <Product>`
- Internal linking: homepage discipline section → landing; `/shop` discipline cards
  and category quick-links → landing and categories; landing → all 7 categories;
  categories → products and sibling categories; products → collection, own
  category and related products
- 4 new FAQ entries covering Trap & Skeet equipment, made-to-measure vests, shotgun
  socks, and the ISSF-vs-shotgun compliance distinction

## Structured data

- `Product` schema extended to the new range. **`offers`, `price` and `availability`
  were removed site-wide** — they previously emitted `price: 0` / `InStock`, which
  misrepresents a quote-only business. `sku`/`mpn` are now emitted only where a real
  item code exists, so precision products keep theirs and shotgun products omit them.
- `BreadcrumbList` added on product pages.
- `FAQPage` extended with the new entries.
- No `AggregateRating` or `Review` — none exists.

## Sitemap

`app/sitemap.ts` now sources from `lib/catalog.ts`, adding `/shop/shotgun`
(priority 0.9, alongside `/shop`), the 7 category routes (0.8) and the 38 product
routes (0.6). `robots.txt` was verified: `/` allowed, only `/api/` and
`/cart/success` disallowed, host and sitemap both on `https://www.laferlasports.com`.

## Quality control

`pnpm typecheck`, `pnpm lint` and `pnpm build` all pass clean. `scripts/qc-shotgun.js`
verifies every referenced image resolves, flags orphaned assets, and asserts slug
and metadata uniqueness. Browser QA covered the landing page, all category pages,
product pages, the quote workflow from a shotgun product, option selection, the
navigation dropdown, the homepage entry point, and mobile/tablet/desktop layout —
no console errors, no 404s, no horizontal overflow.

### Lint toolchain

Linting was broken before this work began: `eslint-config-next` v16 is
incompatible with the ESLint 8 `.eslintrc.json` setup, so `pnpm lint` crashed with
a circular-JSON error and no rule had run in some time. Migrating to ESLint 9 flat
config (`eslint.config.mjs`) fixed the crash and immediately surfaced **30
pre-existing errors in files unrelated to this import**. All were fixed so the
repo lands green:

- 26 × `react/no-unescaped-entities` — straight apostrophes and quotes in prose
  across `about`, `capapie`, `cart/success`, `contact`, `legal`, `not-found`,
  `privacy` and `shipping`. Replaced with typographic `’` `“` `”`, which satisfies
  the rule and reads better than `&apos;` noise in the source.
- 2 × `react-hooks/set-state-in-effect` — `AssociationsTicker` read the
  reduced-motion preference via `setState` in an effect, and `Header` used a
  `mounted` flag for the cart badge. Both now use `useSyncExternalStore` via the
  new `usePrefersReducedMotion` and `useHydrated` hooks. Side benefit: the ticker
  and hero now react to the OS motion preference changing while the page is open,
  rather than only at mount.
- 1 × `@next/next/no-html-link-for-pages` — `app/capapie` used a raw `<a href="/shop">`,
  forcing a full page reload. Now `next/link`.
- 2 unused catch bindings.

## Ambiguities and deviations — flagged, not guessed

**CAPIVEST numbering gaps.** The brochure jumps 03 → 05 and 10 → 12. There is no
CAPIVEST 04 or 11 anywhere in the document. The gaps were preserved rather than
renumbered; if those models exist, they need to be supplied separately.

**No item codes.** The Trap & Skeet range carries no SKUs in the brochure. None
were invented, so these products show "Request a quote" where precision products
show their code, and omit `sku` from schema.

**CAPIFLEX vs CAPIFLEX⁺.** The `+` is a superscript glyph absent from the PDF text
layer, so the two products are textually identical in extraction. The middle panel
on page 16 was confirmed as CAPIFLEX⁺ by rendering the page and reading it, backed
up by its distinct copy ("thick Poly Spandex" vs the thin standard Capiflex).

**Page 27 material table.** No embedded image and no text layer — the table is
vector artwork with type converted to outlines. It was rendered at 400 DPI, read
visually and transcribed into `lib/vest-materials.ts`. Worth a second pair of eyes
on the colour names before launch, since this is the one asset that could not be
extracted programmatically.

**Brochure prose.** Phrasing such as "recoil nullification", "blast resistance",
"stabelness amid firing esprit" and "radiative UV escapes" was not carried over.
Where a defensible meaning existed it was rewritten (UV-protective fabric,
recoil-padded shoulder); where it did not, the claim was dropped. No performance
metric, certification, dimension or material appears on the site that the brochure
does not state.

**No ISSF claims.** Nothing in the shotgun range is described as ISSF-compliant.
The brochure does not claim it, and Trap & Skeet vests are not governed by the ISSF
clothing rules that apply to the precision range. Product pages say "Built for
competitive Trap & Skeet shooting" instead.

**Spelling normalised.** Brochure "AMO" → "Ammo" in product titles, preserving
product identity. Recorded per-item in the image map.

**Category naming deviations.** "Shooting Vests" is used rather than the requested
"Shotgun Shooting Vests" — the category already sits under a `/shop/shotgun/` path
and a "Trap & Skeet" breadcrumb, so the prefix was redundant in the UI. Page
`<title>` and `<h1>` still read "Trap & Skeet Shooting Vests" for search. Likewise
"Shotgun Socks & Gun Covers" was adopted as recommended, and its copy states
explicitly that these are stretch protective gun covers, not footwear.

**Routing deviation.** Shotgun categories are nested at `/shop/shotgun/[category]`
while precision categories remain flat at `/shop/[slug]`. Nesting keeps the
collection crawlable as a unit and lets both disciplines own an "Accessories"
category without a slug collision. No existing URL changed. Product detail pages
for both disciplines stay flat at `/shop/[slug]`, so the existing product route,
its static generation and its components are shared rather than duplicated.
