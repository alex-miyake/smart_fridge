#!/bin/bash
set -euo pipefail

echo ">>> ApplicationStop: stopping myapp.service if present"

# Try to stop systemd service gracefully
if systemctl list-units --type=service --all | grep -q "myapp.service"; then
  systemctl stop myapp.service || true
fi

# If you run the app backgrounded or via PID file, stop it here.
# Example (if you used start.sh to run in background and wrote pidfile):
if [ -f /opt/myapp/myapp.pid ]; then
  PID=$(cat /opt/myapp/myapp.pid)
  if kill -0 "$PID" >/dev/null 2>&1; then
    kill "$PID" || true
  fi
  rm -f /opt/myapp/myapp.pid
fi

echo ">>> ApplicationStop complete"