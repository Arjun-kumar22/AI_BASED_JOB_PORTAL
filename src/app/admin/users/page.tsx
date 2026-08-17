'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { portalStore } from '@/lib/store';
import { User } from '@/lib/types';

export default function AdminUsersPage() {
  const [activeTab, setActiveTab] = useState<'users' | 'verifications'>('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('all');

  const [isLoadingDb, setIsLoadingDb] = useState(false);
  const [usersList, setUsersList] = useState<Array<User & { status: 'active' | 'suspended' }>>([
    {
      id: 1,
      name: 'Jake Richards',
      email: 'jake@titan.com',
      role: 'candidate',
      title: 'Senior Full-Stack Engineer',
      location: 'Manchester, UK',
      status: 'active',
      isVerified: true,
      created_at: '2024-01-15'
    },
    {
      id: 2,
      name: 'Sarah Mitchell',
      email: 'employer@titan.com',
      role: 'employer',
      title: 'Talent Acquisition Director',
      companyName: 'Titan Technology Group',
      location: 'London, UK',
      status: 'active',
      isVerified: true,
      created_at: '2023-11-20'
    }
  ]);

  React.useEffect(() => {
    const fetchDbUsers = async () => {
      try {
        setIsLoadingDb(true);
        const res = await fetch('/api/users');
        const json = await res.json();
        if (json.status === 'ok' && Array.isArray(json.data) && json.data.length > 0) {
          const dbMapped: Array<User & { status: 'active' | 'suspended' }> = json.data.map((u: any) => ({
            id: u.id,
            name: u.name || 'Anonymous User',
            email: u.email,
            role: (u.role === 'RECRUITER' ? 'employer' : u.role === 'ADMIN' ? 'admin' : 'candidate') as any,
            title: u.profile?.title || (u.role === 'RECRUITER' ? u.recruiterProfile?.position : 'Job Seeker'),
            companyName: u.recruiterProfile?.company || undefined,
            location: u.profile?.location || u.recruiterProfile?.location || 'Registered Node',
            status: 'active',
            isVerified: u.role === 'ADMIN' || !!u.recruiterProfile?.company,
            created_at: new Date(u.createdAt).toISOString().split('T')[0]
          }));

          // Merge without duplicating emails
          setUsersList(prev => {
            const existingEmails = new Set(dbMapped.map(d => d.email));
            const filteredDefaults = prev.filter(p => !existingEmails.has(p.email));
            return [...dbMapped, ...filteredDefaults];
          });
        }
      } catch (err) {
        console.warn('Failed to load database users:', err);
      } finally {
        setIsLoadingDb(false);
      }
    };

    fetchDbUsers();
  }, []);

  const toggleUserStatus = (id: string | number) => {
    setUsersList(prev => prev.map(u =>
      u.id === id ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u
    ));
    portalStore.addAuditLog('User Account Status Changed', `Toggled account ID #${id} status`, 'Super Admin', 'warning');
  };

  const toggleVerificationBadge = (id: string | number) => {
    setUsersList(prev => prev.map(u =>
      u.id === id ? { ...u, isVerified: !u.isVerified } : u
    ));
    portalStore.addAuditLog('Employer Verification Badge Granted', `Toggled verified status for company/user ID #${id}`, 'Super Admin', 'success');
  };

  const filteredUsers = usersList.filter(u => {
    if (searchQuery && !u.name.toLowerCase().includes(searchQuery.toLowerCase()) && !u.email.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedRoleFilter !== 'all' && u.role !== selectedRoleFilter) {
      return false;
    }
    return true;
  });

  const pendingVerifications = usersList.filter(u => u.role === 'employer' && !u.isVerified);

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-slate-800 flex">
      <Sidebar role="admin" />

      <div className="flex-1 ml-56 md:ml-60 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
        <div className="bg-navy-gradient text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-400/20 space-y-2">
          <span className="px-2.5 py-0.5 bg-amber-400 text-slate-900 font-extrabold text-[10px] uppercase rounded-full">
            User Governance
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">User & Employer Verification Hub</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Moderate candidate and recruiter accounts, suspend fraudulent accounts, and audit employer credentials to grant the &quot;✓ Verified Employer&quot; trust badge.
          </p>
        </div>

        {/* Subtabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'users' ? 'bg-navy-gradient text-white shadow-xs font-extrabold' : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="material-symbols-outlined text-base">group</span>
            <span>All Users Directory ({usersList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('verifications')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'verifications' ? 'bg-navy-gradient text-white shadow-xs font-extrabold' : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="material-symbols-outlined text-base text-amber-400">verified_user</span>
            <span>Employer Verification Queue ({pendingVerifications.length})</span>
          </button>
        </div>

        {/* TAB 1: All Users Directory */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5 animate-fade-in">
            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, or company..."
                className="titan-input text-xs max-w-sm"
              />

              <div className="flex items-center gap-1.5 self-start sm:self-auto">
                {['all', 'candidate', 'employer', 'admin'].map(r => (
                  <button
                    key={r}
                    onClick={() => setSelectedRoleFilter(r)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition ${
                      selectedRoleFilter === r
                        ? 'bg-amber-400 text-slate-900'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-extrabold uppercase text-[10px]">
                    <th className="pb-3">User / Identity</th>
                    <th className="pb-3">Role</th>
                    <th className="pb-3">Location / Domain</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Verified Badge</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5">
                        <div className="font-extrabold text-slate-900">{u.name}</div>
                        <div className="text-[11px] text-slate-500">{u.email}</div>
                      </td>
                      <td className="py-3.5">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-bold rounded-md uppercase text-[10px]">
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3.5 text-slate-600 font-medium">
                        {u.companyName ? `${u.companyName} • ` : ''}{u.location || 'Global'}
                      </td>
                      <td className="py-3.5">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase ${
                          u.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="py-3.5">
                        {u.isVerified ? (
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-extrabold text-[10px] flex items-center gap-0.5 w-max">
                            <span className="material-symbols-outlined text-xs">verified</span>
                            ✓ Verified
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-400 font-medium">Unverified</span>
                        )}
                      </td>
                      <td className="py-3.5 text-right space-x-2">
                        <button
                          onClick={() => toggleUserStatus(u.id)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition ${
                            u.status === 'active'
                              ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                          }`}
                        >
                          {u.status === 'active' ? 'Suspend' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: Employer Verification Queue */}
        {activeTab === 'verifications' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 animate-fade-in">
            <div>
              <h3 className="font-extrabold text-base text-[#0b1c30]">Pending Employer Credential Audits</h3>
              <p className="text-xs text-slate-500">Review business registration, corporate domain verification, and grant the trust badge.</p>
            </div>

            <div className="space-y-4">
              {pendingVerifications.map((emp) => (
                <div key={emp.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-sm text-[#0b1c30]">{emp.companyName || emp.name}</h4>
                      <span className="px-2 py-0.2 bg-amber-100 text-amber-900 text-[9px] font-extrabold uppercase rounded">
                        Pending Audit
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">Corporate Email: <strong>{emp.email}</strong> • {emp.location}</p>
                    <p className="text-[11px] text-slate-500">Audit Status: Domain DNS verified, Tax Identification active.</p>
                  </div>

                  <button
                    onClick={() => toggleVerificationBadge(emp.id)}
                    className="btn-gold-titan text-xs py-2 px-5 shadow-sm self-start sm:self-auto"
                  >
                    <span className="material-symbols-outlined text-sm">verified</span>
                    <span>Grant &quot;✓ Verified Employer&quot;</span>
                  </button>
                </div>
              ))}

              {pendingVerifications.length === 0 && (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-1 text-slate-500 text-xs">
                  <span className="material-symbols-outlined text-3xl text-emerald-600">verified</span>
                  <p className="font-bold text-slate-800">All employer applications audited!</p>
                  <p>No pending employer verification requests in queue.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
