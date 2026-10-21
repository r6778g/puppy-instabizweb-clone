import { CurtainIntro } from "@/components/CurtainIntro";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MeetPups } from "@/components/MeetPups";
import { TwoWays } from "@/components/TwoWays";
import { PuppyJourney } from "@/components/PuppyJourney";
import { TrustPassport } from "@/components/TrustPassport";
import { HappyFamilies } from "@/components/HappyFamilies";
import { FaqSection } from "@/components/FaqSection";
import { ReadyToMeet } from "@/components/ReadyToMeet";
import { Footer } from "@/components/Footer";
import { getFaqs, getJourneySteps, getPolaroids, getPuppies, getTestimonial } from '@/lib/content';

export default async function Home() {
  const [puppies, faqs, journeySteps, polaroids, testimonial] = await Promise.all([getPuppies(), getFaqs(), getJourneySteps(), getPolaroids(), getTestimonial()]);
  return (
    <>
      <CurtainIntro />
      <Navbar />
      <main id="main" className="relative pt-[var(--header-h)] outline-none">
        <div data-page="home" className="tp-page">
          <Hero puppies={puppies.slice(0, 6)} />
          <MeetPups puppies={puppies} />
          <TwoWays />
          <PuppyJourney steps={journeySteps} />
          <TrustPassport />
          <HappyFamilies photos={polaroids} testimonial={testimonial} />
          <FaqSection faqs={faqs} />
          <ReadyToMeet />
        </div>
      </main>
      <Footer />
    </>
  );
}
