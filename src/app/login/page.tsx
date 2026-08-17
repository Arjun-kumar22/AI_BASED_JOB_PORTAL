'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { portalStore } from '@/lib/store';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '';
  const paramMode = searchParams.get('mode');
  const paramRole = searchParams.get('role');

  const [currentMode, setCurrentMode] = useState<'login' | 'signup'>(
    paramMode === 'signup' ? 'signup' : 'login'
  );
  const [selectedRole, setSelectedRole] = useState<'candidate' | 'employer'>(
    paramRole === 'employer' ? 'employer' : 'candidate'
  );
  const [fullName, setFullName] = useState('Sergii');
  const [email, setEmail] = useState('sergii@company.com');
  const [phone, setPhone] = useState('+44 7700 900234');
  const [password, setPassword] = useState('titan123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showGoogleModal, setShowGoogleModal] = useState(false);

  useEffect(() => {
    if (paramMode === 'signup') setCurrentMode('signup');
    if (paramRole === 'employer') setSelectedRole('employer');
    else if (paramRole === 'candidate') setSelectedRole('candidate');
  }, [paramMode, paramRole]);

  useEffect(() => {
    if (!customElements.get('dotlottie-wc')) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.4/dist/dotlottie-wc.js';
      script.type = 'module';
      document.body.appendChild(script);
    }
  }, []);

  const handleModeSwitch = (mode: 'login' | 'signup') => {
    setCurrentMode(mode);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleAutoFill = (role: 'candidate' | 'employer') => {
    setSelectedRole(role);
    setErrorMessage('');
    setSuccessMessage('');
    if (role === 'employer') {
      setEmail('employer@titan.com');
      setPassword('titan123');
      setFullName('Sarah Mitchell');
      setPhone('+44 7911 123456');
    } else {
      setEmail('sergii@company.com');
      setPassword('titan123');
      setFullName('Sergii');
      setPhone('+44 7700 900234');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    if (currentMode === 'signup') {
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: fullName,
            email,
            password,
            role: selectedRole,
            phone: phone || undefined,
          }),
        });

        const data = await response.json();

        if (!response.ok || data.status === 'error') {
          setErrorMessage(data.message || 'Registration failed. Please verify your details.');
          setIsLoading(false);
          return;
        }

        setSuccessMessage('Account registered in database! Setting up your workspace...');
        portalStore.loginWithCredentials(email, selectedRole, fullName, phone, data.data?.id);

        setTimeout(() => {
          setIsLoading(false);
          if (redirectUrl) {
            router.push(redirectUrl);
          } else if (selectedRole === 'employer') {
            router.push('/recruiter/dashboard');
          } else {
            router.push('/onboarding');
          }
        }, 600);

      } catch (err: any) {
        setErrorMessage('Failed to connect to registration server. Please try again.');
        setIsLoading(false);
      }
    } else {
      // Direct Login mode
      portalStore.loginWithCredentials(email, selectedRole, fullName, phone);
      setTimeout(() => {
        setIsLoading(false);
        if (redirectUrl) {
          router.push(redirectUrl);
        } else if (selectedRole === 'employer') {
          router.push('/recruiter/dashboard');
        } else {
          router.push('/dashboard');
        }
      }, 300);
    }
  };

  const handleGoogleAuth = (googleEmail: string, googleName: string, role: 'candidate' | 'employer') => {
    setIsLoading(true);
    setTimeout(() => {
      portalStore.loginWithGoogle(role, googleEmail, googleName);
      setIsLoading(false);
      setShowGoogleModal(false);

      if (redirectUrl) {
        router.push(redirectUrl);
      } else if (role === 'employer') {
        router.push('/recruiter/dashboard');
      } else {
        router.push(currentMode === 'signup' ? '/onboarding' : '/dashboard');
      }
    }, 400);
  };

  const isSignUp = currentMode === 'signup';

  return (
    <div
      className="min-h-screen w-screen font-sans select-none overflow-x-hidden flex flex-col justify-between p-3 sm:p-5 lg:p-8"
      style={{
        background: 'linear-gradient(135deg, #091728 0%, #11253e 40%, #1a365d 75%, #254778 100%)',
        color: '#ffffff'
      }}
    >
      {/* Top Header Bar */}
      <div className="w-full flex items-center justify-between z-20 max-w-[1500px] mx-auto pb-2">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 rounded-xl flex items-center justify-center p-1 border border-white/20 transition-transform group-hover:scale-105 shadow-sm">
            <Image
              src="/images/titan-official-logo.png"
              alt="TITAN Crest"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div className="leading-tight">
            <span className="font-extrabold text-xs sm:text-sm text-white block">
              Taj Institute of Technology &
            </span>
            <span className="font-bold text-[10px] sm:text-xs text-amber-300 block">
              Applied Networks (TITAN)
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold text-slate-200 transition flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-sm">home</span>
          <span className="hidden sm:inline">Back to Home</span>
        </Link>
      </div>

      {/* FULL SCREEN SPLIT CONTAINER WITH EXACT SIDE-SWAPPING TRANSITIONS */}
      <div
        id="main-split-container"
        className={`flex-1 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10 my-auto z-10 transition-all duration-700 max-w-[1400px] mx-auto w-full ${
          isSignUp ? 'lg:flex-row-reverse' : 'lg:flex-row'
        }`}
      >
        {/* CHARACTER & BRAND HEADLINE PANEL */}
        <div
          id="character-panel"
          className="w-full lg:w-1/2 flex flex-col items-center justify-center text-center p-2 lg:px-6 overflow-hidden shrink-0 transition-all duration-700"
        >
          <div className="w-full max-w-xl text-center items-center justify-center my-auto px-2 mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-2 text-center mx-auto">
              <span className="text-gold-gradient">Your future in</span> <br />
              <span className="text-navy-gradient text-sky-400">technology</span>{' '}
              <span className="text-white">starts here.</span>
            </h1>

            <p className="text-white text-xs sm:text-sm font-medium leading-relaxed max-w-md mb-2 text-center mx-auto opacity-95">
              Access the most advanced technical education resources and connect with industry-leading precision.
            </p>

            {/* CENTERED DOTLOTTIE ANIMATED CHARACTER WITH 3D MIRROR FLIP */}
            <div className="my-1 flex justify-center items-center mx-auto">
              {React.createElement('dotlottie-wc', {
                id: 'lottie-player',
                src: 'https://lottie.host/c61bf7bf-27ad-4efe-8466-579a0c44177e/RPQTmWfgRs.lottie',
                style: {
                  width: isSignUp ? '320px' : '360px',
                  height: isSignUp ? '320px' : '360px',
                  transform: isSignUp ? 'scaleX(-1)' : 'scaleX(1)',
                  transition: 'transform 0.6s ease'
                },
                autoplay: true,
                loop: true
              })}
            </div>

            {/* CENTERED TWO CARDS BELOW */}
            <div className="flex items-center justify-center gap-4 sm:gap-8 mt-1 mx-auto">
              {/* Card 1: ISO Certified */}
              <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/15 p-2 px-3.5 rounded-2xl shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center text-white shrink-0">
                  <span className="material-symbols-outlined text-base">verified_user</span>
                </div>
                <div className="flex flex-col text-left leading-tight">
                  <span className="font-extrabold text-xs text-white">ISO Certified</span>
                  <span className="text-[10px] text-slate-300">Industry Standards</span>
                </div>
              </div>

              {/* Card 2: 50k+ Alumni */}
              <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/15 p-2 px-3.5 rounded-2xl shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center text-white shrink-0">
                  <span className="material-symbols-outlined text-base">group</span>
                </div>
                <div className="flex flex-col text-left leading-tight">
                  <span className="font-extrabold text-xs text-white">50k+ Alumni</span>
                  <span className="text-[10px] text-slate-300">Global Network</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FORM CARD MODAL */}
        <div
          id="form-panel"
          className="w-full lg:w-1/2 flex flex-col justify-center items-center p-2 lg:px-4 shrink-0 transition-all duration-700"
        >
          <div
            id="form-card-modal"
            className={`w-full ${
              isSignUp ? 'max-w-[480px] p-6 sm:p-7' : 'max-w-[440px] p-6 sm:p-8'
            } bg-white rounded-3xl shadow-2xl text-slate-900 border border-slate-100 flex flex-col justify-between my-auto transition-all duration-400`}
          >
            {/* Top Switchers Row */}
            <div className="flex justify-between items-center w-full mb-3 gap-2">
              {/* Role Toggle */}
              <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold border border-slate-200">
                <button
                  type="button"
                  onClick={() => setSelectedRole('candidate')}
                  className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition ${
                    selectedRole === 'candidate'
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Candidate
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('employer')}
                  className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition ${
                    selectedRole === 'employer'
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Employer
                </button>
              </div>

              {/* Mode Toggle (Log In / Sign Up) */}
              <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold border border-slate-200">
                <button
                  type="button"
                  onClick={() => handleModeSwitch('login')}
                  className={`px-4 py-1 rounded-lg transition-all text-xs font-extrabold ${
                    !isSignUp
                      ? 'bg-navy-gradient text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 font-bold'
                  }`}
                >
                  Log In
                </button>
                <button
                  type="button"
                  onClick={() => handleModeSwitch('signup')}
                  className={`px-4 py-1 rounded-lg transition-all text-xs font-extrabold ${
                    isSignUp
                      ? 'bg-navy-gradient text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 font-bold'
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>

            {/* Logo Centered */}
            <div className="w-full flex justify-center items-center mb-1">
              <Image
                src="/images/titan-official-logo.png"
                alt="TITAN Logo"
                width={44}
                height={44}
                className="object-contain filter drop-shadow-sm"
              />
            </div>

            {/* Title & Subtitle */}
            <div className="text-center mb-3">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-1">
                {isSignUp ? 'Create Titans Account' : 'Welcome Back'}
              </h2>
              <p className="text-slate-500 text-xs font-medium">
                {isSignUp
                  ? 'Join TITAN Portal to start your career journey'
                  : 'Enter your credentials to access the workspace'}
              </p>
            </div>

            {/* Demo Autofill Bar */}
            <div className="mb-3 bg-sky-50 border border-sky-100 rounded-xl p-1.5 px-3 flex justify-between items-center text-xs">
              <span className="font-bold text-[11px] text-sky-900 flex items-center gap-1">
                <span>⚡</span>
                <span>Demo Fill:</span>
              </span>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => handleAutoFill('candidate')}
                  className="px-2.5 py-0.5 bg-white border border-sky-200 rounded-lg font-bold text-sky-700 text-[11px] hover:bg-sky-100 transition shadow-2xs cursor-pointer"
                >
                  Candidate
                </button>
                <button
                  type="button"
                  onClick={() => handleAutoFill('employer')}
                  className="px-2.5 py-0.5 bg-white border border-sky-200 rounded-lg font-bold text-sky-700 text-[11px] hover:bg-sky-100 transition shadow-2xs cursor-pointer"
                >
                  Employer
                </button>
              </div>
            </div>

            {/* Error and Success Feedback Banners */}
            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-semibold flex items-center gap-2 animate-fade-in">
                <span className="material-symbols-outlined text-base text-rose-600 shrink-0">error</span>
                <span>{errorMessage}</span>
              </div>
            )}
            {successMessage && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fade-in">
                <span className="material-symbols-outlined text-base text-emerald-600 shrink-0">check_circle</span>
                <span>{successMessage}</span>
              </div>
            )}

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-3 text-left">
              {/* Full Name (Sign Up Mode) */}
              {isSignUp && (
                <div className="transition-all duration-300 animate-fade-in">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3.5 text-amber-500 text-lg pointer-events-none z-10">
                      person
                    </span>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      placeholder="e.g. Jake Richards"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-20 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 outline-none focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/15 transition shadow-2xs"
                    />
                    <span className="absolute right-3 text-[9px] font-extrabold tracking-wider text-sky-700 uppercase bg-sky-100 px-1.5 py-0.5 rounded-md opacity-90 pointer-events-none">
                      NAME
                    </span>
                  </div>
                </div>
              )}

              {/* Email / Username */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email or Username</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-amber-500 text-lg pointer-events-none z-10">
                    mail
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@company.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-24 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 outline-none focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/15 transition shadow-2xs"
                  />
                  <span className="absolute right-3 text-[9px] font-extrabold tracking-wider text-sky-700 uppercase bg-sky-100 px-2 py-0.5 rounded-md opacity-90 pointer-events-none">
                    TITAN ID
                  </span>
                </div>
              </div>

              {/* Phone (Sign Up Mode) */}
              {isSignUp && (
                <div className="transition-all duration-300 animate-fade-in">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone / Country Code</label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3.5 text-amber-500 text-lg pointer-events-none z-10">
                      call
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+44 7700 900234"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 outline-none focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/15 transition shadow-2xs"
                    />
                  </div>
                </div>
              )}

              {/* Password Field */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-slate-700">Password</label>
                  {!isSignUp && (
                    <a href="#" className="text-xs font-bold text-sky-600 hover:underline">
                      Forgot Password?
                    </a>
                  )}
                </div>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-amber-500 text-lg pointer-events-none z-10">
                    lock
                  </span>
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

              {/* Checkbox Row */}
              <div className="flex items-center gap-2 pt-0.5 text-xs text-slate-600">
                <input
                  type="checkbox"
                  id="terms"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-sky-600 rounded border-slate-300 focus:ring-amber-400 cursor-pointer"
                />
                <label htmlFor="terms" className="font-medium cursor-pointer">
                  {isSignUp ? 'I agree to the Terms & Privacy Policy' : 'Remember me for 30 days'}
                </label>
              </div>

              {/* Navy Blue Linear Gradient Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full font-black text-sm py-3 rounded-xl shadow-lg bg-navy-gradient text-white hover:opacity-95 transition-all flex items-center justify-center gap-2 mt-1 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>{isSignUp ? 'Register Account' : 'Login'}</span>
                )}
              </button>
            </form>

            {/* Or continue with Divider */}
            <div className="my-2.5 text-center text-xs font-semibold text-slate-400 flex items-center gap-3">
              <div className="h-px bg-slate-200 flex-1" />
              <span>Or continue with</span>
              <div className="h-px bg-slate-200 flex-1" />
            </div>

            {/* Google OAuth Button */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setShowGoogleModal(true)}
                className="w-full py-2.5 rounded-xl border border-slate-200 bg-white flex items-center justify-center gap-2.5 text-slate-700 text-xs font-black shadow-xs hover:bg-slate-50 transition cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"/>
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
                  <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12s.7 2.3 1.9 4.7l3.7-2.9z"/>
                  <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"/>
                </svg>
                <span>{isSignUp ? 'Sign Up with Google Email' : 'Continue with Google'}</span>
              </button>
            </div>

            {/* Footer Switcher Link */}
            <div className="text-center text-xs text-slate-500 font-medium pt-3">
              <span>{isSignUp ? 'Already have an account?' : "Don't have an account?"}</span>
              <button
                type="button"
                onClick={() => handleModeSwitch(isSignUp ? 'login' : 'signup')}
                className="text-sky-600 font-extrabold hover:underline ml-1 cursor-pointer"
              >
                {isSignUp ? 'Login Here' : 'Register Now'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Google Account Picker Modal Simulation */}
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
                <span className="font-extrabold text-sm text-slate-900">Sign In with Google</span>
              </div>
              <button onClick={() => setShowGoogleModal(false)} className="text-slate-400 hover:text-slate-700">
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Select a Google account to authenticate as <strong>{selectedRole.toUpperCase()}</strong>:
            </p>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() =>
                  handleGoogleAuth('jake.richards.dev@gmail.com', 'Jake Richards', selectedRole)
                }
                className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center gap-3 transition text-left"
              >
                <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-900 font-black text-xs flex items-center justify-center">
                  J
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Jake Richards</h4>
                  <p className="text-[10px] text-slate-500">jake.richards.dev@gmail.com</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleGoogleAuth('sarah.mitchell.hr@gmail.com', 'Sarah Mitchell', selectedRole)
                }
                className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center gap-3 transition text-left"
              >
                <div className="w-8 h-8 rounded-full bg-sky-600 text-white font-black text-xs flex items-center justify-center">
                  S
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Sarah Mitchell</h4>
                  <p className="text-[10px] text-slate-500">sarah.mitchell.hr@gmail.com</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Legal bar */}
      <div className="w-full text-center text-[11px] text-slate-400 z-20">
        © 2026 Taj Institute of Technology & Applied Networks (TITAN). 256-Bit Encrypted Session.
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-navy-deep-gradient" />}>
      <LoginContent />
    </Suspense>
  );
}
