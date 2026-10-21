'use client';

import React from 'react';
import { PuppyMascot } from './PuppyMascot';

const STAMPS = [
  {
    id: 'vet',
    title: 'Vet-checked & healthy',
    description: 'Every puppy comes vaccinated, dewormed, and with a verified health certificate.',
    stampType: 'round',
    color: '#a24a1a',
    tilt: '-8deg',
    icon: (
      <svg viewBox="0 0 64 64" className="tp-stamp__icon size-10" aria-hidden="true">
        <path
          d="M32 54C16 43 8 34 8 24c0-7 5.4-12 12-12 5 0 9 3 12 7 3-4 7-7 12-7 6.6 0 12 5 12 12 0 10-8 19-24 30z"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 30h7l3-7 4 13 3-6h7"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 'korea',
    title: 'Korea to Dubai, safely',
    description: 'Trusted breeders, safe travel, and premium care from start to finish.',
    stampType: 'ticket',
    color: '#1f6b45',
    tilt: '5deg',
    icon: (
      <svg viewBox="0 0 64 64" className="tp-stamp__icon size-10" aria-hidden="true">
        <path
          d="M6 36l22-3 12-17h6l-6 17 12-1 6-7h3l-2 10 2 10h-3l-6-7-12-1 6 17h-6L28 37 6 36z"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 50c10 4 20 4 30 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="2 7"
        />
      </svg>
    ),
  },
  {
    id: 'support',
    title: 'Support 24/7',
    description: 'Always here to help, from choosing your puppy to post-delivery support.',
    stampType: 'oval',
    color: '#5a3a28',
    tilt: '-4deg',
    icon: (
      <svg viewBox="0 0 64 64" className="tp-stamp__icon size-10" aria-hidden="true">
        <path
          d="M10 14h44v28H30l-12 10v-10h-8z"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 28h0M32 28h0M42 28h0"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 'trusted',
    title: 'Trusted by families worldwide',
    description: 'Puppies delivered to loving homes all around the world.',
    stampType: 'scallop',
    color: '#c2622b',
    tilt: '7deg',
    icon: (
      <svg viewBox="0 0 64 64" className="tp-stamp__icon size-10" aria-hidden="true">
        <circle
          cx="32"
          cy="32"
          r="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 32h44M32 10c-8 8-8 36 0 44M32 10c8 8 8 36 0 44"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export const TrustPassport: React.FC = () => {
  return (
    <section
      data-pup-scene="true"
      data-tone="light"
      className="tp-scene tp-passport relative"
      style={{
        ['--sky-top' as string]: '#f0b866',
        ['--sky-bottom' as string]: '#a65a30',
      }}
      aria-labelledby="trust-title"
    >
      <div className="gutter mx-auto max-w-[96rem]">
        {/* Open Passport Book */}
        <div className="tp-book grid grid-cols-1 md:grid-cols-2 rounded-3xl border-4 border-cocoa bg-[#fff9ea] shadow-2xl overflow-hidden divide-y-2 md:divide-y-0 md:divide-x-2 divide-cocoa/20">
          {/* Left Page */}
          <div className="tp-book__page tp-book__page--left p-8 md:p-12 flex flex-col justify-between relative bg-[radial-gradient(#2a170e06_1px,transparent_1px)] bg-[size:18px_18px]">
            <div>
              <p aria-hidden="true" className="tp-book__kicker font-scrawl text-xl md:text-2xl text-toffee-ink">
                puppy passport
              </p>
              <h2 id="trust-title" className="font-plush tp-book__title text-3xl md:text-5xl text-cocoa mt-3 leading-tight">
                Why families trust TeddyPups
              </h2>
            </div>

            <div className="mt-8 flex justify-center md:justify-start">
              <PuppyMascot pose="sit" facing="right" className="size-48 md:size-56" />
            </div>
          </div>

          {/* Right Page: Passport Stamps */}
          <ul className="tp-book__page tp-book__page--right p-6 md:p-10 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#fff6e0]">
            {STAMPS.map((stamp) => (
              <li
                key={stamp.id}
                className="tp-entry p-5 rounded-2xl border-2 border-cocoa/30 bg-milk/80 shadow-sm transition-transform duration-300 hover:scale-105"
                style={{
                  ['--ink-stamp' as string]: stamp.color,
                  transform: `rotate(${stamp.tilt})`,
                }}
              >
                <span
                  className={`tp-stamp tp-stamp--${stamp.stampType} flex flex-col items-center text-center gap-2`}
                  style={{ color: stamp.color }}
                >
                  {stamp.icon}
                  <span className="tp-stamp__title font-plush text-lg font-bold leading-tight">
                    {stamp.title}
                  </span>
                </span>
                <p className="tp-entry__text text-xs md:text-sm text-cocoa-soft mt-3 text-center leading-relaxed font-medium">
                  {stamp.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Horizon with Sun and Dubai Skyline */}
      <div aria-hidden="true" className="tp-horizon mt-16 relative overflow-hidden text-cocoa/80">
        <span className="tp-horizon__sun" />
        <svg viewBox="0 0 1440 160" preserveAspectRatio="none" className="tp-horizon__city w-full h-24 md:h-36 fill-current">
          <path d="M0 160V118h34v-14h22v-22h30v34h18V96h26v30h22v-18h16v-30h34v40h20V70h28v56h24V98h18v-26h30v54h20v-38h26v-40l14-6 14 6v40h22v46h18V84h26v-30h22v50h24V76h36v50h20V96h18v-58h30v44h14V96h22v-30h16v22h26v-52l6-8v-24l4-6v-30l3-18 3 18v30l4 6v24l6 8v52h26v30h22V82h30v-20h24v48h20V90h28v-36h26v56h18V74h30v36h22V94h26v-24h30v62h20V102h26v20h34v38z" />
        </svg>
      </div>
    </section>
  );
};
