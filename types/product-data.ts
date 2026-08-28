// Product data structure scraped from capapiesports.com
export interface ProductColorOption {
  label: string;
  values: string[];
}

/**
 * Competitive shooting discipline a product belongs to.
 * 'precision' covers the existing ISSF air/target rifle range (scraped catalogue);
 * 'shotgun' covers the Capapie Trap & Skeet range.
 */
export type Discipline = 'precision' | 'shotgun';

export interface CapapieProduct {
  product_code: string; // Capapie "Item Code" (displayed as SKU). Not unique across variants.
  slug: string; // Unique URL key used for routing.
  product_name: string;
  category: string;
  short_description: string;
  long_description: string;
  features: string[];
  colors: ProductColorOption[];
  sizing: string;
  image_filename: string; // Primary image filename in /public/images/products
  images: string[]; // All gallery image filenames
  product_link?: string; // Official Capapie product page
}

// UI-facing product type (no pricing - quote-based model)
export interface DisplayProduct {
  /** Capapie "Item Code". Absent for ranges the manufacturer publishes without codes. */
  product_code?: string;
  slug: string;
  name: string;
  category: string;
  /** Defaults to 'precision' for the scraped ISSF catalogue. */
  discipline?: Discipline;
  brand?: string;
  /** True only where the brochure/manufacturer states made-to-measure is offered. */
  made_to_measure?: boolean;
  short_description: string;
  long_description: string;
  features: string[];
  colors: ProductColorOption[];
  sizing: string;
  image_path: string; // Resolved path to primary image
  images: string[]; // Resolved paths to all gallery images
  /** Descriptive alt text for the primary image. Falls back to the product name. */
  image_alt?: string;
  seo_title?: string;
  seo_description?: string;
  product_link?: string;
}

// An item in the quote/enquiry list
export interface EnquiryItem {
  product: DisplayProduct;
  quantity: number;
}

// Quote request payload submitted to the API / emailed to the owner
export interface QuoteRequest {
  customerName: string;
  email: string;
  notes?: string;
  items: EnquiryItem[];
}
