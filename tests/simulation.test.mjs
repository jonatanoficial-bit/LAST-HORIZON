import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {createInitialState} from "../src/core/store.js";
import {recalculate,completeTest,simulateLaunch,scanPlanet,buildColony,endingFor} from "../src/sim/simulation.js";
const data=JSON.parse(await readFile(new URL("../data/game.json",import.meta.url),"utf8"));

test("same seed produces the same critical launch result",()=>{
  const prepare=()=>{const s=createInitialState("REPEATABLE-42");s.ship.design={propulsion:"nuclear",habitat:"dual",power:"hybrid",shield:"water"};s.mission.testsCompleted=["bench","vibration","vacuum","software"];s.mission.testGain=13;s.crew.members=data.crew.slice(0,6).map(c=>c.id);return recalculate(s,data)};
  const a=prepare(),b=prepare();assert.deepEqual(simulateLaunch(a),simulateLaunch(b));assert.equal(a.meta.rngState,b.meta.rngState);
});
test("integrated design derives mass, power, thermal and delta-v",()=>{const s=createInitialState();s.ship.design={propulsion:"nuclear",habitat:"compact",power:"fission",shield:"light"};recalculate(s,data);assert.equal(s.ship.designValid,true);assert.ok(s.ship.mass.total<43000);assert.ok(s.ship.powerMargin>=80);assert.ok(s.ship.deltaV>=2000)});
test("tests spend budget and improve evidence",()=>{const s=recalculate(createInitialState(),data),before=s.economy.available;completeTest(s,data.tests[0]);recalculate(s,data);assert.equal(s.economy.available,before-data.tests[0].cost);assert.equal(s.mission.testsCompleted.length,1);assert.ok(s.mission.testGain>=data.tests[0].gain)});
test("planet labels are confidence weighted",()=>{const s=createInitialState();const first=scanPlanet(s,data.planets[0]);assert.equal(first.confidence,34);assert.ok(first.habitability<50);const second=scanPlanet(s,data.planets[0]);assert.equal(second.confidence,68);assert.ok(second.habitability>first.habitability)});
test("colony construction has finite resources and dependencies remain observable",()=>{const s=createInitialState();const before=s.colony.resources.materials;assert.equal(buildColony(s,data.buildings[0]),true);assert.equal(s.colony.resources.materials,before-data.buildings[0].cost);assert.equal(buildColony(s,data.buildings[0]),false)});
test("ending explains state-derived outcome",()=>{const s=createInitialState();s.mission.route.target="aurelia";s.science.targets.aurelia={confidence:75};s.ship.integrity=95;s.crew.morale=90;s.ship.capacity=100;s.colony.founded=true;s.colony.buildings=data.buildings.slice(0,5).map(b=>b.id);s.colony.research=["closed-loop","autofab"];s.colony.governance.policy="council";const ending=endingFor(s);assert.equal(ending.id,"dawn");assert.ok(ending.scores.survival>=78)});
