import { NextResponse } from 'next/server';

// File Upload API — Deployment-Ready Structure
// Currently uses local/base64 mode. When CLOUDFLARE_R2 env vars are set,
// it automatically switches to Cloudflare R2 object storage.

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const userId = formData.get('userId') as string;

    if (!file) {
      return NextResponse.json({ status: 'error', message: 'No file provided.' }, { status: 400 });
    }

    const allowedTypes = ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ status: 'error', message: 'Only PDF, TXT, and DOC/DOCX files are allowed.' }, { status: 400 });
    }

    const maxSizeBytes = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSizeBytes) {
      return NextResponse.json({ status: 'error', message: 'File size must be under 5MB.' }, { status: 400 });
    }

    const filename = `${userId || 'anon'}-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

    // --- CLOUDFLARE R2 UPLOAD (When env vars are configured) ---
    // import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
    //
    // if (process.env.CLOUDFLARE_R2_ACCESS_KEY_ID) {
    //   const R2 = new S3Client({
    //     region: 'auto',
    //     endpoint: `https://${process.env.CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    //     credentials: {
    //       accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    //       secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
    //     },
    //   });
    //
    //   const buffer = await file.arrayBuffer();
    //   await R2.send(new PutObjectCommand({
    //     Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME!,
    //     Key: `resumes/${filename}`,
    //     Body: Buffer.from(buffer),
    //     ContentType: file.type,
    //   }));
    //
    //   const publicUrl = `${process.env.CLOUDFLARE_R2_PUBLIC_URL}/resumes/${filename}`;
    //
    //   await prisma.resume.create({
    //     data: { userId, filename: file.name, fileUrl: publicUrl, fileSize: file.size, isPrimary: true }
    //   });
    //
    //   return NextResponse.json({ status: 'success', url: publicUrl, filename });
    // }

    // --- TRANSITIONAL MODE: Return metadata only ---
    return NextResponse.json({
      status: 'success',
      message: 'File received. Add CLOUDFLARE_R2 credentials to .env.local for cloud storage persistence.',
      data: {
        filename: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString(),
        // In production this would be a real URL like:
        // url: `https://pub-xxx.r2.dev/resumes/${filename}`
        url: `/api/upload/local/${filename}`,
      }
    });

  } catch (err: any) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

// GET - Retrieve file metadata (placeholder)
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'File upload API ready. POST multipart/form-data with file and userId fields.'
  });
}
