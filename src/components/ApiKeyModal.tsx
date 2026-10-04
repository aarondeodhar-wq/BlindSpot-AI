import React, { useState } from 'react';
import { X, Key, Check, Sparkles, Cpu } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentKey: string;
  onSaveKey: (key: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  currentKey,
  onSaveKey,
}) => {
  const [inputKey, setInputKey] = useState(currentKey);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveKey(inputKey.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    setInputKey('');
    onSaveKey('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void/80 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-lg glass-panel rounded-2xl border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-accent-amber/10 border border-accent-amber/20 text-accent-amber">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                AI Engine Configuration
              </h3>
              <p className="text-xs text-slate-400">
                Google Gemini API or Built-In Cognitive Synthesizer
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close API Key modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Engine Modes info */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className={`p-3 rounded-xl border ${!inputKey ? 'bg-accent-cyan/10 border-accent-cyan/40 text-white' : 'bg-surface-200 border-white/5 text-slate-400'}`}>
            <div className="flex items-center space-x-1.5 font-bold font-mono text-[11px] text-accent-cyan mb-1">
              <Cpu className="w-3.5 h-3.5" />
              <span>DEFAULT (5-KEY FAILOVER)</span>
            </div>
            <div className="text-[11px] leading-snug">
              Powered by Google Gemini 3.8 Flash with automatic multi-key rotation across 5 dedicated keys.
            </div>
          </div>

          <div className={`p-3 rounded-xl border ${inputKey ? 'bg-accent-amber/10 border-accent-amber/40 text-white' : 'bg-surface-200 border-white/5 text-slate-400'}`}>
            <div className="flex items-center space-x-1.5 font-bold font-mono text-[11px] text-accent-amber mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CUSTOM KEY OVERRIDE</span>
            </div>
            <div className="text-[11px] leading-snug">
              Use your personal Gemini API key as the priority endpoint with failover backup.
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="gemini-key" className="block text-xs font-mono uppercase tracking-wider text-slate-300">
              Optional Google Gemini API Key
            </label>
            <input
              id="gemini-key"
              type="password"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-4 py-3 rounded-xl bg-surface-200/90 border border-white/10 text-white placeholder-slate-500 text-xs font-mono focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-colors"
            />
            <p className="text-[11px] text-slate-500">
              Your key is stored strictly in client-side memory (never sent to our servers).
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            {currentKey && (
              <button
                type="button"
                onClick={handleClear}
                className="text-xs text-slate-400 hover:text-accent-rose transition-colors"
              >
                Clear Custom Key (Revert to Default)
              </button>
            )}

            <div className="flex items-center space-x-2 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-surface-100 hover:bg-surface-50 text-slate-300 text-xs font-medium border border-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-accent-cyan text-void font-bold text-xs font-mono tracking-wider flex items-center space-x-1.5 hover:opacity-90 transition-all shadow-md shadow-accent-cyan/20"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>SAVED!</span>
                  </>
                ) : (
                  <span>SAVE PREFERENCE</span>
                )}
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};
