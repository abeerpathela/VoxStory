import React, { useEffect, useState, useMemo } from 'react';

const MicBrainLogo = ({ className = '', size = 64 }) => {
  const gradId = useMemo(() => `micGrad-${Math.random().toString(36).slice(2, 9)}`, []);
  const strokeId = useMemo(() => `strokeGrad-${Math.random().toString(36).slice(2, 9)}`, []);

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="40%" stopColor="#6366f1" />
          <stop offset="75%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <linearGradient id={strokeId} x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>

      {/* Sound waves on left */}
      <g opacity="0.9">
        <path
          d="M10 60 Q10 52 14 52 Q18 52 18 60 Q18 68 14 68 Q10 68 10 60 Z"
          fill={`url(#${gradId})`}
          opacity="0.7"
        />
        <path
          d="M20 60 Q20 48 26 48 Q32 48 32 60 Q32 72 26 72 Q20 72 20 60 Z"
          fill={`url(#${gradId})`}
          opacity="0.8"
        />
        <path
          d="M30 60 Q30 44 38 44 Q46 44 46 60 Q46 76 38 76 Q30 76 30 60 Z"
          fill={`url(#${gradId})`}
        />
      </g>

      {/* Microphone body - capsule */}
      <g>
        {/* Mic capsule top */}
        <path
          d="M60 20 C51 20 44 27 44 36 L44 56 C44 65 51 72 60 72 C69 72 76 65 76 56 L76 36 C76 27 69 20 60 20 Z"
          fill="url(#gradFillMic)"
          stroke={`url(#${strokeId})`}
          strokeWidth="2.5"
          fillOpacity="0.08"
        />
        <defs>
          <linearGradient id="gradFillMic" x1="44" y1="20" x2="76" y2="72" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Mic capsule grill lines */}
        <line x1="51" y1="32" x2="69" y2="32" stroke={`url(#${strokeId})`} strokeWidth="2" strokeLinecap="round" opacity="0.9" />
        <line x1="51" y1="40" x2="69" y2="40" stroke={`url(#${strokeId})`} strokeWidth="2" strokeLinecap="round" opacity="0.9" />
        <line x1="51" y1="48" x2="69" y2="48" stroke={`url(#${strokeId})`} strokeWidth="2" strokeLinecap="round" opacity="0.9" />
        <line x1="51" y1="56" x2="60" y2="56" stroke={`url(#${strokeId})`} strokeWidth="2" strokeLinecap="round" opacity="0.8" />

        {/* Mic stand */}
        <line x1="60" y1="72" x2="60" y2="92" stroke={`url(#${strokeId})`} strokeWidth="2.5" strokeLinecap="round" />

        {/* Mic base U-shape */}
        <path
          d="M46 92 L46 100 C46 108 53 114 60 114 C67 114 74 108 74 100 L74 92"
          stroke={`url(#${strokeId})`}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Mic stand bottom bar */}
        <line x1="40" y1="114" x2="80" y2="114" stroke={`url(#${strokeId})`} strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* Brain / neural network on right side of mic */}
      <g>
        {/* Brain outer shape */}
        <path
          d="M78 30 C92 26 106 34 108 48 C112 56 110 68 102 74 C106 82 100 92 90 92 C82 94 74 88 72 80 C68 80 64 76 64 72 L76 56 L76 36 C76 34 77 32 78 30 Z"
          fill={`url(#${gradId})`}
          fillOpacity="0.08"
          stroke={`url(#${strokeId})`}
          strokeWidth="2"
        />

        {/* Brain inner folds */}
        <path d="M84 36 C90 34 96 38 96 44" stroke={`url(#${strokeId})`} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.85" />
        <path d="M82 46 C88 44 94 48 98 52" stroke={`url(#${strokeId})`} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.85" />
        <path d="M82 58 C88 56 94 60 98 62" stroke={`url(#${strokeId})`} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.85" />
        <path d="M84 70 C90 70 96 74 96 80" stroke={`url(#${strokeId})`} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.85" />

        {/* Neural connections */}
        <circle cx="88" cy="40" r="2.5" fill="#22d3ee" opacity="0.95" />
        <circle cx="98" cy="50" r="2" fill="#a855f7" opacity="0.95" />
        <circle cx="92" cy="64" r="2" fill="#ec4899" opacity="0.95" />
        <circle cx="96" cy="78" r="1.8" fill="#a855f7" opacity="0.8" />
        <circle cx="82" cy="82" r="1.5" fill="#22d3ee" opacity="0.8" />

        {/* Sparkle dots */}
        <g fill="#fde68a">
          <circle cx="104" cy="36" r="1.5" />
          <circle cx="110" cy="46" r="1" opacity="0.9" />
          <circle cx="108" cy="62" r="1.2" opacity="0.85" />
        </g>
        <g fill="#22d3ee">
          <circle cx="106" cy="28" r="1.3" opacity="0.9" />
          <circle cx="112" cy="56" r="1" opacity="0.7" />
        </g>
      </g>

      {/* Binary digits scattered */}
      <g fontFamily="JetBrains Mono, monospace" fontSize="6" fill="#22d3ee" opacity="0.55">
        <text x="42" y="24">01</text>
        <text x="52" y="18">1</text>
        <text x="66" y="16">0</text>
        <text x="100" y="96" transform="rotate(-10 100 96)">10</text>
        <text x="86" y="100" transform="rotate(5 86 100)" fill="#a855f7">011</text>
      </g>
    </svg>
  );
};

export const LoadingScreen = ({ onFinish, minDuration = 2800 }) => {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  const statuses = [
    'Initializing neural engine',
    'Loading acoustic models',
    'Calibrating diarizer',
    'Warming prompt pipeline',
    'Ready to create'
  ];

  useEffect(() => {
    const startTime = Date.now();
    let raf;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / minDuration) * 100);
      setProgress(pct);

      const idx = Math.min(statuses.length - 1, Math.floor((pct / 100) * statuses.length));
      setStatusIndex(idx);

      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setFadeOut(true);
        setTimeout(() => onFinish?.(), 600);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [minDuration, onFinish, statuses.length]);

  const waveDelays = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.4, 0.3, 0.2, 0.1, 0];
  const waveHeights = [16, 24, 32, 28, 36, 40, 34, 26, 30, 22, 14];

  return (
    <div className={`loading-screen ${fadeOut ? 'loading-fade-out' : ''}`}>
      {/* Floating circuit dots */}
      <div
        className="circuit-dot"
        style={{ top: '15%', left: '12%', animationDelay: '0s' }}
      />
      <div
        className="circuit-dot purple"
        style={{ top: '22%', right: '18%', animationDelay: '0.7s' }}
      />
      <div
        className="circuit-dot pink"
        style={{ top: '70%', left: '20%', animationDelay: '1.3s' }}
      />
      <div
        className="circuit-dot"
        style={{ bottom: '18%', right: '14%', animationDelay: '0.4s' }}
      />
      <div
        className="circuit-dot purple"
        style={{ top: '48%', left: '8%', animationDelay: '1.6s' }}
      />
      <div
        className="circuit-dot pink"
        style={{ top: '40%', right: '8%', animationDelay: '0.9s' }}
      />
      <div
        className="circuit-dot"
        style={{ bottom: '35%', left: '30%', animationDelay: '2s' }}
      />
      <div
        className="circuit-dot purple"
        style={{ top: '60%', right: '28%', animationDelay: '1.1s' }}
      />

      <div className="loading-logo-wrap">
        {/* Mic logo with ring */}
        <div className="mic-logo-container">
          <div className="mic-logo-ring" />
          <div className="mic-logo-ring-inner" />
          <MicBrainLogo className="mic-logo-svg" size={72} />

          {/* Waveform bars below mic */}
          <div className="mic-waves">
            {waveDelays.map((delay, i) => (
              <div
                key={i}
                className="mic-wave-bar"
                style={{
                  height: waveHeights[i],
                  animationDelay: `${delay}s`,
                  opacity: 0.85 - Math.abs(i - 5) * 0.06
                }}
              />
            ))}
          </div>
        </div>

        {/* Brand text */}
        <div className="loading-brand">
          <h1 className="loading-title">
            <span className="vox">Vox</span>
            <span className="story">Story</span>
          </h1>
          <p className="loading-subtitle">Voice to Enhanced Prompts</p>
        </div>

        {/* Progress */}
        <div className="loading-progress">
          <div className="loading-progress-bar">
            <div
              className="loading-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="loading-status-text">
            {statuses[statusIndex]}… {Math.round(progress)}%
          </p>
        </div>
      </div>
    </div>
  );
};
