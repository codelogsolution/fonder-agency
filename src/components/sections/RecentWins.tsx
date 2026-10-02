"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { recentWins } from "@/config/site";
import Reveal from "@/components/motion/Reveal";

export default function RecentWins() {
  const reduced = useReducedMotion();
  const total = recentWins.length;
  const [active, setActive] = useState(0);

  const shift = (direction: number) =>
    setActive((current) => (current + direction + total) % total);

  return (
    <section className="relative pb-24 sm:pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Recent wins
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                Numbers from the front lines
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => shift(-1)}
                aria-label="Previous result"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle bg-surface text-muted transition-colors hover:border-primary/40 hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => shift(1)}
                aria-label="Next result"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle bg-surface text-muted transition-colors hover:border-primary/40 hover:text-primary"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Reveal>

        {reduced ? (
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {recentWins.map((win) => (
              <Link
                key={win.title}
                href="/work"
                className="group flex flex-col rounded-2xl border border-border-subtle bg-surface p-8"
              >
                <p className="text-gradient text-5xl font-extrabold tracking-tight">
                  {win.metric}
                </p>
                <h3 className="mt-6 text-base font-bold tracking-tight">{win.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{win.detail}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div
            className="relative mt-12 h-[420px] sm:h-[440px]"
            style={{ perspective: 1600 }}
            role="group"
            aria-roledescription="carousel"
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") shift(1);
              if (event.key === "ArrowLeft") shift(-1);
            }}
          >
            {recentWins.map((win, index) => {
              const offset = index - active;
              const depth = Math.min(Math.abs(offset), 2);

              return (
                <motion.article
                  key={win.title}
                  onClick={() => setActive(index)}
                  animate={{
                    x: `${offset * 56}%`,
                    rotateY: offset * -26,
                    z: -depth * 150,
                    scale: 1 - depth * 0.12,
                    opacity: depth > 1 ? 0 : 1 - depth * 0.3,
                    filter: `blur(${depth * 2.5}px)`,
                  }}
                  transition={{ type: "spring", stiffness: 160, damping: 24 }}
                  style={{ zIndex: total - depth }}
                  className="absolute inset-0 mx-auto w-[min(86%,26rem)]"
                >
                  <Link
                    href="/work"
                    className="group flex h-full flex-col justify-between rounded-[1.75rem] border border-border-subtle bg-surface p-8 transition-colors duration-300 hover:border-primary/40"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-gradient text-6xl font-extrabold tracking-tight">
                        {win.metric}
                      </p>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
                        0{index + 1} / 0{total}
                      </span>
                      <h3 className="mt-3 text-lg font-bold tracking-tight">{win.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{win.detail}</p>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </div>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {recentWins.map((win, index) => (
              <button
                key={win.title}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show result ${index + 1}`}
                aria-current={index === active}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === active ? "w-8 bg-primary" : "w-3 bg-border-subtle"
                }`}
              />
            ))}
          </div>
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            Explore all work
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}