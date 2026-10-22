'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PuppyMascot } from './PuppyMascot';
import type { Puppy } from '@/types';
import { Check, Send } from 'lucide-react';

export const ContactPageContent: React.FC<{ puppies: Puppy[] }> = ({ puppies }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    area: '',
    puppyId: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setSubmitError('Please provide your name and phone number so we can reach you.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        setSubmitError(result?.error || 'We could not send your enquiry. Please try again.');
        return;
      }

      // Keep the existing WhatsApp conversation as a convenient follow-up.
      const text = encodeURIComponent(
        `Hi TeddyPups! My name is ${formData.name}. Phone: ${formData.phone}. Email: ${formData.email || 'N/A'}. Area: ${formData.area || 'Dubai'}. Interested in: ${formData.puppyId || 'Any puppy'}. Message: ${formData.message || 'I would like more information.'}`
      );
      window.open(`https://wa.me/971541676733?text=${text}`, '_blank');
      setSubmitted(true);
    } catch (error) {
      console.error('Enquiry submission failed:', error);
      setSubmitError('We could not send your enquiry. Please try again or contact us on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      data-pup-scene="true"
      data-tone="light"
      className="tp-scene"
      style={{
        ['--sky-top' as any]: '#fff9ee',
        ['--sky-bottom' as any]: '#f9dca4',
      }}
      aria-labelledby="contact-title"
    >
      <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
        <header className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h1
            id="contact-title"
            className="font-plush text-giant max-w-[12ch] lg:col-span-7 text-toffee-deep"
          >
            Get in touch with us
          </h1>
          <p className="text-lede text-[var(--ink-soft)] lg:col-span-5 lg:pb-3">
            Have questions about our puppies or adoption process? Fill out the form, and our
            team will get back to you promptly. Whether ready to adopt or just seeking info, we&apos;d
            love to hear from you!
          </p>
        </header>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Form Letter Column */}
          <div className="lg:col-span-7 lg:col-start-6 lg:row-start-1">
            <div className="tp-post" data-phase={submitted ? 'posted' : 'writing'}>
              {submitted ? (
                <div className="p-12 text-center bg-white/80 rounded-3xl border-3 border-toffee-deep/20 shadow-xl">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-6">
                    <Check size={36} />
                  </div>
                  <h3 className="font-plush text-3xl text-toffee-deep">Letter posted!</h3>
                  <p className="mt-4 text-cocoa text-lg max-w-md mx-auto">
                    Thank you, {formData.name}! We opened WhatsApp for you to connect directly with our adoption team. We can&apos;t wait to speak with you!
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="btn btn-primary mt-8"
                  >
                    Send another note
                  </button>
                </div>
              ) : (
                <form noValidate onSubmit={handleSubmit} className="tp-letterform">
                  <span aria-hidden="true" className="tp-letter__stamp">
                    <svg viewBox="0 0 64 64" className="size-9" aria-hidden="true" fill="currentColor">
                      <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                    </svg>
                  </span>

                  <p className="font-scrawl tp-letterform__greeting">Dear TeddyPups,</p>

                  <p className="tp-letterform__line">
                    my name is{' '}
                    <span className="tp-blank" style={{ ['--size' as any]: '16ch' }}>
                      <input
                        aria-label="Your name (required)"
                        autoComplete="name"
                        required
                        minLength={2}
                        maxLength={80}
                        placeholder="your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </span>
                    , and you can reach me on{' '}
                    <span className="tp-blank" style={{ ['--size' as any]: '15ch' }}>
                      <input
                        aria-label="Phone or WhatsApp number with country code (required)"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        required
                        placeholder="+971 50 123 4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </span>{' '}
                    or by email at{' '}
                    <span className="tp-blank" style={{ ['--size' as any]: '20ch' }}>
                      <input
                        aria-label="Email (optional)"
                        type="email"
                        autoComplete="email"
                        placeholder="optional"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </span>
                    .
                  </p>

                  <p className="tp-letterform__line">
                    I live in{' '}
                    <span className="tp-blank" style={{ ['--size' as any]: '13ch' }}>
                      <input
                        aria-label="Your area (optional)"
                        autoComplete="address-level2"
                        maxLength={80}
                        placeholder="e.g. Dubai Marina"
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      />
                    </span>
                    , and I&apos;m curious about{' '}
                    <span className="tp-blank tp-blank--select">
                      <label htmlFor="contact-pup-select" className="sr-only">
                        Puppy you&apos;re interested in (optional)
                      </label>
                      <select
                        id="contact-pup-select"
                        value={formData.puppyId}
                        onChange={(e) => setFormData({ ...formData, puppyId: e.target.value })}
                      >
                        <option value="">any puppy (not sure yet)</option>
                        {puppies.map((pup) => (
                          <option key={pup.id} value={pup.id}>
                            {pup.name} ({pup.breed}, {pup.gender})
                          </option>
                        ))}
                      </select>
                    </span>
                    .
                  </p>

                  <label htmlFor="contact-message" className="sr-only">
                    Your message (optional)
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    maxLength={2000}
                    placeholder="Anything else you'd like to tell us…"
                    className="tp-letterform__note"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />

                  {submitError && (
                    <p role="alert" className="mt-3 text-sm font-semibold text-red-700">
                      {submitError}
                    </p>
                  )}

                  <div className="tp-letterform__sign">
                    <p className="font-scrawl">with love, a future puppy parent</p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary disabled:opacity-70"
                    >
                      {isSubmitting ? 'Sending…' : 'Post my letter'}
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="pup-buddy ml-auto mr-6 -mt-3 w-36 md:w-40" data-facing="left">
              <PuppyMascot facing="left" />
            </div>
          </div>

          {/* Left Info Column */}
          <div className="lg:col-span-5 lg:row-start-1">
            <a
              href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20puppies."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp w-full sm:w-auto"
            >
              WhatsApp +971 54 167 6733
            </a>

            <dl className="mt-10 space-y-6">
              <div>
                <dt className="font-scrawl text-[var(--ink-soft)]">call us</dt>
                <dd className="mt-1 text-lg font-semibold">
                  <a className="link-ink text-toffee-deep hover:underline" href="tel:+971541676733">
                    +971 54 167 6733
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-scrawl text-[var(--ink-soft)]">email</dt>
                <dd className="mt-1 break-all text-lg font-semibold">
                  <a
                    className="link-ink text-toffee-deep hover:underline"
                    href="mailto:teddypupsuae@gmail.com"
                  >
                    teddypupsuae@gmail.com
                  </a>
                </dd>
              </div>
            </dl>

            {/* Showroom Visit Box */}
            <section aria-labelledby="visit-title" className="tp-shopfront mt-12 relative overflow-hidden">
              <svg
                viewBox="0 0 300 120"
                className="absolute -bottom-1 right-0 w-3/4 text-toffee/30 pointer-events-none"
                aria-hidden="true"
              >
                <path
                  d="M4 116h292M20 116V78h16v38M44 116V60h18v56M70 116V84h12v32M150 116V36l4-6v-14l3-4 3 4v14l4 6v80M118 116V70l12-8v54M174 116V64l14 8v44M200 116V82h18v34M226 116V56h14v60M248 116V88h22v28"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="tp-visit relative p-7 pt-6">
                <div>
                  <h2 id="visit-title" className="font-plush text-[2rem] leading-tight text-toffee-deep">
                    Visit us in Downtown Dubai
                  </h2>
                  <p className="mt-3 max-w-[38ch] text-cocoa-soft">
                    Step into our Downtown Dubai showroom and experience the joy of choosing your puppy
                    face-to-face.
                  </p>
                  <p className="mt-4 flex items-center gap-2 font-semibold text-cocoa">
                    <svg viewBox="0 0 64 64" className="size-5 shrink-0 text-toffee-deep" aria-hidden="true" fill="currentColor">
                      <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                    </svg>
                    Downtown Dubai, United Arab Emirates
                  </p>
                  <a
                    href="https://maps.app.goo.gl/ZdJvwHBSQWWZT54s7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost mt-6 !bg-white hover:!bg-milk shadow-sm"
                  >
                    Open in Google Maps
                  </a>
                </div>

                <figure className="tp-visit__photo relative w-32 h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden border-2 border-toffee/20 shrink-0 mt-6 sm:mt-0">
                  <Image
                    alt="The apricot teddy bear puppy from our showroom, held up to say hello"
                    src="/media/skvodl2NZiKq/cefab5eee9/27b888_323008bb0f6a41d4bde2a0da7206cd98f003.jpg"
                    fill
                    className="object-cover"
                  />
                </figure>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};
