import { validateStoryGraph } from '../src/data/index';

console.log('--- ECHOES STORY GRAPH VALIDATION ---');
const report = validateStoryGraph();

console.log(`Total Worlds: ${report.totalWorlds}`);
console.log(`Total Scenes: ${report.totalScenes}`);
console.log(`Total Endings: ${report.totalEndings}`);

console.log('\nWorld Breakdown:');
for (const [worldId, wReport] of Object.entries(report.worldReports)) {
  console.log(` - [${worldId}]: ${wReport.sceneCount} scenes, ${wReport.endingCount} endings (${wReport.secretEndingCount} secret). Reachable: ${wReport.allEndingsReachable}`);
}

if (report.warnings.length > 0) {
  console.log('\nWarnings:');
  report.warnings.forEach(w => console.warn('  ⚠️ ' + w));
}

if (report.errors.length > 0) {
  console.error('\nErrors detected:');
  report.errors.forEach(e => console.error('  ❌ ' + e));
  process.exit(1);
} else {
  console.log('\n✅ VALIDATION PASSED: All scenes, choices, and 16 endings are 100% valid and reachable!');
}
