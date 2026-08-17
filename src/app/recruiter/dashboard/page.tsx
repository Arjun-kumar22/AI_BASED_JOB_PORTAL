'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Sidebar from '@/components/Sidebar';
import { portalStore } from '@/lib/store';
import { Job, Application, User } from '@/lib/types';

export default function RecruiterDashboardPage() {
  const [jobs, setJobs] = useState<Job[]>(portalStore.getJobs());
  const [applications, setApplications] = useState<Application[]>(portalStore.getApplications());
  const [user, setUser] = useState<User | null>(portalStore.getUser());

  useEffect(() => {
    const unsub = portalStore.subscribe(() => {
      setJobs(portalStore.getJobs());
      setApplications(portalStore.getApplications());
      setUser(portalStore.getUser());
    });
    return () => unsub();
  }, []);

  const totalApplicants = applications.length || 148;
  const interviewingCount = applications.filter(a => a.status === 'Technical Interview' || a.status === 'Screening').length || 8;
  const offersCount = applications.filter(a => a.status === 'Offer Extended' || a.status === 'Hired').length || 3;

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-slate-800 flex">
      <Sidebar role="employer" />

      <div className="flex-1 ml-56 md:ml-60 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
        {/* Recruiter Top Card */}
        <div className="bg-navy-gradient text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-400/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-amber-400 text-slate-900 font-extrabold text-[10px] uppercase rounded-full">
                Recruiter Command Center
              </span>
              <span className="text-xs text-amber-300 font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">business_center</span>
                {user?.companyName || 'Titan Technology Group'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Hiring & Talent Acquisition</h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Manage active listings, review algorithmic ATS candidate rankings, and advance applicants through the 6-stage Kanban pipeline.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/recruiter/pipeline"
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm text-amber-400">view_kanban</span>
              <span>Open ATS Kanban</span>
            </Link>

            <Link
              href="/recruiter/jobs/new"
              className="btn-gold-titan text-xs py-2.5 px-5 shadow-md"
            >
              <span className="material-symbols-outlined text-sm">add_circle</span>
              <span>Post a New Job</span>
            </Link>
          </div>
        </div>

        {/* 4 KPI Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Active Job Openings
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#0b1c30]">
              {jobs.length}
            </div>
            <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">check_circle</span>
              All Verified & Live
            </span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Total Candidates
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#0b1c30]">
              {totalApplicants}
            </div>
            <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">trending_up</span>
              +14% this week
            </span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Active Interviews
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-500">
              {interviewingCount}
            </div>
            <Link href="/recruiter/interviews" className="text-[11px] text-amber-600 font-bold hover:underline">
              View Schedule →
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Offers & Hires
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600">
              {offersCount}
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Avg Time-to-Hire: 14d</span>
          </div>
        </div>

        {/* 2-Column Section: Active Listings Table + Top AI Talent Stream */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Active Job Postings Table */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-sm text-[#0b1c30]">Active Job Postings</h3>
                <p className="text-xs text-slate-500">Manage vacancies and view applicant throughput</p>
              </div>
              <Link href="/recruiter/jobs/new" className="text-xs font-bold text-amber-600 hover:underline">
                + Post Job
              </Link>
            </div>

            <div className="space-y-3">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-xs text-slate-900">{job.title}</h4>
                      <span className="px-2 py-0.2 bg-emerald-100 text-emerald-800 text-[9px] font-black rounded uppercase">
                        {job.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">{job.location} • {job.salary}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 bg-white border border-slate-200 text-slate-800 rounded-lg text-xs font-bold">
                      {job.applicants} Applicants
                    </span>

                    <Link
                      href="/recruiter/pipeline"
                      className="px-3 py-1.5 bg-navy-gradient text-white text-xs font-bold rounded-xl"
                    >
                      View Kanban
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top AI-Matched Talent Stream */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-sm text-[#0b1c30]">Top AI-Matched Talent</h3>
                <p className="text-xs text-slate-500">Ranked by ATS percentage match</p>
              </div>
              <Link href="/recruiter/pipeline" className="text-xs font-bold text-amber-600 hover:underline">
                Pipeline →
              </Link>
            </div>

            <div className="space-y-3">
              {applications.slice(0, 4).map((app) => (
                <div
                  key={app.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 truncate">
                    <div className="w-8 h-8 rounded-full overflow-hidden relative border border-slate-200 shrink-0 bg-slate-900 text-amber-400 font-bold text-xs flex items-center justify-center">
                      {app.candidate_name.charAt(0)}
                    </div>
                    <div className="truncate">
                      <h4 className="font-bold text-xs text-slate-900 truncate">{app.candidate_name}</h4>
                      <p className="text-[10px] text-slate-500 truncate">{app.job_title}</p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 bg-amber-400 text-slate-900 font-black text-xs rounded-xl shrink-0">
                    {app.ats_score}% Fit
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
