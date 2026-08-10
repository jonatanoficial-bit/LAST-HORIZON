import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {createInitialState} from "../src/core/store.js";
import {estimateInterplanetaryRoute,selectNavigationTarget,lockNavigationRoute} from "../src/sim/interplanetary.js";

const solarData=JSON.parse(await readFile(new URL("../data/solar-system.json",import.meta.url),"utf8"));

test("JPL positions produce a finite Earth-to-Mars transfer",()=>{const state=createInitialState("NAV-MARS"),route=estimateInterplanetaryRoute(state,solarData,"mars");assert.equal(route.targetName,"Marte");assert.ok(route.separationAu>.1);assert.ok(route.transferDays>100);assert.ok(route.departureDvMps>1000);assert.ok(Number.isFinite(route.phaseErrorDeg));assert.ok(route.cruiseSpeedKmS>0);assert.ok(route.communicationDelayMin>0);assert.ok(new Date(route.arrivalDateIso)>new Date(route.dateIso));assert.ok(Number.isFinite(route.targetArrival.x));assert.ok(route.transferOrbit.aAu>.5)});
test("the commander must select and lock a non-Earth route",()=>{const state=createInitialState("NAV-LOCK");assert.equal(selectNavigationTarget(state,solarData,"earth").ok,false);const selected=selectNavigationTarget(state,solarData,"saturn");assert.equal(selected.ok,true);assert.equal(state.mission.navigation.locked,false);assert.equal(state.mission.navigation.mapView,"giants");const locked=lockNavigationRoute(state);assert.equal(locked.ok,true);assert.equal(state.mission.navigation.locked,true);assert.equal(state.mission.navigation.route.targetId,"saturn")});
