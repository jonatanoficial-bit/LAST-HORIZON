import test from "node:test";
import assert from "node:assert/strict";
import {createDefaultFlightState,atmosphereAt,igniteFlight,stepFlight,canSeparateStage,separateStage,flightTelemetry} from "../src/sim/flight-dynamics.js";

test("atmosphere falls from sea level to near vacuum",()=>{const sea=atmosphereAt(0),strato=atmosphereAt(50000),space=atmosphereAt(150000);assert.ok(sea.densityKgM3>1.2);assert.ok(strato.densityKgM3<.002);assert.equal(space.densityKgM3,0)});

test("guided six-axis launch produces real telemetry and reaches stage separation",()=>{const flight=createDefaultFlightState();igniteFlight(flight);let telemetry;for(let i=0;i<2200;i++){telemetry=stepFlight(flight,.05);if(canSeparateStage(flight))break}assert.ok(flight.elapsedS>=55);assert.ok(telemetry.altitudeKm>10);assert.ok(telemetry.dynamicPressurePa>0);assert.ok(telemetry.mach>1);assert.equal(separateStage(flight).ok,true);assert.equal(flight.stage,2)});

test("manual controls change three attitude axes",()=>{const flight=createDefaultFlightState();igniteFlight(flight);flight.guidance=false;flight.controls.pitch=-1;flight.controls.yaw=.8;flight.controls.roll=.6;for(let i=0;i<100;i++)stepFlight(flight,.05);assert.notEqual(flight.attitudeDeg.pitch,90);assert.notEqual(flight.attitudeDeg.yaw,90);assert.notEqual(flight.attitudeDeg.roll,0)});

test("default guidance can establish a recoverable orbit",()=>{const flight=createDefaultFlightState();igniteFlight(flight);for(let i=0;i<26000&&flight.status!=="orbit"&&!flight.failure;i++){stepFlight(flight,.05);if(canSeparateStage(flight))separateStage(flight)}const telemetry=flightTelemetry(flight);assert.equal(flight.failure,null);assert.equal(flight.status,"orbit");assert.ok(telemetry.altitudeKm>150);assert.ok(telemetry.horizontalSpeedMps>7000);assert.ok(telemetry.orbit.periapsisKm>100)});
