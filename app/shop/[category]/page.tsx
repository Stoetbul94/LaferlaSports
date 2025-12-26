import { notFound } from 'next/navigation';
import { getProductsByCategory, getCategoryBySlug, categories } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.category);
  if (!category) return { title: 'Category Not Found' };
  
  return {
    title: `${category.name} - Laferla Sports`,
    description: category.description,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.category);
  
  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(category.id);

  return (
    <div className="section-padding bg-white">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-primary-600">
          <Link href="/shop" className="hover:text-primary-900">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-primary-900">{category.name}</span>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="heading-1 mb-4">{category.name}</h1>
          <p className="text-body max-w-3xl">{category.description}</p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-primary-600 mb-4">No products available in this category.</p>
            <Link href="/shop" className="btn btn-primary">
              Browse All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

