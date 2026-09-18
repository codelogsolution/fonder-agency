import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { recentWins } from "@/config/site";
import Reveal from "@/components/motion/Reveal";

export default function RecentWins() {
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
            <Link
              href="/work"
              className="group hidden items-center gap-2 text-sm font-semibold text-primary sm:inline-flex"
            >
              Explore all work
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {recentWins.map((win, index) => (
            <Reveal
              key={win.title}
              delay={(index % 3) * 0.1}
              className="h-full"
            >
              <Link
                href="/work"
                className="group flex h-full flex-col rounded-2xl border border-border-subtle bg-surface p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_16px_48px_rgba(2,132,199,0.08)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="text-gradient text-5xl font-extrabold tracking-tight">
                    {win.metric}
                  </p>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
                </div>
                <h3 className="mt-6 text-base font-bold tracking-tight">
                  {win.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {win.detail}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 sm:hidden">
            <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            Explore all work <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
