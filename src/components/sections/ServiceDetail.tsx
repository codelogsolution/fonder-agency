import Image from "next/image";
import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { getServicePage } from "@/config/site";
import Reveal from "@/components/motion/Reveal";
import CallToAction from "@/components/sections/CallToAction";

// Shared layout for /services/[slug]; content comes from site.ts.
export default function ServiceDetail({ slug, children }: { slug: string; children?: ReactNode }) {
  const service = getServicePage(slug);
  if (!service) return null;

  return (
    <>
      {/* Page hero */}
      <section className="relative isolate mt-16 overflow-hidden pb-12 pt-16 md:mt-20 sm:pb-16 sm:pt-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src={service.image}
            alt=""
            fill
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-white/85" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-background" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div>
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <service.icon className="h-7 w-7" />
              </span>
              <span className="mt-6 block text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Our services
              </span>
              <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
                {service.title}
              </h1>
              <p className="mt-3 text-lg font-semibold text-foreground/80">
                {service.tagline}
              </p>
              <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
                {service.description}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Features + proof */}
      <section className="py-8 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                What&apos;s included
              </h2>
              <ul className="mt-8 grid auto-rows-fr gap-4">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 rounded-xl border border-border-subtle bg-surface p-4"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm text-foreground/90">{feature}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                Proof it works
              </h2>
              <div className="mt-8 grid auto-rows-fr gap-4 min-[400px]:grid-cols-3">
                {service.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-border-subtle flex h-full min-w-0 flex-col items-center justify-center bg-surface px-3 py-6 text-center sm:px-4"
                  >
                    <p className="text-2xl font-extrabold text-primary sm:text-3xl">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-xs text-muted sm:text-sm">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Structured process */}
      <section className="relative pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              How we work
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              A structured, four-phase process
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              Every engagement runs the same disciplined operating system —
              so you always know what happens next.
            </p>
          </Reveal>

          <ol className="mt-14 grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((phase, index) => (
              <li key={phase.step} className="h-full">
              <Reveal delay={index * 0.1} className="h-full">
                <div className="relative h-full rounded-2xl border border-border-subtle bg-surface p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40">
                  <span className="text-gradient text-4xl font-extrabold tracking-tight">
                    0{index + 1}
                  </span>
                  <p className="mt-4 text-xs font-bold uppercase tracking-widest text-primary">
                    {phase.step}
                  </p>
                  <h3 className="mt-1.5 font-bold tracking-tight">
                    {phase.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {phase.description}
                  </p>
                </div>
              </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {children}
      <CallToAction />
    </>
  );
}
