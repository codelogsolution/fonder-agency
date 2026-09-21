"use client";

import { memo } from "react";
import { motion } from "framer-motion";

type SplitTextProps = {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
  wordClassName?: string;
};

// Words slide up out of an overflow mask, staggered left to right.
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

