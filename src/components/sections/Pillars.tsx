import Link from "next/link";
import { ArrowRight, Code2, PenTool, Search, type LucideIcon } from "lucide-react";
import Reveal from "@/components/motion/Reveal";

type Pillar = {
  title: string;
  icon: LucideIcon;
  description: string;
  gradient: string;
};

const pillars: Pillar[] = [
  {
    title: "Development",
    icon: Code2,
    description:
      "Next.js web platforms and cross-platform mobile apps — engineered for speed, scale, and measurable outcomes.",
    gradient: "from-[#0284c7]/15 via-[#38bdf8]/10 to-transparent",
  },
  {
    title: "Content",
    icon: PenTool,
    description:
      "Brand identities, design systems, and editorial engines that keep your audience coming back.",
    gradient: "from-[#ec4899]/25 via-[#7c3aed]/10 to-transparent",
  },
  {
    title: "SEO",
    icon: Search,
    description:
      "Technical foundations and intent-mapped content that compound organic traffic quarter over quarter.",
    gradient: "from-[#38bdf8]/15 via-[#0ea5e9]/10 to-transparent",
  },
];

export default function Pillars() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Core pillars
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Three disciplines. One growth engine.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Everything we do ladders up to the same outcome — your growth.
            Here&apos;s how the engine is built.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={(index % 3) * 0.1} className="h-full">
              <article className="group h-full overflow-hidden rounded-2xl border border-border-subtle bg-surface transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_16px_48px_rgba(2,132,199,0.08)]">
                {/* Visual */}
                <div
                  className={`relative aspect-[4/3] bg-gradient-to-br ${pillar.gradient}`}
                >
                  <div className="absolute inset-0 bg-grid opacity-60" />
                  <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-border-subtle bg-background/70 text-primary backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <pillar.icon className="h-7 w-7" />
                  </span>
                </div>

                {/* Body */}
                <div className="p-8">
                  <h3 className="text-lg font-bold tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {pillar.description}
                  </p>
                  <Link
                    href="/services"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                  >
                    View All Services
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
