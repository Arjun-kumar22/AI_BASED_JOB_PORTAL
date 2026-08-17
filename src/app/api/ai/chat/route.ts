import { NextResponse } from 'next/server';
import { queryTitanAI } from '@/lib/groqClient';
import { portalStore } from '@/lib/store';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, message, resumeSnippet, history } = body;

    const announcements = portalStore.getAnnouncements();
    const result = await queryTitanAI(prompt || message || '', resumeSnippet, announcements, history || []);

    return NextResponse.json({
      status: 'success',
      ...result
    });
  } catch (err: any) {
    return NextResponse.json({
      status: 'error',
      message: err.message || 'AI request failed'
    }, { status: 500 });
  }
}
