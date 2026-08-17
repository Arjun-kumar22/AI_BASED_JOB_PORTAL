import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ status: 'error', message: 'userId is required.' }, { status: 400 });
    }

    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20
    });

    const unreadCount = await prisma.notification.count({ where: { userId, isRead: false } });

    return NextResponse.json({ status: 'ok', data: notifications, unreadCount });
  } catch (err: any) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { userId, notificationId } = body;

    if (notificationId) {
      // Mark single notification as read
      await prisma.notification.update({ where: { id: notificationId }, data: { isRead: true } });
    } else if (userId) {
      // Mark all as read
      await prisma.notification.updateMany({ where: { userId, isRead: false }, data: { isRead: true } });
    }

    return NextResponse.json({ status: 'success' });
  } catch (err: any) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
