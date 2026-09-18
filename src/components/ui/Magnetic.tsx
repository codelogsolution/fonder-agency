"use client";

import { useCallback, useMemo, useRef, type MouseEvent as ReactMouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type MagneticProps = {
  children: ReactNode;
  /** 0–1 — how strongly the content is pulled toward the cursor. */
  strength?: number;
  className?: string;
};

/**
 * Magnetic wrapper: content gravitates toward the cursor with a springy
 * pull and springs back to rest on mouse leave. Inert on touch devices
 * (no mouse events).
 */
export default function Magnetic({
  children,
  strength = 0.35,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 14, mass: 0.25 });
  const springY = useSpring(y, { stiffness: 180, damping: 14, mass: 0.25 });

  const handleMouseMove = useCallback((event: ReactMouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  }, [strength, x, y]);

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  // Stable motion props when the parent navigation re-renders.
  const style = useMemo(() => ({ x: springX, y: springY }), [springX, springY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={style}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}
