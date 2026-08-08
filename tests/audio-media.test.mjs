import test from "node:test";
import assert from "node:assert/strict";
import {readFile,stat} from "node:fs/promises";
import {normalizeAudioMix} from "../src/audio/music-director.js";

const root=new URL("../",import.meta.url);

test("six contextual background tracks are bundled and enabled",async()=>{
  const manifest=JSON.parse(await readFile(new URL("assets/audio/music-manifest.json",root),"utf8"));
  assert.equal(manifest.tracks.length,6);
  assert.deepEqual([...new Set(manifest.tracks.map(track=>track.mood))].sort(),["calm","chase","psychological"]);
  for(const track of manifest.tracks){
    assert.equal(track.enabled,true);const url=new URL(`assets/audio/music/${track.src}`,root),info=await stat(url),bytes=await readFile(url);
    assert.ok(info.size>100_000);assert.ok(bytes.subarray(0,3).toString()==="ID3"||bytes[0]===0xff,`${track.src} is not an MP3 stream`);
  }
});

test("all eighteen voice performances are bundled and prioritized over music",async()=>{
  const manifest=JSON.parse(await readFile(new URL("assets/audio/voice-manifest.json",root),"utf8")),[app,director]=await Promise.all([readFile(new URL("src/app.js",root),"utf8"),readFile(new URL("src/audio/music-director.js",root),"utf8")]);
  assert.equal(manifest.lines.length,18);
  for(const line of manifest.lines){assert.equal(line.enabled,true);assert.ok((await stat(new URL(`assets/audio/voices/${line.src}`,root))).size>50_000);assert.match(app,new RegExp(`[\"']${line.id}[\"']`))}
  assert.match(app,/onState:duckMusic/);assert.match(director,/duckers>0\?\.16:1/);
});

test("settings expose persistent music, voice and effects channels",async()=>{
  const [app,store,saves]=await Promise.all([readFile(new URL("src/app.js",root),"utf8"),readFile(new URL("src/core/store.js",root),"utf8"),readFile(new URL("src/data/save-manager.js",root),"utf8")]);
  for(const id of ["music-volume","voice-volume","effects-volume"])assert.match(app,new RegExp(id));
  assert.match(store,/audioMix:\{music:22,voices:90,effects:56\}/);assert.match(saves,/migrateV12/);
  assert.deepEqual(normalizeAudioMix({music:-5,voices:140,effects:40}),{music:0,voices:100,effects:40});
});
