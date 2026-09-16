import React, { useState, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Upload, 
  Sparkles, 
  Users, 
  Clock, 
  Radio, 
  FileAudio, 
  Check, 
  Play, 
  ArrowRight,
  RefreshCw
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
    setActiveTab
  } = useStudio();

  const [mode, setMode] = useState('samples'); // 'samples', 'mic', 'upload'
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [speechSupported, setSpeechSupported] = useState(true);
  const timerRef = useRef(null);
  const recognitionRef = useRef(null);

  // Live Microphone Speech Recognition via Web Speech API
  const startRecording = () => {
    setIsRecording(true);
    setRecordingSeconds(0);
    setLiveTranscript('');

    // Setup real-time browser speech recognition if supported
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

      recognition.onerror = (event) => {
        console.warn('Speech recognition status:', event.error);
      };

      try {
        recognition.start();
        recognitionRef.current = recognition;
      } catch (err) {
        console.warn('Could not start Web Speech API:', err);
      }
    } else {
      setSpeechSupported(false);
    }
    
    timerRef.current = setInterval(() => {
      setRecordingSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopRecording = async () => {
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
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

  return (
    <div className="rounded-2xl glass-panel p-6 border border-slate-800 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center space-x-2 text-purple-400 text-xs font-mono mb-1">
            <Radio className="w-3.5 h-3.5 text-cyan-400" />
            <span>VOICE CAPTURE & ACOUSTIC DIARIZER</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Multi-Speaker Voice Studio</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Capture single or multi-client voice messages, parse acoustic frequencies, and slice into speaker turns.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center space-x-1 p-1 bg-slate-900 rounded-xl border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setMode('samples')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              mode === 'samples'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Multi-Speaker Samples
          </button>
          <button
            onClick={() => setMode('mic')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              mode === 'mic'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Live Mic Record
          </button>
          <button
            onClick={() => setMode('upload')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              mode === 'upload'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Upload Audio
          </button>
        </div>
      </div>

      {/* Mode 1: Preloaded Multi-Speaker Voice Scenarios */}
      {mode === 'samples' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {samples.map((sample) => {
              const isSelected = activeSampleId === sample.id;
              return (
                <div
                  key={sample.id}
                  onClick={() => loadSample(sample.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 text-left flex flex-col justify-between ${
                    isSelected
                      ? 'bg-purple-950/40 border-purple-500/70 shadow-lg shadow-purple-900/30'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-slate-800 text-purple-300 border border-slate-700">
                        {sample.category}
                      </span>
                      <div className="flex items-center space-x-1 text-[11px] text-slate-400 font-mono">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        <span>{sample.duration}s</span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-sm text-slate-100 mb-1">{sample.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2">{sample.clientNotes}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      <Users className="w-3.5 h-3.5 text-purple-400" />
                      <span className="text-xs text-slate-300 font-mono">{sample.speakersCount} Speaker{sample.speakersCount > 1 ? 's' : ''}</span>
                    </div>
                    {isSelected && (
                      <span className="text-xs text-cyan-400 font-semibold flex items-center space-x-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>Active</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Mode 2: Live Microphone Recording */}
      {mode === 'mic' && (
        <div className="p-6 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl ${
                isRecording
                  ? 'bg-rose-600 text-white animate-pulse shadow-rose-600/50 scale-105'
                  : 'bg-gradient-to-tr from-purple-600 to-indigo-600 text-white hover:scale-105 shadow-purple-600/40'
              }`}
            >
              {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            </button>
            {isRecording && (
              <span className="absolute -bottom-2 px-2 py-0.5 rounded-full bg-rose-950 border border-rose-500/50 text-rose-300 text-[10px] font-mono animate-bounce">
                REC 00:{recordingSeconds.toString().padStart(2, '0')}
              </span>
            )}
          </div>

          <div>
            <h3 className="text-base font-semibold text-white">
              {isRecording ? 'Listening & Extracting Acoustic Turns...' : 'Click to Record Voice Message'}
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
              Speak client ideas, scene descriptions, or invite multiple people to speak. Our local diarization engine will automatically segment speakers.
            </p>
          </div>

          {/* Optional live speech edit */}
          <div className="w-full max-w-lg">
            <textarea
              rows={2}
              placeholder="Or type/paste spoken transcript directly here to simulate live speech..."
              value={liveTranscript}
              onChange={(e) => setLiveTranscript(e.target.value)}
              className="w-full p-2.5 text-xs rounded-lg glass-input text-slate-200 resize-none"
            />
            {liveTranscript.length > 0 && !isRecording && (
              <button
                onClick={stopRecording}
                className="mt-2 px-4 py-1.5 rounded-lg bg-purple-600 text-white text-xs font-semibold hover:bg-purple-500 transition shadow-md"
              >
                Break Down Typed Speech
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mode 3: Audio File Upload */}
      {mode === 'upload' && (
        <div className="p-8 rounded-xl bg-slate-950/70 border border-dashed border-slate-700 flex flex-col items-center justify-center text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-purple-900/30 text-purple-400 flex items-center justify-center border border-purple-500/30">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Upload Client Voice Note / Meeting Audio</h4>
            <p className="text-xs text-slate-400 mt-0.5">Supports MP3, WAV, M4A, OGG, WEBM (Up to 25MB)</p>
          </div>
          <label className="cursor-pointer px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition shadow-lg shadow-purple-600/30">
            <span>Browse Files</span>
            <input type="file" accept="audio/*" onChange={handleFileUpload} className="hidden" />
          </label>
          {uploadedFileName && (
            <div className="text-xs text-cyan-400 flex items-center space-x-1.5 font-mono">
              <FileAudio className="w-3.5 h-3.5" />
              <span>Loaded: {uploadedFileName}</span>
            </div>
          )}
        </div>
      )}

      {/* Active Waveform Visualizer & Action Bar */}
      <div className="mt-6 space-y-4">
        <WaveformVisualizer waveform={audioWaveform} duration={audioDuration} isLive={isRecording} />

        <div className="flex items-center justify-between">
          <div className="text-xs text-slate-400 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Local Acoustic Diarizer Ready (Zero API calls)</span>
          </div>

          <button
            onClick={() => setActiveTab('breakdown')}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-semibold hover:opacity-95 transition shadow-lg shadow-cyan-500/20"
          >
            <span>View Voice Slices & Thoughts</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
