// Cache clearing script
// Run this with: node clear-cache.js

const fs = require('fs');
const path = require('path');

// Clear browser cache by updating a cache buster file
const cacheBusterFile = path.join(__dirname, 'public', 'cache-buster.txt');
const timestamp = Date.now();

fs.writeFileSync(cacheBusterFile, timestamp.toString());
console.log(`Cache buster updated: ${timestamp}`);

// Also clear Vite cache
const viteCacheDir = path.join(__dirname, 'node_modules', '.vite');
if (fs.existsSync(viteCacheDir)) {
  fs.rmSync(viteCacheDir, { recursive: true, force: true });
  console.log('Vite cache cleared');
}

console.log('Cache cleared successfully!');
