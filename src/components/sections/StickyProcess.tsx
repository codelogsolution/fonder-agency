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

type Phase = {
  name: string;
  title: string;
  description: string;
  deliverable: string;
  timeline: string;
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

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

// The pinned experience is desktop-only.
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

export default function StickyProcess() {
  const isDesktop = useIsDesktop();

  return (
    <section
      id="process"
      className="relative border-y border-border-subtle bg-white"
    >
      {isDesktop ? <PinnedProcess /> : <FlowProcess />}
    </section>
  );
}

const PANEL = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";
const PANEL_WIDE = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12 xl:px-20";

// The dial — numbers never move; only the marker and arc travel.
const DIAL_SIZE = 172;
const RING_STROKE = 3;
const RING_RADIUS = DIAL_SIZE / 2 - RING_STROKE / 2 - 3;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
// One quarter-turn per phase; the extra quarter closes the loop at 12 o'clock.
const MARKER_STEP = 360 / (PHASE_COUNT - 1);
// Scroll budget of a single phase.
const PHASE_SPAN = (PHASE_COUNT - 1) / PHASE_COUNT;

function activeNumberAt(position: number) {
  return clamp(Math.floor(position / PHASE_SPAN), 0, PHASE_COUNT - 1);
}
const NODE_SIZE = 30;
const MARKER_SIZE = 16;

// Node angles — 12, 3, 6, 9 o'clock in phase order.
function nodeAngle(index: number) {
  return (index * (360 / PHASE_COUNT) - 90) * (Math.PI / 180);
}

function ringPoint(angle: number) {
  return {
    x: Math.cos(angle) * RING_RADIUS,
    y: Math.sin(angle) * RING_RADIUS,
  };
}

// Rails geometry — one measured step, so both halves land on the same line.
const FALLBACK_STEP = 384;
const ROW_FRAME = "min-h-[24rem]";
const AXIS_PULL = 22;
const AXIS_GUTTER = "grid-cols-[1fr_15rem_1fr]";

function ProcessDial({
  pos,
  activeIndex,
}: {
  pos: MotionValue<number>;
  activeIndex: number;
}) {
  const arcProgress = useTransform(
    pos,
    (value) => clamp(value, 0, PHASE_COUNT - 1) / (PHASE_COUNT - 1),
  );
  const dashOffset = useTransform(arcProgress, [0, 1], [RING_CIRCUMFERENCE, 0]);

  const point = useTransform(pos, (value) =>
    ringPoint(
      ((clamp(value, 0, PHASE_COUNT - 1) * MARKER_STEP - 90) * Math.PI) / 180,
    ),
  );
  const markerX = useTransform(point, (value) => value.x);
  const markerY = useTransform(point, (value) => value.y);

  return (
    <div
      className="relative shrink-0"
      style={{ width: DIAL_SIZE, height: DIAL_SIZE }}
    >
      {/* Grey ring + blue sweep, rotated to start at 12. */}
      <svg
        aria-hidden
        className="absolute inset-0 -rotate-90"
        width={DIAL_SIZE}
        height={DIAL_SIZE}
        viewBox={`0 0 ${DIAL_SIZE} ${DIAL_SIZE}`}
      >
        <circle
          cx={DIAL_SIZE / 2}
          cy={DIAL_SIZE / 2}
          r={RING_RADIUS}
          fill="none"
          stroke="#cbd5e1"
          strokeWidth={RING_STROKE}
        />
        <motion.circle
          cx={DIAL_SIZE / 2}
          cy={DIAL_SIZE / 2}
          r={RING_RADIUS}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth={RING_STROKE}
          strokeLinecap="round"
          strokeDasharray={RING_CIRCUMFERENCE}
          style={{ strokeDashoffset: dashOffset }}
        />
      </svg>

      {/* Covers the axis rule so the line reads as passing through the dial. */}
      <div className="absolute inset-[30px] rounded-full border border-border-subtle bg-white shadow-[0_20px_46px_-28px_rgba(11,18,32,0.45)]" />

      <motion.span
        aria-hidden
        className="absolute left-1/2 top-1/2 rounded-full border-[2px] border-white bg-primary shadow-[0_0_0_1px_rgba(2,132,199,0.4),0_6px_14px_-4px_rgba(2,132,199,0.75)]"
        style={{
          width: MARKER_SIZE,
          height: MARKER_SIZE,
          x: markerX,
          y: markerY,
          marginLeft: -MARKER_SIZE / 2,
          marginTop: -MARKER_SIZE / 2,
        }}
      />

      {/* Numbered nodes — 1 top, 2 right, 3 bottom, 4 left. */}
      {phases.map((phase, index) => {
        const { x, y } = ringPoint(nodeAngle(index));
        const reached = index <= activeIndex;

        return (
          <span
            key={phase.name}
            aria-hidden
            className={cn(
              "absolute left-1/2 top-1/2 flex items-center justify-center rounded-full border font-mono text-[0.66rem] font-semibold tabular-nums transition-colors duration-300",
              index === activeIndex
                ? "border-primary bg-primary text-primary-foreground shadow-[0_0_0_5px_rgba(2,132,199,0.14)]"
                : reached
                  ? "border-primary/40 bg-primary/10 text-primary bg-white"
                  : "border-border-subtle bg-white text-muted",
            )}
            style={{
              width: NODE_SIZE,
              height: NODE_SIZE,
              transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0)`,
            }}
          >
            {index + 1}
          </span>
        );
      })}

      {/* Readout for the centred phase. */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="text-[1.75rem] font-semibold leading-none tabular-nums text-foreground"
          >
            {String(activeIndex + 1).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
        <span className="mt-1.5 px-3 text-center text-[0.56rem] font-semibold uppercase tracking-[0.2em] text-muted">
          {phases[activeIndex].name}
        </span>
      </div>
    </div>
  );
}

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
          Keep scrolling. The dial stays put and both halves move through it —
          one phase at a time, in order.
        </p>
      </div>
    </Reveal>
  );
}

// Rail blocks — both sides carry the same phase on the same measured step.
function useBlockMotion(
  pos: MotionValue<number>,
  index: number,
  side: "left" | "right",
) {
  const distance = useTransform(pos, (value) => index - value);
  const opacity = useTransform(
    distance,
    [-1.05, -0.4, 0, 0.4, 1.05],
    [0, 0.9, 1, 0.9, 0],
  );
  const y = useTransform(distance, [-1, 0, 1], [24, 0, -24]);
  const out = side === "left" ? -AXIS_PULL : AXIS_PULL;
  const x = useTransform(distance, [-1, 0, 1], [out, 0, out]);

  return { opacity, y, x };
}

// Left half — the promise for the phase level with the dial.
function PromiseBlock({
  index,
  pos,
  step,
  reduced,
}: {
  index: number;
  pos: MotionValue<number>;
  step: number;
  reduced: boolean;
}) {
  const phase = phases[index];
  const Icon = phase.icon;
  const { opacity, y, x } = useBlockMotion(pos, index, "left");

  return (
    <div className="flex items-center justify-end pr-6" style={{ height: step }}>
      <motion.div
        className="w-full max-w-md text-right"
        style={reduced ? { opacity } : { opacity, y, x }}
      >
        <div className="flex items-center justify-end gap-2.5">
          <span className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-primary">
            Phase {String(index + 1).padStart(2, "0")}
          </span>
          <span className="h-1 w-1 rounded-full bg-border-subtle" />
          <span className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-muted">
            {phase.timeline}
          </span>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
            <Icon className="h-4.5 w-4.5" aria-hidden />
          </span>
        </div>

        <h3 className="mt-4 text-[1.35rem] font-semibold leading-snug tracking-tight text-foreground">
          {phase.title}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-muted">
          {phase.description}
        </p>
      </motion.div>
    </div>
  );
}

// Right half — the concrete work for the same phase.
function WorkBlock({
  index,
  pos,
  step,
  reduced,
}: {
  index: number;
  pos: MotionValue<number>;
  step: number;
  reduced: boolean;
}) {
  const phase = phases[index];
  const { opacity, y, x } = useBlockMotion(pos, index, "right");

  return (
    <div className="flex items-center pl-6" style={{ height: step }}>
      <motion.div
        className="w-full max-w-[30rem]"
        style={reduced ? { opacity } : { opacity, y, x }}
      >
        <div className="flex items-center gap-3 border-t border-border-subtle pt-5">
          <span className="font-mono text-[0.68rem] font-semibold tabular-nums text-primary">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted">
            {phase.name}
          </span>
        </div>

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

        <p className="mt-6 border-t border-border-subtle pt-4 text-sm text-foreground/80">
          <span className="font-medium text-foreground">You get:</span>{" "}
          {phase.deliverable}
        </p>
      </motion.div>
    </div>
  );
}

// The row — measures its own height so a phase always fills the frame.
function ProcessRow({
  pos,
  progress,
  activeIndex,
  reduced,
}: {
  pos: MotionValue<number>;
  progress: MotionValue<number>;
  activeIndex: number;
  reduced: boolean;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const stepValue = useMotionValue(FALLBACK_STEP);
  const [step, setStep] = useState(FALLBACK_STEP);

  useEffect(() => {
    const element = rowRef.current;
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
  const barGlow = useMotionTemplate`0 0 14px rgba(2, 132, 199, ${progress})`;
  const remaining = Math.max(0, PHASE_COUNT - 1 - activeIndex);

  const rail = (side: "left" | "right") => (
    <div className="relative overflow-hidden">
      <motion.div
        className="absolute inset-x-0 top-0 will-change-transform"
        style={{ y: railY }}
      >
        {phases.map((phase, index) =>
          side === "left" ? (
            <PromiseBlock
              key={phase.name}
              index={index}
              pos={pos}
              step={step}
              reduced={reduced}
            />
          ) : (
            <WorkBlock
              key={phase.name}
              index={index}
              pos={pos}
              step={step}
              reduced={reduced}
            />
          ),
        )}
      </motion.div>

      {/* Edge fades into the frame. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-14 bg-gradient-to-b from-white to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-14 bg-gradient-to-t from-white to-transparent" />
    </div>
  );

  return (
    <div className="mt-10">
      <div className={cn("relative grid items-stretch", ROW_FRAME, AXIS_GUTTER)}>
        {rail("left")}

        {/* Axis rule with the dial centred on it. */}
        <div className="relative">
          <div
            aria-hidden
            className="axis-rule absolute left-1/2 top-0 h-full w-px -translate-x-1/2"
          />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <ProcessDial pos={pos} activeIndex={activeIndex} />
          </div>
        </div>

        {rail("right")}
      </div>

      {/* Position readout. */}
      <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
        <div className="min-w-[8rem] flex-1">
          <div className="h-1.2 overflow-hidden rounded-full bg-border-subtle">
            <motion.div
              className="h-1.2 origin-left rounded-full bg-primary"
              style={{ scaleX: progress, boxShadow: barGlow }}
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {phases.map((item, index) => (
            <span
              key={item.name}
              className={cn(
                "h-1.2 rounded-full transition-all duration-500",
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
  );
}

// Desktop — one scrollYProgress (pos, 0 → 3) drives dial, rails and readout.
const PHASE_TRACK = `${PHASE_COUNT * 88}vh`;

function PinnedProcess() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const pos = useTransform(scrollYProgress, [0, 1], [0, PHASE_COUNT - 1]);

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(pos, "change", (value) => {
    const next = activeNumberAt(value);
    setActiveIndex((current) => (current === next ? current : next));
  });

  return (
    <div
      ref={trackRef}
      className="relative"
      style={{ height: PHASE_TRACK }}
      data-process-track
    >
      <div className="sticky top-0 flex min-h-screen items-center py-25">
        <div className={`${PANEL_WIDE} w-full`}>
          <SectionHeader />

          <ProcessRow
            pos={pos}
            progress={scrollYProgress}
            activeIndex={activeIndex}
            reduced={reduced}
          />
        </div>
      </div>
    </div>
  );
}

// Mobile / tablet — plain vertical flow, no pinning.
function FlowProcess() {
  const flowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: flowRef,
    offset: ["start 0.85", "end 0.6"],
  });

  const pos = useTransform(scrollYProgress, [0, 1], [0, PHASE_COUNT - 1]);
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(pos, "change", (value) => {
    const next = activeNumberAt(value);
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
                "rounded-3xl border bg-white p-5 shadow-[0_22px_50px_-38px_rgba(11,18,32,0.5)] transition-colors duration-500 sm:p-6",
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
