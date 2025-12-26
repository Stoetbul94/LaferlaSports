import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block bg-dark-lighter border border-dark-border rounded-lg overflow-hidden hover:border-accent transition-all duration-200 shadow-xl hover:shadow-2xl hover:shadow-accent/10"
    >
      <div className="aspect-square relative bg-dark overflow-hidden">
        <Image
          src={product.images[0] || '/images/placeholder.svg'}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.isssCompliant && (
          <div className="absolute top-3 right-3 bg-accent text-white text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded">
            ISSF
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center backdrop-blur-sm">
            <span className="text-white font-bold uppercase tracking-wide">Out of Stock</span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="text-xs uppercase tracking-wider text-accent mb-2 font-semibold">{product.brand}</div>
        <h3 className="font-bold text-text-primary mb-3 group-hover:text-accent transition-colors line-clamp-2 text-lg">
          {product.name}
        </h3>
        <p className="text-sm text-text-secondary mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-dark-border">
          <span className="text-xl font-black text-text-primary">
            R {product.price.toLocaleString()}
          </span>
          <span className="text-xs text-text-muted uppercase tracking-wide">SKU: {product.sku}</span>
        </div>
      </div>
    </Link>
  );
}

