/**
 * Fetch with timeout utility
 * Adds timeout capability to fetch requests with better error handling
 */

export interface FetchWithTimeoutOptions extends RequestInit {
  timeout?: number; // Timeout in milliseconds
}

/**
 * Custom error class for timeout errors
 */
export class TimeoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TimeoutError';
  }
}

/**
 * Fetch with timeout and better error handling
 * @param url - The URL to fetch
 * @param options - Fetch options including timeout
 * @returns Promise<Response>
 */
export async function fetchWithTimeout(
  url: string,
  options: FetchWithTimeoutOptions = {}
): Promise<Response> {
  const { timeout = 30000, ...fetchOptions } = options; // Default 30 second timeout

  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);

    // Check if it's an abort error (timeout)
    if (error instanceof Error && error.name === 'AbortError') {
      throw new TimeoutError(
        `Request timed out after ${timeout}ms. Please check your connection and try again.`
      );
    }

    // Network error
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error(
        'Network error: Unable to connect to the server. Please check your internet connection.'
      );
    }

    // Re-throw other errors
    throw error;
  }
}

/**
 * Helper to create a timeout promise for Promise.race
 * @param ms - Timeout in milliseconds
 * @param message - Custom timeout message
 */
export function createTimeoutPromise<T = never>(
  ms: number,
  message = 'Operation timed out'
): Promise<T> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new TimeoutError(message)), ms);
  });
}

/**
 * Retry logic for fetch operations
 * @param fn - Function that returns a promise
 * @param retries - Number of retries
 * @param delay - Delay between retries in ms
 */
export async function fetchWithRetry<T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 1000
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) {
      throw error;
    }

    // Don't retry on client errors (4xx)
    if (error instanceof Response && error.status >= 400 && error.status < 500) {
      throw error;
    }

    // Wait before retrying
    await new Promise(resolve => setTimeout(resolve, delay));

    // Exponential backoff
    return fetchWithRetry(fn, retries - 1, delay * 2);
  }
}