import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { StudioProvider, useStudio } from './context/StudioContext';
import { Navbar } from './components/Navbar';
import { AuthModal } from './components/AuthModal';
import { ClientWritingCanvas } from './components/ClientWritingCanvas';
import { VoiceStudio } from './components/VoiceStudio';
import { VoiceBreakdownView } from './components/VoiceBreakdownView';
import { StorySynthesizerView } from './components/StorySynthesizerView';
import { PromptGeneratorView } from './components/PromptGeneratorView';
import { ModelTrainingStudio } from './components/ModelTrainingStudio';
import { Sparkles, Layers, BookOpen, Zap, Cpu, ShieldCheck } from 'lucide-react';

const StudioMain = () => {
  const { activeTab, setActiveTab } = useStudio();

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Studio Canvas Tab: Dual Pane Writing & Voice Studio */}
          {activeTab === 'studio' && (
            <div className="space-y-8">
              {/* Hero Banner */}
              <div className="relative rounded-3xl p-8 overflow-hidden bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-slate-950 border border-purple-500/20 shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 max-w-3xl space-y-3">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>ACOUSTIC DIARIZATION & STORY PROMPT STUDIO</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                    Convert Client Voice & Thoughts into <span className="text-gradient-purple-cyan">Thoughtful Stories & Precision Prompts</span>
                  </h1>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Listen to voice messages of one or multiple clients, analyze creative thoughts, break down audio into speaker pieces with local acoustic diarization, weave rich narratives, and compile hyper-accurate prompts.
                  </p>
                </div>
              </div>

              {/* Dual-Pane Grid: Client Writing Canvas + Voice Studio */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                <ClientWritingCanvas />
                <VoiceStudio />
              </div>
            </div>
          )}

          {/* Voice Breakdown Tab */}
          {activeTab === 'breakdown' && <VoiceBreakdownView />}

          {/* Story Synthesizer Tab */}
          {activeTab === 'story' && <StorySynthesizerView />}

          {/* Precision Prompt Matrix Tab */}
          {activeTab === 'prompts' && <PromptGeneratorView />}

          {/* Model Training & Fine-Tuning Studio Tab */}
          {activeTab === 'training' && <ModelTrainingStudio />}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-300">VoxStory AI Studio</span>
            <span>•</span>
            <span>Local Neural Acoustic Diarization & Story Prompt Generation Engine</span>
          </div>

          <div className="flex items-center space-x-4 font-mono text-[11px]">
            <span className="text-emerald-400 flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Zero External API Dependency</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-purple-400">Model v1.4.2-local</span>
          </div>
        </div>
      </footer>

      {/* Global Auth Modal */}
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <StudioProvider>
        <StudioMain />
      </StudioProvider>
    </AuthProvider>
  );
}
