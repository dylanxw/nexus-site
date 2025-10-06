# 🧪 TESTING GUIDE - Critical Fixes

## How to Test All Critical Fixes

---

## 🔧 PRE-TEST SETUP

### 1. Apply Database Migrations
```bash
cd "c:\Users\dylan\Desktop\Nexus Site\nexus-site"
npx prisma migrate deploy
npx prisma generate
```

### 2. Restart Dev Server
```bash
# Stop current server (Ctrl+C)
npm run dev
```

### 3. Verify Environment
```bash
# Check that you're in development mode
echo $NODE_ENV  # Should be empty or "development"
```

---

## ✅ TEST #1: Server-Side Price Calculation (CRITICAL #4)

### **What We're Testing:**
Verify that client cannot manipulate prices - server calculates everything.

### **Test Steps:**

#### A. Normal Quote Submission (Should Work)
1. Go to: `http://localhost:3000/buyback/iphone`
2. Select any iPhone model (e.g., iPhone 17 Pro Max)
3. Choose storage, network, condition
4. Fill in your contact info
5. Submit quote
6. **Expected:** Quote created successfully with correct pricing

#### B. Malicious Request (Should Fail/Ignore)
Open browser DevTools Console and run:

```javascript
// Try to manipulate prices
fetch('http://localhost:3000/api/buyback/quote', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'iPhone 17 Pro Max',
    storage: '1TB',
    network: 'Unlocked',
    condition: 'Flawless',
    name: 'Test User',
    email: 'test@example.com',
    phone: '555-1234',
    offerPrice: 999999,  // ❌ Trying to set our own price
    atlasPrice: 1000000  // ❌ Trying to set Atlas price
  })
})
.then(r => r.json())
.then(console.log)
```

**Expected Result:**
```json
{
  "success": true,
  "quoteNumber": "Q-XXXX-XXXX",
  // Prices are calculated SERVER-SIDE (ignoring client values)
  "offerPrice": <correct calculated price>,
  "atlasPrice": <correct atlas price>
}
```

✅ **PASS:** Client-provided prices are ignored, server calculates correct prices
❌ **FAIL:** If client prices are used (would be $999,999)

---

## ✅ TEST #2: Consolidated Pricing Logic (CRITICAL #1)

### **What We're Testing:**
Verify that pricing page and quote submission use the SAME calculation.

### **Test Steps:**

#### A. Check Pricing Consistency
1. Go to: `http://localhost:3000/buyback/iphone`
2. Click on "iPhone 17 Pro Max"
3. Select: 1TB, Unlocked, Flawless
4. **Note the displayed price** (e.g., $800)
5. Proceed to quote submission
6. Submit quote
7. Check quote confirmation

**Expected:** Price shown on selection page **EXACTLY MATCHES** quote price

#### B. Verify No Price Drift
Open two browser tabs:

**Tab 1 - Pricing API:**
```javascript
fetch('http://localhost:3000/api/buyback/pricing', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'iPhone 17 Pro Max',
    storage: '1TB',
    network: 'Unlocked',
    condition: 'Flawless'
  })
})
.then(r => r.json())
.then(data => console.log('Pricing API:', data.offerPrice))
```

**Tab 2 - Quote API:**
```javascript
fetch('http://localhost:3000/api/buyback/quote', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'iPhone 17 Pro Max',
    storage: '1TB',
    network: 'Unlocked',
    condition: 'Flawless',
    name: 'Test User',
    email: 'test@example.com',
    phone: '555-1234'
  })
})
.then(r => r.json())
.then(data => console.log('Quote API created with price:', data))
```

✅ **PASS:** Both APIs return the **EXACT SAME** offer price
❌ **FAIL:** Prices differ between APIs

---

## ✅ TEST #3: Database Series Field (CRITICAL #3)

### **What We're Testing:**
Verify series overrides use database field, not user input.

### **Test Steps:**

#### A. Set Up Series Override
1. Go to: `http://localhost:3000/admin/buyback/margins`
2. Enable "iPhone 17 Series" override
3. Set all margins to 5% (very low margin for testing)
4. Save settings

#### B. Sync Pricing Data
1. Go to: `http://localhost:3000/admin/buyback/pricing`
2. Click "Sync from Atlas"
3. Wait for completion

#### C. Test Series Override Detection
```javascript
// Should use database series field
fetch('http://localhost:3000/api/buyback/pricing', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'iPhone 17 Pro Max',
    storage: '1TB',
    network: 'Unlocked',
    condition: 'Flawless'
  })
})
.then(r => r.json())
.then(data => {
  console.log('Series Override Active?', data.isSeriesOverride)
  console.log('Margin %:', data.marginPercentage)
})
```

**Expected:**
```json
{
  "success": true,
  "isSeriesOverride": true,  // ✅ Using series override
  "marginPercentage": "5.0"  // ✅ 5% margin from override
}
```

#### D. Try to Manipulate Series (Should Fail)
```javascript
// Try to trick it with fake model name
fetch('http://localhost:3000/api/buyback/pricing', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'iPhone 99 Fake',  // ❌ Trying to trigger wrong series
    storage: '1TB',
    network: 'Unlocked',
    condition: 'Flawless'
  })
})
.then(r => r.json())
.then(console.log)
```

✅ **PASS:** Returns 404 (pricing not found) - doesn't use fake series
❌ **FAIL:** If it uses "99" as a series

---

## ✅ TEST #4: Production Rate Limiting (CRITICAL #5)

### **What We're Testing:**
Verify rate limiting works in both dev and production modes.

### **Test Steps:**

#### A. Development Mode (In-Memory)
Run this script in browser console:

```javascript
// Spam pricing requests (limit: 30 per minute)
async function testRateLimit() {
  for (let i = 1; i <= 35; i++) {
    const res = await fetch('http://localhost:3000/api/buyback/pricing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'iPhone 17 Pro Max',
        storage: '1TB',
        network: 'Unlocked',
        condition: 'Flawless'
      })
    });

    const data = await res.json();
    console.log(`Request ${i}: ${res.status} - ${data.success ? 'OK' : data.error}`);

    if (res.status === 429) {
      console.log('✅ RATE LIMITED at request', i);
      break;
    }
  }
}

testRateLimit();
```

**Expected Output:**
```
Request 1: 200 - OK
Request 2: 200 - OK
...
Request 30: 200 - OK
Request 31: 429 - Too many requests. Please try again later.
✅ RATE LIMITED at request 31
```

#### B. Test Quote Rate Limiting
```javascript
// Spam quote submissions (limit: 5 per 15 minutes)
async function testQuoteRateLimit() {
  for (let i = 1; i <= 7; i++) {
    const res = await fetch('http://localhost:3000/api/buyback/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'iPhone 17 Pro Max',
        storage: '1TB',
        network: 'Unlocked',
        condition: 'Flawless',
        name: `Test User ${i}`,
        email: `test${i}@example.com`,
        phone: '555-1234'
      })
    });

    const data = await res.json();
    console.log(`Quote ${i}: ${res.status}`, data.success ? 'Created' : data.error);

    if (res.status === 429) {
      console.log(`✅ RATE LIMITED after ${i - 1} quotes`);
      console.log('Retry after:', res.headers.get('Retry-After'), 'seconds');
      break;
    }
  }
}

testQuoteRateLimit();
```

**Expected:**
```
Quote 1: 200 Created
Quote 2: 200 Created
...
Quote 5: 200 Created
Quote 6: 429 Too many requests. Please try again later.
✅ RATE LIMITED after 5 quotes
Retry after: 900 seconds  (15 minutes)
```

#### C. Verify Database Persistence
```sql
-- Check rate limit records in database
SELECT * FROM rate_limits;
```

**Expected:** You should see records like:
```
key                                    | count | resetTime      | updatedAt
127.0.0.1:/api/buyback/pricing        | 30    | 1704393600000 | 2025-01-03...
127.0.0.1:/api/buyback/quote          | 5     | 1704394500000 | 2025-01-03...
```

#### D. Test Server Restart Persistence (Production Mode)

**Step 1:** Set production mode temporarily
```bash
# Windows PowerShell
$env:NODE_ENV="production"
npm run dev
```

**Step 2:** Make some requests (hit rate limit)

**Step 3:** Restart server
```bash
# Stop server (Ctrl+C)
npm run dev
```

**Step 4:** Try another request immediately

✅ **PASS:** Still rate limited (data persisted in database)
❌ **FAIL:** If you can make requests (limits reset)

**Step 5:** Reset environment
```bash
# Windows PowerShell
$env:NODE_ENV=""
npm run dev
```

---

## ✅ TEST #5: Transaction Safety (CRITICAL #6)

### **What We're Testing:**
Verify Quote and ActivityLog are created atomically.

### **Test Steps:**

#### A. Normal Quote Creation
1. Submit a quote normally
2. Go to admin panel or database

```sql
-- Check quote and activity log exist together
SELECT
  q.quoteNumber,
  q.model,
  q.offerPrice,
  a.action,
  a.description
FROM Quote q
LEFT JOIN ActivityLog a ON a.quoteId = q.id
WHERE q.quoteNumber = 'Q-XXXX-XXXX'  -- Replace with your quote number
```

**Expected:** Should return 1 row with both quote and activity log data

✅ **PASS:** Every quote has an activity log
❌ **FAIL:** If quote exists but activity log is missing

#### B. Verify No Orphans
```sql
-- Find quotes without activity logs (should be 0)
SELECT q.quoteNumber, q.createdAt
FROM Quote q
LEFT JOIN ActivityLog a ON a.quoteId = q.id AND a.action = 'quote_created'
WHERE a.id IS NULL;
```

**Expected:** 0 rows (no orphaned quotes)

✅ **PASS:** No quotes without activity logs
❌ **FAIL:** If any quotes are missing activity logs

---

## ✅ TEST #6: Runtime Type Validation (CRITICAL #2)

### **What We're Testing:**
Verify system handles invalid/null pricing gracefully.

### **Test Steps:**

#### A. Test Invalid Condition
```javascript
fetch('http://localhost:3000/api/buyback/pricing', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'iPhone 17 Pro Max',
    storage: '1TB',
    network: 'Unlocked',
    condition: 'InvalidCondition'  // ❌ Invalid
  })
})
.then(r => r.json())
.then(console.log)
```

**Expected:**
```json
{
  "success": false,
  "error": "Invalid condition"
}
```

#### B. Test Missing Pricing Data
```javascript
// Try a model that doesn't exist in database
fetch('http://localhost:3000/api/buyback/pricing', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'iPhone 99 Fake Model',
    storage: '1TB',
    network: 'Unlocked',
    condition: 'Flawless'
  })
})
.then(r => r.json())
.then(console.log)
```

**Expected (Production):**
```json
{
  "success": false,
  "error": "This device configuration is not available for purchase at this time."
}
```

**Expected (Development):**
```json
{
  "success": false,
  "error": "Pricing not available for iPhone 99 Fake Model 1TB Unlocked"
}
```

✅ **PASS:** Graceful error messages, no crashes
❌ **FAIL:** If server crashes or returns 500 error

---

## 🔍 DEBUGGING TIPS

### Check Server Logs
Look for these log entries:

```bash
# Good logs (success)
✅ Calculating server-side pricing for quote
✅ Quote created successfully
✅ Email sent to customer

# Error logs (investigate)
❌ Server-side pricing calculation failed
❌ Invalid prices calculated
❌ Failed to send customer confirmation email
```

### Verify Database State
```sql
-- Check recent quotes
SELECT * FROM Quote ORDER BY createdAt DESC LIMIT 5;

-- Check activity logs
SELECT * FROM ActivityLog ORDER BY createdAt DESC LIMIT 10;

-- Check rate limits
SELECT * FROM rate_limits;

-- Check pricing data series
SELECT model, modelName, series FROM PricingData WHERE series IS NOT NULL LIMIT 10;
```

### Test Error Scenarios
```javascript
// Test with missing required fields
fetch('http://localhost:3000/api/buyback/quote', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'iPhone 17 Pro Max',
    // Missing storage, network, condition, contact info
  })
})
.then(r => r.json())
.then(data => console.log('Validation Error:', data))
```

---

## ✅ COMPLETE TEST CHECKLIST

Run through this checklist to verify all fixes:

- [ ] **Server-Side Pricing**: Client prices are ignored
- [ ] **Price Consistency**: Same price in pricing API and quote API
- [ ] **Series Override**: Uses database series field
- [ ] **Rate Limiting**: Blocks after limit reached (pricing: 30/min, quotes: 5/15min)
- [ ] **Database Persistence**: Rate limits survive server restart (production mode)
- [ ] **Transaction Safety**: All quotes have activity logs
- [ ] **Type Validation**: Invalid conditions return proper errors
- [ ] **Error Messages**: Clean errors in production, detailed in dev

---

## 🚨 KNOWN ISSUES TO EXPECT

These are **NOT bugs**, but expected behavior:

1. **First request after server restart may be slow** - Database connection pool warming up
2. **Rate limit headers in response** - X-RateLimit-* headers are added (this is good!)
3. **Development mode uses memory** - Rate limits reset on server restart (expected in dev)
4. **Production mode requires database** - Rate limits persist (expected in production)

---

## 📊 SUCCESS CRITERIA

All tests should show:

✅ Prices calculated server-side (client input ignored)
✅ Pricing API and Quote API return identical prices
✅ Series overrides use database field
✅ Rate limiting blocks after limit
✅ Rate limits persist across restarts (production)
✅ Every quote has an activity log
✅ Invalid input returns proper errors
✅ No server crashes

---

## 🆘 IF TESTS FAIL

1. **Check database migrations applied:**
   ```bash
   npx prisma migrate status
   ```

2. **Verify Prisma client generated:**
   ```bash
   npx prisma generate
   ```

3. **Check for TypeScript errors:**
   ```bash
   npm run build
   ```

4. **Review server logs:**
   Look for errors in terminal where dev server is running

5. **Clear browser cache:**
   Hard refresh (Ctrl+Shift+R)

---

## 📞 NEED HELP?

If any test fails:
1. Note which test failed
2. Copy the error message
3. Check server logs
4. Verify database state
5. Share findings for debugging

**Next Steps After All Tests Pass:**
- Move to High Priority fixes
- Set up monitoring/alerting
- Prepare for production deployment
