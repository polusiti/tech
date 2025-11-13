#!/bin/bash
# Build script for Cloudflare Pages deployment

set -e

echo "🔨 Building VuePress blog..."

# Navigate to slee directory
cd slee

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build VuePress
echo "🏗️  Building VuePress..."
npm run build

# Navigate back to root
cd ..

# Create deployment directory structure
echo "📂 Setting up deployment structure..."

# Copy Windows 98 UI files (root)
mkdir -p dist
cp index.html dist/
cp about.html dist/
cp projects.html dist/
cp script.js dist/
cp style.css dist/
cp _redirects dist/
cp -r css dist/
cp -r img dist/
cp -r jikken dist/
cp -r jin dist/
cp -r rob dist/
cp NAVIGATION_MAP.md dist/ 2>/dev/null || true

# Copy VuePress build output to /slee path
echo "📋 Copying VuePress build to /slee..."
mkdir -p dist/slee
cp -r slee/docs/.vuepress/dist/* dist/slee/

echo "✅ Build complete! Output in dist/"
echo "📊 Structure:"
echo "  dist/"
echo "  ├── index.html (Windows 98 UI)"
echo "  ├── slee/ (VuePress blog)"
echo "  └── ..."
