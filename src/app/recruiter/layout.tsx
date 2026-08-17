import React from 'react';
import AuthGuard from '@/components/AuthGuard';

export default function RecruiterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard allowedRoles={['employer']}>{children}</AuthGuard>;
}
