'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import { portalStore } from '@/lib/store';
import { SavedJob } from '@/lib/types';

export default function SavedJobsPage() {
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>(portalStore.getSavedJobs());

  useEffect(() => {
    const unsub = portalStore.subscribe(() => {
      setSavedJobs(portalStore.getSavedJobs());
    });
    return () => unsub();
  }, []);

  const handleRemove = (jobId: number | string) => {
    portalStore.toggleSaveJob(jobId);
  };

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-slate-800 flex">
      <Sidebar role="candidate" />

      <div className="flex-1 ml-56 md:ml-60 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
        <div className="bg-navy-gradient text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-400/20 space-y-2">
          <span className="px-2.5 py-0.5 bg-amber-400 text-slate-900 font-extrabold text-[10px] uppercase rounded-full">
            Bookmark Vault
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Saved Job Bookmarks</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Easily review bookmarked technical positions and submit 1-click tailored applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">{job.saved_date}</span>
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-900 font-extrabold text-[10px] rounded uppercase">
                    {job.match_score}% ATS Fit
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-[#0b1c30]">
                  <Link href={`/jobs/${job.job_id}`} className="hover:text-[#1d3989] transition">
                    {job.title}
                  </Link>
                </h3>
                <p className="text-xs text-slate-600 font-semibold">{job.company} • {job.location}</p>
                <p className="text-xs font-black text-[#0b1c30] pt-1">{job.salary}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => handleRemove(job.job_id)}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">bookmark_remove</span>
                  <span>Remove Bookmark</span>
                </button>

                <Link
                  href={`/jobs/${job.job_id}`}
                  className="btn-primary-titan text-xs py-1.5 px-4"
                >
                  View & Apply
                </Link>
              </div>
            </div>
          ))}

          {savedJobs.length === 0 && (
            <div className="col-span-2 p-12 bg-white rounded-3xl border border-slate-200 text-center space-y-3">
              <span className="material-symbols-outlined text-4xl text-slate-400">bookmark_border</span>
              <h3 className="text-sm font-bold text-slate-700">No saved jobs yet</h3>
              <p className="text-xs text-slate-500">Explore open vacancies and bookmark positions to review later.</p>
              <Link href="/jobs" className="inline-block btn-primary-titan text-xs py-2 px-4 mt-2">
                Browse Jobs
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
