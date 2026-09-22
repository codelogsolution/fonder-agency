import type { ServicePreviewItem } from "@/config/site";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  BarChart3,
  Calendar,
  Check,
  Clock,
  Eye,
  Layers,
  Mail,
  Palette,
  PenLine,
  Quote,
  Search,
  Star,
  Target,
  Type,
  Users,
} from "lucide-react";

type Tone = "cyan" | "violet" | "amber" | "emerald" | "rose" | "slate";

const TONES: Record<Tone, { text: string; bg: string; border: string; fill: string }> = {
  cyan: { text: "text-cyan-300", bg: "bg-cyan-400/15", border: "border-cyan-400/30", fill: "from-cyan-400 to-sky-300" },
  violet: { text: "text-violet-300", bg: "bg-violet-400/15", border: "border-violet-400/30", fill: "from-violet-500 to-fuchsia-400" },
  amber: { text: "text-amber-300", bg: "bg-amber-400/15", border: "border-amber-400/30", fill: "from-amber-400 to-orange-300" },
  emerald: { text: "text-emerald-300", bg: "bg-emerald-400/15", border: "border-emerald-400/30", fill: "from-emerald-400 to-teal-300" },
  rose: { text: "text-rose-300", bg: "bg-rose-400/15", border: "border-rose-400/30", fill: "from-rose-400 to-pink-300" },
  slate: { text: "text-white/60", bg: "bg-white/10", border: "border-white/15", fill: "from-slate-400 to-slate-300" },
};

function Head({ label, meta }: { label: string; meta: string }) {
  return (
    <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-white/45">
      <span>{label}</span>
      <span className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
        {meta}
      </span>
    </div>
  );
}

function Headline({ children, serif }: { children: React.ReactNode; serif?: boolean }) {
  return (
    <h4 className={cn("text-2xl leading-tight", serif ? "font-serif" : "font-bold tracking-tight")}>{children}</h4>
  );
}

function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("rounded-2xl border border-white/10 bg-white/[0.04] p-4", className)}>{children}</div>;
}

function Chip({ children, tone = "slate" }: { children: React.ReactNode; tone?: Tone }) {
  const t = TONES[tone];
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold", t.border, t.bg, t.text)}>
      {children}
    </span>
  );
}

function Stat({ label, value, delta, tone = "emerald", icon }: { label: string; value: string; delta?: string; tone?: Tone; icon?: React.ReactNode }) {
  const t = TONES[tone];
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-white/45">
        <span>{label}</span>
        {icon}
      </div>
      <p className="mt-2 text-xl font-bold tracking-tight">{value}</p>
      {delta ? (
        <p className={cn("mt-0.5 flex items-center gap-0.5 text-[10px] font-semibold", t.text)}>
          <ArrowUpRight aria-hidden="true" className="h-3 w-3" />
          {delta}
        </p>
      ) : null}
    </div>
  );
}

function Rows({ items, tone = "slate" }: { items: string[]; tone?: Tone }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-xs text-white/85">
          <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", TONES[tone].text.replace("text-", "bg-"))} aria-hidden="true" />
          <span className="truncate">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function AreaChart({ tone = "cyan" }: { tone?: Tone }) {
  const points = [16, 24, 20, 33, 29, 42, 38, 54, 60, 68, 63, 79];
  const line = points.map((p, i) => `${(i / (points.length - 1)) * 100},${100 - p}`).join(" ");
  const fillId = `demo-area-${tone}`;
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-24 w-full" aria-hidden="true">
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.5" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,100 ${line} 100,100`} fill={`url(#${fillId})`} className={TONES[tone].text} />
      <polyline
        points={line}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        className={TONES[tone].text}
      />
    </svg>
  );
}

/* ---------------------------------- SEO ---------------------------------- */

function SeoScreen({ item, index }: { item: ServicePreviewItem; index: number }) {
  const [, ...rest] = item.entries;

  if (index === 1) {
    return (
      <div className="space-y-5 p-5 text-white">
        <Head label={item.subtitle} meta="Audit complete" />
        <Headline>{item.entries[0]}</Headline>
        <Panel className="flex items-center gap-4">
          <div className="relative grid h-20 w-20 shrink-0 place-items-center rounded-full border-[6px] border-emerald-400/25 border-t-emerald-300">
            <span className="text-lg font-bold">88</span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold">Health score</p>
            <p className="mt-1 text-[11px] text-white/55">No critical issues · 4 checks to review</p>
          </div>
        </Panel>
        <ul className="space-y-2">
          {rest.map((entry, i) => (
            <li key={entry} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
              <span className="truncate text-xs text-white/85">{entry}</span>
              <span className="flex shrink-0 items-center gap-1 text-[10px] font-semibold text-emerald-300">
                {i === 3 ? <Clock aria-hidden="true" className="h-3 w-3" /> : <Check aria-hidden="true" className="h-3 w-3" />}
                {i === 3 ? "Queued" : "Pass"}
              </span>
            </li>
          ))}
        </ul>
        <Panel>
          <div className="flex items-center gap-2 text-[11px] text-white/60">
            <Search aria-hidden="true" className="h-3.5 w-3.5 text-emerald-300" />
            Crawl coverage
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-emerald-400 to-teal-300" />
          </div>
        </Panel>
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className="space-y-5 p-5 text-white">
        <Head label={item.subtitle} meta="Planning board" />
        <Headline>{item.entries[0]}</Headline>
        <div className="rounded-2xl border border-violet-400/30 bg-violet-400/10 p-4">
          <p className="text-[10px] uppercase tracking-[0.18em] text-violet-200/80">Pillar</p>
          <p className="mt-1 text-sm font-semibold">{rest[0]}</p>
        </div>
        <div className="space-y-2 border-l border-dashed border-white/20 pl-4">
          {rest.slice(1, 3).map((entry) => (
            <div key={entry} className="relative rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-xs text-white/85">
              <span className="absolute -left-[21px] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-violet-300" aria-hidden="true" />
              {entry}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <Chip tone="cyan">
            <Search aria-hidden="true" className="h-3 w-3" />
            Informational
          </Chip>
          <Chip tone="violet">Commercial</Chip>
          <Chip tone="amber">Local</Chip>
        </div>
        <Panel className="border-violet-400/30">
          <p className="flex items-center gap-2 text-[11px] text-white/60">
            <PenLine aria-hidden="true" className="h-3.5 w-3.5 text-violet-300" />
            Next brief
          </p>
          <p className="mt-2 text-sm font-semibold text-violet-200">{rest[3]}</p>
        </Panel>
      </div>
    );
  }

  return (
    <div className="space-y-5 p-5 text-white">
      <Head label={item.subtitle} meta="Last 30 days" />
      <Headline>{item.entries[0]}</Headline>
      <div className="grid grid-cols-2 gap-3">
        <Stat label="Impressions" value="248k" delta="+18.4%" tone="cyan" icon={<Eye aria-hidden="true" className="h-3.5 w-3.5" />} />
        <Stat label="Clicks" value="14.2k" delta="+9.1%" tone="emerald" icon={<BarChart3 aria-hidden="true" className="h-3.5 w-3.5" />} />
      </div>
      <Panel>
        <AreaChart tone="cyan" />
      </Panel>
      <div>
        <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-white/45">Queries in focus</p>
        <Rows items={rest} tone="cyan" />
      </div>
    </div>
  );
}

/* -------------------------------- Branding -------------------------------- */

function BrandScreen({ item, index }: { item: ServicePreviewItem; index: number }) {
  const [, ...rest] = item.entries;

  if (index === 1) {
    return (
      <div className="space-y-5 p-5 text-white">
        <Head label={item.subtitle} meta="Guidelines" />
        <div className="rounded-2xl bg-gradient-to-br from-amber-300 via-rose-300 to-amber-500 p-6 text-[#2b1a10]">
          <Headline serif>{item.entries[0]}</Headline>
        </div>
        <div>
          <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-white/45">Colour with character</p>
          <div className="grid grid-cols-4 gap-2">
            {["from-amber-200 to-amber-400", "from-rose-300 to-rose-500", "from-orange-300 to-red-400", "from-stone-300 to-stone-500"].map(
              (gradient) => (
                <div key={gradient} className={cn("h-14 rounded-xl bg-gradient-to-b", gradient)} aria-hidden="true" />
              ),
            )}
          </div>
        </div>
        <div className="space-y-3">
          {rest.map((entry) => (
            <div key={entry} className="flex items-center justify-between gap-3 text-xs text-white/80">
              <span className="truncate">{entry}</span>
              <span className="relative h-1.5 w-20 shrink-0 overflow-hidden rounded-full bg-white/12" aria-hidden="true">
                <span className="absolute inset-y-0 left-0 w-3/4 rounded-full bg-amber-300" />
              </span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-20 rounded-xl border border-white/10 bg-gradient-to-br from-amber-400/25 to-rose-400/10" aria-hidden="true" />
          ))}
        </div>
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className="space-y-5 p-5 text-white">
        <Head label={item.subtitle} meta="Design system" />
        <Headline>{item.entries[0]}</Headline>
        <Panel>
          <p className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/45">
            <Type aria-hidden="true" className="h-3.5 w-3.5" />
            Type scale
          </p>
          <p className="text-2xl font-extrabold tracking-tight">Display 32</p>
          <p className="mt-1 text-lg font-bold">Heading 18</p>
          <p className="mt-1 text-sm text-white/80">Body 14 — the everyday reading size</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/45">Caption 10</p>
        </Panel>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-emerald-400 p-3 text-center text-[11px] font-bold text-[#04120c]">Primary</div>
          <div className="rounded-xl border border-white/20 p-3 text-center text-[11px] font-bold">Secondary</div>
        </div>
        <Rows items={rest} tone="emerald" />
      </div>
    );
  }

  return (
    <div className="space-y-5 p-5 text-white">
      <Head label={item.subtitle} meta="Identity" />
      <Headline>{item.entries[0]}</Headline>
      <Panel className="grid place-items-center py-8">
        <div className="relative grid h-24 w-24 place-items-center rounded-full border border-dashed border-white/25">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-primary to-cyan-400 text-lg font-black text-white">
            N
          </span>
          <span className="absolute -bottom-5 text-[9px] uppercase tracking-[0.18em] text-white/40">Clear space</span>
        </div>
      </Panel>
      <div>
        <p className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/45">
          <Palette aria-hidden="true" className="h-3.5 w-3.5" />
          Signature palette
        </p>
        <div className="flex gap-2">
          {["bg-[#0b5cff]", "bg-[#0f172a]", "bg-[#e2e8f0]", "bg-[#22d3ee]", "bg-[#f97316]"].map((swatch) => (
            <div key={swatch} className={cn("h-12 flex-1 rounded-lg ring-1 ring-white/10", swatch)} aria-hidden="true" />
          ))}
        </div>
      </div>
      <Rows items={rest} tone="cyan" />
    </div>
  );
}


/* -------------------------------- Marketing ------------------------------- */

function MarketingScreen({ item, index }: { item: ServicePreviewItem; index: number }) {
  const [, ...rest] = item.entries;

  if (index === 1) {
    return (
      <div className="space-y-5 p-5 text-white">
        <Head label={item.subtitle} meta="4 emails live" />
        <Headline>{item.entries[0]}</Headline>
        <Panel className="border-rose-400/30 bg-rose-400/10">
          <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-rose-200/80">
            <Mail aria-hidden="true" className="h-3.5 w-3.5" />
            Welcome flow
          </p>
          <p className="mt-2 text-sm font-semibold">New subscriber → first purchase</p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/12">
            <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-rose-400 to-pink-300" />
          </div>
          <p className="mt-2 text-[10px] text-white/55">62% reached the final step</p>
        </Panel>
        <ol className="space-y-2">
          {rest.map((entry, i) => (
            <li key={entry} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-rose-400/40 bg-rose-400/15 text-[10px] font-bold text-rose-200">
                {i + 1}
              </span>
              <span className="truncate text-xs text-white/85">{entry}</span>
            </li>
          ))}
        </ol>
        <div className="grid grid-cols-2 gap-3">
          <Stat label="Open rate" value="48%" delta="+6.2%" tone="rose" />
          <Stat label="Click rate" value="9.4%" delta="+1.8%" tone="amber" />
        </div>
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className="space-y-5 p-5 text-white">
        <Head label={item.subtitle} meta="This week" />
        <Headline>{item.entries[0]}</Headline>
        <Panel>
          <p className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/45">
            <Calendar aria-hidden="true" className="h-3.5 w-3.5" />
            Publishing plan
          </p>
          <div className="space-y-3">
            {rest.map((entry, i) => (
              <div key={entry}>
                <div className="flex items-center justify-between text-[11px] text-white/75">
                  <span className="truncate">{entry}</span>
                  <span className="shrink-0 text-white/45">{["60%", "75%", "40%", "90%"][i]}</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/12">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-400"
                    style={{ width: ["60%", "75%", "40%", "90%"][i] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Panel>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Organic", value: "42%", tone: "violet" as Tone },
            { label: "Paid", value: "35%", tone: "amber" as Tone },
            { label: "Email", value: "23%", tone: "cyan" as Tone },
          ].map((channel) => (
            <div key={channel.label} className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-center">
              <p className={cn("text-base font-bold", TONES[channel.tone].text)}>{channel.value}</p>
              <p className="mt-0.5 text-[10px] text-white/50">{channel.label}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 p-5 text-white">
      <Head label={item.subtitle} meta="Running" />
      <div className="rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-amber-400 p-6">
        <Headline>{item.entries[0]}</Headline>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Stat label="Reach" value="1.2M" delta="+24%" tone="violet" icon={<Users aria-hidden="true" className="h-3.5 w-3.5" />} />
        <Stat label="Engagement" value="7.8%" delta="+2.4%" tone="amber" icon={<Target aria-hidden="true" className="h-3.5 w-3.5" />} />
      </div>
      <div>
        <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-white/45">{rest[0]}</p>
        <Panel className="flex items-center gap-3 border-violet-400/30">
          <Layers aria-hidden="true" className="h-5 w-5 shrink-0 text-violet-300" />
          <p className="text-xs text-white/85">{rest[1]}</p>
        </Panel>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {rest.slice(2).map((creative, i) => (
          <div key={creative} className="overflow-hidden rounded-xl border border-white/10">
            <div
              className={cn(
                "h-20 bg-gradient-to-br",
                i === 0 ? "from-violet-500/60 to-fuchsia-400/30" : "from-amber-400/50 to-rose-400/30",
              )}
              aria-hidden="true"
            />
            <p className="truncate px-3 py-2.5 text-[11px] text-white/80">{creative}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


/* --------------------------------- Content -------------------------------- */

function ContentScreen({ item, index }: { item: ServicePreviewItem; index: number }) {
  const [, ...rest] = item.entries;

  if (index === 1) {
    return (
      <div className="space-y-5 p-5 text-white">
        <Head label={item.subtitle} meta="Draft v3" />
        <Headline>{item.entries[0]}</Headline>
        {rest.map((entry, i) => (
          <div key={entry} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/40">
              {["Problem", "Solution", "Proof", "Next step"][i]}
            </p>
            <p className="mt-1.5 text-sm text-white/85">{entry}</p>
          </div>
        ))}
        <div className="flex items-center justify-between rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3">
          <span className="text-xs font-semibold text-emerald-200">Conversion-ready</span>
          <Check aria-hidden="true" className="h-4 w-4 text-emerald-300" />
        </div>
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className="space-y-5 p-5 text-white">
        <Head label={item.subtitle} meta="Issue #24" />
        <Headline>{item.entries[0]}</Headline>
        <Panel className="border-cyan-400/30 bg-cyan-400/10">
          <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-cyan-200/80">
            <Mail aria-hidden="true" className="h-3.5 w-3.5" />
            Subject line
          </p>
          <p className="mt-2 text-sm font-semibold">{rest[0]}</p>
          <p className="mt-1 truncate text-[11px] text-white/55">Preview · {rest[1]}</p>
        </Panel>
        <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs leading-relaxed text-white/80">{rest[2]}</p>
          <div className="h-px bg-white/10" />
          <p className="text-xs leading-relaxed text-white/60">{rest[3]}</p>
        </div>
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-white/40">
          <span>Past issues</span>
          <span className="flex items-center gap-1.5">
            <Star aria-hidden="true" className="h-3 w-3 text-cyan-300" />
            4.8 average
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {["#21", "#22", "#23"].map((issue) => (
            <div key={issue} className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center text-xs font-semibold text-white/70">
              {issue}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 p-5 text-white">
      <Head label={item.subtitle} meta="Published" />
      <h4 className="font-serif text-2xl leading-tight">{item.entries[0]}</h4>
      <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.16em] text-white/45">
        <span className="flex items-center gap-1.5">
          <Clock aria-hidden="true" className="h-3 w-3" />
          7 min read
        </span>
        <span className="flex items-center gap-1.5">
          <Eye aria-hidden="true" className="h-3 w-3" />
          12.4k readers
        </span>
      </div>
      <div className="h-32 rounded-2xl bg-gradient-to-br from-slate-700/60 to-cyan-500/20" aria-hidden="true" />
      <div className="space-y-3 text-xs leading-relaxed text-white/75">
        {rest.slice(0, 2).map((entry) => (
          <p key={entry}>{entry}</p>
        ))}
      </div>
      <blockquote className="rounded-2xl border-l-2 border-cyan-300 bg-white/[0.04] p-4">
        <Quote aria-hidden="true" className="h-4 w-4 text-cyan-300" />
        <p className="mt-2 font-serif text-sm italic text-white/85">{rest[2]}</p>
      </blockquote>
      <p className="text-xs leading-relaxed text-white/70">{rest[3]}</p>
    </div>
  );
}

/* ------------------------------- Public entry ------------------------------ */

export default function DemoScreen({ item }: { item: ServicePreviewItem }) {
  const index = Number(item.id.slice(item.id.lastIndexOf("-") + 1)) || 0;

  switch (item.kind) {
    case "seo":
      return <SeoScreen item={item} index={index} />;
    case "brand":
      return <BrandScreen item={item} index={index} />;
    case "marketing":
      return <MarketingScreen item={item} index={index} />;
    case "content":
      return <ContentScreen item={item} index={index} />;
    default:
      return (
        <div className="space-y-5 p-5 text-white">
          <Head label={item.subtitle} meta="Concept" />
          <Headline>{item.entries[0]}</Headline>
          <Rows items={item.entries.slice(1)} />
        </div>
      );
  }
}

