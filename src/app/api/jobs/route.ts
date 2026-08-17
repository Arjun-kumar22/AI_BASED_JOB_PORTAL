import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('perPage') || '20');
    const search = searchParams.get('search') || '';
    const style = searchParams.get('style') || '';
    const type = searchParams.get('type') || '';
    const skip = (page - 1) * perPage;

    const where: any = { status: 'ACTIVE' };
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (style) where.style = style;
    if (type) where.type = type;

    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        where,
        skip,
        take: perPage,
        orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
        include: {
          employer: {
            select: {
              name: true,
              recruiterProfile: { select: { company: true, logoUrl: true } }
            }
          },
          _count: { select: { applications: true } }
        }
      }),
      prisma.job.count({ where })
    ]);

    return NextResponse.json({
      status: 'ok',
      data: jobs,
      meta: { total, page, perPage, totalPages: Math.ceil(total / perPage) }
    });
  } catch (err: any) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, company, description, location, salary, type, style, skills, employerId, department, seniority, experience } = body;

    if (!title || !company || !description || !location || !employerId) {
      return NextResponse.json({ status: 'error', message: 'Missing required fields: title, company, description, location, employerId' }, { status: 400 });
    }

    const job = await prisma.job.create({
      data: {
        title, company, description, location,
        salary: salary || null,
        type: type || 'FULL_TIME',
        style: style || 'HYBRID',
        skills: skills || [],
        department: department || null,
        seniority: seniority || null,
        experience: experience || null,
        employerId,
        status: 'ACTIVE'
      }
    });

    return NextResponse.json({ status: 'success', data: job }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
