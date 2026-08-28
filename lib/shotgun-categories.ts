/**
 * Subcategory taxonomy for the Capapie Trap & Skeet (shotgun) range.
 *
 * These live under /shop/shotgun/<slug> rather than the flat /shop/<slug>
 * category namespace used by the precision catalogue, so that shotgun
 * categories can share names with precision ones ("Accessories", "Inners")
 * without colliding.
 */
export interface ShotgunCategory {
  /** Route segment under /shop/shotgun/ */
  slug: string;
  /** Value stored on each product's `category` field */
  name: string;
  /** Short label for nav/tiles */
  shortName: string;
  heading: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  /** Representative image for category tiles */
  image: string;
  imageAlt: string;
  /** Optional wide lifestyle banner shown at the top of the category page. */
  heroImage?: string;
  heroImageAlt?: string;
}

export const SHOTGUN_CATEGORIES: ShotgunCategory[] = [
  {
    slug: 'vests',
    name: 'Shooting Vests',
    shortName: 'Shooting Vests',
    heading: 'Trap & Skeet Shooting Vests',
    metaTitle: 'Trap & Skeet Shooting Vests South Africa | Capapie',
    metaDescription:
      'Capapie CAPIVEST competition shooting vests for Trap and Skeet, available in standard sizes and made to measure. Supplied in South Africa by Laferla Sports.',
    intro:
      'Competition shooting vests for Trap and Skeet shooters, including Capapie made-to-measure options supplied by Laferla Sports in South Africa. Every CAPIVEST is built around ventilation, moisture management, stretch panelling and an integrated recoil pad, in standard sizes or made to measure.',
    image: '/images/products/shotgun/capapie-capivest-01-shotgun-vest-front.webp',
    imageAlt: 'Capapie CAPIVEST 01 Trap and Skeet shooting vest, front view',
    heroImage: '/images/products/shotgun/shotgun-competition-shooters.webp',
    heroImageAlt:
      'Two competitive shooters wearing Capapie Trap and Skeet shooting vests on the range',
  },
  {
    slug: 'inners',
    name: 'Shotgun Inners',
    shortName: 'Inners',
    heading: 'Trap & Skeet Shooting Inners',
    metaTitle: 'Trap & Skeet Shooting Inners | Capapie South Africa',
    metaDescription:
      'Capapie CAPIFLEX, CAPIFLEX+ and Pro poly-spandex shooting inners in half and full sleeve, for Trap and Skeet shooters. Available from Laferla Sports in South Africa.',
    intro:
      'Poly-spandex base layers worn under a shooting vest. Each inner is offered in half sleeve and full sleeve, in standard sizes or made to measure, with a different fabric weight to suit conditions.',
    image: '/images/products/shotgun/capapie-capiflex-inner-full-sleeve.webp',
    imageAlt: 'Capapie Capiflex shooting inner, full sleeve',
    heroImage: '/images/products/shotgun/shotgun-inners-lifestyle.webp',
    heroImageAlt: 'Shooters wearing Capapie poly-spandex shooting inners',
  },
  {
    slug: 'accessories',
    name: 'Shotgun Accessories',
    shortName: 'Accessories',
    heading: 'Trap & Skeet Shooting Accessories',
    metaTitle: 'Trap & Skeet Shooting Accessories | Capapie South Africa',
    metaDescription:
      'Capapie Trap and Skeet shooting accessories including shooting gloves, caps and cotton ankle socks. Request a quote from Laferla Sports in South Africa.',
    intro:
      'Range-day accessories for shotgun shooters, from grip-backed Trap shooting gloves to caps and technical socks.',
    image: '/images/products/shotgun/capapie-trap-shooting-gloves.webp',
    imageAlt: 'Capapie Trap shooting gloves with silicon grip palm',
    heroImage: '/images/products/shotgun/shotgun-accessories-lifestyle.webp',
    heroImageAlt: 'Shotgun shooter wearing Capapie Trap shooting gloves on the gun',
  },
  {
    slug: 'bags',
    name: 'Bags & Shell Carriers',
    shortName: 'Bags & Shell Carriers',
    heading: 'Shotgun Bags & Shell Carriers',
    metaTitle: 'Shotgun Bags & Shell Carriers | Capapie South Africa',
    metaDescription:
      'Capapie ammunition bags, shell pouches, box carriers and roller gun bags for Trap and Skeet shooters. Supplied in South Africa by Laferla Sports.',
    intro:
      'Cartridge bags, shell pouches and box carriers built for the Trap and Skeet line, plus a padded roller bag for travelling to competition.',
    image: '/images/products/shotgun/capapie-ammo-bag.webp',
    imageAlt: 'Capapie ammo bag for Trap and Skeet cartridges',
  },
  {
    slug: 'blinders',
    name: 'Blinders & Towels',
    shortName: 'Blinders & Towels',
    heading: 'Shooting Side Blinders & Towels',
    metaTitle: 'Shooting Side Blinders & Towels | Capapie South Africa',
    metaDescription:
      'Capapie side blinders that reduce glare and help maintain focus, plus the Capapie hand towel. Available from Laferla Sports in South Africa.',
    intro:
      'Side blinders that cut peripheral distraction and glare on the stand, plus a high-absorbency range towel.',
    image: '/images/products/shotgun/capapie-target-side-blinder.webp',
    imageAlt: 'Capapie target side blinder for shooting glasses',
  },
  {
    slug: 'gun-covers',
    name: 'Shotgun Socks & Gun Covers',
    shortName: 'Shotgun Socks & Gun Covers',
    heading: 'Shotgun Socks & Gun Covers',
    metaTitle: 'Shotgun Socks & Gun Covers | Capapie South Africa',
    metaDescription:
      'Capapie shotgun socks: lightweight stretchable protective gun covers for Trap and Skeet shotguns. Request a quote from Laferla Sports in South Africa.',
    intro:
      'Shotgun socks are stretchable protective sleeves that slip over a shotgun to guard it in transit and storage. They are gun covers, not footwear.',
    image: '/images/products/shotgun/capapie-shotgun-socks.webp',
    imageAlt: 'Capapie stretchable shotgun sock protective gun cover',
  },
  {
    slug: 'casual-wear',
    name: 'Casual Wear',
    shortName: 'Casual Wear',
    heading: 'Capapie Casual Wear',
    metaTitle: 'Capapie Shooting Casual Wear | South Africa',
    metaDescription:
      'Capapie casual wear for shooters — cotton tees, polos, shirts and an insulated jacket for on and off the range. Supplied by Laferla Sports in South Africa.',
    intro:
      'Off-the-line clothing for shooters: cotton tees and polos, a cotton-linen shirt and an insulated jacket for cold range days.',
    image: '/images/products/shotgun/capapie-pure-aim-tee.webp',
    imageAlt: 'Capapie Pure Aim cotton tee for shooters',
    heroImage: '/images/products/shotgun/shotgun-casual-wear-lifestyle.webp',
    heroImageAlt: 'Shooters wearing Capapie casual wear off the range',
  },
];

export function getShotgunCategory(slug: string): ShotgunCategory | undefined {
  return SHOTGUN_CATEGORIES.find((c) => c.slug === slug);
}

/** Maps a product's `category` value back to its route slug. */
export function shotgunCategorySlugForName(name: string): string {
  return SHOTGUN_CATEGORIES.find((c) => c.name === name)?.slug ?? '';
}
