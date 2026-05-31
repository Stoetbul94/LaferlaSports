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

const STORAGE_KEY = 'laferla-enquiry';

const loadFromStorage = (): EnquiryItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
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
