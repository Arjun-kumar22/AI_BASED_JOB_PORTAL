'use client';

import React, { useState, useEffect, useRef } from 'react';
import { queryTitanAI, BotActionPill } from '@/lib/groqClient';
import { portalStore } from '@/lib/store';

interface ChatMsg {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  source?: string;
  time: string;
  attachmentName?: string;
  suggestedActions?: BotActionPill[];
}

const DEFAULT_INITIAL_MESSAGE: ChatMsg = {
  id: 'init-1',
  sender: 'assistant',
  text: '👋 **Welcome to Titan Assistant!**\n\nI am your AI Career Coach & Knowledge Engine for **Taj Institute of Technology & Applied Networks (TITAN)**.\n\nAsk me about **Admissions, Cisco CCNA Labs, Tech Jobs, ATS Resume Scoring, or STAR Mock Interviews**!',
  time: 'Just now',
  source: 'Titan Instant RAG & Career Intelligence Engine',
  suggestedActions: [
    { label: '🎓 CS Student Courses', query: 'Hello, any course for CS student?' },
    { label: '💰 Fee Structure', query: 'What is the fee structure and installments?' },
    { label: '💼 Open Tech Jobs', query: 'What open technical jobs are available?' },
    { label: '📢 Campus Notices', query: 'What are the latest campus notices?' }
  ]
};

export default function TitanChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([DEFAULT_INITIAL_MESSAGE]);
  const [inputText, setInputText] = useState('');
  const [attachedFileName, setAttachedFileName] = useState('');
  const [attachedFileText, setAttachedFileText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load chat history from localStorage on client mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('titan_chat_history');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setMessages(parsed);
          }
        }
      } catch (e) {
        console.warn('Chat history load note:', e);
      }
    }
  }, []);

  // Save chat history to localStorage on change
  useEffect(() => {
    if (typeof window !== 'undefined' && messages.length > 0) {
      try {
        localStorage.setItem('titan_chat_history', JSON.stringify(messages.slice(-20)));
      } catch (e) {
        console.warn('Chat history save note:', e);
      }
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleClearChat = () => {
    const fresh: ChatMsg = {
      id: `init-${Date.now()}`,
      sender: 'assistant',
      text: '👋 Chat history cleared. How can I assist you with TITAN academic programs, job openings, or resume ATS scoring?',
      time: 'Just now',
      source: 'Titan Instant RAG & Career Intelligence Engine',
      suggestedActions: [
        { label: '🎓 CS Student Courses', query: 'Hello, any course for CS student?' },
        { label: '💰 Fee Structure', query: 'What is the fee structure and installments?' },
        { label: '💼 Recommend Jobs', query: 'What jobs are open?' }
      ]
    };
    setMessages([fresh]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('titan_chat_history');
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const userText = (textToSend !== undefined ? textToSend : inputText).trim();
    if (!userText && !attachedFileText) return;

    const currentAttachment = attachedFileName;
    const currentAttachmentContent = attachedFileText;

    const userMsg: ChatMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText || `[Attached Resume: ${currentAttachment}]`,
      attachmentName: currentAttachment || undefined,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInputText('');
    setAttachedFileName('');
    setAttachedFileText('');
    setIsLoading(true);

    try {
      const announcements = portalStore.getAnnouncements();
      // Pass previous turns for multi-turn context memory
      const historyTurns = nextMessages.slice(-6).map(m => ({
        sender: m.sender,
        text: m.text
      }));

      const res = await queryTitanAI(userText, currentAttachmentContent, announcements, historyTurns);

      const botMsg: ChatMsg = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: res.response,
        source: res.source,
        suggestedActions: res.suggestedActions,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: 'assistant',
          text: 'I am here to assist! Feel free to ask about TITAN academic programs, Cisco lab certifications, or resume scoring.',
          time: 'Just now'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAttachedFileName(file.name);
    const reader = new FileReader();
    reader.onload = (evt) => {
      setAttachedFileText(evt.target?.result as string || file.name);
    };
    reader.readAsText(file);
  };

  const toggleVoice = () => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).SpeechRecognition ||
      (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event: { results: { [x: string]: { [x: string]: { transcript: any } } } }) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsListening(false);
    };

    recognition.start();
  };

  const quickPrompts = [
    { label: '🎓 CS Student Courses', query: 'Hello, any course for CS student?' },
    { label: '📚 Cisco CCNA & DIT', query: 'Tell me about the Cisco CCNA 200-301 and DIT courses.' },
    { label: '💼 Recommend Tech Jobs', query: 'What open technical jobs are available in the marketplace?' },
    { label: '📄 ATS Resume Review', query: 'Evaluate my resume and give me ATS optimization advice.' },
    { label: '🎯 STAR Mock Interview', query: 'Give me a STAR mock interview practice question.' },
    { label: '📢 Campus Notices', query: 'What are the latest campus notices and exam timetables?' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end select-none">
      {/* Chatbot Window */}
      {isOpen && (
        <div
          className="w-80 sm:w-[420px] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden mb-4 flex flex-col transition-all duration-300 animate-fade-in-up"
          style={{ height: '560px' }}
        >
          {/* Header */}
          <div className="px-4 py-3.5 flex items-center justify-between shadow-md bg-navy-gradient text-white">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-amber-400 text-[#0b1c30] rounded-2xl flex items-center justify-center font-extrabold shadow-sm shrink-0 border border-white/20">
                <span className="material-symbols-outlined text-xl">smart_toy</span>
              </div>
              <div className="leading-tight">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-sm text-white">Titan Assistant</h3>
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                </div>
                <p className="text-[10px] text-amber-300 font-bold">Memory-Aware RAG & Career Coach</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleClearChat}
                className="text-slate-300 hover:text-rose-300 p-1.5 rounded-lg hover:bg-white/10 transition cursor-pointer"
                title="Clear Chat History"
              >
                <span className="material-symbols-outlined text-base">delete_sweep</span>
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition cursor-pointer"
                title="Close Chat"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>
          </div>

          {/* Quick Prompt Suggestion Chips */}
          <div className="px-3 py-2 bg-slate-100 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((qp) => (
              <button
                key={qp.label}
                type="button"
                onClick={() => handleQuickPrompt(qp.query)}
                className="px-2.5 py-1 bg-white hover:bg-amber-50 hover:border-amber-300 border border-slate-200 rounded-full text-[10px] font-bold text-slate-700 whitespace-nowrap transition shadow-2xs shrink-0 cursor-pointer"
              >
                {qp.label}
              </button>
            ))}
          </div>

          {/* Messages Box */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-slate-50 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 max-w-[92%] ${m.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                {m.sender === 'assistant' ? (
                  <div className="w-7 h-7 text-amber-400 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs shadow-xs bg-navy-gradient">
                    TA
                  </div>
                ) : (
                  <div className="w-7 h-7 bg-amber-400 text-slate-900 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs shadow-xs">
                    You
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl border shadow-xs space-y-1.5 ${
                    m.sender === 'user'
                      ? 'bg-[#0b1c30] text-white border-slate-700'
                      : 'bg-white text-slate-800 border-slate-200'
                  }`}
                >
                  <div className="whitespace-pre-line leading-relaxed prose prose-sm text-xs max-w-none">
                    {m.text}
                  </div>

                  {/* Contextual Action Chips */}
                  {m.suggestedActions && m.suggestedActions.length > 0 && (
                    <div className="pt-2 border-t border-slate-100 space-y-1">
                      <span className="text-[9px] font-extrabold uppercase text-slate-400 block tracking-wider">
                        Suggested Follow-ups:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {m.suggestedActions.map((action, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSendMessage(action.query)}
                            className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 hover:border-amber-400 border border-amber-200 rounded-full text-[10px] font-bold text-amber-950 transition cursor-pointer shadow-2xs active:scale-95"
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {m.source && (
                    <div className="pt-1 flex items-center justify-between text-[9px]">
                      <span className="text-amber-600 font-bold uppercase tracking-wider">
                        ⚡ {m.source}
                      </span>
                    </div>
                  )}

                  <span
                    className={`text-[9px] block text-right pt-0.5 ${
                      m.sender === 'user' ? 'text-slate-400' : 'text-slate-400'
                    }`}
                  >
                    {m.time}
                  </span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 max-w-[85%]">
                <div className="w-7 h-7 text-amber-400 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs bg-navy-gradient">
                  TA
                </div>
                <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-2 text-slate-600 font-medium">
                  <span className="inline-block animate-spin rounded-full h-3.5 w-3.5 border-2 border-amber-500 border-t-transparent" />
                  <span>Titan RAG analyzing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Attachment Indicator */}
          {attachedFileName && (
            <div className="px-4 py-1.5 bg-amber-50 border-t border-amber-200 text-[11px] text-amber-900 flex items-center justify-between">
              <div className="flex items-center gap-1.5 truncate">
                <span className="material-symbols-outlined text-sm text-amber-600">description</span>
                <span className="font-bold truncate">{attachedFileName}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setAttachedFileName('');
                  setAttachedFileText('');
                }}
                className="text-amber-700 hover:text-rose-600 font-bold text-sm"
              >
                ×
              </button>
            </div>
          )}

          {/* Input Form */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-1.5"
            >
              {/* Attach File */}
              <label
                htmlFor="titan-chat-attach"
                className="p-2 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-xl cursor-pointer transition shrink-0"
                title="Attach Resume (.txt, .pdf, .docx)"
              >
                <span className="material-symbols-outlined text-lg">attach_file</span>
                <input
                  id="titan-chat-attach"
                  type="file"
                  ref={fileInputRef}
                  accept=".pdf,.txt,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {/* Voice Mic */}
              <button
                type="button"
                onClick={toggleVoice}
                className={`p-2 rounded-xl transition shrink-0 ${
                  isListening
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'text-slate-500 hover:text-amber-600 hover:bg-amber-50'
                }`}
                title="Voice Recognition"
              >
                <span className="material-symbols-outlined text-lg">mic</span>
              </button>

              {/* Text Input */}
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask admissions, CCNA, jobs, ATS..."
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:border-amber-400 focus:bg-white transition"
              />

              {/* Send Button */}
              <button
                type="submit"
                disabled={isLoading || (!inputText.trim() && !attachedFileText)}
                className="p-2.5 bg-navy-gradient text-amber-400 rounded-xl hover:opacity-95 transition shadow-md shrink-0 flex items-center justify-center border border-amber-400/30 disabled:opacity-50 cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg text-amber-400 font-bold">send</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-amber-400 hover:bg-amber-300 text-[#0b1c30] rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 border-2 border-white focus:outline-none relative group cursor-pointer"
        title="Open Titan Assistant (RAG Chatbot)"
      >
        <span className="material-symbols-outlined text-2xl font-bold">smart_toy</span>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-white animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-white" />
      </button>
    </div>
  );
}
