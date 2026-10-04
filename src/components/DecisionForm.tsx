import React, { useState } from 'react';
import type { DecisionInput } from '../types';
import { PRESET_SCENARIOS } from '../data/presets';
import { Sparkles, ArrowRight, ShieldCheck, HelpCircle, AlertCircle, RefreshCw } from 'lucide-react';

interface DecisionFormProps {
  onSubmit: (input: DecisionInput) => void;
  isLoading: boolean;
  selectedPresetId?: string;
  onSelectPreset: (presetId: string) => void;
}

export const DecisionForm: React.FC<DecisionFormProps> = ({
  onSubmit,
  isLoading,
  selectedPresetId,
  onSelectPreset,
}) => {
  const [formData, setFormData] = useState<DecisionInput>({
    title: '',
    category: 'academic',
    rationale: '',
    context: '',
    hesitations: '',
  });

  const [validationError, setValidationError] = useState<string | null>(null);

  // When a preset is chosen externally or internally, update form
  const handleLoadPreset = (presetId: string) => {
    onSelectPreset(presetId);
    const preset = PRESET_SCENARIOS.find((p) => p.id === presetId);
    if (preset) {
      setFormData({ ...preset.data });
      setValidationError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setValidationError('Please specify the decision title or question.');
      return;
    }
    
    // Provide intelligent context defaults if user entered brief prompts like "school or no school"
    const cleanedInput: DecisionInput = {
      ...formData,
      rationale: formData.rationale.trim()
        ? formData.rationale.trim()
        : `Evaluating perceived immediate benefits versus alternative pathways for "${formData.title.trim()}".`,
      context: formData.context.trim()
        ? formData.context.trim()
        : `General decision space, time commitments, and structural implications for "${formData.title.trim()}".`,
    };

    setValidationError(null);
    onSubmit(cleanedInput);
  };

  return (
    <section id="intake-studio" className="py-12 sm:py-16 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-accent-cyan border border-cyan-500/20 dark:border-accent-cyan/20 text-xs font-mono uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Phase 1: Input Diagnostic</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Map Your Decision Landscape
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Give us what is visible to you right now. The AI will audit what is lurking beneath your stated reasons.
          </p>
        </div>

        {/* Quick Presets Bar */}
        <div className="mb-8 p-4 rounded-2xl bg-white/70 dark:bg-surface-100/70 border border-black/5 dark:border-white/10 backdrop-blur-md shadow-sm">
          <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span className="flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-accent-cyan" />
              <span>OR TEST INSTANT PRESET SCENARIOS:</span>
            </span>
            <span className="text-[11px] text-slate-400 dark:text-slate-500">1-Click Auto-Fill</span>
          </div>
          <div className="flex sm:grid sm:grid-cols-3 gap-2.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none snap-x">
            {PRESET_SCENARIOS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleLoadPreset(preset.id)}
                className={`text-left p-3.5 rounded-xl border text-xs font-medium transition-all min-w-[240px] sm:min-w-0 snap-start shrink-0 sm:shrink ${
                  selectedPresetId === preset.id
                    ? 'bg-cyan-500/10 dark:bg-accent-cyan/10 border-cyan-500 dark:border-accent-cyan text-slate-900 dark:text-white shadow-sm'
                    : 'bg-slate-50/80 dark:bg-surface-50/70 border-slate-200/80 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className="text-[10px] font-mono text-cyan-600 dark:text-accent-cyan uppercase tracking-wider mb-1 font-semibold">
                  {preset.tag}
                </div>
                <div className="font-semibold line-clamp-1">{preset.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* The Intake Form (macOS Window Style) */}
        <form
          onSubmit={handleSubmit}
          className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden transition-all duration-300"
        >
          {/* macOS Window Top Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-black/5 dark:border-white/5">
            <div className="traffic-lights">
              <div className="traffic-dot traffic-red" title="Close" />
              <div className="traffic-dot traffic-yellow" title="Minimize" />
              <div className="traffic-dot traffic-green" title="Expand" />
            </div>
            <div className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400 tracking-wider">
              Terminal: Decision Intake
            </div>
          </div>

          {/* Validation Banner */}
          {validationError && (
            <div className="p-3.5 rounded-xl bg-accent-rose/10 border border-accent-rose/30 flex items-center space-x-3 text-accent-rose text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Field 1: Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-1.5">
              <label htmlFor="decision-title" className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-medium">
                Decision Title / Core Question <span className="text-accent-rose">*</span>
              </label>
              <input
                id="decision-title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., School or no school, or accepting a 6-month full-time internship"
                className="w-full px-4 py-3.5 rounded-xl bg-slate-100/80 dark:bg-surface-200/90 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="decision-category" className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-medium">
                Decision Category
              </label>
              <select
                id="decision-category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-100/80 dark:bg-surface-200/90 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
              >
                <option value="academic">Academic & Education</option>
                <option value="career">Career & Job Offer</option>
                <option value="business">Business & Startup</option>
                <option value="relocation">Relocation & City</option>
                <option value="personal">Personal & Financial</option>
                <option value="other">Other Domain</option>
              </select>
            </div>
          </div>

          {/* Field 2: The Visible Layer / Stated Rationale */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="decision-rationale" className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-medium">
                The Visible Layer: Why are you leaning toward this?
              </label>
              <span className="text-[11px] text-cyan-600 dark:text-accent-cyan flex items-center space-x-1">
                <HelpCircle className="w-3 h-3" />
                <span>What looks attractive?</span>
              </span>
            </div>
            <textarea
              id="decision-rationale"
              rows={3}
              value={formData.rationale}
              onChange={(e) => setFormData({ ...formData, rationale: e.target.value })}
              placeholder="e.g., I want to focus on my projects/skills, or the stipend is great and office is close by."
              className="w-full px-4 py-3 rounded-xl bg-slate-100/80 dark:bg-surface-200/90 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-y"
            />
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Share the visible upside or rationale driving your enthusiasm.
            </p>
          </div>

          {/* Field 3: Constraints & Real-World Context */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="decision-context" className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-medium">
                Context, Constraints & Commitments
              </label>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Hours, policies, finances, timeline</span>
            </div>
            <textarea
              id="decision-context"
              rows={3}
              value={formData.context}
              onChange={(e) => setFormData({ ...formData, context: e.target.value })}
              placeholder="e.g., 40 hrs/week, attendance requirements, family expectations, financial buffer of 6 months."
              className="w-full px-4 py-3 rounded-xl bg-slate-100/80 dark:bg-surface-200/90 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-y"
            />
          </div>

          {/* Field 4: The Unspoken Doubt (Optional) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="decision-hesitation" className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-medium">
                The Quiet Hesitation <span className="text-slate-400 dark:text-slate-500 font-normal">(Optional)</span>
              </label>
              <span className="text-[11px] text-accent-amber font-medium">The gut whisper you've brushed aside</span>
            </div>
            <input
              id="decision-hesitation"
              type="text"
              value={formData.hesitations}
              onChange={(e) => setFormData({ ...formData, hesitations: e.target.value })}
              placeholder="e.g., I'm worried about long-term regret or missing peer networks."
              className="w-full px-4 py-3 rounded-xl bg-slate-100/80 dark:bg-surface-200/90 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
            />
          </div>

          {/* Ethical AI Non-Prescriptive Warning */}
          <div className="p-3.5 rounded-xl bg-slate-100/80 dark:bg-surface-200/60 border border-slate-200 dark:border-white/5 flex items-start space-x-3 text-slate-600 dark:text-slate-400 text-xs">
            <ShieldCheck className="w-4 h-4 text-cyan-600 dark:text-accent-cyan shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-slate-900 dark:text-white">Cognitive Safeguard:</strong> The Blind Spot will never say "Yes, do it" or "No, reject it". Our output will map your unexamined assumptions and force you to confront the unseen trade-offs.
            </p>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 px-6 rounded-2xl font-bold text-base flex items-center justify-center space-x-3 transition-all duration-200 shadow-xl ${
                isLoading
                  ? 'bg-slate-200 dark:bg-surface-50 text-slate-500 dark:text-slate-400 cursor-not-allowed border border-slate-300 dark:border-white/10'
                  : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] shadow-cyan-500/25'
              }`}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin text-white" />
                  <span className="font-mono text-sm tracking-wider text-white">
                    RUNNING LIVE GEMINI AI COGNITIVE AUDIT...
                  </span>
                </>
              ) : (
                <>
                  <span>Audit Blind Spots & Assumptions</span>
                  <ArrowRight className="w-5 h-5 text-white" />
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </section>
  );
};
