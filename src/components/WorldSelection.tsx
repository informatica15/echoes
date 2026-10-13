import React, { useState } from 'react';
import { WorldId, GameSaveState } from '../types/story';
import { WORLDS_CONFIG } from '../data/worldsConfig';
import {
  Sparkles,
  Play,
  RotateCcw,
  Compass,
  Award,
  Clock,
  Gauge,
  BookOpen,
} from 'lucide-react';
import { soundscape } from '../utils/audioEngine';
import { AudioControls } from './AudioControls';

interface WorldSelectionProps {
  gameState: GameSaveState;
  onSelectWorld: (worldId: WorldId) => void;
  onContinueCurrent: () => void;
  onRestartWorld: (worldId: WorldId) => void;
  onOpenJournal: () => void;
}

export const WorldSelection: React.FC<WorldSelectionProps> = ({
  gameState,
  onSelectWorld,
  onContinueCurrent,
  onRestartWorld,
  onOpenJournal,
}) => {
  const [selectedWorldId, setSelectedWorldId] = useState<WorldId>('forest');
  const [showWorldDetail, setShowWorldDetail] = useState(false);

  const activeConfig = WORLDS_CONFIG[selectedWorldId];
  const hasSavedGame = !!gameState.currentWorldId && !!gameState.currentSceneId;

  // Count endings unlocked across all worlds
  const totalUnlockedEndings = Object.keys(gameState.unlockedEndings).length;

  const handleWorldHover = (id: WorldId) => {
    setSelectedWorldId(id);
    if (!soundscape.getIsMuted() && gameState.settings.ambientSound) {
      soundscape.startRealmMusic(id);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-black text-slate-100 selection:bg-amber-500 selection:text-black">
      {/* Dynamic Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* World Glow Halo */}
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[650px] rounded-full blur-[140px] opacity-30 transition-all duration-1000"
          style={{ backgroundColor: activeConfig.colors.primary }}
        />

        {/* Ambient Dark Grid / Vignette */}
        <div className="absolute inset-0 bg-radial-vignette opacity-85" />
      </div>

      {/* Top Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-black">
            E
          </div>
          <span className="text-sm font-bold tracking-widest uppercase text-slate-300">
            ECHOES
          </span>
        </div>

        <div className="flex items-center space-x-3">
          {/* Audio & Volume Controls */}
          <AudioControls />

          {/* Journal Archive */}
          <button
            onClick={onOpenJournal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-white transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Archive</span>
            {totalUnlockedEndings > 0 && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold">
                {totalUnlockedEndings}/16 Endings
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero Title & Subtitle */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-4 pt-6">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest border border-slate-750 bg-slate-900/80 text-amber-300 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          Cinematic Choice-Driven Interactive Fiction
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white drop-shadow-2xl font-serif">
          ECHOES
        </h1>

        <p className="text-lg sm:text-xl font-light text-slate-300 max-w-2xl mx-auto tracking-wide italic font-serif">
          “One world. A thousand possibilities. Every choice leaves a trace.”
        </p>

        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto font-sans">
          You are not here to watch a story. You are here to change it.
        </p>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
          {hasSavedGame && (
            <button
              onClick={onContinueCurrent}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm shadow-xl hover:shadow-amber-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <Play className="w-4 h-4 fill-black" />
              Continue Your Journey ({WORLDS_CONFIG[gameState.currentWorldId!]?.title})
            </button>
          )}

          <button
            onClick={() => {
              setShowWorldDetail(true);
              soundscape.startWorldAmbience(selectedWorldId);
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm border border-slate-700 hover:border-slate-500 transition-all hover:scale-105"
          >
            <Compass className="w-4 h-4 text-cyan-400" />
            Enter The Unknown
          </button>
        </div>
      </section>

      {/* Four Worlds Display Grid */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-10 w-full">
        <div className="text-center mb-6">
          <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
            Choose Your Realm of Causality
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(Object.values(WORLDS_CONFIG) as typeof activeConfig[]).map((world) => {
            const isSelected = selectedWorldId === world.id;
            const worldEndingsUnlocked = Object.values(gameState.unlockedEndings).filter(
              (e) => e.worldId === world.id
            ).length;

            return (
              <div
                key={world.id}
                onMouseEnter={() => handleWorldHover(world.id)}
                onClick={() => {
                  setSelectedWorldId(world.id);
                  onSelectWorld(world.id);
                }}
                className={`relative rounded-2xl p-5 border transition-all duration-300 cursor-pointer flex flex-col justify-between group overflow-hidden ${
                  isSelected
                    ? 'bg-slate-900/90 border-slate-500 shadow-2xl scale-[1.02]'
                    : 'bg-slate-950/60 hover:bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                }`}
                style={{
                  boxShadow: isSelected ? `0 10px 30px -10px ${world.colors.primary}40` : undefined,
                }}
              >
                {/* World Ambient Glow Edge */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 transition-all"
                  style={{
                    backgroundColor: world.colors.primary,
                    opacity: isSelected ? 1 : 0.4,
                  }}
                />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {world.genre}
                    </span>
                    <span className="text-[10px] text-amber-400 font-bold flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      {worldEndingsUnlocked}/4 Endings
                    </span>
                  </div>

                  <h3
                    className="text-xl font-bold text-white group-hover:text-amber-200 transition-colors"
                    style={{ fontFamily: world.typography.display }}
                  >
                    {world.title}
                  </h3>

                  <p className="text-xs text-slate-300 italic font-serif leading-relaxed line-clamp-2">
                    “{world.tagline}”
                  </p>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {world.synopsis}
                  </p>
                </div>

                {/* Card Meta Footer */}
                <div className="pt-4 mt-4 border-t border-slate-850 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {world.playTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Gauge className="w-3 h-3" />
                    {world.difficulty}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* World Detail Modal Overlay if user clicked Enter The Unknown */}
      {showWorldDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-slate-950/95 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <span
                className="text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full text-white"
                style={{ backgroundColor: activeConfig.colors.secondary }}
              >
                {activeConfig.genre}
              </span>
              <button
                onClick={() => setShowWorldDetail(false)}
                className="text-slate-400 hover:text-white text-xs font-semibold px-2 py-1"
              >
                Close
              </button>
            </div>

            <div className="space-y-2">
              <h2
                className="text-3xl font-black text-white"
                style={{ fontFamily: activeConfig.typography.display }}
              >
                {activeConfig.title}
              </h2>
              <p className="text-sm italic text-amber-300 font-serif">
                “{activeConfig.tagline}”
              </p>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-light">
              {activeConfig.synopsis}
            </p>

            <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-850 text-center text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Est. Playtime</span>
                <span className="font-bold text-white">{activeConfig.playTime}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Complexity</span>
                <span className="font-bold text-amber-400">{activeConfig.difficulty}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Endings</span>
                <span className="font-bold text-cyan-400">{activeConfig.endingsCount} Fates</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-850">
              <button
                onClick={() => {
                  onRestartWorld(activeConfig.id);
                  setShowWorldDetail(false);
                }}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs text-slate-300 hover:text-white transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Start Fresh
              </button>

              <button
                onClick={() => {
                  onSelectWorld(activeConfig.id);
                  setShowWorldDetail(false);
                }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs shadow-lg transition-all hover:scale-105"
              >
                <Play className="w-3.5 h-3.5 fill-black" />
                Begin Story
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 px-8 py-5 border-t border-slate-900/80 text-center text-xs text-slate-400">
        <p>ECHOES © 2026 • Crafted with immersive branching narrative architecture.</p>
      </footer>
    </div>
  );
};
