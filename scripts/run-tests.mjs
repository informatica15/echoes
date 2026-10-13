import { validateStoryGraph, ALL_SCENES } from '../src/data/index.js';
import {
  DEFAULT_INITIAL_STATE,
  evaluateChoiceCondition,
  applyChoiceConsequence,
  startWorldState,
  registerEndingUnlock,
} from '../src/utils/gameState.js';

let passed = 0;
let failed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${testName}`);
    failed++;
  }
}

console.log('=== ECHOES AUTOMATED ACCEPTANCE TEST SUITE ===\n');

// TEST SUITE 1: Story Graph Reachability & Validation
console.log('Test Suite 1: Story Graph Reachability & Integrity');
const report = validateStoryGraph();
assert(report.totalWorlds === 4, 'Contains exactly 4 story worlds');
assert(report.totalScenes === 48, 'Contains 48 total scenes across all worlds');
assert(report.totalEndings === 16, 'Contains 16 total endings (4 per world)');
assert(report.errors.length === 0, 'No broken choice destinations or dead ends');

for (const [wId, wReport] of Object.entries(report.worldReports)) {
  assert(wReport.endingCount === 4, `World [${wId}] has 4 endings`);
  assert(wReport.secretEndingCount === 1, `World [${wId}] has 1 secret ending`);
  assert(wReport.allEndingsReachable, `World [${wId}] all 4 endings are reachable`);
}

// TEST SUITE 2: Decision Engine & Condition Evaluation
console.log('\nTest Suite 2: Decision Engine & Condition Evaluation');
const mockState = {
  ...DEFAULT_INITIAL_STATE,
  inventory: [{ id: 'silver_key', name: 'Silver Key', description: 'test', foundAtScene: 'forest_start' }],
  variables: { courage: 2, curiosity: 1, guideTrust: true },
};

const choiceWithKey = {
  id: 'c_key',
  text: 'Open with key',
  targetSceneId: 'forest_cave_relic',
  condition: { requiredItem: 'silver_key' },
};
assert(evaluateChoiceCondition(choiceWithKey, mockState).isAvailable === true, 'Allows choice when required item is present');

const choiceWithMissingItem = {
  id: 'c_missing',
  text: 'Open with missing item',
  targetSceneId: 'forest_cave_relic',
  condition: { requiredItem: 'nonexistent_gem' },
};
assert(evaluateChoiceCondition(choiceWithMissingItem, mockState).isAvailable === false, 'Locks choice when required item is missing');

const choiceWithMinStat = {
  id: 'c_stat',
  text: 'Courageous stand',
  targetSceneId: 'forest_warden_encounter',
  condition: { variable: 'courage', min: 2 },
};
assert(evaluateChoiceCondition(choiceWithMinStat, mockState).isAvailable === true, 'Allows choice when stat meets min threshold');

const choiceWithHighStat = {
  id: 'c_stat_high',
  text: 'Impossible feat',
  targetSceneId: 'forest_warden_encounter',
  condition: { variable: 'courage', min: 5 },
};
assert(evaluateChoiceCondition(choiceWithHighStat, mockState).isAvailable === false, 'Locks choice when stat is below min threshold');

// TEST SUITE 3: Consequence Application
console.log('\nTest Suite 3: Consequence Application & State Mutation');
const choiceWithConsequence = {
  id: 'c_consequence',
  text: 'Drink sap',
  targetSceneId: 'forest_cave_relic',
  consequence: {
    variables: { courage: 2, drankSap: true },
    addItem: { id: 'golden_sap', name: 'Golden Sap', description: 'Glowing sap', foundAtScene: 'test' },
    addClue: { id: 'clue_sap', title: 'Sap Lore', content: 'Ancient sap', worldId: 'forest', discoveredAt: 'test' },
  },
};

const result = applyChoiceConsequence(choiceWithConsequence, mockState);
assert(result.nextState.variables.courage === 4, 'Increments numerical variables correctly');
assert(result.nextState.variables.drankSap === true, 'Sets boolean flags correctly');
assert(result.nextState.inventory.some((i) => i.id === 'golden_sap'), 'Adds new item to inventory');
assert(result.nextState.journal.some((j) => j.id === 'clue_sap'), 'Adds new clue to journal');

// TEST SUITE 4: World State Start & Ending Registration
console.log('\nTest Suite 4: World Reset & Ending Vault');
const freshCastle = startWorldState('castle', mockState);
assert(freshCastle.currentWorldId === 'castle', 'Sets currentWorldId to castle');
assert(freshCastle.currentSceneId === 'castle_start', 'Initializes at castle_start');
assert(freshCastle.visitedSceneIds.includes('castle_start'), 'Includes initial scene in visitedSceneIds');

const stateWithEnding = registerEndingUnlock('forest', { id: 'forest_keeper', title: 'The Keeper of Names', type: 'standard' }, mockState);
assert(stateWithEnding.unlockedEndings['forest_forest_keeper'] !== undefined, 'Registers unlocked ending in persistent state');
assert(stateWithEnding.unlockedEndings['forest_forest_keeper'].title === 'The Keeper of Names', 'Stores correct ending title');

// SUMMARY
console.log('\n=============================================');
console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
if (failed > 0) {
  console.error('❌ SOME TESTS FAILED');
  process.exit(1);
} else {
  console.log('✅ ALL ACCEPTANCE TESTS PASSED SUCCESSFULLY!');
  process.exit(0);
}
