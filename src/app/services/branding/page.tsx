import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ServiceDetail from "@/components/sections/ServiceDetail";
import { ShowcaseFallback } from "@/components/sections/ShowcaseCard";

const ServicePreview = dynamic(() => import("@/components/sections/ServicePreview"), {
  loading: () => <ShowcaseFallback cards={3} height={510} />,
});

export const metadata: Metadata = {
  title: "Branding & Design",
  description:
    "Logo to design system — distinct visual identities engineered to signal premium.",
};

export default function BrandingPage() {
  return (
    <ServiceDetail slug="branding">
      <ServicePreview slug="branding" />
    </ServiceDetail>
  );
}
