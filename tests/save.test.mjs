import test from "node:test";
import assert from "node:assert/strict";
import {createInitialState} from "../src/core/store.js";
import {checksum,migrate} from "../src/data/save-manager.js";
test("checksum changes when state changes",()=>{const a=createInitialState("A"),before=checksum(a);a.economy.available--;assert.notEqual(checksum(a),before)});
test("legacy save migrates without deleting campaign data",()=>{const old={meta:{saveVersion:1},campaign:{act:4},colony:{},ui:null};const next=migrate(old);assert.equal(next.meta.saveVersion,3);assert.equal(next.campaign.act,4);assert.deepEqual(next.colony.research,[]);assert.ok(next.science)});
