import type { Metadata } from "next";
import ServiceDetail from "@/components/sections/ServiceDetail";
import ServicePreview from "@/components/sections/ServicePreview";

export const metadata: Metadata = {
  title: "Web Development",
  description:
    "Blazing-fast, scalable web applications built with Next.js and modern tooling.",
};

export default function WebDevPage() {
  return (
    <ServiceDetail slug="web-dev">
      <ServicePreview slug="web-dev" />
    </ServiceDetail>
  );
}
