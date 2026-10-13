import React, { useState } from 'react';
import { InventoryItem, JournalEntry, UnlockedEnding, WorldId } from '../types/story';
import { WORLDS_CONFIG } from '../data';
import { BookOpen, Package, History, Award, X, Sparkles, Feather } from 'lucide-react';

interface JournalModalProps {
  worldId: WorldId;
  inventory: InventoryItem[];
  journal: JournalEntry[];
  history: Array<{ sceneTitle: string; choiceText: string; timestamp: number }>;
  variables: Record<string, number | boolean>;
  unlockedEndings: Record<string, UnlockedEnding>;
  onClose: () => void;
}

export const JournalModal: React.FC<JournalModalProps> = ({
  worldId,
  inventory,
  journal,
  history,
  variables,
  unlockedEndings,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'journal' | 'inventory' | 'history' | 'endings'>('journal');
  const worldConfig = WORLDS_CONFIG[worldId];

  // Filter endings for this world or all
  const worldEndingsList = Object.values(unlockedEndings).filter((e) => e.worldId === worldId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl h-[82vh] bg-slate-950/95 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold tracking-wide text-white">Chronicle & Archives</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-850 bg-slate-900/30 px-6">
          <button
            onClick={() => setActiveTab('journal')}
            className={`flex items-center gap-2 py-3 px-4 border-b-2 text-sm font-medium transition-colors ${
              activeTab === 'journal'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Feather className="w-4 h-4" />
            Discovered Clues ({journal.length})
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`flex items-center gap-2 py-3 px-4 border-b-2 text-sm font-medium transition-colors ${
              activeTab === 'inventory'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Package className="w-4 h-4" />
            Relics & Inventory ({inventory.length})
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 py-3 px-4 border-b-2 text-sm font-medium transition-colors ${
              activeTab === 'history'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <History className="w-4 h-4" />
            Choice History ({history.length})
          </button>

          <button
            onClick={() => setActiveTab('endings')}
            className={`flex items-center gap-2 py-3 px-4 border-b-2 text-sm font-medium transition-colors ${
              activeTab === 'endings'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-4 h-4" />
            Ending Vault ({worldEndingsList.length}/4)
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* TAB 1: JOURNAL / CLUES */}
          {activeTab === 'journal' && (
            <div className="space-y-4">
              {journal.length === 0 ? (
                <div className="text-center py-16 text-slate-500">
                  <Feather className="w-12 h-12 mx-auto text-slate-600 mb-3 opacity-60" />
                  <p className="text-base font-medium">No clues discovered yet.</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Explore deeper paths and speak to key witnesses to uncover secrets.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {journal.map((entry) => (
                    <div
                      key={entry.id}
                      className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-slate-800 text-amber-400">
                          {entry.category || 'Clue'}
                        </span>
                        <span className="text-[10px] text-slate-500">Found in {entry.discoveredAt}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-100 mb-1.5">{entry.title}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">{entry.content}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Active Resonance Traits / Story Variables */}
              <div className="mt-6 pt-4 border-t border-slate-850">
                <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3">
                  Resonance Attributes
                </h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(variables).map(([key, val]) => (
                    <div
                      key={key}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs flex items-center gap-2"
                    >
                      <span className="text-slate-400 capitalize">{key.replace(/_/g, ' ')}:</span>
                      <span className="text-amber-400 font-bold">
                        {typeof val === 'boolean' ? (val ? 'Active' : 'Dormant') : val}
                      </span>
                    </div>
                  ))}
                  {Object.keys(variables).length === 0 && (
                    <span className="text-xs text-slate-500 italic">No resonance attributes modified yet.</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INVENTORY / RELICS */}
          {activeTab === 'inventory' && (
            <div>
              {inventory.length === 0 ? (
                <div className="text-center py-16 text-slate-500">
                  <Package className="w-12 h-12 mx-auto text-slate-600 mb-3 opacity-60" />
                  <p className="text-base font-medium">Your inventory is empty.</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Keep your senses keen for keys, ciphers, and ancient relics.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {inventory.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start space-x-3"
                    >
                      <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-white mb-1">{item.name}</h4>
                        <p className="text-xs text-slate-300 leading-relaxed mb-2">
                          {item.description}
                        </p>
                        <span className="text-[10px] text-slate-500">
                          Discovered at: {item.foundAtScene}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CHOICE HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-3">
              {history.length === 0 ? (
                <div className="text-center py-16 text-slate-500">
                  <History className="w-12 h-12 mx-auto text-slate-600 mb-3 opacity-60" />
                  <p className="text-base font-medium">No decisions recorded yet.</p>
                </div>
              ) : (
                <div className="relative pl-6 border-l border-slate-800 space-y-4">
                  {history.map((step, idx) => (
                    <div key={idx} className="relative group">
                      <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-amber-400/80 ring-4 ring-slate-950" />
                      <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-850">
                        <span className="text-[10px] text-slate-400 block mb-0.5">
                          {step.sceneTitle}
                        </span>
                        <p className="text-xs font-semibold text-white">“{step.choiceText}”</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: ENDING VAULT */}
          {activeTab === 'endings' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-850 text-xs text-slate-300 flex items-center justify-between">
                <span>
                  Discovered Endings for <strong className="text-white">{worldConfig.title}</strong>
                </span>
                <span className="font-bold text-amber-400">
                  {worldEndingsList.length} of 4 Endings Unlocked
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['A', 'B', 'C', 'D'].map((endingLetter, idx) => {
                  const unlocked = worldEndingsList[idx];
                  return (
                    <div
                      key={endingLetter}
                      className={`p-4 rounded-xl border transition-all ${
                        unlocked
                          ? 'bg-amber-950/20 border-amber-600/50 text-white'
                          : 'bg-slate-900/20 border-slate-850 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider">
                          Ending {endingLetter} {endingLetter === 'D' ? '(Secret)' : ''}
                        </span>
                        {unlocked ? (
                          <Award className="w-4 h-4 text-amber-400" />
                        ) : (
                          <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-500">
                            Locked
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold mb-1">
                        {unlocked ? unlocked.title : 'Undiscovered Fate'}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {unlocked
                          ? `Unlocked on ${new Date(unlocked.unlockedAt).toLocaleDateString()}`
                          : 'Explore different branching choices to unlock this destiny.'}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
