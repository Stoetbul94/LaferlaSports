import { notFound } from 'next/navigation';
import {
  getCapapieProductBySlug,
  getAllCapapieProducts,
  getCapapieProductsByCategory,
  getCapapieCategories,
} from '@/lib/capapie-products';
import CapapieProductCard from '@/components/CapapieProductCard';
import ProductGallery from '@/components/ProductGallery';
import AddToCartButton from '@/components/AddToCartButton';
import ProductJsonLd from '@/components/ProductJsonLd';
import SizeGuide from '@/components/SizeGuide';
import Link from 'next/link';
import { categoryToSlug, slugToCategory } from '@/lib/category-slug';
import { productWhatsappUrl } from '@/lib/contact-info';
import { absoluteUrl } from '@/lib/seo';

interface ShopDynamicPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = getAllCapapieProducts();
  const categories = getCapapieCategories();

  const productParams = products.map((product) => ({ slug: product.slug }));
  const categoryParams = categories.map((category) => ({ slug: categoryToSlug(category) }));

  return [...productParams, ...categoryParams];
}

export async function generateMetadata({ params }: ShopDynamicPageProps) {
  const { slug } = await params;

  if (!slug || typeof slug !== 'string') {
    return { title: 'Page Not Found' };
  }

  const product = getCapapieProductBySlug(slug);
  if (product) {
    return {
      title: product.name,
      description: product.short_description || `${product.name} — Capapie ISSF equipment from Laferla Sports, South Africa.`,
      alternates: { canonical: `/shop/${product.slug}` },
      openGraph: {
        title: `${product.name} - Laferla Sports`,
        description: product.short_description,
        images: product.image_path ? [product.image_path] : undefined,
        type: 'website',
      },
    };
  }

  const allCategories = getCapapieCategories();
  const categoryName = slugToCategory(slug, allCategories);
  if (categoryName) {
    return {
      title: categoryName,
      description: `Browse ${categoryName} from Capapie at Laferla Sports, South Africa's authorised ISSF shooting equipment dealer.`,
      alternates: { canonical: `/shop/${categoryToSlug(categoryName)}` },
    };
  }

  return { title: 'Page Not Found' };
}

export default async function ShopDynamicPage({ params }: ShopDynamicPageProps) {
  const { slug } = await params;

  if (!slug || typeof slug !== 'string') {
    notFound();
  }

  const product = getCapapieProductBySlug(slug);
  if (product) {
    return (
      <div className="section-padding bg-dark">
        <ProductJsonLd product={product} />
        <div className="container-custom">
          <nav className="mb-8 text-sm text-text-secondary uppercase tracking-wide">
            <Link href="/shop" className="hover:text-accent transition-colors">Shop</Link>
            <span className="mx-2">/</span>
            <Link href={`/shop/${categoryToSlug(product.category)}`} className="hover:text-accent transition-colors">
              {product.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text-primary">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <ProductGallery images={product.images} alt={product.name} />

            <div>
              <div className="mb-6">
                <span className="text-xs uppercase tracking-wider text-accent font-bold">{product.category}</span>
              </div>

              <h1 className="heading-2 mb-6 text-text-primary">{product.name}</h1>

              <div className="mb-8 pb-8 border-b border-dark-border">
                <div className="text-sm text-text-secondary uppercase tracking-wide">
                  SKU / Item Code: {product.product_code}
                </div>
              </div>

              {product.features.length > 0 ? (
                <div className="mb-8">
                  <h2 className="font-bold text-xl mb-4 text-text-primary uppercase tracking-wide">Features</h2>
                  <ul className="space-y-3">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex text-text-secondary leading-relaxed">
                        <span className="text-accent mr-3 flex-shrink-0">▸</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                product.long_description && (
                  <div className="mb-8">
                    <p className="text-body text-lg leading-relaxed whitespace-pre-line">
                      {product.long_description}
                    </p>
                  </div>
                )
              )}

              {product.colors.length > 0 && (
                <div className="mb-8">
                  <h2 className="font-bold text-xl mb-4 text-text-primary uppercase tracking-wide">Options</h2>
                  <div className="space-y-2">
                    {product.colors.map((opt, i) => (
                      <div key={i} className="text-text-secondary">
                        <span className="text-text-primary font-semibold">{opt.label}:</span>{' '}
                        {opt.values.join(' · ')}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-4">
                <AddToCartButton product={product} />
              </div>

              <div className="mb-8">
                <a
                  href={productWhatsappUrl({
                    name: product.name,
                    sku: product.product_code,
                    url: absoluteUrl(`/shop/${product.slug}`),
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded bg-[#25D366] px-6 py-3 font-semibold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-[#1fb457] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-dark"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.821 11.821 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.739-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  Enquire on WhatsApp
                </a>
              </div>

              <SizeGuide category={product.category} sizing={product.sizing} />

              {product.product_link && product.product_link.trim() && (
                <div className="mb-8">
                  <a
                    href={product.product_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 border-2 border-accent text-accent hover:bg-accent hover:text-white transition-all duration-200 uppercase tracking-wide font-semibold text-sm rounded focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-dark"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View official Capapie product page
                  </a>
                </div>
              )}

              <div className="text-sm text-text-secondary space-y-3 pt-8 border-t border-dark-border">
                <p className="flex items-center"><span className="text-accent mr-2">✓</span>Official Capapie Authorised Dealer</p>
                <p className="flex items-center"><span className="text-accent mr-2">✓</span>ISSF Competition Compliant</p>
                <p className="flex items-center"><span className="text-accent mr-2">✓</span>Professional Support Available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const allCategories = getCapapieCategories();
  const categoryName = slugToCategory(slug, allCategories);

  if (categoryName) {
    const categoryProducts = getCapapieProductsByCategory(categoryName);
    return (
      <div className="section-padding bg-dark">
        <div className="container-custom">
          <nav className="mb-8 text-sm text-text-secondary uppercase tracking-wide">
            <Link href="/shop" className="hover:text-accent transition-colors">Shop</Link>
            <span className="mx-2">/</span>
            <span className="text-text-primary">{categoryName}</span>
          </nav>

          <div className="mb-16">
            <div className="mb-6">
              <Link href="/shop" className="inline-flex items-center text-text-secondary hover:text-accent transition-colors uppercase tracking-wide text-sm font-semibold">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Shop
              </Link>
            </div>
            <h1 className="heading-1 mb-6 text-text-primary">{categoryName}</h1>
          </div>

          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryProducts.map((p) => (
                <CapapieProductCard key={p.slug} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-text-secondary mb-6 text-lg">No products available in this category.</p>
              <Link href="/shop" className="btn btn-primary">Browse All Products</Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  notFound();
}
