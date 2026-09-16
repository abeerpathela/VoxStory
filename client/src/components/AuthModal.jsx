import React, { useState } from 'react';
import { X, Lock, Mail, User, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthModal = () => {
  const { showAuthModal, setShowAuthModal, personas, demoLogin, login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Creative Client');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!showAuthModal) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    let res;
    if (isRegister) {
      res = await register(name, email, password, role);
    } else {
      res = await login(email, password);
    }

    setLoading(false);
    if (res && !res.success) {
      setError(res.error || 'Authentication failed.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 md:p-8 overflow-hidden">
        
        {/* Ambient background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-cyan-600/20 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => setShowAuthModal(false)}
          className="absolute top-5 right-5 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-purple-400 text-xs font-mono mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SECURE STUDIO ACCESS</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {isRegister ? 'Create Your Account' : 'Welcome to VoxStory'}
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Sign in to start breaking down multi-speaker voices, weaving thoughtful stories, and crafting prompts.
          </p>
        </div>

        {/* Quick 1-Click Demo Profiles */}
        <div className="mb-6 p-3 rounded-xl bg-slate-950/80 border border-purple-500/20">
          <div className="text-[11px] font-semibold text-purple-300 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>⚡ Instant 1-Click Demo Access</span>
            <span className="text-[10px] text-slate-400 font-mono">No Password Needed</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {personas.map((persona) => (
              <button
                key={persona.id}
                type="button"
                onClick={() => demoLogin(persona.id)}
                className="flex flex-col items-center p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-purple-500/50 hover:bg-purple-950/20 transition text-center group"
              >
                <img src={persona.avatar} alt={persona.name} className="w-8 h-8 rounded-full mb-1 ring-1 ring-purple-500/40" />
                <span className="text-xs font-semibold text-slate-200 group-hover:text-purple-300 transition truncate w-full">{persona.name}</span>
                <span className="text-[9px] text-slate-400 truncate w-full">{persona.role.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Lin"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg glass-input"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg glass-input"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg glass-input"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-medium text-sm flex items-center justify-center space-x-2 shadow-lg shadow-purple-600/30 hover:opacity-95 transition"
          >
            <span>{loading ? 'Authenticating...' : isRegister ? 'Create Account' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Toggle between Login and Register */}
        <div className="mt-5 text-center text-xs text-slate-400">
          {isRegister ? (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className="text-purple-400 font-semibold hover:underline"
              >
                Sign In
              </button>
            </span>
          ) : (
            <span>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className="text-purple-400 font-semibold hover:underline"
              >
                Create Account
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
