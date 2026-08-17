'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BorderBeamCard from '@/components/BorderBeamCard';

export default function AdvertisePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f4f6fa] text-slate-800">
      <Navbar />

      {/* Top Banner */}
      <div className="bg-navy-gradient text-white py-14 px-4 sm:px-6 md:px-10 border-b border-amber-400/20 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="px-3 py-1 bg-amber-400 text-slate-900 font-extrabold text-[10px] uppercase rounded-full tracking-wider">
            Employer & Academy Solutions
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Institutional Recruitment & Campus Drive Plans
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Empower your technical hiring pipeline with automated ATS screening, custom candidate scorecards, and exclusive on-campus talent access.
          </p>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-10 py-16 flex-1 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Plan 1 */}
          <BorderBeamCard variant="gold">
            <div className="p-8 space-y-6 flex flex-col justify-between h-full">
              <div className="space-y-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Starter Tier</span>
                <h3 className="text-2xl font-black text-[#0b1c30]">Starter Academy</h3>
                <div className="text-3xl font-black text-[#0b1c30]">
                  $149 <span className="text-xs font-normal text-slate-500">/ month</span>
                </div>
                <p className="text-xs text-slate-500">Ideal for small engineering agencies and bootcamps.</p>
              </div>

              <ul className="space-y-3 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                  Up to 5 Sub-accounts & Recruiter Seats
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                  Standard Algorithmic ATS Job Matching
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                  Basic Analytics & Application Dashboard
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                  Standard Email Support
                </li>
              </ul>

              <Link
                href="/login"
                className="w-full btn-primary-titan text-xs py-3 text-center"
              >
                Get Started
              </Link>
            </div>
          </BorderBeamCard>

          {/* Plan 2: Pro Tier */}
          <BorderBeamCard variant="navy">
            <div className="p-8 space-y-6 flex flex-col justify-between h-full relative">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600">Growth Tier</span>
                  <span className="px-2.5 py-0.5 bg-amber-400 text-slate-900 font-black text-[9px] rounded-full uppercase">
                    Most Popular
                  </span>
                </div>
                <h3 className="text-2xl font-black text-[#0b1c30]">Professional Institute</h3>
                <div className="text-3xl font-black text-[#0b1c30]">
                  $499 <span className="text-xs font-normal text-slate-500">/ month</span>
                </div>
                <p className="text-xs text-slate-500">For scaling tech companies and regional institutes.</p>
              </div>

              <ul className="space-y-3 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                  Up to 20 Sub-accounts & Hiring Panels
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                  Interactive 6-Stage ATS Kanban Board
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                  AI Auto-Fill Job Description Writer
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                  Integrated Interview Video Hub & Calendar
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                  Official &quot;✓ Verified Employer&quot; Trust Badge
                </li>
              </ul>

              <Link
                href="/login"
                className="w-full btn-gold-titan text-xs py-3 text-center shadow-md"
              >
                Launch Professional Plan
              </Link>
            </div>
          </BorderBeamCard>

          {/* Plan 3: Enterprise */}
          <BorderBeamCard variant="gold">
            <div className="p-8 space-y-6 flex flex-col justify-between h-full">
              <div className="space-y-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Enterprise Tier</span>
                <h3 className="text-2xl font-black text-[#0b1c30]">Global Enterprise</h3>
                <div className="text-3xl font-black text-[#0b1c30]">
                  $1,299 <span className="text-xs font-normal text-slate-500">/ month</span>
                </div>
                <p className="text-xs text-slate-500">Full-scale organizational control and custom RAG databases.</p>
              </div>

              <ul className="space-y-3 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                  Unlimited Sub-accounts & Candidates
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                  Custom AI ATS Evaluation Parameters
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                  Dedicated Campus Drives & RAG Manager
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                  24/7 Dedicated Account Director
                </li>
              </ul>

              <Link
                href="/login"
                className="w-full btn-primary-titan text-xs py-3 text-center"
              >
                Contact Enterprise
              </Link>
            </div>
          </BorderBeamCard>
        </div>
      </div>

      <Footer />
    </div>
  );
}
