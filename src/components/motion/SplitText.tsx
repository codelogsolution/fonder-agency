"use client";

import { memo } from "react";
import { motion } from "framer-motion";

type SplitTextProps = {
  text: string;
  /** Base delay (seconds) before the first word animates in. */
  delay?: number;
  /** Per-word stagger (seconds). */
  stagger?: number;
  /** Applied to the wrapper (layout) span. */
  className?: string;
  /** Applied to each animated word span (e.g. "text-gradient"). */
  wordClassName?: string;
};

/**
 * Cinematic split-text: words slide up out of an overflow mask, staggered
 * left to right. The wrapper keeps the full sentence in the a11y tree via
 * aria-label while the individual word masks are hidden from AT.
 */
function SplitText({
  text,
  delay = 0,
  stagger = 0.07,
  className,
  wordClassName,
}: SplitTextProps) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          aria-hidden
          className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom"
        >
          <motion.span
            className={`inline-block ${wordClassName ?? ""}`}
            initial={{ y: "115%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.7,
              delay: delay + index * stagger,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
          >
            {word}
            {index < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default memo(SplitText);

