import { ORG, SITE_URL, SITE_DESCRIPTION } from '@/lib/seo';

export default function OrganizationJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'Store'],
    name: ORG.name,
    legalName: ORG.legalName,
    url: ORG.url,
    logo: ORG.logo,
    image: ORG.logo,
    email: ORG.email,
    description: SITE_DESCRIPTION,
    areaServed: { '@type': 'Country', name: 'South Africa' },
    brand: { '@type': 'Brand', name: 'Capapie' },
    contactPoint: {
      '@type': 'ContactPoint',
      email: ORG.email,
      contactType: 'customer support',
      areaServed: 'ZA',
      availableLanguage: ['en'],
    },
  };

  const websiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: ORG.name,
    url: SITE_URL,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} />
    </>
  );
}
