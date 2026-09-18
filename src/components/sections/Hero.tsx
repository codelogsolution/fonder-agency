"use client";
import {
  AnimatePresence,
  motion, useMotionTemplate, useMotionValue, useSpring, useTransform,
} from "framer-motion";
import { ArrowRight, ChevronDown, Star } from "lucide-react";
import Link from "next/link";
import type { MouseEvent as ReactMouseEvent } from "react";
import { useState } from "react";
import Button from "@/components/ui/Button";
import SplitText from "@/components/motion/SplitText";
import RotatingText from "@/components/motion/RotatingText";
import { heroServices, heroSlides } from "@/config/site";

const ease: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];
const heroWords = heroSlides.map((s) => s.word + ".");
export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const glowX = useSpring(useTransform(mx, [-0.5, 0.5], [-24, 24]), { stiffness: 50, damping: 20 });
  const glowY = useSpring(useTransform(my, [-0.5, 0.5], [-16, 16]), { stiffness: 50, damping: 20 });
  const spotX = useSpring(-600, { stiffness: 80, damping: 25 });
  const spotY = useSpring(-600, { stiffness: 80, damping: 25 });
  const gridMask = useMotionTemplate`radial-gradient(360px circle at ${spotX}px ${spotY}px, black 0%, transparent 72%)`;
  const spotlightBg = useMotionTemplate`radial-gradient(280px circle at ${spotX}px ${spotY}px, rgba(2,132,199,0.14), transparent 70%)`;
  const handleMouseMove = (event: ReactMouseEvent<HTMLElement>) => {
    mx.set(event.clientX / window.innerWidth - 0.5);
    my.set(event.clientY / window.innerHeight - 0.5);
    spotX.set(event.clientX);
    spotY.set(event.clientY);
  };
  const slide = heroSlides[activeSlide];
  return (
    <section id="home" onMouseMove={handleMouseMove} className="relative flex min-h-screen items-center overflow-hidden bg-background">
      <div aria-hidden className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black_40%,transparent_100%)]" />
      <motion.div aria-hidden style={{ maskImage: gridMask, WebkitMaskImage: gridMask }} className="pointer-events-none absolute inset-0 hidden bg-grid-accent lg:block" />
      <motion.div aria-hidden style={{ x: glowX, y: glowY }} className="pointer-events-none absolute inset-0">
        <div className="absolute -top-52 left-1/2 h-[560px] w-[880px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px] animate-pulse-glow" />
        <motion.div
          animate={{ x: [0, 70, -45, 0], y: [0, -35, 28, 0], scale: [1, 1.08, 0.96, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-44 top-1/4 h-[460px] w-[460px] rounded-full bg-primary/[0.09] blur-[130px]"
        />
        <motion.div
          animate={{ x: [0, -60, 50, 0], y: [0, 40, -28, 0], scale: [1, 1.1, 0.94, 1] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-36 top-1/3 hidden h-[420px] w-[420px] rounded-full bg-[#7c3aed]/[0.09] blur-[140px] lg:block"
        />
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.45, 0.85, 0.45] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-[6%] h-60 w-[600px] -translate-x-1/2 rounded-full bg-[#38bdf8]/[0.1] blur-[110px]"
        />
        <motion.div
          animate={{ x: [0, 35, -30, 0], y: [0, 24, -20, 0] }}
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-8%] left-[22%] hidden h-[300px] w-[440px] rounded-full bg-[#0ea5e9]/[0.07] blur-[130px] lg:block"
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="absolute left-1/2 top-[12%] h-40 w-[560px] -translate-x-1/2 rounded-full border border-primary/10 blur-[1px]" />
        <div className="absolute left-1/2 top-[16%] h-28 w-[420px] -translate-x-1/2 rounded-full border border-primary/[0.07]" />
      </motion.div>
      <motion.div aria-hidden style={{ background: spotlightBg }} className="pointer-events-none absolute inset-0 hidden lg:block" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.85fr)] lg:gap-10 lg:px-8 lg:pt-32">
        <div className="max-w-3xl lg:max-w-none">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease }} className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface/60 px-4 py-1.5 text-xs font-semibold text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Fonder • Marketing + Tech Agency
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
              2 project slots open
            </span>
          </motion.div>
          <h1 className="mt-6 font-bold leading-[1.08] tracking-tight text-foreground text-4xl sm:text-5xl lg:text-[3.4rem] xl:text-6xl">
            <SplitText text="Everything you need to" delay={0.25} />
            <br />
            <span>launch, market</span>{" "}
            <span className="text-gradient">{"& grow."}</span>
            <span className="mt-3 block min-h-[2.75em] text-[0.58em] font-bold leading-snug text-muted lg:min-h-0">
              We design, build &amp; market{" "}
              <RotatingText
                words={heroWords}
                className="text-primary lg:whitespace-nowrap lg:[min-width:8ch]"
                delay={1400}
                onWordChange={setActiveSlide}
              />
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05, ease }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
          >
            Fonder helps startups & growing brands with websites, apps, SEO, social media, branding, design & content — one passionate team for all your marketing and tech needs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2, ease }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button href="/contact" size="lg">
              Get Free Growth Plan <ArrowRight className="h-5 w-5" />
            </Button>
            <Button href="/services" variant="outline" size="lg">
              Explore Services
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.45, ease }}
            className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4"
          >
            <div className="flex items-center gap-5">
              <div className="flex -space-x-3">
                {["AM", "SR", "DO", "AK"].map((initials) => (
                  <span
                    key={initials}
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-gradient-to-br from-[#0284c7] to-[#0ea5e9] text-xs font-bold text-white"
                  >
                    {initials}
                  </span>
                ))}
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-surface-2 text-xs font-bold text-muted">
                  +26
                </span>
              </div>
              <div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className="h-3.5 w-3.5 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="mt-1 text-xs text-muted">
                  Rated 4.9/5 by 30+ clients
                </p>
              </div>
            </div>
            <span
              aria-hidden
              className="hidden h-10 w-px bg-border-subtle sm:block"
            />
            <p className="max-w-[16rem] text-xs leading-relaxed text-muted">
              Longest client partnership:{" "}
              <strong className="font-semibold text-foreground">
                3 years and counting
              </strong>
            </p>
          </motion.div>
          <div className="mt-10 flex flex-wrap gap-2">
            {heroServices.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.label}
                  href={service.href}
                  className="group inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface/50 px-3.5 py-2 text-xs font-semibold text-muted transition-colors duration-300 hover:border-primary/35 hover:bg-primary/[0.08] hover:text-foreground"
                >
                  <Icon className="h-3.5 w-3.5 text-primary" />
                  {service.label}
                </Link>
              );
            })}
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={slide.word}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4, ease }}
              className="mt-4 text-xs font-semibold text-muted"
            >
              <span className="text-primary">{slide.stat}</span> {slide.caption}
              {" · "}
              <span className="font-normal">{slide.service}</span>
            </motion.p>
          </AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{
              opacity: { duration: 0.6, delay: 1.7 },
              y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
            }}
            className="mt-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted"
            aria-hidden
          >
            <ChevronDown className="h-4 w-4" />
            Scroll to see how we work
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease }}
          className="relative hidden w-full self-center justify-self-end lg:block lg:max-w-[360px]"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full rounded-3xl border border-border-subtle bg-surface/80 p-5 shadow-[0_24px_80px_-24px_rgba(2,132,199,0.35)] backdrop-blur-xl"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                  Full-service agency
                </p>
                <p className="mt-1 text-sm font-bold leading-tight text-foreground">
                  Everything under one roof
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                {heroServices.length} services
              </span>
            </div>

            <div className="mt-3.5 rounded-xl border border-border-subtle bg-background/50 px-3 py-2">
              <AnimatePresence mode="wait">
                <motion.p
                  key={slide.word}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease }}
                  className="text-xs font-semibold leading-relaxed text-muted"
                >
                  <span className="capitalize text-primary">{slide.word}</span>{" "}
                  {slide.tagline}
                </motion.p>
              </AnimatePresence>
            </div>

            <ul className="mt-3.5 space-y-1">
              {heroServices.map((service) => {
                const isActive = slide.service === service.label;
                const Icon = service.icon;
                return (
                  <li key={service.label}>
                    <Link
                      href={service.href}
                      className={`group flex items-center gap-2.5 rounded-xl border px-2.5 py-1.5 transition-colors duration-300 ${
                        isActive
                          ? "border-primary/35 bg-primary/[0.08]"
                          : "border-transparent hover:border-border-subtle hover:bg-surface-2/60"
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-colors duration-300 ${
                          isActive
                            ? "border-primary/40 bg-primary/15 text-primary"
                            : "border-border-subtle bg-background/60 text-muted group-hover:text-foreground"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <span
                        className={`text-xs font-semibold transition-colors duration-300 ${
                          isActive
                            ? "text-foreground"
                            : "text-muted group-hover:text-foreground"
                        }`}
                      >
                        {service.label}
                      </span>
                      <ArrowRight
                        className={`ml-auto h-3.5 w-3.5 shrink-0 text-primary transition-all duration-300 ${
                          isActive
                            ? "translate-x-0 opacity-100"
                            : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-3.5 flex items-center gap-2.5 border-t border-border-subtle pt-3.5">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    className="h-3 w-3 fill-primary text-primary"
                  />
                ))}
              </div>
              <p className="text-[11px] font-medium text-muted">
                Trusted by 60+ startups &amp; growing brands
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent"
      />
    </section>
  );
}
