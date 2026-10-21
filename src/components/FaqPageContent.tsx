'use client';

import React, { useState, useMemo } from 'react';
import { PuppyMascot } from './PuppyMascot';
import { Search } from 'lucide-react';
import type { FaqItem as DatabaseFaqItem } from '@/types';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  tilt: string;
  pin: string;
}

const FAQS_DATA: FaqItem[] = [
  {
    id: 'q-1',
    question: 'Are your puppies vaccinated and health-checked?',
    answer: 'Yes. All our puppies come with a verified health certificate from licensed vets. Every puppy is vaccinated, dewormed, and thoroughly checked before joining your family.',
    tilt: '-1.6deg',
    pin: 'var(--color-toffee)',
  },
  {
    id: 'q-2',
    question: 'Can I meet a puppy before I decide?',
    answer: 'Yes. Come meet our locally available puppies in our Downtown Dubai showroom and spend time bonding before making your decision.',
    tilt: '1.2deg',
    pin: 'var(--color-sky-deep)',
  },
  {
    id: 'q-3',
    question: 'Can I take my puppy home the same day?',
    answer: 'Local puppies are available immediately, so you can take your puppy home the same day.',
    tilt: '-0.8deg',
    pin: '#d9a13c',
  },
  {
    id: 'q-4',
    question: 'Do you import puppies from abroad?',
    answer: 'Yes. Through our Order Upon Request service we source rare and premium teacup breeds from the most reputable, certified breeders across Europe, Korea, and beyond — and we handle the import for you.',
    tilt: '1.8deg',
    pin: '#c45a6a',
  },
  {
    id: 'q-5',
    question: 'How does an imported puppy travel to Dubai?',
    answer: 'We manage every part of the import process, including health checks, travel arrangements, and the necessary documentation, so your puppy arrives happy, healthy, and stress-free.',
    tilt: '-1.2deg',
    pin: 'var(--color-toffee)',
  },
  {
    id: 'q-6',
    question: 'Will I see photos and health details first?',
    answer: 'Yes. Photos, videos, and health certificates are shared before your puppy travels, and our team sends real photos and health details directly on WhatsApp.',
    tilt: '0.7deg',
    pin: 'var(--color-sky-deep)',
  },
  {
    id: 'q-7',
    question: 'Do you deliver?',
    answer: 'Yes. We deliver within Dubai, and our trusted international cargo partners deliver puppies safely to loving homes all around the world.',
    tilt: '-1.9deg',
    pin: '#d9a13c',
  },
  {
    id: 'q-8',
    question: 'Which breeds do you usually have?',
    answer: 'Breeds we regularly have include Maltipoo, Pomeranian, Poodle and Bichon, plus rare teacup lines such as Korean teacup poodles, Maltese, Pom and Yorkie.',
    tilt: '1.4deg',
    pin: '#c45a6a',
  },
  {
    id: 'q-9',
    question: 'Is there help after my puppy comes home?',
    answer: 'Yes. Our team is available 24/7 and offers advice on training, nutrition, and general care to ensure a smooth transition for you and your new furry friend.',
    tilt: '-1.6deg',
    pin: 'var(--color-toffee)',
  },
];

export const FaqPageContent: React.FC<{ faqs: DatabaseFaqItem[] }> = ({ faqs }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});

  const toggleOpen = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const styledFaqs: FaqItem[] = faqs.map((faq, index) => ({
      ...faq,
      tilt: ['-1.6deg', '1.2deg', '-0.8deg', '1.8deg'][index % 4],
      pin: ['var(--color-toffee)', 'var(--color-sky-deep)', '#d9a13c', '#c45a6a'][index % 4],
    }));
    if (!q) return styledFaqs;
    return styledFaqs.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q)
    );
  }, [faqs, searchQuery]);

  return (
    <section
      data-pup-scene="true"
      data-tone="dark"
      className="tp-scene tp-faqroom overflow-hidden"
      style={{
        ['--sky-top' as any]: '#a95e32',
        ['--sky-bottom' as any]: '#331c11',
      }}
      aria-labelledby="faq-title"
    >
      <div className="gutter relative mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
        <header className="max-w-4xl text-white">
          <h1 id="faq-title" className="font-plush text-giant">
            Questions &amp; answers
          </h1>
          <p className="text-lede mt-6 max-w-[52ch] text-[var(--ink-soft)] opacity-90">
            Can&apos;t find what you&apos;re looking for? Message us on WhatsApp — our team is available 24/7.
          </p>
        </header>

        <div className="mt-12 md:mt-16">
          <div className="tp-notes">
            {/* Aside Search & Mascot */}
            <aside className="tp-notes__side" aria-label="Find a question">
              <label htmlFor="faq-search" className="font-scrawl tp-notes__label">
                sniff out a question
              </label>
              <div className="tp-notes__search">
                <Search className="tp-notes__lens" size={20} aria-hidden="true" />
                <input
                  id="faq-search"
                  type="search"
                  placeholder="delivery, Korea, vaccinated…"
                  autoComplete="off"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <p className="tp-notes__count" aria-live="polite">
                {filteredFaqs.length} {filteredFaqs.length === 1 ? 'note' : 'notes'} on the board
              </p>

              <div className="tp-notes__teddy">
                <span aria-hidden="true" className="tp-notes__bubble font-plush">
                  <span className="tp-notes__q">?</span>
                  <span className="tp-notes__a">!</span>
                </span>
                <PuppyMascot facing="right" className="w-40" />
              </div>

              <a
                href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I%20have%20a%20question%3A"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp tp-notes__ask mt-6"
              >
                Ask your own question
              </a>
            </aside>

            {/* Notes Corkboard */}
            <div className="tp-notes__board">
              <ul className="tp-notes__list">
                {filteredFaqs.map((faq, idx) => {
                  const isOpen = !!openIds[faq.id];
                  return (
                    <li
                      key={faq.id}
                      className={`tp-note ${isOpen ? 'tp-note--open' : ''}`}
                      data-reveal="true"
                      style={{
                        ['--tilt' as any]: faq.tilt,
                        ['--pin' as any]: faq.pin,
                        ['--i' as any]: idx,
                      }}
                    >
                      <span aria-hidden="true" className="tp-note__pin" />
                      <h2 className="tp-note__q">
                        <button
                          type="button"
                          id={`q-${faq.id}`}
                          aria-expanded={isOpen}
                          aria-controls={`a-${faq.id}`}
                          onClick={() => toggleOpen(faq.id)}
                        >
                          <span className="font-plush-text">{faq.question}</span>
                          <span
                            aria-hidden="true"
                            className={`tp-note__chevron ${isOpen ? 'rotate-180' : ''}`}
                          />
                        </button>
                      </h2>
                      <div
                        id={`a-${faq.id}`}
                        role="region"
                        aria-labelledby={`q-${faq.id}`}
                        className="tp-note__answer"
                        style={{
                          display: isOpen ? 'block' : 'none',
                        }}
                      >
                        <div className="tp-note__flap">
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {filteredFaqs.length === 0 && (
                <div className="p-8 text-center bg-white/10 rounded-2xl border border-white/20 text-white">
                  <p className="font-plush text-xl">No notes found matching your search</p>
                  <p className="text-sm mt-2 opacity-80">
                    Try searching for something else or message us directly on WhatsApp!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
