'use client';

import { useCartStore } from '@/lib/cart-store';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import OrderRequestForm from '@/components/OrderRequestForm';
import SafeProductImage from '@/components/SafeProductImage';

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="section-padding bg-dark">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center py-20">
            <h1 className="heading-2 mb-6 text-text-primary">Your Quote Request is Empty</h1>
            <p className="text-body mb-10 text-lg">
              Add the products you&apos;re interested in, then send us a quote request. We&apos;ll
              reply with pricing and availability.
            </p>
            <Link href="/shop" className="btn btn-primary">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding bg-dark">
      <div className="container-custom">
        <h1 className="heading-2 mb-12 text-text-primary">Quote Request</h1>

        {!showForm ? (
          <>
            <div className="mb-12">
              <div className="bg-dark-lighter border border-accent/30 rounded-lg p-6 mb-6">
                <p className="text-sm text-text-secondary">
                  <strong className="text-text-primary">How it works:</strong> Add products to this
                  list and submit your details. We&apos;ll email you a personalised quote with
                  pricing, availability and delivery options. No payment is taken online.
                </p>
              </div>

              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.product.slug}
                    className="bg-dark-lighter border border-dark-border rounded-lg p-6 flex flex-col sm:flex-row gap-6 hover:border-accent/50 transition-colors"
                  >
                    <Link
                      href={`/shop/${item.product.slug}`}
                      className="flex-shrink-0 w-28 h-28 relative bg-white rounded-lg overflow-hidden border border-dark-border"
                    >
                      <SafeProductImage
                        src={item.product.image_path}
                        alt={item.product.name}
                        fill
                        className="object-contain"
                        sizes="112px"
                      />
                    </Link>

                    <div className="flex-grow">
                      <Link
                        href={`/shop/${item.product.slug}`}
                        className="font-bold text-lg text-text-primary hover:text-accent transition-colors block mb-2"
                      >
                        {item.product.name}
                      </Link>
                      <div className="text-sm text-text-secondary uppercase tracking-wide">
                        {item.product.category} · SKU: {item.product.product_code}
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex items-center border border-dark-border rounded bg-dark">
                        <button
                          onClick={() => updateQuantity(item.product.slug, item.quantity - 1)}
                          className="px-4 py-2 text-text-primary hover:text-accent hover:bg-dark-lighter transition-colors"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="px-6 py-2 min-w-[4rem] text-center font-bold text-text-primary border-x border-dark-border">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.slug, item.quantity + 1)}
                          className="px-4 py-2 text-text-primary hover:text-accent hover:bg-dark-lighter transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.product.slug)}
                        className="p-2 text-text-secondary hover:text-accent transition-colors"
                        aria-label="Remove item"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-dark-border pt-10">
              <div className="max-w-md ml-auto space-y-6">
                <div className="bg-dark-lighter border border-dark-border rounded-lg p-6">
                  <p className="mb-4 font-bold text-text-primary uppercase tracking-wide text-sm">
                    What happens next?
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-text-secondary text-sm">
                    <li>Submit your quote request</li>
                    <li>We reply by email with pricing &amp; availability</li>
                    <li>You confirm and we issue an invoice</li>
                    <li>We arrange delivery on payment</li>
                  </ol>
                </div>

                <div className="flex gap-4">
                  <Link href="/shop" className="btn btn-secondary flex-1">
                    Continue Browsing
                  </Link>
                  <button onClick={() => setShowForm(true)} className="btn btn-primary flex-1">
                    Request Quote
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <OrderRequestForm
            items={items}
            onCancel={() => setShowForm(false)}
            onSuccess={() => router.push('/cart/success')}
          />
        )}
      </div>
    </div>
  );
}
