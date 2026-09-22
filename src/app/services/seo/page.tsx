import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ServiceDetail from "@/components/sections/ServiceDetail";
import { ShowcaseFallback } from "@/components/sections/ShowcaseCard";

const ServicePreview = dynamic(() => import("@/components/sections/ServicePreview"), {
  loading: () => <ShowcaseFallback cards={3} height={510} />,
});

export const metadata: Metadata = {
  title: "SEO & Growth",
  description:
    "Technical SEO and content systems that compound organic traffic and pipeline.",
};

export default function SeoPage() {
  return (
    <ServiceDetail slug="seo">
      <ServicePreview slug="seo" />
    </ServiceDetail>
  );
}
