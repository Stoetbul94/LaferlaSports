'use client';

import { useState } from 'react';
import SafeProductImage from './SafeProductImage';

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export default function ProductGallery({ images, alt }: ProductGalleryProps) {
  const gallery = images.length > 0 ? images : ['/images/products/placeholder.png'];
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="aspect-square relative bg-white border border-dark-border rounded-lg overflow-hidden">
        <SafeProductImage
          src={gallery[active]}
          alt={alt}
          fill
          className="object-contain"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {gallery.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {gallery.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              className={`aspect-square relative bg-white border rounded-lg overflow-hidden transition-colors ${
                i === active ? 'border-accent' : 'border-dark-border hover:border-accent/50'
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <SafeProductImage
                src={src}
                alt={`${alt} thumbnail ${i + 1}`}
                fill
                className="object-contain"
                sizes="120px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
