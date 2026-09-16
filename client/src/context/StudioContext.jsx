import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../utils/api';

const StudioContext = createContext(null);

export const StudioProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('studio'); // 'studio', 'breakdown', 'story', 'prompts', 'training'
  
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

  // Model Training Studio State
  const [trainingDatasets, setTrainingDatasets] = useState(null);
  const [checkpoints, setCheckpoints] = useState([]);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingTelemetry, setTrainingTelemetry] = useState(null);

  // Initialize with default sample scenario
  useEffect(() => {
    const initStudio = async () => {
      try {
        const samplesRes = await api.getSamples();
        if (samplesRes?.samples) {
          setSamples(samplesRes.samples);
        }

        // Auto load first sample
        const loaded = await api.loadSample('sample-metropolis');
        if (loaded?.success) {
          setVoiceSegments(loaded.segments || []);
          setAudioWaveform(loaded.waveform || []);
          setAudioDuration(loaded.duration || 48);
          setSynthesizedThoughts(loaded.synthesizedThoughts || null);
          setClientNotes(loaded.clientNotes || clientNotes);

          // Pre-synthesize story and prompts for immediate rich display
          const storyRes = await api.synthesizeStory({
            segments: loaded.segments,
            clientNotes: loaded.clientNotes,
            style: 'cyberpunk',
            thoughts: loaded.synthesizedThoughts
          });
          if (storyRes?.success) setStoryData(storyRes);

          const promptRes = await api.generatePrompts({
            story: storyRes?.narrativeArc,
            thoughts: loaded.synthesizedThoughts,
            clientNotes: loaded.clientNotes,
            style: 'cyberpunk',
            params: { aspectRatio: '16:9' }
          });
          if (promptRes?.success) setPromptData(promptRes);
        }

        // Load training datasets & checkpoints
        const [datasetsRes, ckptRes] = await Promise.all([
          api.getDatasets(),
          api.getCheckpoints()
        ]);
        if (datasetsRes?.success) setTrainingDatasets(datasetsRes);
        if (ckptRes?.success) setCheckpoints(ckptRes.checkpoints);
      } catch (err) {
        console.error('Failed to initialize studio:', err);
      }
    };

    initStudio();
  }, []);

  // Load a Pre-Bundled Multi-Speaker Audio Scenario
  const handleLoadSample = async (sampleId) => {
    setIsProcessingVoice(true);
    setActiveSampleId(sampleId);
    try {
      const res = await api.loadSample(sampleId);
      if (res?.success) {
        setVoiceSegments(res.segments || []);
        setAudioWaveform(res.waveform || []);
        setAudioDuration(res.duration || 30);
        setSynthesizedThoughts(res.synthesizedThoughts || null);
        if (res.clientNotes) setClientNotes(res.clientNotes);

        const newStyle = res.category?.toLowerCase().includes('cyberpunk')
          ? 'cyberpunk'
          : res.category?.toLowerCase().includes('fantasy')
          ? 'fantasy'
          : 'architectural';
        setSelectedStyle(newStyle);

        // Auto-refresh story and prompts
        const storyRes = await api.synthesizeStory({
          segments: res.segments,
          clientNotes: res.clientNotes || clientNotes,
          style: newStyle,
          thoughts: res.synthesizedThoughts
        });
        if (storyRes?.success) setStoryData(storyRes);

        const promptRes = await api.generatePrompts({
          story: storyRes?.narrativeArc,
          thoughts: res.synthesizedThoughts,
          clientNotes: res.clientNotes || clientNotes,
          style: newStyle,
          params: { aspectRatio, camera: selectedCamera }
        });
        if (promptRes?.success) setPromptData(promptRes);
      }
    } catch (err) {
      console.error('Error loading sample:', err);
    } finally {
      setIsProcessingVoice(false);
    }
  };

  // Analyze Custom Live Microphone Recording or Uploaded Audio Text
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
        setVoiceSegments(res.segments || []);
        setAudioWaveform(res.waveform || []);
        setAudioDuration(res.duration || duration);
        setSynthesizedThoughts(res.synthesizedThoughts || null);

        // Auto-synthesize story & prompts
        const storyRes = await api.synthesizeStory({
          segments: res.segments,
          clientNotes,
          style: selectedStyle,
          thoughts: res.synthesizedThoughts
        });
        if (storyRes?.success) setStoryData(storyRes);

        const promptRes = await api.generatePrompts({
          story: storyRes?.narrativeArc,
          thoughts: res.synthesizedThoughts,
          clientNotes,
          style: selectedStyle,
          params: { aspectRatio, camera: selectedCamera }
        });
        if (promptRes?.success) setPromptData(promptRes);
      }
    } catch (err) {
      console.error('Error analyzing voice:', err);
    } finally {
      setIsProcessingVoice(false);
    }
  };

  // Synthesize Story
  const handleSynthesizeStory = async (customStyle = selectedStyle) => {
    setIsSynthesizingStory(true);
    try {
      const res = await api.synthesizeStory({
        segments: voiceSegments,
        clientNotes,
        style: customStyle,
        thoughts: synthesizedThoughts
      });
      if (res?.success) {
        setStoryData(res);
      }
    } catch (err) {
      console.error('Error synthesizing story:', err);
    } finally {
      setIsSynthesizingStory(false);
    }
  };

  // Generate Precision Prompts
  const handleGeneratePrompts = async (customParams = {}) => {
    setIsGeneratingPrompts(true);
    try {
      const res = await api.generatePrompts({
        story: storyData?.narrativeArc,
        thoughts: synthesizedThoughts,
        clientNotes,
        style: selectedStyle,
        params: {
          aspectRatio,
          camera: selectedCamera,
          ...customParams
        }
      });
      if (res?.success) {
        setPromptData(res);
      }
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
        activeTab,
        setActiveTab,
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
        isGeneratingPrompts,
        promptData,
        trainingDatasets,
        checkpoints,
        isTraining,
        trainingTelemetry,
        loadSample: handleLoadSample,
        analyzeCustomVoice: handleAnalyzeCustomVoice,
        synthesizeStory: handleSynthesizeStory,
        generatePrompts: handleGeneratePrompts,
        runTraining: handleRunTraining
      }}
    >
      {children}
    </StudioContext.Provider>
  );
};

export const useStudio = () => useContext(StudioContext);
