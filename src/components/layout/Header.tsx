"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  type Variants,
} from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import BrandMark from "@/components/ui/BrandMark";
import { servicePages, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Magnetic from "@/components/ui/Magnetic";

const mobileList: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
};

const mobileItem: Variants = {
  hidden: { opacity: 0, x: -18 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] },
  },
  exit: { opacity: 0, x: -12, transition: { duration: 0.18 } },
};

/**
 * Route-aware nav link. The active route lights up in the primary
 * accent (#0284C7) with a persistent underline and glow dot.
 */
function NavLink({
  label,
  href,
  active,
  chevron = false,
  open = false,
}: {
  label: string;
  href: string;
  active: boolean;
  chevron?: boolean;
  open?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative text-sm font-medium transition-colors duration-300",
        active ? "text-primary" : "text-muted hover:text-foreground",
      )}
    >
      <span className="relative inline-flex items-center gap-1.5">
        {label}
        {chevron && (
          <ChevronDown
            aria-hidden
            className={cn(
              "h-3.5 w-3.5 transition-transform duration-300",
              open && "rotate-180",
            )}
          />
        )}
        <span
          aria-hidden
          className={cn(
            "absolute -left-3.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_10px_rgba(2,132,199,0.7)] transition-opacity duration-300",
            active ? "opacity-100" : "opacity-0",
          )}
        />
      </span>
      <span
        aria-hidden
        className={cn(
          "absolute -bottom-1.5 left-0 h-px w-full bg-gradient-to-r from-primary to-transparent transition-transform duration-300 ease-out",
          active
            ? "origin-left scale-x-100"
            : "origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100",
        )}
      />
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { scrollY } = useScroll();

  /** Exact match for home, prefix match for nested routes (/services/*). */
  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 16));

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "glass shadow-[0_8px_32px_rgba(2,6,23,0.08)]"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:h-20 lg:px-8">
        {/* Brand */}
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#0284c7] to-[#0ea5e9] text-white shadow-[0_4px_16px_rgba(2,132,199,0.3)] transition-transform duration-300 group-hover:rotate-6">
            <BrandMark className="h-9 w-9" />
          </span>
          <span className="text-lg font-extrabold tracking-tight">
            {siteConfig.name}
            <span className="text-primary">.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
          {siteConfig.nav.map((item) =>
            item.label === "Services" ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <NavLink
                  label={item.label}
                  href={item.href}
                  active={isActive(item.href)}
                  chevron
                  open={servicesOpen}
                />
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-1/2 top-full z-50 w-[38rem] -translate-x-1/2 pt-3"
                    >
                      <div className="glass rounded-2xl p-3 shadow-[0_24px_64px_rgba(2,6,23,0.14)]">
                        <div className="grid grid-cols-2 gap-1">
                          {servicePages.map((service) => (
                            <Link
                              key={service.slug}
                              href={`/services/${service.slug}`}
                              onClick={() => setServicesOpen(false)}
                              className="group flex items-start gap-3 rounded-xl p-3 transition-colors duration-200 hover:bg-surface-2/70"
                            >
                              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <service.icon className="h-4.5 w-4.5" />
                              </span>
                              <span className="min-w-0">
                                <span className="block text-sm font-semibold text-foreground group-hover:text-primary">
                                  {service.title}
                                </span>
                                <span className="mt-0.5 block truncate text-xs text-muted">
                                  {service.tagline}
                                </span>
                              </span>
                            </Link>
                          ))}
                        </div>
                        <Link
                          href="/services"
                          onClick={() => setServicesOpen(false)}
                          className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-surface-2/70 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-surface-2"
                        >
                          View all services{" "}
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <NavLink
                key={item.href}
                label={item.label}
                href={item.href}
                active={isActive(item.href)}
              />
            ),
          )}
        </nav>

        {/* Magnetic CTA */}
        <div className="hidden lg:block">
          <Magnetic strength={0.4}>
            <Button
              href="/contact"
              size="sm"
              className="shadow-[0_0_24px_rgba(2,132,199,0.3)]"
            >
              Book a Call <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Magnetic>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-subtle text-foreground transition-colors hover:border-primary/50 hover:text-primary lg:hidden"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={menuOpen ? "close" : "open"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex"
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="glass overflow-hidden lg:hidden"
            aria-label="Mobile"
          >
            <motion.div
              variants={mobileList}
              initial="hidden"
              animate="show"
              exit="exit"
              className="flex flex-col gap-1 px-4 py-4"
            >
              {siteConfig.nav.map((item) => {
                const active = isActive(item.href);

                if (item.label === "Services") {
                  return (
                    <motion.div key={item.href} variants={mobileItem}>
                      <button
                        type="button"
                        onClick={() => setServicesOpen((open) => !open)}
                        aria-expanded={servicesOpen}
                        className={cn(
                          "flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors",
                          active
                            ? "border-primary/30 bg-primary/5 text-primary"
                            : "border-transparent text-muted hover:bg-surface-2 hover:text-foreground",
                        )}
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform duration-300",
                            servicesOpen && "rotate-180",
                          )}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {servicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="mt-1 space-y-0.5 pl-3">
                              {servicePages.map((service) => (
                                <Link
                                  key={service.slug}
                                  href={`/services/${service.slug}`}
                                  onClick={() => {
                                    setServicesOpen(false);
                                    setMenuOpen(false);
                                  }}
                                  className="block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-primary"
                                >
                                  {service.title}
                                </Link>
                              ))}
                              <Link
                                href="/services"
                                onClick={() => {
                                  setServicesOpen(false);
                                  setMenuOpen(false);
                                }}
                                className="block rounded-lg px-3 py-2 text-sm font-semibold text-primary"
                              >
                                View all services
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                }

                return (
                  <motion.div key={item.href} variants={mobileItem}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "block rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors",
                        active
                          ? "border-primary/30 bg-primary/5 text-primary"
                          : "border-transparent text-muted hover:bg-surface-2 hover:text-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div variants={mobileItem} className="mt-3">
                <Magnetic className="w-full">
                  <Button
                    href="/contact"
                    className="w-full shadow-[0_0_24px_rgba(2,132,199,0.3)]"
                  >
                    Book a Call <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </Magnetic>
              </motion.div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

