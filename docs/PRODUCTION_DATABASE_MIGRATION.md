# Production Database Migration Guide

## 🚨 Critical: SQLite → Production Database

Your application currently uses SQLite (`file:./dev.db`) which is **NOT suitable for production** due to:
- File corruption risk under concurrent load
- No built-in replication/backup
- Poor performance under multiple connections
- Data loss risk if server crashes

---

## 📋 Recommended Production Database Options

### Option 1: **Turso** (Recommended for Small-Medium Scale) ⭐
**Why Turso:**
- Built on LibSQL (SQLite-compatible)
- Easiest migration path from SQLite
- Edge deployment (low latency globally)
- Free tier: 500 databases, 1 billion row reads/month
- Automatic replication & backups
- Pay-as-you-grow pricing

**Pricing:**
- Free: $0/month (500 DBs, 9GB storage, 1B reads)
- Pro: $29/month (1000 DBs, unlimited storage, 10B reads)

**Setup Time:** 15 minutes

---

### Option 2: **PostgreSQL on Railway** (Recommended for Growth)
**Why Railway:**
- Full PostgreSQL with all advanced features
- Easy deployment & management
- Built-in metrics & logging
- Auto-scaling capabilities

**Pricing:**
- Starter: $5/month (1GB RAM, 1GB storage)
- Pro: Pay-per-use ($0.000463/GB RAM/min)

**Setup Time:** 30 minutes

---

### Option 3: **PostgreSQL on Vercel Postgres** (If deploying to Vercel)
**Why Vercel Postgres:**
- Seamless integration if using Vercel for deployment
- Serverless PostgreSQL (no server management)
- Auto-scaling with edge caching

**Pricing:**
- Hobby: Free (256MB storage, 60 compute hours)
- Pro: $10/month base + usage

**Setup Time:** 20 minutes

---

### Option 4: **PlanetScale** (MySQL - Advanced)
**Why PlanetScale:**
- MySQL-compatible with git-like branching
- Non-blocking schema changes
- Horizontal scaling built-in

**Pricing:**
- Hobby: Free (5GB storage, 1B row reads)
- Scaler: $29/month (10GB storage, 10B reads)

**Setup Time:** 25 minutes

---

## 🚀 Migration Path 1: Turso (Easiest)

### Step 1: Install Turso CLI
```bash
# Windows (PowerShell as Admin)
powershell -ExecutionPolicy Bypass -c "iwr https://get.tur.so/install.ps1 | iex"

# Verify installation
turso --version
```

### Step 2: Create Turso Database
```bash
# Login to Turso
turso auth login

# Create production database
turso db create nexus-production --location dfw

# Get connection URL
turso db show nexus-production --url

# Get auth token
turso db tokens create nexus-production
```

### Step 3: Update Prisma Schema
Edit `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "sqlite"  // Keep as sqlite (LibSQL is SQLite-compatible)
  url      = env("DATABASE_URL")
}
```

### Step 4: Update Environment Variables
Create `.env.production`:
```bash
# Turso Database (copy from turso commands above)
DATABASE_URL="libsql://nexus-production-[your-org].turso.io?authToken=eyJ..."

# Security (generate new secrets!)
JWT_SECRET=[generate-new-64-char-secret]
CRON_SECRET=[generate-new-64-char-secret]

# Email (same as .env)
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=dylan@nexustechsolutions.io
SMTP_PASS=Nexus3455!
SMTP_FROM=dylan@nexustechsolutions.io
BUSINESS_EMAIL=inquiries@nexustechsolutions.io

# Production URL
NEXT_PUBLIC_SITE_URL=https://nexustechsolutions.io
NODE_ENV=production
```

### Step 5: Deploy Schema to Turso
```bash
# Push schema to Turso
npx prisma db push

# Optional: Seed initial data
npx prisma db seed
```

### Step 6: Migrate Existing Data (if needed)
```bash
# Export from SQLite
sqlite3 prisma/dev.db .dump > backup.sql

# Import to Turso
turso db shell nexus-production < backup.sql
```

---

## 🚀 Migration Path 2: PostgreSQL (Railway)

### Step 1: Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Provision PostgreSQL"

### Step 2: Get Database Credentials
Railway will provide:
```
DATABASE_URL=postgresql://postgres:password@containers-us-west-xxx.railway.app:5432/railway
```

### Step 3: Update Prisma Schema
Edit `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"  // Change from sqlite
  url      = env("DATABASE_URL")
}
```

### Step 4: Handle Schema Differences
Some changes needed for PostgreSQL compatibility:

```prisma
// BEFORE (SQLite)
model RateLimit {
  resetTime BigInt  // SQLite BigInt
}

// AFTER (PostgreSQL)
model RateLimit {
  resetTime BigInt @db.BigInt  // PostgreSQL BigInt
}
```

### Step 5: Create & Run Migration
```bash
# Create migration
npx prisma migrate dev --name init_postgresql

# Apply to production
npx prisma migrate deploy
```

### Step 6: Update Production Environment
```bash
# .env.production
DATABASE_URL=postgresql://postgres:password@containers-us-west-xxx.railway.app:5432/railway

JWT_SECRET=[new-64-char-secret]
CRON_SECRET=[new-64-char-secret]
NODE_ENV=production
```

---

## 🚀 Migration Path 3: Vercel Postgres

### Step 1: Create Vercel Postgres Database
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Create Postgres database
vercel postgres create nexus-db
```

### Step 2: Link to Project
```bash
# Link database to project
vercel link
vercel env pull .env.production
```

### Step 3: Update Schema (Same as Railway)
Change `provider = "postgresql"` in `prisma/schema.prisma`

### Step 4: Deploy Schema
```bash
# Set DATABASE_URL from Vercel dashboard
# Run migration
npx prisma migrate deploy
```

---

## ⚙️ Required Code Changes for PostgreSQL

If switching from SQLite to PostgreSQL, update these files:

### 1. Update `prisma/schema.prisma`
```prisma
datasource db {
  provider = "postgresql"  // Change from sqlite
  url      = env("DATABASE_URL")
}

// Add @db.Text for large strings
model User {
  backupCodes String? @db.Text  // Add this
  // ... rest
}

// Use @db.BigInt for BigInt fields
model RateLimit {
  resetTime BigInt @db.BigInt  // Add this
}
```

### 2. Update Date Handling (if needed)
PostgreSQL is stricter with dates. Check:
- `src/lib/db.ts` - any raw SQL queries
- `src/app/api/*/route.ts` - date comparisons

### 3. Test Full-Text Search
PostgreSQL has different full-text search syntax than SQLite.

---

## 🔐 Generate Production Secrets

```bash
# Generate JWT_SECRET (64 characters)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate CRON_SECRET (64 characters)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Add to `.env.production`:
```bash
JWT_SECRET=<generated-secret-1>
CRON_SECRET=<generated-secret-2>
```

---

## 📊 Data Migration Checklist

- [ ] **Backup SQLite database**
  ```bash
  cp prisma/dev.db prisma/dev.db.backup
  sqlite3 prisma/dev.db .dump > backup-$(date +%Y%m%d).sql
  ```

- [ ] **Export existing data** (if you have production data)
  ```bash
  # Export users
  npx prisma db seed  # If you have seed script
  ```

- [ ] **Create production database** (Turso/Railway/Vercel)

- [ ] **Update Prisma schema** (change provider)

- [ ] **Run migrations**
  ```bash
  npx prisma migrate deploy
  ```

- [ ] **Import data** (if migrating existing data)

- [ ] **Test connection**
  ```bash
  npx prisma db push --accept-data-loss
  npx prisma studio  # Verify data
  ```

- [ ] **Update deployment environment variables**

---

## 🧪 Testing Production Database Locally

Test production database config before deploying:

```bash
# 1. Create .env.local with production DATABASE_URL
cp .env.production .env.local

# 2. Test connection
npx prisma db push

# 3. Run app locally with production DB
npm run dev

# 4. Test all features:
#    - User login/registration
#    - Quote creation
#    - Email sending
#    - Admin dashboard
```

---

## 🚨 Pre-Deployment Checklist

- [ ] Production database created & accessible
- [ ] `DATABASE_URL` updated in hosting platform env vars
- [ ] `JWT_SECRET` generated (new 64-char secret)
- [ ] `CRON_SECRET` generated (new 64-char secret)
- [ ] Schema deployed: `npx prisma migrate deploy`
- [ ] Seed data added (if needed)
- [ ] Test deployment in staging environment
- [ ] Set up database backups (automatic in Turso/Railway/Vercel)
- [ ] Configure monitoring (Railway/Vercel dashboards)

---

## 📈 My Recommendation for Your Site

**Use Turso** because:
1. ✅ Easiest migration (minimal code changes)
2. ✅ Free tier covers your needs (500 DBs, 1B reads)
3. ✅ Edge deployment = fast for Denton customers
4. ✅ Built-in backups & replication
5. ✅ Can scale to 10B reads/month for $29
6. ✅ No server management needed

**Migration time:** 15-20 minutes

**Total steps:**
1. Install Turso CLI (2 min)
2. Create database (1 min)
3. Update .env.production (2 min)
4. Deploy schema (5 min)
5. Test (5 min)
6. Deploy to hosting (5 min)

---

## 🆘 Troubleshooting

### Error: "Can't reach database server"
- Check DATABASE_URL is correct
- Verify firewall allows database connection
- Check auth token hasn't expired (Turso)

### Error: "Migration failed"
- Ensure no other connections to database
- Check schema is valid: `npx prisma validate`
- Try `npx prisma db push --accept-data-loss` for dev

### Error: "Type mismatch" (PostgreSQL)
- Add `@db.BigInt` to BigInt fields
- Add `@db.Text` to large String fields
- Review schema differences: sqlite vs postgresql

---

## 📞 Need Help?

1. **Turso Docs:** https://docs.turso.tech/
2. **Railway Docs:** https://docs.railway.app/
3. **Prisma Docs:** https://www.prisma.io/docs/
4. **Vercel Postgres:** https://vercel.com/docs/storage/vercel-postgres

---

## 🎯 Next Steps After Database Migration

Once database is migrated:

1. ✅ Set up Sentry for error monitoring
2. ✅ Replace console.log with proper logger
3. ✅ Fix weak TLS cipher in SMTP config
4. ✅ Add health check endpoint
5. ✅ Configure production rate limiting
6. ✅ Set up automated backups (if not included)
7. ✅ Load test with realistic traffic
8. ✅ Deploy to production! 🚀
