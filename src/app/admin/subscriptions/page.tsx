'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';

export default function AdminSubscriptionsPage() {
  const tiers = [
    { name: 'Starter Academy', price: '$149 / mo', accounts: '5 Seats', badge: 'Active (42 Inst)' },
    { name: 'Professional Institute', price: '$499 / mo', accounts: '20 Seats', badge: 'Active (86 Inst)' },
    { name: 'Global Enterprise', price: '$1,299 / mo', accounts: 'Unlimited', badge: 'Active (18 Inst)' }
  ];

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-slate-800 flex">
      <Sidebar role="admin" />

      <div className="flex-1 ml-56 md:ml-60 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
        <div className="bg-navy-gradient text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-400/20 space-y-2">
          <span className="px-2.5 py-0.5 bg-amber-400 text-slate-900 font-extrabold text-[10px] uppercase rounded-full">
            Academy Tiers
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Academy Subscriptions & Invoicing</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Institutional license management, active seat allocations, and recurring billing cycles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((t) => (
            <div key={t.name} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 font-black text-[10px] rounded-full uppercase">
                {t.badge}
              </span>
              <h3 className="text-lg font-black text-[#0b1c30]">{t.name}</h3>
              <div className="text-2xl font-black text-[#1d3989]">{t.price}</div>
              <p className="text-xs text-slate-500">Seat Capacity: <strong className="text-slate-800">{t.accounts}</strong></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
