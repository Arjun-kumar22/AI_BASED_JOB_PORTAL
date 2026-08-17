'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AtsScannerWidget from '@/components/AtsScannerWidget';
import SalaryCalculator from '@/components/SalaryCalculator';
import BorderBeamCard from '@/components/BorderBeamCard';
import { portalStore } from '@/lib/store';
import { Job } from '@/lib/types';

export default function LandingPage() {
  const router = useRouter();
  const [journeyMode, setJourneyMode] = useState<'seekers' | 'employers'>('seekers');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const jobs = portalStore.getJobs().slice(0, 4);
  const taxonomies = portalStore.getTaxonomies();

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/jobs?q=${encodeURIComponent(searchQuery)}&loc=${encodeURIComponent(selectedLocation)}`);
  };

  const trendingTags = ['Next.js 14', 'Python FastAPI', 'PyTorch & LLMs', 'Cloud Systems', 'Remote'];

  const testimonials = [
    {
      name: 'Sarah Jenkins',
      role: 'Staff Full-Stack Engineer @ Lumina AI',
      avatar: '/images/candidate-avatar.jpg',
      quote: 'The AI ATS resume optimizer pinpointed 4 crucial missing microservices keywords. I secured 3 interviews and achieved a +38% salary jump in 14 days.',
      jump: '+38% Salary Jump',
      time: 'Hired in 14 Days'
    },
    {
      name: 'David Chen',
      role: 'VP of Engineering @ Vortex Dynamics',
      avatar: '/images/employer-avatar.jpg',
      quote: 'The 6-stage Kanban ATS pipeline and candidate scorecards saved our hiring managers 20+ hours weekly. The AI ATS match accuracy is astounding.',
      jump: '4.8x Faster Hiring',
      time: 'Verified Employer'
    },
    {
      name: 'Marcus Brody',
      role: 'Principal Cloud Architect @ Nexus Labs',
      avatar: '/images/user-avatar.jpg',
      quote: 'The 30-60-90 day roadmap and STAR mock interview coach prepared me for the exact system architecture questions asked by Tier-1 tech panels.',
      jump: '$210k Compensation',
      time: 'Placed via Titans'
    }
  ];

  const faqs = [
    {
      q: 'How does the Titans AI ATS Resume Scanner calculate its score?',
      a: 'The algorithm extracts required domain competencies, years of experience, and quantifiable metrics from target job descriptions, evaluating your resume across 4 dimensions: Keyword Fit (35%), Impact Metrics (25%), Formatting Structure (20%), and Seniority/Experience (20%).'
    },
    {
      q: 'Is Titans Job Portal free for candidate job seekers?',
      a: 'Yes! Job seekers receive 100% free access to the Job Search engine, AI ATS Resume Analyzer, 5-Tab AI Career Hub, STAR Mock Interview Coach, and the live A4 Resume Builder with unlimited PDF downloads.'
    },
    {
      q: 'How does the 1-Click Tailored Application system work?',
      a: 'When you click "1-Click Apply", Titans automatically synthesizes your profile experience with the target job requirements, generates a customized cover letter in your selected tone, and syncs your resume directly into the Recruiter’s ATS Kanban pipeline.'
    },
    {
      q: 'How do employers get the "✓ Verified Employer" trust badge?',
      a: 'Employers submit company credentials and corporate email domains, which are audited through the Super Admin Governance Center before granting the official verified badge.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f6fa] text-slate-800">
      <Navbar />

      {/* 1. Dynamic Hero Section with Dual Journey Switcher */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-navy-gradient text-white">
        {/* Glowing ambient background orbs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none animate-glow-orb-1" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none animate-glow-orb-2" />

        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-10 relative z-10">
          {/* Dual Journey Switcher Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center p-1.5 bg-slate-900/80 rounded-2xl border border-amber-400/30 backdrop-blur-md shadow-2xl">
              <button
                onClick={() => setJourneyMode('seekers')}
                className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                  journeyMode === 'seekers'
                    ? 'bg-amber-400 text-slate-900 shadow-md transform scale-102'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-base">person</span>
                <span>For Job Seekers</span>
              </button>
              <button
                onClick={() => setJourneyMode('employers')}
                className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                  journeyMode === 'employers'
                    ? 'bg-amber-400 text-slate-900 shadow-md transform scale-102'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-base">business</span>
                <span>For Employers & Recruiters</span>
              </button>
            </div>
          </div>

          {/* Hero Headline & Subtext */}
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-amber-300 backdrop-blur-md">
              <span className="material-symbols-outlined text-sm text-amber-400">auto_awesome</span>
              <span>Next-Generation AI Career Intelligence Platform</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              {journeyMode === 'seekers' ? (
                <>
                  Land Your Dream Tech Role with <br />
                  <span className="text-gold-gradient">Algorithmic ATS Precision</span>
                </>
              ) : (
                <>
                  Hire Top 1% Tech Talent with <br />
                  <span className="text-gold-gradient">AI Screening & 6-Stage Kanban</span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {journeyMode === 'seekers'
                ? 'Equipped with real-time ATS resume keyword scoring, 24/7 STAR mock interview coaching, and 1-click tailored applications directly into recruiter pipelines.'
                : 'Automated job description generation, algorithmic applicant matching, real-time candidate scorecards, and video interview dispatching without third-party friction.'}
            </p>
          </div>

          {/* Live Search Bar */}
          <div className="max-w-4xl mx-auto mt-10">
            <form
              onSubmit={handleHeroSearch}
              className="bg-white p-2.5 sm:p-3 rounded-2xl shadow-2xl border border-amber-400/40 grid grid-cols-1 sm:grid-cols-12 gap-2 text-slate-800"
            >
              <div className="sm:col-span-5 flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200">
                <span className="material-symbols-outlined text-amber-500 text-xl">search</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Job title, skills (e.g. Next.js, AI Engineer)..."
                  className="w-full bg-transparent text-xs font-semibold outline-none text-slate-800"
                />
              </div>

              <div className="sm:col-span-4 flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200">
                <span className="material-symbols-outlined text-sky-600 text-xl">location_on</span>
                <input
                  type="text"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  placeholder="Location (e.g. Remote, London, NY)..."
                  className="w-full bg-transparent text-xs font-semibold outline-none text-slate-800"
                />
              </div>

              <div className="sm:col-span-3">
                <button
                  type="submit"
                  className="w-full h-full btn-gold-titan text-xs py-3 px-4 shadow-sm"
                >
                  <span className="material-symbols-outlined text-base">explore</span>
                  <span>Explore Jobs</span>
                </button>
              </div>
            </form>

            {/* Trending Search Tags */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="text-slate-300 font-bold">Trending:</span>
              {trendingTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSearchQuery(tag);
                    router.push(`/jobs?q=${encodeURIComponent(tag)}`);
                  }}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white text-[11px] font-semibold transition"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Platform Metrics Ticker */}
          <div className="mt-14 pt-8 border-t border-slate-700/60 grid grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-4xl mx-auto">
            <div>
              <span className="text-2xl sm:text-3xl font-black text-amber-400 block">15,000+</span>
              <span className="text-xs text-slate-300 font-medium">Verified Candidates</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-amber-400 block">450+</span>
              <span className="text-xs text-slate-300 font-medium">Tech Employers</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-amber-400 block">98%</span>
              <span className="text-xs text-slate-300 font-medium">ATS Match Accuracy</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-amber-400 block">14 Days</span>
              <span className="text-xs text-slate-300 font-medium">Average Time-to-Hire</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Instant AI ATS Resume Scanner Widget */}
      <section className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-10 -mt-10 relative z-20">
        <AtsScannerWidget />
      </section>

      {/* 3. Interactive Salary Benchmark Calculator Tool */}
      <section className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-10 py-16">
        <SalaryCalculator />
      </section>

      {/* 4. Domain Category Navigator */}
      <section className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-10 py-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="px-3 py-1 bg-amber-100 text-amber-900 text-[10px] font-extrabold rounded-full uppercase tracking-wider">
            Explore Disciplines
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0b1c30] tracking-tight">
            High-Growth Technical Domains
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Browse verified job vacancies and short-term locum contracts across high-demand specialties.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {taxonomies.map((tax) => (
            <Link
              key={tax.id}
              href={`/jobs?cat=${encodeURIComponent(tax.slug)}`}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-lg hover:border-amber-400 transition-all text-center flex flex-col items-center justify-between group"
            >
              <div className="w-12 h-12 rounded-2xl bg-navy-gradient text-amber-400 flex items-center justify-center font-bold mb-3 shadow-sm group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">{tax.icon}</span>
              </div>
              <h3 className="font-extrabold text-xs text-slate-900 group-hover:text-[#1d3989] transition">
                {tax.name}
              </h3>
              <span className="text-[11px] text-slate-500 font-semibold mt-1">
                {tax.count} Open Roles
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Featured & Trending Jobs Feed */}
      <section className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-10 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-black text-[#0b1c30] tracking-tight">
              Featured Job Openings
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified tech positions with algorithmic ATS match indicators.
            </p>
          </div>
          <Link
            href="/jobs"
            className="btn-primary-titan text-xs py-2 px-4 shadow-sm self-start sm:self-auto"
          >
            <span>View All Openings</span>
            <span className="material-symbols-outlined text-sm text-amber-400">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-amber-400 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 rounded font-black text-[10px] uppercase">
                      {job.type}
                    </span>
                    {job.is_verified_employer && (
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-extrabold text-[10px] flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-xs">verified</span>
                        Verified Employer
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-extrabold text-[#0b1c30] mt-2">
                    <Link href={`/jobs/${job.id}`} className="hover:text-[#1d3989] transition">
                      {job.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-slate-600 font-semibold">{job.company} • {job.location}</p>
                </div>

                <div className="w-12 h-12 rounded-xl bg-navy-gradient text-amber-400 flex flex-col items-center justify-center text-center shadow-xs shrink-0">
                  <span className="font-black text-xs leading-none">94%</span>
                  <span className="text-[8px] font-bold uppercase text-slate-300">ATS</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-sans">
                {job.description}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                <span className="font-extrabold text-[#0b1c30]">{job.salary}</span>
                <Link
                  href={`/jobs/${job.id}`}
                  className="px-3 py-1.5 bg-navy-gradient text-white text-xs font-bold rounded-lg hover:opacity-90 transition flex items-center gap-1"
                >
                  <span>1-Click Apply</span>
                  <span className="material-symbols-outlined text-xs text-amber-400">bolt</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Shadcn Magic UI Orbiting Border Beam Employer Plans */}
      <section className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-10 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="px-3 py-1 bg-amber-100 text-amber-900 text-[10px] font-extrabold rounded-full uppercase tracking-wider">
            Employer Solutions
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0b1c30] tracking-tight">
            Institutional Recruitment & Campus Drive Plans
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Powered by high-precision candidate scoring and automated Kanban ATS pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Plan 1 */}
          <BorderBeamCard variant="gold">
            <div className="p-8 space-y-6 flex flex-col justify-between h-full">
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Starter Tier</span>
                <h3 className="text-2xl font-black text-[#0b1c30]">Starter Academy</h3>
                <div className="text-3xl font-black text-[#0b1c30] pt-2">
                  $149 <span className="text-xs font-normal text-slate-500">/ month</span>
                </div>
                <p className="text-xs text-slate-500">For small bootcamps and growing tech teams.</p>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                  Up to 5 Sub-accounts
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                  Standard ATS Job Matching
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                  Basic Analytics Dashboard
                </li>
              </ul>

              <Link
                href="/advertise"
                className="w-full btn-primary-titan text-xs py-3 text-center"
              >
                Select Starter
              </Link>
            </div>
          </BorderBeamCard>

          {/* Plan 2: Most Popular with Navy Beam */}
          <BorderBeamCard variant="navy">
            <div className="p-8 space-y-6 flex flex-col justify-between h-full relative">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600">Growth Tier</span>
                  <span className="px-2.5 py-0.5 bg-amber-400 text-slate-900 font-black text-[9px] rounded-full uppercase">
                    Most Popular
                  </span>
                </div>
                <h3 className="text-2xl font-black text-[#0b1c30]">Professional Institute</h3>
                <div className="text-3xl font-black text-[#0b1c30] pt-2">
                  $499 <span className="text-xs font-normal text-slate-500">/ month</span>
                </div>
                <p className="text-xs text-slate-500">For regional institutes and fast-scaling startups.</p>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                  Up to 20 Sub-accounts
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                  6-Stage Interactive ATS Kanban Board
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                  AI Auto-Fill Job Description Engine
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                  Interview Video Hub & Scheduler
                </li>
              </ul>

              <Link
                href="/advertise"
                className="w-full btn-gold-titan text-xs py-3 text-center shadow-md"
              >
                Select Professional
              </Link>
            </div>
          </BorderBeamCard>

          {/* Plan 3 */}
          <BorderBeamCard variant="gold">
            <div className="p-8 space-y-6 flex flex-col justify-between h-full">
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Enterprise Tier</span>
                <h3 className="text-2xl font-black text-[#0b1c30]">Global Enterprise</h3>
                <div className="text-3xl font-black text-[#0b1c30] pt-2">
                  $1,299 <span className="text-xs font-normal text-slate-500">/ month</span>
                </div>
                <p className="text-xs text-slate-500">Full-scale institutional control & custom RAG knowledge base.</p>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                  Unlimited Sub-accounts
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                  Custom AI Evaluation Logic
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                  Dedicated Campus Drives & RAG Manager
                </li>
              </ul>

              <Link
                href="/advertise"
                className="w-full btn-primary-titan text-xs py-3 text-center"
              >
                Contact Enterprise
              </Link>
            </div>
          </BorderBeamCard>
        </div>
      </section>

      {/* 7. Testimonials & Social Proof */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-10">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="px-3 py-1 bg-amber-400/20 text-amber-300 text-[10px] font-extrabold rounded-full uppercase tracking-wider">
              Proven Results
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Placed Talent & Partner Testimonials
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 bg-amber-400 text-slate-900 font-black text-[10px] rounded-full uppercase">
                      {t.jump}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold">{t.time}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-serif">
                    &quot;{t.quote}&quot;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-slate-700">
                  <div className="w-9 h-9 rounded-full overflow-hidden relative border border-amber-400/50 bg-slate-700 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={36}
                      height={36}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="truncate">
                    <h3 className="text-xs font-bold text-white truncate">{t.name}</h3>
                    <p className="text-[10px] text-slate-400 truncate">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Interactive FAQ Accordion */}
      <section className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-10 py-16">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="px-3 py-1 bg-amber-100 text-amber-900 text-[10px] font-extrabold rounded-full uppercase tracking-wider">
            Clear Answers
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0b1c30] tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-slate-800 hover:bg-slate-50 transition"
              >
                <span>{faq.q}</span>
                <span className="material-symbols-outlined text-base text-slate-400">
                  {openFaq === i ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              {openFaq === i && (
                <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
