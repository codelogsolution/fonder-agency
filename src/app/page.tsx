import Hero from "@/components/sections/Hero";
import TrustMetrics from "@/components/sections/TrustMetrics";
import Pillars from "@/components/sections/Pillars";
import StickyProcess from "@/components/sections/StickyProcess";
import RecentWins from "@/components/sections/RecentWins";
import Testimonials from "@/components/sections/Testimonials";
import CallToAction from "@/components/sections/CallToAction";

/**
 * Master home page — a premium teaser hub. Detailed content lives on the
  * /services, /work, /about, and /contact routes.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <TrustMetrics />
      <Pillars />
      <StickyProcess />
      <RecentWins />
      <Testimonials />
      <CallToAction />
    </>
  );
}



