'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { portalStore } from '@/lib/store';
import { InterviewSession, Application } from '@/lib/types';

export default function RecruiterInterviewsPage() {
  const [interviews, setInterviews] = useState<InterviewSession[]>(portalStore.getInterviews());
  const [applications] = useState<Application[]>(portalStore.getApplications());
  const [isScheduling, setIsScheduling] = useState(false);

  // Form State
  const [candidateEmail, setCandidateEmail] = useState('jake@titan.com');
  const [candidateName, setCandidateName] = useState('Jake Richards');
  const [jobTitle, setJobTitle] = useState('Senior Full-Stack Engineer');
  const [date, setDate] = useState('Thu, Nov 12, 2026');
  const [time, setTime] = useState('02:00 PM - 03:00 PM');
  const [format, setFormat] = useState<'Technical' | 'Behavioral' | 'System Design' | 'Executive'>('Technical');
  const [meetingUrl, setMeetingUrl] = useState('https://meet.google.com/titan-interview-room');
  const [interviewer, setInterviewer] = useState('Sarah Mitchell & Engineering Panel');

  useEffect(() => {
    const unsub = portalStore.subscribe(() => {
      setInterviews(portalStore.getInterviews());
    });
    return () => unsub();
  }, []);

  const handleSelectApplicant = (appId: string) => {
    const app = applications.find(a => String(a.id) === appId);
    if (app) {
      setCandidateName(app.candidate_name);
      setCandidateEmail(app.candidate_email);
      setJobTitle(app.job_title);
    }
  };

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    portalStore.scheduleInterview({
      candidate_id: 1,
      candidate_name: candidateName,
      candidate_email: candidateEmail,
      job_title: jobTitle,
      company: 'Titan Technology Group',
      date,
      time,
      format,
      meeting_url: meetingUrl,
      interviewer
    });
    setIsScheduling(false);
  };

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-slate-800 flex">
      <Sidebar role="employer" />

      <div className="flex-1 ml-56 md:ml-60 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
        <div className="bg-navy-gradient text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-400/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-amber-400 text-slate-900 font-extrabold text-[10px] uppercase rounded-full">
                Video Hub
              </span>
              <span className="text-xs text-amber-300 font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">calendar_month</span>
                Interview Dispatcher
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Interview Scheduling Hub</h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Assign candidate interview slots, select panel format, and dispatch video meeting URLs with calendar sync.
            </p>
          </div>

          <button
            onClick={() => setIsScheduling(!isScheduling)}
            className="btn-gold-titan text-xs py-2.5 px-6 shadow-md"
          >
            <span className="material-symbols-outlined text-base">add_circle</span>
            <span>Schedule New Slot</span>
          </button>
        </div>

        {/* Modal / Inline Schedule Form */}
        {isScheduling && (
          <form onSubmit={handleSchedule} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4 animate-fade-in">
            <h3 className="text-sm font-black text-[#0b1c30]">Schedule Interview Slot</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Select Candidate</label>
                <select
                  onChange={(e) => handleSelectApplicant(e.target.value)}
                  className="titan-input text-xs"
                >
                  {applications.map(a => (
                    <option key={a.id} value={a.id}>{a.candidate_name} ({a.job_title})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Round Format</label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value as any)}
                  className="titan-input text-xs"
                >
                  <option value="Technical">Technical Coding Round</option>
                  <option value="System Design">System Design & Architecture</option>
                  <option value="Behavioral">Behavioral & Culture Fit</option>
                  <option value="Executive">Executive Leadership Final</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Interview Date & Time</label>
                <input
                  type="text"
                  value={`${date} @ ${time}`}
                  onChange={(e) => {
                    const parts = e.target.value.split('@');
                    if (parts[0]) setDate(parts[0].trim());
                    if (parts[1]) setTime(parts[1].trim());
                  }}
                  className="titan-input text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Video Meeting Room URL</label>
                <input
                  type="text"
                  value={meetingUrl}
                  onChange={(e) => setMeetingUrl(e.target.value)}
                  className="titan-input text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Panel Reviewers</label>
                <input
                  type="text"
                  value={interviewer}
                  onChange={(e) => setInterviewer(e.target.value)}
                  className="titan-input text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsScheduling(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary-titan text-xs py-2 px-6"
              >
                Confirm & Dispatch Invite
              </button>
            </div>
          </form>
        )}

        {/* Interviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {interviews.map((iv) => (
            <div
              key={iv.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-[10px] font-black uppercase">
                    {iv.format} Round
                  </span>
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-extrabold">
                    {iv.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-black text-[#0b1c30]">{iv.candidate_name}</h3>
                  <p className="text-xs text-slate-500 font-bold">{iv.candidate_email}</p>
                  <p className="text-xs text-amber-600 font-bold mt-1">Role: {iv.job_title}</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1 text-xs text-slate-700">
                  <p>📅 <strong>Date:</strong> {iv.date}</p>
                  <p>🕒 <strong>Time:</strong> {iv.time}</p>
                  <p>👥 <strong>Panel:</strong> {iv.interviewer}</p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <a
                  href={iv.meeting_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary-titan text-xs py-2 px-5 shadow-sm"
                >
                  <span className="material-symbols-outlined text-sm text-amber-400">videocam</span>
                  <span>Join Video Call</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
