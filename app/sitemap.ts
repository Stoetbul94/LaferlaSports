import type { MetadataRoute } from 'next';
import { getAllCapapieProducts, getCapapieCategories } from '@/lib/capapie-products';
import { categoryToSlug } from '@/lib/category-slug';
import { SITE_URL } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = ['', '/shop', '/coaching', '/about', '/capapie', '/shipping', '/faq', '/contact', '/legal', '/privacy'].map(
    (route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.7,
    })
  );

  const categoryRoutes = getCapapieCategories().map((category) => ({
    url: `${SITE_URL}/shop/${categoryToSlug(category)}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const productRoutes = getAllCapapieProducts().map((product) => ({
    url: `${SITE_URL}/shop/${product.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
