export const metadata = {
  title: 'About Us - Laferla Sports',
  description: 'Learn about Laferla Sports, South Africa\'s authorized Capapie dealer specializing in ISSF shooting sports equipment.',
};

export default function AboutPage() {
  return (
    <div className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="heading-1 mb-8">About Laferla Sports</h1>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="heading-3 mb-4">Our Mission</h2>
              <p className="text-body mb-4">
                Laferla Sports is South Africa's premier authorized dealer for Capapie, 
                specializing in ISSF (International Shooting Sport Federation) competition 
                equipment. We are dedicated to serving competitive shooters, shooting clubs, 
                coaches, and serious enthusiasts with professional-grade equipment that meets 
                the highest international standards.
              </p>
              <p className="text-body">
                Our commitment is to provide not just products, but expertise, support, and 
                service that helps shooters achieve their competitive goals. Every product we 
                offer is verified for ISSF compliance and backed by our knowledge of competitive 
                shooting requirements.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="heading-3 mb-4">Why Choose Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-primary-50 rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-2">Authorized Dealer</h3>
                  <p className="text-primary-700">
                    As an official Capapie dealer, we have direct access to the latest 
                    competition equipment and can provide authentic, warranty-backed products.
                  </p>
                </div>
                <div className="bg-primary-50 rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-2">ISSF Expertise</h3>
                  <p className="text-primary-700">
                    Our team understands ISSF regulations and competition requirements. 
                    We help you select equipment that meets all compliance standards.
                  </p>
                </div>
                <div className="bg-primary-50 rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-2">South African Focus</h3>
                  <p className="text-primary-700">
                    We understand the local shooting sports community and provide support 
                    tailored to South African competitive shooters.
                  </p>
                </div>
                <div className="bg-primary-50 rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-2">Quality Assurance</h3>
                  <p className="text-primary-700">
                    Every product is verified for quality and ISSF compliance before 
                    being offered to our customers.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="heading-3 mb-4">Our Products</h2>
              <p className="text-body mb-4">
                We specialize in ISSF-compliant equipment across all disciplines:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body text-primary-700">
                <li><strong>Pistol Equipment:</strong> Competition air pistols and accessories for 10m and 25m events</li>
                <li><strong>Rifle Equipment:</strong> Precision air rifles and accessories for 10m and 50m events</li>
                <li><strong>Shotgun Equipment:</strong> Competition shotguns and accessories for trap and skeet</li>
                <li><strong>Apparel:</strong> ISSF-compliant shooting jackets, pants, and accessories</li>
                <li><strong>Accessories:</strong> Sights, grips, ammunition, and essential competition gear</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="heading-3 mb-4">Our Commitment</h2>
              <p className="text-body">
                At Laferla Sports, we believe that competitive shooting requires precision, 
                dedication, and the right equipment. We're committed to providing that equipment 
                along with the knowledge and support that helps shooters excel. Whether you're 
                competing at club level or aiming for international competition, we're here to 
                support your journey.
              </p>
            </section>

            <section>
              <h2 className="heading-3 mb-4">Get in Touch</h2>
              <p className="text-body mb-4">
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

