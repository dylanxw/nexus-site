import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { User } from '@prisma/client';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-this-in-production'
);

const SESSION_COOKIE = 'nexus-admin-session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export interface SessionPayload {
  userId: string;
  email: string;
  name: string;
  role: string;
  sessionId: string;
}

// Password hashing
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// JWT token generation and verification
export async function generateToken(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

// Session management
export async function createSession(user: User, ipAddress?: string, userAgent?: string) {
  // Clean up old sessions for this user (keep only last 5)
  const oldSessions = await prisma.session.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    skip: 4,
  });

  if (oldSessions.length > 0) {
    await prisma.session.deleteMany({
      where: {
        id: { in: oldSessions.map(s => s.id) }
      }
    });
  }

  // Create new session
  const session = await prisma.session.create({
    data: {
      sessionToken: crypto.randomUUID(),
      userId: user.id,
      ipAddress,
      userAgent,
      expiresAt: new Date(Date.now() + SESSION_DURATION),
    },
  });

  const payload: SessionPayload = {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    sessionId: session.id,
  };

  const token = await generateToken(payload);

  // Set secure cookie
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000,
    path: '/',
  });

  // Update last login
  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  // Log activity
  await prisma.activityLog.create({
    data: {
      userId: user.id,
      action: 'LOGIN',
      description: `User ${user.email} logged in`,
      ipAddress,
      userAgent,
    },
  });

  return session;
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE);

  if (!token) {
    return null;
  }

  const payload = await verifyToken(token.value);

  if (!payload) {
    return null;
  }

  // Verify session still exists and is valid
  const session = await prisma.session.findUnique({
    where: { id: payload.sessionId },
  });

  if (!session || session.expiresAt < new Date()) {
    await destroySession();
    return null;
  }

  return payload;
}

export async function destroySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE);

  if (token) {
    const payload = await verifyToken(token.value);

    if (payload) {
      // Delete session from database
      await prisma.session.delete({
        where: { id: payload.sessionId },
      }).catch(() => {}); // Ignore if session doesn't exist

      // Log activity
      await prisma.activityLog.create({
        data: {
          userId: payload.userId,
          action: 'LOGOUT',
          description: `User ${payload.email} logged out`,
        },
      });
    }
  }

  // Clear cookie
  cookieStore.delete(SESSION_COOKIE);
}

// Rate limiting (simple in-memory implementation)
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();

export function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const attempt = loginAttempts.get(identifier);

  if (!attempt) {
    loginAttempts.set(identifier, { count: 1, lastAttempt: now });
    return true;
  }

  // Reset after 15 minutes
  if (now - attempt.lastAttempt > 15 * 60 * 1000) {
    loginAttempts.set(identifier, { count: 1, lastAttempt: now });
    return true;
  }

  // Allow max 5 attempts per 15 minutes
  if (attempt.count >= 5) {
    return false;
  }

  attempt.count++;
  attempt.lastAttempt = now;
  return true;
}

// Require authentication middleware
export async function requireAuth(): Promise<SessionPayload> {
  const session = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  // Verify user still exists and is active
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { active: true },
  });

  if (!user || !user.active) {
    await destroySession();
    throw new Error('Unauthorized');
  }

  return session;
}

// Check if user has required role
export function hasRole(userRole: string, requiredRoles: string[]): boolean {
  const roleHierarchy = ['ADMIN', 'MANAGER', 'EMPLOYEE'];
  const userRoleIndex = roleHierarchy.indexOf(userRole);

  for (const role of requiredRoles) {
    const requiredRoleIndex = roleHierarchy.indexOf(role);
    if (userRoleIndex <= requiredRoleIndex) {
      return true;
    }
  }

  return false;
}

// Require admin authentication (ADMIN or MANAGER role)
export async function requireAdminAuth(): Promise<SessionPayload> {
  const session = await requireAuth(); // Throws if not authenticated

  // Check if user has admin/manager role
  if (!hasRole(session.role, ['ADMIN', 'MANAGER'])) {
    throw new Error('Forbidden - Admin access required');
  }

  return session;
}