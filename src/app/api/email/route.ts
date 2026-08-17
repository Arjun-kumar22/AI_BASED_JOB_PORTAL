import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

// Initialize Resend (https://resend.com — Free: 3,000 emails/month)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

interface EmailPayload {
  to: string;
  subject: string;
  type: 'welcome' | 'application_received' | 'interview_scheduled' | 'status_changed' | 'job_match';
  data?: Record<string, string>;
}

export async function POST(request: Request) {
  try {
    const body: EmailPayload = await request.json();
    const { to, subject, type, data = {} } = body;

    if (!to || !subject || !type) {
      return NextResponse.json({ status: 'error', message: 'Missing required fields: to, subject, type' }, { status: 400 });
    }

    if (!resend) {
      return NextResponse.json({
        status: 'info',
        message: 'Email service not configured. Add RESEND_API_KEY to .env.local to enable transactional emails.'
      });
    }

    const html = generateEmailHtml(type, data);

    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'noreply@titan-networks.org',
      to,
      subject,
      html,
    });

    return NextResponse.json({ status: 'success', data: result });
  } catch (err: any) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

function generateEmailHtml(type: string, data: Record<string, string>): string {
  const base = `
    <div style="font-family: 'Inter', Arial, sans-serif; background: #f4f6fa; padding: 32px; min-height: 100vh;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
        <div style="background: linear-gradient(135deg, #0b1c30 0%, #1a3a5c 100%); padding: 32px; text-align: center;">
          <h1 style="color: #fbbf24; margin: 0; font-size: 24px; font-weight: 900;">TITAN Job Portal</h1>
          <p style="color: #94a3b8; margin: 8px 0 0; font-size: 13px;">Taj Institute of Technology & Applied Networks</p>
        </div>
        <div style="padding: 32px;">
          CONTENT_PLACEHOLDER
        </div>
        <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="color: #94a3b8; font-size: 11px; margin: 0;">© 2026 TITAN Job Portal · ISO 9001:2015 Certified</p>
        </div>
      </div>
    </div>
  `;

  const templates: Record<string, string> = {
    welcome: `
      <h2 style="color: #0b1c30; margin: 0 0 12px;">Welcome to TITAN, ${data.name || 'there'}! 👋</h2>
      <p style="color: #475569; line-height: 1.6;">Your account has been successfully created. You are now part of a community of 50,000+ TITAN alumni and active job seekers.</p>
      <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 12px; padding: 20px; margin: 20px 0;">
        <p style="color: #0284c7; font-weight: 700; margin: 0 0 8px;">🚀 Next Steps:</p>
        <ul style="color: #475569; line-height: 2; margin: 0; padding-left: 20px;">
          <li>Complete your candidate profile</li>
          <li>Upload your resume for ATS scoring</li>
          <li>Browse 500+ active job listings</li>
          <li>Chat with TITAN AI Assistant for career advice</li>
        </ul>
      </div>
      <a href="${data.loginUrl || 'https://titan-portal.vercel.app/login'}" style="display: inline-block; background: linear-gradient(135deg, #0b1c30, #1a3a5c); color: #fbbf24; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 14px;">🎯 Go to My Dashboard</a>
    `,
    application_received: `
      <h2 style="color: #0b1c30; margin: 0 0 12px;">Application Received! ✅</h2>
      <p style="color: #475569;">Hi ${data.name || 'there'}, your application for <strong>${data.jobTitle || 'the position'}</strong> at <strong>${data.company || 'the company'}</strong> has been received.</p>
      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 20px; margin: 20px 0;">
        <p style="color: #15803d; font-weight: 700; margin: 0 0 4px;">Status: Applied ✓</p>
        <p style="color: #475569; margin: 0; font-size: 13px;">The recruiter will review your profile and reach out shortly.</p>
      </div>
      <a href="${data.trackingUrl || '#'}" style="display: inline-block; background: #0b1c30; color: #fbbf24; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 13px;">Track Application Status</a>
    `,
    interview_scheduled: `
      <h2 style="color: #0b1c30; margin: 0 0 12px;">Interview Scheduled! 📅</h2>
      <p style="color: #475569;">Congratulations ${data.name || 'there'}! You have been selected for an interview for <strong>${data.jobTitle}</strong>.</p>
      <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 12px; padding: 20px; margin: 20px 0;">
        <p><strong>📅 Date:</strong> ${data.date || 'TBD'}</p>
        <p><strong>⏰ Time:</strong> ${data.time || 'TBD'}</p>
        <p><strong>📍 Format:</strong> ${data.format || 'Technical Interview'}</p>
        ${data.meetingUrl ? `<p><strong>🔗 Meeting Link:</strong> <a href="${data.meetingUrl}">${data.meetingUrl}</a></p>` : ''}
      </div>
      <p style="color: #475569; font-size: 13px;">🎯 Tip: Practice with TITAN's STAR Mock Interview Coach before your interview!</p>
    `,
    status_changed: `
      <h2 style="color: #0b1c30; margin: 0 0 12px;">Application Status Updated</h2>
      <p style="color: #475569;">Your application for <strong>${data.jobTitle}</strong> has been updated to:</p>
      <div style="background: #f0f9ff; border: 2px solid #0b1c30; border-radius: 12px; padding: 20px; margin: 20px 0; text-align: center;">
        <p style="font-size: 20px; font-weight: 900; color: #0b1c30; margin: 0;">${data.status || 'Updated'}</p>
      </div>
    `,
    job_match: `
      <h2 style="color: #0b1c30; margin: 0 0 12px;">New Job Match Found! 💼</h2>
      <p style="color: #475569;">A new job matching your preferences has been posted:</p>
      <div style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 20px 0;">
        <h3 style="margin: 0 0 4px; color: #0b1c30;">${data.jobTitle}</h3>
        <p style="color: #475569; margin: 0 0 8px;">${data.company} · ${data.location}</p>
        <p style="color: #fbbf24; font-weight: 700; margin: 0;">${data.salary || 'Competitive'}</p>
      </div>
      <a href="${data.jobUrl || '#'}" style="display: inline-block; background: #0b1c30; color: #fbbf24; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: 700;">Apply Now →</a>
    `,
  };

  const content = templates[type] || `<p style="color: #475569;">${data.message || 'You have a new notification from TITAN Job Portal.'}</p>`;

  return base.replace('CONTENT_PLACEHOLDER', content);
}
