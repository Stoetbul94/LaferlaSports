import { getAllProducts, categories } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export const metadata = {
  title: 'Shop - Laferla Sports | ISSF Shooting Equipment',
  description: 'Browse our complete catalog of ISSF-compliant shooting sports equipment including pistols, rifles, shotguns, and accessories.',
};

export default function ShopPage() {
  const products = getAllProducts();

  return (
    <div className="section-padding bg-white">
      <div className="container-custom">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="heading-1 mb-4">Shop</h1>
          <p className="text-body max-w-3xl">
            Browse our complete selection of ISSF-compliant shooting sports equipment. 
            All products are authorized Capapie dealer items, verified for competition compliance.
          </p>
        </div>

        {/* Category Navigation */}
        <div className="mb-12">
          <h2 className="heading-3 mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => {
              const categoryProducts = products.filter((p) => p.category === category.id);
              return (
                <Link
                  key={category.id}
                  href={`/shop/${category.slug}`}
                  className="bg-primary-50 hover:bg-primary-100 rounded-lg p-6 text-center transition-colors"
                >
                  <div className="font-semibold text-primary-900 mb-2">{category.name}</div>
                  <div className="text-sm text-primary-600">
                    {categoryProducts.length} {categoryProducts.length === 1 ? 'product' : 'products'}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* All Products */}
        <div>
          <h2 className="heading-3 mb-6">All Products</h2>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-primary-600">No products available at this time.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

