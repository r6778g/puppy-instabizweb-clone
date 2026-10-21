'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PuppyMascot } from './PuppyMascot';

const EXPLORE_LINKS = [
  { label: 'Available puppies', href: '/puppies' },
  { label: 'Gone home', href: '/gone-home' },
  { label: 'Happy families', href: '/happy-families' },
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Delivery & collection', href: '/how-it-works#delivery' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Visit & contact', href: '/contact' },
];

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/teddypups.worldwide/' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@teddypupsuae' },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61567496944539' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="tp-footer relative pb-10 text-milk bg-[#1a0e08]">
      {/* Hill wave top */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="tp-footer__hill block w-full h-12 md:h-20 text-[#1a0e08] fill-current -mt-px"
      >
        <path d="M0 80V44c120-30 240-44 360-30s240 46 360 34 240-58 360-46 240 40 360 26v52z" />
      </svg>

      {/* Twinkling stars */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-6 h-64 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          {[6, 14, 28, 42, 56, 68, 78, 88, 94].map((left, i) => (
            <svg
              key={i}
              viewBox="0 0 40 40"
              className="tp-twinkle absolute text-honey"
              style={{
                left: `${left}%`,
                top: `${10 + (i * 7) % 50}%`,
                width: `${8 + (i % 3) * 4}px`,
                animationDelay: `${i * 0.4}s`,
              }}
              aria-hidden="true"
            >
              <path
                d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z"
                fill="currentColor"
              />
            </svg>
          ))}
        </div>
        <span className="tp-moon absolute right-[12%] top-[8%] size-10 rounded-full bg-honey-soft/90 shadow-[0_0_40px_rgba(251,227,180,0.4)]" />
      </div>

      <div className="gutter relative mx-auto grid max-w-[110rem] gap-12 pt-20 md:grid-cols-12 md:gap-x-12 md:gap-y-6 md:pt-28">
        {/* Brand column */}
        <div className="md:col-span-5">
          <p className="font-plush text-3xl md:text-4xl text-honey-soft">Home, at last.</p>
          <p className="mt-5 max-w-md text-milk/80 leading-relaxed">
            TeddyPups U.A.E. is a Dubai-based brand specializing in miniature puppies, offering
            premium services and worldwide shipping.
          </p>
        </div>

        {/* Mascot in basket */}
        <div className="order-last md:order-none md:col-span-5 md:col-start-1 md:row-start-2 flex justify-center md:justify-start">
          <PuppyMascot pose="sit" facing="right" className="size-40 md:size-48 opacity-80" />
        </div>

        {/* Explore Nav */}
        <nav aria-label="Footer" className="md:col-span-3 md:col-start-7 md:row-span-2 md:row-start-1">
          <h2 className="font-scrawl text-lg text-honey">Explore</h2>
          <ul className="mt-4 space-y-2.5">
            {EXPLORE_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  className="font-semibold text-milk/90 underline-offset-4 hover:text-honey hover:underline transition-colors"
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div className="md:col-span-3 md:row-span-2 md:row-start-1">
          <h2 className="font-scrawl text-lg text-honey">Say hello</h2>
          <ul className="mt-4 space-y-2.5 text-milk/90">
            <li>
              <a
                className="font-semibold hover:text-honey transition-colors"
                href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20puppies."
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp +971 54 167 6733
              </a>
            </li>
            <li>
              <a className="break-all hover:text-honey transition-colors" href="mailto:teddypupsadmin@gmail.com">
                teddypupsadmin@gmail.com
              </a>
            </li>
            <li className="text-milk/70">Downtown Dubai, United Arab Emirates</li>
          </ul>

          <ul className="mt-6 flex flex-wrap gap-3" aria-label="Social media">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.label}>
                <a
                  className="inline-flex h-11 items-center rounded-full border-2 border-milk/30 px-4 text-sm font-semibold hover:border-honey hover:text-honey transition-colors"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Copyright */}
        <div className="md:col-span-12 border-t border-milk/15 pt-6 mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-milk/60">
          <div className="flex items-center gap-3">
            <Image alt="" width={36} height={36} src="/brand/logo.png" className="size-9 rounded-full" />
            <span>© 2026 TeddyPups U.A.E.</span>
          </div>
          <span className="font-scrawl text-base text-honey/80">every puppy is family</span>
        </div>
      </div>
    </footer>
  );
};
