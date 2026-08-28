import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Email Laferla Sports at info@laferlasports.com for quotes, sizing help and Capapie ISSF or Trap & Skeet equipment enquiries in South Africa.',
  alternates: { canonical: '/contact' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
