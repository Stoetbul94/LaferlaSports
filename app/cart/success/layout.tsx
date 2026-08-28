import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quote Request Received',
  description: 'Your quote request has been sent to Laferla Sports.',
  robots: { index: false, follow: false },
};

export default function CartSuccessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
