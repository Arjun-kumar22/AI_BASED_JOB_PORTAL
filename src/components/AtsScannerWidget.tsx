'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { analyzeResumeAts } from '@/lib/atsEngine';
import { AtsScoreResult } from '@/lib/types';

export default function AtsScannerWidget() {
  const [resumeText, setResumeText] = useState('');
  const [result, setResult] = useState<AtsScoreResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const sampleResumeText = `JAKE RICHARDS
Senior Full-Stack & AI Engineer | Manchester, UK | jake@titan.com | +44 7700 900234

SUMMARY:
Innovative Full-Stack Engineer with 6+ years of experience in React, Next.js 14, TypeScript, and Python FastAPI. Architected resilient microservices serving 150k+ active users and reduced API response latency by 42%.

EXPERIENCE:
Senior Full-Stack Engineer — Global Dynamics Inc. (2022 - Present)
• Architected high-throughput Next.js frontend and Python FastAPI services.
• Reduced average API latency by 42% using Redis caching and PostgreSQL indexing.
• Mentored 6 junior engineers and managed automated Docker and AWS deployment pipelines.

SKILLS:
React.js, Next.js, TypeScript, Python, FastAPI, PostgreSQL, AWS, Docker, Kubernetes, GraphQL, System Design, CI/CD.

EDUCATION:
B.Sc. in Computer Science (First Class Hons) — University of Manchester (2019)`;

  const handleScan = (textToScan?: string) => {
    const text = textToScan || resumeText;
    if (!text.trim()) return;

    setIsScanning(true);
    setTimeout(() => {
      const res = analyzeResumeAts(text);
      setResult(res);
      setIsScanning(false);
    }, 600);
  };

  const handleLoadSample = () => {
    setResumeText(sampleResumeText);
    handleScan(sampleResumeText);
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      {/* Header Banner */}
      <div className="bg-navy-gradient p-6 sm:p-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 bg-amber-400 text-slate-900 font-extrabold text-[10px] uppercase rounded-full tracking-wider">
              Test-Drive Widget
            </span>
            <span className="text-xs text-amber-300 font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">bolt</span>
              Instant 0-100% Scoring
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Instant AI ATS Resume Scanner
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Paste your resume text below to run an algorithmic ATS keyword match, radar score, and missing keyword audit in seconds.
          </p>
        </div>

        <button
          onClick={handleLoadSample}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/30 text-amber-300 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0"
        >
          <span className="material-symbols-outlined text-base">auto_fix_high</span>
          <span>Load Sample Resume</span>
        </button>
      </div>

      {/* Body Area */}
      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Input Area */}
        <div className="lg:col-span-7 space-y-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Paste Resume Content (Text / Skills / Experience)
          </label>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            rows={8}
            placeholder="Paste your resume here (e.g. John Doe, Senior Full-Stack Developer with 5+ years experience in React, Next.js, Python, AWS...)"
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-mono text-slate-800 outline-none focus:border-amber-400 focus:bg-white transition leading-relaxed resize-none"
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[11px] text-slate-500 flex items-center gap-1">
              <span className="material-symbols-outlined text-xs text-emerald-600">lock</span>
              Zero data stored — pure client-side algorithmic parsing
            </span>

            <button
              onClick={() => handleScan()}
              disabled={isScanning || !resumeText.trim()}
              className="w-full sm:w-auto btn-gold-titan text-xs py-3 px-6 shadow-md disabled:opacity-50"
            >
              {isScanning ? (
                <>
                  <span className="inline-block animate-spin rounded-full h-3.5 w-3.5 border-2 border-[#0b1c30] border-t-transparent" />
                  <span>Analyzing ATS Fit...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-base">analytics</span>
                  <span>Calculate ATS Score</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Scorecard Area */}
        <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between">
          {result ? (
            <div className="space-y-4 animate-fade-in">
              {/* Overall Score Dial */}
              <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                    ATS Compatibility
                  </span>
                  <span className="text-3xl font-black text-[#0b1c30]">
                    {result.overallScore}<span className="text-lg text-slate-400">/100</span>
                  </span>
                  <span className={`inline-block ml-2 px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                    result.overallScore >= 85 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                  }`}>
                    {result.overallScore >= 85 ? 'Strong Match' : 'Moderate Match'}
                  </span>
                </div>

                <div className="w-16 h-16 rounded-full bg-navy-gradient flex items-center justify-center text-amber-400 font-black text-xl shadow-md border-2 border-amber-400">
                  {result.overallScore}%
                </div>
              </div>

              {/* 4-Dimension Breakdown */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Keyword Match</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-bold text-slate-900">{result.keywordScore}%</span>
                    <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${result.keywordScore}%` }} />
                    </div>
                  </div>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Impact Metrics</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-bold text-slate-900">{result.impactScore}%</span>
                    <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-sky-500 rounded-full" style={{ width: `${result.impactScore}%` }} />
                    </div>
                  </div>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Formatting Structure</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-bold text-slate-900">{result.formattingScore}%</span>
                    <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${result.formattingScore}%` }} />
                    </div>
                  </div>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Seniority & Exp</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-bold text-slate-900">{result.experienceScore}%</span>
                    <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${result.experienceScore}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Missing Keywords Pill List */}
              {result.missingKeywords.length > 0 && (
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-600 block mb-1.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">warning</span>
                    Top In-Demand Keywords to Add:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {result.missingKeywords.map(kw => (
                      <span key={kw} className="px-2 py-0.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-md text-[10px] font-bold">
                        + {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Link to full AI Career Hub */}
              <Link
                href="/ai-coach"
                className="w-full py-2.5 bg-navy-gradient text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-95 transition shadow-sm"
              >
                <span>Open Full 5-Tab AI Career Hub</span>
                <span className="material-symbols-outlined text-sm text-amber-400">arrow_forward</span>
              </Link>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-3 text-amber-500 shadow-xs">
                <span className="material-symbols-outlined text-2xl">document_scanner</span>
              </div>
              <p className="text-xs font-bold text-slate-700">Awaiting Resume Input</p>
              <p className="text-[11px] text-slate-500 mt-1">
                Paste your resume on the left or click &quot;Load Sample Resume&quot; to test the live ATS scanner.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
