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
    telephone: ORG.telephone,
    description: SITE_DESCRIPTION,
    areaServed: { '@type': 'Country', name: 'South Africa' },
    address: { '@type': 'PostalAddress', addressCountry: 'ZA' },
    brand: { '@type': 'Brand', name: 'Capapie' },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: ORG.telephone,
      email: ORG.email,
      contactType: 'sales',
      areaServed: 'ZA',
      availableLanguage: ['en'],
    },
    sameAs: ORG.sameAs,
  };

  const websiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: ORG.name,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/shop?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} />
    </>
  );
}
