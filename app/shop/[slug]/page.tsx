import { notFound } from 'next/navigation';
import {
  getAllProducts,
  getPrecisionCategories,
  getPrecisionProductsByCategory,
  getProductBySlug,
  getRelatedProducts,
} from '@/lib/catalog';
import CapapieProductCard from '@/components/CapapieProductCard';
import ProductGallery from '@/components/ProductGallery';
import AddToCartButton from '@/components/AddToCartButton';
import ProductJsonLd from '@/components/ProductJsonLd';
import SizeGuide from '@/components/SizeGuide';
import Breadcrumbs from '@/components/Breadcrumbs';
import VestMaterialTable from '@/components/VestMaterialTable';
import Link from 'next/link';
import { categoryToSlug, slugToCategory } from '@/lib/category-slug';
import {
  ISSF_COLLECTION_PATH,
  productBreadcrumbs,
  SHOTGUN_COLLECTION_PATH,
} from '@/lib/breadcrumbs';
import { shotgunCategorySlugForName } from '@/lib/shotgun-categories';
import { precisionCategoryMeta } from '@/lib/precision-categories';
import { productMailtoUrl } from '@/lib/contact-info';
import { absoluteUrl } from '@/lib/seo';
import { DisplayProduct } from '@/types/product-data';

interface ShopDynamicPageProps {
  params: Promise<{ slug: string }>;
}

/** Precision categories whose products are governed by ISSF equipment rules. */
const ISSF_REGULATED_CATEGORIES = new Set(['Jackets & Trousers', 'Gloves', 'Shoes', 'Inners']);

/**
 * Short trust line under the enquiry buttons.
 *
 * Deliberately omitted for precision bags and accessories: most are not
 * governed by ISSF equipment rules, and a blanket compliance claim across
 * keychains, lapel pins and kit bags would be inaccurate.
 */
function disciplineTrustNote(product: DisplayProduct): string | null {
  if (product.discipline === 'shotgun') return 'Built for competitive Trap & Skeet shooting';
  if (ISSF_REGULATED_CATEGORIES.has(product.category)) {
    return 'Designed for ISSF competition disciplines';
  }
  return null;
}

export async function generateStaticParams() {
  // Shotgun categories are routed under /shop/shotgun/<slug>, so only the
  // precision categories share this flat namespace with product slugs.
  const productParams = getAllProducts().map((product) => ({ slug: product.slug }));
  const categoryParams = getPrecisionCategories().map((category) => ({
    slug: categoryToSlug(category),
  }));

  return [...productParams, ...categoryParams];
}

export async function generateMetadata({ params }: ShopDynamicPageProps) {
  const { slug } = await params;

  if (!slug || typeof slug !== 'string') {
    return { title: 'Page Not Found' };
  }

  const product = getProductBySlug(slug);
  if (product) {
    const description =
      product.seo_description ||
      product.short_description ||
      `${product.name} — Capapie shooting equipment from Laferla Sports, South Africa.`;

    return {
      title: product.seo_title || product.name,
      description,
      alternates: { canonical: `/shop/${product.slug}` },
      openGraph: {
        title: `${product.name} - Laferla Sports`,
        description,
        images: product.image_path ? [product.image_path] : undefined,
        type: 'website',
      },
    };
  }

  const categoryName = slugToCategory(slug, getPrecisionCategories());
  if (categoryName) {
    const meta = precisionCategoryMeta(categoryName);
    const description =
      meta?.metaDescription ||
      `Browse ${categoryName} from Capapie at Laferla Sports, South Africa's authorised ISSF shooting equipment dealer.`;

    return {
      title: meta?.metaTitle || categoryName,
      description,
      alternates: { canonical: `/shop/${categoryToSlug(categoryName)}` },
      openGraph: { title: meta?.heading || categoryName, description, type: 'website' },
    };
  }

  return { title: 'Page Not Found' };
}

export default async function ShopDynamicPage({ params }: ShopDynamicPageProps) {
  const { slug } = await params;

  if (!slug || typeof slug !== 'string') {
    notFound();
  }

  const product = getProductBySlug(slug);
  if (product) {
    const isShotgun = product.discipline === 'shotgun';
    const isVest = product.category === 'Shooting Vests';
    const categorySlug = isShotgun
      ? shotgunCategorySlugForName(product.category)
      : categoryToSlug(product.category);
    const categoryHref = isShotgun
      ? `${SHOTGUN_COLLECTION_PATH}/${categorySlug}`
      : `/shop/${categorySlug}`;
    const related = getRelatedProducts(product);
    const disciplineNote = disciplineTrustNote(product);

    return (
      <div className="section-padding bg-dark">
        <ProductJsonLd product={product} />
        <div className="container-custom">
          <Breadcrumbs items={productBreadcrumbs(product)} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <ProductGallery
              images={product.images}
              alt={product.image_alt || product.name}
            />

            <div>
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <Link
                  href={categoryHref}
                  className="text-xs uppercase tracking-wider text-accent font-bold hover:underline"
                >
                  {product.category}
                </Link>
                {product.made_to_measure && (
                  <span className="rounded border border-accent px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-accent">
                    Standard &amp; Made-to-Measure
                  </span>
                )}
              </div>

              <h1 className="heading-2 mb-6 text-text-primary">{product.name}</h1>

              <div className="mb-8 pb-8 border-b border-dark-border">
                <div className="text-sm text-text-secondary uppercase tracking-wide">
                  {product.product_code
                    ? `SKU / Item Code: ${product.product_code}`
                    : 'Quote-based pricing — add to a quote request for a price'}
                </div>
              </div>

              {product.features.length > 0 ? (
                <div className="mb-8">
                  <h2 className="font-bold text-xl mb-4 text-text-primary uppercase tracking-wide">Features</h2>
                  <ul className="space-y-3">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex text-text-secondary leading-relaxed">
                        <span className="text-accent mr-3 flex-shrink-0" aria-hidden="true">▸</span>
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

              {isShotgun && product.features.length > 0 && product.long_description && (
                <div className="mb-8">
                  <h2 className="font-bold text-xl mb-4 text-text-primary uppercase tracking-wide">Description</h2>
                  <p className="text-body leading-relaxed whitespace-pre-line">
                    {product.long_description}
                  </p>
                </div>
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
                  href={productMailtoUrl({
                    name: product.name,
                    sku: product.product_code,
                    url: absoluteUrl(`/shop/${product.slug}`),
                  })}
                  className="flex w-full items-center justify-center gap-2 rounded border-2 border-accent px-6 py-3 font-semibold uppercase tracking-wide text-accent transition-all duration-200 hover:bg-accent hover:text-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-dark"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Enquire by Email
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
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View official Capapie product page
                  </a>
                </div>
              )}

              <div className="text-sm text-text-secondary space-y-3 pt-8 border-t border-dark-border">
                <p className="flex items-center"><span className="text-accent mr-2" aria-hidden="true">✓</span>Official Capapie Authorised Dealer</p>
                {disciplineNote && (
                  <p className="flex items-center"><span className="text-accent mr-2" aria-hidden="true">✓</span>{disciplineNote}</p>
                )}
                <p className="flex items-center"><span className="text-accent mr-2" aria-hidden="true">✓</span>Professional Support Available</p>
              </div>
            </div>
          </div>

          {isVest && (
            <div className="mt-20 max-w-4xl">
              <VestMaterialTable />
            </div>
          )}

          <div className="mt-16 rounded-lg border border-dark-border bg-dark-lighter p-8">
            <h2 className="heading-3 mb-3 text-text-primary">
              {isShotgun
                ? 'Part of the Capapie Trap & Skeet range'
                : 'Part of the Capapie ISSF range'}
            </h2>
            <p className="text-text-secondary mb-6 leading-relaxed">
              {isShotgun
                ? 'Browse the full shotgun collection — competition vests, inners, bags, shell carriers, gun covers and accessories supplied across South Africa.'
                : 'Browse the full precision collection — shooting jackets and trousers, inners, gloves, shoes, bags and range accessories supplied across South Africa.'}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={isShotgun ? SHOTGUN_COLLECTION_PATH : ISSF_COLLECTION_PATH}
                className="btn btn-primary"
              >
                {isShotgun ? 'Shop Trap & Skeet' : 'Shop ISSF Equipment'}
              </Link>
              {categorySlug && (
                <Link href={categoryHref} className="btn btn-secondary">
                  All {product.category}
                </Link>
              )}
            </div>
          </div>

          {related.length > 0 && (
            <section className="mt-20" aria-labelledby="related-heading">
              <h2 id="related-heading" className="heading-3 mb-8 text-text-primary">
                You may also like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {related.map((p) => (
                  <CapapieProductCard key={p.slug} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    );
  }

  const categoryName = slugToCategory(slug, getPrecisionCategories());

  if (categoryName) {
    const categoryProducts = getPrecisionProductsByCategory(categoryName);
    const meta = precisionCategoryMeta(categoryName);
    const otherCategories = getPrecisionCategories().filter((c) => c !== categoryName);

    return (
      <div className="section-padding bg-dark">
        <div className="container-custom">
          <Breadcrumbs
            items={[
              { name: 'Shop', href: '/shop' },
              { name: 'ISSF / Precision', href: ISSF_COLLECTION_PATH },
              { name: categoryName },
            ]}
          />

          <div className="mb-16">
            <div className="mb-6">
              <Link href={ISSF_COLLECTION_PATH} className="inline-flex items-center text-text-secondary hover:text-accent transition-colors uppercase tracking-wide text-sm font-semibold">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                All ISSF Equipment
              </Link>
            </div>
            <h1 className="heading-1 mb-6 text-text-primary">{meta?.heading || categoryName}</h1>
            {meta?.intro && (
              <p className="text-body max-w-3xl text-lg leading-relaxed">{meta.intro}</p>
            )}
          </div>

          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryProducts.map((p, i) => (
                <CapapieProductCard key={p.slug} product={p} priority={i < 3} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-text-secondary mb-6 text-lg">No products available in this category.</p>
              <Link href="/shop" className="btn btn-primary">Browse All Products</Link>
            </div>
          )}

          {otherCategories.length > 0 && (
            <nav className="mt-20 border-t border-dark-border pt-10" aria-label="Other ISSF categories">
              <h2 className="heading-3 mb-6 text-text-primary">More ISSF equipment</h2>
              <ul className="flex flex-wrap gap-3">
                {otherCategories.map((c) => (
                  <li key={c}>
                    <Link
                      href={`/shop/${categoryToSlug(c)}`}
                      className="inline-block rounded border border-dark-border px-4 py-2 text-sm text-text-secondary transition-colors hover:border-accent hover:text-accent"
                    >
                      {precisionCategoryMeta(c)?.heading || c}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
    );
  }

  notFound();
}
