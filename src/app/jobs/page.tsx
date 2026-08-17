'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { portalStore } from '@/lib/store';
import { Job, ResumeData } from '@/lib/types';
import { generateTailoredCoverLetter } from '@/lib/groqClient';

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>(portalStore.getJobs());
  const [resumes] = useState<ResumeData[]>(portalStore.getResumes());
  const user = portalStore.getUser();

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedWorkStyle, setSelectedWorkStyle] = useState('All');
  const [selectedSeniority, setSelectedSeniority] = useState('All');
  const [minSalary, setMinSalary] = useState(60000);

  // Application Modal State
  const [applyModalJob, setApplyModalJob] = useState<Job | null>(null);
  const [selectedResumeVersion, setSelectedResumeVersion] = useState<string>(resumes[0]?.versionName || 'Primary Resume');
  const [selectedTone, setSelectedTone] = useState<'Professional' | 'Conversational' | 'Enthusiastic' | 'Formal'>('Professional');
  const [coverLetter, setCoverLetter] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);

  useEffect(() => {
    const unsub = portalStore.subscribe(() => {
      setJobs(portalStore.getJobs());
    });
    return () => unsub();
  }, []);

  const handleOpenApplyModal = (job: Job) => {
    setApplyModalJob(job);
    const letter = generateTailoredCoverLetter(job.title, job.company, user?.name || 'Jake Richards', selectedTone);
    setCoverLetter(letter);
    setApplySuccess(false);
  };

  const handleToneChange = (tone: 'Professional' | 'Conversational' | 'Enthusiastic' | 'Formal') => {
    setSelectedTone(tone);
    if (applyModalJob) {
      const letter = generateTailoredCoverLetter(applyModalJob.title, applyModalJob.company, user?.name || 'Jake Richards', tone);
      setCoverLetter(letter);
    }
  };

  const handleConfirmApply = () => {
    if (!applyModalJob) return;
    setIsApplying(true);
    setTimeout(() => {
      portalStore.applyToJob(applyModalJob.id, coverLetter, selectedResumeVersion);
      setIsApplying(false);
      setApplySuccess(true);
      setTimeout(() => {
        setApplyModalJob(null);
      }, 1500);
    }, 500);
  };

  // Filter Jobs
  const filteredJobs = jobs.filter((job) => {
    if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase()) && !job.company.toLowerCase().includes(searchQuery.toLowerCase()) && !job.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedLocation && !job.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
      return false;
    }
    if (selectedWorkStyle !== 'All' && !job.style.toLowerCase().includes(selectedWorkStyle.toLowerCase())) {
      return false;
    }
    if (selectedSeniority !== 'All' && job.seniority !== selectedSeniority) {
      return false;
    }
    if (job.salary_min && job.salary_min < minSalary) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f6fa] text-slate-800">
      <Navbar />

      {/* Top Banner */}
      <div className="bg-navy-gradient text-white py-12 px-4 sm:px-6 md:px-10 border-b border-amber-400/20">
        <div className="max-w-[1500px] mx-auto space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-amber-400 text-slate-900 font-extrabold text-[10px] uppercase rounded-full">
              Live Career Index
            </span>
            <span className="text-xs text-amber-300 font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">verified</span>
              {filteredJobs.length} Positions Available
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Find High-Impact Tech Positions
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Real-time ATS keyword scoring and 1-click tailored application submissions directly synchronized with employer Kanban pipelines.
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-10 py-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Filter Sidebar */}
        <aside className="lg:col-span-4 xl:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-sm text-[#0b1c30] flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-500 text-base">filter_alt</span>
                <span>Faceted Filters</span>
              </h3>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedLocation('');
                  setSelectedWorkStyle('All');
                  setSelectedSeniority('All');
                  setMinSalary(60000);
                }}
                className="text-[11px] font-bold text-amber-600 hover:text-amber-700"
              >
                Reset All
              </button>
            </div>

            {/* Keyword Search */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Keywords</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Title, skill, technology..."
                className="titan-input text-xs"
              />
            </div>

            {/* Location */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Location</label>
              <input
                type="text"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                placeholder="e.g. Remote, London, Austin..."
                className="titan-input text-xs"
              />
            </div>

            {/* Work Style */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">Work Style</label>
              <div className="grid grid-cols-2 gap-1.5">
                {['All', 'Remote', 'Hybrid', 'On-site'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedWorkStyle(st)}
                    className={`py-1.5 px-2 rounded-xl text-xs font-bold transition border ${
                      selectedWorkStyle === st
                        ? 'bg-navy-gradient text-white border-[#0b1c30] shadow-2xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Seniority */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">Seniority</label>
              <div className="grid grid-cols-2 gap-1.5">
                {['All', 'Entry', 'Mid', 'Senior', 'Lead'].map((sn) => (
                  <button
                    key={sn}
                    onClick={() => setSelectedSeniority(sn)}
                    className={`py-1.5 px-2 rounded-xl text-xs font-bold transition border ${
                      selectedSeniority === sn
                        ? 'bg-amber-400 text-slate-900 border-amber-500 shadow-2xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {sn}
                  </button>
                ))}
              </div>
            </div>

            {/* Salary Slider */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">Minimum Salary</span>
                <span className="font-extrabold text-[#1d3989]">${(minSalary / 1000).toFixed(0)}k+ / yr</span>
              </div>
              <input
                type="range"
                min={60000}
                max={220000}
                step={10000}
                value={minSalary}
                onChange={(e) => setMinSalary(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>
        </aside>

        {/* Right Job Cards Feed */}
        <main className="lg:col-span-8 xl:col-span-9 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">
              Showing <strong className="text-slate-900">{filteredJobs.length}</strong> matching vacancies
            </span>
          </div>

          <div className="space-y-4">
            {filteredJobs.map((job) => {
              const isSaved = portalStore.isJobSaved(job.id);

              return (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-amber-400 transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 rounded font-black text-[10px] uppercase">
                          {job.type} • {job.style}
                        </span>
                        {job.is_verified_employer && (
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-extrabold text-[10px] flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-xs">verified</span>
                            ✓ Verified Employer
                          </span>
                        )}
                        <span className="text-[11px] text-slate-400 font-bold">
                          Posted {job.posted_days_ago || 2}d ago
                        </span>
                      </div>

                      <h2 className="text-lg font-extrabold text-[#0b1c30]">
                        <Link href={`/jobs/${job.id}`} className="hover:text-[#1d3989] transition">
                          {job.title}
                        </Link>
                      </h2>

                      <p className="text-xs text-slate-600 font-semibold">
                        {job.company} • {job.location}
                      </p>
                    </div>

                    {/* ATS Gauge Badge */}
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <div className="w-14 h-14 rounded-2xl bg-navy-gradient text-amber-400 flex flex-col items-center justify-center text-center shadow-xs shrink-0 border border-amber-400/30">
                        <span className="font-black text-sm leading-none">94%</span>
                        <span className="text-[8px] font-bold uppercase text-slate-300 mt-0.5">ATS Match</span>
                      </div>

                      <button
                        onClick={() => portalStore.toggleSaveJob(job.id)}
                        className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-amber-600 transition"
                        title={isSaved ? 'Remove Bookmark' : 'Save Job'}
                      >
                        <span className={`material-symbols-outlined text-lg ${isSaved ? 'text-amber-500 font-fill' : ''}`} style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}>
                          bookmark
                        </span>
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {job.description}
                  </p>

                  {/* Skills Chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {job.qualifications.slice(0, 3).map((q, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-bold rounded-md"
                      >
                        {q}
                      </span>
                    ))}
                  </div>

                  {/* Card Bottom Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
                    <span className="font-extrabold text-[#0b1c30] text-sm">
                      {job.salary}
                    </span>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/jobs/${job.id}`}
                        className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition"
                      >
                        View Full Vacancy
                      </Link>

                      <button
                        onClick={() => handleOpenApplyModal(job)}
                        className="btn-gold-titan text-xs py-2 px-4 shadow-sm"
                      >
                        <span className="material-symbols-outlined text-sm">bolt</span>
                        <span>1-Click Tailored Apply</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredJobs.length === 0 && (
              <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
                <span className="material-symbols-outlined text-4xl text-slate-400">search_off</span>
                <h3 className="text-base font-extrabold text-slate-700">No matching vacancies found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting your search terms or lowering your minimum salary threshold.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* 1-Click Tailored Application Modal */}
      {applyModalJob && (
        <div className="fixed inset-0 z-50 bg-[#0b1c30]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col animate-fade-in-up">
            {/* Header */}
            <div className="px-6 py-4 bg-navy-gradient text-white flex items-center justify-between">
              <div>
                <span className="px-2 py-0.2 bg-amber-400 text-slate-900 font-extrabold text-[9px] uppercase rounded-full">
                  1-Click Tailored Submission
                </span>
                <h3 className="font-extrabold text-base text-white mt-1">
                  Apply to {applyModalJob.title}
                </h3>
                <p className="text-xs text-slate-300">{applyModalJob.company} • {applyModalJob.location}</p>
              </div>

              <button
                onClick={() => setApplyModalJob(null)}
                className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {applySuccess ? (
                <div className="text-center py-8 space-y-3 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl font-black">
                    ✓
                  </div>
                  <h4 className="text-xl font-extrabold text-[#0b1c30]">Application Submitted Successfully!</h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Your tailored application and ATS resume version have been synchronized into <strong>{applyModalJob.company}&apos;s ATS Kanban pipeline</strong>.
                  </p>
                </div>
              ) : (
                <>
                  {/* Resume Version Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Select Resume Version (94% ATS Match)
                    </label>
                    <select
                      value={selectedResumeVersion}
                      onChange={(e) => setSelectedResumeVersion(e.target.value)}
                      className="titan-input text-xs"
                    >
                      {resumes.map((r) => (
                        <option key={r.id} value={r.versionName}>
                          {r.versionName} ({r.ats_score}% ATS Match)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Tone Selector */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-slate-700">
                        AI Generated Tailored Cover Letter
                      </label>
                      <div className="flex items-center gap-1">
                        {(['Professional', 'Enthusiastic', 'Formal'] as const).map((tone) => (
                          <button
                            key={tone}
                            onClick={() => handleToneChange(tone)}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
                              selectedTone === tone
                                ? 'bg-amber-400 text-slate-900'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-mono text-slate-800 outline-none focus:border-amber-400 focus:bg-white transition leading-relaxed resize-none"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Footer Actions */}
            {!applySuccess && (
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs text-amber-600">bolt</span>
                  Instant sync to Recruiter Kanban
                </span>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setApplyModalJob(null)}
                    className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmApply}
                    disabled={isApplying}
                    className="btn-gold-titan text-xs py-2.5 px-6 shadow-md disabled:opacity-50"
                  >
                    {isApplying ? (
                      <>
                        <span className="inline-block animate-spin rounded-full h-3.5 w-3.5 border-2 border-[#0b1c30] border-t-transparent" />
                        <span>Dispatching...</span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-base">send</span>
                        <span>Submit 1-Click Application</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
