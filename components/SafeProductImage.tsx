'use client';

import Image from 'next/image';
import { useState } from 'react';

interface SafeProductImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

const FALLBACK_IMAGE = '/images/products/placeholder.png';

// Renders the image directly in the initial HTML (good for LCP + crawlers) and
// only swaps to the placeholder if the real asset 404s on the client.
export default function SafeProductImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className = '',
  sizes,
  priority = false,
}: SafeProductImageProps) {
  const [errored, setErrored] = useState(false);
  const finalSrc = errored || !src?.trim() ? FALLBACK_IMAGE : src;
  const isFallback = finalSrc === FALLBACK_IMAGE;

  return (
    <Image
      src={finalSrc}
      alt={alt}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={className}
      sizes={sizes}
      priority={priority}
      unoptimized={isFallback}
      onError={() => setErrored(true)}
    />
  );
}
