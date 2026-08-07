import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {julianDate,planetaryPositions,distanceBetween,earthSunDirection} from "../src/sim/solar-system.js";

const solarData=JSON.parse(await readFile(new URL("../data/solar-system.json",import.meta.url),"utf8"));

test("J2000 epoch converts to the canonical Julian date",()=>assert.equal(julianDate("2000-01-01T12:00:00Z"),2451545));

test("JPL elements produce plausible heliocentric distances in 2047",()=>{
  const positions=planetaryPositions("2047-01-01T12:00:00Z",solarData);
  const earth=positions.find(body=>body.id==="earth"),neptune=positions.find(body=>body.id==="neptune");
  assert.ok(earth.distanceAu>.98&&earth.distanceAu<1.02);
  assert.ok(neptune.distanceAu>29&&neptune.distanceAu<31);
  assert.ok(distanceBetween(earth,neptune)>28);
});

test("Earth-fixed Sun vector remains normalized",()=>{
  const earth=planetaryPositions("2047-06-21T12:00:00Z",solarData).find(body=>body.id==="earth");
  const vector=earthSunDirection("2047-06-21T12:00:00Z",earth);
  assert.ok(Math.abs(Math.hypot(...vector)-1)<1e-10);
});
