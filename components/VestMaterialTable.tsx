import { VEST_MATERIALS } from '@/lib/vest-materials';

interface VestMaterialTableProps {
  /** Optional heading override. Pass null to render the table on its own. */
  heading?: string | null;
  description?: string;
}

/**
 * Trap & Skeet vest material and colour options, as published by Capapie.
 * Scrolls horizontally on narrow screens rather than overflowing the page.
 */
export default function VestMaterialTable({
  heading = 'Material & Colour Options',
  description = 'Made-to-measure CAPIVEST orders can be specified in the following manufacturer colourways. Availability is set by Capapie and may change between production runs.',
}: VestMaterialTableProps) {
  return (
    <section aria-labelledby={heading ? 'vest-materials-heading' : undefined}>
      {heading && (
        <h2
          id="vest-materials-heading"
          className="font-bold text-xl mb-4 text-text-primary uppercase tracking-wide"
        >
          {heading}
        </h2>
      )}

      {description && (
        <p className="text-text-secondary mb-6 leading-relaxed">{description}</p>
      )}

      <div className="overflow-x-auto rounded-lg border border-dark-border">
        <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
          <caption className="sr-only">
            Capapie Trap and Skeet vest materials and the colours available in each
          </caption>
          <thead>
            <tr className="bg-dark-lighter">
              <th
                scope="col"
                className="px-4 py-3 font-bold uppercase tracking-wide text-text-primary"
              >
                Material
              </th>
              <th
                scope="col"
                className="px-4 py-3 font-bold uppercase tracking-wide text-text-primary"
              >
                Available Colours
              </th>
            </tr>
          </thead>
          <tbody>
            {VEST_MATERIALS.map((row) => (
              <tr key={row.material} className="border-t border-dark-border align-top">
                <th
                  scope="row"
                  className="px-4 py-3 font-semibold text-text-primary whitespace-nowrap"
                >
                  {row.material}
                </th>
                <td className="px-4 py-3 text-text-secondary">
                  {row.colours.join(' · ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
