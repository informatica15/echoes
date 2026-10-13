export type WorldId = 'forest' | 'castle' | 'ember' | 'ocean';

export type EndingType = 'standard' | 'secret';

export type SceneType = 'exploration' | 'dialogue' | 'confrontation' | 'revelation' | 'ending';

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  iconName?: string;
  foundAtScene: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  worldId: WorldId;
  category?: 'clue' | 'lore' | 'memory';
  discoveredAt: string;
}

export interface ChoiceCondition {
  variable?: string;
  min?: number;
  max?: number;
  isTrue?: string;
  isFalse?: string;
  requiredItem?: string;
  tooltipIfLocked?: string;
}

export interface ChoiceConsequence {
  variables?: Record<string, number | boolean>;
  addItem?: InventoryItem;
  addClue?: JournalEntry;
  feedbackText?: string;
}

export interface Choice {
  id: string;
  text: string;
  subtext?: string;
  targetSceneId: string;
  condition?: ChoiceCondition;
  consequence?: ChoiceConsequence;
}

export interface DialogueLine {
  speaker: string;
  text: string;
  avatarIcon?: string;
}

export interface EndingMeta {
  endingId: string;
  title: string;
  type: EndingType;
  quote: string;
  summary: string;
  consequences: string[];
  loreReveal: string;
}

export interface Scene {
  id: string;
  worldId: WorldId;
  chapter: string;
  title: string;
  sceneType: SceneType;
  narration: string[];
  dialogue?: DialogueLine[];
  choices: Choice[];
  imagePrompt: string;
  artTheme: string;
  endingMeta?: EndingMeta;
}

export interface WorldConfig {
  id: WorldId;
  title: string;
  tagline: string;
  genre: string;
  synopsis: string;
  playTime: string;
  difficulty: 'Novice' | 'Moderate' | 'Demanding' | 'Master';
  endingsCount: number;
  initialSceneId: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    bgDark: string;
    borderGlow: string;
    gradient: string;
  };
  typography: {
    display: string;
    body: string;
  };
  audioMood: string;
}

export interface PlayerHistoryEntry {
  sceneId: string;
  sceneTitle: string;
  choiceId: string;
  choiceText: string;
  timestamp: number;
}

export interface UnlockedEnding {
  worldId: WorldId;
  endingId: string;
  title: string;
  type: EndingType;
  unlockedAt: number;
}

export interface GameSettings {
  volume: number; // 0 to 1
  muted: boolean;
  ambientSound: boolean;
  reducedMotion: boolean;
}

export interface GameSaveState {
  currentWorldId: WorldId | null;
  currentSceneId: string | null;
  variables: Record<string, number | boolean>;
  inventory: InventoryItem[];
  journal: JournalEntry[];
  visitedSceneIds: string[];
  history: PlayerHistoryEntry[];
  unlockedEndings: Record<string, UnlockedEnding>;
  settings: GameSettings;
  lastUpdated: number;
}
