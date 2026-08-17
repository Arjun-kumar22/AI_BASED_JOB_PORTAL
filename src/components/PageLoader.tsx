'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function PageLoader() {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    // Only trigger on explicit page reload/refresh
    try {
      const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (navEntries.length > 0 && navEntries[0].type === 'reload') {
        setShowLoader(true);
        const timer = setTimeout(() => {
          setShowLoader(false);
        }, 700);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.warn('PageLoader error:', e);
    }
  }, []);

  if (!showLoader) return null;

  return (
    <div className="titan-loader-overlay">
      <div className="flex flex-col items-center gap-4 bg-slate-900/90 p-8 rounded-3xl border border-amber-400/30 shadow-2xl backdrop-blur-xl">
        <div className="w-16 h-16 relative flex items-center justify-center">
          <Image
            src="/images/titan-official-logo.png"
            alt="TITAN Crest Logo"
            width={64}
            height={64}
            className="object-contain"
            priority
          />
        </div>
        <div className="three-dots-jumping">
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
        </div>
        <span className="text-[11px] font-bold text-amber-300 tracking-wider uppercase">
          Titans Portal Initializing...
        </span>
      </div>
    </div>
  );
}
