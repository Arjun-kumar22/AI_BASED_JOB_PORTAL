'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { portalStore } from '@/lib/store';

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [targetRole, setTargetRole] = useState('Senior Full-Stack Engineer');
  const [seniority, setSeniority] = useState('Senior');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['React.js', 'Next.js', 'TypeScript', 'Python', 'FastAPI']);
  const [workMode, setWorkMode] = useState('Remote');
  const [salaryExpectation, setSalaryExpectation] = useState('$150,000');

  const availableSkills = [
    'React.js', 'Next.js', 'TypeScript', 'JavaScript', 'Python', 'FastAPI',
    'PostgreSQL', 'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'Tailwind CSS',
    'PyTorch', 'System Design', 'Redis', 'CI/CD'
  ];

  const toggleSkill = (sk: string) => {
    if (selectedSkills.includes(sk)) {
      setSelectedSkills(selectedSkills.filter(s => s !== sk));
    } else {
      setSelectedSkills([...selectedSkills, sk]);
    }
  };

  const handleFinish = () => {
    const user = portalStore.getUser();
    portalStore.setUser({
      ...user,
      title: `${seniority} ${targetRole}`,
      score: 95
    });
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-navy-deep-gradient text-white flex flex-col justify-between p-6 sm:p-10">
      {/* Header */}
      <div className="max-w-[1000px] mx-auto w-full flex items-center justify-between pb-6 border-b border-slate-700/60">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/titan-official-logo.png"
            alt="TITAN"
            width={36}
            height={36}
            className="object-contain"
          />
          <span className="font-extrabold text-sm text-white">Titans Career Setup</span>
        </Link>
        <span className="text-xs font-bold text-amber-300">Step {currentStep} of 4</span>
      </div>

      {/* Body Wizard */}
      <div className="max-w-2xl mx-auto w-full my-auto py-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl text-slate-800 space-y-6 animate-fade-in">
          {/* Progress Indicators */}
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map(s => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all ${
                  s <= currentStep ? 'bg-amber-400' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>

          {/* STEP 1: Seniority & Target Role */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase text-amber-600">Step 1 — Role Objective</span>
                <h2 className="text-2xl font-black text-[#0b1c30]">What role are you targeting?</h2>
                <p className="text-xs text-slate-500">This configures your AI ATS matching and mock interview coach.</p>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Target Job Title</label>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="titan-input text-xs"
                    placeholder="e.g. Senior Full-Stack Engineer"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Seniority Level</label>
                  <div className="grid grid-cols-4 gap-2">
                    {['Entry', 'Mid', 'Senior', 'Lead'].map(lvl => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setSeniority(lvl)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition border ${
                          seniority === lvl
                            ? 'bg-navy-gradient text-white border-[#0b1c30]'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Skill Selector */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase text-amber-600">Step 2 — Technical Stack</span>
                <h2 className="text-2xl font-black text-[#0b1c30]">Select your top core proficiencies</h2>
                <p className="text-xs text-slate-500">Pick at least 4 skills to unlock tailored job recommendations.</p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 max-h-56 overflow-y-auto p-1">
                {availableSkills.map(sk => {
                  const selected = selectedSkills.includes(sk);
                  return (
                    <button
                      key={sk}
                      type="button"
                      onClick={() => toggleSkill(sk)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                        selected
                          ? 'bg-amber-400 text-slate-900 border-amber-500 shadow-2xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {selected ? '✓ ' : '+ '} {sk}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Compensation & Work Mode */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase text-amber-600">Step 3 — Preferences</span>
                <h2 className="text-2xl font-black text-[#0b1c30]">Work style & compensation target</h2>
                <p className="text-xs text-slate-500">Helps our salary benchmark calculator tailor compensation ranges.</p>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Target Base Compensation (Annual)</label>
                  <input
                    type="text"
                    value={salaryExpectation}
                    onChange={(e) => setSalaryExpectation(e.target.value)}
                    className="titan-input text-xs"
                    placeholder="e.g. $160,000"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Preferred Work Mode</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Remote', 'Hybrid', 'On-site'].map(mode => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setWorkMode(mode)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition border ${
                          workMode === mode
                            ? 'bg-navy-gradient text-white border-[#0b1c30]'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Activation */}
          {currentStep === 4 && (
            <div className="space-y-4 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl font-black">
                ✓
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase text-emerald-600">Step 4 — Ready to Launch</span>
                <h2 className="text-2xl font-black text-[#0b1c30]">AI Career Profile Activated!</h2>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Your profile has been initialized with a <strong>95% ATS Compatibility Index</strong>. You are ready to explore jobs, build your A4 resume, and practice STAR interviews.
                </p>
              </div>
            </div>
          )}

          {/* Nav Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
              >
                Back
              </button>
            ) : <div />}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="btn-primary-titan text-xs py-2.5 px-6 shadow-md"
              >
                <span>Continue</span>
                <span className="material-symbols-outlined text-sm text-amber-400">arrow_forward</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="btn-gold-titan text-xs py-2.5 px-8 shadow-md"
              >
                <span>Enter Candidate Workspace</span>
                <span className="material-symbols-outlined text-sm">rocket_launch</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-slate-400">
        © 2026 Taj Institute of Technology & Applied Networks (TITAN).
      </div>
    </div>
  );
}
