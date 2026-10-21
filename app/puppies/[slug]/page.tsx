import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PuppyStorybookContent } from '@/components/PuppyStorybookContent';
import { getPuppy } from '@/lib/content';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const puppy = await getPuppy(slug);

  if (!puppy) {
    return {
      title: 'Puppy profile | TeddyPups U.A.E.',
    };
  }

  return {
    title: `${puppy.name}, ${puppy.breed} puppy | TeddyPups U.A.E.`,
    description: `Meet ${puppy.name}, an adorable ${puppy.gender} ${puppy.breed} puppy (${puppy.age}) available at TeddyPups U.A.E. in Dubai.`,
    openGraph: {
      title: `${puppy.name}, ${puppy.breed} puppy | TeddyPups U.A.E.`,
      description: `Meet ${puppy.name}, an adorable ${puppy.gender} ${puppy.breed} puppy (${puppy.age}) available at TeddyPups U.A.E. in Dubai.`,
      images: puppy.image ? [puppy.image] : [],
    },
  };
}

async function PuppyDetailContent({ params }: PageProps) {
  const { slug } = await params;
  const puppy = await getPuppy(slug);

  if (!puppy) {
    notFound();
  }

  return <PuppyStorybookContent puppy={puppy} />;
}

export default function PuppyDetailPage({ params }: PageProps) {
  return (
    <>
      <Suspense fallback={<div className="h-20 bg-honey" />}>
        <Navbar />
      </Suspense>
      <main id="main" tabIndex={-1} className="relative pt-[var(--header-h)] outline-none">
        <Suspense fallback={<div className="min-h-[60vh]" />}>
          <PuppyDetailContent params={params} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
