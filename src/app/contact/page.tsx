import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import PageHeader from "@/components/sections/PageHeader";
import ContactForm from "@/components/forms/ContactForm";
import Reveal from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Tell us where you want to go — we'll engineer the fastest route and build the vehicle to get you there.",
};

const contactCards = [
  { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: Phone, label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/[^+\d]/g, "")}` },
    { icon: MapPin, label: "Office", value: siteConfig.location },
  { icon: Clock, label: "Response time", value: "Within one business day" },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's build together"
        description="Tell us where you want to go. We'll engineer the fastest route — and build the vehicle to get you there."
      />

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <ContactForm />
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-5">
              <div className="flex flex-col gap-5">
                {contactCards.map(({ icon: Icon, label, value, href }) => (
                  <div
                    key={label}
                    className="flex items-center gap-4 rounded-2xl border border-border-subtle bg-surface p-5"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-widest text-muted">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="mt-1 block truncate text-sm font-semibold text-foreground transition-colors hover:text-primary"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="mt-1 truncate text-sm font-semibold text-foreground">
                          {value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
