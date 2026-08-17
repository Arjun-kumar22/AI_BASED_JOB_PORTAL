'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { portalStore } from '@/lib/store';
import { RagAnnouncement } from '@/lib/types';
import { TITAN_INSTITUTE_KNOWLEDGE_BASE, retrieveRelevantKnowledge, RagKnowledgeItem } from '@/lib/ragKnowledgeBase';

export default function AdminRagPage() {
  const [announcements, setAnnouncements] = useState<RagAnnouncement[]>(portalStore.getAnnouncements());
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<RagAnnouncement['category']>('Recruitment Drive');
  const [author, setAuthor] = useState('Career Placement Cell');

  // Interactive Live RAG Tester State
  const [testQuery, setTestQuery] = useState('What are the fees for Cisco CCNA and DIT?');
  const [testResults, setTestResults] = useState<{ item: RagKnowledgeItem; score: number; matchReason: string }[]>(() =>
    retrieveRelevantKnowledge('What are the fees for Cisco CCNA and DIT?', 3)
  );
  const [activeTab, setActiveTab] = useState<'knowledge' | 'announcements' | 'tester'>('knowledge');

  useEffect(() => {
    const unsub = portalStore.subscribe(() => {
      setAnnouncements(portalStore.getAnnouncements());
    });
    return () => unsub();
  }, []);

  const handleTestQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testQuery.trim()) return;
    const res = retrieveRelevantKnowledge(testQuery, 4);
    setTestResults(res);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    portalStore.addAnnouncement({
      title: title.trim(),
      content: content.trim(),
      category,
      author: author.trim() || 'Admin'
    });

    setTitle('');
    setContent('');
  };

  const handleDelete = (id: number | string) => {
    portalStore.deleteAnnouncement(id);
  };

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-slate-800 flex select-none">
      <Sidebar role="admin" />

      <div className="flex-1 ml-56 md:ml-60 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
        {/* Top Hero Banner */}
        <div className="bg-navy-gradient text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-400/20 space-y-2">
          <span className="px-2.5 py-0.5 bg-amber-400 text-slate-900 font-extrabold text-[10px] uppercase rounded-full">
            TITAN Central Intelligence
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            RAG Knowledge Base & Neural Indexer
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Authoritative knowledge governance hub for Taj Institute of Technology & Applied Networks (TITAN). Manage academic documents, publish campus notices, and simulate retrieval-augmented generation in real time.
          </p>

          {/* Tab Navigation */}
          <div className="pt-4 flex gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('knowledge')}
              className={`px-4 py-1.5 rounded-xl text-xs font-extrabold transition ${
                activeTab === 'knowledge' ? 'bg-amber-400 text-slate-900 shadow-md' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              📚 Indexed Knowledge ({TITAN_INSTITUTE_KNOWLEDGE_BASE.length} Docs)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('announcements')}
              className={`px-4 py-1.5 rounded-xl text-xs font-extrabold transition ${
                activeTab === 'announcements' ? 'bg-amber-400 text-slate-900 shadow-md' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              📢 Campus Notices ({announcements.length} Live)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('tester')}
              className={`px-4 py-1.5 rounded-xl text-xs font-extrabold transition ${
                activeTab === 'tester' ? 'bg-amber-400 text-slate-900 shadow-md' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              ⚡ Live RAG Tester & Similarity Inspector
            </button>
          </div>
        </div>

        {/* TAB 1: INDEXED KNOWLEDGE BASE */}
        {activeTab === 'knowledge' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Official TITAN Knowledge Repository</h3>
                <p className="text-xs text-slate-500">
                  Pre-indexed academic programs, fee structures, Pearson VUE details, and lab hardware specs.
                </p>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span>Vector Index Active</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {TITAN_INSTITUTE_KNOWLEDGE_BASE.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-amber-400 transition space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-extrabold rounded-md uppercase">
                        {doc.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">ID: {doc.id}</span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900">{doc.title}</h4>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{doc.content}</p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                    {doc.duration && (
                      <div className="flex justify-between text-slate-600">
                        <span className="font-bold">Duration:</span>
                        <span>{doc.duration}</span>
                      </div>
                    )}
                    {doc.fee && (
                      <div className="flex justify-between text-slate-600">
                        <span className="font-bold">Fee Structure:</span>
                        <span className="font-extrabold text-amber-700">{doc.fee}</span>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {doc.tags.slice(0, 4).map((t) => (
                        <span key={t} className="px-1.5 py-0.5 bg-sky-50 text-sky-700 text-[9px] font-semibold rounded">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: CAMPUS NOTICES & ANNOUNCEMENTS */}
        {activeTab === 'announcements' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
            {/* Create Announcement Form */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-extrabold text-sm text-[#0b1c30]">Publish New Notice to RAG Engine</h3>

              <form onSubmit={handleCreate} className="space-y-3 text-xs">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Notice Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="e.g. Spring 2027 Campus Recruitment Drive"
                    className="titan-input text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="titan-input text-xs"
                  >
                    <option value="Recruitment Drive">Recruitment Drive</option>
                    <option value="Exam Schedule">Exam Schedule</option>
                    <option value="Academic Notice">Academic Notice</option>
                    <option value="Campus Event">Campus Event</option>
                    <option value="General">General Notice</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Author / Authority</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="titan-input text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Notice Content</label>
                  <textarea
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    placeholder="Provide full description of dates, venues, requirements..."
                    className="titan-input text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary-titan text-xs py-2.5 shadow-sm mt-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm text-amber-400">publish</span>
                  <span>Publish to Neural RAG Index</span>
                </button>
              </form>
            </div>

            {/* List of Active Notices */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-extrabold text-sm text-[#0b1c30]">Active Campus Announcements</h3>

              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {announcements.map((a) => (
                  <div
                    key={a.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-amber-300 transition space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900">
                        {a.category}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-400">{a.timestamp}</span>
                        <button
                          type="button"
                          onClick={() => handleDelete(a.id)}
                          className="text-slate-400 hover:text-rose-600 transition p-1"
                          title="Delete Notice"
                        >
                          <span className="material-symbols-outlined text-base">delete</span>
                        </button>
                      </div>
                    </div>
                    <h4 className="font-bold text-xs text-slate-900">{a.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{a.content}</p>
                    <span className="text-[10px] text-slate-400 block pt-1 font-semibold">
                      Author: {a.author}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LIVE RAG TESTER & SIMILARITY INSPECTOR */}
        {activeTab === 'tester' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 animate-fade-in">
            <div>
              <h3 className="font-extrabold text-base text-[#0b1c30]">Live RAG Retrieval & Similarity Inspector</h3>
              <p className="text-xs text-slate-500">
                Test how the hybrid TF-IDF + Semantic token retrieval engine scores and extracts chunks for any query.
              </p>
            </div>

            <form onSubmit={handleTestQuery} className="flex gap-3">
              <input
                type="text"
                value={testQuery}
                onChange={(e) => setTestQuery(e.target.value)}
                placeholder="Type a test query e.g. How much is CCNA course fee?"
                className="flex-1 titan-input text-xs sm:text-sm font-semibold"
              />
              <button
                type="submit"
                className="btn-primary-titan text-xs px-6 shadow-md cursor-pointer"
              >
                <span>Inspect RAG Scoring</span>
                <span className="material-symbols-outlined text-sm text-amber-400">search</span>
              </button>
            </form>

            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Retrieved Chunks ({testResults.length} Matched Documents):
              </h4>

              {testResults.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500">
                  No matching documents retrieved for this query. Try querying for &quot;CCNA&quot;, &quot;Admissions&quot;, &quot;Pearson VUE&quot;, or &quot;DevOps&quot;.
                </div>
              ) : (
                <div className="space-y-3">
                  {testResults.map((res, index) => (
                    <div
                      key={res.item.id}
                      className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3 hover:border-amber-400 transition"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-[#0b1c30] text-amber-400 font-extrabold text-xs flex items-center justify-center">
                            #{index + 1}
                          </span>
                          <h4 className="font-extrabold text-sm text-slate-900">{res.item.title}</h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-black text-xs">
                            Score: {res.score} pts
                          </span>
                          <span className="px-2.5 py-0.5 bg-sky-100 text-sky-800 rounded-full font-bold text-[10px]">
                            {res.matchReason}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
                        {res.item.content}
                      </p>

                      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                        <span>Category: <strong>{res.item.category}</strong></span>
                        {res.item.fee && <span>Fee: <strong className="text-amber-700">{res.item.fee}</strong></span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
