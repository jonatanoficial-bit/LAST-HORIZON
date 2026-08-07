import test from "node:test";
import assert from "node:assert/strict";
import {createInitialState} from "../src/core/store.js";
import {createDefaultOrbitState,orbitalSnapshot,propagateOrbit,planManeuver,warpToNode,nodeWindow,executeManeuver,requiredManeuverComplete} from "../src/sim/orbital.js";

test("a 220 km circular Earth orbit has plausible speed and period",()=>{const orbit=createDefaultOrbitState();orbit.periapsisKm=220;orbit.apoapsisKm=220;const snapshot=orbitalSnapshot(orbit);assert.ok(snapshot.velocityKmS>7.7&&snapshot.velocityKmS<7.9);assert.ok(snapshot.periodMinutes>88&&snapshot.periodMinutes<90);assert.ok(snapshot.eccentricity<.00001)});

test("Kepler propagation returns close to the starting anomaly after one period",()=>{const s=createInitialState(),before=orbitalSnapshot(s.mission.orbit),period=before.periodSeconds;propagateOrbit(s,period);const after=orbitalSnapshot(s.mission.orbit),error=Math.min(Math.abs(after.trueAnomalyDeg-before.trueAnomalyDeg),360-Math.abs(after.trueAnomalyDeg-before.trueAnomalyDeg));assert.ok(error<.01)});

test("maneuver node requires its window and consumes rocket-equation propellant",()=>{const s=createInitialState(),before=s.mission.orbit.propellantKg;assert.equal(planManeuver(s,"circularize").ok,true);assert.equal(nodeWindow(s).ready,false);assert.equal(warpToNode(s).ok,true);assert.equal(nodeWindow(s).ready,true);const burn=executeManeuver(s);assert.equal(burn.ok,true);assert.ok(s.mission.orbit.propellantKg<before);assert.equal(requiredManeuverComplete(s,3),true);assert.ok(orbitalSnapshot(s.mission.orbit).eccentricity<.00001)});

test("departure is blocked before circularization and completes the flight requirement after burn",()=>{const s=createInitialState();assert.equal(planManeuver(s,"departure").ok,false);planManeuver(s,"circularize");warpToNode(s);executeManeuver(s);assert.equal(planManeuver(s,"departure").ok,true);warpToNode(s);const burn=executeManeuver(s);assert.equal(burn.ok,true);assert.equal(s.mission.orbit.status,"departure");assert.equal(requiredManeuverComplete(s,4),true);assert.ok(s.mission.route.progress>=1)});
