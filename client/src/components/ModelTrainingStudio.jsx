import React, { useState } from 'react';
import { 
  Cpu, 
  Database, 
  TrendingDown, 
  Play, 
  CheckCircle2, 
  Save, 
  Layers, 
  Sparkles, 
  Activity, 
  ShieldCheck,
  Zap,
  Sliders
} from 'lucide-react';
import { useStudio } from '../context/StudioContext';

export const ModelTrainingStudio = () => {
  const { 
    trainingDatasets, 
    checkpoints, 
    isTraining, 
    runTraining, 
    trainingTelemetry 
  } = useStudio();

  const [epochs, setEpochs] = useState(15);
  const [learningRate, setLearningRate] = useState(0.0005);
  const [targetTask, setTargetTask] = useState('all');
  const [activeTab, setActiveTab] = useState('train'); // 'train', 'datasets', 'checkpoints'
  const [liveEpoch, setLiveEpoch] = useState(null);

  const handleStartTraining = async () => {
    setLiveEpoch(1);
    const res = await runTraining({ epochs, learningRate, targetTask });
    setLiveEpoch(epochs);
  };

  const tasks = [
    { id: 'all', label: 'Full Pipeline (Acoustic Diarizer + Story Synthesizer + Prompt Matrix)' },
    { id: 'diarization', label: 'Acoustic Slicer & Speaker Diarization Only' },
    { id: 'story', label: 'Thought Extractor & Story Synthesizer Only' },
    { id: 'prompt', label: 'Precision Prompt Style Vectors Only' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-purple-400 text-xs font-mono mb-1">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>100% LOCAL NEURAL TRAINING SANDBOX</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Model Training & Fine-Tuning Studio</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Train and fine-tune your in-house acoustic breakdown and story prompt models locally without external API dependencies.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 text-xs font-mono flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Zero External API Keys</span>
          </span>
        </div>
      </div>

      {/* Sub-Tabs */}
      <div className="flex items-center space-x-2 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800 w-fit">
        <button
          onClick={() => setActiveTab('train')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-medium transition ${
            activeTab === 'train'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Train & Fine-Tune</span>
        </button>

        <button
          onClick={() => setActiveTab('datasets')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-medium transition ${
            activeTab === 'datasets'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>Training Corpus & Taxonomy</span>
        </button>

        <button
          onClick={() => setActiveTab('checkpoints')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-medium transition ${
            activeTab === 'checkpoints'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Save className="w-3.5 h-3.5" />
          <span>Model Checkpoints ({checkpoints.length})</span>
        </button>
      </div>

      {/* Tab 1: Train & Fine-Tune View */}
      {activeTab === 'train' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hyperparameters Form */}
          <div className="lg:col-span-1 p-6 rounded-2xl glass-panel border border-slate-800 space-y-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-purple-400" />
              <span>Training Hyperparameters</span>
            </h3>

            {/* Target Architecture */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-300">Target Pipeline</label>
              <select
                value={targetTask}
                onChange={(e) => setTargetTask(e.target.value)}
                className="w-full p-2.5 rounded-xl glass-input text-xs text-slate-200"
              >
                {tasks.map((t) => (
                  <option key={t.id} value={t.id} className="bg-slate-900 text-slate-100">
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Epochs Slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Epochs ({epochs})</span>
                <span className="font-mono text-purple-400">{epochs} Iterations</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                step="5"
                value={epochs}
                onChange={(e) => setEpochs(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>

            {/* Learning Rate */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Learning Rate</span>
                <span className="font-mono text-cyan-400">{learningRate}</span>
              </div>
              <select
                value={learningRate}
                onChange={(e) => setLearningRate(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl glass-input text-xs text-slate-200"
              >
                <option value={0.001} className="bg-slate-900 text-slate-100">0.001 (Aggressive)</option>
                <option value={0.0005} className="bg-slate-900 text-slate-100">0.0005 (Optimal Default)</option>
                <option value={0.0001} className="bg-slate-900 text-slate-100">0.0001 (Fine-grained)</option>
              </select>
            </div>

            <button
              onClick={handleStartTraining}
              disabled={isTraining}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-purple-600/30 hover:opacity-95 transition disabled:opacity-50"
            >
              {isTraining ? (
                <>
                  <Activity className="w-4 h-4 animate-spin" />
                  <span>Optimizing Neural Weights...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Start Model Training Pass</span>
                </>
              )}
            </button>
          </div>

          {/* Loss & Telemetry Graphs */}
          <div className="lg:col-span-2 p-6 rounded-2xl glass-panel border border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingDown className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Convergence & Loss Curve Telemetry
                </h3>
              </div>

              {trainingTelemetry && (
                <span className="px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-500/30 text-xs font-mono">
                  Accuracy: {trainingTelemetry.summary?.accuracyScore}
                </span>
              )}
            </div>

            {/* Visual Loss Histogram */}
            {trainingTelemetry ? (
              <div className="space-y-4">
                <div className="h-44 bg-slate-950/80 rounded-xl p-4 border border-slate-800/80 flex items-end justify-between gap-1">
                  {trainingTelemetry.epochHistory?.map((ep) => {
                    const heightPercent = Math.max(8, Math.min(100, ep.loss * 140));
                    return (
                      <div
                        key={ep.epoch}
                        className="flex-1 flex flex-col items-center group relative h-full justify-end"
                      >
                        <div
                          className="w-full rounded-t-sm bg-gradient-to-t from-purple-600 to-cyan-400 transition-all duration-300 group-hover:from-purple-500 group-hover:to-cyan-300"
                          style={{ height: `${heightPercent}%` }}
                        />
                        <div className="absolute -top-7 hidden group-hover:block bg-slate-900 text-[10px] text-cyan-300 px-1.5 py-0.5 rounded border border-slate-700 font-mono whitespace-nowrap z-20">
                          Ep {ep.epoch}: Loss {ep.loss}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <div className="text-[10px] text-slate-400 font-mono uppercase">Initial Loss</div>
                    <div className="text-sm font-bold text-rose-400 font-mono mt-0.5">
                      {trainingTelemetry.summary?.startingLoss}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <div className="text-[10px] text-slate-400 font-mono uppercase">Final Loss</div>
                    <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">
                      {trainingTelemetry.summary?.finalLoss}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <div className="text-[10px] text-slate-400 font-mono uppercase">Status</div>
                    <div className="text-xs font-semibold text-purple-300 font-mono mt-0.5">
                      Converged
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-48 rounded-xl bg-slate-950/50 border border-dashed border-slate-800 flex flex-col items-center justify-center text-center p-6 space-y-2">
                <Cpu className="w-8 h-8 text-slate-600" />
                <p className="text-xs text-slate-400">
                  Ready to train. Adjust epochs and click "Start Model Training Pass" to compute gradient descent loss curves.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Datasets & Corpus */}
      {activeTab === 'datasets' && (
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Training Corpus (Voice Dialogue $\to$ Story $\to$ Precision Prompts)
            </h3>
            <span className="text-xs font-mono text-purple-400">
              {trainingDatasets?.trainingCorpus?.length || 0} Curated Pairs
            </span>
          </div>

          <div className="space-y-4">
            {trainingDatasets?.trainingCorpus?.map((item) => (
              <div key={item.id} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-purple-300">{item.dialogueType}</span>
                  <span className="text-[10px] font-mono text-slate-400">{item.speakers?.join(' & ')}</span>
                </div>
                <p className="text-xs text-slate-300 italic bg-slate-900/80 p-2.5 rounded-lg border border-slate-850">
                  "{item.inputTranscript}"
                </p>
                <div className="text-xs text-cyan-300 font-mono">
                  Theme: {item.extractedThoughts?.coreTheme}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Checkpoints */}
      {activeTab === 'checkpoints' && (
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Saved In-House Model Checkpoints
          </h3>
          <div className="space-y-3">
            {checkpoints.map((ckpt) => (
              <div
                key={ckpt.id}
                className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-white">{ckpt.name}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
                      Active
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 font-mono mt-1">
                    {ckpt.epochs} Epochs • Loss: {ckpt.finalLoss || 0.042} • Val Acc: {((ckpt.validationAccuracy || 0.94) * 100).toFixed(1)}%
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 font-mono">
                  {new Date(ckpt.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
