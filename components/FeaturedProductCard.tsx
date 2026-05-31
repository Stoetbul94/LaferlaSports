import Link from 'next/link';
import { DisplayProduct } from '@/types/product-data';
import SafeProductImage from './SafeProductImage';

interface FeaturedProductCardProps {
  product: DisplayProduct;
}

export default function FeaturedProductCard({ product }: FeaturedProductCardProps) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group relative block bg-dark-lighter border border-dark-border rounded-lg overflow-hidden transition-all duration-500 cursor-pointer"
      style={{
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
      }}
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div 
          className="absolute inset-0 rounded-lg"
          style={{
            background: 'radial-gradient(circle at center, rgba(177, 18, 23, 0.15) 0%, transparent 70%)',
            boxShadow: '0 0 40px rgba(177, 18, 23, 0.3)',
          }}
        />
      </div>

      {/* Image Container */}
      <div className="aspect-square relative bg-white overflow-hidden">
        <SafeProductImage
          src={product.image_path || '/images/products/placeholder.png'}
          alt={product.name}
          fill
          className="object-contain transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Subtle overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      {/* Content */}
      <div className="p-6 relative z-10">
        <div className="text-xs uppercase tracking-wider text-accent mb-2 font-semibold">
          {product.category}
        </div>
        <h3 className="font-bold text-text-primary mb-3 group-hover:text-accent transition-colors duration-300 line-clamp-2 text-lg">
          {product.name}
        </h3>
        <p className="text-sm text-text-secondary mb-4 line-clamp-2 leading-relaxed">
          {product.short_description}
        </p>
        
        {/* Bottom section with animated underline */}
        <div className="pt-4 border-t border-dark-border">
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-muted uppercase tracking-wide">
              Code: {product.product_code}
            </span>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-x-[-8px] group-hover:translate-x-0 transition-all duration-300">
              <span className="text-xs text-accent uppercase tracking-wide font-semibold">
                View Details
              </span>
              <svg
                className="w-4 h-4 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Border accent on hover */}
      <div 
        className="absolute inset-0 border-2 border-accent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 20px rgba(177, 18, 23, 0.2)',
        }}
      />
    </Link>
  );
}

