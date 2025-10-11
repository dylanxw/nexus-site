import { siteConfig } from "@/config/site";

export interface TimeSlot {
  time: string; // "10:00 AM"
  value: string; // "10:00"
}

export interface StoreHours {
  open: string; // "10:00"
  close: string; // "19:00"
  isOpen: boolean;
}

/**
 * Parse store hours for a given date
 */
export function getStoreHours(date: Date): StoreHours {
  const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.

  const dayMap: Record<number, keyof typeof siteConfig.hours> = {
    0: 'sunday',
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: 'saturday',
  };

  const dayKey = dayMap[dayOfWeek];
  const hoursString = siteConfig.hours[dayKey];

  // Check if closed
  if (hoursString === 'Closed' || hoursString.toLowerCase().includes('closed')) {
    return {
      open: '',
      close: '',
      isOpen: false,
    };
  }

  // Parse hours like "10:00 AM - 7:00 PM"
  const match = hoursString.match(/(\d{1,2}):(\d{2})\s*(AM|PM)\s*-\s*(\d{1,2}):(\d{2})\s*(AM|PM)/i);

  if (!match) {
    console.error(`Failed to parse hours string: ${hoursString}`);
    return {
      open: '',
      close: '',
      isOpen: false,
    };
  }

  const [, openHour, openMin, openPeriod, closeHour, closeMin, closePeriod] = match;

  const open = convertTo24Hour(parseInt(openHour), parseInt(openMin), openPeriod);
  const close = convertTo24Hour(parseInt(closeHour), parseInt(closeMin), closePeriod);

  return {
    open,
    close,
    isOpen: true,
  };
}

/**
 * Convert 12-hour time to 24-hour format
 */
function convertTo24Hour(hour: number, minute: number, period: string): string {
  let hour24 = hour;

  if (period.toUpperCase() === 'PM' && hour !== 12) {
    hour24 = hour + 12;
  } else if (period.toUpperCase() === 'AM' && hour === 12) {
    hour24 = 0;
  }

  return `${hour24.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}

/**
 * Convert 24-hour time to 12-hour format
 */
function convertTo12Hour(hour: number, minute: number): string {
  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;

  return `${hour12}:${minute.toString().padStart(2, '0')} ${period}`;
}

/**
 * Generate 15-minute time slots for a given date
 */
export function generateTimeSlots(date: Date): TimeSlot[] {
  const hours = getStoreHours(date);

  if (!hours.isOpen || !hours.open || !hours.close) {
    return [];
  }

  const slots: TimeSlot[] = [];

  // Parse open and close times
  const [openHour, openMin] = hours.open.split(':').map(Number);
  const [closeHour, closeMin] = hours.close.split(':').map(Number);

  // Calculate last booking time (30 minutes before closing to allow for appointment duration)
  let lastBookingHour = closeHour;
  let lastBookingMin = closeMin - 30;
  if (lastBookingMin < 0) {
    lastBookingMin += 60;
    lastBookingHour--;
  }

  let currentHour = openHour;
  let currentMinute = openMin;

  // Generate slots in 15-minute intervals, stopping 30 minutes before closing
  while (currentHour < lastBookingHour || (currentHour === lastBookingHour && currentMinute <= lastBookingMin)) {
    const time12 = convertTo12Hour(currentHour, currentMinute);
    const time24 = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;

    slots.push({
      time: time12,
      value: time24,
    });

    // Increment by 15 minutes
    currentMinute += 15;
    if (currentMinute >= 60) {
      currentMinute = 0;
      currentHour++;
    }
  }

  return slots;
}

/**
 * Check if a date/time is within store hours
 */
export function isWithinStoreHours(date: Date, time: string): boolean {
  const hours = getStoreHours(date);

  if (!hours.isOpen || !hours.open || !hours.close) {
    return false;
  }

  return time >= hours.open && time < hours.close;
}

/**
 * Get a human-readable string for store hours on a given date
 */
export function getStoreHoursString(date: Date): string {
  const hours = getStoreHours(date);

  if (!hours.isOpen) {
    return 'Closed';
  }

  const dayOfWeek = date.getDay();
  const dayMap: Record<number, keyof typeof siteConfig.hours> = {
    0: 'sunday',
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: 'saturday',
  };

  return siteConfig.hours[dayMap[dayOfWeek]];
}
