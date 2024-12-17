#!/bin/bash

# Fix main App.jsx
cat > src/App.jsx << 'EOL'
import React from 'react'
import LeetCodeTracker from './components/LeetCodeTracker'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <LeetCodeTracker />
    </div>
  )
}

export default App
EOL

# Add App.css
cat > src/App.css << 'EOL'
.app-container {
  min-height: 100vh;
  background-color: #f3f4f6;
  padding: 20px;
}
EOL

# Fix main.jsx
cat > src/main.jsx << 'EOL'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
EOL

# Fix index.css
cat > src/index.css << 'EOL'
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
EOL

# Fix index.html
cat > index.html << 'EOL'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>LeetCode 100 Days Tracker</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
EOL

# Fix vite.config.js
cat > vite.config.js << 'EOL'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/leetcode-tracker/',
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
EOL

# Install required dependencies
npm install lucide-react

# Rebuild and redeploy
npm run build

# Commit and push changes
git add .
git commit -m "Fix empty page issue"
git push

echo "✅ Files updated and deployed!"
echo "⏳ Please wait 2-3 minutes for the deployment to complete"
EOL
