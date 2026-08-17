'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';

export default function AdminTrafficPage() {
  const sources = [
    { source: 'Direct & Campus Network', visits: '124,500', share: '45%' },
    { source: 'Organic Search (Next.js & AI Careers)', visits: '82,400', share: '30%' },
    { source: 'Referral & Verified Tech Employers', visits: '48,200', share: '18%' },
    { source: 'Social & Technical Communities', visits: '19,300', share: '7%' }
  ];

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-slate-800 flex">
      <Sidebar role="admin" />

      <div className="flex-1 ml-56 md:ml-60 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
        <div className="bg-navy-gradient text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-400/20 space-y-2">
          <span className="px-2.5 py-0.5 bg-amber-400 text-slate-900 font-extrabold text-[10px] uppercase rounded-full">
            Network Telemetry
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Platform Traffic & Acquisition Analytics</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Real-time tracking of visitor acquisition channels, search indexing volume, and candidate conversion rates.
          </p>
        </div>

        {/* 4 Traffic Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-slate-400">Total Visits (Monthly)</span>
            <div className="text-2xl sm:text-3xl font-black text-[#0b1c30]">274.4k</div>
            <span className="text-[11px] text-emerald-600 font-bold">+24% vs last month</span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-slate-400">Avg Session Duration</span>
            <div className="text-2xl sm:text-3xl font-black text-amber-500">6m 42s</div>
            <span className="text-[11px] text-slate-500 font-medium">High Candidate Engagement</span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-slate-400">Application Conversion</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600">8.4%</div>
            <span className="text-[11px] text-slate-500">Benchmark: 4.2%</span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-slate-400">Bounce Rate</span>
            <div className="text-2xl sm:text-3xl font-black text-[#0b1c30]">21.8%</div>
            <span className="text-[11px] text-emerald-600 font-bold">Optimal Retention</span>
          </div>
        </div>

        {/* Sources Breakdown */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-extrabold text-sm text-[#0b1c30]">Acquisition Channels Breakdown</h3>

          <div className="space-y-3">
            {sources.map((s) => (
              <div key={s.source} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">{s.source}</span>
                <div className="flex items-center gap-4">
                  <span className="text-slate-600 font-semibold">{s.visits} Unique Visits</span>
                  <span className="px-2.5 py-1 bg-navy-gradient text-amber-400 font-black rounded-lg text-[10px]">
                    {s.share}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
