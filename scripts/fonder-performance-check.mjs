import fs from 'node:fs';
const tab = await (await fetch('http://localhost:9333/json/new?about:blank', { method: 'PUT' })).json();
const ws = new WebSocket(tab.webSocketDebuggerUrl);
await new Promise((resolve) => { ws.onopen = resolve; });
let id = 0;
const pending = new Map();
ws.onmessage = ({ data }) => {
  const message = JSON.parse(data);
  pending.get(message.id)?.(message);
};
function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const key = ++id;
    const timer = setTimeout(() => reject(new Error(method + ' timed out')), 20000);
    pending.set(key, (message) => {
      clearTimeout(timer); pending.delete(key);
      if (message.error) reject(new Error(JSON.stringify(message.error)));
      else resolve(message.result);
    });
    ws.send(JSON.stringify({ id: key, method, params }));
  });
}
const evaluate = async (expression) => {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
};
await send('Page.enable');
await send('Network.enable');
await send('Network.setCacheDisabled', { cacheDisabled: true });
await send('Page.addScriptToEvaluateOnNewDocument', { source: `window.audit={lcp:0,shifts:0,longTasks:0}; for(const type of ['largest-contentful-paint','layout-shift','longtask'])new PerformanceObserver(list=>{for(const e of list.getEntries()){if(type==='largest-contentful-paint')audit.lcp=e.startTime;if(type==='layout-shift'&&!e.hadRecentInput)audit.shifts+=e.value;if(type==='longtask')audit.longTasks+=e.duration}}).observe({type,buffered:true});` });
const results = [];
for (const base of ['https://fonder-agency.vercel.app', 'http://localhost:4200']) {
  for (const width of [1440, 390]) {
    await send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: false });
    await send('Page.navigate', { url: base + '/services/web-dev' });
    await new Promise(resolve => setTimeout(resolve, 5000));
    const data = await evaluate(`(()=>{const hero=document.querySelector('main section');const image=hero?.querySelector('img');return {url:location.href,width:innerWidth,...window.audit,ttfb:performance.getEntriesByType('navigation')[0]?.responseStart,overflow:document.documentElement.scrollWidth>innerWidth,heroTop:hero?.getBoundingClientRect().top,headerBottom:document.querySelector('header')?.getBoundingClientRect().bottom,imageLoaded:!!image?.naturalWidth,imageSrc:image?.currentSrc,bodyVisible:getComputedStyle(document.querySelector('main>div')).opacity,animations:[...document.querySelectorAll('[class*="track"]')].map(e=>getComputedStyle(e).animationPlayState)}})()`);
    results.push(data); console.log(JSON.stringify(data));
    if (base.includes('localhost')) {
      const image = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(`/tmp/fonder-banner-${width}.png`, Buffer.from(image.data, 'base64'));
    }
  }
}
fs.writeFileSync('/tmp/fonder-speed-results.json', JSON.stringify(results, null, 2));
await fetch('http://localhost:9333/json/close/' + tab.id);
ws.close();
