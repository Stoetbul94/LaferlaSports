import { DisplayProduct } from '@/types/product-data';
import { Crumb } from '@/components/BreadcrumbJsonLd';
import { categoryToSlug } from './category-slug';
import { shotgunCategorySlugForName } from './shotgun-categories';

export const SHOTGUN_COLLECTION_LABEL = 'Trap & Skeet';
export const SHOTGUN_COLLECTION_PATH = '/shop/shotgun';

/**
 * Breadcrumb trail for a product detail page.
 *
 * Precision products keep the existing flat trail (Shop / Category / Product).
 * Shotgun products gain the collection level (Shop / Trap & Skeet / Category / Product).
 */
export function productBreadcrumbs(product: DisplayProduct): Crumb[] {
  if (product.discipline === 'shotgun') {
    const categorySlug = shotgunCategorySlugForName(product.category);
    return [
      { name: 'Shop', href: '/shop' },
      { name: SHOTGUN_COLLECTION_LABEL, href: SHOTGUN_COLLECTION_PATH },
      ...(categorySlug
        ? [
            {
              name: product.category,
              href: `${SHOTGUN_COLLECTION_PATH}/${categorySlug}`,
            },
          ]
        : []),
      { name: product.name },
    ];
  }

  return [
    { name: 'Shop', href: '/shop' },
    { name: product.category, href: `/shop/${categoryToSlug(product.category)}` },
    { name: product.name },
  ];
}
