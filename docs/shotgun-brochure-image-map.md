# Shotgun Brochure Image Map

Traceability for every image used in the Capapie Trap & Skeet (shotgun) section
back to its source in the brochure.

- **Source PDF:** `docs/source/capapie-trap-and-skeet-brochure.pdf` (28 pages, 842 × 595 pt landscape) — vendored so the extraction is reproducible
- **Extraction:** PyMuPDF (`scripts/extract-shotgun-brochure.py`)
- **Optimisation:** sharp → WebP (`scripts/process-shotgun-images.js`)
- **Output directory:** `public/images/products/shotgun/`
- **Result:** 59 images, 1.27 MB total

## Method

Every asset below was extracted with **Method 1 (native embedded raster)**. The
brochure stores each product photograph as a separate embedded JPEG rather than a
flattened page composite, so no page rendering, cropping or OCR was required and
no brochure text is baked into any product image.

Products were matched to images by cross-referencing the PDF text-block
coordinates (product headings) against the placed-image rectangles on each page.
The brochure uses a consistent layout:

- **Vest pages (9–14):** two products per page in a diagonal layout. Within each
  product cluster the **left image is the front view** and the **right image is the
  rear view**.
- **Inners page (16):** three products side by side; within each, the **left image
  is full sleeve** and the **right is half sleeve**.
- **Accessory/bag/blinder/sock pages (18–22):** one product per quadrant.
- **Casual wear pages (24–25):** two products per page in a diagonal layout.

Encoding: product cut-outs are re-encoded at their native source resolution
(no upscaling) at WebP quality 90. Full-bleed lifestyle photography is capped at
1600 px on the long edge at WebP quality 80.

### Page 27 — vest material table

Page 27 contains **no embedded images and no text layer**; the table is vector
artwork with the type converted to outlines. It was therefore rendered at 400 DPI,
read visually, and transcribed into structured data at `lib/vest-materials.ts`,
which drives the responsive `components/VestMaterialTable.tsx`. No screenshot of
the table is shipped to the website.

---

## Shooting vests

| Brochure Page | Product | Source Extraction | Output Image | Notes |
| --- | --- | --- | --- | --- |
| 9 | CAPIVEST 01 | native PDF image (xref 178) | `capapie-capivest-01-shotgun-vest-front.webp` | 302×536, front |
| 9 | CAPIVEST 01 | native PDF image (xref 193) | `capapie-capivest-01-shotgun-vest-back.webp` | 221×421, rear |
| 9 | CAPIVEST 02 | native PDF image (xref 197) | `capapie-capivest-02-shotgun-vest-front.webp` | 394×654, front |
| 9 | CAPIVEST 02 | native PDF image (xref 202) | `capapie-capivest-02-shotgun-vest-back.webp` | 241×435, rear |
| 10 | CAPIVEST 03 | native PDF image (xref 229) | `capapie-capivest-03-shotgun-vest-front.webp` | 352×645, front |
| 10 | CAPIVEST 03 | native PDF image (xref 234) | `capapie-capivest-03-shotgun-vest-back.webp` | 222×427, rear |
| 10 | CAPIVEST 05 | native PDF image (xref 239) | `capapie-capivest-05-shotgun-vest-front.webp` | 228×420, front |
| 10 | CAPIVEST 05 | native PDF image (xref 244) | `capapie-capivest-05-shotgun-vest-back.webp` | 272×525, rear |
| 11 | CAPIVEST 06 | native PDF image (xref 279) | `capapie-capivest-06-shotgun-vest-front.webp` | 229×423, front |
| 11 | CAPIVEST 06 | native PDF image (xref 284) | `capapie-capivest-06-shotgun-vest-back.webp` | 280×535, rear |
| 11 | CAPIVEST 07 | native PDF image (xref 289) | `capapie-capivest-07-shotgun-vest-front.webp` | 248×442, front |
| 11 | CAPIVEST 07 | native PDF image (xref 294) | `capapie-capivest-07-shotgun-vest-back.webp` | 268×501, rear |
| 12 | CAPIVEST 08 | native PDF image (xref 329) | `capapie-capivest-08-shotgun-vest-front.webp` | 239×426, front |
| 12 | CAPIVEST 08 | native PDF image (xref 334) | `capapie-capivest-08-shotgun-vest-back.webp` | 275×496, rear |
| 12 | CAPIVEST 09 | native PDF image (xref 339) | `capapie-capivest-09-shotgun-vest-front.webp` | 248×421, front |
| 12 | CAPIVEST 09 | native PDF image (xref 344) | `capapie-capivest-09-shotgun-vest-back.webp` | 256×516, rear |
| 13 | CAPIVEST 10 | native PDF image (xref 379) | `capapie-capivest-10-shotgun-vest-front.webp` | 245×420, front |
| 13 | CAPIVEST 10 | native PDF image (xref 384) | `capapie-capivest-10-shotgun-vest-back.webp` | 346×632, rear |
| 13 | CAPIVEST 12 | native PDF image (xref 390) | `capapie-capivest-12-shotgun-vest-front.webp` | 262×446, front |
| 13 | CAPIVEST 12 | native PDF image (xref 395) | `capapie-capivest-12-shotgun-vest-back.webp` | 276×522, rear |
| 14 | CAPIVEST 13 | native PDF image (xref 412) | `capapie-capivest-13-shotgun-vest-front.webp` | 247×436, front |
| 14 | CAPIVEST 13 | native PDF image (xref 417) | `capapie-capivest-13-shotgun-vest-back.webp` | 276×521, rear |
| 14 | CAPIVEST 14 | native PDF image (xref 422) | `capapie-capivest-14-shotgun-vest-front.webp` | 246×432, front |
| 14 | CAPIVEST 14 | native PDF image (xref 427) | `capapie-capivest-14-shotgun-vest-back.webp` | 219×420, rear |

## Inners

| Brochure Page | Product | Source Extraction | Output Image | Notes |
| --- | --- | --- | --- | --- |
| 16 | Capapie Capiflex Inner | native PDF image (xref 449) | `capapie-capiflex-inner-full-sleeve.webp` | 206×784, full sleeve |
| 16 | Capapie Capiflex Inner | native PDF image (xref 444) | `capapie-capiflex-inner-half-sleeve.webp` | 214×784, half sleeve |
| 16 | Capapie Capiflex+ Inner | native PDF image (xref 454) | `capapie-capiflex-plus-inner-full-sleeve.webp` | 248×724, full sleeve |
| 16 | Capapie Capiflex+ Inner | native PDF image (xref 459) | `capapie-capiflex-plus-inner-half-sleeve.webp` | 204×732, half sleeve |
| 16 | Capapie Pro Inner | native PDF image (xref 464) | `capapie-pro-inner-full-sleeve.webp` | 267×779, full sleeve |
| 16 | Capapie Pro Inner | native PDF image (xref 469) | `capapie-pro-inner-half-sleeve.webp` | 212×832, half sleeve |

> The "+" in CAPIFLEX⁺ is drawn as a superscript glyph that does not appear in the
> PDF text layer. The middle panel was confirmed as CAPIFLEX⁺ by rendering page 16
> and reading it visually; its copy ("thick Poly Spandex") also distinguishes it
> from the thin standard Capiflex.

## Accessories

| Brochure Page | Product | Source Extraction | Output Image | Notes |
| --- | --- | --- | --- | --- |
| 18 | Trap Hand Gloves | native PDF image (xref 544) | `capapie-trap-shooting-gloves.webp` | 168×246, primary |
| 18 | Trap Hand Gloves | native PDF image (xref 539) | `capapie-trap-shooting-gloves-detail.webp` | 191×241, grip-side detail |
| 18 | Baseball Cap | native PDF image (xref 483) | `capapie-baseball-cap.webp` | 295×264 |
| 18 | Capapie Cotton Ankle Socks | native PDF image (xref 549) | `capapie-cotton-ankle-socks.webp` | 281×275 |
| 18 | Trucker Cap | native PDF image (xref 488) | `capapie-trucker-cap.webp` | 309×258 |

## Bags & shell carriers

| Brochure Page | Product | Source Extraction | Output Image | Notes |
| --- | --- | --- | --- | --- |
| 19 | Capapie Ammo Bag | native PDF image (xref 561) | `capapie-ammo-bag.webp` | 326×343 |
| 19 | Capapie 4 Box Ammo Carrier | native PDF image (xref 571) | `capapie-4-box-ammo-carrier.webp` | 270×413; brochure title "4BOX CARRIER AMO" normalised |
| 19 | Capapie Single Box Holder Bag Premium | native PDF image (xref 556) | `capapie-single-box-holder-bag-premium.webp` | 320×252 |
| 19 | Capapie Ammo Box Holder Bag Pro | native PDF image (xref 566) | `capapie-ammo-box-holder-bag-pro.webp` | 286×279; "AMO" normalised to "Ammo" |
| 20 | Capapie Ammo Waist Pouch Premium | native PDF image (xref 635) | `capapie-ammo-waist-pouch-premium.webp` | 380×166; "AMO" normalised to "Ammo" |
| 20 | Capapie Roller Bag Pro | native PDF image (xref 603) | `capapie-roller-bag-pro.webp` | 315×754 |
| 20 | Capapie Pro Mesh Shell Pouch | native PDF image (xref 640) | `capapie-pro-mesh-shell-pouch.webp` | 174×385 |

## Blinders & towel

| Brochure Page | Product | Source Extraction | Output Image | Notes |
| --- | --- | --- | --- | --- |
| 21 | Capapie Target Side Blinder | native PDF image (xref 717) | `capapie-target-side-blinder.webp` | 215×278 |
| 21 | Capapie Logo Side Blinder | native PDF image (xref 707) | `capapie-logo-side-blinder.webp` | 254×160 |
| 21 | Capapie Triangle Side Blinder | native PDF image (xref 712) | `capapie-triangle-side-blinder.webp` | 280×241 |
| 21 | Capapie Hand Towel | native PDF image (xref 651) | `capapie-hand-towel.webp` | 330×215 |

## Shotgun socks & gun covers

| Brochure Page | Product | Source Extraction | Output Image | Notes |
| --- | --- | --- | --- | --- |
| 22 | Capapie Trap Shotgun Socks — Country Wise | native PDF image (xref 727) | `capapie-trap-shotgun-socks-country-wise.webp` | 357×122 |
| 22 | Capapie Shotgun Socks | native PDF image (xref 732) | `capapie-shotgun-socks.webp` | 372×134 |
| 22 | Capapie Skeet Shotgun Socks Pro | native PDF image (xref 737) | `capapie-skeet-shotgun-socks-pro.webp` | 358×148 |
| 22 | Capapie Trap Shotgun Socks Pro | native PDF image (xref 742) | `capapie-trap-shotgun-socks-pro.webp` | 372×127 |

## Casual wear

| Brochure Page | Product | Source Extraction | Output Image | Notes |
| --- | --- | --- | --- | --- |
| 24 | Capapie Pure Aim Tee | native PDF image (xref 783) | `capapie-pure-aim-tee.webp` | 372×441 |
| 24 | Capapie Precision Navy Polo | native PDF image (xref 788) | `capapie-precision-navy-polo.webp` | 361×443 |
| 25 | Capapie Tactical Breeze Shirt | native PDF image (xref 813) | `capapie-tactical-breeze-shirt.webp` | 339×427 |
| 25 | Capapie Arctic Guardian Jacket | native PDF image (xref 818) | `capapie-arctic-guardian-jacket.webp` | 359×538 |

## Lifestyle / editorial imagery

| Brochure Page | Use | Source Extraction | Output Image | Notes |
| --- | --- | --- | --- | --- |
| 8 | Shotgun landing hero; `/shop` discipline card | native PDF image (xref 149) | `shotgun-trap-skeet-hero.webp` | 1521×1075, shooter from behind |
| 15 | Inners category hero | native PDF image (xref 136) | `shotgun-inners-lifestyle.webp` | 1081×1600 (capped), inner garment lifestyle |
| 17 | Accessories category hero | native PDF image (xref 473) | `shotgun-accessories-lifestyle.webp` | 1531×1075, Trap gloves lifestyle |
| 23 | Casual Wear category hero | native PDF image (xref 746) | `shotgun-casual-wear-lifestyle.webp` | 1520×1075, casual-wear lifestyle |
| 26 | Made-to-measure section; vests category hero; homepage discipline card | native PDF image (xref 822) | `shotgun-competition-shooters.webp` | 1520×1075, two competitive shooters |

---

## Reproducing

Requires `pip install pymupdf` (Python 3.9+); `sharp` is already a project
dependency.

```bash
python scripts/extract-shotgun-brochure.py   # native raster extraction -> brochure-extract/
node scripts/process-shotgun-images.js       # WebP optimisation -> public/images/products/shotgun/
node scripts/qc-shotgun.js                   # verifies every referenced image resolves
```

`brochure-extract/` is gitignored — it is a regenerable intermediate. Only the
optimised WebP output in `public/images/products/shotgun/` is committed.

Inspection helpers used to build the product↔image mapping above:

```bash
python scripts/pdf-audit.py                  # per-page images (xref, size, placement) + text
python scripts/pdf-layout.py 9 26            # text-block and image rectangles for product pages
python scripts/pdf-render-page.py 27         # render a page to PNG (page 27 has no text layer)
```
