import { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HowItWorksPageContent } from '@/components/HowItWorksPageContent';

export const metadata: Metadata = {
  title: 'How it works | TeddyPups U.A.E.',
  description:
    'Bringing home a puppy should feel joyful and effortless. Learn how to adopt local puppies in Dubai or order a rare breed from our certified breeders abroad.',
  openGraph: {
    title: 'How it works | TeddyPups U.A.E.',
    description:
      'Bringing home a puppy should feel joyful and effortless. Learn how to adopt local puppies in Dubai or order a rare breed from our certified breeders abroad.',
  },
};

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="relative pt-[var(--header-h)] outline-none">
        <HowItWorksPageContent />
      </main>
      <Footer />
    </>
  );
}
