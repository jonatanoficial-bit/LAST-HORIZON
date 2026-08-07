const CACHE="last-horizon-5.0.0-orbital-navigation";
const AVATARS=["amara-diallo","asha-rao","elias-brandt","imani-okafor","jun-park","lena-volkov","malik-okoye","mateo-vega","nayara-quispe","rafael-costa","samira-haddad"];
const SCENES=["mission-control","integration-bay","flight-deck","flight-deck-v2","launch-pad","deep-cruise","aurelia-colony"];
const MEDIA=[...AVATARS.flatMap(name=>[`./assets/images/avatars/${name}.webp`,`./assets/images/avatars/${name}.png`]),...SCENES.flatMap(name=>[`./assets/images/scenes/${name}.webp`,`./assets/images/scenes/${name}.png`])];
const CORE=["./","./index.html","./404.html","./manifest.webmanifest","./version.json?v=5.0.0","./styles/tokens.css","./styles/base.css","./styles/layout.css","./styles/components.css","./styles/screens.css?v=7","./styles/accessibility.css","./src/app.js","./src/core/store.js","./src/core/rng.js","./src/data/save-manager.js","./src/sim/simulation.js","./src/sim/orbital.js","./src/ui/router.js","./data/game.json","./data/locales.json?v=5.0.0","./data/story.json?v=5.0.0","./data/engineering.json?v=5.0.0","./data/crew-operations.json?v=5.0.0","./assets/video/video-manifest.json?v=5.0.0","./assets/video/flight-manifest.json?v=5.0.0","./assets/icons/icon.svg","./assets/images/brand/bg-main-menu-earth-orbit.webp","./assets/images/brand/bg-main-menu-earth-orbit.png",...MEDIA];
self.addEventListener("install",event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener("activate",event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET")return;
  if(event.request.destination==="video")return;
  event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request).then(response=>{if(response.ok&&new URL(event.request.url).origin===location.origin){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy))}return response}).catch(()=>event.request.mode==="navigate"?caches.match("./index.html"):Response.error())));
});
