import { NextResponse } from 'next/server';
import { analyzeResumeAts } from '@/lib/atsEngine';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { resumeText, jobDescription } = body;

    const result = analyzeResumeAts(resumeText, jobDescription);

    return NextResponse.json({
      status: 'success',
      data: result
    });
  } catch (err: any) {
    return NextResponse.json({
      status: 'error',
      message: err.message || 'ATS calculation failed'
    }, { status: 400 });
  }
}
