import React from 'react';
import AuthGuard from '@/components/AuthGuard';

export default function ResumeBuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard allowedRoles={['candidate']}>{children}</AuthGuard>;
}
