import test from "node:test";
import assert from "node:assert/strict";
import {access,readFile} from "node:fs/promises";

const root=new URL("../",import.meta.url);
const story=JSON.parse(await readFile(new URL("data/story.json",root),"utf8"));
const videoManifest=JSON.parse(await readFile(new URL("assets/video/video-manifest.json",root),"utf8"));
const flightManifest=JSON.parse(await readFile(new URL("assets/video/flight-manifest.json",root),"utf8"));

test("guided campaign covers every playable act",()=>{
  const routes=["agency","design","testing","crew","countdown","flight","cruise","science","landing","colony","governance"];
  assert.equal(story.prologue.length,4);
  for(const route of routes){assert.ok(story.briefings[route],`briefing ausente: ${route}`);assert.ok(story.briefings[route].objective);assert.ok(story.briefings[route].tip)}
});

test("all cinematic advisor portraits and scenes exist in both formats",async()=>{
  const avatars=new Set([...story.prologue.map(x=>x.avatar),...Object.values(story.briefings).map(x=>x.avatar)]);
  const scenes=new Set(story.prologue.map(x=>x.scene));
  for(const avatar of avatars)for(const ext of ["webp","png"])await access(new URL(`assets/images/avatars/${avatar}.${ext}`,root));
  for(const scene of scenes)for(const ext of ["webp","png"])await access(new URL(`assets/images/scenes/${scene}.${ext}`,root));
});

test("intro video and five optional flight sequences are wired",async()=>{
  assert.equal(videoManifest.enabled,true);
  await access(new URL(`assets/video/${videoManifest.src}`,root));
  assert.equal(flightManifest.phases.length,5);
  assert.deepEqual(flightManifest.phases.map(x=>x.id),["ignition","maxq","separation","orbit","departure"]);
  assert.equal(flightManifest.failure.src,"explosion-game-over.mp4");
  await access(new URL("assets/images/scenes/flight-deck-v2.webp",root));
});
