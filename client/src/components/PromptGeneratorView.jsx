import React, { useState } from 'react';
import { 
  Zap, 
  Copy, 
  Check, 
  Sparkles, 
  Sliders, 
  Video, 
  Image as ImageIcon, 
  Bot, 
  Layers, 
  ShieldAlert,
  ExternalLink,
  RefreshCw,
  Eye
} from 'lucide-react';
import { useStudio } from '../context/StudioContext';

export const PromptGeneratorView = () => {
  const { 
    promptData, 
    isGeneratingPrompts, 
    generatePrompts, 
    selectedStyle, 
    aspectRatio, 
    setAspectRatio 
  } = useStudio();

  const [activePlatform, setActivePlatform] = useState('midjourney');
  const [copiedKey, setCopiedKey] = useState(null);
  const [stylizeValue, setStylizeValue] = useState(250);
  const [chaosValue, setChaosValue] = useState(5);
  const [showNegative, setShowNegative] = useState(true);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const platforms = [
    { id: 'midjourney', label: 'Midjourney v6.0', icon: ImageIcon, color: '#8b5cf6' },
    { id: 'flux', label: 'Flux.1 Pro', icon: Sparkles, color: '#06b6d4' },
    { id: 'sora', label: 'OpenAI Sora / Runway', icon: Video, color: '#ec4899' },
    { id: 'dalle', label: 'DALL-E 3', icon: Layers, color: '#10b981' },
    { id: 'llm', label: 'LLM Master Persona', icon: Bot, color: '#f59e0b' }
  ];

  if (!promptData || !promptData.prompts) {
    return (
      <div className="p-12 rounded-2xl glass-panel border border-slate-800 text-center space-y-4">
        <Zap className="w-12 h-12 text-cyan-400 mx-auto animate-pulse" />
        <h3 className="text-lg font-bold text-white">Generating Precision Prompts...</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Compiling story synthesis, speaker perspectives, and acoustic mood into platform-optimized prompts.
        </p>
      </div>
    );
  }

  const currentPromptObj = promptData.prompts[activePlatform] || promptData.prompts.midjourney;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-purple-400 text-xs font-mono mb-1">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>PRECISION PROMPT COMPILER</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Accurate AI Generation Prompts</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Tailored prompts for image, video, and LLM models converted directly from voice and client thoughts.
          </p>
        </div>

        <button
          onClick={() => generatePrompts({ aspectRatio })}
          disabled={isGeneratingPrompts}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 text-xs font-semibold transition"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isGeneratingPrompts ? 'animate-spin' : ''}`} />
          <span>Regenerate Prompts</span>
        </button>
      </div>

      {/* Target Platform Navigation Tabs */}
      <div className="flex overflow-x-auto p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800 space-x-2">
        {platforms.map((plat) => {
          const Icon = plat.icon;
          const isActive = activePlatform === plat.id;
          return (
            <button
              key={plat.id}
              onClick={() => setActivePlatform(plat.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap transition ${
                isActive
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{plat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Prompt Card */}
      <div className="p-6 sm:p-8 rounded-2xl glass-panel-glow border border-purple-500/30 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
              {currentPromptObj.platform} Prompt
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs font-mono text-slate-400">{currentPromptObj.parameters}</span>
          </div>

          <button
            onClick={() => handleCopy(currentPromptObj.copyReady, activePlatform)}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition shadow-lg shadow-cyan-500/20"
          >
            {copiedKey === activePlatform ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedKey === activePlatform ? 'Copied Prompt!' : 'Copy Prompt'}</span>
          </button>
        </div>

        {/* Prompt Content */}
        <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800/90 text-sm sm:text-base text-slate-100 font-mono leading-relaxed select-all">
          {currentPromptObj.copyReady}
        </div>

        {/* Midjourney Parameter Sliders if on Midjourney */}
        {activePlatform === 'midjourney' && (
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Stylize (--s {stylizeValue})</span>
                <span className="font-mono text-purple-400">High Aesthetics</span>
              </div>
              <input
                type="range"
                min="50"
                max="750"
                step="50"
                value={stylizeValue}
                onChange={(e) => setStylizeValue(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Chaos / Variety (--c {chaosValue})</span>
                <span className="font-mono text-cyan-400">Subtle Exploratory</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                step="1"
                value={chaosValue}
                onChange={(e) => setChaosValue(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>

      {/* Negative Prompt Drawer */}
      {promptData.negativePrompt && (
        <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-semibold text-rose-400 uppercase tracking-wider font-mono">
              <ShieldAlert className="w-4 h-4" />
              <span>Recommended Negative Prompt</span>
            </div>

            <button
              onClick={() => handleCopy(promptData.negativePrompt, 'negative')}
              className="flex items-center space-x-1 text-xs text-slate-400 hover:text-slate-200"
            >
              {copiedKey === 'negative' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'negative' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-850 text-xs text-slate-300 font-mono">
            {promptData.negativePrompt}
          </div>
        </div>
      )}

      {/* Visual Composition Simulation Mock */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
        <div className="flex items-center space-x-2">
          <Eye className="w-4 h-4 text-purple-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Prompt Concept Visualization Simulator
          </h3>
        </div>

        <div className="relative w-full h-56 rounded-xl overflow-hidden bg-gradient-to-tr from-slate-950 via-purple-950/40 to-slate-900 border border-slate-800 flex flex-col justify-end p-6">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="relative z-10 space-y-2 max-w-xl">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-600/80 text-white text-[10px] font-mono">
              {promptData.style.toUpperCase()} • {promptData.aspectRatio}
            </span>
            <h4 className="text-base font-bold text-white tracking-tight">{promptData.subject}</h4>
            <p className="text-xs text-slate-300 line-clamp-2">
              Ready to paste into {currentPromptObj.platform}. Built from multi-speaker dialogue pieces and client thought synthesis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
