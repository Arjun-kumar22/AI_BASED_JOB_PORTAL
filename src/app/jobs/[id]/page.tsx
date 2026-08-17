'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { portalStore } from '@/lib/store';
import { Job, ResumeData } from '@/lib/types';
import { generateTailoredCoverLetter } from '@/lib/groqClient';

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = Number(params?.id) || 101;
  const job = portalStore.getJobById(jobId) || portalStore.getJobs()[0];
  const resumes = portalStore.getResumes();
  const user = portalStore.getUser();

  const [selectedResumeVersion, setSelectedResumeVersion] = useState<string>(resumes[0]?.versionName || 'Primary Resume');
  const [selectedTone, setSelectedTone] = useState<'Professional' | 'Conversational' | 'Enthusiastic' | 'Formal'>('Professional');
  const [coverLetter, setCoverLetter] = useState(
    generateTailoredCoverLetter(job.title, job.company, user?.name || 'Jake Richards', 'Professional')
  );
  const [isApplying, setIsApplying] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);

  const handleToneChange = (tone: 'Professional' | 'Conversational' | 'Enthusiastic' | 'Formal') => {
    setSelectedTone(tone);
    setCoverLetter(generateTailoredCoverLetter(job.title, job.company, user?.name || 'Jake Richards', tone));
  };

  const handleApply = () => {
    setIsApplying(true);
    setTimeout(() => {
      portalStore.applyToJob(job.id, coverLetter, selectedResumeVersion);
      setIsApplying(false);
      setApplySuccess(true);
      setTimeout(() => {
        setShowApplyModal(false);
      }, 1500);
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f6fa] text-slate-800">
      <Navbar />

      {/* Top Banner Card (Navy Blue Linear Gradient) */}
      <div className="bg-navy-gradient text-white py-12 px-4 sm:px-6 md:px-10 border-b border-amber-400/20">
        <div className="max-w-[1500px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <Link
              href="/jobs"
              className="inline-flex items-center gap-1 text-xs text-amber-300 hover:text-white font-bold transition"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <span>Back to Job Search</span>
            </Link>

            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-0.5 bg-amber-400 text-slate-900 font-extrabold text-[10px] uppercase rounded-full">
                {job.type} • {job.style}
              </span>
              {job.is_verified_employer && (
                <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 font-extrabold text-[10px] rounded-full flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">verified</span>
                  ✓ Verified Employer
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {job.title}
            </h1>

            <p className="text-sm font-bold text-amber-300">
              {job.company} • <span className="text-slate-300 font-normal">{job.location}</span>
            </p>
          </div>

          {/* Quick Apply Action on Top Card */}
          <div className="bg-white/10 rounded-2xl p-4 border border-white/20 backdrop-blur-md flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <div className="text-center sm:text-left">
              <span className="text-[10px] font-bold text-slate-300 uppercase block">Compensation</span>
              <span className="text-xl font-black text-white">{job.salary}</span>
            </div>

            <button
              onClick={() => setShowApplyModal(true)}
              className="w-full sm:w-auto btn-gold-titan text-xs py-3 px-6 shadow-md"
            >
              <span className="material-symbols-outlined text-sm">bolt</span>
              <span>1-Click Apply Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Body Grid */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-10 py-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Job Details */}
        <main className="lg:col-span-8 space-y-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs">
          {/* AI ATS Match Score Gauge Card */}
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-navy-gradient text-amber-400 font-black text-[10px] rounded uppercase">
                  AI ATS Engine
                </span>
                <span className="text-xs font-extrabold text-[#0b1c30]">Profile Compatibility Gauge</span>
              </div>
              <p className="text-xs text-slate-600">
                Your primary resume strongly matches the required technical stack for this vacancy.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right">
                <span className="text-2xl font-black text-[#0b1c30]">94%</span>
                <span className="text-[10px] font-extrabold uppercase text-emerald-600 block">High Probability</span>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-navy-gradient text-amber-400 flex items-center justify-center font-black text-lg border border-amber-400/40 shadow-sm">
                94%
              </div>
            </div>
          </div>

          {/* Section: Overview */}
          <div className="space-y-3">
            <h2 className="text-lg font-black text-[#0b1c30] border-b border-slate-100 pb-2">
              Role Overview & Mission
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              {job.description}
            </p>
          </div>

          {/* Section: Key Responsibilities */}
          <div className="space-y-3">
            <h2 className="text-lg font-black text-[#0b1c30] border-b border-slate-100 pb-2">
              Key Responsibilities
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              {job.responsibilities.map((resp, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-amber-500 text-base shrink-0 mt-0.5">check_circle</span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Qualifications */}
          <div className="space-y-3">
            <h2 className="text-lg font-black text-[#0b1c30] border-b border-slate-100 pb-2">
              Required Qualifications & Technical Skills
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              {job.qualifications.map((qual, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-sky-600 text-base shrink-0 mt-0.5">verified</span>
                  <span>{qual}</span>
                </li>
              ))}
            </ul>
          </div>
        </main>

        {/* Right Column: Vacancy Overview Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
            <h3 className="text-sm font-black text-[#0b1c30] border-b border-slate-100 pb-3">
              Vacancy Overview
            </h3>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Department</span>
                <span className="font-bold text-slate-800">{job.department || 'Core Engineering'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Seniority</span>
                <span className="font-bold text-slate-800">{job.seniority || 'Senior'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Experience Needed</span>
                <span className="font-bold text-slate-800">{job.experience}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Active Applicants</span>
                <span className="font-bold text-slate-800">{job.applicants} Applied</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Closing Date</span>
                <span className="font-bold text-slate-800">{job.closing_date}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <button
                onClick={() => setShowApplyModal(true)}
                className="w-full btn-gold-titan text-xs py-3 shadow-md"
              >
                <span>Submit 1-Click Application</span>
              </button>

              <Link
                href="/ai-coach"
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition"
              >
                <span className="material-symbols-outlined text-sm text-amber-600">smart_toy</span>
                <span>Practice Interview for this Role</span>
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 bg-[#0b1c30]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col animate-fade-in-up">
            <div className="px-6 py-4 bg-navy-gradient text-white flex items-center justify-between">
              <div>
                <span className="px-2 py-0.2 bg-amber-400 text-slate-900 font-extrabold text-[9px] uppercase rounded-full">
                  1-Click Tailored Submission
                </span>
                <h3 className="font-extrabold text-base text-white mt-1">
                  Apply to {job.title}
                </h3>
              </div>
              <button onClick={() => setShowApplyModal(false)} className="text-slate-300 hover:text-white p-1">
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {applySuccess ? (
                <div className="text-center py-8 space-y-3 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl font-black">
                    ✓
                  </div>
                  <h4 className="text-xl font-extrabold text-[#0b1c30]">Application Synchronized!</h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Your profile and tailored cover letter have been submitted into <strong>{job.company}&apos;s Kanban pipeline</strong>.
                  </p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Select Resume Version</label>
                    <select
                      value={selectedResumeVersion}
                      onChange={(e) => setSelectedResumeVersion(e.target.value)}
                      className="titan-input text-xs"
                    >
                      {resumes.map(r => (
                        <option key={r.id} value={r.versionName}>
                          {r.versionName} ({r.ats_score}% ATS Match)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-slate-700">Tailored Cover Letter</label>
                      <div className="flex items-center gap-1">
                        {(['Professional', 'Enthusiastic', 'Formal'] as const).map(tone => (
                          <button
                            key={tone}
                            onClick={() => handleToneChange(tone)}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              selectedTone === tone ? 'bg-amber-400 text-slate-900' : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {tone}
                          </button>
                        ))}
                      </div>
                    </div>

                    <textarea
                      rows={8}
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-mono text-slate-800 outline-none resize-none"
                    />
                  </div>
                </>
              )}
            </div>

            {!applySuccess && (
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowApplyModal(false)}
                  className="px-4 py-2 bg-slate-200 text-slate-800 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApply}
                  disabled={isApplying}
                  className="btn-gold-titan text-xs py-2.5 px-6 shadow-md"
                >
                  {isApplying ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
