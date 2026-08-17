'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
import { portalStore } from '@/lib/store';

export default function AdminSchedulePage() {
  const interviews = portalStore.getInterviews();

  const calendarEvents = [
    { day: 'Mon 21', name: 'Alex Rivera', role: 'Lead Architect', platform: 'Google Meet', color: 'bg-indigo-100 text-indigo-800' },
    { day: 'Tue 22', name: 'Sam Chen', role: 'Senior UI Specialist', platform: 'Zoom', color: 'bg-amber-100 text-amber-900' },
    { day: 'Thu 24', name: 'Jordan Smith', role: 'DevOps Engineer', platform: 'Zoom', color: 'bg-sky-100 text-sky-800' },
    { day: 'Fri 25', name: 'Elena Vance', role: 'ML Research Lead', platform: 'Microsoft Teams', color: 'bg-emerald-100 text-emerald-800' }
  ];

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-slate-800 flex">
      <Sidebar role="admin" />

      <div className="flex-1 ml-56 md:ml-60 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
        <div className="bg-navy-gradient text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-400/20 space-y-2">
          <span className="px-2.5 py-0.5 bg-amber-400 text-slate-900 font-extrabold text-[10px] uppercase rounded-full">
            Master Calendar
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Interview Master Schedule</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Platform-wide interview operations, panel completion rates, and scheduled rooms.
          </p>
        </div>

        {/* Master Calendar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {calendarEvents.map((evt) => (
            <div key={evt.name} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-slate-900 text-white font-extrabold text-xs rounded-xl">
                  {evt.day}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${evt.color}`}>
                  {evt.platform}
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-sm text-[#0b1c30]">{evt.name}</h3>
                <p className="text-xs text-slate-500 font-bold">{evt.role}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span>Status: Confirmed</span>
                <span className="material-symbols-outlined text-sm text-emerald-600">check_circle</span>
              </div>
            </div>
          ))}
        </div>

        {/* All Active Scheduled Rounds */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-extrabold text-sm text-[#0b1c30]">Active Interview Room Dispatches</h3>

          <div className="space-y-3">
            {interviews.map((iv) => (
              <div key={iv.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <h4 className="font-bold text-slate-900">{iv.candidate_name} — {iv.job_title}</h4>
                  <p className="text-slate-500">{iv.date} @ {iv.time} • Panel: {iv.interviewer}</p>
                </div>
                <a
                  href={iv.meeting_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary-titan text-xs py-1.5 px-4 self-start sm:self-auto"
                >
                  Join Room
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
