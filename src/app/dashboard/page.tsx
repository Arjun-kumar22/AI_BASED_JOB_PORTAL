'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Sidebar from '@/components/Sidebar';
import { portalStore } from '@/lib/store';
import { Job, Application, User } from '@/lib/types';

export default function CandidateDashboardPage() {
  const [user, setUser] = useState<User | null>(portalStore.getUser());
  const [applications, setApplications] = useState<Application[]>(portalStore.getApplications());
  const [jobs] = useState<Job[]>(portalStore.getJobs());
  const [savedJobs] = useState(portalStore.getSavedJobs());
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(user?.name || 'Jake Richards');
  const [editTitle, setEditTitle] = useState(user?.title || 'Senior Full-Stack Engineer');
  const [editLocation, setEditLocation] = useState(user?.location || 'Manchester, UK');
  const [editBio, setEditBio] = useState(user?.bio || '');

  useEffect(() => {
    const unsub = portalStore.subscribe(() => {
      const u = portalStore.getUser();
      setUser(u);
      if (u) {
        setEditName(u.name);
        setEditTitle(u.title);
        setEditLocation(u.location);
        setEditBio(u.bio || '');
      }
      setApplications(portalStore.getApplications());
    });
    return () => unsub();
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    portalStore.setUser({
      ...user,
      name: editName,
      title: editTitle,
      location: editLocation,
      bio: editBio
    });
    setIsEditingProfile(false);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const b64 = evt.target?.result as string;
      portalStore.setUser({
        ...user,
        avatar: b64
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-slate-800 flex">
      {/* Sidebar Navigation */}
      <Sidebar role="candidate" />

      {/* Main Content Pane (Standard padding across portal) */}
      <div className="flex-1 ml-56 md:ml-60 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
        {/* Profile Hero Card (Navy Blue Linear Gradient) */}
        <div className="bg-navy-gradient text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-amber-400/20">
          <div className="flex items-center gap-5">
            {/* Avatar with Camera Trigger */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl overflow-hidden border-2 border-amber-400 shadow-xl bg-slate-900 text-amber-400 flex items-center justify-center font-black text-2xl shrink-0 group">
              {user?.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                user?.name?.charAt(0) || 'J'
              )}

              <label
                htmlFor="candidate-avatar-input"
                className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer"
                title="Change Profile Avatar"
              >
                <span className="material-symbols-outlined text-xl">photo_camera</span>
                <input
                  id="candidate-avatar-input"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-3xl font-black text-white">{user?.name}</h1>
                <span className="px-2.5 py-0.5 bg-amber-400 text-slate-900 font-extrabold text-[10px] uppercase rounded-full">
                  PREMIUM
                </span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-amber-300">{user?.title}</p>
              <p className="text-xs text-slate-300 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">location_on</span>
                {user?.location || 'Manchester, United Kingdom'} • Available for Immediate Placement
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">edit</span>
              <span>Edit Profile</span>
            </button>

            <Link
              href="/ai-coach"
              className="btn-gold-titan text-xs py-2 px-4 shadow-md"
            >
              <span className="material-symbols-outlined text-sm">smart_toy</span>
              <span>Launch AI Career Hub</span>
            </Link>
          </div>
        </div>

        {/* Profile Edit Modal / Inline Accordion */}
        {isEditingProfile && (
          <form onSubmit={handleSaveProfile} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 animate-fade-in">
            <h3 className="text-sm font-black text-[#0b1c30]">Update Profile Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="titan-input text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Professional Title</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="titan-input text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Location</label>
                <input
                  type="text"
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  className="titan-input text-xs"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Bio</label>
              <textarea
                rows={2}
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                className="titan-input text-xs"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsEditingProfile(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary-titan text-xs py-2 px-5"
              >
                Save Details
              </button>
            </div>
          </form>
        )}

        {/* Overview KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Active Applications
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#0b1c30]">
              {applications.length}
            </div>
            <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">trending_up</span>
              2 Under Active Review
            </span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              ATS Compatibility Index
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-500">
              {user?.score || 94}%
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Top 5% Candidate Score</span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Profile Views
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#0b1c30]">
              1,284
            </div>
            <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">visibility</span>
              +18% this month
            </span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Saved Roles
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#0b1c30]">
              {savedJobs.length}
            </div>
            <Link href="/candidate/saved-jobs" className="text-[11px] text-amber-600 font-bold hover:underline">
              View Bookmarks →
            </Link>
          </div>
        </div>

        {/* 2-Column Section: Active Applications + Recommended Jobs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Active Applications Pipeline */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-sm text-[#0b1c30]">Active Applications Stream</h3>
                <p className="text-xs text-slate-500">Real-time status across recruiter Kanban boards</p>
              </div>
              <Link href="/candidate/tracking" className="text-xs font-bold text-amber-600 hover:underline">
                Full Tracking →
              </Link>
            </div>

            <div className="space-y-3">
              {applications.slice(0, 4).map((app) => (
                <div
                  key={app.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-xs text-slate-900">{app.job_title}</h4>
                    <p className="text-[11px] text-slate-500 font-medium">{app.company} • Applied {app.applied_date}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 bg-amber-100 text-amber-900 rounded-lg text-[10px] font-extrabold uppercase">
                      {app.status}
                    </span>
                    <span className="text-xs font-black text-[#0b1c30] bg-white px-2 py-1 rounded-lg border border-slate-200">
                      {app.ats_score}% ATS
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: AI Recommended Matches */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-sm text-[#0b1c30]">AI Recommended Matches</h3>
                <p className="text-xs text-slate-500">Based on your parsed skills profile</p>
              </div>
              <Link href="/jobs" className="text-xs font-bold text-amber-600 hover:underline">
                All Jobs →
              </Link>
            </div>

            <div className="space-y-3">
              {jobs.slice(0, 3).map((job) => (
                <div key={job.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-xs text-slate-900">{job.title}</h4>
                    <span className="text-xs font-bold text-emerald-600">94% Fit</span>
                  </div>
                  <p className="text-[11px] text-slate-600">{job.company} • {job.salary}</p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] font-bold text-slate-400">{job.location}</span>
                    <Link
                      href={`/jobs/${job.id}`}
                      className="px-2.5 py-1 bg-navy-gradient text-white text-[10px] font-bold rounded-lg"
                    >
                      View & Apply
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
