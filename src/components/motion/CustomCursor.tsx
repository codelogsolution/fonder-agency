"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 24, mass: 0.55 });
  const ringY = useSpring(y, { stiffness: 260, damping: 24, mass: 0.55 });

  useEffect(() => {

    const frame = requestAnimationFrame(() => {
      if (!window.matchMedia("(pointer: fine)").matches) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      setEnabled(true);
    });

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };
    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      setActive(
        Boolean(
          target?.closest(
            "a, button, [role='button'], input, textarea, select, [data-cursor='active']",
          ),
        ),
      );
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[110] hidden lg:block"
    >

      <motion.div style={{ x: ringX, y: ringY }} className="absolute left-0 top-0">
        <motion.div
          animate={{
            scale: pressed ? 0.7 : active ? 1.7 : 1,
            opacity: visible ? (active ? 0.95 : 0.5) : 0,
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-primary/60"
        />
      </motion.div>

      <motion.div style={{ x, y }} className="absolute left-0 top-0">
        <motion.div
          animate={{ opacity: visible ? 1 : 0, scale: pressed ? 0.5 : 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
        />
      </motion.div>
    </motion.div>
  );
}