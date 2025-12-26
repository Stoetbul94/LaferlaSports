import { notFound } from 'next/navigation';
import { getCapapieProductByCode, getAllCapapieProducts, getCapapieProductsByCategory, getCapapieCategories } from '@/lib/capapie-products';
import CapapieProductCard from '@/components/CapapieProductCard';
import SafeProductImage from '@/components/SafeProductImage';
import Link from 'next/link';
import { categoryToSlug, slugToCategory } from '@/lib/category-slug';

interface ShopDynamicPageProps {
  params: Promise<{
    slug: string;
  }>;
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
        slug: categoryToSlug(category),
      }))
    : [];
  
  // Return empty array if no products/categories (safe for Next.js)
  return [...productParams, ...categoryParams];
}

export async function generateMetadata({ params }: ShopDynamicPageProps) {
  // Safely extract slug from params (params is now a Promise in Next.js 16)
  const { slug } = await params;
  
  if (!slug || typeof slug !== "string") {
    return { title: 'Page Not Found - Laferla Sports' };
  }
  
  // Check if it's a product_code first
  const product = getCapapieProductByCode(slug);
  if (product) {
    return {
      title: `${product.name} - Laferla Sports`,
      description: product.short_description,
    };
  }
  
  // Check if it's a category slug
  const allCategories = getCapapieCategories();
  const categoryName = slugToCategory(slug, allCategories);
  
  if (categoryName) {
    return {
      title: `${categoryName} - Laferla Sports`,
      description: `Browse ${categoryName} products from Laferla Sports`,
    };
  }
  
  return { title: 'Page Not Found - Laferla Sports' };
}

export default async function ShopDynamicPage({ params }: ShopDynamicPageProps) {
  // Safely extract slug from params (params is now a Promise in Next.js 16)
  const { slug } = await params;
  
  // Guard: slug must exist and be a string
  if (!slug || typeof slug !== "string") {
    if (process.env.NODE_ENV === "development") {
      console.warn("[Dev] ShopDynamicPage: slug is undefined or invalid", slug);
    }
    notFound();
  }
  
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
            <Link href={`/shop/${categoryToSlug(product.category)}`} className="hover:text-accent transition-colors capitalize">
              {product.category}
            </Link>
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

              {/* External Product Link */}
              {product.product_link && product.product_link.trim() && (
                <div className="mb-8">
                  <a
                    href={product.product_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 border-2 border-accent text-accent hover:bg-accent hover:text-white transition-all duration-200 uppercase tracking-wide font-semibold text-sm rounded focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-dark"
                  >
                    <svg 
                      className="w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                      />
                    </svg>
                    View official Capapie product page
                  </a>
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
  
  // Check if it's a category slug
  const allCategories = getCapapieCategories();
  const categoryName = slugToCategory(slug, allCategories);
  
  if (categoryName) {
    const categoryProducts = getCapapieProductsByCategory(categoryName);
    
    // Render category page
    return (
      <div className="section-padding bg-dark">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-text-secondary uppercase tracking-wide">
            <Link href="/shop" className="hover:text-accent transition-colors">Shop</Link>
            <span className="mx-2">/</span>
            <span className="text-text-primary">{categoryName}</span>
          </nav>

          {/* Page Header with Back Button */}
          <div className="mb-16">
            <div className="mb-6">
              <Link 
                href="/shop" 
                className="inline-flex items-center text-text-secondary hover:text-accent transition-colors uppercase tracking-wide text-sm font-semibold"
              >
                <svg 
                  className="w-4 h-4 mr-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                  />
                </svg>
                Back to Shop
              </Link>
            </div>
            <h1 className="heading-1 mb-6 text-text-primary">{categoryName}</h1>
          </div>

          {/* Products Grid */}
          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryProducts.map((product) => (
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
  
  // Not found - invalid category slug or product code
  notFound();
}

