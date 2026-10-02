# QA scripts

Throwaway-but-kept Puppeteer probes for the home page slider (`HomeShowcase`).
They all need the dev server running (`npm run dev`) and a local Google Chrome at
`/Applications/Google Chrome.app/Contents/MacOS/Google Chrome` (`puppeteer-core`).

| Script | What it answers |
| --- | --- |
| `probe-slides.mjs [port] [vw]` | Per-slide layout table. Every column here must be a single value across all 7 slides, otherwise the section "jumps". |
| `measure-copy.mjs [port] [vw,vw,…]` | Natural copy-column height per slide with `min-height` disabled — this is what sizes the `min-h-[424px] sm:min-h-[332px]` reserve. |
| `audit-showcase-mobile.mjs [port]` | Flags any node poking outside the viewport (and `pageOverflow`). |
| `shot-showcase.mjs [port] [vw,vw,…]` | Writes `/tmp/showcase-<vw>-s<i>-<tag>.png` captures of each slide. |

```bash
npm run dev                                  # :3000
node scripts/probe-slides.mjs 3000 375
node scripts/measure-copy.mjs 3000 320,640,959,960
node scripts/audit-showcase-mobile.mjs 3000
node scripts/shot-showcase.mjs 3000 375,320
```

Reference invariants (verified 320 → 1280px): `cardH 498`, `frameH 410`,
`cardW 400` / `429` at `lg`, `copyH 424` (<640), `332` (640–959), `527` (≥960).
`--breakpoint-lg` is customised to `60rem` (960px) in `src/app/globals.css`, so
the two-column layout starts at 960px, not Tailwind's default 1024px.
