// Product data structure matching Excel file format
export interface CapapieProduct {
  product_code: string;
  product_name: string;
  category: string;
  short_description: string;
  long_description: string; // Always present (empty string if not in Excel)
  image_filename: string;
  product_link?: string; // Optional external link to official Capapie product page
}

// Extended product type for UI (without pricing)
export interface DisplayProduct {
  product_code: string;
  name: string;
  category: string;
  short_description: string;
  long_description: string; // Defaults to empty string if not provided
  image_path: string; // Resolved path: /images/products/{image_filename}
  product_link?: string; // Optional external link to official Capapie product page
}

