import { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GoneHomePageContent } from '@/components/GoneHomePageContent';
import { getPuppies } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Gone home | TeddyPups U.A.E.',
  description:
    'Every puppy here has already joined a loving family. Looking for one just like them? Tell us — we’ll help you find your match.',
  openGraph: {
    title: 'Gone home | TeddyPups U.A.E.',
    description:
      'Every puppy here has already joined a loving family. Looking for one just like them? Tell us — we’ll help you find your match.',
  },
};

export default async function GoneHomePage() {
  const puppies = await getPuppies('gone_home');
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="relative pt-[var(--header-h)] outline-none">
        <GoneHomePageContent puppies={puppies} />
      </main>
      <Footer />
    </>
  );
}
