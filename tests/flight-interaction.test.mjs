import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {createDefaultFlightState,flightTelemetry,igniteFlight,stepFlight} from "../src/sim/flight-dynamics.js";

const root=new URL("../",import.meta.url);

test("visible ignition starts ascent and produces motion",()=>{
  const flight=createDefaultFlightState(),before=flightTelemetry(flight);
  assert.equal(igniteFlight(flight).ok,true);
  for(let i=0;i<100;i++)stepFlight(flight,.05);
  const after=flightTelemetry(flight);
  assert.equal(flight.status,"ascent");
  assert.ok(after.altitudeM>before.altitudeM);
  assert.ok(after.thrustN>0);
});

test("flight viewport implements drag look and explicit centering",async()=>{
  const [app,renderer]=await Promise.all([readFile(new URL("src/app.js",root),"utf8"),readFile(new URL("src/ui/flight-3d.js",root),"utf8")]);
  assert.match(app,/pointermove/);
  assert.match(app,/flightLook\.yawDeg/);
  assert.match(app,/data-camera-center/);
  assert.match(renderer,/look\.yawDeg/);
  assert.match(renderer,/rotateAround\(forward,cameraUp,yaw\)/);
});

test("guided flight tutorial contains five steps and can be skipped or reopened",async()=>{
  const [tutorial,app]=await Promise.all([readFile(new URL("src/ui/flight-tutorial.js",root),"utf8"),readFile(new URL("src/app.js",root),"utf8")]);
  assert.match(tutorial,/PASSO 1 · DECOLAGEM/);
  assert.match(tutorial,/PASSO 5 · MISSÃO/);
  assert.match(tutorial,/PULAR TUTORIAL/);
  assert.match(app,/data-flight-tutorial/);
  assert.match(app,/lh-flight-tutorial-seen-v2/);
});

test("landscape mobile override keeps critical and axis controls visible",async()=>{
  const css=await readFile(new URL("styles/screens.css",root),"utf8"),hidden=css.lastIndexOf(".immersive-cockpit .flight-controls{display:none}"),visible=css.lastIndexOf(".immersive-cockpit .flight-controls{display:grid!important");
  assert.ok(hidden>=0,"legacy compact rule remains documented");
  assert.ok(visible>hidden,"later hotfix must override the hidden mobile controls");
  assert.match(css,/flight-window-actions/);
  assert.match(css,/touch-action:none/);
});
