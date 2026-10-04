import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { DecisionForm } from './components/DecisionForm';
import { AnalysisDashboard } from './components/AnalysisDashboard';
import { FrameworkGuide } from './components/FrameworkGuide';
import { ApiKeyModal } from './components/ApiKeyModal';
import { Footer } from './components/Footer';
import type { DecisionInput, BlindSpotReport } from './types';
import { PRESET_SCENARIOS } from './data/presets';
import { analyzeDecisionWithAI } from './services/aiService';

export const App: React.FC = () => {
  const [report, setReport] = useState<BlindSpotReport | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [customApiKey, setCustomApiKey] = useState<string>('');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('internship-vs-college');
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState<boolean>(false);
  const [guideModalOpen, setGuideModalOpen] = useState<boolean>(false);

  // macOS / iOS Day & Night Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('blindspot-theme');
      if (saved === 'dark' || saved === 'light') return saved;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('blindspot-theme', theme);

    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'dark' ? '#07090E' : '#F8FAFC');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleStartAuditScroll = () => {
    const el = document.getElementById('intake-studio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAuditDecision = async (input: DecisionInput) => {
    setIsLoading(true);
    try {
      const generatedReport = await analyzeDecisionWithAI(input, customApiKey);
      setReport(generatedReport);
      setTimeout(() => {
        const el = document.getElementById('analysis-dashboard');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } catch (err) {
      console.error('Audit failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    const preset = PRESET_SCENARIOS.find((p) => p.id === presetId);
    if (preset?.mockReport) {
      // We can also let the form fill it in
    }
  };

  const handleLoadChallengeExample = async () => {
    setSelectedPresetId('internship-vs-college');
    const preset = PRESET_SCENARIOS.find((p) => p.id === 'internship-vs-college');
    if (preset) {
      if (preset.mockReport) {
        setReport(preset.mockReport);
        setTimeout(() => {
          const el = document.getElementById('analysis-dashboard');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        await handleAuditDecision(preset.data);
      }
    }
  };

  const handleReset = () => {
    setReport(null);
    handleStartAuditScroll();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-void text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-accent-cyan/30 selection:text-slate-900 dark:selection:text-white transition-colors duration-300">
      {/* Accessible Skip to content */}
      <a
        href="#intake-studio"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-accent-cyan text-void font-bold rounded-lg"
      >
        Skip to Decision Intake
      </a>

      {/* Navigation */}
      <Navbar
        onOpenApiKeyModal={() => setApiKeyModalOpen(true)}
        hasCustomKey={Boolean(customApiKey)}
        onSelectPreset={(pId) => {
          handleSelectPreset(pId);
          handleLoadChallengeExample();
        }}
        onOpenGuide={() => setGuideModalOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="flex-1">
        {/* Hero */}
        <Hero
          onStartAudit={handleStartAuditScroll}
          onLoadChallengeExample={handleLoadChallengeExample}
        />

        {/* Cognitive Foundations Bar */}
        <TrustBar />

        {/* Intake Studio */}
        <DecisionForm
          onSubmit={handleAuditDecision}
          isLoading={isLoading}
          selectedPresetId={selectedPresetId}
          onSelectPreset={handleSelectPreset}
        />

        {/* Live Analysis Output Dashboard */}
        {report && (
          <AnalysisDashboard
            report={report}
            onReset={handleReset}
            customApiKey={customApiKey}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onOpenGuide={() => setGuideModalOpen(true)} />

      {/* Modals */}
      <FrameworkGuide
        isOpen={guideModalOpen}
        onClose={() => setGuideModalOpen(false)}
      />

      <ApiKeyModal
        isOpen={apiKeyModalOpen}
        onClose={() => setApiKeyModalOpen(false)}
        currentKey={customApiKey}
        onSaveKey={(k) => setCustomApiKey(k)}
      />
    </div>
  );
};

export default App;
