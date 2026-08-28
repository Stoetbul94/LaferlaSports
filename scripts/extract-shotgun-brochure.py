"""
Extracts the native embedded product/lifestyle images from the Capapie
Trap & Skeet brochure into ./brochure-extract, named by product slug.

Every image below was located by cross-referencing the PDF text-block
coordinates with the placed-image rectangles on each page (see
docs/shotgun-brochure-image-map.md). All are native embedded rasters -
no page rendering or cropping was required.
"""

import os
import pymupdf

from brochure import BROCHURE_PDF as PDF

OUT = "brochure-extract"

# (page, xref, output base name)
ASSETS = [
    # --- Shooting vests: left image in each cluster is the front view ---
    (9, 178, "capapie-capivest-01-shotgun-vest-front"),
    (9, 193, "capapie-capivest-01-shotgun-vest-back"),
    (9, 197, "capapie-capivest-02-shotgun-vest-front"),
    (9, 202, "capapie-capivest-02-shotgun-vest-back"),
    (10, 229, "capapie-capivest-03-shotgun-vest-front"),
    (10, 234, "capapie-capivest-03-shotgun-vest-back"),
    (10, 239, "capapie-capivest-05-shotgun-vest-front"),
    (10, 244, "capapie-capivest-05-shotgun-vest-back"),
    (11, 279, "capapie-capivest-06-shotgun-vest-front"),
    (11, 284, "capapie-capivest-06-shotgun-vest-back"),
    (11, 289, "capapie-capivest-07-shotgun-vest-front"),
    (11, 294, "capapie-capivest-07-shotgun-vest-back"),
    (12, 329, "capapie-capivest-08-shotgun-vest-front"),
    (12, 334, "capapie-capivest-08-shotgun-vest-back"),
    (12, 339, "capapie-capivest-09-shotgun-vest-front"),
    (12, 344, "capapie-capivest-09-shotgun-vest-back"),
    (13, 379, "capapie-capivest-10-shotgun-vest-front"),
    (13, 384, "capapie-capivest-10-shotgun-vest-back"),
    (13, 390, "capapie-capivest-12-shotgun-vest-front"),
    (13, 395, "capapie-capivest-12-shotgun-vest-back"),
    (14, 412, "capapie-capivest-13-shotgun-vest-front"),
    (14, 417, "capapie-capivest-13-shotgun-vest-back"),
    (14, 422, "capapie-capivest-14-shotgun-vest-front"),
    (14, 427, "capapie-capivest-14-shotgun-vest-back"),
    # --- Inners: left image full sleeve, right image half sleeve ---
    (16, 449, "capapie-capiflex-inner-full-sleeve"),
    (16, 444, "capapie-capiflex-inner-half-sleeve"),
    (16, 454, "capapie-capiflex-plus-inner-full-sleeve"),
    (16, 459, "capapie-capiflex-plus-inner-half-sleeve"),
    (16, 464, "capapie-pro-inner-full-sleeve"),
    (16, 469, "capapie-pro-inner-half-sleeve"),
    # --- Accessories ---
    (18, 544, "capapie-trap-shooting-gloves"),
    (18, 539, "capapie-trap-shooting-gloves-detail"),
    (18, 483, "capapie-baseball-cap"),
    (18, 549, "capapie-cotton-ankle-socks"),
    (18, 488, "capapie-trucker-cap"),
    # --- Bags & shell carriers ---
    (19, 561, "capapie-ammo-bag"),
    (19, 571, "capapie-4-box-ammo-carrier"),
    (19, 556, "capapie-single-box-holder-bag-premium"),
    (19, 566, "capapie-ammo-box-holder-bag-pro"),
    (20, 635, "capapie-ammo-waist-pouch-premium"),
    (20, 603, "capapie-roller-bag-pro"),
    (20, 640, "capapie-pro-mesh-shell-pouch"),
    # --- Side blinders & hand towel ---
    (21, 717, "capapie-target-side-blinder"),
    (21, 707, "capapie-logo-side-blinder"),
    (21, 712, "capapie-triangle-side-blinder"),
    (21, 651, "capapie-hand-towel"),
    # --- Shotgun socks (protective gun covers) ---
    (22, 727, "capapie-trap-shotgun-socks-country-wise"),
    (22, 732, "capapie-shotgun-socks"),
    (22, 737, "capapie-skeet-shotgun-socks-pro"),
    (22, 742, "capapie-trap-shotgun-socks-pro"),
    # --- Casual wear ---
    (24, 783, "capapie-pure-aim-tee"),
    (24, 788, "capapie-precision-navy-polo"),
    (25, 813, "capapie-tactical-breeze-shirt"),
    (25, 818, "capapie-arctic-guardian-jacket"),
    # --- Lifestyle / editorial imagery ---
    (8, 149, "shotgun-trap-skeet-hero"),
    (15, 136, "shotgun-inners-lifestyle"),
    (17, 473, "shotgun-accessories-lifestyle"),
    (23, 746, "shotgun-casual-wear-lifestyle"),
    (26, 822, "shotgun-competition-shooters"),
]


def main():
    os.makedirs(OUT, exist_ok=True)
    doc = pymupdf.open(PDF)
    rows = []
    for page_no, xref, name in ASSETS:
        data = doc.extract_image(xref)
        ext = data["ext"]
        path = os.path.join(OUT, f"{name}.{ext}")
        with open(path, "wb") as fh:
            fh.write(data["image"])
        rows.append(f"{page_no}\t{xref}\t{data['width']}x{data['height']}\t{name}.{ext}")
        print(f"p{page_no:>2} xref={xref:<4} {data['width']:>5}x{data['height']:<5} -> {name}.{ext}")

    with open(os.path.join(OUT, "_manifest.tsv"), "w", encoding="utf-8") as fh:
        fh.write("page\txref\tsource_px\tfile\n")
        fh.write("\n".join(rows))
    print(f"\n{len(ASSETS)} images extracted natively (no rendering/cropping).")


if __name__ == "__main__":
    main()
