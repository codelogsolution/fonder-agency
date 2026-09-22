import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import TrustMetrics from "@/components/sections/TrustMetrics";
import Pillars from "@/components/sections/Pillars";
import RecentWins from "@/components/sections/RecentWins";
import CallToAction from "@/components/sections/CallToAction";

// Below-the-fold sections load after first paint.
const HomeShowcase = dynamic(() => import("@/components/sections/HomeShowcase"));
const StickyProcess = dynamic(() => import("@/components/sections/StickyProcess"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));

export default function Home() {
  return (
    <>
      <Hero />
      <TrustMetrics />
      <Pillars />
      <HomeShowcase />
      <StickyProcess />
      <RecentWins />
      <Testimonials />
      <CallToAction />
    </>
  );
}



