#!/usr/bin/env bash
# Builds the plugin, then runs `steam -dev`.
# JetBrains stops/restarts run configurations with SIGINT, which Steam doesn't
# shut down cleanly on, so ask the running Steam to shut itself down instead.
set -euo pipefail

starlight pack

# Own session, so the IDE's SIGINT reaches only this script and not Steam.
setsid steam -dev &
pid=$!

trap 'steam -shutdown' INT TERM

# `wait` returns early when a trapped signal arrives, so keep waiting until
# Steam has actually exited.
status=0
while kill -0 "$pid" 2>/dev/null; do
	wait "$pid" && status=0 || status=$?
done
exit "$status"
