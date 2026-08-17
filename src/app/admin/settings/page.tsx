'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { portalStore } from '@/lib/store';
import { FeatureFlags, CategoryTaxonomy } from '@/lib/types';

export default function AdminSettingsPage() {
  const [flags, setFlags] = useState<FeatureFlags>(portalStore.getFeatureFlags());
  const [taxonomies, setTaxonomies] = useState<CategoryTaxonomy[]>(portalStore.getTaxonomies());
  const [newTaxName, setNewTaxName] = useState('');

  useEffect(() => {
    const unsub = portalStore.subscribe(() => {
      setFlags(portalStore.getFeatureFlags());
      setTaxonomies(portalStore.getTaxonomies());
    });
    return () => unsub();
  }, []);

  const handleToggle = (key: keyof FeatureFlags) => {
    portalStore.toggleFeatureFlag(key);
  };

  const handleAddTaxonomy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaxName.trim()) return;
    portalStore.addTaxonomy(newTaxName.trim());
    setNewTaxName('');
  };

  const handleDeleteTaxonomy = (id: string) => {
    portalStore.deleteTaxonomy(id);
  };

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-slate-800 flex">
      <Sidebar role="admin" />

      <div className="flex-1 ml-56 md:ml-60 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
        <div className="bg-navy-gradient text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-400/20 space-y-2">
          <span className="px-2.5 py-0.5 bg-amber-400 text-slate-900 font-extrabold text-[10px] uppercase rounded-full">
            System Control
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">System Feature Flags & Taxonomies</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Dynamically toggle core AI engines, public registration, maintenance modes, and manage global category taxonomies without code redeployments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Feature Flags */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
            <div>
              <h3 className="font-extrabold text-sm text-[#0b1c30]">Global Feature Toggles</h3>
              <p className="text-xs text-slate-500">Enable or disable system features in real time</p>
            </div>

            <div className="space-y-4">
              {[
                { key: 'ats_scanner', label: 'AI ATS Resume Scanner & Scorecard', desc: 'Allow candidate real-time keyword scoring and radar evaluation.' },
                { key: 'mock_interview', label: 'STAR Mock Interview AI Coach', desc: 'Enable role-specific questions and STAR feedback simulator.' },
                { key: 'auto_jd_writer', label: 'Recruiter AI Auto-Fill JD Generator', desc: '1-click description and responsibilities synthesis.' },
                { key: 'public_registration', label: 'Public User Registration', desc: 'Allow new candidates and employers to register accounts.' },
                { key: 'maintenance_mode', label: 'Platform Maintenance Mode', desc: 'Display maintenance splash screen across public endpoints.' }
              ].map((item) => {
                const isEnabled = flags[item.key as keyof FeatureFlags];

                return (
                  <div
                    key={item.key}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4"
                  >
                    <div className="space-y-0.5">
                      <h4 className="font-extrabold text-xs text-slate-900">{item.label}</h4>
                      <p className="text-[11px] text-slate-500">{item.desc}</p>
                    </div>

                    <button
                      onClick={() => handleToggle(item.key as keyof FeatureFlags)}
                      className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-1 shrink-0 ${
                        isEnabled ? 'bg-emerald-600' : 'bg-slate-300'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          isEnabled ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Category Taxonomies */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
            <div>
              <h3 className="font-extrabold text-sm text-[#0b1c30]">Category Taxonomy Manager</h3>
              <p className="text-xs text-slate-500">Manage technical disciplines displayed on the landing page</p>
            </div>

            {/* Add Taxonomy Form */}
            <form onSubmit={handleAddTaxonomy} className="flex items-center gap-2">
              <input
                type="text"
                value={newTaxName}
                onChange={(e) => setNewTaxName(e.target.value)}
                placeholder="New Category Name (e.g. Blockchain & Web3)..."
                className="titan-input text-xs"
              />
              <button
                type="submit"
                className="btn-gold-titan text-xs py-2 px-5 shrink-0 shadow-sm"
              >
                Add Category
              </button>
            </form>

            {/* Taxonomies List */}
            <div className="space-y-2 max-h-[320px] overflow-y-auto">
              {taxonomies.map((tax) => (
                <div
                  key={tax.id}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-amber-500 text-base">{tax.icon}</span>
                    <span className="font-bold text-slate-800">{tax.name}</span>
                  </div>

                  <button
                    onClick={() => handleDeleteTaxonomy(tax.id)}
                    className="text-rose-600 hover:text-rose-700 p-1"
                    title="Remove Category"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
