#!/bin/bash
#
# Build the Sikshya documentation locally.
#
# Deployment is now handled by Netlify directly from this repo (see
# `netlify.toml`); pushing to the default branch triggers a build and
# publishes to https://sikshya.mantrabrain.com/docs/. This script is
# kept around for cases where you need a local production build
# (preview, smoke test, manual sync).
#
set -euo pipefail

echo "🚀 Building Sikshya documentation..."
npm run docs:build

echo "✅ Local build complete."
echo "📁 Output directory: docs/.vitepress/dist/"
echo ""
echo "🌐 Production URL (deployed via Netlify):"
echo "   https://sikshya.mantrabrain.com/docs/"
echo ""
echo "ℹ️  To preview the built site locally:"
echo "   npm run preview"
