'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

import { usePrefersReducedMotion } from '@/lib/use-reduced-motion';

/**
 * Hero background image with a slow Ken-Burns zoom (CSS) plus subtle
 * cursor/scroll parallax (no dependencies). Honours reduced-motion via CSS.
 */
export default function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    let raf = 0;
    const apply = (x: number, y: number) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--px', `${x}px`);
        el.style.setProperty('--py', `${y}px`);
      });
    };

    const onMouse = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      apply(((e.clientX - cx) / cx) * 14, ((e.clientY - cy) / cy) * 14);
    };
    const onScroll = () => apply(0, Math.min(window.scrollY * 0.06, 40));

    window.addEventListener('mousemove', onMouse);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
      el.style.removeProperty('--px');
      el.style.removeProperty('--py');
    };
  }, [reduced]);

  return (
    <div className="absolute inset-0 z-0 flex items-center justify-end pointer-events-none overflow-hidden">
      <div
        ref={ref}
        className="relative w-full h-[95%]"
        style={{
          top: '50%',
          transform: 'translateY(-50%) translate3d(var(--px, 0px), var(--py, 0px), 0)',
          transition: 'transform 0.25s ease-out',
        }}
      >
        <Image
          src="/images/MainBackground2.png"
          alt="Capapie ISSF competition shooting equipment"
          fill
          className="object-cover object-right animate-ken-burns"
          style={{
            transformOrigin: 'right center',
            filter: 'brightness(1.12) contrast(1.05)',
          }}
          priority
          sizes="100vw"
        />
      </div>
    </div>
  );
}
