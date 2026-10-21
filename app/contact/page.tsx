import { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ContactPageContent } from '@/components/ContactPageContent';
import { getPuppies } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Visit & contact | TeddyPups U.A.E.',
  description:
    'Visit our Downtown Dubai showroom or get in touch about adoption. We are here to answer your questions and help you meet your future furry family member.',
  openGraph: {
    title: 'Visit & contact | TeddyPups U.A.E.',
    description:
      'Visit our Downtown Dubai showroom or get in touch about adoption. We are here to answer your questions and help you meet your future furry family member.',
  },
};

export default async function ContactPage() {
  const puppies = await getPuppies();
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="relative pt-[var(--header-h)] outline-none">
        <div data-page="contact" className="tp-page">
          <ContactPageContent puppies={puppies} />
        </div>
      </main>
      <Footer />
    </>
  );
}
