# Capapie Products Data Setup

## Overview

Product data is loaded from `lib/capapie-products.ts`. This file contains an array of products that should be populated from `app/products/Capapie.xlsx`.

## Excel File Structure

The Excel file (`Capapie.xlsx`) should have the following columns:
- `product_code` - Unique identifier (e.g., "CAP001")
- `product_name` - Product name (e.g., "Competition Jacket")
- `category` - Product category (e.g., "Apparel")
- `short_description` - Brief description
- `long_description` - Full detailed description
- `image_filename` - Image filename (e.g., "jacket.jpg")

## Converting Excel to TypeScript

### Option 1: Manual Conversion

1. Open `app/products/Capapie.xlsx`
2. Open `lib/capapie-products.ts`
3. For each row in the Excel file, add an object to the `capapieProductsData` array:

```typescript
{
  product_code: 'CAP001',
  product_name: 'Competition Jacket',
  category: 'Apparel',
  short_description: 'Professional competition jacket...',
  long_description: 'Full detailed description here...',
  image_filename: 'jacket.jpg',
},
```

**Important:**
- Copy descriptions EXACTLY as they appear in Excel
- Do NOT modify or rewrite descriptions
- Do NOT add pricing information
- Image filenames must match files in `public/images/products/`

### Option 2: Use Conversion Script (Requires xlsx package)

1. Install xlsx package:
   ```bash
   npm install xlsx
   ```

2. Run the conversion script:
   ```bash
   node scripts/convert-excel-to-json.js
   ```

3. Copy the generated JSON data to `lib/capapie-products.ts`

## Image Files

Product images must be placed in:
```
public/images/products/{image_filename}
```

The `image_filename` from Excel will be automatically resolved to:
```
/images/products/{image_filename}
```

## Route Structure

- `/shop` - All products listing
- `/shop/{product_code}` - Individual product page
- `/shop/{category}` - Category listing page

The route handler automatically determines if the slug is a product_code or category.

## Example Data Entry

```typescript
export const capapieProductsData: CapapieProduct[] = [
  {
    product_code: 'CAP001',
    product_name: 'Competition Shooting Jacket',
    category: 'Apparel',
    short_description: 'Professional ISSF-compliant competition jacket with advanced support system.',
    long_description: 'This competition jacket features...',
    image_filename: 'jacket.jpg',
  },
  // ... more products
];
```

