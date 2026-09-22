import type { ComponentType, CSSProperties } from "react";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig, type SocialLink } from "@/config/site";
import { InstagramIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import NewsletterForm from "@/components/layout/NewsletterForm";
import BrandMark from "@/components/ui/BrandMark";

// Re-scopes design tokens for the dark footer surface.
const footerTokens = {
  "--foreground": "#f1f5f9",
  "--muted": "#94a3b8",
  "--border-subtle": "rgba(255, 255, 255, 0.1)",
  "--surface": "rgba(255, 255, 255, 0.05)",
  "--surface-2": "rgba(255, 255, 255, 0.08)",
  "--primary": "#38bdf8",
} as CSSProperties;

const socialIcons: Record<
  SocialLink["icon"],
  ComponentType<{ className?: string }>
> = {
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
};

export default function Footer() {
  return (
    <footer
      className="relative bg-[#0b1220] text-slate-300"
      style={footerTokens}
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand + social grid */}
          <div className="lg:col-span-4">
            <BrandMark className="mb-3 h-10 w-10" />
            <p className="text-lg font-extrabold tracking-tight">
              {siteConfig.name}
              <span className="text-primary">.</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {siteConfig.description}
            </p>

            <div className="mt-8 grid max-w-xs grid-cols-2 gap-3">
              {siteConfig.socials.map((social) => {
                const Icon = socialIcons[social.icon];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-xl border border-border-subtle bg-surface-2/60 px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_8px_24px_rgba(2,132,199,0.08)]"
                  >
                    <Icon className="h-5 w-5 shrink-0 text-muted transition-colors duration-300 group-hover:text-primary" />
                    <span className="text-sm font-semibold transition-colors duration-300 group-hover:text-primary">
                      {social.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <p className="text-sm font-bold uppercase tracking-widest text-foreground">
              Services
            </p>
            <ul className="mt-5 space-y-3">
              {siteConfig.footerServices.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary"
                  >
                    <span
                      aria-hidden
                      className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-3"
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <p className="text-sm font-bold uppercase tracking-widest text-foreground">
              Company
            </p>
            <ul className="mt-5 space-y-3">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary"
                  >
                    <span
                      aria-hidden
                      className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-3"
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter + contact */}
          <div className="lg:col-span-4">
            <p className="text-sm font-bold uppercase tracking-widest text-foreground">
              Newsletter
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              Monthly insights on design, engineering, and growth. No spam —
              unsubscribe anytime.
            </p>
            <NewsletterForm className="mt-6 max-w-sm" />

            <ul className="mt-8 space-y-3 text-sm text-muted">
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="transition-colors hover:text-primary"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                {siteConfig.phone}
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                {siteConfig.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border-subtle pt-8 sm:flex-row">
          <p className="text-sm text-muted">
            © {siteConfig.established} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted">
            <Link href="/privacy" className="transition-colors hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

