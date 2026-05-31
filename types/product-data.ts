// Product data structure scraped from capapiesports.com
export interface ProductColorOption {
  label: string;
  values: string[];
}

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
  product_code: string;
  slug: string;
  name: string;
  category: string;
  short_description: string;
  long_description: string;
  features: string[];
  colors: ProductColorOption[];
  sizing: string;
  image_path: string; // Resolved path to primary image
  images: string[]; // Resolved paths to all gallery images
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
  phone: string;
  notes?: string;
  items: EnquiryItem[];
}
