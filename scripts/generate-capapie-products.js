/**
 * Script to convert Capapie.xlsx to lib/capapie-products.ts
 * 
 * Usage:
 *   npm install xlsx (first time only)
 *   node scripts/generate-capapie-products.js
 * 
 * This script:
 * - Reads /data/Capapie.xlsx
 * - Generates lib/capapie-products.ts
 * - Preserves all text exactly as provided
 * - Maps image_filename to /public/images/products/
 */

const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const excelPath = path.join(__dirname, '../data/Capapie.xlsx');
const outputPath = path.join(__dirname, '../lib/capapie-products.ts');

try {
  // Check if Excel file exists
  if (!fs.existsSync(excelPath)) {
    console.error(`❌ Excel file not found: ${excelPath}`);
    console.log('\nPlease ensure Capapie.xlsx is located in the /data directory.');
    process.exit(1);
  }

  // Read Excel file
  console.log(`📖 Reading ${excelPath}...`);
  const workbook = XLSX.readFile(excelPath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  
  // Convert to JSON array
  const rows = XLSX.utils.sheet_to_json(worksheet, { raw: false }); // raw: false preserves text exactly
  
  if (rows.length === 0) {
    console.error('❌ No data found in Excel file');
    process.exit(1);
  }

  console.log(`✓ Found ${rows.length} products\n`);

  // Validate image files exist before processing
  const imagesPath = path.join(__dirname, '../public/images/products');
  if (!fs.existsSync(imagesPath)) {
    console.error(`❌ Error: Image directory does not exist: ${imagesPath}`);
    process.exit(1);
  }

  // Build a Set of available image filenames (case-sensitive exact match)
  const availableImages = new Set();
  const imageFiles = fs.readdirSync(imagesPath);
  imageFiles.forEach((file) => {
    if (fs.statSync(path.join(imagesPath, file)).isFile()) {
      availableImages.add(file); // Store exact filename (case-sensitive)
    }
  });

  console.log(`📁 Found ${availableImages.size} image files in products directory\n`);

  // Validate all image filenames before processing rows
  const missingImages = [];
  rows.forEach((row, index) => {
    // Extract image filename using the same logic as below
    const getField = (excelHeader) => {
      const normalizedTarget = excelHeader.toLowerCase().trim();
      const key = Object.keys(row).find(k => k.toLowerCase().trim() === normalizedTarget);
      return row[key] ? String(row[key]).trim() : '';
    };
    
    const image_filename = getField('Image filename');
    
    if (image_filename && !availableImages.has(image_filename)) {
      missingImages.push({
        row: index + 2, // +2 because index is 0-based and header is row 1
        filename: image_filename,
      });
    }
  });

  // Fail loudly if any images are missing
  if (missingImages.length > 0) {
    console.error('❌ VALIDATION FAILED: Missing image files\n');
    console.error('The following image filenames from Excel do not exist in /public/images/products:\n');
    missingImages.forEach(({ row, filename }) => {
      console.error(`  Row ${row}: ${filename}`);
    });
    console.error('\n⚠️  Ensure Excel image_filename matches the file name exactly (case-sensitive).');
    console.error('   Do NOT rename files on disk. Update the Excel file instead.\n');
    process.exit(1);
  }

  console.log('✓ All image files validated successfully\n');

  // Process each row
  const products = rows.map((row, index) => {
    // Extract fields with header mapping (case-insensitive, whitespace-trimmed matching)
    const getField = (excelHeader) => {
      // Normalize: trim and lowercase for comparison
      const normalizedTarget = excelHeader.toLowerCase().trim();
      const key = Object.keys(row).find(k => k.toLowerCase().trim() === normalizedTarget);
      return row[key] ? String(row[key]).trim() : '';
    };

    // Map Excel headers to internal field names
    // Excel headers: "Image filename " (with trailing space), "Product name", "Product code", "Category", "Short Description", "Product Link"
    const product_code = getField('Product code');
    const product_name = getField('Product name');
    const category = getField('Category');
    const short_description = getField('Short Description');
    const image_filename = getField('Image filename'); // Handles "Image filename " with trailing space
    const product_link = getField('Product Link'); // External link to official Capapie product page
    
    // long_description does not exist in Excel - set to empty string
    const long_description = '';

    // Validate required fields
    if (!product_code) {
      console.warn(`⚠️  Warning: Row ${index + 2} missing Product code, skipping...`);
      return null;
    }

    if (!product_name) {
      console.warn(`⚠️  Warning: Row ${index + 2} (${product_code}) missing Product name`);
    }

    if (!image_filename) {
      console.warn(`⚠️  Warning: Row ${index + 2} (${product_code}) missing Image filename`);
    }

    // Format product object
    const productLinkField = product_link ? `\n    product_link: ${JSON.stringify(product_link)},` : '';
    return `  {
    product_code: ${JSON.stringify(product_code)},
    product_name: ${JSON.stringify(product_name)},
    category: ${JSON.stringify(category)},
    short_description: ${JSON.stringify(short_description)},
    long_description: ${JSON.stringify(long_description)},
    image_filename: ${JSON.stringify(image_filename)},${productLinkField}
  }`;
  }).filter(Boolean); // Remove null entries

  // Generate TypeScript code
  const header = `import { CapapieProduct } from '@/types/product-data';
import { DisplayProduct } from '@/types/product-data';

// Auto-generated from data/Capapie.xlsx
// DO NOT EDIT MANUALLY - This file is overwritten by scripts/generate-capapie-products.js
// To update: Run \`npm run generate-products\` or \`node scripts/generate-capapie-products.js\`

export const capapieProductsData: CapapieProduct[] = [
`;

  const footer = `];

// Convert CapapieProduct to DisplayProduct
function toDisplayProduct(product: CapapieProduct): DisplayProduct {
  return {
    product_code: product.product_code,
    name: product.product_name,
    category: product.category,
    short_description: product.short_description,
    long_description: product.long_description || '', // Default to empty string if not provided
    image_path: \`/images/products/\${product.image_filename}\`,
    product_link: product.product_link, // Pass through optional external link
  };
}

// Get all products
export function getAllCapapieProducts(): DisplayProduct[] {
  return capapieProductsData.map(toDisplayProduct);
}

// Get product by product_code
export function getCapapieProductByCode(product_code: string): DisplayProduct | undefined {
  const product = capapieProductsData.find((p) => p.product_code === product_code);
  return product ? toDisplayProduct(product) : undefined;
}

// Get products by category
export function getCapapieProductsByCategory(category: string): DisplayProduct[] {
  return capapieProductsData
    .filter((p) => p.category.toLowerCase() === category.toLowerCase())
    .map(toDisplayProduct);
}

// Get all unique categories
export function getCapapieCategories(): string[] {
  const categories = new Set(capapieProductsData.map((p) => p.category));
  return Array.from(categories).sort();
}
`;

  // Combine everything
  const output = header + 
    products.join(',\n') + '\n' + 
    footer;

  // Ensure output directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write TypeScript file
  fs.writeFileSync(outputPath, output, 'utf-8');
  
  console.log(`✅ Successfully generated ${outputPath}`);
  console.log(`📊 Processed ${products.length} products`);
  console.log(`✓ All ${products.length} image files validated and matched\n`);
  console.log('✨ Done! The capapie-products.ts file has been updated.');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  console.error(error.stack);
  process.exit(1);
}

