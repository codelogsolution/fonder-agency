"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  ArrowRight,
  Check,
  ClipboardCheck,
  Compass,
  Rocket,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Reveal from "@/components/motion/Reveal";

/* ==========================================================================
   Data
   ========================================================================== */

type Phase = {
  /** Short label shown in the dial / panel. */
  name: string;
  title: string;
  description: string;
  deliverable: string;
  /** Honest, typical timeframe for this phase. */
  timeline: string;
  /** What actually gets done — keeps the right panel content-led. */
  checklist: string[];
  icon: LucideIcon;
};

const phases: Phase[] = [
  {
    name: "Audit",
    title: "We map what is actually happening",
    description:
      "Analytics, ad accounts, funnel drop-off, and where competitors are quietly winning — pulled apart and explained in plain language, not a 60-page deck.",
    deliverable: "Audit findings & priority list",
    timeline: "Week 1",
    checklist: [
      "Ad accounts, analytics and CRM access mapped",
      "Where leads drop off between click and sale",
      "What your three closest competitors are bidding on",
    ],
    icon: Compass,
  },
  {
    name: "Strategy",
    title: "A plan you sign off before we build",
    description:
      "The channels worth your budget, the messaging that fits your market, and targets we both agree are realistic — written down so scope never drifts.",
    deliverable: "Growth blueprint",
    timeline: "Week 2",
    checklist: [
      "Channel mix chosen around your margin, not vanity metrics",
      "Messaging and offers written for your actual buyer",
      "Targets per channel, agreed and signed off before spend",
    ],
    icon: ClipboardCheck,
  },
  {
    name: "Execution",
    title: "Campaigns, creative, and results move every week",
    description:
      "Ads, landing pages, email flows, and tracking updates ship on a weekly cadence — so you can see what works while there's still budget to shift.",
    deliverable: "Weekly releases with numbers attached",
    timeline: "Weeks 3–8",
    checklist: [
      "Live campaigns with spend tied to real outcomes",
      "Landing pages and offers tested against your buyers",
      "Friday review you can send to your team",
    ],
    icon: Rocket,
  },
  {
    name: "Optimisation",
    title: "The work starts compounding",
    description:
      "A/B tests, funnel tuning, and honest reporting steered by real numbers. We review it with you every month and cut what is not paying for itself.",
    deliverable: "Monthly performance review",
    timeline: "Ongoing",
    checklist: [
      "A/B tests on the pages and ads that actually move the needle",
      "Budget shifted to whichever channel keeps paying for itself",
      "A one-page monthly review your whole board can read",
    ],
    icon: SlidersHorizontal,
  },
];

const PHASE_COUNT = phases.length;
const DIAL_STEP = 360 / PHASE_COUNT;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/* ==========================================================================
   SSR-safe media query — the pinned experience is desktop-only
   ========================================================================== */

const DESKTOP_QUERY = "(min-width: 1024px)";

function subscribeDesktop(callback: () => void) {
  const query = window.matchMedia(DESKTOP_QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getDesktopSnapshot() {
  return window.matchMedia(DESKTOP_QUERY).matches;
}

function useIsDesktop() {
  return useSyncExternalStore(subscribeDesktop, getDesktopSnapshot, () => false);
}

/* ==========================================================================
   Section shell
   ========================================================================== */

export default function StickyProcess() {
  const isDesktop = useIsDesktop();

  return (
    <section id="process" className="relative bg-surface">
      {/* The band melts into the white sections above and below, so its edges
          never read as a pasted-on rectangle — the tint simply drifts in and
          out of the page. Opacity only; nothing here is blurred. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-gradient-to-b from-background to-transparent sm:h-32"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-background to-transparent sm:h-32"
      />

      {isDesktop ? <PinnedProcess /> : <FlowProcess />}
    </section>
  );
}

/* ==========================================================================
   Shared layout
   ========================================================================== */

const PANEL = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

/* ==========================================================================
   Rotating dial — numbered chips orbit to 12 o'clock as phases advance.
   Driven by the very same phase position as the card deck, so the number on
   the dial can never disagree with the card that is in focus.
   ========================================================================== */

const DIAL_SIZE = 148;
const DIAL_RADIUS = DIAL_SIZE / 2 - 22;
const ARC_RADIUS = DIAL_SIZE / 2 - 5;
const ARC_CIRCUMFERENCE = 2 * Math.PI * ARC_RADIUS;

/* ==========================================================================
   Panel geometry.

   The right half is ONE continuous panel, the same shell as the card on the
   left. Its content sits on a rail that travels exactly one panel-height per
   phase, so at rest a single block fills the frame and the neighbours simply
   fall outside it. Nothing is scaled down, tilted or blurred — it is plain
   vertical travel, which is what makes the row read as a single page whose
   copy is moving rather than a stack of separate cards swapping places.

   The step is *measured* from the real panel height, so the focused block is
   centred in the frame — and therefore level with the readout on the left — at
   every breakpoint, no matter how the copy wraps.
   ========================================================================== */

/** Fallback used before the first measurement lands (also the SSR value). */
const FALLBACK_STEP = 460;

function Dial({
  pos,
  progress,
  activeIndex,
}: {
  pos: MotionValue<number>;
  progress: MotionValue<number>;
  activeIndex: number;
}) {
  const dashOffset = useTransform(progress, [0, 1], [ARC_CIRCUMFERENCE, 0]);

  return (
    <div
      aria-hidden
      className="relative shrink-0"
      style={{ width: DIAL_SIZE, height: DIAL_SIZE }}
    >
      {/* Overall progress ring */}
      <svg
        className="absolute inset-0 -rotate-90"
        width={DIAL_SIZE}
        height={DIAL_SIZE}
        viewBox={`0 0 ${DIAL_SIZE} ${DIAL_SIZE}`}
      >
        <circle
          cx={DIAL_SIZE / 2}
          cy={DIAL_SIZE / 2}
          r={ARC_RADIUS}
          fill="none"
          stroke="var(--color-surface-2)"
          strokeWidth="2"
        />
        <motion.circle
          cx={DIAL_SIZE / 2}
          cy={DIAL_SIZE / 2}
          r={ARC_RADIUS}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={ARC_CIRCUMFERENCE}
          style={{ strokeDashoffset: dashOffset }}
        />
      </svg>

      {/* Inner disc */}
      <div className="absolute inset-10 rounded-full border border-border-subtle bg-white shadow-[0_18px_44px_-26px_rgba(11,18,32,0.4)]" />

      {/* Centre readout */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="text-3xl font-semibold leading-none tabular-nums text-foreground"
          >
            {String(activeIndex + 1).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
        <span className="mt-1.5 text-[0.56rem] font-semibold uppercase tracking-[0.2em] text-muted">
          {phases[activeIndex].name}
        </span>
      </div>

      {/* Orbiting numbered chips — the active one always lands at 12 o'clock */}
      {phases.map((phase, index) => (
        <DialChip
          key={phase.name}
          pos={pos}
          index={index}
          active={index === activeIndex}
        />
      ))}
    </div>
  );
}

/* ==========================================================================
   One numbered chip on the dial. Its position is solved analytically from the
   shared phase position: at `pos === index` the chip's angle resolves to
   −90°, i.e. dead centre at 12 o'clock. No nested counter-rotations, so the
   digit never spins and the active chip is always the one at the top.
   ========================================================================== */

function DialChip({
  pos,
  index,
  active,
}: {
  pos: MotionValue<number>;
  index: number;
  active: boolean;
}) {
  const offset = useTransform(pos, (value) => {
    const radians = (((index - value) * DIAL_STEP - 90) * Math.PI) / 180;
    return {
      x: Math.cos(radians) * DIAL_RADIUS,
      y: Math.sin(radians) * DIAL_RADIUS,
    };
  });
  const x = useTransform(offset, (value) => value.x);
  const y = useTransform(offset, (value) => value.y);

  return (
    <motion.span
      aria-hidden
      className={cn(
        "absolute left-1/2 top-1/2 flex h-6 w-6 items-center justify-center rounded-full border font-mono text-[0.6rem] font-semibold tabular-nums transition-colors duration-300",
        active
          ? "border-primary bg-primary text-primary-foreground shadow-[0_0_0_4px_rgba(2,132,199,0.14)]"
          : "border-border-subtle bg-surface-2 text-muted",
      )}
      style={{ x, y, marginLeft: -12, marginTop: -12 }}
    >
      {index + 1}
    </motion.span>
  );
}

/* ==========================================================================
   Intro copy — sits above *both* halves so the left card and the right panel
   start on exactly the same line. That shared edge is what stops the row from
   reading as two widgets bolted together.
   ========================================================================== */

function SectionHeader() {
  return (
    <Reveal>
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-primary">
            The operating system
          </p>
          <h2 className="mt-2 text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
            One process. <span className="text-muted">Zero surprises.</span>
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-muted">
          Keep scrolling. The right half stays put and the work moves through
          it — one phase at a time, in order.
        </p>
      </div>
    </Reveal>
  );
}

/** Structural wrapper for the row only — deliberately frameless. The section
    band is the surface now, so the two halves read as one page with a column
    rule between them rather than two boxes sitting side by side. */
const PANE = "relative overflow-hidden";

/* ==========================================================================
   Left half — the summary of whichever phase is in focus. Its body is centred
   vertically in the pane, mirroring the right pane where the focused block is
   centred too. Because both are centred in panes of identical height, the
   phase title on the left and the phase title on the right land on the same
   line — the row reads as one page, not two.
   ========================================================================== */

function PhaseSummary({
  pos,
  progress,
  activeIndex,
}: {
  pos: MotionValue<number>;
  progress: MotionValue<number>;
  activeIndex: number;
}) {
  const phase = phases[activeIndex];
  const Icon = phase.icon;
  const remaining = Math.max(0, PHASE_COUNT - 1 - activeIndex);
  const barGlow = useMotionTemplate`0 0 14px rgba(2, 132, 199, ${progress})`;

  return (
    <div className="flex h-full flex-col justify-center p-6 sm:p-7">
      <div className="flex items-start justify-between gap-6">
        <div className="flex items-center gap-2.5 pt-1">
          <span className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-primary">
            Phase {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <span className="h-1 w-1 rounded-full bg-border-subtle" />
          <span className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-muted">
            {phase.timeline}
          </span>
        </div>
        <div className="hidden shrink-0 sm:block">
          <Dial pos={pos} progress={progress} activeIndex={activeIndex} />
        </div>
      </div>

      <div className="py-7">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.32, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                {phase.name}
              </h3>
            </div>
            <p className="mt-4 text-[0.95rem] font-medium leading-snug text-foreground">
              {phase.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {phase.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div>
        <div className="flex items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border-subtle">
            <motion.div
              className="h-full origin-left rounded-full bg-primary"
              style={{ scaleX: progress, boxShadow: barGlow }}
            />
          </div>
          <div className="flex items-center gap-1.5">
            {phases.map((item, index) => (
              <span
                key={item.name}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  index <= activeIndex
                    ? "w-5 bg-primary"
                    : "w-1.5 bg-border-subtle",
                )}
              />
            ))}
          </div>
          <span className="font-mono text-[0.66rem] font-semibold tabular-nums text-muted">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(PHASE_COUNT).padStart(2, "0")}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-muted">
            {remaining === 0
              ? "That is the whole engagement"
              : remaining === 1
                ? "One phase left"
                : `${remaining} phases left`}
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            Free audit first
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Right half — one content block per phase. A block is plain document copy,
   not a card: a hairline, a label, the promise, the concrete work and the
   deliverable. It carries no border, radius or background of its own, so what
   the eye tracks is the *copy* moving — never a box travelling.
   ========================================================================== */

function StepBlock({
  index,
  pos,
  step,
  reduced,
}: {
  index: number;
  pos: MotionValue<number>;
  step: number;
  /** Reduced motion → keep the travel distance, skip the drift. */
  reduced: boolean;
}) {
  const phase = phases[index];
  const Icon = phase.icon;

  /** +1 = one block below the frame, 0 = in focus, −1 = one block above. */
  const distance = useTransform(pos, (value) => index - value);
  /** A gentle fade only at the very seams — the copy itself stays legible, so
      what the eye tracks is vertical travel, not a box appearing. */
  const opacity = useTransform(
    distance,
    [-1.05, -0.35, 0, 0.35, 1.05],
    [0, 0.92, 1, 0.92, 0],
  );
  const drift = useTransform(distance, [-1, 0, 1], [24, 0, -24]);

  return (
    <div className="flex w-full px-8 sm:px-10" style={{ height: step }}>
      <motion.div
        className="flex w-full max-w-xl flex-col justify-center"
        style={reduced ? { opacity } : { opacity, y: drift }}
      >
        <div className="flex items-center gap-3 border-t border-border-subtle pt-6">
          <span className="font-mono text-[0.68rem] font-semibold tabular-nums text-primary">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
            <Icon className="h-3.5 w-3.5" aria-hidden />
          </span>
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted">
            {phase.name} · {phase.timeline}
          </span>
        </div>

        <h3 className="mt-6 text-xl font-semibold leading-snug tracking-tight text-foreground sm:text-[1.4rem]">
          {phase.title}
        </h3>

        <ul className="mt-5 space-y-3">
          {phase.checklist.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-sm leading-relaxed text-muted"
            >
              <Check
                className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                aria-hidden
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-sm text-foreground/80">
          <span className="font-medium text-foreground">You get:</span>{" "}
          {phase.deliverable}
        </p>
      </motion.div>
    </div>
  );
}

/* ==========================================================================
   Phase ticks on the pane's right edge — a quiet echo of the dial so the
   position is legible even when the reader is looking only at the copy.
   ========================================================================== */

function StepTicks({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="pointer-events-none absolute right-6 top-1/2 z-30 flex -translate-y-1/2 flex-col items-center gap-2">
      {phases.map((phase, index) => (
        <span
          key={phase.name}
          className={cn(
            "w-[3px] rounded-full transition-all duration-500",
            index === activeIndex ? "h-6 bg-primary" : "h-2.5 bg-border-subtle",
          )}
        />
      ))}
    </div>
  );
}

/* ==========================================================================
   The sliding pane. It owns the measurement: the step is read from the pane's
   real height, so one phase fills the frame exactly and the focused block sits
   centred — level with the readout on the left at any width or wrap.
   ========================================================================== */

function ProcessPane({
  pos,
  activeIndex,
  reduced,
}: {
  pos: MotionValue<number>;
  activeIndex: number;
  reduced: boolean;
}) {
  const paneRef = useRef<HTMLDivElement>(null);
  const stepValue = useMotionValue(FALLBACK_STEP);
  const [step, setStep] = useState(FALLBACK_STEP);

  useEffect(() => {
    const element = paneRef.current;
    if (!element) return;

    const measure = () => {
      const next = element.getBoundingClientRect().height;
      if (next > 0 && Math.abs(next - stepValue.get()) > 0.5) {
        stepValue.set(next);
        setStep(next);
      }
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [stepValue]);

  const railY = useTransform<number, number>(
    [pos, stepValue],
    ([position, height]) => -position * height,
  );

  return (
    <div
      ref={paneRef}
      className="relative min-h-[26rem] flex-1 overflow-hidden"
    >
      <motion.div className="absolute inset-x-0 top-0" style={{ y: railY }}>
        {phases.map((phase, index) => (
          <StepBlock
            key={phase.name}
            index={index}
            pos={pos}
            step={step}
            reduced={reduced}
          />
        ))}
      </motion.div>

      {/* Edge melts — copy dissolves into the pane rather than being sliced. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-16 bg-gradient-to-b from-surface to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-16 bg-gradient-to-t from-surface to-transparent" />

      <StepTicks activeIndex={activeIndex} />
    </div>
  );
}

/* ==========================================================================
   Desktop — the pinned experience.

   One `scrollYProgress` on the track is the only source of truth. It is spread
   into a single continuous phase position (`pos`, 0 → 3) which drives the dial,
   the rail and the readout together. Because every one of them is a pure
   function of that one value, no two parts of the layout can disagree about
   which phase is on screen.
   ========================================================================== */

/** Total scroll budget — comfortably more than one screen per phase. */
const PHASE_TRACK = `${PHASE_COUNT * 88}vh`;

function PinnedProcess() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: trackRef,
    /* `end end` makes progress reach 1 at exactly the moment the sticky panel
       releases (track height − viewport height). Any other stop would let the
       final handover fire while the panel was already scrolling away. */
    offset: ["start start", "end end"],
  });

  const pos = useTransform(scrollYProgress, [0, 1], [0, PHASE_COUNT - 1]);

  /* The readout follows that *same* value: a phase becomes active the moment
     its block passes the centre line, which is also the moment its chip reaches
     12 o'clock. Dial, summary and copy can therefore never disagree. */
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(pos, "change", (value) => {
    const next = clamp(Math.round(value), 0, PHASE_COUNT - 1);
    setActiveIndex((current) => (current === next ? current : next));
  });

  return (
    <div
      ref={trackRef}
      className="relative"
      style={{ height: PHASE_TRACK }}
      data-process-track
    >
      <div className="sticky top-0 flex min-h-screen items-center py-24">
        <div className={`${PANEL} w-full`}>
          <SectionHeader />

          {/* ONE surface: the summary on the left, the travelling copy on the
              right, divided only by a column rule. No frame, no second
              background — the section band is the surface, so the row reads as
              one page rather than two boxes. */}
          <div className={`${PANE} mt-9 flex`}>
            <div className="w-[42%] shrink-0 border-r border-border-subtle">
              <PhaseSummary
                pos={pos}
                progress={scrollYProgress}
                activeIndex={activeIndex}
              />
            </div>

            <ProcessPane
              pos={pos}
              activeIndex={activeIndex}
              reduced={reduced}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Mobile / tablet — a plain vertical flow. No pinning and no scroll hijacking:
   every phase is simply there to read, with its number lit as it passes.
   ========================================================================== */

function FlowProcess() {
  const flowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: flowRef,
    offset: ["start 0.85", "end 0.6"],
  });

  /** Same 0 → 3 mapping as the pinned layout, so numbering matches on every
      screen size. */
  const pos = useTransform(scrollYProgress, [0, 1], [0, PHASE_COUNT - 1]);

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(pos, "change", (value) => {
    const next = clamp(Math.round(value), 0, PHASE_COUNT - 1);
    setActiveIndex((current) => (current === next ? current : next));
  });

  return (
    <div className={`${PANEL} py-20 lg:hidden`}>
      <SectionHeader />

      <div ref={flowRef} className="mt-9 space-y-3">
        {phases.map((phase, index) => {
          const Icon = phase.icon;
          const isActive = index === activeIndex;

          return (
            <article
              key={phase.name}
              className={cn(
                "rounded-3xl border bg-background p-5 transition-colors duration-500 sm:p-6",
                isActive ? "border-primary/40" : "border-border-subtle",
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full border font-mono text-[0.6rem] font-semibold tabular-nums transition-colors duration-300",
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border-subtle bg-surface-2 text-muted",
                  )}
                >
                  {index + 1}
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  {phase.name}
                </h3>
                <span className="ml-auto text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-muted">
                  {phase.timeline}
                </span>
              </div>

              <p className="mt-4 text-[0.95rem] font-medium leading-snug text-foreground">
                {phase.title}
              </p>

              <ul className="mt-3 space-y-2.5">
                {phase.checklist.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-relaxed text-muted"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-4 border-t border-border-subtle pt-4 text-sm text-foreground/80">
                <span className="font-medium text-foreground">You get:</span>{" "}
                {phase.deliverable}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
