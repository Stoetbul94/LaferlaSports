import type { MetadataRoute } from 'next';
import { getAllProducts, getPrecisionCategories } from '@/lib/catalog';
import { SHOTGUN_CATEGORIES } from '@/lib/shotgun-categories';
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

  const collectionLandings = [
    { url: `${SITE_URL}/shop/issf`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${SITE_URL}/shop/shotgun`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 },
  ];

  const categoryRoutes = getPrecisionCategories().map((category) => ({
    url: `${SITE_URL}/shop/${categoryToSlug(category)}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const shotgunCategoryRoutes = SHOTGUN_CATEGORIES.map((category) => ({
    url: `${SITE_URL}/shop/shotgun/${category.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const productRoutes = getAllProducts().map((product) => ({
    url: `${SITE_URL}/shop/${product.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...collectionLandings,
    ...categoryRoutes,
    ...shotgunCategoryRoutes,
    ...productRoutes,
  ];
}
