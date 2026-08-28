export const metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and conditions for requesting quotes and ordering Capapie shooting equipment from Laferla Sports.',
  alternates: { canonical: '/legal' },
};

export default function LegalPage() {
  return (
    <div className="section-padding bg-dark">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="heading-1 mb-12 text-text-primary">Terms & Conditions</h1>

          <div className="prose prose-lg max-w-none">
            <section className="mb-10">
              <h2 className="heading-3 mb-6 text-text-primary">1. Order Requests</h2>
              <p className="text-body mb-4 text-lg leading-relaxed">
                By submitting an order request through our website, you are requesting a quote 
                and invoice for the selected products. Order requests are not binding until 
                payment is received and confirmed.
              </p>
              <p className="text-body text-lg leading-relaxed">
                We reserve the right to decline order requests at our discretion, including 
                but not limited to cases where products are unavailable, pricing errors are 
                identified, or we are unable to fulfill the order for any reason.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="heading-3 mb-6 text-text-primary">2. Pricing</h2>
              <p className="text-body mb-4 text-lg leading-relaxed">
                All prices are displayed in South African Rand (ZAR) and are subject to change 
                without notice. The final price will be confirmed in your invoice.
              </p>
              <p className="text-body text-lg leading-relaxed">
                Prices do not include shipping costs unless otherwise stated. Shipping costs 
                will be calculated and included in your invoice.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="heading-3 mb-6 text-text-primary">3. Payment</h2>
              <p className="text-body mb-4 text-lg leading-relaxed">
                Payment is required before products are shipped. We accept bank transfers as 
                our standard payment method. Payment details will be provided in your invoice.
              </p>
              <p className="text-body text-lg leading-relaxed">
                Orders will only be processed after payment is confirmed. We are not responsible 
                for delays caused by payment processing or bank transfers.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="heading-3 mb-6 text-text-primary">4. Shipping & Delivery</h2>
              <p className="text-body mb-4 text-lg leading-relaxed">
                We will arrange shipping once payment is confirmed. Delivery times are estimates 
                and may vary based on location, product availability, and shipping carrier schedules.
              </p>
              <p className="text-body text-lg leading-relaxed">
                Risk of loss and title to products pass to you upon delivery to the shipping carrier. 
                We are not responsible for delays or issues caused by shipping carriers.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="heading-3 mb-6 text-text-primary">5. Returns & Refunds</h2>
              <p className="text-body mb-4 text-lg leading-relaxed">
                Returns are accepted within 14 days of delivery, subject to the following conditions:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body text-text-secondary mb-4 text-lg">
                <li>Products must be in original, unused condition</li>
                <li>Products must be in original packaging</li>
                <li>Return shipping costs are the responsibility of the customer</li>
                <li>Custom or special order items may not be returnable</li>
              </ul>
              <p className="text-body text-lg leading-relaxed">
                Refunds will be processed after we receive and inspect returned products. Refunds 
                may take 5-10 business days to process.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="heading-3 mb-6 text-text-primary">6. Product Information</h2>
              <p className="text-body mb-4 text-lg leading-relaxed">
                We strive to provide accurate product information, specifications, and images. 
                However, we do not warrant that product descriptions or other content is accurate, 
                complete, reliable, current, or error-free.
              </p>
              <p className="text-body text-lg leading-relaxed">
                Product images are for illustrative purposes and may not reflect the exact 
                appearance of the product.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="heading-3 mb-6 text-text-primary">7. ISSF Compliance</h2>
              <p className="text-body mb-4 text-lg leading-relaxed">
                Products marked as ISSF-compliant are verified to meet ISSF regulations at the 
                time of listing. However, ISSF regulations may change, and it is the customer’s 
                responsibility to verify current compliance for their specific competition requirements.
              </p>
              <p className="text-body text-lg leading-relaxed">
                We are not responsible for any issues arising from changes in ISSF regulations 
                or competition requirements.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="heading-3 mb-6 text-text-primary">8. Limitation of Liability</h2>
              <p className="text-body text-lg leading-relaxed">
                To the maximum extent permitted by law, Laferla Sports shall not be liable for 
                any indirect, incidental, special, consequential, or punitive damages, or any 
                loss of profits or revenues, whether incurred directly or indirectly, or any loss 
                of data, use, goodwill, or other intangible losses.
              </p>
            </section>

            <section>
              <h2 className="heading-3 mb-6 text-text-primary">9. Contact</h2>
              <p className="text-body text-lg leading-relaxed">
                If you have questions about these terms and conditions, please contact us at{' '}
                <a href="mailto:info@laferlasports.com" className="text-accent hover:text-accent-light transition-colors">
                  info@laferlasports.com
                </a>
              </p>
            </section>

            <div className="mt-12 pt-8 border-t border-dark-border text-sm text-text-muted">
              <p>Last updated: {new Date().toLocaleDateString('en-ZA')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
