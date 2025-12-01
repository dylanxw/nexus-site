# Production Deployment Checklist for Nexus Tech Solutions

## Phase 1: Critical Security Fixes (Do Immediately)

### 🔴 CRITICAL: Secure Your Credentials
- [ ] **IMMEDIATELY** change all passwords that were in .env:
  - [ ] Change email password for dylan@nexustechsolutions.io
  - [ ] Regenerate Google Service Account credentials
  - [ ] Generate new JWT_SECRET (use: `openssl rand -hex 64`)
  - [ ] Generate new CRON_SECRET
- [ ] Remove .env from git history:
  ```bash
  git filter-branch --force --index-filter \
    'git rm --cached --ignore-unmatch nexus-site/.env' \
    --prune-empty --tag-name-filter cat -- --all
  git push --force --all
  ```
- [ ] Add .env to .gitignore (if not already there)
- [ ] Set up secret management (Vercel Environment Variables recommended)

### 🔴 Fix TypeScript Build Error
- [ ] Fix type error in `/src/app/admin/buyback/margins/page.tsx:142`
- [ ] Run `npm run build` to verify it compiles

### 🔴 Add Security Headers
- [ ] Update `/src/middleware.ts` with security headers
- [ ] Test headers with: https://securityheaders.com

## Phase 2: Database Migration (1-2 days)

### Migrate from SQLite to PostgreSQL

#### Option 1: Supabase (Recommended)
- [ ] Sign up for Supabase (free tier)
- [ ] Create new project
- [ ] Get connection string
- [ ] Update schema.prisma:
  ```prisma
  datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
  }
  ```
- [ ] Install PostgreSQL client: `npm install @prisma/adapter-pg`
- [ ] Export SQLite data: `sqlite3 dev.db .dump > backup.sql`
- [ ] Run migrations: `npx prisma migrate deploy`
- [ ] Import data to PostgreSQL
- [ ] Test all database operations

#### Option 2: Railway PostgreSQL
- [ ] Create Railway account
- [ ] Deploy PostgreSQL instance
- [ ] Follow similar migration steps

## Phase 3: Critical Fixes (1 day)

### Accessibility Compliance
- [ ] Fix 5 buttons without accessible labels
- [ ] Add label to sort dropdown on /shop page
- [ ] Update color contrast (150+ elements need fixing)
- [ ] Test with axe DevTools extension

### Form Security
- [ ] Add rate limiting to repair form submission
- [ ] Add rate limiting to buyback quote form
- [ ] Implement CAPTCHA on public forms
- [ ] Add CSRF token validation to all POST routes

### Performance Optimizations
- [ ] Implement dynamic imports for heavy components
- [ ] Add loading="lazy" to images
- [ ] Enable image optimization in next.config.ts

## Phase 4: Pre-Deployment Setup (1 day)

### Environment Configuration
- [ ] Create production environment variables in hosting platform
- [ ] Set NODE_ENV=production
- [ ] Configure SMTP for production email
- [ ] Set up production Google Service Account
- [ ] Configure Sentry DSN for error tracking

### Testing
- [ ] Run full build: `npm run build`
- [ ] Test production build locally: `npm run start`
- [ ] Check all API endpoints work
- [ ] Test email sending
- [ ] Test Google Calendar integration
- [ ] Test buyback quote generation
- [ ] Test admin dashboard functions
- [ ] Mobile responsiveness testing

## Phase 5: Deployment Platform Setup

### Recommended: Vercel Deployment
- [ ] Connect GitHub repository to Vercel
- [ ] Configure environment variables in Vercel dashboard
- [ ] Set up custom domain (nexustechsolutions.io)
- [ ] Configure SSL certificate (automatic on Vercel)
- [ ] Set up preview deployments for staging
- [ ] Configure production branch protection

### Configure Cron Jobs
- [ ] Add to vercel.json:
  ```json
  {
    "crons": [{
      "path": "/api/cron/quote-reminders",
      "schedule": "0 10 * * *"
    }]
  }
  ```

### Monitoring Setup
- [ ] Enable Vercel Analytics
- [ ] Configure Sentry error tracking
- [ ] Set up uptime monitoring (UptimeRobot/Pingdom)
- [ ] Configure Google Analytics
- [ ] Set up performance monitoring

## Phase 6: Go-Live Checklist

### Final Security Review
- [ ] All secrets rotated from development
- [ ] Security headers active and tested
- [ ] HTTPS enforced
- [ ] Rate limiting active
- [ ] Input validation on all forms
- [ ] SQL injection protection verified
- [ ] XSS protection verified

### DNS & Domain
- [ ] Point domain to hosting platform
- [ ] Configure www redirect
- [ ] Set up email DNS records (SPF, DKIM, DMARC)
- [ ] Verify SSL certificate active

### SEO & Marketing
- [ ] Submit sitemap to Google Search Console
- [ ] Verify robots.txt is correct
- [ ] Set up Google My Business integration
- [ ] Verify Open Graph tags work
- [ ] Test social media sharing

### Backup & Recovery
- [ ] Set up automated database backups
- [ ] Document recovery procedures
- [ ] Test backup restoration
- [ ] Create incident response plan

## Phase 7: Post-Launch (First Week)

### Monitoring
- [ ] Monitor error rates in Sentry
- [ ] Check performance metrics daily
- [ ] Review security logs
- [ ] Monitor database performance
- [ ] Check email delivery rates

### Optimization
- [ ] Analyze user behavior with analytics
- [ ] Identify and fix any bugs
- [ ] Optimize slow queries
- [ ] Fine-tune rate limiting
- [ ] Gather user feedback

### Documentation
- [ ] Create admin user guide
- [ ] Document API endpoints
- [ ] Create troubleshooting guide
- [ ] Update README with production info

## Critical Metrics to Monitor

### Performance KPIs
- Page load time < 3 seconds
- Time to Interactive < 5 seconds
- Lighthouse score > 90
- Core Web Vitals passing

### Business KPIs
- Quote conversion rate
- Repair booking rate
- Email open rates
- Site uptime > 99.9%

### Security KPIs
- Failed login attempts
- Rate limit violations
- 404 error rates
- API response times

## Emergency Contacts & Resources

### Platform Support
- Vercel Support: https://vercel.com/support
- Supabase Support: https://supabase.com/support
- Hostinger Support: (for email issues)

### Monitoring Dashboards
- Vercel Dashboard: https://vercel.com/dashboard
- Sentry: https://sentry.io
- Google Search Console: https://search.google.com/search-console
- Google Analytics: https://analytics.google.com

### Quick Fixes for Common Issues

#### High Traffic/Load Issues
1. Enable Vercel Edge caching
2. Optimize database queries
3. Implement Redis caching
4. Scale database tier

#### Email Delivery Problems
1. Check SMTP credentials
2. Verify DNS records
3. Check spam folder
4. Review email logs

#### Database Connection Issues
1. Check connection string
2. Verify firewall rules
3. Check connection pool settings
4. Review database logs

## Estimated Timeline

- **Day 1**: Security fixes, credential rotation
- **Day 2**: Database migration
- **Day 3**: Critical bug fixes, accessibility
- **Day 4**: Testing and optimization
- **Day 5**: Deployment and go-live

## Sign-Off Checklist

Before going live, confirm:

- [ ] CEO/Owner approval received
- [ ] All critical issues resolved
- [ ] Backup plan in place
- [ ] Team trained on admin dashboard
- [ ] Support procedures documented
- [ ] Legal/privacy policies updated
- [ ] Payment processing tested (if applicable)
- [ ] Customer communication plan ready

---

**Remember**: It's better to delay launch by a few days than to go live with critical issues. Take the time to do it right!

For questions or issues during deployment, reference:
- This checklist
- PRODUCTION_READINESS_AUDIT.md
- .env.production.example
- Your platform's documentation