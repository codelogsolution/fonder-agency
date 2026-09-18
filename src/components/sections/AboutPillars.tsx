import Image from "next/image";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import Reveal from "@/components/motion/Reveal";

type Pillar = {
  index: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  points: string[];
};

const pillars: Pillar[] = [
  {
    index: "01",
    title: "Technical Backend Architecture",
    subtitle: "Robust & Scalable Infrastructure",
    description:
      "The invisible half of premium: type-safe APIs, resilient data layers, and cloud-native pipelines that stay fast under real production load.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Server racks in a modern data center",
    points: [
      "Type-safe APIs & resilient data layers",
      "Cloud-native CI/CD pipelines",
      "Uptime and performance budgets enforced",
    ],
  },
  {
    index: "02",
    title: "Frontend & Motion Engineering",
    subtitle: "Premium User Experiences",
    description:
      "Interfaces people can feel — 60fps interactions, design systems in Figma and code, and accessibility built in from the first commit.",
    image:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Frontend code on a laptop screen",
    points: [
      "Butter-smooth 60fps interactions",
      "Design systems in Figma + code",
      "Accessibility (WCAG 2.2) baked in",
    ],
  },
  {
    index: "03",
    title: "Growth Marketing & Copywriting",
    subtitle: "High-Converting Copy & Strategy",
    description:
      "Strategy that survives contact with a market: direct-response copy, full-funnel campaigns, and reporting tied to revenue — not vanity metrics.",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Growth team reviewing campaign performance together",
    points: [
      "Direct-response copywriting",
      "Full-funnel campaign architecture",
      "Weekly reporting tied to revenue",
    ],
  },
];

/**
 * The three execution pillars of the agency, presented as an alternating,
 * image-led layout with oversized index numerals.
 */
export default function AboutPillars() {
  return (
    <section className="relative py-8 sm:py-14">
      <div className="mx-auto max-w-7xl space-y-24 px-4 sm:px-6 lg:space-y-32 lg:px-8">
        {pillars.map((pillar, index) => {
          const reversed = index % 2 === 1;
          return (
            <div
              key={pillar.index}
              className="grid items-center gap-12 lg:grid-cols-2"
            >
              {/* Visual */}
              <Reveal className={cn("group", reversed && "lg:order-2")}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border-subtle shadow-[0_24px_64px_rgba(2,132,199,0.08)]">
                  <Image
                    src={pillar.image}
                    alt={pillar.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 42rem, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent"
                  />
                  <span className="text-gradient absolute bottom-6 left-6 text-6xl font-extrabold tracking-tight sm:text-7xl">
                    {pillar.index}
                  </span>
                </div>
              </Reveal>

              {/* Copy */}
              <Reveal delay={0.1} className={cn(reversed && "lg:order-1")}>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  {pillar.subtitle}
                </p>
                <h2 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
                  {pillar.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                  {pillar.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {pillar.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-sm text-foreground/90">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          );
        })}
      </div>
    </section>
  );
}
