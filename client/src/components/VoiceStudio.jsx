import React, { useState, useRef } from 'react';
import {
  Mic,
  MicOff,
  Upload,
  Sparkles,
  Users,
  Clock,
  FileAudio,
  Check,
  PenTool,
  PlaySquare,
  Mic2,
  FileUp,
  Type,
  Wand2
} from 'lucide-react';
import { useStudio } from '../context/StudioContext';
import { WaveformVisualizer } from './WaveformVisualizer';

export const VoiceStudio = () => {
  const {
    samples,
    activeSampleId,
    loadSample,
    isProcessingVoice,
    audioWaveform,
    audioDuration,
    analyzeCustomVoice,
    isAnythingLoading,
    clientNotes,
    setClientNotes,
    selectedStyle,
    setSelectedStyle,
    aspectRatio,
    setAspectRatio,
    regeneratePrompts
  } = useStudio();

  const [mode, setMode] = useState('samples');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const timerRef = useRef(null);
  const recognitionRef = useRef(null);

  const styles = [
    { id: 'cinematic', label: 'Cinematic', icon: '🎬' },
    { id: 'cyberpunk', label: 'Cyberpunk', icon: '🌆' },
    { id: 'fantasy', label: 'Fantasy', icon: '✨' },
    { id: 'architectural', label: 'Architectural', icon: '🏛️' },
    { id: 'anime_ghibli', label: 'Anime', icon: '🌿' }
  ];

  const aspectRatios = [
    { id: '16:9', label: '16:9' },
    { id: '21:9', label: '21:9' },
    { id: '1:1', label: '1:1' },
    { id: '9:16', label: '9:16' },
    { id: '4:5', label: '4:5' }
  ];

  const startRecording = () => {
    setIsRecording(true);
    setRecordingSeconds(0);
    setLiveTranscript('');

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript + ' ';
        }
        setLiveTranscript(transcript);
      };
      recognition.onerror = (event) => console.warn('SR:', event.error);

      try {
        recognition.start();
        recognitionRef.current = recognition;
      } catch (err) {
        console.warn('SR start failed:', err);
      }
    }

    timerRef.current = setInterval(() => {
      setRecordingSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopRecording = async () => {
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
    }
    const spokenText = liveTranscript.trim() ||
      "Client wants an AI prompt to generate a futuristic neon skyline with rain reflections and a solitary courier overlooking the city.";
    await analyzeCustomVoice({
      transcriptText: spokenText,
      duration: Math.max(12, recordingSeconds),
      speakersHint: ["Client Voice Note", "Creative Director"]
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      analyzeCustomVoice({
        transcriptText: `Audio uploaded from ${file.name}. Visual concept: An ethereal bioluminescent cavern with giant glowing crystal formations, underground waterfall, and an explorer with a robotic companion.`,
        duration: 35,
        speakersHint: ["Audio File Voice 1", "Audio File Voice 2"]
      });
    }
  };

  const handleProcessTypedText = () => {
    if (clientNotes.trim()) {
      analyzeCustomVoice({
        transcriptText: clientNotes,
        duration: 20,
        speakersHint: ["Typed Description"]
      });
    }
  };

  return (
    <div className="space-y-5">
      {/* Hero */}
      <div className="panel panel-glow rounded-3xl p-8 sm:p-10 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-60 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at top right, rgba(34,211,238,0.08), transparent 60%), radial-gradient(ellipse at bottom left, rgba(168,85,247,0.08), transparent 60%)'
          }}
        />
        <div className="relative">
          <span
            className="chip inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold"
            style={{
              background: 'linear-gradient(135deg, rgba(34,211,238,0.12), rgba(168,85,247,0.12))',
              border: '1px solid rgba(168,85,247,0.3)',
              color: '#c084fc'
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Voice to Enhanced Prompts · One flow
          </span>
          <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.05]">
            Describe your idea.
            <br />
            <span
              style={{
                background: 'linear-gradient(90deg, #22d3ee 0%, #a855f7 50%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Get production prompts.
            </span>
          </h1>
          <p className="mt-4 text-[15px] text-ink-200 max-w-2xl leading-relaxed">
            Record, upload, or type what you want to create. Mood, tone, and style are parsed
            automatically — then you get ready-to-copy prompts for every major AI platform.
          </p>
        </div>
      </div>

      {/* Style + Ratio */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="panel p-5">
          <label className="block text-[11px] font-semibold text-ink-200 uppercase tracking-widest mb-3">
            Art Style
          </label>
          <div className="grid grid-cols-5 gap-2">
            {styles.map((s) => {
              const active = selectedStyle === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => { setSelectedStyle(s.id); regeneratePrompts(); }}
                  className={`flex flex-col items-center gap-1.5 py-3 rounded-xl text-[12px] font-medium transition border ${
                    active
                      ? 'text-white'
                      : 'bg-ink-850 border-ink-700 text-slate-200 hover:border-ink-600 hover:bg-ink-800'
                  }`}
                  style={active ? {
                    background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                    borderColor: 'transparent',
                    boxShadow: '0 4px 16px rgba(168,85,247,0.25)'
                  } : {}}
                >
                  <span className="text-lg leading-none">{s.icon}</span>
                  <span>{s.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="panel p-5">
          <label className="block text-[11px] font-semibold text-ink-200 uppercase tracking-widest mb-3">
            Aspect Ratio
          </label>
          <div className="grid grid-cols-5 gap-2">
            {aspectRatios.map((ar) => {
              const active = aspectRatio === ar.id;
              return (
                <button
                  key={ar.id}
                  onClick={() => { setAspectRatio(ar.id); regeneratePrompts(); }}
                  className={`py-3 rounded-xl text-[12px] font-semibold transition border ${
                    active
                      ? 'text-white'
                      : 'bg-ink-850 border-ink-700 text-slate-200 hover:border-ink-600 hover:bg-ink-800'
                  }`}
                  style={active ? {
                    background: 'linear-gradient(135deg, #10b981 0%, #22d3ee 100%)',
                    borderColor: 'transparent',
                    boxShadow: '0 4px 16px rgba(16,185,129,0.25)'
                  } : {}}
                >
                  {ar.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Input Methods */}
      <div className="panel p-6">
        <div className="flex items-center gap-2 mb-2">
          <span
            className="chip px-2.5 py-1 rounded-md text-[11px] font-bold"
            style={{
              background: 'linear-gradient(135deg, rgba(34,211,238,0.15), rgba(168,85,247,0.15))',
              border: '1px solid rgba(168,85,247,0.25)',
              color: '#c084fc'
            }}
          >
            Step 1
          </span>
          <h2 className="text-lg font-semibold text-white">How do you want to describe it?</h2>
        </div>
        <p className="text-[13px] text-ink-300 mb-5">Pick whichever way is easiest. All paths lead to prompts.</p>

        {/* Mode Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { id: 'samples', label: 'Try Examples', sub: 'Demo scenarios', Icon: PlaySquare, accent: { from: '#6366f1', to: '#a855f7', dot: '#a855f7' } },
            { id: 'mic', label: 'Record Voice', sub: 'Use microphone', Icon: Mic2, accent: { from: '#f43f5e', to: '#ec4899', dot: '#ec4899' } },
            { id: 'upload', label: 'Upload Audio', sub: 'MP3 / WAV / M4A', Icon: FileUp, accent: { from: '#f59e0b', to: '#f97316', dot: '#f59e0b' } },
            { id: 'text', label: 'Type / Paste', sub: 'Write it out', Icon: Type, accent: { from: '#10b981', to: '#22d3ee', dot: '#10b981' } }
          ].map(({ id, label, sub, Icon, accent }) => {
            const active = mode === id;
            return (
              <button
                key={id}
                onClick={() => setMode(id)}
                className={`p-4 rounded-xl border text-left transition ${
                  active
                    ? 'border-transparent'
                    : 'bg-ink-850 border-ink-700 hover:border-ink-600 hover:bg-ink-800'
                }`}
                style={active ? {
                  background: `linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0)) , ${accent.from}14`,
                  borderColor: `${accent.to}40`
                } : {}}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center text-white`}
                    style={active ? {
                      background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
                      boxShadow: `0 4px 14px ${accent.to}33`
                    } : {
                      background: '#161e33',
                      border: '1px solid #1c2640',
                      color: '#b0bccd'
                    }}
                  >
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      {active && (
                        <span
                          className="dot"
                          style={{ background: accent.dot, boxShadow: `0 0 8px ${accent.dot}` }}
                        />
                      )}
                      <div className="text-[14px] font-semibold text-white">{label}</div>
                    </div>
                    <div className="text-[12px] text-ink-300 mt-0.5">{sub}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Mode: Samples */}
        {mode === 'samples' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {samples.map((sample) => {
              const isSelected = activeSampleId === sample.id;
              return (
                <button
                  key={sample.id}
                  onClick={() => loadSample(sample.id)}
                  disabled={isAnythingLoading}
                  className={`text-left p-4 rounded-xl border transition ${
                    isSelected
                      ? 'bg-indigo-500/10 border-indigo-500/50'
                      : 'bg-ink-850 border-ink-700 hover:border-ink-600 hover:bg-ink-800'
                  } disabled:opacity-50`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="chip bg-ink-800 text-ink-200 border-ink-700">
                      {sample.category}
                    </span>
                    <span className="text-[11px] text-ink-300 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {sample.duration}s
                    </span>
                  </div>
                  <div className="text-[14px] font-semibold text-white mb-1 leading-snug">
                    {sample.title}
                  </div>
                  <p className="text-[12px] text-ink-300 line-clamp-2 leading-relaxed">
                    {sample.clientNotes}
                  </p>
                  <div className="mt-3 pt-3 border-t border-ink-700/60 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[11px] text-ink-200">
                      <Users className="w-3.5 h-3.5 text-indigo-300" />
                      <span className="font-mono">{sample.speakersCount} speaker{sample.speakersCount > 1 ? 's' : ''}</span>
                    </div>
                    {isSelected && (
                      <span className="flex items-center gap-1 text-[11px] text-emerald-300 font-semibold">
                        <Check className="w-3.5 h-3.5" /> Loaded
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Mode: Mic */}
        {mode === 'mic' && (
          <div className="rounded-xl bg-ink-850 border border-ink-700 p-8 flex flex-col items-center text-center gap-5">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isAnythingLoading && !isRecording}
              className={`w-24 h-24 rounded-full flex items-center justify-center transition disabled:opacity-50 shadow-lg ${
                isRecording
                  ? 'bg-rose-500 text-white ring-4 ring-rose-500/30'
                  : 'bg-indigo-500 hover:bg-indigo-400 text-white shadow-indigo-500/20'
              }`}
            >
              {isRecording ? <MicOff className="w-10 h-10" /> : <Mic className="w-10 h-10" />}
            </button>
            <div>
              <div className="text-[17px] font-semibold text-white">
                {isRecording ? 'Listening… speak your idea' : 'Click the mic & describe your scene'}
              </div>
              <div className="text-[13px] text-ink-300 mt-1 max-w-md mx-auto">
                Talk about characters, lighting, colors, mood. Natural language works best.
              </div>
            </div>
            <div className="w-full max-w-2xl">
              <textarea
                rows={3}
                value={liveTranscript}
                onChange={(e) => setLiveTranscript(e.target.value)}
                placeholder={isRecording ? 'Live transcript (you can edit here too)...' : 'Or paste/edit text here, then hit Process.'}
                className="input resize-none text-[13px]"
              />
              {!isRecording && liveTranscript.trim() && (
                <button
                  onClick={stopRecording}
                  disabled={isAnythingLoading}
                  className="btn-primary mt-3 px-6 py-2.5 disabled:opacity-50"
                >
                  <Wand2 className="w-4 h-4" />
                  Generate Prompts
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mode: Upload */}
        {mode === 'upload' && (
          <label className="block rounded-xl bg-ink-850 border-2 border-dashed border-ink-700 hover:border-indigo-500/60 hover:bg-indigo-500/5 transition cursor-pointer p-10 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
              <Upload className="w-7 h-7" />
            </div>
            <div className="text-[16px] font-semibold text-white">Upload an Audio File</div>
            <div className="text-[13px] text-ink-300 mt-1">MP3, WAV, M4A, OGG, WEBM · up to 25MB</div>
            <div className="mt-4 inline-flex btn-primary px-5 py-2 pointer-events-none">
              Choose File
            </div>
            <input type="file" accept="audio/*" onChange={handleFileUpload} className="hidden" />
            {uploadedFileName && (
              <div className="mt-4 flex items-center justify-center gap-2 text-[13px] text-emerald-300 font-mono">
                <FileAudio className="w-4 h-4" />
                {uploadedFileName}
              </div>
            )}
          </label>
        )}

        {/* Mode: Text */}
        {mode === 'text' && (
          <div className="space-y-3">
            <label className="block text-[11px] font-semibold text-ink-200 uppercase tracking-widest">
              Describe Your Scene
            </label>
            <textarea
              rows={6}
              value={clientNotes}
              onChange={(e) => setClientNotes(e.target.value)}
              placeholder="Example: A rainy cyberpunk alley in Tokyo at midnight. Neon signs reflect on wet pavement. A lone woman in a red coat walks away from the camera. Cinematic, shallow depth of field."
              className="input resize-y text-[14px] leading-relaxed"
            />
            <div>
              <button
                onClick={handleProcessTypedText}
                disabled={isAnythingLoading || !clientNotes.trim()}
                className="btn-primary px-6 py-3 disabled:opacity-50"
              >
                <Wand2 className="w-4 h-4" />
                Turn This Into Prompts
              </button>
            </div>
          </div>
        )}

        {/* Waveform */}
        {(audioWaveform.length > 0 || isRecording) && (
          <div className="mt-6 pt-5 border-t border-ink-700/60">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-[12px] text-ink-300">
                <span className={`dot ${isRecording ? 'bg-rose-400 animate-pulse' : 'bg-emerald-400'}`} />
                <span>{isRecording ? 'Recording in progress' : 'Audio preview'}</span>
              </div>
              {!isRecording && audioDuration > 0 && (
                <span className="text-[12px] font-mono text-ink-400">{audioDuration}s</span>
              )}
            </div>
            <WaveformVisualizer waveform={audioWaveform} duration={audioDuration} isLive={isRecording} />
          </div>
        )}
      </div>
    </div>
  );
};
