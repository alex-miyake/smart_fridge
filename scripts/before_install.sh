#!/bin/bash
set -euo pipefail

echo ">>> BeforeInstall: create /opt/myapp, stop old app if present, clean folder"

# Create target directory if missing
mkdir -p /opt/myapp

# Adjust ownership - (change ec2-user to amiyake maybe?)
chown -R ec2-user:ec2-user /opt/myapp || true

# Ensure deployment scripts are executable (exist in deployment root during hooks)
chmod +x ./scripts/*.sh || true

# Stop systemd service if it exists (safe-guard)
if systemctl list-units --type=service --all | grep -q "myapp.service"; then
  systemctl stop myapp.service || true
fi

# Clear old app files (mb change to keep if want fresh copy)
rm -rf /opt/myapp/* || true

echo ">>> BeforeInstall complete"