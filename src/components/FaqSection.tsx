'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { FaqItem } from '@/types';
import { PuppyMascot } from './PuppyMascot';

export const FaqSection: React.FC<{ faqs: FaqItem[] }> = ({ faqs }) => {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-2': true,
    'faq-3': true,
  });

  const toggle = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const starIcon = (
    <svg viewBox="0 0 40 40" className="tp-qa__star size-6 shrink-0 text-honey" aria-hidden="true">
      <path
        d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z"
        fill="currentColor"
      />
    </svg>
  );

  return (
    <section
      data-pup-scene="true"
      data-tone="dark"
      className="tp-scene tp-night text-milk py-16 md:py-24"
      style={{
        ['--sky-top' as string]: '#4d2b19',
        ['--sky-bottom' as string]: '#2f1a10',
      }}
      aria-labelledby="questions-title"
    >
      <div className="gutter mx-auto max-w-[96rem]">
        {/* Header with Title, Button & Mascot */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-12 border-b border-milk/15">
          <div>
            <h2 id="questions-title" className="font-plush text-huge text-milk">
              Questions, answered
            </h2>
            <p className="mt-3 text-lg text-milk/75">
              Everything you need to know about welcoming your new puppy home.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <Link className="btn btn-ghost border-milk/30 text-milk hover:bg-milk/10" href="/#questions-title">
              Read all questions
            </Link>
            <div className="hidden sm:block">
              <PuppyMascot pose="sit" facing="left" className="size-28" />
            </div>
          </div>
        </div>

        {/* Accordion / FAQ List */}
        <dl className="tp-night__list mt-10 space-y-4">
          {faqs.map((faq) => {
            const isOpen = !!openIds[faq.id];
            return (
              <div
                key={faq.id}
                className="tp-qa border-2 border-milk/15 rounded-3xl p-6 md:p-8 bg-cocoa/30 backdrop-blur-xs transition-colors hover:border-honey/40"
              >
                <dt
                  className="font-plush tp-qa__q text-xl md:text-2xl text-milk flex items-center gap-4 cursor-pointer select-none"
                  onClick={() => toggle(faq.id)}
                >
                  {starIcon}
                  <span className="flex-1 font-bold">{faq.question}</span>
                  <span className="text-honey text-2xl font-bold ml-2">
                    {isOpen ? '−' : '+'}
                  </span>
                </dt>

                {isOpen && (
                  <dd className="tp-qa__a mt-4 pl-10 text-base md:text-lg text-milk/85 leading-relaxed font-normal">
                    {faq.answer}
                  </dd>
                )}
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
};
