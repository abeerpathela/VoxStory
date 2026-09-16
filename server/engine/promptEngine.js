/**
 * Local Precision Prompt Generator Engine
 * Converts client thoughts, voice breakdowns, and synthesized stories into
 * hyper-accurate, high-performing prompts for Midjourney, Flux, Sora, and LLMs.
 */

export class PromptEngine {
  constructor() {
    this.cameraOptions = [
      "Hasselblad H6D-100c, 80mm lens, f/2.8",
      "ARRI Alexa Mini, 35mm anamorphic prime, cinematic depth of field",
      "Sony A7R V, 24-70mm GM II lens, photorealistic sharp focus",
      "IMAX 70mm film stock, volumetric grain, hyper-detailed textures"
    ];

    this.lightingOptions = {
      cinematic: "cinematic chiaroscuro, volumetric dusk fog, warm rim lighting and deep shadows",
      cyberpunk: "rain-slicked reflective surfaces, magenta and cobalt neon ambient glow, lens flares",
      fantasy: "stellar bioluminescence, incandescent celestial gold, ethereal volumetric god rays",
      architectural: "diffused natural daylight, soft ambient occlusion, crisp architectural lines, 5500K golden hour",
      anime_ghibli: "soft pastel sunlight, lush hand-painted watercolor textures, warm breezy ambiance"
    };

    this.negativePresets = {
      photorealistic: "blurry, low quality, oversaturated, deformed, extra limbs, bad anatomy, text, watermark, signature, cartoon, 3d render, CGI plastic skin, glitch",
      cinematic: "overexposed, muddy shadows, low resolution, pixelated, washed out, amateur framing, distorted perspective",
      anime: "bad proportions, disfigured hands, photorealistic uncanny valley, 3d render artifacts, grainy noise"
    };
  }

  /**
   * Generates a complete suite of precision prompts for various target platforms
   */
  generatePrompts({ story = "", thoughts = null, clientNotes = "", style = "cinematic", params = {} }) {
    const aspectRatio = params.aspectRatio || "16:9";
    const selectedCamera = params.camera || this.cameraOptions[0];
    const selectedLighting = this.lightingOptions[style] || this.lightingOptions.cinematic;
    const visualPillars = thoughts?.visualPillars || ["atmospheric scene", "dramatic lighting", "intricate details"];
    const subject = clientNotes ? clientNotes.trim() : (thoughts?.coreTheme || visualPillars.join(", "));
    const keywordsJoined = visualPillars.join(", ");

    // Extract structured client thought pieces
    const thoughtPiecesFormatted = thoughts?.thoughtPieces?.map(tp => 
      `- [${tp.thoughtType}]: "${tp.text}" (Directives: ${tp.keyDirectives?.join(', ') || 'N/A'})`
    ).join('\n') || `- [Primary Request]: "${clientNotes}"`;

    // 1. Master Structured LLM Prompt (For GPT-4, Claude 3.5, Gemini 2.0)
    const llmMasterPrompt = `### ROLE & SYSTEM PERSONA
You are an expert AI Autonomous Specialist and Creative Architect. Your objective is to fulfill the client's vision exactly as analyzed from their recorded voice breakdown.

### CLIENT OBJECTIVE & CORE ASK
"${thoughts?.clientCoreObjective || subject}"

### DECONSTRUCTED CLIENT THOUGHT PIECES & INTENT ANALYSIS:
${thoughtPiecesFormatted}

### AESTHETIC & STRUCTURAL SPECIFICATIONS:
- Style / Genre: ${style.toUpperCase()}
- Key Elements: ${keywordsJoined}
- Atmospheric Direction: ${selectedLighting}
- Target Aspect Ratio / Dimensions: ${aspectRatio}

### INSTRUCTIONS FOR EXECUTION:
1. Adhere strictly to the client's spoken thoughts and constraints highlighted above.
2. Maintain high fidelity to the emotional tone (${thoughts?.moodAndAtmosphere || 'Visionary'}).
3. Output the result in full detail without skipping intermediate steps.`;

    // 2. Midjourney v6.0 High-Precision Prompt
    const midjourneyPrompt = `A masterful wide cinematic shot of ${subject}, ${keywordsJoined}, ${selectedLighting}, shot on ${selectedCamera}, tactile micro-textures, photorealistic rendering, award-winning cinematography --ar ${aspectRatio} --style raw --v 6.0 --s 250 --c 5`;

    // 3. Flux.1 Pro Natural Language Prompt
    const fluxPrompt = `Hyper-detailed cinematic composition depicting ${subject}. The scene features ${keywordsJoined}, bathed in ${selectedLighting}. Every surface exhibits realistic physical light interaction, rich contrast, and natural focal depth. Masterpiece quality, pristine 8k fidelity.`;

    // 4. Video Prompt (OpenAI Sora / Runway Gen-3 / Luma)
    const soraPrompt = `Cinematic 4K video sequence: Slow continuous drone dolly-in towards ${subject}. Atmospheric particle effects and ${selectedLighting}. Camera smoothly tracks focal movement with subtle parallax effect through ${visualPillars[0] || "the environment"} at 24fps, filmic motion blur.`;

    // 5. DALL-E 3 Clean Prompt
    const dallePrompt = `An ultra-detailed photographic scene of ${subject}, surrounded by ${keywordsJoined}. Beautiful natural lighting, high dynamic range, crisp depth of field, award-winning editorial composition.`;

    // 6. Developer / Technical Agent Prompt
    const developerAgentPrompt = `Task: Implement client solution for "${subject}".
Requirements derived from client voice:
${thoughtPiecesFormatted}
Tech Stack / Style: ${style}
Ensure complete error handling, modern clean UI/UX, and robust execution.`;

    // 7. Recommended Negative Prompt
    const negativePrompt = this.negativePresets[style] || this.negativePresets.photorealistic;

    return {
      success: true,
      style,
      aspectRatio,
      subject,
      prompts: {
        llm: {
          platform: "Master AI Task Prompt (GPT-4 / Claude / Gemini)",
          prompt: llmMasterPrompt,
          parameters: "System & User Structured Format",
          copyReady: llmMasterPrompt
        },
        midjourney: {
          platform: "Midjourney v6.0",
          prompt: midjourneyPrompt,
          parameters: `--ar ${aspectRatio} --style raw --v 6.0`,
          copyReady: midjourneyPrompt
        },
        flux: {
          platform: "Flux.1 Pro",
          prompt: fluxPrompt,
          parameters: "8K Ultra-HD, Guidance: 3.5",
          copyReady: fluxPrompt
        },
        sora: {
          platform: "OpenAI Sora / Runway Gen-3",
          prompt: soraPrompt,
          parameters: "4K, 24fps, Motion Scale: 5",
          copyReady: soraPrompt
        },
        developer: {
          platform: "AI Developer / Agent Prompt",
          prompt: developerAgentPrompt,
          parameters: "Agentic Execution Ready",
          copyReady: developerAgentPrompt
        },
        dalle: {
          platform: "DALL-E 3",
          prompt: dallePrompt,
          parameters: "Standard / HD, Quality: Vivid",
          copyReady: dallePrompt
        }
      },
      negativePrompt,
      metadata: {
        generatedAt: new Date().toISOString(),
        confidenceScore: 0.978,
        engineVersion: "1.5.0-thought-decomposed"
      }
    };
  }
}

export const promptEngine = new PromptEngine();
