'use client';

import React, { useState } from 'react';
import { evaluateStarAnswer } from '@/lib/groqClient';
import { MockQuestion } from '@/lib/types';

const MOCK_QUESTIONS: MockQuestion[] = [
  {
    id: 1,
    role: 'Senior Full-Stack Engineer',
    category: 'Architecture',
    question: 'Describe a situation where a production microservice was experiencing latency spikes. How did you diagnose the root cause, and what architectural changes did you implement?',
    hints: [
      'Mention profiling tools (e.g. Prometheus, Datadog, pprof, query logs).',
      'Explain caching strategies (Redis), database indexing, or async queue worker architecture.',
      'Quantify the performance improvement (e.g. latency reduced by X%).'
    ],
    sampleStar: {
      situation: 'Our checkout API service experienced 1200ms p99 latency spikes during holiday peak traffic.',
      task: 'I was assigned as technical lead to diagnose the bottleneck and restore <100ms response times.',
      action: 'I enabled distributed tracing in OpenTelemetry, pinpointed N+1 unindexed SQL queries, implemented Redis cluster caching for product catalogs, and transitioned receipt generation to an async Celery queue.',
      result: 'Average p99 latency decreased from 1200ms to 45ms, and system handled 4x peak throughput without dropping requests.'
    }
  },
  {
    id: 2,
    role: 'Lead AI / ML Engineer',
    category: 'System Design',
    question: 'How would you architect a low-latency, scalable Retrieval-Augmented Generation (RAG) pipeline for 100,000 active enterprise documents?',
    hints: [
      'Discuss chunking strategies and embedding models.',
      'Explain vector database indexing (HNSW, Pinecone, Milvus, Qdrant).',
      'Detail reranking and context compression techniques.'
    ],
    sampleStar: {
      situation: 'Enterprise clients required sub-second question-answering across 100k+ technical PDFs without hallucination.',
      task: 'Design an end-to-end vector search & RAG serving pipeline with <800ms end-to-end latency.',
      action: 'I implemented hybrid chunking (semantic + sliding window), embedded documents using BAAI/bge-large, stored vectors in a Qdrant cluster with HNSW indexing, and applied FlashRank cross-encoder reranking before prompt generation.',
      result: 'Achieved 96% context retrieval precision and reduced end-to-end LLM inference time by 38%.'
    }
  },
  {
    id: 3,
    role: 'Senior UX / UI Product Designer',
    category: 'Behavioral',
    question: 'Tell me about a time when engineering constraints forced you to compromise on a design. How did you resolve the disagreement and deliver a great user experience?',
    hints: [
      'Focus on collaborative problem-solving between Design and Engineering.',
      'Discuss how you prioritized core user value vs aesthetic polish.',
      'Show how the final release balanced performance and visual appeal.'
    ],
    sampleStar: {
      situation: 'A complex interactive canvas feature caused high memory usage on mobile devices, prompting engineers to request removing animations.',
      task: 'Find a solution that maintained the delightful micro-interactions without impacting mobile frame rates.',
      action: 'I partnered with front-end leads to replace heavy SVG filters with CSS hardware-accelerated transforms and simplified the state machine.',
      result: 'The feature shipped on time with a 60fps framerate on all mobile devices and an 88% user satisfaction rating.'
    }
  }
];

export default function MockInterviewCoach() {
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [showSample, setShowSample] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<{
    score: number;
    situation: string;
    task: string;
    action: string;
    result: string;
    feedback: string;
  } | null>(null);

  const activeQuestion = MOCK_QUESTIONS[selectedQuestionIndex];

  const handleEvaluate = async () => {
    if (!userAnswer.trim()) return;
    setIsEvaluating(true);
    try {
      const res = await evaluateStarAnswer(activeQuestion.question, userAnswer);
      setEvaluationResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleUseSampleAnswer = () => {
    const s = activeQuestion.sampleStar;
    const combined = `[Situation]: ${s.situation}\n[Task]: ${s.task}\n[Action]: ${s.action}\n[Result]: ${s.result}`;
    setUserAnswer(combined);
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 sm:p-8 bg-navy-gradient text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 bg-amber-400 text-slate-900 font-extrabold text-[10px] uppercase rounded-full tracking-wider">
              24/7 AI Interview Coach
            </span>
            <span className="text-xs text-amber-300 font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">stars</span>
              STAR Methodology Evaluator
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            AI Mock Interview Simulator
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Practice role-specific system architecture and behavioral questions. Receive instant scoring (0-100%) across Situation, Task, Action, and Result.
          </p>
        </div>

        {/* Question Selector Carousel Controls */}
        <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-2xl border border-white/20">
          {MOCK_QUESTIONS.map((q, idx) => (
            <button
              key={q.id}
              onClick={() => {
                setSelectedQuestionIndex(idx);
                setEvaluationResult(null);
                setShowSample(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedQuestionIndex === idx
                  ? 'bg-amber-400 text-slate-900 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Q{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Body */}
      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Question & Answer Editor */}
        <div className="lg:col-span-7 space-y-6">
          {/* Question Card */}
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-800 text-[10px] font-extrabold rounded-full uppercase">
                {activeQuestion.category}
              </span>
              <span className="text-xs font-bold text-slate-500">{activeQuestion.role}</span>
            </div>
            <h4 className="text-base font-extrabold text-[#0b1c30] leading-snug">
              {activeQuestion.question}
            </h4>

            <div className="pt-2">
              <p className="text-[11px] font-bold text-slate-600 mb-1">Key Topics to Include:</p>
              <ul className="list-disc list-inside text-xs text-slate-500 space-y-0.5">
                {activeQuestion.hints.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* User Answer Textarea */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Your Answer (Use the STAR Structure: Situation, Task, Action, Result)
              </label>
              <button
                onClick={handleUseSampleAnswer}
                className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">content_paste</span>
                Load Ideal STAR Answer
              </button>
            </div>

            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              rows={8}
              placeholder="In my previous role at... [Situation] We encountered... [Task] My responsibility was... [Action] I designed and deployed... [Result] This improved latency by..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-sans text-slate-800 outline-none focus:border-amber-400 focus:bg-white transition leading-relaxed resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => setShowSample(!showSample)}
              className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
            >
              {showSample ? 'Hide Reference Answer' : 'View Sample Answer'}
            </button>

            <button
              onClick={handleEvaluate}
              disabled={isEvaluating || !userAnswer.trim()}
              className="w-full sm:w-auto btn-gold-titan text-xs py-2.5 px-6 shadow-md disabled:opacity-50"
            >
              {isEvaluating ? (
                <>
                  <span className="inline-block animate-spin rounded-full h-3.5 w-3.5 border-2 border-[#0b1c30] border-t-transparent" />
                  <span>STAR AI Evaluating...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-base">psychology</span>
                  <span>Evaluate STAR Answer</span>
                </>
              )}
            </button>
          </div>

          {/* Sample Answer Box */}
          {showSample && (
            <div className="p-5 bg-amber-50/70 rounded-2xl border border-amber-200 text-xs space-y-2 animate-fade-in">
              <span className="font-extrabold text-amber-900 uppercase text-[10px] block">
                ⭐ Model STAR Breakdown:
              </span>
              <p><strong>Situation:</strong> {activeQuestion.sampleStar.situation}</p>
              <p><strong>Task:</strong> {activeQuestion.sampleStar.task}</p>
              <p><strong>Action:</strong> {activeQuestion.sampleStar.action}</p>
              <p><strong>Result:</strong> {activeQuestion.sampleStar.result}</p>
            </div>
          )}
        </div>

        {/* Right Column: AI Scorecard Evaluation */}
        <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between">
          {evaluationResult ? (
            <div className="space-y-4 animate-fade-in">
              {/* Score Dial */}
              <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                    STAR Performance Score
                  </span>
                  <span className="text-3xl font-black text-[#0b1c30]">
                    {evaluationResult.score}<span className="text-lg text-slate-400">/100</span>
                  </span>
                  <span className="inline-block ml-2 px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase rounded">
                    Strong STAR Structure
                  </span>
                </div>
                <div className="w-16 h-16 rounded-full bg-navy-gradient flex items-center justify-center text-amber-400 font-black text-xl shadow-md border-2 border-amber-400">
                  {evaluationResult.score}%
                </div>
              </div>

              {/* STAR 4-Pillars Feedback */}
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-[10px] font-black uppercase text-indigo-600 block">S — Situation</span>
                  <p className="text-slate-700 mt-0.5">{evaluationResult.situation}</p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-[10px] font-black uppercase text-sky-600 block">T — Task</span>
                  <p className="text-slate-700 mt-0.5">{evaluationResult.task}</p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-[10px] font-black uppercase text-amber-600 block">A — Action</span>
                  <p className="text-slate-700 mt-0.5">{evaluationResult.action}</p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-[10px] font-black uppercase text-emerald-600 block">R — Result</span>
                  <p className="text-slate-700 mt-0.5">{evaluationResult.result}</p>
                </div>
              </div>

              {/* Overall Constructive Feedback */}
              <div className="p-4 bg-navy-gradient text-white rounded-2xl space-y-1">
                <span className="text-[10px] font-extrabold uppercase text-amber-300">
                  Coach Summary:
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {evaluationResult.feedback}
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-3 text-amber-500 shadow-xs">
                <span className="material-symbols-outlined text-2xl">record_voice_over</span>
              </div>
              <p className="text-xs font-bold text-slate-700">Awaiting Interview Answer</p>
              <p className="text-[11px] text-slate-500 mt-1 max-w-xs">
                Type your response to the question on the left and click &quot;Evaluate STAR Answer&quot; for instant scoring and advice.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
