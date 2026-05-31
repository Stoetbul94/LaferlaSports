/**
 * Central SEO configuration for Laferla Sports.
 * Update SITE_URL once the production domain is confirmed.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.laferlasports.co.za').replace(/\/$/, '');

export const SITE_NAME = 'Laferla Sports';

export const SITE_DESCRIPTION =
  "South Africa's authorised Capapie dealer for ISSF shooting sports equipment — competition jackets, trousers, gloves, shoes and accessories for air rifle and target rifle shooters.";

export const ORG = {
  name: SITE_NAME,
  legalName: 'Laferla Sports',
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  email: 'info@laferlasports.co.za',
  country: 'ZA',
  sameAs: [] as string[],
};

export function absoluteUrl(path: string): string {
  if (!path) return SITE_URL;
  if (path.startsWith('http')) return path;
  return `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}
