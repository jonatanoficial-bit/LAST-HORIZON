import test from "node:test";
import assert from "node:assert/strict";
import {createDefaultFlightState,atmosphereAt,igniteFlight,stepFlight,setFlightControlMode,issueFlightOrder,flightTelemetry} from "../src/sim/flight-dynamics.js";

test("atmosphere falls from sea level to near vacuum",()=>{const sea=atmosphereAt(0),strato=atmosphereAt(50000),space=atmosphereAt(150000);assert.ok(sea.densityKgM3>1.2);assert.ok(strato.densityKgM3<.002);assert.equal(space.densityKgM3,0)});

test("commander launch produces real telemetry and the pilot separates automatically",()=>{const flight=createDefaultFlightState();igniteFlight(flight);let telemetry;for(let i=0;i<2600&&!flight.stageSeparated;i++)telemetry=stepFlight(flight,.05);assert.ok(flight.elapsedS>=80);assert.ok(telemetry.altitudeKm>10);assert.ok(telemetry.dynamicPressurePa>0);assert.ok(telemetry.mach>1);assert.equal(flight.stageSeparated,true);assert.equal(flight.stage,2)});

test("surface-relative speed starts at zero while inertial speed includes Earth rotation",()=>{const telemetry=flightTelemetry(createDefaultFlightState());assert.ok(telemetry.speedMps<.01);assert.ok(telemetry.inertialSpeedMps>400)});

test("commander can delegate orders or assume direct control",()=>{const flight=createDefaultFlightState();assert.equal(flight.controlMode,"command");assert.equal(issueFlightOrder(flight,"maxq").ok,true);assert.equal(flight.controls.throttle,72);assert.equal(setFlightControlMode(flight,"manual"),"manual");assert.equal(flight.guidance,false);assert.equal(flight.autoStageSeparation,false)});

test("manual controls change three attitude axes",()=>{const flight=createDefaultFlightState();igniteFlight(flight);flight.guidance=false;flight.controls.pitch=-1;flight.controls.yaw=.8;flight.controls.roll=.6;for(let i=0;i<100;i++)stepFlight(flight,.05);assert.notEqual(flight.attitudeDeg.pitch,90);assert.notEqual(flight.attitudeDeg.yaw,90);assert.notEqual(flight.attitudeDeg.roll,0)});

test("default guidance can establish a recoverable orbit",()=>{const flight=createDefaultFlightState();igniteFlight(flight);for(let i=0;i<26000&&flight.status!=="orbit"&&!flight.failure;i++)stepFlight(flight,.05);const telemetry=flightTelemetry(flight);assert.equal(flight.failure,null);assert.equal(flight.status,"orbit");assert.ok(telemetry.altitudeKm>150);assert.ok(telemetry.horizontalSpeedMps>7000);assert.ok(telemetry.orbit.periapsisKm>100)});
