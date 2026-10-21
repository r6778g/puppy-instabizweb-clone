'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PhotoLightbox } from './PhotoLightbox';
import { PolaroidPhoto } from '@/types';

type Testimonial = { quote: string; author_name: string; location: string | null } | null;

export const HappyFamilies: React.FC<{ photos: PolaroidPhoto[]; testimonial: Testimonial }> = ({ photos, testimonial }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PolaroidPhoto | null>(null);

  const handleNext = () => {
    if (!selectedPhoto) return;
    const currentIndex = photos.findIndex((p) => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % photos.length;
    setSelectedPhoto(photos[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedPhoto) return;
    const currentIndex = photos.findIndex((p) => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    setSelectedPhoto(photos[prevIndex]);
  };

  return (
    <>
      <section
        data-pup-scene="true"
        data-tone="dark"
        className="tp-scene tp-dusk text-milk"
        style={{
          ['--sky-top' as string]: '#a65a30',
          ['--sky-bottom' as string]: '#4d2b19',
        }}
        aria-labelledby="dusk-title"
      >
        <div className="tp-dusk__sky gutter max-w-[110rem] mx-auto">
          <div className="tp-dusk__head">
            <h2 id="dusk-title" className="font-plush text-huge text-milk">
              Happy families &amp; puppies
            </h2>
            <p className="text-lede mt-5 max-w-[50ch] text-[var(--ink-soft)] text-lg text-milk/80 leading-relaxed">
              We are truly honored to see our puppies become cherished members of loving families.
              These heartwarming moments have been shared by our valued clients who welcomed a Teddy Pup into their homes and hearts.
            </p>
          </div>

          {/* Testimonial Quote */}
          <figure className="tp-dusk__note my-10 max-w-3xl p-6 md:p-8 rounded-3xl bg-cocoa/40 border-2 border-honey/30 shadow-lg backdrop-blur-xs">
            <blockquote className="font-plush-text text-xl md:text-2xl text-milk italic leading-snug">
              &ldquo;{testimonial?.quote}&rdquo;
            </blockquote>
            <figcaption className="font-scrawl text-lg text-honey-soft mt-4">
              {testimonial?.author_name}, {testimonial?.location}
            </figcaption>
          </figure>
        </div>

        {/* Photowall / Polaroid Gallery */}
        <div className="tp-photowall overflow-x-auto pb-8 pt-4">
          <div className="tp-photowall__wall px-4 md:px-8 max-w-[110rem] mx-auto">
            <ul
              className="tp-photowall__prints grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8"
              aria-label="Photos from TeddyPups families"
            >
              {photos.map((photo) => (
                <li key={photo.id} data-reveal="true" className="group">
                  <button
                    type="button"
                    className="tp-photowall__print w-full text-left cursor-pointer focus:outline-none"
                    aria-label={`Open photo ${photo.id} of 8: ${photo.caption}`}
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <span
                      className="tp-polaroid block bg-[#fefdfb] text-cocoa p-3.5 pb-5 rounded-2xl shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl border border-[#ece3d4]"
                      style={{
                        transform: `rotate(${photo.style.split(';')[0].replace('--tilt:', '')})`,
                      }}
                    >
                      {/* Decorative Tape */}
                      <span aria-hidden="true" className="tp-tape tp-tape--center block mx-auto -mt-6 mb-2 w-16 h-4 bg-honey/80 opacity-90 rounded-xs shadow-xs" />

                      <span className="tp-polaroid__photo relative block aspect-square w-full rounded-xl overflow-hidden bg-honey-soft/40 border border-cocoa/10">
                        <Image
                          alt="A happy TeddyPups family with their new puppy"
                          fill
                          sizes="(min-width: 1024px) 18vw, (min-width: 640px) 28vw, 42vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          src={photo.image}
                        />
                      </span>

                      <span className="font-scrawl tp-polaroid__caption block text-center text-sm md:text-base font-semibold text-cocoa mt-3 line-clamp-1">
                        {photo.caption}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer CTA in Dusk */}
        <div className="gutter text-center mt-6 pb-12">
          <Link className="btn btn-ghost border-milk/30 text-milk hover:bg-milk/10" href="/#dusk-title">
            See every happy family
          </Link>
        </div>
      </section>

      {/* Lightbox Modal */}
      <PhotoLightbox
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </>
  );
};
