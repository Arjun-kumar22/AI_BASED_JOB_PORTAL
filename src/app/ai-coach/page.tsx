'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import AtsScannerWidget from '@/components/AtsScannerWidget';
import MockInterviewCoach from '@/components/MockInterviewCoach';
import RoadmapDisplay from '@/lib/../components/RoadmapDisplay';
import { queryTitanAI, generateTailoredCoverLetter } from '@/lib/groqClient';
import { portalStore } from '@/lib/store';

export default function AiCoachPage() {
  const [activeTab, setActiveTab] = useState<'chat' | 'ats' | 'mock' | 'roadmap' | 'coverletter'>('chat');
  const user = portalStore.getUser();
  const announcements = portalStore.getAnnouncements();

  // Tab 1: Chat State
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; time: string }>>([
    {
      sender: 'bot',
      text: `Hello ${user?.name || 'there'}! I am your 24/7 AI Career Mentor & Coach. Ask me about tech stack mastery, salary negotiation strategies, system design interviews, or campus schedules.`,
      time: 'Just now'
    }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Tab 5: Cover Letter Writer State
  const [clJobTitle, setClJobTitle] = useState('Senior Full-Stack Engineer');
  const [clCompany, setClCompany] = useState('Titan Technology Group');
  const [clTone, setClTone] = useState<'Professional' | 'Conversational' | 'Enthusiastic' | 'Formal'>('Professional');
  const [generatedLetter, setGeneratedLetter] = useState(
    generateTailoredCoverLetter('Senior Full-Stack Engineer', 'Titan Technology Group', user?.name || 'Jake Richards', 'Professional')
  );
  const [copied, setCopied] = useState(false);

  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
    setChatMessages((prev) => [
      ...prev,
      { sender: 'user', text: userText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const res = await queryTitanAI(userText, undefined, announcements);
      setChatMessages((prev) => [
        ...prev,
        { sender: 'bot', text: res.response, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleGenerateCoverLetter = () => {
    const letter = generateTailoredCoverLetter(clJobTitle, clCompany, user?.name || 'Jake Richards', clTone);
    setGeneratedLetter(letter);
  };

  const handleCopyLetter = () => {
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-slate-800 flex">
      <Sidebar role="candidate" />

      <div className="flex-1 ml-56 md:ml-60 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
        {/* Top Header Banner */}
        <div className="bg-navy-gradient text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-400/20 space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-amber-400 text-slate-900 font-extrabold text-[10px] uppercase rounded-full">
              Intelligence Suite
            </span>
            <span className="text-xs text-amber-300 font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              24/7 AI Career Intelligence Platform
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">AI Career Hub</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Switch between 5 dedicated intelligence tools: Career Mentor Chat, ATS Resume Analyzer, STAR Mock Interview Coach, 30-60-90 Roadmap, and AI Cover Letter Writer.
          </p>
        </div>

        {/* 5-Tab Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
          {[
            { id: 'chat', label: '1. Career Chatbot', icon: 'forum' },
            { id: 'ats', label: '2. ATS Resume Scanner', icon: 'document_scanner' },
            { id: 'mock', label: '3. Mock Interview (STAR)', icon: 'record_voice_over' },
            { id: 'roadmap', label: '4. 30-60-90 Day Roadmap', icon: 'flag' },
            { id: 'coverletter', label: '5. Cover Letter Writer', icon: 'edit_note' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 shrink-0 border ${
                activeTab === tab.id
                  ? 'bg-navy-gradient text-white border-[#0b1c30] shadow-sm font-extrabold'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span className={`material-symbols-outlined text-base ${activeTab === tab.id ? 'text-amber-400' : 'text-slate-400'}`}>
                {tab.icon}
              </span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: Career Chatbot */}
        {activeTab === 'chat' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 animate-fade-in flex flex-col" style={{ minHeight: '520px' }}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-sm text-[#0b1c30]">24/7 AI Career & Strategy Coach</h3>
                <p className="text-xs text-slate-500">Ask about compensation negotiation, technical architecture, and interview prep</p>
              </div>
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                Live AI Online
              </span>
            </div>

            {/* Chat Conversation Box */}
            <div className="flex-1 overflow-y-auto space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 max-h-[380px]">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ${
                      msg.sender === 'user'
                        ? 'bg-amber-400 text-slate-900'
                        : 'bg-navy-gradient text-amber-400'
                    }`}
                  >
                    {msg.sender === 'user' ? 'You' : 'TA'}
                  </div>

                  <div
                    className={`p-3.5 rounded-2xl border text-xs leading-relaxed space-y-1 ${
                      msg.sender === 'user'
                        ? 'bg-slate-900 text-white border-slate-700'
                        : 'bg-white text-slate-800 border-slate-200 shadow-2xs'
                    }`}
                  >
                    <p className="whitespace-pre-line font-sans">{msg.text}</p>
                    <span className="text-[9px] block text-right text-slate-400 pt-1">{msg.time}</span>
                  </div>
                </div>
              ))}

              {isChatLoading && (
                <div className="flex gap-3 max-w-[80%]">
                  <div className="w-8 h-8 rounded-xl bg-navy-gradient text-amber-400 flex items-center justify-center font-bold text-xs shrink-0">
                    TA
                  </div>
                  <div className="p-3 bg-white rounded-2xl border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
                    <span className="inline-block animate-spin rounded-full h-3.5 w-3.5 border-2 border-amber-500 border-t-transparent" />
                    <span>Analyzing career query...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendChatMessage} className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask e.g. 'How do I negotiate a $180k offer?' or 'What are high-impact Next.js questions?'"
                className="titan-input text-xs"
              />
              <button
                type="submit"
                disabled={isChatLoading || !chatInput.trim()}
                className="btn-primary-titan text-xs py-3 px-6 shadow-md shrink-0 disabled:opacity-50"
              >
                <span>Ask Coach</span>
                <span className="material-symbols-outlined text-sm text-amber-400">send</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: ATS Resume Scanner */}
        {activeTab === 'ats' && (
          <div className="animate-fade-in">
            <AtsScannerWidget />
          </div>
        )}

        {/* TAB 3: Mock Interview STAR Simulator */}
        {activeTab === 'mock' && (
          <div className="animate-fade-in">
            <MockInterviewCoach />
          </div>
        )}

        {/* TAB 4: 30-60-90 Day Roadmap */}
        {activeTab === 'roadmap' && (
          <div className="animate-fade-in">
            <RoadmapDisplay />
          </div>
        )}

        {/* TAB 5: Tailored Cover Letter Generator */}
        {activeTab === 'coverletter' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 animate-fade-in">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600">
                AI Cover Letter Synthesis
              </span>
              <h3 className="text-xl font-extrabold text-[#0b1c30]">
                Tailored Cover Letter Generator
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Automatically formats candidate skills and target company details into tailored application letters with tone control.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Target Job Title</label>
                <input
                  type="text"
                  value={clJobTitle}
                  onChange={(e) => setClJobTitle(e.target.value)}
                  className="titan-input text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Target Company</label>
                <input
                  type="text"
                  value={clCompany}
                  onChange={(e) => setClCompany(e.target.value)}
                  className="titan-input text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Select Tone</label>
                <div className="grid grid-cols-3 gap-1">
                  {(['Professional', 'Enthusiastic', 'Formal'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setClTone(t)}
                      className={`py-2 px-1 rounded-xl text-[10px] font-bold transition border ${
                        clTone === t
                          ? 'bg-amber-400 text-slate-900 border-amber-500 shadow-2xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleGenerateCoverLetter}
                className="btn-primary-titan text-xs py-2 px-5"
              >
                <span className="material-symbols-outlined text-sm text-amber-400">auto_fix_high</span>
                <span>Regenerate Tailored Letter</span>
              </button>
            </div>

            <div className="relative">
              <textarea
                rows={10}
                value={generatedLetter}
                onChange={(e) => setGeneratedLetter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 text-xs font-mono text-slate-800 outline-none focus:border-amber-400 focus:bg-white transition leading-relaxed resize-none"
              />
              <button
                onClick={handleCopyLetter}
                className="absolute top-4 right-4 px-3 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition flex items-center gap-1 shadow-sm"
              >
                <span className="material-symbols-outlined text-sm text-amber-400">
                  {copied ? 'check' : 'content_copy'}
                </span>
                <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
