'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PuppyMascot } from './PuppyMascot';
import type { Puppy } from '@/types';

export const GoneHomePageContent: React.FC<{ puppies: Puppy[] }> = ({ puppies }) => {
  return (
    <div data-page="gone" className="tp-page">
      <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
        <header className="tp-boothhead flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <h1 className="font-plush text-giant text-toffee-deep">
              Gone home
              <svg
                viewBox="0 0 48 44"
                className="ml-3 inline-block w-[0.45em] -translate-y-[0.15em] text-toffee"
                aria-hidden="true"
              >
                <path
                  d="M24 40C10 30 4 22 4 14.5 4 8.7 8.6 4 14.3 4c4.1 0 7.6 2.4 9.7 6 2.1-3.6 5.6-6 9.7-6C39.4 4 44 8.7 44 14.5 44 22 38 30 24 40z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </h1>
            <p className="text-lede mt-6 text-cocoa-soft max-w-2xl">
              Every puppy here has already joined a loving family. Looking for one just like them? Tell
              us — we&apos;ll help you find your match.
            </p>
            <Link href="/puppies" className="btn btn-primary mt-8 inline-block">
              See available puppies
            </Link>
          </div>

          <div aria-hidden="true" className="tp-booth shrink-0">
            <div className="pup-buddy tp-booth__teddy w-36" data-facing="right">
              <PuppyMascot facing="right" />
            </div>
          </div>
        </header>

        <ul className="tp-tickets mt-16" aria-label="Puppies who have gone home">
          {puppies.map((ticket, idx) => (
            <li
              key={ticket.id}
              className="tp-ticket"
              data-reveal="true"
              style={{
                ['--tilt' as any]: `${((idx % 4) - 1.5) * 0.8}deg`,
                ['--i' as any]: idx,
              }}
            >
              <Link className="tp-ticket__link" href={ticket.href}>
                <span className="tp-ticket__main">
                  <span className="tp-ticket__photo relative overflow-hidden">
                    <Image
                      alt={`${ticket.name}, ${ticket.meta}`}
                      src={ticket.image || '/brand/logo.png'}
                      fill
                      className="object-cover"
                      sizes="7rem"
                    />
                  </span>
                  <span className="tp-ticket__body">
                    <span className="font-scrawl tp-ticket__kicker">one ticket home</span>
                    <span className="font-plush tp-ticket__name">{ticket.name}</span>
                    <span className="tp-ticket__meta">{ticket.meta}</span>
                    <span className="tp-ticket__route">
                      <span>TeddyPups</span>
                      <svg viewBox="0 0 60 12" aria-hidden="true">
                        <path d="M2 6h46" stroke="currentColor" strokeWidth="2" fill="none" />
                        <path d="M44 2l6 4-6 4" stroke="currentColor" strokeWidth="2" fill="none" />
                      </svg>
                      <span>home ♥</span>
                    </span>
                  </span>
                </span>
                <span aria-hidden="true" className="tp-ticket__stub">
                  <span className="font-plush">admit one</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
