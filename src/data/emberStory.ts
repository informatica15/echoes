import { Scene } from '../types/story';

export const EMBER_SCENES: Record<string, Scene> = {
  ember_start: {
    id: 'ember_start',
    worldId: 'ember',
    chapter: 'Prologue: The Dying Spark',
    title: 'The Caldera Temple of Varas',
    sceneType: 'exploration',
    narration: [
      'The last flame is smaller than a heartbeat.',
      'Beyond the temple’s obsidian colonnade, the volcanic kingdom freezes beneath a sky of falling gray ash. Towering basalt spires that once belched rivers of liquid fire now groan under layers of black rime-ice.',
      'Dying Guardian Ignis places the bronze brazier into your frostbitten hands. Inside, a solitary molten ember pulses with a deep crimson rhythm, like the systole and diastole of a wounded god.',
      'The heat against your palms is intoxicating, but with every pulse, a whisper rasps inside your skull: it wants your childhood, your mother’s voice, the taste of spring apples. It feeds on human memory.'
    ],
    dialogue: [
      { speaker: 'Guardian Ignis', text: '"What would you surrender to keep the world alive, child of ash? Answer not with words, but with where you carry it."' }
    ],
    imagePrompt: 'A vast volcanic caldera temple covered in frost and black ash, dying sun in background, a dying elderly guardian in tattered robes handing a bronze brazier with a glowing molten ember to a young protagonist, cinematic dark fantasy concept art, sparks drifting.',
    artTheme: 'ember_start',
    choices: [
      {
        id: 'ember_c1_furnace',
        text: 'Carry the ember up the high basalt road to the Royal Furnace of the Citadel',
        subtext: 'The High Chancellor promises to ignite the grand radiators of the capital.',
        targetSceneId: 'ember_furnace_path',
        consequence: {
          variables: { resilience: 1, obedience: 1 },
          addItem: {
            id: 'living_ember',
            name: 'The Living Ember',
            description: 'The primordial spark of Varas that burns memory to generate radiant warmth.',
            foundAtScene: 'ember_start'
          },
          feedbackText: 'You wrap the brazier in thermal furs and head toward the Citadel spires.'
        }
      },
      {
        id: 'ember_c1_village',
        text: 'Carry it down the canyon to the frozen ruins of the Ashen Village',
        subtext: 'The refugees and miners are freezing in the lower valleys.',
        targetSceneId: 'ember_village_path',
        consequence: {
          variables: { mercy: 2, compassion: 1 },
          addItem: {
            id: 'living_ember',
            name: 'The Living Ember',
            description: 'The primordial spark of Varas that burns memory to generate radiant warmth.',
            foundAtScene: 'ember_start'
          },
          feedbackText: 'You descend the treacherous ice-slick scree toward the refugee encampment.'
        }
      },
      {
        id: 'ember_c1_volcano_core',
        text: 'Climb down into the Forbidden Fissure beneath the extinct magma tube',
        subtext: 'Ancient geothermal inscriptions forbid entrance upon pain of exile.',
        targetSceneId: 'ember_volcano_core',
        consequence: {
          variables: { curiosity: 2, courage: 2 },
          addItem: {
            id: 'living_ember',
            name: 'The Living Ember',
            description: 'The primordial spark of Varas that burns memory to generate radiant warmth.',
            foundAtScene: 'ember_start'
          },
          feedbackText: 'You slip past the warning stele into the glowing volcanic cavern below.'
        }
      }
    ]
  },

  ember_furnace_path: {
    id: 'ember_furnace_path',
    worldId: 'ember',
    chapter: 'Act I: The Golden Spire',
    title: 'The Citadel of the Iron Chancellor',
    sceneType: 'exploration',
    narration: [
      'The Citadel is a fortress of black obsidian reinforced with brass piping. Great steam valves hiss into the freezing wind.',
      'Chancellor Balor greets you with an escort of heavy arquebusiers. But as you are escorted through the boiler catacombs, you witness the horrifying apparatus of the Royal Furnace.',
      'Paupers, sick orphans, and political prisoners are locked in sensory-draining pods. Their memories are distilled into amber liquor and injected into the burner grates to keep the noble palaces warm.'
    ],
    dialogue: [
      { speaker: 'Chancellor Balor', text: 'Sentimentality is a luxury for warm climates, carrier. Give us the ember, and the aristocracy will preserve art and science for a thousand years.' }
    ],
    imagePrompt: 'A colossal industrial-magical furnace chamber of iron and brass pipes, molten orange glow illuminating grim mechanical pods where human memories are harvested, steam venting into freezing air, dark dystopian fantasy.',
    artTheme: 'ember_furnace',
    choices: [
      {
        id: 'ember_c2_furnace_cooperate',
        text: 'Hand over the ember to the Furnace and surrender one of your personal memories',
        subtext: 'The Citadel’s warmth will save thousands, even if the price is monstrous.',
        targetSceneId: 'ember_transmutation_forge',
        consequence: {
          variables: { memorySacrificed: 1, obedience: 2 },
          addClue: {
            id: 'harvest_record',
            title: 'Furnace Consumption Log',
            content: 'The Royal Furnace has consumed 14,000 citizens’ memories over thirty freezing winters.',
            worldId: 'ember',
            category: 'clue',
            discoveredAt: 'ember_furnace_path'
          },
          feedbackText: 'You feel the memory of your first victory turn into grey smoke as the furnace roars.'
        }
      },
      {
        id: 'ember_c2_furnace_rebel',
        text: 'Draw your sidearm, shatter the feeder tubes, and flee into the lower vents',
        subtext: 'Refuse to feed this predatory machine.',
        targetSceneId: 'ember_volcano_core',
        consequence: {
          variables: { courage: 2, mercy: 2, furnaceDefiance: true },
          feedbackText: 'Explosive steam clouds your escape as alarms sound through the Citadel.'
        }
      }
    ]
  },

  ember_village_path: {
    id: 'ember_village_path',
    worldId: 'ember',
    chapter: 'Act I: The Shivering Valley',
    title: 'The Refuge of the Ashen Kin',
    sceneType: 'exploration',
    narration: [
      'The village of Oakhaven Vale is half-buried under volcanic pumice and hoarfrost. Hundreds of survivors huddle inside hollowed-out lava tubes, wrapped in lichen blankets.',
      'An engineer named Senna is working over a deep borehole where green crystalline geodes thrum with low harmonic resonance.',
      '"The ember isn’t the only heat source," Senna tells you, pointing her scanner down the vent. "The core of the planet isn’t dead—it merely crystallized into a piezoelectric mantle. If we resonate it, we don’t need to sacrifice a single soul."'
    ],
    dialogue: [
      { speaker: 'Senna the Tinkerer', text: 'Fire destroys what it feeds upon. Crystals grow when you give them energy. We have been praying to the wrong god.' }
    ],
    imagePrompt: 'A subterranean refugee cavern lit by green glowing mineral crystals and geode veins, a resourceful female engineer showing crystalline seismic core tools to protagonist holding a glowing ember, atmospheric sci-fantasy.',
    artTheme: 'ember_village',
    choices: [
      {
        id: 'ember_c2_village_crystal',
        text: 'Help Senna tune the Geothermal Resonance Array to awaken the crystal mantle',
        subtext: 'A technological and natural harmonic solution to the eternal freeze.',
        targetSceneId: 'ember_geothermal_discovery',
        consequence: {
          variables: { alternatePower: true, curiosity: 2, mercy: 2 },
          addItem: {
            id: 'resonance_tuning_fork',
            name: 'Piezoelectric Tuning Fork',
            description: 'A tool crafted by Senna that vibrates at the natural frequency of the subterranean crystal core.',
            foundAtScene: 'ember_village_path'
          },
          feedbackText: 'The green crystals flare warmly in response to the tuning fork.'
        }
      },
      {
        id: 'ember_c2_village_share_warmth',
        text: 'Use the ember directly to warm the sick children in the infirmary',
        subtext: 'Direct humanitarian relief right now, regardless of the long-term cost.',
        targetSceneId: 'ember_transmutation_forge',
        consequence: {
          variables: { compassion: 3, resilience: 1 },
          feedbackText: 'Color returns to shivering cheeks, but the ember’s fuel dwindles noticeably.'
        }
      }
    ]
  },

  ember_volcano_core: {
    id: 'ember_volcano_core',
    worldId: 'ember',
    chapter: 'Act II: The Primordial Fissure',
    title: 'The Cradle of the World’s First Heat',
    sceneType: 'revelation',
    narration: [
      'Deep beneath the extinct caldera, you stand upon a bridge of black glass suspended over an abyss of silent, glowing magma.',
      'Here, petrified fossil trees from an era before ash are preserved in solid amber. On the central pedestal rests the Prismatic Core: the womb of the planet.',
      'A holographic apparition of Guardian Ignis—not dying, but in the prime of his youth three centuries ago—flickers into existence.'
    ],
    dialogue: [
      { speaker: 'Shade of Ignis', text: 'You were never meant to keep the fire burning forever. Winter is how the planet sheds its toxins. The ember was a crutch, and we made it an idol.' }
    ],
    imagePrompt: 'An epic underground magma chamber with a bridge of obsidian black glass, petrified glowing amber trees, a radiant prism core hovering in center casting rainbow refractions over molten lava, cinematic sci-fantasy.',
    artTheme: 'ember_core',
    choices: [
      {
        id: 'ember_c3_inspect_prism',
        text: 'Inspect the Prismatic Core and discover the truth of human resilience',
        subtext: 'The core reveals that the spark inside every living heart is linked to the planet.',
        targetSceneId: 'ember_geothermal_discovery',
        consequence: {
          variables: { coreTruth: true, curiosity: 3 },
          addClue: {
            id: 'creation_covenant',
            title: 'The Great Planetary Cycle',
            content: 'The world requires periods of glacial quiet to replenish its mineral fertility. The flame was merely a torch to guide humanity through the twilight.',
            worldId: 'ember',
            category: 'lore',
            discoveredAt: 'ember_volcano_core'
          },
          feedbackText: 'The truth hits you with clarity: survival does not require endless burning.'
        }
      },
      {
        id: 'ember_c3_ascend_forge',
        text: 'Ascend to the Transmutation Forge to confront Chancellor Balor’s army',
        subtext: 'The Citadel forces have arrived to seize the core by force.',
        targetSceneId: 'ember_transmutation_forge',
        consequence: {
          variables: { courage: 2 },
          feedbackText: 'You run up the basalt stairwell as war horns reverberate through the mountains.'
        }
      }
    ]
  },

  ember_geothermal_discovery: {
    id: 'ember_geothermal_discovery',
    worldId: 'ember',
    chapter: 'Act II: The Green Hearth',
    title: 'The Awakening of the Deep Roots',
    sceneType: 'revelation',
    narration: [
      'Using the resonance tuning fork against the Prismatic Core, a deep subterranean thrum shakes the mountainside.',
      'Veins of radiant green and gold light shoot through the obsidian crust. Warmth, not from scorching fire, but from gentle geothermal currents, begins to rise from the earth like the breath of spring.',
      'Snow turns to fresh water; dormant seeds deep inside the ash stir toward germination.',
      'Senna and her engineers look on in awe. But in the sky above, Chancellor Balor’s dreadnought descends with cannons primed.'
    ],
    imagePrompt: 'A dramatic scene of black volcanic mountains splitting open with radiant green geothermal light, melting snow into crystal waterfalls, steam rising gently, an airship descending above, cinematic visual grandeur.',
    artTheme: 'ember_geothermal',
    choices: [
      {
        id: 'ember_c3_to_climax_stand',
        text: 'Head to the Crucible Peak to make your stand against the Citadel armada',
        subtext: 'Every faction has gathered at the crater rim.',
        targetSceneId: 'ember_climax_peak',
        consequence: {
          variables: { readyForEmberClimax: true },
          feedbackText: 'You take your place at the highest point of the caldera.'
        }
      }
    ]
  },

  ember_transmutation_forge: {
    id: 'ember_transmutation_forge',
    worldId: 'ember',
    chapter: 'Act II: The Price of Embers',
    title: 'The Altar of Forgetting',
    sceneType: 'dialogue',
    narration: [
      'The heat here is blisteringly intense. The ember in your brazier screams like an infant, pleading for sustenance.',
      'To keep it alive for the next twenty-four hours without the Citadel’s harvest, you must feed it something deeply personal: your name, your first love, or your purpose.',
      'You stand before the great furnace doors, feeling the cold wind howling behind you.'
    ],
    dialogue: [
      { speaker: 'The Ember Voice', text: 'Give me your joy, and I will give you heat. Give me your sorrow, and I will burn the sky.' }
    ],
    imagePrompt: 'A protagonist standing before an imposing glowing furnace mouth, holding a floating blazing ember between hands, tears of light drifting into the flames, dramatic emotional fantasy art.',
    artTheme: 'ember_forge',
    choices: [
      {
        id: 'ember_c3_sacrifice_memory',
        text: 'Feed your memories of home and childhood into the ember',
        subtext: 'Ensure the flame burns furiously for the Citadel’s furnaces.',
        targetSceneId: 'ember_climax_peak',
        consequence: {
          variables: { memorySacrificed: 2, resilience: 2 },
          feedbackText: 'A piece of your past evaporates into sparks. You feel colder inside, but the brazier blazes.'
        }
      },
      {
        id: 'ember_c3_refuse_sacrifice',
        text: 'Refuse to feed the ember: Seek another path at Crucible Peak',
        subtext: 'No flame is worth trading your humanity for.',
        targetSceneId: 'ember_climax_peak',
        consequence: {
          variables: { mercy: 2, courage: 2 },
          feedbackText: 'You close the brazier lid and carry it up to Crucible Peak.'
        }
      }
    ]
  },

  ember_climax_peak: {
    id: 'ember_climax_peak',
    worldId: 'ember',
    chapter: 'Climax: The Last Hearth of the World',
    title: 'The Crucible of the Dying Sun',
    sceneType: 'confrontation',
    narration: [
      'At the highest point of the Caldera rim, the freezing gale shrieks across razor-sharp basalt cliffs. Below, the kingdom’s millions look upward.',
      'Balor stands with his elite guards and memory-extractors. Senna and the rebel miners hold their resonance harpoons.',
      'The dying ember floats above your hands, glowing dimmer by the second. The dying red sun touches the horizon.',
      'Four paths branch before you. Only one choice will shape the fate of the frozen world.'
    ],
    imagePrompt: 'An epic panoramic standoff atop a razor-sharp volcanic peak overlooking a frozen kingdom under twilight, thousands of citizens below, armed factions facing off, glowing ember hovering between them, breathtaking masterpiece.',
    artTheme: 'ember_climax',
    choices: [
      {
        id: 'ember_end_flame_choice',
        text: 'Feed the remaining memories to the ember and plunge it into the Royal Furnace',
        subtext: 'Ending A: The Empire survives in its golden stasis, but the price of memories will never cease.',
        targetSceneId: 'ember_ending_flame',
        consequence: {
          variables: { choseEternalFlame: true }
        }
      },
      {
        id: 'ember_end_ashen_choice',
        text: 'Open your hands, let the wind extinguish the ember, and welcome the Great Winter',
        subtext: 'Ending B: The flame dies. Humanity adapts to the cold dawn and builds a new world without crutches.',
        targetSceneId: 'ember_ending_ashen',
        consequence: {
          variables: { choseWinterDawn: true }
        }
      },
      {
        id: 'ember_end_second_sun_choice',
        text: 'Drive the tuning fork into the Prismatic Core to ignite the Second Sun of geothermal warmth',
        subtext: 'Ending C: Harness the crystal mantle to create infinite, sustainable heat without sacrifice.',
        targetSceneId: 'ember_ending_second_sun',
        condition: {
          isTrue: 'alternatePower'
        },
        consequence: {
          variables: { choseSecondSun: true }
        }
      },
      {
        id: 'ember_end_within_choice',
        text: 'Swallow the ember into your chest, unlocking the ancestral inner spark of humanity',
        subtext: 'Ending D (Secret): Requires Core Truth and refusing to feed human memories.',
        targetSceneId: 'ember_ending_within',
        condition: {
          isTrue: 'coreTruth',
          min: 2
        },
        consequence: {
          variables: { secretInnerEmberUnlocked: true }
        }
      }
    ]
  },

  ember_ending_flame: {
    id: 'ember_ending_flame',
    worldId: 'ember',
    chapter: 'Ending A: The Eternal Flame',
    title: 'The Monument of Stolen Pasts',
    sceneType: 'ending',
    narration: [
      'You feed the ember the memories of your name and surrender it to the Royal Furnace. The grand Citadel boilers roar with roaring crimson fire.',
      'Steam rushes through a thousand brass conduits, warming the grand towers and banquet halls of the capital. The empire survives another century.',
      'You walk the warm marble boulevards in fine robes, decorated with medals of honor. You cannot remember where you were born, or who taught you to walk. But you are warm.'
    ],
    imagePrompt: 'A glittering steampunk-fantasy capital city glowing with fiery orange lights and towering steam vents against a frozen ash sky, a decorated hero walking alone with an empty hollow expression, cinematic melancholic beauty.',
    artTheme: 'ember_ending_flame',
    choices: [],
    endingMeta: {
      endingId: 'ember_flame',
      title: 'The Eternal Flame',
      type: 'standard',
      quote: '"The furnace does not care whose tears it boils, so long as the iron stays warm."',
      summary: 'You saved the imperial civilization by feeding the primordial flame, sealing the kingdom into an unending cycle of memory harvesting.',
      consequences: [
        'The Citadel’s citizens and technological infrastructure survive intact.',
        'The memory-harvesting furnace becomes the kingdom’s permanent state religion.',
        'You lose your personal identity to preserve institutional continuity.'
      ],
      loreReveal: 'Guardian Ignis was once a boy who made this exact trade three hundred years ago.'
    }
  },

  ember_ending_ashen: {
    id: 'ember_ending_ashen',
    worldId: 'ember',
    chapter: 'Ending B: The Ashen Kingdom',
    title: 'The Dawn of Frost and Stone',
    sceneType: 'ending',
    narration: [
      'You open your palms to the biting storm. A solitary wisp of gray smoke curls into the air, and the last ember dies with a soft hiss.',
      'The kingdom goes dark. The aristocrats scream, but after the silence comes the breath of courage. People gather in community lodges, huddling together for shared body warmth.',
      'They learn to insulate with ash brick, to hunt subterranean fauna, and to craft cold-weather shelters. Without a magic flame to depend on, humanity discovers its own endurance.',
      'The sun rises over the glaciers—pale, sharp, and truly honest.'
    ],
    imagePrompt: 'A vast snowy volcanic plain under a crisp icy blue dawn, survivors dressed in thick fur and leather building stone shelters together, communal fires of wood, resilient human spirit, cinematic inspiring winter.',
    artTheme: 'ember_ending_ashen',
    choices: [],
    endingMeta: {
      endingId: 'ember_ashen',
      title: 'The Ashen Kingdom',
      type: 'standard',
      quote: '"We spent centuries fearing the dark, only to realize the stars were waiting in it."',
      summary: 'You allowed the parasitic flame to extinguish, liberating humanity from sacrifice and fostering a rugged, resilient civilization of equals in the snow.',
      consequences: [
        'The exploitative memory economy of the Citadel collapses completely.',
        'Humanity adapts to the natural climate cycle of the world.',
        'A society based on mutual solidarity replaces monarchical tyranny.'
      ],
      loreReveal: 'The planet’s ash soil contains the highest mineral concentration in the solar system, perfectly primed for springtime crops when the glaciers recede.'
    }
  },

  ember_ending_second_sun: {
    id: 'ember_ending_second_sun',
    worldId: 'ember',
    chapter: 'Ending C: The Second Sun',
    title: 'The Geothermal Rebirth',
    sceneType: 'ending',
    narration: [
      'You strike the tuning fork into the Prismatic Core. A shockwave of emerald and gold harmony reverberates across the tectonic plates.',
      'The basalt fissures do not explode with deadly magma; instead, warm geothermal geysers and radiant piezoelectric crystal spires shoot upward through the ice like glowing green trees.',
      'Within hours, the caldera transforms into an oasis of perpetual warmth, clean steam, and mineral hot springs.',
      'Balor’s cannons fall silent. Senna embraces her fellow engineers. The kingdom enters a golden era of clean geological harmony without taking a single memory.'
    ],
    imagePrompt: 'A glorious utopian transformation: volcanic mountains glowing with magnificent towering green crystal spires, natural warm steam rising over turquoise hot spring pools and blooming gardens in the snow, cinematic masterpiece.',
    artTheme: 'ember_ending_second_sun',
    choices: [],
    endingMeta: {
      endingId: 'ember_second_sun',
      title: 'The Second Sun',
      type: 'standard',
      quote: '"The earth never wanted our suffering; it only wanted our curiosity."',
      summary: 'You awakened the planet’s piezoelectric crystal core, replacing the memory-devouring flame with clean, sustainable geothermal energy for all.',
      consequences: [
        'The entire kingdom is heated by sustainable geothermal crystal resonance.',
        'No citizen’s memories are ever harvested again.',
        'Senna’s engineering guild leads the world into an enlightened scientific age.'
      ],
      loreReveal: 'The crystals were planted by the world’s ancient founders precisely as a safeguard for when the ember naturally expired.'
    }
  },

  ember_ending_within: {
    id: 'ember_ending_within',
    worldId: 'ember',
    chapter: 'Ending D (Secret): The Ember Within',
    title: 'The Ignition of the Human Spirit',
    sceneType: 'ending',
    narration: [
      'You bring the living ember to your lips and inhale the cosmic spark. It does not burn your flesh; it merges with the electrical pulse of your nervous system.',
      'A blinding halo of golden warmth radiates outward from your chest. You touch the shivering soldiers, and warmth blooms within them. You touch the frozen earth, and wildflowers burst through the permafrost.',
      'The flame was never an external fuel that required sacrifice—it was the dormant spark of divine consciousness that early humanity forgot how to kindle.',
      'Every person in the kingdom feels their own inner spark awaken. Freezing winds blow harmlessly against skin warmed by the infinite furnace of the human heart.'
    ],
    imagePrompt: 'A transcendent secret ending: a protagonist with a glowing radiant golden heart mandala radiating warm divine golden light outward, people’s eyes glowing with gentle warmth, snow melting around them, blooming flowers, celestial 8k artwork.',
    artTheme: 'ember_ending_within',
    choices: [],
    endingMeta: {
      endingId: 'ember_within',
      title: 'The Ember Within',
      type: 'secret',
      quote: '"We looked to the sky for a sun, never knowing we carried the dawn in our veins."',
      summary: 'By uncovering the hidden truth of the Prismatic Core and refusing to trade away your soul, you awakened the dormant inner hearth within human biology, ending all cold forever.',
      consequences: [
        'Humanity becomes biologically immune to the harsh elements through internal resonance.',
        'The concept of fuel scarcity and memory sacrifice is rendered obsolete.',
        'You become the spiritual progenitor of a transformed, enlightened species.'
      ],
      loreReveal: 'The word "Varas" was not the name of a volcano, but the ancient word for the collective human spirit.'
    }
  }
};
