const { chromium } = require('playwright');
const { injectAxe, checkA11y, getViolations } = require('axe-playwright');
const fs = require('fs').promises;
const path = require('path');

// Routes to test for accessibility
const ROUTES_TO_TEST = [
  '/',
  '/services',
  '/services/iphone-repair',
  '/shop',
  '/sell-a-device',
  '/sell-a-device/iphone',
  '/denton-tx/repair-form',
  '/about',
  '/contact',
  '/login'
];

async function auditAccessibility() {
  console.log('Starting Accessibility Audit with axe-core...\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const results = [];
  const baseUrl = 'http://localhost:3000';

  for (const route of ROUTES_TO_TEST) {
    console.log(`Testing: ${route}`);

    try {
      await page.goto(`${baseUrl}${route}`, {
        waitUntil: 'networkidle',
        timeout: 30000
      });

      // Inject axe-core
      await injectAxe(page);

      // Run accessibility tests
      const violations = await getViolations(page, null, {
        detailedReport: true,
        detailedReportOptions: {
          html: true
        }
      });

      if (violations.length > 0) {
        results.push({
          route,
          violations: violations.map(v => ({
            id: v.id,
            impact: v.impact,
            description: v.description,
            help: v.help,
            helpUrl: v.helpUrl,
            nodes: v.nodes.length,
            tags: v.tags
          }))
        });

        console.log(`  ❌ Found ${violations.length} accessibility issues`);

        // Log critical and serious issues
        const critical = violations.filter(v => v.impact === 'critical');
        const serious = violations.filter(v => v.impact === 'serious');

        if (critical.length > 0) {
          console.log(`     🔴 Critical: ${critical.length}`);
        }
        if (serious.length > 0) {
          console.log(`     🟠 Serious: ${serious.length}`);
        }
      } else {
        console.log(`  ✅ No accessibility issues found`);
      }

    } catch (error) {
      console.log(`  ⚠️ Error testing route: ${error.message}`);
      results.push({
        route,
        error: error.message
      });
    }
  }

  await browser.close();

  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    baseUrl,
    routesTested: ROUTES_TO_TEST.length,
    totalIssues: results.reduce((acc, r) => acc + (r.violations?.length || 0), 0),
    results
  };

  // Save detailed report
  const reportPath = path.join(process.cwd(), 'audit-reports', 'accessibility-report.json');
  await fs.mkdir(path.dirname(reportPath), { recursive: true });
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2));

  // Generate summary
  console.log('\n=== ACCESSIBILITY AUDIT SUMMARY ===');
  console.log(`Total routes tested: ${ROUTES_TO_TEST.length}`);
  console.log(`Total issues found: ${report.totalIssues}`);

  // Group by impact
  const impactCounts = {};
  results.forEach(r => {
    if (r.violations) {
      r.violations.forEach(v => {
        impactCounts[v.impact] = (impactCounts[v.impact] || 0) + 1;
      });
    }
  });

  console.log('\nIssues by Impact:');
  Object.entries(impactCounts).forEach(([impact, count]) => {
    const emoji = {
      critical: '🔴',
      serious: '🟠',
      moderate: '🟡',
      minor: '🟢'
    }[impact] || '⚪';
    console.log(`  ${emoji} ${impact}: ${count}`);
  });

  console.log(`\nDetailed report saved to: ${reportPath}`);

  return report;
}

// Run if executed directly
if (require.main === module) {
  auditAccessibility().catch(console.error);
}

module.exports = { auditAccessibility };