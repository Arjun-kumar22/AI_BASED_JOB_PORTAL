'use client';

import React from 'react';
import { ResumeData } from '@/lib/types';

interface ResumeA4PreviewProps {
  resume: ResumeData;
}

export default function ResumeA4Preview({ resume }: ResumeA4PreviewProps) {
  const { personalInfo, experiences, education, skills, projects } = resume;

  return (
    <div
      id="titan-resume-a4-document"
      className="w-full bg-white text-slate-900 shadow-2xl rounded-xl p-8 sm:p-10 font-sans border border-slate-300 relative overflow-hidden"
      style={{
        minHeight: '840px',
        maxWidth: '794px', // Standard A4 ratio
        margin: '0 auto',
        boxSizing: 'border-box'
      }}
    >
      {/* Top Header Section */}
      <div className="border-b-2 border-[#0b1c30] pb-5 mb-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0b1c30] uppercase tracking-tight">
              {personalInfo.fullName || 'Jake Richards'}
            </h1>
            <p className="text-sm font-extrabold text-[#1d3989] mt-0.5">
              {personalInfo.title || 'Senior Full-Stack & AI Engineer'}
            </p>
          </div>

          <div className="text-right text-[11px] text-slate-600 space-y-0.5">
            <p className="font-semibold">{personalInfo.email || 'jake@titan.com'}</p>
            <p>{personalInfo.phone || '+44 7700 900234'}</p>
            <p>{personalInfo.location || 'Manchester, United Kingdom'}</p>
            {personalInfo.linkedin && <p className="text-sky-700">{personalInfo.linkedin}</p>}
          </div>
        </div>

        {/* Executive Summary */}
        {personalInfo.summary && (
          <p className="text-xs text-slate-700 mt-3.5 leading-relaxed font-serif">
            {personalInfo.summary}
          </p>
        )}
      </div>

      {/* Main Sections */}
      <div className="space-y-5">
        {/* Core Competencies & Skills */}
        {skills && skills.length > 0 && (
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-[#0b1c30] border-b border-slate-200 pb-1 mb-2">
              Technical Proficiencies & Key Skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((sk) => (
                <span
                  key={sk}
                  className="px-2 py-0.5 bg-slate-100 text-slate-800 text-[11px] font-bold rounded"
                >
                  {sk}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Professional Work Experience */}
        {experiences && experiences.length > 0 && (
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-[#0b1c30] border-b border-slate-200 pb-1 mb-3">
              Professional Work Experience
            </h2>
            <div className="space-y-3.5">
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-slate-900">
                      {exp.title} <span className="font-normal text-slate-600">| {exp.company}</span>
                    </span>
                    <span className="text-[11px] text-slate-500 font-bold">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate} • {exp.location}
                    </span>
                  </div>

                  {exp.description && (
                    <p className="text-[11px] text-slate-600">{exp.description}</p>
                  )}

                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="list-disc list-inside text-[11px] text-slate-700 space-y-0.5 pl-1 font-serif">
                      {exp.highlights.map((hl, i) => (
                        <li key={i}>{hl}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-[#0b1c30] border-b border-slate-200 pb-1 mb-2">
              Key Technical Projects
            </h2>
            <div className="space-y-2">
              {projects.map((proj) => (
                <div key={proj.id} className="text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{proj.title}</span>
                    <span className="text-[10px] text-amber-700 font-bold">{proj.techStack}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-[#0b1c30] border-b border-slate-200 pb-1 mb-2">
              Academic Background & Education
            </h2>
            <div className="space-y-1.5">
              {education.map((edu) => (
                <div key={edu.id} className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900">{edu.degree}</span>
                    <span className="text-slate-600 block sm:inline sm:ml-2">({edu.institution})</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-bold">{edu.year} {edu.gpa ? `• GPA: ${edu.gpa}` : ''}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Official Watermark Crest */}
      <div className="absolute bottom-4 right-6 text-[9px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
        <span>Verified by Titans ATS Platform</span>
        <span>•</span>
        <span>ATS Score: {resume.ats_score}%</span>
      </div>
    </div>
  );
}
