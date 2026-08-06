const CACHE="last-horizon-4.4.0-r2";
const CORE=["./","./index.html","./404.html","./manifest.webmanifest","./version.json","./styles/tokens.css","./styles/base.css","./styles/layout.css","./styles/components.css","./styles/screens.css?v=2","./styles/accessibility.css","./src/app.js","./src/core/store.js","./src/core/rng.js","./src/data/save-manager.js","./src/sim/simulation.js","./src/ui/router.js","./data/game.json","./data/locales.json","./assets/icons/icon.svg","./assets/images/brand/bg-main-menu-earth-orbit.webp","./assets/images/brand/bg-main-menu-earth-orbit.png"];
self.addEventListener("install",event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener("activate",event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET")return;
  event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request).then(response=>{if(response.ok&&new URL(event.request.url).origin===location.origin){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy))}return response}).catch(()=>event.request.mode==="navigate"?caches.match("./index.html"):Response.error())));
});
