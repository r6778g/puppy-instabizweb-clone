'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PuppyMascot } from './PuppyMascot';

export const ReadyToMeet: React.FC = () => {
  return (
    <section
      data-pup-scene="true"
      data-tone="dark"
      className="tp-scene tp-home text-milk py-20 relative overflow-hidden"
      style={{
        ['--sky-top' as string]: '#2f1a10',
        ['--sky-bottom' as string]: '#24130b',
      }}
      aria-labelledby="cta-title"
    >
      <div className="tp-home__copy gutter max-w-4xl mx-auto text-center">
        <h2 id="cta-title" className="font-plush text-huge text-milk leading-tight">
          Ready to meet your new best friend?
        </h2>
        <p className="tp-home__lede mt-6 text-lg md:text-xl text-milk/85 max-w-2xl mx-auto leading-relaxed">
          Bring home a healthy, happy teacup or designer puppy with expert guidance every step of the way.
          We help you find the right match and ensure a smooth, safe delivery across the UAE.
        </p>
      </div>

      {/* House Entrance Vignette */}
      <div className="tp-house relative mt-16 max-w-xl mx-auto flex flex-col items-center">
        {/* Lamp light glow */}
        <span aria-hidden="true" className="tp-house__lamp block size-12 rounded-full bg-honey/80 blur-md mb-2" />

        {/* Doorway with Puppy inside */}
        <div className="tp-house__doorway relative w-48 h-64 rounded-t-full border-4 border-cocoa bg-[#1a0e08] overflow-hidden shadow-2xl">
          <span className="tp-house__inside absolute inset-0 block overflow-hidden rounded-t-full">
            <Image
              alt="Max waiting inside"
              fill
              sizes="16rem"
              className="object-cover"
              src="/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp"
            />
          </span>

          {/* Door half open */}
          <span
            aria-hidden="true"
            className="tp-house__door absolute inset-y-0 right-0 w-1/2 border-l-3 border-cocoa bg-[#8e3f15] shadow-lg flex items-center justify-start pl-2"
          >
            <span className="tp-house__knob size-3 rounded-full bg-honey border border-cocoa" />
          </span>
        </div>

        {/* Welcome Mat */}
        <span
          aria-hidden="true"
          className="tp-house__mat font-scrawl text-lg md:text-xl px-8 py-2 rounded-xl bg-honey text-cocoa border-2 border-cocoa font-bold shadow-md -mt-3 z-10"
        >
          welcome home
        </span>

        {/* Mascot bow */}
        <div className="mt-4">
          <PuppyMascot pose="stand" facing="right" className="size-36" />
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 z-20">
          <a
            href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20puppies."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp text-lg px-8 py-3.5"
          >
            Enquire on WhatsApp
          </a>
          <Link className="btn btn-ghost border-milk/40 text-milk hover:bg-milk/15 text-lg px-8 py-3.5" href="/#cta-title">
            Visit &amp; contact
          </Link>
        </div>
      </div>
    </section>
  );
};
