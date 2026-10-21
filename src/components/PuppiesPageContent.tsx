'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PuppyMascot } from './PuppyMascot';
import type { Puppy } from '@/types';

export const PuppiesPageContent: React.FC<{ puppies: Puppy[] }> = ({ puppies }) => {
  const [selectedOrigin, setSelectedOrigin] = useState<string>('all');
  const [selectedBreed, setSelectedBreed] = useState<string>('all');

  const breeds = ['all', 'maltipoo', 'pomeranian', 'poodle', 'cavapoo', 'shih-tzu'];

  const filteredPuppies = useMemo(() => {
    return puppies.filter((p) => {
      // origin filter
      if (selectedOrigin !== 'all' && p.origin !== selectedOrigin) {
        return false;
      }
      // breed filter
      if (selectedBreed !== 'all') {
        const b = p.breed.toLowerCase();
        if (selectedBreed === 'shih-tzu' && !b.includes('shih') && !b.includes('shitzu')) {
          return false;
        } else if (!b.includes(selectedBreed)) {
          return false;
        }
      }
      return true;
    });
  }, [puppies, selectedOrigin, selectedBreed]);

  return (
    <div data-page="pups" className="tp-page">
      <section aria-labelledby="pups-title" className="tp-sketchbook">
        <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          {/* Header */}
          <div className="tp-sketchbook__head flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="tp-sketchbook__words max-w-3xl">
              <p className="font-scrawl text-lg text-toffee-ink" data-reveal="true">
                from Teddy&apos;s sketchbook
              </p>
              <h1
                id="pups-title"
                className="font-plush text-giant tp-sketchbook__title text-toffee-deep relative inline-block"
                data-reveal="true"
              >
                Available puppies
                <svg
                  aria-hidden="true"
                  viewBox="0 0 400 24"
                  preserveAspectRatio="none"
                  className="tp-sketchbook__underline"
                >
                  <path d="M4 15c40-9 70 5 112-2s70-9 112 0 74 8 116-1 38-4 52 1" pathLength="1" />
                </svg>
              </h1>
              <p className="tp-sketchbook__lede text-lede mt-6 max-w-[46ch] text-cocoa-soft" data-reveal="true">
                Every listing shows real photos of the actual puppy. Open a profile to see them all,
                then ask us about them on WhatsApp.
              </p>
            </div>

            <div className="tp-sketchbook__self shrink-0" data-reveal="true">
              <div className="pup-buddy w-36 md:w-44" data-facing="left">
                <PuppyMascot facing="left" />
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="mt-12 space-y-4">
            {/* Origin filters */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-scrawl text-sm text-toffee-ink mr-2">location:</span>
              <button
                type="button"
                onClick={() => setSelectedOrigin('all')}
                className={`chip px-4 py-2 rounded-full border-2 text-sm font-semibold transition cursor-pointer ${
                  selectedOrigin === 'all'
                    ? 'border-toffee-deep bg-toffee-deep text-white shadow-sm'
                    : 'border-toffee/20 bg-white/80 text-cocoa hover:bg-honey-soft'
                }`}
              >
                All origins ({puppies.length})
              </button>
              <button
                type="button"
                onClick={() => setSelectedOrigin('local')}
                className={`chip px-4 py-2 rounded-full border-2 text-sm font-semibold transition cursor-pointer ${
                  selectedOrigin === 'local'
                    ? 'border-toffee-deep bg-toffee-deep text-white shadow-sm'
                    : 'border-toffee/20 bg-white/80 text-cocoa hover:bg-honey-soft'
                }`}
              >
                In Dubai · meet in person
              </button>
              <button
                type="button"
                onClick={() => setSelectedOrigin('imported')}
                className={`chip px-4 py-2 rounded-full border-2 text-sm font-semibold transition cursor-pointer ${
                  selectedOrigin === 'imported'
                    ? 'border-toffee-deep bg-toffee-deep text-white shadow-sm'
                    : 'border-toffee/20 bg-white/80 text-cocoa hover:bg-honey-soft'
                }`}
              >
                Imported · order upon request
              </button>
            </div>

            {/* Breed filters */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="font-scrawl text-sm text-toffee-ink mr-2">breed:</span>
              {breeds.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setSelectedBreed(b)}
                  className={`chip px-3 py-1.5 rounded-full border text-xs font-semibold capitalize transition cursor-pointer ${
                    selectedBreed === b
                      ? 'border-toffee bg-honey-soft text-toffee-deep font-bold'
                      : 'border-toffee/15 bg-white/60 text-cocoa-soft hover:bg-white'
                  }`}
                >
                  {b === 'all' ? 'All breeds' : b.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Puppies Grid */}
          <div className="mt-12">
            <ul className="tp-sketches mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 gap-y-12">
              {filteredPuppies.map((pup, idx) => (
                <li key={pup.id}>
                  <Link
                    className="tp-sketch block group"
                    data-reveal="true"
                    style={{
                      ['--tilt' as any]: `${((idx % 5) - 2) * 0.8}deg`,
                      ['--d' as any]: `${(idx % 8) * 40}ms`,
                      ['--wash' as any]: pup.color || '#f2be6b',
                    }}
                    aria-label={`${pup.name}, ${pup.breed}, ${pup.gender}, ${pup.age}, ${pup.status}`}
                    href={pup.href}
                  >
                    <span className="tp-sketch__frame block relative aspect-[4/5] rounded-3xl overflow-hidden border-2 border-toffee/20 bg-white/60 shadow-sm group-hover:shadow-md transition">
                      <Image
                        alt={pup.name}
                        src={pup.image || '/brand/logo.png'}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(min-width: 1536px) 17rem, (min-width: 1024px) 22vw, (min-width: 640px) 30vw, 46vw"
                        loading={idx < 8 ? 'eager' : 'lazy'}
                      />
                      <span className="tp-sketch__sticker font-scrawl absolute top-3 left-3 px-3 py-1 bg-white/90 rounded-full text-xs text-toffee-deep font-bold shadow-sm">
                        {pup.status}
                      </span>
                      {pup.hasVideo && (
                        <span className="tp-sketch__video absolute bottom-3 right-3 px-2.5 py-1 bg-cocoa/80 text-white rounded-full text-xs font-medium backdrop-blur-xs flex items-center gap-1 shadow-sm">
                          ▶ video
                        </span>
                      )}
                    </span>
                    <span className="tp-sketch__words block mt-3 text-center">
                      <span className="tp-sketch__name font-plush text-xl text-toffee-deep block group-hover:text-toffee transition-colors">
                        {pup.name}
                      </span>
                      <span className="tp-sketch__meta text-sm text-cocoa-soft block mt-0.5">
                        {pup.breed} · {pup.gender} · {pup.age}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {filteredPuppies.length === 0 && (
              <div className="p-12 text-center bg-white/60 rounded-3xl border-2 border-toffee/20 mt-12">
                <p className="font-plush text-2xl text-toffee-deep">No puppies match your filter</p>
                <p className="text-cocoa-soft mt-2">
                  Try clearing your filters or contact us on WhatsApp to request a custom breed!
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedOrigin('all');
                    setSelectedBreed('all');
                  }}
                  className="btn btn-ghost mt-6"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>

          {/* Gone Home Teaser Banner */}
          <div className="mt-24 p-8 md:p-12 rounded-3xl bg-honey-soft/50 border-2 border-toffee/20 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-scrawl text-lg text-toffee-ink">already in loving arms</p>
              <h2 className="font-plush text-3xl text-toffee-deep mt-1">
                Looking for puppies who have gone home?
              </h2>
              <p className="mt-2 text-cocoa-soft max-w-xl">
                See past litters and puppies who have happily joined their new families. Found one you
                adore? We can source a similar puppy upon request!
              </p>
            </div>
            <Link href="/gone-home" className="btn btn-primary shrink-0">
              Explore gone home puppies
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
