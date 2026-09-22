import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { getServicePreviewCopy, getServicePreviewItems, type ServicePreviewItem } from "@/config/site";
import Reveal from "@/components/motion/Reveal";
import ShowcaseCard from "@/components/sections/ShowcaseCard";
import DemoScreen from "./ServiceDemoScreen";

export default function ServicePreview({ slug }: { slug: string }) {
  const items = getServicePreviewItems(slug);
  const copy = getServicePreviewCopy(slug);
  if (!items.length) return null;

  return (
    <section aria-labelledby={`${slug}-previews`} className="relative overflow-hidden py-12 sm:py-16">
      <div
        aria-hidden
        className="absolute -top-24 left-1/2 h-72 w-[720px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{copy.eyebrow}</span>
            <h2 id={`${slug}-previews`} className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {copy.heading} <span className="text-primary">{copy.accent}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">{copy.description}</p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 sm:gap-8 xl:grid-cols-3">
          {items.map((item) => (
            <ShowcaseCard
              key={item.id}
              eyebrow={item.subtitle}
              title={item.title}
              note={copy.cardNote}
              duration={52}
              height={510}
              frameClassName="border border-slate-700/60 bg-[#0b0d14] text-white"
              contentClassName="bg-[#10131d]"
              top={<DemoBar item={item} />}
            >
              <DemoScreen item={item} />
            </ShowcaseCard>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            Start your project <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <p className="mt-10 text-center text-xs text-muted">
          Illustrative demo concepts — not live products or client results.
        </p>
      </div>
    </section>
  );
}

/* Window chrome above the scrolling viewport. */
function DemoBar({ item }: { item: ServicePreviewItem }) {
  return (
    <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-4 py-3">
      <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
      <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
      <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-emerald-300/70" />
      <span className="ml-2 flex min-w-0 flex-1 items-center gap-1.5 truncate rounded-md bg-black/25 px-2.5 py-1 font-mono text-[10px] text-white/60">
        <Lock aria-hidden="true" className="h-2.5 w-2.5 shrink-0 text-emerald-400/80" />
        {item.kind === "app" ? "9:41 · " : ""}
        {item.domain}
      </span>
    </div>
  );
}
