import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const role = searchParams.get('role') || '';

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ];
    }
    if (role && role !== 'all') {
      const roleUpper = (role === 'employer' ? 'RECRUITER' : role).toUpperCase();
      where.role = roleUpper;
    }

    const users = await prisma.user.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        profile: {
          select: {
            title: true,
            location: true,
            phone: true,
            skills: true,
          }
        },
        recruiterProfile: {
          select: {
            company: true,
            position: true,
            location: true,
          }
        },
        _count: {
          select: {
            applications: true,
            postedJobs: true,
            resumes: true,
          }
        }
      }
    });

    return NextResponse.json({
      status: 'ok',
      data: users,
      count: users.length
    });
  } catch (err: any) {
    return NextResponse.json(
      { status: 'error', message: err.message || 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
