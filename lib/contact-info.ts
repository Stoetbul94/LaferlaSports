/**
 * Single source of truth for business contact details.
 * Email is the only public enquiry channel.
 */
export const CONTACT_EMAIL = 'info@laferlasports.com';

/** Builds a mailto link with an optional pre-filled subject and body. */
export function mailtoUrl(subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString();
  return `mailto:${CONTACT_EMAIL}${query ? `?${query}` : ''}`;
}

/**
 * Pre-filled email enquiry for a specific product.
 * `sku` is optional: Capapie does not publish item codes for every range.
 */
export function productMailtoUrl(opts: { name: string; sku?: string; url?: string }): string {
  const label = opts.sku ? `${opts.name} (SKU ${opts.sku})` : opts.name;
  const body = [
    `Hi Laferla Sports,`,
    '',
    `I'd like a quote / more information on:`,
    label,
    opts.url ? `\n${opts.url}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  return mailtoUrl(`Enquiry: ${label}`, body);
}
