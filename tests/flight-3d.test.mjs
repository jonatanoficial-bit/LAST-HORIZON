import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {createFlight3DRenderer} from "../src/ui/flight-3d.js";
import {createFlightAudio} from "../src/audio/flight-audio.js";

test("immersive flight renderer exports an offline WebGL pipeline",()=>{const source=fs.readFileSync(new URL("../src/ui/flight-3d.js",import.meta.url),"utf8");assert.equal(typeof createFlight3DRenderer,"function");assert.match(source,/uEarth/);assert.match(source,/uAtmosphere/);assert.match(source,/rocketMesh/);assert.match(source,/earth-blue-marble-2048\.jpg/);assert.doesNotMatch(source,/https?:\/\//)});
test("flight audio provides a silent-compatible engine",()=>{const audio=createFlightAudio(false);assert.equal(typeof audio.start,"function");assert.equal(typeof audio.update,"function");assert.equal(typeof audio.cue,"function");assert.doesNotThrow(()=>{audio.start();audio.update({},{});audio.cue();audio.stop()})});
