'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import { portalStore } from '@/lib/store';
import { ResumeData } from '@/lib/types';
import { exportElementToPdf } from '@/lib/pdfExport';

export default function ResumesPage() {
  const [resumes, setResumes] = useState<ResumeData[]>(portalStore.getResumes());

  useEffect(() => {
    const unsub = portalStore.subscribe(() => {
      setResumes(portalStore.getResumes());
    });
    return () => unsub();
  }, []);

  const handleDuplicate = (id: number | string) => {
    portalStore.duplicateResume(id);
  };

  const handleDelete = (id: number | string) => {
    portalStore.deleteResume(id);
  };

  const handleSetPrimary = (id: number | string) => {
    portalStore.setPrimaryResume(id);
  };

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-slate-800 flex">
      <Sidebar role="candidate" />

      <div className="flex-1 ml-56 md:ml-60 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
        {/* Top Header */}
        <div className="bg-navy-gradient text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-400/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-amber-400 text-slate-900 font-extrabold text-[10px] uppercase rounded-full">
                Version Control
              </span>
              <span className="text-xs text-amber-300 font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                {resumes.length} Targeted Resumes
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Multi-Version Resume Manager</h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Maintain distinct targeted resume versions tailored for specific roles with individual ATS compatibility scores.
            </p>
          </div>

          <Link
            href="/resume-builder"
            className="btn-gold-titan text-xs py-2.5 px-6 shadow-md"
          >
            <span className="material-symbols-outlined text-base">add</span>
            <span>Create New Version</span>
          </Link>
        </div>

        {/* Resumes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resumes.map((r) => (
            <div
              key={r.id}
              className={`bg-white rounded-3xl p-6 border shadow-xs space-y-4 flex flex-col justify-between transition-all ${
                r.is_primary ? 'border-amber-400 ring-2 ring-amber-400/20' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-navy-gradient text-amber-400 flex items-center justify-center font-bold text-sm">
                      📄
                    </span>
                    <div>
                      <h3 className="font-extrabold text-sm text-[#0b1c30]">{r.versionName}</h3>
                      <p className="text-[11px] text-slate-500 font-medium">{r.filename} • {r.filesize}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-black text-[#0b1c30]">{r.ats_score}%</span>
                    <span className="text-[9px] font-extrabold uppercase text-amber-600 block">ATS Score</span>
                  </div>
                </div>

                {r.is_primary && (
                  <span className="inline-block px-2.5 py-0.5 bg-amber-100 text-amber-900 font-extrabold text-[10px] uppercase rounded-full">
                    ⭐ Primary Default Resume
                  </span>
                )}

                {/* Parsed Skills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {r.parsed_skills.map((sk) => (
                    <span
                      key={sk}
                      className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-bold rounded-md"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                {!r.is_primary ? (
                  <button
                    onClick={() => handleSetPrimary(r.id)}
                    className="text-xs font-bold text-amber-600 hover:text-amber-700"
                  >
                    Set as Primary
                  </button>
                ) : <div />}

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDuplicate(r.id)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition flex items-center gap-1"
                    title="Duplicate Resume Version"
                  >
                    <span className="material-symbols-outlined text-sm">content_copy</span>
                    <span>Clone</span>
                  </button>

                  <Link
                    href="/resume-builder"
                    className="btn-primary-titan text-xs py-1.5 px-3.5"
                  >
                    <span>Edit Live</span>
                  </Link>

                  {resumes.length > 1 && (
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition"
                      title="Delete Version"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
