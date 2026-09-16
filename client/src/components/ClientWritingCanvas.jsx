import React from 'react';
import { 
  PenTool, 
  Sparkles, 
  Layers, 
  Sliders, 
  Camera, 
  Film, 
  Palette, 
  Wand2, 
  Maximize2,
  BookOpen,
  Zap
} from 'lucide-react';
import { useStudio } from '../context/StudioContext';

export const ClientWritingCanvas = () => {
  const { 
    clientNotes, 
    setClientNotes, 
    selectedStyle, 
    setSelectedStyle, 
    aspectRatio, 
    setAspectRatio, 
    selectedCamera, 
    setSelectedCamera,
    synthesizeStory,
    generatePrompts,
    isSynthesizingStory,
    setActiveTab
  } = useStudio();

  const styles = [
    { id: 'cyberpunk', label: 'Cyberpunk Neo-Noir', icon: '🌆', desc: 'Rain-slicked neon, deep contrast' },
    { id: 'cinematic', label: 'Cinematic 8K', icon: '🎬', desc: 'Anamorphic lens, volumetric light' },
    { id: 'fantasy', label: 'Cosmic & Dark Fantasy', icon: '✨', desc: 'Mythic lore, celestial glowing embers' },
    { id: 'architectural', label: 'Architectural Elegance', icon: '🏛️', desc: 'Minimalist forms, natural lighting' },
    { id: 'anime_ghibli', label: 'Anime Studio Ghibli', icon: '🌿', desc: 'Painterly clouds, whimsical wonder' }
  ];

  const aspectRatios = [
    { id: '16:9', label: '16:9 (Landscape / Cinema)' },
    { id: '21:9', label: '21:9 (Ultrawide Panoramic)' },
    { id: '1:1', label: '1:1 (Square / Album)' },
    { id: '9:16', label: '9:16 (Vertical Story / Reels)' },
    { id: '4:5', label: '4:5 (Social Portrait)' }
  ];

  const cameraRigs = [
    'Hasselblad H6D-100c, 80mm lens, f/2.8',
    'ARRI Alexa Mini, 35mm anamorphic prime',
    'Sony A7R V, 24-70mm GM II lens',
    'IMAX 70mm film stock, volumetric grain'
  ];

  const quickInspirations = [
    "Volumetric dusk fog", "Magenta & cobalt neon", "Obsidian water reflections",
    "Bioluminescent flora", "Curved rammed earth", "Holographic cherry petals",
    "Macro rain droplets", "Anamorphic bokeh flares"
  ];

  const addInspiration = (tag) => {
    if (!clientNotes.includes(tag)) {
      setClientNotes(prev => `${prev.trim()} ${tag}.`);
    }
  };

  const handleWeaveAndGenerate = async () => {
    await synthesizeStory(selectedStyle);
    await generatePrompts({ aspectRatio, camera: selectedCamera });
    setActiveTab('story');
  };

  return (
    <div className="rounded-2xl glass-panel p-6 border border-slate-800 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center space-x-2 text-purple-400 text-xs font-mono mb-1">
            <PenTool className="w-3.5 h-3.5 text-purple-400" />
            <span>CREATIVE CANVAS & VISUAL DIRECTION</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Client Thought & Visual Notepad</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Write your scene concepts, world lore, and aesthetic parameters to combine with voice notes.
          </p>
        </div>

        <button
          onClick={handleWeaveAndGenerate}
          disabled={isSynthesizingStory}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white text-xs font-semibold hover:opacity-95 transition shadow-lg shadow-purple-600/30"
        >
          <Wand2 className="w-4 h-4" />
          <span>{isSynthesizingStory ? 'Weaving Story...' : 'Synthesize Story & Prompts'}</span>
        </button>
      </div>

      {/* Main Textarea */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Client Thoughts & Visual Ideas
        </label>
        <div className="relative">
          <textarea
            rows={4}
            value={clientNotes}
            onChange={(e) => setClientNotes(e.target.value)}
            placeholder="Describe your scene, characters, mood, materials, and world atmosphere..."
            className="w-full p-4 rounded-xl glass-input text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-purple-500 transition leading-relaxed resize-y"
          />
        </div>

        {/* Quick Inspiration Tags */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] text-slate-400 font-mono mr-1">Add Aesthetics:</span>
          {quickInspirations.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => addInspiration(tag)}
              className="px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-purple-950/50 hover:text-purple-300 hover:border-purple-500/40 border border-slate-800 text-[11px] text-slate-400 transition"
            >
              + {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Style & Aesthetic Archetype Selector */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Aesthetic Style Archetype
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {styles.map((style) => {
            const isSelected = selectedStyle === style.id;
            return (
              <button
                key={style.id}
                type="button"
                onClick={() => setSelectedStyle(style.id)}
                className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                  isSelected
                    ? 'bg-purple-950/50 border-purple-500 shadow-md shadow-purple-900/30'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="text-xl mb-1">{style.icon}</div>
                <div>
                  <div className="text-xs font-semibold text-slate-200">{style.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{style.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Parameters Row: Aspect Ratio & Camera Lens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {/* Aspect Ratio */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
            <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Target Aspect Ratio</span>
          </label>
          <select
            value={aspectRatio}
            onChange={(e) => setAspectRatio(e.target.value)}
            className="w-full p-2.5 rounded-xl glass-input text-xs text-slate-200"
          >
            {aspectRatios.map((ar) => (
              <option key={ar.id} value={ar.id} className="bg-slate-900 text-slate-100">
                {ar.label}
              </option>
            ))}
          </select>
        </div>

        {/* Camera Sensor & Optics */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
            <Camera className="w-3.5 h-3.5 text-purple-400" />
            <span>Virtual Camera Rig & Lens</span>
          </label>
          <select
            value={selectedCamera}
            onChange={(e) => setSelectedCamera(e.target.value)}
            className="w-full p-2.5 rounded-xl glass-input text-xs text-slate-200"
          >
            {cameraRigs.map((cam) => (
              <option key={cam} value={cam} className="bg-slate-900 text-slate-100">
                {cam}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
