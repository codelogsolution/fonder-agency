"use client";

import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Pause,
  Play,
  Star,
  ArrowUpRight,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { testimonials } from "@/config/site";
import Reveal from "@/components/motion/Reveal";

const marqueeBrands = [
  "AURELIA",
  "VERTEX",
  "FINFLOW",
  "PULSEFIT",
  "ORBITLY",
  "MAISON",
  "CLOUDCART",
  "NORTHWIND",
];

const INTERVAL = 6000;



// Testimonial slider — one quote at a time with auto-advance.
export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const total = testimonials.length;
  const showControls = total > 1;
  const [playing, setPlaying] = useState(!prefersReducedMotion);

  // Auto-advance
  useEffect(() => {
    if (!playing || !showControls || prefersReducedMotion) return;
    const handle = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, INTERVAL);
    return () => clearTimeout(handle);
  }, [playing, current, showControls, prefersReducedMotion, total]);

  const goTo = useCallback(
    (index: number) => {
      const nextIndex = ((index % total) + total) % total;
      setCurrent(nextIndex);
      setPlaying(false);
    },
    [total],
  );
  const togglePlay = () => setPlaying((p) => !p);

  // Keyboard shortcuts when the slider is focused
  useEffect(() => {
    if (!showControls) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (!sliderRef.current?.contains(e.target as Node)) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(current - 1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(current + 1);
      }
      if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        togglePlay();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    }, [current, showControls, goTo]);

  const t = testimonials[current];
  
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden border-y border-border-subtle bg-surface/30 py-20 sm:py-28"
    >
      {/* Soft depth orb */}
      <div
        aria-hidden
        className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-primary/4 to-transparent blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Testimonials
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Words that moved the needle
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              Hear what clients say and see the number each one actually moved.
              One story at a time, on rotation.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-16">
          <div
            ref={sliderRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Client testimonials"
            tabIndex={-1}
          >
            <div className="relative mx-auto max-w-3xl rounded-3xl border border-border-subtle bg-white p-8 shadow-[0_40px_80px_-60px_rgba(11,18,32,0.06)] sm:p-10">
              <span
                aria-hidden
                className="bg-spotlight pointer-events-none absolute -top-14 -right-14 h-52 w-52"
              />

              <AnimatePresence mode="wait">
                <motion.figure
                  key={current}
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -16 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }
                  }
                  className="flex h-full flex-col"
                >
                  <div className="mb-6 text-center">
                    <span className="text-gradient text-4xl font-extrabold tracking-tight sm:text-5xl">
                      {t.metric}
                    </span>
                    <p className="mt-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-muted">
                      {t.metricLabel}
                    </p>
                  </div>

                  <div
                    className="mb-5 flex justify-center gap-0.5"
                    aria-label="5 out of 5 stars"
                    role="img"
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-primary text-primary"
                      />
                    ))}
                  </div>

                  <blockquote className="flex-1 text-center">
                    <p
                      className="text-[1.35rem] leading-snug font-medium text-foreground sm:text-[1.5rem]"
                      aria-live="polite"
                      aria-atomic
                    >
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </blockquote>

                  <figcaption className="mt-7 flex flex-col items-center gap-4 border-t border-border-subtle pt-5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[#0ea5e9] text-sm font-bold text-white">
                        {t.initials}
                      </span>
                      <div className="min-w-0 text-center">
                        <p className="text-sm font-bold leading-tight">
                          {t.name}
                        </p>
                        <p className="mt-0.5 text-xs text-muted">{t.role}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-extrabold tracking-[0.25em] text-foreground/75">
                        {t.company}
                      </span>
                      <span className="rounded-full border border-border-subtle px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-muted">
                        {t.sector}
                      </span>
                    </div>

                    <Link
                      href="/work"
                      className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.14em] text-primary hover:underline"
                    >
                      See the case study
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>

        {/* Controls: play/pause · dots · arrows */}
        {showControls && (
          <div className="mt-8 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? "Pause testimonials" : "Play testimonials"}
              className="rounded-full border border-border-subtle bg-white px-3.5 py-2 text-foreground/60 transition-colors hover:bg-primary/5 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              {playing ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </button>

            <div
              className="flex items-center gap-1.5"
              role="tablist"
              aria-label="Testimonial navigation"
            >
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-selected={i === current}
                  role="tab"
                  className="relative h-2 rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? 24 : 8,
                    backgroundColor:
                      i === current
                        ? "var(--primary)"
                        : "var(--border-subtle)",
                  }}
                />
              ))}
            </div>

            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => goTo(current - 1)}
                aria-label="Previous testimonial"
                className="rounded-full border border-border-subtle bg-white p-2 text-foreground/60 transition-colors hover:bg-primary/5 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => goTo(current + 1)}
                aria-label="Next testimonial"
                className="rounded-full border border-border-subtle bg-white p-2 text-foreground/60 transition-colors hover:bg-primary/5 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Progress bar — visible only while auto-playing */}
        {showControls && playing && !prefersReducedMotion && (
          <div className="mt-4 h-1 w-80 max-w-3xl overflow-hidden rounded-full bg-border-subtle">
            <motion.div
              key={current}
              className="h-full w-full bg-primary"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: INTERVAL / 1000,
                ease: "linear",
              }}
              style={{ transformOrigin: "left" }}
            />
          </div>
        )}
      </div>

      {/* Client marquee — pauses on hover */}
      <div className="group relative mt-16 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-12 group-hover:[animation-play-state:paused]">
          {[...marqueeBrands, ...marqueeBrands].map((brand, index) => (
            <span
              key={`${brand}-${index}`}
              className="flex items-center gap-12 text-lg font-extrabold tracking-[0.25em] text-foreground/20"
            >
              {brand}
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-primary/40"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
