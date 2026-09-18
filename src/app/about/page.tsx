import PageHeader from "@/components/sections/PageHeader";
import AboutPillars from "@/components/sections/AboutPillars";
import Story from "@/components/sections/Story";
import CallToAction from "@/components/sections/CallToAction";

export const metadata = {
  title: "About Us",
  description:
    "Fonder is an elite collective of three core specialists — backend architecture, frontend & motion engineering, and growth marketing. Est. 2022.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="An elite collective, not a freelancer marketplace"
        description="Fonder is three core specialists operating as one accountable unit — technical architecture, motion engineering, and growth marketing. Established 2022."
      />
      <AboutPillars />
      <Story />
      <CallToAction />
    </>
  );
}

