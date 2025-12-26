// Product and category types
export type ISSFDiscipline = 
  | 'pistol'
  | 'rifle'
  | 'shotgun'
  | 'accessories'
  | 'apparel'
  | 'ammunition';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  price: number;
  currency: string;
  category: ISSFDiscipline;
  subcategory?: string;
  brand: string;
  images: string[];
  specifications: ProductSpec[];
  isssCompliant: boolean;
  isssNotes?: string;
  inStock: boolean;
  sku: string;
  featured?: boolean;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderRequest {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  items: CartItem[];
  notes?: string;
}

export interface Category {
  id: ISSFDiscipline;
  name: string;
  description: string;
  slug: string;
}

