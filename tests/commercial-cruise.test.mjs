import test from "node:test";
import assert from "node:assert/strict";
import {readFile,access} from "node:fs/promises";
import {createInitialState} from "../src/core/store.js";
import {advanceCruiseWatch,resolveDeepSpaceIncident,ensureDeepSpaceState,deepSpaceIncidentTemplates} from "../src/sim/deep-space.js";
import {tickDetailedSystems,executeSystemProcedure,detailedSystemsSnapshot} from "../src/sim/ship-systems.js";

function cruiseState(seed="COMMERCIAL-CRUISE"){const state=createInitialState(seed);state.mission.navigation.route={targetName:"Marte",transferDays:300,communicationDelayMin:8};state.mission.navigation.progress=0;state.mission.route.progress=0;state.crew.assignments={command:"amara",flight:"jun",engineering:"elias",medical:"asha",science:"malik",operations:"lena"};state.crew.fatigue={amara:0,jun:0,elias:0,asha:0,malik:0,lena:0};return state}

test("commercial cruise propagates real route time and always opens a command incident",()=>{const state=cruiseState(),result=advanceCruiseWatch(state);assert.equal(result.ok,true);assert.equal(result.days,90);assert.equal(state.mission.navigation.progress,30);assert.ok(ensureDeepSpaceState(state).current);assert.equal(advanceCruiseWatch(state).ok,false);const choice=state.mission.deepSpace.current.choices[0];assert.equal(resolveDeepSpaceIncident(state,choice.id).ok,true);assert.equal(state.mission.deepSpace.current,null);assert.equal(advanceCruiseWatch(state).ok,true)});

test("every deep-space template has three non-blocking captain orders",()=>{assert.ok(deepSpaceIncidentTemplates.length>=8);for(const incident of deepSpaceIncidentTemplates){assert.equal(incident.choices.length,3);assert.ok(incident.choices.every(choice=>choice.id&&choice.label&&choice.detail&&Number.isFinite(choice.safety)))}});

test("persistent ship systems degrade with time and procedures consume finite spares",()=>{const state=cruiseState("SYSTEMS"),before=detailedSystemsSnapshot(state),spares=before.model.maintenance.spares;tickDetailedSystems(state,90*24,{stress:1.2});const degraded=detailedSystemsSnapshot(state);assert.ok(degraded.model.lifeSupport.co2ppm>before.model.lifeSupport.co2ppm);assert.ok(degraded.model.navigation.driftKm>0);const result=executeSystemProcedure(state,"nav-calibrate");assert.equal(result.ok,true);assert.equal(result.snapshot.model.navigation.driftKm,0);const repair=executeSystemProcedure(state,"hull-maintenance");assert.equal(repair.ok,true);assert.equal(repair.snapshot.model.maintenance.spares,spares-3)});

test("commercial bridge art and production UI are bundled",async()=>{const root=new URL("../",import.meta.url);await access(new URL("assets/images/scenes/deep-space-bridge-v1.webp",root));const [app,ui,css,worker]=await Promise.all([readFile(new URL("src/app.js",root),"utf8"),readFile(new URL("src/ui/deep-space-command.js",root),"utf8"),readFile(new URL("styles/commercial.css",root),"utf8"),readFile(new URL("service-worker.js",root),"utf8")]);assert.match(app,/advanceCruiseWatch/);assert.match(ui,/data-deep-choice/);assert.match(ui,/data-system-procedure/);assert.match(css,/deep-space-bridge/);assert.match(worker,/deep-space-bridge-v1/)});
