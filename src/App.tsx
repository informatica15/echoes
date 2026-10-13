import { useState, useEffect } from 'react';
import { WorldId, Choice, GameSaveState } from './types/story';
import { getSceneById } from './data';
import {
  loadSavedGame,
  saveGameState,
  applyChoiceConsequence,
  startWorldState,
  registerEndingUnlock,
} from './utils/gameState';
import { soundscape } from './utils/audioEngine';
import { WorldSelection } from './components/WorldSelection';
import { StoryScene } from './components/StoryScene';
import { EndingScreen } from './components/EndingScreen';
import { JournalModal } from './components/JournalModal';
import { StoryMapModal } from './components/StoryMapModal';

export function App() {
  const [gameState, setGameState] = useState<GameSaveState>(() => loadSavedGame());
  const [activeView, setActiveView] = useState<'world_select' | 'playing' | 'ending'>(() => {
    const saved = loadSavedGame();
    if (saved.currentWorldId && saved.currentSceneId) {
      const curScene = getSceneById(saved.currentSceneId);
      if (curScene?.sceneType === 'ending') return 'ending';
      return 'playing';
    }
    return 'world_select';
  });

  const [notification, setNotification] = useState<string | null>(null);
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [isStoryMapOpen, setIsStoryMapOpen] = useState(false);

  // Sync state changes to storage
  useEffect(() => {
    saveGameState(gameState);
  }, [gameState]);

  // Ensure AudioContext is initialized and unblocked on first user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      soundscape.initContext();
      if (!soundscape.getIsMuted()) {
        if (activeView === 'world_select') {
          soundscape.startRealmMusic('nexus');
        } else if (activeView === 'playing' && gameState.currentWorldId) {
          soundscape.startRealmMusic(gameState.currentWorldId);
        }
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });
    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [activeView, gameState.currentWorldId]);

  // Handle soundtrack on view / world changes
  useEffect(() => {
    if (soundscape.getIsMuted()) return;

    if (activeView === 'playing' && gameState.currentWorldId) {
      soundscape.startRealmMusic(gameState.currentWorldId);
    } else if (activeView === 'world_select') {
      soundscape.startRealmMusic('nexus');
    }
  }, [activeView, gameState.currentWorldId]);

  // Current Scene lookup
  const currentScene = gameState.currentSceneId
    ? getSceneById(gameState.currentSceneId)
    : null;

  // Handlers
  const handleSelectWorld = (worldId: WorldId) => {
    // If player already has active session in this world, resume it; else start fresh
    if (gameState.currentWorldId === worldId && gameState.currentSceneId) {
      const scene = getSceneById(gameState.currentSceneId);
      if (scene?.sceneType === 'ending') {
        setActiveView('ending');
      } else {
        setActiveView('playing');
      }
    } else {
      const freshState = startWorldState(worldId, gameState);
      setGameState(freshState);
      setActiveView('playing');
    }
  };

  const handleContinueCurrent = () => {
    if (gameState.currentWorldId && gameState.currentSceneId) {
      const scene = getSceneById(gameState.currentSceneId);
      if (scene?.sceneType === 'ending') {
        setActiveView('ending');
      } else {
        setActiveView('playing');
      }
    }
  };

  const handleRestartWorld = (worldId: WorldId) => {
    const freshState = startWorldState(worldId, gameState);
    setGameState(freshState);
    setActiveView('playing');
  };

  const handleSelectChoice = (choice: Choice) => {
    if (!currentScene) return;

    // Apply consequences
    const { nextState, notification: notif } = applyChoiceConsequence(choice, gameState);

    // Record decision in history
    const historyEntry = {
      sceneId: currentScene.id,
      sceneTitle: currentScene.title,
      choiceId: choice.id,
      choiceText: choice.text,
      timestamp: Date.now(),
    };

    const nextScene = getSceneById(choice.targetSceneId);

    const updatedState: GameSaveState = {
      ...nextState,
      currentSceneId: choice.targetSceneId,
      visitedSceneIds: Array.from(
        new Set([...nextState.visitedSceneIds, choice.targetSceneId])
      ),
      history: [...nextState.history, historyEntry],
    };

    if (notif) {
      setNotification(notif);
      setTimeout(() => setNotification(null), 4000);
    }

    // Check if next scene is an ending
    if (nextScene?.sceneType === 'ending' && nextScene.endingMeta) {
      soundscape.playEndingTriumph();
      const withEnding = registerEndingUnlock(
        nextScene.worldId,
        {
          id: nextScene.endingMeta.endingId,
          title: nextScene.endingMeta.title,
          type: nextScene.endingMeta.type,
        },
        updatedState
      );
      setGameState(withEnding);
      setActiveView('ending');
    } else {
      setGameState(updatedState);
    }
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 flex flex-col font-sans">
      {/* View 1: World Selection */}
      {activeView === 'world_select' && (
        <WorldSelection
          gameState={gameState}
          onSelectWorld={handleSelectWorld}
          onContinueCurrent={handleContinueCurrent}
          onRestartWorld={handleRestartWorld}
          onOpenJournal={() => setIsJournalOpen(true)}
        />
      )}

      {/* View 2: Story Playing */}
      {activeView === 'playing' && currentScene && gameState.currentWorldId && (
        <StoryScene
          scene={currentScene}
          worldId={gameState.currentWorldId}
          gameState={gameState}
          onSelectChoice={handleSelectChoice}
          onOpenJournal={() => setIsJournalOpen(true)}
          onOpenStoryMap={() => setIsStoryMapOpen(true)}
          onReturnToWorlds={() => setActiveView('world_select')}
          notification={notification}
        />
      )}

      {/* View 3: Ending Screen */}
      {activeView === 'ending' && currentScene && gameState.currentWorldId && (
        <EndingScreen
          scene={currentScene}
          worldId={gameState.currentWorldId}
          decisionHistory={gameState.history}
          onReplayWorld={() => handleRestartWorld(gameState.currentWorldId!)}
          onReturnToWorlds={() => setActiveView('world_select')}
          onOpenStoryMap={() => setIsStoryMapOpen(true)}
          onOpenJournal={() => setIsJournalOpen(true)}
        />
      )}

      {/* Journal Modal */}
      {isJournalOpen && gameState.currentWorldId && (
        <JournalModal
          worldId={gameState.currentWorldId}
          inventory={gameState.inventory}
          journal={gameState.journal}
          history={gameState.history}
          variables={gameState.variables}
          unlockedEndings={gameState.unlockedEndings}
          onClose={() => setIsJournalOpen(false)}
        />
      )}

      {/* Story Map Modal */}
      {isStoryMapOpen && gameState.currentWorldId && (
        <StoryMapModal
          worldId={gameState.currentWorldId}
          currentSceneId={gameState.currentSceneId || ''}
          visitedSceneIds={gameState.visitedSceneIds}
          unlockedEndings={gameState.unlockedEndings}
          onClose={() => setIsStoryMapOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
