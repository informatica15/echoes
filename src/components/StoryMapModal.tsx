import React, { useState, useMemo } from 'react';
import { WorldId, Scene } from '../types/story';
import { getWorldScenes, WORLDS_CONFIG } from '../data';
import { X, Lock, CheckCircle2, Award, Compass, Eye, Sparkles } from 'lucide-react';

interface StoryMapModalProps {
  worldId: WorldId;
  currentSceneId: string;
  visitedSceneIds: string[];
  unlockedEndings: Record<string, any>;
  onClose: () => void;
}

export const StoryMapModal: React.FC<StoryMapModalProps> = ({
  worldId,
  currentSceneId,
  visitedSceneIds,
  unlockedEndings,
  onClose,
}) => {
  const worldConfig = WORLDS_CONFIG[worldId];
  const allWorldScenes = useMemo(() => getWorldScenes(worldId), [worldId]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(currentSceneId);

  // Group scenes by approximate tier/chapter for hierarchical layout
  const { nodes, links } = useMemo(() => {
    const sceneEntries = Object.values(allWorldScenes);
    const sceneMap = new Map<string, Scene>();
    sceneEntries.forEach((s) => sceneMap.set(s.id, s));

    // Calculate depth from start scene using BFS
    const depthMap = new Map<string, number>();
    const startId = worldConfig.initialSceneId;
    depthMap.set(startId, 0);

    const queue = [startId];
    while (queue.length > 0) {
      const cur = queue.shift()!;
      const curDepth = depthMap.get(cur) || 0;
      const scene = sceneMap.get(cur);
      if (scene && scene.choices) {
        for (const choice of scene.choices) {
          if (!depthMap.has(choice.targetSceneId)) {
            depthMap.set(choice.targetSceneId, curDepth + 1);
            queue.push(choice.targetSceneId);
          }
        }
      }
    }

    // Group into columns based on depth
    const columns: Record<number, Scene[]> = {};
    sceneEntries.forEach((scene) => {
      const d = depthMap.get(scene.id) ?? (scene.sceneType === 'ending' ? 4 : 2);
      if (!columns[d]) columns[d] = [];
      columns[d].push(scene);
    });

    // Compute coordinates
    const computedNodes: Array<{
      scene: Scene;
      x: number;
      y: number;
      isVisited: boolean;
      isCurrent: boolean;
      isEnding: boolean;
      isUnlockedEnding: boolean;
    }> = [];

    const colWidth = 240;
    const startX = 120;

    Object.entries(columns).forEach(([colStr, colScenes]) => {
      const col = parseInt(colStr, 10);
      const totalInCol = colScenes.length;
      const spacingY = Math.min(160, 680 / (totalInCol + 1));
      const startY = 380 - ((totalInCol - 1) * spacingY) / 2;

      colScenes.forEach((scene, index) => {
        const isVisited = visitedSceneIds.includes(scene.id);
        const isCurrent = scene.id === currentSceneId;
        const isEnding = scene.sceneType === 'ending';
        const isUnlocked = isEnding && !!unlockedEndings[`${worldId}_${scene.endingMeta?.endingId}`];

        computedNodes.push({
          scene,
          x: startX + col * colWidth,
          y: startY + index * spacingY,
          isVisited,
          isCurrent,
          isEnding,
          isUnlockedEnding: isUnlocked,
        });
      });
    });

    // Build connections
    const computedLinks: Array<{
      source: { x: number; y: number };
      target: { x: number; y: number };
      isTraversed: boolean;
      choiceLabel: string;
    }> = [];

    const nodeCoordMap = new Map<string, { x: number; y: number }>();
    computedNodes.forEach((n) => nodeCoordMap.set(n.scene.id, { x: n.x, y: n.y }));

    sceneEntries.forEach((scene) => {
      const sourceCoord = nodeCoordMap.get(scene.id);
      if (!sourceCoord) return;

      scene.choices?.forEach((choice) => {
        const targetCoord = nodeCoordMap.get(choice.targetSceneId);
        if (targetCoord) {
          const isTraversed =
            visitedSceneIds.includes(scene.id) && visitedSceneIds.includes(choice.targetSceneId);
          computedLinks.push({
            source: sourceCoord,
            target: targetCoord,
            isTraversed,
            choiceLabel: choice.text,
          });
        }
      });
    });

    return { nodes: computedNodes, links: computedLinks };
  }, [allWorldScenes, visitedSceneIds, currentSceneId, unlockedEndings, worldConfig, worldId]);

  const selectedScene = selectedNodeId ? allWorldScenes[selectedNodeId] : null;
  const isSelectedVisited = selectedScene ? visitedSceneIds.includes(selectedScene.id) : false;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-6xl h-[88vh] bg-slate-950/95 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-850 bg-slate-900/60">
          <div className="flex items-center space-x-3">
            <Compass className="w-5 h-5" style={{ color: worldConfig.colors.primary }} />
            <div>
              <h2 className="text-xl font-bold tracking-wide text-white">
                Decision Lattice & Story Map
              </h2>
              <p className="text-xs text-slate-400">
                World: <span className="text-amber-400 font-medium">{worldConfig.title}</span> •{' '}
                {visitedSceneIds.length} of {Object.keys(allWorldScenes).length} scenes discovered
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Close Story Map"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Map Area + Inspector Sidebar */}
        <div className="flex-1 flex overflow-hidden">
          {/* Interactive Graph Canvas */}
          <div className="flex-1 relative overflow-auto bg-gradient-to-b from-slate-950 via-slate-900/40 to-black p-6">
            <svg className="min-w-[1300px] min-h-[750px] w-full h-full">
              {/* Connecting Edges */}
              <g>
                {links.map((link, idx) => {
                  const dx = link.target.x - link.source.x;
                  const pathData = `M ${link.source.x} ${link.source.y} C ${link.source.x + dx * 0.5} ${link.source.y}, ${link.source.x + dx * 0.5} ${link.target.y}, ${link.target.x} ${link.target.y}`;
                  return (
                    <path
                      key={idx}
                      d={pathData}
                      fill="none"
                      stroke={link.isTraversed ? worldConfig.colors.primary : '#334155'}
                      strokeWidth={link.isTraversed ? 2.5 : 1.2}
                      strokeDasharray={link.isTraversed ? 'none' : '4,4'}
                      opacity={link.isTraversed ? 0.9 : 0.35}
                    />
                  );
                })}
              </g>

              {/* Decision Nodes */}
              <g>
                {nodes.map(({ scene, x, y, isVisited, isCurrent, isEnding, isUnlockedEnding }) => {
                  const isSelected = selectedNodeId === scene.id;
                  const nodeColor = isCurrent
                    ? '#fbbf24'
                    : isVisited
                    ? worldConfig.colors.primary
                    : '#475569';

                  return (
                    <g
                      key={scene.id}
                      className="cursor-pointer transition-transform hover:scale-110"
                      onClick={() => setSelectedNodeId(scene.id)}
                    >
                      {/* Pulse circle for current node */}
                      {isCurrent && (
                        <circle
                          cx={x}
                          cy={y}
                          r={28}
                          fill="none"
                          stroke="#fbbf24"
                          strokeWidth="2"
                          className="animate-ping"
                          opacity="0.4"
                        />
                      )}

                      {/* Main Node Circle */}
                      <circle
                        cx={x}
                        cy={y}
                        r={isEnding ? 20 : isCurrent ? 18 : 14}
                        fill={isVisited ? '#0f172a' : '#090d16'}
                        stroke={isSelected ? '#ffffff' : nodeColor}
                        strokeWidth={isSelected ? 3 : isCurrent ? 2.5 : 1.5}
                      />

                      {/* Icon inside node */}
                      {isEnding ? (
                        <Award
                          x={x - 8}
                          y={y - 8}
                          className="w-4 h-4 pointer-events-none"
                          color={isUnlockedEnding ? '#fbbf24' : '#64748b'}
                        />
                      ) : isVisited ? (
                        <CheckCircle2
                          x={x - 6}
                          y={y - 6}
                          className="w-3 h-3 pointer-events-none"
                          color={worldConfig.colors.primary}
                        />
                      ) : (
                        <Lock
                          x={x - 6}
                          y={y - 6}
                          className="w-3 h-3 pointer-events-none text-slate-600"
                        />
                      )}

                      {/* Label Text */}
                      <text
                        x={x}
                        y={y + (isEnding ? 32 : 26)}
                        textAnchor="middle"
                        className={`text-[10px] font-medium pointer-events-none ${
                          isCurrent
                            ? 'fill-amber-400 font-bold'
                            : isVisited
                            ? 'fill-slate-200'
                            : 'fill-slate-500'
                        }`}
                      >
                        {isVisited || isUnlockedEnding
                          ? scene.title.length > 20
                            ? scene.title.substring(0, 18) + '…'
                            : scene.title
                          : isEnding
                          ? 'Unknown Ending'
                          : 'Undiscovered Path'}
                      </text>
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>

          {/* Inspector Panel Sidebar */}
          <div className="w-80 border-l border-slate-800 bg-slate-900/80 p-5 flex flex-col justify-between overflow-y-auto">
            {selectedScene ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-xs text-slate-400">
                  <span className="uppercase tracking-wider font-semibold">
                    {selectedScene.chapter}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  {isSelectedVisited || selectedScene.endingMeta
                    ? selectedScene.title
                    : 'Unexplored Scene'}
                  {selectedScene.sceneType === 'ending' && (
                    <Sparkles className="w-4 h-4 text-amber-400" />
                  )}
                </h3>

                <div className="flex gap-2">
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                      isSelectedVisited
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {selectedScene.id === currentSceneId
                      ? '● Current Position'
                      : isSelectedVisited
                      ? 'Discovered'
                      : 'Undiscovered'}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                    Type: {selectedScene.sceneType}
                  </span>
                </div>

                {isSelectedVisited ? (
                  <div className="space-y-3 pt-2">
                    <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-950/60 p-3 rounded-lg border border-slate-850">
                      "{selectedScene.narration[0]}"
                    </p>

                    {selectedScene.choices && selectedScene.choices.length > 0 && (
                      <div>
                        <span className="text-xs font-semibold text-slate-400 block mb-1">
                          Available Decisions:
                        </span>
                        <ul className="space-y-1.5">
                          {selectedScene.choices.map((c, i) => (
                            <li
                              key={i}
                              className="text-[11px] text-slate-300 bg-slate-950/40 p-2 rounded border border-slate-850"
                            >
                              • {c.text}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedScene.endingMeta && (
                      <div className="p-3 bg-amber-950/30 border border-amber-800/50 rounded-lg text-amber-300 text-xs">
                        <span className="font-bold block">
                          Ending: {selectedScene.endingMeta.title}
                        </span>
                        <p className="mt-1 text-slate-300 text-[11px]">
                          {selectedScene.endingMeta.summary}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-xs text-slate-500 py-6 text-center space-y-2">
                    <Eye className="w-8 h-8 mx-auto text-slate-600 mb-2" />
                    <p>Details for this node remain shrouded in the fog of choice.</p>
                    <p className="text-[11px]">
                      Make decisions in the story to reach and illuminate this path.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-500">Select any node on the graph to inspect.</p>
            )}

            {/* Legend Footer */}
            <div className="pt-4 border-t border-slate-800 space-y-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                <span>Current Location</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full inline-block"
                  style={{ backgroundColor: worldConfig.colors.primary }}
                />
                <span>Visited Story Branch</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-3 h-3 text-amber-400" />
                <span>Ending Horizon (Standard / Secret)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
