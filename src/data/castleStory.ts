import { Scene } from '../types/story';

export const CASTLE_SCENES: Record<string, Scene> = {
  castle_start: {
    id: 'castle_start',
    worldId: 'castle',
    chapter: 'Prologue: The Phantom Seal',
    title: 'The Gates of Oakhaven Keep',
    sceneType: 'exploration',
    narration: [
      'The kingdom remembers a war that never happened. Its people remember a king who never existed.',
      'Yet the heavy parchment letter in your hand bears his imperial wax seal—pressed with an ornate lion with two tails. Most terrifying of all, the sweeping calligraphy inside is in your own unmistakable handwriting.',
      'Before your boots can even touch the threshold stone of the drawbridge, the colossal iron-studded gates of the cliffside fortress groan and swing inward of their own accord.',
      'Inside the grand entry hall, oil lamps ignite in sequence. Along the stone gallery hang royal portraits spanning two centuries. In the third portrait, King Alden II wears the crimson coronation mantle—and his face is identical to yours.'
    ],
    dialogue: [
      { speaker: 'The Portrait Plaque', text: '"Alden II, Sovereign of the Quiet Decade. Slain before his birth."' }
    ],
    imagePrompt: 'A monumental dark fantasy gothic castle on an autumn cliff overlooking a misty mountain lake with red maple leaves drifting, moonlit stone drawbridge, antique lanterns glowing warmly, regal and cinematic historical fantasy.',
    artTheme: 'castle_entrance',
    choices: [
      {
        id: 'castle_c1_archive',
        text: 'Enter the Grand Royal Archive to inspect the forbidden forbidden chronicles',
        subtext: 'Endless rows of vellum folios glow beneath stained glass.',
        targetSceneId: 'castle_archive_path',
        consequence: {
          variables: { truthSeeking: 1, intrigue: 1 },
          addItem: {
            id: 'sealed_letter',
            name: 'The King’s Sealed Letter',
            description: 'A royal missive addressed to King Alden II in your handwriting, signed with the two-tailed lion.',
            foundAtScene: 'castle_start'
          },
          feedbackText: 'You clutch the letter and turn toward the vaulted archival wing.'
        }
      },
      {
        id: 'castle_c1_masked',
        text: 'Follow the masked figure slipping into the spiral catacomb stairwell',
        subtext: 'A cloak lined with gold silk darts down the shadows.',
        targetSceneId: 'castle_masked_path',
        consequence: {
          variables: { intrigue: 2, courage: 1 },
          addItem: {
            id: 'sealed_letter',
            name: 'The King’s Sealed Letter',
            description: 'A royal missive addressed to King Alden II in your handwriting, signed with the two-tailed lion.',
            foundAtScene: 'castle_start'
          },
          feedbackText: 'You match footsteps with the cloaked apparition down into the depths.'
        }
      },
      {
        id: 'castle_c1_throne',
        text: 'Walk straight down the crimson carpet to the vacant Throne Room',
        subtext: 'Deliver the sealed missive directly to the high seat of power.',
        targetSceneId: 'castle_throne_path',
        consequence: {
          variables: { loyalty: 2 },
          addItem: {
            id: 'sealed_letter',
            name: 'The King’s Sealed Letter',
            description: 'A royal missive addressed to King Alden II in your handwriting, signed with the two-tailed lion.',
            foundAtScene: 'castle_start'
          },
          feedbackText: 'Your boots echo on marble as you advance toward the gold throne.'
        }
      }
    ]
  },

  castle_archive_path: {
    id: 'castle_archive_path',
    worldId: 'castle',
    chapter: 'Act I: Ink of Revision',
    title: 'The Vault of Living Vellum',
    sceneType: 'exploration',
    narration: [
      'The archive smells of beeswax, dried lavender, and old iron gall ink. Thousands of codices stretch upwards into high gothic vaults.',
      'You open the *Great War of the Three Rivers*—the defining tragedy taught to every schoolchild in the kingdom.',
      'As you gaze at the page, the ink itself moves. Letters dissolve and rearrange like black ants. Where a heroic cavalry charge was recorded, the text rewrites itself to describe a peaceful diplomatic signing.',
      'At the head of a mahogany reading desk stands Grand Archivist Theresa, holding a pen with an iridescent silver quill.'
    ],
    dialogue: [
      { speaker: 'Archivist Theresa', text: 'History is not stone, my lord. It is bread. If we do not knead it daily, the kingdom chokes on its ancient enmities.' }
    ],
    imagePrompt: 'A colossal gothic library filled with towering bookshelves, warm lanterns, floating dust motes, illuminated manuscripts with liquid shifting ink, an archivist holding a glowing silver quill, regal dark academia.',
    artTheme: 'castle_archive',
    choices: [
      {
        id: 'castle_c2_demand_truth',
        text: 'Demand to know who authorized the rewriting of the nation’s history',
        subtext: 'Unveil the mechanism behind this manufactured reality.',
        targetSceneId: 'castle_archivist_confrontation',
        consequence: {
          variables: { truthSeeking: 2, intrigue: 1 },
          addClue: {
            id: 'temporal_ink',
            title: 'Chronicle Revision Ledger',
            content: 'Theresa’s quill uses water from the Castle’s subterranean temporal spring to rewrite past events.',
            worldId: 'castle',
            category: 'clue',
            discoveredAt: 'castle_archive_path'
          },
          feedbackText: 'Theresa’s quill pauses. Her sharp gaze measures your resolve.'
        }
      },
      {
        id: 'castle_c2_steal_ledger',
        text: 'Swipe the Black Ledger of Erased Regimes resting beside her lectern',
        subtext: 'The ledger holds the true names of rulers expunged from memory.',
        targetSceneId: 'castle_mirror_chamber',
        consequence: {
          variables: { intrigue: 2, courage: 2 },
          addItem: {
            id: 'black_ledger',
            name: 'The Black Ledger of Erased Regimes',
            description: 'A forbidden volume recording three complete timelines that were edited out of existence.',
            foundAtScene: 'castle_archive_path'
          },
          feedbackText: 'You snatch the heavy velvet-bound ledger and slip into the gallery.'
        }
      }
    ]
  },

  castle_masked_path: {
    id: 'castle_masked_path',
    worldId: 'castle',
    chapter: 'Act I: The Under-Keep',
    title: 'The Catacombs of Echoes',
    sceneType: 'exploration',
    narration: [
      'You chase the gold-trimmed mantle down five flights of spiral stairs, where the masonry transitions from cut granite to ancient subterranean bedrock.',
      'The air turns cold as winter well-water. The masked stranger halts beside a circular basin carved with twelve celestial houses.',
      'The figure turns and lifts the silver filigree mask. Behind it is your own face—older, marked by a scar running through the right eyebrow that you do not yet possess.'
    ],
    dialogue: [
      { speaker: 'Your Future Self', text: 'You arrived seven minutes later than I did in my loop. Good. That means our divergence has begun.' },
      { speaker: 'You', text: 'Who wrote the letter?' },
      { speaker: 'Your Future Self', text: 'You will write it in twenty minutes, if you survive what Theresa has locked in the Throne Room.' }
    ],
    imagePrompt: 'A moody underground stone catacomb with antique brass lanterns, the protagonist coming face to face with an older version of themselves holding a silver mask, dramatic chiaroscuro lighting, regal fantasy mystery.',
    artTheme: 'castle_masked',
    choices: [
      {
        id: 'castle_c2_ask_scar',
        text: 'Ask how they received the scar and what choice caused the loop',
        subtext: 'Learn from the missteps of your alternate self.',
        targetSceneId: 'castle_masked_reveal',
        consequence: {
          variables: { timelineKnowledge: 2, truthSeeking: 1 },
          addClue: {
            id: 'timeline_loop_clue',
            title: 'The Incomplete Sovereignty',
            content: 'Your future self took the crown to prevent civil war, only to find the throne trapped in an endless repeating harvest of memories.',
            worldId: 'castle',
            category: 'lore',
            discoveredAt: 'castle_masked_path'
          },
          feedbackText: 'Your future self points to the high keep: "The crown does not rule; it feeds."'
        }
      },
      {
        id: 'castle_c2_take_mask',
        text: 'Accept their silver mask and the brass chronometer in their hand',
        subtext: 'The chronometer ticks backwards in sync with your pulse.',
        targetSceneId: 'castle_mirror_chamber',
        consequence: {
          variables: { intrigue: 2 },
          addItem: {
            id: 'temporal_chronometer',
            name: 'Chronometer of Divergence',
            description: 'A pocket watch with gears that turn counter-clockwise, tracking timeline shifts.',
            foundAtScene: 'castle_masked_path'
          },
          feedbackText: 'You tuck the chronometer into your coat as your double vanishes into the shadows.'
        }
      }
    ]
  },

  castle_throne_path: {
    id: 'castle_throne_path',
    worldId: 'castle',
    chapter: 'Act I: The Hall of Sovereign Phantoms',
    title: 'The Gilded Solitude',
    sceneType: 'dialogue',
    narration: [
      'The double mahogany doors swing open to reveal the Grand Throne Room. Enormous stained glass windows depict great military triumphs that the history books declare never occurred.',
      'On the dais sits not an empty chair, but Lord Inquisitor Vane, armored in polished black steel and holding a sheathed broadsword across his knees.',
      'He looks at the sealed letter in your hand with weary recognition.'
    ],
    dialogue: [
      { speaker: 'Inquisitor Vane', text: 'Everyone in this castle calls me the villain. They say I cling to blood and iron while Theresa weaves sweet dreams. But do you know what her sweet dreams cost?' },
      { speaker: 'You', text: 'They cost the truth.' },
      { speaker: 'Inquisitor Vane', text: 'Worse. They cost every man and woman who died in the real war the right to have ever lived.' }
    ],
    imagePrompt: 'A magnificent vaulted gothic throne room with red autumn light filtering through stained glass, a brooding knight in black steel armor sitting upon the steps of an antique gold throne, cinematic historical fantasy.',
    artTheme: 'castle_throne',
    choices: [
      {
        id: 'castle_c2_ally_vane',
        text: 'Offer your alliance to Inquisitor Vane to shatter the illusions of the keep',
        subtext: 'The knight has preserved the unredacted chronicle in his vault.',
        targetSceneId: 'castle_archivist_confrontation',
        consequence: {
          variables: { courage: 2, loyalty: 2 },
          addItem: {
            id: 'inquisitor_seal',
            name: 'The Iron Lion Sigil',
            description: 'Vane’s personal seal, capable of unsealing royal vaults across the castle.',
            foundAtScene: 'castle_throne_path'
          },
          feedbackText: 'Vane sheathes his blade and stands beside you with a nod of respect.'
        }
      },
      {
        id: 'castle_c2_read_letter',
        text: 'Break the wax seal on your letter right before his eyes',
        subtext: 'Read what your own handwriting commanded before proceeding.',
        targetSceneId: 'castle_masked_reveal',
        consequence: {
          variables: { truthSeeking: 2 },
          feedbackText: 'The wax snaps with a sharp crack. The words inside flare with gold fire.'
        }
      }
    ]
  },

  castle_archivist_confrontation: {
    id: 'castle_archivist_confrontation',
    worldId: 'castle',
    chapter: 'Act II: The Loom of Years',
    title: 'The Archivist’s Loom',
    sceneType: 'confrontation',
    narration: [
      'Beneath the archive floor, a massive clockwork apparatus turns in a basin of shimmering liquid mercury: The Chronos Loom.',
      'Archivist Theresa stands at the control console, dipping fresh parchment into the mercury to dictate tomorrow’s historical consensus.',
      '"Without my revisions," she warns, her voice trembling with conviction, "the four ducal houses would have torn this kingdom apart sixty years ago. Millions would have perished in famine and siege. I gave them peace! All I asked in return was their permission to tidy up their memories."'
    ],
    dialogue: [
      { speaker: 'Archivist Theresa', text: 'You, my lord, were our finest monarch. Because when the wars were at their bloodiest, you were the one who ordered me to build this loom!' }
    ],
    imagePrompt: 'A vast subterranean clockwork chamber with colossal rotating gears and a glowing basin of liquid mercury reflecting stained glass, an archivist in burgundy robes operating an intricate loom mechanism, dramatic lighting.',
    artTheme: 'castle_loom',
    choices: [
      {
        id: 'castle_c3_destroy_loom',
        text: 'Draw your weapon and smash the temporal gears of the loom',
        subtext: 'Restore the true chronicle, consequences be damned.',
        targetSceneId: 'castle_mirror_chamber',
        consequence: {
          variables: { courage: 2, truthSeeking: 3 },
          feedbackText: 'Gears screech and sparks shower the stone as the temporal mechanism cracks.'
        }
      },
      {
        id: 'castle_c3_demand_pen',
        text: 'Demand the silver quill to write a new compromise into the chronicle',
        subtext: 'Use the loom to forge a stable, enlightened timeline.',
        targetSceneId: 'castle_mirror_chamber',
        consequence: {
          variables: { intrigue: 3, loyalty: 1 },
          feedbackText: 'Theresa hesitates, then extends the iridescent quill toward you.'
        }
      }
    ]
  },

  castle_masked_reveal: {
    id: 'castle_masked_reveal',
    worldId: 'castle',
    chapter: 'Act II: The Letter Decoded',
    title: 'The Hand of the Unborn King',
    sceneType: 'revelation',
    narration: [
      'The letter reveals the core paradox: you are neither a peasant nor a pretender. You are King Alden II, who voluntarily split your consciousness across three eras when the kingdom’s original timeline reached an apocalyptic deadlock.',
      'Every century, the castle draws your fragmented soul back to this cliffside keep to re-evaluate the chronicle.',
      'On the floor of the private chamber lies three wax seals: The Lion of War (Vane), the Loom of Peace (Theresa), and the Mirror of Divergence.'
    ],
    imagePrompt: 'An intimate candlelit royal chamber with open manuscripts, three glowing wax seals resting on an antique walnut table, dramatic shadows, a mirror reflecting multiple versions of the protagonist.',
    artTheme: 'castle_secrets',
    choices: [
      {
        id: 'castle_c3_take_all_seals',
        text: 'Collect all three seals to decipher the primordial timeline loop',
        subtext: 'Unlocks the potential for the secret Eternal Witness ending.',
        targetSceneId: 'castle_mirror_chamber',
        consequence: {
          variables: { timelineKnowledge: 3, truthSeeking: 2 },
          addItem: {
            id: 'trinity_seals',
            name: 'The Trinity of Sovereign Seals',
            description: 'The three seals representing War, Revision, and the Multiverse of Oakhaven.',
            foundAtScene: 'castle_masked_reveal'
          },
          feedbackText: 'The three seals resonate in your palm, casting geometric rays of light.'
        }
      },
      {
        id: 'castle_c3_head_throne',
        text: 'March directly to the throne to end the dispute once and for all',
        subtext: 'Claim your rightful crown or tear it from the dais.',
        targetSceneId: 'castle_hall_of_echoes',
        consequence: {
          variables: { courage: 2 },
          feedbackText: 'You leave the chamber, your resolve hardening like forged steel.'
        }
      }
    ]
  },

  castle_mirror_chamber: {
    id: 'castle_mirror_chamber',
    worldId: 'castle',
    chapter: 'Act III: The Hall of Fractured Horizons',
    title: 'The Chamber of Divergent Mirrors',
    sceneType: 'revelation',
    narration: [
      'You enter an octagonal tower room walled with floor-to-ceiling silvered mirrors. But these mirrors do not reflect your physical body.',
      'In the first mirror, you see yourself crowned in ash and gold, commanding an obedient, tranquil kingdom where no one remembers their dead parents.',
      'In the second mirror, you see the castle crumbling into the lake, its history erased, leaving you a nameless wanderer in an uncaring world.',
      'In the third mirror, you see the true historical war laid bare in broad daylight, hard and agonizing, but surrounded by genuine art, real music, and unmanufactured love.'
    ],
    imagePrompt: 'An octagonal gothic tower room with tall silvered mirrors showing three divergent timelines of the same royal protagonist, floating dust motes, autumn red leaves blowing through cracked stained glass windows, breathtaking visual storytelling.',
    artTheme: 'castle_mirrors',
    choices: [
      {
        id: 'castle_c4_to_climax',
        text: 'Step forward into the central dais to make your irreversible decree',
        subtext: 'Every faction has gathered in the Grand Hall below.',
        targetSceneId: 'castle_hall_of_echoes',
        consequence: {
          variables: { readyForClimax: true },
          feedbackText: 'The mirrors ripple as you step out onto the balcony of the Grand Hall.'
        }
      }
    ]
  },

  castle_hall_of_echoes: {
    id: 'castle_hall_of_echoes',
    worldId: 'castle',
    chapter: 'Climax: The Verdict of the Ages',
    title: 'The Council of Unwritten Fates',
    sceneType: 'confrontation',
    narration: [
      'The Grand Hall is packed with the court: Lord Inquisitor Vane with his stern knights, Grand Archivist Theresa with her scribes, and the phantom nobility of Oakhaven holding antique silver goblets.',
      'The crown of King Alden II rests on a purple velvet cushion on the high altar. Next to it lies the Master Chronicle of the Realm and the hammer of the royal stonemasons.',
      'Everyone looks to you. The weight of two centuries of stolen history hangs in the suffocating silence.'
    ],
    imagePrompt: 'An epic confrontation in a candlelit gothic royal hall: knights in black armor on one side, scribes in burgundy on the other, the protagonist standing between them before an ancient altar with crown and chronicle, dramatic masterwork.',
    artTheme: 'castle_climax',
    choices: [
      {
        id: 'castle_end_ashes_choice',
        text: 'Don the Crown of Alden II and preserve the comforting lie of the peaceful kingdom',
        subtext: 'Ending A: Reign over a prosperous, peaceful realm built upon manufactured memories.',
        targetSceneId: 'castle_ending_ashes',
        consequence: {
          variables: { choseLie: true }
        }
      },
      {
        id: 'castle_end_unwritten_choice',
        text: 'Take the stonemason’s hammer and shatter the Castle’s cornerstone, unmaking all chronicles',
        subtext: 'Ending B: Erase all written history, freeing humanity from the past at the cost of your identity.',
        targetSceneId: 'castle_ending_unwritten',
        consequence: {
          variables: { choseOblivion: true }
        }
      },
      {
        id: 'castle_end_chronicle_choice',
        text: 'Burn Theresa’s revisions and publish the True Chronicle of the real war',
        subtext: 'Ending C: Expose the truth, honor the real dead, and rebuild the kingdom with authentic courage.',
        targetSceneId: 'castle_ending_chronicle',
        consequence: {
          variables: { choseTruth: true }
        }
      },
      {
        id: 'castle_end_witness_choice',
        text: 'Present the Trinity of Seals and step outside the timeline as the Eternal Witness',
        subtext: 'Ending D (Secret): Requires Trinity of Seals and high Timeline Knowledge.',
        targetSceneId: 'castle_ending_witness',
        condition: {
          requiredItem: 'trinity_seals',
          min: 2
        },
        consequence: {
          variables: { secretWitnessUnlocked: true }
        }
      }
    ]
  },

  castle_ending_ashes: {
    id: 'castle_ending_ashes',
    worldId: 'castle',
    chapter: 'Ending A: The Crown of Ashes',
    title: 'Sovereign of the Sweet Illusion',
    sceneType: 'ending',
    narration: [
      'You place the heavy antique gold crown upon your brow. The court drops to their knees with a unified rustle of silk and clatter of armor.',
      'Theresa smiles with tears of relief and immediately sets to work, dipping her quill into the temporal ink to erase every memory of your hesitation.',
      'The kingdom will know fifty more years of peace, prosperity, and radiant festivals. You sit upon the high throne, beloved by all, carrying alone the agonizing knowledge that none of it is real.'
    ],
    imagePrompt: 'A regal, melancholic king sitting upon an imposing antique gold throne with a crown of gold and rubies, courtiers bowing, autumn red leaves blowing through castle halls, heavy golden atmosphere, cinematic drama.',
    artTheme: 'castle_ending_ashes',
    choices: [],
    endingMeta: {
      endingId: 'castle_ashes',
      title: 'The Crown of Ashes',
      type: 'standard',
      quote: '"A golden cage is still a cage, but its occupants will never know they were caught."',
      summary: 'You accepted the crown and the mantle of the manufactured peace, choosing the comfort and safety of your subjects over the brutal reality of their history.',
      consequences: [
        'The kingdom enjoys lasting peace without war or civil unrest.',
        'Generations live and die in blissful ignorance of their ancestors’ true sacrifices.',
        'You rule alone with the unshared burden of the manufactured reality.'
      ],
      loreReveal: 'The original letter you held was written by your own future hand precisely to warn you against this comfortable surrender.'
    }
  },

  castle_ending_unwritten: {
    id: 'castle_ending_unwritten',
    worldId: 'castle',
    chapter: 'Ending B: The Unwritten King',
    title: 'The Clean Slate of History',
    sceneType: 'ending',
    narration: [
      'You swing the stonemason’s hammer into the castle’s primary temporal anchor. A deafening crack reverberates through the foundations.',
      'The towers begin to dissolve into drifting plumes of golden dust. The portraits fade to blank canvases. The crown turns to fine mountain sand between your fingers.',
      'When the dust settles, you wake on a green hillside under an open sky. There is no castle on the cliff. There are no monarchs or inquisitors.',
      'The people down in the valley build their own cabins, plant their own corn, and tell their own stories. And no one, not even you, remembers that there was ever a king.'
    ],
    imagePrompt: 'A vast mountain valley with wild autumn grass under a pure blue sky, ancient castle ruins overgrown with moss and wildflowers, a nameless traveler walking freely down a dirt trail, peaceful poetic fantasy ending.',
    artTheme: 'castle_ending_unwritten',
    choices: [],
    endingMeta: {
      endingId: 'castle_unwritten',
      title: 'The Unwritten King',
      type: 'standard',
      quote: '"To unwrite a king is to return a nation to its children."',
      summary: 'You shattered the temporal machinery of the castle, erasing the entire dynastic institution and liberating the people from both historical lies and historical guilt.',
      consequences: [
        'The castle and its time-manipulating apparatus are permanently erased.',
        'The royal lineage ceases to exist in both record and memory.',
        'You walk away as an ordinary, free human being in a world without rulers.'
      ],
      loreReveal: 'The two-tailed lion seal was the insignia of a line that never should have held dominion over the valley.'
    }
  },

  castle_ending_chronicle: {
    id: 'castle_ending_chronicle',
    worldId: 'castle',
    chapter: 'Ending C: The True Chronicle',
    title: 'The Restoration of the Fallen',
    sceneType: 'ending',
    narration: [
      'You seize the revised manuscripts and cast them into the central brazier. Before the court, you unfurl Inquisitor Vane’s unredacted iron chronicle.',
      'You read aloud the names of the regiments that died, the towns that burned, and the treaties that were signed in blood, not ink.',
      'Theresa falls to her knees, weeping as the courtiers stare in stunned silence. Tears turn into mourning, and mourning into genuine collective healing.',
      'The kingdom does not shatter; it grows up. For the first time, monuments are built to real soldiers, and peace is maintained by shared vigilance rather than forced amnesia.'
    ],
    imagePrompt: 'A powerful scene in a grand gothic hall: burning manuscripts in an ornate brazier with golden sparks, the protagonist reading aloud from an ancient iron-bound book to an awe-struck court, rays of genuine morning light, cinematic masterpiece.',
    artTheme: 'castle_ending_chronicle',
    choices: [],
    endingMeta: {
      endingId: 'castle_chronicle',
      title: 'The True Chronicle',
      type: 'standard',
      quote: '"Honor cannot be cultivated in the soil of a falsehood."',
      summary: 'You exposed the deception, burned the revisionist tools, and gave the people back the unvarnished truth of their ancestors.',
      consequences: [
        'Archivist Theresa’s revision loom is permanently dismantled.',
        'The true history of the Great War is taught and acknowledged.',
        'A mature, accountable society emerges from the ashes of historical secrecy.'
      ],
      loreReveal: 'Inquisitor Vane spent forty years playing the role of monster solely to keep the real records from being burned by the court.'
    }
  },

  castle_ending_witness: {
    id: 'castle_ending_witness',
    worldId: 'castle',
    chapter: 'Ending D (Secret): The Eternal Witness',
    title: 'The Sovereign of All Timelines',
    sceneType: 'ending',
    narration: [
      'You hold up the Trinity of Seals. The Chronos Loom, the mirrors, and the letters begin to resonate with a crystal harmonic tone.',
      'The walls of Oakhaven Keep turn transparent, revealing the kaleidoscope of human possibilities: every battle, every peace treaty, every love story, and every coronation occurring simultaneously across infinite tapestry threads.',
      'You do not rule one timeline. You become the Eternal Witness—the guardian who watches over the balance between truth and grace, ensuring no empire ever turns history into a cage again.',
      'From the timeless spires of Oakhaven, your gaze watches over every choice humanity has yet to make.'
    ],
    imagePrompt: 'A breathtaking secret ending: the protagonist floating in a transcendent observatory high above translucent gothic spires, holding three glowing geometric seals, looking out at multiple intertwining timelines of gold and starlight, cinematic 8k masterpiece.',
    artTheme: 'castle_ending_witness',
    choices: [],
    endingMeta: {
      endingId: 'castle_witness',
      title: 'The Eternal Witness',
      type: 'secret',
      quote: '"We are not the prisoners of history. We are the poets who choose which verse to keep."',
      summary: 'By collecting all three sovereign seals and reconciling the paradox of the loop, you transcended linear time to become the timeless overseer of history.',
      consequences: [
        'You break free from mortality and the localized timeline loop.',
        'The castle becomes an eternal multidimensional beacon of temporal balance.',
        'All possible histories are preserved as sacred possibilities.'
      ],
      loreReveal: 'Every player who has ever played ECHOES was observed by this very witness across the branches of choice.'
    }
  }
};
