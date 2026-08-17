'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { portalStore } from '@/lib/store';
import { Application, KanbanStage } from '@/lib/types';
import CandidateModal from './CandidateModal';

const COLUMNS: { id: KanbanStage; title: string; color: string; dotColor: string }[] = [
  { id: 'Applied', title: 'Applied', color: 'border-slate-300 bg-slate-50/70', dotColor: 'bg-slate-400' },
  { id: 'Screening', title: 'Screening', color: 'border-sky-300 bg-sky-50/50', dotColor: 'bg-sky-500' },
  { id: 'Technical Interview', title: 'Technical Round', color: 'border-indigo-300 bg-indigo-50/50', dotColor: 'bg-indigo-500' },
  { id: 'Final Round', title: 'Final Round', color: 'border-amber-300 bg-amber-50/50', dotColor: 'bg-amber-500' },
  { id: 'Offer Extended', title: 'Offer Extended', color: 'border-purple-300 bg-purple-50/50', dotColor: 'bg-purple-500' },
  { id: 'Hired', title: 'Hired', color: 'border-emerald-300 bg-emerald-50/50', dotColor: 'bg-emerald-500' },
];

export default function KanbanBoard() {
  const [applications, setApplications] = useState<Application[]>(portalStore.getApplications());
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  useEffect(() => {
    const unsub = portalStore.subscribe(() => {
      setApplications(portalStore.getApplications());
    });
    return () => unsub();
  }, []);

  const handleAdvance = (e: React.MouseEvent, appId: number | string, currentStage: KanbanStage) => {
    e.stopPropagation();
    const stageOrder: KanbanStage[] = [
      'Applied',
      'Screening',
      'Technical Interview',
      'Final Round',
      'Offer Extended',
      'Hired'
    ];
    const currentIndex = stageOrder.indexOf(currentStage);
    if (currentIndex < stageOrder.length - 1) {
      const nextStage = stageOrder[currentIndex + 1];
      portalStore.updateApplicationStage(appId, nextStage);
    }
  };

  const handleMoveBack = (e: React.MouseEvent, appId: number | string, currentStage: KanbanStage) => {
    e.stopPropagation();
    const stageOrder: KanbanStage[] = [
      'Applied',
      'Screening',
      'Technical Interview',
      'Final Round',
      'Offer Extended',
      'Hired'
    ];
    const currentIndex = stageOrder.indexOf(currentStage);
    if (currentIndex > 0) {
      const prevStage = stageOrder[currentIndex - 1];
      portalStore.updateApplicationStage(appId, prevStage);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Board Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 items-start">
        {COLUMNS.map((col) => {
          const colApps = applications.filter((a) => a.status === col.id);

          return (
            <div
              key={col.id}
              className={`rounded-2xl border p-3 min-h-[520px] flex flex-col ${col.color}`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/80">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${col.dotColor}`} />
                  <h4 className="font-extrabold text-xs text-slate-800 tracking-tight">
                    {col.title}
                  </h4>
                </div>
                <span className="px-2 py-0.5 bg-white border border-slate-200 text-slate-800 font-extrabold text-[10px] rounded-full shadow-2xs">
                  {colApps.length}
                </span>
              </div>

              {/* Cards Container */}
              <div className="space-y-3 flex-1">
                {colApps.map((app) => (
                  <div
                    key={app.id}
                    onClick={() => setSelectedApp(app)}
                    className="bg-white rounded-xl p-3.5 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-amber-400 transition-all cursor-pointer space-y-2.5 group animate-fade-in"
                  >
                    {/* Candidate Info */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 truncate">
                        <div className="w-7 h-7 rounded-full overflow-hidden relative border border-slate-200 bg-slate-900 text-amber-400 font-black text-[10px] flex items-center justify-center shrink-0">
                          {app.candidate_avatar ? (
                            <Image
                              src={app.candidate_avatar}
                              alt={app.candidate_name}
                              width={28}
                              height={28}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            app.candidate_name.charAt(0)
                          )}
                        </div>
                        <span className="font-bold text-xs text-slate-900 truncate">
                          {app.candidate_name}
                        </span>
                      </div>

                      <span className="px-1.5 py-0.5 bg-amber-100 text-amber-900 font-black text-[9px] rounded uppercase shrink-0">
                        {app.ats_score}% ATS
                      </span>
                    </div>

                    {/* Job Title */}
                    <p className="text-[11px] text-slate-600 font-semibold line-clamp-1">
                      {app.job_title}
                    </p>

                    {/* Star Rating & Experience */}
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                      <div className="flex items-center text-amber-400">
                        {app.star_rating && app.star_rating > 0 ? (
                          <>
                            <span className="material-symbols-outlined text-xs">star</span>
                            <span className="font-bold text-slate-700 ml-0.5">{app.star_rating}</span>
                          </>
                        ) : (
                          <span className="text-slate-400 text-[10px]">Unrated</span>
                        )}
                      </div>
                      <span>{app.applied_date}</span>
                    </div>

                    {/* Quick Stage Move Buttons */}
                    <div className="flex items-center justify-between gap-1 pt-1 opacity-80 group-hover:opacity-100 transition">
                      {col.id !== 'Applied' ? (
                        <button
                          onClick={(e) => handleMoveBack(e, app.id, col.id)}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-[10px] font-bold flex items-center gap-0.5"
                          title="Move to Previous Stage"
                        >
                          <span className="material-symbols-outlined text-[10px]">arrow_back</span>
                        </button>
                      ) : <div />}

                      {col.id !== 'Hired' && (
                        <button
                          onClick={(e) => handleAdvance(e, app.id, col.id)}
                          className="px-2.5 py-1 bg-navy-gradient text-white hover:opacity-90 rounded-md text-[10px] font-bold flex items-center gap-1 shadow-2xs ml-auto"
                          title="Advance to Next Stage"
                        >
                          <span>Advance</span>
                          <span className="material-symbols-outlined text-[10px] text-amber-400">arrow_forward</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {colApps.length === 0 && (
                  <div className="h-32 flex flex-col items-center justify-center text-center p-3 text-slate-400 border border-dashed border-slate-300/80 rounded-xl">
                    <span className="text-[11px] font-medium">No applicants in this stage</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Candidate Profile Scorecard Modal */}
      {selectedApp && (
        <CandidateModal
          application={selectedApp}
          onClose={() => setSelectedApp(null)}
        />
      )}
    </div>
  );
}
