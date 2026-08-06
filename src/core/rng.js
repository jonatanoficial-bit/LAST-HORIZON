export function hashSeed(value = "LAST-HORIZON") {
  let h = 2166136261;
  for (const ch of String(value)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

export function nextRandom(rngState) {
  let t = (rngState + 0x6d2b79f5) >>> 0;
  let x = t;
  x = Math.imul(x ^ (x >>> 15), x | 1);
  x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
  return { value: ((x ^ (x >>> 14)) >>> 0) / 4294967296, state: t };
}

export function roll(state, min = 0, max = 1) {
  const result = nextRandom(state.meta.rngState);
  state.meta.rngState = result.state;
  return min + result.value * (max - min);
}

export function pick(state, items) {
  return items[Math.floor(roll(state, 0, items.length))];
}
