const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');

// Script to analyze Next.js bundles
console.log('Bundle Analyzer Setup');
console.log('======================');
console.log('To analyze your bundle:');
console.log('1. Add to next.config.ts:');
console.log(`
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
`);
console.log('2. Run: ANALYZE=true npm run build');
console.log('');
console.log('For immediate analysis, we\'ll use source-map-explorer instead...');