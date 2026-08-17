'use client';

import React, { useState } from 'react';
import { RoadmapMilestone } from '@/lib/types';

export default function RoadmapDisplay() {
  const [currentRole, setCurrentRole] = useState('Full-Stack Engineer');
  const [targetRole, setTargetRole] = useState('Principal AI Architect');
  const [isGenerated, setIsGenerated] = useState(true);

  const [milestones, setMilestones] = useState<RoadmapMilestone[]>([
    {
      dayRange: 'Days 1 – 30',
      phase: 'Phase 1: Foundation & Skill Gap Remediation',
      title: 'Core AI & Advanced Distributed Systems',
      focus: 'Master LLM Fine-Tuning, Vector Embeddings, and Redis/PostgreSQL query optimization.',
      actionItems: [
        { id: 'm1-1', text: 'Complete PyTorch & Transformer Attention Mechanisms deep dive', done: true },
        { id: 'm1-2', text: 'Build a low-latency RAG vector search prototype with Qdrant and LangChain', done: true },
        { id: 'm1-3', text: 'Refactor current resume using the TITAN AI Resume Builder', done: false }
      ],
      recommendedSkills: ['PyTorch', 'Transformers', 'FastAPI', 'Vector Databases', 'Qdrant'],
      resources: [
        { name: 'TITAN AI Engineering Handbook', type: 'Guide', url: '#' },
        { name: 'HuggingFace NLP Course', type: 'Course', url: '#' }
      ]
    },
    {
      dayRange: 'Days 31 – 60',
      phase: 'Phase 2: High-Impact Project & System Architecture',
      title: 'Production Multi-Tenant AI Platform',
      focus: 'Architect and deploy an enterprise-grade AI system with rate limiting, Docker, and AWS ECS.',
      actionItems: [
        { id: 'm2-1', text: 'Deploy Next.js 14 + Python FastAPI full-stack microservices project', done: false },
        { id: 'm2-2', text: 'Add quantitative metrics to GitHub portfolio (e.g. 99.9% uptime, <50ms latency)', done: false },
        { id: 'm2-3', text: 'Practice 10 STAR interview questions in the Mock Interview Coach', done: false }
      ],
      recommendedSkills: ['Next.js 14', 'Docker', 'Kubernetes', 'System Design', 'Redis Caching'],
      resources: [
        { name: 'Designing Data-Intensive Applications', type: 'Book', url: '#' },
        { name: 'AWS Cloud Architect Certification Lab', type: 'Lab', url: '#' }
      ]
    },
    {
      dayRange: 'Days 61 – 90',
      phase: 'Phase 3: Executive Positioning & Tailored Applications',
      title: 'Interview Execution & Salary Negotiation',
      focus: 'Target Tier-1 tech employers with 1-Click Tailored Applications and achieve 95%+ ATS match score.',
      actionItems: [
        { id: 'm3-1', text: 'Submit 1-click applications to 15 verified employers on TITAN', done: false },
        { id: 'm3-2', text: 'Complete 3 technical mock interview rounds with STAR feedback', done: false },
        { id: 'm3-3', text: 'Prepare compensation counter-offer benchmarks using the Salary Calculator', done: false }
      ],
      recommendedSkills: ['Executive Communication', 'Salary Negotiation', 'System Architecture Whiteboarding'],
      resources: [
        { name: 'TITAN 2026 Tech Salary Benchmark Report', type: 'Report', url: '#' },
        { name: 'Executive Behavioral Mastery Guide', type: 'Guide', url: '#' }
      ]
    }
  ]);

  const toggleActionItem = (phaseIndex: number, itemId: string) => {
    setMilestones(prev => {
      const next = [...prev];
      const items = next[phaseIndex].actionItems.map(item =>
        item.id === itemId ? { ...item, done: !item.done } : item
      );
      next[phaseIndex] = { ...next[phaseIndex], actionItems: items };
      return next;
    });
  };

  const handleGenerate = () => {
    setIsGenerated(true);
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 sm:p-8 bg-navy-gradient text-white">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 bg-amber-400 text-slate-900 font-extrabold text-[10px] uppercase rounded-full tracking-wider">
            AI Career Path
          </span>
          <span className="text-xs text-amber-300 font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">flag</span>
            Phased Career Transition Roadmap
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          30-60-90 Day Career Action Roadmap
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
          Enter your current role and dream role. Our AI generator will construct concrete phase milestones, skill gap targets, and study resources.
        </p>
      </div>

      {/* Role Configurator */}
      <div className="p-6 sm:p-8 border-b border-slate-200 bg-slate-50">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
          <div className="sm:col-span-5 space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Current Role</label>
            <input
              type="text"
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value)}
              className="titan-input text-xs"
              placeholder="e.g. Full-Stack Engineer"
            />
          </div>

          <div className="sm:col-span-5 space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Target Career Goal</label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="titan-input text-xs"
              placeholder="e.g. Principal AI Architect"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              onClick={handleGenerate}
              className="w-full btn-gold-titan text-xs py-2.5 px-4 shadow-sm"
            >
              Regenerate
            </button>
          </div>
        </div>
      </div>

      {/* Roadmap Phased Milestones */}
      {isGenerated && (
        <div className="p-6 sm:p-8 space-y-8">
          {milestones.map((m, idx) => (
            <div
              key={m.dayRange}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 relative"
            >
              {/* Phase Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-navy-gradient text-amber-400 flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                    P{idx + 1}
                  </span>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600">
                      {m.dayRange} — {m.phase}
                    </span>
                    <h4 className="text-base font-extrabold text-slate-900">{m.title}</h4>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 self-start sm:self-auto">
                  {m.recommendedSkills.slice(0, 3).map(sk => (
                    <span key={sk} className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-bold rounded-md">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Focus Subtitle */}
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                🎯 <strong>Primary Objective:</strong> {m.focus}
              </p>

              {/* Action Checkpoints */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 block">Milestone Checkpoints:</span>
                <div className="space-y-1.5">
                  {m.actionItems.map(item => (
                    <div
                      key={item.id}
                      onClick={() => toggleActionItem(idx, item.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 text-xs ${
                        item.done
                          ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900'
                          : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      <span className={`material-symbols-outlined text-base ${item.done ? 'text-emerald-600 font-fill' : 'text-slate-400'}`}>
                        {item.done ? 'check_box' : 'check_box_outline_blank'}
                      </span>
                      <span className={item.done ? 'line-through font-medium opacity-80' : 'font-semibold'}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curated Resources */}
              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
                <span className="text-[11px] font-bold text-slate-500">Recommended Resources:</span>
                {m.resources.map(res => (
                  <span key={res.name} className="inline-flex items-center gap-1 text-xs text-amber-700 hover:text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                    <span className="material-symbols-outlined text-xs">menu_book</span>
                    {res.name} ({res.type})
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
