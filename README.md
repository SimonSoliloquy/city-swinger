# City Swinger

A third-person swinging game for phones, held upright: four rows of towers above a sea of cloud, parks on
both edges, and a sunset ahead that shows the way. One thumb:
hold to swing (the rope goes to the side you tilt the phone), let go to fly, tap to jump. Land on a
roof and you just run. Called Grapple City at first; the balloon version it once had is at the tag `balloons-prototype`.

Live at https://simonsoliloquy.com/city-swinger/ (since 2026-11-19; the old city-swinger.vercel.app address forwards there until about 2026-12-19). One `index.html`, three.js from a CDN, no build step. `tools/cf-build.sh` copies the files into `.cf/city-swinger/` and `npx wrangler@4.40.0 deploy` publishes them (see `wrangler.jsonc`).
`DESIGN.md` holds every ruling; read it before changing anything. Bump `VERSION` on every change.

Local test: `tools/serve.sh`, then open http://127.0.0.1:8151/. In the console, `__game.sim(40)`
runs the computer player through five cities and reports distances; `__game.trace(30, 11)` prints what
it does second by second. `#demo-5` starts a run driven by the computer. Never test with headless Chrome.
With no browser tab to hand, `PATH=/usr/local/bin:$PATH node tools/node_sim.mjs <three.module.js>` runs the same
tests in Node against stand-ins for the screen (any local copy of three.js will do).

High scores: the shared leaderboard Worker, board `grapple-city` (the first name).
