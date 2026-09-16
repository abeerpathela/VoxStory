import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Copy, 
  Check, 
  FileText, 
  Clapperboard, 
  Compass, 
  RefreshCw, 
  ArrowRight,
  Share2
} from 'lucide-react';
import { useStudio } from '../context/StudioContext';

export const StorySynthesizerView = () => {
  const { 
    storyData, 
    isSynthesizingStory, 
    synthesizeStory, 
    selectedStyle, 
    setSelectedStyle, 
    generatePrompts, 
    setActiveTab 
  } = useStudio();

  const [activeStoryMode, setActiveStoryMode] = useState('narrative'); // 'narrative', 'brief', 'lore'
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReWeave = async (style) => {
    setSelectedStyle(style);
    await synthesizeStory(style);
  };

  const handleProceedToPrompts = async () => {
    await generatePrompts();
    setActiveTab('prompts');
  };

  if (!storyData) {
    return (
      <div className="p-12 rounded-2xl glass-panel border border-slate-800 text-center space-y-4">
        <BookOpen className="w-12 h-12 text-purple-400 mx-auto animate-pulse" />
        <h3 className="text-lg font-bold text-white">Synthesizing Thoughtful Story...</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Weaving voice slices and client visualization thoughts into a cinematic narrative and creative brief.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-purple-400 text-xs font-mono mb-1">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>THOUGHTFUL STORY & WORLD SYNTHESIZER</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Narrative Story Canvas</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Voice pieces harmonized into evocative narrative lore, scene breakdowns, and creative director's brief.
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <button
            onClick={() => handleCopy(storyData.narrativeArc)}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-medium transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Story!' : 'Copy Story'}</span>
          </button>

          <button
            onClick={handleProceedToPrompts}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white text-xs font-semibold hover:opacity-95 transition shadow-lg shadow-purple-600/30"
          >
            <span>Generate Precision Prompts</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Story Mode Tabs */}
      <div className="flex items-center space-x-2 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800 w-fit">
        <button
          onClick={() => setActiveStoryMode('narrative')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-medium transition ${
            activeStoryMode === 'narrative'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Cinematic Narrative Arc</span>
        </button>

        <button
          onClick={() => setActiveStoryMode('brief')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-medium transition ${
            activeStoryMode === 'brief'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Clapperboard className="w-3.5 h-3.5" />
          <span>Director's Visual Brief & Shot List</span>
        </button>

        <button
          onClick={() => setActiveStoryMode('lore')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-medium transition ${
            activeStoryMode === 'lore'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>World Lore Codex</span>
        </button>
      </div>

      {/* Mode 1: Cinematic Narrative Arc */}
      {activeStoryMode === 'narrative' && (
        <div className="p-8 rounded-2xl glass-panel border border-slate-800 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">
                Style Archetype: {storyData.style.toUpperCase()}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs font-mono text-slate-400">{storyData.stats?.readingTime}</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono">
              Coherence: {storyData.stats?.coherenceIndex || '98%'}
            </span>
          </div>

          <div className="prose prose-invert max-w-none text-slate-200 text-sm sm:text-base leading-relaxed space-y-4 font-light">
            {storyData.narrativeArc.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="p-4 rounded-xl bg-slate-950/50 border border-slate-850">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Mode 2: Creative Director's Brief & Shot List */}
      {activeStoryMode === 'brief' && storyData.creativeBrief && (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white">{storyData.creativeBrief.title}</h3>
            <p className="text-xs text-slate-400">{storyData.creativeBrief.speakerConsensus}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="text-[10px] text-slate-400 font-mono uppercase">Lighting & Atmosphere</div>
                <div className="text-xs font-semibold text-purple-300 mt-1">
                  {storyData.creativeBrief.lightingDirection}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="text-[10px] text-slate-400 font-mono uppercase">Core Concept</div>
                <div className="text-xs font-semibold text-cyan-300 mt-1">
                  {storyData.creativeBrief.coreTheme}
                </div>
              </div>
            </div>
          </div>

          {/* Shot List Cards */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
              Storyboard Keyframes & Shot List
            </div>
            {storyData.creativeBrief.shotList.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl glass-panel border border-slate-800 flex items-start space-x-4"
              >
                <div className="w-7 h-7 rounded-lg bg-indigo-900/40 text-indigo-300 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  0{idx + 1}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{item.shot}</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mode 3: World Lore Codex */}
      {activeStoryMode === 'lore' && (
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 text-xs text-cyan-400 font-mono">
            <Compass className="w-4 h-4" />
            <span>ARCHIVE CODEX & ENVIRONMENTAL CANON</span>
          </div>
          <pre className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed">
            {storyData.worldLore}
          </pre>
        </div>
      )}
    </div>
  );
};
