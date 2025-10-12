const fs = require('fs').promises;
const path = require('path');
const { chromium } = require('playwright');

// Security checks to perform
const SECURITY_CHECKS = {
  headers: [
    'X-Frame-Options',
    'X-Content-Type-Options',
    'X-XSS-Protection',
    'Strict-Transport-Security',
    'Content-Security-Policy',
    'Referrer-Policy',
    'Permissions-Policy'
  ],
  cookies: {
    secure: true,
    httpOnly: true,
    sameSite: ['Strict', 'Lax']
  }
};

async function auditSecurity() {
  console.log('Starting Security Audit...\n');

  const results = {
    timestamp: new Date().toISOString(),
    checks: [],
    vulnerabilities: [],
    recommendations: []
  };

  // 1. Check dependencies for vulnerabilities
  console.log('1. Checking npm vulnerabilities...');
  try {
    const { execSync } = require('child_process');
    const auditOutput = execSync('npm audit --json', { encoding: 'utf8' });
    const auditData = JSON.parse(auditOutput);

    results.npmAudit = {
      vulnerabilities: auditData.metadata.vulnerabilities,
      advisories: Object.values(auditData.advisories || {}).map(a => ({
        module: a.module_name,
        severity: a.severity,
        title: a.title,
        url: a.url,
        recommendation: a.recommendation
      }))
    };

    if (auditData.metadata.vulnerabilities.total > 0) {
      console.log(`  ⚠️ Found ${auditData.metadata.vulnerabilities.total} vulnerabilities`);
      console.log(`     Critical: ${auditData.metadata.vulnerabilities.critical}`);
      console.log(`     High: ${auditData.metadata.vulnerabilities.high}`);
      console.log(`     Moderate: ${auditData.metadata.vulnerabilities.moderate}`);
      console.log(`     Low: ${auditData.metadata.vulnerabilities.low}`);

      results.vulnerabilities.push({
        type: 'dependencies',
        count: auditData.metadata.vulnerabilities.total,
        details: auditData.metadata.vulnerabilities
      });
    } else {
      console.log('  ✅ No npm vulnerabilities found');
    }
  } catch (error) {
    console.log(`  ❌ Error running npm audit: ${error.message}`);
  }

  // 2. Check file permissions and sensitive files
  console.log('\n2. Checking for sensitive files...');
  const sensitivePatterns = [
    '.env.local',
    '.env.production',
    'credentials.json',
    'serviceAccountKey.json',
    '.pem',
    '.key',
    'id_rsa'
  ];

  const foundSensitive = [];
  for (const pattern of sensitivePatterns) {
    try {
      const files = await findFiles('.', pattern);
      if (files.length > 0) {
        foundSensitive.push(...files);
      }
    } catch (e) {
      // File not found is OK
    }
  }

  if (foundSensitive.length > 0) {
    console.log(`  ⚠️ Found ${foundSensitive.length} potentially sensitive files`);
    results.vulnerabilities.push({
      type: 'sensitive_files',
      files: foundSensitive
    });
  } else {
    console.log('  ✅ No exposed sensitive files found');
  }

  // 3. Check TypeScript strict mode
  console.log('\n3. Checking TypeScript configuration...');
  try {
    const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
    const tsconfig = JSON.parse(await fs.readFile(tsconfigPath, 'utf8'));

    const strictChecks = {
      strict: tsconfig.compilerOptions?.strict,
      noImplicitAny: tsconfig.compilerOptions?.noImplicitAny,
      strictNullChecks: tsconfig.compilerOptions?.strictNullChecks,
      strictFunctionTypes: tsconfig.compilerOptions?.strictFunctionTypes,
      strictBindCallApply: tsconfig.compilerOptions?.strictBindCallApply,
      strictPropertyInitialization: tsconfig.compilerOptions?.strictPropertyInitialization,
      noImplicitThis: tsconfig.compilerOptions?.noImplicitThis,
      alwaysStrict: tsconfig.compilerOptions?.alwaysStrict
    };

    results.typescript = strictChecks;

    if (strictChecks.strict === true) {
      console.log('  ✅ TypeScript strict mode enabled');
    } else {
      console.log('  ⚠️ TypeScript strict mode not fully enabled');
      results.recommendations.push({
        type: 'typescript',
        message: 'Enable TypeScript strict mode for better type safety',
        priority: 'high'
      });
    }
  } catch (error) {
    console.log(`  ❌ Error reading tsconfig.json: ${error.message}`);
  }

  // 4. Check security headers (requires running server)
  console.log('\n4. Checking security headers...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    const response = await page.goto('http://localhost:3000', {
      waitUntil: 'domcontentloaded',
      timeout: 10000
    });

    const headers = response.headers();
    const missingHeaders = [];

    for (const header of SECURITY_CHECKS.headers) {
      const headerKey = header.toLowerCase();
      if (!headers[headerKey]) {
        missingHeaders.push(header);
      }
    }

    results.headers = {
      present: SECURITY_CHECKS.headers.filter(h => headers[h.toLowerCase()]),
      missing: missingHeaders
    };

    if (missingHeaders.length > 0) {
      console.log(`  ⚠️ Missing ${missingHeaders.length} security headers:`);
      missingHeaders.forEach(h => console.log(`     - ${h}`));

      results.recommendations.push({
        type: 'headers',
        message: 'Add missing security headers using middleware or next.config.js',
        headers: missingHeaders,
        priority: 'high'
      });
    } else {
      console.log('  ✅ All security headers present');
    }

    // Check cookies
    const cookies = await context.cookies();
    const insecureCookies = cookies.filter(c => {
      return !c.secure || !c.httpOnly || !['Strict', 'Lax'].includes(c.sameSite);
    });

    if (insecureCookies.length > 0) {
      console.log(`  ⚠️ Found ${insecureCookies.length} insecure cookies`);
      results.vulnerabilities.push({
        type: 'cookies',
        count: insecureCookies.length,
        cookies: insecureCookies.map(c => c.name)
      });
    }

  } catch (error) {
    console.log(`  ⚠️ Could not test headers (server may not be running): ${error.message}`);
  } finally {
    await browser.close();
  }

  // 5. Check API rate limiting
  console.log('\n5. Checking rate limiting implementation...');
  const rateLimitFiles = [
    'src/lib/rate-limit.ts',
    'src/lib/rate-limit-production.ts',
    'src/middleware.ts'
  ];

  let hasRateLimit = false;
  for (const file of rateLimitFiles) {
    try {
      const content = await fs.readFile(path.join(process.cwd(), file), 'utf8');
      if (content.includes('rateLimit') || content.includes('RateLimit')) {
        hasRateLimit = true;
        break;
      }
    } catch (e) {
      // File might not exist
    }
  }

  if (hasRateLimit) {
    console.log('  ✅ Rate limiting implementation found');
  } else {
    console.log('  ⚠️ No rate limiting implementation found');
    results.recommendations.push({
      type: 'rate_limiting',
      message: 'Implement rate limiting for API endpoints',
      priority: 'high'
    });
  }

  // 6. Check authentication implementation
  console.log('\n6. Checking authentication...');
  const authChecks = {
    hasJWT: false,
    hasBcrypt: false,
    has2FA: false,
    hasCSRF: false
  };

  try {
    const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'));

    if (packageJson.dependencies?.jose || packageJson.dependencies?.jsonwebtoken) {
      authChecks.hasJWT = true;
    }
    if (packageJson.dependencies?.bcryptjs || packageJson.dependencies?.bcrypt) {
      authChecks.hasBcrypt = true;
    }
    if (packageJson.dependencies?.speakeasy || packageJson.dependencies?.['@otplib/preset-default']) {
      authChecks.has2FA = true;
    }

    // Check for CSRF implementation
    try {
      const csrfFile = await fs.readFile(path.join(process.cwd(), 'src/lib/csrf.ts'), 'utf8');
      if (csrfFile) authChecks.hasCSRF = true;
    } catch (e) {
      // CSRF file might not exist
    }

    results.authentication = authChecks;

    console.log(`  ${authChecks.hasJWT ? '✅' : '❌'} JWT authentication`);
    console.log(`  ${authChecks.hasBcrypt ? '✅' : '❌'} Password hashing`);
    console.log(`  ${authChecks.has2FA ? '✅' : '⚠️'} Two-factor authentication`);
    console.log(`  ${authChecks.hasCSRF ? '✅' : '⚠️'} CSRF protection`);

  } catch (error) {
    console.log(`  ❌ Error checking authentication: ${error.message}`);
  }

  // 7. Check input validation
  console.log('\n7. Checking input validation...');
  const hasZod = await checkPackage('zod');
  const hasJoi = await checkPackage('joi');
  const hasValidator = await checkPackage('validator');

  results.validation = {
    zod: hasZod,
    joi: hasJoi,
    validator: hasValidator
  };

  if (hasZod || hasJoi || hasValidator) {
    console.log('  ✅ Input validation library found');
  } else {
    console.log('  ⚠️ No input validation library found');
    results.recommendations.push({
      type: 'validation',
      message: 'Implement input validation using Zod or similar library',
      priority: 'high'
    });
  }

  // Generate summary
  console.log('\n=== SECURITY AUDIT SUMMARY ===');
  console.log(`Total vulnerabilities: ${results.vulnerabilities.length}`);
  console.log(`Total recommendations: ${results.recommendations.length}`);

  if (results.npmAudit?.vulnerabilities?.total > 0) {
    console.log('\nNPM Vulnerabilities:');
    console.log(`  Critical: ${results.npmAudit.vulnerabilities.critical}`);
    console.log(`  High: ${results.npmAudit.vulnerabilities.high}`);
    console.log(`  Moderate: ${results.npmAudit.vulnerabilities.moderate}`);
    console.log(`  Low: ${results.npmAudit.vulnerabilities.low}`);
  }

  if (results.recommendations.length > 0) {
    console.log('\nTop Recommendations:');
    results.recommendations
      .filter(r => r.priority === 'high')
      .slice(0, 5)
      .forEach(r => {
        console.log(`  🔸 ${r.message}`);
      });
  }

  // Save report
  const reportPath = path.join(process.cwd(), 'audit-reports', 'security-report.json');
  await fs.mkdir(path.dirname(reportPath), { recursive: true });
  await fs.writeFile(reportPath, JSON.stringify(results, null, 2));
  console.log(`\nDetailed report saved to: ${reportPath}`);

  return results;
}

// Helper functions
async function findFiles(dir, pattern) {
  const files = [];
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name.startsWith('.git')) continue;
      if (entry.name === 'node_modules') continue;

      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...await findFiles(fullPath, pattern));
      } else if (entry.name.includes(pattern)) {
        files.push(fullPath);
      }
    }
  } catch (e) {
    // Directory not accessible
  }
  return files;
}

async function checkPackage(packageName) {
  try {
    const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'));
    return !!(packageJson.dependencies?.[packageName] || packageJson.devDependencies?.[packageName]);
  } catch {
    return false;
  }
}

// Run if executed directly
if (require.main === module) {
  auditSecurity().catch(console.error);
}

module.exports = { auditSecurity };