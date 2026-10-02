/* Throwaway: measures the NATURAL (min-height disabled) height of the HomeShowcase
 * copy column per slide, so we can size the reserved min-height to the real max
 * instead of guesswork.
 * Usage: node scripts/measure-copy.mjs [port] [320,375,414,...] */
import puppeteer from "puppeteer-core";

const port = process.argv[2] || "3000";
const widths = (process.argv[3] || "320,375,414,550,640,768,900,1280").split(",").map(Number);
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new" });
const page = await browser.newPage();
await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);

for (const width of widths) {
  await page.setViewport({ width, height: 900, isMobile: width < 900, hasTouch: width < 900 });
  await page.goto(`http://localhost:${port}/`, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 1200));

  // Neutralise the reserve so we can read the true content height.
  await page.evaluate(() => {
    const copy = document
      .querySelector('[aria-labelledby="home-showcase"]')
      .querySelector(".grid").children[0];
    copy.style.minHeight = "0px";
    copy.dataset.probe = "1";
  });

  const perSlide = [];
  for (let i = 0; i < 7; i += 1) {
    const info = await page.evaluate(() => {
      const copy = document.querySelector('[data-probe="1"]');
      const kids = [...copy.children];
      const last = kids[kids.length - 1];
      // offsetTop is unreliable here (no positioned ancestor), so measure the
      // gap between the column's top edge and the CTA row's bottom edge.
      const rel = last.getBoundingClientRect().bottom - copy.getBoundingClientRect().top;
      return {
        label: copy.querySelector("h3")?.textContent?.trim().slice(0, 26),
        natural: Math.round(rel),
        scroll: copy.scrollHeight,
      };
    });
    perSlide.push(info);
    const next = await page.$('[aria-label="Next showcase"]');
    if (next) await next.click();
    await new Promise((r) => setTimeout(r, 1000));
  }

  const max = Math.max(...perSlide.map((s) => s.natural));
  const min = Math.min(...perSlide.map((s) => s.natural));
  const spread = max - min;
  console.log(
    `\n--- ${width}px --- natural max=${max} min=${min} spread=${spread}` +
      (spread === 0 ? " (no jump)" : "  <-- JUMP RISK")
  );
  perSlide.forEach((s, i) =>
    console.log(
      `  s${i} ${String(s.natural).padStart(4)} (scroll ${String(s.scroll).padStart(4)})  ${s.label}`
    )
  );
}
await browser.close();
