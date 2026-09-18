import type { Metadata } from "next";
import ServiceDetail from "@/components/sections/ServiceDetail";
import ServicePreview from "@/components/sections/ServicePreview";

export const metadata: Metadata = {
  title: "Digital Marketing",
  description:
    "Full-funnel paid, social, and email campaigns engineered to convert.",
};

export default function MarketingPage() {
  return (
    <ServiceDetail slug="marketing">
      <ServicePreview slug="marketing" />
    </ServiceDetail>
  );
}
