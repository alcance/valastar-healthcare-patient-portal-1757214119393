#!/bin/bash
# scripts/fix-deployment.sh
echo "🚀 Running deployment fix script"

# Run dependency checker
if [ -f ./scripts/ensure-dependencies.js ]; then
  echo "📦 Running dependency checker script"
  node ./scripts/ensure-dependencies.js
else
  echo "⚠️ Dependency checker script not found"
fi

# Create pnpm-lock.yaml if it doesn't exist
if [ ! -f pnpm-lock.yaml ]; then
  echo "⚠️ pnpm-lock.yaml not found. Creating empty one to ensure pnpm is used."
  touch pnpm-lock.yaml
fi

# Force install Supabase dependencies if missing
if ! node -e "try { require('@supabase/supabase-js'); console.log('✅ Supabase modules found'); } catch(e) { console.log('⚠️ Supabase modules missing'); process.exit(1); }"; then
  echo "📦 Force installing Supabase dependencies"
  pnpm add @supabase/ssr @supabase/supabase-js
fi

echo "✅ Deployment fix script completed"
