import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import CapapieProductCard from '@/components/CapapieProductCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import VestMaterialTable from '@/components/VestMaterialTable';
import { SHOTGUN_CATEGORIES, getShotgunCategory } from '@/lib/shotgun-categories';
import { getShotgunProductsByCategory } from '@/lib/shotgun-products';
import { SHOTGUN_COLLECTION_PATH } from '@/lib/breadcrumbs';

interface ShotgunCategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return SHOTGUN_CATEGORIES.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: ShotgunCategoryPageProps) {
  const { category: slug } = await params;
  const category = getShotgunCategory(slug);

  if (!category) {
    return { title: 'Page Not Found' };
  }

  return {
    title: category.metaTitle,
    description: category.metaDescription,
    alternates: { canonical: `${SHOTGUN_COLLECTION_PATH}/${category.slug}` },
    openGraph: {
      title: `${category.heading} | Laferla Sports`,
      description: category.metaDescription,
      images: [category.image],
      type: 'website',
    },
  };
}

export default async function ShotgunCategoryPage({ params }: ShotgunCategoryPageProps) {
  const { category: slug } = await params;
  const category = getShotgunCategory(slug);

  if (!category) {
    notFound();
  }

  const products = getShotgunProductsByCategory(category.name);
  const otherCategories = SHOTGUN_CATEGORIES.filter((c) => c.slug !== category.slug);

  return (
    <div className="section-padding bg-dark">
      <div className="container-custom">
        <Breadcrumbs
          items={[
            { name: 'Shop', href: '/shop' },
            { name: 'Trap & Skeet', href: SHOTGUN_COLLECTION_PATH },
            { name: category.name },
          ]}
        />

        {category.heroImage && (
          <div className="relative mb-12 aspect-[21/9] overflow-hidden rounded-lg md:aspect-[3/1]">
            <Image
              src={category.heroImage}
              alt={category.heroImageAlt ?? category.heading}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/40 to-transparent" />
          </div>
        )}

        <header className="mb-16 max-w-3xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-accent">
            Capapie · Trap &amp; Skeet
          </p>
          <h1 className="heading-1 mb-6 text-text-primary">{category.heading}</h1>
          <p className="text-body text-lg leading-relaxed">{category.intro}</p>
        </header>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <CapapieProductCard
                key={product.slug}
                product={product}
                // The lifestyle banner is the LCP element where present.
                priority={!category.heroImage && i < 3}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="mb-6 text-lg text-text-secondary">
              No products available in this category.
            </p>
            <Link href={SHOTGUN_COLLECTION_PATH} className="btn btn-primary">
              Browse Trap &amp; Skeet
            </Link>
          </div>
        )}

        {category.slug === 'vests' && (
          <div className="mt-20 max-w-4xl">
            <VestMaterialTable heading="Made-to-measure material &amp; colour options" />
          </div>
        )}

        <section className="mt-20 border-t border-dark-border pt-12" aria-labelledby="more-heading">
          <h2 id="more-heading" className="heading-3 mb-6 text-text-primary">
            More from the Trap &amp; Skeet range
          </h2>
          <div className="flex flex-wrap gap-3">
            {otherCategories.map((other) => (
              <Link
                key={other.slug}
                href={`${SHOTGUN_COLLECTION_PATH}/${other.slug}`}
                className="rounded border border-dark-border bg-dark-lighter px-4 py-2 text-sm font-semibold uppercase tracking-wide text-text-secondary transition-colors hover:border-accent hover:text-accent"
              >
                {other.shortName}
              </Link>
            ))}
          </div>
          <p className="mt-8">
            <Link
              href={SHOTGUN_COLLECTION_PATH}
              className="text-sm font-semibold uppercase tracking-wide text-accent hover:underline"
            >
              ← Back to Capapie Trap &amp; Skeet
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
