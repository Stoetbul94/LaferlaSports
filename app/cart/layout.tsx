import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quote Request',
  description: 'Review your Capapie quote request list and email it to Laferla Sports.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/cart' },
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
