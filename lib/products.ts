import { Product, ISSFDiscipline, Category } from '@/types';

// ISSF Discipline Categories
export const categories: Category[] = [
  {
    id: 'pistol',
    name: 'Pistol',
    description: 'Competition pistols and accessories for ISSF pistol disciplines',
    slug: 'pistol',
  },
  {
    id: 'rifle',
    name: 'Rifle',
    description: 'Precision rifles and equipment for ISSF rifle disciplines',
    slug: 'rifle',
  },
  {
    id: 'shotgun',
    name: 'Shotgun',
    description: 'Shotguns and accessories for ISSF shotgun disciplines',
    slug: 'shotgun',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Essential accessories for competitive shooting',
    slug: 'accessories',
  },
  {
    id: 'apparel',
    name: 'Apparel',
    description: 'Professional shooting apparel and gear',
    slug: 'apparel',
  },
  {
    id: 'ammunition',
    name: 'Ammunition',
    description: 'Competition-grade ammunition',
    slug: 'ammunition',
  },
];

// Sample product data - In production, this would come from a CMS or database
export const products: Product[] = [
  {
    id: 'capapie-pistol-01',
    name: 'Capapie Competition Pistol 10m Air',
    slug: 'capapie-competition-pistol-10m-air',
    description: 'Professional-grade 10m air pistol designed for ISSF competition standards.',
    longDescription: `The Capapie Competition Pistol 10m Air represents the pinnacle of precision engineering for ISSF 10m Air Pistol events. This competition-grade pistol features advanced ergonomics, adjustable grip, and precision barrel technology that meets all ISSF regulations.

Designed in collaboration with world-class shooters, this pistol offers exceptional accuracy and consistency. The adjustable trigger system allows for fine-tuning to individual preferences, while the advanced sighting system ensures optimal target acquisition.

Perfect for competitive shooters at all levels, from club competitions to international ISSF events.`,
    price: 12500,
    currency: 'ZAR',
    category: 'pistol',
    subcategory: 'Air Pistol',
    brand: 'Capapie',
    images: [
      '/images/products/capapie-pistol-01-1.jpg',
      '/images/products/capapie-pistol-01-2.jpg',
      '/images/products/capapie-pistol-01-3.jpg',
    ],
    specifications: [
      { label: 'Caliber', value: '4.5mm (.177)' },
      { label: 'Weight', value: '1,050g (max per ISSF rules)' },
      { label: 'Barrel Length', value: '260mm' },
      { label: 'Overall Length', value: '420mm' },
      { label: 'Trigger', value: 'Adjustable, 1,000g minimum' },
      { label: 'Sights', value: 'Adjustable front and rear' },
      { label: 'Grip', value: 'Adjustable ergonomic grip' },
      { label: 'Power Source', value: 'CO2 or Compressed Air' },
    ],
    isssCompliant: true,
    isssNotes: 'Fully compliant with ISSF Rule 8.4.1.1 for 10m Air Pistol events. Approved for all ISSF competitions.',
    inStock: true,
    sku: 'CAP-PIST-10M-001',
    featured: true,
  },
  {
    id: 'capapie-rifle-01',
    name: 'Capapie Precision Rifle 10m Air',
    slug: 'capapie-precision-rifle-10m-air',
    description: 'Competition-grade 10m air rifle engineered for ISSF precision shooting.',
    longDescription: `The Capapie Precision Rifle 10m Air is engineered to meet the exacting standards of ISSF 10m Air Rifle competition. This rifle combines advanced barrel technology with precision stock design to deliver exceptional accuracy and consistency.

Features include an adjustable cheek piece, butt plate, and hand stop for perfect fit and stability. The match-grade barrel and advanced trigger system ensure consistent performance shot after shot.

Ideal for competitive shooters competing in ISSF 10m Air Rifle events, from local club matches to World Championships.`,
    price: 18900,
    currency: 'ZAR',
    category: 'rifle',
    subcategory: 'Air Rifle',
    brand: 'Capapie',
    images: [
      '/images/products/capapie-rifle-01-1.jpg',
      '/images/products/capapie-rifle-01-2.jpg',
    ],
    specifications: [
      { label: 'Caliber', value: '4.5mm (.177)' },
      { label: 'Weight', value: '5,500g (max per ISSF rules)' },
      { label: 'Barrel Length', value: '650mm' },
      { label: 'Overall Length', value: '1,100mm' },
      { label: 'Trigger', value: 'Adjustable, 500g minimum' },
      { label: 'Sights', value: 'Diopter rear, globe front' },
      { label: 'Stock', value: 'Adjustable competition stock' },
      { label: 'Power Source', value: 'Compressed Air' },
    ],
    isssCompliant: true,
    isssNotes: 'Fully compliant with ISSF Rule 8.4.2.1 for 10m Air Rifle events. Approved for all ISSF competitions.',
    inStock: true,
    sku: 'CAP-RIF-10M-001',
    featured: true,
  },
  {
    id: 'capapie-jacket-01',
    name: 'Capapie Competition Shooting Jacket',
    slug: 'capapie-competition-shooting-jacket',
    description: 'ISSF-approved competition shooting jacket with advanced support technology.',
    longDescription: `The Capapie Competition Shooting Jacket is designed to meet ISSF regulations while providing maximum support and comfort during competition. This professional-grade jacket features advanced padding and support systems that enhance stability without compromising mobility.

Constructed from high-quality materials with breathable panels, this jacket ensures comfort during extended competition periods. The adjustable fit system allows for precise customization to individual body measurements.

ISSF-approved for all pistol and rifle disciplines, this jacket is essential equipment for serious competitive shooters.`,
    price: 3200,
    currency: 'ZAR',
    category: 'apparel',
    subcategory: 'Jackets',
    brand: 'Capapie',
    images: [
      '/images/products/capapie-jacket-01-1.jpg',
      '/images/products/capapie-jacket-01-2.jpg',
    ],
    specifications: [
      { label: 'Material', value: 'High-density padding with breathable panels' },
      { label: 'ISSF Compliance', value: 'Rule 6.7.1 compliant' },
      { label: 'Sizes', value: 'XS to XXL' },
      { label: 'Support Level', value: 'Maximum (adjustable)' },
      { label: 'Weight', value: '1,200g' },
      { label: 'Color', value: 'Black' },
    ],
    isssCompliant: true,
    isssNotes: 'Fully compliant with ISSF Rule 6.7.1 for shooting jackets. Approved for all ISSF competitions.',
    inStock: true,
    sku: 'CAP-APP-JKT-001',
  },
  {
    id: 'capapie-gloves-01',
    name: 'Capapie Competition Shooting Gloves',
    slug: 'capapie-competition-shooting-gloves',
    description: 'Professional shooting gloves with enhanced grip and support.',
    price: 450,
    currency: 'ZAR',
    category: 'apparel',
    subcategory: 'Gloves',
    brand: 'Capapie',
    images: ['/images/products/capapie-gloves-01-1.jpg'],
    specifications: [
      { label: 'Material', value: 'Leather with reinforced palm' },
      { label: 'Sizes', value: 'S, M, L, XL' },
      { label: 'Grip Enhancement', value: 'Textured palm surface' },
    ],
    isssCompliant: true,
    inStock: true,
    sku: 'CAP-APP-GLV-001',
  },
  {
    id: 'capapie-sights-01',
    name: 'Capapie Precision Diopter Sight Set',
    slug: 'capapie-precision-diopter-sight-set',
    description: 'High-precision diopter sight system for competition rifles.',
    price: 1800,
    currency: 'ZAR',
    category: 'accessories',
    subcategory: 'Sights',
    brand: 'Capapie',
    images: ['/images/products/capapie-sights-01-1.jpg'],
    specifications: [
      { label: 'Type', value: 'Diopter rear sight with globe front' },
      { label: 'Adjustment', value: 'Precision click adjustments' },
      { label: 'Compatibility', value: 'Standard 11mm dovetail' },
    ],
    isssCompliant: true,
    inStock: true,
    sku: 'CAP-ACC-SGT-001',
  },
];

// Helper functions
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ISSFDiscipline): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getAllProducts(): Product[] {
  return products;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

