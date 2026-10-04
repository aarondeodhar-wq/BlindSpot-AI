import React, { useState } from 'react';
import { Eye, Shield, Key, Sparkles, Menu, X, HelpCircle, Code2, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  onOpenApiKeyModal: () => void;
  hasCustomKey: boolean;
  onSelectPreset: (presetId: string) => void;
  onOpenGuide: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenApiKeyModal,
  hasCustomKey,
  onSelectPreset,
  onOpenGuide,
  theme,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-nav border-b border-black/5 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Brand identity */}
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 dark:bg-surface-100 border border-black/10 dark:border-white/10 shadow-inner group">
            <div className="absolute inset-0 rounded-xl bg-accent-cyan/10 blur-sm group-hover:bg-accent-cyan/20 transition-all"></div>
            <Eye className="w-5 h-5 text-accent-cyan relative z-10 transition-transform group-hover:scale-110" />
            <div className="absolute w-2 h-2 rounded-full bg-accent-rose right-2 top-2 animate-ping" />
            <div className="absolute w-2 h-2 rounded-full bg-accent-rose right-2 top-2" />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="font-display font-bold text-lg sm:text-xl tracking-wider text-slate-900 dark:text-white">
                THE BLIND SPOT
              </span>
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest px-1.5 py-0.5 rounded bg-accent-cyan/10 text-cyan-600 dark:text-accent-cyan border border-cyan-500/20 dark:border-accent-cyan/30">
                v2.0
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono hidden sm:block">
              Cognitive Sparring & Decision Auditor
            </p>
          </div>
        </div>

        {/* System Status & Tenet Pill */}
        <div className="hidden lg:flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-surface-200/80 border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-700 dark:text-slate-300">
          <Shield className="w-3.5 h-3.5 text-accent-cyan" />
          <span>GUARANTEE:</span>
          <span className="text-cyan-600 dark:text-accent-cyan font-semibold">100% NON-PRESCRIPTIVE</span>
          <span className="text-slate-400 dark:text-slate-500">|</span>
          <span className="text-slate-500 dark:text-slate-400">Zero Decision Coercion</span>
        </div>

        {/* Actions desktop */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Day / Night macOS Style Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 transition-all duration-200 flex items-center justify-center shadow-sm"
            title={theme === 'dark' ? 'Switch to Day Mode (macOS Light)' : 'Switch to Night Mode (macOS Dark)'}
            aria-label="Toggle Day / Night theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-accent-amber" />
            ) : (
              <Moon className="w-4 h-4 text-accent-violet" />
            )}
          </button>

          <button
            onClick={onOpenGuide}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 border border-transparent hover:border-black/5 dark:hover:border-white/10 transition-colors"
            title="How this cognitive framework operates"
          >
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            <span>Methodology</span>
          </button>

          {/* Preset Quick Load */}
          <button
            onClick={() => onSelectPreset('internship-vs-college')}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-surface-100 hover:bg-slate-200 dark:hover:bg-surface-50 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent-cyan" />
            <span>Sample Scenario</span>
          </button>

          {/* API Key Modal Button */}
          <button
            onClick={onOpenApiKeyModal}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              hasCustomKey
                ? 'bg-accent-cyan/10 text-cyan-600 dark:text-accent-cyan border-cyan-500/30 dark:border-accent-cyan/40 hover:bg-accent-cyan/20'
                : 'bg-slate-100 dark:bg-surface-100 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:text-slate-900 dark:hover:text-white'
            }`}
            title="Configure Gemini API Key or use built-in engine"
          >
            <Key className="w-3.5 h-3.5" />
            <span>{hasCustomKey ? 'Custom Key Active' : 'Gemini 3.5 AI Active'}</span>
          </button>

          {/* GitHub link */}
          <a
            href="https://github.com/aarondeodhar-wq/BlindSpot-AI"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            aria-label="GitHub Repository"
          >
            <Code2 className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile header controls */}
        <div className="flex items-center space-x-2 md:hidden">
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-accent-amber" /> : <Moon className="w-4 h-4 text-accent-violet" />}
          </button>
          <button
            onClick={() => onSelectPreset('internship-vs-college')}
            className="px-2.5 py-1 text-[11px] font-mono font-medium rounded bg-accent-cyan/10 text-cyan-600 dark:text-accent-cyan border border-cyan-500/30 dark:border-accent-cyan/30"
          >
            Sample
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2 bg-slate-50 dark:bg-surface-200 border-b border-black/5 dark:border-white/10">
          <div className="py-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-b border-black/5 dark:border-white/5 font-mono">
            <span>System Protocol:</span>
            <span className="text-cyan-600 dark:text-accent-cyan font-semibold">NON-PRESCRIPTIVE</span>
          </div>

          <button
            onClick={() => {
              onToggleTheme();
            }}
            className="w-full text-left px-3 py-2 text-sm rounded-lg text-slate-700 dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-between"
          >
            <span className="flex items-center space-x-2">
              {theme === 'dark' ? <Sun className="w-4 h-4 text-accent-amber" /> : <Moon className="w-4 h-4 text-accent-violet" />}
              <span>{theme === 'dark' ? 'Day Mode (Light)' : 'Night Mode (Dark)'}</span>
            </span>
            <span className="text-xs font-mono uppercase text-slate-400">{theme}</span>
          </button>

          <button
            onClick={() => {
              onSelectPreset('internship-vs-college');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm rounded-lg text-slate-700 dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-accent-cyan" />
            <span>Sample: Internship vs Academics</span>
          </button>
          <button
            onClick={() => {
              onOpenApiKeyModal();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm rounded-lg text-slate-700 dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 flex items-center space-x-2"
          >
            <Key className="w-4 h-4 text-accent-amber" />
            <span>{hasCustomKey ? 'Manage Gemini Key' : 'Configure Custom API Key'}</span>
          </button>
          <button
            onClick={() => {
              onOpenGuide();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm rounded-lg text-slate-700 dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 flex items-center space-x-2"
          >
            <HelpCircle className="w-4 h-4 text-accent-violet" />
            <span>Methodology & Cognitive Science</span>
          </button>
        </div>
      )}
    </header>
  );
};
