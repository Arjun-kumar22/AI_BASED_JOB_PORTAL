'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';

export default function AdminServerPage() {
  const clusters = [
    {
      name: 'Next.js & React Core Node (Zurich HQ)',
      tag: 'ONLINE',
      tag_class: 'bg-emerald-100 text-emerald-800 border border-emerald-300',
      latency: '12ms',
      uptime: '99.99%',
      load: '0.24'
    },
    {
      name: 'RAG Knowledge & Vector Cache (Primary)',
      tag: 'HEALTHY',
      tag_class: 'bg-blue-100 text-blue-800 border border-blue-300',
      latency: '18ms',
      uptime: '99.98%',
      load: '0.38'
    },
    {
      name: 'CDN & Media Storage (Singapore Edge)',
      tag: 'OPTIMAL',
      tag_class: 'bg-indigo-100 text-indigo-800 border border-indigo-300',
      latency: '24ms',
      uptime: '100%',
      load: '0.15'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-slate-800 flex">
      <Sidebar role="admin" />

      <div className="flex-1 ml-56 md:ml-60 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
        <div className="bg-navy-gradient text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-400/20 space-y-2">
          <span className="px-2.5 py-0.5 bg-amber-400 text-slate-900 font-extrabold text-[10px] uppercase rounded-full">
            Infrastructure SRE
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Server Cluster Health & Telemetry</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Real-time status monitoring for high-availability Next.js deployment clusters and database replication nodes.
          </p>
        </div>

        {/* 3 Clusters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {clusters.map((c) => (
            <div key={c.name} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${c.tag_class}`}>
                  {c.tag}
                </span>
                <span className="text-xs font-mono font-bold text-slate-500">{c.latency}</span>
              </div>

              <h3 className="text-sm font-black text-[#0b1c30]">{c.name}</h3>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1 text-slate-600">
                <div className="flex justify-between">
                  <span>Uptime:</span>
                  <strong className="text-slate-900">{c.uptime}</strong>
                </div>
                <div className="flex justify-between">
                  <span>System Load:</span>
                  <strong className="text-slate-900">{c.load}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Live Diagnostics */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 font-sans">
            <h3 className="font-extrabold text-sm text-[#0b1c30]">Live Kernel & Node Logs</h3>
            <span className="text-[11px] text-emerald-600 font-bold">0 Anomalies Detected</span>
          </div>

          <div className="p-4 bg-slate-900 text-emerald-400 rounded-2xl space-y-1.5 leading-relaxed text-[11px]">
            <p>[SYSTEM] 16:32:01 INFO - Next.js 14 App Router production bundle compiled successfully</p>
            <p>[DATABASE] 16:32:05 INFO - SQLite reactive store pool healthy (0.8ms query response)</p>
            <p>[RAG TELEMETRY] 16:32:12 INFO - Groq Llama-3.3-70B model active (Fallback RAG Engine Ready)</p>
            <p>[SECURITY] 16:32:18 SUCCESS - SSL / TLS 1.3 Encryption active - 0 security anomalies detected</p>
          </div>
        </div>
      </div>
    </div>
  );
}
