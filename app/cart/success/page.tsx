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
    <div className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-green-600"
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
            <h1 className="heading-2 mb-4">Order Request Submitted</h1>
            <p className="text-body mb-6">
              Thank you for your order request! We've received your enquiry and will process it shortly.
            </p>
          </div>

          <div className="bg-primary-50 rounded-lg p-6 mb-8 text-left">
            <h2 className="font-semibold text-lg mb-4">What Happens Next?</h2>
            <ol className="space-y-3 text-primary-700">
              <li className="flex items-start">
                <span className="font-bold mr-3">1.</span>
                <span>We'll review your order request and verify product availability.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">2.</span>
                <span>You'll receive an invoice via email with payment instructions.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">3.</span>
                <span>Complete payment via bank transfer using the details provided.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">4.</span>
                <span>Once payment is confirmed, we'll arrange shipping to your address.</span>
              </li>
            </ol>
          </div>

          <div className="space-y-4">
            <p className="text-primary-600">
              If you have any questions about your order, please don't hesitate to{' '}
              <Link href="/contact" className="text-accent hover:underline">
                contact us
              </Link>
              .
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop" className="btn btn-primary">
                Continue Shopping
              </Link>
              <Link href="/contact" className="btn btn-outline">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

