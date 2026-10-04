import React, { useState } from 'react';
import type { BlindSpotReport } from '../types';
import { BentoGrid } from './BentoGrid';
import { SocraticSparring } from './SocraticSparring';
import {
  ShieldCheck,
  Download,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Printer,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AnalysisDashboardProps {
  report: BlindSpotReport;
  onReset: () => void;
  customApiKey?: string;
}

export const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({
  report,
  onReset,
  customApiKey,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyDossier = () => {
    const text = `# THE BLIND SPOT // Decision Audit Dossier
DECISION: ${report.decisionTitle}
AUDIT TIMESTAMP: ${report.createdAt}
BLIND SPOT VULNERABILITY SCORE: ${report.overallBlindspotScore}/100

## 🛡️ SYSTEM INTEGRITY PLEDGE
${report.neutralityPledge}

## 🔍 SUMMARY DIAGNOSTIC
${report.summaryInsight}

## ⚠️ UNSTATED ASSUMPTIONS (Fragile Premises)
${report.unstatedAssumptions
  .map(
    (a, i) =>
      `${i + 1}. "${a.premise}" [${a.severity.toUpperCase()} RISK]\n   - Why Fragile: ${a.whyFragile}\n   - Verification Step: ${a.verificationStep}`
  )
  .join('\n\n')}

## 🕳️ OVERLOOKED BLIND SPOTS
${report.overlookedBlindSpots
  .map((b, i) => `${i + 1}. ${b.factor} (${b.category})\n   - Impact: ${b.explanation}`)
  .join('\n\n')}

## ⚖️ SHADOW TRADE-OFFS
${report.shadowTradeOffs
  .map(
    (t, i) =>
      `${i + 1}. [${t.asymmetryScore}]\n   - Visible Gain: ${t.gained}\n   - Silent Cost: ${t.sacrificed}`
  )
  .join('\n\n')}

## 🔮 SECOND-ORDER DOMINO EFFECTS
${report.dominoEffects
  .map(
    (d) =>
      `* Horizon: ${d.horizon}\n  - Expectation: ${d.visibleExpectation}\n  - Shadow Risk: ${d.shadowRisk}`
  )
  .join('\n\n')}

## 🧠 DETECTED COGNITIVE BIASES
${report.detectedBiases
  .map(
    (cb, i) =>
      `${i + 1}. ${cb.name}\n   - Evidence: "${cb.evidenceFromInput}"\n   - Antidote: ${cb.antidote}`
  )
  .join('\n\n')}

## ⚔️ SOCRATIC STRESS-TEST QUESTIONS
${report.socraticQuestions.map((q, i) => `${i + 1}. "${q.question}" (Objective: ${q.intent})`).join('\n')}
`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch (e) {}
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `blindspot-audit-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="analysis-dashboard" className="py-12 sm:py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Action Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-black/5 dark:border-white/10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-accent-emerald border border-emerald-500/20 dark:border-accent-emerald/20 text-xs font-mono uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
              <span>
                {report.isLiveAI
                  ? `LIVE GEMINI AI AUDIT (${report.sourceModel || 'gemini-3.5-flash'})`
                  : 'COGNITIVE AUDIT COMPLETE'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white leading-tight">
              {report.decisionTitle}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
              Audited at {new Date(report.createdAt).toLocaleTimeString()} • Verified Non-Prescriptive Mirror
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleCopyDossier}
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-surface-100 hover:bg-slate-50 dark:hover:bg-surface-50 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 text-xs font-medium flex items-center space-x-2 transition-all shadow-sm"
              title="Copy complete markdown dossier"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-accent-emerald" />
                  <span className="text-accent-emerald font-semibold">Dossier Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Dossier</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadJSON}
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-surface-100 hover:bg-slate-50 dark:hover:bg-surface-50 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 text-xs font-medium flex items-center space-x-2 transition-all shadow-sm"
              title="Download raw report as JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-2 rounded-xl bg-white dark:bg-surface-100 hover:bg-slate-50 dark:hover:bg-surface-50 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 text-xs font-medium hidden sm:flex items-center space-x-1.5 transition-all shadow-sm"
              title="Print or save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              onClick={onReset}
              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-surface-200 hover:bg-slate-200 dark:hover:bg-surface-100 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/5 text-xs font-medium flex items-center space-x-2 transition-all shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>New Decision</span>
            </button>
          </div>
        </div>

        {/* The Golden Rule Neutrality Guarantee Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-slate-100 dark:via-surface-100 to-indigo-500/10 border border-cyan-500/20 dark:border-accent-cyan/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start space-x-3.5">
            <div className="p-2 rounded-xl bg-cyan-500/15 dark:bg-accent-cyan/20 border border-cyan-500/30 dark:border-accent-cyan/40 text-cyan-600 dark:text-accent-cyan shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-cyan-600 dark:text-accent-cyan font-bold">
                The Non-Prescriptive Safeguard
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 mt-0.5 leading-relaxed font-medium">
                {report.neutralityPledge}
              </p>
            </div>
          </div>

          <div className="shrink-0 pl-11 sm:pl-0">
            <span className="text-[11px] font-mono uppercase px-3 py-1.5 rounded-lg bg-white dark:bg-surface-200 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 shadow-sm">
              Ethical AI Contract: Sealed
            </span>
          </div>
        </div>

        {/* Cognitive Vulnerability Score & Summary Bar (macOS Window) */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-black/5 dark:border-white/10 space-y-6">
          {/* Window Header */}
          <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/5">
            <div className="traffic-lights">
              <div className="traffic-dot traffic-red" />
              <div className="traffic-dot traffic-yellow" />
              <div className="traffic-dot traffic-green" />
            </div>
            <div className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400 tracking-wider">
              Metacognitive Executive Summary
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
            {/* Gauge Meter */}
            <div className="md:col-span-1 flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 dark:bg-surface-200/80 border border-slate-200/60 dark:border-white/5 text-center shadow-inner">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-200 dark:text-white/5"
                    strokeWidth="3.8"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-accent-rose transition-all duration-1000 ease-out"
                    strokeDasharray={`${report.overallBlindspotScore}, 100`}
                    strokeWidth="3.8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">
                    {report.overallBlindspotScore}%
                  </span>
                  <span className="text-[9px] font-mono uppercase text-slate-500 dark:text-slate-400">
                    Blindspot Index
                  </span>
                </div>
              </div>
              <div className="mt-2 text-[11px] font-mono text-accent-rose uppercase font-semibold">
                High Unexamined Area
              </div>
            </div>

            {/* Core Summary Diagnostic */}
            <div className="md:col-span-3 space-y-3">
              <div className="flex items-center space-x-2 text-xs font-mono text-cyan-600 dark:text-accent-cyan uppercase tracking-wider font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Executive AI Diagnostic</span>
              </div>
              <p className="text-base sm:text-lg text-slate-800 dark:text-slate-200 font-sans leading-relaxed">
                {report.summaryInsight}
              </p>
              <div className="flex flex-wrap gap-2 pt-2 text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-accent-rose/10 text-rose-700 dark:text-accent-rose border border-accent-rose/20 font-mono">
                  {report.unstatedAssumptions.length} Unverified Premises
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-accent-amber/10 text-amber-700 dark:text-accent-amber border border-accent-amber/20 font-mono">
                  {report.overlookedBlindSpots.length} Structural Blindspots
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-700 dark:text-accent-cyan border border-cyan-500/20 dark:border-accent-cyan/20 font-mono">
                  {report.detectedBiases.length} Active Biases Detected
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 6-Dimension Asymmetrical Bento Grid */}
        <BentoGrid report={report} />

        {/* Interactive Socratic Sparring Arena */}
        <SocraticSparring
          questions={report.socraticQuestions}
          customApiKey={customApiKey}
        />

      </div>

      {/* Mobile Floating Action Dock (iOS Style) */}
      <div className="sm:hidden fixed bottom-4 left-4 right-4 z-40 p-2 rounded-2xl glass-panel border border-black/10 dark:border-white/15 shadow-2xl flex items-center justify-between gap-2">
        <button
          onClick={handleCopyDossier}
          className="flex-1 py-3 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-md active:scale-[0.98] transition-transform"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Dossier Copied!' : 'Copy Decision Dossier'}</span>
        </button>
        <button
          onClick={onReset}
          className="py-3 px-4 rounded-xl bg-slate-100 dark:bg-surface-100 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 text-xs font-semibold flex items-center space-x-1.5 active:scale-[0.98] transition-transform"
        >
          <RotateCcw className="w-4 h-4" />
          <span>New</span>
        </button>
      </div>
    </section>
  );
};
