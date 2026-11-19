// Run the game's physics and computer player in Node, with no browser and no screen.
// For when no browser tab is available: headless Chrome is banned on this Mac (L-269).
//   PATH=/usr/local/bin:$PATH node tools/node_sim.mjs [path to three.module.js]
// The page's script runs against stand-ins for the DOM, the canvas and the renderer; then
// window.__game.sim and a scripted fall are run and printed. Not part of the deployed game.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { pathToFileURL, fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const threePath = process.argv[2] || path.join(here, '../node_modules/three/build/three.module.js');
const html = fs.readFileSync(path.join(here, '../index.html'), 'utf8');
let src = html.match(/<script type="module">([\s\S]*?)<\/script>/)[1];
src = src.replace("import * as THREE from 'three';", `import * as THREE from ${JSON.stringify(pathToFileURL(threePath).href)};`);
src = src.replace(/new THREE\.WebGLRenderer\([^)]*\)/, 'globalThis.__fakeRenderer');

// a stand-in that accepts anything: every property is another stand-in, and calling one returns one
const any = () => {
  const f = function () { return any(); };
  return new Proxy(f, {
    get(t, k) {
      if (k === Symbol.toPrimitive) return () => 0;
      if (k === 'then') return undefined;
      if (k in t) return t[k];
      t[k] = any(); return t[k];
    },
    set(t, k, v) { t[k] = v; return true; },
  });
};
const el = () => {
  const e = any(); e.hidden = false; e.style = {}; e.classList = { add() {}, remove() {}, toggle() {} };
  e.textContent = ''; e.innerHTML = ''; e.value = ''; e.addEventListener = () => {};
  e.getContext = () => any(); e.width = 64; e.height = 64; return e;
};
const els = {};
globalThis.document = {
  getElementById: id => (els[id] ||= el()), createElement: () => el(), createElementNS: () => el(), addEventListener: () => {},
  querySelector: () => el(), querySelectorAll: () => [], documentElement: el(), fullscreenElement: null, hidden: false,
};
globalThis.window = globalThis;
globalThis.addEventListener = () => {};
globalThis.matchMedia = () => ({ matches: false });
globalThis.innerWidth = 390; globalThis.innerHeight = 780; globalThis.devicePixelRatio = 1;
globalThis.requestAnimationFrame = () => 0;
globalThis.localStorage = { getItem: () => null, setItem: () => {} };
globalThis.location = { hostname: 'localhost', protocol: 'http:', pathname: '/', hash: '' };
globalThis.fetch = async () => ({ ok: false, json: async () => null, text: async () => '' });
globalThis.screen = { orientation: { angle: 0 } };
globalThis.__fakeRenderer = { setPixelRatio() {}, setSize() {}, render() {}, domElement: el() };
globalThis.Image = class { set src(v) {} };

const tmp = path.join(os.tmpdir(), 'city-swinger-node-sim.mjs');
fs.writeFileSync(tmp, src);
await import(pathToFileURL(tmp).href);
const g = globalThis.__game;

console.log('version', g.VERSION);
for (const r of g.sim(40, [11, 22, 33, 44, 55, 66, 77, 88])) console.log(`  city ${r.seed}: ${r.dist} m, fell ${r.fell}, on rope ${r.onRope}, ${r.hooks} ropes`);

// a fall: drop below the clouds and keep going
g.startRun(); for (let i = 0; i < 20; i++) g.tick(1 / 60);
g.H.p.set(0, 75, g.H.p.z); g.H.v.set(0, -10, 15);
const camY0 = g.camera.position.y, seen = [];
for (let i = 0; i < 240; i++) { g.tick(1 / 60); if (i % 30 === 0) seen.push(`${(i / 60).toFixed(1)}s ${g.S.phase} y=${g.H.p.y.toFixed(0)}`); }
console.log('fall:', seen.join(' | '));
console.log('  camera stayed above the clouds:', g.camera.position.y >= 60, `(${camY0.toFixed(0)} -> ${g.camera.position.y.toFixed(0)})`,
            '· hero far below:', g.H.p.y < -60, '· end screen asked for:', g.S.phase === 'end');
g.startRun(); g.tick(1 / 60);
console.log('next run starts clean:', g.S.phase === 'play' && g.S.fallT === 0 && g.H.p.y > 200);
