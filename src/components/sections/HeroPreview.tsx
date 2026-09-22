"use client";

import dynamic from "next/dynamic";
import { heroSlides } from "@/config/site";
import { ShowcaseFallback } from "@/components/sections/ShowcaseCard";

const AppPhone = dynamic(() => import("@/components/sections/showcase/AppPhone"), {
  loading: () => <HeroPreviewLoading />,
});
const WebPage = dynamic(() => import("@/components/sections/showcase/WebPage"), {
  loading: () => <HeroPreviewLoading />,
});
const ServiceCard = dynamic(() => import("@/components/sections/showcase/ServiceCard"), {
  loading: () => <HeroPreviewLoading />,
});

type PreviewSlot =
  | { kind: "app"; screen: number }
  | { kind: "web"; screen: number }
  | { kind: "service"; slug: string };

const FALLBACK_SLOT: PreviewSlot = { kind: "web", screen: 0 };

const SLOT_BY_SLIDE: PreviewSlot[] = [
  { kind: "web", screen: 0 },
  { kind: "app", screen: 0 },
  { kind: "service", slug: "seo" },
  { kind: "service", slug: "marketing" },
  { kind: "service", slug: "branding" },
  { kind: "web", screen: 1 },
  { kind: "service", slug: "content" },
];

if (process.env.NODE_ENV !== "production" && SLOT_BY_SLIDE.length !== heroSlides.length) {
  console.warn(
    `[HeroPreview] SLOT_BY_SLIDE length (${SLOT_BY_SLIDE.length}) does not match heroSlides length (${heroSlides.length}). Falling back per-slide.`,
  );
}

function normalizeSlide(slide: number, length: number): number {
  if (!Number.isFinite(slide) || length <= 0) return 0;
  const index = Math.trunc(slide) % length;
  return (index + length) % length;
}

function HeroPreviewLoading() {
  return (
    <div aria-hidden="true" className="flex flex-col motion-safe:animate-pulse">
      <div className="mx-auto h-[66px] w-44 rounded-xl bg-surface" />
      <div className="mt-3 h-[300px] rounded-[2rem] bg-surface" />
    </div>
  );
}

export default function HeroPreview({ slide }: { slide: number }) {
  const index = normalizeSlide(slide, heroSlides.length);
  const slot: PreviewSlot = SLOT_BY_SLIDE[index] ?? FALLBACK_SLOT;

  if (slot.kind === "app") return <AppPhone index={slot.screen} height={300} />;
  if (slot.kind === "web") return <WebPage index={slot.screen} height={300} />;
  return <ServiceCard slug={slot.slug} height={300} />;
}

export function HeroPreviewFallback() {
  return <ShowcaseFallback cards={1} height={300} />;
}

