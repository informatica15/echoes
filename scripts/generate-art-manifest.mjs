import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// We can extract all scenes from the data files directly or read them
const srcDataDir = path.resolve(__dirname, '../src/data');

async function generateManifest() {
  const worlds = ['forest', 'castle', 'ember', 'ocean'];
  const manifest = {
    generatedAt: new Date().toISOString(),
    gameTitle: "ECHOES: Every Choice Leaves a Trace",
    totalScenes: 0,
    worlds: {},
    scenes: []
  };

  for (const world of worlds) {
    const filePath = path.join(srcDataDir, `${world}Story.ts`);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Simple regex parser for scene IDs and imagePrompts
    const sceneBlockRegex = /([a-z0-9_]+):\s*{\s*id:\s*['"]([^'"]+)['"],\s*worldId:\s*['"]([^'"]+)['"],\s*chapter:\s*['"]([^'"]+)['"],\s*title:\s*['"]([^'"]+)['"],\s*sceneType:\s*['"]([^'"]+)['"],[\s\S]*?imagePrompt:\s*['"]([^'"]+)['"],\s*artTheme:\s*['"]([^'"]+)['"]/g;
    
    let match;
    let worldCount = 0;
    while ((match = sceneBlockRegex.exec(content)) !== null) {
      const [, , id, worldId, chapter, title, sceneType, imagePrompt, artTheme] = match;
      manifest.scenes.push({
        id,
        worldId,
        chapter,
        title,
        sceneType,
        artTheme,
        imagePath: `/scenes/${id}.webp`,
        fallbackSvg: `/assets/illustrations/${artTheme}.svg`,
        prompt: imagePrompt,
        aspectRatio: "16:9",
        cameraAngle: sceneType === 'ending' ? "Epic cinematic wide angle panorama" : "Cinematic medium wide atmospheric shot"
      });
      worldCount++;
      manifest.totalScenes++;
    }
    manifest.worlds[world] = { sceneCount: worldCount };
  }

  const publicDir = path.resolve(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(publicDir, 'assets-manifest.json'),
    JSON.stringify(manifest, null, 2),
    'utf-8'
  );

  console.log(`✅ Asset Manifest generated with ${manifest.totalScenes} scene prompts! Written to public/assets-manifest.json`);
}

generateManifest();
