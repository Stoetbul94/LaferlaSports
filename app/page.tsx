import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedProducts } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-6">
              Precision Shooting Equipment for Competitive Excellence
            </h1>
            <p className="text-body mb-8 max-w-2xl mx-auto">
              Laferla Sports is South Africa's authorized Capapie dealer, specializing in 
              ISSF-compliant shooting sports equipment. We serve competitive shooters, clubs, 
              coaches, and serious enthusiasts with professional-grade pistols, rifles, and accessories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop" className="btn btn-primary">
                Browse Products
              </Link>
              <Link href="/about" className="btn btn-outline">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="heading-3 mb-2">ISSF Compliant</h3>
              <p className="text-primary-600">
                All products meet International Shooting Sport Federation standards and regulations.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="heading-3 mb-2">Authorized Dealer</h3>
              <p className="text-primary-600">
                Official Capapie dealer with direct access to the latest competition equipment.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="heading-3 mb-2">South Africa</h3>
              <p className="text-primary-600">
                Serving competitive shooters across South Africa with expert support and service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="section-padding bg-primary-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="heading-2 mb-4">Featured Products</h2>
              <p className="text-body max-w-2xl mx-auto">
                Discover our selection of professional-grade ISSF competition equipment
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/shop" className="btn btn-primary">
                View All Products
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* About Preview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="heading-2 mb-6">Why Choose Laferla Sports?</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Expert Knowledge</h3>
                    <p className="text-primary-600">
                      Our team understands ISSF regulations and competitive shooting requirements. 
                      We provide expert guidance to help you select the right equipment.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Genuine Products</h3>
                    <p className="text-primary-600">
                      As an authorized Capapie dealer, we guarantee authentic, warranty-backed 
                      products that meet the highest quality standards.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Competitive Pricing</h3>
                    <p className="text-primary-600">
                      Direct dealer relationships ensure competitive pricing on all Capapie 
                      products and accessories.
                    </p>
                  </div>
                </div>
                <div className="mt-8">
                  <Link href="/about" className="btn btn-outline">
                    Learn More About Us
                  </Link>
                </div>
              </div>
              <div className="bg-primary-100 rounded-lg p-8 text-center">
                <div className="text-4xl font-bold text-primary-900 mb-2">ISSF</div>
                <div className="text-primary-600 mb-4">Compliant Equipment</div>
                <p className="text-sm text-primary-700">
                  All products are verified for ISSF competition compliance and meet 
                  international standards for competitive shooting sports.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-900 text-white">
        <div className="container-custom text-center">
          <h2 className="heading-2 mb-6 text-white">Ready to Elevate Your Shooting?</h2>
          <p className="text-lg text-primary-200 mb-8 max-w-2xl mx-auto">
            Browse our complete catalog of ISSF-compliant equipment and submit an order request. 
            Our team will prepare your invoice and arrange delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="btn btn-accent">
              Start Shopping
            </Link>
            <Link href="/contact" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary-900">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

