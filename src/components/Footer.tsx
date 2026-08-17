'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-navy-gradient text-white pt-16 pb-12 border-t border-amber-400/20 relative overflow-hidden">
      {/* Background ambient orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-700/60">
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center p-1 border border-white/20">
                <Image
                  src="/images/titan-official-logo.png"
                  alt="TITAN Emblem"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-extrabold text-sm md:text-base text-white tracking-tight">
                  Taj Institute of Technology &
                </h3>
                <p className="font-bold text-xs text-amber-300">
                  Applied Networks (TITAN)
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Next-generation AI-powered career intelligence platform connecting elite technical talent with world-class employers through automated ATS scoring, mock STAR coaching, and 6-stage Kanban recruitment.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-amber-300 font-bold">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">verified</span>
                ISO 9001:2015 Certified
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">group</span>
                50,000+ Placed Alumni
              </span>
            </div>
          </div>

          {/* Col 2: Job Seekers */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-300">
              For Job Seekers
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li><Link href="/jobs" className="hover:text-white transition">Search Tech Jobs</Link></li>
              <li><Link href="/ai-coach" className="hover:text-white transition">AI Career Hub (5 Tabs)</Link></li>
              <li><Link href="/resume-builder" className="hover:text-white transition">ATS Resume Builder</Link></li>
              <li><Link href="/locum" className="hover:text-white transition">Locum Contracts</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition">Seeker Workspace</Link></li>
            </ul>
          </div>

          {/* Col 3: Employers */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-300">
              For Employers
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li><Link href="/recruiter/jobs/new" className="hover:text-white transition">Post a Job (AI Auto-Fill)</Link></li>
              <li><Link href="/recruiter/pipeline" className="hover:text-white transition">6-Stage ATS Kanban</Link></li>
              <li><Link href="/recruiter/interviews" className="hover:text-white transition">Interview Video Hub</Link></li>
              <li><Link href="/advertise" className="hover:text-white transition">Campus Drive Packages</Link></li>
              <li><Link href="/recruiter/dashboard" className="hover:text-white transition">Recruiter Command Center</Link></li>
            </ul>
          </div>

          {/* Col 4: Newsletter Subscription */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-300">
              Stay Connected
            </h4>
            <p className="text-xs text-slate-300">
              Subscribe for weekly curated job opportunities, salary index reports, and AI interview prep prompts.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-900/60 border border-emerald-500/40 rounded-xl text-emerald-200 text-xs font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                Subscribed successfully!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  required
                  className="w-full bg-slate-900/80 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="w-full btn-gold-titan text-xs py-2 shadow-sm"
                >
                  Join Titans Network
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Taj Institute of Technology & Applied Networks (TITAN). All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
