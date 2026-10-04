import React, { useState } from 'react';
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
  Layers,
} from 'lucide-react';

interface BentoGridProps {
  report: BlindSpotReport;
}

type DimensionFilter = 'all' | 'assumptions' | 'blindspots' | 'tradeoffs' | 'dominos' | 'biases';

export const BentoGrid: React.FC<BentoGridProps> = ({ report }) => {
  const [filter, setFilter] = useState<DimensionFilter>('all');

  const filterTabs: { id: DimensionFilter; label: string; count: number; icon: any }[] = [
    { id: 'all', label: 'All 5 Dimensions', count: 5, icon: Layers },
    { id: 'assumptions', label: 'Unstated Assumptions', count: report.unstatedAssumptions.length, icon: AlertTriangle },
    { id: 'blindspots', label: 'Structural Blindspots', count: report.overlookedBlindSpots.length, icon: EyeOff },
    { id: 'tradeoffs', label: 'Shadow Trade-offs', count: report.shadowTradeOffs.length, icon: Scale },
    { id: 'dominos', label: 'Domino Cascades', count: report.dominoEffects.length, icon: GitFork },
    { id: 'biases', label: 'Cognitive Biases', count: report.detectedBiases.length, icon: Brain },
  ];

  const showAssumptions = filter === 'all' || filter === 'assumptions';
  const showBlindspots = filter === 'all' || filter === 'blindspots';
  const showTradeoffs = filter === 'all' || filter === 'tradeoffs';
  const showDominos = filter === 'all' || filter === 'dominos';
  const showBiases = filter === 'all' || filter === 'biases';

  return (
    <div className="space-y-6">
      
      {/* Mobile-Friendly Lens Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none snap-x">
        {filterTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = filter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all snap-start shrink-0 ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-white/80 dark:bg-surface-100/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-surface-50 border border-slate-200 dark:border-white/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.id !== 'all' && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                    isActive ? 'bg-black/20 text-white' : 'bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        
        {/* 1. Unstated Assumptions (Span 2 cols on lg) */}
        {showAssumptions && (
          <div className={`${filter === 'all' ? 'lg:col-span-2' : 'lg:col-span-3'} glass-panel glass-panel-hover rounded-3xl p-5 sm:p-7 relative overflow-hidden flex flex-col justify-between`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-xl bg-accent-rose/10 border border-accent-rose/20 text-accent-rose shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                      Unstated Assumptions
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Beliefs treated as guaranteed facts without contractual proof
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-1 rounded bg-accent-rose/10 text-rose-700 dark:text-accent-rose border border-accent-rose/20 hidden sm:inline-block">
                  High Fragility
                </span>
              </div>

              <div className="space-y-3.5 pt-2">
                {report.unstatedAssumptions.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="p-4 rounded-2xl bg-slate-50/90 dark:bg-surface-200/90 border border-slate-200/70 dark:border-white/5 space-y-2 hover:border-slate-300 dark:hover:border-white/10 transition-colors shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-start space-x-2">
                        <span className="text-accent-rose font-mono text-xs mt-0.5 font-bold">
                          #{idx + 1}
                        </span>
                        <span>"{item.premise}"</span>
                      </div>
                      <span
                        className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border shrink-0 ${
                          item.severity === 'high'
                            ? 'bg-accent-rose/10 border-accent-rose/30 text-rose-700 dark:text-accent-rose'
                            : 'bg-accent-amber/10 border-accent-amber/30 text-amber-700 dark:text-accent-amber'
                        }`}
                      >
                        {item.severity} Risk
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 pl-4 sm:pl-5 leading-relaxed">
                      <strong className="text-slate-800 dark:text-slate-300">Why Fragile:</strong> {item.whyFragile}
                    </p>

                    <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-white/5 pl-4 sm:pl-5 flex items-start space-x-2 text-xs text-cyan-700 dark:text-accent-cyan">
                      <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-cyan-600 dark:text-accent-cyan" />
                      <span>
                        <strong className="text-cyan-700 dark:text-accent-cyan">Verification Protocol:</strong> {item.verificationStep}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. Overlooked Blind Spots (Span 1 col on lg) */}
        {showBlindspots && (
          <div className={`${filter === 'all' ? 'lg:col-span-1' : 'lg:col-span-3'} glass-panel glass-panel-hover rounded-3xl p-5 sm:p-7 relative overflow-hidden flex flex-col justify-between`}>
            <div className="space-y-4">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-accent-amber shrink-0">
                  <EyeOff className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                    Structural Blind Spots
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Critical factors absent from initial reasoning
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                {report.overlookedBlindSpots.map((spot, idx) => (
                  <div
                    key={spot.id || idx}
                    className="p-3.5 rounded-2xl bg-slate-50/90 dark:bg-surface-200/90 border border-slate-200/70 dark:border-white/5 space-y-1.5 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                        {spot.factor}
                      </span>
                      <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-200/60 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-300/60 dark:border-white/10">
                        {spot.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {spot.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. Shadow Trade-Offs (Span 1 col on lg) */}
        {showTradeoffs && (
          <div className={`${filter === 'all' ? 'lg:col-span-1' : 'lg:col-span-3'} glass-panel glass-panel-hover rounded-3xl p-5 sm:p-7 relative overflow-hidden flex flex-col justify-between`}>
            <div className="space-y-4">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 shrink-0">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                    Shadow Trade-Offs
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    The hidden asymmetric ledger
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                {report.shadowTradeOffs.map((trade, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50/90 dark:bg-surface-200/90 border border-slate-200/70 dark:border-white/5 space-y-2 shadow-sm"
                  >
                    <div className="text-[10px] font-mono text-cyan-700 dark:text-accent-cyan uppercase tracking-wider font-semibold">
                      {trade.asymmetryScore}
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-start space-x-2">
                        <span className="text-emerald-700 dark:text-accent-emerald font-bold font-mono">GAIN:</span>
                        <span className="text-slate-700 dark:text-slate-300">{trade.gained}</span>
                      </div>
                      <div className="flex items-start space-x-2 pt-1 border-t border-slate-200/60 dark:border-white/5">
                        <span className="text-rose-700 dark:text-accent-rose font-bold font-mono">COST:</span>
                        <span className="text-slate-600 dark:text-slate-400">{trade.sacrificed}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. Multi-Horizon Domino Effects (Span 2 cols on lg) */}
        {showDominos && (
          <div className={`${filter === 'all' ? 'lg:col-span-2' : 'lg:col-span-3'} glass-panel glass-panel-hover rounded-3xl p-5 sm:p-7 relative overflow-hidden flex flex-col justify-between`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-accent-violet shrink-0">
                    <GitFork className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                      Second-Order Domino Effects
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Cascading consequences across 3 distinct time horizons
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-1 rounded bg-violet-500/10 text-violet-700 dark:text-accent-violet border border-violet-500/20 hidden sm:inline-block">
                  Systems Simulation
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                {report.dominoEffects.map((domino, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50/90 dark:bg-surface-200/90 border border-slate-200/70 dark:border-white/5 space-y-3 flex flex-col justify-between shadow-sm"
                  >
                    <div>
                      <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-violet-600 dark:text-accent-violet mb-2">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{domino.horizon}</span>
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs">
                          <div className="text-[10px] uppercase font-mono text-slate-500 font-semibold">
                            Visible Expectation:
                          </div>
                          <p className="text-slate-700 dark:text-slate-300 mt-0.5 leading-snug">
                            {domino.visibleExpectation}
                          </p>
                        </div>

                        <div className="text-xs border-t border-slate-200/60 dark:border-white/5 pt-2">
                          <div className="text-[10px] uppercase font-mono text-rose-700 dark:text-accent-rose font-semibold flex items-center space-x-1">
                            <ShieldAlert className="w-3 h-3 text-accent-rose" />
                            <span>Shadow Risk:</span>
                          </div>
                          <p className="text-slate-600 dark:text-slate-400 mt-0.5 leading-snug">
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
        )}

        {/* 5. Cognitive Biases Detected (Span 3 cols / Full Width) */}
        {showBiases && (
          <div className="lg:col-span-3 glass-panel glass-panel-hover rounded-3xl p-5 sm:p-7 relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-black/5 dark:border-white/5 mb-4">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-accent-cyan shrink-0">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                    Detected Cognitive Biases & Antidotes
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Psychological filters skewing your risk evaluation
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono uppercase px-2 py-1 rounded bg-cyan-500/10 text-cyan-700 dark:text-accent-cyan border border-cyan-500/20 hidden sm:inline-block">
                Behavioral Economics
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {report.detectedBiases.map((bias, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50/90 dark:bg-surface-200/90 border border-slate-200/70 dark:border-white/5 space-y-2.5 flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-accent-cyan shrink-0" />
                      <span>{bias.name}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      {bias.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-white/5 text-xs">
                    <div className="bg-slate-100/90 dark:bg-surface-100 p-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 text-slate-700 dark:text-slate-300">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block font-semibold mb-0.5">
                        Observed in your rationale:
                      </span>
                      <span className="italic leading-snug">"{bias.evidenceFromInput}"</span>
                    </div>

                    <div className="text-cyan-700 dark:text-accent-cyan pt-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider block font-bold mb-0.5">
                        Cognitive Antidote:
                      </span>
                      <span className="text-slate-700 dark:text-slate-300 leading-snug">
                        {bias.antidote}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
