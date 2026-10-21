'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Puppy } from '@/types';

const HERO_SEAT_STYLE = [
  { x: '9%', w: '8.6rem', peek: '0.62', tilt: '-5deg' }, { x: '22.5%', w: '10.4rem', peek: '0.8', tilt: '3deg' },
  { x: '35%', w: '9.2rem', peek: '0.7', tilt: '-2deg' }, { x: '65%', w: '9.4rem', peek: '0.74', tilt: '3deg' },
  { x: '77.5%', w: '10.6rem', peek: '0.82', tilt: '-3deg' }, { x: '91%', w: '8.4rem', peek: '0.6', tilt: '4deg' },
];

export const Hero: React.FC<{ puppies: Puppy[] }> = ({ puppies }) => {
  const HERO_SEATS = HERO_SEAT_STYLE.map((seat, i) => ({ ...seat, i, puppy: puppies[i] })).filter((seat) => seat.puppy);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      data-pup-scene="true"
      data-tone="light"
      className="tp-scene tp-hero"
      style={{
        ['--sky-top' as string]: '#fffdf8',
        ['--sky-bottom' as string]: '#fff1d8',
        ['--quilt' as string]: '#fff1d8',
      }}
      aria-labelledby="hero-title"
    >
      <span aria-hidden="true" className="tp-hero__sun" />

      <div className="tp-hero__copy gutter">
        <p className="tp-hero__note font-scrawl relative inline-block">
          every puppy is family
          <svg
            viewBox="0 0 220 24"
            preserveAspectRatio="none"
            className="absolute -bottom-2 left-0 h-3 w-full text-toffee"
            aria-hidden="true"
          >
            <path
              d="M4 14c18-10 30 8 48-1s28-9 46 0 30 8 48-1 30-9 48 0 18 2 22 0"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </p>

        <h1 id="hero-title" className="tp-hero__title font-plush">
          <span className="tp-hero__line">Premium teacup</span>
          <span className="tp-hero__line tp-hero__line--2">puppies in Dubai</span>
        </h1>

        <p className="tp-hero__lede">
          Meet your new best friend in our Dubai showroom, or order a rare miniature breed from
          trusted breeders worldwide.
        </p>

        <div className="tp-hero__actions">
          <Link className="btn btn-primary" href="/#meet-title">
            View available puppies
          </Link>
          <a
            href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20puppies."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            Enquire on WhatsApp
          </a>
        </div>
      </div>

      <div className="tp-hero__stage">
        {/* Puppy Lineup */}
        <ul className="tp-lineup" aria-label="Some of the puppies in our showroom">
          {HERO_SEATS.map((seat, idx) => (
            <li
              key={seat.puppy.id}
              className="tp-lineup__seat"
              style={{
                ['--x' as string]: seat.x,
                ['--w' as string]: seat.w,
                ['--peek' as string]: hoveredIdx === idx ? '0.96' : seat.peek,
                ['--tilt' as string]: hoveredIdx === idx ? '0deg' : seat.tilt,
                ['--i' as string]: seat.i,
              }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <Link
                className="tp-lineup__pup"
                data-pup-friend="true"
                aria-label={`Meet ${seat.puppy.name}, ${seat.puppy.breed}`}
                href={seat.puppy.href}
              >
                <span className="tp-lineup__photo relative block h-full w-full overflow-hidden rounded-full">
                  <Image
                    alt={`${seat.puppy.name}, ${seat.puppy.breed}`}
                    fill
                    sizes="11rem"
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    priority
                    src={seat.puppy.image}
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Floating name tags */}
        <ul aria-hidden="true" className="tp-lineup tp-lineup--tags">
          {HERO_SEATS.map((seat, idx) => (
            <li
              key={`tag-${seat.puppy.id}`}
              className="tp-lineup__seat"
              style={{
                ['--x' as string]: seat.x,
                ['--w' as string]: seat.w,
                ['--peek' as string]: hoveredIdx === idx ? '0.96' : seat.peek,
                ['--tilt' as string]: hoveredIdx === idx ? '0deg' : seat.tilt,
                ['--i' as string]: seat.i,
              }}
            >
              <span className="tp-lineup__ghost">
                <span className="tp-lineup__name font-scrawl">{seat.puppy.name}</span>
              </span>
            </li>
          ))}
        </ul>

        {/* Center Mascot Puppy on ledge */}
        <div
          data-pup-stop="true"
          data-pose="peek"
          className="pup-stop tp-hero__teddy"
          style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 12 }}
        >
          <svg
            viewBox="0 0 300 240"
            className="size-36 md:size-44"
            aria-hidden="true"
            focusable="false"
            style={{ overflow: 'visible' }}
          >
            <ellipse cx="150" cy="230" rx="86" ry="7" fill="#2a170e" opacity="0.12" />
            <g className="tp-runner__body">
              <path
                d="M76.8 175.6Q69.0 167.9 78.2 160.7Q76.6 151.8 90.3 147.3Q95.2 138.9 110.9 137.9Q121.6 131.3 136.7 134.0Q151.1 130.5 162.9 136.4Q178.7 136.4 185.3 144.5Q199.7 148.2 199.7 157.1Q210.3 163.7 203.9 171.9Q208.7 180.4 197.0 186.3Q195.3 195.2 180.3 198.0Q172.3 205.7 156.6 204.8Q143.7 210.0 130.0 205.6Q114.5 207.4 105.1 200.2Q89.7 198.3 86.3 189.6Q73.6 184.3 76.8 175.6Z"
                fill="#f2be6b"
                stroke="#2a170e"
                strokeWidth="3.4"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <g className="tp-runner__head">
                <path
                  d="M178 146 Q212 162 246 146 L246 154 Q212 170 178 154 Z"
                  fill="#a24a1a"
                  stroke="#2a170e"
                  strokeWidth="3"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                <path
                  d="M212 160 C212 156 206 155 206 159.4 C206 163 212 166.6 212 168.4 C212 166.6 218 163 218 159.4 C218 155 212 156 212 160 Z"
                  fill="#fbe3b4"
                  stroke="#2a170e"
                  strokeWidth="2.4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                <path
                  d="M177.1 78.7Q186.9 70.8 186.6 87.4Q196.0 89.9 189.9 105.5Q195.2 117.3 185.5 126.0Q184.7 142.8 175.2 141.2Q168.7 156.5 162.9 145.3Q153.1 153.2 153.4 136.6Q144.0 134.1 150.1 118.5Q144.8 106.7 154.5 98.0Q155.3 81.2 164.8 82.8Q171.3 67.5 177.1 78.7Z"
                  fill="#e4a352"
                  stroke="#2a170e"
                  strokeWidth="3.4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  className="tp-runner__ear"
                  style={{ transformOrigin: '174px 82px' }}
                />
                <path
                  d="M246.9 78.7Q252.7 67.5 259.2 82.8Q268.7 81.2 269.5 98.0Q279.2 106.7 273.9 118.5Q280.0 134.1 270.6 136.6Q270.9 153.2 261.1 145.3Q255.3 156.5 248.8 141.2Q239.3 142.8 238.5 126.0Q228.8 117.3 234.1 105.5Q228.0 89.9 237.4 87.4Q237.1 70.8 246.9 78.7Z"
                  fill="#e4a352"
                  stroke="#2a170e"
                  strokeWidth="3.4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  className="tp-runner__ear tp-runner__ear--r"
                  style={{ transformOrigin: '250px 82px' }}
                />
                <path
                  d="M212.0 54.0Q223.4 48.2 231.5 57.5Q244.5 56.1 248.1 67.5Q260.7 70.7 259.1 82.4Q269.4 89.7 263.0 100.0Q269.4 110.3 259.1 117.6Q260.7 129.3 248.1 132.5Q244.5 143.9 231.5 142.5Q223.4 151.8 212.0 146.0Q200.6 151.8 192.5 142.5Q179.5 143.9 175.9 132.5Q163.3 129.3 164.9 117.6Q154.6 110.3 161.0 100.0Q154.6 89.7 164.9 82.4Q163.3 70.7 175.9 67.5Q179.5 56.1 192.5 57.5Q200.6 48.2 212.0 54.0Z"
                  fill="#f2be6b"
                  stroke="#2a170e"
                  strokeWidth="3.4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                <path
                  d="M188 120 C188 106 200 100 212 100 C224 100 236 106 236 120 C236 133 225 140 212 140 C199 140 188 133 188 120 Z"
                  fill="#fbe3b4"
                />
                <circle cx="181" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />
                <circle cx="243" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />
                <ellipse cx="194" cy="98" rx="7.4" ry="8.6" fill="#2a170e" />
                <ellipse cx="230" cy="98" rx="7.4" ry="8.6" fill="#2a170e" />
                <circle cx="196.6" cy="94.6" r="2.7" fill="#fff" />
                <circle cx="232.6" cy="94.6" r="2.7" fill="#fff" />
                <path
                  d="M204.5 111.5 Q212 107.2 219.5 111.5 Q218.2 118.4 212 120 Q205.8 118.4 204.5 111.5 Z"
                  fill="#2a170e"
                />
                <path
                  d="M212 120 V124.5 M212 124.5 Q207.2 129.6 202.8 125.2 M212 124.5 Q216.8 129.6 221.2 125.2"
                  stroke="#2a170e"
                  strokeWidth="3"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M207.6 127.4 Q212 136.6 216.4 127.4 Z"
                  fill="#e98c8c"
                  stroke="#2a170e"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                />
              </g>
              {/* Ledge paws */}
              <g data-p="ledge" opacity="1">
                <path
                  d="M175 159 C175 148 181 142 190 142 C199 142 205 148 205 159 Z M219 159 C219 148 225 142 234 142 C243 142 249 148 249 159 Z"
                  fill="#f2be6b"
                  stroke="#2a170e"
                  strokeWidth="3.4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                <path
                  d="M186 153 v-4.5 M194 153 v-4.5 M230 153 v-4.5 M238 153 v-4.5"
                  stroke="#2a170e"
                  strokeWidth="2.4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>
            </g>
          </svg>
        </div>

        {/* Quilted scalloped bottom divider */}
        <div aria-hidden="true" className="tp-quilt">
          <svg className="tp-quilt__edge" width="100%" height="40" preserveAspectRatio="none">
            <defs>
              <pattern id="tp-scallop" width="76" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 40V27A38 25 0 0 1 76 27V40Z" style={{ fill: 'var(--quilt)' }} />
                <path d="M0 27A38 25 0 0 1 76 27" fill="none" stroke="#2a170e" strokeWidth="3" />
                <path
                  d="M11 33A27 19 0 0 1 65 33"
                  fill="none"
                  stroke="#2a170e"
                  strokeWidth="1.6"
                  strokeDasharray="3.5 5.5"
                  strokeLinecap="round"
                  opacity=".42"
                />
              </pattern>
            </defs>
            <rect width="100%" height="40" fill="url(#tp-scallop)" />
          </svg>
        </div>
      </div>
    </section>
  );
};
