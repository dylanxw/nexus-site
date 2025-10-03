# Buyback System - Testing Guide

This guide walks you through testing all the features we implemented in Phase 1 & 2.

## 🎯 What We Built

### Phase 1 (Critical Fixes)
- ✅ Email service with Hostinger SMTP
- ✅ Business configuration centralization
- ✅ Quote submission to database
- ✅ Confirmation page
- ✅ Secure JWT authentication

### Phase 2 (Polish & Features)
- ✅ Form validation (Zod schemas)
- ✅ Rate limiting (spam protection)
- ✅ Error handling & logging
- ✅ Quote reminder automation

---

## 📋 Testing Checklist

### Test 1: Quote Submission Flow ⭐ **CRITICAL**

**Steps:**
1. Navigate to `http://localhost:3001/buyback`
2. Click "Sell iPhone"
3. Select a model (e.g., iPhone 15 Pro)
4. Choose specifications:
   - Storage: 256GB
   - Network: Unlocked
   - Condition: Flawless
5. Click "Get Paid"
6. Fill in contact form:
   - Name: Test Customer
   - Email: dylan@nexustechsolutions.io
   - Phone: 940-600-1012
7. Click "Lock In This Price"

**Expected Results:**
- ✅ Form validates inputs
- ✅ Redirects to confirmation page
- ✅ Shows quote number (e.g., Q-ABCD-123)
- ✅ Displays correct device details
- ✅ Shows your business info (phone, address, hours)

---

### Test 2: Form Validation

**Test Invalid Inputs:**

1. **Invalid Name:**
   - Try: `12345` or `Test@User`
   - Expected: Red error message "Name can only contain letters..."

2. **Invalid Email:**
   - Try: `notanemail` or `test@`
   - Expected: "Please enter a valid email address"

3. **Invalid Phone:**
   - Try: `123` or `abcdefghij`
   - Expected: "Please enter a valid phone number..."

4. **Phone Number Normalization:**
   - Try: `(940) 600-1012` or `9406001012`
   - Expected: Converts to `940-600-1012` format

**Expected Results:**
- ✅ Error messages appear in red below fields
- ✅ Can't submit form with errors
- ✅ Errors clear when you start typing valid input

---

### Test 3: Database Verification

**Check Quote was Saved:**

```bash
cd nexus-site
npx prisma studio
```

1. Open `Quote` table
2. Find your quote by email or quote number
3. Verify all fields are populated:
   - Model, storage, network, condition
   - Customer name, email, phone
   - Prices (atlasPrice, offerPrice, margin)
   - Status: PENDING
   - expiresAt: 14 days from now

**Expected Results:**
- ✅ Quote exists in database
- ✅ All fields have correct values
- ✅ Phone number is formatted: xxx-xxx-xxxx
- ✅ Email is lowercase

---

### Test 4: Email Delivery

**Check Your Inbox:**

1. **Customer Confirmation Email:**
   - To: dylan@nexustechsolutions.io
   - Subject: "Your Device Quote: $XXX - Nexus Tech Solutions"
   - Contains:
     - Quote number
     - Device details
     - Offer price
     - Your business phone: 940-600-1012
     - Your address: 3305 S Mayhill Rd, STE 109, Denton, TX 76208
     - Business hours

2. **Admin Notification Email:**
   - To: dylan@nexustechsolutions.io
   - Subject: "New Buyback Quote: iPhone XX - $XXX"
   - Contains:
     - Customer info (name, email, phone)
     - Device details
     - Pricing breakdown with margin

**Expected Results:**
- ✅ Both emails arrive within 1 minute
- ✅ All business info is correct
- ✅ No placeholder data (no 555-123-4567 or fake addresses)

**Troubleshooting:**
- Check spam folder
- Verify SMTP credentials in `.env`
- Check server logs for email errors

---

### Test 5: Admin Dashboard

**View the Quote:**

1. Navigate to `http://localhost:3001/admin`
2. Login (if prompted)
3. Go to "Buyback Leads" or `/admin/buyback/leads`
4. Find your test quote in the table

**Expected Results:**
- ✅ Quote appears in the list
- ✅ Shows correct customer info
- ✅ Shows device details
- ✅ Displays offer price and margin
- ✅ Status badge shows "PENDING"
- ✅ Can click "View" to see details

---

### Test 6: Rate Limiting

**Test Quote Submission Limit:**

1. Submit 5 quotes in quick succession
2. Try to submit a 6th quote immediately

**Expected Results:**
- ✅ First 5 quotes succeed
- ✅ 6th quote returns error:
  ```json
  {
    "error": "Too many requests. Please try again later.",
    "retryAfter": 900
  }
  ```
- ✅ Can submit again after 15 minutes

**Test Pricing API:**

Run this command 31 times rapidly:
```bash
for i in {1..31}; do curl -X POST http://localhost:3001/api/buyback/pricing \
  -H "Content-Type: application/json" \
  -d '{"model":"iPhone 15 Pro","storage":"256GB","network":"Unlocked","condition":"Flawless"}'; done
```

**Expected Results:**
- ✅ First 30 requests succeed
- ✅ 31st request returns 429 status code

---

### Test 7: Error Handling & Logging

**Test Invalid Submissions:**

1. Submit quote with missing fields (via API):
```bash
curl -X POST http://localhost:3001/api/buyback/quote \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com"}'
```

**Expected Results:**
- ✅ Returns validation error with specific fields
- ✅ Server logs show colored error message
- ✅ No crash or 500 error

**Check Server Logs:**
Look for colored log output:
- 🔵 INFO (green): Successful operations
- 🟡 WARN (yellow): Validation failures, rate limits
- 🔴 ERROR (red): Failed emails, exceptions

---

### Test 8: Quote Reminder Cron (Manual Test)

**Trigger the Cron Job:**

```bash
curl -X GET http://localhost:3001/api/cron/quote-reminders \
  -H "Authorization: Bearer de0d003e0114ae89e7ef101ec1cf83cbecdfe0016ce7d55472d17fed8096c84e"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Quote reminders processed successfully",
  "timestamp": "2025-10-03T10:00:00.000Z"
}
```

**Test Without Authorization:**
```bash
curl -X GET http://localhost:3001/api/cron/quote-reminders
```

**Expected Results:**
- ✅ Returns 401 Unauthorized
- ✅ Logs warning about unauthorized attempt

---

## 🚨 Common Issues & Solutions

### Issue: Emails Not Sending

**Solutions:**
1. Check SMTP credentials in `.env`
2. Verify Hostinger allows SMTP access
3. Check `EmailLog` table in Prisma Studio for failures
4. Test SMTP with:
```bash
curl smtp://smtp.hostinger.com:465 \
  --user "dylan@nexustechsolutions.io:Nexus3455!" \
  --mail-from "dylan@nexustechsolutions.io" \
  --mail-rcpt "test@test.com" \
  --upload-file - <<< "Test email"
```

### Issue: Quote Not Saving to Database

**Solutions:**
1. Check Prisma Studio - is Quote table present?
2. Run: `npx prisma db push` to sync schema
3. Check server logs for database errors
4. Verify `DATABASE_URL` in `.env`

### Issue: Validation Not Working

**Solutions:**
1. Check browser console for errors
2. Verify Zod package is installed: `npm list zod`
3. Clear browser cache and reload
4. Check network tab - is API returning validation errors?

### Issue: Rate Limiting Not Working

**Solutions:**
1. Rate limiting uses in-memory store - resets on server restart
2. Wait 15 minutes for window to reset
3. Check if request is coming from different IPs (won't be rate limited together)

---

## ✅ Production Readiness Checklist

Before deploying to production:

### Security
- [ ] Generate new JWT_SECRET for production
- [ ] Generate new CRON_SECRET for production
- [ ] Update all secrets in hosting platform
- [ ] Verify `.env` is in `.gitignore`
- [ ] Remove test data from database

### Configuration
- [ ] Update `NEXT_PUBLIC_SITE_URL` to production URL
- [ ] Set `NODE_ENV=production`
- [ ] Configure production SMTP if different
- [ ] Verify all business info is correct

### Testing
- [ ] Test full quote submission flow
- [ ] Verify emails deliver to real inbox
- [ ] Test admin dashboard access
- [ ] Verify rate limiting works
- [ ] Test form validation edge cases

### Cron Setup
- [ ] Choose cron service (Vercel/external)
- [ ] Configure cron schedule
- [ ] Test cron endpoint manually
- [ ] Monitor first few automated runs

### Monitoring
- [ ] Set up error tracking (Sentry optional)
- [ ] Monitor email delivery rates
- [ ] Track quote conversion metrics
- [ ] Set up alerts for failures

---

## 📊 Success Metrics

After testing, you should have:

1. **Database:**
   - At least 1 test quote
   - EmailLog entries for emails sent
   - ActivityLog entry for quote creation

2. **Emails:**
   - Customer confirmation received
   - Admin notification received
   - Both with correct business info

3. **Logs:**
   - Colored console output in development
   - No error logs for successful submissions
   - Warning logs for validation failures

4. **Rate Limits:**
   - Can't submit more than 5 quotes in 15 min
   - Can't make more than 30 pricing requests per min

---

## 🎉 You're Ready to Launch!

Once all tests pass, your buyback system is production-ready:
- ✅ Quotes save to database
- ✅ Emails send reliably
- ✅ Form validates inputs
- ✅ Rate limiting protects APIs
- ✅ Errors are logged properly
- ✅ Reminders can be automated

Deploy with confidence! 🚀
