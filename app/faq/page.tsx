import type { Metadata } from 'next';
import Link from 'next/link';
import { mailtoUrl, CONTACT_EMAIL } from '@/lib/contact-info';

export const metadata: Metadata = {
  title: 'FAQ — Ordering, Sizing & Delivery',
  description:
    'Common questions about ordering Capapie ISSF and Trap & Skeet shooting equipment from Laferla Sports — quotes, made-to-measure vests, sizing, delivery across South Africa and coaching.',
  alternates: { canonical: '/faq' },
};

interface QA {
  q: string;
  a: string;
}

const FAQS: QA[] = [
  {
    q: 'Are you an authorised Capapie dealer?',
    a: 'Yes. Laferla Sports is the authorised Capapie dealer in South Africa, supplying genuine, warranty-backed ISSF competition equipment.',
  },
  {
    q: 'How do I place an order?',
    a: "Add the items you're interested in to a quote request, or email us with the product name and SKU. We reply with current pricing, availability and lead time, then confirm your order.",
  },
  {
    q: "Why aren't prices shown on the website?",
    a: 'Pricing on imported competition equipment moves with exchange rates and supplier costs, so we quote per request to make sure you always get an accurate, up-to-date price.',
  },
  {
    q: 'What are the delivery times?',
    a: 'Items we hold in stock are dispatched promptly. Indent (imported-to-order) items take longer — we confirm the exact lead time on your quote before you commit.',
  },
  {
    q: 'Do you deliver across South Africa?',
    a: 'Yes. We courier nationwide across South Africa. Delivery is arranged once your order and address are confirmed.',
  },
  {
    q: 'Is the equipment ISSF compliant?',
    a: 'All Capapie precision competition apparel and equipment is manufactured to International Shooting Sport Federation (ISSF) rules and specifications. The Trap & Skeet range is built for competitive shotgun shooting; check your governing body’s current rules for any event-specific requirements.',
  },
  {
    q: 'Do you supply Trap and Skeet shotgun equipment?',
    a: 'Yes. We supply the full Capapie Trap & Skeet range in South Africa — CAPIVEST shooting vests, performance inners, cartridge bags and shell carriers, side blinders, protective shotgun covers and casual wear. Browse the Trap & Skeet collection in the shop.',
  },
  {
    q: 'Can I order a made-to-measure shooting vest?',
    a: 'Yes. Every Capapie CAPIVEST and shooting inner is available in standard sizes or made to measure. You choose your fabric, suede, mesh, lycra, binding and cord piping colours from the manufacturer material table, then we send you the Capapie measurement sheet and quote the garment and lead time before anything is confirmed.',
  },
  {
    q: 'What is a shotgun sock?',
    a: 'A shotgun sock is a stretchable protective sleeve that slides over the length of a shotgun to guard the barrel and stock against knocks, dust and scratches in transit and storage. Despite the name, it is a gun cover — not footwear.',
  },
  {
    q: 'How do I choose the right size?',
    a: 'Each apparel product page includes a Size & Fit Guide. ISSF apparel fits firm by design — if you are unsure, email us your measurements and we will recommend the right size before you order.',
  },
  {
    q: 'What if the fit or item is not right?',
    a: 'Contact us as soon as possible after delivery. We will advise on exchange options — getting the fit right up front (via the size guide) is the best way to avoid issues.',
  },
  {
    q: 'Do you offer coaching?',
    a: 'Yes. Bernard Laferla is a C-Level ISSF Rifle Coach offering coaching across air rifle, smallbore and 3-positional disciplines. Submit a coaching enquiry on the Coaching page.',
  },
  {
    q: 'How can I contact you?',
    a: `Email us at ${CONTACT_EMAIL} or use the contact form on the website. We reply to all enquiries as quickly as possible during business hours.`,
  },
];

export default function FaqPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="section-padding bg-dark">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container-custom">
        <div className="mx-auto max-w-3xl">
          <h1 className="heading-1 mb-6 text-text-primary">Frequently Asked Questions</h1>
          <p className="text-body mb-12 text-lg">
            Quick answers on ordering, pricing, sizing, delivery and coaching. Can&apos;t find what
            you need?{' '}
            <a
              href={mailtoUrl('Question for Laferla Sports')}
              className="text-accent hover:underline"
            >
              Email us
            </a>{' '}
            or{' '}
            <Link href="/contact" className="text-accent hover:underline">
              get in touch
            </Link>
            .
          </p>

          <div className="space-y-4">
            {FAQS.map((f, i) => (
              <details
                key={i}
                className="group rounded-lg border border-dark-border bg-dark-lighter"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-5 text-lg font-bold text-text-primary">
                  {f.q}
                  <svg
                    className="ml-4 h-5 w-5 flex-shrink-0 text-accent transition-transform duration-200 group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="border-t border-dark-border px-6 py-5 text-text-secondary leading-relaxed">
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
