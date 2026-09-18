import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { servicePages } from "@/config/site";
import PageHeader from "@/components/sections/PageHeader";
import Reveal from "@/components/motion/Reveal";
import CallToAction from "@/components/sections/CallToAction";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Fonder's services — web development, app development, SEO, paid media, content & copywriting, and branding.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="What we do"
        title="Services engineered for growth"
        description="Six senior-led practices, one accountable team. Pick a single engagement or hand us the full stack."
      />

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {servicePages.map((service, index) => (
              <Reveal
                key={service.slug}
                delay={(index % 3) * 0.1}
                className="h-full"
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-border-subtle bg-surface p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_16px_48px_rgba(2,132,199,0.08)]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <service.icon className="h-6 w-6" />
                  </span>
                  <h2 className="mt-6 text-lg font-bold tracking-tight">
                    {service.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {service.tagline}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Explore service
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
