// Site-wide configuration and content data.
import {
  Code2,
  FileText,
  Megaphone,
  Palette,
  Search,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

export type Stat = { value: string; label: string };

export type NavItem = { label: string; href: string };

export const siteConfig = {
  name: "Fonder",
  tagline: "Digital Marketing & Development Agency",
  description:
    "Fonder is a premium digital agency crafting high-performance websites, unforgettable brands, and growth campaigns that convert.",
  url: "https://fonder.agency",
  email: "hello@fonder.agency",
  phone: "+91 (704) 262-0665",
  location: "Noida, Sector 62",
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavItem[],
  established: 2022,
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com", icon: "linkedin" },
    {
      label: "Instagram",
      href: "https://www.instagram.com",
      icon: "instagram",
    },
  ] satisfies SocialLink[],
  footerServices: [
    { label: "Web Development", href: "/services/web-dev" },
    { label: "App Development", href: "/services/app-dev" },
    { label: "SEO", href: "/services/seo" },
    { label: "Marketing", href: "/services/marketing" },
    { label: "Copywriting", href: "/services/content" },
    { label: "Branding", href: "/services/branding" },
  ] satisfies NavItem[],
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "linkedin" | "instagram";
};

export type HeroSlide = {
  word: string;
  long: string;
  tagline: string;
  service: string;
  href: string;
  stat: string;
  caption: string;
  blurb?: string;
  label?: string;
};

// Hero slides, synced with the hero typewriter words.
export const heroSlides: HeroSlide[] = [
  {
        word: "websites",
    long: "high-converting websites",
    tagline: "that turn visitors into customers.",
    service: "Web Development",
    href: "/services/web-dev",
    stat: "28+",
    caption: "Websites shipped",
    blurb:
      "Fonder builds fast, conversion-focused websites that load in a flash and guide visitors to book, buy or sign up.",
    label: "Websites",
  },
  {
        word: "apps",
    long: "beautiful mobile apps",
    tagline: "your customers love to use.",
    service: "App Development",
    href: "/services/app-dev",
    stat: "35k+",
    caption: "App installs shipped",
    blurb:
      "Native-quality apps shipped weekly — iOS and Android from a single React Native codebase.",
    label: "Apps",
  },
  {
        word: "rankings",
    long: "search rankings",
    tagline: "that compound month after month.",
    service: "SEO",
    href: "/services/seo",
    stat: "2.6x",
    caption: "Avg. traffic growth",
    blurb:
      "Technical + content SEO that compounds: clean architecture, fast pages and keyword-rich content.",
    label: "SEO",
  },
  {
        word: "campaigns",
    long: "growth campaigns",
    tagline: "that bring leads every week.",
    service: "Social Marketing",
    href: "/services/marketing",
    stat: "2.8x",
    caption: "Avg. ROAS",
    blurb:
      "Full-funnel campaigns across Meta, Google and email that turn browsers into paying customers.",
    label: "Marketing",
  },
  {
        word: "brands",
    long: "memorable brands",
    tagline: "people remember & trust.",
    service: "Branding",
    href: "/services/branding",
    stat: "9",
    caption: "Brands launched",
    blurb:
      "Brand foundations — visual identity, voice and design system — built to stand out and last.",
    label: "Branding",
  },
  {
        word: "interfaces",
    long: "intuitive interfaces",
    tagline: "that users understand at first click.",
    service: "UI/UX Design",
    href: "/services/branding",
    stat: "120+",
    caption: "Design assets shipped",
    blurb:
      "Pixel-perfect interfaces and prototypes designed for clarity, not clutter — tested with real users.",
    label: "Design",
  },
  {
        word: "content",
    long: "effective content",
    tagline: "that ranks, engages & sells.",
    service: "Content Writing",
    href: "/services/content",
    stat: "48k",
    caption: "Monthly readers",
    blurb:
      "Content strategy, SEO copy and long-form stories that rank in Google and convert readers into leads.",
    label: "Content",
  },
];

export const heroServices: { label: string; href: string; icon: LucideIcon }[] =
  [
    { label: "Web Development", href: "/services/web-dev", icon: Code2 },
    { label: "App Development", href: "/services/app-dev", icon: Smartphone },
    { label: "SEO", href: "/services/seo", icon: Search },
    { label: "Social Marketing", href: "/services/marketing", icon: Megaphone },
    { label: "Branding", href: "/services/branding", icon: Palette },
    { label: "Content Writing", href: "/services/content", icon: FileText },
  ];

export const impactStats: Stat[] = [
  { value: "60+", label: "Projects delivered" },
  { value: "96%", label: "Client retention" },
  { value: "4", label: "Design & industry awards" },
  { value: "2.6x", label: "Avg. ROI uplift" },
];

export type ProcessStep = { step: string; title: string; description: string };

export type ServicePage = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  image: string;
  imageAlt: string;
  features: string[];
  stats: Stat[];
  process: ProcessStep[];
};

// /services/[slug] pages.
export const servicePages: ServicePage[] = [
  {
    slug: "web-dev",
    title: "Web Development",
    tagline: "Blazing-fast, scalable web applications.",
    description:
      "From marketing sites to complex platforms, we engineer with Next.js and modern tooling — type-safe, tested, and tuned to Core Web Vitals.",
    icon: Code2,
    image:
      "/images/photo-1461749280684.webp",
    imageAlt: "Developer writing code across dual monitors",
    features: [
      "Next.js (App Router) architecture",
      "Headless CMS & e-commerce integrations",
      "Performance budgets & Core Web Vitals",
      "Accessibility (WCAG 2.2) compliance",
    ],
    stats: [
      { value: "1.1s", label: "Avg. LCP" },
      { value: "95+", label: "Avg. Lighthouse" },
      { value: "28+", label: "Websites shipped" },
    ],
    process: [
      {
        step: "Audit",
        title: "Map the terrain",
        description:
          "We profile your current stack, benchmark Core Web Vitals, and surface every technical blocker before a line of code is written.",
      },
      {
        step: "Strategy",
        title: "Blueprint the build",
        description:
          "Information architecture, stack decisions, and a signed-off performance budget — so scope never silently grows.",
      },
      {
        step: "Execution",
        title: "Ship weekly",
        description:
          "Typed, tested, peer-reviewed code delivered in weekly increments you can click — not decks you have to imagine.",
      },
      {
        step: "Optimization",
        title: "Tune against reality",
        description:
          "Load testing, accessibility passes, and post-launch tuning steered by real-user data, not hunches.",
      },
    ],
  },
  {
    slug: "app-dev",
    title: "App Development",
    tagline: "Native-quality mobile apps, cross-platform by default.",
    description:
      "We design and build iOS and Android experiences your users love to open — one codebase, native polish, and release pipelines that ship weekly.",
    icon: Smartphone,
    image:
      "/images/photo-1512941937669.webp",
    imageAlt: "Smartphone running a mobile application",
    features: [
      "React Native & Expo expertise",
      "App Store / Play Store launch support",
      "Offline-first data & push notifications",
      "Analytics and crash monitoring built in",
    ],
    stats: [
      { value: "4.7★", label: "Avg. store rating" },
      { value: "35k+", label: "Installs shipped" },
      { value: "5", label: "Apps live" },
    ],
    process: [
      {
        step: "Audit",
        title: "Validate the market",
        description:
          "We profile the competitive landscape, target devices, and monetization model before committing to a roadmap.",
      },
      {
        step: "Strategy",
        title: "Design the release path",
        description:
          "Platform architecture, offline strategy, and a store-compliant launch roadmap mapped week by week.",
      },
      {
        step: "Execution",
        title: "Build in the open",
        description:
          "React Native builds shipped as weekly TestFlight and Play Console drops you can install and test.",
      },
      {
        step: "Optimization",
        title: "Compound retention",
        description:
          "Crash monitoring, store-listing experiments, and onboarding tuning that lift ratings and retention.",
      },
    ],
  },
  {
    slug: "seo",
    title: "SEO & Growth",
    tagline: "Compounding organic traffic, engineered.",
    description:
      "Technical SEO and content systems that compound: we fix the foundations, target commercial intent, and report on pipeline — not vanity rankings.",
    icon: Search,
    image:
      "/images/photo-1460925895917.webp",
    imageAlt: "Analytics dashboard with growth charts on a laptop",
    features: [
      "Technical audits & Core Web Vitals fixes",
      "Keyword & intent-mapped content plans",
      "Programmatic and local SEO systems",
      "Rank-to-revenue attribution dashboards",
    ],
    stats: [
      { value: "2.6x", label: "Avg. traffic growth" },
      { value: "6 mo", label: "Time to impact" },
      { value: "18+", label: "SEO programs run" },
    ],
    process: [
      {
        step: "Audit",
        title: "Forensic deep-dive",
        description:
          "Full technical crawl, indexation review, and backlink forensics delivered in week one — no black boxes.",
      },
      {
        step: "Strategy",
        title: "Cluster by intent",
        description:
          "Keyword research mapped to commercial intent, then sequenced into a content calendar tied to pipeline goals.",
      },
      {
        step: "Execution",
        title: "Ship in sprints",
        description:
          "Technical fixes, content production, and authority building executed in transparent monthly sprints.",
      },
      {
        step: "Optimization",
        title: "Follow the revenue",
        description:
          "Rank-to-revenue dashboards decide where the next hour of effort goes — rankings are a means, not the goal.",
      },
    ],
  },
  {
    slug: "marketing",
    title: "Performance Marketing",
    tagline: "Paid, social, and email that convert.",
    description:
      "Full-funnel campaigns across paid search, social, and lifecycle email — creative that stops the scroll, targeting that finds buyers.",
    icon: Megaphone,
    image:
      "/images/photo-1552664730.webp",
    imageAlt: "Marketing analytics workspace with campaign charts",
    features: [
      "Paid search & social campaign management",
      "Lifecycle email & automation flows",
      "Creative testing frameworks",
      "Weekly reporting with clear next steps",
    ],
    stats: [
      { value: "2.8x", label: "Avg. ROAS" },
      { value: "-27%", label: "Avg. CPA drop" },
      { value: "$1.8M+", label: "Ad spend managed" },
    ],
    process: [
      {
        step: "Audit",
        title: "Rebuild the truth",
        description:
          "We rebuild your tracking stack and baseline every channel's true CPA — most accounts are flying blind.",
      },
      {
        step: "Strategy",
        title: "Architect the funnel",
        description:
          "Offer architecture, channel mix, and budget flighting with explicit targets agreed before launch.",
      },
      {
        step: "Execution",
        title: "Test relentlessly",
        description:
          "Creative testing sprints across paid, social, and lifecycle email — every ad has a hypothesis.",
      },
      {
        step: "Optimization",
        title: "Scale winners fast",
        description:
          "Winners scale, losers die fast — reported weekly in plain language, tied to revenue not clicks.",
      },
    ],
  },
  {
    slug: "content",
    title: "Content & Copywriting",
    tagline: "Copy that converts, content that compounds.",
    description:
      "Direct-response copy and editorial engines — from landing pages to full content calendars, every word is written to move a metric.",
    icon: FileText,
    image:
      "/images/photo-1434030216411.webp",
    imageAlt: "Writer drafting copy in a notebook",
    features: [
      "Direct-response landing page copy",
      "SEO content clusters & calendars",
      "Email sequences & lifecycle copy",
      "Brand voice & messaging guides",
    ],
    stats: [
      { value: "48k", label: "Monthly readers" },
      { value: "60+", label: "Landing pages shipped" },
      { value: "+24%", label: "Avg. CVR lift" },
    ],
    process: [
      {
        step: "Audit",
        title: "Tear it down",
        description:
          "We dissect your existing copy against your best-performing competitor — line by line, promise by promise.",
      },
      {
        step: "Strategy",
        title: "Lock the messaging",
        description:
          "Messaging hierarchy, voice guide, and a conversion-focused content map the whole team signs.",
      },
      {
        step: "Execution",
        title: "Write to convert",
        description:
          "Pages, sequences, and articles written, reviewed, and shipped A/B-ready — never decorative words.",
      },
      {
        step: "Optimization",
        title: "Compound monthly",
        description:
          "Headline and CTA testing cycles keep lifting conversion long after launch day.",
      },
    ],
  },
  {
    slug: "branding",
    title: "Branding & Design",
    tagline: "Identities that look like a market leader.",
    description:
      "Logo to design system — distinct visual identities engineered to signal premium before a single word is read.",
    icon: Palette,
    image:
      "/images/photo-1561070791.webp",
    imageAlt: "Designer's desk with color swatches and brand sketches",
    features: [
      "Logo & visual identity systems",
      "Design systems in Figma + code",
      "Motion & interaction guidelines",
      "Launch-ready brand collateral",
    ],
    stats: [
      { value: "9", label: "Brands launched" },
      { value: "3", label: "Design awards" },
      { value: "120+", label: "Brand assets shipped" },
    ],
    process: [
      {
        step: "Audit",
        title: "Benchmark upward",
        description:
          "We benchmark your brand against the category's leaders, not its average — the gap is the brief.",
      },
      {
        step: "Strategy",
        title: "Pick the territory",
        description:
          "Positioning, personality, and a creative territory signed off before any pixels are pushed.",
      },
      {
        step: "Execution",
        title: "Craft the system",
        description:
          "Identity, design system, and collateral delivered in code-ready form — not just a logo file.",
      },
      {
        step: "Optimization",
        title: "Evolve with data",
        description:
          "Brand tracking and asset iteration as you scale, so the identity compounds instead of dating.",
      },
    ],
  },
];

export function getServicePage(slug: string): ServicePage | undefined {
  return servicePages.find((service) => service.slug === slug);
}

export interface ServicePreviewItem {
  id: string;
  title: string;
  subtitle: string;
  domain: string;
  kind: "app" | "web" | "seo" | "brand" | "marketing" | "content";
  entries: string[];
}

type PreviewSeed = [ServicePreviewItem["kind"], string, string, string[]];

export interface ServicePreviewCopy {
  eyebrow: string;
  heading: string;
  accent: string;
  description: string;
  cardNote: string;
}

// Section copy for each service page's preview section, so no two service pages
// read the same.
const servicePreviewCopy: Record<string, ServicePreviewCopy> = {
  seo: {
    eyebrow: "Search performance",
    heading: "Where growth",
    accent: "compounds",
    description:
      "Rankings, crawl health and topic coverage — the three views a search programme is run from. Hover a card to pause it.",
    cardNote: "Reporting concept · hover to pause",
  },
  branding: {
    eyebrow: "Identity system",
    heading: "One brand,",
    accent: "every surface",
    description:
      "Marks, palettes, type scales and applied work — how an identity is built and then carried across print and product.",
    cardNote: "Identity concept · hover to pause",
  },
  marketing: {
    eyebrow: "Campaign lifecycle",
    heading: "From brief to",
    accent: "booked revenue",
    description:
      "Campaign creative, lifecycle email and the planning board behind them — the working views a growth team lives in.",
    cardNote: "Campaign concept · hover to pause",
  },
  content: {
    eyebrow: "Editorial system",
    heading: "Copy that earns",
    accent: "attention",
    description:
      "Journals, landing pages and newsletters — the formats we write in, from first draft to published issue.",
    cardNote: "Editorial concept · hover to pause",
  },
};

const defaultPreviewCopy: ServicePreviewCopy = {
  eyebrow: "Inside the work",
  heading: "What we build,",
  accent: "in action",
  description: "Concept screens for this service — headers, panels and data — scrolling slowly. Hover a card to pause.",
  cardNote: "",
};

export function getServicePreviewCopy(slug: string): ServicePreviewCopy {
  return servicePreviewCopy[slug] ?? defaultPreviewCopy;
}

// Fictional demo content, not real client data.
const servicePreviewSeeds: Record<string, PreviewSeed[]> = {
  "app-dev": [
    ["app", "Daily rhythm", "Wellness app", ["Good morning, Alex", "Your daily goal · 6,000 steps", "Morning stretch · 12 minutes", "Mindful break · 5 minutes", "Evening walk · 20 minutes"]],
    ["app", "Pocket studio", "Creator app", ["Make something today", "Your workspace", "Moodboard · 12 saved ideas", "New collection · Summer light", "Drafts · Ready when you are"]],
    ["app", "Local table", "Food ordering app", ["A little closer to delicious", "Nearby favourites", "Harvest bowl · Fresh & seasonal", "Weekend brunch · Book a table", "Your order · On its way"]],
  ],
  "web-dev": [
    ["web", "Aurelia", "Editorial storefront", ["Everyday rituals. Beautifully made.", "Explore the collection", "The everyday essential", "Made with intention", "Find your next favourite"]],
    ["web", "Forma", "Architecture website", ["Spaces for a slower life.", "Selected spaces", "Courtyard house · Residential", "Studio 04 · Workplace", "Start a conversation"]],
    ["web", "Orbit", "SaaS landing page", ["Less busywork. More momentum.", "One workspace for your team", "Plan the week", "See the bigger picture", "Build your next chapter"]],
  ],
  seo: [
    ["seo", "Search pulse", "Analytics dashboard", ["Organic overview", "Search impressions · 24.8k", "Clicks · 1,420", "Queries in focus · 36", "Pages to refresh · 8"]],
    ["seo", "Site health", "Technical audit", ["A clearer path to discovery", "Indexable pages · 128", "Canonical checks · Complete", "Internal links · Review 12", "Next audit · Monday"]],
    ["seo", "Topic atlas", "Content planning", ["Build around search intent", "Pillar · Sustainable living", "Cluster · Everyday essentials", "Intent · Compare options", "Next brief · Buying guide"]],
  ],
  branding: [
    ["brand", "Nova", "Visual identity", ["Stand apart. Stay yourself.", "Signature palette", "Typography · Expressive & clear", "Mark construction · Clear space", "Applications · Print & digital"]],
    ["brand", "Ember", "Brand guidelines", ["Warm by nature.", "Colour with character", "Voice · Thoughtful, never formal", "Photography · Honest moments", "Packaging · A lighter touch"]],
    ["brand", "Fieldwork", "Design system", ["Room to grow.", "A connected visual language", "Type scale · Display to detail", "Components · Consistent by design", "Launch kit · Ready to share"]],
  ],
  marketing: [
    ["marketing", "Fresh perspective", "Social campaign", ["Your next chapter starts outside.", "Campaign · Weekend reset", "Audience · Curious explorers", "Creative A · Discover more", "Creative B · Take the scenic route"]],
    ["marketing", "The welcome series", "Lifecycle email", ["Glad you found us.", "Day 01 · A warm welcome", "Day 03 · Meet your favourites", "Day 07 · A little inspiration", "Day 14 · Make it yours"]],
    ["marketing", "Launch room", "Campaign planner", ["One idea. Many ways to connect.", "Monday · Teaser", "Wednesday · Product story", "Friday · Community spotlight", "Sunday · Weekly recap"]],
  ],
  content: [
    ["content", "The Sunday edit", "Editorial journal", ["Good stories deserve a little space.", "A considered approach to everyday life", "Start with what matters", "Make room for curiosity", "A new perspective, every Sunday"]],
    ["content", "Words that work", "Landing page copy", ["A clearer message. A better first impression.", "The problem, simply put", "A solution worth knowing", "Proof that earns attention", "Your next step starts here"]],
    ["content", "Notes from the studio", "Newsletter", ["A small dose of inspiration.", "This week in the studio", "One idea to try today", "What we are reading", "Until next time, keep creating"]],
  ],
};

export function getServicePreviewItems(slug: string): ServicePreviewItem[] {
  if (!getServicePage(slug)) return [];
  return (servicePreviewSeeds[slug] ?? []).map(([kind, title, subtitle, entries], index) => ({
    id: `${slug}-${index}`,
    kind,
    title,
    subtitle,
    domain: `${title.toLowerCase().replace(/\s+/g, "-")}.demo`,
    entries,
  }));
}

export type CaseMetric = {
  label: string;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  displayValue?: string;
  explanation?: string;
};

export type CaseStudy = {
  client: string;
  industry: string;
  period: string;
  title: string;
  summary: string;
  services: string[];
  metrics: CaseMetric[];
};

// /work case studies.
export const caseStudies: CaseStudy[] = [
  {
    client: "Aurelia",
    industry: "E-commerce · Skincare",
    period: "8 months · 2024",
    title: "An online store redesigned to help more visitors buy",
    summary:
      "We rebuilt the store with Next.js and tested its messaging and offers to improve the shopping experience.",
    services: ["Web Development", "Conversion Optimization", "Copywriting"],
    metrics: [
      { label: "Higher conversion rate", value: 41, displayValue: "41%", explanation: "A 41% increase in the share of visitors taking the desired action—not a 41% conversion rate." },
      { label: "Revenue per ad spend", value: 3.5, decimals: 1, displayValue: "3.5×", explanation: "3.5 in attributed revenue for every 1 spent on advertising. This measures revenue, not profit." },
      { label: "Lower cost per enquiry", value: 24, displayValue: "24%", explanation: "Each lead cost 24% less to acquire. Lower acquisition costs are a positive result." },
    ],
  },
  {
    client: "Vertex",
    industry: "B2B SaaS · Analytics",
    period: "6 months · 2024",
    title: "A website rebuild that made the business easier to find",
    summary:
      "We moved the website to Next.js and created content around the questions potential customers were searching for.",
    services: ["Search Engine Optimization", "Web Development", "Content Writing"],
    metrics: [
      { label: "More organic traffic", value: 240, displayValue: "240%", explanation: "Visits from unpaid search results increased by 240%. This is traffic growth, not paid advertising." },
      { label: "Top-three search rankings", value: 34, explanation: "34 tracked search terms ranked among the first three results." },
      { label: "Sales pipeline multiplier", value: 2.1, decimals: 1, displayValue: "2.1×", explanation: "The reported sales pipeline reached 2.1 times its earlier level. Pipeline is potential business, not completed sales." },
    ],
  },
];

export type RecentWin = { metric: string; title: string; detail: string };

export const recentWins: RecentWin[] = [
  {
    metric: "+41%",
    title: "Aurelia — E-commerce",
    detail: "Conversion lift after the headless storefront rebuild in Q3.",
  },
  {
    metric: "+240%",
    title: "Vertex — B2B SaaS",
    detail:
      "Organic traffic growth in the first six months of the SEO program.",
  },
  {
    metric: "320k",
    title: "FinFlow — Fintech",
    detail: "Monthly transactions on the rebuilt real-time dashboard.",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  company: string;
  sector: string;
  metric: string;
  metricLabel: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "We came for the redesign and stayed for the reporting. Every Friday I knew exactly what my budget had done that week — that never happened with our previous agency.",
    name: "Aarav Mehta",
    role: "CEO, Aurelia · Client since 2023",
    initials: "AM",
    company: "AURELIA",
    sector: "E-commerce",
    metric: "+41%",
    metricLabel: "conversion lift after the storefront rebuild",
  },
  {
    quote:
      "Traffic didn't jump overnight — and that's exactly why I trusted it. Six months in, organic had quietly become our biggest channel. No magic, just method.",
    name: "Sofia Reyes",
    role: "CMO, Vertex · Client since 2024",
    initials: "SR",
    company: "VERTEX",
    sector: "B2B SaaS",
    metric: "+240%",
    metricLabel: "organic traffic growth in the first six months",
  },
  {
    quote:
      "They told us 'no' more than any agency we've hired. Every feature they cut came back as speed — and our customers felt the difference.",
    name: "Daniel Okafor",
    role: "CTO, FinFlow · Client since 2023",
    initials: "DO",
    company: "FINFLOW",
    sector: "Fintech",
    metric: "320k",
    metricLabel: "monthly transactions on the dashboard we rebuilt",
  },
  {
    quote:
      "The app felt sluggish before; now it opens in under a second and our store rating jumped to 4.6. Users actually leave five-star reviews now — that's how you know the work mattered.",
    name: "Ravi Kumar",
    role: "Head of Product, PulseFit · Client since 2024",
    initials: "RK",
    company: "PULSEFIT",
    sector: "Fitness Tech",
    metric: "38k+",
    metricLabel: "app installs with a 4.6★ store rating",
  },
  {
    quote:
      "They rebuilt our checkout in two weeks and taught us how to test offers. Revenue per ad dollar went from 2.1× to 3.2× in a quarter — the clearest ROI I've seen from a rebuild.",
    name: "Meera Sethi",
    role: "Co-founder, CloudCart · Client since 2023",
    initials: "MS",
    company: "CLOUDCART",
    sector: "E-commerce",
    metric: "3.2×",
    metricLabel: "revenue per ad dollar after checkout rebuild",
  },
];
