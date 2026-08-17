'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Sidebar from '@/components/Sidebar';
import { portalStore } from '@/lib/store';
import { Message } from '@/lib/types';

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>(portalStore.getMessages());
  const [inputText, setInputText] = useState('');
  const user = portalStore.getUser();

  useEffect(() => {
    const unsub = portalStore.subscribe(() => {
      setMessages(portalStore.getMessages());
    });
    return () => unsub();
  }, []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    portalStore.sendMessage(inputText.trim(), 2);
    setInputText('');
  };

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-slate-800 flex">
      <Sidebar />

      <div className="flex-1 ml-56 md:ml-60 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
        <div className="bg-navy-gradient text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-400/20 space-y-2">
          <span className="px-2.5 py-0.5 bg-amber-400 text-slate-900 font-extrabold text-[10px] uppercase rounded-full">
            Direct Communications
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Recruiter Communications Thread</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Real-time messaging with talent acquisition directors and hiring panels.
          </p>
        </div>

        {/* Messaging Box */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs flex flex-col overflow-hidden" style={{ minHeight: '520px' }}>
          {/* Header */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden relative border border-amber-400/50 bg-slate-800">
                <Image
                  src="/images/employer-avatar.jpg"
                  alt="Sarah Mitchell"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xs font-black text-slate-900">Sarah Mitchell</h3>
                <p className="text-[10px] text-slate-500 font-bold">Talent Acquisition Director @ Titan Group</p>
              </div>
            </div>
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-black rounded-full uppercase">
              Online
            </span>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/50">
            {messages.map((m) => {
              const isMe = m.sender_id === user?.id || m.sender_role === 'Candidate';

              return (
                <div
                  key={m.id}
                  className={`flex gap-3 max-w-[80%] ${isMe ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden relative border border-slate-200 shrink-0 bg-slate-900 text-amber-400 font-bold text-xs flex items-center justify-center">
                    {m.avatar ? (
                      <Image
                        src={m.avatar}
                        alt={m.sender_name}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      m.sender_name.charAt(0)
                    )}
                  </div>

                  <div className="space-y-1">
                    <div
                      className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                        isMe
                          ? 'bg-navy-gradient text-white border-slate-700'
                          : 'bg-white text-slate-800 border-slate-200 shadow-2xs'
                      }`}
                    >
                      <p className="whitespace-pre-line">{m.text}</p>

                      {m.attachment && (
                        <div className="mt-2 p-2 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px] font-bold flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-sm text-amber-600">attachment</span>
                          <span>{m.attachment}</span>
                        </div>
                      )}
                    </div>
                    <span className={`text-[10px] block text-slate-400 ${isMe ? 'text-right' : ''}`}>
                      {m.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Form */}
          <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message to the hiring panel..."
              className="titan-input text-xs"
            />
            <button
              type="submit"
              className="btn-primary-titan text-xs py-2.5 px-6 shadow-md shrink-0"
            >
              <span>Send</span>
              <span className="material-symbols-outlined text-sm text-amber-400">send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
