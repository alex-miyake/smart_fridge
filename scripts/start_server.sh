#!/bin/bash
set -euo pipefail

echo ">>> ApplicationStart: starting the app"

# Example preferred approach: systemd service. If you already include a start.sh in the app,
# ensure it exists and is executable; otherwise create a small systemd unit.

# If repo includes a start.sh at /opt/myapp/start.sh, run it under ec2-user
if [ -f /opt/myapp/start.sh ]; then
  chmod +x /opt/myapp/start.sh
  # Run under ec2-user so files are owned correctly (adjust as needed)
  sudo -u ec2-user bash -c "cd /opt/myapp && nohup ./start.sh >/opt/myapp/app.log 2>&1 & echo \$! > /opt/myapp/myapp.pid"
  echo ">>> Started app via /opt/myapp/start.sh"
  exit 0
fi

# Otherwise create a simple systemd unit (only if you don't have one already)
cat <<'EOF' > /etc/systemd/system/myapp.service
[Unit]
Description=MyApp
After=network.target

[Service]
Type=simple
User=ec2-user
WorkingDirectory=/opt/myapp
ExecStart=/usr/bin/env bash /opt/myapp/start.sh
Restart=on-failure

[Install]
WantedBy=multi-user.target
EOF

chmod 644 /etc/systemd/system/myapp.service
systemctl daemon-reload
systemctl enable myapp.service
systemctl start myapp.service

echo ">>> ApplicationStart complete"