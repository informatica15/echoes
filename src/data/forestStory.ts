import { Scene } from '../types/story';

export const FOREST_SCENES: Record<string, Scene> = {
  forest_start: {
    id: 'forest_start',
    worldId: 'forest',
    chapter: 'Prologue: The Silver Key',
    title: 'Beneath the Nameless Boughs',
    sceneType: 'exploration',
    narration: [
      'You wake beneath a sky that has forgotten the sun. The air is damp, smelling of petrichor, crushed fern, and ancient loam.',
      'Your clothes are soaked through. On the inside of your left wrist, an unfamiliar runic sigil pulses with faint cyan phosphorescence.',
      'Your memories terminate abruptly at the sound of a voice whispering your name in the dark.',
      'Beneath your trembling fingers lies an ornate silver key, cold as frostbite. On the colossal silver-barked trunk towering above you, a name is freshly carved into the living wood: your own name. Below it reads a date exactly one hundred years into the future.'
    ],
    dialogue: [
      { speaker: 'The Whisper', text: 'Wake now, walker. The forest does not invent... it only keeps what you surrender.' }
    ],
    imagePrompt: 'A vast cinematic enchanted forest shrouded in deep emerald mist and glowing blue runes carved into gargantuan ancient trees. A lone traveler awakens on moss holding a gleaming silver key, shaft of soft moonlight breaking through silver foliage, mysterious, hyper-detailed fantasy art.',
    artTheme: 'forest_dawn',
    choices: [
      {
        id: 'forest_c1_child',
        text: 'Follow the sound of a child crying beyond the weeping willows',
        subtext: 'A high, plaintive voice cuts through the rustling boughs.',
        targetSceneId: 'forest_child_path',
        consequence: {
          variables: { compassion: 1, curiosity: 1 },
          addItem: {
            id: 'silver_key',
            name: 'Silver Key of the First Bough',
            description: 'An intricately carved silver key found at the root of the hundred-year tree.',
            foundAtScene: 'forest_start'
          },
          feedbackText: 'You pocket the silver key and hurry toward the sound of tears.'
        }
      },
      {
        id: 'forest_c1_cave',
        text: 'Enter the limestone cavern where azure lights drift along the stone',
        subtext: 'Luminescent motes dance along damp stalactites.',
        targetSceneId: 'forest_cave_path',
        consequence: {
          variables: { courage: 1, curiosity: 2 },
          addItem: {
            id: 'silver_key',
            name: 'Silver Key of the First Bough',
            description: 'An intricately carved silver key found at the root of the hundred-year tree.',
            foundAtScene: 'forest_start'
          },
          feedbackText: 'Gripping the key, you step into the cool glow of the cavern.'
        }
      },
      {
        id: 'forest_c1_bridge',
        text: 'Cross the swaying bamboo bridge toward the quiet village',
        subtext: 'Paper lanterns flicker silently across a foggy chasm.',
        targetSceneId: 'forest_bridge_path',
        consequence: {
          variables: { curiosity: 1, caution: 1 },
          addItem: {
            id: 'silver_key',
            name: 'Silver Key of the First Bough',
            description: 'An intricately carved silver key found at the root of the hundred-year tree.',
            foundAtScene: 'forest_start'
          },
          feedbackText: 'You test the moss-covered bamboo cables and cross into the mist.'
        }
      }
    ]
  },

  forest_child_path: {
    id: 'forest_child_path',
    worldId: 'forest',
    chapter: 'Act I: The Echo of Tomorrow',
    title: 'The Child at the Crossroads',
    sceneType: 'dialogue',
    narration: [
      'You part the hanging silver moss to find a small girl sitting beside a stone birdbath filled with black water.',
      'She is not weeping because she is lost. She is weeping because she remembers you leaving—an event that has not yet occurred.',
      'Her fingers trace circular patterns on the stone. When she looks up, her eyes are completely clear, reflecting constellations that do not belong to this hemisphere.'
    ],
    dialogue: [
      { speaker: 'The Girl (Kira)', text: 'You shouldn’t have come back. The last time you reached the Root, you took three petals and promised you would not let them burn.' },
      { speaker: 'You', text: 'I have never seen you before. I woke up ten minutes ago.' },
      { speaker: 'The Girl (Kira)', text: 'To you, it’s ten minutes. To the forest, it has been forty-seven seasons of trying to unbind your name.' }
    ],
    imagePrompt: 'A young girl in ragged hooded tunic sitting beside a dark reflective stone birdbath in a moonlit glade, bioluminescent glowing mushrooms, towering weeping willows, emotional atmospheric storytelling fantasy illustration.',
    artTheme: 'forest_child',
    choices: [
      {
        id: 'forest_c2_comfort',
        text: 'Offer her your hand and ask what happened in the previous season',
        subtext: 'Empathy may pierce the fog of her unlived memories.',
        targetSceneId: 'forest_child_prophecy',
        consequence: {
          variables: { compassion: 2, trust: 1 },
          addClue: {
            id: 'prophecy_fragment',
            title: 'Kira’s Memory of the Future',
            content: 'The girl remembers you burning three petals at the Root. She swears you did it to prevent something worse.',
            worldId: 'forest',
            category: 'clue',
            discoveredAt: 'forest_child_path'
          },
          feedbackText: 'Kira clasps your hand. A shudder of temporal warmth passes between you.'
        }
      },
      {
        id: 'forest_c2_birdbath',
        text: 'Look into the dark water of the birdbath to see what she sees',
        subtext: 'The oily surface stirs without any wind.',
        targetSceneId: 'forest_cave_memories',
        consequence: {
          variables: { curiosity: 2, courage: 1 },
          feedbackText: 'The liquid swirls like liquid obsidian, pulling your gaze into its depths.'
        }
      },
      {
        id: 'forest_c2_retreat',
        text: 'Ask her how to find the village where people might still have answers',
        subtext: 'She gestures toward a moss-lined path marked with stone lanterns.',
        targetSceneId: 'forest_bridge_path',
        consequence: {
          variables: { caution: 2 },
          feedbackText: 'She nods solemn agreement and warns: "They know your face, but beware their names."'
        }
      }
    ]
  },

  forest_child_prophecy: {
    id: 'forest_child_prophecy',
    worldId: 'forest',
    chapter: 'Act II: The Unlived Past',
    title: 'The Future’s Witness',
    sceneType: 'revelation',
    narration: [
      'Kira unties a braided cord around her neck. Attached to it is a small vial containing glowing gold resin.',
      '"The Warden of Roots gave this to me before the stars turned backwards," she murmurs. "He said whenever you awaken, you always seek the cavern first, and you always forget that he is not your enemy."',
      'Through the trees behind her, a tall silhouette clad in a mantle of living bark and horn emerges silently. Two pale eyes glow like dying hearth coals.'
    ],
    dialogue: [
      { speaker: 'Kira', text: 'He is here. Don’t run this time. Listen to what he brought from the Great Root.' }
    ],
    imagePrompt: 'A towering mysterious warden in mantle of bark and stag antlers holding a wooden staff carved with glowing cyan runes, standing beside a small child in an ancient glowing forest clearing, cinematic fantasy concept art.',
    artTheme: 'forest_warden',
    choices: [
      {
        id: 'forest_c3_stand_warden',
        text: 'Stand your ground and speak directly with the Warden of Roots',
        subtext: 'Do not flee. Face the figure that has watched forty-seven cycles.',
        targetSceneId: 'forest_warden_encounter',
        consequence: {
          variables: { courage: 2, trust: 2 },
          addItem: {
            id: 'amber_vial',
            name: 'Resin of the First Root',
            description: 'A vial of concentrated amber sap vibrating with temporal memory.',
            foundAtScene: 'forest_child_prophecy'
          },
          feedbackText: 'You step forward calmly. The Warden lowers his antlered staff in respect.'
        }
      },
      {
        id: 'forest_c3_flee_cavern',
        text: 'Pull Kira away toward the subterranean azure cavern',
        subtext: 'The towering figure seems too menacing to trust without evidence.',
        targetSceneId: 'forest_cave_path',
        consequence: {
          variables: { caution: 2, courage: 1 },
          feedbackText: 'You sprint toward the cavern mouth as the Warden watches without pursuit.'
        }
      }
    ]
  },

  forest_cave_path: {
    id: 'forest_cave_path',
    worldId: 'forest',
    chapter: 'Act I: Subterranean Whispers',
    title: 'The Cavern of Stolen Glass',
    sceneType: 'exploration',
    narration: [
      'The cave ceiling glitters with millions of bioluminescent crystal organisms, casting ethereal turquoise ripples over jagged stone pillars.',
      'As you advance deeper, you realize the walls are not bare limestone—they are studded with smooth glass orbs, each capturing a silent, looping memory.',
      'In one orb, a person with your exact face is laughing by a seaside bonfire. In another, you are weeping beside a burning carriage. In a third, you are handing a silver key to a cloaked stranger.'
    ],
    dialogue: [
      { speaker: 'Echo in the Stone', text: 'We do not steal memories to starve you. We store them so the world will not choke on its grief.' }
    ],
    imagePrompt: 'A vast crystalline subterranean cave glowing in vivid cyan and sapphire light, ancient glass spheres embedded in stone walls displaying looping memories, underground mineral pool, cinematic moody fantasy.',
    artTheme: 'forest_cave',
    choices: [
      {
        id: 'forest_c2_touch_orb',
        text: 'Touch the memory orb showing you handing over the silver key',
        subtext: 'The glass is warm, humming like a trapped bumblebee.',
        targetSceneId: 'forest_cave_memories',
        consequence: {
          variables: { curiosity: 2, memoriesFound: 1 },
          addClue: {
            id: 'key_memory',
            title: 'Memory: The Handover',
            content: 'You gave the key to the Warden centuries ago, asking him to lock away your name until you were ready.',
            worldId: 'forest',
            category: 'memory',
            discoveredAt: 'forest_cave_path'
          },
          feedbackText: 'A flash of sensory memory floods your mind. You smell smoke and hear an oath.'
        }
      },
      {
        id: 'forest_c2_altar',
        text: 'Follow the crystal flowstone deeper toward the Ancient Altar of Scribes',
        subtext: 'A stone plinth sits in the center of an underground pool.',
        targetSceneId: 'forest_cave_relic',
        consequence: {
          variables: { courage: 2 },
          feedbackText: 'Wading through knee-deep glowing water, you approach the altar.'
        }
      }
    ]
  },

  forest_cave_memories: {
    id: 'forest_cave_memories',
    worldId: 'forest',
    chapter: 'Act II: The Reflection Pool',
    title: 'The Well of Original Sins',
    sceneType: 'revelation',
    narration: [
      'The memory shocks your nervous system. You were not a victim who wandered into this woods—you were its original architect.',
      'Two hundred years ago, to save your people from a plague that erased identities, you bound your own true name to the primordial Great Root, transforming the woods into an ark for lost consciousness.',
      'Near the edge of the pool lies an inscribed tablet of petrified slate: The Runic Cipher of Release.'
    ],
    dialogue: [
      { speaker: 'Your Forgotten Self', text: 'If you are hearing this, the cycle has grown too heavy. Break the key or unlock the root. Do not linger in between.' }
    ],
    imagePrompt: 'A glowing underground lake beneath stalactites, reflection of a protagonist staring into water seeing an ancient royal version of themselves, runic slate glowing with gold glyphs on shore, cinematic fantasy.',
    artTheme: 'forest_pool',
    choices: [
      {
        id: 'forest_c3_take_cipher',
        text: 'Commit the Runic Cipher to memory and take the slate',
        subtext: 'This cipher is needed to unlock the deepest chambers of the Great Root.',
        targetSceneId: 'forest_hollow_heart',
        consequence: {
          variables: { cipherFound: true, curiosity: 2, courage: 1 },
          addItem: {
            id: 'runic_cipher',
            name: 'Runic Cipher of Release',
            description: 'An ancient slate detailing the harmonic frequencies needed to unlock the Great Root.',
            foundAtScene: 'forest_cave_memories'
          },
          feedbackText: 'The ancient glyphs burn themselves into your memory.'
        }
      },
      {
        id: 'forest_c3_cave_exit_village',
        text: 'Exit the cave through an upward fissure leading toward the Abandoned Village',
        subtext: 'Fresh pine scent drifts down from the opening above.',
        targetSceneId: 'forest_bridge_path',
        consequence: {
          variables: { caution: 1 },
          feedbackText: 'You scramble up the damp limestone chimney into the moonlight.'
        }
      }
    ]
  },

  forest_cave_relic: {
    id: 'forest_cave_relic',
    worldId: 'forest',
    chapter: 'Act II: The Scribe’s Altar',
    title: 'The Reliquary of Lost Wills',
    sceneType: 'exploration',
    narration: [
      'On the obsidian plinth rests a wooden coffer carved with interlocking vines.',
      'A keyhole in the shape of your silver key glimmers in the pale phosphorescence.',
      'Above the keyhole is carved a stern warning: "Whoever unseals this reliquary restores the burden of thirty generations. No mind walks away unchanged."'
    ],
    imagePrompt: 'An ornate ancient obsidian plinth with a glowing silver keyhole in a subterranean cavern, bioluminescent water reflections, sacred aura, cinematic fantasy.',
    artTheme: 'forest_altar',
    choices: [
      {
        id: 'forest_c3_unlock_relic',
        text: 'Insert the silver key and turn the lock',
        subtext: 'Requires the Silver Key of the First Bough.',
        targetSceneId: 'forest_warden_encounter',
        condition: {
          requiredItem: 'silver_key'
        },
        consequence: {
          variables: { courage: 2, relicUnlocked: true },
          addItem: {
            id: 'primordial_sap',
            name: 'Chalice of Primordial Sap',
            description: 'The essence drawn from the First Root, pulsing with ancestral memories.',
            foundAtScene: 'forest_cave_relic'
          },
          feedbackText: 'The lock clicks with a sound like ringing church bells. Ancient golden sap pours forth.'
        }
      },
      {
        id: 'forest_c3_leave_relic',
        text: 'Heed the warning and seek the village instead',
        subtext: 'Perhaps living people can explain the stakes before you unlock thirty generations of sorrow.',
        targetSceneId: 'forest_bridge_path',
        consequence: {
          variables: { caution: 2 },
          feedbackText: 'You back away from the plinth and find the tunnel leading above ground.'
        }
      }
    ]
  },

  forest_bridge_path: {
    id: 'forest_bridge_path',
    worldId: 'forest',
    chapter: 'Act I: The Village of Silent Bells',
    title: 'The Hollow Settlement',
    sceneType: 'exploration',
    narration: [
      'The bamboo bridge creaks beneath your boots. Below, a river of pale fog flows like glacial milk.',
      'You step into a courtyard surrounded by stilt-houses thatched with silver leaves. Wind chimes made of carved bone clink softly in the breeze.',
      'Several figures in woven grey robes are gathered around an extinguished hearth. As you approach, they rise in unison and bow deeply.',
      'None of them speak names. Their faces are calm, almost vacant, yet when they look upon you, genuine tears well in their eyes.'
    ],
    dialogue: [
      { speaker: 'Elder Varis', text: 'You have returned on the scheduled night. The tree in the grove has reached its hundredth year.' },
      { speaker: 'You', text: 'Who am I to you? What is this place?' },
      { speaker: 'Elder Varis', text: 'You are the only one among us permitted to remember tomorrow.' }
    ],
    imagePrompt: 'An abandoned mystical village built on wooden stilts in foggy enchanted forest, robed villagers holding paper lanterns, bone wind chimes, cinematic eerie and peaceful fantasy concept art.',
    artTheme: 'forest_village',
    choices: [
      {
        id: 'forest_c2_ask_names',
        text: 'Ask why none of them carry names on their clothes or homes',
        subtext: 'Their robes are marked with blank linen patches.',
        targetSceneId: 'forest_village_names',
        consequence: {
          variables: { compassion: 1, curiosity: 2 },
          feedbackText: 'Elder Varis gestures toward the village square shrine.'
        }
      },
      {
        id: 'forest_c2_confront_warden',
        text: 'Ask about the antlered figure stalking the edge of the tree line',
        subtext: 'You spot the Warden of Roots watching the village from the shadows.',
        targetSceneId: 'forest_warden_encounter',
        consequence: {
          variables: { courage: 2, trust: 1 },
          feedbackText: 'The elder touches your sleeve: "He is our shepherd, and your oldest rival."'
        }
      }
    ]
  },

  forest_village_names: {
    id: 'forest_village_names',
    worldId: 'forest',
    chapter: 'Act II: The Great Ledger',
    title: 'The Tree of Carved Fates',
    sceneType: 'revelation',
    narration: [
      'Varis leads you to the center of the village, where a dead ironwood tree has hundreds of wooden shingles tied to its branches.',
      '"Every person who entered this valley gave up their grief, their shame, and their name. In exchange, we feel neither terror nor despair," Varis explains softly.',
      '"Only one person insisted on retaining their true name: you. You carved it on the border tree so you would never be seduced into our eternal sleep."',
      'Varis offers you a small wooden talisman containing the dried seed of the First Root.'
    ],
    imagePrompt: 'An ancient ironwood tree hung with hundreds of inscribed wooden shingles in misty village square, an elder elder monk handing a glowing seed to protagonist, cinematic emotive fantasy.',
    artTheme: 'forest_elder',
    choices: [
      {
        id: 'forest_c3_take_seed',
        text: 'Accept the Seed of the First Root and head to the Great Mother Tree',
        subtext: 'The seed pulses in harmony with the silver key in your pocket.',
        targetSceneId: 'forest_hollow_heart',
        consequence: {
          variables: { compassion: 2, courage: 1 },
          addItem: {
            id: 'root_seed',
            name: 'Seed of the First Root',
            description: 'A dormant seed containing the unfiltered memory of the original forest dwellers.',
            foundAtScene: 'forest_village_names'
          },
          feedbackText: 'You clutch the warm seed. It thrums against your chest.'
        }
      },
      {
        id: 'forest_c3_seek_warden_village',
        text: 'Seek out the Warden of Roots to demand the whole truth before making a choice',
        subtext: 'You refuse to act without knowing what the warden knows.',
        targetSceneId: 'forest_warden_encounter',
        consequence: {
          variables: { curiosity: 2, trust: 2 },
          feedbackText: 'You walk toward the forest border where the horned sentinel waits.'
        }
      }
    ]
  },

  forest_warden_encounter: {
    id: 'forest_warden_encounter',
    worldId: 'forest',
    chapter: 'Act III: The Forty-Seventh Lifetime',
    title: 'Confronting the Warden',
    sceneType: 'confrontation',
    narration: [
      'The Warden of Roots stands in a circle of petrified white oaks. As you draw near, he sets aside his staff of bone and removes his carved wooden mask.',
      'Beneath the mask is not a monster. It is a tired, weathered face lined with centuries of vigil. His eyes hold neither hatred nor malice—only profound sorrow.',
      '"For forty-six lifetimes, you have reached this threshold," the Warden speaks, his voice like grinding riverstones. "Every time, you try to break the spell. Every time, the flood of restored grief shatters your spirit, and you beg the forest to take your name again."'
    ],
    dialogue: [
      { speaker: 'The Warden', text: 'I am not your jailer. I am your promise. You made me swear that if you ever faltered, I would safeguard the boundary.' },
      { speaker: 'You', text: 'And if I am ready to carry the grief this time?' },
      { speaker: 'The Warden', text: 'Then prove it. What will you do with the Mother Tree?' }
    ],
    imagePrompt: 'A dramatic confrontation in a moonlit clearing of petrified white trees. A weathered warden holds a carved wooden mask at his hip, speaking to the protagonist. Cinematic lighting, glowing emerald particles, profound emotional depth.',
    artTheme: 'forest_warden_unmasked',
    choices: [
      {
        id: 'forest_c4_trust_warden',
        text: 'Trust the Warden: Offer him the silver key and ask to share the stewardship together',
        subtext: 'You have both suffered for forty-six lifetimes. Break the isolation.',
        targetSceneId: 'forest_hollow_heart',
        consequence: {
          variables: { trust: 3, guideTrust: true, compassion: 2 },
          addClue: {
            id: 'wardens_oath',
            title: 'The Warden’s True Identity',
            content: 'The Warden was your closest companion who agreed to bear the physical anchor while you wandered the cycles.',
            worldId: 'forest',
            category: 'lore',
            discoveredAt: 'forest_warden_encounter'
          },
          feedbackText: 'The Warden sighs, his shoulders dropping years of tension. "Together, then."'
        }
      },
      {
        id: 'forest_c4_reject_warden',
        text: 'Reject his warnings: Declare that the people deserve their true names, whatever the pain',
        subtext: 'Ignorance is not peace. The cycle must end today.',
        targetSceneId: 'forest_hollow_heart',
        consequence: {
          variables: { courage: 3, guideTrust: false },
          feedbackText: 'The Warden nods grimly. "Then walk to the Mother Tree. I will not stop you, but brace yourself."'
        }
      },
      {
        id: 'forest_c4_flee_border',
        text: 'Abandon the forest and run toward the foggy northern boundary',
        subtext: 'You refuse to play this endless game of sacrifices.',
        targetSceneId: 'forest_ending_escape',
        consequence: {
          variables: { escapee: true },
          feedbackText: 'You sprint past the petrified oaks toward the mist-veiled horizon.'
        }
      }
    ]
  },

  forest_hollow_heart: {
    id: 'forest_hollow_heart',
    worldId: 'forest',
    chapter: 'Climax: The Mother Tree of Time',
    title: 'The Chamber of the Primordial Root',
    sceneType: 'confrontation',
    narration: [
      'You stand inside the hollow colossus of the Mother Tree. The interior is a cathedral of living wood, rising into a canopy of glowing constellations.',
      'At the center rests the Primordial Root—a beating heart of silver amber through which the memories of millions flow like rivers of starlight.',
      'Three ancient locks are visible upon the Root’s heartwood. Your silver key hums with immense magnetic energy.',
      'The time has arrived. Every choice made since your awakening now converges upon this single sanctum.'
    ],
    imagePrompt: 'Inside a titanic hollow ancient tree trunk forming a cosmic wooden cathedral, a glowing silver-amber pulsing primordial heart root in center, ethereal starlight, glowing runic roots, breathtaking cinematic fantasy masterwork.',
    artTheme: 'forest_mother_tree',
    choices: [
      {
        id: 'forest_end_keeper_choice',
        text: 'Carve your name permanently into the heartwood to anchor the forest for another century',
        subtext: 'Ending A: Preserve the haven for the grief-stricken, surrendering your own outside life.',
        targetSceneId: 'forest_ending_keeper',
        consequence: {
          variables: { sacrificedIdentity: true }
        }
      },
      {
        id: 'forest_end_dawn_choice',
        text: 'Turn the silver key counter-clockwise to dissolve the enchantment and restore all names',
        subtext: 'Ending C: The forest will wake. All fifty generations will reclaim their true pasts.',
        targetSceneId: 'forest_ending_dawn',
        consequence: {
          variables: { restoredMemories: true }
        }
      },
      {
        id: 'forest_end_root_choice',
        text: 'Apply the Runic Cipher, insert the Silver Key, and unite your spirit with the Warden',
        subtext: 'Ending D (Secret): Requires Runic Cipher, Silver Key, and Warden’s Trust.',
        targetSceneId: 'forest_ending_root',
        condition: {
          requiredItem: 'silver_key',
          isTrue: 'guideTrust',
          isFalse: 'escapee'
        },
        consequence: {
          variables: { secretEndingUnlocked: true }
        }
      }
    ]
  },

  forest_ending_keeper: {
    id: 'forest_ending_keeper',
    worldId: 'forest',
    chapter: 'Ending A: The Keeper of Names',
    title: 'The Eternal Sentinel',
    sceneType: 'ending',
    narration: [
      'You press your silver key into the heartwood and speak your name into the sap. The wood drinks the syllables hungrily.',
      'A profound wave of calm washes over the valley. The crying child Kira finds peaceful slumber. The villagers in their stilt-houses lay down to gentle dreams untainted by ancient wars.',
      'As your own memories begin to dissolve into the emerald boughs, you feel no terror—only the quiet pride of a guardian who gave everything so others might rest in peace.'
    ],
    imagePrompt: 'A peaceful, melancholic ending scene: the protagonist gracefully merging into an ancient glowing silver tree trunk, emerald leaves drifting down, peaceful serene smile, glowing runes, cinematic emotional art.',
    artTheme: 'forest_ending_keeper',
    choices: [],
    endingMeta: {
      endingId: 'forest_keeper',
      title: 'The Keeper of Names',
      type: 'standard',
      quote: '"A name given to the wood is never lost—it is only whispered to the leaves."',
      summary: 'You sacrificed your personal identity to maintain the sanctuary of the forest, preserving peace for countless weary souls for another century.',
      consequences: [
        'The forest sanctuary remains intact for 100 more years.',
        'Kira and the villagers are protected from traumatic historical memories.',
        'You become the new living heartwood of the forest.'
      ],
      loreReveal: 'The tree you woke beneath at the start already carried your name because you chose this exact sacrifice in every timeline that came before.'
    }
  },

  forest_ending_escape: {
    id: 'forest_ending_escape',
    worldId: 'forest',
    chapter: 'Ending B: The Last Human',
    title: 'Beyond the Fog Boundary',
    sceneType: 'ending',
    narration: [
      'You sprint through the northern mist, refusing the burden of roots and ancient altars. The ground slopes sharply upward.',
      'You burst through the perimeter of silver boughs onto a barren windswept cliff.',
      'Looking out into the world beyond, you freeze. There are no cities, no civilizations, no people. The outside world is a petrified wasteland of gray stone and silent horizons.',
      'The forest was not a prison. It was the last living ark on a dead planet.'
    ],
    imagePrompt: 'A solitary wanderer standing atop a wind-swept cliff looking over a silent petrified gray world of stone monoliths under a twilight sky, green mist trailing behind them from the forest border, cinematic haunting ending.',
    artTheme: 'forest_ending_escape',
    choices: [],
    endingMeta: {
      endingId: 'forest_escape',
      title: 'The Last Human',
      type: 'standard',
      quote: '"Freedom is a hollow trophy when there is no world left to share it with."',
      summary: 'You fled the forest to preserve your individual autonomy, only to discover that the world outside had perished centuries ago.',
      consequences: [
        'You preserved your own memories and physical life.',
        'You discovered the devastating truth about the world beyond.',
        'The forest continues its quiet cycle behind you.'
      ],
      loreReveal: 'The ancient plague was not an illness of minds—it was the extinction of the earth itself, and the forest was built to preserve humanity’s last embers.'
    }
  },

  forest_ending_dawn: {
    id: 'forest_ending_dawn',
    worldId: 'forest',
    chapter: 'Ending C: The Forgotten Dawn',
    title: 'The Breaking of the Cycle',
    sceneType: 'ending',
    narration: [
      'You twist the silver key counter-clockwise. A resonant bell chime rings through the trunk, shattering the hundred-year seal.',
      'Emerald light bursts upward through the canopy, piercing the sunless sky. For the first time in two centuries, dawn sunlight breaks over the valley.',
      'In the village, men and women weep as their childhood memories, loves, losses, and triumphs return in a torrent of living truth. Painful, yes—but real.',
      'Kira looks at you with a bright smile of genuine recognition: "We are finally awake."'
    ],
    imagePrompt: 'A glorious fantasy dawn bursting with golden sunlight and emerald light through an opening canopy, villagers weeping with joy and embracing in a sunlit valley, glowing leaves spiraling into sky, cinematic masterpiece.',
    artTheme: 'forest_ending_dawn',
    choices: [],
    endingMeta: {
      endingId: 'forest_dawn',
      title: 'The Forgotten Dawn',
      type: 'standard',
      quote: '"Grief was never meant to be buried; it was meant to teach us how to love."',
      summary: 'You dissolved the enchantment and broke the 47-cycle loop, restoring true memories to all inhabitants and welcoming the dawn.',
      consequences: [
        'The eternal loop of the forest is permanently broken.',
        'Every villager reclaims their history, grief, and humanity.',
        'The sun rises over the valley for the first time in two centuries.'
      ],
      loreReveal: 'Restoring memory also restores natural mortality, but the villagers choose authentic life over eternal numbness.'
    }
  },

  forest_ending_root: {
    id: 'forest_ending_root',
    worldId: 'forest',
    chapter: 'Ending D (Secret): The Secret Root',
    title: 'The Harmonic Convergence',
    sceneType: 'ending',
    narration: [
      'Using the Runic Cipher, you align the three harmonic rings around the Mother Tree’s heartwood. The Warden places his palm over yours on the silver key.',
      'Neither erasing memory nor succumbing to its crushing sorrow, you unlock the Primordial Secret: the Root was never a barrier against the dying world, but a germination engine for a new one.',
      'The tree’s roots pulse with starlight, sending living green veins across the petrified planet. Seedlings sprout from barren stone. Kira steps into the light as the daughter of the new genesis.',
      'You and the Warden stand together at the dawn of a transformed world.'
    ],
    imagePrompt: 'A breathtaking secret ending illustration: cosmic silver and golden roots spreading outward from a colossal glowing world-tree across the lands, turning barren stone into lush blooming gardens, two guardians standing shoulder to shoulder, cinematic 8k wallpaper.',
    artTheme: 'forest_ending_root',
    choices: [],
    endingMeta: {
      endingId: 'forest_root',
      title: 'The Secret Root',
      type: 'secret',
      quote: '"We did not end the dream. We invited the world to grow into it."',
      summary: 'By uncovering the hidden cipher, trusting your ancient companion, and solving the harmonic locks, you unlocked the primordial germination cycle that revitalizes the entire world.',
      consequences: [
        'The petrified world outside is revitalized by primordial roots.',
        'Humanity’s lost history is synthesized into wisdom rather than forgotten.',
        'You and the Warden break all cycles and step into a new era.'
      ],
      loreReveal: 'The hundred-year date carved on your waking tree was not your death—it was the scheduled planting date of the new universe.'
    }
  }
};
