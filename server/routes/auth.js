import express from 'express';
import bcrypt from 'bcryptjs';
import { generateToken, requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Mock in-memory user registry with rich demo personas
const USERS_DB = [
  {
    id: "usr_maya",
    name: "Maya Chen",
    email: "maya.client@voxstory.ai",
    role: "Executive Client Visionary",
    passwordHash: bcrypt.hashSync("voxstory2026", 8),
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    bio: "Passionate about immersive worldbuilding, cinematic aesthetics, and futuristic architecture.",
    createdAt: new Date().toISOString()
  },
  {
    id: "usr_dax",
    name: "Dax Romero",
    email: "dax.art@voxstory.ai",
    role: "Lead Art Director & Prompt Architect",
    passwordHash: bcrypt.hashSync("voxstory2026", 8),
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    bio: "Specializing in camera lenses, lighting rigs, Midjourney v6 parameters, and visual storytelling.",
    createdAt: new Date().toISOString()
  },
  {
    id: "usr_elena",
    name: "Elena Vance",
    email: "elena.game@voxstory.ai",
    role: "Narrative & Worldbuilding Lead",
    passwordHash: bcrypt.hashSync("voxstory2026", 8),
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    bio: "Crafting deep lore, character arcs, and multi-speaker narrative synthesis.",
    createdAt: new Date().toISOString()
  }
];

// Quick Demo Personas (1-click login)
router.get('/personas', (req, res) => {
  const personas = USERS_DB.map(({ passwordHash, ...user }) => user);
  res.json({ success: true, personas });
});

// Demo 1-Click Login
router.post('/demo-login', (req, res) => {
  const { personaId } = req.body;
  const user = USERS_DB.find(u => u.id === personaId) || USERS_DB[0];
  const token = generateToken(user);
  
  const { passwordHash, ...userProfile } = user;
  res.json({
    success: true,
    message: `Logged in as ${user.name} (${user.role})`,
    token,
    user: userProfile
  });
});

// User Registration
router.post('/register', async (req, res) => {
  const { name, email, password, role = "Creative Client" } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Please provide name, email, and password.' });
  }

  const existing = USERS_DB.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ error: 'An account with this email already exists.' });
  }

  const newUser = {
    id: `usr_${Date.now()}`,
    name,
    email: email.toLowerCase(),
    role,
    passwordHash: await bcrypt.hash(password, 8),
    avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
    bio: "Creative creator exploring voice-to-story & precision prompt generation.",
    createdAt: new Date().toISOString()
  };

  USERS_DB.push(newUser);
  const token = generateToken(newUser);
  const { passwordHash, ...userProfile } = newUser;

  res.status(201).json({
    success: true,
    message: 'Account created successfully!',
    token,
    user: userProfile
  });
});

// User Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide email and password.' });
  }

  const user = USERS_DB.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  const validPassword = await bcrypt.compare(password, user.passwordHash);
  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  const token = generateToken(user);
  const { passwordHash, ...userProfile } = user;

  res.json({
    success: true,
    message: 'Welcome back!',
    token,
    user: userProfile
  });
});

// Current User Profile
router.get('/me', requireAuth, (req, res) => {
  const user = USERS_DB.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  const { passwordHash, ...userProfile } = user;
  res.json({ success: true, user: userProfile });
});

export default router;
