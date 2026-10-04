import React, { useState } from 'react';
import type { SocraticQuestion } from '../types';
import { sparOnQuestion } from '../services/aiService';
import { MessageSquare, Send, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';

interface SocraticSparringProps {
  questions: SocraticQuestion[];
  customApiKey?: string;
}

export const SocraticSparring: React.FC<SocraticSparringProps> = ({ questions, customApiKey }) => {
  const [activeQuestionId, setActiveQuestionId] = useState<string>(questions[0]?.id || '');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [reflections, setReflections] = useState<Record<string, string>>({});
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});

  const activeQuestion = questions.find((q) => q.id === activeQuestionId) || questions[0];

  const handleSpar = async (qId: string) => {
    const answerText = answers[qId];
    if (!answerText || answerText.trim().length < 5) return;

    setLoadingMap((prev) => ({ ...prev, [qId]: true }));
    try {
      const qObj = questions.find((q) => q.id === qId);
      if (qObj) {
        const reflection = await sparOnQuestion(qObj, answerText, customApiKey);
        setReflections((prev) => ({ ...prev, [qId]: reflection }));
      }
    } finally {
      setLoadingMap((prev) => ({ ...prev, [qId]: false }));
    }
  };

  if (!questions || questions.length === 0) return null;

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-black/5 dark:border-white/10 relative overflow-hidden transition-all duration-300">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-black/5 dark:border-white/5 gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-700 dark:text-accent-violet border border-violet-500/20 dark:border-accent-violet/20 text-xs font-mono uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Sparring Arena</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white">
            Socratic Stress-Test Questions
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Pick a question below and type your candid defense. The AI will reflect your hidden premises back to you.
          </p>
        </div>

        <div className="text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-surface-100 border border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300 self-start sm:self-auto shadow-sm">
          {Object.keys(reflections).length} / {questions.length} Questions Sparred
        </div>
      </div>

      {/* Question Selector Tabs */}
      <div className="flex sm:grid sm:grid-cols-4 gap-2.5 mt-6 overflow-x-auto pb-2 sm:pb-0 scrollbar-none snap-x">
        {questions.map((q, idx) => {
          const isAnswered = !!reflections[q.id];
          const isSelected = activeQuestionId === q.id;
          return (
            <button
              key={q.id}
              onClick={() => setActiveQuestionId(q.id)}
              className={`p-3.5 rounded-2xl text-left border text-xs font-medium transition-all flex items-start justify-between min-w-[220px] sm:min-w-0 snap-start shrink-0 sm:shrink ${
                isSelected
                  ? 'bg-violet-500/15 dark:bg-accent-violet/20 border-violet-500 dark:border-accent-violet text-slate-900 dark:text-white shadow-md'
                  : 'bg-slate-50 dark:bg-surface-100/60 border-slate-200/80 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div>
                <span className="font-mono text-[10px] text-cyan-600 dark:text-accent-cyan uppercase block mb-1 font-semibold">
                  Challenge #{idx + 1}
                </span>
                <span className="line-clamp-2 leading-snug">{q.question}</span>
              </div>
              {isAnswered && (
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-accent-emerald shrink-0 ml-1 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Active Question Arena */}
      {activeQuestion && (
        <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-slate-50/90 dark:bg-surface-200/90 border border-slate-200/80 dark:border-white/10 space-y-4 shadow-sm">
          <div className="space-y-1">
            <div className="text-[11px] font-mono text-violet-600 dark:text-accent-violet uppercase tracking-wider font-semibold">
              Targeted Premise Under Examination
            </div>
            <h4 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white leading-snug">
              "{activeQuestion.question}"
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 italic">
              <strong>Objective:</strong> {activeQuestion.intent}
            </p>
          </div>

          {/* User Response Input */}
          <div className="space-y-2 pt-2">
            <label htmlFor={`answer-${activeQuestion.id}`} className="block text-xs font-mono text-slate-700 dark:text-slate-300 uppercase font-medium">
              Your Defense / Contingency Plan:
            </label>
            <textarea
              id={`answer-${activeQuestion.id}`}
              rows={3}
              value={answers[activeQuestion.id] || ''}
              onChange={(e) =>
                setAnswers({ ...answers, [activeQuestion.id]: e.target.value })
              }
              placeholder="Type how you would handle this friction or why you believe this won't be an issue..."
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-100 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors resize-y shadow-inner"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-slate-500 font-mono">
              Be uncomfortably honest with yourself
            </span>
            <button
              onClick={() => handleSpar(activeQuestion.id)}
              disabled={loadingMap[activeQuestion.id] || !answers[activeQuestion.id]?.trim()}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold font-mono tracking-wider flex items-center space-x-2 transition-all shadow-md shadow-violet-500/20 active:scale-[0.98]"
            >
              {loadingMap[activeQuestion.id] ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>ANALYZING PREMISE...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>CHALLENGE MY ANSWER</span>
                </>
              )}
            </button>
          </div>

          {/* AI Counter-Reflection Display */}
          {reflections[activeQuestion.id] && (
            <div className="mt-4 p-4 rounded-xl bg-white dark:bg-surface-50 border border-violet-500/30 dark:border-accent-violet/30 space-y-2 shadow-sm">
              <div className="flex items-center space-x-2 text-xs font-mono text-cyan-600 dark:text-accent-cyan font-semibold">
                <MessageSquare className="w-4 h-4 text-cyan-600 dark:text-accent-cyan" />
                <span>COGNITIVE SPARRING MIRROR</span>
              </div>
              <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
                {reflections[activeQuestion.id]}
              </p>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-200/60 dark:border-white/5 pt-2 flex items-center space-x-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-accent-amber" />
                <span>Notice whether your defense introduced any new unverified assumptions.</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
