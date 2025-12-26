'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface SafeProductImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

// Image filenames will be normalized later via batch process
const FALLBACK_IMAGE = '/images/products/placeholder.png';

export default function SafeProductImage({
  src,
  alt,
  fill = false,
  className = '',
  sizes,
  priority = false,
}: SafeProductImageProps) {
  const [imageSrc, setImageSrc] = useState<string>(src || FALLBACK_IMAGE);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    const effectiveSrc = src || FALLBACK_IMAGE;
    
    if (!src || src === FALLBACK_IMAGE) {
      setImageSrc(FALLBACK_IMAGE);
      setIsFallback(true);
      return;
    }

    // Pre-validate image exists
    const img = new window.Image();
    img.onerror = () => {
      setImageSrc(FALLBACK_IMAGE);
      setIsFallback(true);
    };
    img.onload = () => {
      setImageSrc(effectiveSrc);
      setIsFallback(false);
    };
    img.src = effectiveSrc;
  }, [src]);

  const finalSrc = imageSrc || FALLBACK_IMAGE;

  if (fill) {
    return (
      <Image
        src={finalSrc}
        alt={alt}
        fill
        className={className}
        sizes={sizes}
        priority={priority}
        unoptimized={isFallback}
      />
    );
  }

  return (
    <Image
      src={finalSrc}
      alt={alt}
      fill={fill}
      className={className}
      sizes={sizes}
      priority={priority}
      unoptimized={isFallback}
    />
  );
}
