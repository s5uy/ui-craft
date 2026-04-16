#!/usr/bin/env bash
# Run this before publishing: copies skill files into cli/assets/
# so they get bundled inside the npm package.

set -e

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ASSETS="$REPO_ROOT/cli/assets"

echo "Bundling skill files into cli/assets/ ..."

rm -rf "$ASSETS"
mkdir -p "$ASSETS"

# Copy root skill entry point
cp "$REPO_ROOT/SKILL.md" "$ASSETS/SKILL.md"
cp "$REPO_ROOT/skill.json" "$ASSETS/skill.json"

# Copy all skill directories
for dir in core decisions blueprints palettes components anti-patterns prompts integration examples maintenance; do
  if [ -d "$REPO_ROOT/$dir" ]; then
    cp -r "$REPO_ROOT/$dir" "$ASSETS/$dir"
    echo "  + $dir/"
  fi
done

echo "Done. assets/ is ready for publish."
