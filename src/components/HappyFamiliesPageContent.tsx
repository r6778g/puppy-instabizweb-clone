'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PhotoLightbox } from './PhotoLightbox';
import { PolaroidPhoto } from '@/types';

type FamilyPhoto = { source_key: string; image_url: string; alt_text: string | null; display_tilt: string | null; tape_color: string | null };
export const HappyFamiliesPageContent: React.FC<{ photos: FamilyPhoto[] }> = ({ photos }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedPhoto: PolaroidPhoto | null =
    selectedIndex !== null && photos[selectedIndex]
      ? {
          id: selectedIndex,
          image: photos[selectedIndex].image_url || '/brand/logo.png',
          caption: 'TeddyPups happy family',
          style: photos[selectedIndex].display_tilt || '0deg',
          location: 'Dubai, UAE',
        }
      : null;

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % photos.length);
    }
  };

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(
        (selectedIndex - 1 + photos.length) % photos.length
      );
    }
  };

  return (
    <div data-page="families" className="tp-page">
      <section aria-labelledby="families-title" className="tp-memories">
        <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          <div className="tp-memories__head flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div>
              <p className="font-scrawl text-lg text-toffee-ink" data-reveal="true">
                our wall of happy endings
              </p>
              <h1
                id="families-title"
                className="font-plush text-giant tp-memories__title text-toffee-deep flex items-center"
                data-reveal="true"
              >
                Happy families
                <svg
                  viewBox="0 0 48 44"
                  className="tp-memories__heart ml-4 inline-block w-[0.45em] text-toffee"
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
              <p className="text-lede mt-6 max-w-[50ch] text-cocoa-soft" data-reveal="true">
                Nothing makes us happier than seeing our puppies in loving homes! Here are some
                beautiful moments shared by our amazing clients after welcoming their furry friends.
              </p>
              <p className="font-scrawl mt-5 text-lg text-toffee-ink" data-reveal="true">
                {photos.length} moments and counting
              </p>
            </div>

            <figure className="tp-memories__note max-w-md p-6 bg-white/90 rounded-2xl border-2 border-toffee/20 shadow-md relative" data-reveal="true">
              <span
                aria-hidden="true"
                className="tp-tape tp-tape--center"
                style={{ ['--tape' as any]: '#cfe5f6' }}
              />
              <blockquote className="font-plush-text text-cocoa text-base leading-relaxed">
                “TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind.”
              </blockquote>
              <figcaption className="font-scrawl text-toffee text-right mt-4 font-semibold">
                Sarah M., Dubai, UAE
              </figcaption>
            </figure>
          </div>

          <div className="mt-16 md:mt-20">
            <ul className="tp-wall" aria-label="Photos from TeddyPups families">
              {photos.map((item, idx) => (
                <li
                  key={item.source_key}
                  className="tp-wall__item"
                  data-reveal="true"
                  style={{ ['--d' as any]: `${(idx % 12) * 50}ms` }}
                >
                  <button
                    type="button"
                    className="tp-wall__print w-full text-left cursor-pointer transition transform hover:scale-[1.03]"
                    aria-label={`Open photo ${idx + 1} of ${photos.length}`}
                    onClick={() => setSelectedIndex(idx)}
                  >
                    <span
                      className="tp-polaroid block"
                      style={{
                        ['--tilt' as any]: item.display_tilt || '0deg',
                        ['--tape' as any]: item.tape_color || '#f6d79a',
                        ['--i' as any]: idx,
                      }}
                    >
                      <span aria-hidden="true" className="tp-tape tp-tape--center" />
                      <span className="tp-polaroid__photo block relative overflow-hidden aspect-[3/4]">
                        <Image
                          alt={item.alt_text || 'A happy TeddyPups family with their new puppy'}
                          src={item.image_url || '/brand/logo.png'}
                          fill
                          className="object-cover"
                          sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 45vw"
                          loading={idx < 12 ? 'eager' : 'lazy'}
                        />
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <PhotoLightbox
        photo={selectedPhoto}
        onClose={() => setSelectedIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
};
