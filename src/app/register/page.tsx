'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { portalStore } from '@/lib/store';

export default function RegisterPage() {
  const router = useRouter();

  const handleSelectRole = (role: 'candidate' | 'employer') => {
    router.push(`/login?mode=signup&role=${role}`);
  };

  return (
    <div className="min-h-screen bg-navy-deep-gradient text-white flex flex-col justify-between p-6 sm:p-10">
      <div className="max-w-[1200px] mx-auto w-full flex items-center justify-between pb-6 border-b border-slate-700/60">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/titan-official-logo.png"
            alt="TITAN Emblem"
            width={40}
            height={40}
            className="object-contain"
          />
          <div className="leading-tight">
            <span className="font-extrabold text-sm text-white block">Taj Institute of Technology &</span>
            <span className="font-bold text-xs text-amber-300 block">Applied Networks (TITAN)</span>
          </div>
        </Link>
        <Link href="/login" className="text-xs font-bold text-amber-300 hover:underline">
          Existing User? Sign In →
        </Link>
      </div>

      <div className="max-w-4xl mx-auto w-full my-auto py-12 text-center space-y-8">
        <div className="space-y-3">
          <span className="px-3.5 py-1 bg-amber-400/20 text-amber-300 text-[10px] font-extrabold rounded-full uppercase tracking-wider">
            Join the Ecosystem
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Select Your Titans Portal Role
          </h1>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Choose how you would like to interact with the platform. Each role unlocks dedicated intelligence tools and pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-3xl mx-auto">
          {/* Candidate Card */}
          <div
            onClick={() => handleSelectRole('candidate')}
            className="bg-white/10 hover:bg-white/15 border border-white/20 hover:border-amber-400 p-8 rounded-3xl cursor-pointer transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between space-y-6 group backdrop-blur-md shadow-xl"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center font-black text-2xl shadow-md group-hover:scale-110 transition-transform">
                👤
              </div>
              <h3 className="text-xl font-extrabold text-white">Job Seeker / Candidate</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Build ATS-optimized resumes with real A4 PDF export, practice 24/7 STAR mock interviews, and submit 1-click tailored job applications.
              </p>
            </div>
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-amber-300">
              <span>Start as Candidate</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </div>
          </div>

          {/* Recruiter Card */}
          <div
            onClick={() => handleSelectRole('employer')}
            className="bg-white/10 hover:bg-white/15 border border-white/20 hover:border-amber-400 p-8 rounded-3xl cursor-pointer transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between space-y-6 group backdrop-blur-md shadow-xl"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-sky-400 text-slate-900 flex items-center justify-center font-black text-2xl shadow-md group-hover:scale-110 transition-transform">
                🏢
              </div>
              <h3 className="text-xl font-extrabold text-white">Recruiter / Employer</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Generate AI job descriptions with 1-click, manage candidates across an interactive 6-stage Kanban board, and dispatch video interview slots.
              </p>
            </div>
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-sky-300">
              <span>Start as Recruiter</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-slate-400 pt-6">
        © 2026 Taj Institute of Technology & Applied Networks (TITAN). All rights reserved.
      </div>
    </div>
  );
}
