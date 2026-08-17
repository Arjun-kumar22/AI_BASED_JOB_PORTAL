'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';

export default function AdminRevenuePage() {
  const transactions = [
    { id: '#TXN-89420', client: 'Nexus Labs Inc.', service: 'Campus Recruitment Drive Plan', amount: '$12,400.00', date: 'Oct 24, 2026', status: 'Paid', class: 'bg-emerald-100 text-emerald-800' },
    { id: '#TXN-89421', client: 'Quantum Dynamics', service: 'Professional Academy Subscription', amount: '$4,990.00', date: 'Oct 23, 2026', status: 'Paid', class: 'bg-emerald-100 text-emerald-800' },
    { id: '#TXN-89422', client: 'Stellar Tech Corp', service: 'Custom ATS Integration Tier', amount: '$15,000.00', date: 'Oct 20, 2026', status: 'Pending', class: 'bg-amber-100 text-amber-800' },
    { id: '#TXN-89423', client: 'Global Horizon Academy', service: 'Starter Recruitment Plan', amount: '$1,490.00', date: 'Oct 19, 2026', status: 'Paid', class: 'bg-emerald-100 text-emerald-800' }
  ];

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-slate-800 flex">
      <Sidebar role="admin" />

      <div className="flex-1 ml-56 md:ml-60 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
        <div className="bg-navy-gradient text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-400/20 space-y-2">
          <span className="px-2.5 py-0.5 bg-amber-400 text-slate-900 font-extrabold text-[10px] uppercase rounded-full">
            Financial Ledger
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Revenue & Institutional Invoicing</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Track subscription recurring revenue, campus placement packages, and audit transactions.
          </p>
        </div>

        {/* 4 Financial KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-slate-400">Total ARR</span>
            <div className="text-2xl sm:text-3xl font-black text-[#0b1c30]">$1,420,500</div>
            <span className="text-[11px] text-emerald-600 font-bold">+18% YoY Growth</span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-slate-400">Monthly Recurring (MRR)</span>
            <div className="text-2xl sm:text-3xl font-black text-amber-500">$82,400</div>
            <span className="text-[11px] text-emerald-600 font-bold">+8% this month</span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-slate-400">Pending Invoices</span>
            <div className="text-2xl sm:text-3xl font-black text-[#0b1c30]">$14,200</div>
            <span className="text-[11px] text-slate-500">1 Outstanding</span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-slate-400">Net Profit Margin</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600">68.4%</div>
            <span className="text-[11px] text-emerald-600 font-bold">Optimal Margin</span>
          </div>
        </div>

        {/* Ledger Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-extrabold text-sm text-[#0b1c30]">Recent Transactions & Campus Invoices</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-extrabold uppercase text-[10px]">
                  <th className="pb-3">Invoice ID</th>
                  <th className="pb-3">Client / Organization</th>
                  <th className="pb-3">Service Tier</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50 transition">
                    <td className="py-3.5 font-mono font-bold text-slate-800">{tx.id}</td>
                    <td className="py-3.5 font-bold text-[#0b1c30]">{tx.client}</td>
                    <td className="py-3.5 text-slate-600">{tx.service}</td>
                    <td className="py-3.5 text-slate-500">{tx.date}</td>
                    <td className="py-3.5 font-extrabold text-slate-900">{tx.amount}</td>
                    <td className="py-3.5 text-right">
                      <span className={`px-2.5 py-0.5 rounded-full font-black text-[10px] uppercase ${tx.class}`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
