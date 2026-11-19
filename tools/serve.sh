#!/bin/sh
# Serve the game on http://127.0.0.1:8151 for local testing.
cd "$(dirname "$0")/.." && exec python3 -m http.server 8151 --bind 127.0.0.1
