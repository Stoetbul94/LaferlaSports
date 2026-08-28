import { DisplayProduct } from '@/types/product-data';
import { Crumb } from '@/components/BreadcrumbJsonLd';
import { categoryToSlug } from './category-slug';
import { shotgunCategorySlugForName } from './shotgun-categories';

export const SHOTGUN_COLLECTION_LABEL = 'Trap & Skeet';
export const SHOTGUN_COLLECTION_PATH = '/shop/shotgun';

export const ISSF_COLLECTION_LABEL = 'ISSF / Precision';
export const ISSF_COLLECTION_PATH = '/shop/issf';

/**
 * Breadcrumb trail for a product detail page.
 *
 * Both disciplines carry a collection level between Shop and the category, so
 * the two landing pages accumulate internal links from every product beneath
 * them: Shop / <Discipline> / <Category> / <Product>.
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
    { name: ISSF_COLLECTION_LABEL, href: ISSF_COLLECTION_PATH },
    { name: product.category, href: `/shop/${categoryToSlug(product.category)}` },
    { name: product.name },
  ];
}
