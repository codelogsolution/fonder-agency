import type { ServicePreviewItem } from "@/config/site";
import styles from "./ServicePreview.module.css";

/** Illustrative screens: no external images, links, or client metrics. */
export default function DemoScreen({ item }: { item: ServicePreviewItem }) {
  return (
    <div className={`${styles.screen} space-y-6 bg-[#10131d] p-5 text-white`}>
      <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-white/60">
        <span>{item.title}</span><span>Concept / 01</span>
      </div>
      <h4 className={`text-3xl leading-tight ${item.kind === "content" ? "font-serif" : "font-bold"}`}>
        {item.entries[0]}
      </h4>
      {item.kind === "app" && (
        <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full border-[14px] border-emerald-300/80 bg-emerald-300/10">
          <div className="text-center"><span className="text-3xl font-bold">Today</span><p className="mt-1 text-xs text-emerald-200">A little progress</p></div>
        </div>
      )}
      {item.kind === "web" && (
        <div className="relative flex h-44 items-end overflow-hidden rounded-xl bg-amber-100 p-4 text-[#292419]">
          <div className="absolute right-6 top-5 h-32 w-24 rotate-12 rounded-t-full bg-amber-700/40" />
          <span className="relative text-2xl font-serif">Thoughtfully made.</span>
        </div>
      )}
      {item.kind === "seo" && (
        <div className="rounded-xl border border-white/10 p-4">
          <p className="text-xs text-white/60">Search visibility · sample data</p>
          <div aria-hidden="true" className="mt-4 flex h-28 items-end gap-2">
            {[25, 38, 30, 56, 48, 72, 85, 100].map((height, i) => <div key={i} className="flex-1 rounded-t bg-cyan-300/70" style={{ height: `${height}%` }} />)}
          </div>
        </div>
      )}
      {item.kind === "brand" && (
        <div className="space-y-4">
          <div className="rounded-xl bg-[#efe9dd] p-6 text-6xl font-serif text-[#262a25]">Aa.</div>
          <div className="flex h-16 overflow-hidden rounded-xl" aria-label="Palette: bone, moss, ember">
            <div className="flex-1 bg-[#efe9dd]" /><div className="flex-1 bg-[#7d8e76]" /><div className="flex-1 bg-[#c66e4f]" />
          </div>
        </div>
      )}
      {item.kind === "marketing" && (
        <div className="rounded-2xl bg-violet-200 p-5 text-violet-950">
          <p className="text-[10px] uppercase tracking-widest">A fresh perspective</p>
          <p className="my-5 text-4xl font-black leading-none">MAKE<br />ROOM<br />FOR MORE.</p>
          <span className="inline-block rounded-full bg-violet-950 px-4 py-2 text-xs text-white">Discover the story ↗</span>
        </div>
      )}
      {item.kind === "content" && (
        <div className="border-y border-white/20 py-5 font-serif text-lg leading-relaxed text-white/80">
          The most memorable stories start with a simple observation. A detail you almost missed. A question worth asking. This is where we begin.
        </div>
      )}
      <div className="space-y-3">
        {item.entries.slice(1).map((entry, index) => (
          <div key={entry} className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="mb-2 text-[10px] font-mono text-white/40">0{index + 1} / {item.subtitle}</p>
            <p className="text-sm leading-relaxed">{entry}</p>
          </div>
        ))}
      </div>
      <p className="text-center text-[10px] uppercase tracking-widest text-white/40">Fonder · illustrative concept</p>
    </div>
  );
}
