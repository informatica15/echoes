import React, { useEffect } from 'react';
import type { Scene, WorldId, Choice, GameSaveState } from '../types/story';
import { WORLDS_CONFIG } from '../data';
import { evaluateChoiceCondition } from '../utils/gameState';
import { soundscape } from '../utils/audioEngine';
import { CinematicArtwork } from './CinematicArtwork';
import { AudioControls } from './AudioControls';
import {
  Compass,
  BookOpen,
  ArrowLeft,
  Lock,
  Sparkles,
  MessageSquare,
  CheckCircle2,
} from 'lucide-react';

interface StorySceneProps {
  scene: Scene;
  worldId: WorldId;
  gameState: GameSaveState;
  onSelectChoice: (choice: Choice) => void;
  onOpenJournal: () => void;
  onOpenStoryMap: () => void;
  onReturnToWorlds: () => void;
  notification?: string | null;
}

export const StoryScene: React.FC<StorySceneProps> = ({
  scene,
  worldId,
  gameState,
  onSelectChoice,
  onOpenJournal,
  onOpenStoryMap,
  onReturnToWorlds,
  notification,
}) => {
  const worldConfig = WORLDS_CONFIG[worldId];

  // Keyboard shortcut listener: keys 1-4 for choices, 'm' for map, 'j' for journal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= scene.choices.length) {
        const choice = scene.choices[num - 1];
        const { isAvailable } = evaluateChoiceCondition(choice, gameState);
        if (isAvailable) {
          soundscape.playChoiceClick();
          onSelectChoice(choice);
        }
      } else if (e.key.toLowerCase() === 'm') {
        onOpenStoryMap();
      } else if (e.key.toLowerCase() === 'j') {
        onOpenJournal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scene.choices, gameState, onSelectChoice, onOpenStoryMap, onOpenJournal]);

  return (
    <div
      className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden text-slate-100"
      style={{ fontFamily: worldConfig.typography.body }}
    >
      {/* Background Cinematic Art */}
      <CinematicArtwork
        worldId={worldId}
        artTheme={scene.artTheme}
        sceneId={scene.id}
        imagePrompt={scene.imagePrompt}
        reducedMotion={gameState.settings.reducedMotion}
      />

      {/* Compact Top Navigation Bar */}
      <header className="relative z-20 flex items-center justify-between px-6 py-4 bg-slate-950/60 backdrop-blur-md border-b border-slate-800/60">
        {/* Left: Return & World Name */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onReturnToWorlds}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-white transition-colors"
            title="Return to World Selection"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Worlds</span>
          </button>

          <div className="h-4 w-[1px] bg-slate-700/60" />

          <div className="flex items-center space-x-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: worldConfig.colors.primary }}
            />
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-300">
              {worldConfig.title}
            </span>
          </div>
        </div>

        {/* Right: Controls & Modals */}
        <div className="flex items-center space-x-2">
          {/* Audio & Volume Controls */}
          <AudioControls />

          {/* Journal Button */}
          <button
            onClick={onOpenJournal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-white transition-colors"
            title="Open Journal [J]"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Journal</span>
            {gameState.journal.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                {gameState.journal.length}
              </span>
            )}
          </button>

          {/* Story Map Button */}
          <button
            onClick={onOpenStoryMap}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-white transition-colors"
            title="Open Story Map [M]"
          >
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Story Map</span>
          </button>
        </div>
      </header>

      {/* Floating Consequence Notification */}
      {notification && (
        <div className="relative z-30 max-w-md mx-auto mt-3 px-4 py-2.5 rounded-xl bg-amber-950/90 border border-amber-600/70 text-amber-200 text-xs flex items-center space-x-2 shadow-xl backdrop-blur-md animate-fade-in">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Story Narration Center Area */}
      <main className="relative z-10 max-w-3xl mx-auto px-6 py-6 w-full flex-1 flex flex-col justify-end">
        <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
          {/* Chapter & Scene Title */}
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold block">
              {scene.chapter}
            </span>
            <h1
              className="text-2xl sm:text-3xl font-bold tracking-tight text-white drop-shadow"
              style={{ fontFamily: worldConfig.typography.display }}
            >
              {scene.title}
            </h1>
          </div>

          {/* Narrative Passages */}
          <div className="space-y-3.5 text-slate-200 text-sm sm:text-base leading-relaxed font-light">
            {scene.narration.map((paragraph, index) => (
              <p key={index} className="drop-shadow-sm">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Character Dialogue Blocks */}
          {scene.dialogue && scene.dialogue.length > 0 && (
            <div className="space-y-2.5 pt-2 border-t border-slate-850">
              {scene.dialogue.map((line, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/90 flex items-start space-x-3"
                >
                  <MessageSquare className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-amber-300 block mb-0.5">
                      {line.speaker}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-200 italic">“{line.text}”</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Decision Choices */}
          <div className="pt-4 space-y-2.5">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
              What do you choose? (Keyboard: 1, 2, 3...)
            </span>

            <div className="grid grid-cols-1 gap-2.5">
              {scene.choices.map((choice, index) => {
                const { isAvailable, reason } = evaluateChoiceCondition(choice, gameState);

                return (
                  <button
                    key={choice.id}
                    disabled={!isAvailable}
                    onClick={() => {
                      if (isAvailable) {
                        soundscape.playChoiceClick();
                        onSelectChoice(choice);
                      }
                    }}
                    className={`relative w-full text-left p-4 rounded-xl border transition-all flex items-start space-x-3 group ${
                      isAvailable
                        ? 'bg-slate-900/70 hover:bg-slate-850/90 border-slate-700/80 hover:border-amber-400/80 hover:shadow-lg hover:shadow-amber-500/10 cursor-pointer hover:translate-x-1'
                        : 'bg-slate-950/40 border-slate-850 text-slate-600 cursor-not-allowed opacity-60'
                    }`}
                  >
                    {/* Choice Number Badge */}
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                        isAvailable
                          ? 'bg-slate-800 text-amber-400 group-hover:bg-amber-500 group-hover:text-black transition-colors'
                          : 'bg-slate-900 text-slate-600'
                      }`}
                    >
                      {index + 1}
                    </span>

                    {/* Choice Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p
                          className={`text-sm font-semibold leading-snug ${
                            isAvailable ? 'text-slate-100 group-hover:text-white' : 'text-slate-500'
                          }`}
                        >
                          {choice.text}
                        </p>
                        {!isAvailable && (
                          <span className="flex items-center gap-1 text-[11px] text-rose-400/90 ml-2 shrink-0">
                            <Lock className="w-3 h-3" />
                            {reason}
                          </span>
                        )}
                      </div>

                      {choice.subtext && (
                        <p className="text-xs text-slate-400 mt-1 leading-normal">
                          {choice.subtext}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Subtle Status Bar */}
      <footer className="relative z-10 px-6 py-2.5 bg-slate-950/60 backdrop-blur-sm border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center space-x-4">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Autosaved to local memory
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">
            Decisions: {gameState.history.length}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span>Shortcuts: [1-4] Decisions</span>
          <span>[M] Map</span>
          <span>[J] Journal</span>
        </div>
      </footer>
    </div>
  );
};
