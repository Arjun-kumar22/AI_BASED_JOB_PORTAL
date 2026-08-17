'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import { portalStore } from '@/lib/store';
import { Job, User, Application } from '@/lib/types';

export default function AdminDashboardPage() {
  const [jobs, setJobs] = useState<Job[]>(portalStore.getJobs());
  const [applications, setApplications] = useState<Application[]>(portalStore.getApplications());
  const [auditLogs, setAuditLogs] = useState(portalStore.getAuditLogs());

  useEffect(() => {
    const unsub = portalStore.subscribe(() => {
      setJobs(portalStore.getJobs());
      setApplications(portalStore.getApplications());
      setAuditLogs(portalStore.getAuditLogs());
    });
    return () => unsub();
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-slate-800 flex">
      <Sidebar role="admin" />

      <div className="flex-1 ml-56 md:ml-60 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
        {/* Admin Governance Banner */}
        <div className="bg-navy-gradient text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-400/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-amber-400 text-slate-900 font-extrabold text-[10px] uppercase rounded-full">
                Super Admin Governance
              </span>
              <span className="text-xs text-amber-300 font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">security</span>
                Global Platform Oversight
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">System Governance & Telemetry</h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Audit employer credentials, manage feature flags, moderate job postings, and monitor platform security logs in real time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/users"
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm text-amber-400">verified_user</span>
              <span>Verification Hub</span>
            </Link>

            <Link
              href="/admin/moderation"
              className="btn-gold-titan text-xs py-2.5 px-5 shadow-md"
            >
              <span className="material-symbols-outlined text-sm">fact_check</span>
              <span>Moderation Queue</span>
            </Link>
          </div>
        </div>

        {/* 4 Governance KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Total Registered Users
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#0b1c30]">
              15,482
            </div>
            <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">trending_up</span>
              +482 this month
            </span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Verified Tech Employers
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#0b1c30]">
              450+
            </div>
            <Link href="/admin/users" className="text-[11px] text-amber-600 font-bold hover:underline">
              Review Pending (4) →
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Job Moderation Queue
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-500">
              {jobs.filter(j => j.status === 'Reviewing' || j.status === 'Active').length}
            </div>
            <Link href="/admin/moderation" className="text-[11px] text-amber-600 font-bold hover:underline">
              Moderate Queue →
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              AI Cluster Latency
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600">
              14ms
            </div>
            <span className="text-[11px] text-slate-500 font-medium">99.98% System Health</span>
          </div>
        </div>

        {/* 2-Column Section: Recent Job Submissions + System Security Audit Log */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Recent Jobs Submissions */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-sm text-[#0b1c30]">Recent Vacancy Postings</h3>
                <p className="text-xs text-slate-500">Quick moderation actions and homepage featuring</p>
              </div>
              <Link href="/admin/moderation" className="text-xs font-bold text-amber-600 hover:underline">
                Full Queue →
              </Link>
            </div>

            <div className="space-y-3">
              {jobs.slice(0, 4).map((job) => (
                <div
                  key={job.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <h4 className="font-extrabold text-xs text-slate-900">{job.title}</h4>
                    <p className="text-[11px] text-slate-500">{job.company} • {job.location}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                      job.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {job.status}
                    </span>

                    <button
                      onClick={() => portalStore.toggleJobFeatured(job.id)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition ${
                        job.is_featured
                          ? 'bg-amber-400 text-slate-900'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {job.is_featured ? '★ Featured' : 'Feature'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time System Security & Audit Log */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-sm text-[#0b1c30]">Security & Audit Stream</h3>
                <p className="text-xs text-slate-500">Live telemetry of critical system events</p>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className="space-y-2.5 max-h-[300px] overflow-y-auto">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{log.event}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{log.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-slate-600">{log.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
