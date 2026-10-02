"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

type Tilt3DProps = {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. */
  max?: number;
  /** Hover scale. */
  scale?: number;
  /** Moving glare sheen. */
  glare?: boolean;
  /** Border radius class shared by the tilt layer + glare (for clipping). */
  rounded?: string;
};

// Pointer-tracked 3D tilt with a moving glare sheen. Springs smooth the
// rotation, everything is transform-only (no layout work), and it switches
// itself off for touch-coarse pointers and reduced-motion users.
export default function Tilt3D({
  children,
  className,
  max = 8,
  scale = 1.02,
  glare = true,
  rounded = "rounded-2xl",
}: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Pointer position normalised to 0..1 on both axes.
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  const springConfig = { stiffness: 170, damping: 18, mass: 0.5 };
  const rotateX = useSpring(
    useTransform(pointerY, [0, 1], [max, -max]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(pointerX, [0, 1], [-max, max]),
    springConfig,
  );

  const glareX = useTransform(pointerX, [0, 1], ["20%", "80%"]);
  const glareY = useTransform(pointerY, [0, 1], ["20%", "80%"]);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255, 255, 255, 0.35), transparent 55%)`;
  const glareOpacity = useSpring(0, { stiffness: 200, damping: 30 });

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set((event.clientX - rect.left) / rect.width);
    pointerY.set((event.clientY - rect.top) / rect.height);
  };

  const handleEnter = () => glareOpacity.set(1);
  const handleLeave = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
    glareOpacity.set(0);
  };

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
      className={className}
    >
      <motion.div
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        whileHover={{ scale }}
        className={`relative h-full will-change-transform ${rounded}`}
      >
        {children}
        {glare && (
          <motion.div
            aria-hidden
            style={{ background: glareBg, opacity: glareOpacity }}
            className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
          />
        )}
      </motion.div>
    </div>
  );
}