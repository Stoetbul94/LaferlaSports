export const metadata = {
  title: 'Shipping & Order Process - Laferla Sports',
  description: 'Learn about our order process, shipping information, and delivery options for ISSF shooting equipment in South Africa.',
};

export default function ShippingPage() {
  return (
    <div className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="heading-1 mb-8">Shipping & Order Process</h1>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="heading-3 mb-4">How Our Order Process Works</h2>
              <p className="text-body mb-6">
                Laferla Sports uses a request-based ordering system. We do not process payments 
                online. Instead, you submit an order request, and we'll send you an invoice via email.
              </p>

              <div className="space-y-6">
                <div className="bg-primary-50 rounded-lg p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-900 text-white rounded-full flex items-center justify-center font-bold mr-4">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Browse & Add to Cart</h3>
                      <p className="text-primary-700">
                        Browse our catalog of ISSF-compliant equipment and add products to your 
                        enquiry cart. Review your selections and quantities.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary-50 rounded-lg p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-900 text-white rounded-full flex items-center justify-center font-bold mr-4">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Submit Order Request</h3>
                      <p className="text-primary-700">
                        Complete the order request form with your contact and delivery information. 
                        Include any special notes or requirements. Submit your request.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary-50 rounded-lg p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-900 text-white rounded-full flex items-center justify-center font-bold mr-4">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Receive Invoice</h3>
                      <p className="text-primary-700">
                        We'll review your order request, verify product availability, and send you 
                        a detailed invoice via email. The invoice will include payment instructions 
                        and bank transfer details.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary-50 rounded-lg p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-900 text-white rounded-full flex items-center justify-center font-bold mr-4">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Complete Payment</h3>
                      <p className="text-primary-700">
                        Make payment via bank transfer using the details provided in your invoice. 
                        Once payment is confirmed, we'll process your order.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary-50 rounded-lg p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-900 text-white rounded-full flex items-center justify-center font-bold mr-4">
                      5
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Shipping & Delivery</h3>
                      <p className="text-primary-700">
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
              <h2 className="heading-3 mb-4">Shipping Information</h2>
              
              <div className="bg-primary-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-lg mb-3">Delivery Areas</h3>
                <p className="text-primary-700 mb-2">
                  We ship throughout South Africa. Shipping costs and delivery times vary based on:
                </p>
                <ul className="list-disc list-inside space-y-1 text-primary-700">
                  <li>Your location</li>
                  <li>Product size and weight</li>
                  <li>Shipping method selected</li>
                  <li>Product availability</li>
                </ul>
              </div>

              <div className="bg-primary-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-lg mb-3">Shipping Costs</h3>
                <p className="text-primary-700">
                  Shipping costs will be calculated and included in your invoice. For large or 
                  heavy items, we may contact you to discuss shipping options and costs before 
                  finalizing your order.
                </p>
              </div>

              <div className="bg-primary-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">Delivery Times</h3>
                <p className="text-primary-700 mb-2">
                  Typical delivery times (after payment confirmation):
                </p>
                <ul className="list-disc list-inside space-y-1 text-primary-700">
                  <li>Major cities: 3-5 business days</li>
                  <li>Regional areas: 5-7 business days</li>
                  <li>Remote areas: 7-10 business days</li>
                </ul>
                <p className="text-primary-700 mt-3 text-sm">
                  Note: Delivery times may vary based on product availability and shipping carrier schedules.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="heading-3 mb-4">Important Notes</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-accent pl-4">
                  <h3 className="font-semibold mb-2">Product Availability</h3>
                  <p className="text-primary-700">
                    Some products may need to be ordered from suppliers. We'll inform you of any 
                    extended lead times in your invoice.
                  </p>
                </div>
                <div className="border-l-4 border-accent pl-4">
                  <h3 className="font-semibold mb-2">Payment Terms</h3>
                  <p className="text-primary-700">
                    Payment is required before shipping. Bank transfer is our standard payment method. 
                    Payment details will be provided in your invoice.
                  </p>
                </div>
                <div className="border-l-4 border-accent pl-4">
                  <h3 className="font-semibold mb-2">Order Changes</h3>
                  <p className="text-primary-700">
                    If you need to modify or cancel your order, please contact us as soon as possible. 
                    Changes may not be possible once payment has been processed.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="heading-3 mb-4">Questions?</h2>
              <p className="text-body mb-6">
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

