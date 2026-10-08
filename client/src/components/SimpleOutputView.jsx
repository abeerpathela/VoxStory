import React, { useState } from 'react';
import {
  Zap,
  Copy,
  Check,
  Video,
  Image as ImageIcon,
  Bot,
  Layers,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Users,
  Clock,
  Eye,
  ShieldAlert,
  RefreshCw,
  Loader2
} from 'lucide-react';
import { useStudio } from '../context/StudioContext';

const PLATFORM_COLORS = {
  midjourney: '#6366f1',
  flux:       '#0ea5e9',
  sora:       '#ec4899',
  dalle:      '#10b981',
  llm:        '#f59e0b',
  developer:  '#8b5cf6'
};

export const SimpleOutputView = () => {
  const ctx = useStudio();
  const {
    promptData,
    storyData,
    voiceSegments,
    isGeneratingPrompts,
    isAnythingLoading,
    regeneratePrompts
  } = ctx;

  const [activePlatform, setActivePlatform] = useState('midjourney');
  const [copiedKey, setCopiedKey] = useState(null);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const [showNegative, setShowNegative] = useState(true);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const platforms = [
    { id: 'midjourney', label: 'Midjourney', Icon: ImageIcon },
    { id: 'flux',       label: 'Flux.1 Pro', Icon: Zap },
    { id: 'sora',       label: 'Sora / Runway', Icon: Video },
    { id: 'dalle',      label: 'DALL·E 3', Icon: Layers },
    { id: 'llm',        label: 'GPT / Claude', Icon: Bot }
  ];

  const hasData = !!(promptData && promptData.prompts);
  const current = hasData ? (promptData.prompts[activePlatform] || promptData.prompts.midjourney) : null;
  const uniqueSpeakers = [...new Set(voiceSegments.map(s => s.speakerName))];

  return (
    <div className="space-y-5">
      {/* Prompts Header Card */}
      <div className="panel p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="chip bg-emerald-500/10 text-emerald-300 border-emerald-500/20">
                Step 2
              </span>
              <span className="text-[11px] text-ink-300">
                {hasData ? (
                  <span>
                    <strong className="text-ink-100">{voiceSegments.length || 1}</strong> input piece{voiceSegments.length === 1 ? '' : 's'} → <strong className="text-ink-100">{Object.keys(promptData.prompts).length}</strong> tailored prompts
                  </span>
                ) : 'Your prompts will appear here'}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white">
              {hasData ? 'Your prompts are ready' : 'Ready when you are'}
            </h2>
          </div>
          {hasData && (
            <button
              onClick={() => regeneratePrompts()}
              disabled={isGeneratingPrompts}
              className="btn-soft px-4 py-2 text-[13px] disabled:opacity-50"
            >
              <RefreshCw className={"w-4 h-4 " + (isGeneratingPrompts ? 'animate-spin' : '')} />
              Re-generate
            </button>
          )}
        </div>

        {/* Empty / Loading */}
        {!hasData && (
          <div className="py-14 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-ink-800 border border-ink-700 text-ink-300 flex items-center justify-center mb-4">
              <Zap className={"w-6 h-6 " + (isAnythingLoading ? 'animate-pulse' : '')} />
            </div>
            <h3 className="text-[17px] font-semibold text-white mb-1">
              {isAnythingLoading ? 'Building prompts…' : 'No prompts yet'}
            </h3>
            <p className="text-[13px] text-ink-300 max-w-md mx-auto leading-relaxed">
              {isAnythingLoading
                ? 'Analyzing your description and putting together prompts for every platform.'
                : 'Pick an example, record, upload, or type your idea to get started.'}
            </p>
            {isAnythingLoading && (
              <div className="inline-flex items-center gap-2 mt-4 text-[12px] text-indigo-300">
                <Loader2 className="w-4 h-4 animate-spin" />
                Working on it…
              </div>
            )}
          </div>
        )}

        {hasData && (
          <div className="space-y-5">
            {/* Platform tabs */}
            <div className="flex flex-wrap gap-2 p-1.5 bg-ink-850 rounded-xl border border-ink-700">
              {platforms.map(p => {
                const { id, label, Icon } = p;
                const active = activePlatform === id;
                const color = PLATFORM_COLORS[id] || '#6366f1';
                return (
                  <button
                    key={id}
                    onClick={() => setActivePlatform(id)}
                    className={
                      'flex items-center gap-2 px-3.5 py-2 rounded-lg text-[13px] font-medium transition ' +
                      (active ? 'text-white shadow-sm' : 'text-ink-200 hover:bg-ink-800 hover:text-white')
                    }
                    style={active ? { background: color } : {}}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Main prompt box */}
            <div className="rounded-2xl border border-ink-700 bg-ink-850">
              <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-ink-700/70">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-ink-300" />
                  <span className="text-[12px] font-semibold text-ink-100 uppercase tracking-wider">
                    {current && current.platform ? current.platform : activePlatform}
                  </span>
                  {current && current.parameters && (
                    <span className="chip bg-ink-800 text-ink-300 border-ink-700">
                      {current.parameters}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleCopy(current ? (current.copyReady || current.prompt || '') : '', 'p-' + activePlatform)}
                  className={
                    'px-3.5 py-1.5 rounded-lg text-[12px] font-semibold transition flex items-center gap-1.5 ' +
                    (copiedKey === 'p-' + activePlatform
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                      : 'bg-indigo-500 text-white hover:bg-indigo-400')
                  }
                >
                  {copiedKey === 'p-' + activePlatform
                    ? <><Check className="w-3.5 h-3.5" /> Copied</>
                    : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                </button>
              </div>
              <pre className="whitespace-pre-wrap text-[14px] text-slate-100 leading-relaxed font-mono p-5 max-h-96 overflow-y-auto">
{current ? (current.copyReady || current.prompt || '') : ''}
              </pre>
            </div>

            {/* Quick copy */}
            <div>
              <div className="text-[11px] font-semibold text-ink-200 uppercase tracking-widest mb-2.5">
                Quick copy any prompt
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {Object.entries(promptData.prompts).map(entry => {
                  const [key, obj] = entry;
                  const plat = platforms.find(pp => pp.id === key);
                  const color = PLATFORM_COLORS[key] || '#6366f1';
                  const name = plat ? plat.label : key;
                  const copied = copiedKey === 'q-' + key;
                  return (
                    <button
                      key={key}
                      onClick={() => handleCopy(obj.copyReady || obj.prompt || '', 'q-' + key)}
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-ink-850 border border-ink-700 hover:border-ink-600 hover:bg-ink-800 transition text-left"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                        <span className="text-[13px] font-medium text-ink-100 truncate">{name}</span>
                      </div>
                      <span className={
                        'text-[11px] font-mono px-2 py-0.5 rounded-md transition ' +
                        (copied
                          ? 'text-emerald-300 bg-emerald-500/15'
                          : 'text-ink-300 bg-ink-800 border border-ink-700 hover:text-indigo-300 hover:border-indigo-500/30 hover:bg-indigo-500/10')
                      }>
                        {copied ? '✓ copied' : 'copy'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Negative */}
            {promptData.negativePrompt && showNegative && (
              <div className="rounded-xl bg-rose-500/5 border border-rose-500/15 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                    <span className="text-[11px] font-semibold text-rose-200 uppercase tracking-widest">
                      Avoid these
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(promptData.negativePrompt, 'neg')}
                    className={
                      'px-2.5 py-1 rounded-md text-[11px] font-semibold transition ' +
                      (copiedKey === 'neg'
                        ? 'bg-emerald-500/15 text-emerald-300'
                        : 'bg-rose-500/15 text-rose-200 hover:bg-rose-500/25')
                    }
                  >
                    {copiedKey === 'neg' ? '✓' : '📋'}
                  </button>
                </div>
                <p className="text-[12px] text-rose-100/90 font-mono leading-relaxed">
                  {promptData.negativePrompt}
                </p>
              </div>
            )}

            {/* Meta */}
            {promptData.metadata && (
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-ink-300">
                <span className="text-emerald-300">
                  ✓ {Math.round(promptData.metadata.confidenceScore * 100)}% match
                </span>
                <span className="text-ink-500">·</span>
                <span>
                  style: <span className="text-ink-100 font-medium uppercase">{promptData.style}</span>
                </span>
                <span className="text-ink-500">·</span>
                <span>
                  aspect: <span className="text-ink-100 font-medium">{promptData.aspectRatio}</span>
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Story collapsible */}
      {storyData && (
        <Collapsible
          title="Generated story & brief"
          subtitle={(storyData.stats ? (storyData.stats.totalWords + ' words · ' + (storyData.stats.readingTime || '')) : '')}
          Icon={BookOpen}
          iconColor="bg-indigo-500/15 text-indigo-300 border border-indigo-500/25"
          open={showStory}
          onToggle={() => setShowStory(s => !s)}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[11px] font-semibold text-ink-200 uppercase tracking-widest">
              Narrative
            </h3>
            <button
              onClick={() => handleCopy(storyData.narrativeArc, 'story')}
              className={'btn-soft px-3 py-1.5 text-[12px] ' + (copiedKey === 'story' ? 'text-emerald-300' : '')}
            >
              {copiedKey === 'story' ? '✓ Copied' : '📋 Copy story'}
            </button>
          </div>
          <div className="panel-soft p-4 max-h-72 overflow-y-auto">
            <p className="text-[14px] text-ink-100 leading-relaxed whitespace-pre-wrap">
              {storyData.narrativeArc}
            </p>
          </div>
          {storyData.creativeBrief && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              <BriefBox label="Theme" value={storyData.creativeBrief.coreTheme} />
              <BriefBox label="Lighting" value={storyData.creativeBrief.lightingDirection} />
              <BriefBox label="Pillars" value={(storyData.creativeBrief.keyVisualPillars || []).slice(0, 3).join(' · ')} />
            </div>
          )}
        </Collapsible>
      )}

      {/* Breakdown collapsible */}
      {voiceSegments.length > 0 && (
        <Collapsible
          title={'Voice breakdown · ' + voiceSegments.length + ' pieces'}
          subtitle={uniqueSpeakers.length + ' speaker' + (uniqueSpeakers.length === 1 ? '' : 's')}
          Icon={Users}
          iconColor="bg-emerald-500/15 text-emerald-300 border border-emerald-500/25"
          open={showBreakdown}
          onToggle={() => setShowBreakdown(s => !s)}
        >
          <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-ink-700/60">
            {uniqueSpeakers.map(name => {
              const seg = voiceSegments.find(s => s.speakerName === name);
              return (
                <span key={name} className="chip bg-ink-800 text-ink-100 border-ink-700">
                  <span className="dot mr-1.5" style={{ background: seg && seg.avatarColor ? seg.avatarColor : '#6366f1' }} />
                  <span className="text-[12px] font-medium">{name}</span>
                </span>
              );
            })}
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
            {voiceSegments.map(seg => (
              <div key={seg.id} className="panel-soft p-3.5">
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className="w-7 h-7 rounded-md flex items-center justify-center text-[11px] font-bold text-white"
                      style={{ background: seg.avatarColor || '#6366f1' }}
                    >
                      {seg.speakerName ? seg.speakerName.charAt(0) : '?'}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[13px] font-semibold text-ink-100 truncate">{seg.speakerName}</div>
                      <div className="text-[11px] text-ink-400 font-mono flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        {seg.startTime} → {seg.endTime} · {(seg.thoughtAnalysis && seg.thoughtAnalysis.sentiment) || '—'}
                      </div>
                    </div>
                  </div>
                  {seg.thoughtAnalysis && seg.thoughtAnalysis.thoughtType && (
                    <span className="chip bg-indigo-500/10 text-indigo-200 border-indigo-500/20 text-[10px]">
                      {seg.thoughtAnalysis.thoughtType.split(' ')[0]}
                    </span>
                  )}
                </div>
                <p className="text-[13.5px] text-ink-100 leading-relaxed mb-2">{seg.text}</p>
                {seg.thoughtAnalysis && seg.thoughtAnalysis.visualKeywords && seg.thoughtAnalysis.visualKeywords.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {seg.thoughtAnalysis.visualKeywords.slice(0, 5).map(k => (
                      <span key={k} className="chip bg-ink-800 text-ink-200 border-ink-700 text-[10px]">
                        {k}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Collapsible>
      )}
    </div>
  );
};

function BriefBox({ label, value }) {
  return (
    <div className="panel-soft p-3">
      <div className="text-[10px] font-mono uppercase tracking-wider text-ink-400 mb-1">{label}</div>
      <div className="text-[13px] text-ink-100 leading-snug">{value || '—'}</div>
    </div>
  );
}

function Collapsible({ title, subtitle, Icon, iconColor, open, onToggle, children }) {
  return (
    <div className="panel overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-5 flex items-center justify-between hover:bg-ink-850 transition text-left"
      >
        <div className="flex items-center gap-3">
          <div className={'w-10 h-10 rounded-xl flex items-center justify-center ' + iconColor}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[15px] font-semibold text-white capitalize">{title}</div>
            {subtitle && <div className="text-[12px] text-ink-300 mt-0.5">{subtitle}</div>}
          </div>
        </div>
        {open
          ? <ChevronUp className="w-5 h-5 text-ink-400" />
          : <ChevronDown className="w-5 h-5 text-ink-400" />}
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 border-t border-ink-700/60">
          {children}
        </div>
      )}
    </div>
  );
}
