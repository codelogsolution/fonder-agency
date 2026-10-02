"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { MotionConfig } from "framer-motion";
import Lenis from "lenis";

// Lenis inertia smooth-scrolling — the weighted, buttery wheel feel used on
// award-winning sites. Desktop (fine pointer) only, and skipped for users who
// prefer reduced motion. Also installs a global MotionConfig so every
// framer-motion animation in the app respects the same preference.
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const lenis = new Lenis({
      lerp: 0.1, // 0.1 = heavy inertia glide; 1 = instant follow
      anchors: true, // smooth-scrolls in-page anchor links (#contact etc.)
    });
    lenisRef.current = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Route change → reset to the top instantly. Without this, Lenis keeps its
  // internal scroll target on the previous page and glides through the old
  // offset on navigation. Skipped on first render (deep links / hashes).
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (window.location.hash) return; // let the browser land on the hash
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}