import {
  GameSaveState,
  WorldId,
  Choice,
  UnlockedEnding,
  InventoryItem,
  JournalEntry,
} from '../types/story';
import { WORLDS_CONFIG } from '../data/worldsConfig';

const STORAGE_KEY = 'echoes_save_v1';

export const DEFAULT_INITIAL_STATE: GameSaveState = {
  currentWorldId: null,
  currentSceneId: null,
  variables: {},
  inventory: [],
  journal: [],
  visitedSceneIds: [],
  history: [],
  unlockedEndings: {},
  settings: {
    volume: 0.6,
    muted: false,
    ambientSound: true,
    reducedMotion: false,
  },
  lastUpdated: Date.now(),
};

export function loadSavedGame(): GameSaveState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_INITIAL_STATE;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return DEFAULT_INITIAL_STATE;

    return {
      currentWorldId: parsed.currentWorldId || null,
      currentSceneId: parsed.currentSceneId || null,
      variables: parsed.variables || {},
      inventory: Array.isArray(parsed.inventory) ? parsed.inventory : [],
      journal: Array.isArray(parsed.journal) ? parsed.journal : [],
      visitedSceneIds: Array.isArray(parsed.visitedSceneIds) ? parsed.visitedSceneIds : [],
      history: Array.isArray(parsed.history) ? parsed.history : [],
      unlockedEndings: parsed.unlockedEndings || {},
      settings: {
        ...DEFAULT_INITIAL_STATE.settings,
        ...(parsed.settings || {}),
      },
      lastUpdated: parsed.lastUpdated || Date.now(),
    };
  } catch (err) {
    console.error('Failed to load saved state, using default:', err);
    return DEFAULT_INITIAL_STATE;
  }
}

export function saveGameState(state: GameSaveState): void {
  try {
    if (typeof localStorage === 'undefined') return;
    const updated = {
      ...state,
      lastUpdated: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save state to localStorage:', err);
  }
}

export function evaluateChoiceCondition(
  choice: Choice,
  state: GameSaveState
): { isAvailable: boolean; reason?: string } {
  const cond = choice.condition;
  if (!cond) return { isAvailable: true };

  // Check required item
  if (cond.requiredItem) {
    const hasItem = state.inventory.some((item) => item.id === cond.requiredItem);
    if (!hasItem) {
      return {
        isAvailable: false,
        reason: cond.tooltipIfLocked || `Requires item: ${cond.requiredItem.replace(/_/g, ' ')}`,
      };
    }
  }

  // Check boolean flags
  if (cond.isTrue) {
    if (!state.variables[cond.isTrue]) {
      return {
        isAvailable: false,
        reason: cond.tooltipIfLocked || `Requires condition: ${cond.isTrue.replace(/_/g, ' ')}`,
      };
    }
  }

  if (cond.isFalse) {
    if (state.variables[cond.isFalse]) {
      return {
        isAvailable: false,
        reason: cond.tooltipIfLocked || `Locked by previous choice`,
      };
    }
  }

  // Check numerical bounds
  if (cond.variable) {
    const val = Number(state.variables[cond.variable] || 0);
    if (cond.min !== undefined && val < cond.min) {
      return {
        isAvailable: false,
        reason:
          cond.tooltipIfLocked ||
          `Requires higher ${cond.variable.replace(/_/g, ' ')} (${val}/${cond.min})`,
      };
    }
    if (cond.max !== undefined && val > cond.max) {
      return {
        isAvailable: false,
        reason: cond.tooltipIfLocked || `Exceeds threshold for ${cond.variable}`,
      };
    }
  }

  return { isAvailable: true };
}

export function applyChoiceConsequence(
  choice: Choice,
  currentState: GameSaveState
): {
  nextState: GameSaveState;
  newItems: InventoryItem[];
  newClues: JournalEntry[];
  notification?: string;
} {
  const next = { ...currentState };
  const newItems: InventoryItem[] = [];
  const newClues: JournalEntry[] = [];
  let notification = choice.consequence?.feedbackText;

  // Clone variables
  next.variables = { ...currentState.variables };

  if (choice.consequence?.variables) {
    for (const [key, deltaOrVal] of Object.entries(choice.consequence.variables)) {
      if (typeof deltaOrVal === 'number') {
        const prev = Number(next.variables[key] || 0);
        next.variables[key] = prev + deltaOrVal;
      } else {
        next.variables[key] = deltaOrVal;
      }
    }
  }

  // Clone & add inventory item
  next.inventory = [...currentState.inventory];
  if (choice.consequence?.addItem) {
    const item = choice.consequence.addItem;
    if (!next.inventory.some((i) => i.id === item.id)) {
      next.inventory.push(item);
      newItems.push(item);
      if (!notification) {
        notification = `Acquired: ${item.name}`;
      }
    }
  }

  // Clone & add journal clue
  next.journal = [...currentState.journal];
  if (choice.consequence?.addClue) {
    const clue = choice.consequence.addClue;
    if (!next.journal.some((c) => c.id === clue.id)) {
      next.journal.push(clue);
      newClues.push(clue);
    }
  }

  return { nextState: next, newItems, newClues, notification };
}

export function startWorldState(
  worldId: WorldId,
  currentState: GameSaveState
): GameSaveState {
  const config = WORLDS_CONFIG[worldId];
  return {
    ...currentState,
    currentWorldId: worldId,
    currentSceneId: config.initialSceneId,
    visitedSceneIds: [config.initialSceneId],
    variables: {},
    history: [],
    // Retain persistent inventory items or reset to world start?
    // We filter inventory and journal to keep previous world entries or fresh world playthrough
    inventory: currentState.inventory.filter((item) => item.foundAtScene.startsWith(worldId)),
    journal: currentState.journal.filter((j) => j.worldId === worldId),
    lastUpdated: Date.now(),
  };
}

export function registerEndingUnlock(
  worldId: WorldId,
  ending: { id: string; title: string; type: 'standard' | 'secret' },
  currentState: GameSaveState
): GameSaveState {
  const unlocked: UnlockedEnding = {
    worldId,
    endingId: ending.id,
    title: ending.title,
    type: ending.type,
    unlockedAt: Date.now(),
  };

  const nextEndings = {
    ...currentState.unlockedEndings,
    [`${worldId}_${ending.id}`]: unlocked,
  };

  const nextState = {
    ...currentState,
    unlockedEndings: nextEndings,
    lastUpdated: Date.now(),
  };

  saveGameState(nextState);
  return nextState;
}
