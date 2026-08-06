import test from "node:test";
import assert from "node:assert/strict";
import {access,readFile} from "node:fs/promises";

const root=new URL("../",import.meta.url);
const story=JSON.parse(await readFile(new URL("data/story.json",root),"utf8"));
const videoManifest=JSON.parse(await readFile(new URL("assets/video/video-manifest.json",root),"utf8"));
const flightManifest=JSON.parse(await readFile(new URL("assets/video/flight-manifest.json",root),"utf8"));
const engineering=JSON.parse(await readFile(new URL("data/engineering.json",root),"utf8"));
const crewOps=JSON.parse(await readFile(new URL("data/crew-operations.json",root),"utf8"));

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

test("engineering room has four guided reviews and complete expert portraits",async()=>{
  assert.equal(engineering.sessions.length,4);
  assert.deepEqual(engineering.sessions.map(x=>x.id),["propulsion","habitat","power","shield"]);
  for(const session of engineering.sessions){assert.equal(session.options.length,3);for(const option of session.options){assert.ok(option.risk);for(const expert of [option.supporter,option.dissenter])for(const ext of ["webp","png"])await access(new URL(`assets/images/avatars/${expert.avatar}.${ext}`,root));}}
});

test("crew operations covers every mandatory station, interview and training",async()=>{
  assert.equal(crewOps.stations.length,6);assert.equal(crewOps.training.length,3);
  const candidateIds=new Set();
  for(const station of crewOps.stations){assert.equal(station.candidates.length,2);await access(new URL(`assets/images/avatars/${station.interviewer.avatar}.webp`,root));for(const entry of station.candidates){candidateIds.add(entry.id);assert.ok(crewOps.profiles[entry.id]?.question);assert.ok(crewOps.profiles[entry.id]?.answer)}}
  assert.equal(candidateIds.size,8);
});
