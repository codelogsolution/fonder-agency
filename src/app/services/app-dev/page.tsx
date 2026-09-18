import type { Metadata } from "next";
import ServiceDetail from "@/components/sections/ServiceDetail";
import ServicePreview from "@/components/sections/ServicePreview";

export const metadata: Metadata = {
  title: "App Development",
  description:
    "Native-quality mobile apps, cross-platform by default, shipped weekly.",
};

export default function AppDevPage() {
  return (
    <ServiceDetail slug="app-dev">
      <ServicePreview slug="app-dev" />
    </ServiceDetail>
  );
}
