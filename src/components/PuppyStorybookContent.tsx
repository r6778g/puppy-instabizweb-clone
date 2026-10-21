'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Puppy } from '@/types';
import { PuppyMascot } from './PuppyMascot';
import { ShieldCheck, Award, HeartHandshake, Sparkles, Check, ChevronRight } from 'lucide-react';

interface PuppyStorybookContentProps {
  puppy: Puppy;
}

export const PuppyStorybookContent: React.FC<PuppyStorybookContentProps> = ({ puppy }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string>(puppy.image || '/brand/logo.png');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  // Gallery images (main + secondary)
  const gallery = [
    puppy.image || '/brand/logo.png',
    '/media/RH7J577OfQ7f/e776d07dbd/b942a5_a1fa75c7bf2f4d688ec0ce0344baef67f000.jpg',
  ];

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please enter your name and phone number so we can get back to you!');
      return;
    }
    const text = encodeURIComponent(
      `Hi TeddyPups! I am asking about ${puppy.name} (${puppy.breed}, ${puppy.gender}, ${puppy.age}). My name is ${formData.name}, phone: ${formData.phone}, email: ${formData.email || 'N/A'}. Message: ${formData.message || 'I would love to adopt or learn more.'}`
    );
    window.open(`https://wa.me/971541676733?text=${text}`, '_blank');
    setSubmitted(true);
  };

  const isLocal = puppy.origin === 'local';

  return (
    <article
      className="tp-storybook relative overflow-hidden"
      style={{
        background: `linear-gradient(180deg, color-mix(in oklab, ${puppy.color || '#785838'} 24%, var(--color-milk)) 0%, var(--color-milk) 85%)`,
      }}
    >
      <div className="gutter mx-auto max-w-[110rem] pb-20 pt-8 md:pt-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-[0.95rem] font-semibold text-cocoa-soft flex items-center gap-2">
          <Link className="link-ink hover:underline" href="/puppies">
            Available puppies
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-toffee-deep">
            {puppy.name}
          </span>
        </nav>

        {/* CHAPTER 1 */}
        <p className="tp-chapter mt-6 flex items-center gap-3">
          <span aria-hidden="true" className="tp-chapter__n font-plush text-2xl text-toffee">
            1
          </span>
          <span className="font-scrawl text-lg text-toffee-ink">hello, it&apos;s me</span>
        </p>

        <div className="mt-4 grid gap-10 lg:grid-cols-12 lg:gap-14 items-start">
          {/* Left: Photos gallery */}
          <div className="min-w-0 lg:col-span-7">
            <div className="tp-storypage relative aspect-[4/5] md:aspect-[5/6] rounded-3xl overflow-hidden border-3 border-cocoa/20 shadow-xl bg-white">
              <Image
                alt={`${puppy.name}, ${puppy.breed}`}
                src={selectedPhoto}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 55vw, 90vw"
              />

              {puppy.hasVideo && (
                <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-cocoa/80 text-white rounded-full text-xs font-semibold backdrop-blur-xs flex items-center gap-1.5 shadow-md">
                  ▶ video available on WhatsApp
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="mt-4 flex gap-3">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedPhoto(img)}
                  className={`relative size-20 rounded-2xl overflow-hidden border-2 transition cursor-pointer ${
                    selectedPhoto === img ? 'border-toffee-deep ring-2 ring-toffee' : 'border-toffee/20 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image alt="" src={img} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Puppy Info Card */}
          <div className="lg:col-span-5 p-8 bg-white/85 rounded-3xl border-2 border-toffee/20 shadow-lg">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-honey-soft text-toffee-deep">
              {puppy.status}
            </span>

            <h1 className="font-plush text-4xl md:text-5xl text-toffee-deep mt-3">
              {puppy.name}
            </h1>
            <p className="text-xl text-cocoa-soft mt-1">
              {puppy.breed} · {puppy.gender} · {puppy.age}
            </p>

            {/* Spec DL */}
            <dl className="mt-6 divide-y divide-toffee/15 border-y border-toffee/15">
              <div className="py-3 flex justify-between">
                <dt className="text-cocoa-soft font-medium">Breed</dt>
                <dd className="font-semibold text-toffee-deep">{puppy.breed}</dd>
              </div>
              <div className="py-3 flex justify-between">
                <dt className="text-cocoa-soft font-medium">Boy or girl</dt>
                <dd className="font-semibold text-toffee-deep capitalize">{puppy.gender}</dd>
              </div>
              <div className="py-3 flex justify-between">
                <dt className="text-cocoa-soft font-medium">Age</dt>
                <dd className="font-semibold text-toffee-deep">{puppy.age}</dd>
              </div>
              <div className="py-3 flex justify-between">
                <dt className="text-cocoa-soft font-medium">Where</dt>
                <dd className="font-semibold text-toffee-deep">
                  {isLocal ? 'In Downtown Dubai showroom' : 'Imported upon request'}
                </dd>
              </div>
            </dl>

            {/* Action buttons */}
            <div className="mt-8 space-y-3">
              <a
                href={`https://wa.me/971541676733?text=${encodeURIComponent(`Hi TeddyPups! I'm interested in ${puppy.name} (${puppy.breed}). Could you please share more details and videos?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp w-full text-center flex items-center justify-center gap-2"
              >
                Ask about {puppy.name} on WhatsApp
              </a>

              <a
                href="tel:+971541676733"
                className="btn btn-ghost w-full text-center block text-sm"
              >
                Call us: +971 54 167 6733
              </a>
            </div>
          </div>
        </div>

        {/* CHAPTER 2 */}
        <div className="mt-24">
          <p className="tp-chapter flex items-center gap-3">
            <span aria-hidden="true" className="tp-chapter__n font-plush text-2xl text-toffee">
              2
            </span>
            <span className="font-scrawl text-lg text-toffee-ink">
              what comes with {puppy.name}
            </span>
          </p>

          <h2 className="font-plush text-3xl text-toffee-deep mt-2">Every Teddy Pup comes</h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 rounded-2xl bg-white/80 border-2 border-toffee/20 shadow-sm">
              <ShieldCheck className="size-10 text-toffee-deep mb-3" />
              <h3 className="font-plush text-xl text-toffee-deep">Health certified</h3>
              <p className="mt-2 text-cocoa-soft text-sm">
                Complete certified medical inspection by a licensed veterinary doctor before joining your family.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/80 border-2 border-toffee/20 shadow-sm">
              <Award className="size-10 text-toffee-deep mb-3" />
              <h3 className="font-plush text-xl text-toffee-deep">Microchip &amp; Passport</h3>
              <p className="mt-2 text-cocoa-soft text-sm">
                Official ISO pet microchip registration and official pet passport ready for lifetime identification.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/80 border-2 border-toffee/20 shadow-sm">
              <Sparkles className="size-10 text-toffee-deep mb-3" />
              <h3 className="font-plush text-xl text-toffee-deep">Vaccinated &amp; Dewormed</h3>
              <p className="mt-2 text-cocoa-soft text-sm">
                Up-to-date core puppy vaccinations, flea treatments, and regular preventive deworming.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/80 border-2 border-toffee/20 shadow-sm">
              <HeartHandshake className="size-10 text-toffee-deep mb-3" />
              <h3 className="font-plush text-xl text-toffee-deep">24/7 Lifetime Support</h3>
              <p className="mt-2 text-cocoa-soft text-sm">
                Direct WhatsApp contact with our pet care specialists for ongoing nutrition, transition, and guidance.
              </p>
            </div>
          </div>
        </div>

        {/* CHAPTER 3 */}
        <div className="mt-24">
          <p className="tp-chapter flex items-center gap-3">
            <span aria-hidden="true" className="tp-chapter__n font-plush text-2xl text-toffee">
              3
            </span>
            <span className="font-scrawl text-lg text-toffee-ink">the way home</span>
          </p>

          <h2 className="font-plush text-3xl text-toffee-deep mt-2">
            {isLocal ? 'Meet in our showroom' : 'Coming home from abroad'}
          </h2>

          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <li className="p-6 rounded-2xl bg-white/80 border-2 border-toffee/20 shadow-sm">
              <span className="font-scrawl text-toffee text-sm">Step 1</span>
              <h3 className="font-plush text-lg text-toffee-deep mt-1">Reserve your puppy</h3>
              <p className="mt-2 text-cocoa-soft text-sm">
                Place a reservation for {puppy.name} to hold your spot with complete confidence.
              </p>
            </li>
            <li className="p-6 rounded-2xl bg-white/80 border-2 border-toffee/20 shadow-sm">
              <span className="font-scrawl text-toffee text-sm">Step 2</span>
              <h3 className="font-plush text-lg text-toffee-deep mt-1">Personalized consultation</h3>
              <p className="mt-2 text-cocoa-soft text-sm">
                We send high-definition videos, vet checkups, and answer all questions about temperament.
              </p>
            </li>
            <li className="p-6 rounded-2xl bg-white/80 border-2 border-toffee/20 shadow-sm">
              <span className="font-scrawl text-toffee text-sm">Step 3</span>
              <h3 className="font-plush text-lg text-toffee-deep mt-1">Import &amp; arrival</h3>
              <p className="mt-2 text-cocoa-soft text-sm">
                Carefully managed transportation and health checks ensure {puppy.name} arrives safely.
              </p>
            </li>
            <li className="p-6 rounded-2xl bg-white/80 border-2 border-toffee/20 shadow-sm">
              <span className="font-scrawl text-toffee text-sm">Step 4</span>
              <h3 className="font-plush text-lg text-toffee-deep mt-1">Welcome home</h3>
              <p className="mt-2 text-cocoa-soft text-sm">
                Door-to-door delivery or showroom collection with a full adoption starter pack.
              </p>
            </li>
          </ol>
        </div>

        {/* CHAPTER 4 */}
        <div className="mt-24">
          <p className="tp-chapter flex items-center gap-3">
            <span aria-hidden="true" className="tp-chapter__n font-plush text-2xl text-toffee">
              4
            </span>
            <span className="font-scrawl text-lg text-toffee-ink">dear TeddyPups…</span>
          </p>

          <h2 className="font-plush text-3xl text-toffee-deep mt-2">
            Ask about {puppy.name}
          </h2>

          <div className="mt-8 max-w-2xl bg-white/90 p-8 md:p-10 rounded-3xl border-2 border-toffee/20 shadow-lg relative">
            {submitted ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-4">
                  <Check size={32} />
                </div>
                <h3 className="font-plush text-2xl text-toffee-deep">Inquiry sent!</h3>
                <p className="text-cocoa-soft mt-2">
                  We opened WhatsApp for you to chat directly with our adoption team about {puppy.name}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-toffee-deep mb-1">
                    Your Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sarah"
                    className="w-full px-4 py-3 rounded-xl border border-toffee/20 bg-milk focus:outline-toffee-deep"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-toffee-deep mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+971 50 123 4567"
                      className="w-full px-4 py-3 rounded-xl border border-toffee/20 bg-milk focus:outline-toffee-deep"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-toffee-deep mb-1">
                      Email (optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-toffee/20 bg-milk focus:outline-toffee-deep"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-toffee-deep mb-1">
                    Message / Questions
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={`Tell us what you'd like to know about ${puppy.name}…`}
                    className="w-full px-4 py-3 rounded-xl border border-toffee/20 bg-milk focus:outline-toffee-deep"
                  />
                </div>

                <button type="submit" className="btn btn-primary w-full mt-4">
                  Send inquiry for {puppy.name}
                </button>
              </form>
            )}

            <div className="pup-buddy absolute -bottom-6 -right-6 w-28 hidden sm:block pointer-events-none" data-facing="left">
              <PuppyMascot facing="left" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
