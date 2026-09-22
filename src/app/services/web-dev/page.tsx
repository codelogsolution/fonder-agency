import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ServiceDetail from "@/components/sections/ServiceDetail";
import { ShowcaseFallback } from "@/components/sections/ShowcaseCard";

const WebShowcase = dynamic(() => import("@/components/sections/WebShowcase"), {
  loading: () => <ShowcaseFallback cards={2} height={520} />,
});

export const metadata: Metadata = {
  title: "Web Development",
  description:
    "Blazing-fast, scalable web applications built with Next.js and modern tooling.",
};

export default function WebDevPage() {
  return (
    <ServiceDetail slug="web-dev">
      <WebShowcase />
    </ServiceDetail>
  );
}
