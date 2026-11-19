# Grapple City

A third-person swinging game for phones, above a sea of cloud at night. Two versions on the menu:
**Grapple** (a hook on each wrist: tap to shoot, hold to swing, slide up to reel in) and **Balloons**
(a backpack of balloons: more float you higher, fewer let you sink). Parkour in both. Tilt to steer.

Live at https://grapple-city.vercel.app. One `index.html`, three.js from a CDN, no build step.
`DESIGN.md` holds every ruling; read it before changing anything. Bump `VERSION` on every change.

Local test: `tools/serve.sh`, then open http://127.0.0.1:8151/. In the console, `__game.sim(40, 'grapple')`
and `__game.sim(60, 'balloon')` run the computer player through five cities and report distances;
`__game.trace(30, 'balloon', 11)` prints what it does second by second. `#demo-b-5` starts a balloon
run driven by the computer.

High scores: the shared leaderboard Worker, boards `grapple-city` and `grapple-city-balloons`.
