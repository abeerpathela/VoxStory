const API_BASE = '/api';

export const getAuthToken = () => localStorage.getItem('voxstory_token');
export const setAuthToken = (token) => localStorage.setItem('voxstory_token', token);
export const clearAuthToken = () => localStorage.removeItem('voxstory_token');

export const apiFetch = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  const config = {
    ...options,
    headers
  };

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, config);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || `HTTP error ${res.status}`);
    }
    return data;
  } catch (err) {
    console.error(`API Error on ${endpoint}:`, err);
    throw err;
  }
};

export const api = {
  // Auth
  getPersonas: () => apiFetch('/auth/personas'),
  demoLogin: (personaId) => apiFetch('/auth/demo-login', { method: 'POST', body: JSON.stringify({ personaId }) }),
  login: (credentials) => apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  register: (data) => apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  getCurrentUser: () => apiFetch('/auth/me'),

  // Voice
  getSamples: () => apiFetch('/voice/samples'),
  loadSample: (sampleId) => apiFetch('/voice/load-sample', { method: 'POST', body: JSON.stringify({ sampleId }) }),
  analyzeVoice: (payload) => apiFetch('/voice/analyze', { method: 'POST', body: JSON.stringify(payload) }),
  uploadAudio: async (file) => {
    const formData = new FormData();
    formData.append('audio', file);
    const token = getAuthToken();
    const res = await fetch(`${API_BASE}/voice/upload`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData
    });
    return res.json();
  },

  // Story
  synthesizeStory: (payload) => apiFetch('/story/synthesize', { method: 'POST', body: JSON.stringify(payload) }),

  // Prompt
  generatePrompts: (payload) => apiFetch('/prompt/generate', { method: 'POST', body: JSON.stringify(payload) }),

  // Train & Datasets
  getDatasets: () => apiFetch('/train/datasets'),
  getCheckpoints: () => apiFetch('/train/checkpoints'),
  runTraining: (payload) => apiFetch('/train/run', { method: 'POST', body: JSON.stringify(payload) }),
  saveWeights: (payload) => apiFetch('/train/save-weights', { method: 'POST', body: JSON.stringify(payload) })
};
