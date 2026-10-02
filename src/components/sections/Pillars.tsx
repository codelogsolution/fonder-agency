"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, Code2, PenTool, Search, type LucideIcon } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Reveal from "@/components/motion/Reveal";

type Pillar = {
  title: string;
  icon: LucideIcon;
  description: string;
  gradient: string;
  cta: string;
  href: string;
};

const pillars: Pillar[] = [
  {
    title: "Development",
    icon: Code2,
    description:
      "Next.js web platforms and cross-platform mobile apps — engineered for speed, scale, and measurable outcomes.",
    gradient: "from-[#0284c7]/25 via-[#38bdf8]/12 to-transparent",
    cta: "See engineering",
    href: "/services/web-dev",
  },
  {
    title: "Content",
    icon: PenTool,
    description:
      "Brand identities, design systems, and editorial engines that keep your audience coming back.",
    gradient: "from-[#ec4899]/30 via-[#7c3aed]/14 to-transparent",
    cta: "See brand & copy",
    href: "/services/branding",
  },
  {
    title: "SEO",
    icon: Search,
    description:
      "Technical foundations and intent-mapped content that compound organic traffic quarter over quarter.",
    gradient: "from-[#38bdf8]/25 via-[#0ea5e9]/12 to-transparent",
    cta: "See organic growth",
    href: "/services/seo",
  },
];

function DeckCard({
  pillar,
  progress,
  index,
}: {
  pillar: Pillar;
  progress: MotionValue<number>;
  index: number;
}) {
  const start = 0.06 + index * 0.3;
  const end = start + 0.3;
  const range = [start - 0.06, start, end - 0.07, end];

  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, range, [120, 0, 0, -120]);
  const rotateX = useTransform(progress, range, [46, 0, 0, -34]);
  const scale = useTransform(progress, range, [0.88, 1, 1, 0.92]);
  const soften = useTransform(progress, range, [8, 0, 0, 6]);

  return (
    <motion.article
      style={{
        opacity,
        y,
        rotateX,
        scale,
        filter: useTransform(soften, (value) => `blur(${value}px)`),
        zIndex: pillars.length - index,
        transformPerspective: 1400,
      }}
      className="group absolute inset-0 mx-auto w-full max-w-4xl overflow-hidden rounded-[2rem] border border-border-subtle bg-surface shadow-[0_40px_120px_-40px_rgba(2,132,199,0.35)]"
    >
      <div className="grid h-full md:grid-cols-[1.05fr_1fr]">
        <div
          className={`relative hidden overflow-hidden bg-gradient-to-br md:block ${pillar.gradient}`}
        >
          <div className="absolute inset-0 bg-grid opacity-70" />
          <div className="absolute -left-16 top-1/3 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <pillar.icon className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 text-white/25" />
          <span className="absolute bottom-6 left-6 font-mono text-[11px] uppercase tracking-[0.35em] text-muted">
            0{index + 1} / 0{pillars.length}
          </span>
        </div>
        <div className="flex flex-col justify-between gap-6 p-7 sm:gap-8 sm:p-12">
          <div>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary sm:h-14 sm:w-14">
              <pillar.icon className="h-6 w-6" />
            </span>
            <h3 className="mt-5 text-2xl font-extrabold tracking-tight sm:mt-6 sm:text-3xl">
              {pillar.title}
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted sm:mt-3 sm:text-base">
              {pillar.description}
            </p>
          </div>
          <Link
            href={pillar.href}
            className="inline-flex items-center gap-2 self-start text-sm font-semibold text-primary"
          >
            {pillar.cta}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function Pillars() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const railScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.72, 1, 0.72]);
  const railOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.88, 1],
    [0.35, 1, 1, 0.35],
  );

  return (
    <section
      ref={sectionRef}
      className={reduced ? "relative py-16 sm:py-20" : "relative h-[320vh]"}
    >
      <div
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${reduced ? "" : "h-full"}`}
      >
        <div
          className={
            reduced
              ? ""
              : "sticky top-0 flex h-screen flex-col justify-center overflow-hidden"
          }
        >
          <Reveal className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Core pillars
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Three disciplines. One growth engine.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              Everything we do ladders up to the same outcome — your growth.
              Keep scrolling to walk the engine.
            </p>
          </Reveal>

          {reduced ? (
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pillars.map((pillar) => (
                <article
                  key={pillar.title}
                  className="group overflow-hidden rounded-2xl border border-border-subtle bg-surface"
                >
                  <div
                    className={`relative aspect-[4/3] bg-gradient-to-br ${pillar.gradient}`}
                  >
                    <div className="absolute inset-0 bg-grid opacity-60" />
                    <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-border-subtle bg-background/70 text-primary">
                      <pillar.icon className="h-7 w-7" />
                    </span>
                  </div>
                  <div className="p-8">
                    <h3 className="text-lg font-bold tracking-tight">{pillar.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {pillar.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <motion.div
              style={{ scale: railScale, opacity: railOpacity }}
              className="relative mt-10 h-[430px] lg:h-[440px]"
            >
              {pillars.map((pillar, index) => (
                <DeckCard
                  key={pillar.title}
                  pillar={pillar}
                  progress={scrollYProgress}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
