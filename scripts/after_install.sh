#!/bin/bash
set -euo pipefail

echo ">>> AfterInstall: set permissions and install dependencies (if any)"

# CodeDeploy already copied the revision to /opt/myapp (per appspec files mapping).
# Check permissions are correct:
chown -R ec2-user:ec2-user /opt/myapp || true
chmod -R u+rwX /opt/myapp || true

# For Node app with package.json, run npm install
if [ -f /opt/myapp/package.json ]; then
  if command -v npm >/dev/null 2>&1; then
    echo ">>> Running npm install --production"
    cd /opt/myapp
    npm install --production
  else
    echo ">>> npm not found, skipping npm install"
  fi
fi

echo ">>> AfterInstall complete"