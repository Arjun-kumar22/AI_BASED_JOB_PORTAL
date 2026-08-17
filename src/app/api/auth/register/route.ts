import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, role = 'CANDIDATE', phone, company } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { status: 'error', message: 'Full name, email, and password are required.' },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();

    if (password.length < 6) {
      return NextResponse.json(
        { status: 'error', message: 'Password must be at least 6 characters.' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: trimmedEmail }
    });

    if (existingUser) {
      return NextResponse.json(
        { status: 'error', message: 'An account with this email address already exists. Please log in.' },
        { status: 409 }
      );
    }

    // Normalize role enum
    const roleLower = (role || '').toString().toLowerCase();
    let normalizedRole: 'CANDIDATE' | 'RECRUITER' | 'ADMIN' = 'CANDIDATE';
    if (roleLower === 'employer' || roleLower === 'recruiter') {
      normalizedRole = 'RECRUITER';
    } else if (roleLower === 'admin') {
      normalizedRole = 'ADMIN';
    }

    // Hash password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in PostgreSQL database
    const user = await prisma.user.create({
      data: {
        name: trimmedName,
        email: trimmedEmail,
        password: hashedPassword,
        role: normalizedRole,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      }
    });

    // Create linked role-specific profile
    if (user.role === 'CANDIDATE') {
      await prisma.candidateProfile.create({
        data: {
          userId: user.id,
          phone: phone || null,
          title: 'Aspiring Tech Professional',
          bio: 'Looking for exciting engineering opportunities on TITAN portal.',
        }
      });
    } else if (user.role === 'RECRUITER') {
      await prisma.recruiterProfile.create({
        data: {
          userId: user.id,
          company: company || `${trimmedName}'s Organization`,
          position: 'Hiring Manager',
        }
      });
    }

    // Create onboarding welcome notification
    try {
      await prisma.notification.create({
        data: {
          userId: user.id,
          type: 'GENERAL',
          title: 'Welcome to TITAN Job Portal! 🎉',
          message: 'Your account has been registered in the database. Complete your profile to get matched with top opportunities.',
          link: user.role === 'RECRUITER' ? '/recruiter/dashboard' : '/onboarding'
        }
      });
    } catch (notifErr) {
      console.warn('Welcome notification warning:', notifErr);
    }

    return NextResponse.json({
      status: 'success',
      message: 'Account registered successfully in the database!',
      data: user
    }, { status: 201 });

  } catch (err: any) {
    console.error('Registration error:', err);
    return NextResponse.json(
      { status: 'error', message: err.message || 'Registration failed' },
      { status: 500 }
    );
  }
}
