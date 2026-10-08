import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { StudioProvider } from './context/StudioContext';
import { Navbar } from './components/Navbar';
import { AuthModal } from './components/AuthModal';
import { VoiceStudio } from './components/VoiceStudio';
import { SimpleOutputView } from './components/SimpleOutputView';
import { LoadingScreen } from './components/LoadingScreen';
import { ShieldCheck } from 'lucide-react';

const FooterMicLogo = () => {
  return (
    <svg width="14" height="14" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="footGrad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <path d="M52 22 C43 22 36 29 36 38 L36 60 C36 69 43 76 52 76 C61 76 68 69 68 60 L68 38 C68 29 61 22 52 22 Z" fill="url(#footGrad)" fillOpacity="0.2" stroke="url(#footGrad)" strokeWidth="5" />
      <line x1="52" y1="76" x2="52" y2="96" stroke="url(#footGrad)" strokeWidth="5" strokeLinecap="round" />
      <path d="M38 96 L38 104 C38 112 45 118 52 118 C59 118 66 112 66 104 L66 96" stroke="url(#footGrad)" strokeWidth="5" fill="none" strokeLinecap="round" />
      <line x1="32" y1="118" x2="72" y2="118" stroke="url(#footGrad)" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
};

const StudioMain = () => {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    if (appReady) {
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [appReady]);

  return (
    <>
      {!appReady && <LoadingScreen onFinish={() => setAppReady(true)} minDuration={2800} />}
      <div
        className="min-h-screen flex flex-col transition-opacity duration-700"
        style={{ opacity: appReady ? 1 : 0 }}
      >
        <div className="flex-1">
          <Navbar />
          <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <VoiceStudio />
            <section>
              <SimpleOutputView />
            </section>
          </main>
        </div>

        <footer className="border-t border-ink-700/60 bg-ink-900/50 backdrop-blur py-6 mt-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-ink-300">
            <div className="flex items-center gap-2">
              <FooterMicLogo />
              <span className="font-semibold">
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
              <span className="text-ink-500">—</span>
              <span>Record, upload, or type. Get AI prompts.</span>
            </div>
            <div className="flex items-center gap-3 text-ink-400 font-mono">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                100% local · no cloud
              </span>
              <span className="text-ink-600">|</span>
              <span>v1.4.2</span>
            </div>
          </div>
        </footer>

        <AuthModal />
      </div>
    </>
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
