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

// Image filenames will be normalized and validated later via batch process
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
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reset state when src changes
    const effectiveSrc = src?.trim() || FALLBACK_IMAGE;
    
    if (!src || src.trim() === '' || src === FALLBACK_IMAGE) {
      setImageSrc(FALLBACK_IMAGE);
      setHasError(false);
      return;
    }

    // Validate image exists before rendering
    const img = new window.Image();
    let isMounted = true;

    img.onerror = () => {
      if (isMounted) {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`[Dev] Image not found: ${effectiveSrc}`);
        }
        setImageSrc(FALLBACK_IMAGE);
        setHasError(true);
      }
    };

    img.onload = () => {
      if (isMounted) {
        setImageSrc(effectiveSrc);
        setHasError(false);
      }
    };

    img.src = effectiveSrc;

    return () => {
      isMounted = false;
    };
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
        unoptimized={hasError || finalSrc === FALLBACK_IMAGE}
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
      unoptimized={hasError || finalSrc === FALLBACK_IMAGE}
    />
  );
}
