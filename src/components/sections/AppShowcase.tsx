import {
  Activity,
  Bike,
  ChevronRight,
  Clock,
  Coffee,
  Dumbbell,
  Flame,
  Heart,
  Home,
  Moon,
  Plus,
  Search,
  ShoppingBag,
  Star,
  Timer,
  TrendingUp,
  User,
} from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import ShowcaseCard from "@/components/sections/ShowcaseCard";
import { cn } from "@/lib/utils";
import styles from "@/components/sections/Showcase.module.css";



export function StatusBar() {
  return (
    <div className="relative flex items-center justify-between px-6 pb-1 pt-3 text-[10px] font-semibold text-white/80">
      <span>9:41</span>
      <span aria-hidden className="absolute left-1/2 top-1.5 h-5 w-24 -translate-x-1/2 rounded-full bg-slate-900" />
      <span className="flex items-center gap-1">
        <Activity aria-hidden className="h-3 w-3" />
        5G
        <span className="ml-1 inline-block h-2 w-4 rounded-[3px] border border-white/50 px-[1px]">
          <span className="block h-full w-3/4 rounded-[1px] bg-white/80" />
        </span>
      </span>
    </div>
  );
}

export function TabBar({ items, active }: { items: { icon: React.ElementType; label: string }[]; active: number }) {
  return (
    <div className="flex items-center justify-around border-t border-white/10 bg-[#0f1220] px-4 py-3">
      {items.map((item, index) => (
        <span
          key={item.label}
          aria-hidden
          className={cn("flex flex-col items-center gap-1 text-[9px]", index === active ? "text-white" : "text-white/40")}
        >
          <span className={cn("flex h-8 w-8 items-center justify-center rounded-xl", index === active && "bg-white/10")}>
            <item.icon className="h-4 w-4" />
          </span>
          {item.label}
        </span>
      ))}
    </div>
  );
}


function AppHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between px-5 pb-3 pt-4">
      <div>
        <p className="text-[10px] uppercase tracking-widest text-white/50">Welcome back</p>
        <h4 className="text-lg font-bold">{title}</h4>
      </div>
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
        <User aria-hidden className="h-4 w-4" />
      </span>
    </div>
  );
}

function HeroSlides({ slides }: { slides: { badge: string; title: string; sub: string; bg: string }[] }) {
  return (
    <div className="relative mx-4 h-40 overflow-hidden rounded-2xl">
      {slides.map((slide) => (
        <div key={slide.title} className={cn(styles.slide, "flex flex-col justify-end p-4", slide.bg)}>
          <span className="absolute left-4 top-4 rounded-full bg-black/25 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-widest text-white backdrop-blur">
            {slide.badge}
          </span>
          <p className="text-lg font-extrabold leading-snug">{slide.title}</p>
          <p className="mt-0.5 text-xs text-white/80">{slide.sub}</p>
        </div>
      ))}
      <div className="absolute bottom-3 right-4 flex gap-1.5">
        {slides.map((slide) => (
          <span key={slide.title} aria-hidden className={cn(styles.dot, "h-1.5 w-4 rounded-full bg-white/90")} />
        ))}
      </div>
    </div>
  );
}

function CardRail({ title, action, children }: { title: string; action?: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <div className="flex items-center justify-between px-5">
        <h5 className="text-sm font-bold">{title}</h5>
        {action && (
          <span className="flex items-center gap-0.5 text-[10px] font-semibold text-sky-300">
            {action}
            <ChevronRight aria-hidden className="h-3 w-3" />
          </span>
        )}
      </div>
      <div className="mt-3 flex gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {children}
      </div>
    </div>
  );
}


export function PulseFitScreen() {
  const workouts = [
    { icon: Dumbbell, name: "HIIT Blast", meta: "24 min · 320 kcal", tint: "bg-rose-400/20 text-rose-300" },
    { icon: Bike, name: "Cycle Sprint", meta: "30 min · 280 kcal", tint: "bg-emerald-400/20 text-emerald-300" },
    { icon: Heart, name: "Yoga Flow", meta: "18 min · 110 kcal", tint: "bg-violet-400/20 text-violet-300" },
    { icon: Timer, name: "Core Burner", meta: "15 min · 180 kcal", tint: "bg-amber-400/20 text-amber-300" },
  ];
  const days = [
    { d: "M", v: 60 }, { d: "T", v: 85 }, { d: "W", v: 45 }, { d: "T", v: 95 },
    { d: "F", v: 70 }, { d: "S", v: 40 }, { d: "S", v: 20 },
  ];
  const plan = [
    { icon: Dumbbell, title: "Upper body strength", meta: "Tomorrow · 6:30 AM", tint: "bg-rose-400/15 text-rose-300" },
    { icon: Bike, title: "Recovery ride", meta: "Wed · easy pace 30 min", tint: "bg-emerald-400/15 text-emerald-300" },
    { icon: Heart, title: "Mobility & stretch", meta: "Fri · 18 minutes", tint: "bg-violet-400/15 text-violet-300" },
    { icon: Moon, title: "Wind-down walk", meta: "Sun · 8,000 steps goal", tint: "bg-sky-400/15 text-sky-300" },
  ];

  return (
    <div className="pb-4 text-white">
      <AppHeader title="Alex, ready to move?" />

      <div className="mt-1 flex items-center gap-4 px-5">
        <div
          className="relative flex h-24 w-24 items-center justify-center rounded-full"
          style={{ background: "conic-gradient(#fb7185 0% 78%, rgba(255,255,255,0.08) 78% 100%)" }}
        >
          <div className="flex h-[76px] w-[76px] flex-col items-center justify-center rounded-full bg-[#0f1220] text-center">
            <span className="text-lg font-extrabold">6,240</span>
            <span className="text-[9px] text-white/50">of 8,000 steps</span>
          </div>
        </div>
        <div className="space-y-2">
          <p className="flex items-center gap-1.5 text-xs text-white/70">
            <Flame aria-hidden className="h-3.5 w-3.5 text-orange-400" /> 412 kcal burned
          </p>
          <p className="flex items-center gap-1.5 text-xs text-white/70">
            <Timer aria-hidden className="h-3.5 w-3.5 text-sky-300" /> 46 active minutes
          </p>
          <p className="flex items-center gap-1.5 text-xs text-white/70">
            <Heart aria-hidden className="h-3.5 w-3.5 text-rose-400" /> 118 bpm avg
          </p>
        </div>
      </div>

      <div className="mt-4">
        <HeroSlides
          slides={[
            { badge: "Today's plan", title: "Morning stretch", sub: "12 minutes · unwind & breathe", bg: "bg-gradient-to-br from-rose-500 to-orange-400" },
            { badge: "Challenge", title: "10k steps weekend", sub: "3,120 steps to go", bg: "bg-gradient-to-br from-emerald-500 to-teal-400" },
            { badge: "Coach", title: "Recovery day", sub: "Light mobility · sleep 8h", bg: "bg-gradient-to-br from-indigo-500 to-sky-400" },
          ]}
        />
      </div>

      <CardRail title="Upcoming workouts" action="See all">
        {workouts.map((workout) => (
          <div key={workout.name} className="w-36 shrink-0 rounded-2xl border border-white/10 bg-white/5 p-3">
            <span className={cn("flex h-8 w-8 items-center justify-center rounded-xl", workout.tint)}>
              <workout.icon aria-hidden className="h-4 w-4" />
            </span>
            <p className="mt-2 text-xs font-bold">{workout.name}</p>
            <p className="mt-0.5 text-[10px] text-white/50">{workout.meta}</p>
          </div>
        ))}
      </CardRail>

      <div className="mx-5 mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-xs font-bold">This week</p>
        <div className="mt-3 flex h-16 items-end gap-2" aria-hidden>
          {days.map((day, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <div className={cn("w-full rounded-t", i === 3 ? "bg-rose-400" : "bg-white/15")} style={{ height: `${day.v}%` }} />
              <span className="text-[8px] text-white/40">{day.d}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-5 mt-5">
        <p className="text-sm font-bold">Weekly plan</p>
        <div className="mt-3 space-y-2.5">
          {plan.map((item) => (
            <div key={item.title} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
              <span className={cn("flex h-8 w-8 items-center justify-center rounded-lg", item.tint)}>
                <item.icon aria-hidden className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold">{item.title}</p>
                <p className="text-[10px] text-white/50">{item.meta}</p>
              </div>
              <ChevronRight aria-hidden className="h-4 w-4 text-white/30" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


export function LocalTableScreen() {
  const categories = ["🍜 Noodles", "🥗 Bowls", "🍕 Pizza", "☕ Cafe", "🍰 Dessert", "🍣 Sushi"];
  const dishes = [
    { emoji: "🥙", name: "Harvest bowl", meta: "Fresh & seasonal · $12", tint: "bg-emerald-400/15" },
    { emoji: "🍜", name: "Miso ramen", meta: "Spicy · large · $14", tint: "bg-amber-400/15" },
    { emoji: "🥞", name: "Weekend brunch", meta: "Book a table · $18", tint: "bg-rose-400/15" },
    { emoji: "🍔", name: "Smash burger", meta: "Best seller · $11", tint: "bg-sky-400/15" },
    { emoji: "🌮", name: "Street tacos", meta: "3 pieces · $9", tint: "bg-orange-400/15" },
  ];

  return (
    <div className="pb-4 text-white">
      <AppHeader title="Hungry, Alex?" />

      <div className="mx-5 mt-1 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs text-white/50">
        <Search aria-hidden className="h-3.5 w-3.5" />
        Search dishes, cuisines…
      </div>

      <CardRail title="Categories">
        {categories.map((category) => (
          <span key={category} className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px]">
            {category}
          </span>
        ))}
      </CardRail>

      <div className="mt-4">
        <HeroSlides
          slides={[
            { badge: "Offer", title: "50% off first order", sub: "Use code · TASTY50", bg: "bg-gradient-to-br from-amber-500 to-rose-400" },
            { badge: "New", title: "Sushi Sunday", sub: "Fresh counters near you", bg: "bg-gradient-to-br from-sky-500 to-indigo-400" },
            { badge: "Fast", title: "15-min delivery", sub: "On 300+ nearby dishes", bg: "bg-gradient-to-br from-emerald-500 to-lime-400" },
          ]}
        />
      </div>

      <CardRail title="Popular near you" action="More">
        {dishes.map((dish) => (
          <div key={dish.name} className="w-36 shrink-0 rounded-2xl border border-white/10 bg-white/5 p-3">
            <span className={cn("flex h-14 items-center justify-center rounded-xl text-2xl", dish.tint)}>{dish.emoji}</span>
            <p className="mt-2 text-xs font-bold">{dish.name}</p>
            <p className="mt-0.5 flex items-center justify-between text-[10px] text-white/50">
              {dish.meta}
              <Star aria-hidden className="h-3 w-3 text-amber-300" />
            </p>
          </div>
        ))}
      </CardRail>

      <div className="mx-5 mt-4 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4">
        <p className="flex items-center justify-between text-xs font-bold">
          Your order · on its way
          <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-[9px] text-emerald-300">LIVE</span>
        </p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-emerald-400 to-teal-300" />
        </div>
        <p className="mt-2 text-[10px] text-white/60">Harvest bowl · arriving in ~8 min</p>
      </div>

      <div className="mx-5 mt-5 space-y-2.5">
        <p className="text-sm font-bold">Offers near you</p>
        {[
          { icon: Coffee, title: "Buy 1 get 1 — Cold brew", meta: "Kettle & Co · till Sunday", tint: "bg-amber-400/15 text-amber-300" },
          { icon: Clock, title: "Free delivery over $20", meta: "All week · 200+ kitchens", tint: "bg-emerald-400/15 text-emerald-300" },
          { icon: TrendingUp, title: "Weekend brunch -20%", meta: "Terrace garden cafe", tint: "bg-rose-400/15 text-rose-300" },
        ].map((offer) => (
          <div key={offer.title} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
            <span className={cn("flex h-8 w-8 items-center justify-center rounded-lg", offer.tint)}>
              <offer.icon aria-hidden className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold">{offer.title}</p>
              <p className="text-[10px] text-white/50">{offer.meta}</p>
            </div>
            <ChevronRight aria-hidden className="h-4 w-4 text-white/30" />
          </div>
        ))}
      </div>
    </div>
  );
}


export function PocketStudioScreen() {
  const boards = [
    { name: "Summer light", items: 12, tint: "from-amber-400/30 to-orange-300/10" },
    { name: "City textures", items: 8, tint: "from-sky-400/30 to-indigo-300/10" },
    { name: "Mono study", items: 5, tint: "from-slate-400/30 to-slate-300/10" },
    { name: "Warm interiors", items: 9, tint: "from-rose-400/30 to-amber-300/10" },
  ];

  return (
    <div className="pb-4 text-white">
      <AppHeader title="Your workspace" />

      <div className="mx-5 mt-1 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
        <p className="text-xs text-white/70">Make something today</p>
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-400/20 text-violet-300">
          <Plus aria-hidden className="h-4 w-4" />
        </span>
      </div>

      <CardRail title="Moodboards" action="All boards">
        {boards.map((board) => (
          <div key={board.name} className="w-40 shrink-0 overflow-hidden rounded-2xl border border-white/10">
            <div className={cn("h-16 bg-gradient-to-br", board.tint)} />
            <div className="bg-white/5 p-2.5">
              <p className="text-xs font-bold">{board.name}</p>
              <p className="text-[10px] text-white/50">{board.items} saved ideas</p>
            </div>
          </div>
        ))}
      </CardRail>

      <div className="mt-4">
        <HeroSlides
          slides={[
            { badge: "Drafts", title: "Ready when you are", sub: "3 drafts · last edited 2h ago", bg: "bg-gradient-to-br from-violet-500 to-fuchsia-400" },
            { badge: "New collection", title: "Summer light", sub: "12 ideas · share with the team", bg: "bg-gradient-to-br from-amber-500 to-rose-400" },
            { badge: "Tip", title: "Tag to find faster", sub: "Organise boards with labels", bg: "bg-gradient-to-br from-sky-500 to-teal-400" },
          ]}
        />
      </div>

      <div className="mx-5 mt-5">
        <p className="text-sm font-bold">Recent drafts</p>
        <div className="mt-3 space-y-2.5">
          {["Cover concept · 02", "Palette exploration", "Grid study · light"].map((draft, i) => (
            <div key={draft} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-400/15 text-[10px] font-bold text-violet-300">
                0{i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold">{draft}</p>
                <p className="text-[10px] text-white/40">Edited {i + 1}h ago</p>
              </div>
              <ChevronRight aria-hidden className="h-4 w-4 text-white/30" />
            </div>
          ))}
        </div>
      </div>

      <div className="mx-5 mt-5">
        <p className="text-sm font-bold">Ideas inbox</p>
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          {["Gradient dusk", "Paper texture", "Neon signage", "Soft shadows"].map((idea) => (
            <div key={idea} className="rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="h-10 rounded-lg bg-gradient-to-br from-violet-400/25 to-fuchsia-300/10" />
              <p className="mt-2 truncate text-[11px] font-semibold">{idea}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


const appCards = [
  {
    id: "pulsefit",
    eyebrow: "Fitness app",
    title: "PulseFit",
    screen: <PulseFitScreen />,
    tab: { active: 0, items: [{ icon: Home, label: "Home" }, { icon: Activity, label: "Stats" }, { icon: Dumbbell, label: "Train" }, { icon: User, label: "Profile" }] },
  },
  {
    id: "localtable",
    eyebrow: "Food ordering app",
    title: "LocalTable",
    screen: <LocalTableScreen />,
    tab: { active: 1, items: [{ icon: Home, label: "Home" }, { icon: Search, label: "Browse" }, { icon: ShoppingBag, label: "Cart" }, { icon: User, label: "Profile" }] },
  },
  {
    id: "pocketstudio",
    eyebrow: "Creator app",
    title: "PocketStudio",
    screen: <PocketStudioScreen />,
    tab: { active: 2, items: [{ icon: Home, label: "Home" }, { icon: Search, label: "Explore" }, { icon: Plus, label: "Create" }, { icon: User, label: "Profile" }] },
  },
];

export default function AppShowcase() {
  return (
    <section aria-labelledby="app-showcase" className="relative overflow-hidden py-12 sm:py-16">
      <div
        aria-hidden
        className="absolute -top-24 left-1/2 h-72 w-[720px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Inside the work</span>
            <h2 id="app-showcase" className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              What we build, <span className="text-primary">in action</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">
              Three live-feeling app concepts — headers, hero sliders, horizontal product lists and
              dashboards — scrolling slowly. Hover a card to pause and explore.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 sm:gap-8 xl:grid-cols-3">
          {appCards.map((app) => (
            <ShowcaseCard
              key={app.id}
              eyebrow={app.eyebrow}
              title={app.title}
              duration={52}
              height={520}
              frameClassName="border border-slate-700/60 bg-[#0f1220] text-white"
              contentClassName="bg-[#0f1220]"
              top={<StatusBar />}
              bottom={<TabBar active={app.tab.active} items={app.tab.items} />}
            >
              {app.screen}
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
