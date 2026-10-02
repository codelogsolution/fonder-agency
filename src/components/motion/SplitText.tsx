"use client";

import { memo } from "react";
import { motion } from "framer-motion";

type SplitTextProps = {
  text: string;
  delay?: number;
  /** Override the per-unit stagger. Defaults: 0.016s per char, 0.07s per word. */
  stagger?: number;
  className?: string;
  wordClassName?: string;
  /** "word" = word-by-word masks (default). "char" = letter-by-letter cascade. */
  by?: "word" | "char";
};

function SplitText({
  text,
  delay = 0,
  stagger,
  className,
  wordClassName,
  by = "word",
}: SplitTextProps) {
  const step = stagger ?? (by === "char" ? 0.016 : 0.07);
  const words = text.split(" ");
  let unitIndex = 0;

  return (
    <span className={className} aria-label={text}>
      {words.map((word, wordIdx) => {
        const units =
          by === "char"
            ? word.split("")
            : [
                word +
                  (wordIdx < words.length - 1 ? "\u00A0" : ""),
              ];

        return (
          <span
            key={`${word}-${wordIdx}`}
            aria-hidden
            className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom"
          >
            {units.map((unit, unitIdx) => {
              const current = unitIndex++;
              return (
                <motion.span
                  key={unitIdx}
                  className={`inline-block ${wordClassName ?? ""}`}
                  initial={{ y: "115%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: delay + current * step,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                >
                  {unit}
                </motion.span>
              );
            })}
            {/* Keep the space between words in char mode (outside the mask). */}
            {by === "char" && wordIdx < words.length - 1 ? (
              <span className="inline-block">&nbsp;</span>
            ) : null}
          </span>
        );
      })}
    </span>
  );
}

export default memo(SplitText);

