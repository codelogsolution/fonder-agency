import styles from "./Showcase.module.css";
import { cn } from "@/lib/utils";

type ShowcaseCardProps = {
  eyebrow: string;
  title: string;
  note?: string;
  duration?: number;
  height?: number | string;
  top?: React.ReactNode;
  bottom?: React.ReactNode;
  children: React.ReactNode;
  frameClassName?: string;
  contentClassName?: string;
};

export default function ShowcaseCard({
  eyebrow,
  title,
  note = "",
  duration = 52,
  height = 510,
  top,
  bottom,
  children,
  frameClassName,
  contentClassName,
}: ShowcaseCardProps) {
  const windowHeight = typeof height === "number" ? `${height}px` : height;

  return (
    <article className={cn(styles.card, "group flex flex-col")} tabIndex={0} aria-label={`${title} — ${eyebrow} concept`}>
      <header className="mb-3 flex flex-1 flex-col items-center justify-end text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
        <h3 className="mt-1.5 text-lg font-extrabold tracking-tight">{title}</h3>
        <p className="mt-1 text-[11px] text-muted">{note}</p>
      </header>

      <div
        className={cn(
          "relative flex shrink-0 flex-col overflow-hidden rounded-[2rem] shadow-[0_30px_70px_-35px_rgba(2,6,23,0.45)]",
          frameClassName,
        )}
      >
        {top}
        <div className={cn(styles.viewport, contentClassName)} style={{ "--showcase-h": windowHeight } as React.CSSProperties}>
          <div className={styles.track} style={{ animationDuration: `${duration}s` }}>
            <div className={styles.copy}>{children}</div>
            <div aria-hidden="true" className={cn(styles.copy, styles.duplicate)}>
              {children}
            </div>
          </div>
        </div>
        {bottom}
      </div>
    </article>
  );
}

export function ShowcaseFallback({ cards = 3, height = 510 }: { cards?: number; height?: number }) {
  return (
    <section aria-hidden="true" className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto h-4 w-36 rounded-full bg-surface motion-safe:animate-pulse" />
        <div className="mx-auto mt-4 h-8 w-64 rounded-lg bg-surface motion-safe:animate-pulse" />
        <div className={cn("mt-12 grid gap-10 sm:gap-8", cards > 2 ? "sm:grid-cols-2 xl:grid-cols-3" : "lg:grid-cols-2")}>
          {Array.from({ length: cards }, (_, index) => (
            <div key={index} className="flex flex-col">
              <div className="mx-auto h-[66px] w-44 rounded-xl bg-surface motion-safe:animate-pulse" />
              <div className="mt-3 rounded-[2rem] bg-surface motion-safe:animate-pulse" style={{ height }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

