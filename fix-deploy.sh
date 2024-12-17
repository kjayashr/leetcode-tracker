#!/bin/bash

echo "🔧 Fixing deployment configuration..."

# Update vite.config.js
cat > vite.config.js << 'EOL'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/leetcode-tracker/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
EOL

# Ensure index.html is properly configured
cat > index.html << 'EOL'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>LeetCode Tracker</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
EOL

# Install dependencies again to ensure everything is in place
npm install

# Build the project
npm run build

# Commit and push changes
git add .
git commit -m "Fix deployment configuration"
git push

echo "✅ Fix deployed!"
echo "⏳ Please wait 2-3 minutes for the deployment to complete"
echo "Your tracker will be available at: https://$(git remote get-url origin | sed 's/.*github.com[\/:]//' | sed 's/\.git$//' | sed 's/\([^/]*\)\/\([^/]*\)/\1.github.io\/\2/')"
