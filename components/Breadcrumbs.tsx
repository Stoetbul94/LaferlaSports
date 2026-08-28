import Link from 'next/link';
import BreadcrumbJsonLd, { Crumb } from './BreadcrumbJsonLd';

interface BreadcrumbsProps {
  items: Crumb[];
  /** Emit BreadcrumbList structured data alongside the visible trail. */
  jsonLd?: boolean;
}

export default function Breadcrumbs({ items, jsonLd = true }: BreadcrumbsProps) {
  return (
    <>
      {jsonLd && <BreadcrumbJsonLd items={items} />}
      <nav
        aria-label="Breadcrumb"
        className="mb-8 text-sm text-text-secondary uppercase tracking-wide"
      >
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {items.map((item, i) => (
            <li key={`${item.name}-${i}`} className="flex items-center gap-x-2">
              {item.href ? (
                <Link href={item.href} className="hover:text-accent transition-colors">
                  {item.name}
                </Link>
              ) : (
                <span className="text-text-primary" aria-current="page">
                  {item.name}
                </span>
              )}
              {i < items.length - 1 && (
                <span aria-hidden="true" className="text-text-muted">
                  /
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
