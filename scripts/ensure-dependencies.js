// scripts/ensure-dependencies.js
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Running dependency check script');

function isPackageInstalled(packageName) {
  try {
    require.resolve(packageName);
    return true;
  } catch (e) {
    return false;
  }
}

const requiredPackages = ['@supabase/ssr', '@supabase/supabase-js'];
let allInstalled = true;

requiredPackages.forEach(pkg => {
  if (!isPackageInstalled(pkg)) {
    console.log(`⚠️ ${pkg} not found, will be installed`);
    allInstalled = false;
  } else {
    console.log(`✅ ${pkg} is installed`);
  }
});

if (!allInstalled) {
  console.log('📦 Installing missing Supabase dependencies');
  try {
    const hasPnpmLock = fs.existsSync(path.join(process.cwd(), 'pnpm-lock.yaml'));
    const hasYarnLock = fs.existsSync(path.join(process.cwd(), 'yarn.lock'));
    
    let installCmd = '';
    if (hasPnpmLock) {
      installCmd = 'pnpm add @supabase/ssr @supabase/supabase-js';
    } else if (hasYarnLock) {
      installCmd = 'yarn add @supabase/ssr @supabase/supabase-js';
    } else {
      installCmd = 'npm install --save @supabase/ssr @supabase/supabase-js';
    }
    
    console.log(`Executing: ${installCmd}`);
    execSync(installCmd, { stdio: 'inherit' });
    console.log('📦 Dependencies installed successfully');
  } catch (error) {
    console.error('❌ Error installing dependencies:', error.message);
  }
}

console.log('✅ Dependency check completed');
