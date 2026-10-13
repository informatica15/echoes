import React, { useEffect } from 'react';
import { Scene, WorldId } from '../types/story';
import { WORLDS_CONFIG } from '../data';
import confetti from 'canvas-confetti';
import { Award, RotateCcw, Globe, Compass, Sparkles, BookOpen } from 'lucide-react';
import { CinematicArtwork } from './CinematicArtwork';

interface EndingScreenProps {
  scene: Scene;
  worldId: WorldId;
  decisionHistory: Array<{ sceneTitle: string; choiceText: string; timestamp: number }>;
  onReplayWorld: () => void;
  onReturnToWorlds: () => void;
  onOpenStoryMap: () => void;
  onOpenJournal: () => void;
}

export const EndingScreen: React.FC<EndingScreenProps> = ({
  scene,
  worldId,
  decisionHistory,
  onReplayWorld,
  onReturnToWorlds,
  onOpenStoryMap,
  onOpenJournal,
}) => {
  const meta = scene.endingMeta;
  const worldConfig = WORLDS_CONFIG[worldId];
  const isSecret = meta?.type === 'secret';

  useEffect(() => {
    // Launch celebratory confetti when ending displays
    try {
      confetti({
        particleCount: isSecret ? 120 : 60,
        spread: 80,
        origin: { y: 0.6 },
        colors: isSecret ? ['#fbbf24', '#f59e0b', '#22d3ee', '#c084fc'] : ['#10b981', '#f59e0b', '#38bdf8'],
      });
    } catch {}
  }, [isSecret]);

  if (!meta) return null;

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden text-slate-100 animate-fade-in">
      {/* Background Cinematic Art */}
      <CinematicArtwork
        worldId={worldId}
        artTheme={scene.artTheme}
        sceneId={scene.id}
        imagePrompt={scene.imagePrompt}
      />

      {/* Top Bar Navigation */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 bg-slate-950/70 backdrop-blur-md border-b border-slate-800/80">
        <div className="flex items-center space-x-3">
          <span
            className="w-3 h-3 rounded-full shadow-lg"
            style={{ backgroundColor: worldConfig.colors.primary }}
          />
          <span className="text-xs tracking-widest uppercase font-semibold text-slate-400">
            {worldConfig.title} — Chronicle Complete
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenStoryMap}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-850 border border-slate-800 text-xs text-slate-300 hover:text-white transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            Story Map
          </button>
          <button
            onClick={onOpenJournal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-850 border border-slate-800 text-xs text-slate-300 hover:text-white transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            Journal
          </button>
        </div>
      </header>

      {/* Main Ending Cinematic Card */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-8 w-full flex-1 flex flex-col justify-center">
        <div className="bg-slate-950/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl space-y-8">
          {/* Badge & Title */}
          <div className="space-y-3 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-amber-500/40 bg-amber-950/40 text-amber-300">
              {isSecret ? <Sparkles className="w-3.5 h-3.5" /> : <Award className="w-3.5 h-3.5" />}
              {isSecret ? 'Secret Horizon Discovered' : 'Destiny Fulfilled'}
            </div>

            <h1
              className="text-3xl md:text-5xl font-black tracking-tight text-white drop-shadow-md"
              style={{ fontFamily: worldConfig.typography.display }}
            >
              {meta.title}
            </h1>

            <p className="text-sm md:text-base italic text-amber-200/90 font-serif max-w-2xl mx-auto">
              {meta.quote}
            </p>
          </div>

          {/* Ending Narrative Text */}
          <div className="space-y-4 text-slate-200 leading-relaxed text-sm md:text-base font-light border-y border-slate-850 py-6">
            {scene.narration.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Consequences & Lore Unveiled */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-400" />
                Historical Consequences
              </h3>
              <ul className="space-y-1.5">
                {meta.consequences.map((c, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Primordial Lore Unveiled
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">{meta.loreReveal}</p>
            </div>
          </div>

          {/* Important Decision Highlights */}
          {decisionHistory.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-900/30 border border-slate-850 space-y-2">
              <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Key Decisions That Forged This Path:
              </h4>
              <div className="flex flex-wrap gap-2">
                {decisionHistory.slice(-4).map((h, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-200 border border-slate-700/60"
                  >
                    “{h.choiceText}”
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-slate-850">
            <button
              onClick={onReplayWorld}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm shadow-lg hover:shadow-amber-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              Replay This World
            </button>

            <button
              onClick={onReturnToWorlds}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm border border-slate-700 transition-colors"
            >
              <Globe className="w-4 h-4 text-cyan-400" />
              Explore Other Worlds
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
