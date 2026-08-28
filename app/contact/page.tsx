'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to send message');
      }

      setSubmitStatus('success');
      reset();
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="section-padding bg-dark">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="heading-1 mb-12 text-text-primary">Contact Us</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="heading-3 mb-8 text-text-primary">Get in Touch</h2>
              <p className="text-body mb-10 text-lg leading-relaxed">
                Have questions about our products, need advice on equipment selection, or want 
                to discuss your order? We're here to help.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="font-bold text-lg mb-3 text-text-primary uppercase tracking-wide">Email</h3>
                  <a
                    href="mailto:info@laferlasports.com"
                    className="text-accent hover:text-accent-light transition-colors text-lg"
                  >
                    info@laferlasports.com
                  </a>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-3 text-text-primary uppercase tracking-wide">Location</h3>
                  <p className="text-text-secondary text-lg">South Africa</p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-3 text-text-primary uppercase tracking-wide">Business Hours</h3>
                  <p className="text-text-secondary text-lg leading-relaxed">
                    Monday - Friday: 9:00 AM - 5:00 PM<br />
                    Saturday: 9:00 AM - 1:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>

                <div className="bg-dark-lighter border border-dark-border rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-3 text-text-primary uppercase tracking-wide">Order Inquiries</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    For questions about existing orders or order requests, please include your 
                    order reference number in your message.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="heading-3 mb-8 text-text-primary">Send Us a Message</h2>
              
              {submitStatus === 'success' && (
                <div className="bg-green-900/20 border border-green-500/50 text-green-400 px-6 py-4 rounded-lg mb-6">
                  Thank you for your message! We'll get back to you as soon as possible.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-900/20 border border-red-500/50 text-red-400 px-6 py-4 rounded-lg mb-6">
                  There was an error sending your message. Please try again or contact us directly via email.
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-text-primary mb-3 uppercase tracking-wide">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name')}
                    className="w-full px-4 py-3 bg-dark-lighter border border-dark-border rounded text-text-primary focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>
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
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register('phone')}
                    className="w-full px-4 py-3 bg-dark-lighter border border-dark-border rounded text-text-primary focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-bold text-text-primary mb-3 uppercase tracking-wide">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    {...register('subject')}
                    className="w-full px-4 py-3 bg-dark-lighter border border-dark-border rounded text-text-primary focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                  />
                  {errors.subject && (
                    <p className="mt-2 text-sm text-red-400">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-text-primary mb-3 uppercase tracking-wide">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    {...register('message')}
                    className="w-full px-4 py-3 bg-dark-lighter border border-dark-border rounded text-text-primary focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-400">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
