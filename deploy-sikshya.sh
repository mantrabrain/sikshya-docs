#!/bin/bash

# Deploy Sikshya Documentation to docs.mantrabrain.com
# This script builds and deploys Sikshya docs to the existing docs site structure

echo "🚀 Building Sikshya documentation..."

# Build the documentation
npm run docs:build

echo "📁 Creating sikshya-wordpress-plugin directory..."
mkdir -p ../sikshya-mantrabrain-docs/sikshya-wordpress-plugin

# Copy built files to the correct directory structure for docs.mantrabrain.com
cp -r docs/.vitepress/dist/sikshya-wordpress-plugin/* ../sikshya-mantrabrain-docs/sikshya-wordpress-plugin/

echo "✅ Sikshya documentation ready for deployment at:"
echo "📁 ../sikshya-mantrabrain-docs/sikshya-wordpress-plugin/"
echo ""
echo "🌐 This will be accessible at: https://docs.mantrabrain.com/sikshya-wordpress-plugin/"
