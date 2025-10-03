// Dynamic margin tiers for calculating our offer based on Atlas prices
// These tiers ensure better profit margins on higher-value devices

interface MarginTier {
  min: number;
  max: number;
  deduction: number;
}

// Margin tiers - we deduct more for higher-priced items to maintain good profit
const MARGIN_TIERS: MarginTier[] = [
  { min: 0, max: 75, deduction: 25 },      // Very low value: $25 margin
  { min: 76, max: 140, deduction: 35 },    // Low value: $35 margin
  { min: 141, max: 225, deduction: 60 },   // Mid-low value: $60 margin
  { min: 226, max: 350, deduction: 85 },   // Mid value: $85 margin
  { min: 351, max: 500, deduction: 120 },  // Mid-high value: $120 margin
  { min: 501, max: 700, deduction: 160 },  // High value: $160 margin
  { min: 701, max: 900, deduction: 200 },  // Very high value: $200 margin
  { min: 901, max: 1200, deduction: 250 }, // Premium: $250 margin
  { min: 1201, max: Infinity, deduction: 300 }, // Ultra-premium: $300 margin
];

// Map customer-friendly conditions to Atlas grades
export const CONDITION_GRADE_MAP = {
  'Flawless': 'priceGradeA',
  'Good': 'priceGradeB',      // Maps to Grade B
  'Fair': 'priceGradeC',       // Maps to Grade C
  'Broken': 'priceGradeD',     // Maps to Grade D
  'No Power': 'priceDOA',      // Maps to DOA
} as const;

export type CustomerCondition = keyof typeof CONDITION_GRADE_MAP;
export type AtlasGrade = typeof CONDITION_GRADE_MAP[CustomerCondition];

/**
 * Calculate our offer price based on Atlas price and dynamic margin tiers
 * @param atlasPrice The price from Atlas Mobile
 * @returns Our offer price after applying the appropriate margin
 */
export function calculateOfferPrice(atlasPrice: number): number {
  // Find the appropriate margin tier
  const tier = MARGIN_TIERS.find(t => atlasPrice >= t.min && atlasPrice <= t.max);

  if (!tier) {
    // Fallback to highest tier if somehow not found
    const highestTier = MARGIN_TIERS[MARGIN_TIERS.length - 1];
    return Math.max(0, atlasPrice - highestTier.deduction);
  }

  // Calculate offer price
  const offerPrice = atlasPrice - tier.deduction;

  // Never offer negative prices
  return Math.max(0, offerPrice);
}

/**
 * Calculate profit margin percentage
 * @param atlasPrice The original Atlas price
 * @param offerPrice Our offer price
 * @returns Profit margin as a percentage
 */
export function calculateMarginPercentage(atlasPrice: number, offerPrice: number): number {
  if (atlasPrice === 0) return 0;
  const margin = ((atlasPrice - offerPrice) / atlasPrice) * 100;
  return Math.round(margin * 10) / 10; // Round to 1 decimal place
}

/**
 * Format price for display
 * @param price The price to format
 * @returns Formatted price string
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Generate a unique quote number
 * @returns A unique quote number
 */
export function generateQuoteNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `Q-${timestamp}-${random}`;
}

/**
 * Get quote expiration date (2 weeks from now)
 * @returns Date object for 2 weeks from now
 */
export function getQuoteExpirationDate(): Date {
  const date = new Date();
  date.setDate(date.getDate() + 14); // Add 14 days
  return date;
}

/**
 * Check if a quote has expired
 * @param expirationDate The expiration date to check
 * @returns Boolean indicating if the quote has expired
 */
export function isQuoteExpired(expirationDate: Date): boolean {
  return new Date() > new Date(expirationDate);
}

/**
 * Get days remaining until quote expires
 * @param expirationDate The expiration date
 * @returns Number of days remaining (negative if expired)
 */
export function getDaysUntilExpiration(expirationDate: Date): number {
  const now = new Date();
  const expiry = new Date(expirationDate);
  const diffTime = expiry.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// Device models for iPhones
export const IPHONE_MODELS = [
  // iPhone 17 Series
  { model: 'iPhone 17 Pro Max', storage: ['256GB', '512GB', '1TB', '2TB'] },
  { model: 'iPhone 17 Pro', storage: ['256GB', '512GB', '1TB'] },
  { model: 'iPhone 17 Air', storage: ['256GB', '512GB', '1TB'] },
  { model: 'iPhone 17', storage: ['256GB', '512GB'] },

  // iPhone 16 Series
  { model: 'iPhone 16 Pro Max', storage: ['256GB', '512GB', '1TB'] },
  { model: 'iPhone 16 Pro', storage: ['128GB', '256GB', '512GB', '1TB'] },
  { model: 'iPhone 16 Plus', storage: ['128GB', '256GB', '512GB'] },
  { model: 'iPhone 16', storage: ['128GB', '256GB', '512GB'] },
  { model: 'iPhone 16E', storage: ['128GB', '256GB', '512GB'] },

  // iPhone 15 Series
  { model: 'iPhone 15 Pro Max', storage: ['256GB', '512GB', '1TB'] },
  { model: 'iPhone 15 Pro', storage: ['128GB', '256GB', '512GB', '1TB'] },
  { model: 'iPhone 15 Plus', storage: ['128GB', '256GB', '512GB'] },
  { model: 'iPhone 15', storage: ['128GB', '256GB', '512GB'] },

  // iPhone 14 Series
  { model: 'iPhone 14 Pro Max', storage: ['128GB', '256GB', '512GB', '1TB'] },
  { model: 'iPhone 14 Pro', storage: ['128GB', '256GB', '512GB', '1TB'] },
  { model: 'iPhone 14 Plus', storage: ['128GB', '256GB', '512GB'] },
  { model: 'iPhone 14', storage: ['128GB', '256GB', '512GB'] },

  // iPhone 13 Series
  { model: 'iPhone 13 Pro Max', storage: ['128GB', '256GB', '512GB', '1TB'] },
  { model: 'iPhone 13 Pro', storage: ['128GB', '256GB', '512GB', '1TB'] },
  { model: 'iPhone 13', storage: ['128GB', '256GB', '512GB'] },
  { model: 'iPhone 13 Mini', storage: ['128GB', '256GB', '512GB'] },

  // iPhone 12 Series
  { model: 'iPhone 12 Pro Max', storage: ['128GB', '256GB', '512GB'] },
  { model: 'iPhone 12 Pro', storage: ['128GB', '256GB', '512GB'] },
  { model: 'iPhone 12', storage: ['64GB', '128GB', '256GB'] },
  { model: 'iPhone 12 Mini', storage: ['64GB', '128GB', '256GB'] },

  // iPhone 11 Series
  { model: 'iPhone 11 Pro Max', storage: ['64GB', '256GB', '512GB'] },
  { model: 'iPhone 11 Pro', storage: ['64GB', '256GB', '512GB'] },
  { model: 'iPhone 11', storage: ['64GB', '128GB', '256GB'] },

  // iPhone X Series
  { model: 'iPhone XS Max', storage: ['64GB', '256GB', '512GB'] },
  { model: 'iPhone XS', storage: ['64GB', '256GB', '512GB'] },
  { model: 'iPhone XR', storage: ['64GB', '128GB', '256GB'] },
  { model: 'iPhone X', storage: ['64GB', '256GB'] },

  // iPhone 8 Series
  { model: 'iPhone 8 Plus', storage: ['64GB', '128GB', '256GB'] },
  { model: 'iPhone 8', storage: ['64GB', '128GB', '256GB'] },

  // iPhone 7 Series
  { model: 'iPhone 7 Plus', storage: ['32GB', '128GB', '256GB'] },
  { model: 'iPhone 7', storage: ['32GB', '128GB', '256GB'] },
];

// Network carriers - User-facing options
// Note: All non-Unlocked options map to "Carrier Locked" pricing in the backend
export const NETWORK_CARRIERS = [
  { value: 'Unlocked', label: 'Unlocked' },
  { value: 'Verizon', label: 'Verizon' },
  { value: 'AT&T', label: 'AT&T' },
  { value: 'T-Mobile', label: 'T-Mobile' },
  { value: 'US Cellular', label: 'US Cellular' },
  { value: 'Other', label: 'Other Carrier' },
];

// Device conditions with descriptions
export const DEVICE_CONDITIONS = [
  {
    value: 'Flawless',
    label: 'Flawless',
    description: 'Device shows light signs of wear. Contains few light scratches or marks. Absolutely no cracks or chips on the device. No screen burn, white dots, or other pixel damage. Software is not modified or rooted. Device is fully functional.',
    grade: 'A',
  },
  {
    value: 'Good',
    label: 'Good',
    description: 'Device shows moderate signs of wear. May have several light scratches and marks. No cracks or deep scratches. Screen is fully functional without major defects. All features working properly.',
    grade: 'B',
  },
  {
    value: 'Fair',
    label: 'Fair',
    description: 'Device shows heavy signs of wear. May have deep scratches, dents, or other cosmetic damage. Screen may have minor cracks that don\'t affect functionality. All core features still work.',
    grade: 'C',
  },
  {
    value: 'Broken',
    label: 'Broken',
    description: 'Device has significant damage. Cracked screen, broken buttons, or other major issues. Device still powers on but may have limited functionality.',
    grade: 'D',
  },
  {
    value: 'No Power',
    label: 'No Power',
    description: 'Device does not turn on or respond to charging. May have water damage or other critical issues. Sold for parts only.',
    grade: 'DOA',
  },
];