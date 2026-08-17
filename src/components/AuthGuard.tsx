'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { portalStore } from '@/lib/store';
import { User } from '@/lib/types';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: ('candidate' | 'employer' | 'admin')[];
}

export default function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const currentUser = portalStore.getUser();
      setUser(currentUser);

      if (!currentUser) {
        // Not authenticated
        setIsAuthorized(false);
        if (allowedRoles?.includes('admin') || pathname?.startsWith('/admin')) {
          router.replace(`/titan-secret-admin-auth?redirect=${encodeURIComponent(pathname || '/admin/dashboard')}`);
        } else {
          router.replace(`/login?redirect=${encodeURIComponent(pathname || '/dashboard')}`);
        }
        return;
      }

      // Check role permissions if specified
      if (allowedRoles && allowedRoles.length > 0) {
        if (!allowedRoles.includes(currentUser.role)) {
          setIsAuthorized(false);
          if (allowedRoles.includes('admin')) {
            router.replace(`/titan-secret-admin-auth?redirect=${encodeURIComponent(pathname || '/admin/dashboard')}`);
          } else if (currentUser.role === 'employer') {
            router.replace('/recruiter/dashboard');
          } else if (currentUser.role === 'candidate') {
            router.replace('/dashboard');
          } else {
            router.replace('/login');
          }
          return;
        }
      }

      setIsAuthorized(true);
    };

    checkAuth();
    const unsub = portalStore.subscribe(checkAuth);
    return () => unsub();
  }, [pathname, router, allowedRoles]);

  if (isAuthorized === null || isAuthorized === false) {
    return (
      <div className="min-h-screen bg-navy-deep-gradient text-white flex flex-col items-center justify-center p-6 select-none">
        <div className="text-center space-y-4 max-w-sm mx-auto animate-fade-in">
          <div className="relative w-16 h-16 mx-auto bg-white/10 rounded-2xl p-2 border border-amber-400/40 shadow-xl flex items-center justify-center">
            <Image
              src="/images/titan-official-logo.png"
              alt="TITAN Crest"
              width={56}
              height={56}
              className="object-contain animate-pulse"
            />
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-black text-white tracking-tight">
              Verifying Security Credentials
            </h3>
            <p className="text-xs text-slate-300">
              Validating active session authorization token...
            </p>
          </div>

          <div className="flex items-center justify-center gap-1.5 pt-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
