import test from "node:test";
import assert from "node:assert/strict";
import {createInitialState} from "../src/core/store.js";
import {createDefaultFlightState,flightTelemetry,igniteFlight,stepFlight} from "../src/sim/flight-dynamics.js";
import {ensureFlightTrainingState,flightTrainingSnapshot,advanceFlightTraining,skipFlightTraining,resetActiveFlightTraining} from "../src/sim/flight-training.js";

test("first mission starts with a fixed tutorial and later missions do not reopen it",()=>{const state=createInitialState("TRAINING");const flight=state.mission.flight6d,training=ensureFlightTrainingState(state);assert.equal(training.status,"active");assert.equal(flightTrainingSnapshot(flight,flightTelemetry(flight),training).step.id,"ignition");igniteFlight(flight);assert.equal(flightTrainingSnapshot(flight,flightTelemetry(flight),training).ready,true);training.step=5;flight.status="orbit";advanceFlightTraining(state,flight);assert.equal(training.status,"completed");resetActiveFlightTraining(state);assert.equal(training.status,"completed")});

test("training explains physical separation and can always be skipped",()=>{const state=createInitialState("TRAINING-SKIP"),flight=createDefaultFlightState(),training=ensureFlightTrainingState(state);training.step=3;igniteFlight(flight);for(let i=0;i<1800&&!flight.stageSeparated;i++)stepFlight(flight,.05);const snapshot=flightTrainingSnapshot(flight,flightTelemetry(flight),training);assert.equal(snapshot.ready,true);assert.match(snapshot.step.body,/T\+82 s \/ 20,6 km/);skipFlightTraining(state);assert.equal(training.status,"skipped")});
