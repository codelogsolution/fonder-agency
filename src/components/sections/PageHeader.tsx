import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

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
        <Reveal delay={0.05}>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            {eyebrow}
          </span>
        </Reveal>
        <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
          <SplitText text={title} by="char" className="inline-block" />
        </h1>
        {description && (
          <Reveal delay={0.45}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {description}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
