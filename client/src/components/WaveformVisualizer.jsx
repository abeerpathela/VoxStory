import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Volume2 } from 'lucide-react';

export const WaveformVisualizer = ({ waveform = [], duration = 30, isLive = false }) => {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 1
  const animationRef = useRef(null);

  // Default synthetic waveform if none provided
  const points = waveform.length > 0 ? waveform : Array.from({ length: 60 }, (_, i) => 0.2 + 0.6 * Math.sin(i * 0.2) ** 2);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const barWidth = Math.max(2, (width / points.length) - 2);
    const progressIndex = Math.floor(progress * points.length);

    points.forEach((val, i) => {
      const x = i * (barWidth + 2);
      const barHeight = Math.max(4, val * (height * 0.85));
      const y = (height - barHeight) / 2;

      // Color gradient based on playback progress
      if (i <= progressIndex) {
        ctx.fillStyle = '#06b6d4'; // Active Cyan
      } else {
        ctx.fillStyle = 'rgba(139, 92, 246, 0.4)'; // Inactive Purple
      }

      // Draw rounded bar
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barHeight, 2);
      ctx.fill();
    });
  }, [points, progress]);

  // Audio Playback simulation
  useEffect(() => {
    if (isPlaying) {
      const startTime = performance.now();
      const initialProgress = progress;

      const step = (currentTime) => {
        const elapsed = (currentTime - startTime) / 1000;
        const newProgress = Math.min(1, initialProgress + elapsed / duration);
        setProgress(newProgress);

        if (newProgress < 1) {
          animationRef.current = requestAnimationFrame(step);
        } else {
          setIsPlaying(false);
          setProgress(0);
        }
      };

      animationRef.current = requestAnimationFrame(step);
    } else {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, duration]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const resetPlay = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const currentSeconds = Math.round(progress * duration);

  return (
    <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/90">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-lg bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center transition shadow-md shadow-purple-600/30"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
          <button
            onClick={resetPlay}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <div className="text-xs font-mono text-slate-300">
            <span className="text-cyan-400 font-semibold">{formatTime(currentSeconds)}</span> / {formatTime(duration)}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {isLive ? (
            <span className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-mono animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span>LIVE MIC</span>
            </span>
          ) : (
            <span className="text-[11px] font-mono text-slate-400 flex items-center space-x-1">
              <Volume2 className="w-3.5 h-3.5 text-purple-400" />
              <span>Spectral Diarized Audio</span>
            </span>
          )}
        </div>
      </div>

      {/* Canvas Waveform */}
      <div className="relative w-full h-14 bg-slate-900/80 rounded-lg overflow-hidden border border-slate-800 flex items-center px-2">
        <canvas
          ref={canvasRef}
          width={600}
          height={50}
          className="w-full h-full cursor-pointer"
          onClick={(e) => {
            const rect = canvasRef.current.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const newProg = Math.max(0, Math.min(1, clickX / rect.width));
            setProgress(newProg);
          }}
        />
      </div>
    </div>
  );
};
