'use client';

import React, { useState } from 'react';
import { portalStore } from '@/lib/store';
import { SalaryBenchmark } from '@/lib/types';

export default function SalaryCalculator() {
  const benchmarks = portalStore.getSalaryBenchmarks();
  const [selectedDomain, setSelectedDomain] = useState('Software Engineering');
  const [selectedSeniority, setSelectedSeniority] = useState<'Entry' | 'Mid' | 'Senior' | 'Lead'>('Senior');

  const domains = ['Software Engineering', 'AI & Data', 'Product & Design'];
  const seniorities: ('Entry' | 'Mid' | 'Senior' | 'Lead')[] = ['Entry', 'Mid', 'Senior', 'Lead'];

  // Find or calculate matching benchmark
  const activeBenchmark: SalaryBenchmark = benchmarks.find(
    b => b.domain === selectedDomain && b.seniority === selectedSeniority
  ) || {
    domain: selectedDomain,
    role: `${selectedSeniority} Specialist`,
    seniority: selectedSeniority,
    baseSalary: selectedSeniority === 'Lead' ? '$210,000' : selectedSeniority === 'Senior' ? '$160,000' : selectedSeniority === 'Mid' ? '$125,000' : '$85,000',
    range: selectedSeniority === 'Lead' ? '$185k – $240k' : selectedSeniority === 'Senior' ? '$140k – $185k' : selectedSeniority === 'Mid' ? '$110k – $145k' : '$75k – $95k',
    bonusPercent: selectedSeniority === 'Lead' ? '20%' : selectedSeniority === 'Senior' ? '15%' : '10%',
    inDemandSkills: selectedDomain === 'AI & Data'
      ? ['PyTorch', 'Python', 'LLM Fine-Tuning', 'FastAPI']
      : selectedDomain === 'Product & Design'
      ? ['Figma', 'Design Systems', 'Micro-interactions', 'User Research']
      : ['Next.js', 'TypeScript', 'FastAPI', 'AWS', 'System Design']
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      <div className="p-6 sm:p-8 bg-navy-gradient text-white">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 bg-amber-400 text-slate-900 font-extrabold text-[10px] uppercase rounded-full tracking-wider">
            Interactive Calculator
          </span>
          <span className="text-xs text-amber-300 font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">payments</span>
            2026 Compensation Intelligence
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          Tech Salary Benchmark Calculator
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
          Explore current market compensation rates, bonus expectations, and the highest-paying technical skill multipliers.
        </p>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Domain Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Select Technical Domain
            </label>
            <div className="grid grid-cols-3 gap-2">
              {domains.map(d => (
                <button
                  key={d}
                  onClick={() => setSelectedDomain(d)}
                  className={`p-2.5 rounded-xl text-xs font-bold transition text-center border ${
                    selectedDomain === d
                      ? 'bg-navy-gradient text-white border-[#0b1c30] shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {d === 'Software Engineering' ? 'Engineering' : d === 'AI & Data' ? 'AI & Data' : 'Design'}
                </button>
              ))}
            </div>
          </div>

          {/* Seniority Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Select Seniority Level
            </label>
            <div className="grid grid-cols-4 gap-2">
              {seniorities.map(s => (
                <button
                  key={s}
                  onClick={() => setSelectedSeniority(s)}
                  className={`p-2.5 rounded-xl text-xs font-bold transition text-center border ${
                    selectedSeniority === s
                      ? 'bg-amber-400 text-slate-900 border-amber-500 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
              Median Base Salary
            </span>
            <div className="text-3xl font-black text-[#0b1c30]">
              {activeBenchmark.baseSalary}
            </div>
            <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">trending_up</span>
              +14% YoY Market Growth
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
              Estimated Total Range
            </span>
            <div className="text-xl sm:text-2xl font-bold text-slate-800">
              {activeBenchmark.range}
            </div>
            <span className="text-[11px] text-slate-500">
              Expected Performance Bonus: <strong className="text-slate-800">{activeBenchmark.bonusPercent}</strong>
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
              Top Compensation Multipliers
            </span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {activeBenchmark.inDemandSkills.map(skill => (
                <span
                  key={skill}
                  className="px-2.5 py-0.5 bg-white border border-slate-200 text-slate-800 font-bold rounded-lg text-[10px] shadow-2xs"
                >
                  ⚡ {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
