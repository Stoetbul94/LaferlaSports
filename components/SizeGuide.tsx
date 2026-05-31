import { whatsappUrl } from '@/lib/contact-info';

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
  const waMsg = `Hi Laferla Sports, I need help with sizing/fit for a ${category} item. My measurements are:`;

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
          href={whatsappUrl(waMsg)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[#25D366] hover:underline"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.821 11.821 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.739-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
          Get a fit recommendation
        </a>
      </div>
    </details>
  );
}
