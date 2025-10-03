import crypto from 'crypto';

// Generate device fingerprint from user agent and IP
export function generateDeviceFingerprint(userAgent: string, ip: string): string {
  const data = `${userAgent}-${ip}`;
  return crypto.createHash('sha256').update(data).digest('hex');
}

// Extract browser/device info from user agent
export function getDeviceInfo(userAgent?: string): string {
  if (!userAgent) return 'Unknown Device';

  // Simple parsing - can be enhanced with a library like ua-parser-js
  if (userAgent.includes('Chrome')) return 'Chrome Browser';
  if (userAgent.includes('Firefox')) return 'Firefox Browser';
  if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari Browser';
  if (userAgent.includes('Edge')) return 'Edge Browser';

  return 'Unknown Browser';
}
