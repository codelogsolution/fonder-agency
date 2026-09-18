import Reveal from "@/components/motion/Reveal";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

/** Consistent page hero for interior routes (clears the fixed navbar). */
export default function PageHeader({
  eyebrow,
  title,
  description,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden pb-8 pt-36 sm:pt-44">
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            {eyebrow}
          </span>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {description}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
