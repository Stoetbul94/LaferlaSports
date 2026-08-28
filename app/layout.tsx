import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AssociationsTicker from '@/components/AssociationsTicker';
import OrganizationJsonLd from '@/components/OrganizationJsonLd';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - Capapie ISSF Shooting Equipment | South Africa`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'ISSF shooting equipment South Africa',
    'Capapie dealer South Africa',
    'air rifle shooting gear',
    'target rifle equipment',
    'shooting jacket trousers',
    'shooting gloves',
    'competition shooting South Africa',
  ],
  applicationName: SITE_NAME,
  alternates: { canonical: '/' },
  openGraph: {
    title: `${SITE_NAME} - Official Capapie Dealer`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'en_ZA',
    type: 'website',
    images: [{ url: '/images/logo.png' }],
  },
  twitter: {
    card: 'summary',
    title: `${SITE_NAME} - Official Capapie Dealer`,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA">
      <body>
        <OrganizationJsonLd />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
          <AssociationsTicker />
          <Footer />
        </div>
      </body>
    </html>
  );
}
