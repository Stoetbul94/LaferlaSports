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

/** Pre-filled email enquiry for a specific product. */
export function productMailtoUrl(opts: { name: string; sku: string; url?: string }): string {
  const body = [
    `Hi Laferla Sports,`,
    '',
    `I'd like a quote / more information on:`,
    `${opts.name} (SKU ${opts.sku})`,
    opts.url ? `\n${opts.url}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  return mailtoUrl(`Enquiry: ${opts.name} (SKU ${opts.sku})`, body);
}
