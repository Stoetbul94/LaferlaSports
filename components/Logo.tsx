'use client';

import Image from 'next/image';
import { useState } from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeMap = {
  sm: 'h-12 w-12',
  md: 'h-16 w-16',
  lg: 'h-32 w-32',
  xl: 'h-48 w-48',
};

export default function Logo({ size = 'md', className = '' }: LogoProps) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return null; // Return nothing if image fails to load
  }

  return (
    <div className={`relative ${sizeMap[size]} flex-shrink-0 ${className}`}>
      <Image
        src="/images/logo.png"
        alt="Laferla Sports Logo"
        fill
        className="object-contain drop-shadow-lg"
        onError={() => setImageError(true)}
        sizes="(max-width: 640px) 64px, 128px"
        priority={size === 'lg' || size === 'xl'}
      />
    </div>
  );
}

