/* Reports steady-state heights for every HomeShowcase slide, plus the natural
 * heights of the three top bars. Reduced-motion is emulated so autoplay stays
 * off and navigation is deterministic.
 * Usage: node scripts/probe-slides.mjs [port] [vw] */
import puppeteer from "puppeteer-core";

const port = process.argv[2] || "3000";
const width = Number(process.argv[3] || 375);
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new" });
const page = await browser.newPage();
await page.setViewport({ width, height: 900, isMobile: true, hasTouch: true });
await page.emulateMediaFeatures([
  { name: "prefers-reduced-motion", value: "reduce" },
]);
await page.goto(`http://localhost:${port}/`, { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 2500));

const measure = () =>
  page.evaluate(() => {
    const section = document.querySelector('[aria-labelledby="home-showcase"]');
    const grid = section.querySelector(".grid");
    const copy = grid.children[0];
    const prev = grid.children[1];
    const card = section.querySelector("article");
    const header = card.querySelector("header");
    const frame = card.querySelector(":scope > div");
    const top = frame.firstElementChild;
    const viewport = frame.querySelector('[class*="viewport"]');
    const rail = frame.querySelector('[class*="overflow-x-auto"]');
    // Layout geometry (offsetTop walk) instead of getBoundingClientRect so that
    // in-flight framer-motion transforms can't skew the comparison.
    const off = (el) => {
      let y = 0;
      let node = el;
      while (node && node !== section) {
        y += node.offsetTop;
        node = node.offsetParent;
      }
      return node === section ? Math.round(y) : null;
    };
    const controls = copy.lastElementChild;
    return {
      heading: copy.querySelector("h3")?.textContent?.trim().slice(0, 26) ?? "?",
      rowH: grid.offsetHeight,
      copyH: copy.offsetHeight,
      textH: copy.children[1]?.offsetHeight ?? null,
      prevH: prev.offsetHeight,
      cardH: card.offsetHeight,
      headerH: header.offsetHeight,
      frameH: frame.offsetHeight,
      topH: top.offsetHeight,
      viewportH: viewport.offsetHeight,
      cardW: card.offsetWidth,
      railW: rail ? rail.offsetWidth : null,
      railScrollW: rail ? rail.scrollWidth : null,
      tagY: off(copy.firstElementChild),
      textY: off(copy.children[1]),
      ctaY: off(controls),
      cardY: off(prev),
      cardRight: Math.round(card.getBoundingClientRect().right),
    };
  });

const slides = [];
for (let i = 0; i < 7; i += 1) {
  slides.push(await measure());
  const next = await page.$('[aria-label="Next showcase"]');
  if (next) await next.click();
  await new Promise((r) => setTimeout(r, 1100));
}

const uniq = (key) => [...new Set(slides.map((s) => s[key]))].join("/");
console.log(`\nviewport ${width}px reduced-motion, ${slides.length} slides`);
console.log(
  ["i", "copyH", "textH", "ctaY", "cardY", "gap", "cardH", "frameH", "cardW", "right", "heading"].join(" | "),
);
slides.forEach((s, i) => {
  console.log(
    [
      i,
      s.copyH,
      s.textH,
      s.ctaY,
      s.cardY,
      s.cardY - s.ctaY,
      s.cardH,
      s.frameH,
      s.cardW,
      s.cardRight,
      s.heading,
    ].join(" | "),
  );
});
console.log(`ctaY set: ${uniq("ctaY")}  cardY set: ${uniq("cardY")}  sectionH set: ${uniq("rowH")}`);
console.log(
  `copyH set: ${uniq("copyH")} (max ${Math.max(...slides.map((s) => s.copyH))})  textH set: ${uniq("textH")} (max ${Math.max(...slides.map((s) => s.textH))})`,
);
console.log(`cardH set: ${uniq("cardH")}  frameH set: ${uniq("frameH")}  cardW set: ${uniq("cardW")}  rowH set: ${uniq("rowH")}`);
console.log(`cardRight set: ${uniq("cardRight")} (viewport ${width})`);
await browser.close();