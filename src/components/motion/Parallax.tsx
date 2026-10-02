"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

type ParallaxProps = {
  children: ReactNode;
  className?: string;

  speed?: number;
};

export default function Parallax({
  children,
  className,
  speed = 40,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const smoothY = useSpring(y, { stiffness: 120, damping: 28, mass: 0.4 });

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y: smoothY }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}