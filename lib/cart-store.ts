'use client';

import { create } from 'zustand';
import { DisplayProduct, EnquiryItem } from '@/types/product-data';

interface EnquiryStore {
  items: EnquiryItem[];
  addItem: (product: DisplayProduct, quantity?: number) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}

// Each entry stores a full product snapshot, so a saved list goes stale whenever
// the catalogue changes — dead image paths, renamed products, discontinued items.
// That snapshot is also what gets emailed to the owner, so serving stale data is
// worse than losing an in-progress list. Bump this key whenever the product data
// changes shape or product assets are renamed.
const STORAGE_KEY = 'laferla-enquiry-v2';
const LEGACY_STORAGE_KEYS = ['laferla-enquiry'];

const loadFromStorage = (): EnquiryItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    for (const key of LEGACY_STORAGE_KEYS) localStorage.removeItem(key);

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is EnquiryItem =>
        !!item?.product?.slug && typeof item.quantity === 'number' && item.quantity > 0
    );
  } catch (error) {
    console.error('Error loading enquiry list from storage:', error);
  }
  return [];
};

const saveToStorage = (items: EnquiryItem[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Error saving enquiry list to storage:', error);
  }
};

export const useCartStore = create<EnquiryStore>()((set, get) => ({
  items: loadFromStorage(),

  addItem: (product: DisplayProduct, quantity = 1) => {
    const items = get().items;
    const existing = items.find((item) => item.product.slug === product.slug);

    const newItems = existing
      ? items.map((item) =>
          item.product.slug === product.slug
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      : [...items, { product, quantity }];

    set({ items: newItems });
    saveToStorage(newItems);
  },

  removeItem: (slug: string) => {
    const newItems = get().items.filter((item) => item.product.slug !== slug);
    set({ items: newItems });
    saveToStorage(newItems);
  },

  updateQuantity: (slug: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeItem(slug);
      return;
    }
    const newItems = get().items.map((item) =>
      item.product.slug === slug ? { ...item, quantity } : item
    );
    set({ items: newItems });
    saveToStorage(newItems);
  },

  clearCart: () => {
    set({ items: [] });
    saveToStorage([]);
  },

  getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
}));
