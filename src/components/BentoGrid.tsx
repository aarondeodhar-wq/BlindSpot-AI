import React from 'react';
import type { BlindSpotReport } from '../types';
import {
  AlertTriangle,
  EyeOff,
  Scale,
  GitFork,
  Brain,
  CheckCircle2,
  Clock,
  ShieldAlert,
} from 'lucide-react';

interface BentoGridProps {
  report: BlindSpotReport;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ report }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      {/* 1. Unstated Assumptions (Span 2 cols on lg) */}
      <div className="lg:col-span-2 glass-panel glass-panel-hover rounded-2xl p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-accent-rose/10 border border-accent-rose/20 text-accent-rose">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-white">
                  Unstated Assumptions
                </h3>
                <p className="text-xs text-slate-400">
                  Beliefs treated as guaranteed facts without contractual proof
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-1 rounded bg-accent-rose/10 text-accent-rose border border-accent-rose/20">
              High Fragility
            </span>
          </div>

          <div className="space-y-3.5 pt-2">
            {report.unstatedAssumptions.map((item, idx) => (
              <div
                key={item.id || idx}
                className="p-4 rounded-xl bg-surface-200/90 border border-white/5 space-y-2 hover:border-white/10 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="text-sm font-semibold text-slate-100 flex items-start space-x-2">
                    <span className="text-accent-rose font-mono text-xs mt-0.5 font-bold">
                      #{idx + 1}
                    </span>
                    <span>"{item.premise}"</span>
                  </div>
                  <span
                    className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border shrink-0 ${
                      item.severity === 'high'
                        ? 'bg-accent-rose/10 border-accent-rose/30 text-accent-rose'
                        : 'bg-accent-amber/10 border-accent-amber/30 text-accent-amber'
                    }`}
                  >
                    {item.severity} Risk
                  </span>
                </div>

                <p className="text-xs text-slate-400 pl-5 leading-relaxed">
                  <strong className="text-slate-300">Why Fragile:</strong> {item.whyFragile}
                </p>

                <div className="mt-2 pt-2 border-t border-white/5 pl-5 flex items-start space-x-2 text-xs text-accent-cyan">
                  <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-accent-cyan" />
                  <span>
                    <strong className="text-accent-cyan">Verification Protocol:</strong> {item.verificationStep}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Overlooked Blind Spots (Span 1 col on lg) */}
      <div className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-accent-amber/10 border border-accent-amber/20 text-accent-amber">
              <EyeOff className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                Overlooked Blind Spots
              </h3>
              <p className="text-xs text-slate-400">
                Critical factors absent from your initial reasoning
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {report.overlookedBlindSpots.map((spot, idx) => (
              <div
                key={spot.id || idx}
                className="p-3.5 rounded-xl bg-surface-200/90 border border-white/5 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-200 line-clamp-1">
                    {spot.factor}
                  </span>
                  <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                    {spot.category}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {spot.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Shadow Trade-Offs (Span 1 col on lg) */}
      <div className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                Shadow Trade-Offs
              </h3>
              <p className="text-xs text-slate-400">
                The hidden asymmetric ledger
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {report.shadowTradeOffs.map((trade, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-surface-200/90 border border-white/5 space-y-2"
              >
                <div className="text-[10px] font-mono text-accent-cyan uppercase tracking-wider">
                  {trade.asymmetryScore}
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex items-start space-x-2">
                    <span className="text-accent-emerald font-bold font-mono">GAIN:</span>
                    <span className="text-slate-300">{trade.gained}</span>
                  </div>
                  <div className="flex items-start space-x-2 pt-1 border-t border-white/5">
                    <span className="text-accent-rose font-bold font-mono">COST:</span>
                    <span className="text-slate-400">{trade.sacrificed}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Multi-Horizon Domino Effects (Span 2 cols on lg) */}
      <div className="lg:col-span-2 glass-panel glass-panel-hover rounded-2xl p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-accent-violet/10 border border-accent-violet/20 text-accent-violet">
                <GitFork className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-white">
                  Second-Order Domino Effects
                </h3>
                <p className="text-xs text-slate-400">
                  Cascading consequences across 3 distinct time horizons
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-1 rounded bg-accent-violet/10 text-accent-violet border border-accent-violet/20">
              Systems Simulation
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            {report.dominoEffects.map((domino, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-surface-200/90 border border-white/5 space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-accent-violet mb-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{domino.horizon}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs">
                      <div className="text-[10px] uppercase font-mono text-slate-500 font-semibold">
                        Visible Expectation:
                      </div>
                      <p className="text-slate-300 mt-0.5 leading-snug">
                        {domino.visibleExpectation}
                      </p>
                    </div>

                    <div className="text-xs border-t border-white/5 pt-2">
                      <div className="text-[10px] uppercase font-mono text-accent-rose font-semibold flex items-center space-x-1">
                        <ShieldAlert className="w-3 h-3 text-accent-rose" />
                        <span>Shadow Risk:</span>
                      </div>
                      <p className="text-slate-400 mt-0.5 leading-snug">
                        {domino.shadowRisk}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Cognitive Biases Detected (Span 3 cols / Full Width) */}
      <div className="lg:col-span-3 glass-panel glass-panel-hover rounded-2xl p-6 sm:p-7 relative overflow-hidden">
        <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                Detected Cognitive Biases & Antidotes
              </h3>
              <p className="text-xs text-slate-400">
                Psychological filters skewing your risk evaluation
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono uppercase px-2 py-1 rounded bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20">
            Behavioral Economics
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {report.detectedBiases.map((bias, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-surface-200/90 border border-white/5 space-y-2.5 flex flex-col justify-between"
            >
              <div>
                <div className="text-sm font-semibold text-white flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-accent-cyan" />
                  <span>{bias.name}</span>
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {bias.description}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/5 text-xs">
                <div className="bg-surface-100 p-2 rounded-lg border border-white/5 text-slate-300">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">
                    Observed in your rationale:
                  </span>
                  <span className="italic">"{bias.evidenceFromInput}"</span>
                </div>

                <div className="text-accent-cyan">
                  <span className="text-[10px] font-mono uppercase tracking-wider block font-bold">
                    Cognitive Antidote:
                  </span>
                  <span className="text-slate-300 leading-snug">
                    {bias.antidote}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
