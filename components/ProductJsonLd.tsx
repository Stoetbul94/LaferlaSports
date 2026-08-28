import { DisplayProduct } from '@/types/product-data';
import { absoluteUrl } from '@/lib/seo';

interface ProductJsonLdProps {
  product: DisplayProduct;
}

export default function ProductJsonLd({ product }: ProductJsonLdProps) {
  const url = absoluteUrl(`/shop/${product.slug}`);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    // Only emit an identifier where the manufacturer actually publishes one.
    ...(product.product_code
      ? { sku: product.product_code, mpn: product.product_code }
      : {}),
    category: product.category,
    description: product.short_description || product.long_description || product.name,
    image: product.images.map((img) => absoluteUrl(img)),
    brand: { '@type': 'Brand', name: product.brand || 'Capapie' },
    url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
