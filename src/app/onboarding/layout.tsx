import React from 'react';
import AuthGuard from '@/components/AuthGuard';

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard allowedRoles={['candidate']}>{children}</AuthGuard>;
}
