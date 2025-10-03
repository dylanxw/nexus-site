/**
 * Utility functions for iPhone model handling
 */

/**
 * Convert iPhone model name to URL slug
 * @example "iPhone 17 Pro Max" -> "iphone-17-pro-max"
 */
export function modelToSlug(model: string): string {
  return model.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Convert URL slug back to model name
 * @example "iphone-17-pro-max" -> "iPhone 17 Pro Max"
 */
export function slugToModel(slug: string): string {
  return slug
    .split('-')
    .map((word) => {
      // Handle special cases
      if (word === 'iphone') return 'iPhone';
      if (word === 'xs' || word === 'xr') return word.toUpperCase();
      if (word === 'se') return word.toUpperCase();
      // Capitalize first letter for other words
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

/**
 * Get SEO metadata for iPhone model
 */
export function getModelSEO(model: string, maxPrice: number) {
  return {
    title: `Sell ${model} for Cash - Get Up to $${maxPrice} | Nexus Tech Solutions`,
    description: `Sell your ${model} for the best price. Get an instant quote up to $${maxPrice}. Free shipping, fast payment, and excellent customer service. Trade in your ${model} today!`,
    keywords: `sell ${model}, ${model} trade in, ${model} buyback, sell ${model.toLowerCase()} for cash, ${model} resale value`,
  };
}
