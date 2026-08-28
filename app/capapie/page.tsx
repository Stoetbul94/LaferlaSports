import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ISSF_COLLECTION_PATH, SHOTGUN_COLLECTION_PATH } from '@/lib/breadcrumbs';
import { getPrecisionProducts } from '@/lib/catalog';
import { getShotgunProducts } from '@/lib/shotgun-products';
import { mailtoUrl } from '@/lib/contact-info';

export const metadata = {
  title: 'Capapie South Africa | Shooting Equipment & Apparel',
  description:
    'Capapie competition shooting equipment supplied in South Africa by Laferla Sports — ISSF shooting jackets, trousers, gloves and shoes, plus Trap and Skeet vests and accessories, with made-to-measure options.',
  alternates: { canonical: '/capapie' },
  openGraph: {
    title: 'Capapie Shooting Equipment in South Africa | Laferla Sports',
    description:
      'Laferla Sports is your Capapie dealer in South Africa, supplying ISSF and Trap & Skeet competition shooting apparel, accessories and made-to-measure options.',
    type: 'website',
  },
};

const STRENGTHS = [
  {
    title: 'Built for competition',
    body: 'Capapie develops its range with competitive shooters, focusing on the details that decide a score — position stability, consistent fit, breathability and hardware that survives a full season.',
  },
  {
    title: 'Two disciplines, one supplier',
    body: 'The range spans ISSF rifle and pistol apparel and the Trap & Skeet shotgun collection, so shooters who cross disciplines are not juggling multiple suppliers.',
  },
  {
    title: 'Made-to-measure options',
    body: 'Shooting jackets, trousers and Trap & Skeet vests can be ordered in standard sizes or cut to your measurements, which matters most where the garment has to hold a position.',
  },
  {
    title: 'Local supply and support',
    body: 'Laferla Sports handles sizing guidance, quotations, ordering and after-sales support from within South Africa, so you are not importing on your own account.',
  },
];

export default function CapapiePage() {
  const precisionCount = getPrecisionProducts().length;
  const shotgunCount = getShotgunProducts().length;

  return (
    <div className="section-padding bg-dark">
      <div className="container-custom">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs items={[{ name: 'Capapie' }]} />

          <h1 className="heading-1 mb-6 text-text-primary">
            Capapie Shooting Equipment in South Africa
          </h1>
          <p className="text-body mb-12 text-lg leading-relaxed">
            Laferla Sports is your Capapie dealer in South Africa, supplying the
            manufacturer&rsquo;s competition shooting range to clubs and individual
            shooters nationwide. That covers ISSF rifle and pistol apparel — shooting
            jackets, trousers, inners, gloves and shoes — alongside the Capapie Trap and
            Skeet collection of shooting vests, bags and accessories, with made-to-measure
            available across the apparel ranges.
          </p>

          <div className="mb-12 flex flex-wrap gap-4">
            <Link href={ISSF_COLLECTION_PATH} className="btn btn-primary">
              ISSF Equipment
            </Link>
            <Link href={SHOTGUN_COLLECTION_PATH} className="btn btn-secondary">
              Trap &amp; Skeet Equipment
            </Link>
          </div>

          <section className="mb-12">
            <h2 className="heading-3 mb-6 text-text-primary">About Capapie</h2>
            <p className="text-body mb-6 text-lg leading-relaxed">
              Capapie was founded in 2001 by Nilesh Rane and manufactures sportswear and
              equipment for competitive shooters. The company supplies customers
              internationally across both precision and shotgun disciplines, and develops
              its range around a stated focus on understanding the sport and helping
              shooters concentrate when it matters.
            </p>
            <p className="text-body text-lg leading-relaxed">
              Capapie is an apparel and equipment manufacturer. It does not produce
              firearms or ammunition — the range covers what the shooter wears and
              carries, from competition clothing through to bags, gun covers and range
              accessories.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="heading-3 mb-8 text-text-primary">
              Why buy Capapie from Laferla Sports
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {STRENGTHS.map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border border-dark-border bg-dark-lighter p-6"
                >
                  <h3 className="mb-3 text-xl font-bold uppercase tracking-wide text-text-primary">
                    {item.title}
                  </h3>
                  <p className="leading-relaxed text-text-secondary">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="heading-3 mb-6 text-text-primary">The Capapie range</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-dark-border bg-dark-lighter p-6">
                <h3 className="mb-3 text-xl font-bold uppercase tracking-wide text-text-primary">
                  ISSF / Precision
                </h3>
                <p className="mb-4 leading-relaxed text-text-secondary">
                  Equipment designed for ISSF rifle and pistol disciplines: shooting
                  jackets and trousers, inners, gloves, target shooting shoes, kit bags
                  and range accessories such as kneeling rolls, mats, slings and stands.
                </p>
                <p className="mb-4 text-sm text-text-muted">
                  {precisionCount} products currently listed.
                </p>
                <Link
                  href={ISSF_COLLECTION_PATH}
                  className="text-sm font-semibold uppercase tracking-wide text-accent hover:underline"
                >
                  Browse ISSF equipment →
                </Link>
              </div>

              <div className="rounded-lg border border-dark-border bg-dark-lighter p-6">
                <h3 className="mb-3 text-xl font-bold uppercase tracking-wide text-text-primary">
                  Trap &amp; Skeet / Shotgun
                </h3>
                <p className="mb-4 leading-relaxed text-text-secondary">
                  The Capapie shotgun collection: CAPIVEST competition shooting vests,
                  poly-spandex inners, cartridge bags and shell carriers, side blinders,
                  protective gun covers and casual wear.
                </p>
                <p className="mb-4 text-sm text-text-muted">
                  {shotgunCount} products currently listed.
                </p>
                <Link
                  href={SHOTGUN_COLLECTION_PATH}
                  className="text-sm font-semibold uppercase tracking-wide text-accent hover:underline"
                >
                  Browse Trap &amp; Skeet equipment →
                </Link>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="heading-3 mb-6 text-text-primary">
              Competition equipment rules
            </h2>
            <p className="text-body text-lg leading-relaxed">
              ISSF equipment rules govern shooting jackets, trousers, gloves and shoes,
              and they are revised from time to time. We will not tell you that every
              item in the catalogue is certified — the range also includes bags, caps and
              range accessories that fall outside those rules entirely. If you need a
              specific garment checked against the current regulations before a
              competition, ask us and we will confirm it with the manufacturer.
            </p>
          </section>

          <section className="rounded-lg border border-dark-border bg-dark-lighter p-8">
            <h2 className="heading-3 mb-4 text-text-primary">
              Request a quote or sizing help
            </h2>
            <p className="mb-8 leading-relaxed text-text-secondary">
              We do not publish prices online. Add the items you are interested in to a
              quote request, or email us directly with your discipline and measurements
              and we will recommend a specification.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop" className="btn btn-primary">
                Browse the shop
              </Link>
              <a
                href={mailtoUrl(
                  'Capapie equipment enquiry',
                  'Hi Laferla Sports,\n\nI would like advice on Capapie equipment.\n\nDiscipline:\nItems of interest:\nMeasurements:\n'
                )}
                className="btn btn-secondary"
              >
                Email an enquiry
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
