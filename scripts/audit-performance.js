const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');

// Routes to test for performance
const ROUTES_TO_TEST = [
  { path: '/', name: 'Homepage' },
  { path: '/shop', name: 'Shop' },
  { path: '/sell-a-device', name: 'Sell Device' },
  { path: '/sell-a-device/iphone', name: 'iPhone Selection' },
  { path: '/denton-tx/repair-form', name: 'Repair Form' },
  { path: '/services/iphone-repair', name: 'iPhone Repair' }
];

// Performance budgets (in milliseconds)
const PERFORMANCE_BUDGETS = {
  FCP: 1800,    // First Contentful Paint
  LCP: 2500,    // Largest Contentful Paint
  TTI: 3800,    // Time to Interactive
  TBT: 200,     // Total Blocking Time
  CLS: 0.1,     // Cumulative Layout Shift
  INP: 200      // Interaction to Next Paint
};

async function auditPerformance() {
  console.log('Starting Performance Audit...\n');

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox']
  });

  const results = [];
  const baseUrl = 'http://localhost:3000';

  for (const route of ROUTES_TO_TEST) {
    console.log(`Testing: ${route.name} (${route.path})`);

    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 }
    });

    const page = await context.newPage();

    try {
      // Enable CDP for performance metrics
      const client = await page.context().newCDPSession(page);
      await client.send('Performance.enable');

      // Navigate and measure
      const startTime = Date.now();

      await page.goto(`${baseUrl}${route.path}`, {
        waitUntil: 'networkidle',
        timeout: 30000
      });

      const loadTime = Date.now() - startTime;

      // Get performance metrics
      const performanceMetrics = await client.send('Performance.getMetrics');
      const metrics = {};
      performanceMetrics.metrics.forEach(m => {
        metrics[m.name] = m.value;
      });

      // Get Web Vitals using JavaScript
      const webVitals = await page.evaluate(() => {
        return new Promise((resolve) => {
          const vitals = {
            FCP: null,
            LCP: null,
            CLS: 0,
            TTI: null,
            TBT: null
          };

          // Observe FCP
          new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (entry.name === 'first-contentful-paint') {
                vitals.FCP = entry.startTime;
              }
            }
          }).observe({ entryTypes: ['paint'] });

          // Observe LCP
          new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            vitals.LCP = lastEntry.startTime;
          }).observe({ entryTypes: ['largest-contentful-paint'] });

          // Observe CLS
          let clsValue = 0;
          new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
                vitals.CLS = clsValue;
              }
            }
          }).observe({ entryTypes: ['layout-shift'] });

          // Wait and resolve
          setTimeout(() => {
            // Get navigation timing
            const navTiming = performance.getEntriesByType('navigation')[0];
            if (navTiming) {
              vitals.TTI = navTiming.domInteractive;
              vitals.TBT = navTiming.loadEventEnd - navTiming.responseEnd;
            }

            resolve(vitals);
          }, 3000);
        });
      });

      // Get resource sizes
      const resources = await page.evaluate(() => {
        const resources = performance.getEntriesByType('resource');
        const summary = {
          totalRequests: resources.length,
          totalSize: 0,
          byType: {}
        };

        resources.forEach(r => {
          const type = r.initiatorType || 'other';
          if (!summary.byType[type]) {
            summary.byType[type] = { count: 0, size: 0 };
          }
          summary.byType[type].count++;
          summary.byType[type].size += r.transferSize || 0;
          summary.totalSize += r.transferSize || 0;
        });

        return summary;
      });

      // Check against budgets
      const budgetViolations = [];
      if (webVitals.FCP && webVitals.FCP > PERFORMANCE_BUDGETS.FCP) {
        budgetViolations.push(`FCP: ${webVitals.FCP.toFixed(0)}ms (budget: ${PERFORMANCE_BUDGETS.FCP}ms)`);
      }
      if (webVitals.LCP && webVitals.LCP > PERFORMANCE_BUDGETS.LCP) {
        budgetViolations.push(`LCP: ${webVitals.LCP.toFixed(0)}ms (budget: ${PERFORMANCE_BUDGETS.LCP}ms)`);
      }
      if (webVitals.CLS > PERFORMANCE_BUDGETS.CLS) {
        budgetViolations.push(`CLS: ${webVitals.CLS.toFixed(3)} (budget: ${PERFORMANCE_BUDGETS.CLS})`);
      }

      // Take screenshot
      const screenshotPath = path.join(process.cwd(), 'audit-reports', 'screenshots', `${route.name.replace(/\s+/g, '-').toLowerCase()}.png`);
      await fs.mkdir(path.dirname(screenshotPath), { recursive: true });
      await page.screenshot({ path: screenshotPath, fullPage: false });

      results.push({
        route: route.path,
        name: route.name,
        loadTime,
        webVitals,
        resources,
        budgetViolations,
        metrics: {
          domContentLoaded: metrics.DomContentLoaded,
          timestamp: metrics.Timestamp
        },
        screenshotPath
      });

      // Log results
      if (budgetViolations.length > 0) {
        console.log(`  ⚠️ Budget violations: ${budgetViolations.length}`);
        budgetViolations.forEach(v => console.log(`     - ${v}`));
      } else {
        console.log(`  ✅ All performance budgets met`);
      }

      console.log(`     Load time: ${loadTime}ms`);
      if (webVitals.LCP) console.log(`     LCP: ${webVitals.LCP.toFixed(0)}ms`);
      if (webVitals.FCP) console.log(`     FCP: ${webVitals.FCP.toFixed(0)}ms`);
      console.log(`     CLS: ${webVitals.CLS.toFixed(3)}`);

    } catch (error) {
      console.log(`  ❌ Error testing route: ${error.message}`);
      results.push({
        route: route.path,
        name: route.name,
        error: error.message
      });
    } finally {
      await context.close();
    }
  }

  await browser.close();

  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    baseUrl,
    performanceBudgets: PERFORMANCE_BUDGETS,
    routesTested: ROUTES_TO_TEST.length,
    results,
    summary: {
      averageLoadTime: results.reduce((acc, r) => acc + (r.loadTime || 0), 0) / results.length,
      averageLCP: results.reduce((acc, r) => acc + (r.webVitals?.LCP || 0), 0) / results.length,
      averageFCP: results.reduce((acc, r) => acc + (r.webVitals?.FCP || 0), 0) / results.length,
      averageCLS: results.reduce((acc, r) => acc + (r.webVitals?.CLS || 0), 0) / results.length,
      totalBudgetViolations: results.reduce((acc, r) => acc + (r.budgetViolations?.length || 0), 0)
    }
  };

  // Save detailed report
  const reportPath = path.join(process.cwd(), 'audit-reports', 'performance-report.json');
  await fs.mkdir(path.dirname(reportPath), { recursive: true });
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2));

  // Generate summary
  console.log('\n=== PERFORMANCE AUDIT SUMMARY ===');
  console.log(`Routes tested: ${ROUTES_TO_TEST.length}`);
  console.log(`Average load time: ${report.summary.averageLoadTime.toFixed(0)}ms`);
  console.log(`Average LCP: ${report.summary.averageLCP.toFixed(0)}ms`);
  console.log(`Average FCP: ${report.summary.averageFCP.toFixed(0)}ms`);
  console.log(`Average CLS: ${report.summary.averageCLS.toFixed(3)}`);
  console.log(`Total budget violations: ${report.summary.totalBudgetViolations}`);

  console.log('\nPerformance Budgets:');
  Object.entries(PERFORMANCE_BUDGETS).forEach(([metric, budget]) => {
    const unit = metric === 'CLS' ? '' : 'ms';
    console.log(`  ${metric}: ${budget}${unit}`);
  });

  console.log(`\nDetailed report saved to: ${reportPath}`);
  console.log(`Screenshots saved to: audit-reports/screenshots/`);

  return report;
}

// Run if executed directly
if (require.main === module) {
  auditPerformance().catch(console.error);
}

module.exports = { auditPerformance };