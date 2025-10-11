# Sentry Error Monitoring Setup Guide

## 🎯 What is Sentry?

Sentry is a real-time error tracking and monitoring platform that helps you:
- **Catch errors before users report them**
- **Get detailed stack traces and context**
- **Track performance issues**
- **Monitor user sessions** (Session Replay)
- **Get alerts** when critical errors occur

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Create Sentry Account

1. Go to https://sentry.io/signup/
2. Sign up with GitHub (recommended) or email
3. Choose **Free Developer Plan** (50k errors/month, unlimited projects)

### Step 2: Create a Project

1. Click **"Create Project"**
2. Select **"Next.js"** as the platform
3. Set **Alert frequency**: "On every new issue"
4. Name your project: `nexus-tech-solutions`
5. Click **"Create Project"**

### Step 3: Get Your DSN

Sentry will show you a **DSN** (Data Source Name) like:
```
https://abc123def456@o123456.ingest.sentry.io/7890123
```

Copy this - you'll need it next!

### Step 4: Configure Environment Variables

Add to `.env.local` (for development):
```bash
# Sentry Configuration
NEXT_PUBLIC_SENTRY_DSN=https://your-dsn-here@o123456.ingest.sentry.io/7890123
SENTRY_ORG=your-org-slug
SENTRY_PROJECT=nexus-tech-solutions
```

Add to `.env.production` (for production):
```bash
# Sentry Configuration
NEXT_PUBLIC_SENTRY_DSN=https://your-dsn-here@o123456.ingest.sentry.io/7890123
SENTRY_ORG=your-org-slug
SENTRY_PROJECT=nexus-tech-solutions
SENTRY_AUTH_TOKEN=sntrys_your_auth_token_here
```

### Step 5: Generate Auth Token (For Source Maps)

1. Go to https://sentry.io/settings/account/api/auth-tokens/
2. Click **"Create New Token"**
3. Name: `Nexus Source Maps Upload`
4. Scopes: Select **"project:releases"** and **"org:read"**
5. Click **"Create Token"**
6. Copy the token and add to `.env.production`:
   ```bash
   SENTRY_AUTH_TOKEN=sntrys_your_token_here
   ```

---

## ✅ What's Already Configured

I've already set up:

### 1. Sentry SDK Installation
```bash
npm install @sentry/nextjs
```

### 2. Configuration Files Created

- **`sentry.client.config.ts`** - Browser error tracking
- **`sentry.server.config.ts`** - Server-side error tracking
- **`sentry.edge.config.ts`** - Edge runtime error tracking
- **`next.config.ts`** - Sentry integration with Next.js

### 3. Features Enabled

✅ **Error Tracking** - Catch all JavaScript errors
✅ **Performance Monitoring** - Track slow API calls & pages
✅ **Session Replay** - Watch user sessions with errors
✅ **Source Maps** - See original code in stack traces
✅ **Ad-blocker Bypass** - Route through `/monitoring` tunnel
✅ **Privacy** - Masks sensitive data automatically

---

## 🧪 Test Sentry Integration

### Test 1: Client-Side Error

Create a test page at `src/app/sentry-test/page.tsx`:

```tsx
'use client';

export default function SentryTest() {
  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Sentry Test</h1>

      {/* Test client error */}
      <button
        onClick={() => {
          throw new Error('Test client-side error from Nexus');
        }}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Trigger Client Error
      </button>
    </div>
  );
}
```

Visit `/sentry-test` and click the button. Check Sentry dashboard for the error!

### Test 2: Server-Side Error

Create API test at `src/app/api/sentry-test/route.ts`:

```ts
import { NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';

export async function GET() {
  try {
    throw new Error('Test server-side error from Nexus API');
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.json({ error: 'Test error logged to Sentry' }, { status: 500 });
  }
}
```

Visit `/api/sentry-test` - error will appear in Sentry!

---

## 📊 Sentry Dashboard Overview

After setup, you'll see:

### Issues Tab
- All errors grouped by type
- Frequency & affected users
- Stack traces & breadcrumbs
- Environment (dev/prod)

### Performance Tab
- API endpoint latency
- Page load times
- Database query performance
- Slow transactions

### Replays Tab
- Video-like session recordings
- User interactions before error
- Console logs & network requests

---

## 🔔 Configure Alerts

### Step 1: Set Up Email Alerts

1. Go to **Settings → Projects → nexus-tech-solutions → Alerts**
2. Click **"Create Alert Rule"**
3. Configure:
   - **When:** An event is seen
   - **If:** level equals error
   - **Then:** Send notification to email
4. Save the rule

### Step 2: Slack Integration (Optional)

1. Go to **Settings → Integrations**
2. Find **Slack** → Click **"Add to Slack"**
3. Choose your channel (e.g., `#alerts`)
4. Configure alert rules to post to Slack

---

## 🛡️ Privacy & Security

### What Sentry DOESN'T Capture

✅ **Session Replay masks:**
- All text inputs (passwords, emails, etc.)
- Credit card numbers
- Phone numbers
- Any PII (Personally Identifiable Information)

✅ **beforeSend hook removes:**
- Cookies
- Request headers (Authorization, etc.)
- Sensitive query parameters

### What Sentry DOES Capture

✅ Error messages & stack traces
✅ Browser type & version
✅ Page URL (without query params)
✅ User actions (clicks, navigations)
✅ Performance metrics

---

## 🚀 Production Deployment

### Vercel Deployment

1. Add environment variables in Vercel:
   ```bash
   NEXT_PUBLIC_SENTRY_DSN=https://...
   SENTRY_ORG=your-org
   SENTRY_PROJECT=nexus-tech-solutions
   SENTRY_AUTH_TOKEN=sntrys_...
   ```

2. Deploy:
   ```bash
   git push
   ```

3. Sentry will automatically:
   - Upload source maps
   - Create a new release
   - Track errors by release version

### Other Hosting (Netlify, Railway, etc.)

Same steps - just add the environment variables in your hosting dashboard.

---

## 📈 Monitoring Best Practices

### 1. Set Up Release Tracking

In your deployment script:
```bash
# Create a release in Sentry
npx sentry-cli releases new "nexus-$(date +%Y%m%d-%H%M%S)"
npx sentry-cli releases set-commits --auto "nexus-$(date +%Y%m%d-%H%M%S)"
```

### 2. Tag Errors with Context

Add user context to errors:
```ts
import * as Sentry from '@sentry/nextjs';

// In your auth system
Sentry.setUser({
  id: user.id,
  email: user.email,
  role: user.role,
});

// Add custom tags
Sentry.setTag('page', 'buyback');
Sentry.setTag('feature', 'quote-generation');
```

### 3. Capture Performance Transactions

```ts
import * as Sentry from '@sentry/nextjs';

const transaction = Sentry.startTransaction({
  name: 'Generate Buyback Quote',
  op: 'quote.generate',
});

try {
  // Your code here
  const quote = await generateQuote(data);
  transaction.setStatus('ok');
} catch (error) {
  transaction.setStatus('internal_error');
  Sentry.captureException(error);
} finally {
  transaction.finish();
}
```

---

## 🎯 Next Steps After Setup

1. ✅ Create Sentry account (5 min)
2. ✅ Add DSN to `.env.local` and `.env.production`
3. ✅ Test with `/sentry-test` and `/api/sentry-test`
4. ✅ Configure email/Slack alerts
5. ✅ Deploy to production with env vars
6. ✅ Monitor dashboard for first 24 hours
7. ✅ Set up weekly error review process

---

## 📊 Expected Volume (Free Tier Limits)

**Free Developer Plan:**
- 50,000 errors/month
- 100 session replays/month
- 10,000 performance transactions/month

**Your Expected Volume:**
- ~50-100 errors/month (after initial fixes)
- ~20-30 replays/month (only on errors)
- ~5,000 performance transactions/month

**You're well within the free tier! 🎉**

---

## 🆘 Troubleshooting

### Issue: "Sentry not capturing errors"
**Solution:** Check:
1. `NEXT_PUBLIC_SENTRY_DSN` is set correctly
2. `NODE_ENV=production` (Sentry disabled in dev by default)
3. Error is thrown in client/server component (not suppressed)

### Issue: "Source maps not uploading"
**Solution:** Check:
1. `SENTRY_AUTH_TOKEN` is set in deployment
2. `SENTRY_ORG` and `SENTRY_PROJECT` match your Sentry project
3. Build logs show "Uploading source maps to Sentry"

### Issue: "Too many errors reported"
**Solution:**
1. Use `ignoreErrors` in config to filter noise
2. Set `tracesSampleRate: 0.1` to reduce volume
3. Fix most common errors first

---

## 📞 Resources

- **Sentry Docs:** https://docs.sentry.io/platforms/javascript/guides/nextjs/
- **Next.js Integration:** https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
- **Dashboard:** https://sentry.io/organizations/[your-org]/issues/
- **Support:** https://sentry.io/support/

---

## ✅ Checklist

- [ ] Create Sentry account
- [ ] Create Next.js project in Sentry
- [ ] Copy DSN to `.env.local`
- [ ] Copy DSN to `.env.production`
- [ ] Generate auth token
- [ ] Add `SENTRY_AUTH_TOKEN` to production
- [ ] Test with `/sentry-test` page
- [ ] Configure email alerts
- [ ] Deploy to production
- [ ] Verify first error is captured
- [ ] Set up weekly review process

---

**Status:** ✅ Sentry integration code is complete. Just add your DSN and deploy!
