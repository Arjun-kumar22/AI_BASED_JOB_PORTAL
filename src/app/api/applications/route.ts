import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const candidateId = searchParams.get('candidateId');
    const jobId = searchParams.get('jobId');

    const where: any = {};
    if (candidateId) where.candidateId = candidateId;
    if (jobId) where.jobId = jobId;

    const applications = await prisma.application.findMany({
      where,
      include: {
        job: { select: { id: true, title: true, company: true, location: true, salary: true, type: true } },
        candidate: { select: { id: true, name: true, email: true, image: true } }
      },
      orderBy: { appliedAt: 'desc' }
    });

    return NextResponse.json({ status: 'ok', data: applications });
  } catch (err: any) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { jobId, candidateId, resumeUrl, coverLetter } = body;

    if (!jobId || !candidateId) {
      return NextResponse.json({ status: 'error', message: 'jobId and candidateId are required.' }, { status: 400 });
    }

    // Check if already applied
    const existing = await prisma.application.findUnique({
      where: { jobId_candidateId: { jobId, candidateId } }
    });
    if (existing) {
      return NextResponse.json({ status: 'error', message: 'You have already applied for this position.' }, { status: 409 });
    }

    // Create application
    const application = await prisma.application.create({
      data: { jobId, candidateId, resumeUrl: resumeUrl || null, coverLetter: coverLetter || null, status: 'APPLIED' },
      include: {
        job: { select: { title: true, company: true } },
        candidate: { select: { name: true, email: true } }
      }
    });

    // Increment job view count
    await prisma.job.update({ where: { id: jobId }, data: { views: { increment: 1 } } });

    // Create notification for candidate
    await prisma.notification.create({
      data: {
        userId: candidateId,
        type: 'APPLICATION_RECEIVED',
        title: 'Application Submitted!',
        message: `Your application for ${application.job.title} at ${application.job.company} was received.`,
        link: `/candidate/tracking`
      }
    });

    return NextResponse.json({ status: 'success', data: application }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { applicationId, status, notes } = body;

    if (!applicationId || !status) {
      return NextResponse.json({ status: 'error', message: 'applicationId and status are required.' }, { status: 400 });
    }

    const updated = await prisma.application.update({
      where: { id: applicationId },
      data: { status, notes: notes || undefined },
      include: {
        candidate: { select: { id: true, name: true, email: true } },
        job: { select: { title: true, company: true } }
      }
    });

    // Notify candidate of status change
    await prisma.notification.create({
      data: {
        userId: updated.candidate.id,
        type: 'APPLICATION_STATUS_CHANGED',
        title: 'Application Status Updated',
        message: `Your application for ${updated.job.title} is now: ${status.replace(/_/g, ' ')}`,
        link: `/candidate/tracking`
      }
    });

    return NextResponse.json({ status: 'success', data: updated });
  } catch (err: any) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
