"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/site";

const DURATION = 1200;
const EXIT_DELAY = 220;

export default function Preloader() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    let timer = 0;

    const finish = () => {
      document.documentElement.style.overflow = "";
      setVisible(false);
    };

    frame = requestAnimationFrame(() => {
      let seen = false;
      try {
        seen = Boolean(sessionStorage.getItem("fd-intro-seen"));
      } catch {
        seen = false;
      }
      if (seen) {
        setVisible(false);
        return;
      }
      try {
        sessionStorage.setItem("fd-intro-seen", "1");
      } catch {

      }
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        finish();
        return;
      }

      document.documentElement.style.overflow = "hidden";

      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / DURATION);
        setProgress(Math.round(t * 100));
        if (t < 1) {
          frame = requestAnimationFrame(tick);
        } else {
          timer = window.setTimeout(finish, EXIT_DELAY);
        }
      };
      frame = requestAnimationFrame(tick);
    });

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      document.documentElement.style.overflow = "";
    };
  }, []);

  const letters = siteConfig.name.split("");

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          data-preloader
          exit={{ y: "-100%" }}
          transition={{ duration: reduced ? 0 : 0.75, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-background"
        >
          <motion.div
            exit={{
              opacity: 0,
              y: -24,
              transition: { duration: reduced ? 0 : 0.35, ease: "easeIn" },
            }}
            className="flex flex-col items-center"
          >
            <div className="flex overflow-hidden pb-1">
              {letters.map((letter, index) => (
                <motion.span
                  key={`${letter}-${index}`}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.08 + index * 0.045,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                  className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            <div className="mt-6 h-px w-44 overflow-hidden rounded-full bg-border-subtle">
              <motion.div
                className="h-full w-full origin-left bg-primary"
                style={{ scaleX: progress / 100 }}
              />
            </div>
            <p className="mt-3 font-mono text-xs tabular-nums text-muted">
              {progress}%
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}