#!/bin/bash

echo "🚀 LeetCode Tracker Deployment Script"
echo "------------------------------------"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Error: Git repository not initialized"
    exit 1
fi

# Create GitHub Actions workflow directory and file
echo "📝 Creating deployment workflow..."
mkdir -p .github/workflows

cat > .github/workflows/deploy.yml << 'EOL'
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          
      - name: Install Dependencies
        run: npm install
        
      - name: Build
        run: npm run build
        
      - name: Deploy to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@4.1.5
        with:
          branch: gh-pages
          folder: dist
EOL

# Add dist to gitignore if not already present
if ! grep -q "dist" .gitignore; then
    echo "dist" >> .gitignore
fi

# Commit and push changes
echo "🔄 Pushing deployment configuration..."
git add .github/workflows/deploy.yml .gitignore
git commit -m "Add GitHub Pages deployment workflow"
git push

echo "✅ Deployment configuration complete!"
echo "Your tracker will be available at: https://$(git remote get-url origin | sed 's/.*github.com[\/:]//' | sed 's/\.git$//' | sed 's/\([^/]*\)\/\([^/]*\)/\1.github.io\/\2/')"
echo "⏳ Please wait 2-3 minutes for the first deployment to complete"
echo "You can check deployment status in the Actions tab of your repository"
