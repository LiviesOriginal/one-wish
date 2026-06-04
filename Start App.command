#!/bin/bash
cd "$(dirname "$0")"

if ! command -v npm >/dev/null 2>&1; then
  echo ""
  echo "  Node.js is not installed."
  echo "  Install it from https://nodejs.org (LTS), then run this again."
  echo ""
  read -r -p "Press Enter to close…"
  exit 1
fi

echo "Installing dependencies (first time only)…"
npm install

echo ""
echo "Starting One Wish Willow…"
echo "Your browser should open automatically."
echo "If not, go to: http://localhost:5173"
echo ""
echo "Keep this window open while you use the app."
echo ""

npm run dev
