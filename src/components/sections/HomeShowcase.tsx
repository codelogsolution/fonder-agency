"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Reveal from "@/components/motion/Reveal";
import HeroPreview from "@/components/sections/HeroPreview";
import styles from "@/components/sections/Showcase.module.css";
import { heroSlides } from "@/config/site";
import { cn } from "@/lib/utils";

const ROTATE_MS = 5500;

export default function HomeShowcase() {
  const [active, setActive] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const slide = heroSlides[active % heroSlides.length];

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % heroSlides.length);
    }, ROTATE_MS);
    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  const go = (direction: 1 | -1) => {
    setActive(
      (current) => (current + direction + heroSlides.length) % heroSlides.length,
    );
  };

  return (
    <section
      aria-labelledby="home-showcase"
      className="relative overflow-hidden py-12 sm:py-16"
    >
      <div
        aria-hidden
        className="absolute -top-24 left-1/2 h-72 w-[720px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Fresh from the studio
          </span>
          <h2
            id="home-showcase"
            className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Websites, apps &amp; growth — watch it all in one slider
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            A live taste of every discipline. It auto-plays slowly — tap a
            heading to open that service page.
          </p>
        </Reveal>
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="min-h-[340px] sm:min-h-[320px]">
            <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/[0.08] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
              {slide.service}
            </span>
            <div className="mt-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`copy-${active}`}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -14 }}
                  transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
                >

                  <Link href={slide.href} className="group mt-4 block">
                    <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
                      {slide.long}{" "}
                      <span className="text-muted transition-colors duration-300 group-hover:text-primary">
                        {slide.tagline}
                      </span>
                    </h3>
                  </Link>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                    {slide.blurb}
                  </p>
                  <p className="mt-4 text-sm font-semibold">
                    <span className="text-primary">{slide.stat}</span>{" "}
                    <span className="font-normal text-muted">{slide.caption}</span>
                  </p>
                  <div aria-hidden className="mt-6 flex gap-1.5">
                    {heroSlides.map((item, index) => (
                      <span
                        key={`${item.href}-${index}`}
                        className="h-1 flex-1 overflow-hidden rounded-full bg-border-subtle"
                      >
                        {index === active && (
                          <span
                            className={cn("block h-full rounded-full bg-primary", styles.homeProgress)}
                            style={{ animationDuration: `${ROTATE_MS}ms` }}
                          />
                        )}
                        {index < active && <span className="block h-full w-full bg-primary/40" />}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                href={slide.href}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-[0_12px_32px_-12px_rgba(2,132,199,0.6)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Explore {slide.service}
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous showcase"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle text-muted transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  <ChevronLeft aria-hidden className="h-4 w-4" />
                </button>
                <span className="min-w-14 text-center font-mono text-xs text-muted">
                  {String(active + 1).padStart(2, "0")} /{" "}
                  {String(heroSlides.length).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next showcase"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle text-muted transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  <ChevronRight aria-hidden className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          <Reveal delay={0.1} className="mx-auto w-full max-w-[400px] min-h-[310px] sm:min-h-[290px] lg:max-w-[450px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`preview-${active}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                <HeroPreview slide={active % heroSlides.length} />
              </motion.div>
            </AnimatePresence>
            <p className="mt-3 text-center text-[11px] text-muted">
              Live concept preview · heading opens {slide.service}
            </p>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
