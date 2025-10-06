import { z } from "zod";

/**
 * Customer Information Validation Schema
 */
export const customerInfoSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),

  email: z
    .string()
    .email("Please enter a valid email address")
    .toLowerCase()
    .trim(),

  phone: z
    .string()
    .regex(
      /^(\+1[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/,
      "Please enter a valid phone number (e.g., 940-600-1012 or (940) 600-1012)"
    )
    .transform((val) => {
      // Normalize phone number to xxx-xxx-xxxx format
      const digits = val.replace(/\D/g, '');
      if (digits.length === 10) {
        return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
      }
      if (digits.length === 11 && digits[0] === '1') {
        return `${digits.slice(1, 4)}-${digits.slice(4, 7)}-${digits.slice(7)}`;
      }
      return val;
    }),
});

/**
 * Valid storage options for iPhones
 */
const VALID_STORAGE = ["32GB", "64GB", "128GB", "256GB", "512GB", "1TB", "2TB"] as const;

/**
 * Valid network carriers
 */
const VALID_NETWORKS = ["Unlocked", "Carrier Locked", "AT&T", "T-Mobile", "Verizon"] as const;

/**
 * Valid device conditions
 */
const VALID_CONDITIONS = ["Flawless", "Good", "Fair", "Broken", "No Power"] as const;

/**
 * Device Quote Validation Schema
 * NOTE: Prices are calculated SERVER-SIDE only for security
 * Client should NEVER provide prices
 */
export const quoteDeviceSchema = z.object({
  model: z.string()
    .min(1, "Please select a device model")
    .max(100, "Invalid model name")
    .regex(/^iPhone\s+[\w\s()]+$/, "Invalid model format"),

  storage: z.enum(VALID_STORAGE, {
    message: "Invalid storage capacity selected",
  }),

  network: z.enum(VALID_NETWORKS, {
    message: "Invalid network carrier selected",
  }),

  condition: z.enum(VALID_CONDITIONS, {
    message: "Invalid device condition selected",
  }),
});

/**
 * Complete Quote Submission Schema
 * Prices are calculated server-side for security
 */
export const quoteSubmissionSchema = customerInfoSchema.merge(quoteDeviceSchema);

/**
 * Quote Request by Number Schema (for retrieval)
 */
export const quoteNumberSchema = z.object({
  quoteNumber: z
    .string()
    .regex(/^Q-[A-Z0-9]+-[A-Z0-9]+$/, "Invalid quote number format"),
});

/**
 * Pricing Request Schema
 */
export const pricingRequestSchema = z.object({
  model: z.string()
    .min(1, "Model is required")
    .max(100, "Invalid model name")
    .regex(/^iPhone\s+[\w\s()]+$/, "Invalid model format"),

  storage: z.enum(VALID_STORAGE, {
    message: "Invalid storage capacity",
  }),

  network: z.enum(VALID_NETWORKS, {
    message: "Invalid network carrier",
  }),

  condition: z.enum(VALID_CONDITIONS, {
    message: "Invalid condition selected",
  }),
});

// Type exports for TypeScript
export type CustomerInfo = z.infer<typeof customerInfoSchema>;
export type QuoteDevice = z.infer<typeof quoteDeviceSchema>;
export type QuoteSubmission = z.infer<typeof quoteSubmissionSchema>;
export type PricingRequest = z.infer<typeof pricingRequestSchema>;
