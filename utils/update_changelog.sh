#!/usr/bin/env bash
set -euo pipefail

# The upstream release Action still calls this entry point with TAG_NAME.
TAG_NAME="${TAG_NAME:-${1:-}}"
if [[ -z "$TAG_NAME" ]]; then
  echo "TAG_NAME is required" >&2
  exit 1
fi

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
node "$REPO_ROOT/utils/sync-release.mjs" "$TAG_NAME"

cd "$REPO_ROOT"
if git diff --quiet HEAD -- src/data/releases.json; then
  echo "$TAG_NAME is already recorded; nothing to publish"
  exit 0
fi

# The existing generic handler opens a PR when a new pr@dev@... branch is pushed.
BRANCH="pr@dev@changelog-$TAG_NAME"
git checkout -b "$BRANCH"
git commit --only -m "docs: update release $TAG_NAME" -- src/data/releases.json
git push origin "$BRANCH"
