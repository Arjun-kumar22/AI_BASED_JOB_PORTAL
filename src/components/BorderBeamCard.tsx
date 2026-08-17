'use client';

import React from 'react';

interface BorderBeamCardProps {
  children: React.ReactNode;
  variant?: 'gold' | 'navy';
  className?: string;
}

export default function BorderBeamCard({
  children,
  variant = 'gold',
  className = '',
}: BorderBeamCardProps) {
  const beamClass = variant === 'gold' ? 'border-beam-gold' : 'border-beam-navy';

  return (
    <div className={`border-beam-wrapper ${beamClass} ${className}`}>
      <div className="border-beam-content bg-white">
        {children}
      </div>
    </div>
  );
}
