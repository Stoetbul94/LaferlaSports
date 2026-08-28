import Image from 'next/image';
import Link from 'next/link';
import CapapieProductCard from '@/components/CapapieProductCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import VestMaterialTable from '@/components/VestMaterialTable';
import { SHOTGUN_CATEGORIES } from '@/lib/shotgun-categories';
import {
  getFeaturedShotgunVests,
  getShotgunProducts,
  getShotgunProductsByCategory,
} from '@/lib/shotgun-products';
import { mailtoUrl } from '@/lib/contact-info';

export const metadata = {
  title: 'Trap & Skeet Shooting Gear South Africa | Capapie',
  description:
    'Shop Capapie Trap and Skeet shooting gear in South Africa, including made-to-measure shooting vests, competition inners, bags, accessories and shotgun covers. Request a quote from Laferla Sports.',
  alternates: { canonical: '/shop/shotgun' },
  openGraph: {
    title: 'Capapie Trap & Skeet Shooting Gear | Laferla Sports',
    description:
      'Made-to-measure Capapie shooting vests, inners, bags, shell carriers and shotgun covers for competitive Trap and Skeet shooters in South Africa.',
    images: ['/images/products/shotgun/shotgun-trap-skeet-hero.webp'],
    type: 'website',
  },
};

const WHY_POINTS = [
  {
    title: 'Capapie specialists',
    body: 'Capapie has built shooting sportswear since 2001 and supplies competitors worldwide, including across the Trap and Skeet disciplines. Laferla Sports is your Capapie dealer in South Africa.',
  },
  {
    title: 'Made-to-measure vests',
    body: 'Every CAPIVEST is offered in standard sizes or made to measure, specified from the manufacturer material and colour table so the vest fits your mount, not the other way round.',
  },
  {
    title: 'Built for competition',
    body: 'Ventilation, moisture control, stretch panelling, an advanced contoured recoil pad, YKK hardware and a bib number clip run through the vest range.',
  },
  {
    title: 'Local supply and support',
    body: 'We handle sizing guidance, ordering and after-sales support from South Africa, so you are not dealing with an overseas supplier on your own.',
  },
];

export default function ShotgunCollectionPage() {
  const allShotgun = getShotgunProducts();
  const featuredVests = getFeaturedShotgunVests(4);
  const bags = getShotgunProductsByCategory('Bags & Shell Carriers').slice(0, 4);
  const accessories = getShotgunProductsByCategory('Shotgun Accessories').slice(0, 4);
  const madeToMeasureCount = allShotgun.filter((p) => p.made_to_measure).length;

  return (
    <div className="bg-dark">
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/products/shotgun/shotgun-trap-skeet-hero.webp"
            alt="Competitive shotgun shooter in a Capapie vest calling for a target on the trap line"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/85 to-dark/40" />
        </div>

        <div className="container-custom py-24 md:py-32">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-accent">
              Capapie · Shotgun
            </p>
            <h1 className="heading-1 mb-6 text-text-primary">
              Capapie Trap &amp; Skeet Shooting Gear
            </h1>
            <p className="text-body mb-8 text-lg leading-relaxed">
              Laferla Sports supplies the Capapie Trap and Skeet range to competitive
              shotgun shooters across South Africa — made-to-measure shooting vests,
              performance inners, cartridge bags and shell carriers, protective gun
              covers and range accessories.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop/shotgun/vests" className="btn btn-primary">
                Shop Shooting Vests
              </Link>
              <Link href="#made-to-measure" className="btn btn-secondary">
                Made-to-Measure
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container-custom section-padding">
        <Breadcrumbs
          items={[{ name: 'Shop', href: '/shop' }, { name: 'Trap & Skeet' }]}
        />

        {/* Introduction */}
        <section className="mb-20 max-w-3xl">
          <h2 className="heading-3 mb-6 text-text-primary">
            Equipment for competitive shotgun shooting
          </h2>
          <p className="text-body mb-4 leading-relaxed">
            Trap and Skeet place different demands on kit than precision shooting. You
            need a vest that stays put through a full round, a consistent shoulder
            pocket for repeated recoil, and cartridges within easy reach on every stand.
            The Capapie shotgun range is built around exactly that.
          </p>
          <p className="text-body leading-relaxed">
            Browse the {allShotgun.length} products below by category, then add anything
            you are interested in to a quote request. We will come back to you with
            pricing, sizing and lead times. {madeToMeasureCount} apparel items in the
            range can be ordered in standard sizes or made to measure.
          </p>
        </section>

        {/* Category tiles */}
        <section className="mb-20" aria-labelledby="categories-heading">
          <h2 id="categories-heading" className="heading-3 mb-8 text-text-primary">
            Shop by category
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SHOTGUN_CATEGORIES.map((category) => {
              const count = getShotgunProductsByCategory(category.name).length;
              return (
                <Link
                  key={category.slug}
                  href={`/shop/shotgun/${category.slug}`}
                  className="group overflow-hidden rounded-lg border border-dark-border bg-dark-lighter transition-all duration-200 hover:border-accent hover:shadow-xl hover:shadow-accent/10"
                >
                  <div className="relative aspect-[4/3] bg-white">
                    <Image
                      src={category.image}
                      alt={category.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="mb-1 font-bold uppercase tracking-wide text-text-primary transition-colors group-hover:text-accent">
                      {category.shortName}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {count} {count === 1 ? 'product' : 'products'}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Featured vests */}
        <section className="mb-20" aria-labelledby="featured-vests-heading">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="featured-vests-heading" className="heading-3 text-text-primary">
                Featured shooting vests
              </h2>
              <p className="mt-2 text-text-secondary">
                Twelve CAPIVEST models, all available made to measure.
              </p>
            </div>
            <Link
              href="/shop/shotgun/vests"
              className="text-sm font-semibold uppercase tracking-wide text-accent hover:underline"
            >
              View all vests →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featuredVests.map((product) => (
              <CapapieProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>

        {/* Made to measure */}
        <section
          id="made-to-measure"
          className="mb-20 scroll-mt-24"
          aria-labelledby="mtm-heading"
        >
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src="/images/products/shotgun/shotgun-competition-shooters.webp"
                alt="Two competitive shooters wearing Capapie Trap and Skeet shooting vests"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-accent">
                Standard sizes &amp; made-to-measure
              </p>
              <h2 id="mtm-heading" className="heading-3 mb-6 text-text-primary">
                A vest cut to your mount
              </h2>
              <ol className="mb-8 space-y-4 text-text-secondary">
                <li className="flex gap-4">
                  <span className="font-bold text-accent" aria-hidden="true">1.</span>
                  <span>
                    <strong className="text-text-primary">Choose your model.</strong>{' '}
                    Pick the CAPIVEST or inner that suits how and where you shoot.
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold text-accent" aria-hidden="true">2.</span>
                  <span>
                    <strong className="text-text-primary">Specify materials.</strong>{' '}
                    Select your fabric, suede, mesh, lycra, binding and cord piping
                    colours from the manufacturer table below.
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold text-accent" aria-hidden="true">3.</span>
                  <span>
                    <strong className="text-text-primary">Send measurements.</strong>{' '}
                    We will send you the Capapie measurement sheet and check it with you
                    before the order goes in.
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold text-accent" aria-hidden="true">4.</span>
                  <span>
                    <strong className="text-text-primary">We quote and order.</strong>{' '}
                    You get a written quote covering the garment and lead time before
                    anything is confirmed.
                  </span>
                </li>
              </ol>

              <div className="flex flex-wrap gap-4">
                <a
                  href={mailtoUrl(
                    'Made-to-measure enquiry: Capapie Trap & Skeet',
                    "Hi Laferla Sports,\n\nI'd like to enquire about a made-to-measure Capapie Trap & Skeet garment.\n\nModel of interest:\nDiscipline (Trap / Skeet):\nPreferred colours:\n\nThanks,"
                  )}
                  className="btn btn-primary"
                >
                  Enquire About Made-to-Measure
                </a>
                <a
                  href={mailtoUrl(
                    'Sizing assistance: Capapie Trap & Skeet',
                    'Hi Laferla Sports,\n\nCould you help me with sizing for the Capapie Trap & Skeet range?\n\nProduct:\nUsual size:\n\nThanks,'
                  )}
                  className="btn btn-secondary"
                >
                  Request Sizing Assistance
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <VestMaterialTable heading="Trap &amp; Skeet vest material table" />
          </div>
        </section>

        {/* Bags & accessories */}
        <section className="mb-20" aria-labelledby="bags-heading">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 id="bags-heading" className="heading-3 text-text-primary">
              Bags, shell carriers &amp; accessories
            </h2>
            <Link
              href="/shop/shotgun/bags"
              className="text-sm font-semibold uppercase tracking-wide text-accent hover:underline"
            >
              View all bags →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[...bags.slice(0, 2), ...accessories.slice(0, 2)].map((product) => (
              <CapapieProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>

        {/* Why Capapie / Laferla Sports */}
        <section className="mb-20" aria-labelledby="why-heading">
          <h2 id="why-heading" className="heading-3 mb-8 text-text-primary">
            Why Capapie and Laferla Sports
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {WHY_POINTS.map((point) => (
              <div
                key={point.title}
                className="rounded-lg border border-dark-border bg-dark-lighter p-6"
              >
                <h3 className="mb-3 font-bold uppercase tracking-wide text-text-primary">
                  {point.title}
                </h3>
                <p className="leading-relaxed text-text-secondary">{point.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sizing & FAQ pointer + CTA */}
        <section className="rounded-lg border border-dark-border bg-dark-lighter p-8 md:p-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div>
              <h2 className="heading-3 mb-4 text-text-primary">Sizing &amp; fit</h2>
              <p className="mb-4 leading-relaxed text-text-secondary">
                Shooting vests and inners are worn close to the body, so fit matters more
                than usual. Measure over the layers you actually shoot in, keep the tape
                level, and send us the numbers if you are between sizes — we will
                recommend standard sizing or made to measure.
              </p>
              <Link
                href="/faq"
                className="text-sm font-semibold uppercase tracking-wide text-accent hover:underline"
              >
                Read the FAQ →
              </Link>
            </div>

            <div>
              <h2 className="heading-3 mb-4 text-text-primary">Request a quote</h2>
              <p className="mb-6 leading-relaxed text-text-secondary">
                Pricing on the Capapie Trap and Skeet range is quote based. Add the items
                you want to your quote request and we will confirm price, sizing and
                availability by email.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/shop/shotgun/vests" className="btn btn-primary">
                  Start with a Vest
                </Link>
                <Link href="/contact" className="btn btn-secondary">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
