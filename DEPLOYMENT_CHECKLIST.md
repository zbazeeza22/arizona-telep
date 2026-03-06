# 🚨 CRITICAL DEPLOYMENT CHECKLIST

## ✅ PHASE 1: SECURITY FIXES (DONE)

- [x] Removed exposed Supabase API keys from book.html
- [x] Created secure API endpoint (`/api/submit-booking.js`)
- [x] Created `.env.example` template
- [x] Created `vercel.json` with security headers
- [x] Created `package.json`
- [x] Updated `.gitignore` to protect secrets
- [x] Staged changes in git

## 🔥 PHASE 2: IMMEDIATE ACTIONS (DO NOW)

### 1. Create .env File

```bash
cd /Users/joshodeh/arizona-telep
cp .env.example .env
```

Then edit `.env` and add your REAL Supabase credentials:
- Get from: https://supabase.com/dashboard → Your Project → Settings → API
- Add SUPABASE_URL
- Add SUPABASE_ANON_KEY
- Add SUPABASE_SERVICE_ROLE_KEY

Generate encryption keys:
```bash
openssl rand -base64 32  # Use for ENCRYPTION_KEY
openssl rand -base64 32  # Use for SESSION_SECRET
```

### 2. Fix Vercel Domain Spelling

Current domain has typo: `arizonatele**p**yschiatryclinic.com` (missing 's')

**ACTION:**
1. Go to Vercel Dashboard → Domains
2. Remove misspelled domain: `arizonatelepyschiatryclinic.com`
3. Add correct domain: `arizonatelepsychiatryclinic.com` (with 's')
4. Update DNS as shown in Vercel

### 3. Deploy to Vercel

```bash
cd /Users/joshodeh/arizona-telep
vercel --prod
```

**CRITICAL: Add environment variables in Vercel Dashboard:**
- Project Settings → Environment Variables
- Add all variables from your `.env` file
- Select: Production, Preview, Development

### 4. Sign Business Associate Agreements

**REQUIRED before handling ANY patient data:**

**Supabase BAA:**
- Email: support@supabase.com
- Subject: "BAA Request for [Your Project Name]"
- Required: Pro Plan ($25/month minimum)
- Must be signed BEFORE going live

**Vercel BAA:**
- Email: security@vercel.com
- Subject: "BAA Request for Arizona Telepsychiatry Clinic"
- Required: Enterprise plan (contact sales)
- Must be signed BEFORE going live

### 5. Set Up Supabase Database

1. Open Supabase Dashboard → SQL Editor
2. Copy contents of `SUPABASE_SECURE_SETUP.sql` (see agent deliverables)
3. Run the SQL
4. Verify tables created: `bookings`, `audit_logs`, `sessions`
5. Verify Row Level Security (RLS) enabled

## 📋 PHASE 3: LEGAL DOCUMENTS (CRITICAL)

### Deploy These Files:

**Created files ready to upload:**
- `privacy-policy.html` - HIPAA-compliant privacy policy
- `terms-of-service.html` - Complete terms
- Legal consent forms (7 files) - See agent deliverables

**Add links to footer in index.html:**
```html
<a href="privacy-policy.html">Privacy Policy</a>
<a href="terms-of-service.html">Terms of Service</a>
```

## 🔐 PHASE 4: COMPLIANCE ITEMS

### Website Updates:

1. **Add HIPAA Badge** to homepage
2. **Add "Secure & Private" messaging**
3. **Link to Privacy Policy** from footer
4. **Link to Terms** from footer
5. **Add consent forms** to booking flow

### Before First Patient:

- [ ] Arizona NP License active
- [ ] Arizona Prescriptive Authority active
- [ ] DEA Registration obtained
- [ ] Arizona CSPMP registration complete
- [ ] Malpractice insurance obtained (with telehealth coverage)
- [ ] BAAs signed (Supabase + Vercel)
- [ ] Privacy Policy posted
- [ ] Terms of Service posted
- [ ] All 7 consent forms ready
- [ ] Secure booking system tested
- [ ] Emergency procedures documented

## 📅 2026 CRITICAL DEADLINES

- **Feb 16, 2026** - Update Notice of Privacy Practices (SUD protections)
- **March 1, 2026** - Report any 2025 data breaches to HHS
- **May 2026** - New Security Rule (MFA + encryption mandatory)
- **Dec 31, 2026** - DEA telemedicine flexibility may end

## 🧪 TESTING CHECKLIST

Before going live:

- [ ] Test booking form submission
- [ ] Verify data appears in Supabase
- [ ] Test from mobile device
- [ ] Test all consent forms
- [ ] Verify privacy policy loads
- [ ] Verify terms of service loads
- [ ] Test video conferencing platform
- [ ] Verify deploy webhook works:
  ```bash
  curl -X POST https://api.vercel.com/v1/integrations/deploy/prj_tmwF9ihaC8i5qCRA8OaV9h8d2C05/AwQmmxJ0L9
  ```

## ⚡ QUICK DEPLOY COMMAND

```bash
cd /Users/joshodeh/arizona-telep

# 1. Make sure .env is set up
test -f .env || echo "⚠️  CREATE .env FILE FIRST!"

# 2. Deploy
vercel --prod

# 3. Or use your webhook
curl -X POST https://api.vercel.com/v1/integrations/deploy/prj_tmwF9ihaC8i5qCRA8OaV9h8d2C05/AwQmmxJ0L9
```

## 🆘 IF SOMETHING BREAKS

**Exposed API Keys Still Visible?**
- Clear browser cache
- Hard refresh (Cmd+Shift+R)
- Check book.html lines 206-208 - should NOT have Supabase URL

**Booking Form Not Working?**
1. Check Vercel logs: `vercel logs`
2. Verify environment variables set in Vercel dashboard
3. Check browser console for errors
4. Verify `/api/submit-booking` endpoint exists

**Need Help?**
- Check agent deliverables in `/private/tmp/claude-501/-Users-joshodeh/tasks/`
- Review HIPAA_COMPLIANCE_DOCUMENTATION.md
- Review IMPLEMENTATION_GUIDE.md (from security engineer agent)

## 🎯 SUCCESS CRITERIA

You're ready to launch when:
- ✅ No exposed API keys in client code
- ✅ Environment variables set in Vercel
- ✅ BAAs signed with all vendors
- ✅ Legal documents posted
- ✅ Booking form working
- ✅ All licenses active
- ✅ Insurance obtained
- ✅ Testing complete

**NEVER GO LIVE WITHOUT SIGNED BAAs - THIS IS A HIPAA VIOLATION**
