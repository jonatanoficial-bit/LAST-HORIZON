import test from "node:test";
import assert from "node:assert/strict";
import {createInitialState} from "../src/core/store.js";
import {currentOrbitalBrief,orbitalCommandReady,resolveOrbitalCommandDecision} from "../src/sim/orbital-command.js";
import {operationReadiness} from "../src/sim/mission-operations.js";

test("the orbital council blocks phase completion until the captain decides",()=>{
  const state=createInitialState("COUNCIL-STAGE-3");state.mission.flightStage=3;
  assert.equal(currentOrbitalBrief(state,3).id,"orbit-doctrine");
  assert.equal(orbitalCommandReady(state,3),false);
  const result=resolveOrbitalCommandDecision(state,"orbit-doctrine","independent");
  assert.equal(result.ok,true);assert.equal(orbitalCommandReady(state,3),true);
  assert.equal(state.mission.commandCouncil.modifiers.operationRisk,-4);
  assert.equal(state.campaign.decisions.at(-1).title,"Conselho orbital: Quem controla o corredor orbital?");
});

test("three command choices persist and alter later operation readiness",()=>{
  const state=createInitialState("COUNCIL-STAGE-4");state.mission.flightStage=4;
  const contract=state.operations.board[0],before=operationReadiness(state,contract).readiness;
  assert.equal(resolveOrbitalCommandDecision(state,"orbit-doctrine","independent").ok,true);
  assert.equal(resolveOrbitalCommandDecision(state,"reserve-policy","instruments").ok,true);
  assert.equal(resolveOrbitalCommandDecision(state,"crew-authority","aura").ok,true);
  assert.equal(orbitalCommandReady(state,4),true);
  assert.equal(state.mission.commandCouncil.resolved.length,3);
  assert.ok(operationReadiness(state,contract).readiness>before);
  assert.equal(state.mission.commandCouncil.modifiers.operationRisk,-8);
});
