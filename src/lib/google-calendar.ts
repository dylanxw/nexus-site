import { google } from 'googleapis';
import { generateTimeSlots, isWithinStoreHours, TimeSlot } from './store-hours';

// Initialize Google Calendar API client
function getCalendarClient() {
  const credentials = {
    client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  };

  if (!credentials.client_email || !credentials.private_key) {
    throw new Error('Google Calendar credentials not configured');
  }

  const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events',
    ],
    // Domain-wide delegation: impersonate this user to access their calendars
    subject: process.env.GOOGLE_CALENDAR_IMPERSONATE_USER,
  });

  return google.calendar({ version: 'v3', auth });
}

export interface BookingDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  deviceType: string;
  make: string;
  model: string;
  issues: string[];
  description?: string;
  appointmentDate: string; // YYYY-MM-DD
  appointmentTime: string; // HH:mm
}

export interface CalendarEvent {
  id: string;
  summary: string;
  start: string;
  end: string;
  htmlLink: string;
}

/**
 * Get busy time slots from Google Calendar
 */
async function getBusySlots(date: Date): Promise<{ start: string; end: string }[]> {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!calendarId) {
    console.warn('GOOGLE_CALENDAR_ID not set, returning no busy slots');
    return [];
  }

  try {
    const calendar = getCalendarClient();

    // Set time range for the entire day
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const response = await calendar.events.list({
      calendarId,
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = response.data.items || [];

    return events.map(event => {
      const start = event.start?.dateTime || event.start?.date || '';
      const end = event.end?.dateTime || event.end?.date || '';

      // Extract just the time portion (HH:mm)
      const startTime = start ? new Date(start).toTimeString().slice(0, 5) : '';
      const endTime = end ? new Date(end).toTimeString().slice(0, 5) : '';

      return { start: startTime, end: endTime };
    }).filter(slot => slot.start && slot.end);

  } catch (error) {
    console.error('Error fetching busy slots:', error);
    throw new Error('Failed to check calendar availability');
  }
}

/**
 * Check if a time slot conflicts with any busy slots (including 30-min buffer)
 */
function isSlotAvailable(slotTime: string, busySlots: { start: string; end: string }[]): boolean {
  // Parse slot time
  const [slotHour, slotMin] = slotTime.split(':').map(Number);
  const slotMinutes = slotHour * 60 + slotMin;

  // Each booking takes 30 minutes (2 slots)
  const slotEndMinutes = slotMinutes + 30;

  for (const busy of busySlots) {
    const [busyStartHour, busyStartMin] = busy.start.split(':').map(Number);
    const busyStartMinutes = busyStartHour * 60 + busyStartMin;

    const [busyEndHour, busyEndMin] = busy.end.split(':').map(Number);
    const busyEndMinutes = busyEndHour * 60 + busyEndMin;

    // Check if slot overlaps with busy period
    // Slot is unavailable if it starts before busy ends AND ends after busy starts
    if (slotMinutes < busyEndMinutes && slotEndMinutes > busyStartMinutes) {
      return false;
    }
  }

  return true;
}

/**
 * Get available time slots for a given date
 */
export async function getAvailableTimeSlots(date: Date): Promise<TimeSlot[]> {
  try {
    // Generate all possible time slots based on store hours
    const allSlots = generateTimeSlots(date);

    if (allSlots.length === 0) {
      return []; // Store is closed
    }

    // Get busy slots from calendar
    const busySlots = await getBusySlots(date);

    // Get current time in America/Chicago timezone
    const now = new Date();
    const chicagoTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Chicago' }));
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    const isToday = selectedDate.getTime() === today.getTime();

    // Filter out unavailable slots
    const availableSlots = allSlots.filter(slot => {
      // Check if within store hours
      if (!isWithinStoreHours(date, slot.value)) {
        return false;
      }

      // For today, filter out past time slots
      if (isToday) {
        const [slotHour, slotMin] = slot.value.split(':').map(Number);
        const currentHour = chicagoTime.getHours();
        const currentMin = chicagoTime.getMinutes();

        // Convert to minutes for easier comparison
        const slotMinutes = slotHour * 60 + slotMin;
        const currentMinutes = currentHour * 60 + currentMin;

        // Skip slots that have already passed (with 30 minute buffer to allow for processing time)
        if (slotMinutes <= currentMinutes + 30) {
          return false;
        }
      }

      // Check if not conflicting with existing bookings
      return isSlotAvailable(slot.value, busySlots);
    });

    return availableSlots;

  } catch (error) {
    console.error('Error getting available time slots:', error);
    // Return all store hour slots if calendar check fails (graceful degradation)
    return generateTimeSlots(date);
  }
}

/**
 * Check if a specific time slot is available
 */
export async function checkSlotAvailability(date: Date, time: string): Promise<boolean> {
  try {
    // Check if within store hours
    if (!isWithinStoreHours(date, time)) {
      return false;
    }

    // Get busy slots
    const busySlots = await getBusySlots(date);

    // Check if slot is available
    return isSlotAvailable(time, busySlots);

  } catch (error) {
    console.error('Error checking slot availability:', error);
    return false;
  }
}

/**
 * Create a booking in Google Calendar
 */
export async function createBooking(details: BookingDetails): Promise<CalendarEvent> {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!calendarId) {
    throw new Error('GOOGLE_CALENDAR_ID not configured');
  }

  try {
    // Validate slot is still available
    const appointmentDate = new Date(details.appointmentDate);
    const isAvailable = await checkSlotAvailability(appointmentDate, details.appointmentTime);

    if (!isAvailable) {
      throw new Error('Selected time slot is no longer available');
    }

    const calendar = getCalendarClient();

    // Parse date and time
    const [year, month, day] = details.appointmentDate.split('-').map(Number);
    const [hour, minute] = details.appointmentTime.split(':').map(Number);

    const startDateTime = new Date(year, month - 1, day, hour, minute);
    const endDateTime = new Date(startDateTime);
    endDateTime.setMinutes(endDateTime.getMinutes() + 30); // 30-minute appointment

    // Format event description
    const issuesList = details.issues.map(issue =>
      issue.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    ).join(', ');
    const description = `
Repair Appointment

Customer: ${details.firstName} ${details.lastName}
Email: ${details.email}
Phone: ${details.phone}

Device: ${details.make} ${details.model}
Type: ${details.deviceType}
Issues: ${issuesList}

${details.description ? `\nDescription:\n${details.description}` : ''}

---
Booked via Nexus Tech Solutions website
`.trim();

    // Create calendar event
    const response = await calendar.events.insert({
      calendarId,
      requestBody: {
        summary: `Repair: ${details.make} ${details.model} - ${details.firstName} ${details.lastName}`,
        description,
        start: {
          dateTime: startDateTime.toISOString(),
          timeZone: 'America/Chicago',
        },
        end: {
          dateTime: endDateTime.toISOString(),
          timeZone: 'America/Chicago',
        },
        attendees: [
          {
            email: details.email,
            displayName: `${details.firstName} ${details.lastName}`,
            responseStatus: 'accepted',
          },
        ],
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 }, // 1 day before
            { method: 'email', minutes: 60 }, // 1 hour before
          ],
        },
        status: 'confirmed',
      },
      sendUpdates: 'all', // Send email notifications
    });

    if (!response.data.id || !response.data.htmlLink) {
      throw new Error('Failed to create calendar event');
    }

    return {
      id: response.data.id,
      summary: response.data.summary || '',
      start: response.data.start?.dateTime || '',
      end: response.data.end?.dateTime || '',
      htmlLink: response.data.htmlLink,
    };

  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
}

/**
 * Cancel a booking in Google Calendar
 */
export async function cancelBooking(eventId: string): Promise<void> {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!calendarId) {
    throw new Error('GOOGLE_CALENDAR_ID not configured');
  }

  try {
    const calendar = getCalendarClient();

    await calendar.events.delete({
      calendarId,
      eventId,
      sendUpdates: 'all', // Notify attendees
    });

  } catch (error) {
    console.error('Error cancelling booking:', error);
    throw new Error('Failed to cancel booking');
  }
}
