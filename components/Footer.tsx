import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Laferla Sports</h3>
            <p className="text-primary-300 text-sm mb-4">
              Official Capapie dealer in South Africa. Specializing in ISSF shooting sports equipment for competitive shooters.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop" className="text-primary-300 hover:text-white transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-primary-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/capapie" className="text-primary-300 hover:text-white transition-colors">
                  Capapie Brand
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-primary-300 hover:text-white transition-colors">
                  Shipping & Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-primary-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-primary-300 hover:text-white transition-colors">
                  Order Process
                </Link>
              </li>
              <li>
                <Link href="/legal" className="text-primary-300 hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-primary-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-primary-300">
              <li>South Africa</li>
              <li>
                <a href="mailto:info@laferlasports.co.za" className="hover:text-white transition-colors">
                  info@laferlasports.co.za
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-800 mt-8 pt-8 text-center text-sm text-primary-400">
          <p>&copy; {currentYear} Laferla Sports. All rights reserved.</p>
          <p className="mt-2">Authorized Capapie Dealer - South Africa</p>
        </div>
      </div>
    </footer>
  );
}

