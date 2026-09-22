import { Lock } from "lucide-react";
import ShowcaseCard from "@/components/sections/ShowcaseCard";
import DemoScreen from "@/components/sections/ServiceDemoScreen";
import { getServicePreviewItems } from "@/config/site";

export default function ServiceCard({ slug, height = 300 }: { slug: string; height?: number }) {
  const items = getServicePreviewItems(slug);
  const item = items[0];
  if (!item) return null;

  return (
    <ShowcaseCard
      eyebrow={item.subtitle}
      title={item.title}
      height={height}
      duration={52}
      frameClassName="border border-slate-700/60 bg-[#0b0d14] text-white"
      contentClassName="bg-[#10131d]"
      top={
        <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-4 py-3">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-emerald-300/70" />
          <span className="ml-2 flex min-w-0 flex-1 items-center gap-1.5 truncate rounded-md bg-black/25 px-2.5 py-1 font-mono text-[10px] text-white/60">
            <Lock aria-hidden="true" className="h-2.5 w-2.5 shrink-0 text-emerald-400/80" />
            {item.domain}
          </span>
        </div>
      }
    >
      <DemoScreen item={item} />
    </ShowcaseCard>
  );
}
