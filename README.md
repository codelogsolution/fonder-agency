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

| Token            | Value                          |
| ---------------- | ------------------------------ |
| Background       | `#0B0F19` (deep slate black)   |
| Primary Accent   | `#00F5FF` (cyan)               |
| Font             | Plus Jakarta Sans              |
| Breakpoints      | sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536 px |

Design tokens live in `src/app/globals.css` (Tailwind v4 `@theme`).

## Routes

| Route                                                                | File                                    |
| -------------------------------------------------------------------- | --------------------------------------- |
| `/`                                                                  | `src/app/page.tsx`                      |
| `/about`                                                             | `src/app/about/page.tsx`                |
| `/services`                                                          | `src/app/services/page.tsx`             |
| `/services/app-dev` · `/web-dev` · `/seo` · `/marketing` · `/content` · `/branding` | `src/app/services/<slug>/page.tsx`      |
| `/results`                                                           | `src/app/results/page.tsx`              |
| `/contact`                                                           | `src/app/contact/page.tsx`              |

Page-transition animations are handled by `src/app/template.tsx` (Framer Motion fade/slide, remounted on every navigation while the Header/Footer persist).

## Folder Structure

```
src/
├── app/                  # App Router: layout, template (page transitions), routes
│   └── services/<slug>/  # Physical service detail pages
├── components/
│   ├── forms/            # ContactForm
│   ├── layout/           # Header (route-aware active state), Footer, NewsletterForm
│   ├── motion/           # Reveal — reusable Framer Motion primitive
│   ├── sections/         # Hero, Services, Portfolio, About, ServiceDetail, PageHeader, CTA
│   └── ui/               # Button, Magnetic, BrandIcons
├── config/site.ts        # Branding, nav, servicePages data, projects, stats
└── lib/utils.ts          # cn() class combiner
```

## Conventions

- Server Components by default; add `"use client"` only where motion/state is needed.
- Service detail pages are thin wrappers around `ServiceDetail` — edit content in `config/site.ts`.
- Custom utilities: `text-gradient`, `glass`, `glow-primary`, `bg-grid` (see `globals.css`).

