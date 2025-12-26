import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedCapapieProducts } from '@/lib/capapie-products';
import FeaturedProductCard from '@/components/FeaturedProductCard';
import { DisplayProduct } from '@/types/product-data';

export default function HomePage() {
  const featuredProducts = getFeaturedCapapieProducts();

  return (
    <>
      {/* Hero Section */}
      <section className="relative section-padding overflow-hidden min-h-[90vh] flex items-center bg-dark">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 flex items-center justify-end pointer-events-none">
          <div className="relative w-full h-[95%]" style={{
            top: '50%',
            transform: 'translateY(-50%)',
          }}>
            <Image
              src="/images/MainBackground2.png"
              alt=""
              fill
              className="object-cover object-right"
              style={{
                transform: 'scale(1.1)',
                transformOrigin: 'right center',
                filter: 'brightness(1.12) contrast(1.05)',
              }}
              priority
              sizes="100vw"
            />
          </div>
        </div>
        
        {/* Gradient Overlay - Lighter on right, darker on left */}
        <div className="absolute inset-0 z-[1]" style={{
          background: 'linear-gradient(to right, rgba(11,11,11,0.70) 0%, rgba(11,11,11,0.50) 50%, rgba(11,11,11,0.30) 100%)'
        }}></div>
        
        <div className="container-custom relative z-[2]">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[70vh]">
              {/* Left: Text Content */}
              <div className="text-center lg:text-left">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-widest leading-tight mb-6 text-text-primary">
                  ELITE TRAINING.<br />
                  UNRIVALED PRECISION.
                </h1>
                <p className="text-lg md:text-xl text-text-secondary mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Professional precision shooting equipment and coaching for competitive excellence.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link href="/shop" className="btn btn-primary">
                    EXPLORE GEAR
                  </Link>
                  <Link href="/coaching" className="btn btn-secondary">
                    BOOK COACHING
                  </Link>
                </div>
              </div>
              
              {/* Right: Product Image Space - Background image shows through */}
              <div className="hidden lg:block"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-dark-lighter border-y border-dark-border">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-dark border-2 border-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="heading-3 mb-4 text-text-primary">ISSF Compliant</h3>
              <p className="text-text-secondary">
                All products meet International Shooting Sport Federation standards and regulations.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-dark border-2 border-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="heading-3 mb-4 text-text-primary">Authorized Dealer</h3>
              <p className="text-text-secondary">
                Official Capapie dealer with direct access to the latest competition equipment.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-dark border-2 border-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="heading-3 mb-4 text-text-primary">South Africa</h3>
              <p className="text-text-secondary">
                Serving competitive shooters across South Africa with expert support and service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="section-padding bg-dark relative overflow-hidden">
          {/* Subtle background accent */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />
          
          <div className="container-custom relative z-10">
            <div className="text-center mb-16">
              <h2 className="heading-2 mb-6 text-text-primary">Featured Products</h2>
              <p className="text-body max-w-2xl mx-auto text-lg">
                Discover our selection of professional-grade ISSF competition equipment
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product: DisplayProduct) => (
                <FeaturedProductCard key={product.product_code} product={product} />
              ))}
            </div>
            <div className="text-center mt-16">
              <Link href="/shop" className="btn btn-primary">
                View All Products
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* About Preview */}
      <section className="section-padding bg-dark-lighter border-y border-dark-border">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="heading-2 mb-8 text-text-primary">Why Choose Laferla Sports?</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-xl mb-3 text-text-primary uppercase tracking-wide">Expert Knowledge</h3>
                    <p className="text-text-secondary leading-relaxed">
                      Our team understands ISSF regulations and competitive shooting requirements. 
                      We provide expert guidance to help you select the right equipment.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-3 text-text-primary uppercase tracking-wide">Genuine Products</h3>
                    <p className="text-text-secondary leading-relaxed">
                      As an authorized Capapie dealer, we guarantee authentic, warranty-backed 
                      products that meet the highest quality standards.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-3 text-text-primary uppercase tracking-wide">Competitive Pricing</h3>
                    <p className="text-text-secondary leading-relaxed">
                      Direct dealer relationships ensure competitive pricing on all Capapie 
                      products and accessories.
                    </p>
                  </div>
                </div>
                <div className="mt-10">
                  <Link href="/about" className="btn btn-secondary">
                    Learn More About Us
                  </Link>
                </div>
              </div>
              <div className="bg-dark border-2 border-accent rounded-lg p-12 text-center">
                <div className="text-6xl font-black text-accent mb-4 uppercase tracking-widest">ISSF</div>
                <div className="text-text-primary font-bold uppercase tracking-wide mb-6 text-lg">Compliant Equipment</div>
                <p className="text-text-secondary leading-relaxed">
                  All products are verified for ISSF competition compliance and meet 
                  international standards for competitive shooting sports.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-accent/10"></div>
        <div className="container-custom text-center relative z-10">
          <h2 className="heading-2 mb-8 text-text-primary">Ready to Elevate Your Shooting?</h2>
          <p className="text-lg text-text-secondary mb-12 max-w-2xl mx-auto leading-relaxed">
            Browse our complete catalog of ISSF-compliant equipment and submit an order request. 
            Our team will prepare your invoice and arrange delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/shop" className="btn btn-primary">
              Start Shopping
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}


