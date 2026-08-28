"""
Dumps every page of the brochure with its embedded images (xref, pixel size,
placed rectangle) and text. Used to build the product-to-image mapping in
docs/shotgun-brochure-image-map.md.

Usage: python scripts/pdf-audit.py [out.txt]
"""

import sys
import pymupdf

from brochure import BROCHURE_PDF

out_path = sys.argv[1] if len(sys.argv) > 1 else "pdf-audit.txt"

doc = pymupdf.open(BROCHURE_PDF)
out = [f"pages: {doc.page_count}"]
for i, page in enumerate(doc, start=1):
    out.append(f"\n--- PAGE {i} --- rect={page.rect}")
    for x in page.get_images(full=True):
        xref = x[0]
        try:
            d = doc.extract_image(xref)
        except Exception:
            out.append(f"  IMG {xref}: <unreadable>")
            continue
        for r in page.get_image_rects(xref):
            out.append(
                f"  IMG {xref}: {d['width']}x{d['height']}.{d['ext']} "
                f"@({r.x0:.0f},{r.y0:.0f})-({r.x1:.0f},{r.y1:.0f})"
            )
    text = page.get_text().strip().replace("\n", " | ")
    out.append("  TEXT: " + text[:2000])

with open(out_path, "w", encoding="utf-8") as fh:
    fh.write("\n".join(out))
print(f"wrote {out_path}")
