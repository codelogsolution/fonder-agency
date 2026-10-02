/* Mobile overflow + height-jump audit for the HomeShowcase slider.
 * Usage: node scripts/audit-showcase-mobile.mjs [port] */
import puppeteer from "puppeteer-core";

const port = process.argv[2] || "3123";
const url = `http://localhost:${port}/`;

const browser = await puppeteer.launch({
  executablePath:
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "new",
});
const page = await browser.newPage();

async function audit(width) {
  await page.setViewport({ width, height: 667, isMobile: true, hasTouch: true });
  await page.goto(url, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 3000)); // preloader + hydration

  return page.evaluate(() => {
    const vw = window.innerWidth;
    const section = document.querySelector('[aria-labelledby="home-showcase"]');
    if (!section) return { error: "section not found" };

    // 1) horizontal overflowers anywhere inside the section
    const overflow = [];
    for (const el of section.querySelectorAll("*")) {
      const r = el.getBoundingClientRect();
      if (r.width === 0) continue;
      if (r.right > vw + 1 || r.left < -1) {
        overflow.push({
          tag: el.tagName.toLowerCase(),
          cls: String(el.className).slice(0, 80),
          left: Math.round(r.left),
          right: Math.round(r.right),
          w: Math.round(r.width),
        });
      }
    }

    // 2) page-level horizontal scroll?
    const pageOverflow = document.documentElement.scrollWidth > vw;

    // 3) heights of the two slider columns right now
    const grid = section.querySelector(".grid");
    const copyCol = grid?.children[0];
    const prevCol = grid?.children[1];
    return {
      vw,
      pageOverflow,
      overflow: overflow.slice(0, 12),
      copyColH: copyCol?.offsetHeight ?? null,
      prevColH: prevCol?.offsetHeight ?? null,
    };
  });
}

async function heightJourney(width) {
  await page.setViewport({ width, height: 900, isMobile: true, hasTouch: true });
  await page.goto(url, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 3000));
  const samples = [];
  for (let i = 0; i < 7; i += 1) {
    const h = await page.evaluate(() => {
      const grid = document.querySelector('[aria-labelledby="home-showcase"] .grid');
      const copy = grid?.children[0];
      const prev = grid?.children[1];
      return { copy: copy?.offsetHeight ?? null, preview: prev?.offsetHeight ?? null };
    });
    await new Promise((r) => setTimeout(r, 700));
    samples.push(h);
    const next = await page.$('[aria-label="Next showcase"]');
    if (next) {
      await next.click();
      await new Promise((r) => setTimeout(r, 900));
    }
  }
  return samples;
}

console.log("=== horizontal overflow ===");
for (const width of [375, 320]) {
  const r = await audit(width);
  console.log(`\n--- ${width}px ---`);
  console.log(JSON.stringify(r, null, 1));
}

console.log("\n=== column heights across 7 slides (375px) ===");
console.log(JSON.stringify(await heightJourney(375), null, 1));

await browser.close();
