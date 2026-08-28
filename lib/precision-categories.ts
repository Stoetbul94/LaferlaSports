/**
 * SEO copy for the precision (ISSF) category pages.
 *
 * These categories come from the scraped catalogue and are routed at the flat
 * /shop/<slug> namespace, so this file only layers presentation and metadata on
 * top of the existing names — it does not define the taxonomy and must not
 * change any slug. Categories without an entry fall back to a generic heading.
 */
export interface PrecisionCategoryMeta {
  /** Must match the `category` value on the scraped products exactly. */
  name: string;
  /** Visible H1. Defaults to `name` when omitted. */
  heading: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
}

export const PRECISION_CATEGORIES: PrecisionCategoryMeta[] = [
  {
    name: 'Jackets & Trousers',
    heading: 'ISSF Shooting Jackets & Trousers',
    metaTitle: 'ISSF Shooting Jackets & Trousers South Africa | Capapie',
    metaDescription:
      'Capapie shooting jackets and trousers for ISSF rifle and pistol disciplines, in canvas and leather, standard sizes or made to measure. Supplied in South Africa by Laferla Sports.',
    intro:
      'Shooting jackets and trousers built for ISSF rifle and pistol disciplines. The stiffened canvas and leather construction supports position holding in prone, standing and kneeling, and every model is cut to the equipment rules that govern competition apparel. Available in standard sizes or made to measure — send us your measurements with a quote request and we will confirm the fit.',
  },
  {
    name: 'Inners',
    heading: 'Shooting Inners & Base Layers',
    metaTitle: 'Shooting Inners & Base Layers South Africa | Capapie',
    metaDescription:
      'Capapie shooting inners and base layers worn under an ISSF shooting jacket and trousers. Supplied across South Africa by Laferla Sports.',
    intro:
      'Base layers worn under a shooting jacket and trousers. Inners manage moisture and give the outer garment a consistent surface to sit against, which helps a position repeat shot to shot. Match the inner size to your jacket and trouser size.',
  },
  {
    name: 'Gloves',
    heading: 'Shooting Gloves',
    metaTitle: 'Shooting Gloves South Africa | Capapie',
    metaDescription:
      'Capapie shooting gloves for ISSF rifle and pistol shooters, including cut-finger and trigger gloves. Supplied in South Africa by Laferla Sports.',
    intro:
      'Support-hand and trigger gloves for target shooting. Padding and grip are designed to steady the rifle on the hand stop and sling without dulling trigger feel. Send us your hand measurements with a quote request and we will confirm sizing.',
  },
  {
    name: 'Shoes',
    heading: 'Target Shooting Shoes',
    metaTitle: 'Target Shooting Shoes South Africa | Capapie',
    metaDescription:
      'Capapie rifle and pistol target shooting shoes with flat, stable soles for competition positions. Supplied in South Africa by Laferla Sports.',
    intro:
      'Flat-soled shooting shoes that give a stable, repeatable base in the standing and kneeling positions. Sizing runs snug compared with street shoes — give us your foot length in millimetres and your usual EU size when requesting a quote.',
  },
  {
    name: 'Bags',
    heading: 'Shooting Bags & Cases',
    metaTitle: 'Shooting Bags & Rifle Cases South Africa | Capapie',
    metaDescription:
      'Capapie kit bags, range bags and rifle cases for transporting competition shooting equipment. Supplied in South Africa by Laferla Sports.',
    intro:
      'Kit bags, range bags and cases for moving equipment between home, the range and competition. Sized around shooting jackets, trousers, rifles and the accessories that travel with them.',
  },
  {
    name: 'Accessories',
    heading: 'Target Shooting Accessories',
    metaTitle: 'Target Shooting Accessories South Africa | Capapie',
    metaDescription:
      'Capapie target shooting accessories including kneeling rolls, shooting mats, slings, stands, belts and caps. Supplied in South Africa by Laferla Sports.',
    intro:
      'The supporting equipment that surrounds a shooting position — kneeling rolls, mats, slings, rifle stands, belts, caps and range essentials. Individual items vary in whether they fall under ISSF equipment rules, so ask us if you need a specific piece checked against current regulations before a competition.',
  },
];

const BY_NAME = new Map(PRECISION_CATEGORIES.map((c) => [c.name, c]));

export function precisionCategoryMeta(name: string): PrecisionCategoryMeta | undefined {
  return BY_NAME.get(name);
}
