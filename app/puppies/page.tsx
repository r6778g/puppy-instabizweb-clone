import { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PuppiesPageContent } from '@/components/PuppiesPageContent';
import { getPuppies } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Available puppies | TeddyPups U.A.E.',
  description:
    'Every listing shows real photos of the actual puppy. Explore available teacup and teddy bear puppies in Dubai or order upon request from top breeders.',
  openGraph: {
    title: 'Available puppies | TeddyPups U.A.E.',
    description:
      'Every listing shows real photos of the actual puppy. Explore available teacup and teddy bear puppies in Dubai or order upon request from top breeders.',
  },
};

export default async function PuppiesPage() {
  const puppies = await getPuppies();
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="relative pt-[var(--header-h)] outline-none">
        <PuppiesPageContent puppies={puppies} />
      </main>
      <Footer />
    </>
  );
}
