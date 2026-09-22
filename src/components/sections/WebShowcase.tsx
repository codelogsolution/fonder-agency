import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  CreditCard,
  Kanban,
  Lock,
  Mail,
  Users,
} from "lucide-react";
import { InstagramIcon } from "@/components/ui/BrandIcons";
import Reveal from "@/components/motion/Reveal";
import ShowcaseCard from "@/components/sections/ShowcaseCard";
import { cn } from "@/lib/utils";
import styles from "@/components/sections/Showcase.module.css";

export function BrowserBar({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-2.5">
      <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-red-400" />
      <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-amber-400" />
      <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
      <span className="ml-3 flex flex-1 items-center gap-1.5 truncate rounded-md bg-white px-3 py-1 font-mono text-[10px] text-slate-500 ring-1 ring-slate-200">
        <Lock aria-hidden className="h-2.5 w-2.5 text-emerald-500" />
        {url}
      </span>
    </div>
  );
}

function SiteNav({ brand, links, cta, dark }: { brand: string; links: string[]; cta: string; dark?: boolean }) {
  return (
    <div className={cn("flex items-center justify-between px-6 py-3.5", dark ? "bg-slate-900 text-white" : "bg-white text-slate-900")}>
      <span className="text-sm font-extrabold tracking-tight">
        {brand}
        <span className="text-sky-500">.</span>
      </span>
      <nav aria-hidden className="hidden items-center gap-5 text-[11px] sm:flex">
        {links.map((link) => (
          <span key={link} className={dark ? "text-white/60" : "text-slate-500"}>{link}</span>
        ))}
      </nav>
      <span className="rounded-full bg-sky-500 px-3 py-1.5 text-[10px] font-semibold text-white">{cta}</span>
    </div>
  );
}
function SiteHero({ slides, cta }: { slides: { tag: string; title: string; sub: string; bg: string }[]; cta: string }) {
  return (
    <div className="relative h-52">
      {slides.map((slide) => (
        <div key={slide.title} className={cn(styles.slide, "flex flex-col items-center justify-center px-8 text-center text-white", slide.bg)}>
          <span className="rounded-full bg-white/15 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] backdrop-blur">
            {slide.tag}
          </span>
          <p className="mt-3 text-xl font-extrabold leading-tight sm:text-2xl">{slide.title}</p>
          <p className="mt-1.5 max-w-md text-xs text-white/85">{slide.sub}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[11px] font-bold text-slate-900">
            {cta}
            <ArrowRight aria-hidden className="h-3 w-3" />
          </span>
        </div>
      ))}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {slides.map((slide) => (
          <span key={slide.title} aria-hidden className={cn(styles.dot, "h-1.5 w-5 rounded-full bg-white/90")} />
        ))}
      </div>
    </div>
  );
}

function SiteRail({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="py-5">
      <div className="flex items-center justify-between px-6">
        <h5 className="text-sm font-extrabold text-slate-900">{title}</h5>
        <span className="flex items-center gap-1 text-[10px] font-bold text-sky-600">
          View all <ArrowRight aria-hidden className="h-3 w-3" />
        </span>
      </div>
      <div className="mt-3 flex gap-3 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {children}
      </div>
    </div>
  );
}

function SiteFooter({ brand, columns }: { brand: string; columns: { heading: string; items: string[] }[] }) {
  return (
    <div className="bg-slate-900 px-6 pb-6 pt-8 text-white">
      <div className="flex flex-wrap justify-between gap-6">
        <div className="max-w-[180px]">
          <p className="text-sm font-extrabold tracking-tight">
            {brand}
            <span className="text-sky-500">.</span>
          </p>
          <p className="mt-2 text-[10px] leading-relaxed text-white/50">
            Crafted with care — fast, accessible and built to last.
          </p>
          <div className="mt-3 flex gap-2 text-white/50">
            <InstagramIcon className="h-3.5 w-3.5" />
            <Mail aria-hidden className="h-3.5 w-3.5" />
          </div>
        </div>
        {columns.map((column) => (
          <div key={column.heading} aria-hidden>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">{column.heading}</p>
            <ul className="mt-2 space-y-1.5 text-[10px] text-white/50">
              {column.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-6 border-t border-white/10 pt-4 text-center text-[9px] text-white/40">
        © 2026 {brand} · Concept demo · Privacy · Terms
      </p>
    </div>
  );
}

export function AureliaPage() {
  const products = [
    { emoji: "🧴", name: "Glow serum", price: "$38", tint: "bg-amber-50" },
    { emoji: "🧣", name: "Linen scarf", price: "$52", tint: "bg-rose-50" },
    { emoji: "🕯️", name: "Cedar candle", price: "$24", tint: "bg-orange-50" },
    { emoji: "🍵", name: "Ceramic mug", price: "$19", tint: "bg-emerald-50" },
    { emoji: "👜", name: "Tote bag", price: "$64", tint: "bg-sky-50" },
    { emoji: "🧺", name: "Waffle towel", price: "$29", tint: "bg-stone-100" },
  ];

  return (
    <div className="bg-white text-slate-900">
      <SiteNav brand="AURELIA" links={["Shop", "Journal", "About"]} cta="Cart · 2" />
      <SiteHero
        cta="Shop now"
        slides={[
          { tag: "New season", title: "Everyday rituals. Beautifully made.", sub: "Small-batch essentials for slower mornings and softer evenings.", bg: "bg-gradient-to-br from-amber-600 to-rose-500" },
          { tag: "Bestsellers", title: "The everyday essential", sub: "Our linen collection, back in four earth tones.", bg: "bg-gradient-to-br from-stone-700 to-amber-700" },
          { tag: "Journal", title: "Made with intention", sub: "Inside the studios shaping our new collection.", bg: "bg-gradient-to-br from-rose-600 to-orange-500" },
        ]}
      />
      <SiteRail title="The everyday edit">
        {products.map((product) => (
          <div key={product.name} className="w-32 shrink-0 overflow-hidden rounded-xl border border-slate-200">
            <span className={cn("flex h-20 items-center justify-center text-3xl", product.tint)}>{product.emoji}</span>
            <div className="p-2.5">
              <p className="text-[11px] font-bold">{product.name}</p>
              <p className="text-[10px] font-semibold text-slate-500">{product.price}</p>
            </div>
          </div>
        ))}
      </SiteRail>
      <div className="border-t border-slate-100 px-6 py-6">
        <p className="text-sm font-extrabold">Shop by collection</p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {[
            { name: "Morning ritual", items: "24 pieces", tint: "from-amber-200 to-rose-100" },
            { name: "Slow evenings", items: "18 pieces", tint: "from-stone-200 to-amber-100" },
            { name: "Soft textures", items: "31 pieces", tint: "from-rose-100 to-orange-100" },
            { name: "Table & kitchen", items: "27 pieces", tint: "from-emerald-100 to-amber-50" },
          ].map((collection) => (
            <div key={collection.name} className={cn("rounded-xl bg-gradient-to-br p-4", collection.tint)}>
              <p className="text-xs font-bold text-slate-900">{collection.name}</p>
              <p className="mt-0.5 text-[10px] text-slate-600">{collection.items}</p>
              <span className="mt-2 inline-block text-[10px] font-bold text-slate-700 underline underline-offset-2">Explore</span>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-slate-100 px-6 py-6">
        <div className="grid grid-cols-2 items-center gap-4">
          <div className="h-28 rounded-xl bg-gradient-to-br from-amber-100 to-rose-100" aria-hidden />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-amber-700">Our story</p>
            <p className="mt-1.5 text-sm font-extrabold leading-snug">Made with intention, worn every day.</p>
            <p className="mt-1.5 text-[10px] leading-relaxed text-slate-500">
              We work with six family-run studios across three countries — small batches, natural materials, fair prices.
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-100 px-6 py-6 text-center">
        <p className="mx-auto max-w-sm text-sm font-serif italic leading-relaxed text-slate-700">
          “The kind of shop you trust with your whole wardrobe — everything just works together.”
        </p>
        <p className="mt-2 text-[9px] font-semibold uppercase tracking-widest text-slate-400">4.9★ · 12k reviews</p>
        <div className="mx-auto mt-4 flex max-w-xs items-center gap-2 rounded-full border border-slate-200 p-1 pl-4">
          <span className="flex-1 text-left text-[10px] text-slate-400">Email for 10% off</span>
          <span className="rounded-full bg-slate-900 px-3 py-1.5 text-[10px] font-bold text-white">Join</span>
        </div>
      </div>

      <SiteFooter
        brand="AURELIA"
        columns={[
          { heading: "Shop", items: ["New in", "Bestsellers", "Sale"] },
          { heading: "Help", items: ["Shipping", "Returns", "Contact"] },
          { heading: "About", items: ["Our story", "Studios", "Journal"] },
        ]}
      />
    </div>
  );
}

export function OrbitPage() {
  const steps = [
    { icon: Kanban, name: "Plan", desc: "Boards & sprints", tint: "bg-sky-50 text-sky-600" },
    { icon: Users, name: "Assign", desc: "Balanced workloads", tint: "bg-violet-50 text-violet-600" },
    { icon: BarChart3, name: "Track", desc: "Live dashboards", tint: "bg-emerald-50 text-emerald-600" },
    { icon: CreditCard, name: "Bill", desc: "Time & invoices", tint: "bg-amber-50 text-amber-600" },
  ];
  const plans = [
    { name: "Starter", price: "$0", meta: "Up to 5 seats", features: ["Kanban boards", "Basic reports"], hot: false },
    { name: "Team", price: "$12", meta: "per seat / month", features: ["Everything in Starter", "Automation & API"], hot: true },
    { name: "Scale", price: "$29", meta: "per seat / month", features: ["Advanced insights", "SSO & audit log"], hot: false },
  ];

  return (
    <div className="bg-white text-slate-900">
      <SiteNav brand="Orbit" links={["Product", "Pricing", "Docs"]} cta="Start free" />
      <SiteHero
        cta="Get started"
        slides={[
          { tag: "Platform", title: "Less busywork. More momentum.", sub: "One workspace for planning, tracking and shipping your team's work.", bg: "bg-gradient-to-br from-sky-600 to-indigo-600" },
          { tag: "Automation", title: "Plan the week in minutes", sub: "Auto-scheduling that balances workload across the whole team.", bg: "bg-gradient-to-br from-indigo-600 to-violet-600" },
          { tag: "Insights", title: "See the bigger picture", sub: "Live dashboards on velocity, spend and delivery risk.", bg: "bg-gradient-to-br from-violet-600 to-fuchsia-600" },
        ]}
      />
      <SiteRail title="How it works">
        {steps.map((step) => (
          <div key={step.name} className="w-36 shrink-0 rounded-xl border border-slate-200 p-3 text-center">
            <span className={cn("mx-auto flex h-9 w-9 items-center justify-center rounded-xl", step.tint)}>
              <step.icon aria-hidden className="h-4 w-4" />
            </span>
            <p className="mt-2 text-[11px] font-bold">{step.name}</p>
            <p className="text-[9px] text-slate-500">{step.desc}</p>
          </div>
        ))}
      </SiteRail>
      <div className="border-t border-slate-100 px-6 py-6">
        <p className="text-center text-[10px] font-bold uppercase tracking-widest text-sky-600">Live inside Orbit</p>
        <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
          <div className="flex">
            <div className="w-16 border-r border-slate-200 bg-white p-2.5" aria-hidden>
              {["Home", "Board", "Reports", "Team"].map((item, i) => (
                <p key={item} className={cn("mb-2 rounded px-1.5 py-1 text-[8px]", i === 1 ? "bg-sky-100 font-bold text-sky-700" : "text-slate-400")}>{item}</p>
              ))}
            </div>
            <div className="flex-1 p-3">
              <div className="grid grid-cols-3 gap-2">
                {[["Velocity", "42 pts"], ["On track", "87%"], ["Spend", "$4.2k"]].map(([label, value]) => (
                  <div key={label} className="rounded-lg bg-white p-2 ring-1 ring-slate-200">
                    <p className="text-[8px] text-slate-400">{label}</p>
                    <p className="text-xs font-extrabold text-slate-900">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex h-16 items-end gap-1.5 rounded-lg bg-white p-2 ring-1 ring-slate-200" aria-hidden>
                {[40, 65, 50, 80, 62, 90, 74, 96, 68, 84].map((height, i) => (
                  <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-sky-500/40 to-sky-400/80" style={{ height: `${height}%` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-100 px-6 py-6">
        <p className="text-center text-sm font-extrabold">Simple, honest pricing</p>
        <div className="mt-3 grid grid-cols-3 gap-2.5">
          {plans.map((plan) => (
            <div key={plan.name} className={cn("rounded-xl border p-3 text-center", plan.hot ? "border-sky-400 bg-sky-50/60 ring-1 ring-sky-300" : "border-slate-200")}>
              {plan.hot && <p className="mb-1 text-[8px] font-bold uppercase tracking-widest text-sky-600">Most popular</p>}
              <p className="text-[10px] font-bold text-slate-700">{plan.name}</p>
              <p className="mt-1 text-lg font-extrabold text-slate-900">{plan.price}</p>
              <p className="text-[8px] text-slate-400">{plan.meta}</p>
              <ul className="mt-2 space-y-1" aria-hidden>
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-1 text-[8px] text-slate-500">
                    <CheckCircle2 className="h-2.5 w-2.5 text-emerald-500" /> {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="px-6 py-6">
        <div className="flex items-center justify-between rounded-xl bg-slate-900 px-4 py-3 text-white">
          <p className="text-xs font-semibold">Ready to orbit?</p>
          <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-slate-900">
            <CheckCircle2 aria-hidden className="h-3 w-3 text-emerald-500" />
            Free 14-day trial
          </span>
        </div>
      </div>

      <SiteFooter
        brand="Orbit"
        columns={[
          { heading: "Product", items: ["Features", "Pricing", "Changelog"] },
          { heading: "Company", items: ["About", "Careers", "Blog"] },
          { heading: "Support", items: ["Docs", "Status", "Contact"] },
        ]}
      />
    </div>
  );
}

const siteCards = [
  {
    id: "aurelia",
    eyebrow: "E-commerce storefront",
    title: "Aurelia",
    url: "aurelia-store.com",
    page: <AureliaPage />,
  },
  {
    id: "orbit",
    eyebrow: "SaaS landing page",
    title: "Orbit",
    url: "orbit-app.io",
    page: <OrbitPage />,
  },
];

export default function WebShowcase() {
  return (
    <section aria-labelledby="web-showcase" className="relative overflow-hidden py-12 sm:py-16">
      <div
        aria-hidden
        className="absolute -top-24 left-1/2 h-72 w-[720px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Inside the work</span>
            <h2 id="web-showcase" className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              What we build, <span className="text-primary">in action</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">
              Two complete website concepts — from header to footer — scrolling slowly inside the
              browser. Hover a card to pause and explore every section.
            </p>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-10 sm:gap-8 lg:grid-cols-2">
          {siteCards.map((site) => (
            <ShowcaseCard
              key={site.id}
              eyebrow={site.eyebrow}
              title={site.title}
              duration={80}
              height={520}
              frameClassName="rounded-2xl border border-slate-200 bg-white"
              top={<BrowserBar url={site.url} />}
            >
              {site.page}
            </ShowcaseCard>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-muted">
          Illustrative demo concepts — not live products or client results.
        </p>
      </div>
    </section>
  );
}

