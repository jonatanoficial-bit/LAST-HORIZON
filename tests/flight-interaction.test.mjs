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

test("guided flight tutorial has a persistent first-mission rail and can be skipped or reopened",async()=>{
  const [tutorial,training,app,css]=await Promise.all([readFile(new URL("src/ui/flight-tutorial.js",root),"utf8"),readFile(new URL("src/sim/flight-training.js",root),"utf8"),readFile(new URL("src/app.js",root),"utf8"),readFile(new URL("styles/screens.css",root),"utf8")]);
  assert.match(tutorial,/PASSO 1 · AUTORIZAÇÃO/);
  assert.match(tutorial,/PASSO 6 · MISSÃO/);
  assert.match(tutorial,/PULAR TUTORIAL/);
  assert.match(tutorial,/event\.target\.closest\("button"\)/);
  assert.match(tutorial,/event\.key==="Escape"/);
  assert.match(tutorial,/if\(closed\)return/);
  const focusRule=css.match(/\.flight-tutorial-focus\{([^}]*)\}/)?.[1]||"";
  assert.doesNotMatch(focusRule,/z-index/,"highlighted cockpit targets must never cover the tutorial controls");
  assert.match(css,/\.flight-tutorial-overlay\{[^}]*z-index:3000/);
  assert.match(app,/data-flight-tutorial/);
  assert.match(app,/data-flight-training-skip/);
  assert.match(app,/flight-training-rail/);
  assert.match(training,/firstMission:true/);
  assert.match(training,/training\.status="skipped"/);
  assert.doesNotMatch(app,/lh-flight-tutorial-seen-v2/);
});

test("landscape mobile override keeps critical and axis controls visible",async()=>{
  const css=await readFile(new URL("styles/screens.css",root),"utf8"),hidden=css.lastIndexOf(".immersive-cockpit .flight-controls{display:none}"),visible=css.lastIndexOf(".immersive-cockpit .flight-controls{display:grid!important");
  assert.ok(hidden>=0,"legacy compact rule remains documented");
  assert.ok(visible>hidden,"later hotfix must override the hidden mobile controls");
  assert.match(css,/flight-window-actions/);
  assert.match(css,/touch-action:none/);
});

test("flight offers commander delegation, manual control and black-screen recovery",async()=>{const [app,css]=await Promise.all([readFile(new URL("src/app.js",root),"utf8"),readFile(new URL("styles/screens.css",root),"utf8")]);assert.match(app,/data-flight-role="command"/);assert.match(app,/data-flight-role="manual"/);assert.match(app,/data-flight-order="nominal"/);assert.match(app,/data-six-recover/);assert.match(app,/activateFlightFallback/);assert.match(app,/VISUAL 2D DE SEGURANÇA/);assert.match(app,/ignition-cinematic/);assert.match(app,/worldShift=-lookYaw/);assert.match(css,/command-authority/);assert.match(css,/navigation-planner/)});

test("a real planetary route is mandatory before departure",async()=>{const [app,map]=await Promise.all([readFile(new URL("src/app.js",root),"utf8"),readFile(new URL("src/ui/navigation-map.js",root),"utf8")]);assert.match(app,/data-nav-target/);assert.match(app,/data-nav-lock/);assert.match(app,/A rota é obrigatória/);assert.match(map,/GPS HELIOCÊNTRICO/);assert.match(map,/ARK-01/)});
