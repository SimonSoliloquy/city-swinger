"""Turn the ComfyUI pictures into game textures.

Run with a Python that has Pillow and numpy (ComfyUI's own works):
  ~/ComfyUI/.venv/bin/python -I tools/process_art.py <skyline.png> <clouds.png> <puff.png>

skyline.png -> art/skyline.webp: the sky above the towers fades out (the game's own sky shows through)
                                 and the two ends are blended so it wraps around the horizon
clouds.png  -> art/clouds.jpg  : made to tile, so it can repeat across the cloud sea
puff.png    -> art/puff.webp   : the black around the cloud becomes transparent
"""
import sys, os
import numpy as np
from PIL import Image

out = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'art')


def wrap_x(a, frac):
    """Blend the last part of the picture into the first, then cut it off, so the ends meet."""
    w = a.shape[1]; n = int(w * frac)
    t = np.linspace(0, 1, n)[None, :, None]
    head = a[:, :n] * t + a[:, w - n:] * (1 - t)
    return np.concatenate([head, a[:, n:w - n]], axis=1)


def skyline(path):
    a = np.asarray(Image.open(path).convert('RGB')).astype(np.float32)
    a = wrap_x(a, .12)
    h = a.shape[0]
    # sky -> transparent: alpha from how far a pixel is from the dark blue sky, plus a fade to the top
    lum = a.mean(axis=2)
    y = np.linspace(0, 1, h)[:, None]
    fade = np.clip((y - .08) / .32, 0, 1)                       # top third fades away
    body = np.clip((lum - 18) / 50, 0, 1)                        # dark sky is see-through, towers and clouds solid
    alpha = np.clip(np.maximum(body * fade, np.clip((y - .55) / .2, 0, 1)), 0, 1) * 255
    img = np.dstack([a, alpha]).clip(0, 255).astype(np.uint8)
    Image.fromarray(img, 'RGBA').resize((2048, int(2048 * h / a.shape[1])), Image.LANCZOS).save(os.path.join(out, 'skyline.webp'), quality=80, method=6)


def clouds(path):
    im = Image.open(path).convert('RGB'); w, h = im.size
    s = int(h * .6)   # the lower part is all cloud; the top of SDXL's picture is sky
    a = np.asarray(im.crop(((w - s) // 2, h - s, (w + s) // 2, h))).astype(np.float32)
    a = wrap_x(a, .25)
    a = np.transpose(wrap_x(np.transpose(a, (1, 0, 2)), .25), (1, 0, 2))
    Image.fromarray(a.clip(0, 255).astype(np.uint8)).resize((768, 768), Image.LANCZOS).save(os.path.join(out, 'clouds.jpg'), quality=82)


def puff(path):
    a = np.asarray(Image.open(path).convert('RGB')).astype(np.float32)
    h, w = a.shape[:2]
    # the background is a dark blue gradient, not black: take it from the left and right edges, row by row
    bg = np.median(np.concatenate([a[:, :40], a[:, -40:]], axis=1), axis=1)[:, None, :]
    alpha = np.clip((np.linalg.norm(a - bg, axis=2) - 14) / 70, 0, 1)
    yy, xx = np.mgrid[0:h, 0:w]
    alpha[(xx - .293 * w) ** 2 + (yy - .21 * h) ** 2 < (.03 * w) ** 2] = 0   # a stray star SDXL added
    edge = np.clip(np.minimum.reduce([xx, w - 1 - xx, yy, h - 1 - yy]) / (.08 * w), 0, 1)   # nothing reaches the edge
    rgb = a   # the background is not black, so the colour is kept as it is
    img = np.dstack([rgb, alpha * edge * 255]).astype(np.uint8)
    Image.fromarray(img, 'RGBA').resize((512, int(512 * h / w)), Image.LANCZOS).save(os.path.join(out, 'puff.webp'), quality=85, method=6)


if __name__ == '__main__':
    skyline(sys.argv[1]); clouds(sys.argv[2]); puff(sys.argv[3])
    print('ok', sorted(f for f in os.listdir(out) if '.' in f))
