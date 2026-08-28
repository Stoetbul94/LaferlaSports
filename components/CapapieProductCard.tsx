import Link from 'next/link';
import { DisplayProduct } from '@/types/product-data';
import SafeProductImage from './SafeProductImage';

interface CapapieProductCardProps {
  product: DisplayProduct;
  /** Set on the first row of a grid so the LCP image is not lazy-loaded. */
  priority?: boolean;
}

export default function CapapieProductCard({ product, priority = false }: CapapieProductCardProps) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block bg-dark-lighter border border-dark-border rounded-lg overflow-hidden hover:border-accent transition-all duration-200 shadow-xl hover:shadow-2xl hover:shadow-accent/10 cursor-pointer"
    >
      <div className="aspect-square relative bg-white overflow-hidden">
        <SafeProductImage
          src={product.image_path || '/images/products/placeholder.png'}
          alt={product.image_alt || product.name}
          fill
          priority={priority}
          className="object-contain group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.made_to_measure && (
          <span className="absolute left-3 top-3 rounded bg-accent/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            Made to Measure
          </span>
        )}
      </div>

      <div className="p-6">
        <div className="text-xs uppercase tracking-wider text-accent mb-2 font-semibold">{product.category}</div>
        <h3 className="font-bold text-text-primary mb-3 group-hover:text-accent transition-colors line-clamp-2 text-lg">
          {product.name}
        </h3>
        <p className="text-sm text-text-secondary mb-4 line-clamp-2 leading-relaxed">
          {product.short_description}
        </p>
        <div className="pt-4 border-t border-dark-border">
          <span className="text-xs text-text-muted uppercase tracking-wide">
            {product.product_code ? `Code: ${product.product_code}` : 'Request a quote'}
          </span>
        </div>
      </div>
    </Link>
  );
}
