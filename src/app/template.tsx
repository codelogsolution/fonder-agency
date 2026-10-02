"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

// Per-route entrance — a quick fade-rise every time the route changes.
// Template components remount on navigation, which is what drives the effect.
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}