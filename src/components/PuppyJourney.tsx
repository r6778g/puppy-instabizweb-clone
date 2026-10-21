'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { JourneyStep } from '@/types';
import { PuppyMascot } from './PuppyMascot';

const BREEDS = [
  { name: 'Maltipoo', href: '/puppies?breed=maltipoo' },
  { name: 'Pomeranian', href: '/puppies?breed=pomeranian' },
  { name: 'Poodle', href: '/puppies?breed=poodle' },
  { name: 'Cavapoo', href: '/puppies?breed=cavapoo' },
  { name: 'Shih Tzu', href: '/puppies?breed=shih-tzu' },
];

export const PuppyJourney: React.FC<{ steps: JourneyStep[] }> = ({ steps }) => {
  const [activeStep, setActiveStep] = useState(0);
  const step0Ref = useRef<HTMLLIElement>(null);
  const step1Ref = useRef<HTMLLIElement>(null);
  const step2Ref = useRef<HTMLLIElement>(null);
  const chatScreenRef = useRef<HTMLDivElement>(null);

  // Scroll listener to update activeStep based on which step is in view
  useEffect(() => {
    const handleScroll = () => {
      const refs = [step0Ref.current, step1Ref.current, step2Ref.current];
      const viewportCenter = window.innerHeight * 0.45;

      let foundIndex = 0;
      refs.forEach((ref, idx) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        // If the step is above or around the center of the viewport
        if (rect.top <= viewportCenter) {
          foundIndex = idx;
        }
      });

      setActiveStep(foundIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to establish initial state
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll chat screen to bottom when a new step message is revealed
  useEffect(() => {
    if (chatScreenRef.current) {
      chatScreenRef.current.scrollTo({
        top: chatScreenRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [activeStep]);

  const scrollToStep = (idx: number) => {
    setActiveStep(idx);
    const refs = [step0Ref.current, step1Ref.current, step2Ref.current];
    const target = refs[idx];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section
      data-pup-scene="true"
      data-tone="light"
      className="tp-scene tp-chat"
      style={{
        ['--sky-top' as string]: '#f7d18d',
        ['--sky-bottom' as string]: '#f0b866',
      }}
      aria-labelledby="journey-title"
    >
      <div className="tp-chat__grid gutter" data-pin-range="true">
        {/* Left side: Story & 3 Steps */}
        <div className="tp-chat__story">
          <h2 id="journey-title" className="font-plush text-huge text-toffee-deep">
            Your puppy journey
          </h2>
          <p className="text-lede mt-5 max-w-[42ch] text-[var(--ink-soft)]">
            A premium, step-by-step concierge experience. We make adoption simple, secure, and purely joyful.
          </p>

          <ol className="tp-chat__steps">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              const isDone = activeStep >= idx;
              const stepRef = idx === 0 ? step0Ref : idx === 1 ? step1Ref : step2Ref;

              return (
                <li
                  key={step.step}
                  ref={stepRef}
                  className="tp-chat__step cursor-pointer"
                  data-active={isActive ? 'true' : undefined}
                  data-done={isDone ? 'true' : undefined}
                  onClick={() => scrollToStep(idx)}
                >
                  <span className="tp-chat__num font-plush" aria-hidden="true">
                    {step.step}
                  </span>
                  <h3 className="font-plush tp-chat__title">{step.title}</h3>
                  <p className="tp-chat__text">{step.description}</p>
                </li>
              );
            })}
          </ol>

          <Link className="btn btn-ghost tp-chat__cta" href="/how-it-works">
            How it works
          </Link>
        </div>

        {/* Right side: Sticky WhatsApp Phone */}
        <div className="tp-chat__side">
          <div
            className="tp-phone"
            aria-label="A WhatsApp conversation with TeddyPups U.A.E."
            role="group"
          >
            {/* Phone Top Bar */}
            <div className="tp-phone__bar">
              <Image
                alt=""
                width={40}
                height={40}
                className="tp-phone__avatar"
                src="/brand/logo.png"
              />
              <span>
                <span className="tp-phone__name">TeddyPups U.A.E.</span>
                <span className="tp-phone__status">online</span>
              </span>
            </div>

            {/* Phone Screen Messages */}
            <div ref={chatScreenRef} className="tp-phone__screen">
              {/* Initial message */}
              <p className="tp-msg tp-msg--me">
                Hi TeddyPups! I&apos;d love to know more about your puppies.
              </p>

              {/* Step 0 Message: Breed selection */}
              <div
                className="tp-msg-group"
                data-step="0"
                data-show={activeStep >= 0 ? 'true' : 'false'}
              >
                <div className="tp-msg tp-msg--them">
                  <p>
                    Select your preferred breed or tell us what you&apos;re looking for. We&apos;ll guide you based on availability and your lifestyle.
                  </p>
                  <ul className="tp-chips" aria-label="Breeds we have now">
                    {BREEDS.map((breed) => (
                      <li key={breed.name}>
                        <Link href={breed.href}>{breed.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Step 1 Message: Arrival photos */}
              <div
                className="tp-msg-group"
                data-step="1"
                data-show={activeStep >= 1 ? 'true' : 'false'}
              >
                <div className="tp-msg tp-msg--them tp-msg--media">
                  <div className="tp-snaps">
                    <span className="tp-snaps__one">
                      <Image
                        alt="A tiny apricot teddy bear puppy held up in the TeddyPups showroom"
                        fill
                        sizes="9rem"
                        className="object-cover"
                        src="/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg"
                      />
                    </span>
                    <span className="tp-snaps__one">
                      <Image
                        alt="The apricot teddy bear puppy close up"
                        fill
                        sizes="9rem"
                        className="object-cover"
                        src="/media/Vi-kzyvemRl4/e740ed8a24/27b888_323008bb0f6a41d4bde2a0da7206cd98f001.jpg"
                      />
                    </span>
                  </div>
                </div>
              </div>

              {/* Step 2 Message: Safe Delivery Route */}
              <div
                className="tp-msg-group"
                data-step="2"
                data-show={activeStep >= 2 ? 'true' : 'false'}
              >
                <div className="tp-msg tp-msg--them">
                  <p>
                    Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.
                  </p>
                  <svg viewBox="0 0 220 70" className="tp-route" aria-hidden="true">
                    <path
                      d="M14 52 C 60 6, 120 70, 170 28"
                      className="tp-route__line"
                      fill="none"
                      stroke="#a24a1a"
                      strokeWidth="3"
                      strokeDasharray="4 4"
                    />
                    <circle cx="14" cy="52" r="5" className="tp-route__dot" fill="#a24a1a" />
                    <path
                      d="M164 32 l12 -12 l12 12 v14 h-24 z"
                      className="tp-route__home"
                      fill="#2a170e"
                    />
                    <path
                      d="M176 42 c-2-3-7-2-6 2c1 3 6 5 6 5s5-2 6-5c1-4-4-5-6-2z"
                      className="tp-route__heart"
                      fill="#f9cdbf"
                    />
                    <path
                      d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z"
                      transform="translate(70 22) scale(.3) rotate(70 32 32)"
                      className="tp-route__paw"
                      fill="#d4893f"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Bottom compose bar */}
            <a
              href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20puppies."
              target="_blank"
              rel="noopener noreferrer"
              className="tp-phone__compose"
            >
              <span>Say hello on WhatsApp</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </a>
          </div>

          {/* Teddy Mascot */}
          <div data-pose="sit" data-facing="right" className="pup-stop tp-chat__teddy">
            <PuppyMascot facing="right" />
          </div>
        </div>
      </div>
    </section>
  );
};
