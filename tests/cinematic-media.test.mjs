import test from "node:test";
import assert from "node:assert/strict";
import {readFile,stat} from "node:fs/promises";

const root=new URL("../",import.meta.url);

test("all twelve delivered MP4 files are present, valid containers and GitHub-safe",async()=>{
  const manifest=JSON.parse(await readFile(new URL("assets/video/cinematic-manifest.json",root),"utf8"));
  const enabled=manifest.cues.filter(cue=>cue.enabled);
  assert.equal(enabled.length,12);
  for(const cue of enabled){
    const url=new URL(`assets/video/cinematics/${cue.src}`,root),info=await stat(url),bytes=await readFile(url),ascii=bytes.toString("latin1");
    assert.ok(info.size>1024,`${cue.src} is unexpectedly small`);
    assert.ok(info.size<100_000_000,`${cue.src} exceeds GitHub's individual file limit`);
    assert.ok(ascii.indexOf("ftyp")>=0,`${cue.src} has no MP4 ftyp box`);
    assert.ok(ascii.indexOf("moov")>=0,`${cue.src} has no MP4 moov box`);
    assert.ok(ascii.indexOf("mdat")>=0,`${cue.src} has no MP4 media-data box`);
  }
});

test("mission code maps every delivered cinematic to its physical or narrative event",async()=>{
  const app=await readFile(new URL("src/app.js",root),"utf8");
  for(const id of ["launch_ignition","launch_maxq","stage_separation","orbit_insertion","departure_burn","docking_success","docking_collision","debris_impact","atmospheric_entry","touchdown","mission_failure","first_contact"])
    assert.match(app,new RegExp(`[\"']${id}[\"']`),`${id} is not connected to a mission event`);
  assert.match(app,/result\.status==="docked"\?"docking_success"/);
});
