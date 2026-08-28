'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/lib/cart-store';
import { useEffect, useRef, useState } from 'react';
import { SHOTGUN_CATEGORIES } from '@/lib/shotgun-categories';
import { PRECISION_CATEGORIES } from '@/lib/precision-categories';
import { categoryToSlug } from '@/lib/category-slug';
import { useHydrated } from '@/lib/use-hydrated';

interface NavChild {
  name: string;
  href: string;
  description?: string;
}

interface NavItem {
  name: string;
  href: string;
  children?: NavChild[];
}

export default function Header() {
  const pathname = usePathname();
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopMenuOpen, setShopMenuOpen] = useState(false);
  const shopMenuRef = useRef<HTMLDivElement>(null);
  // Avoid hydration mismatch: the cart count comes from localStorage, which is
  // only available on the client. Render the badge after mount.
  const mounted = useHydrated();

  // Close the Shop dropdown on outside click or Escape.
  useEffect(() => {
    if (!shopMenuOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (shopMenuRef.current && !shopMenuRef.current.contains(event.target as Node)) {
        setShopMenuOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShopMenuOpen(false);
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [shopMenuOpen]);

  const closeMenus = () => {
    setShopMenuOpen(false);
    setMobileMenuOpen(false);
  };

  const navigation: NavItem[] = [
    { name: 'Home', href: '/' },
    {
      name: 'Shop',
      href: '/shop',
      children: [
        { name: 'Shop All', href: '/shop', description: 'Both shooting disciplines' },
        {
          name: 'Precision / ISSF',
          href: '/shop/issf',
          description: 'Rifle & pistol equipment',
        },
        {
          name: 'Shotgun / Trap & Skeet',
          href: '/shop/shotgun',
          description: 'Vests, inners, bags & covers',
        },
      ],
    },
    { name: 'Coaching', href: '/coaching' },
    { name: 'About', href: '/about' },
    { name: 'Capapie', href: '/capapie' },
    { name: 'Shipping', href: '/shipping' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => pathname === href;
  const isShopSection = pathname === '/shop' || pathname.startsWith('/shop/');

  return (
    <header className="bg-dark border-b border-dark-border sticky top-0 z-50 backdrop-blur-sm bg-dark/95">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-28">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-5 group">
            <div className="relative h-20 w-20 flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="Laferla Sports Logo"
                fill
                className="object-contain drop-shadow-lg"
                priority
                sizes="80px"
              />
            </div>
            <span className="text-2xl sm:text-3xl font-black uppercase tracking-widest text-text-primary group-hover:text-accent transition-colors">
              Laferla Sports
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) =>
              item.children ? (
                <div key={item.name} className="relative" ref={shopMenuRef}>
                  <button
                    type="button"
                    onClick={() => setShopMenuOpen((open) => !open)}
                    aria-expanded={shopMenuOpen}
                    aria-haspopup="true"
                    className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-all duration-200 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      isShopSection ? 'text-accent' : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {item.name}
                    <svg
                      className={`h-3 w-3 transition-transform ${shopMenuOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                    </svg>
                    {isShopSection && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
                    )}
                  </button>

                  {shopMenuOpen && (
                    <div className="absolute left-0 top-full z-50 mt-1 w-72 overflow-hidden rounded-lg border border-dark-border bg-dark-lighter shadow-2xl">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          onClick={closeMenus}
                          className="block border-b border-dark-border px-5 py-4 last:border-b-0 hover:bg-dark focus:bg-dark focus:outline-none"
                        >
                          <span className="block text-sm font-bold uppercase tracking-wide text-text-primary">
                            {child.name}
                          </span>
                          {child.description && (
                            <span className="mt-1 block text-xs text-text-secondary">
                              {child.description}
                            </span>
                          )}
                        </Link>
                      ))}
                      <div className="space-y-3 bg-dark px-5 py-4">
                        <div>
                          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
                            ISSF / Precision
                          </span>
                          <div className="flex flex-wrap gap-x-3 gap-y-1">
                            {PRECISION_CATEGORIES.map((category) => (
                              <Link
                                key={category.name}
                                href={`/shop/${categoryToSlug(category.name)}`}
                                onClick={closeMenus}
                                className="text-xs text-text-secondary hover:text-accent"
                              >
                                {category.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
                            Trap &amp; Skeet
                          </span>
                          <div className="flex flex-wrap gap-x-3 gap-y-1">
                            {SHOTGUN_CATEGORIES.map((category) => (
                              <Link
                                key={category.slug}
                                href={`/shop/shotgun/${category.slug}`}
                                onClick={closeMenus}
                                className="text-xs text-text-secondary hover:text-accent"
                              >
                                {category.shortName}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-all duration-200 relative ${
                    isActive(item.href)
                      ? 'text-accent'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {item.name}
                  {isActive(item.href) && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"></span>
                  )}
                </Link>
              )
            )}
          </div>

          {/* Cart & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <Link
              href="/cart"
              className="relative p-2 text-text-primary hover:text-accent transition-colors"
              aria-label="Quote request list"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {mounted && totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-text-primary hover:text-accent transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-dark-border">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-3 text-base font-semibold uppercase tracking-wide transition-colors ${
                    isActive(item.href)
                      ? 'text-accent bg-dark-lighter'
                      : 'text-text-secondary hover:text-text-primary hover:bg-dark-lighter'
                  }`}
                >
                  {item.name}
                </Link>
                {item.children && (
                  <div className="mb-2 ml-3 border-l border-dark-border pl-4">
                    {item.children
                      .filter((child) => child.href !== '/shop')
                      .map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-2 text-sm font-semibold uppercase tracking-wide text-text-secondary hover:text-accent"
                        >
                          {child.name}
                        </Link>
                      ))}
                    {PRECISION_CATEGORIES.map((category) => (
                      <Link
                        key={category.name}
                        href={`/shop/${categoryToSlug(category.name)}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 pl-4 text-sm text-text-muted hover:text-accent"
                      >
                        {category.name}
                      </Link>
                    ))}
                    {SHOTGUN_CATEGORIES.map((category) => (
                      <Link
                        key={category.slug}
                        href={`/shop/shotgun/${category.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 pl-4 text-sm text-text-muted hover:text-accent"
                      >
                        {category.shortName}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
