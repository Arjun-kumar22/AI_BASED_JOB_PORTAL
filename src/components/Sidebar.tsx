'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { portalStore } from '@/lib/store';
import { User } from '@/lib/types';

interface SidebarProps {
  role?: 'candidate' | 'employer' | 'admin';
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setUser(portalStore.getUser());
    const unsub = portalStore.subscribe(() => {
      setUser(portalStore.getUser());
    });
    return () => unsub();
  }, []);

  const currentRole = role || user?.role || 'candidate';

  const handleLogout = () => {
    portalStore.logout();
    router.push('/login');
  };

  const candidateMenu = [
    { label: 'Profile Overview', href: '/dashboard', icon: 'person', emoji: '👤' },
    { label: 'Applied Jobs', href: '/dashboard?tab=applied', icon: 'send_and_archive', emoji: '📑' },
    { label: 'Saved Jobs', href: '/candidate/saved-jobs', icon: 'bookmark', emoji: '🔖' },
    { label: 'Application Tracking', href: '/candidate/tracking', icon: 'alt_route', emoji: '🧭' },
    { label: 'AI Career Hub (5 Tabs)', href: '/ai-coach', icon: 'smart_toy', badge: 'AI', emoji: '🤖' },
    { label: 'AI Resume Builder', href: '/resume-builder', icon: 'post_add', badge: 'PDF', emoji: '📄' },
    { label: 'Resume Manager', href: '/resumes', icon: 'description', emoji: '📂' },
    { label: 'Direct Messages', href: '/candidate/messages', icon: 'chat', emoji: '💬' },
    { label: 'Interviews Calendar', href: '/candidate/interviews', icon: 'calendar_month', emoji: '📅' },
    { label: 'Find Open Jobs', href: '/jobs', icon: 'travel_explore', emoji: '🔍' },
  ];

  const recruiterMenu = [
    { label: 'Command Center', href: '/recruiter/dashboard', icon: 'dashboard', emoji: '📊' },
    { label: 'ATS Kanban Pipeline', href: '/recruiter/pipeline', icon: 'view_kanban', badge: 'HOT', emoji: '📋' },
    { label: 'Post a Job (AI Writer)', href: '/recruiter/jobs/new', icon: 'add_circle', badge: '✨', emoji: '✍️' },
    { label: 'Interview Scheduler', href: '/recruiter/interviews', icon: 'video_camera_front', emoji: '🎥' },
    { label: 'Direct Messages', href: '/candidate/messages', icon: 'chat', emoji: '💬' },
    { label: 'Employer Plans', href: '/advertise', icon: 'workspace_premium', emoji: '👑' },
    { label: 'Browse Tech Talent', href: '/jobs', icon: 'group', emoji: '👥' },
  ];

  const adminMenu = [
    { label: 'Governance Center', href: '/admin/dashboard', icon: 'admin_panel_settings', emoji: '🛡️' },
    { label: 'User & Verification Hub', href: '/admin/users', icon: 'verified_user', badge: '✓', emoji: '✅' },
    { label: 'Job Moderation Queue', href: '/admin/moderation', icon: 'fact_check', emoji: '📝' },
    { label: 'Telemetry & Growth', href: '/admin/analytics', icon: 'insights', emoji: '📈' },
    { label: 'Feature Flags & Taxonomies', href: '/admin/settings', icon: 'tune', emoji: '⚙️' },
    { label: 'RAG Announcements', href: '/admin/rag', icon: 'campaign', emoji: '📢' },
    { label: 'Server Cluster Health', href: '/admin/server', icon: 'dns', emoji: '🖥️' },
    { label: 'Revenue Analytics', href: '/admin/revenue', icon: 'payments', emoji: '💰' },
    { label: 'Master Schedule', href: '/admin/schedule', icon: 'event', emoji: '🗓️' },
    { label: 'Academy Subscriptions', href: '/admin/subscriptions', icon: 'card_membership', emoji: '💳' },
    { label: 'Help & Compliance', href: '/admin/help', icon: 'help', emoji: '❓' },
  ];

  const menuItems = currentRole === 'admin' ? adminMenu : currentRole === 'employer' ? recruiterMenu : candidateMenu;

  return (
    <aside className="w-56 md:w-60 bg-white border-r border-slate-200 text-slate-700 flex flex-col p-3 fixed top-0 bottom-0 left-0 z-40 shadow-xs select-none">
      {/* Centered Top Logo */}
      <div className="flex flex-col items-center justify-center gap-1.5 mb-3 pb-3 border-b border-slate-200/80 px-1 pt-1 text-center w-full">
        <Link href="/" className="flex flex-col items-center hover:opacity-90 transition group">
          <Image
            src="/images/titan-official-logo.png"
            alt="Titan Logo"
            width={48}
            height={48}
            className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
            priority
          />
          <div className="text-center mt-1 leading-tight">
            <span className="font-extrabold text-[11px] text-[#0b1c30] block uppercase tracking-tight">
              Taj Institute of Technology &
            </span>
            <span className="font-bold text-[10px] text-[#1d3989] block uppercase tracking-tight">
              Applied Networks
            </span>
          </div>
        </Link>
      </div>

      {/* Role Badge Indicator */}
      <div className="px-2 mb-2">
        <div className="px-2.5 py-1 bg-slate-100 rounded-lg flex items-center justify-between text-[10px] font-extrabold uppercase text-slate-600 border border-slate-200">
          <span>
            {currentRole === 'admin' ? '🛡️ Portal: ADMIN' : currentRole === 'employer' ? '🏢 Portal: EMPLOYER' : '👤 Portal: CANDIDATE'}
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto space-y-1 pr-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href.includes('?') && pathname === item.href.split('?')[0]);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-navy-gradient text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-[#0b1c30]'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <span className="text-sm shrink-0">{item.emoji}</span>
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-black shrink-0 ${
                  isActive ? 'bg-amber-400 text-slate-900' : 'bg-amber-100 text-amber-900'
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile & Logout Card */}
      <div className="pt-2 border-t border-slate-200 space-y-2">
        <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full overflow-hidden relative border border-amber-400/50 shrink-0 bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-xs">
            {mounted && user?.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name || 'User'}
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            ) : (
              (mounted && user?.name ? user.name.charAt(0) : 'U')
            )}
          </div>
          <div className="truncate flex-1">
            <p className="text-xs font-bold text-slate-900 truncate">
              {mounted && user?.name ? user.name : 'Titan User'}
            </p>
            <p className="text-[10px] text-slate-500 truncate">
              {mounted && (user?.title || user?.email) ? (user.title || user.email) : 'Active Session'}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full py-1.5 px-3 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition"
        >
          <span>🚪</span>
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
