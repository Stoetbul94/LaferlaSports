'use client';

import { DisplayProduct } from '@/types/product-data';
import { useCartStore } from '@/lib/cart-store';
import { useState } from 'react';

interface AddToCartButtonProps {
  product: DisplayProduct;
  className?: string;
}

export default function AddToCartButton({ product, className = '' }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      className={`btn btn-primary w-full ${className} ${
        added ? 'bg-green-600 hover:bg-green-700' : ''
      }`}
    >
      {added ? 'Added to Quote Request' : 'Add to Quote Request'}
    </button>
  );
}
