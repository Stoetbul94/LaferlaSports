import Image from 'next/image';

/**
 * Auto-scrolling "affiliations" strip shown before the footer.
 * Pure CSS marquee (no JS), pauses on hover, respects reduced-motion.
 *
 * Logos sit on white chips so dark-text marks stay legible on the dark strip.
 * Add `href` to make a logo clickable once URLs are confirmed.
 */
interface Association {
  name: string;
  logo: string;
  width: number;
  height: number;
  href?: string;
}

const ASSOCIATIONS: Association[] = [
  { name: 'South African Air Rifle Association', logo: '/images/associations/saara.png', width: 150, height: 120 },
  { name: 'South African Target Rifle Federation', logo: '/images/associations/satrf.png', width: 150, height: 125 },
  { name: 'SASSCO', logo: '/images/associations/sassco.png', width: 120, height: 120 },
  { name: 'Tech Aim Targets', logo: '/images/associations/techaim.png', width: 320, height: 100 },
];

function Chip({ a }: { a: Association }) {
  const inner = (
    <span className="flex h-20 items-center justify-center rounded-lg bg-white px-6 py-3 shadow-md transition-transform duration-300 hover:scale-105">
      <Image
        src={a.logo}
        alt={a.name}
        width={a.width}
        height={a.height}
        className="h-full w-auto object-contain"
      />
    </span>
  );

  if (a.href) {
    return (
      <a href={a.href} target="_blank" rel="noopener noreferrer" title={a.name} className="shrink-0">
        {inner}
      </a>
    );
  }
  return (
    <span title={a.name} className="shrink-0">
      {inner}
    </span>
  );
}

function TickerRow({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-10 px-5" aria-hidden={ariaHidden}>
      {ASSOCIATIONS.map((a) => (
        <Chip key={`${ariaHidden ? 'b' : 'a'}-${a.name}`} a={a} />
      ))}
    </div>
  );
}

export default function AssociationsTicker() {
  return (
    <section
      className="bg-dark-lighter border-y border-dark-border py-8 overflow-hidden"
      aria-label="Affiliations and associations"
    >
      <div className="mb-5 text-center">
        <span className="text-xs uppercase tracking-widest text-text-secondary font-bold">
          Proudly associated with
        </span>
      </div>
      <div className="group relative flex overflow-hidden">
        <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
          <TickerRow />
          <TickerRow ariaHidden />
        </div>
      </div>
    </section>
  );
}
