import { DisplayProduct } from '@/types/product-data';
import { SITE_NAME, absoluteUrl } from '@/lib/seo';

interface ProductJsonLdProps {
  product: DisplayProduct;
}

export default function ProductJsonLd({ product }: ProductJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    sku: product.product_code,
    mpn: product.product_code,
    category: product.category,
    description: product.short_description || product.long_description || product.name,
    image: product.images.map((img) => absoluteUrl(img)),
    brand: { '@type': 'Brand', name: 'Capapie' },
    url: absoluteUrl(`/shop/${product.slug}`),
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'ZAR',
      price: '0',
      url: absoluteUrl(`/shop/${product.slug}`),
      seller: { '@type': 'Organization', name: SITE_NAME },
      // Pricing is quote-based; contact the dealer for a quote.
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'ZAR',
        valueAddedTaxIncluded: true,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
