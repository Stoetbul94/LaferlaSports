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
      className="group block bg-white border border-primary-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200"
    >
      <div className="aspect-square relative bg-primary-50 overflow-hidden">
        <Image
          src={product.images[0] || '/images/placeholder.svg'}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-200"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.isssCompliant && (
          <div className="absolute top-2 right-2 bg-accent text-white text-xs font-semibold px-2 py-1 rounded">
            ISSF
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="text-sm text-primary-500 mb-1">{product.brand}</div>
        <h3 className="font-semibold text-primary-900 mb-2 group-hover:text-accent transition-colors line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-primary-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary-900">
            R {product.price.toLocaleString()}
          </span>
          <span className="text-xs text-primary-500">SKU: {product.sku}</span>
        </div>
      </div>
    </Link>
  );
}

