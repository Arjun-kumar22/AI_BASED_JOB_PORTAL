import type { Metadata } from 'next';
import '@/styles/globals.css';
import PageLoader from '@/components/PageLoader';
import TitanChatbot from '@/components/TitanChatbot';

export const metadata: Metadata = {
  title: 'Titans Job Portal | AI-Powered Career Intelligence Platform',
  description:
    'Taj Institute of Technology & Applied Networks (TITAN) — Next-Generation Recruitment Ecosystem with ATS Resume Scoring, STAR Mock Interview Coach, and 6-Stage Kanban Pipeline.',
  keywords: 'TITAN, Job Portal, AI ATS Resume Analyzer, Next.js Jobs, Tech Careers, Recruitment Kanban',
  icons: {
    icon: '/images/titan-official-logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#f4f6fa] text-slate-800 antialiased font-sans">
        <PageLoader />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <TitanChatbot />
      </body>
    </html>
  );
}
