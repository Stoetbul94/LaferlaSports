export const metadata = {
  title: 'Privacy Policy - Laferla Sports',
  description: 'Privacy policy for Laferla Sports website and order requests.',
};

export default function PrivacyPage() {
  return (
    <div className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="heading-1 mb-8">Privacy Policy</h1>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="heading-3 mb-4">Introduction</h2>
              <p className="text-body">
                Laferla Sports ("we", "our", or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, and protect your personal 
                information when you use our website and services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">Information We Collect</h2>
              <p className="text-body mb-4">We collect the following types of information:</p>
              
              <div className="bg-primary-50 rounded-lg p-6 mb-4">
                <h3 className="font-semibold text-lg mb-3">Information You Provide</h3>
                <ul className="list-disc list-inside space-y-2 text-primary-700">
                  <li>Name and contact information (email, phone, address)</li>
                  <li>Order request information and product selections</li>
                  <li>Messages and communications you send to us</li>
                </ul>
              </div>

              <div className="bg-primary-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">Automatically Collected Information</h3>
                <ul className="list-disc list-inside space-y-2 text-primary-700">
                  <li>Browser type and version</li>
                  <li>IP address and location data</li>
                  <li>Pages visited and time spent on pages</li>
                  <li>Referring website addresses</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">How We Use Your Information</h2>
              <p className="text-body mb-4">We use your information for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2 text-body text-primary-700">
                <li>Processing and fulfilling your order requests</li>
                <li>Communicating with you about your orders and inquiries</li>
                <li>Sending invoices and payment information</li>
                <li>Improving our website and services</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">Information Sharing</h2>
              <p className="text-body mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may 
                share your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body text-primary-700">
                <li>With shipping carriers to fulfill your orders</li>
                <li>With service providers who assist in operating our website and business</li>
                <li>When required by law or to protect our rights</li>
                <li>With your explicit consent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">Data Security</h2>
              <p className="text-body">
                We implement appropriate technical and organizational measures to protect your 
                personal information against unauthorized access, alteration, disclosure, or 
                destruction. However, no method of transmission over the internet or electronic 
                storage is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">Your Rights</h2>
              <p className="text-body mb-4">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 text-body text-primary-700">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Object to processing of your information</li>
                <li>Request restriction of processing</li>
              </ul>
              <p className="text-body mt-4">
                To exercise these rights, please contact us at{' '}
                <a href="mailto:info@laferlasports.co.za" className="text-accent hover:underline">
                  info@laferlasports.co.za
                </a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">Cookies</h2>
              <p className="text-body">
                We use cookies and similar technologies to enhance your experience, analyze usage, 
                and assist in our marketing efforts. You can control cookies through your browser 
                settings, but this may affect website functionality.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">Changes to This Policy</h2>
              <p className="text-body">
                We may update this Privacy Policy from time to time. We will notify you of any 
                changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="heading-3 mb-4">Contact Us</h2>
              <p className="text-body">
                If you have questions about this Privacy Policy, please contact us at{' '}
                <a href="mailto:info@laferlasports.co.za" className="text-accent hover:underline">
                  info@laferlasports.co.za
                </a>
              </p>
            </section>

            <div className="mt-12 pt-8 border-t border-primary-200 text-sm text-primary-600">
              <p>Last updated: {new Date().toLocaleDateString('en-ZA')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

