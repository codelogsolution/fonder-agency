import { Lock } from "lucide-react";
import type { ServicePreviewItem } from "@/config/site";

export default function DemoBar({ item }: { item: ServicePreviewItem }) {
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
