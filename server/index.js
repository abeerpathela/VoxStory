import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import voiceRoutes from './routes/voice.js';
import storyRoutes from './routes/story.js';
import promptRoutes from './routes/prompt.js';
import trainRoutes from './routes/train.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/voice', voiceRoutes);
app.use('/api/story', storyRoutes);
app.use('/api/prompt', promptRoutes);
app.use('/api/train', trainRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    name: 'VoxStory AI Studio Local API',
    mode: '100% Self-Contained Local Model (Zero API Keys Required)',
    timestamp: new Date().toISOString(),
    version: '1.4.2-local'
  });
});

const server = app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`🚀 VoxStory AI Studio Local Server running on port ${PORT}`);
  console.log(`🔒 Local Engines: Acoustic Diarizer, Story Synthesizer, Prompt Generator`);
  console.log(`🌐 Health endpoint: http://localhost:${PORT}/api/health`);
  console.log(`=================================================`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`⚠️  Port ${PORT} is already in use by an active VoxStory server instance.`);
    console.error(`👉 The server is already running and accessible at http://localhost:${PORT}`);
    console.error(`👉 If you want to restart it on a custom port, run: PORT=5001 node index.js`);
  } else {
    console.error('Server error:', err);
  }
});
