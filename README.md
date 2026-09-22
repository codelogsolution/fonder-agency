# Fonder — Digital Marketing & Development Agency

Premium, multi-page agency website.

**Stack:** Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · Framer Motion · Lucide React · TypeScript

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Theme

| Token          | Value                                             |
| -------------- | ------------------------------------------------- |
| Background     | `#FFFFFF`                                         |
| Foreground     | `#0B1220`                                         |
| Primary accent | `#0284C7`                                         |
| Muted text     | `#5B6B81`                                         |
| Font           | Plus Jakarta Sans (via `next/font`)               |
| Breakpoints    | sm 640 · md 768 · lg 960 · xl 1280 · 2xl 1536 px |

Design tokens live in `src/app/globals.css` (Tailwind v4 `@theme`).

## Routes

| Route                                                                               | File                               |
| ----------------------------------------------------------------------------------- | ---------------------------------- |
| `/`                                                                                 | `src/app/page.tsx`                 |
| `/about`                                                                            | `src/app/about/page.tsx`           |
| `/services`                                                                         | `src/app/services/page.tsx`        |
| `/services/app-dev` · `/web-dev` · `/seo` · `/marketing` · `/content` · `/branding` | `src/app/services/<slug>/page.tsx` |
| `/work`                                                                             | `src/app/work/page.tsx`            |
| `/contact`                                                                          | `src/app/contact/page.tsx`         |

## Folder Structure

```
src/
├── app/                  # App Router: layout, routes
│   └── services/<slug>/  # Physical service detail pages
├── components/
│   ├── assistant/        # LeadAssistant qualifier + AssistantLauncher
│   ├── forms/            # ContactForm
│   ├── layout/           # Header (route-aware active state), Footer, NewsletterForm, ScrollProgress
│   ├── motion/           # Reveal, RotatingText, SplitText, CountUp
│   ├── sections/         # Hero, showcases, StickyProcess, ServiceDetail, PageHeader, CTA…
│   │   └── showcase/     # AppPhone, WebPage, ServiceCard previews
│   └── ui/               # Button, Magnetic, BrandMark, BrandIcons
├── config/site.ts        # Branding, nav, servicePages data, case studies, stats
└── lib/utils.ts          # cn() class combiner
```

## Conventions

- Server Components by default; add `"use client"` only where motion/state is needed.
- Below-the-fold home sections are lazy-loaded with `next/dynamic`.
- Service detail pages are thin wrappers around `ServiceDetail` — edit content in `config/site.ts`.
- Custom utilities: `text-gradient`, `glass`, `glow-primary`, `bg-grid` (see `globals.css`).
