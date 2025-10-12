import { z } from 'zod';
import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitize user input to prevent XSS attacks
 * Removes all HTML tags and keeps only text content
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';

  // Remove all HTML tags, keeping only text content
  const cleaned = DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // No HTML tags allowed
    KEEP_CONTENT: true, // Keep the text content
  });

  return cleaned.trim();
}

/**
 * Sanitize phone number - extract only digits
 */
export function sanitizePhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

/**
 * Zod schema for repair request validation
 * Validates all fields with proper constraints
 */
export const repairRequestSchema = z.object({
  deviceType: z.string()
    .min(1, 'Device type is required')
    .max(100, 'Device type is too long')
    .transform(sanitizeInput),

  make: z.string()
    .min(1, 'Make/Brand is required')
    .max(100, 'Make/Brand is too long')
    .transform(sanitizeInput),

  model: z.string()
    .min(1, 'Model is required')
    .max(100, 'Model is too long')
    .transform(sanitizeInput),

  issues: z.array(z.string())
    .min(1, 'At least one issue must be selected')
    .max(10, 'Too many issues selected'),

  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name is too long')
    .regex(/^[a-zA-Z\s'\-]+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes')
    .transform(sanitizeInput),

  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name is too long')
    .regex(/^[a-zA-Z\s'\-]+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes')
    .transform(sanitizeInput),

  phone: z.string()
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/, 'Phone number must be in format (555) 555-5555')
    .transform(sanitizePhone)
    .refine((val) => val.length === 10, 'Phone number must be exactly 10 digits'),

  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email is too long')
    .toLowerCase()
    .transform(sanitizeInput),

  description: z.string()
    .max(300, 'Description must be 300 characters or less')
    .optional()
    .transform((val) => val ? sanitizeInput(val) : ''),

  appointmentDate: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format')
    .optional()
    .refine((date) => {
      if (!date) return true;
      const selectedDate = new Date(date + 'T00:00:00');
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }, 'Cannot book appointments in the past'),

  appointmentTime: z.string()
    .regex(/^\d{2}:\d{2}$/, 'Invalid time format')
    .optional(),

  requestType: z.enum(['quote', 'appointment']),
}).refine(
  (data) => {
    // If appointment type, date and time are required
    if (data.requestType === 'appointment') {
      return !!(data.appointmentDate && data.appointmentTime);
    }
    return true;
  },
  {
    message: 'Appointment date and time are required for appointment bookings',
    path: ['appointmentDate'],
  }
);

export type RepairRequestInput = z.input<typeof repairRequestSchema>;
export type RepairRequestData = z.output<typeof repairRequestSchema>;

/**
 * Validate and sanitize repair request data
 * Returns validated data or throws with detailed error messages
 */
export function validateRepairRequest(data: unknown): RepairRequestData {
  return repairRequestSchema.parse(data);
}

/**
 * Safe validation that returns result object instead of throwing
 */
export function validateRepairRequestSafe(data: unknown) {
  return repairRequestSchema.safeParse(data);
}
