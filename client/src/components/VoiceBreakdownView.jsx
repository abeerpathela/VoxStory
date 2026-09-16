import React, { useState } from 'react';
import { 
  Layers, 
  Users, 
  Sparkles, 
  Clock, 
  Activity, 
  Tag, 
  Volume2, 
  Play, 
  Pause, 
  Edit3, 
  Check, 
  ArrowRight,
  TrendingUp,
  Brain
} from 'lucide-react';
import { useStudio } from '../context/StudioContext';

export const VoiceBreakdownView = () => {
  const { 
    voiceSegments, 
    setVoiceSegments, 
    synthesizedThoughts, 
    audioDuration, 
    setActiveTab,
    synthesizeStory
  } = useStudio();

  const [playingSegmentId, setPlayingSegmentId] = useState(null);
  const [editingSegmentId, setEditingSegmentId] = useState(null);
  const [editText, setEditText] = useState('');

  const togglePlaySegment = (id) => {
    if (playingSegmentId === id) {
      setPlayingSegmentId(null);
    } else {
      setPlayingSegmentId(id);
      // Auto stop after 3 seconds simulation
      setTimeout(() => setPlayingSegmentId(null), 3000);
    }
  };

  const startEdit = (segment) => {
    setEditingSegmentId(segment.id);
    setEditText(segment.text);
  };

  const saveEdit = (id) => {
    setVoiceSegments((prev) =>
      prev.map((s) => (s.id === id ? { ...s, text: editText } : s))
    );
    setEditingSegmentId(null);
  };

  const handleProceedToStory = async () => {
    await synthesizeStory();
    setActiveTab('story');
  };

  const uniqueSpeakers = [...new Set(voiceSegments.map(s => s.speakerName))];

  return (
    <div className="space-y-6">
      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl glass-panel border border-slate-800 flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-purple-900/30 text-purple-400 flex items-center justify-center border border-purple-500/30">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono text-slate-400">Voice Pieces</div>
            <div className="text-lg font-bold text-white">{voiceSegments.length} Slices</div>
            <div className="text-[10px] text-purple-400 font-mono">{audioDuration}s Total Speech</div>
          </div>
        </div>

        <div className="p-4 rounded-xl glass-panel border border-slate-800 flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-cyan-900/30 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono text-slate-400">Speakers Identified</div>
            <div className="text-lg font-bold text-white">{uniqueSpeakers.length} Contributor{uniqueSpeakers.length > 1 ? 's' : ''}</div>
            <div className="text-[10px] text-cyan-400 font-mono">Diarization: 96.8% Acc</div>
          </div>
        </div>

        <div className="p-4 rounded-xl glass-panel border border-slate-800 flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-900/30 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono text-slate-400">Thought Density</div>
            <div className="text-lg font-bold text-white">94.2% High</div>
            <div className="text-[10px] text-emerald-400 font-mono">Semantic Intent Extracted</div>
          </div>
        </div>

        <div className="p-4 rounded-xl glass-panel border border-slate-800 flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-900/30 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono text-slate-400">Core Atmosphere</div>
            <div className="text-sm font-bold text-white truncate max-w-[120px]">
              {synthesizedThoughts?.moodAndAtmosphere || 'Visionary'}
            </div>
            <div className="text-[10px] text-amber-400 font-mono">Ready to Weave</div>
          </div>
        </div>
      </div>

      {/* What the Client is Asking For (AI Goal Extraction) */}
      <div className="p-5 rounded-2xl glass-panel-glow border border-purple-500/40 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Analyzed Client Request & AI Objective
            </h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono">
            Deconstructed into {voiceSegments.length} Thought Pieces
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-100 font-medium leading-relaxed">
          👉 <span className="text-purple-300 font-semibold">Primary Goal for AI:</span> "{synthesizedThoughts?.clientCoreObjective || 'Generate high-fidelity creative output based on client vision.'}"
        </div>

        {/* Deconstructed Thought Pieces Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
          {synthesizedThoughts?.thoughtPieces?.map((tp, i) => (
            <div key={i} className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs space-y-1">
              <div className="flex items-center justify-between text-[10px] text-purple-400 font-mono">
                <span>Piece #{tp.pieceNumber}: {tp.thoughtType}</span>
              </div>
              <p className="text-slate-300 text-[11px] line-clamp-2 italic">"{tp.text}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Voice Pieces & Speaker Slices Timeline */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-purple-400" />
            <h3 className="text-base font-bold text-white">Segmented Voice Pieces & Thought Slices</h3>
          </div>

          <button
            onClick={handleProceedToStory}
            className="flex items-center space-x-2 px-4 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold hover:opacity-95 transition shadow-md shadow-purple-600/30"
          >
            <span>Convert to Thoughtful Story</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Slice Cards List */}
        <div className="space-y-3">
          {voiceSegments.map((seg, idx) => {
            const isPlaying = playingSegmentId === seg.id;
            const isEditing = editingSegmentId === seg.id;
            return (
              <div
                key={seg.id || idx}
                className="p-5 rounded-2xl glass-panel border border-slate-800/90 hover:border-slate-700 transition-all space-y-3"
              >
                {/* Slice Header: Speaker, Time, Pitch/Energy */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-white shadow-md"
                      style={{ backgroundColor: seg.avatarColor || '#8b5cf6' }}
                    >
                      {seg.speakerName?.charAt(0) || 'S'}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-white">{seg.speakerName}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 text-slate-400 font-mono border border-slate-800">
                          {seg.startTime} → {seg.endTime}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3 text-[11px] text-slate-400 font-mono mt-0.5">
                        <span className="flex items-center space-x-1">
                          <Activity className="w-3 h-3 text-cyan-400" />
                          <span>{seg.pitchHz || 180} Hz</span>
                        </span>
                        <span>•</span>
                        <span className="text-purple-400">{seg.energyLevel || 'Active'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Play & Edit Controls */}
                  <div className="flex items-center space-x-2 self-end sm:self-auto">
                    <button
                      onClick={() => togglePlaySegment(seg.id)}
                      className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                        isPlaying
                          ? 'bg-cyan-500 text-slate-950 animate-pulse'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                      }`}
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      <span>{isPlaying ? 'Playing Piece...' : 'Listen Piece'}</span>
                    </button>

                    {isEditing ? (
                      <button
                        onClick={() => saveEdit(seg.id)}
                        className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => startEdit(seg)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Speech Transcript */}
                <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                  {isEditing ? (
                    <textarea
                      rows={2}
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full p-2 text-xs rounded-lg glass-input text-slate-200 resize-none"
                    />
                  ) : (
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                      "{seg.text}"
                    </p>
                  )}
                </div>

                {/* Extracted Thoughts & Visual Keywords */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] text-slate-500 font-mono uppercase">Keywords:</span>
                    {(seg.thoughtAnalysis?.visualKeywords || ['Atmospheric', 'Visual']).map((kw, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-slate-900 text-[11px] text-cyan-300 border border-cyan-500/20 font-mono"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>

                  {seg.thoughtAnalysis?.sentiment && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-purple-950/60 text-purple-300 border border-purple-500/30 font-mono">
                      Sentiment: {seg.thoughtAnalysis.sentiment}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
