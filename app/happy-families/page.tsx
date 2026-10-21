import { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HappyFamiliesPageContent } from '@/components/HappyFamiliesPageContent';
import { getFamilyGallery } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Happy families | TeddyPups U.A.E.',
  description:
    'Nothing makes us happier than seeing our puppies in loving homes! Explore our wall of happy endings with photos shared by our amazing clients.',
  openGraph: {
    title: 'Happy families | TeddyPups U.A.E.',
    description:
      'Nothing makes us happier than seeing our puppies in loving homes! Explore our wall of happy endings with photos shared by our amazing clients.',
  },
};

export default async function HappyFamiliesPage() {
  const photos = await getFamilyGallery();
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="relative pt-[var(--header-h)] outline-none">
        <HappyFamiliesPageContent photos={photos} />
      </main>
      <Footer />
    </>
  );
}
