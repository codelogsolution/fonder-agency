import type { Metadata } from "next";
import ServiceDetail from "@/components/sections/ServiceDetail";
import ServicePreview from "@/components/sections/ServicePreview";

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
