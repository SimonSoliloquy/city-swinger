#!/bin/sh
# Build the folder Cloudflare serves at https://simonsoliloquy.com/city-swinger/ (see wrangler.jsonc).
# Cloudflare's GitHub build runs this and then `npx wrangler deploy` on every push to main.
# By hand: sh tools/cf-build.sh && npx wrangler deploy
set -e
cd "$(dirname "$0")/.."
rm -rf .cf && mkdir -p .cf/city-swinger/art
cp index.html .cf/city-swinger/
cp art/*.webp art/*.jpg .cf/city-swinger/art/
