import React from 'react';
import {
  ShieldCheck,
  User,
  ChevronDown,
  LogOut,
  Loader2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useStudio } from '../context/StudioContext';

const NavMicLogo = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="navMicGrad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="40%" stopColor="#6366f1" />
          <stop offset="75%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <linearGradient id="navStrokeGrad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>

      {/* Sound waves */}
      <path
        d="M10 60 Q10 52 14 52 Q18 52 18 60 Q18 68 14 68 Q10 68 10 60 Z"
        fill="url(#navMicGrad)"
        opacity="0.7"
      />
      <path
        d="M22 60 Q22 46 30 46 Q38 46 38 60 Q38 74 30 74 Q22 74 22 60 Z"
        fill="url(#navMicGrad)"
        opacity="0.9"
      />

      {/* Mic capsule */}
      <path
        d="M52 22 C43 22 36 29 36 38 L36 60 C36 69 43 76 52 76 C61 76 68 69 68 60 L68 38 C68 29 61 22 52 22 Z"
        fill="url(#navMicGrad)"
        fillOpacity="0.12"
        stroke="url(#navStrokeGrad)"
        strokeWidth="3"
      />
      <line x1="43" y1="34" x2="61" y2="34" stroke="url(#navStrokeGrad)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="43" y1="42" x2="61" y2="42" stroke="url(#navStrokeGrad)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="43" y1="50" x2="61" y2="50" stroke="url(#navStrokeGrad)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="43" y1="58" x2="52" y2="58" stroke="url(#navStrokeGrad)" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />

      {/* Mic stand */}
      <line x1="52" y1="76" x2="52" y2="96" stroke="url(#navStrokeGrad)" strokeWidth="3" strokeLinecap="round" />
      <path
        d="M38 96 L38 104 C38 112 45 118 52 118 C59 118 66 112 66 104 L66 96"
        stroke="url(#navStrokeGrad)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <line x1="32" y1="118" x2="72" y2="118" stroke="url(#navStrokeGrad)" strokeWidth="3" strokeLinecap="round" />

      {/* Brain on right */}
      <path
        d="M72 32 C86 28 100 36 102 50 C106 58 104 70 96 76 C100 84 94 94 84 94 C76 96 68 90 66 82 C62 82 58 78 58 74 L70 58 L68 38 C69 35 70 33 72 32 Z"
        fill="url(#navMicGrad)"
        fillOpacity="0.1"
        stroke="url(#navStrokeGrad)"
        strokeWidth="2.5"
      />
      <path d="M78 38 C84 36 90 40 90 46" stroke="url(#navStrokeGrad)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.9" />
      <path d="M76 48 C82 46 88 50 92 54" stroke="url(#navStrokeGrad)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.9" />
      <path d="M76 60 C82 58 88 62 92 64" stroke="url(#navStrokeGrad)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.9" />
      <circle cx="82" cy="42" r="2.5" fill="#22d3ee" />
      <circle cx="92" cy="52" r="2" fill="#a855f7" />
      <circle cx="86" cy="66" r="2" fill="#ec4899" />
    </svg>
  );
};

export const Navbar = () => {
  const { user, personas, demoLogin, logout, setShowAuthModal } = useAuth();
  const { isAnythingLoading, isProcessingVoice, isSynthesizingStory, isGeneratingPrompts } = useStudio();
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  let statusLabel = '';
  if (isProcessingVoice) statusLabel = 'Analyzing voice';
  else if (isSynthesizingStory) statusLabel = 'Writing story';
  else if (isGeneratingPrompts) statusLabel = 'Building prompts';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-ink-700/70 bg-ink-900/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

        {/* Brand */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="nav-mic-logo">
            <NavMicLogo />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[18px] tracking-tight">
                <span
                  style={{
                    background: 'linear-gradient(90deg, #22d3ee, #6366f1)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >Vox</span>
                <span
                  style={{
                    background: 'linear-gradient(90deg, #a855f7, #ec4899)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >Story</span>
              </span>
            </div>
            <p className="text-[11px] text-ink-400 truncate">Voice → Enhanced Prompts</p>
          </div>
        </div>

        {/* Status */}
        <div className="hidden md:flex items-center">
          {isAnythingLoading ? (
            <div className="flex items-center gap-2 text-[12px] text-neon-cyanBright bg-neon-cyan/10 border border-neon-cyan/25 rounded-full px-3 py-1.5">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span className="font-medium">{statusLabel}…</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-[12px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/15 rounded-full px-3 py-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="font-medium">100% local · private</span>
            </div>
          )}
        </div>

        {/* User */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="md:hidden flex items-center gap-1.5 text-[12px] text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg bg-ink-800 border border-ink-700 hover:border-ink-600 transition"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-md object-cover"
                />
                <div className="text-left hidden sm:block leading-tight">
                  <div className="text-[12px] font-medium text-slate-200">{user.name}</div>
                  <div className="text-[10px] text-ink-300">{user.role?.split(' ')[0]}</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-ink-400" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-60 rounded-xl bg-ink-800 border border-ink-700 shadow-xl p-2 z-50">
                  <div className="p-2 border-b border-ink-700 mb-2">
                    <div className="text-[12px] font-semibold text-white">{user.name}</div>
                    <div className="text-[11px] text-ink-300 truncate">{user.email}</div>
                    <div className="text-[10px] text-neon-purple mt-0.5">{user.role}</div>
                  </div>

                  <div className="text-[10px] uppercase tracking-wider font-semibold text-ink-400 px-2 py-1">
                    Switch Persona
                  </div>
                  {personas.map((persona) => (
                    <button
                      key={persona.id}
                      onClick={() => {
                        demoLogin(persona.id);
                        setShowUserMenu(false);
                      }}
                      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[12px] transition text-left ${
                        user.id === persona.id
                          ? 'bg-neon-purple/15 text-neon-purpleBright border border-neon-purple/25'
                          : 'text-slate-200 hover:bg-ink-700'
                      }`}
                    >
                      <img src={persona.avatar} alt={persona.name} className="w-5 h-5 rounded object-cover" />
                      <div className="min-w-0">
                        <div className="font-medium truncate">{persona.name}</div>
                        <div className="text-[10px] text-ink-400 truncate">{persona.role}</div>
                      </div>
                    </button>
                  ))}

                  <div className="border-t border-ink-700 my-1 pt-1">
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[12px] text-rose-300 hover:bg-rose-500/10 transition text-left"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-[12px] font-semibold transition"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                boxShadow: '0 1px 0 rgba(255,255,255,0.1) inset, 0 4px 16px rgba(99,102,241,0.25)'
              }}
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
