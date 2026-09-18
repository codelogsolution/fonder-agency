import fs from 'node:fs';
const tab=await (await fetch('http://localhost:9333/json/new?about:blank',{method:'PUT'})).json();
const ws=new WebSocket(tab.webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);
let id=0;const pending=new Map();ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){pending.get(m.id)?.(m.result);pending.delete(m.id)}};
const send=(method,params={})=>new Promise(r=>{const n=++id;pending.set(n,r);ws.send(JSON.stringify({id:n,method,params}))});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const ev=async expression=>(await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true})).result.value;
await send('Page.enable');const results=[];
for(const [name,base,routes] of [['current','http://localhost:4100',['/services/web-dev']]]) {
 for(const width of [1440,390])for(const route of routes){
  await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:false});await send('Page.navigate',{url:base+route});await sleep(name==='archive'?6000:1800);
  await ev('document.fonts.ready.then(()=>true)');
  await ev('(async()=>{for(let y=0;y<document.body.scrollHeight;y+=650){scrollTo(0,y);await new Promise(r=>setTimeout(r,80))}scrollTo(0,0)})()');await sleep(700);
  const data=await ev(`(()=>{const q=s=>[...document.querySelectorAll(s)];return {title:document.title,h1:q('h1').map(e=>e.textContent),overflow:document.documentElement.scrollWidth>innerWidth,font:getComputedStyle(document.body).fontFamily,h1Size:document.querySelector('h1')&&getComputedStyle(document.querySelector('h1')).fontSize,processHeights:q('main ol>li').map(e=>e.offsetHeight),previewHeights:q('main article[tabindex]').map(e=>e.offsetHeight),sections:q('main h2').map(e=>e.textContent),heroImages:q('main section:first-child img').length}})()`);
  results.push({name,route,width,...data});console.log(JSON.stringify(results.at(-1)));
  if(route==='/services'||route==='/services/web-dev') {const l=await send('Page.getLayoutMetrics');const img=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:0,y:0,width,height:Math.min(l.cssContentSize.height,12000),scale:1}});fs.writeFileSync(`/tmp/fonder-${name}-${route.replaceAll('/','-')}-${width}.png`,Buffer.from(img.data,'base64'));}
 }
}
fs.writeFileSync('/tmp/fonder-browser-results.json',JSON.stringify(results,null,2));ws.close();
