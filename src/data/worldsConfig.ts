import { WorldConfig } from '../types/story';

export const WORLDS_CONFIG: Record<string, WorldConfig> = {
  forest: {
    id: 'forest',
    title: 'The Forest of Forgotten Names',
    tagline: 'The trees whisper in a language you almost understand.',
    genre: 'Psychological Fantasy & Mystery',
    synopsis: 'Awakening under an ancient emerald canopy with your name carved into a tree a century in the future, you hold a silver key that unlocks memories that were never yours to lose.',
    playTime: '15-25 min',
    difficulty: 'Moderate',
    endingsCount: 4,
    initialSceneId: 'forest_start',
    colors: {
      primary: '#10b981', // Emerald
      secondary: '#064e3b',
      accent: '#22d3ee', // Cyan
      bgDark: '#05130f',
      borderGlow: 'rgba(16, 185, 129, 0.4)',
      gradient: 'from-emerald-950 via-slate-950 to-black',
    },
    typography: {
      display: '"Cormorant Garamond", serif',
      body: '"Inter", sans-serif',
    },
    audioMood: 'Mystical breeze, rustling leaves, distant spectral whispers, crystal chimes',
  },

  castle: {
    id: 'castle',
    title: 'The Castle That Remembers',
    tagline: 'The kingdom remembers a war that never happened.',
    genre: 'Historical Fantasy & Time Intrigue',
    synopsis: 'Carrying a letter to a dead monarch written in your own handwriting, you step into a cliffside fortress where portraits bear your face across centuries of rewritten history.',
    playTime: '20-30 min',
    difficulty: 'Demanding',
    endingsCount: 4,
    initialSceneId: 'castle_start',
    colors: {
      primary: '#f59e0b', // Antique gold
      secondary: '#881337', // Burgundy
      accent: '#fef3c7', // Warm ivory
      bgDark: '#12070b',
      borderGlow: 'rgba(245, 158, 11, 0.4)',
      gradient: 'from-amber-950 via-rose-950 to-black',
    },
    typography: {
      display: '"Cinzel", serif',
      body: '"Source Sans 3", sans-serif',
    },
    audioMood: 'Cold stone corridors, distant cathedral bells, wind over mountain parapets',
  },

  ember: {
    id: 'ember',
    title: 'The Last Ember',
    tagline: 'What would you surrender to keep the world alive?',
    genre: 'Post-Apocalyptic Moral Fantasy',
    synopsis: 'In an ash-choked kingdom freezing despite towering volcanic spires, you carry the final living ember—a cosmic spark that consumes human memories to ward off eternal frost.',
    playTime: '15-25 min',
    difficulty: 'Demanding',
    endingsCount: 4,
    initialSceneId: 'ember_start',
    colors: {
      primary: '#f97316', // Ember orange
      secondary: '#991b1b', // Molten crimson
      accent: '#fbbf24', // Molten gold
      bgDark: '#120805',
      borderGlow: 'rgba(249, 115, 22, 0.4)',
      gradient: 'from-orange-950 via-red-950 to-black',
    },
    typography: {
      display: '"Rajdhani", sans-serif',
      body: '"Manrope", sans-serif',
    },
    audioMood: 'Low volcanic rumble, crackling coals, harsh wind, deep rhythmic anvil pulse',
  },

  ocean: {
    id: 'ocean',
    title: 'The Ocean Beneath the Ocean',
    tagline: 'Do not open the seventh door.',
    genre: 'Underwater Sci-Fi & Psychological Mystery',
    synopsis: 'Eleven thousand meters down, an uncharted seabed city hums with alien geometry. Your radio crackles with your own voice broadcasting 300 years in the future.',
    playTime: '20-30 min',
    difficulty: 'Master',
    endingsCount: 4,
    initialSceneId: 'ocean_start',
    colors: {
      primary: '#06b6d4', // Turquoise
      secondary: '#1e1b4b', // Deep indigo
      accent: '#c084fc', // Violet
      bgDark: '#030816',
      borderGlow: 'rgba(6, 182, 212, 0.4)',
      gradient: 'from-cyan-950 via-indigo-950 to-black',
    },
    typography: {
      display: '"Space Grotesk", sans-serif',
      body: '"Inter", sans-serif',
    },
    audioMood: 'Hydrophone resonance, deep pressure rumble, distant sonar clicks, ethereal synth wave',
  },
};
