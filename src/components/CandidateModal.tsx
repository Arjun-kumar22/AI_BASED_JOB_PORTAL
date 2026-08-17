'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Application } from '@/lib/types';
import { portalStore } from '@/lib/store';

interface CandidateModalProps {
  application: Application;
  onClose: () => void;
}

export default function CandidateModal({ application, onClose }: CandidateModalProps) {
  const [starRating, setStarRating] = useState<number>(application.star_rating || 0);
  const [notes, setNotes] = useState<string>(application.recruiter_notes || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    portalStore.updateApplicationScorecard(application.id, starRating, notes);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 2000);
  };

  const handleStageChange = (newStage: Application['status']) => {
    portalStore.updateApplicationStage(application.id, newStage);
  };

  const stages: Application['status'][] = [
    'Applied',
    'Screening',
    'Technical Interview',
    'Final Round',
    'Offer Extended',
    'Hired'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#0b1c30]/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col animate-fade-in-up">
        {/* Header */}
        <div className="px-6 py-4 bg-navy-gradient text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl overflow-hidden relative border border-amber-400/50 bg-slate-900 text-amber-400 font-black text-sm flex items-center justify-center shrink-0">
              {application.candidate_avatar ? (
                <Image
                  src={application.candidate_avatar}
                  alt={application.candidate_name}
                  width={44}
                  height={44}
                  className="w-full h-full object-cover"
                />
              ) : (
                application.candidate_name.charAt(0)
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base text-white">{application.candidate_name}</h3>
                <span className="px-2 py-0.2 bg-amber-400 text-slate-900 font-extrabold text-[9px] rounded-full uppercase">
                  {application.ats_score}% ATS Match
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Applied for: <strong className="text-amber-300">{application.job_title}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Stage Progression Bar */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Recruitment Stage Advancement
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
              {stages.map((stg) => (
                <button
                  key={stg}
                  onClick={() => handleStageChange(stg)}
                  className={`px-2 py-2 rounded-xl text-[10px] font-bold transition text-center border ${
                    application.status === stg
                      ? 'bg-navy-gradient text-white border-[#0b1c30] shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {stg}
                </button>
              ))}
            </div>
          </div>

          {/* Star Rating & Experience */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-1.5">
                Recruiter Candidate Rating
              </span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setStarRating(star)}
                    className="text-2xl transition hover:scale-110 focus:outline-none"
                  >
                    <span
                      className={`material-symbols-outlined ${
                        star <= starRating ? 'text-amber-400 font-fill' : 'text-slate-300'
                      }`}
                      style={{ fontVariationSettings: star <= starRating ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      star
                    </span>
                  </button>
                ))}
                <span className="text-xs font-bold text-slate-600 ml-2">({starRating}/5)</span>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-700 block mb-1.5">
                Resume Version & Experience
              </span>
              <p className="text-xs text-slate-800 font-bold">{application.resume_version || 'Primary ATS Resume'}</p>
              <p className="text-[11px] text-slate-500">{application.experience_years || '6+ Years Professional Experience'}</p>
            </div>
          </div>

          {/* Skills Breakdown */}
          {application.skills && application.skills.length > 0 && (
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-2">
                Parsed Technical Skills
              </span>
              <div className="flex flex-wrap gap-1.5">
                {application.skills.map((sk) => (
                  <span
                    key={sk}
                    className="px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-900 rounded-lg text-xs font-bold"
                  >
                    ✓ {sk}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tailored Cover Letter Content */}
          <div>
            <span className="text-xs font-bold text-slate-700 block mb-2">
              Submitted Cover Letter
            </span>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 font-mono whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto">
              {application.cover_letter || 'No cover letter attached.'}
            </div>
          </div>

          {/* Internal Recruiter Notes Editor */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Internal Recruiter Notes & Evaluation
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Add feedback regarding interview performance, compensation expectations, or next steps..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-amber-400 focus:bg-white transition"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div>
            {savedSuccess && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                Scorecard saved!
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition"
            >
              Close
            </button>
            <button
              onClick={handleSave}
              className="btn-primary-titan text-xs py-2 px-5 shadow-sm"
            >
              <span className="material-symbols-outlined text-sm text-amber-400">save</span>
              <span>Save Scorecard</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
