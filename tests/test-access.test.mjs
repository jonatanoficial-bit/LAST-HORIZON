import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {createInitialState} from "../src/core/store.js";
import {createTestAccessState,testAccessPoints} from "../src/sim/test-access.js";
import {recalculate,simulateLaunch} from "../src/sim/simulation.js";

const data=JSON.parse(await readFile(new URL("../data/game.json",import.meta.url),"utf8"));
const crewOps=JSON.parse(await readFile(new URL("../data/crew-operations.json",import.meta.url),"utf8"));
const solarData=JSON.parse(await readFile(new URL("../data/solar-system.json",import.meta.url),"utf8"));
const options={data,crewOps,solarData};

test("five isolated test entry points prepare a certified mission with unlimited budget",()=>{
  const current=createInitialState("PLAYER-CAMPAIGN");
  assert.equal(testAccessPoints.length,5);
  for(const point of testAccessPoints){
    const state=createTestAccessState(current,point.id,{...options,seed:`TEST-${point.id}`});
    assert.equal(state.meta.testMode.enabled,true);
    assert.equal(state.meta.testMode.isolatedSave,true);
    assert.equal(state.ui.route,point.route);
    assert.ok(state.economy.available>=999000);
    assert.equal(state.ship.designValid,true);
    assert.equal(state.mission.checklists.tests,true);
    assert.equal(state.mission.checklists.crew,true);
  }
});

test("test launch cannot fail randomly but the normal campaign retains causal risk",()=>{
  const testState=createTestAccessState(createInitialState(),"countdown",{...options,seed:"SAFE-LAUNCH"});
  const result=simulateLaunch(testState);
  assert.deepEqual(result,{failed:false,risk:0});
  const normal=recalculate(createInitialState("NORMAL-RISK"),data,crewOps);
  assert.ok(simulateLaunch(normal).risk>=2);
});

test("map and cruise shortcuts use a physical Mars route",()=>{
  const map=createTestAccessState(createInitialState(),"map",{...options,seed:"MAP-QA"});
  assert.equal(map.mission.flightStage,4);
  assert.equal(map.mission.navigation.route.targetId,"mars");
  assert.equal(map.mission.navigation.locked,false);
  assert.ok(map.mission.orbit.executed.some(node=>node.type==="circularize"));
  const cruise=createTestAccessState(createInitialState(),"cruise",{...options,seed:"CRUISE-QA"});
  assert.equal(cruise.mission.navigation.locked,true);
  assert.ok(cruise.mission.navigation.route.transferDays>100);
  assert.ok(cruise.mission.orbit.executed.some(node=>node.type==="departure"));
});

test("test autosave and map recenter controls are wired without replacing campaign autosave",async()=>{
  const [app,map,worker]=await Promise.all([
    readFile(new URL("../src/app.js",import.meta.url),"utf8"),
    readFile(new URL("../src/ui/navigation-map.js",import.meta.url),"utf8"),
    readFile(new URL("../service-worker.js",import.meta.url),"utf8")
  ]);
  assert.match(app,/test-autosave/);
  assert.match(app,/lh-has-test-save/);
  assert.match(app,/data-nav-center/);
  assert.match(map,/data-nav-center/);
  assert.match(worker,/test-access\.js/);
});
