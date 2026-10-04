import React from 'react';
import { X, BookOpen, Brain, Zap, Shield, Compass } from 'lucide-react';

interface FrameworkGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FrameworkGuide: React.FC<FrameworkGuideProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void/80 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-panel rounded-2xl border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                The Blind Spot Epistemic Framework
              </h3>
              <p className="text-xs text-slate-400">
                Cognitive Science, Systems Dynamics & Epistemic Neutrality
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Core Pillars */}
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          
          <div className="p-4 rounded-xl bg-surface-200/90 border border-white/5 space-y-2">
            <div className="flex items-center space-x-2 text-accent-cyan font-bold font-mono text-xs uppercase">
              <Brain className="w-4 h-4" />
              <span>1. The WYSIATI Trap (Daniel Kahneman)</span>
            </div>
            <p className="text-slate-300">
              In <em>Thinking, Fast and Slow</em>, Daniel Kahneman identified <strong>WYSIATI</strong>: 
              <em>"What You See Is All There Is."</em> When evaluating opportunities, the human mind constructs 
              the most coherent narrative using solely the visible evidence in front of it (stipend amount, office location, job title). 
              It ignores evidence that is missing entirely. The Blind Spot systematically inverts this by probing for missing dimensions.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-200/90 border border-white/5 space-y-2">
            <div className="flex items-center space-x-2 text-accent-violet font-bold font-mono text-xs uppercase">
              <Compass className="w-4 h-4" />
              <span>2. Second-Order Thinking (Howard Marks)</span>
            </div>
            <p className="text-slate-300">
              First-order thinkers say: <em>"The stipend is good and it's close to home, so I should do it."</em> 
              Second-order thinkers ask: <em>"And then what happens?"</em> 
              What happens in month 4 during university midterms? What happens to your final GPA? What happens to your eligibility for Tier-1 placement season?
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-200/90 border border-white/5 space-y-2">
            <div className="flex items-center space-x-2 text-accent-amber font-bold font-mono text-xs uppercase">
              <Zap className="w-4 h-4" />
              <span>3. Inversion & The Pre-Mortem (Charlie Munger & Gary Klein)</span>
            </div>
            <p className="text-slate-300">
              Rather than asking how to make the decision succeed, we ask: 
              <em>"Assume 12 months have passed and this decision turned out to be an utter disaster. What caused it?"</em> 
              Surfacing fatal failure modes early allows for preventative mitigation before signing any contract.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-200/90 border border-white/5 space-y-2">
            <div className="flex items-center space-x-2 text-accent-emerald font-bold font-mono text-xs uppercase">
              <Shield className="w-4 h-4" />
              <span>4. Absolute Non-Prescriptive Neutrality</span>
            </div>
            <p className="text-slate-300">
              Decision agency belongs exclusively to the human. If an AI tells you what to choose, it robs you of metacognition. 
              The Blind Spot operates strictly as an epistemological mirror: highlighting fragile premises, asking uncomfortable questions, 
              and allowing your own conviction to sharpen.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-surface-100 hover:bg-surface-50 text-white text-xs font-semibold border border-white/10 transition-colors"
          >
            Understood & Close
          </button>
        </div>

      </div>
    </div>
  );
};
