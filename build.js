#!/usr/bin/env node

/**
 * Build script for DevOps SMS (Student Management System)
 * This script validates the project structure and dependencies
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REQUIRED_FILES = ['server.js', 'db.js', 'package.json'];
const REQUIRED_DIRS = ['node_modules'];

console.log('🔨 Starting build process...\n');

// Check for required files
console.log('✓ Checking required files...');
let missingFiles = [];
REQUIRED_FILES.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`  ✓ Found ${file}`);
  } else {
    console.log(`  ✗ Missing ${file}`);
    missingFiles.push(file);
  }
});

if (missingFiles.length > 0) {
  console.error(`\n❌ Build failed: Missing required files: ${missingFiles.join(', ')}`);
  process.exit(1);
}

// Check for node_modules
console.log('\n✓ Checking dependencies...');
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
  console.log('  ✓ Dependencies installed');
} else {
  console.log('  ⚠ node_modules not found. Run "npm install" first.');
  process.exit(1);
}

// Validate package.json
console.log('\n✓ Validating package.json...');
try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
  console.log(`  ✓ Project: ${packageJson.name} v${packageJson.version}`);
  
  const requiredDeps = ['express', 'mysql2'];
  requiredDeps.forEach(dep => {
    if (packageJson.dependencies && packageJson.dependencies[dep]) {
      console.log(`  ✓ Dependency: ${dep} (${packageJson.dependencies[dep]})`);
    } else {
      console.log(`  ⚠ Missing dependency: ${dep}`);
    }
  });
} catch (err) {
  console.error('  ✗ Invalid package.json:', err.message);
  process.exit(1);
}

console.log('\n✅ Build successful! Your project is ready to run.');
console.log('\nNext steps:');
console.log('  1. Ensure MySQL is running and database "sms" exists');
console.log('  2. Run: npm start');
