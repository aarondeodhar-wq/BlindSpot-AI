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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20 text-xs font-mono uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
              <span>COGNITIVE AUDIT COMPLETE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white leading-tight">
              {report.decisionTitle}
            </h2>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Audited at {new Date(report.createdAt).toLocaleTimeString()} • Non-prescriptive Epistemic Mirror
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleCopyDossier}
              className="px-3.5 py-2 rounded-xl bg-surface-100 hover:bg-surface-50 text-slate-200 border border-white/10 text-xs font-medium flex items-center space-x-2 transition-all shadow-sm"
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
              className="px-3.5 py-2 rounded-xl bg-surface-100 hover:bg-surface-50 text-slate-200 border border-white/10 text-xs font-medium flex items-center space-x-2 transition-all"
              title="Download raw report as JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-2 rounded-xl bg-surface-100 hover:bg-surface-50 text-slate-200 border border-white/10 text-xs font-medium hidden sm:flex items-center space-x-1.5 transition-all"
              title="Print or save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              onClick={onReset}
              className="px-3.5 py-2 rounded-xl bg-surface-200 hover:bg-surface-100 text-slate-300 hover:text-white border border-white/5 text-xs font-medium flex items-center space-x-2 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>New Decision</span>
            </button>
          </div>
        </div>

        {/* The Golden Rule Neutrality Guarantee Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-accent-cyan/15 via-surface-100 to-accent-violet/15 border border-accent-cyan/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-start space-x-3.5">
            <div className="p-2 rounded-xl bg-accent-cyan/20 border border-accent-cyan/40 text-accent-cyan shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-accent-cyan font-bold">
                The Non-Prescriptive Safeguard
              </div>
              <p className="text-xs sm:text-sm text-slate-200 mt-0.5 leading-relaxed font-medium">
                {report.neutralityPledge}
              </p>
            </div>
          </div>

          <div className="shrink-0 pl-11 sm:pl-0">
            <span className="text-[11px] font-mono uppercase px-3 py-1.5 rounded-lg bg-surface-200 border border-white/10 text-slate-300">
              Ethical AI Contract: Sealed
            </span>
          </div>
        </div>

        {/* Cognitive Vulnerability Score & Summary Bar */}
        <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-white/10 grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          
          {/* Gauge Meter */}
          <div className="md:col-span-1 flex flex-col items-center justify-center p-4 rounded-xl bg-surface-200/80 border border-white/5 text-center">
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/5"
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
                <span className="font-display font-extrabold text-2xl text-white">
                  {report.overallBlindspotScore}%
                </span>
                <span className="text-[9px] font-mono uppercase text-slate-400">
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
            <div className="flex items-center space-x-2 text-xs font-mono text-accent-cyan uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Metacognitive Executive Diagnostic</span>
            </div>
            <p className="text-base sm:text-lg text-slate-200 font-sans leading-relaxed">
              {report.summaryInsight}
            </p>
            <div className="flex flex-wrap gap-2 pt-2 text-xs">
              <span className="px-2.5 py-1 rounded-md bg-accent-rose/10 text-accent-rose border border-accent-rose/20 font-mono">
                {report.unstatedAssumptions.length} Unverified Premises
              </span>
              <span className="px-2.5 py-1 rounded-md bg-accent-amber/10 text-accent-amber border border-accent-amber/20 font-mono">
                {report.overlookedBlindSpots.length} Structural Blindspots
              </span>
              <span className="px-2.5 py-1 rounded-md bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 font-mono">
                {report.detectedBiases.length} Active Biases Detected
              </span>
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
    </section>
  );
};
