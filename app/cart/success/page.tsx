'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/cart-store';
import { useEffect } from 'react';

export default function OrderSuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart);

  // Clear cart on successful order
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="section-padding bg-dark">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-12">
            <div className="w-24 h-24 bg-accent/20 border-2 border-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="heading-2 mb-6 text-text-primary">Order Request Submitted</h1>
            <p className="text-body mb-8 text-lg leading-relaxed">
              Thank you for your order request! We've received your enquiry and will process it shortly.
            </p>
          </div>

          <div className="bg-dark-lighter border border-dark-border rounded-lg p-8 mb-10 text-left">
            <h2 className="font-bold text-xl mb-6 text-text-primary uppercase tracking-wide">What Happens Next?</h2>
            <ol className="space-y-4 text-text-secondary">
              <li className="flex items-start">
                <span className="font-black text-accent mr-4 text-xl">1.</span>
                <span className="leading-relaxed">We'll review your order request and verify product availability.</span>
              </li>
              <li className="flex items-start">
                <span className="font-black text-accent mr-4 text-xl">2.</span>
                <span className="leading-relaxed">You'll receive an invoice via email with payment instructions.</span>
              </li>
              <li className="flex items-start">
                <span className="font-black text-accent mr-4 text-xl">3.</span>
                <span className="leading-relaxed">Complete payment via bank transfer using the details provided.</span>
              </li>
              <li className="flex items-start">
                <span className="font-black text-accent mr-4 text-xl">4.</span>
                <span className="leading-relaxed">Once payment is confirmed, we'll arrange shipping to your address.</span>
              </li>
            </ol>
          </div>

          <div className="space-y-6">
            <p className="text-text-secondary text-lg">
              If you have any questions about your order, please don't hesitate to{' '}
              <Link href="/contact" className="text-accent hover:text-accent-light transition-colors">
                contact us
              </Link>
              .
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop" className="btn btn-primary">
                Continue Shopping
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
