'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid
} from 'recharts';

export default function SeekerAnalyticsPage() {
  const applicationFunnelData = [
    { stage: 'Applications Sent', count: 24, fill: '#0b1c30' },
    { stage: 'Profiles Reviewed', count: 18, fill: '#1d3989' },
    { stage: 'Technical Rounds', count: 8, fill: '#38bdf8' },
    { stage: 'Executive Finals', count: 4, fill: '#fbbf24' },
    { stage: 'Offers Extended', count: 2, fill: '#10b981' },
  ];

  const compensationDemandData = [
    { skill: 'Next.js 14/15', demandIndex: 96, avgSalary: 165 },
    { skill: 'Python FastAPI', demandIndex: 92, avgSalary: 155 },
    { skill: 'PyTorch & LLMs', demandIndex: 98, avgSalary: 185 },
    { skill: 'Docker & AWS', demandIndex: 88, avgSalary: 150 },
    { skill: 'System Design', demandIndex: 94, avgSalary: 175 },
    { skill: 'PostgreSQL', demandIndex: 84, avgSalary: 140 },
  ];

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-slate-800 flex">
      <Sidebar role="candidate" />

      <div className="flex-1 ml-56 md:ml-60 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
        <div className="bg-navy-gradient text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-400/20 space-y-2">
          <span className="px-2.5 py-0.5 bg-amber-400 text-slate-900 font-extrabold text-[10px] uppercase rounded-full">
            Yield Telemetry
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Application Yield & Market Funnel</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Interactive Recharts telemetry evaluating your candidate interview conversion rates and skill compensation indices.
          </p>
        </div>

        {/* 2-Column Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Chart 1: Application Funnel */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="space-y-1">
              <h3 className="font-extrabold text-sm text-[#0b1c30]">Application Conversion Funnel</h3>
              <p className="text-xs text-slate-500">Progression from initial submission to final compensation offer</p>
            </div>

            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={applicationFunnelData} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="stage" type="category" width={120} tick={{ fontSize: 11, fontWeight: 700 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0b1c30', borderRadius: '12px', border: '1px solid #fbbf24', color: '#fff', fontSize: '12px' }}
                  />
                  <Bar dataKey="count" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Skill Demand Multiplier */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="space-y-1">
              <h3 className="font-extrabold text-sm text-[#0b1c30]">In-Demand Skills & Compensation Index</h3>
              <p className="text-xs text-slate-500">Average tech market salary ($k/yr) plotted by skill demand</p>
            </div>

            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={compensationDemandData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="skill" tick={{ fontSize: 10, fontWeight: 700 }} />
                  <YAxis tick={{ fontSize: 11 }} domain={[100, 200]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0b1c30', borderRadius: '12px', border: '1px solid #fbbf24', color: '#fff', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="avgSalary" stroke="#1d3989" fill="#e0e7ff" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
