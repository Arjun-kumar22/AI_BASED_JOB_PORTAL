import React from 'react';
import AuthGuard from '@/components/AuthGuard';

export default function CandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard allowedRoles={['candidate']}>{children}</AuthGuard>;
}
