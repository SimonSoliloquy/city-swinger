# City Swinger

A third-person swinging game for phones, held upright, above a sea of cloud at night. One thumb:
hold to swing (the rope goes to the side you tilt the phone), let go to fly, tap to jump. Land on a
roof and you just run. Called Grapple City at first; the balloon version it once had is at the tag `balloons-prototype`.

Live at https://city-swinger.vercel.app. One `index.html`, three.js from a CDN, no build step.
`DESIGN.md` holds every ruling; read it before changing anything. Bump `VERSION` on every change.

Local test: `tools/serve.sh`, then open http://127.0.0.1:8151/. In the console, `__game.sim(40)`
runs the computer player through five cities and reports distances; `__game.trace(30, 11)` prints what
it does second by second. `#demo-5` starts a run driven by the computer. Never test with headless Chrome.

High scores: the shared leaderboard Worker, board `grapple-city` (the first name).
