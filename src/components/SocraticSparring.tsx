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
    <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-accent-violet/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/5 gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-accent-violet/10 text-accent-violet border border-accent-violet/20 text-xs font-mono uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Sparring Arena</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
            Socratic Stress-Test Questions
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Pick a question below and type your candid defense. The AI will reflect your hidden premises back to you.
          </p>
        </div>

        <div className="text-xs font-mono px-3 py-1.5 rounded-lg bg-surface-100 border border-white/5 text-slate-300 self-start sm:self-auto">
          {Object.keys(reflections).length} / {questions.length} Questions Sparred
        </div>
      </div>

      {/* Question Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-6">
        {questions.map((q, idx) => {
          const isAnswered = !!reflections[q.id];
          const isSelected = activeQuestionId === q.id;
          return (
            <button
              key={q.id}
              onClick={() => setActiveQuestionId(q.id)}
              className={`p-3 rounded-xl text-left border text-xs font-medium transition-all flex items-start justify-between ${
                isSelected
                  ? 'bg-accent-violet/20 border-accent-violet text-white shadow-md'
                  : 'bg-surface-100/60 border-white/5 hover:border-white/20 text-slate-300'
              }`}
            >
              <div>
                <span className="font-mono text-[10px] text-accent-cyan uppercase block mb-1">
                  Challenge #{idx + 1}
                </span>
                <span className="line-clamp-2 leading-snug">{q.question}</span>
              </div>
              {isAnswered && (
                <CheckCircle className="w-4 h-4 text-accent-emerald shrink-0 ml-1 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Active Question Arena */}
      {activeQuestion && (
        <div className="mt-6 p-5 sm:p-6 rounded-xl bg-surface-200/90 border border-white/10 space-y-4">
          <div className="space-y-1">
            <div className="text-[11px] font-mono text-accent-violet uppercase tracking-wider">
              Targeted Premise Under Examination
            </div>
            <h4 className="text-base sm:text-lg font-semibold text-white leading-snug">
              "{activeQuestion.question}"
            </h4>
            <p className="text-xs text-slate-400 italic">
              <strong>Objective:</strong> {activeQuestion.intent}
            </p>
          </div>

          {/* User Response Input */}
          <div className="space-y-2 pt-2">
            <label htmlFor={`answer-${activeQuestion.id}`} className="block text-xs font-mono text-slate-300 uppercase">
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
              className="w-full px-4 py-3 rounded-xl bg-surface-100 border border-white/10 text-white placeholder-slate-500 text-sm focus:border-accent-violet focus:ring-1 focus:ring-accent-violet transition-colors resize-y"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-slate-500 font-mono">
              Be uncomfortably honest with yourself
            </span>
            <button
              onClick={() => handleSpar(activeQuestion.id)}
              disabled={loadingMap[activeQuestion.id] || !answers[activeQuestion.id]?.trim()}
              className="px-5 py-2.5 rounded-xl bg-accent-violet hover:bg-accent-violet/90 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold font-mono tracking-wider flex items-center space-x-2 transition-all shadow-md shadow-accent-violet/20"
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
            <div className="mt-4 p-4 rounded-xl bg-surface-50 border border-accent-violet/30 space-y-2 animate-fadeIn">
              <div className="flex items-center space-x-2 text-xs font-mono text-accent-cyan">
                <MessageSquare className="w-4 h-4 text-accent-cyan" />
                <span>COGNITIVE SPARRING MIRROR</span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed font-sans">
                {reflections[activeQuestion.id]}
              </p>
              <div className="text-[11px] text-slate-400 border-t border-white/5 pt-2 flex items-center space-x-1.5">
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
