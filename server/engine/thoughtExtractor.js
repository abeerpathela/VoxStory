/**
 * Local Thought & Semantic Intent Extractor Engine
 * Parses raw voice pieces, client written notes, and multi-speaker dialogues
 * into structured visual intentions, emotional tones, and aesthetic pillars.
 */

export class ThoughtExtractor {
  constructor() {
    this.lightingLexicon = [
      "cinematic lighting", "volumetric fog", "god rays", "neon glow", "golden hour",
      "twilight", "dusk", "bioluminescent", "soft diffused", "dramatic shadows",
      "subsurface scattering", "chiaroscuro", "solar flares", "ambient occlusion"
    ];

    this.compositionLexicon = [
      "wide shot", "macro lens", "heroic low angle", "85mm portrait", "aerial drone view",
      "isometric", "hyper-detailed", "symmetry", "depth of field", "vanishing point",
      "sweeping panoramic", "rule of thirds"
    ];

    this.emotionLexicon = {
      excited: ["thrilled", "epic", "huge", "insane", "love that", "massive", "glowing", "bursting", "pouring"],
      contemplative: ["solitary", "quiet", "serene", "melancholy", "drifting", "zen", "meditating", "distant"],
      intense: ["roaring", "clashing", "fiery", "dark", "heavy", "powerful", "thunderous", "striking"],
      harmonious: ["lush", "peaceful", "organic", "green", "woven", "crystal", "flowing", "sustainable"]
    };
  }

  /**
   * Deep analysis of a voice piece to determine what the client is asking for
   */
  analyzeSegment(text, index = 0) {
    const lower = text.toLowerCase();
    const words = lower.replace(/[^\w\s]/g, '').split(/\s+/).filter(Boolean);
    
    // Categorize what this specific voice piece represents in the client's thought process
    let thoughtType = "Creative Detail";
    let intentRole = "Aesthetic / Visual Texture";

    if (index === 0 || lower.includes("want") || lower.includes("build") || lower.includes("create") || lower.includes("need") || lower.includes("generate") || lower.includes("make")) {
      thoughtType = "Primary Client Objective & Goal";
      intentRole = "Direct Instruction for AI";
    } else if (lower.includes("lighting") || lower.includes("color") || lower.includes("mood") || lower.includes("feel") || lower.includes("atmosphere") || lower.includes("rain") || lower.includes("neon") || lower.includes("dark")) {
      thoughtType = "Atmosphere & Tone Constraint";
      intentRole = "Style & Environmental Anchor";
    } else if (lower.includes("character") || lower.includes("person") || lower.includes("courier") || lower.includes("monk") || lower.includes("building") || lower.includes("vehicle") || lower.includes("structure")) {
      thoughtType = "Focal Subject & Entity";
      intentRole = "Key Element for AI Focus";
    } else if (lower.includes("should") || lower.includes("must") || lower.includes("ensure") || lower.includes("add") || lower.includes("include") || lower.includes("like")) {
      thoughtType = "Specific Requirement / Modification";
      intentRole = "Critical Specification";
    }

    // Detect emotional sentiment
    let detectedSentiment = "Visionary & Creative";
    let maxEmotionHits = 0;
    
    for (const [emotion, triggers] of Object.entries(this.emotionLexicon)) {
      const hits = triggers.filter(t => lower.includes(t)).length;
      if (hits > maxEmotionHits) {
        maxEmotionHits = hits;
        detectedSentiment = emotion.charAt(0).toUpperCase() + emotion.slice(1);
      }
    }

    // Extract significant keywords
    const stopWords = new Set(["the", "and", "a", "an", "in", "on", "at", "to", "for", "with", "is", "it", "this", "that", "we", "i", "want", "let", "us", "be", "of", "should", "our", "all", "you", "they", "need", "like", "so"]);
    const extractedKeywords = words
      .filter(w => w.length > 3 && !stopWords.has(w))
      .slice(0, 5)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1));

    return {
      thoughtType,
      intentRole,
      sentiment: detectedSentiment,
      detectedLighting: this.lightingLexicon.filter(item => lower.includes(item.toLowerCase())),
      detectedComposition: this.compositionLexicon.filter(item => lower.includes(item.toLowerCase())),
      visualKeywords: extractedKeywords.length > 0 ? extractedKeywords : ["Key Detail", "Atmosphere"],
      clientIntentSummary: `Client specifies: "${text.slice(0, 80)}${text.length > 80 ? '...' : ''}"`,
      thoughtDensityScore: Math.min(0.99, 0.70 + (words.length * 0.015))
    };
  }

  /**
   * Aggregates all voice slices + client written canvas notes into unified thought synthesis
   */
  synthesizeAllThoughts({ segments = [], clientNotes = "", selectedStyle = "cinematic" }) {
    const combinedText = `${clientNotes} ${segments.map(s => s.text).join(" ")}`.trim();
    const allKeywords = new Set();
    const thoughtPieces = [];
    const clientActionRequirements = [];

    segments.forEach((seg, idx) => {
      const analysis = this.analyzeSegment(seg.text, idx);
      seg.thoughtAnalysis = analysis;
      analysis.visualKeywords.forEach(k => allKeywords.add(k));

      thoughtPieces.push({
        pieceNumber: idx + 1,
        speaker: seg.speakerName,
        thoughtType: analysis.thoughtType,
        intentRole: analysis.intentRole,
        text: seg.text,
        keyDirectives: analysis.visualKeywords
      });

      clientActionRequirements.push(`${analysis.thoughtType}: "${seg.text}"`);
    });

    // Detect overarching theme and primary client ask
    const themeCandidates = Array.from(allKeywords);
    const corePillars = themeCandidates.slice(0, 6);

    const clientObjective = segments.length > 0 
      ? segments[0].text 
      : (clientNotes || "Generate high fidelity cinematic creative output.");

    return {
      clientCoreObjective: clientObjective,
      coreTheme: clientNotes.length > 10 ? clientNotes.slice(0, 60) + "..." : (themeCandidates.slice(0, 3).join(" & ") || "Dynamic Visionary Concept"),
      moodAndAtmosphere: segments.length > 0 ? segments[0].thoughtAnalysis?.sentiment || "Atmospheric & Visionary" : "Cinematic Vision",
      visualPillars: corePillars.length > 0 ? corePillars : ["Atmospheric Depth", "High Detail", "Dynamic Lighting"],
      thoughtPieces,
      clientActionRequirements,
      rawCombinedText: combinedText
    };
  }
}

export const thoughtExtractor = new ThoughtExtractor();
