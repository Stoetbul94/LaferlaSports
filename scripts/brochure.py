"""Shared config for the Capapie Trap & Skeet brochure tooling."""

import os

BROCHURE_PDF = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "docs",
    "source",
    "capapie-trap-and-skeet-brochure.pdf",
)
