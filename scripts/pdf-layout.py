"""
Dumps text blocks and placed-image rectangles with coordinates for the brochure's
product pages. Matching a product heading's coordinates to the nearest image
rectangle is how each photo was assigned to a product.

Usage: python scripts/pdf-layout.py [firstPage] [lastPage] [out.txt]
"""

import sys
import pymupdf

from brochure import BROCHURE_PDF

first = int(sys.argv[1]) if len(sys.argv) > 1 else 9
last = int(sys.argv[2]) if len(sys.argv) > 2 else 26
out_path = sys.argv[3] if len(sys.argv) > 3 else "pdf-layout.txt"

doc = pymupdf.open(BROCHURE_PDF)
out = []
for pno in range(first, last + 1):
    page = doc[pno - 1]
    out.append(f"\n=== PAGE {pno} ===")
    out.append("-- TEXT BLOCKS --")
    for b in page.get_text("blocks"):
        x0, y0, x1, y1, txt = b[0], b[1], b[2], b[3], b[4]
        joined = " / ".join(s.strip() for s in txt.strip().split("\n") if s.strip())
        if joined:
            out.append(f"  ({x0:.0f},{y0:.0f})-({x1:.0f},{y1:.0f}): {joined[:300]}")
    out.append("-- IMAGES (in draw order) --")
    for x in page.get_images(full=True):
        xref = x[0]
        d = doc.extract_image(xref)
        for r in page.get_image_rects(xref):
            out.append(
                f"  xref={xref} {d['width']}x{d['height']}.{d['ext']} "
                f"@({r.x0:.0f},{r.y0:.0f})-({r.x1:.0f},{r.y1:.0f})"
            )

with open(out_path, "w", encoding="utf-8") as fh:
    fh.write("\n".join(out))
print(f"wrote {out_path}")
