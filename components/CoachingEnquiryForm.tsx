'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  discipline: z.string().min(1, 'Please select a discipline'),
  level: z.string().min(1, 'Please select a level'),
  availability: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const DISCIPLINES = ['Air Rifle (10m)', 'Smallbore Rifle (50m)', '3-Positional', 'Other'];
const LEVELS = ['Beginner', 'Club', 'Provincial', 'National / Elite'];

export default function CoachingEnquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setStatus('idle');

    const message = [
      `Discipline: ${data.discipline}`,
      `Level: ${data.level}`,
      data.availability ? `Availability: ${data.availability}` : null,
      '',
      data.message || '(no additional message)',
    ]
      .filter((l) => l !== null)
      .join('\n');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: `Coaching Enquiry — ${data.discipline} (${data.level})`,
          message,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to send enquiry');
      }

      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 bg-dark-lighter border border-dark-border rounded text-text-primary focus:ring-2 focus:ring-accent focus:border-accent transition-colors';
  const labelClass = 'block text-sm font-bold text-text-primary mb-3 uppercase tracking-wide';

  return (
    <div>
      {status === 'success' && (
        <div className="mb-6 rounded-lg border border-green-500/50 bg-green-900/20 px-6 py-4 text-green-400">
          Thanks! Your coaching enquiry has been sent — we&apos;ll be in touch shortly.
        </div>
      )}
      {status === 'error' && (
        <div className="mb-6 rounded-lg border border-red-500/50 bg-red-900/20 px-6 py-4 text-red-400">
          Something went wrong. Please try again or email us directly.
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="c-name" className={labelClass}>Name *</label>
            <input id="c-name" type="text" {...register('name')} className={inputClass} />
            {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="c-email" className={labelClass}>Email *</label>
            <input id="c-email" type="email" {...register('email')} className={inputClass} />
            {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="c-discipline" className={labelClass}>Discipline *</label>
            <select id="c-discipline" {...register('discipline')} className={inputClass} defaultValue="">
              <option value="" disabled>Select…</option>
              {DISCIPLINES.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            {errors.discipline && <p className="mt-2 text-sm text-red-400">{errors.discipline.message}</p>}
          </div>
          <div>
            <label htmlFor="c-level" className={labelClass}>Current Level *</label>
            <select id="c-level" {...register('level')} className={inputClass} defaultValue="">
              <option value="" disabled>Select…</option>
              {LEVELS.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
            {errors.level && <p className="mt-2 text-sm text-red-400">{errors.level.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="c-availability" className={labelClass}>Availability (Optional)</label>
          <input
            id="c-availability"
            type="text"
            placeholder="e.g. weekends, weekday evenings"
            {...register('availability')}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="c-message" className={labelClass}>Goals / Message (Optional)</label>
          <textarea id="c-message" rows={5} {...register('message')} className={inputClass} />
        </div>

        <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Sending…' : 'Send Coaching Enquiry'}
        </button>
      </form>
    </div>
  );
}
