import { Scene, WorldId } from '../types/story';
import { WORLDS_CONFIG } from './worldsConfig';
import { FOREST_SCENES } from './forestStory';
import { CASTLE_SCENES } from './castleStory';
import { EMBER_SCENES } from './emberStory';
import { OCEAN_SCENES } from './oceanStory';

export { WORLDS_CONFIG } from './worldsConfig';

export const ALL_SCENES: Record<string, Scene> = {
  ...FOREST_SCENES,
  ...CASTLE_SCENES,
  ...EMBER_SCENES,
  ...OCEAN_SCENES,
};

export function getSceneById(sceneId: string): Scene | undefined {
  return ALL_SCENES[sceneId];
}

export function getWorldScenes(worldId: WorldId): Record<string, Scene> {
  switch (worldId) {
    case 'forest':
      return FOREST_SCENES;
    case 'castle':
      return CASTLE_SCENES;
    case 'ember':
      return EMBER_SCENES;
    case 'ocean':
      return OCEAN_SCENES;
  }
}

export interface ValidationReport {
  totalScenes: number;
  totalWorlds: number;
  totalEndings: number;
  errors: string[];
  warnings: string[];
  worldReports: Record<
    WorldId,
    {
      sceneCount: number;
      endingCount: number;
      secretEndingCount: number;
      isGraphValid: boolean;
      allEndingsReachable: boolean;
    }
  >;
}

export function validateStoryGraph(): ValidationReport {
  const errors: string[] = [];
  const warnings: string[] = [];
  const worldIds: WorldId[] = ['forest', 'castle', 'ember', 'ocean'];
  let totalEndings = 0;

  const worldReports: ValidationReport['worldReports'] = {} as any;

  for (const worldId of worldIds) {
    const config = WORLDS_CONFIG[worldId];
    const worldScenes = getWorldScenes(worldId);
    const sceneIds = Object.keys(worldScenes);
    const initialSceneId = config.initialSceneId;

    if (!worldScenes[initialSceneId]) {
      errors.push(`World [${worldId}]: Initial scene '${initialSceneId}' does not exist!`);
    }

    let endingCount = 0;
    let secretEndingCount = 0;

    // Check each scene
    for (const [id, scene] of Object.entries(worldScenes)) {
      if (scene.id !== id) {
        errors.push(`Scene ID mismatch: key is '${id}' but scene.id is '${scene.id}'`);
      }

      if (scene.worldId !== worldId) {
        errors.push(`Scene '${id}' belongs to world '${scene.worldId}', not '${worldId}'`);
      }

      if (scene.sceneType === 'ending') {
        endingCount++;
        totalEndings++;
        if (!scene.endingMeta) {
          errors.push(`Ending scene '${id}' is missing endingMeta!`);
        } else if (scene.endingMeta.type === 'secret') {
          secretEndingCount++;
        }
        if (scene.choices && scene.choices.length > 0) {
          warnings.push(`Ending scene '${id}' has choices defined, but should have none.`);
        }
      } else {
        if (!scene.choices || scene.choices.length === 0) {
          errors.push(`Non-ending scene '${id}' has no choices (accidental dead end)!`);
        } else {
          for (const choice of scene.choices) {
            if (!ALL_SCENES[choice.targetSceneId]) {
              errors.push(
                `Scene '${id}' choice '${choice.id}' points to nonexistent destination '${choice.targetSceneId}'!`
              );
            }
          }
        }
      }
    }

    // Graph reachability analysis from initial scene
    const visited = new Set<string>();
    const queue = [initialSceneId];
    visited.add(initialSceneId);

    while (queue.length > 0) {
      const current = queue.shift()!;
      const currentScene = worldScenes[current];
      if (!currentScene) continue;

      if (currentScene.choices) {
        for (const choice of currentScene.choices) {
          if (worldScenes[choice.targetSceneId] && !visited.has(choice.targetSceneId)) {
            visited.add(choice.targetSceneId);
            queue.push(choice.targetSceneId);
          }
        }
      }
    }

    // Check reachable scenes
    const unreachable = sceneIds.filter((sId) => !visited.has(sId));
    if (unreachable.length > 0) {
      warnings.push(`World [${worldId}]: Unreachable scenes found: ${unreachable.join(', ')}`);
    }

    // Check that all endings are reachable
    const endingScenes = Object.values(worldScenes).filter((s) => s.sceneType === 'ending');
    const unreachableEndings = endingScenes.filter((s) => !visited.has(s.id));
    if (unreachableEndings.length > 0) {
      errors.push(
        `World [${worldId}]: Unreachable endings detected: ${unreachableEndings.map((e) => e.id).join(', ')}`
      );
    }

    worldReports[worldId] = {
      sceneCount: sceneIds.length,
      endingCount,
      secretEndingCount,
      isGraphValid: errors.length === 0,
      allEndingsReachable: unreachableEndings.length === 0,
    };
  }

  return {
    totalScenes: Object.keys(ALL_SCENES).length,
    totalWorlds: worldIds.length,
    totalEndings,
    errors,
    warnings,
    worldReports,
  };
}
