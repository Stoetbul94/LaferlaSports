'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

import { usePrefersReducedMotion } from '@/lib/use-reduced-motion';

/**
 * "Coverflow" affiliations strip shown before the footer.
 * Cards auto-scroll and tilt in 3D toward the centre, flattening as they pass
 * through the middle. Pauses on hover. Falls back to a flat, centred row when
 * the user prefers reduced motion. No external dependencies (rAF + CSS only).
 *
 * Add `href` to make a logo clickable.
 */
interface Association {
  name: string;
  logo: string;
  width: number;
  height: number;
  href?: string;
}

const ASSOCIATIONS: Association[] = [
  { name: 'South African Target Rifle Federation', logo: '/images/associations/satrf.png', width: 150, height: 125 },
  { name: 'Tech Aim Targets', logo: '/images/associations/techaim.png', width: 320, height: 100, href: 'https://www.techaim.co.za' },
];

const CARD_WIDTH = 210;

// The track wraps by one full set, so it must stay wider than the viewport or a
// gap appears mid-scroll. Repeat enough times to cover the widest container
// (max-w-6xl, 1152px) twice over, whatever the number of associations.
const REPEATS = Math.max(2, Math.ceil(2304 / (ASSOCIATIONS.length * CARD_WIDTH)));

const TRACK = Array.from({ length: REPEATS }, () => ASSOCIATIONS).flat();

function Chip({ a, eager }: { a: Association; eager: boolean }) {
  const inner = (
    <span className="flex h-24 w-full items-center justify-center rounded-xl bg-white px-7 py-4 shadow-lg ring-1 ring-black/5">
      <Image
        src={a.logo}
        alt={a.name}
        width={a.width}
        height={a.height}
        className="h-full w-auto object-contain"
        draggable={false}
      />
    </span>
  );

  if (a.href) {
    return (
      <a
        href={a.href}
        target="_blank"
        rel="noopener noreferrer"
        title={a.name}
        aria-hidden={!eager}
        tabIndex={eager ? 0 : -1}
        className="block"
      >
        {inner}
      </a>
    );
  }
  return (
    <span title={a.name} aria-hidden={!eager} className="block">
      {inner}
    </span>
  );
}

export default function AssociationsTicker() {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const track = trackRef.current;
    const container = track?.parentElement;
    if (!track || !container) return;

    const cards = Array.from(track.children) as HTMLElement[];
    const n = ASSOCIATIONS.length;
    const speed = 0.45; // px per frame

    const tick = () => {
      // One full set width (layout-based, unaffected by transforms) for seamless wrap.
      const period = cards[n].offsetLeft - cards[0].offsetLeft || 1;
      if (!pausedRef.current) {
        offsetRef.current -= speed;
        if (-offsetRef.current >= period) offsetRef.current += period;
      }
      track.style.transform = `translate3d(${offsetRef.current}px,0,0)`;

      const cRect = container.getBoundingClientRect();
      const cx = cRect.left + cRect.width / 2;
      const halfW = cRect.width / 2 || 1;

      for (const card of cards) {
        const r = card.getBoundingClientRect();
        const d = Math.max(-1.5, Math.min(1.5, (r.left + r.width / 2 - cx) / halfW));
        const ad = Math.abs(d);
        const rotY = d * -34;
        const scale = 1 - Math.min(ad * 0.22, 0.4);
        const translateZ = -ad * 140;
        const opacity = 1 - Math.min(ad * 0.5, 0.7);
        card.style.transform = `perspective(1100px) translateZ(${translateZ}px) rotateY(${rotY}deg) scale(${scale})`;
        card.style.opacity = String(opacity);
        card.style.zIndex = String(100 - Math.round(ad * 100));
        // Subtle gold glow on the card closest to centre.
        card.style.filter = ad < 0.25 ? `drop-shadow(0 0 22px rgba(212,175,55,0.45))` : 'none';
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduced]);

  return (
    <section
      className="relative overflow-hidden border-y border-dark-border bg-dark-lighter py-10"
      aria-label="Affiliations and associations"
    >
      {/* faint backdrop glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(60% 120% at 50% 50%, rgba(177,18,23,0.10) 0%, rgba(11,11,11,0) 60%)',
        }}
      />

      <div className="relative mb-6 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-gold">
          Proudly associated with
        </span>
        <div className="mx-auto mt-2 h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent" />
      </div>

      {reduced ? (
        <div className="relative flex flex-wrap items-center justify-center gap-8 px-6">
          {ASSOCIATIONS.map((a) => (
            <div key={a.name} className="w-[190px]">
              <Chip a={a} eager />
            </div>
          ))}
        </div>
      ) : (
        <div
          className="relative mx-auto flex h-28 max-w-6xl items-center"
          style={{
            maskImage:
              'linear-gradient(to right, transparent 0%, #000 14%, #000 86%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, #000 14%, #000 86%, transparent 100%)',
          }}
          onMouseEnter={() => (pausedRef.current = true)}
          onMouseLeave={() => (pausedRef.current = false)}
        >
          <div ref={trackRef} className="flex will-change-transform">
            {TRACK.map((a, i) => (
              <div
                key={`${a.name}-${i}`}
                className="w-[210px] shrink-0 px-4"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Chip a={a} eager={i < ASSOCIATIONS.length} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
