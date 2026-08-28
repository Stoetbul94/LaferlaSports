import { DisplayProduct, ProductColorOption } from '@/types/product-data';

/**
 * Capapie Trap & Skeet (shotgun) range.
 *
 * Hand-authored from the Capapie Trap & Skeet brochure (see
 * docs/shotgun-brochure-image-map.md). Unlike the precision catalogue in
 * lib/capapie-products.ts, this range is NOT scraped, so this file is the
 * source of truth and is safe to edit by hand.
 *
 * Content rules applied:
 *  - Every feature/description statement traces back to the brochure.
 *  - Capapie publishes no item codes for this range, so `product_code` is
 *    intentionally omitted rather than invented.
 *  - `made_to_measure` is set only for apparel (vests and inners), which the
 *    brochure explicitly offers in "standard sizes, made to measure".
 *  - No prices, stock levels, certifications or dimensions are stated.
 */

const IMAGE_BASE = '/images/products/shotgun';

interface ShotgunSeed {
  slug: string;
  name: string;
  category: string;
  short_description: string;
  long_description: string;
  features: string[];
  images: string[];
  image_alt: string;
  colors?: ProductColorOption[];
  sizing?: string;
  made_to_measure?: boolean;
  seo_title: string;
  seo_description: string;
}

const MTM_SIZING = 'Available in standard sizes and made to measure.';

/** Shared closing line so every quote-based product tells the customer what to do next. */
const QUOTE_LINE =
  'Laferla Sports supplies the Capapie Trap and Skeet range in South Africa. Add this item to a quote request and we will confirm pricing, sizing and availability.';

function vest(
  n: string,
  summary: string,
  features: string[],
  detail: string
): ShotgunSeed {
  const name = `Capapie CAPIVEST ${n} Trap & Skeet Shooting Vest`;
  const slug = `capapie-capivest-${n}`;
  return {
    slug,
    name,
    category: 'Shooting Vests',
    short_description: summary,
    long_description: `${detail} ${QUOTE_LINE}`,
    features,
    images: [
      `${IMAGE_BASE}/capapie-capivest-${n}-shotgun-vest-front.webp`,
      `${IMAGE_BASE}/capapie-capivest-${n}-shotgun-vest-back.webp`,
    ],
    image_alt: `Capapie CAPIVEST ${n} Trap and Skeet shooting vest, front and rear view`,
    sizing: MTM_SIZING,
    made_to_measure: true,
    seo_title: `Capapie CAPIVEST ${n} Trap & Skeet Shooting Vest`,
    seo_description: `${summary} Available in standard sizes and made to measure from Laferla Sports, South Africa.`,
  };
}

const VEST_DETAIL =
  'Part of the Capapie Trap and Skeet vest range, built for competitive shotgun shooters who need consistent shoulder placement, free arm movement and all-day comfort on the stand. Common features across the range include durable YKK zips, an advanced contoured recoil pad, anti-microbial performance fabric, thermoregulation and cooling, a soft silicon logo and a bib number clip.';

const VESTS: ShotgunSeed[] = [
  vest(
    '01',
    'Mesh-ventilated Trap and Skeet vest with dynamic elastic panels and an integrated recoil pad.',
    [
      'Breathable mesh zones',
      'Rapid moisture evaporation',
      'Dynamic elastic panels',
      'Integrated recoil pad',
      'UV-protective materials',
      'Contour-fit YKK zip closure',
    ],
    VEST_DETAIL
  ),
  vest(
    '02',
    'Lightweight competition vest with airflow-enhancing fabric and quick-dry performance.',
    [
      'Lightweight structure',
      'Airflow-enhancing fabric',
      'Ergonomic flexibility',
      'Recoil management padding',
      'Quick-dry properties',
      'Adaptable fit across competitive settings',
    ],
    VEST_DETAIL
  ),
  vest(
    '03',
    'Ultra-light Trap and Skeet vest with articulated recoil buffering and a purpose-built moisture-wicking structure.',
    [
      'Lightweight construction',
      'UV-protective materials',
      'Articulated recoil-buffering panels',
      'Purpose-built moisture-wicking structure',
      'Stable, settled feel through the shot',
    ],
    VEST_DETAIL
  ),
  vest(
    '05',
    'High-tensile stretch vest with advanced moisture control and built-in recoil dampening.',
    [
      'Advanced moisture control',
      'High-tensile stretch panels',
      'Built-in recoil dampening',
      'UV shielding',
      'YKK-secured fit',
      'Enhanced mobility',
    ],
    VEST_DETAIL
  ),
  vest(
    '06',
    'Airflow-channelling vest with dedicated recoil absorption zones and quick-drying fabric.',
    [
      'Specialised fabric channels airflow',
      'Robust UV protection',
      'Quick-drying fabric',
      'Recoil absorption zones',
      'Elastic flexibility',
    ],
    VEST_DETAIL
  ),
  vest(
    '07',
    'Alignment-focused vest with advanced moisture-wicking and flexible YKK closures.',
    [
      'Advanced moisture-wicking',
      'Alignment-enhancing design',
      'Integrated recoil protection',
      'Maximum UV shielding',
      'Flexible YKK closures for elite movement across all shooting rounds',
    ],
    VEST_DETAIL
  ),
  vest(
    '08',
    'Accuracy-oriented vest with generous stretch panelling and protective UV layers.',
    [
      'Designed for accuracy',
      'Advanced moisture diversion',
      'Recoil-absorbing construction',
      'Protective UV layers',
      'Generous stretch panelling',
    ],
    VEST_DETAIL
  ),
  vest(
    '09',
    'Zoned-ventilation vest with recoil-absorbing flex strips and durable YKK hardware.',
    [
      'Zoned ventilation',
      'Elite moisture dispersion',
      'Recoil-absorbing flex strips',
      'Precision-enhanced fabric tensioning',
      'Durable YKK hardware',
    ],
    VEST_DETAIL
  ),
  vest(
    '10',
    'Premium stretch vest with recalibrated recoil buffers and micro-mesh breathability.',
    [
      'Premium stretch fabric',
      'Recalibrated recoil buffers',
      'UV-stabilised quick-drying fabric',
      'Micro-mesh breathability',
    ],
    VEST_DETAIL
  ),
  vest(
    '12',
    'Heat-managing vest with precision-calibrated recoil absorption for repeatable movement.',
    [
      'Dynamic heat control',
      'Elite UV barriers',
      'Precision-calibrated recoil absorption',
      'Structural enhancements for smooth, repeatable movement',
    ],
    VEST_DETAIL
  ),
  vest(
    '13',
    'Lightweight vest with a flexible frame for uninterrupted transitions between shots.',
    [
      'Lightweight fabric',
      'Moisture-management layout',
      'Steadfast UV resilience',
      'Recoil-absorbing construction',
      'Flexible frame for uninterrupted transitions',
    ],
    VEST_DETAIL
  ),
  vest(
    '14',
    'Balanced-airflow vest with durable recoil compensation and a precise competition cut.',
    [
      'Tactile airflow balance',
      'Durable recoil compensation',
      'Expansive UV coverage',
      'Precise cut',
    ],
    VEST_DETAIL
  ),
];

const SLEEVE_OPTION: ProductColorOption[] = [
  { label: 'Sleeve Length', values: ['Half Sleeve', 'Full Sleeve'] },
];

const INNERS: ShotgunSeed[] = [
  {
    slug: 'capapie-capiflex-inner',
    name: 'Capapie Capiflex Inner',
    category: 'Shotgun Inners',
    short_description:
      'Thin poly-spandex shooting inner with a second-skin feel, in half or full sleeve.',
    long_description:
      'The Capiflex Inner is the lightest base layer in the Capapie Trap and Skeet range. Its thin poly-spandex blend creates a second-skin feel and promotes the sweat control and stretch needed for precision-focused sessions across varied conditions. Offered in half sleeve and full sleeve. ' +
      QUOTE_LINE,
    features: [
      'Thin poly-spandex blend with a second-skin feel',
      'Sweat control for long sessions',
      'Stretch dynamics suited to precision-focused shooting',
      'Available in half sleeve and full sleeve',
    ],
    images: [
      `${IMAGE_BASE}/capapie-capiflex-inner-full-sleeve.webp`,
      `${IMAGE_BASE}/capapie-capiflex-inner-half-sleeve.webp`,
    ],
    image_alt: 'Capapie Capiflex poly-spandex shooting inner in full sleeve and half sleeve',
    colors: SLEEVE_OPTION,
    sizing: MTM_SIZING,
    made_to_measure: true,
    seo_title: 'Capapie Capiflex Shooting Inner — Half & Full Sleeve',
    seo_description:
      'Thin poly-spandex Capapie Capiflex shooting inner for Trap and Skeet, in half or full sleeve. Standard sizes and made to measure from Laferla Sports, South Africa.',
  },
  {
    slug: 'capapie-capiflex-plus-inner',
    name: 'Capapie Capiflex+ Inner',
    category: 'Shotgun Inners',
    short_description:
      'Thicker poly-spandex inner offering thermal regulation and added warmth, in half or full sleeve.',
    long_description:
      'The Capiflex+ Inner is constructed from a thicker poly-spandex fabric than the standard Capiflex. It offers thermal regulation for shooters who need extra warmth and multi-disciplinary adaptability under demanding range conditions. Offered in half sleeve and full sleeve. ' +
      QUOTE_LINE,
    features: [
      'Constructed from thick poly-spandex fabric',
      'Thermal regulation',
      'Added warmth and multi-disciplinary adaptability',
      'Suited to demanding shooting conditions',
      'Available in half sleeve and full sleeve',
    ],
    images: [
      `${IMAGE_BASE}/capapie-capiflex-plus-inner-full-sleeve.webp`,
      `${IMAGE_BASE}/capapie-capiflex-plus-inner-half-sleeve.webp`,
    ],
    image_alt:
      'Capapie Capiflex+ thick poly-spandex shooting inner in full sleeve and half sleeve',
    colors: SLEEVE_OPTION,
    sizing: MTM_SIZING,
    made_to_measure: true,
    seo_title: 'Capapie Capiflex+ Shooting Inner — Half & Full Sleeve',
    seo_description:
      'Thick poly-spandex Capapie Capiflex+ shooting inner with thermal regulation, in half or full sleeve. Standard sizes and made to measure from Laferla Sports.',
  },
  {
    slug: 'capapie-pro-inner',
    name: 'Capapie Pro Inner',
    category: 'Shotgun Inners',
    short_description:
      'Poly-spandex Pro Basic inner balancing warmth management and range of motion.',
    long_description:
      'The Capapie Pro Inner is the Pro Basic poly-spandex version, optimised for warmth management and range of motion. It is built for reliable, repeatable performance across competitive shooting routines. Offered in half sleeve and full sleeve. ' +
      QUOTE_LINE,
    features: [
      'Poly-spandex Pro Basic construction',
      'Optimised warmth management',
      'Unrestricted range of motion',
      'Built for reliable competitive performance',
      'Available in half sleeve and full sleeve',
    ],
    images: [
      `${IMAGE_BASE}/capapie-pro-inner-full-sleeve.webp`,
      `${IMAGE_BASE}/capapie-pro-inner-half-sleeve.webp`,
    ],
    image_alt: 'Capapie Pro poly-spandex shooting inner in full sleeve and half sleeve',
    colors: SLEEVE_OPTION,
    sizing: MTM_SIZING,
    made_to_measure: true,
    seo_title: 'Capapie Pro Shooting Inner — Half & Full Sleeve',
    seo_description:
      'Capapie Pro poly-spandex shooting inner balancing warmth and mobility, in half or full sleeve. Standard sizes and made to measure from Laferla Sports, South Africa.',
  },
];

const ACCESSORIES: ShotgunSeed[] = [
  {
    slug: 'capapie-trap-shooting-gloves',
    name: 'Capapie Trap Shooting Gloves',
    category: 'Shotgun Accessories',
    short_description:
      'Silicon-grip Trap shooting gloves with anti-microbial, odour-controlling construction.',
    long_description:
      'Capapie Trap Hand Gloves give shotgun shooters a secure, repeatable hold on the fore-end. A silicon grip surface, ergonomic stitching and thermo-controlled, anti-microbial fabric keep the hands comfortable and odour-free over a long day on the range. ' +
      QUOTE_LINE,
    features: [
      'Silicon grip',
      'Easy to wear',
      'Odour control',
      'Anti-microbial',
      'Ergonomic stitching',
      'Thermo control',
    ],
    images: [
      `${IMAGE_BASE}/capapie-trap-shooting-gloves.webp`,
      `${IMAGE_BASE}/capapie-trap-shooting-gloves-detail.webp`,
    ],
    image_alt: 'Capapie Trap shooting gloves showing silicon grip palm and back of hand',
    seo_title: 'Capapie Trap Shooting Gloves',
    seo_description:
      'Capapie Trap shooting gloves with silicon grip, anti-microbial and thermo-control fabric for shotgun shooters. Request a quote from Laferla Sports, South Africa.',
  },
  {
    slug: 'capapie-baseball-cap',
    name: 'Capapie Baseball Cap',
    category: 'Shotgun Accessories',
    short_description:
      'Breathable shooting cap with a structured glare-reducing visor and detachable front logo.',
    long_description:
      'A breathable polyester NS cap with a structured visor that cuts glare on the stand, helping you stay cool and distraction free. The front logo is detachable and the unisex fit suits any shooter. ' +
      QUOTE_LINE,
    features: [
      'Structured visor to reduce glare',
      'Breathable polyester NS fabric',
      'Detachable front logo',
      'Keeps you cool and distraction free',
      'Unisex fit',
    ],
    images: [`${IMAGE_BASE}/capapie-baseball-cap.webp`],
    image_alt: 'Black Capapie baseball cap with embroidered front logo',
    seo_title: 'Capapie Shooting Baseball Cap',
    seo_description:
      'Capapie baseball cap in breathable polyester with a structured glare-reducing visor and detachable logo. Available from Laferla Sports, South Africa.',
  },
  {
    slug: 'capapie-cotton-ankle-socks',
    name: 'Capapie Cotton Ankle Socks',
    category: 'Shotgun Accessories',
    short_description:
      'Feather-light moisture-wicking cotton ankle socks designed for long days on the range.',
    long_description:
      'Feather-light cotton ankle socks that wick moisture to keep feet dry, with enhanced grip and a build designed for the long haul of a full competition day. ' +
      QUOTE_LINE,
    features: [
      'Feather-light',
      'Dry feet',
      'Moisture-wicking',
      'Designed for long haul wear',
      'Enhanced grip',
    ],
    images: [`${IMAGE_BASE}/capapie-cotton-ankle-socks.webp`],
    image_alt: 'Pair of black Capapie cotton ankle socks',
    seo_title: 'Capapie Cotton Ankle Socks',
    seo_description:
      'Feather-light, moisture-wicking Capapie cotton ankle socks for shooters. Request a quote from Laferla Sports in South Africa.',
  },
  {
    slug: 'capapie-trucker-cap',
    name: 'Capapie Trucker Cap',
    category: 'Shotgun Accessories',
    short_description:
      'Ventilated mesh trucker cap in polyester NS fabric with an adjustable fit.',
    long_description:
      'A ventilated mesh trucker cap in 100% polyester NS fabric with bold Capapie branding and an adjustable fit, made for Trap and Skeet enthusiasts. ' +
      QUOTE_LINE,
    features: [
      'Adjustable fit',
      'Bold Capapie branding',
      'Made for Trap and Skeet enthusiasts',
      '100% polyester NS fabric',
      'Ventilated mesh',
    ],
    images: [`${IMAGE_BASE}/capapie-trucker-cap.webp`],
    image_alt: 'Black Capapie trucker cap with mesh back panel and front branding',
    seo_title: 'Capapie Trucker Cap',
    seo_description:
      'Ventilated mesh Capapie trucker cap with adjustable fit for Trap and Skeet shooters. Available from Laferla Sports, South Africa.',
  },
];

const BAGS: ShotgunSeed[] = [
  {
    slug: 'capapie-ammo-bag',
    name: 'Capapie Ammo Bag',
    category: 'Bags & Shell Carriers',
    short_description:
      'Tough, lightweight cartridge bag with reinforced handles and zippers.',
    long_description:
      'A hard-wearing cartridge bag for the Trap and Skeet line. Reinforced handles and zippers stand up to daily range use, while a smartly organised interior keeps shells and essentials to hand. ' +
      QUOTE_LINE,
    features: [
      'Built tough',
      'Lightweight',
      'Reinforced handles and zippers',
      'Smartly organised',
    ],
    images: [`${IMAGE_BASE}/capapie-ammo-bag.webp`],
    image_alt: 'Black Capapie ammo bag with shoulder strap and front pocket',
    seo_title: 'Capapie Ammo Bag for Trap & Skeet',
    seo_description:
      'Tough, lightweight Capapie ammo bag with reinforced handles and zippers for Trap and Skeet shooters. Request a quote from Laferla Sports.',
  },
  {
    slug: 'capapie-single-box-holder-bag-premium',
    name: 'Capapie Single Box Holder Bag Premium',
    category: 'Bags & Shell Carriers',
    short_description:
      'Chrome leather single-box cartridge holder with a sturdy belt and easy access.',
    long_description:
      'A premium single-box cartridge holder in chrome leather, carried on a sturdy belt for quick, repeatable access to a box of shells between stands. ' +
      QUOTE_LINE,
    features: ['Chrome leather', 'Sturdy belt', 'Easy access', 'Durability and style'],
    images: [`${IMAGE_BASE}/capapie-single-box-holder-bag-premium.webp`],
    image_alt: 'Capapie Single Box Holder Bag Premium in chrome leather with belt',
    seo_title: 'Capapie Single Box Holder Bag Premium',
    seo_description:
      'Premium chrome leather single box cartridge holder with sturdy belt for Trap and Skeet shooters. Available from Laferla Sports, South Africa.',
  },
  {
    slug: 'capapie-ammo-box-holder-bag-pro',
    name: 'Capapie Ammo Box Holder Bag Pro',
    category: 'Bags & Shell Carriers',
    short_description:
      'PU-coated, weather-resistant ammunition box holder built for quick access.',
    long_description:
      'A PU-coated ammunition box holder that shrugs off changeable range weather while keeping a box of shells within immediate reach. ' +
      QUOTE_LINE,
    features: ['PU-coated', 'Quick access', 'Weather resistance', 'Durability'],
    images: [`${IMAGE_BASE}/capapie-ammo-box-holder-bag-pro.webp`],
    image_alt: 'Capapie Ammo Box Holder Bag Pro with PU-coated weather-resistant shell',
    seo_title: 'Capapie Ammo Box Holder Bag Pro',
    seo_description:
      'Weather-resistant PU-coated Capapie ammo box holder bag for Trap and Skeet. Request a quote from Laferla Sports in South Africa.',
  },
  {
    slug: 'capapie-4-box-ammo-carrier',
    name: 'Capapie 4 Box Ammo Carrier',
    category: 'Bags & Shell Carriers',
    short_description:
      'Chrome leather carrier that holds four boxes of cartridges with secure storage.',
    long_description:
      'A chrome leather carrier sized for four boxes of cartridges, combining secure storage with quick access when you are restocking between rounds. ' +
      QUOTE_LINE,
    features: ['Chrome leather', 'Quick access', 'Carries four boxes', 'Secure storage'],
    images: [`${IMAGE_BASE}/capapie-4-box-ammo-carrier.webp`],
    image_alt: 'Capapie 4 box ammunition carrier with twin carry handles',
    seo_title: 'Capapie 4 Box Ammo Carrier',
    seo_description:
      'Capapie chrome leather 4 box ammunition carrier for Trap and Skeet shooters. Available on request from Laferla Sports, South Africa.',
  },
  {
    slug: 'capapie-ammo-waist-pouch-premium',
    name: 'Capapie Ammo Waist Pouch Premium',
    category: 'Bags & Shell Carriers',
    short_description:
      'Chrome leather waist pouch with zippered, flexible access to cartridges.',
    long_description:
      'A premium chrome leather waist pouch that keeps cartridges on the hip and out of the way. Zippered compartments give flexible, easy access without breaking your rhythm. ' +
      QUOTE_LINE,
    features: [
      'Zippers and flexible access',
      'Chrome leather',
      'Easy access',
      'Durable',
    ],
    images: [`${IMAGE_BASE}/capapie-ammo-waist-pouch-premium.webp`],
    image_alt: 'Capapie premium chrome leather ammunition waist pouch with side pockets',
    seo_title: 'Capapie Ammo Waist Pouch Premium',
    seo_description:
      'Premium Capapie chrome leather ammunition waist pouch for Trap and Skeet shooters. Request a quote from Laferla Sports.',
  },
  {
    slug: 'capapie-pro-mesh-shell-pouch',
    name: 'Capapie Pro Mesh Shell Pouch',
    category: 'Bags & Shell Carriers',
    short_description:
      'Breathable mesh shell pouch with a secure zipper and quick-access opening.',
    long_description:
      'A lightweight shell pouch with a breathable mesh panel and a quick-access opening, reinforced throughout and closed with a secure zipper. ' +
      QUOTE_LINE,
    features: [
      'Mesh shell',
      'Breathable',
      'Quick access opening',
      'Reinforced stitching',
      'Secure zipper',
      'Lightweight build',
    ],
    images: [`${IMAGE_BASE}/capapie-pro-mesh-shell-pouch.webp`],
    image_alt: 'Capapie Pro mesh shell pouch with green breathable mesh panel',
    seo_title: 'Capapie Pro Mesh Shell Pouch',
    seo_description:
      'Breathable Capapie Pro mesh shell pouch with quick-access opening for Trap and Skeet. Available from Laferla Sports, South Africa.',
  },
  {
    slug: 'capapie-roller-bag-pro',
    name: 'Capapie Roller Bag Pro',
    category: 'Bags & Shell Carriers',
    short_description:
      'Padded roller bag with secure storage and reinforced stitching for travelling to competition.',
    long_description:
      'A padded roller bag for moving kit to and from competition. Durable fabric and reinforced stitching protect the contents, with secure storage throughout. ' +
      QUOTE_LINE,
    features: [
      'Padded protection',
      'Secure storage',
      'Durable fabric',
      'Reinforced stitching',
    ],
    images: [`${IMAGE_BASE}/capapie-roller-bag-pro.webp`],
    image_alt: 'Capapie Roller Bag Pro padded wheeled gun bag with green trim',
    seo_title: 'Capapie Roller Bag Pro',
    seo_description:
      'Padded Capapie Roller Bag Pro for transporting shotgun kit to competition. Request a quote from Laferla Sports in South Africa.',
  },
];

const BLINDER_FEATURES = [
  'Consistent shooting accuracy',
  'Reduce glare',
  'Durable material',
  'Lightweight',
  'Maintain focus',
];

const BLINDERS: ShotgunSeed[] = [
  {
    slug: 'capapie-target-side-blinder',
    name: 'Capapie Target Side Blinder',
    category: 'Blinders & Towels',
    short_description:
      'Lightweight side blinder with target graphic that reduces glare and helps maintain focus.',
    long_description:
      'A lightweight side blinder that mounts to your shooting glasses to cut peripheral distraction and glare, supporting consistent accuracy shot after shot. Finished with a target graphic. ' +
      QUOTE_LINE,
    features: BLINDER_FEATURES,
    images: [`${IMAGE_BASE}/capapie-target-side-blinder.webp`],
    image_alt: 'Capapie target side blinder with concentric target graphic',
    seo_title: 'Capapie Target Side Blinder',
    seo_description:
      'Capapie target side blinder that reduces glare and maintains focus for Trap and Skeet shooters. Available from Laferla Sports, South Africa.',
  },
  {
    slug: 'capapie-triangle-side-blinder',
    name: 'Capapie Triangle Side Blinder',
    category: 'Blinders & Towels',
    short_description:
      'Triangular-profile side blinder in durable, lightweight material.',
    long_description:
      'A triangular-profile side blinder in durable, lightweight material. It reduces glare and blocks peripheral distraction to help maintain focus and consistent accuracy on the stand. ' +
      QUOTE_LINE,
    features: BLINDER_FEATURES,
    images: [`${IMAGE_BASE}/capapie-triangle-side-blinder.webp`],
    image_alt: 'Capapie triangle side blinder in black with Capapie branding',
    seo_title: 'Capapie Triangle Side Blinder',
    seo_description:
      'Durable, lightweight Capapie triangle side blinder for competitive shotgun shooters. Request a quote from Laferla Sports.',
  },
  {
    slug: 'capapie-logo-side-blinder',
    name: 'Capapie Logo Side Blinder',
    category: 'Blinders & Towels',
    short_description:
      'Branded side blinder that cuts glare and peripheral distraction on the stand.',
    long_description:
      'A branded Capapie side blinder in durable, lightweight material, shaped to reduce glare and keep your attention on the target line. ' +
      QUOTE_LINE,
    features: BLINDER_FEATURES,
    images: [`${IMAGE_BASE}/capapie-logo-side-blinder.webp`],
    image_alt: 'Capapie logo side blinder with green shooter graphic',
    seo_title: 'Capapie Logo Side Blinder',
    seo_description:
      'Capapie logo side blinder that reduces glare and helps maintain focus for Trap and Skeet. Available from Laferla Sports, South Africa.',
  },
  {
    slug: 'capapie-hand-towel',
    name: 'Capapie Hand Towel',
    category: 'Blinders & Towels',
    short_description:
      'Quick-drying, high-absorbency premium cotton range towel in turquoise.',
    long_description:
      'A premium cotton hand towel for the range: high absorbency, quick drying, soft and easy to carry, with a secure grip. Supplied in turquoise. ' +
      QUOTE_LINE,
    features: [
      'Quick drying',
      'High absorbency',
      'Premium cotton',
      'Secure grip',
      'Soft and easy to carry',
    ],
    images: [`${IMAGE_BASE}/capapie-hand-towel.webp`],
    image_alt: 'Stack of folded turquoise Capapie premium cotton hand towels',
    colors: [{ label: 'Colour', values: ['Turquoise'] }],
    seo_title: 'Capapie Hand Towel',
    seo_description:
      'Quick-drying, high-absorbency Capapie premium cotton hand towel in turquoise. Request a quote from Laferla Sports in South Africa.',
  },
];

const GUN_COVER_INTRO =
  'A shotgun sock is a stretchable protective sleeve that slides over the length of a shotgun to guard the barrel and stock against knocks, dust and scratches during transport and storage. It is a gun cover, not footwear.';

const GUN_COVERS: ShotgunSeed[] = [
  {
    slug: 'capapie-trap-shotgun-socks-country-wise',
    name: 'Capapie Trap Shotgun Socks — Country Wise',
    category: 'Shotgun Socks & Gun Covers',
    short_description:
      'Stretchable protective shotgun cover available with country-specific customisation.',
    long_description: `${GUN_COVER_INTRO} This Trap model can be customised with country colours. ${QUOTE_LINE}`,
    features: [
      'Protective coverage',
      'Countrywise customisation',
      'Lightweight',
      'Stretchable fabric',
    ],
    images: [`${IMAGE_BASE}/capapie-trap-shotgun-socks-country-wise.webp`],
    image_alt:
      'Capapie Trap shotgun sock gun cover with country colour stripes',
    seo_title: 'Capapie Trap Shotgun Socks — Country Wise Gun Cover',
    seo_description:
      'Stretchable Capapie Trap shotgun sock gun cover with country-specific customisation. Available from Laferla Sports, South Africa.',
  },
  {
    slug: 'capapie-shotgun-socks',
    name: 'Capapie Shotgun Socks',
    category: 'Shotgun Socks & Gun Covers',
    short_description:
      'Lightweight stretchable protective cover for your shotgun, with Capapie branding.',
    long_description: `${GUN_COVER_INTRO} ${QUOTE_LINE}`,
    features: ['Protective coverage', 'Stretchable fabric', 'Lightweight'],
    images: [`${IMAGE_BASE}/capapie-shotgun-socks.webp`],
    image_alt: 'Capapie branded stretchable shotgun sock gun cover in black',
    seo_title: 'Capapie Shotgun Socks — Protective Gun Cover',
    seo_description:
      'Lightweight, stretchable Capapie shotgun sock gun cover for Trap and Skeet shotguns. Request a quote from Laferla Sports.',
  },
  {
    slug: 'capapie-skeet-shotgun-socks-pro',
    name: 'Capapie Skeet Shotgun Socks Pro',
    category: 'Shotgun Socks & Gun Covers',
    short_description:
      'Skeet-branded stretchable shotgun cover in the Pro finish.',
    long_description: `${GUN_COVER_INTRO} This is the Skeet Pro model. ${QUOTE_LINE}`,
    features: ['Stretchable fabric', 'Protective coverage', 'Lightweight'],
    images: [`${IMAGE_BASE}/capapie-skeet-shotgun-socks-pro.webp`],
    image_alt: 'Capapie Skeet Pro shotgun sock gun cover with SKEET lettering',
    seo_title: 'Capapie Skeet Shotgun Socks Pro — Gun Cover',
    seo_description:
      'Capapie Skeet Pro stretchable shotgun sock gun cover for competitive shooters. Available from Laferla Sports, South Africa.',
  },
  {
    slug: 'capapie-trap-shotgun-socks-pro',
    name: 'Capapie Trap Shotgun Socks Pro',
    category: 'Shotgun Socks & Gun Covers',
    short_description:
      'Trap-branded stretchable shotgun cover in the Pro finish.',
    long_description: `${GUN_COVER_INTRO} This is the Trap Pro model. ${QUOTE_LINE}`,
    features: ['Protective coverage', 'Lightweight', 'Stretchable fabric'],
    images: [`${IMAGE_BASE}/capapie-trap-shotgun-socks-pro.webp`],
    image_alt: 'Capapie Trap Pro shotgun sock gun cover with TRAP lettering',
    seo_title: 'Capapie Trap Shotgun Socks Pro — Gun Cover',
    seo_description:
      'Capapie Trap Pro stretchable shotgun sock gun cover for Trap shooters. Request a quote from Laferla Sports in South Africa.',
  },
];

const CASUAL: ShotgunSeed[] = [
  {
    slug: 'capapie-pure-aim-tee',
    name: 'Capapie Pure Aim Tee',
    category: 'Casual Wear',
    short_description:
      'Round-neck pure cotton tee with a relaxed fit for the range and downtime.',
    long_description:
      'A round-neck classic in pure cotton, cut for a relaxed fit with optimal ventilation. Comfortable during intense Skeet sessions and equally at home off the range. ' +
      QUOTE_LINE,
    features: [
      'Round-neck classic cut',
      'Pure cotton',
      'Optimal ventilation',
      'Relaxed fit',
    ],
    images: [`${IMAGE_BASE}/capapie-pure-aim-tee.webp`],
    image_alt: 'Black Capapie Pure Aim cotton t-shirt with chest logo',
    seo_title: 'Capapie Pure Aim Tee',
    seo_description:
      'Capapie Pure Aim round-neck pure cotton tee for shooters, on and off the range. Available from Laferla Sports, South Africa.',
  },
  {
    slug: 'capapie-precision-navy-polo',
    name: 'Capapie Precision Navy Polo',
    category: 'Casual Wear',
    short_description:
      '100% cotton navy polo with a timeless fit and excellent breathability.',
    long_description:
      'The Precision Navy Polo is composed of 100% cotton with excellent breathability. Its timeless fit allows easy movement, making it suitable for practice or casual settings on and off the range. ' +
      QUOTE_LINE,
    features: ['100% cotton', 'Superb breathability', 'Timeless fit', 'Ease of movement'],
    images: [`${IMAGE_BASE}/capapie-precision-navy-polo.webp`],
    image_alt: 'Navy Capapie Precision cotton polo shirt',
    seo_title: 'Capapie Precision Navy Polo',
    seo_description:
      'Capapie Precision Navy Polo in 100% breathable cotton for practice and casual wear. Request a quote from Laferla Sports.',
  },
  {
    slug: 'capapie-tactical-breeze-shirt',
    name: 'Capapie Tactical Breeze Shirt',
    category: 'Casual Wear',
    short_description:
      'Cotton-linen blend shirt with moisture-wicking properties and a polished look.',
    long_description:
      'Crafted from a cotton-linen blend with moisture-wicking properties, the Tactical Breeze Shirt keeps you comfortable and looking sharp through every round. ' +
      QUOTE_LINE,
    features: [
      'Cotton linen blend',
      'Moisture-wicking capabilities',
      'Comfortable, polished appearance',
    ],
    images: [`${IMAGE_BASE}/capapie-tactical-breeze-shirt.webp`],
    image_alt: 'Capapie Tactical Breeze cotton linen blend shirt',
    seo_title: 'Capapie Tactical Breeze Shirt',
    seo_description:
      'Capapie Tactical Breeze cotton-linen shirt with moisture-wicking properties for shooters. Available from Laferla Sports, South Africa.',
  },
  {
    slug: 'capapie-arctic-guardian-jacket',
    name: 'Capapie Arctic Guardian Jacket',
    category: 'Casual Wear',
    short_description:
      'Full-sleeve puffer jacket with 100% polyester insulation, articulated for mobility.',
    long_description:
      'The Arctic Guardian is a full-sleeve puffer jacket with 100% polyester insulation for warmth and protection in cold conditions. It is articulated for mobility, so it does not fight you in or out of training. Supplied in black. ' +
      QUOTE_LINE,
    features: [
      'Full-sleeve puffer construction',
      '100% polyester insulation',
      'Warmth and protection in cold conditions',
      'Articulated for mobility',
    ],
    images: [`${IMAGE_BASE}/capapie-arctic-guardian-jacket.webp`],
    image_alt: 'Black Capapie Arctic Guardian insulated puffer jacket',
    colors: [{ label: 'Colour', values: ['Black'] }],
    seo_title: 'Capapie Arctic Guardian Jacket',
    seo_description:
      'Capapie Arctic Guardian insulated puffer jacket for cold range days, articulated for mobility. Request a quote from Laferla Sports.',
  },
];

const SEEDS: ShotgunSeed[] = [
  ...VESTS,
  ...INNERS,
  ...ACCESSORIES,
  ...BAGS,
  ...BLINDERS,
  ...GUN_COVERS,
  ...CASUAL,
];

function toDisplayProduct(seed: ShotgunSeed): DisplayProduct {
  return {
    // Capapie publishes no item codes for this range - intentionally omitted.
    slug: seed.slug,
    name: seed.name,
    category: seed.category,
    discipline: 'shotgun',
    brand: 'Capapie',
    made_to_measure: seed.made_to_measure ?? false,
    short_description: seed.short_description,
    long_description: seed.long_description,
    features: seed.features,
    colors: seed.colors ?? [],
    sizing: seed.sizing ?? '',
    image_path: seed.images[0],
    images: seed.images,
    image_alt: seed.image_alt,
    seo_title: seed.seo_title,
    seo_description: seed.seo_description,
  };
}

export const shotgunProducts: DisplayProduct[] = SEEDS.map(toDisplayProduct);

export function getShotgunProducts(): DisplayProduct[] {
  return shotgunProducts;
}

export function getShotgunProductsByCategory(categoryName: string): DisplayProduct[] {
  return shotgunProducts.filter((p) => p.category === categoryName);
}

export function getFeaturedShotgunVests(count = 4): DisplayProduct[] {
  return shotgunProducts.filter((p) => p.category === 'Shooting Vests').slice(0, count);
}
