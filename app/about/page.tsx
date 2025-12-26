import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'About Us - Laferla Sports',
  description: 'Learn about Laferla Sports, South Africa\'s authorized Capapie dealer specializing in ISSF shooting sports equipment.',
};

export default function AboutPage() {
  return (
    <div className="section-padding bg-dark">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center mb-12">
            <div className="relative h-64 w-64 md:h-80 md:w-80 mb-6">
              <Image
                src="/images/logo4.png"
                alt="Laferla Sports Logo"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 256px, 320px"
              />
            </div>
            <h1 className="heading-1 text-text-primary">About Laferla Sports</h1>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="heading-3 mb-6 text-text-primary">Our Mission</h2>
              <p className="text-body mb-6 text-lg leading-relaxed">
                Laferla Sports is South Africa's premier authorized dealer for Capapie, 
                specializing in ISSF (International Shooting Sport Federation) competition 
                equipment. We are dedicated to serving competitive shooters, shooting clubs, 
                coaches, and serious enthusiasts with professional-grade equipment that meets 
                the highest international standards.
              </p>
              <p className="text-body text-lg leading-relaxed">
                Our commitment is to provide not just products, but expertise, support, and 
                service that helps shooters achieve their competitive goals. Every product we 
                offer is verified for ISSF compliance and backed by our knowledge of competitive 
                shooting requirements.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="heading-3 mb-8 text-text-primary">Why Choose Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-dark-lighter border border-dark-border rounded-lg p-6">
                  <h3 className="font-bold text-xl mb-3 text-text-primary uppercase tracking-wide">Authorized Dealer</h3>
                  <p className="text-text-secondary leading-relaxed">
                    As an official Capapie dealer, we have direct access to the latest 
                    competition equipment and can provide authentic, warranty-backed products.
                  </p>
                </div>
                <div className="bg-dark-lighter border border-dark-border rounded-lg p-6">
                  <h3 className="font-bold text-xl mb-3 text-text-primary uppercase tracking-wide">ISSF Expertise</h3>
                  <p className="text-text-secondary leading-relaxed">
                    Our team understands ISSF regulations and competition requirements. 
                    We help you select equipment that meets all compliance standards.
                  </p>
                </div>
                <div className="bg-dark-lighter border border-dark-border rounded-lg p-6">
                  <h3 className="font-bold text-xl mb-3 text-text-primary uppercase tracking-wide">South African Focus</h3>
                  <p className="text-text-secondary leading-relaxed">
                    We understand the local shooting sports community and provide support 
                    tailored to South African competitive shooters.
                  </p>
                </div>
                <div className="bg-dark-lighter border border-dark-border rounded-lg p-6">
                  <h3 className="font-bold text-xl mb-3 text-text-primary uppercase tracking-wide">Quality Assurance</h3>
                  <p className="text-text-secondary leading-relaxed">
                    Every product is verified for quality and ISSF compliance before 
                    being offered to our customers.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="heading-3 mb-6 text-text-primary">Premium ISSF-Compliant Shooting Gear</h2>
              <p className="text-body mb-6 text-lg leading-relaxed">
                Laferla Sports offers the complete Capapie range of precision-engineered shooting equipment, 
                designed to meet the exacting standards of international competitive shooting. Our product 
                lineup emphasizes performance, compliance, and technical excellence for serious athletes.
              </p>
              <ul className="space-y-4 text-body text-text-secondary text-lg">
                <li>
                  <strong className="text-text-primary">Jackets & Trousers:</strong> ISSF-compliant competition 
                  apparel featuring CAPITEX® materials, anatomical precision cuts, and engineered stability 
                  systems. Our range includes premium, professional, and entry-level options with advanced 
                  features such as top grip reinforcement, breathing stabilizers, and customizable fit adjustments 
                  for optimal shooting position support.
                </li>
                <li>
                  <strong className="text-text-primary">Gloves:</strong> Professional shooting gloves engineered 
                  for grip, support, and ISSF compliance. Our selection includes cut-finger designs with anti-slip 
                  surfaces, mesh ventilation, and advanced materials like Swiss Tech cooling technology for 
                  enhanced performance during extended competition sessions.
                </li>
                <li>
                  <strong className="text-text-primary">Inners:</strong> Technical base layers designed to be 
                  worn beneath shooting jackets and trousers. CAPIFLEX® inner systems provide compression, 
                  moisture management, and additional stability layers, enhancing the performance of outer 
                  competition garments.
                </li>
                <li>
                  <strong className="text-text-primary">Shoes:</strong> Specialized shooting footwear engineered 
                  for rifle and pistol disciplines. These competition-grade shoes feature precision construction, 
                  ISSF-compliant designs, and support for all shooting positions with enhanced stability and 
                  comfort for extended range sessions.
                </li>
              </ul>
              <div className="mt-8">
                <Link href="/shop" className="btn btn-primary">
                  Browse Complete Product Catalog
                </Link>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="heading-3 mb-6 text-text-primary">Our Commitment</h2>
              <p className="text-body text-lg leading-relaxed">
                At Laferla Sports, we believe that competitive shooting requires precision, 
                dedication, and the right equipment. We're committed to providing that equipment 
                along with the knowledge and support that helps shooters excel. Whether you're 
                competing at club level or aiming for international competition, we're here to 
                support your journey.
              </p>
            </section>

            <section>
              <h2 className="heading-3 mb-6 text-text-primary">Get in Touch</h2>
              <p className="text-body mb-8 text-lg leading-relaxed">
                Have questions about our products or need advice on equipment selection? 
                We're here to help.
              </p>
              <a href="/contact" className="btn btn-primary">
                Contact Us
              </a>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
