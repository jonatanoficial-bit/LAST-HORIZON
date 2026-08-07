import test from "node:test";
import assert from "node:assert/strict";
import {access,readFile} from "node:fs/promises";
import {createInitialState} from "../src/core/store.js";
import {
  acceptOperation,
  authorizeOrbitalResupply,
  closeOperationReport,
  generateContractBoard,
  resolveOperationDecision
} from "../src/sim/mission-operations.js";

test("contract board is deterministic and offers distinct mission families",()=>{
  const a=generateContractBoard("HAVEN-TEST",3,7);
  const b=generateContractBoard("HAVEN-TEST",3,7);
  assert.deepEqual(a,b);
  assert.equal(a.length,3);
  assert.equal(new Set(a.map(item=>item.category)).size,3);
  assert.ok(a.every(item=>item.phases.length===3&&item.phases.every(phase=>phase.choices.length===3)));
});

test("an operation applies three persistent decisions and opens a new cycle",()=>{
  const state=createInitialState("OPS-PROGRESSION");
  state.campaign.act=10;
  const contract=state.operations.board[0];
  const accepted=acceptOperation(state,contract.uid);
  assert.equal(accepted.ok,true);
  assert.equal(state.operations.active.step,0);
  const fuelBefore=state.mission.orbit.propellantKg;
  for(const phase of contract.phases){
    const affordable=phase.choices.find(choice=>(choice.fuel||0)<=state.mission.orbit.propellantKg)??phase.choices[0];
    assert.equal(resolveOperationDecision(state,affordable.id).ok,true);
  }
  assert.equal(state.operations.active.status,"complete");
  assert.equal(state.operations.active.report.decisions.length,3);
  assert.ok(state.time.missionHours>0);
  assert.ok(state.mission.orbit.propellantKg!==fuelBefore);
  const previousCycle=state.operations.cycle;
  assert.equal(closeOperationReport(state).ok,true);
  assert.equal(state.operations.cycle,previousCycle+1);
  assert.equal(state.operations.board.length,3);
});

test("orbital resupply prevents a campaign fuel soft lock",()=>{
  const state=createInitialState("OPS-RESUPPLY");
  state.economy.available=0;
  state.mission.orbit.propellantKg=12;
  state.systems.propulsion.fuelPct=0;
  const result=authorizeOrbitalResupply(state);
  assert.equal(result.ok,true);
  assert.equal(state.mission.orbit.propellantKg,3012);
  assert.ok(state.systems.propulsion.fuelPct>0);
  assert.equal(state.time.earthDate,5);
});

test("operations room and procedural planet renderer are included in the offline build",async()=>{
  const root=new URL("../",import.meta.url);
  const [app,worker,styles]=await Promise.all([
    readFile(new URL("src/app.js",root),"utf8"),
    readFile(new URL("service-worker.js",root),"utf8"),
    readFile(new URL("styles/screens.css",root),"utf8")
  ]);
  await Promise.all([
    access(new URL("assets/images/scenes/orbital-operations.png",root)),
    access(new URL("assets/images/scenes/orbital-operations.webp",root))
  ]);
  assert.match(app,/Missões Orbitais/);
  assert.match(app,/createPlanetSurfaceRenderer/);
  assert.match(worker,/mission-operations\.js/);
  assert.match(worker,/planet-surface\.js/);
  assert.match(styles,/orbital-operations\.png/);
});
