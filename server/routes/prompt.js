import express from 'express';
import { promptEngine } from '../engine/promptEngine.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Generate precision prompts
router.post('/generate', optionalAuth, (req, res) => {
  const { story = "", thoughts = null, clientNotes = "", style = "cinematic", params = {} } = req.body;

  const result = promptEngine.generatePrompts({
    story,
    thoughts,
    clientNotes,
    style,
    params
  });

  res.json(result);
});

export default router;
