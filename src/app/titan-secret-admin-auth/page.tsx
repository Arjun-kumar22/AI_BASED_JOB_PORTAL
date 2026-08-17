'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { portalStore } from '@/lib/store';

function SecretAdminAuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/admin/dashboard';

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('admin@titan.com');
  const [password, setPassword] = useState('admin123');
  const [adminName, setAdminName] = useState('Titan Super Admin');
  const [securityKey, setSecurityKey] = useState('TITAN-SEC-9942');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);

  useEffect(() => {
    if (!customElements.get('dotlottie-wc')) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.4/dist/dotlottie-wc.js';
      script.type = 'module';
      document.body.appendChild(script);
    }
  }, []);

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      portalStore.loginWithCredentials(email, 'admin', adminName);
      setIsLoading(false);
      router.push(redirectUrl);
    }, 400);
  };

  const handleGoogleAuth = (customEmail?: string) => {
    setIsLoading(true);
    setTimeout(() => {
      portalStore.loginWithGoogle(
        'admin',
        customEmail || 'admin.master@titan-networks.org',
        'Chief System Administrator (Google Verified)',
        '/images/admin-avatar.jpg'
      );
      setIsLoading(false);
      setShowGoogleModal(false);
      router.push(redirectUrl);
    }, 400);
  };

  const handleQuickFill = () => {
    setEmail('admin@titan.com');
    setPassword('admin123');
    setAdminName('Titan Super Admin');
    setSecurityKey('TITAN-SEC-9942');
  };

  return (
    <div className="h-screen w-screen select-none overflow-hidden flex flex-col justify-between p-4 sm:p-6 lg:p-10 bg-navy-deep-gradient text-white">
      {/* Top Header Bar */}
      <div className="w-full flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center p-1 border border-amber-400/40 shadow-lg">
            <Image
              src="/images/titan-official-logo.png"
              alt="TITAN Emblem"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div className="leading-tight">
            <span className="font-black text-xs sm:text-sm text-white flex items-center gap-1.5">
              <span>TITAN Master Governance Gateway</span>
              <span className="px-1.5 py-0.2 bg-purple-500/30 text-purple-300 border border-purple-400/40 text-[9px] font-extrabold uppercase rounded">
                RESTRICTED
              </span>
            </span>
            <span className="font-bold text-[10px] sm:text-xs text-amber-300">
              Administrative Control Node
            </span>
          </div>
        </div>

        <Link
          href="/"
          className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold text-slate-200 transition flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-sm">home</span>
          <span className="hidden sm:inline">Exit to Main Portal</span>
        </Link>
      </div>

      {/* Main Split Layout with Side-Swapping */}
      <div
        className={`flex-1 flex flex-col lg:flex-row items-center justify-between gap-6 my-auto z-10 transition-all duration-700 ${
          isSignUp ? 'lg:flex-row-reverse' : ''
        }`}
      >
        {/* CHARACTER & SECURITY HEADLINE PANEL */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center text-center p-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 text-xs font-black uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-sm text-purple-400">shield_lock</span>
            <span>Super Administrator Clearance Required</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-2">
            <span className="text-gold-gradient">Central Governance</span> <br />
            <span className="text-navy-gradient text-sky-400">& Telemetry Node</span>
          </h1>

          <p className="text-white text-xs sm:text-sm font-medium leading-relaxed max-w-md mb-2 opacity-90">
            Authoritative access point for user credential audits, job moderation queues, RAG announcement indexing, and server cluster operations.
          </p>

          {/* Uncontained DotLottie Animation with 3D Mirror Flip */}
          <div className="my-1 flex justify-center items-center">
            {React.createElement('dotlottie-wc', {
              id: 'lottie-player-admin',
              src: 'https://lottie.host/c61bf7bf-27ad-4efe-8466-579a0c44177e/RPQTmWfgRs.lottie',
              style: {
                width: '320px',
                height: '320px',
                transform: isSignUp ? 'scaleX(-1)' : 'scaleX(1)',
                transition: 'transform 0.6s ease'
              },
              autoplay: true,
              loop: true
            })}
          </div>

          {/* Security Credentials */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mt-1">
            <div className="px-3.5 py-1.5 bg-white/10 rounded-xl border border-white/20 flex items-center gap-2 backdrop-blur-md">
              <span className="material-symbols-outlined text-purple-400 text-sm">enhanced_encryption</span>
              <span className="text-[11px] font-bold text-white">256-Bit Hardware Token</span>
            </div>
            <div className="px-3.5 py-1.5 bg-white/10 rounded-xl border border-white/20 flex items-center gap-2 backdrop-blur-md">
              <span className="material-symbols-outlined text-emerald-400 text-sm">verified_user</span>
              <span className="text-[11px] font-bold text-white">Root Clearance</span>
            </div>
          </div>
        </div>

        {/* AUTH FORM CARD */}
        <div className="w-full lg:w-1/2 max-w-md mx-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-amber-400/40 text-slate-800 space-y-4 animate-fade-in">
            {/* Form Top Switcher */}
            <div className="flex justify-between items-center w-full pb-1">
              <span className="px-2 py-0.5 bg-purple-100 text-purple-900 font-extrabold text-[10px] rounded uppercase">
                Admin Gateway
              </span>
              <div className="flex bg-slate-100 p-1 rounded-2xl text-xs font-bold border border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className={`px-3.5 py-1 rounded-xl transition-all font-extrabold ${
                    !isSignUp ? 'btn-navy-gradient text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Master Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setIsSignUp(true)}
                  className={`px-3.5 py-1 rounded-xl transition-all font-bold ${
                    isSignUp ? 'btn-navy-gradient text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Sign Up Invite
                </button>
              </div>
            </div>

            {/* Title */}
            <div className="text-center space-y-0.5">
              <h3 className="text-xl font-extrabold text-[#0b1c30]">
                {isSignUp ? 'Register Admin Node' : 'Super Admin Authentication'}
              </h3>
              <p className="text-xs text-slate-500">
                {isSignUp ? 'Enter institutional invite code & admin credentials' : 'Authenticate with master keys or Google Workspace'}
              </p>
            </div>

            {/* 1-Click Master Quick Fill */}
            <div className="p-2 bg-purple-50 rounded-2xl border border-purple-100 flex items-center justify-between text-xs">
              <span className="text-[11px] font-bold text-purple-950">⚡ Master Demo Key:</span>
              <button
                type="button"
                onClick={handleQuickFill}
                className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-[11px] transition shadow-xs"
              >
                Auto-Fill Admin
              </button>
            </div>

            {/* Google OAuth Button for Admin */}
            <div>
              <button
                type="button"
                onClick={() => setShowGoogleModal(true)}
                className="w-full py-2.5 rounded-2xl border border-slate-200 bg-white flex items-center justify-center gap-2.5 text-slate-700 text-xs font-extrabold shadow-xs hover:bg-slate-50 transition"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"/>
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
                  <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12s.7 2.3 1.9 4.7l3.7-2.9z"/>
                  <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"/>
                </svg>
                <span>{isSignUp ? 'Sign Up with Google Workspace' : 'Sign In with Google Workspace'}</span>
              </button>
            </div>

            <div className="my-1 text-center text-xs font-semibold text-slate-400 flex items-center gap-3">
              <div className="h-px bg-slate-100 flex-1" />
              <span>Or master credentials</span>
              <div className="h-px bg-slate-100 flex-1" />
            </div>

            {/* Form */}
            <form onSubmit={handleAdminSubmit} className="space-y-3">
              {isSignUp && (
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Admin Full Name</label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3.5 text-amber-500 text-lg pointer-events-none z-10">person</span>
                    <input
                      type="text"
                      value={adminName}
                      onChange={(e) => setAdminName(e.target.value)}
                      required
                      placeholder="e.g. Chief Director"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 outline-none focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/15 transition shadow-2xs"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Admin Corporate Email</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-amber-500 text-lg pointer-events-none z-10">mail</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="admin@titan.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-28 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 outline-none focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/15 transition shadow-2xs"
                  />
                  <span className="absolute right-3 text-[9px] font-extrabold tracking-wider text-purple-700 uppercase bg-purple-100 px-2 py-0.5 rounded-md opacity-90 pointer-events-none">
                    SUPER ADMIN
                  </span>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Master Password</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-amber-500 text-lg pointer-events-none z-10">lock</span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-11 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 outline-none focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/15 transition shadow-2xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-slate-400 hover:text-amber-500 transition p-1"
                  >
                    <span className="material-symbols-outlined text-lg">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {isSignUp && (
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Institutional Invite / Security Key</label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3.5 text-amber-500 text-lg pointer-events-none z-10">vpn_key</span>
                    <input
                      type="text"
                      value={securityKey}
                      onChange={(e) => setSecurityKey(e.target.value)}
                      required
                      placeholder="TITAN-SEC-XXXX"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 outline-none focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/15 transition shadow-2xs"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary-titan text-xs py-3 shadow-md mt-2"
              >
                {isLoading ? (
                  <>
                    <span className="inline-block animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent" />
                    <span>Verifying Clearance...</span>
                  </>
                ) : (
                  <>
                    <span>{isSignUp ? 'Create Admin Node' : 'Enter Governance Center'}</span>
                    <span className="material-symbols-outlined text-sm text-amber-400">arrow_forward</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Google Modal Simulation */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-slate-800 space-y-4 shadow-2xl animate-fade-in-up border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"/>
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
                  <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12s.7 2.3 1.9 4.7l3.7-2.9z"/>
                  <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"/>
                </svg>
                <span className="font-extrabold text-sm text-slate-900">Choose Google Account</span>
              </div>
              <button onClick={() => setShowGoogleModal(false)} className="text-slate-400 hover:text-slate-700">
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleGoogleAuth('admin.director@titan-networks.org')}
                className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center gap-3 transition text-left"
              >
                <div className="w-8 h-8 rounded-full bg-purple-700 text-white font-black text-xs flex items-center justify-center">
                  A
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Admin Director</h4>
                  <p className="text-[10px] text-slate-500">admin.director@titan-networks.org</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleGoogleAuth('governance@titan.edu')}
                className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center gap-3 transition text-left"
              >
                <div className="w-8 h-8 rounded-full bg-navy-gradient text-amber-400 font-black text-xs flex items-center justify-center">
                  T
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Governance Institutional</h4>
                  <p className="text-[10px] text-slate-500">governance@titan.edu</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Legal bar */}
      <div className="w-full text-center text-[11px] text-slate-400 z-20">
        © 2026 Taj Institute of Technology & Applied Networks (TITAN). Secret Master Node.
      </div>
    </div>
  );
}

export default function SecretAdminAuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-navy-deep-gradient" />}>
      <SecretAdminAuthContent />
    </Suspense>
  );
}
