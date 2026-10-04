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
    if (!formData.rationale.trim() || formData.rationale.length < 20) {
      setValidationError('Please provide more detail on your rationale (at least 20 characters) so we can detect what you are focusing on.');
      return;
    }
    if (!formData.context.trim() || formData.context.length < 15) {
      setValidationError('Please share context and constraints (hours, schedule, finances, etc.) to evaluate external friction.');
      return;
    }

    setValidationError(null);
    onSubmit(formData);
  };

  return (
    <section id="intake-studio" className="py-12 sm:py-16 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 text-xs font-mono uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Phase 1: Input Diagnostic</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            Map Your Decision Landscape
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Give us what is visible to you right now. The AI will audit what is lurking beneath your stated reasons.
          </p>
        </div>

        {/* Quick Presets Bar */}
        <div className="mb-8 p-4 rounded-2xl bg-surface-100/70 border border-white/10 backdrop-blur-md">
          <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-400">
            <span className="flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-accent-cyan" />
              <span>OR TEST INSTANT PRESET SCENARIOS:</span>
            </span>
            <span className="text-[11px] text-slate-500">1-Click Auto-Fill</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {PRESET_SCENARIOS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleLoadPreset(preset.id)}
                className={`text-left p-3 rounded-xl border text-xs font-medium transition-all ${
                  selectedPresetId === preset.id
                    ? 'bg-accent-cyan/10 border-accent-cyan text-white shadow-sm'
                    : 'bg-surface-50/70 border-white/5 hover:border-white/20 text-slate-300 hover:text-white'
                }`}
              >
                <div className="text-[10px] font-mono text-accent-cyan uppercase tracking-wider mb-1">
                  {preset.tag}
                </div>
                <div className="font-semibold line-clamp-1">{preset.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* The Intake Form */}
        <form
          onSubmit={handleSubmit}
          className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle top indicator bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-rose" />

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
              <label htmlFor="decision-title" className="block text-xs font-mono uppercase tracking-wider text-slate-300">
                Decision Title / Core Question <span className="text-accent-rose">*</span>
              </label>
              <input
                id="decision-title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Accepting a 6-month full-time internship while in college"
                className="w-full px-4 py-3 rounded-xl bg-surface-200/90 border border-white/10 text-white placeholder-slate-500 text-sm focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-colors"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="decision-category" className="block text-xs font-mono uppercase tracking-wider text-slate-300">
                Decision Category
              </label>
              <select
                id="decision-category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-4 py-3 rounded-xl bg-surface-200/90 border border-white/10 text-white text-sm focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-colors"
              >
                <option value="academic">Academic & University</option>
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
              <label htmlFor="decision-rationale" className="block text-xs font-mono uppercase tracking-wider text-slate-300">
                The Visible Layer: Why are you leaning toward this? <span className="text-accent-rose">*</span>
              </label>
              <span className="text-[11px] text-accent-cyan flex items-center space-x-1">
                <HelpCircle className="w-3 h-3" />
                <span>What looks attractive?</span>
              </span>
            </div>
            <textarea
              id="decision-rationale"
              rows={3}
              value={formData.rationale}
              onChange={(e) => setFormData({ ...formData, rationale: e.target.value })}
              placeholder="e.g., The stipend is great ($2,500/mo), the office is only 15 minutes away, and it will look impressive on my resume as industry experience."
              className="w-full px-4 py-3 rounded-xl bg-surface-200/90 border border-white/10 text-white placeholder-slate-500 text-sm focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-colors resize-y"
              required
            />
            <p className="text-[11px] text-slate-500">
              Be completely honest about the perks driving your current enthusiasm.
            </p>
          </div>

          {/* Field 3: Constraints & Real-World Context */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="decision-context" className="block text-xs font-mono uppercase tracking-wider text-slate-300">
                Context, Constraints & Commitments <span className="text-accent-rose">*</span>
              </label>
              <span className="text-[11px] text-slate-400">Working hours, college policies, finances</span>
            </div>
            <textarea
              id="decision-context"
              rows={3}
              value={formData.context}
              onChange={(e) => setFormData({ ...formData, context: e.target.value })}
              placeholder="e.g., Role: Junior Software Intern (40 hrs/week). College schedule: 4 engineering subjects, mandatory 75% attendance policy, final capstone due in 5 months."
              className="w-full px-4 py-3 rounded-xl bg-surface-200/90 border border-white/10 text-white placeholder-slate-500 text-sm focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-colors resize-y"
              required
            />
          </div>

          {/* Field 4: The Unspoken Doubt (Optional but Powerful) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="decision-hesitation" className="block text-xs font-mono uppercase tracking-wider text-slate-300">
                The Quiet Hesitation <span className="text-slate-500 font-normal">(Optional)</span>
              </label>
              <span className="text-[11px] text-accent-amber">The gut whisper you've brushed aside</span>
            </div>
            <input
              id="decision-hesitation"
              type="text"
              value={formData.hesitations}
              onChange={(e) => setFormData({ ...formData, hesitations: e.target.value })}
              placeholder="e.g., I'm worried attendance notices will arrive right before midterm exams."
              className="w-full px-4 py-3 rounded-xl bg-surface-200/90 border border-white/10 text-white placeholder-slate-500 text-sm focus:border-accent-cyan focus:ring-1 focus:ring-cyan-500 transition-colors"
            />
          </div>

          {/* Ethical AI Non-Prescriptive Warning */}
          <div className="p-3.5 rounded-xl bg-surface-200/60 border border-white/5 flex items-start space-x-3 text-slate-400 text-xs">
            <ShieldCheck className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-white">Cognitive Safeguard:</strong> The Blind Spot will never say "Yes, do it" or "No, reject it". Our output will map your unexamined assumptions and force you to confront the unseen trade-offs.
            </p>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 px-6 rounded-xl font-bold text-base flex items-center justify-center space-x-3 transition-all duration-200 shadow-xl ${
                isLoading
                  ? 'bg-surface-50 text-slate-400 cursor-not-allowed border border-white/10'
                  : 'bg-gradient-to-r from-accent-cyan via-blue-500 to-accent-violet text-void hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] shadow-accent-cyan/20'
              }`}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin text-accent-cyan" />
                  <span className="font-mono text-sm tracking-wider text-slate-200">
                    SCANNING BLIND SPOTS & AUDITING ASSUMPTIONS...
                  </span>
                </>
              ) : (
                <>
                  <span>Audit Blind Spots & Assumptions</span>
                  <ArrowRight className="w-5 h-5 text-void" />
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </section>
  );
};
