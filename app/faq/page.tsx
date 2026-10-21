import { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FaqPageContent } from '@/components/FaqPageContent';
import { getFaqs } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Questions & answers | TeddyPups U.A.E.',
  description:
    'Have questions about getting a teacup puppy in Dubai? Learn about our health checks, travel from abroad, deliveries, showroom visits and more.',
  openGraph: {
    title: 'Questions & answers | TeddyPups U.A.E.',
    description:
      'Have questions about getting a teacup puppy in Dubai? Learn about our health checks, travel from abroad, deliveries, showroom visits and more.',
  },
};

export default async function FaqPage() {
  const faqs = await getFaqs();
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="relative pt-[var(--header-h)] outline-none">
        <div data-page="faq" className="tp-page">
          <FaqPageContent faqs={faqs} />
        </div>
      </main>
      <Footer />
    </>
  );
}
