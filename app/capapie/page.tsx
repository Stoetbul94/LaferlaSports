import Link from 'next/link';

export const metadata = {
  title: 'Capapie Brand',
  description: 'Learn about Capapie, the premier manufacturer of ISSF competition shooting equipment. Official authorized dealer in South Africa.',
};

export default function CapapiePage() {
  return (
    <div className="section-padding bg-dark">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="heading-1 mb-12 text-text-primary">Capapie - Precision Shooting Equipment</h1>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="heading-3 mb-6 text-text-primary">About Capapie</h2>
              <p className="text-body mb-6 text-lg leading-relaxed">
                Capapie is a leading manufacturer of professional-grade shooting sports equipment, 
                specializing in ISSF-compliant competition pistols, rifles, and accessories. With 
                decades of experience in precision engineering and a deep understanding of competitive 
                shooting requirements, Capapie has established itself as a trusted name among 
                competitive shooters worldwide.
              </p>
              <p className="text-body text-lg leading-relaxed">
                Capapie products are designed in collaboration with world-class shooters and 
                engineers, ensuring that every piece of equipment meets the exacting standards 
                required for international competition. From club-level competitions to World 
                Championships and Olympic Games, Capapie equipment has been trusted by shooters 
                at every level.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="heading-3 mb-8 text-text-primary">Why Capapie?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-dark-lighter border border-dark-border rounded-lg p-6">
                  <h3 className="font-bold text-xl mb-3 text-text-primary uppercase tracking-wide">ISSF Compliance</h3>
                  <p className="text-text-secondary leading-relaxed">
                    All Capapie products are designed and manufactured to meet or exceed ISSF 
                    regulations. Every product is verified for competition compliance.
                  </p>
                </div>
                <div className="bg-dark-lighter border border-dark-border rounded-lg p-6">
                  <h3 className="font-bold text-xl mb-3 text-text-primary uppercase tracking-wide">Precision Engineering</h3>
                  <p className="text-text-secondary leading-relaxed">
                    Capapie’s commitment to precision engineering ensures consistent performance 
                    and reliability that competitive shooters demand.
                  </p>
                </div>
                <div className="bg-dark-lighter border border-dark-border rounded-lg p-6">
                  <h3 className="font-bold text-xl mb-3 text-text-primary uppercase tracking-wide">Proven Performance</h3>
                  <p className="text-text-secondary leading-relaxed">
                    Capapie equipment has been used by shooters competing at the highest levels, 
                    including World Championships and Olympic competitions.
                  </p>
                </div>
                <div className="bg-dark-lighter border border-dark-border rounded-lg p-6">
                  <h3 className="font-bold text-xl mb-3 text-text-primary uppercase tracking-wide">Innovation</h3>
                  <p className="text-text-secondary leading-relaxed">
                    Continuous innovation and refinement based on feedback from competitive shooters 
                    ensures Capapie products remain at the forefront of shooting sports technology.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="heading-3 mb-6 text-text-primary">Product Range</h2>
              <p className="text-body mb-6 text-lg leading-relaxed">
                Capapie offers a comprehensive range of ISSF competition equipment:
              </p>
              <ul className="list-disc list-inside space-y-3 text-body text-text-secondary text-lg">
                <li><strong className="text-text-primary">Competition Pistols:</strong> 10m air pistols and 25m sport pistols designed for precision and consistency</li>
                <li><strong className="text-text-primary">Competition Rifles:</strong> 10m air rifles and 50m precision rifles with advanced barrel and stock technology</li>
                <li><strong className="text-text-primary">Shooting Apparel:</strong> ISSF-compliant jackets, pants, and accessories with advanced support systems</li>
                <li><strong className="text-text-primary">Accessories:</strong> Precision sights, adjustable grips, and essential competition accessories</li>
                <li><strong className="text-text-primary">Ammunition:</strong> Competition-grade ammunition optimized for precision shooting</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="heading-3 mb-6 text-text-primary">Authorized Dealer</h2>
              <p className="text-body mb-6 text-lg leading-relaxed">
                Laferla Sports is proud to be an authorized Capapie dealer in South Africa. 
                This authorization ensures:
              </p>
              <ul className="list-disc list-inside space-y-3 text-body text-text-secondary text-lg">
                <li>Access to genuine Capapie products with full manufacturer warranty</li>
                <li>Direct relationship with Capapie for product support and service</li>
                <li>Latest product releases and updates</li>
                <li>Expert knowledge of Capapie products and their application in competitive shooting</li>
                <li>Competitive pricing through direct dealer relationships</li>
              </ul>
            </section>

            <section>
              <h2 className="heading-3 mb-6 text-text-primary">Explore Capapie Products</h2>
              <p className="text-body mb-8 text-lg leading-relaxed">
                Browse our selection of Capapie competition equipment, all verified for ISSF 
                compliance and backed by our expertise.
              </p>
              <Link href="/shop" className="btn btn-primary">
                View Capapie Products
              </Link>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
