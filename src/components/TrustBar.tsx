import React from 'react';
import { EyeOff, AlertTriangle, GitFork, Scale, BrainCircuit } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const principles = [
    {
      icon: EyeOff,
      title: 'WYSIATI Principle',
      desc: 'Combats "What You See Is All There Is" (D. Kahneman)',
    },
    {
      icon: AlertTriangle,
      title: 'Unstated Premises',
      desc: 'Surfaces fragile assumptions disguised as certainties',
    },
    {
      icon: GitFork,
      title: 'Second-Order Effects',
      desc: 'Simulates "And then what?" multi-horizon fallout',
    },
    {
      icon: Scale,
      title: 'Shadow Trade-Offs',
      desc: 'Quantifies invisible costs traded for visible benefits',
    },
    {
      icon: BrainCircuit,
      title: 'Epistemic Sparring',
      desc: 'Sharpens self-conviction through Socratic pressure',
    },
  ];

  return (
    <div className="w-full bg-surface-200/40 border-y border-white/5 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {principles.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="flex items-start space-x-3 p-3 rounded-xl bg-surface-100/40 border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="p-2 rounded-lg bg-surface-50 border border-white/10 shrink-0">
                  <Icon className="w-4 h-4 text-accent-cyan" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-200 font-display">
                    {p.title}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                    {p.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
