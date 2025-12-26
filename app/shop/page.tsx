import { getAllCapapieProducts, getCapapieCategories } from '@/lib/capapie-products';
import CapapieProductCard from '@/components/CapapieProductCard';
import Link from 'next/link';

export const metadata = {
  title: 'Shop - Laferla Sports | ISSF Shooting Equipment',
  description: 'Browse our complete catalog of ISSF-compliant shooting sports equipment including pistols, rifles, shotguns, and accessories.',
};

export default function ShopPage() {
  const products = getAllCapapieProducts();
  const categories = getCapapieCategories();

  return (
    <div className="section-padding bg-dark">
      <div className="container-custom">
        {/* Page Header */}
        <div className="mb-16">
          <h1 className="heading-1 mb-6 text-text-primary">Shop</h1>
          <p className="text-body max-w-3xl text-lg">
            Browse our complete selection of ISSF-compliant shooting sports equipment. 
            All products are authorized Capapie dealer items, verified for competition compliance.
          </p>
        </div>

        {/* Category Navigation */}
        {categories.length > 0 && (
          <div className="mb-16">
            <h2 className="heading-3 mb-8 text-text-primary">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => {
                const categoryProducts = products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
                return (
                  <Link
                    key={category}
                    href={`/shop/${encodeURIComponent(category.toLowerCase())}`}
                    className="bg-dark-lighter border border-dark-border hover:border-accent rounded-lg p-6 text-center transition-all duration-200 hover:shadow-xl hover:shadow-accent/10"
                  >
                    <div className="font-bold text-text-primary mb-2 uppercase tracking-wide">{category}</div>
                    <div className="text-sm text-text-secondary">
                      {categoryProducts.length} {categoryProducts.length === 1 ? 'product' : 'products'}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* All Products */}
        <div>
          <h2 className="heading-3 mb-10 text-text-primary">All Products</h2>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <CapapieProductCard key={product.product_code} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-text-secondary text-lg">No products available at this time.</p>
              <p className="text-text-muted text-sm mt-4">
                Please populate lib/capapie-products.ts with data from Capapie.xlsx
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


