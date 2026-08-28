"""
Renders brochure pages to PNG for visual verification.

Needed for page 27 (the vest material table), which contains no embedded images
and no text layer - it is vector artwork with the type converted to outlines, so
it had to be rendered and transcribed by eye into lib/vest-materials.ts.

Usage:
  python scripts/pdf-render-page.py 27            # single page at 300 DPI
  python scripts/pdf-render-page.py 9 16 22 --dpi 110
"""

import argparse
import os
import pymupdf

from brochure import BROCHURE_PDF

parser = argparse.ArgumentParser()
parser.add_argument("pages", nargs="+", type=int, help="1-based page numbers")
parser.add_argument("--dpi", type=int, default=300)
parser.add_argument("--out", default="brochure-check")
args = parser.parse_args()

os.makedirs(args.out, exist_ok=True)
doc = pymupdf.open(BROCHURE_PDF)

for pno in args.pages:
    pix = doc[pno - 1].get_pixmap(dpi=args.dpi)
    path = os.path.join(args.out, f"page-{pno:02d}.png")
    pix.save(path)
    print(f"{path}  {pix.width}x{pix.height}")
