#!/bin/bash

echo "🔍 Starting LeetCode Tracker Validation"
echo "=====================================\n"

# Function to check file existence and content
check_file() {
    if [ -f "$1" ]; then
        echo "✅ Found $1"
        echo "   Size: $(wc -l < "$1") lines"
        echo "   First few lines:"
        head -n 3 "$1"
        echo "   ..."
        echo
    else
        echo "❌ Missing $1"
        echo
    fi
}

# Function to check dependency in package.json
check_dependency() {
    if grep -q "\"$1\":" package.json; then
        echo "✅ Found dependency: $1"
    else
        echo "❌ Missing dependency: $1"
    fi
}

echo "📁 Checking File Structure..."
echo "----------------------------"
check_file "src/components/LeetCodeTracker.jsx"
check_file "src/components/LeetCodeTracker.css"
check_file "src/App.jsx"
check_file "src/main.jsx"
check_file "src/index.css"
check_file "index.html"
check_file "vite.config.js"
check_file "package.json"
check_file ".github/workflows/deploy.yml"

echo "\n📦 Checking Dependencies..."
echo "-------------------------"
check_dependency "react"
check_dependency "react-dom"
check_dependency "lucide-react"

echo "\n🔧 Checking Build Configuration..."
echo "--------------------------------"
echo "Current vite.config.js base path:"
grep "base:" vite.config.js || echo "❌ No base path configured in vite.config.js"

echo "\n🚀 Checking GitHub Actions Workflow..."
echo "------------------------------------"
if [ -f ".github/workflows/deploy.yml" ]; then
    echo "Permissions configured:"
    grep "permissions:" -A 4 .github/workflows/deploy.yml || echo "❌ No permissions found in workflow"
fi

echo "\n📋 Summary of Problems Found:"
echo "----------------------------"
problems=0

# Check for common issues
if ! grep -q "base: '/leetcode-tracker/'" vite.config.js; then
    echo "❌ Incorrect base path in vite.config.js"
    ((problems++))
fi

if ! grep -q "lucide-react" package.json; then
    echo "❌ Missing lucide-react dependency"
    ((problems++))
fi

if ! grep -q "React.StrictMode" src/main.jsx 2>/dev/null; then
    echo "❌ Incorrect React setup in main.jsx"
    ((problems++))
fi

if [ $problems -eq 0 ]; then
    echo "✅ No major problems found!"
else
    echo "Found $problems potential issues"
fi

echo "\n🌐 Current Git Remote:"
git remote -v

echo "\n🔄 Last Deployment Status:"
if [ -d ".git" ]; then
    git log -1 --pretty=format:"%h - %s (%cr)"
fi

echo "\nValidation complete! Please share this output for debugging."
