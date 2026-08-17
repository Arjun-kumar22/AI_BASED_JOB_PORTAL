'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import ResumeEditor from '@/components/ResumeEditor';
import ResumeA4Preview from '@/components/ResumeA4Preview';
import { portalStore } from '@/lib/store';
import { ResumeData } from '@/lib/types';
import { exportElementToPdf } from '@/lib/pdfExport';

export default function ResumeBuilderPage() {
  const [resume, setResume] = useState<ResumeData>(
    portalStore.getPrimaryResume() || portalStore.getResumes()[0]
  );
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const handleResumeChange = (updated: ResumeData) => {
    setResume(updated);
    portalStore.saveResume(updated);
  };

  const handleDownloadPdf = async () => {
    setIsExporting(true);
    const success = await exportElementToPdf(
      'titan-resume-a4-document',
      `${resume.personalInfo.fullName.replace(/\s+/g, '_')}_Titan_Resume.pdf`
    );
    setIsExporting(false);
    if (success) {
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-slate-800 flex">
      <Sidebar role="candidate" />

      <div className="flex-1 ml-56 md:ml-60 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
        {/* Top Header Bar */}
        <div className="bg-navy-gradient text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-400/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-amber-400 text-slate-900 font-extrabold text-[10px] uppercase rounded-full">
                Vector PDF Engine
              </span>
              <span className="text-xs text-amber-300 font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">auto_fix_high</span>
                Live Split-Screen A4 Editor
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">AI ATS Resume Builder</h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Edit sections live on the left and see real-time A4 rendering on the right with instant 1-click vector PDF generation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/resumes"
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold rounded-xl transition"
            >
              Manage Versions
            </Link>

            <button
              onClick={handleDownloadPdf}
              disabled={isExporting}
              className="btn-gold-titan text-xs py-2.5 px-6 shadow-md disabled:opacity-50"
            >
              {isExporting ? (
                <>
                  <span className="inline-block animate-spin rounded-full h-3.5 w-3.5 border-2 border-[#0b1c30] border-t-transparent" />
                  <span>Rendering PDF...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-base">download</span>
                  <span>Download A4 PDF</span>
                </>
              )}
            </button>
          </div>
        </div>

        {exportSuccess && (
          <div className="p-4 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-2xl text-xs font-bold flex items-center gap-2 animate-fade-in shadow-xs">
            <span className="material-symbols-outlined text-base text-emerald-700">check_circle</span>
            <span>Resume PDF successfully compiled and downloaded!</span>
          </div>
        )}

        {/* Split Screen 2-Column Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Form Editor */}
          <div className="xl:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                1. Edit Resume Content
              </span>
              <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 font-extrabold text-[10px] rounded-full uppercase">
                {resume.ats_score}% ATS Rating
              </span>
            </div>

            <ResumeEditor
              resume={resume}
              onChange={handleResumeChange}
            />
          </div>

          {/* Right Column: Live A4 Document Preview */}
          <div className="xl:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                2. Real-Time A4 Document Preview
              </span>
              <span className="text-[11px] text-slate-400 font-bold">
                794px × 1123px (Standard A4 Ratio)
              </span>
            </div>

            <div className="overflow-x-auto bg-slate-200/60 p-4 rounded-3xl border border-slate-300">
              <ResumeA4Preview resume={resume} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
