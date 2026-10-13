# ECHOES: Every Choice Leaves a Trace

> **A Cinematic Choice-Driven Story Game**  
> *"One world. A thousand possibilities. Every choice leaves a trace."*  
> *"You are not here to watch a story. You are here to change it."*

---

## 🌟 Overview

**ECHOES** is a branching narrative game built with React 19, TypeScript, Tailwind CSS, and Web Audio API. Players enter four fictional realms, making consequential decisions with immediate and delayed ripple effects, collecting clues and relics, and discovering 16 endings (including hidden secret endings unlocked only through specific decisions and discoveries).

---

## 🗺️ The Four Story Worlds

| World | Genre | Visual Identity | Typography | Endings |
|---|---|---|---|---|
| **The Forest of Forgotten Names** | Psychological Fantasy, Mystery, Survival | Emerald mist, glowing cyan runes, mossy shrines, silver moonlight | *Cormorant Garamond* / *Inter* | 4 (1 Secret) |
| **The Castle That Remembers** | Historical Fantasy, Time Intrigue, Political Mystery | Burgundy, antique gold, stone grey, autumn maple leaves, catacombs | *Cinzel* / *Source Sans 3* | 4 (1 Secret) |
| **The Last Ember** | Post-Apocalyptic Fantasy, Moral Dilemmas | Molten orange, black basalt, ash storms, crystal caverns | *Rajdhani* / *Manrope* | 4 (1 Secret) |
| **The Ocean Beneath the Ocean** | Underwater Sci-Fi, Psychological Mystery | Deep indigo, turquoise, bioluminescent corals, Hadal trench | *Space Grotesk* / *Inter* | 4 (1 Secret) |

---

## 🎮 Core Features & Mechanics

1. **Genuine Decision Tree Engine**:
   - 48 fully written scenes across 4 worlds.
   - Non-linear branching: exploration, dialogue, revelation, confrontation, and endings.
   - Dynamic condition evaluation: choices check inventory items (e.g. `silver_key`, `trinity_seals`), numerical attributes (`courage`, `empathy`, `curiosity`), and historical flags.

2. **16 Reachable Cinematic Endings**:
   - 4 distinct endings per world.
   - Secret Endings require multi-step conditions:
     - *The Secret Root* (Forest): requires Silver Key, Runic Cipher, and trusting the Warden.
     - *The Eternal Witness* (Castle): requires collecting the Trinity of Sovereign Seals across timelines.
     - *The Ember Within* (Ember): requires discovering the Prismatic Core and refusing to sacrifice human memories.
     - *The Deepest Echo* (Ocean): requires the Acoustic Node, decrypted station logs, and resolving the 300-year loop.

3. **Interactive Story Map (Decision Lattice)**:
   - Dynamic SVG visualizer showing visited paths, current location, unlocked endings, and locked branches.
   - Clickable nodes with memory recaps of past scenes and decisions.

4. **Chronicle & Archives (Journal)**:
   - Discovered Clues & Lore.
   - Relics & Inventory.
   - Complete decision history trail.
   - Ending Vault tracking all discovered fates.

5. **Multi-Voice Cinematic Soundtrack Synthesizer**:
   - Built with Web Audio API and `DynamicsCompressorNode` for loud, distortion-free cinematic warmth.
   - Tailored multi-track soundtrack chord progressions:
     - **Title Nexus**: Fm9 - Dbmaj7 - Bbm7 - C7 with celestial pads and high crystal celesta.
     - **The Forest of Forgotten Names**: Dm9 - Bbmaj7 - Gm7 - Asus4 lush string pads, wooden flute arpeggios, and breeze.
     - **The Castle That Remembers**: Cm7 - Abmaj7 - Fm7 - G7 regal organ/brass drone, slow minor chords, and cathedral bells.
     - **The Last Ember**: Em7 - Cmaj7 - D - Bm heavy analog saw filter sweeps, volcanic rumble, anvil pulse, and crackling fire.
     - **The Ocean Beneath the Ocean**: Am9 - Fmaj7 - Dm9 - Em7 aquatic resonant pads, sub-bass swell, and abyssal sonar pings.
   - Interactive Volume Controls: hover/click popover slider (0% to 100%), Quick Presets (Mute, 40%, 75%, Max), and auto-start upon user interaction.

6. **Persistent Progress**:
   - Automatic localStorage saves on every decision.
   - Continue saved journey, restart current world, or replay completed worlds.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ or v20+)
- npm

### Installation & Run

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
# Open http://localhost:5173/ in your browser

# 3. Run automated acceptance tests
npm test

# 4. Validate story graph reachability
npm run validate

# 5. Production build
npm run build
```

---

## 📋 Story Schema Specification

Each scene conforms to the following TypeScript interface:

```typescript
export interface Scene {
  id: string;                         // Unique scene identifier
  worldId: 'forest' | 'castle' | 'ember' | 'ocean';
  chapter: string;                    // Act / Chapter header
  title: string;                      // Scene name
  sceneType: 'exploration' | 'dialogue' | 'confrontation' | 'revelation' | 'ending';
  narration: string[];                // Narrative prose paragraphs
  dialogue?: Array<{ speaker: string; text: string }>;
  choices: Choice[];                  // 2-4 meaningful decisions
  imagePrompt: string;                // Detailed 16:9 art generation prompt
  artTheme: string;                   // Procedural visual art motif
  endingMeta?: {                      // Defined only on ending scenes
    endingId: string;
    title: string;
    type: 'standard' | 'secret';
    quote: string;
    summary: string;
    consequences: string[];
    loreReveal: string;
  };
}
```

---

## 🎨 Asset Manifest & Generation Pipeline

Scene generation prompts and metadata are recorded in `public/assets-manifest.json`.  
To regenerate the manifest:

```bash
node scripts/generate-art-manifest.mjs
```

---

## 🧪 Acceptance Test Results

All 29 automated tests pass with 0 errors:
- ✅ 4 Story worlds registered.
- ✅ 48 Scenes with zero dead-ends or unreferenced targets.
- ✅ All 16 Endings reachable under documented conditions.
- ✅ Condition evaluation (items, numerical thresholds, boolean flags).
- ✅ State mutation and consequence persistence.
- ✅ Local storage resilience.
