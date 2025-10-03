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
 * Device Quote Validation Schema
 */
export const quoteDeviceSchema = z.object({
  model: z.string().min(1, "Please select a device model"),
  storage: z.string().min(1, "Please select storage capacity"),
  network: z.string().min(1, "Please select network carrier"),
  condition: z.string().min(1, "Please select device condition"),
  offerPrice: z.number().positive("Offer price must be positive"),
  atlasPrice: z.number().positive("Atlas price must be positive"),
});

/**
 * Complete Quote Submission Schema
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
  model: z.string().min(1, "Model is required"),
  storage: z.string().min(1, "Storage is required"),
  network: z.string().min(1, "Network is required"),
  condition: z.enum(["Flawless", "Good", "Fair", "Broken", "No Power"], {
    errorMap: () => ({ message: "Invalid condition selected" }),
  }),
});

// Type exports for TypeScript
export type CustomerInfo = z.infer<typeof customerInfoSchema>;
export type QuoteDevice = z.infer<typeof quoteDeviceSchema>;
export type QuoteSubmission = z.infer<typeof quoteSubmissionSchema>;
export type PricingRequest = z.infer<typeof pricingRequestSchema>;
