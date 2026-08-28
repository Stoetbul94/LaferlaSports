/**
 * Central SEO configuration for Laferla Sports.
 * Canonical host; override per-environment with NEXT_PUBLIC_SITE_URL.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.laferlasports.com').replace(/\/$/, '');

export const SITE_NAME = 'Laferla Sports';

export const SITE_DESCRIPTION =
  "South Africa's authorised Capapie dealer for competitive shooting equipment — ISSF jackets, trousers, gloves and shoes, plus made-to-measure Trap & Skeet shotgun vests, inners, bags and accessories.";

export const ORG = {
  name: SITE_NAME,
  legalName: 'Laferla Sports',
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  email: 'info@laferlasports.com',
  country: 'ZA',
  sameAs: [] as string[],
};

export function absoluteUrl(path: string): string {
  if (!path) return SITE_URL;
  if (path.startsWith('http')) return path;
  return `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}
