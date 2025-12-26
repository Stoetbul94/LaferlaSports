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
      <div className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center py-16">
            <h1 className="heading-2 mb-4">Your Enquiry Cart is Empty</h1>
            <p className="text-body mb-8">
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
    <div className="section-padding bg-white">
      <div className="container-custom">
        <h1 className="heading-2 mb-8">Enquiry Cart</h1>

        {!showForm ? (
          <>
            {/* Cart Items */}
            <div className="mb-8">
              <div className="bg-primary-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-primary-700">
                  <strong>Note:</strong> This is an enquiry cart. You'll submit an order request 
                  and we'll send you an invoice via email. No payment is processed online.
                </p>
              </div>

              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="border border-primary-200 rounded-lg p-4 flex flex-col sm:flex-row gap-4"
                  >
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="flex-shrink-0 w-24 h-24 relative bg-primary-50 rounded-lg overflow-hidden"
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
                        className="font-semibold text-primary-900 hover:text-accent transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <div className="text-sm text-primary-600 mt-1">
                        SKU: {item.product.sku} | R {item.product.price.toLocaleString()} each
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-primary-300 rounded">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-primary-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="px-4 py-1 min-w-[3rem] text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-primary-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right min-w-[100px]">
                        <div className="font-semibold text-primary-900">
                          R {(item.product.price * item.quantity).toLocaleString()}
                        </div>
                      </div>

                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-2 text-primary-600 hover:text-accent transition-colors"
                        aria-label="Remove item"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="border-t border-primary-200 pt-8">
              <div className="max-w-md ml-auto space-y-4">
                <div className="flex justify-between text-lg">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-2xl">R {totalPrice.toLocaleString()}</span>
                </div>
                
                <div className="bg-primary-50 rounded-lg p-4 text-sm text-primary-700">
                  <p className="mb-2"><strong>Order Process:</strong></p>
                  <ol className="list-decimal list-inside space-y-1">
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

