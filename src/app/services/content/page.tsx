import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ServiceDetail from "@/components/sections/ServiceDetail";
import { ShowcaseFallback } from "@/components/sections/ShowcaseCard";

const ServicePreview = dynamic(() => import("@/components/sections/ServicePreview"), {
  loading: () => <ShowcaseFallback cards={3} height={510} />,
});

export const metadata: Metadata = {
  title: "Content & Copywriting",
  description:
    "Direct-response copy and editorial engines that move metrics — from landing pages to full content calendars.",
};

export default function ContentPage() {
  return (
    <ServiceDetail slug="content">
      <ServicePreview slug="content" />
    </ServiceDetail>
  );
}
