/**
 * Analytics tracking utilities
 * Supports Google Analytics 4 (gtag.js)
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

/**
 * Track a custom event
 */
export function trackEvent(
  eventName: string,
  parameters?: Record<string, any>
) {
  if (typeof window === 'undefined') return;

  // Google Analytics 4
  if (window.gtag) {
    window.gtag('event', eventName, parameters);
  }

  // Console log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', eventName, parameters);
  }
}

/**
 * Track page view
 */
export function trackPageView(url: string, title?: string) {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
      page_path: url,
      page_title: title,
    });
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics] Page View:', url, title);
  }
}

/**
 * Repair form specific analytics
 */
export const RepairFormAnalytics = {
  /**
   * Track form started
   */
  formStarted: (deviceType?: string) => {
    trackEvent('repair_form_started', {
      device_type: deviceType || 'unknown',
    });
  },

  /**
   * Track step completed
   */
  stepCompleted: (step: number, data?: Record<string, any>) => {
    trackEvent('repair_form_step_completed', {
      step_number: step,
      ...data,
    });
  },

  /**
   * Track step abandoned
   */
  stepAbandoned: (step: number, timeSpent?: number) => {
    trackEvent('repair_form_abandoned', {
      step_number: step,
      time_spent_seconds: timeSpent ? Math.round(timeSpent / 1000) : undefined,
    });
  },

  /**
   * Track device selection
   */
  deviceSelected: (deviceType: string) => {
    trackEvent('repair_device_selected', {
      device_type: deviceType,
    });
  },

  /**
   * Track make/model selection
   */
  makeModelSelected: (make: string, model: string) => {
    trackEvent('repair_make_model_selected', {
      make,
      model,
    });
  },

  /**
   * Track issue selection
   */
  issueSelected: (issues: string[]) => {
    trackEvent('repair_issues_selected', {
      issue_count: issues.length,
      issues: issues.join(', '),
    });
  },

  /**
   * Track form submission
   */
  formSubmitted: (requestType: 'quote' | 'appointment', data?: Record<string, any>) => {
    trackEvent('repair_form_submitted', {
      request_type: requestType,
      ...data,
    });
  },

  /**
   * Track form error
   */
  formError: (error: string, step?: number) => {
    trackEvent('repair_form_error', {
      error_message: error,
      step_number: step,
    });
  },

  /**
   * Track validation error
   */
  validationError: (field: string, error: string) => {
    trackEvent('repair_form_validation_error', {
      field_name: field,
      error_message: error,
    });
  },

  /**
   * Track appointment mode toggle
   */
  modeToggled: (mode: 'quote' | 'appointment') => {
    trackEvent('repair_form_mode_toggled', {
      mode,
    });
  },

  /**
   * Track time slot selection
   */
  timeSlotSelected: (date: string, time: string) => {
    trackEvent('repair_time_slot_selected', {
      appointment_date: date,
      appointment_time: time,
    });
  },
};

/**
 * Track user timing
 */
export function trackTiming(
  category: string,
  variable: string,
  value: number,
  label?: string
) {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    window.gtag('event', 'timing_complete', {
      name: variable,
      value: value,
      event_category: category,
      event_label: label,
    });
  }
}

/**
 * Set user properties
 */
export function setUserProperties(properties: Record<string, any>) {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    window.gtag('set', 'user_properties', properties);
  }
}
