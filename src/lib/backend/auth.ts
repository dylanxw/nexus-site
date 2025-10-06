import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { User, Role } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
);

const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';

interface TokenPayload {
  userId: string;
  email: string;
  role: Role;
}

/**
 * Hash a password
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

/**
 * Compare password with hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Generate JWT access token
 */
export async function generateAccessToken(user: User): Promise<string> {
  const payload: TokenPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_EXPIRY)
    .sign(JWT_SECRET);
}

/**
 * Generate refresh token and store in database
 */
export async function generateRefreshToken(user: User): Promise<string> {
  const token = crypto.randomUUID();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

  await prisma.refreshToken.create({
    data: {
      token,
      userId: user.id,
      expiresAt,
    },
  });

  return token;
}

/**
 * Verify JWT token
 */
export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as TokenPayload;
  } catch {
    return null;
  }
}

/**
 * Authenticate user login
 */
export async function authenticateUser(
  email: string,
  password: string
): Promise<{
  success: boolean;
  user?: User;
  accessToken?: string;
  refreshToken?: string;
  error?: string;
}> {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user || !user.active) {
      return { success: false, error: 'Invalid credentials' };
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return { success: false, error: 'Invalid credentials' };
    }

    const accessToken = await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    // Log the login activity
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'login',
        description: `User ${user.email} logged in`,
      },
    });

    return {
      success: true,
      user,
      accessToken,
      refreshToken,
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return { success: false, error: 'Authentication failed' };
  }
}

/**
 * Refresh access token using refresh token
 */
export async function refreshAccessToken(
  refreshToken: string
): Promise<{
  success: boolean;
  accessToken?: string;
  error?: string;
}> {
  try {
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!storedToken || storedToken.expiresAt < new Date()) {
      return { success: false, error: 'Invalid or expired refresh token' };
    }

    if (!storedToken.user.active) {
      return { success: false, error: 'User account is inactive' };
    }

    const accessToken = await generateAccessToken(storedToken.user);

    return {
      success: true,
      accessToken,
    };
  } catch (error) {
    console.error('Token refresh error:', error);
    return { success: false, error: 'Token refresh failed' };
  }
}

/**
 * Get current user from request cookies
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    if (!token) return null;

    const payload = await verifyToken(token);
    if (!payload) return null;

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    return user && user.active ? user : null;
  } catch {
    return null;
  }
}

/**
 * Require authentication - throws error if not authenticated
 */
export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Authentication required');
  }
  return user;
}

/**
 * Require specific role - throws error if not authorized
 */
export async function requireRole(role: Role): Promise<User> {
  const user = await requireAuth();

  const roleHierarchy = {
    [Role.EMPLOYEE]: 0,
    [Role.MANAGER]: 1,
    [Role.ADMIN]: 2,
  };

  if (roleHierarchy[user.role] < roleHierarchy[role]) {
    throw new Error('Insufficient permissions');
  }

  return user;
}

/**
 * Logout user - remove refresh token
 */
export async function logoutUser(userId: string): Promise<void> {
  await prisma.refreshToken.deleteMany({
    where: { userId },
  });

  await prisma.activityLog.create({
    data: {
      userId,
      action: 'logout',
      description: 'User logged out',
    },
  });
}

/**
 * Create initial admin user if none exists
 */
export async function createInitialAdmin(): Promise<void> {
  const adminExists = await prisma.user.findFirst({
    where: { role: Role.ADMIN },
  });

  if (!adminExists) {
    const hashedPassword = await hashPassword('admin123'); // Change this in production!

    await prisma.user.create({
      data: {
        email: 'admin@nexusrepair.com',
        password: hashedPassword,
        name: 'Admin User',
        role: Role.ADMIN,
        active: true,
      },
    });

    console.log('Initial admin user created:');
    console.log('Email: admin@nexusrepair.com');
    console.log('Password: admin123');
    console.log('⚠️  CHANGE THIS PASSWORD IMMEDIATELY!');
  }
}