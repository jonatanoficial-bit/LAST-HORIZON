import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {createInitialState} from "../src/core/store.js";
import {commitRendezvousResult,createRendezvousState,rendezvousConstants,rendezvousTelemetry,stepRendezvous} from "../src/sim/rendezvous.js";

test("relative orbital model uses a plausible 220 km mean motion",()=>{
  assert.ok(rendezvousConstants.meanMotionRadS>.001);
  assert.ok(rendezvousConstants.meanMotionRadS<.0013);
  const rv=createRendezvousState("CW");
  const before={x:rv.x,y:rv.y};
  for(let i=0;i<100;i++)stepRendezvous(rv,{},.1);
  assert.notEqual(rv.x,before.x);
  assert.notEqual(rv.y,before.y);
});

test("RCS impulse changes closing velocity and consumes finite propellant",()=>{
  const rv=createRendezvousState("RCS"),fuel=rv.rcsPropellantKg,vx=rv.vx;
  for(let i=0;i<20;i++)stepRendezvous(rv,{forward:1},.1);
  assert.ok(rv.vx<vx);
  assert.ok(rv.rcsPropellantKg<fuel);
  assert.ok(rv.rcsPropellantKg>=0);
});

test("safe contact docks while excessive impact speed causes collision",()=>{
  const safe=createRendezvousState("SAFE");Object.assign(safe,{x:1.08,y:.04,z:.03,vx:-.06,vy:0,vz:0,pitch:0,yaw:0,roll:0});
  for(let i=0;i<30&&safe.status!=="docked";i++)stepRendezvous(safe,{},.1);
  assert.equal(safe.status,"docked");
  const impact=createRendezvousState("IMPACT");Object.assign(impact,{x:1.08,y:.1,z:.04,vx:-.8,vy:0,vz:0,pitch:0,yaw:0,roll:0});
  for(let i=0;i<20&&impact.status!=="collision";i++)stepRendezvous(impact,{},.1);
  assert.equal(impact.status,"collision");
});

test("rendezvous result persists in campaign and modifies an active operation",()=>{
  const state=createInitialState("RVD-OPS");state.operations.active={status:"active",risk:40,score:0};
  commitRendezvousResult(state,{status:"docked",at:90,rangeM:.5,speedMps:.08,lateralM:.1,attitudeErrorDeg:1,propellantUsedKg:1.2});
  assert.equal(state.mission.rendezvousHistory.length,1);
  assert.equal(state.operations.active.risk,28);
  assert.equal(state.operations.active.score,15);
  assert.equal(state.operations.active.rendezvousQualified,true);
  commitRendezvousResult(state,{status:"docked",at:80,rangeM:.4,speedMps:.06,lateralM:.05,attitudeErrorDeg:.5,propellantUsedKg:1});
  assert.equal(state.operations.active.score,15,"repeating training cannot farm mission score");
});

test("cinematic and voice manifests define optional, non-blocking production slots",async()=>{
  const root=new URL("../",import.meta.url),[cinematic,voice,app]=await Promise.all([
    readFile(new URL("assets/video/cinematic-manifest.json",root),"utf8").then(JSON.parse),
    readFile(new URL("assets/audio/voice-manifest.json",root),"utf8").then(JSON.parse),
    readFile(new URL("src/app.js",root),"utf8")
  ]);
  assert.equal(cinematic.cues.length,12);
  assert.ok(cinematic.cues.every(cue=>cue.src.endsWith(".mp4")&&!cue.enabled));
  assert.equal(voice.lines.length,18);
  assert.ok(voice.lines.every(line=>line.text&&line.src.endsWith(".mp3")&&!line.enabled));
  assert.match(app,/playCinematicCue/);
  assert.match(app,/createRendezvousController/);
});

test("telemetry exposes range, closing rate, corridor and attitude",()=>{
  const t=rendezvousTelemetry(createRendezvousState("TEL"));
  for(const key of ["rangeM","relativeSpeedMps","closingRateMps","lateralM","corridorDeg","attitudeErrorDeg","propellantPct"])assert.equal(Number.isFinite(t[key]),true);
});
