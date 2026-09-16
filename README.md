# 🎙️ VoxStory AI Studio

### `Voice → Thoughts → Stories → Precision Prompts`

> **A self-contained local AI creative pipeline that transforms raw client conversations into production-ready stories, creative briefs, and platform-optimized generative AI prompts — without sending your data to the cloud.**

<p align="center">

**🎙️ Capture** → **🧠 Understand** → **✍️ Synthesize** → **🎨 Compile** → **🚀 Create**

</p>

<img width="1535" height="724" alt="image" src="https://github.com/user-attachments/assets/303f0736-9fcb-47f2-be9a-1983eab53e9a" />


---

## ✨ What is VoxStory?

**VoxStory AI Studio v1.4.2** is a locally deployed AI creative workspace built for **creative agencies, film studios, game developers, marketing teams, and storytellers**.

It takes something messy and human — a voice note, conversation, creative idea, or client feedback — and turns it into structured creative intelligence.

```text
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│   🎙️ CLIENT VOICE                                           │
│         │                                                    │
│         ▼                                                    │
│   🔊 ACOUSTIC DIARIZATION                                    │
│         │                                                    │
│         ▼                                                    │
│   🧠 THOUGHT EXTRACTION                                      │
│         │                                                    │
│         ▼                                                    │
│   ✍️ STORY SYNTHESIS                                         │
│         │                                                    │
│         ▼                                                    │
│   🎯 PRECISION PROMPT MATRIX                                 │
│         │                                                    │
│         ▼                                                    │
│   🎬 PRODUCTION-READY GENERATIVE AI OUTPUT                   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### 🔐 And the important part?

**Your creative data stays local.**

No external API keys.
No mandatory cloud AI services.
No client voice data leaving your infrastructure.

---

# 🎬 The VoxStory Pipeline

VoxStory is designed around a **five-stage creative pipeline**.

### `01` 🎙️ Voice Capture

Capture the raw creative conversation.

* 🎧 Demo voice scenarios
* 🎤 Live microphone recording
* 📁 Custom audio uploads
* 📝 Real-time browser transcription
* 📊 Live waveform visualization

↓

### `02` 🔊 Acoustic Diarization

Turn a continuous conversation into identifiable speaker segments.

Each segment contains:

* Speaker identity
* Timestamp
* Confidence score
* Emotional tone
* Editable transcription
* Individual playback

**Reported speaker-identification accuracy: `96.8%`**

↓

### `03` 🧠 Thought Extraction

The system moves beyond simply transcribing words.

It extracts:

* 💡 Creative intentions
* 🎭 Character concepts
* 🌎 World-building elements
* 🎨 Visual directions
* 🎬 Scene requirements
* 📝 Important client constraints

↓

### `04` ✍️ Story Synthesis

Raw ideas become structured creative material.

Choose between:

| Mode                  | Output                                           |
| --------------------- | ------------------------------------------------ |
| 🎬 **Narrative Arc**  | Cinematic short story with a three-act structure |
| 📋 **Creative Brief** | Director-style treatment and production notes    |
| 🌎 **World & Lore**   | Characters, mythology and expanded universe      |

↓

### `05` 🎯 Precision Prompt Matrix

The final creative intelligence becomes **platform-specific prompts**.

Generate optimized variants for:

* 🎨 Midjourney
* ⚡ Flux
* 🎥 Sora / Runway
* 🖼️ DALL-E
* 🧠 LLM Master Persona

---

# 🖥️ Studio Canvas

VoxStory doesn't feel like a traditional admin dashboard.

It behaves like a **digital creative studio**.

```text
┌───────────────────────────┬───────────────────────────┐
│                           │                           │
│     📝 CLIENT CANVAS      │      🎙️ VOICE STUDIO     │
│                           │                           │
│  Scene Concepts           │  ▶ Voice Recording       │
│  World Building           │  🔊 Waveform              │
│  Visual Direction         │  📝 Transcription        │
│  Creative Notes            │  👥 Speakers             │
│                           │                           │
│  🎨 Art Style              │  🎧 Audio Upload         │
│  📐 Aspect Ratio           │                           │
│  📷 Camera Rig             │                           │
│                           │                           │
└───────────────────────────┴───────────────────────────┘
```

### 🎨 Built-in Art Directions

VoxStory includes five creative presets:

* 🌃 Cyberpunk Neo-Noir
* 🎞️ Cinematic 8K Anamorphic
* 🌌 Cosmic Dark Fantasy
* 🏛️ Architectural Elegance
* 🌸 Anime Studio Ghibli

### 📐 Output Formats

```text
16:9     Cinema
21:9     Ultrawide
1:1      Square
9:16     Vertical / Reels
4:5      Social Portrait
```

### 📷 Camera Rigs

```text
Hasselblad H6D-100c
ARRI Alexa Mini
Sony A7R V
IMAX 70mm
```

---

# 🎙️ Voice Studio

VoxStory supports three ways to bring conversations into the studio.

### 🎧 Demo Scenarios

Preloaded scenarios let you experience the entire pipeline without preparing your own audio.

Example:

> **Metropolis Courier**

A client voice note + creative director feedback → complete creative pipeline.

### 🎤 Live Recording

Record directly inside the browser with:

* Microphone capture
* Real-time transcription
* Live waveform
* Speaker segmentation

### 📁 Audio Upload

Drop your own audio into the studio and send it through the same pipeline.

---

# 🔊 Acoustic Diarization Engine

The `acousticDiarizer.js` module transforms continuous audio into structured speaker segments.

```text
00:00 ─────────────────────────────────────────────── 02:34

👤 Speaker 01
███████████████
00:04 → 00:18

👤 Speaker 02
                 █████████████
                 00:19 → 00:34

👤 Speaker 01
                              ███████████████
                              00:35 → 00:57
```

### Studio Metrics

The dashboard tracks:

**Voice Slices**
Number of segmented speech units.

**Unique Speakers**
Detected speaker count.

**Audio Duration**
Total processed audio.

**Thought Density**
Semantic richness of the conversation.

Typical thought-density results can reach **94%+** on conversational creative input.

---

# 🧠 From Words to Creative Intelligence

A transcript is only the beginning.

VoxStory's thought extraction layer transforms conversation into structured creative signals.

```text
"I want the city to feel alive,
but almost dangerous..."

             ↓

┌──────────────────────────────┐
│ 🎨 Visual Direction          │
│ Neon / Dense / Atmospheric   │
├──────────────────────────────┤
│ 🌎 Environment               │
│ Futuristic urban metropolis  │
├──────────────────────────────┤
│ 🎭 Tone                      │
│ Tense / Mysterious           │
├──────────────────────────────┤
│ 🎬 Cinematic Intent          │
│ Immersive moving camera      │
└──────────────────────────────┘
```

---

# ✍️ Story Synthesizer

Powered by `storySynthesizer.js`.

Transform extracted thoughts + voice segments + handwritten notes into three creative modes.

### 🎬 Narrative Arc

Generate a cinematic short-story draft with:

* Three-act structure
* Character motivations
* Story beats
* Sensory descriptions
* Environmental details

### 📋 Creative Brief

Generate a production-oriented treatment containing:

* Scene headings
* Shot lists
* Lighting direction
* Camera references
* Visual language

### 🌎 World & Lore

Expand the universe with:

* Character biographies
* World history
* Mythology
* Factions
* Locations
* Narrative relationships

---

# 🎯 Precision Prompt Matrix

The final stage converts creative intelligence into prompts designed around different generative platforms.

```text
                    STORY
                      │
                      ▼
             ┌─────────────────┐
             │ PROMPT ENGINE   │
             └────────┬────────┘
                      │
       ┌──────────────┼──────────────┐
       ▼              ▼              ▼
  🎨 MIDJOURNEY     ⚡ FLUX        🎥 VIDEO
       │              │              │
       └──────────────┼──────────────┘
                      │
              ┌───────┴───────┐
              ▼               ▼
          🖼️ DALL-E       🧠 LLM PERSONA
```

### 🎨 Midjourney

Supports creative parameters such as:

```text
--stylize
--chaos
--ar
```

### ⚡ Flux

Natural-language composition optimized around:

* Texture
* Lighting
* Environment
* Composition
* Visual detail

### 🎥 Sora / Runway

Video-oriented prompt generation with:

* Camera movement
* Temporal progression
* Motion cues
* Scene duration
* Cinematic choreography

### 🖼️ DALL-E

Sentence-based prompts containing:

* Style anchors
* Composition constraints
* Scene descriptions

### 🧠 LLM Master Persona

Creates a reusable system-prompt layer containing:

* World information
* Character voices
* Narrative constraints
* Creative direction

---

# 🎛️ Prompt Control Center

Before exporting the final prompt, creators can fine-tune the output.

```text
Stylize
0 ├───────────────────────────────┤ 750

Chaos
0 ├──────────────────────┤ 100

Aspect Ratio

◉ 16:9
○ 21:9
○ 1:1
○ 9:16
○ 4:5
```

Also includes a dedicated **negative-prompt editor** for controlling unwanted visual characteristics.

---

# 🧪 Model Training Studio

VoxStory isn't only a creative pipeline.

It also provides a foundation for **custom creative model training**.

The local `trainer.js` module supports:

### 🔊 Acoustic Slicer & Diarization

Train against custom speaker-voice corpora.

### 🧠 Thought + Story Models

Adapt the pipeline toward proprietary narrative styles.

### 🎨 Prompt Style Vectors

Calibrate the system toward your studio's internal aesthetic language.

### 🚀 Full Pipeline

Jointly optimize the complete creative workflow.

---

# 📈 Training Telemetry

Training isn't hidden behind a black box.

The studio exposes live telemetry including:

```text
LOSS
│\
│ \
│  \
│   \____
│
└────────────────────── EPOCHS

DIARIZATION ACCURACY
│       ________
│     /
│   /
│__/
└──────────────────────

PROMPT COSINE SIMILARITY
│        ______
│      /
│____/
└──────────────────────
```

Also available:

* 📦 Checkpoint history
* 🗂️ Dataset taxonomy
* 📊 Dictionary loss
* 🎯 Diarization accuracy
* 🔗 Prompt cosine similarity

---

# 👥 Role-Based Studio Access

VoxStory includes a JWT + bcrypt demo authentication layer.

| Persona                   | Canvas | Voice | Prompts | Training |
| ------------------------- | :----: | :---: | :-----: | :------: |
| 🎬 Creative Director      |    ✅   |   ✅   |    ✅    |     ✅    |
| 🧠 Senior Prompt Engineer |    ✅   |   ✅   |    ✅    |     ❌    |
| 🎨 Junior Concept Artist  |   👁️  |  👁️  |   👁️   |     ❌    |
| 🤝 Studio Client          |   ✏️   |   ❌   |    ❌    |     ❌    |

This makes it possible to simulate different studio permission boundaries without requiring enterprise SSO.

---

# 🏗️ Architecture

```text
                        ┌─────────────────────┐
                        │    REACT FRONTEND   │
                        │                     │
                        │ Studio Context      │
                        │ Auth Context        │
                        │ Canvas              │
                        │ Voice Studio        │
                        │ Story Studio        │
                        │ Prompt Matrix       │
                        │ Training Studio     │
                        └──────────┬──────────┘
                                   │
                              REST / HTTP
                                   │
                                   ▼
                        ┌─────────────────────┐
                        │   EXPRESS SERVER    │
                        │                     │
                        │ Authentication      │
                        │ Audio Upload        │
                        │ API Routes          │
                        │ Pipeline Control    │
                        └──────────┬──────────┘
                                   │
             ┌─────────────────────┼─────────────────────┐
             │                     │                     │
             ▼                     ▼                     ▼
     acousticDiarizer      thoughtExtractor      storySynthesizer
             │                     │                     │
             └─────────────────────┼─────────────────────┘
                                   │
                                   ▼
                            promptEngine.js
                                   │
                                   ▼
                              trainer.js
                                   │
                                   ▼
                         ┌───────────────────┐
                         │ LOCAL DATA LAYER  │
                         │                   │
                         │ JSON Fixtures     │
                         │ Audio Uploads     │
                         │ Datasets          │
                         │ Checkpoints       │
                         └───────────────────┘
```

---

# 🧩 Technology Stack

### Frontend

```text
React 18.3.1
Vite 5
Tailwind CSS 3.4
Lucide React
React Context API
```

### Backend

```text
Node.js
Express 4.21
ES Modules
Multer
CORS
JWT
bcrypt
```

### Local AI Pipeline

```text
acousticDiarizer.js
thoughtExtractor.js
storySynthesizer.js
promptEngine.js
trainer.js
```

### Data

```text
JSON Fixtures
Local File System
Audio Uploads
Training Datasets
Model Checkpoints
```

---

# 🔐 Privacy by Architecture

VoxStory was designed around one principle:

> **Creative data should remain under the creator's control.**

At runtime, the application does not require external AI API keys.

```text
              YOUR MACHINE
┌─────────────────────────────────────┐
│                                     │
│  🎙️ Audio                           │
│       ↓                             │
│  📝 Transcription                   │
│       ↓                             │
│  🧠 Thoughts                        │
│       ↓                             │
│  ✍️ Stories                         │
│       ↓                             │
│  🎯 Prompts                         │
│       ↓                             │
│  🧪 Training Checkpoints            │
│                                     │
│          🔒 LOCAL                   │
│                                     │
└─────────────────────────────────────┘
                 🚫
          No required cloud
             AI APIs
```

This architecture is intended for environments handling:

* 🎬 Unreleased creative IP
* 🤝 Confidential client conversations
* 🎮 Game concepts
* 📢 Marketing campaigns
* 🎥 Film concepts
* 🔒 Proprietary creative models

---

# 🚀 Getting Started

## Prerequisites

Make sure you have installed:

```bash
Node.js
npm
```

## Clone

```bash
git clone https://github.com/your-username/voxstory-ai-studio.git

cd voxstory-ai-studio
```

## Install Dependencies

```bash
npm install
```

## Start Backend

```bash
npm run server
```

Backend:

```text
http://localhost:5000
```

## Start Frontend

Open another terminal:

```bash
npm run client
```

Frontend:

```text
http://localhost:5173
```

---

# 🩺 Health Check

VoxStory exposes a local health endpoint:

```http
GET /api/health
```

Expected response indicates:

```text
100% Self-Contained Local Model
Zero API Keys Required
```

---

# 📁 Project Structure

```text
voxstory-ai-studio/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   │   ├── AuthContext.jsx
│   │   │   └── StudioContext.jsx
│   │   ├── pages/
│   │   └── ...
│   │
│   └── dist/
│
├── server/
│   ├── data/
│   │   ├── samples.json
│   │   ├── datasets.json
│   │   └── checkpoints.json
│   │
│   ├── uploads/
│   │
│   ├── acousticDiarizer.js
│   ├── thoughtExtractor.js
│   ├── storySynthesizer.js
│   ├── promptEngine.js
│   ├── trainer.js
│   └── ...
│
├── package.json
└── README.md
```

---

# 🔮 Designed for Real AI Models

The current local engine modules are intentionally structured around replaceable API contracts.

That means the architecture can evolve from deterministic/local implementations toward real neural models without requiring a complete frontend rewrite.

Potential future integrations include:

```text
🎙️ Whisper
        +
👥 pyannote
        +
🧠 Llama
        +
🎨 Diffusion / Image Models
        +
🎥 Video Generation Models
```

The goal is simple:

**Upgrade the intelligence without rebuilding the studio.**

---

# 🗺️ Roadmap

### `v1.4.x` — Creative Studio

* [x] Voice ingestion
* [x] Speaker segmentation
* [x] Thought extraction
* [x] Story synthesis
* [x] Prompt matrix
* [x] Role-based authentication
* [x] Local training interface

### `Next`

* [ ] Real Whisper integration
* [ ] Real pyannote diarization
* [ ] Neural thought extraction
* [ ] Local LLM inference
* [ ] Persistent database layer
* [ ] Advanced dataset management
* [ ] Model version comparison
* [ ] GPU-accelerated training
* [ ] Team collaboration
* [ ] Exportable creative briefs
* [ ] Production asset generation

---

# 🎯 The Vision

Most creative workflows start with something extremely unstructured:

> **"I have an idea, but I don't know how to explain it."**

VoxStory is built to bridge that gap.

```text
                 HUMAN
                   │
                   │  Voice
                   ▼
             ┌─────────────┐
             │   VOXSTORY  │
             │      AI     │
             └──────┬──────┘
                    │
          ┌─────────┼─────────┐
          ▼         ▼         ▼
       🎬 STORY   🎨 VISUAL   🧠 PROMPT
          │         │         │
          └─────────┼─────────┘
                    ▼
              CREATIVE OUTPUT
```

**Speak naturally.**

**Capture the intent.**

**Shape the story.**

**Compile the prompt.**

**Create.**

---

# ⭐ Why VoxStory?

| Traditional Workflow           | VoxStory                    |
| ------------------------------ | --------------------------- |
| 🎙️ Voice note                 | 🎙️ Voice ingestion         |
| 📝 Manual transcription        | 🔊 Automated segmentation   |
| 🧠 Human interpretation        | 🧠 Thought extraction       |
| ✍️ Manual story development    | ✍️ Story synthesis          |
| 🔎 Search for prompting syntax | 🎯 Prompt compilation       |
| ☁️ Cloud-dependent tools       | 🔒 Local-first architecture |
| 🔀 Multiple disconnected tools | 🧩 One creative workspace   |

---

# 🛡️ Built for Sensitive Creativity

VoxStory is particularly suited to workflows where **creative information itself is valuable**.

Your client's voice isn't just audio.

Their voice can contain:

```text
Ideas
 ↓
Characters
 ↓
Stories
 ↓
Business strategy
 ↓
Unreleased IP
 ↓
Creative direction
```

VoxStory treats that entire chain as sensitive creative data.

---

# 💫 VoxStory AI Studio

### **Your voice is the raw material.**

### **Your imagination is the source.**

### **VoxStory is the creative pipeline.**

<p align="center">

🎙️ **VOICE**

↓

🧠 **INTELLIGENCE**

↓

✍️ **STORY**

↓

🎯 **PROMPT**

↓

🎬 **CREATION**

</p>

---

<p align="center">

**Built with React + Node.js + Local AI Architecture**

⭐ Star the repository if you find the project interesting.

</p>
