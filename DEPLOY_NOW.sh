#!/bin/bash
# AUTOMATED DEPLOYMENT SCRIPT
# Run this to complete deployment: bash DEPLOY_NOW.sh

set -e  # Exit on any error

echo "🚀 ARIZONA TELEPSYCHIATRY CLINIC - AUTOMATED DEPLOYMENT"
echo "========================================================"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "book.html" ]; then
    echo -e "${RED}❌ ERROR: Must run from /Users/joshodeh/arizona-telep${NC}"
    exit 1
fi

echo "📋 Step 1: Checking .env file..."
if [ ! -f ".env" ]; then
    echo -e "${RED}❌ .env file not found${NC}"
    exit 1
fi

# Check if .env has real Supabase credentials
if grep -q "your-project-ref.supabase.co" .env; then
    echo -e "${YELLOW}⚠️  WARNING: .env still has placeholder values!${NC}"
    echo ""
    echo "You need to update .env with your REAL Supabase credentials:"
    echo "1. Go to: https://supabase.com/dashboard"
    echo "2. Select your project"
    echo "3. Go to: Settings → API"
    echo "4. Copy your URL and keys into .env"
    echo ""
    read -p "Press ENTER after you've updated .env, or Ctrl+C to cancel..."
fi

echo -e "${GREEN}✓ .env file exists${NC}"
echo ""

echo "📋 Step 2: Pushing to GitHub..."
git status -sb

echo ""
echo "Attempting to push..."
if git push origin main; then
    echo -e "${GREEN}✓ Successfully pushed to GitHub${NC}"
else
    echo -e "${RED}❌ Git push failed${NC}"
    echo ""
    echo "MANUAL PUSH REQUIRED:"
    echo "  git push origin main"
    echo ""
    echo "If you need to authenticate, you may need to:"
    echo "  1. Use GitHub CLI: gh auth login"
    echo "  2. Or create a Personal Access Token"
    echo ""
    exit 1
fi

echo ""
echo "📋 Step 3: Triggering Vercel deployment..."
response=$(curl -s -X POST https://api.vercel.com/v1/integrations/deploy/prj_tmwF9ihaC8i5qCRA8OaV9h8d2C05/AwQmmxJ0L9)
echo "$response" | python3 -m json.tool 2>/dev/null || echo "$response"
echo -e "${GREEN}✓ Vercel deployment triggered${NC}"

echo ""
echo "========================================================"
echo -e "${GREEN}🎉 AUTOMATED STEPS COMPLETE!${NC}"
echo "========================================================"
echo ""
echo "📋 MANUAL STEPS YOU MUST COMPLETE:"
echo ""
echo "1. ADD ENVIRONMENT VARIABLES TO VERCEL:"
echo "   → https://vercel.com/dashboard"
echo "   → Your Project → Settings → Environment Variables"
echo "   → Add all variables from your .env file"
echo "   → Select: Production, Preview, Development"
echo ""
echo "2. FIX DOMAIN SPELLING IN VERCEL:"
echo "   → Vercel Dashboard → Domains"
echo "   → Remove: arizonatelepyschiatryclinic.com (wrong)"
echo "   → Add: arizonatelepsychiatryclinic.com (correct)"
echo ""
echo "3. SET UP SUPABASE DATABASE:"
echo "   → https://supabase.com/dashboard"
echo "   → SQL Editor → New Query"
echo "   → Copy contents of SUPABASE_SETUP.sql"
echo "   → Run the SQL"
echo ""
echo "4. SIGN BUSINESS ASSOCIATE AGREEMENTS (REQUIRED!):"
echo "   → Supabase: support@supabase.com (Pro plan \$25/mo)"
echo "   → Vercel: security@vercel.com (Enterprise plan)"
echo ""
echo "5. TEST EVERYTHING:"
echo "   → Visit your site"
echo "   → Test booking form"
echo "   → Verify privacy policy loads"
echo "   → Verify terms of service loads"
echo ""
echo "⚠️  DO NOT GO LIVE WITHOUT SIGNED BAAs - HIPAA VIOLATION"
echo ""
echo "📖 See DEPLOYMENT_CHECKLIST.md for full details"
echo ""
