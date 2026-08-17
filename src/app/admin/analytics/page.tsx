'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { portalStore } from '@/lib/store';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from 'recharts';

export default function AdminAnalyticsPage() {
  const [auditLogs, setAuditLogs] = useState(portalStore.getAuditLogs());

  useEffect(() => {
    const unsub = portalStore.subscribe(() => {
      setAuditLogs(portalStore.getAuditLogs());
    });
    return () => unsub();
  }, []);

  const growthData = [
    { month: 'May', candidates: 1200, recruiters: 40 },
    { month: 'Jun', candidates: 2400, recruiters: 85 },
    { month: 'Jul', candidates: 4800, recruiters: 140 },
    { month: 'Aug', candidates: 7500, recruiters: 220 },
    { month: 'Sep', candidates: 11200, recruiters: 340 },
    { month: 'Oct', candidates: 15482, recruiters: 450 }
  ];

  const throughputData = [
    { category: 'AI & Data', applications: 4820 },
    { category: 'Full-Stack Eng', applications: 7890 },
    { category: 'Cloud / DevOps', applications: 3450 },
    { category: 'Product & UX', applications: 2940 },
    { category: 'Cybersecurity', applications: 1200 }
  ];

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-slate-800 flex">
      <Sidebar role="admin" />

      <div className="flex-1 ml-56 md:ml-60 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
        <div className="bg-navy-gradient text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-400/20 space-y-2">
          <span className="px-2.5 py-0.5 bg-amber-400 text-slate-900 font-extrabold text-[10px] uppercase rounded-full">
            Platform Telemetry
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Platform Growth & Telemetry Analytics</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Real-time analytics covering candidate signups, employer acquisition curves, and application volume throughput.
          </p>
        </div>

        {/* 2 Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Chart 1: Candidate vs Recruiter Signups */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="space-y-1">
              <h3 className="font-extrabold text-sm text-[#0b1c30]">Monthly User Acquisition Curve</h3>
              <p className="text-xs text-slate-500">Candidate Job Seekers vs Tech Employers</p>
            </div>

            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fontWeight: 700 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0b1c30', borderRadius: '12px', border: '1px solid #fbbf24', color: '#fff', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Area type="monotone" dataKey="candidates" name="Candidates" stroke="#1d3989" fill="#dbeafe" strokeWidth={2.5} />
                  <Area type="monotone" dataKey="recruiters" name="Employers" stroke="#f59e0b" fill="#fef3c7" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Throughput By Domain */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="space-y-1">
              <h3 className="font-extrabold text-sm text-[#0b1c30]">Application Volume Throughput</h3>
              <p className="text-xs text-slate-500">Total job applications processed by category domain</p>
            </div>

            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={throughputData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="category" tick={{ fontSize: 10, fontWeight: 700 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0b1c30', borderRadius: '12px', border: '1px solid #fbbf24', color: '#fff', fontSize: '12px' }}
                  />
                  <Bar dataKey="applications" fill="#0b1c30" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Security & Webhook Audit Log */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-sm text-[#0b1c30]">Live Webhook & Security Audit Stream</h3>
              <p className="text-xs text-slate-500">Real-time system telemetry and authorization event tracking</p>
            </div>
            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase rounded-full">
              SSL / TLS 1.3 Active
            </span>
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <strong className="text-slate-900 mr-2">{log.event}</strong>
                  <span className="text-slate-600">{log.details}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 shrink-0">{log.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
