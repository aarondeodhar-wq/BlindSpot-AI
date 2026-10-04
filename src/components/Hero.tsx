import React from 'react';
import { Compass, Sparkles, ChevronRight, CheckCircle2, ShieldAlert } from 'lucide-react';

interface HeroProps {
  onStartAudit: () => void;
  onLoadChallengeExample: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartAudit, onLoadChallengeExample }) => {
  return (
    <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden border-b border-black/5 dark:border-white/5 radial-mesh">
      {/* Subtle ambient light blooms */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-accent-violet/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Anti-prescriptive Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-surface-100/90 border border-black/5 dark:border-white/10 text-xs text-slate-700 dark:text-slate-300 mb-8 backdrop-blur-md shadow-sm">
          <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse"></span>
          <span className="font-mono text-slate-500 dark:text-slate-400">CORE ETHICAL CONSTRAINT:</span>
          <span className="text-slate-900 dark:text-white font-medium">We Never Decide For You</span>
          <span className="text-slate-400 dark:text-slate-500">•</span>
          <span className="text-cyan-600 dark:text-accent-cyan font-semibold">We Audit What You Overlooked</span>
        </div>

        {/* High-Contrast Bold Editorial Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.15]">
          What You <span className="italic font-normal text-cyan-600 dark:text-accent-cyan">Aren’t Seeing</span> <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-100 dark:to-slate-400">
            Matters More Than What You Are.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
          People make high-stakes choices based on visible perks—ignoring fragile unstated assumptions, 
          hidden trade-offs, and second-order dominos. 
          <span className="text-slate-900 dark:text-white font-medium block mt-1">
            The Blind Spot is your AI cognitive sparring partner that pressure-tests your reasoning.
          </span>
        </p>

        {/* Dual Conversion CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
          <button
            onClick={onStartAudit}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-bold text-base tracking-wide flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <span>Stress-Test Your Decision</span>
            <ChevronRight className="w-5 h-5 text-white" />
          </button>

          <button
            onClick={onLoadChallengeExample}
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white dark:bg-surface-100 hover:bg-slate-50 dark:hover:bg-surface-50 text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white font-medium text-base border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 flex items-center justify-center space-x-2.5 transition-all duration-200 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-accent-cyan" />
            <span>Explore Sample Scenario</span>
          </button>
        </div>

        {/* Trust & Architecture Validation Chips */}
        <div className="mt-14 pt-8 border-t border-black/5 dark:border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="p-3.5 rounded-xl bg-white/80 dark:bg-surface-200/50 border border-slate-200/60 dark:border-white/5 shadow-sm flex items-start space-x-2.5">
            <CheckCircle2 className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white uppercase font-mono tracking-wider">Zero Advice</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Non-prescriptive Socratic mirror</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/80 dark:bg-surface-200/50 border border-slate-200/60 dark:border-white/5 shadow-sm flex items-start space-x-2.5">
            <ShieldAlert className="w-4 h-4 text-accent-rose shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white uppercase font-mono tracking-wider">Assumption Audit</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Detects beliefs treated as facts</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/80 dark:bg-surface-200/50 border border-slate-200/60 dark:border-white/5 shadow-sm flex items-start space-x-2.5">
            <Compass className="w-4 h-4 text-accent-violet shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white uppercase font-mono tracking-wider">2nd-Order Dominos</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Projects 6-month & 3-year cascades</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/80 dark:bg-surface-200/50 border border-slate-200/60 dark:border-white/5 shadow-sm flex items-start space-x-2.5">
            <Sparkles className="w-4 h-4 text-accent-amber shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white uppercase font-mono tracking-wider">Bias Identification</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Exposes present & proximity bias</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
