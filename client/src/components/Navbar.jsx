import React from 'react';
import { 
  Mic, 
  Sparkles, 
  BookOpen, 
  Layers, 
  Cpu, 
  User, 
  ChevronDown, 
  ShieldCheck,
  Zap,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useStudio } from '../context/StudioContext';

export const Navbar = () => {
  const { user, personas, demoLogin, logout, setShowAuthModal } = useAuth();
  const { activeTab, setActiveTab } = useStudio();
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  const tabs = [
    { id: 'studio', label: 'Studio & Canvas', icon: Sparkles },
    { id: 'breakdown', label: 'Voice Breakdown', icon: Layers },
    { id: 'story', label: 'Story Synthesizer', icon: BookOpen },
    { id: 'prompts', label: 'Prompt Matrix', icon: Zap },
    { id: 'training', label: 'Model Trainer', icon: Cpu },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('studio')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 p-[1.5px] shadow-lg shadow-purple-500/20 animate-glow-pulse">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Mic className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg tracking-tight text-white">VoxStory</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono border border-purple-500/30">AI Studio</span>
            </div>
            <p className="text-[10px] text-slate-400">Voice Breakdown & Precision Prompt Engine</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center space-x-1 p-1 bg-slate-900/90 rounded-xl border border-slate-800/90">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-200' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Section: Model Badge & User Menu */}
        <div className="flex items-center space-x-3">
          {/* Local Zero-API Badge */}
          <div className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Local Model</span>
          </div>

          {/* User Profile / Personas */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-1.5 pr-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-lg object-cover ring-1 ring-purple-500/50"
                />
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-medium text-slate-200 leading-tight">{user.name}</div>
                  <div className="text-[10px] text-purple-400 leading-none">{user.role?.split(' ')[0]}</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-slate-900/95 border border-slate-800 shadow-2xl p-2 z-50 backdrop-blur-xl">
                  <div className="p-2 border-b border-slate-800/80 mb-2">
                    <div className="text-xs font-semibold text-white">{user.name}</div>
                    <div className="text-[11px] text-slate-400 truncate">{user.email}</div>
                    <div className="text-[10px] text-purple-400 mt-0.5">{user.role}</div>
                  </div>

                  <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 px-2 py-1">
                    Switch Demo Persona
                  </div>
                  {personas.map((persona) => (
                    <button
                      key={persona.id}
                      onClick={() => {
                        demoLogin(persona.id);
                        setShowUserMenu(false);
                      }}
                      className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded-lg text-xs transition text-left ${
                        user.id === persona.id
                          ? 'bg-purple-900/30 text-purple-300 border border-purple-500/30'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <img src={persona.avatar} alt={persona.name} className="w-5 h-5 rounded-md object-cover" />
                      <div className="truncate">
                        <span className="font-medium">{persona.name}</span>
                        <span className="text-[10px] text-slate-400 block truncate">{persona.role}</span>
                      </div>
                    </button>
                  ))}

                  <div className="border-t border-slate-800/80 my-1 pt-1">
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center space-x-2 px-2 py-1.5 rounded-lg text-xs text-rose-400 hover:bg-rose-950/30 transition text-left"
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
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold glow-btn"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In / Demo</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation Sub-bar */}
      <div className="md:hidden flex overflow-x-auto px-4 py-2 border-t border-slate-800 space-x-2 bg-slate-950">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs whitespace-nowrap ${
                isActive
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
