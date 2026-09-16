import express from 'express';
import { storySynthesizer } from '../engine/storySynthesizer.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Synthesize thoughtful story from voice pieces and client writing
router.post('/synthesize', optionalAuth, (req, res) => {
  const { segments = [], clientNotes = "", style = "cinematic", thoughts = null } = req.body;

  if (segments.length === 0 && (!clientNotes || clientNotes.trim().length === 0)) {
    return res.status(400).json({ error: 'Please provide either voice segments or client notes to synthesize a story.' });
  }

  const result = storySynthesizer.synthesizeStory({
    segments,
    clientNotes,
    style,
    thoughts
  });

  res.json(result);
});

export default router;
