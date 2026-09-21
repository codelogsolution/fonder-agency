"use client";

import { memo, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type RotatingTextProps = {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  holdPause?: number;
  delay?: number;
  className?: string;
  onWordChange?: (index: number) => void;
};

// Typewriter cycle: type, hold, delete, next word.
function RotatingText({
  words,
  typeSpeed = 95,
  deleteSpeed = 70,
  holdPause = 1800,
  delay = 0,
  className,
  onWordChange,
}: RotatingTextProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"waiting" | "typing" | "deleting">(
    "waiting",
  );
  // Ref mirror so the timer callback never calls a stale closure.
  const onWordChangeRef = useRef(onWordChange);
  useEffect(() => {
    onWordChangeRef.current = onWordChange;
  }, [onWordChange]);

  useEffect(() => {
    const current = words[wordIndex];
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (phase === "waiting") {
      timer = setTimeout(() => setPhase("typing"), delay);
    } else if (phase === "typing") {
      if (text.length < current.length) {
        timer = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          typeSpeed,
        );
      } else {
        // Word fully typed — hold it, then start deleting
        timer = setTimeout(() => setPhase("deleting"), holdPause);
      }
    } else {
      // Deleting — shrink the displayed text one character at a time
      if (text.length > 0) {
        timer = setTimeout(() => setText(text.slice(0, -1)), deleteSpeed);
      } else {
        // Word fully deleted — advance to the next word
        timer = setTimeout(() => {
          const next = (wordIndex + 1) % words.length;
          setWordIndex(next);
          onWordChangeRef.current?.(next);
          setPhase("typing");
        }, 300);
      }
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [phase, text, wordIndex, words, typeSpeed, deleteSpeed, holdPause, delay]);

  return (
    <span
      className={cn("relative inline-block", className)}
      aria-label={words[wordIndex]}
    >
      <span aria-hidden>
        {text}
        {/* Blinking caret */}
        <span className="ml-0.5 inline-block h-[0.85em] w-[2px] translate-y-[0.08em] animate-pulse bg-current" />
      </span>
    </span>
  );
}

export default memo(RotatingText);



