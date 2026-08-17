'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import { portalStore } from '@/lib/store';
import { Application } from '@/lib/types';

export default function CandidateTrackingPage() {
  const [applications, setApplications] = useState<Application[]>(portalStore.getApplications());

  useEffect(() => {
    const unsub = portalStore.subscribe(() => {
      setApplications(portalStore.getApplications());
    });
    return () => unsub();
  }, []);

  const stages = [
    { name: 'Applied', icon: 'send' },
    { name: 'Screening', icon: 'visibility' },
    { name: 'Technical Interview', icon: 'code' },
    { name: 'Final Round', icon: 'groups' },
    { name: 'Offer Extended', icon: 'card_giftcard' },
    { name: 'Hired', icon: 'verified' }
  ];

  const getStageIndex = (status: string) => {
    return stages.findIndex(s => s.name === status);
  };

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-slate-800 flex">
      <Sidebar role="candidate" />

      <div className="flex-1 ml-56 md:ml-60 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
        <div className="bg-navy-gradient text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-400/20 space-y-2">
          <span className="px-2.5 py-0.5 bg-amber-400 text-slate-900 font-extrabold text-[10px] uppercase rounded-full">
            Real-Time Pipeline
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Application Tracking & Timelines</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Track your progress across every recruiter interview stage in real time.
          </p>
        </div>

        {/* Applications Progression List */}
        <div className="space-y-6">
          {applications.map((app) => {
            const currentStageIndex = getStageIndex(app.status);

            return (
              <div key={app.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-base sm:text-lg font-black text-[#0b1c30]">{app.job_title}</h2>
                    <p className="text-xs text-slate-500 font-bold">{app.company} • Applied {app.applied_date}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-black uppercase">
                      Current: {app.status}
                    </span>
                    <span className="px-2.5 py-1 bg-slate-900 text-amber-400 rounded-xl text-xs font-black">
                      {app.ats_score}% ATS
                    </span>
                  </div>
                </div>

                {/* 6-Stage Visual Stepper */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {stages.map((stage, idx) => {
                    const isCompleted = idx < currentStageIndex;
                    const isCurrent = idx === currentStageIndex;

                    return (
                      <div
                        key={stage.name}
                        className={`p-3.5 rounded-2xl border flex flex-col items-center justify-center text-center space-y-1.5 transition-all ${
                          isCurrent
                            ? 'bg-navy-gradient text-white border-[#0b1c30] shadow-md ring-2 ring-amber-400/40'
                            : isCompleted
                            ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                            : 'bg-slate-50 text-slate-400 border-slate-200'
                        }`}
                      >
                        <span className={`material-symbols-outlined text-lg ${isCurrent ? 'text-amber-400' : isCompleted ? 'text-emerald-600' : 'text-slate-400'}`}>
                          {isCompleted ? 'check_circle' : stage.icon}
                        </span>
                        <span className="text-[11px] font-bold leading-tight">{stage.name}</span>
                        <span className="text-[9px] font-bold uppercase opacity-80">
                          {isCompleted ? 'Done' : isCurrent ? 'Active' : 'Pending'}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Recruiter Notes snippet if available */}
                {app.recruiter_notes && (
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
                    <span className="material-symbols-outlined text-amber-500 text-base shrink-0 mt-0.5">feedback</span>
                    <div>
                      <strong className="text-slate-900 block mb-0.5">Recruiter Panel Feedback:</strong>
                      <span>{app.recruiter_notes}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
