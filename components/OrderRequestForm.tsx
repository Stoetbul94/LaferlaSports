'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { EnquiryItem } from '@/types/product-data';

const quoteRequestSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  notes: z.string().optional(),
});

type QuoteRequestFormData = z.infer<typeof quoteRequestSchema>;

interface OrderRequestFormProps {
  items: EnquiryItem[];
  onCancel: () => void;
  onSuccess: () => void;
}

export default function OrderRequestForm({ items, onCancel, onSuccess }: OrderRequestFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuoteRequestFormData>({
    resolver: zodResolver(quoteRequestSchema),
  });

  const onSubmit = async (data: QuoteRequestFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          items: items.map((item) => ({
            product_code: item.product.product_code,
            name: item.product.name,
            category: item.product.category,
            quantity: item.quantity,
            product_link: item.product.product_link,
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit quote request');
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
        <h2 className="heading-3 mb-4 text-text-primary">Quote Request Details</h2>
        <p className="text-text-secondary text-lg">
          Tell us how to reach you and we&apos;ll email a personalised quote for the items below.
        </p>
      </div>

      <div className="bg-dark-lighter border border-dark-border rounded-lg p-6 mb-8">
        <h3 className="font-bold text-lg mb-4 text-text-primary uppercase tracking-wide">
          Items ({items.reduce((n, i) => n + i.quantity, 0)})
        </h3>
        <div className="space-y-3 text-sm">
          {items.map((item) => (
            <div key={item.product.slug} className="flex justify-between text-text-secondary">
              <span>
                {item.product.name}
                <span className="text-text-muted"> · SKU {item.product.product_code}</span>
              </span>
              <span className="font-semibold text-text-primary">× {item.quantity}</span>
            </div>
          ))}
        </div>
      </div>

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
            {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>}
          </div>
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
          {errors.phone && <p className="mt-2 text-sm text-red-400">{errors.phone.message}</p>}
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-bold text-text-primary mb-3 uppercase tracking-wide">
            Notes (Optional)
          </label>
          <textarea
            id="notes"
            rows={4}
            {...register('notes')}
            className="w-full px-4 py-3 bg-dark-lighter border border-dark-border rounded text-text-primary focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
            placeholder="Sizes, colours, deadlines, delivery area, or any questions..."
          />
        </div>

        <div className="flex gap-4 pt-6">
          <button type="button" onClick={onCancel} className="btn btn-secondary flex-1" disabled={isSubmitting}>
            Back
          </button>
          <button type="submit" className="btn btn-primary flex-1" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Send Quote Request'}
          </button>
        </div>
      </form>
    </div>
  );
}
