#!/bin/bash
set -euo pipefail

echo ">>> ValidateService: checking app health"

# Example: check if process is running
if pgrep -f "node server.js" >/dev/null; then
  echo "App is running"
  exit 0
else
  echo "App is NOT running"
  exit 1
fi

cd /opt/myapp

if command -v npm >/dev/null 2>&1; then
  npm test
  echo ">>> npm test succeeded"
else
  echo ">>> npm not found on this instance"
  exit 1
fi