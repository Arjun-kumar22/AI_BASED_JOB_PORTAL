'use client';

import React, { useState } from 'react';
import { ResumeData, ResumeWorkExperience, ResumeEducation, ResumeProject } from '@/lib/types';
import { portalStore } from '@/lib/store';
import { analyzeResumeAts } from '@/lib/atsEngine';

interface ResumeEditorProps {
  resume: ResumeData;
  onChange: (updated: ResumeData) => void;
}

export default function ResumeEditor({ resume, onChange }: ResumeEditorProps) {
  const [activeTab, setActiveTab] = useState<'personal' | 'experience' | 'skills' | 'education' | 'projects'>('personal');

  const updatePersonalInfo = (field: string, value: string) => {
    const updated = {
      ...resume,
      personalInfo: {
        ...resume.personalInfo,
        [field]: value
      }
    };
    // Recalculate ATS score
    const ats = analyzeResumeAts(`${updated.personalInfo.summary} ${updated.skills.join(' ')}`);
    updated.ats_score = ats.overallScore;
    onChange(updated);
  };

  const updateSkills = (skillsArray: string[]) => {
    const updated = {
      ...resume,
      skills: skillsArray,
      parsed_skills: skillsArray
    };
    const ats = analyzeResumeAts(`${updated.personalInfo.summary} ${skillsArray.join(' ')}`);
    updated.ats_score = ats.overallScore;
    onChange(updated);
  };

  const addExperience = () => {
    const newExp: ResumeWorkExperience = {
      id: `exp-${Date.now()}`,
      title: 'Software Engineer',
      company: 'Tech Solutions Inc.',
      location: 'Remote',
      startDate: '2023',
      endDate: 'Present',
      current: true,
      description: 'Engineered web features and optimized API performance.',
      highlights: ['Improved throughput by 25% and delivered key modules.']
    };
    onChange({
      ...resume,
      experiences: [newExp, ...resume.experiences]
    });
  };

  const updateExperience = (id: string, field: string, value: any) => {
    const updatedExperiences = resume.experiences.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    onChange({
      ...resume,
      experiences: updatedExperiences
    });
  };

  const deleteExperience = (id: string) => {
    onChange({
      ...resume,
      experiences: resume.experiences.filter(exp => exp.id !== id)
    });
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-5">
      {/* Editor Subtabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { id: 'personal', label: 'Personal & Bio', icon: 'badge' },
          { id: 'experience', label: 'Work History', icon: 'work' },
          { id: 'skills', label: 'Skills & Tech', icon: 'code' },
          { id: 'projects', label: 'Projects', icon: 'folder' },
          { id: 'education', label: 'Education', icon: 'school' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
              activeTab === tab.id
                ? 'bg-navy-gradient text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className="material-symbols-outlined text-sm">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: Personal Info */}
      {activeTab === 'personal' && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
              <input
                type="text"
                value={resume.personalInfo.fullName}
                onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                className="titan-input text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Professional Title</label>
              <input
                type="text"
                value={resume.personalInfo.title}
                onChange={(e) => updatePersonalInfo('title', e.target.value)}
                className="titan-input text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Email</label>
              <input
                type="email"
                value={resume.personalInfo.email}
                onChange={(e) => updatePersonalInfo('email', e.target.value)}
                className="titan-input text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Phone</label>
              <input
                type="text"
                value={resume.personalInfo.phone}
                onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                className="titan-input text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Location</label>
              <input
                type="text"
                value={resume.personalInfo.location}
                onChange={(e) => updatePersonalInfo('location', e.target.value)}
                className="titan-input text-xs"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Executive Summary / Objective</label>
            <textarea
              rows={4}
              value={resume.personalInfo.summary}
              onChange={(e) => updatePersonalInfo('summary', e.target.value)}
              className="titan-input text-xs leading-relaxed"
            />
          </div>
        </div>
      )}

      {/* Tab 2: Work Experience */}
      {activeTab === 'experience' && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase text-slate-600">Work Experience Entries</span>
            <button
              onClick={addExperience}
              className="px-3 py-1.5 bg-navy-gradient text-white text-xs font-bold rounded-lg flex items-center gap-1 shadow-xs"
            >
              <span className="material-symbols-outlined text-sm text-amber-400">add</span>
              <span>Add Position</span>
            </button>
          </div>

          {resume.experiences.map((exp, index) => (
            <div key={exp.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0b1c30]">Position #{index + 1}</span>
                <button
                  onClick={() => deleteExperience(exp.id)}
                  className="text-rose-600 hover:text-rose-700 text-xs font-bold flex items-center gap-0.5"
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                  <span>Delete</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Job Title (e.g. Senior Full-Stack Engineer)"
                  value={exp.title}
                  onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                  className="titan-input text-xs"
                />
                <input
                  type="text"
                  placeholder="Company Name (e.g. Stripe)"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  className="titan-input text-xs"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Start Date (e.g. 2022)"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                  className="titan-input text-xs"
                />
                <input
                  type="text"
                  placeholder="End Date (e.g. Present)"
                  value={exp.endDate}
                  onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                  className="titan-input text-xs"
                />
                <input
                  type="text"
                  placeholder="Location (e.g. Remote)"
                  value={exp.location}
                  onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                  className="titan-input text-xs"
                />
              </div>

              <textarea
                rows={2}
                placeholder="Key achievements and quantitative impact..."
                value={exp.highlights.join('\n')}
                onChange={(e) => updateExperience(exp.id, 'highlights', e.target.value.split('\n'))}
                className="titan-input text-xs"
              />
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Skills */}
      {activeTab === 'skills' && (
        <div className="space-y-4 animate-fade-in">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Skills (Comma separated keywords)
            </label>
            <textarea
              rows={4}
              value={resume.skills.join(', ')}
              onChange={(e) => updateSkills(e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
              className="titan-input text-xs font-mono leading-relaxed"
              placeholder="React, Next.js 14, TypeScript, Python, FastAPI, AWS, Docker, PostgreSQL, System Design"
            />
          </div>

          <div>
            <span className="text-xs font-bold text-slate-700 block mb-2">Parsed In-Demand Skills</span>
            <div className="flex flex-wrap gap-1.5">
              {resume.skills.map((sk) => (
                <span
                  key={sk}
                  className="px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-900 rounded-lg text-xs font-bold"
                >
                  ⚡ {sk}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Projects */}
      {activeTab === 'projects' && (
        <div className="space-y-4 animate-fade-in">
          <p className="text-xs text-slate-500">
            Showcase high-impact technical repositories and enterprise applications.
          </p>
          {resume.projects.map((proj, i) => (
            <div key={proj.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <input
                type="text"
                placeholder="Project Title"
                value={proj.title}
                onChange={(e) => {
                  const updated = [...resume.projects];
                  updated[i].title = e.target.value;
                  onChange({ ...resume, projects: updated });
                }}
                className="titan-input text-xs"
              />
              <input
                type="text"
                placeholder="Tech Stack (e.g. Next.js, FastAPI, Docker)"
                value={proj.techStack}
                onChange={(e) => {
                  const updated = [...resume.projects];
                  updated[i].techStack = e.target.value;
                  onChange({ ...resume, projects: updated });
                }}
                className="titan-input text-xs"
              />
              <textarea
                rows={2}
                placeholder="Project description & key metrics..."
                value={proj.description}
                onChange={(e) => {
                  const updated = [...resume.projects];
                  updated[i].description = e.target.value;
                  onChange({ ...resume, projects: updated });
                }}
                className="titan-input text-xs"
              />
            </div>
          ))}
        </div>
      )}

      {/* Tab 5: Education */}
      {activeTab === 'education' && (
        <div className="space-y-4 animate-fade-in">
          {resume.education.map((edu, i) => (
            <div key={edu.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <input
                type="text"
                placeholder="Degree (e.g. B.Sc. in Computer Science)"
                value={edu.degree}
                onChange={(e) => {
                  const updated = [...resume.education];
                  updated[i].degree = e.target.value;
                  onChange({ ...resume, education: updated });
                }}
                className="titan-input text-xs"
              />
              <input
                type="text"
                placeholder="Institution (e.g. University of Manchester)"
                value={edu.institution}
                onChange={(e) => {
                  const updated = [...resume.education];
                  updated[i].institution = e.target.value;
                  onChange({ ...resume, education: updated });
                }}
                className="titan-input text-xs"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Graduation Year (e.g. 2019)"
                  value={edu.year}
                  onChange={(e) => {
                    const updated = [...resume.education];
                    updated[i].year = e.target.value;
                    onChange({ ...resume, education: updated });
                  }}
                  className="titan-input text-xs"
                />
                <input
                  type="text"
                  placeholder="GPA (e.g. 3.9 / 4.0)"
                  value={edu.gpa || ''}
                  onChange={(e) => {
                    const updated = [...resume.education];
                    updated[i].gpa = e.target.value;
                    onChange({ ...resume, education: updated });
                  }}
                  className="titan-input text-xs"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
