'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PuppyMascot } from './PuppyMascot';
import { ShieldCheck, Plane, HeartHandshake, Truck, MapPin, Clock, Award } from 'lucide-react';

export const HowItWorksPageContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'local' | 'imported'>('local');

  return (
    <div className="tp-page" data-page="how">
      {/* SECTION 1: HERO & TWO WAYS HOME */}
      <section
        data-pup-scene="true"
        data-tone="light"
        className="tp-scene"
        style={{
          ['--sky-top' as any]: '#fffbf3',
          ['--sky-bottom' as any]: '#f6cc85',
        }}
        aria-labelledby="how-title"
      >
        <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          <header className="grid gap-8 md:grid-cols-12 md:items-end">
            <h1 id="how-title" className="font-plush text-giant md:col-span-7 text-toffee-deep">
              How it works
            </h1>
            <p className="text-lede text-[var(--ink-soft)] md:col-span-5 md:pb-4">
              Whether you choose to visit us locally or order a premium breed from overseas, TeddyPups is here to make the experience unforgettable.
            </p>
          </header>

          {/* Table of contents quick chips */}
          <nav aria-label="On this page" className="mt-10 flex flex-wrap gap-2">
            <a
              href="#two-ways"
              className="chip h-11 border-2 border-cocoa !bg-milk px-4 hover:!bg-honey-soft inline-flex items-center gap-2 rounded-full font-medium"
            >
              <span className="font-plush text-toffee">1</span> Two ways home
            </a>
            <a
              href="#promise"
              className="chip h-11 border-2 border-cocoa !bg-milk px-4 hover:!bg-honey-soft inline-flex items-center gap-2 rounded-full font-medium"
            >
              <span className="font-plush text-toffee">2</span> Our premium puppy promise
            </a>
            <a
              href="#delivery"
              className="chip h-11 border-2 border-cocoa !bg-milk px-4 hover:!bg-honey-soft inline-flex items-center gap-2 rounded-full font-medium"
            >
              <span className="font-plush text-toffee">3</span> Delivery &amp; collection
            </a>
            <a
              href="#why"
              className="chip h-11 border-2 border-cocoa !bg-milk px-4 hover:!bg-honey-soft inline-flex items-center gap-2 rounded-full font-medium"
            >
              <span className="font-plush text-toffee">4</span> Why choose us
            </a>
          </nav>

          {/* TWO WAYS HOME INTERACTIVE SECTION */}
          <div id="two-ways" className="mt-16">
            <section className="tp-journeys" aria-labelledby="two-ways-title">
              <div className="tp-journeys__top flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <p className="font-scrawl tp-journeys__kicker text-lg text-toffee-ink">choose your way</p>
                  <h2 id="two-ways-title" className="font-plush text-big text-toffee-deep">
                    Two ways home
                  </h2>
                </div>

                <div className="tp-journeys__pick flex items-center gap-4">
                  <div
                    role="tablist"
                    aria-label="Ways to bring your puppy home"
                    className="tp-switch"
                    style={{
                      ['--at' as any]: activeTab === 'local' ? 0 : 1,
                      ['--n' as any]: 2,
                    }}
                  >
                    <span aria-hidden="true" className="tp-switch__thumb" />
                    <button
                      type="button"
                      role="tab"
                      id="tab-local"
                      aria-selected={activeTab === 'local'}
                      onClick={() => setActiveTab('local')}
                      className={`tp-switch__tab ${activeTab === 'local' ? 'active' : ''}`}
                    >
                      <span className="font-plush tp-switch__label">In Dubai</span>
                      <span className="tp-switch__hint">meet in person</span>
                    </button>
                    <button
                      type="button"
                      role="tab"
                      id="tab-imported"
                      aria-selected={activeTab === 'imported'}
                      onClick={() => setActiveTab('imported')}
                      className={`tp-switch__tab ${activeTab === 'imported' ? 'active' : ''}`}
                    >
                      <span className="font-plush tp-switch__label">Imported</span>
                      <span className="tp-switch__hint">order upon request</span>
                    </button>
                  </div>

                  <div className="pup-buddy tp-journeys__teddy w-24 hidden sm:block" data-facing="right">
                    <PuppyMascot facing="right" />
                  </div>
                </div>
              </div>

              {/* PANEL LOCAL */}
              {activeTab === 'local' ? (
                <div id="panel-local" aria-labelledby="tab-local" className="tp-journey mt-10">
                  <div className="tp-journey__head">
                    <div>
                      <h3 className="font-plush tp-journey__title text-3xl text-toffee-deep">
                        Meet your puppy in person
                      </h3>
                      <p className="text-lede mt-4 text-[var(--ink-soft)] max-w-3xl">
                        Step into our Downtown Dubai showroom and experience the joy of choosing your puppy face-to-face. We source healthy, well-socialized puppies from trusted local breeders, ensuring they&apos;re raised with care, proper nutrition, and veterinary checks.
                      </p>
                    </div>

                    <div aria-hidden="true" className="tp-postcard relative p-6 bg-white/70 rounded-3xl border-2 border-toffee/20 shadow-md">
                      <span className="tp-postcard__sun" />
                      <svg viewBox="0 0 300 120" className="tp-postcard__city w-full text-toffee/30" aria-hidden="true">
                        <path
                          d="M4 116h292M20 116V78h16v38M44 116V60h18v56M70 116V84h12v32M150 116V36l4-6v-14l3-4 3 4v14l4 6v80M118 116V70l12-8v54M174 116V64l14 8v44M200 116V82h18v34M226 116V56h14v60M248 116V88h22v28"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="font-scrawl tp-postcard__to text-toffee text-xl block mt-2">
                        Downtown Dubai showroom
                      </span>
                    </div>
                  </div>

                  <ol className="tp-steps mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <li className="tp-step p-6 rounded-2xl bg-white/80 border-2 border-toffee/20 shadow-sm">
                      <span className="font-scrawl text-toffee text-sm">Step 1</span>
                      <h4 className="font-plush text-xl text-toffee-deep mt-1">Explore our puppies</h4>
                      <p className="mt-2 text-cocoa-soft text-sm">
                        Browse our website to view available puppies. Each listing includes photos, breed details, age, and health information.
                      </p>
                    </li>
                    <li className="tp-step p-6 rounded-2xl bg-white/80 border-2 border-toffee/20 shadow-sm">
                      <span className="font-scrawl text-toffee text-sm">Step 2</span>
                      <h4 className="font-plush text-xl text-toffee-deep mt-1">Choose your puppy</h4>
                      <p className="mt-2 text-cocoa-soft text-sm">
                        Once you find a puppy you love, open their profile for more information or reach out to us directly with questions.
                      </p>
                    </li>
                    <li className="tp-step p-6 rounded-2xl bg-white/80 border-2 border-toffee/20 shadow-sm">
                      <span className="font-scrawl text-toffee text-sm">Step 3</span>
                      <h4 className="font-plush text-xl text-toffee-deep mt-1">Meet before you choose</h4>
                      <p className="mt-2 text-cocoa-soft text-sm">
                        Spend time bonding face-to-face in our comfortable Downtown Dubai showroom before making your decision.
                      </p>
                    </li>
                    <li className="tp-step p-6 rounded-2xl bg-white/80 border-2 border-toffee/20 shadow-sm">
                      <span className="font-scrawl text-toffee text-sm">Step 4</span>
                      <h4 className="font-plush text-xl text-toffee-deep mt-1">Pick-up or delivery</h4>
                      <p className="mt-2 text-cocoa-soft text-sm">
                        Pick up your puppy the same day or have them delivered safely to your home within Dubai.
                      </p>
                    </li>
                  </ol>
                </div>
              ) : (
                <div id="panel-imported" aria-labelledby="tab-imported" className="tp-journey mt-10">
                  <div className="tp-journey__head">
                    <div>
                      <h3 className="font-plush tp-journey__title text-3xl text-toffee-deep">
                        Order upon request
                      </h3>
                      <p className="text-lede mt-4 text-[var(--ink-soft)] max-w-3xl">
                        Looking for a rare Korean teacup breed or specific coat? We partner directly with certified ethical breeders across South Korea and Europe, managing the entire import, vet inspections, and travel journey.
                      </p>
                    </div>

                    <div aria-hidden="true" className="tp-postcard relative p-6 bg-white/70 rounded-3xl border-2 border-toffee/20 shadow-md">
                      <Plane className="size-10 text-toffee" />
                      <span className="font-scrawl tp-postcard__to text-toffee text-xl block mt-2">
                        Seoul &amp; Europe to Dubai
                      </span>
                    </div>
                  </div>

                  <ol className="tp-steps mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <li className="tp-step p-6 rounded-2xl bg-white/80 border-2 border-toffee/20 shadow-sm">
                      <span className="font-scrawl text-toffee text-sm">Step 1</span>
                      <h4 className="font-plush text-xl text-toffee-deep mt-1">Reserve your puppy</h4>
                      <p className="mt-2 text-cocoa-soft text-sm">
                        Browse our selection of requested breeds and place a reservation for the teacup puppy that captures your heart.
                      </p>
                    </li>
                    <li className="tp-step p-6 rounded-2xl bg-white/80 border-2 border-toffee/20 shadow-sm">
                      <span className="font-scrawl text-toffee text-sm">Step 2</span>
                      <h4 className="font-plush text-xl text-toffee-deep mt-1">Personalized consultation</h4>
                      <p className="mt-2 text-cocoa-soft text-sm">
                        Once reserved, our team provides weekly video updates, veterinary checks, and travel arrangements.
                      </p>
                    </li>
                    <li className="tp-step p-6 rounded-2xl bg-white/80 border-2 border-toffee/20 shadow-sm">
                      <span className="font-scrawl text-toffee text-sm">Step 3</span>
                      <h4 className="font-plush text-xl text-toffee-deep mt-1">Import and arrival</h4>
                      <p className="mt-2 text-cocoa-soft text-sm">
                        We manage health clearances, customs, pet passport, and luxury travel so your puppy arrives stress-free.
                      </p>
                    </li>
                    <li className="tp-step p-6 rounded-2xl bg-white/80 border-2 border-toffee/20 shadow-sm">
                      <span className="font-scrawl text-toffee text-sm">Step 4</span>
                      <h4 className="font-plush text-xl text-toffee-deep mt-1">Welcome home</h4>
                      <p className="mt-2 text-cocoa-soft text-sm">
                        Receive your puppy with full health certificates, starter pack, and 24/7 post-adoption care support.
                      </p>
                    </li>
                  </ol>
                </div>
              )}
            </section>
          </div>
        </div>
      </section>

      {/* SECTION 2: OUR PREMIUM PUPPY PROMISE */}
      <section id="promise" aria-labelledby="promise-title" className="tp-how-promise bg-milk border-y-2 border-toffee/15">
        <div className="gutter mx-auto max-w-[110rem]">
          <div className="text-center max-w-2xl mx-auto">
            <p className="font-scrawl text-lg text-toffee-ink">puppy passport</p>
            <h2 id="promise-title" className="font-plush text-big text-toffee-deep mt-2">
              Our premium puppy promise
            </h2>
          </div>

          <div className="tp-how-promise__cards grid gap-8 md:grid-cols-3">
            <div className="p-8 rounded-3xl bg-white border-2 border-toffee/20 shadow-sm hover:shadow-md transition">
              <ShieldCheck className="size-12 text-toffee-deep mb-4" />
              <h3 className="font-plush text-2xl text-toffee-deep">Hand-selected breeders</h3>
              <p className="mt-3 text-cocoa-soft">
                We work only with certified breeders who uphold the highest ethical, genetic, and health standards for every litter.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-white border-2 border-toffee/20 shadow-sm hover:shadow-md transition">
              <Award className="size-12 text-toffee-deep mb-4" />
              <h3 className="font-plush text-2xl text-toffee-deep">Full transparency</h3>
              <p className="mt-3 text-cocoa-soft">
                Real photos, 4K videos, and veterinary health certificates are verified and shared before your puppy departs.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-white border-2 border-toffee/20 shadow-sm hover:shadow-md transition">
              <HeartHandshake className="size-12 text-toffee-deep mb-4" />
              <h3 className="font-plush text-2xl text-toffee-deep">Safe, stress-free delivery</h3>
              <p className="mt-3 text-cocoa-soft">
                We handle every single detail of the journey so your puppy arrives happy, healthy, and ready to love you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: DELIVERY & COLLECTION */}
      <section id="delivery" aria-labelledby="delivery-title" className="tp-how-delivery bg-[#fff9ee]">
        <div className="gutter mx-auto max-w-[110rem]">
          <div className="max-w-3xl">
            <h2 id="delivery-title" className="font-plush text-big text-toffee-deep">
              Delivery &amp; collection
            </h2>
            <p className="text-lede mt-4 text-[var(--ink-soft)]">
              From a same-day visit in Downtown Dubai to a flight from Korea, every puppy travels comfortably and arrives safely.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 rounded-2xl bg-white border-2 border-toffee/20 shadow-sm">
              <MapPin className="size-8 text-toffee-deep mb-3" />
              <h3 className="font-plush text-xl text-toffee-deep">Take home same day</h3>
              <p className="mt-2 text-cocoa-soft text-sm">
                Local showroom puppies are available immediately — visit, fall in love, and go home together.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white border-2 border-toffee/20 shadow-sm">
              <Truck className="size-8 text-toffee-deep mb-3" />
              <h3 className="font-plush text-xl text-toffee-deep">Delivery within Dubai</h3>
              <p className="mt-2 text-cocoa-soft text-sm">
                Prefer to stay home? We deliver your puppy directly to your door anywhere in Dubai safely and comfortably.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white border-2 border-toffee/20 shadow-sm">
              <Plane className="size-8 text-toffee-deep mb-3" />
              <h3 className="font-plush text-xl text-toffee-deep">Safe international cargo</h3>
              <p className="mt-2 text-cocoa-soft text-sm">
                We manage flight bookings, climate-controlled cargo, and customs clearances for seamless arrivals.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white border-2 border-toffee/20 shadow-sm">
              <Clock className="size-8 text-toffee-deep mb-3" />
              <h3 className="font-plush text-xl text-toffee-deep">Worldwide delivery</h3>
              <p className="mt-2 text-cocoa-soft text-sm">
                We safely deliver puppies to loving homes all around the globe with our certified pet transport partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY CHOOSE US */}
      <section id="why" aria-labelledby="why-title" className="tp-how-why bg-milk border-t-2 border-toffee/15">
        <div className="gutter mx-auto max-w-[110rem]">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <p className="font-scrawl text-lg text-toffee-ink">our commitment</p>
              <h2 id="why-title" className="font-plush text-big text-toffee-deep mt-2">
                Why choose us
              </h2>
              <p className="text-lede mt-6 text-cocoa-soft">
                We&apos;re here to help you find a new family member. From the moment you visit our site to the joyful day your puppy arrives at your door, we&apos;re with you every step of the way. Our mission is to make the entire adoption process smooth, transparent, and full of love.
              </p>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="p-6 rounded-2xl bg-white border-2 border-toffee/20 shadow-sm flex items-start gap-4">
                <Plane className="size-10 text-toffee-deep shrink-0 mt-1" />
                <div>
                  <h3 className="font-plush text-xl text-toffee-deep">International cargo</h3>
                  <p className="mt-1 text-cocoa-soft text-sm">
                    We safely deliver puppies to loving homes all around the world with certified airline pet handlers.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border-2 border-toffee/20 shadow-sm flex items-start gap-4">
                <Clock className="size-10 text-toffee-deep shrink-0 mt-1" />
                <div>
                  <h3 className="font-plush text-xl text-toffee-deep">Support 24/7</h3>
                  <p className="mt-1 text-cocoa-soft text-sm">
                    Our care team is always accessible via WhatsApp for puppy nutrition, sleep training, and acclimatization guidance.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border-2 border-toffee/20 shadow-sm flex items-start gap-4">
                <ShieldCheck className="size-10 text-toffee-deep shrink-0 mt-1" />
                <div>
                  <h3 className="font-plush text-xl text-toffee-deep">Health guarantee</h3>
                  <p className="mt-1 text-cocoa-soft text-sm">
                    Every puppy comes with full vaccinations, deworming, microchip, and a comprehensive vet health certificate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: UNIQUE & HIGH QUALITY PUPPIES CTA */}
      <section
        aria-labelledby="care-title"
        className="tp-how-care relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #fffbf3 0%, #f6cc85 100%)',
        }}
      >
        <div className="gutter mx-auto max-w-[110rem] text-center">
          <div className="max-w-3xl mx-auto">
            <h2 id="care-title" className="font-plush text-big text-toffee-deep">
              Unique and high quality puppies
            </h2>
            <p className="text-lede mt-6 text-cocoa max-w-2xl mx-auto">
              When you choose TeddyPups, you can trust that you&apos;re getting a puppy of the highest quality. We also provide guidance and support to new pet owners, offering advice on training, nutrition, and general care to ensure a smooth transition for you and your new furry friend.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20puppies."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                Ask us on WhatsApp
              </a>
              <Link href="/puppies" className="btn btn-primary">
                See available puppies
              </Link>
            </div>

            <div className="mt-10 inline-block w-40">
              <PuppyMascot facing="right" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
