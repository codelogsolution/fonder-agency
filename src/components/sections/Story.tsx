import { Check } from "lucide-react";
import Reveal from "@/components/motion/Reveal";

const timeline = [
  {
    year: "2022",
    title: "Fonder is founded",
    description:
      "Three specialists, one conviction: agencies fragment strategy, design, and engineering. We refused to.",
  },
  {
    year: "2023",
    title: "First 20 clients",
    description:
      "Word of mouth in the SaaS and e-commerce scene filled our roster — without spending a rupee on ads.",
  },
  {
    year: "2024",
    title: "The growth engine",
    description:
      "We formalized the three-pillar operating system: architecture, motion, and growth under one accountable roof.",
  },
  {
    year: "Today",
    title: "120+ campaigns optimized",
    description:
      "A senior-only collective shipping premium builds and compounding results across three continents.",
  },
];

const principles = [
  "Senior-only teams — no handoffs to juniors",
  "Every build passes a performance budget",
  "Accessibility audit on every release",
  "Post-launch analytics on every engagement",
  "Weekly demos — you always see progress",
  "Fixed-scope proposals with no surprises",
];

/**
 * The agency story as a vertical timeline plus the standard operating
 * principles / quality-assurance commitments grid.
 */
export default function Story() {
  return (
    <section className="relative border-t border-border-subtle bg-surface/40 py-8 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Our story
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Est. 2022 — built to stay elite
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-16 lg:grid-cols-2">
          {/* Timeline */}
          <ol className="relative space-y-10 border-l border-border-subtle pl-8">
            {timeline.map((entry, index) => (
              <Reveal key={entry.year} delay={index * 0.1}>
                <li className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-[2.45rem] top-1.5 h-3 w-3 rounded-full border-2 border-primary bg-background shadow-[0_0_12px_rgba(2,132,199,0.55)]"
                  />
                  <p className="text-sm font-bold uppercase tracking-widest text-primary">
                    {entry.year}
                  </p>
                  <h3 className="mt-2 text-lg font-bold tracking-tight">
                    {entry.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {entry.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>

          {/* Operating principles / QA */}
          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl border border-border-subtle bg-surface p-8">
              <h3 className="text-xl font-extrabold tracking-tight">
                Standard operating principles
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Quality assurance isn&apos;t a phase — it&apos;s the operating
                system. Every Fonder engagement runs on these commitments:
              </p>
              <ul className="mt-8 space-y-4">
                {principles.map((principle) => (
                  <li key={principle} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm text-foreground/90">
                      {principle}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
