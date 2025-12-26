'use client';

import { Product } from '@/types';
import { useCartStore } from '@/lib/cart-store';
import { useState } from 'react';

interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

export default function AddToCartButton({ product, className = '' }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product.inStock) {
    return (
      <button
        disabled
        className={`btn btn-secondary w-full opacity-50 cursor-not-allowed ${className}`}
      >
        Out of Stock
      </button>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      className={`btn btn-primary w-full ${className} ${
        added ? 'bg-green-600 hover:bg-green-700' : ''
      }`}
    >
      {added ? '✓ Added to Enquiry Cart' : 'Add to Enquiry Cart'}
    </button>
  );
}


