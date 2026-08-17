'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { portalStore } from '@/lib/store';
import { Job } from '@/lib/types';

export default function JobModerationPage() {
  const [jobs, setJobs] = useState<Job[]>(portalStore.getJobs());

  useEffect(() => {
    const unsub = portalStore.subscribe(() => {
      setJobs(portalStore.getJobs());
    });
    return () => unsub();
  }, []);

  const handleStatus = (jobId: number, status: Job['status']) => {
    portalStore.updateJobStatus(jobId, status);
  };

  const handleToggleFeatured = (jobId: number) => {
    portalStore.toggleJobFeatured(jobId);
  };

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-slate-800 flex">
      <Sidebar role="admin" />

      <div className="flex-1 ml-56 md:ml-60 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
        <div className="bg-navy-gradient text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-400/20 space-y-2">
          <span className="px-2.5 py-0.5 bg-amber-400 text-slate-900 font-extrabold text-[10px] uppercase rounded-full">
            Content Quality Control
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Job Moderation & Verification Queue</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Audit newly posted vacancies, filter scam or spam postings, and feature quality roles on the homepage.
          </p>
        </div>

        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                    job.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    Status: {job.status}
                  </span>
                  {job.is_featured && (
                    <span className="px-2.5 py-0.5 bg-amber-400 text-slate-900 rounded-full text-[10px] font-black uppercase">
                      ★ Featured on Landing
                    </span>
                  )}
                  <span className="text-xs text-slate-500 font-medium">{job.posted_by || 'Titan Recruiter'}</span>
                </div>

                <h3 className="text-base font-extrabold text-[#0b1c30]">{job.title}</h3>
                <p className="text-xs text-slate-600 font-semibold">{job.company} • {job.location} • {job.salary}</p>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{job.description}</p>
              </div>

              {/* 1-Click Moderation Actions */}
              <div className="flex flex-wrap items-center gap-2 shrink-0 self-start md:self-auto">
                <button
                  onClick={() => handleToggleFeatured(job.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                    job.is_featured
                      ? 'bg-amber-400 text-slate-900 border-amber-500 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {job.is_featured ? '★ Featured' : 'Feature on Home'}
                </button>

                <button
                  onClick={() => handleStatus(job.id, 'Active')}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
                >
                  Approve
                </button>

                <button
                  onClick={() => handleStatus(job.id, 'Flagged')}
                  className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold transition border border-rose-200"
                >
                  Flag Spam
                </button>

                <button
                  onClick={() => handleStatus(job.id, 'Closed')}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
