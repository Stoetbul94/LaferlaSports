'use client';

import { useCartStore } from '@/lib/cart-store';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import OrderRequestForm from '@/components/OrderRequestForm';

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  const totalPrice = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="section-padding bg-dark">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center py-20">
            <h1 className="heading-2 mb-6 text-text-primary">Your Enquiry Cart is Empty</h1>
            <p className="text-body mb-10 text-lg">
              Start adding products to your enquiry cart to submit an order request.
            </p>
            <Link href="/shop" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding bg-dark">
      <div className="container-custom">
        <h1 className="heading-2 mb-12 text-text-primary">Enquiry Cart</h1>

        {!showForm ? (
          <>
            {/* Cart Items */}
            <div className="mb-12">
              <div className="bg-dark-lighter border border-accent/30 rounded-lg p-6 mb-6">
                <p className="text-sm text-text-secondary">
                  <strong className="text-text-primary">Note:</strong> This is an enquiry cart. You'll submit an order request 
                  and we'll send you an invoice via email. No payment is processed online.
                </p>
              </div>

              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="bg-dark-lighter border border-dark-border rounded-lg p-6 flex flex-col sm:flex-row gap-6 hover:border-accent/50 transition-colors"
                  >
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="flex-shrink-0 w-28 h-28 relative bg-dark rounded-lg overflow-hidden border border-dark-border"
                    >
                      <Image
                        src={item.product.images[0] || '/images/placeholder.svg'}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </Link>
                    
                    <div className="flex-grow">
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="font-bold text-lg text-text-primary hover:text-accent transition-colors block mb-2"
                      >
                        {item.product.name}
                      </Link>
                      <div className="text-sm text-text-secondary uppercase tracking-wide">
                        SKU: {item.product.sku} | R {item.product.price.toLocaleString()} each
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex items-center border border-dark-border rounded bg-dark">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-4 py-2 text-text-primary hover:text-accent hover:bg-dark-lighter transition-colors"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="px-6 py-2 min-w-[4rem] text-center font-bold text-text-primary border-x border-dark-border">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-4 py-2 text-text-primary hover:text-accent hover:bg-dark-lighter transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right min-w-[120px]">
                        <div className="font-black text-xl text-text-primary">
                          R {(item.product.price * item.quantity).toLocaleString()}
                        </div>
                      </div>

                      <button
                        onClick={() => removeItem(item.product.id)}
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

            {/* Cart Summary */}
            <div className="border-t border-dark-border pt-10">
              <div className="max-w-md ml-auto space-y-6">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-lg text-text-primary uppercase tracking-wide">Total</span>
                  <span className="font-black text-4xl text-text-primary">R {totalPrice.toLocaleString()}</span>
                </div>
                
                <div className="bg-dark-lighter border border-dark-border rounded-lg p-6">
                  <p className="mb-4 font-bold text-text-primary uppercase tracking-wide text-sm"><strong>Order Process:</strong></p>
                  <ol className="list-decimal list-inside space-y-2 text-text-secondary text-sm">
                    <li>Submit your order request</li>
                    <li>We'll review and send you an invoice</li>
                    <li>Complete payment via bank transfer</li>
                    <li>We'll arrange shipping</li>
                  </ol>
                </div>

                <div className="flex gap-4">
                  <Link href="/shop" className="btn btn-secondary flex-1">
                    Continue Shopping
                  </Link>
                  <button
                    onClick={() => setShowForm(true)}
                    className="btn btn-primary flex-1"
                  >
                    Submit Order Request
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <OrderRequestForm
            items={items}
            totalPrice={totalPrice}
            onCancel={() => setShowForm(false)}
            onSuccess={() => {
              router.push('/cart/success');
            }}
          />
        )}
      </div>
    </div>
  );
}

