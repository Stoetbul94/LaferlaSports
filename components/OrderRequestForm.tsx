'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CartItem } from '@/types';

// Form validation schema
const orderRequestSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  address: z.string().min(5, 'Please enter your address'),
  city: z.string().min(2, 'Please enter your city'),
  province: z.string().min(2, 'Please enter your province'),
  postalCode: z.string().min(4, 'Please enter a valid postal code'),
  notes: z.string().optional(),
});

type OrderRequestFormData = z.infer<typeof orderRequestSchema>;

interface OrderRequestFormProps {
  items: CartItem[];
  totalPrice: number;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function OrderRequestForm({
  items,
  totalPrice,
  onCancel,
  onSuccess,
}: OrderRequestFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderRequestFormData>({
    resolver: zodResolver(orderRequestSchema),
  });

  const onSubmit = async (data: OrderRequestFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          items,
          totalPrice,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit order request');
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="heading-3 mb-4 text-text-primary">Order Request Form</h2>
        <p className="text-text-secondary text-lg">
          Please provide your contact and delivery information. We'll send you an invoice via email.
        </p>
      </div>

      {/* Order Summary */}
      <div className="bg-dark-lighter border border-dark-border rounded-lg p-6 mb-8">
        <h3 className="font-bold text-lg mb-4 text-text-primary uppercase tracking-wide">Order Summary</h3>
        <div className="space-y-3 text-sm">
          {items.map((item) => (
            <div key={item.product.id} className="flex justify-between text-text-secondary">
              <span>
                {item.product.name} × {item.quantity}
              </span>
              <span className="font-semibold text-text-primary">R {(item.product.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
          <div className="flex justify-between font-black text-lg pt-4 border-t border-dark-border">
            <span className="text-text-primary uppercase tracking-wide">Total</span>
            <span className="text-accent">R {totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="bg-red-900/20 border border-red-500/50 text-red-400 px-6 py-4 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="customerName" className="block text-sm font-bold text-text-primary mb-3 uppercase tracking-wide">
              Full Name *
            </label>
            <input
              type="text"
              id="customerName"
              {...register('customerName')}
              className="w-full px-4 py-3 bg-dark-lighter border border-dark-border rounded text-text-primary focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
            />
            {errors.customerName && (
              <p className="mt-2 text-sm text-red-400">{errors.customerName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-bold text-text-primary mb-3 uppercase tracking-wide">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className="w-full px-4 py-3 bg-dark-lighter border border-dark-border rounded text-text-primary focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-bold text-text-primary mb-3 uppercase tracking-wide">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              {...register('phone')}
              className="w-full px-4 py-3 bg-dark-lighter border border-dark-border rounded text-text-primary focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
            />
            {errors.phone && (
              <p className="mt-2 text-sm text-red-400">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="postalCode" className="block text-sm font-bold text-text-primary mb-3 uppercase tracking-wide">
              Postal Code *
            </label>
            <input
              type="text"
              id="postalCode"
              {...register('postalCode')}
              className="w-full px-4 py-3 bg-dark-lighter border border-dark-border rounded text-text-primary focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
            />
            {errors.postalCode && (
              <p className="mt-2 text-sm text-red-400">{errors.postalCode.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-bold text-text-primary mb-3 uppercase tracking-wide">
            Street Address *
          </label>
          <input
            type="text"
            id="address"
            {...register('address')}
            className="w-full px-4 py-3 bg-dark-lighter border border-dark-border rounded text-text-primary focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
          />
          {errors.address && (
            <p className="mt-2 text-sm text-red-400">{errors.address.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="city" className="block text-sm font-bold text-text-primary mb-3 uppercase tracking-wide">
              City *
            </label>
            <input
              type="text"
              id="city"
              {...register('city')}
              className="w-full px-4 py-3 bg-dark-lighter border border-dark-border rounded text-text-primary focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
            />
            {errors.city && (
              <p className="mt-2 text-sm text-red-400">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="province" className="block text-sm font-bold text-text-primary mb-3 uppercase tracking-wide">
              Province *
            </label>
            <select
              id="province"
              {...register('province')}
              className="w-full px-4 py-3 bg-dark-lighter border border-dark-border rounded text-text-primary focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
            >
              <option value="">Select Province</option>
              <option value="Eastern Cape">Eastern Cape</option>
              <option value="Free State">Free State</option>
              <option value="Gauteng">Gauteng</option>
              <option value="KwaZulu-Natal">KwaZulu-Natal</option>
              <option value="Limpopo">Limpopo</option>
              <option value="Mpumalanga">Mpumalanga</option>
              <option value="Northern Cape">Northern Cape</option>
              <option value="North West">North West</option>
              <option value="Western Cape">Western Cape</option>
            </select>
            {errors.province && (
              <p className="mt-2 text-sm text-red-400">{errors.province.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-bold text-text-primary mb-3 uppercase tracking-wide">
            Additional Notes (Optional)
          </label>
          <textarea
            id="notes"
            rows={4}
            {...register('notes')}
            className="w-full px-4 py-3 bg-dark-lighter border border-dark-border rounded text-text-primary focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
            placeholder="Any special instructions or questions..."
          />
        </div>

        <div className="flex gap-4 pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary flex-1"
            disabled={isSubmitting}
          >
            Back to Cart
          </button>
          <button
            type="submit"
            className="btn btn-primary flex-1"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Order Request'}
          </button>
        </div>
      </form>
    </div>
  );
}


