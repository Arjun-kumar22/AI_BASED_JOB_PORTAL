'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';

export default function AdminHelpPage() {
  const docs = [
    { title: 'ATS Scoring Algorithm Technical Spec', desc: 'Detailed breakdown of keyword matching weights, impact metrics formulas, and formatting score metrics.', icon: 'description' },
    { title: 'Employer Verification & Audit Protocol', desc: 'Compliance guidelines for auditing corporate DNS records, business registrations, and granting verified status.', icon: 'verified_user' },
    { title: 'RAG Knowledge Ingestion Guidelines', desc: 'Standard operating procedures for authoring campus notices and synchronizing vector embeddings.', icon: 'library_books' },
    { title: 'Interview Room Webhook Integration', desc: 'Guide to configuring automated video dispatching via Google Meet and Zoom APIs.', icon: 'videocam' }
  ];

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-slate-800 flex">
      <Sidebar role="admin" />

      <div className="flex-1 ml-56 md:ml-60 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
        <div className="bg-navy-gradient text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-400/20 space-y-2">
          <span className="px-2.5 py-0.5 bg-amber-400 text-slate-900 font-extrabold text-[10px] uppercase rounded-full">
            Knowledge & Governance Docs
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Help Desk & Platform Governance Handbook</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Institutional documentation, algorithmic ATS guidelines, and administrator support manuals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {docs.map((d) => (
            <div key={d.title} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-navy-gradient text-amber-400 flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-xl">{d.icon}</span>
              </div>
              <h3 className="text-base font-extrabold text-[#0b1c30]">{d.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">{d.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-2">
          <h3 className="font-extrabold text-sm text-[#0b1c30]">Institutional Contact & SRE Escalation</h3>
          <p className="text-xs text-slate-600">
            For critical server anomalies or institutional billing support, contact <strong>governance@titan.edu</strong> or call the 24/7 SRE hotline at <strong>+44 (0) 161 800 TITAN</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
