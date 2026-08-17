'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { portalStore } from '@/lib/store';
import { generateJobDescription } from '@/lib/groqClient';

export default function NewJobPage() {
  const router = useRouter();
  const [title, setTitle] = useState('Lead AI Engineer');
  const [department, setDepartment] = useState('AI Intelligence Core');
  const [seniority, setSeniority] = useState<'Entry' | 'Mid' | 'Senior' | 'Lead'>('Lead');
  const [location, setLocation] = useState('Remote / London, UK');
  const [style, setStyle] = useState<'Remote' | 'Hybrid' | 'On-site'>('Remote');
  const [salary, setSalary] = useState('$170,000 – $220,000 + Equity');
  const [experience, setExperience] = useState('6+ years');
  const [skillsText, setSkillsText] = useState('Python, PyTorch, Next.js, Transformers, FastAPI, Docker, Distributed Systems');
  const [description, setDescription] = useState(
    'As a Lead AI Engineer at Titan Technology Group, you will lead the design, training, and production serving of real-time recruitment evaluation models and ATS intelligence pipelines.'
  );
  const [responsibilities, setResponsibilities] = useState<string[]>([
    'System Architecture: Architect low-latency vector databases and RAG pipelines.',
    'Model Training: Fine-tune domain-specific LLMs for STAR interview scoring.',
    'Mentorship: Guide junior AI developers and establish automated CI/CD evaluation benchmarks.'
  ]);
  const [qualifications, setQualifications] = useState<string[]>([
    '6+ years of professional software engineering and machine learning experience.',
    'Deep proficiency with Python, PyTorch, Next.js, and FastAPI.',
    'Experience scaling distributed GPU inference clusters.'
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const handleAiAutoFill = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const skills = skillsText.split(',').map(s => s.trim()).filter(Boolean);
      const generated = generateJobDescription(title, department, seniority, skills);
      setDescription(generated.description);
      setResponsibilities(generated.responsibilities);
      setQualifications(generated.qualifications);
      setIsGenerating(false);
    }, 400);
  };

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPosting(true);

    setTimeout(() => {
      portalStore.addJob({
        title,
        company: 'Titan Technology Group',
        location,
        type: 'Full-time',
        style,
        salary,
        salary_min: 170000,
        salary_max: 220000,
        experience,
        seniority,
        status: 'Active',
        closing_date: 'Jan 30, 2027',
        description,
        qualifications,
        responsibilities,
        is_featured: true,
        is_verified_employer: true,
        department
      });

      setIsPosting(false);
      router.push('/recruiter/dashboard');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-slate-800 flex">
      <Sidebar role="employer" />

      <div className="flex-1 ml-56 md:ml-60 p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl">
        <div className="bg-navy-gradient text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-400/20 space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-amber-400 text-slate-900 font-extrabold text-[10px] uppercase rounded-full">
              Job Creation Wizard
            </span>
            <span className="text-xs text-amber-300 font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              AI Auto-Fill Enabled
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Create & Publish a Job Posting</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Fill in the key parameters below or click &quot;✨ AI Auto-Fill Description&quot; to automatically draft responsibilities and qualifications.
          </p>
        </div>

        {/* Posting Form */}
        <form onSubmit={handlePostJob} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          {/* Top Parameters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Job Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="titan-input text-xs"
                placeholder="e.g. Lead AI Engineer"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Department / Team</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="titan-input text-xs"
                placeholder="e.g. Core Engineering"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Seniority Level</label>
              <select
                value={seniority}
                onChange={(e) => setSeniority(e.target.value as any)}
                className="titan-input text-xs"
              >
                <option value="Entry">Entry Level</option>
                <option value="Mid">Mid Level</option>
                <option value="Senior">Senior Level</option>
                <option value="Lead">Lead / Staff</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Work Mode</label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value as any)}
                className="titan-input text-xs"
              >
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="titan-input text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Salary Range</label>
              <input
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="titan-input text-xs"
                placeholder="e.g. $140k – $180k + Equity"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Years of Experience</label>
              <input
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="titan-input text-xs"
                placeholder="e.g. 5+ years"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Required Tech Stack Keywords (Comma separated)
            </label>
            <input
              type="text"
              value={skillsText}
              onChange={(e) => setSkillsText(e.target.value)}
              className="titan-input text-xs font-mono"
            />
          </div>

          {/* AI Auto-Fill Action Banner */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="space-y-0.5 text-xs text-amber-900">
              <strong className="font-extrabold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-amber-600">auto_fix_high</span>
                AI Description Generator
              </strong>
              <p className="text-amber-800">Synthesizes role parameters into tailored responsibilities and qualifications.</p>
            </div>

            <button
              type="button"
              onClick={handleAiAutoFill}
              disabled={isGenerating}
              className="btn-gold-titan text-xs py-2 px-5 shadow-sm shrink-0 disabled:opacity-50"
            >
              {isGenerating ? 'Generating Description...' : '✨ AI Auto-Fill Description'}
            </button>
          </div>

          {/* Job Overview Description */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Job Description Overview</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="titan-input text-xs leading-relaxed"
            />
          </div>

          {/* Responsibilities */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Key Responsibilities (One per line)</label>
            <textarea
              rows={4}
              value={responsibilities.join('\n')}
              onChange={(e) => setResponsibilities(e.target.value.split('\n').filter(Boolean))}
              className="titan-input text-xs leading-relaxed font-sans"
            />
          </div>

          {/* Qualifications */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Required Qualifications (One per line)</label>
            <textarea
              rows={4}
              value={qualifications.join('\n')}
              onChange={(e) => setQualifications(e.target.value.split('\n').filter(Boolean))}
              className="titan-input text-xs leading-relaxed font-sans"
            />
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.push('/recruiter/dashboard')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPosting}
              className="btn-primary-titan text-xs py-3 px-8 shadow-md disabled:opacity-50"
            >
              {isPosting ? 'Publishing Vacancy...' : 'Publish Job Listing →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
