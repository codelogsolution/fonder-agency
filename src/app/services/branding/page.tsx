import type { Metadata } from "next";
import ServiceDetail from "@/components/sections/ServiceDetail";
import ServicePreview from "@/components/sections/ServicePreview";

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
