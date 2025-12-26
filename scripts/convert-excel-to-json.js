/**
 * Script to convert Capapie.xlsx to JSON format
 * 
 * To use this script:
 * 1. Install dependencies: npm install xlsx
 * 2. Move Capapie.xlsx to the scripts folder or update the path
 * 3. Run: node scripts/convert-excel-to-json.js
 * 4. Copy the output JSON to lib/capapie-products.ts
 */

const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const excelPath = path.join(__dirname, '../app/products/Capapie.xlsx');
const outputPath = path.join(__dirname, '../data/capapie-products.json');

try {
  // Read Excel file
  const workbook = XLSX.readFile(excelPath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  
  // Convert to JSON
  const products = XLSX.utils.sheet_to_json(worksheet);
  
  // Ensure output directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Write JSON file
  fs.writeFileSync(outputPath, JSON.stringify(products, null, 2), 'utf-8');
  
  console.log(`✅ Converted ${products.length} products from Excel to JSON`);
  console.log(`📁 Output: ${outputPath}`);
  console.log('\nNext steps:');
  console.log('1. Review the JSON file');
  console.log('2. Copy the data to lib/capapie-products.ts as capapieProductsData array');
  
} catch (error) {
  console.error('❌ Error converting Excel file:', error.message);
  console.log('\nAlternative: Manually copy Excel data to lib/capapie-products.ts');
  console.log('Expected format:');
  console.log(`
export const capapieProductsData: CapapieProduct[] = [
  {
    product_code: 'CODE001',
    product_name: 'Product Name',
    category: 'Category',
    short_description: 'Short desc',
    long_description: 'Long desc',
    image_filename: 'image.jpg',
  },
  // ... more products
];`);
}

