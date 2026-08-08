import test from "node:test";
import assert from "node:assert/strict";
import {readFile,stat} from "node:fs/promises";
import {createHash} from "node:crypto";

const root=new URL("../",import.meta.url),manifest=JSON.parse(await readFile(new URL("assets/video/video-manifest.json",root),"utf8")),video=await readFile(new URL(`assets/video/${manifest.src}`,root)),app=await readFile(new URL("src/app.js",root),"utf8"),worker=await readFile(new URL("service-worker.js",root),"utf8"),ignore=await readFile(new URL(".gitignore",root),"utf8");

test("intro MP4 is compact, indexed before media and matches its manifest",async()=>{
  const file=await stat(new URL(`assets/video/${manifest.src}`,root)),hash=createHash("sha256").update(video).digest("hex").toUpperCase();
  assert.equal(file.size,manifest.sizeBytes);assert.equal(hash,manifest.sha256);assert.equal(manifest.fastStart,true);assert.ok(video.indexOf("moov")<video.indexOf("mdat"));assert.ok(file.size<100*1024*1024);
});

test("prologue handles autoplay policy, retry and explicit audio activation",()=>{
  for(const marker of ["data-video-start","data-video-retry","data-video-audio","video.muted=true","await video.play()","FAST START"])assert.ok(app.includes(marker),`controle ausente: ${marker}`);
  assert.ok(app.includes("82,9 MB incluído"));
  assert.ok(app.includes("O arquivo reduzido está armazenado dentro do jogo."));
  assert.ok(!ignore.split(/\r?\n/).some(line=>line.trim()==="assets/video/prologo.mp4"),"the production prologue cannot be ignored by Git");
  assert.ok(!app.includes("Abrindo o prólogo interativo."));
});

test("service worker leaves MP4 streaming and byte ranges to the server",()=>assert.ok(worker.includes('event.request.destination==="video"')));
