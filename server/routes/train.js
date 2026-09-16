import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { modelTrainer } from '../engine/trainer.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATASETS_FILE = path.join(__dirname, '..', 'data', 'datasets.json');

const getDatasets = () => {
  try {
    return JSON.parse(fs.readFileSync(DATASETS_FILE, 'utf-8'));
  } catch (e) {
    return { trainingCorpus: [], thoughtTaxonomy: [], modelWeights: {} };
  }
};

// GET dataset and taxonomy
router.get('/datasets', (req, res) => {
  const data = getDatasets();
  res.json({ success: true, ...data });
});

// GET saved checkpoints
router.get('/checkpoints', (req, res) => {
  const checkpoints = modelTrainer.getCheckpoints();
  res.json({ success: true, checkpoints });
});

// Run local model training pass
router.post('/run', optionalAuth, (req, res) => {
  const { epochs = 15, learningRate = 0.0005, batchSize = 4, targetTask = "all", customDataset = null } = req.body;

  const result = modelTrainer.runTraining({
    epochs: Math.min(100, Math.max(1, Number(epochs))),
    learningRate: Number(learningRate),
    batchSize: Number(batchSize),
    targetTask,
    customDataset
  });

  res.json(result);
});

// Save updated weights
router.post('/save-weights', optionalAuth, (req, res) => {
  const { modelWeights } = req.body;
  if (!modelWeights) {
    return res.status(400).json({ error: 'No weights provided.' });
  }

  const datasets = getDatasets();
  datasets.modelWeights = {
    ...datasets.modelWeights,
    ...modelWeights,
    lastUpdated: new Date().toISOString()
  };

  fs.writeFileSync(DATASETS_FILE, JSON.stringify(datasets, null, 2));
  res.json({ success: true, message: 'Model weights updated successfully.', modelWeights: datasets.modelWeights });
});

export default router;
