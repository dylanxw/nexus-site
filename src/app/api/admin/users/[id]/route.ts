import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth, hasRole, hashPassword } from '@/lib/auth';
import { createVerificationToken, sendVerificationEmail } from '@/lib/email-verification';
import { z } from 'zod';

const updateUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(2).optional(),
  role: z.enum(['ADMIN', 'MANAGER', 'EMPLOYEE']).optional(),
  active: z.boolean().optional(),
  phoneNumber: z.string().optional(),
  password: z.string().min(8).optional(),
});

// GET single user
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth();
    const { id } = await params;

    // Users can view their own profile, admins can view any
    if (session.userId !== id && !hasRole(session.role, ['ADMIN'])) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        active: true,
        twoFactorEnabled: true,
        phoneNumber: true,
        emailVerified: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

// PATCH update user
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth();
    const { id } = await params;

    // Users can update their own profile (limited fields), admins can update any
    const isOwnProfile = session.userId === id;
    const isAdmin = hasRole(session.role, ['ADMIN']);

    if (!isOwnProfile && !isAdmin) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validationResult = updateUserSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validationResult.error },
        { status: 400 }
      );
    }

    const { email, name, role, active, phoneNumber, password } = validationResult.data;

    // Non-admins can only update their own name, phone, and password
    if (!isAdmin && (email || role !== undefined || active !== undefined)) {
      return NextResponse.json(
        { error: 'Insufficient permissions to update these fields' },
        { status: 403 }
      );
    }

    // Check if email is already taken
    if (email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
      });

      if (existingUser && existingUser.id !== id) {
        return NextResponse.json(
          { error: 'Email already in use' },
          { status: 409 }
        );
      }
    }

    // Build update data
    const updateData: any = {};
    if (name) updateData.name = name;
    if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber;
    if (email) {
      updateData.email = email.toLowerCase();
      updateData.emailVerified = false; // Require re-verification
    }
    if (password) {
      updateData.password = await hashPassword(password);
    }

    // Admin-only fields
    if (isAdmin) {
      if (role) updateData.role = role;
      if (active !== undefined) updateData.active = active;
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        active: true,
        phoneNumber: true,
        emailVerified: true,
        updatedAt: true,
      },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: session.userId,
        action: 'USER_UPDATED',
        description: `Updated user ${updatedUser.email}`,
      },
    });

    // Send verification email if email was changed
    if (email && email.toLowerCase() !== updatedUser.email) {
      try {
        const token = await createVerificationToken(updatedUser.email, 'EMAIL_VERIFY');
        await sendVerificationEmail(updatedUser.email, token);
      } catch (error) {
        console.error('Failed to send verification email:', error);
        // Don't fail the update if email sending fails
      }
    }

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

// DELETE user
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth();
    const { id } = await params;

    // Only admins can delete users
    if (!hasRole(session.role, ['ADMIN'])) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    // Prevent self-deletion
    if (session.userId === id) {
      return NextResponse.json(
        { error: 'Cannot delete your own account' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: { email: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Delete user (cascade will delete sessions, etc.)
    await prisma.user.delete({
      where: { id },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: session.userId,
        action: 'USER_DELETED',
        description: `Deleted user ${user.email}`,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}