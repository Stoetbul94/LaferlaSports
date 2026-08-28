import Image from 'next/image';
import Link from 'next/link';
import CapapieProductCard from '@/components/CapapieProductCard';
import { getPrecisionCategories, getPrecisionProducts } from '@/lib/catalog';
import { getShotgunProducts } from '@/lib/shotgun-products';
import { SHOTGUN_CATEGORIES } from '@/lib/shotgun-categories';
import { categoryToSlug } from '@/lib/category-slug';

export const metadata = {
  title: 'Shop Shooting Equipment',
  description:
    'Browse Capapie shooting equipment at Laferla Sports: ISSF precision rifle and pistol gear, plus the Trap & Skeet shotgun range. Request a quote in South Africa.',
  alternates: { canonical: '/shop' },
};

export default function ShopPage() {
  const products = getPrecisionProducts();
  const categories = getPrecisionCategories();
  const shotgunCount = getShotgunProducts().length;

  return (
    <div className="section-padding bg-dark">
      <div className="container-custom">
        {/* Page Header */}
        <div className="mb-16">
          <h1 className="heading-1 mb-6 text-text-primary">Shop</h1>
          <p className="text-body max-w-3xl text-lg">
            Browse Capapie shooting equipment supplied in South Africa by Laferla Sports.
            Our catalogue covers two disciplines: ISSF precision rifle and pistol
            equipment, and the Capapie Trap &amp; Skeet shotgun range.
          </p>
        </div>

        {/* Discipline entry points */}
        <div className="mb-20 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-accent bg-dark-lighter p-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Discipline
            </p>
            <h2 className="heading-3 mb-3 text-text-primary">Precision / ISSF</h2>
            <p className="mb-6 leading-relaxed text-text-secondary">
              Jackets, trousers, gloves, shoes, inners and accessories for ISSF air and
              target rifle and pistol shooters. {products.length} products.
            </p>
            <a
              href="#precision"
              className="text-sm font-semibold uppercase tracking-wide text-accent hover:underline"
            >
              Browse precision equipment ↓
            </a>
          </div>

          <Link
            href="/shop/shotgun"
            className="group relative isolate flex min-h-[16rem] flex-col justify-end overflow-hidden rounded-lg border border-dark-border p-8 transition-colors hover:border-accent"
          >
            <Image
              src="/images/products/shotgun/shotgun-trap-skeet-hero.webp"
              alt="Competitive shotgun shooter wearing a Capapie Trap and Skeet vest"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="-z-10 object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-dark via-dark/80 to-dark/30" />
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent">
              New discipline
            </p>
            <h2 className="heading-3 mb-3 text-text-primary">Shotgun / Trap &amp; Skeet</h2>
            <p className="mb-4 leading-relaxed text-text-secondary">
              Made-to-measure Capapie shooting vests, inners, bags, shell carriers,
              gun covers and accessories. {shotgunCount} products.
            </p>
            <span className="text-sm font-semibold uppercase tracking-wide text-accent group-hover:underline">
              Shop Trap &amp; Skeet →
            </span>
          </Link>
        </div>

        {/* Shotgun category shortcuts */}
        <div className="mb-20">
          <h2 className="heading-3 mb-8 text-text-primary">Trap &amp; Skeet categories</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
            {SHOTGUN_CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={`/shop/shotgun/${category.slug}`}
                className="rounded-lg border border-dark-border bg-dark-lighter p-5 text-center transition-all duration-200 hover:border-accent hover:shadow-xl hover:shadow-accent/10"
              >
                <span className="text-sm font-bold uppercase tracking-wide text-text-primary">
                  {category.shortName}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Precision category navigation */}
        {categories.length > 0 && (
          <div id="precision" className="mb-16 scroll-mt-24">
            <h2 className="heading-3 mb-8 text-text-primary">Precision / ISSF categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => {
                // Guard: skip invalid categories
                if (!category || typeof category !== "string") {
                  return null;
                }

                const categoryProducts = products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
                const categorySlug = categoryToSlug(category);

                // Guard: skip if slug generation failed
                if (!categorySlug) {
                  if (process.env.NODE_ENV === "development") {
                    console.warn("[Dev] ShopPage: Failed to generate slug for category", category);
                  }
                  return null;
                }

                return (
                  <Link
                    key={category}
                    href={`/shop/${categorySlug}`}
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

        {/* Precision products */}
        <div>
          <h2 className="heading-3 mb-10 text-text-primary">All Precision / ISSF Products</h2>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, i) => (
                <CapapieProductCard key={product.slug} product={product} priority={i < 3} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-text-secondary text-lg">No products available at this time.</p>
              <p className="text-text-muted text-sm mt-4">
                Run <code>pnpm scrape-products</code> to populate lib/capapie-products.ts
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
