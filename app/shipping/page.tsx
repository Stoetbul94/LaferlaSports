export const metadata = {
  title: 'Shipping & Order Process - Laferla Sports',
  description: 'Learn about our order process, shipping information, and delivery options for ISSF shooting equipment in South Africa.',
};

export default function ShippingPage() {
  return (
    <div className="section-padding bg-dark">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="heading-1 mb-12 text-text-primary">Shipping & Order Process</h1>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="heading-3 mb-6 text-text-primary">How Our Order Process Works</h2>
              <p className="text-body mb-8 text-lg leading-relaxed">
                Laferla Sports uses a request-based ordering system. We do not process payments 
                online. Instead, you submit an order request, and we'll send you an invoice via email.
              </p>

              <div className="space-y-6">
                <div className="bg-dark-lighter border border-dark-border rounded-lg p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center font-black text-lg mr-6">
                      1
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-3 text-text-primary uppercase tracking-wide">Browse & Add to Cart</h3>
                      <p className="text-text-secondary leading-relaxed">
                        Browse our catalog of ISSF-compliant equipment and add products to your 
                        enquiry cart. Review your selections and quantities.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-dark-lighter border border-dark-border rounded-lg p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center font-black text-lg mr-6">
                      2
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-3 text-text-primary uppercase tracking-wide">Submit Order Request</h3>
                      <p className="text-text-secondary leading-relaxed">
                        Complete the order request form with your contact and delivery information. 
                        Include any special notes or requirements. Submit your request.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-dark-lighter border border-dark-border rounded-lg p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center font-black text-lg mr-6">
                      3
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-3 text-text-primary uppercase tracking-wide">Receive Invoice</h3>
                      <p className="text-text-secondary leading-relaxed">
                        We'll review your order request, verify product availability, and send you 
                        a detailed invoice via email. The invoice will include payment instructions 
                        and bank transfer details.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-dark-lighter border border-dark-border rounded-lg p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center font-black text-lg mr-6">
                      4
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-3 text-text-primary uppercase tracking-wide">Complete Payment</h3>
                      <p className="text-text-secondary leading-relaxed">
                        Make payment via bank transfer using the details provided in your invoice. 
                        Once payment is confirmed, we'll process your order.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-dark-lighter border border-dark-border rounded-lg p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center font-black text-lg mr-6">
                      5
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-3 text-text-primary uppercase tracking-wide">Shipping & Delivery</h3>
                      <p className="text-text-secondary leading-relaxed">
                        Once payment is confirmed, we'll arrange shipping to your address. You'll 
                        receive tracking information via email. Delivery times vary based on your 
                        location and product availability.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="heading-3 mb-8 text-text-primary">Shipping Information</h2>
              
              <div className="bg-dark-lighter border border-dark-border rounded-lg p-6 mb-6">
                <h3 className="font-bold text-xl mb-4 text-text-primary uppercase tracking-wide">Delivery Areas</h3>
                <p className="text-text-secondary mb-4 leading-relaxed">
                  We ship throughout South Africa. Shipping costs and delivery times vary based on:
                </p>
                <ul className="list-disc list-inside space-y-2 text-text-secondary">
                  <li>Your location</li>
                  <li>Product size and weight</li>
                  <li>Shipping method selected</li>
                  <li>Product availability</li>
                </ul>
              </div>

              <div className="bg-dark-lighter border border-dark-border rounded-lg p-6 mb-6">
                <h3 className="font-bold text-xl mb-4 text-text-primary uppercase tracking-wide">Shipping Costs</h3>
                <p className="text-text-secondary leading-relaxed">
                  Shipping costs will be calculated and included in your invoice. For large or 
                  heavy items, we may contact you to discuss shipping options and costs before 
                  finalizing your order.
                </p>
              </div>

              <div className="bg-dark-lighter border border-dark-border rounded-lg p-6">
                <h3 className="font-bold text-xl mb-4 text-text-primary uppercase tracking-wide">Delivery Times</h3>
                <p className="text-text-secondary mb-4 leading-relaxed">
                  Typical delivery times (after payment confirmation):
                </p>
                <ul className="list-disc list-inside space-y-2 text-text-secondary mb-4">
                  <li>Major cities: 3-5 business days</li>
                  <li>Regional areas: 5-7 business days</li>
                  <li>Remote areas: 7-10 business days</li>
                </ul>
                <p className="text-text-muted text-sm">
                  Note: Delivery times may vary based on product availability and shipping carrier schedules.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="heading-3 mb-8 text-text-primary">Important Notes</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-accent pl-6">
                  <h3 className="font-bold text-lg mb-3 text-text-primary uppercase tracking-wide">Product Availability</h3>
                  <p className="text-text-secondary leading-relaxed">
                    Some products may need to be ordered from suppliers. We'll inform you of any 
                    extended lead times in your invoice.
                  </p>
                </div>
                <div className="border-l-4 border-accent pl-6">
                  <h3 className="font-bold text-lg mb-3 text-text-primary uppercase tracking-wide">Payment Terms</h3>
                  <p className="text-text-secondary leading-relaxed">
                    Payment is required before shipping. Bank transfer is our standard payment method. 
                    Payment details will be provided in your invoice.
                  </p>
                </div>
                <div className="border-l-4 border-accent pl-6">
                  <h3 className="font-bold text-lg mb-3 text-text-primary uppercase tracking-wide">Order Changes</h3>
                  <p className="text-text-secondary leading-relaxed">
                    If you need to modify or cancel your order, please contact us as soon as possible. 
                    Changes may not be possible once payment has been processed.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="heading-3 mb-6 text-text-primary">Questions?</h2>
              <p className="text-body mb-8 text-lg leading-relaxed">
                If you have any questions about our order process, shipping, or delivery, 
                please don't hesitate to contact us.
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
