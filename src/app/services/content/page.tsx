import type { Metadata } from "next";
import ServiceDetail from "@/components/sections/ServiceDetail";
import ServicePreview from "@/components/sections/ServicePreview";

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
