"use client";

import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowDown, Pause, Play } from "lucide-react";
import { useServicePreviewItems, type ServicePreviewItem } from "@/config/site";
import Reveal from "@/components/motion/Reveal";
import styles from "./ServicePreview.module.css";
import DemoScreen from "./ServiceDemoScreen";

export default function ServicePreview({ slug }: { slug: string }) {
  const items = useServicePreviewItems(slug);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef);
  if (!items.length) return null;

  return (
    <section ref={sectionRef} aria-labelledby={`${slug}-previews`} className="relative overflow-hidden py-8 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-14 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Inside the work</span>
            <h2 id={`${slug}-previews`} className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              What we build, <span className="text-primary">in action</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">
              Illustrative demo concepts, not live products or client results.
              Hover or focus a card to pause and take a closer look.
            </p>
            <button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)} className="mt-5 inline-flex items-center gap-2 rounded-full border border-border-subtle px-4 py-2 text-sm focus-visible:outline-2 focus-visible:outline-primary">
              {paused ? <Play aria-hidden="true" className="h-4 w-4" /> : <Pause aria-hidden="true" className="h-4 w-4" />}
              {paused ? "Resume previews" : "Pause previews"}
            </button>
          </div>
        </Reveal>
        <div className="grid auto-rows-fr items-stretch gap-8 px-2 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <div key={item.id} className={styles.card}>
              <Reveal delay={index * 0.1} className="h-full">
                <PeekFrame item={item} paused={paused || !inView} />
              </Reveal>
            </div>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            Start your project <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function PeekFrame({ item, paused }: { item: ServicePreviewItem; paused: boolean }) {
  return (
    <article tabIndex={0} aria-labelledby={`${item.id}-title`} className={`${styles.frame} overflow-hidden rounded-2xl border border-white/10 bg-[#0b0d14] text-white shadow-2xl focus-visible:outline-2 focus-visible:outline-primary`}>
      <header className={`${styles.header} p-5`}>
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/60">{item.subtitle}</p>
        <h3 id={`${item.id}-title`} className="mt-2 text-lg font-bold">{item.title}</h3>
      </header>
      <div className="flex items-center gap-1.5 border-y border-white/10 bg-white/5 px-4 py-3">
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-red-400/70" />
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-amber-300/70" />
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-300/70" />
        <span className="ml-2 min-w-0 truncate font-mono text-[10px] text-white/60">{item.kind === "app" ? "9:41 · " : ""}{item.domain}</span>
      </div>
      <div className={styles.viewport}>
        <div className={`${styles.track} ${paused ? styles.paused : ""}`}>
          <DemoScreen item={item} />
          <div aria-hidden="true" className={styles.duplicate}><DemoScreen item={item} /></div>
        </div>
      </div>
      <footer className="flex items-center justify-between border-t border-white/10 px-4 py-3 text-[10px] text-white/60">
        <span>Concept preview</span>
        <span className="inline-flex items-center gap-1"><ArrowDown aria-hidden="true" className="h-3 w-3" /> Hover or focus to explore</span>
      </footer>
    </article>
  );
}

