'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import { portalStore } from '@/lib/store';
import { InterviewSession } from '@/lib/types';

export default function CandidateInterviewsPage() {
  const [interviews, setInterviews] = useState<InterviewSession[]>(portalStore.getInterviews());

  useEffect(() => {
    const unsub = portalStore.subscribe(() => {
      setInterviews(portalStore.getInterviews());
    });
    return () => unsub();
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-slate-800 flex">
      <Sidebar role="candidate" />

      <div className="flex-1 ml-56 md:ml-60 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
        <div className="bg-navy-gradient text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-400/20 space-y-2">
          <span className="px-2.5 py-0.5 bg-amber-400 text-slate-900 font-extrabold text-[10px] uppercase rounded-full">
            Video Hub
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Scheduled Video Interviews</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Access direct video meeting links and format requirements for upcoming panel rounds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {interviews.map((iv) => (
            <div
              key={iv.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-[10px] font-black uppercase">
                    {iv.format} Round
                  </span>
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-extrabold">
                    {iv.status}
                  </span>
                </div>

                <h3 className="text-lg font-black text-[#0b1c30]">{iv.job_title}</h3>
                <p className="text-xs text-slate-600 font-semibold">{iv.company}</p>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-slate-700">
                    <span className="material-symbols-outlined text-amber-500 text-base">calendar_month</span>
                    <strong className="text-slate-900">{iv.date}</strong>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <span className="material-symbols-outlined text-sky-500 text-base">schedule</span>
                    <span>{iv.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <span className="material-symbols-outlined text-purple-500 text-base">group</span>
                    <span>Interviewer: {iv.interviewer}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={iv.meeting_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex-1 btn-primary-titan text-xs py-2.5 justify-center shadow-sm"
                >
                  <span className="material-symbols-outlined text-base text-amber-400">videocam</span>
                  <span>Join Video Room</span>
                </a>

                <Link
                  href="/ai-coach"
                  className="w-full sm:w-auto px-4 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold rounded-xl border border-amber-200 transition text-center"
                >
                  Practice Mock Qs
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
