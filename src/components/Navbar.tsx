'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { portalStore } from '@/lib/store';
import { User } from '@/lib/types';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    setUser(portalStore.getUser());
    const unsub = portalStore.subscribe(() => {
      setUser(portalStore.getUser());
    });
    return () => unsub();
  }, []);

  const handleRoleSwitch = (role: 'candidate' | 'employer' | 'admin') => {
    portalStore.loginRole(role);
    setIsProfileOpen(false);
    if (role === 'candidate') router.push('/dashboard');
    else if (role === 'employer') router.push('/recruiter/dashboard');
    else if (role === 'admin') router.push('/admin/dashboard');
  };

  const handleLogout = () => {
    portalStore.logout();
    setIsProfileOpen(false);
    router.push('/login');
  };

  const getDashboardUrl = () => {
    if (user.role === 'employer') return '/recruiter/dashboard';
    if (user.role === 'admin') return '/admin/dashboard';
    return '/dashboard';
  };

  const navLinks = [
    { label: 'Find Jobs', href: '/jobs', emoji: '🔍' },
    { label: 'Locum Roles', href: '/locum', emoji: '⚡' },
    { label: 'AI Career Hub', href: '/ai-coach', badge: '✨ AI', emoji: '🤖' },
    { label: 'Resume Builder', href: '/resume-builder', emoji: '📄' },
    { label: 'Recruiter ATS', href: '/recruiter/dashboard', emoji: '📊' },
    { label: 'Plans & Pricing', href: '/advertise', emoji: '💎' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-10 py-3 flex items-center justify-between">
        {/* Brand Logo & Two-Line Title */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center p-0.5 transition-transform group-hover:scale-105">
            <Image
              src="/images/titan-official-logo.png"
              alt="Titan Emblem"
              width={44}
              height={44}
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-extrabold text-xs md:text-sm text-[#0b1c30] tracking-tight">
              Taj Institute of Technology &
            </span>
            <span className="font-bold text-[11px] md:text-xs text-[#1d3989] tracking-tight flex items-center gap-1.5">
              <span>Applied Networks</span>
              <span className="px-1.5 py-0.2 bg-amber-100 text-amber-900 rounded font-black text-[9px] uppercase tracking-wider">
                TITAN
              </span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-navy-gradient text-white shadow-xs font-bold'
                    : 'text-slate-600 hover:text-[#0b1c30] hover:bg-slate-100'
                }`}
              >
                <span className="text-xs">{link.emoji}</span>
                <span>{link.label}</span>
                {link.badge && (
                  <span className="px-1.5 py-0.2 bg-amber-400 text-[#0b1c30] rounded-full text-[9px] font-black animate-pulse">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Auth / Profile Actions */}
        <div className="flex items-center gap-3">
          {mounted && user ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full hover:bg-slate-100 transition border border-slate-200"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden relative border border-amber-400/60 shrink-0 bg-slate-900 text-amber-400 flex items-center justify-center font-black text-xs">
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    user.name.charAt(0)
                  )}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-bold text-[#0b1c30] leading-none">
                    {user.name.split(' ')[0]}
                  </span>
                  <span className="text-[10px] text-amber-600 font-extrabold uppercase leading-none mt-0.5">
                    {user.role === 'admin' ? '🛡️ ADMIN' : user.role === 'employer' ? '🏢 RECRUITER' : '👤 CANDIDATE'}
                  </span>
                </div>
                <span className="text-xs text-slate-500 font-bold ml-0.5">▼</span>
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-fade-in">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">{user.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-amber-100 text-amber-900 font-extrabold text-[9px] rounded-full uppercase">
                      Active: {user.role.toUpperCase()}
                    </span>
                  </div>

                  <div className="p-2 space-y-0.5">
                    <Link
                      href={getDashboardUrl()}
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full px-3 py-2 text-left text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-xl flex items-center gap-2.5 transition"
                    >
                      <span className="text-sm">📊</span>
                      <span>Workspace Dashboard</span>
                    </Link>

                    <Link
                      href="/ai-coach"
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full px-3 py-2 text-left text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-xl flex items-center gap-2.5 transition"
                    >
                      <span className="text-sm">🤖</span>
                      <span>AI Career Hub (5 Tabs)</span>
                    </Link>

                    <Link
                      href="/resume-builder"
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full px-3 py-2 text-left text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-xl flex items-center gap-2.5 transition"
                    >
                      <span className="text-sm">📄</span>
                      <span>AI Resume Builder (PDF)</span>
                    </Link>
                  </div>

                  <div className="border-t border-slate-100 px-3 py-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase px-1 mb-1">Quick Role Switcher</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() => handleRoleSwitch('candidate')}
                        className={`px-2 py-1.5 rounded-lg text-[10px] font-bold transition flex items-center justify-center gap-1 ${
                          user?.role === 'candidate' ? 'bg-amber-400 text-slate-900 shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        <span>👤</span>
                        <span>Seeker</span>
                      </button>
                      <button
                        onClick={() => handleRoleSwitch('employer')}
                        className={`px-2 py-1.5 rounded-lg text-[10px] font-bold transition flex items-center justify-center gap-1 ${
                          user?.role === 'employer' ? 'bg-amber-400 text-slate-900 shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        <span>🏢</span>
                        <span>Recruiter</span>
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 p-2">
                    <button
                      onClick={handleLogout}
                      className="w-full px-3 py-2 text-left text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-2 transition"
                    >
                      <span>🚪</span>
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-[#0b1c30] transition flex items-center gap-1.5"
              >
                <span>🔑</span>
                <span>Sign In</span>
              </Link>
              <Link
                href="/login"
                className="btn-primary-titan text-xs py-2 px-4 shadow-md flex items-center gap-1.5"
              >
                <span>🚀</span>
                <span>Get Started</span>
              </Link>
            </div>
          )}

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl text-lg font-bold"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-3 space-y-1 shadow-lg animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100"
            >
              <span>{link.emoji}</span>
              <span>{link.label}</span>
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-100 flex gap-2">
            <Link
              href={getDashboardUrl()}
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full btn-primary-titan text-xs py-2 text-center flex items-center justify-center gap-1.5"
            >
              <span>📊</span>
              <span>Open Dashboard</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
