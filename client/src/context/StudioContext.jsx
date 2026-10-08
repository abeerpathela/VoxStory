import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../utils/api';

const StudioContext = createContext(null);

export const StudioProvider = ({ children }) => {
  // Client Writing Workspace State
  const [clientNotes, setClientNotes] = useState(
    "A floating neo-tokyo skyport suspended between cloud-piercing skyscrapers in heavy rain. Solitary courier in high-collar trench coat gazing into endless canyon of magenta and cobalt neon billboards."
  );
  const [selectedStyle, setSelectedStyle] = useState('cyberpunk');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [selectedCamera, setSelectedCamera] = useState('Hasselblad H6D-100c, 80mm lens, f/2.8');

  // Audio & Voice State
  const [samples, setSamples] = useState([]);
  const [activeSampleId, setActiveSampleId] = useState('sample-metropolis');
  const [isProcessingVoice, setIsProcessingVoice] = useState(false);
  const [voiceSegments, setVoiceSegments] = useState([]);
  const [audioWaveform, setAudioWaveform] = useState([]);
  const [audioDuration, setAudioDuration] = useState(48);
  const [synthesizedThoughts, setSynthesizedThoughts] = useState(null);

  // Story & Narrative State
  const [isSynthesizingStory, setIsSynthesizingStory] = useState(false);
  const [storyData, setStoryData] = useState(null);

  // Prompt Generator State
  const [isGeneratingPrompts, setIsGeneratingPrompts] = useState(false);
  const [promptData, setPromptData] = useState(null);

  // Model Training Studio State (kept for data, but removed from UI tabs)
  const [trainingDatasets, setTrainingDatasets] = useState(null);
  const [checkpoints, setCheckpoints] = useState([]);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingTelemetry, setTrainingTelemetry] = useState(null);

  // Convenience: is anything loading?
  const isAnythingLoading = isProcessingVoice || isSynthesizingStory || isGeneratingPrompts;

  // Full pipeline: analyze voice → synthesize story → generate prompts, all in one go
  const runFullPipeline = async ({
    segments,
    waveform,
    duration,
    thoughts,
    notes,
    style
  }) => {
    const currentNotes = notes ?? clientNotes;
    const currentStyle = style ?? selectedStyle;
    const currentSegments = segments ?? voiceSegments;
    const currentThoughts = thoughts ?? synthesizedThoughts;

    // If we got raw analysis data, set it first
    if (segments) setVoiceSegments(segments);
    if (waveform) setAudioWaveform(waveform);
    if (duration != null) setAudioDuration(duration);
    if (thoughts) setSynthesizedThoughts(thoughts);
    if (notes != null) setClientNotes(currentNotes);

    // Step 2: synthesize story
    setIsSynthesizingStory(true);
    let storyResult = null;
    try {
      const storyRes = await api.synthesizeStory({
        segments: currentSegments,
        clientNotes: currentNotes,
        style: currentStyle,
        thoughts: currentThoughts
      });
      if (storyRes?.success) {
        setStoryData(storyRes);
        storyResult = storyRes;
      }
    } catch (e) {
      console.error('Story error:', e);
    } finally {
      setIsSynthesizingStory(false);
    }

    // Step 3: generate prompts
    setIsGeneratingPrompts(true);
    try {
      const promptRes = await api.generatePrompts({
        story: storyResult?.narrativeArc || '',
        thoughts: currentThoughts,
        clientNotes: currentNotes,
        style: currentStyle,
        params: { aspectRatio, camera: selectedCamera }
      });
      if (promptRes?.success) setPromptData(promptRes);
    } catch (e) {
      console.error('Prompt error:', e);
    } finally {
      setIsGeneratingPrompts(false);
    }
  };

  // Initialize with default sample scenario -> auto-run pipeline
  useEffect(() => {
    const initStudio = async () => {
      try {
        const samplesRes = await api.getSamples();
        if (samplesRes?.samples) setSamples(samplesRes.samples);

        setIsProcessingVoice(true);
        const loaded = await api.loadSample('sample-metropolis');
        setIsProcessingVoice(false);

        if (loaded?.success) {
          const detectedStyle = loaded.category?.toLowerCase().includes('cyberpunk')
            ? 'cyberpunk'
            : loaded.category?.toLowerCase().includes('fantasy')
            ? 'fantasy'
            : 'architectural';
          setSelectedStyle(detectedStyle);

          // Run the rest of the pipeline with loaded data
          await runFullPipeline({
            segments: loaded.segments || [],
            waveform: loaded.waveform || [],
            duration: loaded.duration || 48,
            thoughts: loaded.synthesizedThoughts || null,
            notes: loaded.clientNotes || clientNotes,
            style: detectedStyle
          });
        }

        // Load training datasets & checkpoints in background (kept for data)
        const [datasetsRes, ckptRes] = await Promise.all([
          api.getDatasets(),
          api.getCheckpoints()
        ]);
        if (datasetsRes?.success) setTrainingDatasets(datasetsRes);
        if (ckptRes?.success) setCheckpoints(ckptRes.checkpoints);
      } catch (err) {
        console.error('Failed to initialize studio:', err);
        setIsProcessingVoice(false);
        setIsSynthesizingStory(false);
        setIsGeneratingPrompts(false);
      }
    };

    initStudio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load a Pre-Bundled Multi-Speaker Audio Scenario -> auto-run full pipeline
  const handleLoadSample = async (sampleId) => {
    setIsProcessingVoice(true);
    setActiveSampleId(sampleId);
    try {
      const res = await api.loadSample(sampleId);
      if (res?.success) {
        const newStyle = res.category?.toLowerCase().includes('cyberpunk')
          ? 'cyberpunk'
          : res.category?.toLowerCase().includes('fantasy')
          ? 'fantasy'
          : 'architectural';
        setSelectedStyle(newStyle);

        await runFullPipeline({
          segments: res.segments || [],
          waveform: res.waveform || [],
          duration: res.duration || 30,
          thoughts: res.synthesizedThoughts || null,
          notes: res.clientNotes,
          style: newStyle
        });
      }
    } catch (err) {
      console.error('Error loading sample:', err);
    } finally {
      setIsProcessingVoice(false);
    }
  };

  // Analyze Custom Live Microphone Recording or Uploaded Audio Text -> auto-run full pipeline
  const handleAnalyzeCustomVoice = async ({ transcriptText, duration = 30, speakersHint = [] }) => {
    setIsProcessingVoice(true);
    try {
      const res = await api.analyzeVoice({
        transcriptText,
        audioDuration: duration,
        speakersHint,
        clientNotes,
        style: selectedStyle
      });
      if (res?.success) {
        await runFullPipeline({
          segments: res.segments || [],
          waveform: res.waveform || [],
          duration: res.duration || duration,
          thoughts: res.synthesizedThoughts || null
        });
      }
    } catch (err) {
      console.error('Error analyzing voice:', err);
    } finally {
      setIsProcessingVoice(false);
    }
  };

  // Re-generate prompts (e.g. when style/aspect/camera changes)
  const regeneratePrompts = async () => {
    setIsGeneratingPrompts(true);
    try {
      const promptRes = await api.generatePrompts({
        story: storyData?.narrativeArc,
        thoughts: synthesizedThoughts,
        clientNotes,
        style: selectedStyle,
        params: { aspectRatio, camera: selectedCamera }
      });
      if (promptRes?.success) setPromptData(promptRes);
    } catch (err) {
      console.error('Error generating prompts:', err);
    } finally {
      setIsGeneratingPrompts(false);
    }
  };

  // Run Local Model Training / Fine-Tuning
  const handleRunTraining = async ({ epochs = 15, learningRate = 0.0005, targetTask = 'all' }) => {
    setIsTraining(true);
    try {
      const res = await api.runTraining({ epochs, learningRate, targetTask });
      if (res?.success) {
        setTrainingTelemetry(res);
        setCheckpoints((prev) => [res.checkpoint, ...prev]);
        return res;
      }
    } catch (err) {
      console.error('Error running training:', err);
    } finally {
      setIsTraining(false);
    }
  };

  return (
    <StudioContext.Provider
      value={{
        clientNotes,
        setClientNotes,
        selectedStyle,
        setSelectedStyle,
        aspectRatio,
        setAspectRatio,
        selectedCamera,
        setSelectedCamera,
        samples,
        activeSampleId,
        isProcessingVoice,
        voiceSegments,
        setVoiceSegments,
        audioWaveform,
        audioDuration,
        synthesizedThoughts,
        isSynthesizingStory,
        storyData,
        setStoryData,
        isGeneratingPrompts,
        promptData,
        trainingDatasets,
        checkpoints,
        isTraining,
        trainingTelemetry,
        isAnythingLoading,
        loadSample: handleLoadSample,
        analyzeCustomVoice: handleAnalyzeCustomVoice,
        regeneratePrompts,
        runFullPipeline,
        runTraining: handleRunTraining
      }}
    >
      {children}
    </StudioContext.Provider>
  );
};

export const useStudio = () => useContext(StudioContext);
