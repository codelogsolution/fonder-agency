import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ServiceDetail from "@/components/sections/ServiceDetail";
import { ShowcaseFallback } from "@/components/sections/ShowcaseCard";

const ServicePreview = dynamic(() => import("@/components/sections/ServicePreview"), {
  loading: () => <ShowcaseFallback cards={3} height={510} />,
});

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
