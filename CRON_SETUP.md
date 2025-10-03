# Quote Reminder Cron Job Setup

The buyback system includes automated quote reminder emails that are sent at 7 days, 3 days, and 1 day before expiration. This document explains how to set up the automated scheduling.

## How It Works

The `/api/cron/quote-reminders` endpoint:
- Finds all pending quotes that haven't expired
- Sends reminder emails based on days until expiration
- Marks expired quotes as `EXPIRED`
- Logs all email activities to the database

## Setup Options

### Option 1: Vercel Cron Jobs (Recommended for Vercel)

**Best for:** Vercel deployments (easiest setup)

1. Create `vercel.json` in your project root:

```json
{
  "crons": [{
    "path": "/api/cron/quote-reminders",
    "schedule": "0 10 * * *"
  }]
}
```

2. Set environment variable in Vercel dashboard:
   - `CRON_SECRET`: `de0d003e0114ae89e7ef101ec1cf83cbecdfe0016ce7d55472d17fed8096c84e`

3. Deploy to Vercel - cron will run automatically at 10 AM daily

**Schedule format:**
- `0 10 * * *` = Every day at 10:00 AM
- `0 */6 * * *` = Every 6 hours
- `0 0 * * *` = Every day at midnight

---

### Option 2: External Cron Service

**Best for:** Any hosting platform (Netlify, Render, Railway, etc.)

**Recommended services:**
- [cron-job.org](https://cron-job.org) (Free, reliable)
- [EasyCron](https://www.easycron.com) (Free tier available)
- [Cronhooks](https://cronhooks.io) (Simple, modern)

**Setup:**

1. Sign up for one of the services above

2. Create a new cron job with:
   - **URL:** `https://yourdomain.com/api/cron/quote-reminders`
   - **Method:** GET
   - **Schedule:** Daily at 10:00 AM
   - **Headers:**
     ```
     Authorization: Bearer de0d003e0114ae89e7ef101ec1cf83cbecdfe0016ce7d55472d17fed8096c84e
     ```

3. Test the cron job manually first

---

### Option 3: GitHub Actions

**Best for:** GitHub-hosted projects wanting free automated scheduling

1. Create `.github/workflows/cron.yml`:

```yaml
name: Quote Reminders Cron

on:
  schedule:
    - cron: '0 10 * * *'  # Daily at 10:00 AM UTC
  workflow_dispatch:  # Allow manual triggers

jobs:
  reminder:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger quote reminders
        run: |
          curl -X GET https://yourdomain.com/api/cron/quote-reminders \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET }}"
```

2. Add `CRON_SECRET` to GitHub repository secrets:
   - Go to Settings → Secrets and variables → Actions
   - Add new secret: `CRON_SECRET` = `de0d003e0114ae89e7ef101ec1cf83cbecdfe0016ce7d55472d17fed8096c84e`

3. Commit and push the workflow file

---

### Option 4: Server-Side Cron (Linux/Mac)

**Best for:** VPS or dedicated server deployments

Add to crontab:
```bash
0 10 * * * curl -X GET https://yourdomain.com/api/cron/quote-reminders -H "Authorization: Bearer de0d003e0114ae89e7ef101ec1cf83cbecdfe0016ce7d55472d17fed8096c84e"
```

Edit crontab:
```bash
crontab -e
```

---

## Testing

### Manual Test

Trigger the cron job manually:

```bash
curl -X GET http://localhost:3001/api/cron/quote-reminders \
  -H "Authorization: Bearer de0d003e0114ae89e7ef101ec1cf83cbecdfe0016ce7d55472d17fed8096c84e"
```

Expected response:
```json
{
  "success": true,
  "message": "Quote reminders processed successfully",
  "timestamp": "2025-10-03T10:00:00.000Z"
}
```

### Monitoring

Check logs:
- Vercel: View logs in dashboard
- External cron: Check service dashboard
- GitHub Actions: View workflow runs

---

## Security

**IMPORTANT:**
1. Never commit `.env` to version control
2. Use different `CRON_SECRET` for production
3. Keep the secret secure - anyone with it can trigger the cron job

Generate new secret for production:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Troubleshooting

**Emails not sending?**
- Check `EmailLog` table in database for failures
- Verify SMTP credentials in `.env`
- Check application logs for errors

**Cron not running?**
- Verify the schedule format
- Check authorization header is correct
- Test endpoint manually first
- Ensure deployment is live

**Quotes not expiring?**
- Cron updates database - check `Quote` table status
- Verify cron is actually running (check logs)
- Test manually with curl command

---

## Customization

### Change Schedule

Edit the cron schedule based on your needs:
- More frequent: `0 */6 * * *` (every 6 hours)
- Twice daily: `0 9,18 * * *` (9 AM and 6 PM)
- Weekly: `0 10 * * 1` (Mondays at 10 AM)

### Change Reminder Days

Edit `/src/lib/backend/email-service.ts`:

```typescript
// Change from 7,3,1 to 10,5,2 days
if (daysRemaining <= 10 && daysRemaining > 5 && !sentReminders.has(EmailType.REMINDER_7_DAYS)) {
  // Send first reminder
}
```

---

## Production Checklist

- [ ] CRON_SECRET generated and set in production
- [ ] Cron service configured and tested
- [ ] Email SMTP credentials verified
- [ ] Test reminder email delivery
- [ ] Monitor first few cron executions
- [ ] Set up error alerting (optional)
