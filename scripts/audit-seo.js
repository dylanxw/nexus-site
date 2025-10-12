const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');

// Routes to test for SEO
const ROUTES_TO_TEST = [
  { path: '/', name: 'Homepage' },
  { path: '/services', name: 'Services' },
  { path: '/services/iphone-repair', name: 'iPhone Repair' },
  { path: '/shop', name: 'Shop' },
  { path: '/sell-a-device', name: 'Sell Device' },
  { path: '/about', name: 'About' },
  { path: '/contact', name: 'Contact' },
  { path: '/services/computer-repair', name: 'Computer Repair' },
  { path: '/services/console-repair', name: 'Console Repair' }
];

async function auditSEO() {
  console.log('Starting SEO Audit...\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const results = [];
  const baseUrl = 'http://localhost:3000';

  for (const route of ROUTES_TO_TEST) {
    console.log(`Testing: ${route.name} (${route.path})`);

    try {
      await page.goto(`${baseUrl}${route.path}`, {
        waitUntil: 'networkidle',
        timeout: 30000
      });

      // Extract SEO data
      const seoData = await page.evaluate(() => {
        const getMetaContent = (name) => {
          const meta = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
          return meta ? meta.getAttribute('content') : null;
        };

        // Extract structured data
        const jsonLdScripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
        const structuredData = jsonLdScripts.map(script => {
          try {
            return JSON.parse(script.textContent);
          } catch {
            return null;
          }
        }).filter(Boolean);

        return {
          title: document.title,
          description: getMetaContent('description'),
          keywords: getMetaContent('keywords'),
          canonical: document.querySelector('link[rel="canonical"]')?.href,
          robots: getMetaContent('robots'),

          // Open Graph
          og: {
            title: getMetaContent('og:title'),
            description: getMetaContent('og:description'),
            image: getMetaContent('og:image'),
            url: getMetaContent('og:url'),
            type: getMetaContent('og:type'),
            siteName: getMetaContent('og:site_name')
          },

          // Twitter Card
          twitter: {
            card: getMetaContent('twitter:card'),
            title: getMetaContent('twitter:title'),
            description: getMetaContent('twitter:description'),
            image: getMetaContent('twitter:image'),
            creator: getMetaContent('twitter:creator')
          },

          // Structured Data
          structuredData,

          // Headings
          headings: {
            h1: Array.from(document.querySelectorAll('h1')).map(h => h.textContent.trim()),
            h1Count: document.querySelectorAll('h1').length,
            h2Count: document.querySelectorAll('h2').length,
            h3Count: document.querySelectorAll('h3').length
          },

          // Images
          images: {
            total: document.querySelectorAll('img').length,
            withoutAlt: document.querySelectorAll('img:not([alt])').length,
            withEmptyAlt: document.querySelectorAll('img[alt=""]').length
          },

          // Links
          links: {
            internal: document.querySelectorAll('a[href^="/"]').length,
            external: document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])').length,
            withoutText: document.querySelectorAll('a:empty').length
          },

          // Performance hints
          viewport: document.querySelector('meta[name="viewport"]')?.content,
          lang: document.documentElement.lang
        };
      });

      // Analyze issues
      const issues = [];

      // Title checks
      if (!seoData.title) {
        issues.push({ type: 'error', message: 'Missing page title' });
      } else if (seoData.title.length < 30) {
        issues.push({ type: 'warning', message: `Title too short (${seoData.title.length} chars, recommended: 30-60)` });
      } else if (seoData.title.length > 60) {
        issues.push({ type: 'warning', message: `Title too long (${seoData.title.length} chars, recommended: 30-60)` });
      }

      // Description checks
      if (!seoData.description) {
        issues.push({ type: 'error', message: 'Missing meta description' });
      } else if (seoData.description.length < 120) {
        issues.push({ type: 'warning', message: `Description too short (${seoData.description.length} chars, recommended: 120-160)` });
      } else if (seoData.description.length > 160) {
        issues.push({ type: 'warning', message: `Description too long (${seoData.description.length} chars, recommended: 120-160)` });
      }

      // H1 checks
      if (seoData.headings.h1Count === 0) {
        issues.push({ type: 'error', message: 'Missing H1 tag' });
      } else if (seoData.headings.h1Count > 1) {
        issues.push({ type: 'warning', message: `Multiple H1 tags found (${seoData.headings.h1Count})` });
      }

      // Image checks
      if (seoData.images.withoutAlt > 0) {
        issues.push({ type: 'error', message: `${seoData.images.withoutAlt} images missing alt text` });
      }

      // Open Graph checks
      if (!seoData.og.title) {
        issues.push({ type: 'warning', message: 'Missing Open Graph title' });
      }
      if (!seoData.og.description) {
        issues.push({ type: 'warning', message: 'Missing Open Graph description' });
      }
      if (!seoData.og.image) {
        issues.push({ type: 'warning', message: 'Missing Open Graph image' });
      }

      // Structured data checks
      if (seoData.structuredData.length === 0) {
        issues.push({ type: 'info', message: 'No structured data found' });
      }

      // Language check
      if (!seoData.lang) {
        issues.push({ type: 'error', message: 'Missing lang attribute on html element' });
      }

      // Viewport check
      if (!seoData.viewport) {
        issues.push({ type: 'error', message: 'Missing viewport meta tag' });
      }

      results.push({
        route: route.path,
        name: route.name,
        seoData,
        issues,
        score: calculateSEOScore(issues)
      });

      // Log summary
      const errors = issues.filter(i => i.type === 'error').length;
      const warnings = issues.filter(i => i.type === 'warning').length;

      if (errors > 0 || warnings > 0) {
        console.log(`  ⚠️ ${errors} errors, ${warnings} warnings`);
      } else {
        console.log(`  ✅ No major SEO issues`);
      }

    } catch (error) {
      console.log(`  ❌ Error testing route: ${error.message}`);
      results.push({
        route: route.path,
        name: route.name,
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
    results,
    summary: {
      averageScore: results.reduce((acc, r) => acc + (r.score || 0), 0) / results.length,
      totalErrors: results.reduce((acc, r) => acc + (r.issues?.filter(i => i.type === 'error').length || 0), 0),
      totalWarnings: results.reduce((acc, r) => acc + (r.issues?.filter(i => i.type === 'warning').length || 0), 0)
    }
  };

  // Save detailed report
  const reportPath = path.join(process.cwd(), 'audit-reports', 'seo-report.json');
  await fs.mkdir(path.dirname(reportPath), { recursive: true });
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2));

  // Generate summary
  console.log('\n=== SEO AUDIT SUMMARY ===');
  console.log(`Routes tested: ${ROUTES_TO_TEST.length}`);
  console.log(`Average SEO score: ${report.summary.averageScore.toFixed(1)}%`);
  console.log(`Total errors: ${report.summary.totalErrors}`);
  console.log(`Total warnings: ${report.summary.totalWarnings}`);

  console.log('\nTop Issues:');
  const allIssues = {};
  results.forEach(r => {
    if (r.issues) {
      r.issues.forEach(i => {
        const key = `${i.type}:${i.message}`;
        allIssues[key] = (allIssues[key] || 0) + 1;
      });
    }
  });

  Object.entries(allIssues)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .forEach(([issue, count]) => {
      const [type, message] = issue.split(':');
      const emoji = type === 'error' ? '❌' : type === 'warning' ? '⚠️' : 'ℹ️';
      console.log(`  ${emoji} ${message} (${count} pages)`);
    });

  console.log(`\nDetailed report saved to: ${reportPath}`);

  return report;
}

function calculateSEOScore(issues) {
  let score = 100;
  issues.forEach(issue => {
    if (issue.type === 'error') score -= 10;
    if (issue.type === 'warning') score -= 5;
  });
  return Math.max(0, score);
}

// Run if executed directly
if (require.main === module) {
  auditSEO().catch(console.error);
}

module.exports = { auditSEO };