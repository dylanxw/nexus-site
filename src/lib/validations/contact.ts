import { z } from 'zod';

/**
 * Sanitize user input to prevent XSS attacks
 * Removes HTML tags and potentially dangerous characters
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';

  // Remove HTML tags and trim whitespace
  return input
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[<>]/g, '') // Remove any remaining angle brackets
    .trim();
}

/**
 * Sanitize phone number - extract only digits
 */
export function sanitizePhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

/**
 * Valid inquiry types for contact form
 */
const VALID_INQUIRY_TYPES = [
  'schedule-repair',
  'buy-device',
  'sell-device',
  'warranty-claim',
  'job-opportunities',
  'other-inquiry',
] as const;

/**
 * Zod schema for contact form validation
 * Validates all fields with proper constraints and sanitization
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(
      /^[a-zA-Z\s'\-]+$/,
      'Name can only contain letters, spaces, hyphens, and apostrophes'
    )
    .transform(sanitizeInput),

  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email is too long')
    .toLowerCase()
    .transform(sanitizeInput),

  phone: z
    .string()
    .optional()
    .transform((val) => (val ? val : undefined))
    .refine(
      (val) => {
        if (!val) return true; // Phone is optional
        const digits = sanitizePhone(val);
        return digits.length === 10;
      },
      { message: 'Phone number must be 10 digits' }
    )
    .transform((val) => {
      if (!val) return undefined;
      const digits = sanitizePhone(val);
      if (digits.length === 10) {
        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
      }
      return val;
    }),

  inquiry: z.enum(VALID_INQUIRY_TYPES, {
    message: 'Please select a valid inquiry type',
  }),

  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be 1000 characters or less')
    .transform(sanitizeInput),
});

export type ContactFormInput = z.input<typeof contactFormSchema>;
export type ContactFormData = z.output<typeof contactFormSchema>;

/**
 * Validate and sanitize contact form data
 * Returns validated data or throws with detailed error messages
 */
export function validateContactForm(data: unknown): ContactFormData {
  return contactFormSchema.parse(data);
}

/**
 * Safe validation that returns result object instead of throwing
 */
export function validateContactFormSafe(data: unknown) {
  return contactFormSchema.safeParse(data);
}
