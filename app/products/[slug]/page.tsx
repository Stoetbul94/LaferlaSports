import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getProductBySlug, getAllProducts } from '@/lib/products';
import AddToCartButton from '@/components/AddToCartButton';
import Link from 'next/link';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: 'Product Not Found' };
  
  return {
    title: `${product.name} - Laferla Sports`,
    description: product.description,
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="section-padding bg-white">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-primary-600">
          <Link href="/shop" className="hover:text-primary-900">Shop</Link>
          <span className="mx-2">/</span>
          <Link href={`/shop/${product.category}`} className="hover:text-primary-900 capitalize">
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-primary-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="aspect-square relative bg-primary-50 rounded-lg overflow-hidden mb-4">
              <Image
                src={product.images[0] || '/images/placeholder.svg'}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.slice(1, 5).map((image, index) => (
                  <div key={index} className="aspect-square relative bg-primary-50 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <span className="text-sm text-primary-500">{product.brand}</span>
              {product.isssCompliant && (
                <span className="ml-3 bg-accent text-white text-xs font-semibold px-2 py-1 rounded">
                  ISSF Compliant
                </span>
              )}
            </div>
            
            <h1 className="heading-2 mb-4">{product.name}</h1>
            
            <div className="mb-6">
              <div className="text-4xl font-bold text-primary-900 mb-2">
                R {product.price.toLocaleString()}
              </div>
              <div className="text-sm text-primary-600">
                SKU: {product.sku} | {product.inStock ? 'In Stock' : 'Out of Stock'}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-body">{product.description}</p>
            </div>

            {product.longDescription && (
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Description</h3>
                <p className="text-primary-700 whitespace-pre-line">{product.longDescription}</p>
              </div>
            )}

            {/* Specifications */}
            {product.specifications.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-3">Specifications</h3>
                <dl className="grid grid-cols-2 gap-3">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="border-b border-primary-200 pb-2">
                      <dt className="text-sm text-primary-600">{spec.label}</dt>
                      <dd className="font-medium text-primary-900">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* ISSF Notes */}
            {product.isssNotes && (
              <div className="mb-6 p-4 bg-primary-50 rounded-lg border-l-4 border-accent">
                <h3 className="font-semibold text-lg mb-2">ISSF Compliance</h3>
                <p className="text-sm text-primary-700">{product.isssNotes}</p>
              </div>
            )}

            {/* Add to Cart */}
            <div className="mb-6">
              <AddToCartButton product={product} />
            </div>

            {/* Additional Info */}
            <div className="text-sm text-primary-600 space-y-2">
              <p>✓ Official Capapie Authorized Dealer</p>
              <p>✓ ISSF Competition Compliant</p>
              <p>✓ Professional Support Available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

