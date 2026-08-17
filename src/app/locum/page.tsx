'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { portalStore } from '@/lib/store';
import { LocumRole } from '@/lib/types';

export default function LocumPage() {
  const [locums] = useState<LocumRole[]>(portalStore.getLocums());
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedId, setAppliedId] = useState<number | null>(null);

  const filteredLocums = locums.filter((locum) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        locum.title.toLowerCase().includes(q) ||
        locum.company.toLowerCase().includes(q) ||
        locum.skills.some((s) => s.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleApply = (id: number) => {
    setAppliedId(id);
    setTimeout(() => {
      setAppliedId(null);
    }, 2500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f6fa] text-slate-800">
      <Navbar />

      {/* Top Banner */}
      <div className="bg-navy-gradient text-white py-12 px-4 sm:px-6 md:px-10 border-b border-amber-400/20">
        <div className="max-w-[1500px] mx-auto space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-amber-400 text-slate-900 font-extrabold text-[10px] uppercase rounded-full">
              Locum & Contract Talent
            </span>
            <span className="text-xs text-amber-300 font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">bolt</span>
              High-Velocity Short Term Contracts
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Locum & Specialized Technical Contracts
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Short-term, high-impact consulting engagements for Cloud Architects, Incident Response Leads, and AI Researchers.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-10 py-10 flex-1 space-y-6">
        {/* Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center gap-3">
          <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 w-full">
            <span className="material-symbols-outlined text-amber-500 text-xl">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search locum contracts by role, domain, or skills..."
              className="w-full bg-transparent text-xs font-semibold outline-none text-slate-800"
            />
          </div>

          <button
            onClick={() => setSearchQuery('')}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
          >
            Clear Filter
          </button>
        </div>

        {/* Locums Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredLocums.map((locum) => (
            <div
              key={locum.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-lg hover:border-amber-400 transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                    locum.is_urgent ? 'bg-rose-100 text-rose-800 animate-pulse' : 'bg-amber-100 text-amber-900'
                  }`}>
                    {locum.badge}
                  </span>
                  <span className="text-xs font-extrabold text-[#1d3989] bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200">
                    {locum.rate}
                  </span>
                </div>

                <h3 className="text-lg font-black text-[#0b1c30]">{locum.title}</h3>
                <p className="text-xs text-slate-600 font-semibold">
                  {locum.company} • {locum.location} • Duration: <strong>{locum.duration}</strong>
                </p>

                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  {locum.description}
                </p>
              </div>

              {/* Skills */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="flex flex-wrap gap-1.5">
                  {locum.skills.map((sk) => (
                    <span
                      key={sk}
                      className="px-2.5 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-bold rounded-md"
                    >
                      ⚡ {sk}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-500 font-bold">
                    {locum.apps_count} Contract Applicants
                  </span>

                  {appliedId === locum.id ? (
                    <span className="px-4 py-2 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">check_circle</span>
                      Locum Interest Registered!
                    </span>
                  ) : (
                    <button
                      onClick={() => handleApply(locum.id)}
                      className="btn-gold-titan text-xs py-2 px-5 shadow-sm"
                    >
                      <span>1-Click Apply</span>
                      <span className="material-symbols-outlined text-sm">bolt</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
