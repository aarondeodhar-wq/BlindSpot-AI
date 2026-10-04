import React from 'react';
import { Eye, Shield, Heart, Code2 } from 'lucide-react';

interface FooterProps {
  onOpenGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenGuide }) => {
  return (
    <footer className="w-full bg-slate-100 dark:bg-surface-300 border-t border-black/5 dark:border-white/5 pt-12 pb-16 text-slate-500 dark:text-slate-400 text-xs transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-black/5 dark:border-white/5">
          
          {/* Column 1: Brand & Mandate */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white dark:bg-surface-100 border border-slate-200 dark:border-white/10 shadow-sm">
                <Eye className="w-4 h-4 text-cyan-600 dark:text-accent-cyan" />
              </div>
              <span className="font-display font-bold text-slate-900 dark:text-white text-base">
                THE BLIND SPOT
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
              An AI-powered cognitive sparring system designed to detect unstated assumptions, 
              hidden trade-offs, and second-order dominos without making the decision for you.
            </p>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 dark:text-accent-cyan font-mono text-[10px]">
              <Shield className="w-3 h-3" />
              <span>NON-PRESCRIPTIVE ETHICS PLEDGE</span>
            </div>
          </div>

          {/* Column 2: Cognitive Dimensions */}
          <div className="space-y-2">
            <div className="font-mono text-slate-900 dark:text-white text-xs uppercase tracking-wider font-semibold">
              The 6 Dimensions
            </div>
            <ul className="space-y-1.5 text-slate-600 dark:text-slate-400 text-xs">
              <li>1. Unstated Assumptions (Iceberg)</li>
              <li>2. Overlooked Blind Spots</li>
              <li>3. Shadow Trade-Offs & Asymmetries</li>
              <li>4. Multi-Horizon Domino Effects</li>
              <li>5. Cognitive Bias Vulnerability Radar</li>
              <li>6. Socratic Stress-Test Sparring</li>
            </ul>
          </div>

          {/* Column 3: Theoretical Foundations */}
          <div className="space-y-2">
            <div className="font-mono text-slate-900 dark:text-white text-xs uppercase tracking-wider font-semibold">
              Mental Frameworks
            </div>
            <ul className="space-y-1.5 text-slate-600 dark:text-slate-400 text-xs">
              <li>
                <button onClick={onOpenGuide} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  • Kahneman's WYSIATI Inversion
                </button>
              </li>
              <li>
                <button onClick={onOpenGuide} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  • Howard Marks' 2nd-Order Dynamics
                </button>
              </li>
              <li>
                <button onClick={onOpenGuide} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  • Charlie Munger's Inversion Principle
                </button>
              </li>
              <li>
                <button onClick={onOpenGuide} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  • Klein's Prospective Pre-Mortem
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: System Architecture */}
          <div className="space-y-2">
            <div className="font-mono text-slate-900 dark:text-white text-xs uppercase tracking-wider font-semibold">
              Cognitive Architecture
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Autonomous epistemic reasoning system built with zero prescriptive bias, 
              strict Socratic questioning, and multi-horizon cascade simulation.
            </p>
            <div className="pt-1 flex items-center space-x-3">
              <a
                href="https://github.com/aarondeodhar-wq/BlindSpot-AI"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom utility bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <div className="flex items-center space-x-2">
            <span>© 2026 The Blind Spot Project. All rights reserved.</span>
            <span>•</span>
            <span className="text-cyan-600 dark:text-accent-cyan">WCAG 2.1 AA Accessible</span>
          </div>

          <div className="flex items-center space-x-1">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-accent-rose fill-accent-rose" />
            <span>for critical minds.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
