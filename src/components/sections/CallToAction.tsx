"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";

export default function CallToAction() {
  const panel = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);
  const x = useSpring(pointerX, { stiffness: 140, damping: 22 });
  const y = useSpring(pointerY, { stiffness: 140, damping: 22 });

  const rotateX = useTransform(y, [0, 100], [7, -7]);
  const rotateY = useTransform(x, [0, 100], [-8, 8]);
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${x}% ${y}%, rgba(2,132,199,0.22), transparent 62%)`;
  const beam = useMotionTemplate`${x}%`;

  const trackPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = panel.current?.getBoundingClientRect();
    if (!bounds) return;
    pointerX.set(((event.clientX - bounds.left) / bounds.width) * 100);
    pointerY.set(((event.clientY - bounds.top) / bounds.height) * 100);
  };

  return (
    <section id="contact" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div style={{ perspective: 1600 }}>
            <motion.div
              ref={panel}
              onPointerMove={trackPointer}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative isolate overflow-hidden rounded-[2rem] border border-border-subtle bg-surface px-6 py-16 text-center sm:px-16 sm:py-24"
            >
              <div className="absolute inset-0 -z-10 bg-grid opacity-50" />
              <motion.div
                aria-hidden
                style={{ background: spotlight }}
                className="absolute inset-0 -z-10"
              />
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
              />
              <motion.div
                aria-hidden
                style={{ left: beam }}
                className="absolute inset-y-0 -z-10 w-px bg-gradient-to-b from-transparent via-primary/25 to-transparent"
              />
              <motion.div
                style={{ transform: "translateZ(70px)" }}
                className="relative"
              >
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  Let&apos;s build together
                </span>
                <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                  Ready to <span className="text-gradient">scale your business</span>?
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                  Tell us where you want to go. We&apos;ll engineer the fastest
                  route — and build the vehicle to get you there.
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <Button href="/contact" size="lg">
                    Start a Project <ArrowRight className="h-5 w-5" />
                  </Button>
                  <Button href="/work" variant="outline" size="lg">
                    View Our Work
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}