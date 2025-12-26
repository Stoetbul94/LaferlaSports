export const metadata = {
  title: 'Capapie Brand - Laferla Sports',
  description: 'Learn about Capapie, the premier manufacturer of ISSF competition shooting equipment. Official authorized dealer in South Africa.',
};

export default function CapapiePage() {
  return (
    <div className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="heading-1 mb-8">Capapie - Precision Shooting Equipment</h1>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="heading-3 mb-4">About Capapie</h2>
              <p className="text-body mb-4">
                Capapie is a leading manufacturer of professional-grade shooting sports equipment, 
                specializing in ISSF-compliant competition pistols, rifles, and accessories. With 
                decades of experience in precision engineering and a deep understanding of competitive 
                shooting requirements, Capapie has established itself as a trusted name among 
                competitive shooters worldwide.
              </p>
              <p className="text-body">
                Capapie products are designed in collaboration with world-class shooters and 
                engineers, ensuring that every piece of equipment meets the exacting standards 
                required for international competition. From club-level competitions to World 
                Championships and Olympic Games, Capapie equipment has been trusted by shooters 
                at every level.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="heading-3 mb-4">Why Capapie?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-primary-50 rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-2">ISSF Compliance</h3>
                  <p className="text-primary-700">
                    All Capapie products are designed and manufactured to meet or exceed ISSF 
                    regulations. Every product is verified for competition compliance.
                  </p>
                </div>
                <div className="bg-primary-50 rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-2">Precision Engineering</h3>
                  <p className="text-primary-700">
                    Capapie's commitment to precision engineering ensures consistent performance 
                    and reliability that competitive shooters demand.
                  </p>
                </div>
                <div className="bg-primary-50 rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-2">Proven Performance</h3>
                  <p className="text-primary-700">
                    Capapie equipment has been used by shooters competing at the highest levels, 
                    including World Championships and Olympic competitions.
                  </p>
                </div>
                <div className="bg-primary-50 rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-2">Innovation</h3>
                  <p className="text-primary-700">
                    Continuous innovation and refinement based on feedback from competitive shooters 
                    ensures Capapie products remain at the forefront of shooting sports technology.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="heading-3 mb-4">Product Range</h2>
              <p className="text-body mb-4">
                Capapie offers a comprehensive range of ISSF competition equipment:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body text-primary-700">
                <li><strong>Competition Pistols:</strong> 10m air pistols and 25m sport pistols designed for precision and consistency</li>
                <li><strong>Competition Rifles:</strong> 10m air rifles and 50m precision rifles with advanced barrel and stock technology</li>
                <li><strong>Shooting Apparel:</strong> ISSF-compliant jackets, pants, and accessories with advanced support systems</li>
                <li><strong>Accessories:</strong> Precision sights, adjustable grips, and essential competition accessories</li>
                <li><strong>Ammunition:</strong> Competition-grade ammunition optimized for precision shooting</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="heading-3 mb-4">Authorized Dealer</h2>
              <p className="text-body mb-4">
                Laferla Sports is proud to be an authorized Capapie dealer in South Africa. 
                This authorization ensures:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body text-primary-700">
                <li>Access to genuine Capapie products with full manufacturer warranty</li>
                <li>Direct relationship with Capapie for product support and service</li>
                <li>Latest product releases and updates</li>
                <li>Expert knowledge of Capapie products and their application in competitive shooting</li>
                <li>Competitive pricing through direct dealer relationships</li>
              </ul>
            </section>

            <section>
              <h2 className="heading-3 mb-4">Explore Capapie Products</h2>
              <p className="text-body mb-6">
                Browse our selection of Capapie competition equipment, all verified for ISSF 
                compliance and backed by our expertise.
              </p>
              <a href="/shop" className="btn btn-primary">
                View Capapie Products
              </a>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

