# Data Directory

This directory contains source data files for the application.

## Capapie.xlsx

The Excel file containing product data. This file is the authoritative source for all product information.

### Required Columns:
- `product_code` - Unique identifier (required)
- `product_name` - Product name (required)
- `category` - Product category
- `short_description` - Brief description
- `long_description` - Full detailed description
- `image_filename` - Image filename (must exist in `/public/images/products/`)

### Generating Product Data

To generate `lib/capapie-products.ts` from the Excel file:

1. **Install dependencies** (first time only):
   ```bash
   npm install xlsx
   ```

2. **Run the generation script**:
   ```bash
   node scripts/generate-capapie-products.js
   ```

This script will:
- Read `data/Capapie.xlsx`
- Generate `lib/capapie-products.ts` with all products
- Preserve all text exactly as provided
- Check for missing image files
- Overwrite the existing TypeScript file

### Notes:
- Text is preserved EXACTLY as provided in Excel
- No pricing information is included
- Product codes must be unique
- Image filenames must match files in `/public/images/products/`
- Run this script whenever the Excel file is updated
