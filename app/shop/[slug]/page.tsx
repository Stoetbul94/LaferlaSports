import { notFound } from 'next/navigation';
import { getCapapieProductByCode, getAllCapapieProducts, getCapapieProductsByCategory, getCapapieCategories } from '@/lib/capapie-products';
import CapapieProductCard from '@/components/CapapieProductCard';
import SafeProductImage from '@/components/SafeProductImage';
import Link from 'next/link';

interface ShopDynamicPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const products = getAllCapapieProducts();
  const categories = getCapapieCategories();
  
  // Generate params for products and categories (defensive: handles empty arrays)
  const productParams = products.length > 0
    ? products.map((product) => ({
        slug: product.product_code,
      }))
    : [];
  
  const categoryParams = categories.length > 0
    ? categories.map((category) => ({
        slug: category.toLowerCase(),
      }))
    : [];
  
  // Return empty array if no products/categories (safe for Next.js)
  return [...productParams, ...categoryParams];
}

export async function generateMetadata({ params }: ShopDynamicPageProps) {
  const slug = params.slug;
  
  // Check if it's a product_code first
  const product = getCapapieProductByCode(slug);
  if (product) {
    return {
      title: `${product.name} - Laferla Sports`,
      description: product.short_description,
    };
  }
  
  // Check if it's a category
  const categoryName = decodeURIComponent(slug);
  const allCategories = getCapapieCategories();
  const categoryExists = allCategories.some(c => c.toLowerCase() === categoryName.toLowerCase());
  
  if (categoryExists) {
    const displayCategoryName = allCategories.find(c => c.toLowerCase() === categoryName.toLowerCase()) || categoryName;
    return {
      title: `${displayCategoryName} - Laferla Sports`,
      description: `Browse ${displayCategoryName} products from Laferla Sports`,
    };
  }
  
  return { title: 'Page Not Found' };
}

export default function ShopDynamicPage({ params }: ShopDynamicPageProps) {
  const slug = params.slug;
  
  // Check if it's a product_code first
  const product = getCapapieProductByCode(slug);
  if (product) {
    // Render product page
    return (
      <div className="section-padding bg-dark">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-text-secondary uppercase tracking-wide">
            <Link href="/shop" className="hover:text-accent transition-colors">Shop</Link>
            <span className="mx-2">/</span>
            <span className="text-text-primary">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Product Image */}
            <div>
              <div className="aspect-square relative bg-dark-lighter border border-dark-border rounded-lg overflow-hidden">
                <SafeProductImage
                  src={product.image_path || '/images/products/placeholder.png'}
                  alt={product.name}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-6">
                <span className="text-xs uppercase tracking-wider text-accent font-bold">{product.category}</span>
              </div>
              
              <h1 className="heading-2 mb-6 text-text-primary">{product.name}</h1>
              
              <div className="mb-8 pb-8 border-b border-dark-border">
                <div className="text-sm text-text-secondary uppercase tracking-wide mb-4">
                  Product Code: {product.product_code}
                </div>
              </div>

              <div className="mb-8">
                <p className="text-body text-lg leading-relaxed">{product.short_description}</p>
              </div>

              {product.long_description && (
                <div className="mb-8">
                  <h3 className="font-bold text-xl mb-4 text-text-primary uppercase tracking-wide">Description</h3>
                  <div className="text-text-secondary whitespace-pre-line leading-relaxed text-lg">
                    {product.long_description}
                  </div>
                </div>
              )}

              {/* Additional Info */}
              <div className="text-sm text-text-secondary space-y-3 pt-8 border-t border-dark-border">
                <p className="flex items-center">
                  <span className="text-accent mr-2">✓</span>
                  Official Capapie Authorized Dealer
                </p>
                <p className="flex items-center">
                  <span className="text-accent mr-2">✓</span>
                  ISSF Competition Compliant
                </p>
                <p className="flex items-center">
                  <span className="text-accent mr-2">✓</span>
                  Professional Support Available
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Check if it's a category
  const categoryName = decodeURIComponent(slug);
  const allCategories = getCapapieCategories();
  const categoryExists = allCategories.some(c => c.toLowerCase() === categoryName.toLowerCase());
  
  if (categoryExists) {
    const products = getCapapieProductsByCategory(categoryName);
    const displayCategoryName = allCategories.find(c => c.toLowerCase() === categoryName.toLowerCase()) || categoryName;
    
    // Render category page
    return (
      <div className="section-padding bg-dark">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-text-secondary uppercase tracking-wide">
            <Link href="/shop" className="hover:text-accent transition-colors">Shop</Link>
            <span className="mx-2">/</span>
            <span className="text-text-primary">{displayCategoryName}</span>
          </nav>

          {/* Page Header */}
          <div className="mb-16">
            <h1 className="heading-1 mb-6 text-text-primary">{displayCategoryName}</h1>
          </div>

          {/* Products Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <CapapieProductCard key={product.product_code} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-text-secondary mb-6 text-lg">No products available in this category.</p>
              <Link href="/shop" className="btn btn-primary">
                Browse All Products
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  // Not found
  notFound();
}

