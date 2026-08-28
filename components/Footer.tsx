import Link from 'next/link';
import Logo from './Logo';
import { CONTACT_EMAIL } from '@/lib/contact-info';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark border-t border-dark-border">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <Logo size="md" />
              <h3 className="text-xl font-bold uppercase tracking-wide text-text-primary">Laferla Sports</h3>
            </div>
            <p className="text-text-secondary text-sm mb-4 leading-relaxed">
              Official Capapie dealer in South Africa. ISSF precision equipment, Trap &amp; Skeet shotgun gear, and ISSF rifle coaching.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold uppercase tracking-wide mb-4 text-text-primary">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/shop" className="text-text-secondary hover:text-accent transition-colors uppercase tracking-wide">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/shop/issf" className="text-text-secondary hover:text-accent transition-colors uppercase tracking-wide">
                  ISSF Equipment
                </Link>
              </li>
              <li>
                <Link href="/shop/shotgun" className="text-text-secondary hover:text-accent transition-colors uppercase tracking-wide">
                  Trap &amp; Skeet
                </Link>
              </li>
              <li>
                <Link href="/coaching" className="text-text-secondary hover:text-accent transition-colors uppercase tracking-wide">
                  Coaching
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-text-secondary hover:text-accent transition-colors uppercase tracking-wide">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/capapie" className="text-text-secondary hover:text-accent transition-colors uppercase tracking-wide">
                  Capapie Brand
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-text-secondary hover:text-accent transition-colors uppercase tracking-wide">
                  Shipping & Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold uppercase tracking-wide mb-4 text-text-primary">Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/contact" className="text-text-secondary hover:text-accent transition-colors uppercase tracking-wide">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-text-secondary hover:text-accent transition-colors uppercase tracking-wide">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-text-secondary hover:text-accent transition-colors uppercase tracking-wide">
                  Order Process
                </Link>
              </li>
              <li>
                <Link href="/legal" className="text-text-secondary hover:text-accent transition-colors uppercase tracking-wide">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-text-secondary hover:text-accent transition-colors uppercase tracking-wide">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold uppercase tracking-wide mb-4 text-text-primary">Contact</h3>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li>South Africa</li>
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-accent transition-colors">
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-border mt-12 pt-8 text-center text-sm text-text-muted">
          <p>&copy; {currentYear} Laferla Sports. All rights reserved.</p>
          <p className="mt-2 uppercase tracking-wide">Authorized Capapie Dealer - South Africa</p>
        </div>
      </div>
    </footer>
  );
}


