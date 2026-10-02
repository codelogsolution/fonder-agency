"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { heroSlides } from "@/config/site";
import { ShowcaseFallback } from "@/components/sections/ShowcaseCard";

/**
 * Every demo in the slider renders inside one locked frame height. The three
 * card kinds carry different chrome (browser bar 44px / status bar + tab bar
 * 107px / demo bar 48px), so without this the whole section resized on every
 * slide change. 410px still leaves each demo a 300px+ scroll viewport.
 */
const FRAME_HEIGHT = 410;

const loadAppPhone = () => import("@/components/sections/showcase/AppPhone");
const loadWebPage = () => import("@/components/sections/showcase/WebPage");
const loadServiceCard = () => import("@/components/sections/showcase/ServiceCard");

const AppPhone = dynamic(loadAppPhone, { loading: () => <HeroPreviewLoading /> });
const WebPage = dynamic(loadWebPage, { loading: () => <HeroPreviewLoading /> });
const ServiceCard = dynamic(loadServiceCard, { loading: () => <HeroPreviewLoading /> });

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
  // Mirrors the real card geometry (76px header + 12px gap + frame) so a chunk
  // still loading can never make the slider jump.
  return (
    <div aria-hidden="true" className="flex flex-col motion-safe:animate-pulse">
      <div className="mx-auto h-[76px] w-44 rounded-xl bg-surface" />
      <div className="mt-3 rounded-[2rem] bg-surface" style={{ height: FRAME_HEIGHT }} />
    </div>
  );
}

export default function HeroPreview({ slide }: { slide: number }) {
  const index = normalizeSlide(slide, heroSlides.length);
  const slot: PreviewSlot = SLOT_BY_SLIDE[index] ?? FALLBACK_SLOT;

  // Warm all three demo chunks once so later slides swap instantly.
  useEffect(() => {
    void loadAppPhone();
    void loadWebPage();
    void loadServiceCard();
  }, []);

  if (slot.kind === "app") return <AppPhone index={slot.screen} height={300} frameHeight={FRAME_HEIGHT} />;
  if (slot.kind === "web") return <WebPage index={slot.screen} height={300} frameHeight={FRAME_HEIGHT} />;
  return <ServiceCard slug={slot.slug} height={300} frameHeight={FRAME_HEIGHT} />;
}

export function HeroPreviewFallback() {
  return <ShowcaseFallback cards={1} height={FRAME_HEIGHT} />;
}

