/**
 * Trap & Skeet vest material / colour options.
 *
 * Transcribed verbatim from the "TRAP AND SKEET VEST MATERIAL" table on
 * page 27 of the Capapie Trap & Skeet brochure. Colour availability is
 * manufacturer-published — do not add entries that are not in that table.
 */
export interface VestMaterial {
  material: string;
  colours: string[];
}

export const VEST_MATERIALS: VestMaterial[] = [
  {
    material: 'Fabric powered by Swiss Tech',
    colours: [
      'Navy',
      'Green',
      'Light Pink',
      'Mazarine Blue',
      'Cobalt Blue',
      'Graphite (Dark Grey)',
      'Black',
      'Lavender',
      'Turquoise',
      'Red',
      'Orange',
    ],
  },
  {
    material: 'Suede',
    colours: ['Navy', 'Red', 'Grey', 'Black'],
  },
  {
    material: 'Mesh',
    colours: ['Navy', 'White', 'Black', 'Red', 'Mazarine Blue'],
  },
  {
    material: 'Lycra',
    colours: ['Navy', 'White', 'Black'],
  },
  {
    material: 'Binding',
    colours: [
      'Navy',
      'Green',
      'Light Pink',
      'Light Grey',
      'Cobalt Blue',
      'Graphite (Dark Grey)',
      'Black',
      'Lavender',
      'Turquoise',
      'Red',
      'Orange',
      'Mazarine Blue',
    ],
  },
  {
    material: 'Cord Piping',
    colours: [
      'Navy',
      'Green',
      'Light Pink',
      'Light Grey',
      'Cobalt Blue',
      'Graphite (Dark Grey)',
      'Black',
      'Lavender',
      'Turquoise',
      'Red',
      'Orange',
      'Mazarine Blue',
      'White',
    ],
  },
];
