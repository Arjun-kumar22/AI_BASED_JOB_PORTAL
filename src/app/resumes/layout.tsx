import React from 'react';
import AuthGuard from '@/components/AuthGuard';

export default function ResumesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard allowedRoles={['candidate']}>{children}</AuthGuard>;
}
