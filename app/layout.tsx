import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Laferla Sports - Official Capapie Dealer | ISSF Shooting Equipment',
  description: 'South Africa\'s authorized Capapie dealer specializing in ISSF shooting sports equipment. Professional competition pistols, rifles, and accessories for competitive shooters.',
  keywords: 'ISSF, shooting sports, Capapie, competition pistol, air rifle, South Africa, shooting equipment',
  openGraph: {
    title: 'Laferla Sports - Official Capapie Dealer',
    description: 'South Africa\'s authorized Capapie dealer specializing in ISSF shooting sports equipment.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}


