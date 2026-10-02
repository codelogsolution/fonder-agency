/* Screenshots the HomeShowcase section for two contrasting slides (longest vs
 * shortest copy) so the frame + card position can be compared visually.
 * Usage: node scripts/shot-showcase.mjs [port] [vw] */
import puppeteer from "puppeteer-core";

const port = process.argv[2] || "3000";
const widths = (process.argv[3] || "375,320").split(",").map(Number);
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new" });
const page = await browser.newPage();

async function shot(width, slide, label) {
  await page.setViewport({ width, height: 900, isMobile: true, hasTouch: true });
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.goto(`http://localhost:${port}/`, { waitUntil: "networkidle0" });
  // Wait until the lazily-imported demo has actually painted text inside the card.
  const waitForCard = async () => {
    await page.waitForFunction(
      () => {
        const a = document.querySelector('[aria-labelledby="home-showcase"] article');
        return !!a && (a.innerText || "").replace(/\s+/g, " ").trim().length > 80;
      },
      { timeout: 30000, polling: 250 }
    );
  };
  await waitForCard();
  // The section lives far below the fold; whileInView animations only fire once
  // it is actually scrolled into view, so do that before capturing/clicking.
  await page.$eval('[aria-labelledby="home-showcase"]', (el) =>
    el.scrollIntoView({ block: "start", behavior: "instant" })
  );
  await new Promise((r) => setTimeout(r, 900));
  for (let i = 0; i < slide; i += 1) {
    const next = await page.$('[aria-label="Next showcase"]');
    if (next) await next.click();
    await new Promise((r) => setTimeout(r, 500));
    await waitForCard();
  }
  await new Promise((r) => setTimeout(r, 800)); // let enter animation settle
  const section = await page.$('[aria-labelledby="home-showcase"]');
  const file = `/tmp/showcase-${width}-s${slide}-${label}.png`;
  await section.screenshot({ path: file });
  const card = await (await page.$('[aria-labelledby="home-showcase"] article')).boundingBox();
  const textLen = (await page.$eval('[aria-labelledby="home-showcase"] article', (a) =>
    (a.innerText || "").replace(/\s+/g, " ").trim().length
  ));
  console.log(
    `${file} · cardBox w=${Math.round(card.width)} h=${Math.round(card.height)} text=${textLen}`
  );
}

for (const w of widths) {
  await shot(w, 0, "long"); // "high-converting websites ..." = tallest copy
  await shot(w, 4, "short"); // "memorable brands ..." = shortest copy
}
await browser.close();