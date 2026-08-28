/**
 * Single source of truth for business contact details.
 * Email is the only public enquiry channel.
 */
export const CONTACT_EMAIL = 'info@laferlasports.com';

/**
 * Builds a mailto link with an optional pre-filled subject and body.
 *
 * Uses encodeURIComponent rather than URLSearchParams: the latter encodes spaces
 * as "+", which mail clients render literally in a mailto query rather than
 * decoding back to a space (RFC 6068 expects percent-encoding).
 */
export function mailtoUrl(subject?: string, body?: string): string {
  const query = [
    subject ? `subject=${encodeURIComponent(subject)}` : '',
    body ? `body=${encodeURIComponent(body)}` : '',
  ]
    .filter(Boolean)
    .join('&');

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
