'use client';

import React from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import KanbanBoard from '@/components/KanbanBoard';

export default function RecruiterPipelinePage() {
  return (
    <div className="min-h-screen bg-[#f4f6fa] text-slate-800 flex">
      <Sidebar role="employer" />

      <div className="flex-1 ml-56 md:ml-60 p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px]">
        {/* Top Header */}
        <div className="bg-navy-gradient text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-400/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-amber-400 text-slate-900 font-extrabold text-[10px] uppercase rounded-full">
                6-Stage Pipeline
              </span>
              <span className="text-xs text-amber-300 font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">view_kanban</span>
                Applicant Tracking System (ATS)
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Interactive Recruitment Pipeline</h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Advance candidates from Applied → Screening → Technical Round → Final Round → Offer Extended → Hired with 1-click stage advancement and candidate scorecards.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/recruiter/interviews"
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm text-amber-400">videocam</span>
              <span>Schedule Interviews</span>
            </Link>

            <Link
              href="/recruiter/jobs/new"
              className="btn-gold-titan text-xs py-2.5 px-5 shadow-md"
            >
              <span className="material-symbols-outlined text-sm">add_circle</span>
              <span>Post Job</span>
            </Link>
          </div>
        </div>

        {/* 6-Column Interactive ATS Kanban Board */}
        <KanbanBoard />
      </div>
    </div>
  );
}
