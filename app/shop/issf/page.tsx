import Image from 'next/image';
import Link from 'next/link';
import CapapieProductCard from '@/components/CapapieProductCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getPrecisionCategories, getPrecisionProducts, getPrecisionProductsByCategory } from '@/lib/catalog';
import { PRECISION_CATEGORIES, precisionCategoryMeta } from '@/lib/precision-categories';
import { categoryToSlug } from '@/lib/category-slug';
import { SHOTGUN_COLLECTION_PATH } from '@/lib/breadcrumbs';
import { mailtoUrl } from '@/lib/contact-info';

export const metadata = {
  title: 'ISSF Shooting Equipment South Africa | Capapie',
  description:
    'Capapie ISSF shooting equipment supplied in South Africa by Laferla Sports — shooting jackets and trousers, inners, gloves, target shooting shoes, bags and range accessories. Request a quote.',
  alternates: { canonical: '/shop/issf' },
  openGraph: {
    title: 'ISSF Competition Shooting Equipment | Laferla Sports',
    description:
      'Capapie shooting jackets, trousers, gloves, shoes, inners and accessories for ISSF rifle and pistol disciplines, supplied across South Africa.',
    images: ['/images/MainBackground2.png'],
    type: 'website',
  },
};

const WHY_POINTS = [
  {
    title: 'Authorised Capapie dealer',
    body: 'Laferla Sports supplies the Capapie range in South Africa, so you order locally rather than importing on your own account.',
  },
  {
    title: 'Equipment-rule aware',
    body: 'Shooting jackets, trousers, gloves and shoes are governed by ISSF equipment rules. Tell us your discipline and we will point you at the right specification.',
  },
  {
    title: 'Made-to-measure apparel',
    body: 'Jackets and trousers can be ordered in standard sizes or cut to your measurements, which matters most for position holding.',
  },
  {
    title: 'Sizing and after-sales support',
    body: 'We help with measurements before you order and stay available afterwards, including for kit questions ahead of a competition.',
  },
];

export default function IssfCollectionPage() {
  const categories = getPrecisionCategories();
  const allPrecision = getPrecisionProducts();
  const featuredJackets = getPrecisionProductsByCategory('Jackets & Trousers').slice(0, 4);

  // Drive the tiles from the live catalogue order, falling back to the raw
  // category name for anything the SEO layer has no entry for.
  const tiles = categories.map((name) => ({
    name,
    meta: precisionCategoryMeta(name),
    count: getPrecisionProductsByCategory(name).length,
    href: `/shop/${categoryToSlug(name)}`,
    sample: getPrecisionProductsByCategory(name)[0],
  }));

  return (
    <div className="bg-dark">
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/MainBackground2.png"
            alt="Capapie ISSF competition shooting equipment"
            fill
            priority
            sizes="100vw"
            className="object-cover object-right"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/85 to-dark/40" />
        </div>

        <div className="container-custom py-24 md:py-32">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-accent">
              Capapie · ISSF / Precision
            </p>
            <h1 className="heading-1 mb-6 text-text-primary">
              ISSF Competition Shooting Equipment
            </h1>
            <p className="text-body mb-8 text-lg leading-relaxed">
              Laferla Sports supplies Capapie equipment for ISSF rifle and pistol
              disciplines across South Africa — shooting jackets and trousers, inners,
              gloves, target shooting shoes, kit bags and the range accessories that
              go with them.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop/jackets-and-trousers" className="btn btn-primary">
                Shop Jackets &amp; Trousers
              </Link>
              <Link href={SHOTGUN_COLLECTION_PATH} className="btn btn-secondary">
                Trap &amp; Skeet Range
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container-custom section-padding">
        <Breadcrumbs items={[{ name: 'Shop', href: '/shop' }, { name: 'ISSF / Precision' }]} />

        {/* Introduction */}
        <section className="mb-20 max-w-3xl">
          <h2 className="heading-3 mb-6 text-text-primary">
            Equipment designed for competitive ISSF shooting
          </h2>
          <p className="text-body mb-4 leading-relaxed">
            Precision target shooting rewards equipment that behaves the same way every
            shot. A shooting jacket and trousers hold a position without the shooter
            having to fight them, a glove steadies the rifle on the hand stop, and a
            flat shooting sole keeps the standing and kneeling positions repeatable.
          </p>
          <p className="text-body leading-relaxed">
            Browse the {allPrecision.length} products below by category, then add
            anything you are interested in to a quote request. We will come back with
            pricing, sizing guidance and lead times. Jackets, trousers, gloves and shoes
            are governed by ISSF equipment rules, which change from time to time — ask
            us if you need a specific item checked before a competition.
          </p>
        </section>

        {/* Category tiles */}
        <section className="mb-20" aria-labelledby="categories-heading">
          <h2 id="categories-heading" className="heading-3 mb-8 text-text-primary">
            Shop by category
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tiles.map((tile) => (
              <Link
                key={tile.name}
                href={tile.href}
                className="group overflow-hidden rounded-lg border border-dark-border bg-dark-lighter transition-all duration-200 hover:border-accent hover:shadow-xl hover:shadow-accent/10"
              >
                {tile.sample && (
                  <div className="relative aspect-[4/3] bg-white">
                    <Image
                      src={tile.sample.image_path}
                      alt={tile.sample.image_alt || tile.sample.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="mb-1 font-bold uppercase tracking-wide text-text-primary transition-colors group-hover:text-accent">
                    {tile.meta?.heading || tile.name}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {tile.count} {tile.count === 1 ? 'product' : 'products'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured jackets & trousers */}
        {featuredJackets.length > 0 && (
          <section className="mb-20" aria-labelledby="featured-jackets-heading">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 id="featured-jackets-heading" className="heading-3 text-text-primary">
                  Shooting jackets &amp; trousers
                </h2>
                <p className="mt-2 text-text-secondary">
                  The core of any ISSF rifle or pistol setup, in standard sizes or made
                  to measure.
                </p>
              </div>
              <Link
                href="/shop/jackets-and-trousers"
                className="text-sm font-semibold uppercase tracking-wide text-accent hover:underline"
              >
                View all jackets &amp; trousers →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {featuredJackets.map((product) => (
                <CapapieProductCard key={product.slug} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Why Capapie / Laferla */}
        <section className="mb-20" aria-labelledby="why-heading">
          <h2 id="why-heading" className="heading-3 mb-8 text-text-primary">
            Why buy Capapie from Laferla Sports
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {WHY_POINTS.map((point) => (
              <div
                key={point.title}
                className="rounded-lg border border-dark-border bg-dark-lighter p-6"
              >
                <h3 className="mb-2 font-bold uppercase tracking-wide text-text-primary">
                  {point.title}
                </h3>
                <p className="leading-relaxed text-text-secondary">{point.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-lg border border-dark-border bg-dark-lighter p-8 md:p-12">
          <div className="max-w-2xl">
            <h2 className="heading-3 mb-4 text-text-primary">
              Not sure which specification you need?
            </h2>
            <p className="mb-8 leading-relaxed text-text-secondary">
              Tell us your discipline, your current kit and your measurements, and we
              will come back with a recommendation and a quote. There is no obligation
              and we do not publish prices online.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop" className="btn btn-primary">
                Browse the full shop
              </Link>
              <a
                href={mailtoUrl(
                  'ISSF equipment enquiry',
                  'Hi Laferla Sports,\n\nI would like advice on ISSF shooting equipment.\n\nDiscipline:\nCurrent kit:\nHeight / chest measurement:\n'
                )}
                className="btn btn-secondary"
              >
                Request sizing assistance
              </a>
            </div>
          </div>
        </section>

        {/* Cross-link to the other discipline */}
        <nav className="mt-20 border-t border-dark-border pt-10" aria-label="ISSF categories">
          <h2 className="heading-3 mb-6 text-text-primary">All ISSF categories</h2>
          <ul className="flex flex-wrap gap-3">
            {PRECISION_CATEGORIES.map((c) => (
              <li key={c.name}>
                <Link
                  href={`/shop/${categoryToSlug(c.name)}`}
                  className="inline-block rounded border border-dark-border px-4 py-2 text-sm text-text-secondary transition-colors hover:border-accent hover:text-accent"
                >
                  {c.heading}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
