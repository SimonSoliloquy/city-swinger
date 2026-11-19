# City Swinger: design

Called Grapple City until 2026-11-19. Where this file and the rulings at the end disagree, the later ruling wins.

From the interview on 2026-11-19. Built from the one-file canvas game template in Atlas (Game development goal). Every later ruling is dated where it appears.

## What it is
A third-person grappling-hook swinging game for phones, set on an endless street of night-city rooftops. You swing as far as you can; touching the street ends the run. The game is about the swing itself: it has to feel as good as the web swinging in the 2004 and 2005 superhero games Simon named, with reeling in the rope as a core move. The character, city and look are original.

## Stack
The template, with one change: the game is 3D, so `index.html` loads three.js from a CDN (exact version pinned). Still one file, no build step, a `VERSION` constant, Vercel on push to `main`, the shared leaderboard Worker for best distances.

## The hero
An original person with a grappling gun on each wrist. Each gun fires a rope that sticks and reels in.

## Controls (phone, held upright)
- **Hooks:** two, one per wrist. Tap a spot on screen with the left thumb to fire the left hook there, with the right thumb for the right hook. The hook sticks to any solid surface: walls, roof edges, cranes, water tanks.
- **Holding:** keep the thumb down to stay on that rope. Lift it to let go.
- **Reeling:** while holding, slide that thumb up to reel in (shorter rope, faster swing) and down to let rope out.
- **Two ropes:** with both hooks attached you hang between them, so you can catch the next anchor before letting go of the last.
- **Steering:** tilt the phone left and right. iPhones ask permission for tilt; the game asks once, on the Play tap.
- **Computer:** left and right mouse buttons fire each hook at the cursor, hold to stay on, the wheel reels, the arrow keys steer.

## The swing feel: arcade momentum
Real pendulum physics, helped:
- The rope is a length limit, not a spring: it never yanks you to a dead stop.
- Speed builds through the bottom of each arc.
- Letting go near the top of the arc flings you forward and up.
- Reeling in while swinging speeds the swing up, like shortening a pendulum; reeling in fast is a slingshot.
- A little air steering after letting go, and a speed limit so it stays readable.

## Walls and the street
- Swing into the side of a building and you run along the wall for a moment, then jump off or fire a new hook.
- Touching the street ends the run.

## The course
Endless and generated as you go: a long street of towers of different heights, with gaps, cranes, water tanks and bridges to swing from. Score is the distance swung. Best distances go to the shared leaderboard.

## Look
A moody night city: dark sky, lit windows, neon signs and fog. ComfyUI on The Best Mac mini makes the skyline backdrop, window and sign textures and the hero concept art. Little text on screen and none of the vibe-coded tells (the template's rule).

## Camera
Third person, behind and a little above the hero, swinging with them. The field of view widens with speed.

## Tuning
No in-game tuning panel (Simon, 2026-11-19). Tuning is done from his notes after he plays.

## Sound
Sound effects made in code with Web Audio (rope fire, attach, release, reel creak, wind with speed, footsteps, landing, crash), plus a moody night-city music loop (Simon, 2026-11-19). v1 has a loop made in code.

## Deploying
Simon, 2026-11-19: create `SimonSoliloquy/grapple-city` and deploy to Vercel once it plays well locally.

## Rulings after the first build (Simon, 2026-11-19)
- The look moves up into the clouds: very tall buildings at night, midnight-blue metallic towers with yellow lights in the windows.
- A second version to pick from the menu: a backpack of balloons, where you float more or less depending on how many balloons you have.
- Parkour inspired by Mirror's Edge, using the same two-hands control and tilting to turn.

Answers from the same day:
- **Falling:** a sea of cloud hides the street far below; sinking into it ends the run (replaces "touching the street").
- **Balloons version:** no hooks. You collect balloons floating around the towers, antennas, cranes and birds pop them, and you can let one go on purpose to drop. More balloons float you higher, fewer let you sink.
- **Balloon controls:** left thumb taps to jump, holds to float longer, swipes down to slide or roll; right thumb taps to let a balloon go. Tilt steers.
- **Running:** auto-run on roofs in both versions; tilt turns.
- **Parkour in both versions:** vaults, ledge climbs, wall runs, slides under pipes, and rolls on landing. In the grapple version a quick swipe with either thumb does the move (up: jump or vault; down: slide or roll) while a plain tap still fires a hook.
- Each version keeps its own best distance and leaderboard.

- **Upright (Simon, 2026-11-19: "I want grapple city to be vertical"):** played in portrait on a phone. Nothing is turned sideways any more; the camera sits further back and higher when the screen is tall so both sides of the street stay in view. Android goes full screen locked upright; a sideways screen or a computer window still works.

## Rulings of 2026-11-19, later the same day
- **Swing and jump only, one thumb** (Simon: "it needs to be swing and jump only not the two hands. Whichever way you tilt is which way the hook goes"). Hold anywhere to swing: the rope picks its own anchor, up and ahead, on the side the phone is tilted to (either side when it is level). Let go to fly. A tap jumps. Tapping where to shoot and the hook for each thumb are gone. Kept on the same thumb: slide up to reel in, down to let rope out, and a quick swipe down to slide or roll.
- **No tilt sensor:** the rope goes to the side of the screen you press; on a computer, the side you steer with A and D. The left mouse button swings, the right button or Space jumps.
- **The balloon version is a different game** (Simon). It is out of this one and kept at the git tag `balloons-prototype`.
- **Renamed City Swinger** (Simon), live at https://city-swinger.vercel.app. The folder, the leaderboard board (`grapple-city`) and the saved-score keys keep the first name.
- **No parkour, clear roofs** (Simon, 2026-11-19: "for city swinger we need no parkour and if you land on top of the building you just run and roll no obstacles on top of buildings. Keep cranes and fun things for the skyline"). Gone: vaults, wall climbs, slides under pipes, the roll you had to time, stumbling, and the boxes and pipes on the roofs. Landing on a roof you just run; a drop rolls by itself and costs no speed; a roof edge or a slightly higher roof in reach is stepped up onto without a button. Running along a wall you hit stays (the first interview's ruling). Water tanks, antennas, spires and cranes stay as skyline: the runner passes through them, and the rope hooks a crane arm overhead. Parkour belongs to the balloon game (Balloon Jumper).
- **Four rows, parks, a sunset ahead** (Simon, 2026-11-19: "parks on the side where you can't swing and four rows of buildings and a sunset in the sky you're going towards. You swing towards the sunset and that's the direction indicator"). Four rows of towers along three streets (centre street, then an outer street on each side); sky bridges and crane arms over all three. Beyond the outer rows are parks lying on the cloud sea: nothing to hook, and reaching one ends the run like the clouds. The sky is night overhead and behind (the moon is behind you), with a sunset glowing on the horizon straight ahead and the sun low in it; the sunset lights the clouds. Running on a roof never turns more than about 60 degrees away from the sunset, and the camera never faces away from it, so you can't end up going back the way you came. A rope only reaches as far as the next row, so it pulls you ahead, not sideways across the city.
