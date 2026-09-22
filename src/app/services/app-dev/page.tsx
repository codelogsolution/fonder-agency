import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ServiceDetail from "@/components/sections/ServiceDetail";
import { ShowcaseFallback } from "@/components/sections/ShowcaseCard";

const AppShowcase = dynamic(() => import("@/components/sections/AppShowcase"), {
  loading: () => <ShowcaseFallback cards={3} height={520} />,
});

export const metadata: Metadata = {
  title: "App Development",
  description:
    "Native-quality mobile apps, cross-platform by default, shipped weekly.",
};

export default function AppDevPage() {
  return (
    <ServiceDetail slug="app-dev">
      <AppShowcase />
    </ServiceDetail>
  );
}
