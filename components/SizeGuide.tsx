import { mailtoUrl } from '@/lib/contact-info';

/**
 * Sizing + fit help shown on product pages.
 * For apparel categories it renders a collapsible measurement guide (ISSF apparel
 * fit is deliberately firm, so fit guidance reduces wrong-size enquiries/returns).
 * For other categories it just shows any sizing/dimension text from the catalogue.
 *
 * Uses native <details> so it works without JavaScript.
 */
const APPAREL = new Set(['Jackets & Trousers', 'Gloves', 'Shoes', 'Inners']);

const MEASUREMENT_TIPS: Record<string, string[]> = {
  'Jackets & Trousers': [
    'Chest: measure around the fullest part, keeping the tape level under the arms.',
    'Height & weight help us confirm the closest stock size.',
    'Capapie jackets/trousers fit firm by design for ISSF stability — size for your shooting stance, not everyday wear.',
  ],
  Gloves: [
    'Hand circumference: measure around the palm (excluding thumb) at the knuckles.',
    'Hand length: from the base of the palm to the tip of the middle finger.',
    'Note your dominant (support) hand.',
  ],
  Shoes: [
    'Measure foot length in mm (heel to longest toe) and give your usual EU size.',
    'Flat shooting soles fit snug — a half size up is common over street shoes.',
  ],
  Inners: ['Match the inner size to your jacket/trouser size.'],
};

export default function SizeGuide({ category, sizing }: { category: string; sizing?: string }) {
  const isApparel = APPAREL.has(category);

  if (!isApparel) {
    if (!sizing) return null;
    return (
      <div className="mb-8">
        <p className="text-sm uppercase tracking-wide text-text-secondary">{sizing}</p>
      </div>
    );
  }

  const tips = MEASUREMENT_TIPS[category] || [];
  const fitMailto = mailtoUrl(
    `Sizing help — ${category}`,
    `Hi Laferla Sports,\n\nI need help with sizing/fit for a ${category} item.\n\nMy measurements are:\n`
  );

  return (
    <details className="group mb-8 rounded-lg border border-dark-border bg-dark-lighter">
      <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-bold uppercase tracking-wide text-text-primary">
        <span className="flex items-center gap-2">
          <svg className="h-4 w-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Size &amp; Fit Guide
        </span>
        <svg className="h-4 w-4 transition-transform duration-200 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </summary>

      <div className="space-y-4 border-t border-dark-border px-5 py-5">
        {sizing && (
          <p className="text-sm uppercase tracking-wide text-text-secondary">{sizing}</p>
        )}

        <div>
          <p className="mb-2 text-sm font-semibold text-text-primary">How to measure</p>
          <ul className="space-y-2">
            {tips.map((tip, i) => (
              <li key={i} className="flex text-sm leading-relaxed text-text-secondary">
                <span className="mr-2 flex-shrink-0 text-accent">▸</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm leading-relaxed text-text-secondary">
          Not sure of your size? Send us your measurements and we&apos;ll recommend the right fit
          before you order.
        </p>

        <a
          href={fitMailto}
          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-accent hover:underline"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Email us for a fit recommendation
        </a>
      </div>
    </details>
  );
}
