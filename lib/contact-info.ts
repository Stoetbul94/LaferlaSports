/**
 * Single source of truth for business contact details.
 */
export const PHONE_E164 = '+27834573392';
export const PHONE_DISPLAY = '+27 83 457 3392';
export const WHATSAPP_NUMBER = '27834573392';
export const CONTACT_EMAIL = 'info@laferlasports.co.za';

/** Builds a wa.me deep link with an optional pre-filled message. */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Pre-filled WhatsApp enquiry for a specific product. */
export function productWhatsappUrl(opts: { name: string; sku: string; url?: string }): string {
  const lines = [
    `Hi Laferla Sports, I'd like a quote / more info on:`,
    `• ${opts.name} (SKU ${opts.sku})`,
  ];
  if (opts.url) lines.push('', opts.url);
  return whatsappUrl(lines.join('\n'));
}
