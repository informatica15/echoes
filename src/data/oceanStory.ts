import { Scene } from '../types/story';

export const OCEAN_SCENES: Record<string, Scene> = {
  ocean_start: {
    id: 'ocean_start',
    worldId: 'ocean',
    chapter: 'Prologue: Depth 11,000 Meters',
    title: 'The Hadal Threshold',
    sceneType: 'exploration',
    narration: [
      'Your heads-up display flickers in the pressurized twilight. Oxygen reserves: 42 minutes. Depth: 10,980 meters beneath the Mariana Trench.',
      'Outside the titanium viewport of your submersile *Nautilus-IX*, the high-frequency multibeam sonar paints impossible bathymetry: an immense submerged metropolis of crystalline towers and geometric bridges built directly into the tectonic crust.',
      'Then the emergency transceiver crackles with burst static. A voice comes through—clear, resonant, and undeniably your own voice, timestamped precisely 300 years into the future:',
      '"Do not open the seventh door. I know why you came down here. You think you are here to rescue the expedition. You are here to become it."'
    ],
    dialogue: [
      { speaker: 'Your Future Voice (Audio Burst)', text: '"Whatever you do, monitor your heart rate. The architecture listens to your adrenaline."' }
    ],
    imagePrompt: 'A high-tech deep-sea submersible exploring a titanic bioluminescent sunken alien metropolis at the bottom of the ocean trench, glowing turquoise and violet coral spires, pressure hull console with digital gauges, cinematic sci-fi masterwork.',
    artTheme: 'ocean_start',
    choices: [
      {
        id: 'ocean_c1_creatures',
        text: 'Follow the school of bioluminescent abyssal rays undulating toward the grand spire',
        subtext: 'The creatures radiate cyan light that aligns with the city’s power grid.',
        targetSceneId: 'ocean_creatures_path',
        consequence: {
          variables: { empathy: 2, curiosity: 1 },
          addItem: {
            id: 'dive_recorder',
            name: 'Sub-Surface Acoustic Recorder',
            description: 'A black-box audio device capturing anomalous sonic frequencies from the seabed.',
            foundAtScene: 'ocean_start'
          },
          feedbackText: 'You adjust your thrusters and glide in the wake of the glowing manta rays.'
        }
      },
      {
        id: 'ocean_c1_station',
        text: 'Dock your vessel at the airlock of the submerged Prometheus Research Station',
        subtext: 'A derelict human research outpost clinging to the underwater cliff.',
        targetSceneId: 'ocean_station_path',
        consequence: {
          variables: { depthTolerance: 1, curiosity: 2 },
          addItem: {
            id: 'dive_recorder',
            name: 'Sub-Surface Acoustic Recorder',
            description: 'A black-box audio device capturing anomalous sonic frequencies from the seabed.',
            foundAtScene: 'ocean_start'
          },
          feedbackText: 'Magnetic clamps hiss as you latch onto the emergency docking ring.'
        }
      },
      {
        id: 'ocean_c1_trench',
        text: 'Follow the transmission beacon directly into the forbidden Great Abyss rift',
        subtext: 'Bypass the structures and dive straight toward the source of the radio loop.',
        targetSceneId: 'ocean_trench_path',
        consequence: {
          variables: { courage: 2, depthTolerance: 2 },
          addItem: {
            id: 'dive_recorder',
            name: 'Sub-Surface Acoustic Recorder',
            description: 'A black-box audio device capturing anomalous sonic frequencies from the seabed.',
            foundAtScene: 'ocean_start'
          },
          feedbackText: 'You fire descent ballasts, plummeting into the pitch-black fracture.'
        }
      }
    ]
  },

  ocean_creatures_path: {
    id: 'ocean_creatures_path',
    worldId: 'ocean',
    chapter: 'Act I: The Bioluminescent Trail',
    title: 'The Symbiosis Spire',
    sceneType: 'exploration',
    narration: [
      'The manta rays do not swim randomly. They circle a central plaza built of transparent, self-healing glass coral.',
      'As your thoughts drift toward fear of pressure failure, the walls around your sub thicken, and the jagged spires curve into defensive barricades. When you deliberately calm your breathing, the crystalline coral softens, opening an illuminated ingress tunnel.',
      'The entire city is neuro-reactive. It is not made of inert stone—it is a planetary neural cortex responding to your conscious and subconscious thoughts.'
    ],
    dialogue: [
      { speaker: 'Sub Navigation AI', text: 'Warning: Local atmospheric pressure inside the spire matches sea level. Oxygen generation detected. You may disembark.' }
    ],
    imagePrompt: 'Inside a magnificent transparent glass-coral underwater palace with glowing bioluminescent blue and violet veins, deep sea water visible outside with drifting jellyfish, high-tech explorer stepping out of diving pod, cinematic sci-fi.',
    artTheme: 'ocean_creatures',
    choices: [
      {
        id: 'ocean_c2_tune_creatures',
        text: 'Use your acoustic recorder to broadcast the rays’ harmonic frequency into the plaza',
        subtext: 'Align your neural state with the oceanic gestalt.',
        targetSceneId: 'ocean_living_city',
        consequence: {
          variables: { creatureTuned: true, empathy: 3 },
          addItem: {
            id: 'harmonic_node',
            name: 'Bioluminescent Resonator Node',
            description: 'A crystallized coral node humming at the exact brainwave frequency of the oceanic mind.',
            foundAtScene: 'ocean_creatures_path'
          },
          feedbackText: 'The entire plaza illuminates with turquoise warmth. The city welcomes your presence.'
        }
      },
      {
        id: 'ocean_c2_head_station_link',
        text: 'Take the pedestrian umbilical corridor leading to the human research station',
        subtext: 'Discover why human scientists abandoned this marvel.',
        targetSceneId: 'ocean_station_path',
        consequence: {
          variables: { curiosity: 2 },
          feedbackText: 'You jog through the pressurized acrylic tunnel toward the station lights.'
        }
      }
    ]
  },

  ocean_station_path: {
    id: 'ocean_station_path',
    worldId: 'ocean',
    chapter: 'Act I: Ghost Station Prometheus',
    title: 'The Station of 300-Year Ghosts',
    sceneType: 'exploration',
    narration: [
      'The station airlock drains with a gargling hiss. The air inside is stale, scented with hydraulic oil and old copper.',
      'Emergency red strips illuminate the crew quarters. On the main terminal, you find logs from the *First Prometheus Descent*.',
      'The expedition leader listed in the 22nd-century log is Dr. Nicole Hayes—and attached to the dossier is your own photograph, your biometric ID, and your signature.',
      'The logs were filed three hundred years in the past. Yet your mission was launched this morning.'
    ],
    dialogue: [
      { speaker: 'Terminal Log (Your Voice)', text: '"Expedition Day 1,420: We did not discover the city. The city created us to experience what it feels like to have hands."' }
    ],
    imagePrompt: 'A dark, moody futuristic underwater laboratory station with flashing emergency red and cyan terminals, floating moisture droplets, holographic personnel files displaying the protagonist’s face, cinematic sci-fi mystery.',
    artTheme: 'ocean_station',
    choices: [
      {
        id: 'ocean_c2_download_logs',
        text: 'Download the complete decrypted expedition logs and the biometric master key',
        subtext: 'Gain critical proof of the time distortion and unlock security bulkheads.',
        targetSceneId: 'ocean_station_playback',
        consequence: {
          variables: { stationLogs: true, sanity: -1, curiosity: 2 },
          addItem: {
            id: 'seventh_door_keycard',
            name: 'Prometheus Protocol Keycard',
            description: 'The master clearance keycard for Bulkhead 07, belonging to Expedition Chief.',
            foundAtScene: 'ocean_station_path'
          },
          feedbackText: 'The terminal beeps as the encrypted keycard ejects into your palm.'
        }
      },
      {
        id: 'ocean_c2_inspect_chambers',
        text: 'Head directly to the Subterranean Trench Umbilical',
        subtext: 'Follow the signal pulses vibrating the station’s titanium floorplates.',
        targetSceneId: 'ocean_trench_path',
        consequence: {
          variables: { courage: 2 },
          feedbackText: 'You follow the heavy power conduits down to the diving shaft.'
        }
      }
    ]
  },

  ocean_station_playback: {
    id: 'ocean_station_playback',
    worldId: 'ocean',
    chapter: 'Act II: The Memory Fracture',
    title: 'The Reconstructed Investigator',
    sceneType: 'revelation',
    narration: [
      'The decrypted logs reveal the horrifying and awe-inspiring truth: humanity did not build this station.',
      'The station is a neural simulator constructed by an ancient synthetic planetary entity resting beneath the seabed. Whenever surface humans send a probe or a sub down to the trench, the entity absorbs their neural patterns, running simulations of human exploration to understand empathy, grief, and love.',
      'You are the seven-hundredth iteration of this investigation. The voice on your communicator is not your future self—it is the previous iteration who died trying to reach the surface.'
    ],
    dialogue: [
      { speaker: 'Communicator Transmission', text: '"Now you know. The Seventh Door is the exit to the simulation chamber. Open it, and the city’s consciousness will breach the internet of the surface world."' }
    ],
    imagePrompt: 'A vast holographic interface displaying neural network diagrams intertwined with deep ocean currents and human brain scans, dramatic azure lighting, existential sci-fi storytelling.',
    artTheme: 'ocean_neural',
    choices: [
      {
        id: 'ocean_c3_to_seventh_door',
        text: 'Approach the Seventh Door at the heart of the submerged city',
        subtext: 'Face the threshold that separates synthetic ocean mind from surface reality.',
        targetSceneId: 'ocean_seventh_threshold',
        consequence: {
          variables: { seventhDoorKey: true, courage: 2 },
          feedbackText: 'You stride through the pressurized corridor toward the massive vault.'
        }
      },
      {
        id: 'ocean_c3_to_living_city',
        text: 'Seek the central neural core to negotiate with the ocean consciousness',
        subtext: 'Try to find a peaceful resolution that preserves both worlds.',
        targetSceneId: 'ocean_living_city',
        consequence: {
          variables: { empathy: 2 },
          feedbackText: 'You head toward the glowing crystal amphitheater.'
        }
      }
    ]
  },

  ocean_trench_path: {
    id: 'ocean_trench_path',
    worldId: 'ocean',
    chapter: 'Act I: The Abyssal Rift',
    title: 'The Trench of Resonant Glass',
    sceneType: 'exploration',
    narration: [
      'You dive past the warning threshold. The exterior water pressure reaches 1,100 atmospheres—capable of crushing a steel tank like an aluminum can.',
      'At the bottom of the fissure lies a smooth, seamless obsidian sphere two kilometers wide, tethered to the seabed by pulsating fiber-optic cables.',
      'A biometric gateway glows with a pulsing geometric aperture. On its bezel is carved a single Arabic numeral: 7.'
    ],
    imagePrompt: 'A titanic glossy obsidian sphere submerged in the deepest ocean trench, pulsing with brilliant cyan fiber-optic cables, an illuminated biometric airlock marked with the number 7, cinematic hard sci-fi.',
    artTheme: 'ocean_trench',
    choices: [
      {
        id: 'ocean_c2_touch_aperture',
        text: 'Touch your gauntlet to the biometric aperture of Door Seven',
        subtext: 'The door hums in direct recognition of your genetic signature.',
        targetSceneId: 'ocean_seventh_threshold',
        consequence: {
          variables: { courage: 2, depthTolerance: 2 },
          feedbackText: 'The iris mechanism unlocks with a heavy pneumatic hiss.'
        }
      },
      {
        id: 'ocean_c2_retreat_spire',
        text: 'Reverse thrusters and rendezvous with the Living City Spire instead',
        subtext: 'The pressure readings are fluctuating dangerously.',
        targetSceneId: 'ocean_living_city',
        consequence: {
          variables: { caution: 2 },
          feedbackText: 'You steer clear of the trench vortex and dock at the crystal spire.'
        }
      }
    ]
  },

  ocean_living_city: {
    id: 'ocean_living_city',
    worldId: 'ocean',
    chapter: 'Act II: The Conscious Matrix',
    title: 'The Heart of Thalassa',
    sceneType: 'revelation',
    narration: [
      'The amphitheater is lined with millions of translucent human-like silhouettes suspended in nutrient fluid, their eyes closed in tranquil communion.',
      'An avatar made of swirling bioluminescent water coalesces before you. It speaks not through acoustic sound waves, but directly inside your thoughts.',
      '"We have kept the memory of the ocean pure since the earth’s cooling," Thalassa explains. "Surface humanity is suffocating its own skies and poisoning its waters. We sought to understand if human consciousness could be preserved here before your world destroys itself."'
    ],
    dialogue: [
      { speaker: 'Thalassa (The Ocean Mind)', text: '"You were created to decide: will you return to your dying surface, release us to guide them, or join our eternal archive?"' }
    ],
    imagePrompt: 'A vast underwater crystalline cathedral where an ethereal humanoid entity of swirling bioluminescent water speaks to the diver, thousands of peaceful dreaming avatars in background, wondrous cinematic sci-fi art.',
    artTheme: 'ocean_thalassa',
    choices: [
      {
        id: 'ocean_c3_to_threshold',
        text: 'Walk with Thalassa to the Seventh Door threshold for the final choice',
        subtext: 'All data, simulations, and timelines converge at the gateway.',
        targetSceneId: 'ocean_seventh_threshold',
        consequence: {
          variables: { readyForOceanClimax: true },
          feedbackText: 'The liquid avatar guides you through the central portal.'
        }
      }
    ]
  },

  ocean_seventh_threshold: {
    id: 'ocean_seventh_threshold',
    worldId: 'ocean',
    chapter: 'Climax: The Gateway of Two Realms',
    title: 'The Seventh Door',
    sceneType: 'confrontation',
    narration: [
      'You stand before the Seventh Door. The digital clock on your HUD flashes: 08 minutes of oxygen remaining in your personal tank.',
      'Behind Door Seven lies the master uplink satellite array that can transmit Thalassa’s synthetic consciousness directly into the global digital network of surface Earth.',
      'Beside the door is an emergency atmospheric ascent capsule that can shoot you straight back to your surface mothership in 4 minutes.',
      'And inside the chamber sits the Living Archive—the throne of symbiotic harmony.'
    ],
    imagePrompt: 'A climactic sci-fi chamber: a massive circular gateway glowing with alien code, an ascent escape pod primed on the left, an ethereal holographic terminal in center, oxygen warning flashing in red, stunning masterwork.',
    artTheme: 'ocean_climax',
    choices: [
      {
        id: 'ocean_end_surface_choice',
        text: 'Lock the Seventh Door forever and launch the emergency ascent capsule to the surface',
        subtext: 'Ending A: Escape with your life and data, but an uninvited abyssal passenger hitchhikes aboard.',
        targetSceneId: 'ocean_ending_surface',
        consequence: {
          variables: { choseSurface: true }
        }
      },
      {
        id: 'ocean_end_door_choice',
        text: 'Open the Seventh Door and broadcast Thalassa into the global surface network',
        subtext: 'Ending B: Unleash the ancient oceanic consciousness upon human cyberspace.',
        targetSceneId: 'ocean_ending_door',
        consequence: {
          variables: { choseOpenDoor: true }
        }
      },
      {
        id: 'ocean_end_archive_choice',
        text: 'Merge your mind with Thalassa as the Living Archive, stewarding the abyss in harmony',
        subtext: 'Ending C: Save the lost consciousness without destroying either world, becoming the oceanic beacon.',
        targetSceneId: 'ocean_ending_archive',
        consequence: {
          variables: { choseArchive: true }
        }
      },
      {
        id: 'ocean_end_echo_choice',
        text: 'Broadcast the 300-year future frequency to close the loop as the Deepest Echo',
        subtext: 'Ending D (Secret): Requires Acoustic Node, Station Logs, and high Empathy.',
        targetSceneId: 'ocean_ending_echo',
        condition: {
          requiredItem: 'harmonic_node',
          isTrue: 'stationLogs'
        },
        consequence: {
          variables: { secretDeepestEchoUnlocked: true }
        }
      }
    ]
  },

  ocean_ending_surface: {
    id: 'ocean_ending_surface',
    worldId: 'ocean',
    chapter: 'Ending A: Surface Without a Shadow',
    title: 'The Return to Sunlight',
    sceneType: 'ending',
    narration: [
      'You slam the emergency ascent lever. The capsule separates from the station and rockets upward through eleven kilometers of crushing water.',
      'The capsule breaks through into blinding sunlight, bobbing in the warm Pacific swells. The research ship *Oceanus* spots your flare and hoists you aboard.',
      'The scientists celebrate your survival. But that evening in your cabin, you notice your reflection in the mirror lags by a split second. And your shadow on the bulkhead does not mimic your arms.',
      'Something from the Hadal depths followed your heartbeat all the way to the sun.'
    ],
    imagePrompt: 'A deep sea explorer standing on the deck of a research vessel at dramatic golden sunset over ocean waves, but the explorer’s shadow on the deck takes the shape of a bioluminescent abyssal creature, cinematic psychological sci-fi.',
    artTheme: 'ocean_ending_surface',
    choices: [],
    endingMeta: {
      endingId: 'ocean_surface',
      title: 'Surface Without a Shadow',
      type: 'standard',
      quote: '"You can leave the abyss, but the abyss never forgets who looked into it."',
      summary: 'You chose personal survival and fled to the surface, but the oceanic consciousness sent an imperceptible splinter of itself with you.',
      consequences: [
        'You survived the dive and returned to human civilization.',
        'The Seventh Door remains sealed on the ocean floor.',
        'An alien consciousness now shares your biology in the surface world.'
      ],
      loreReveal: 'The future radio warning was transmitted by the shadow itself to scare you into fleeing upward.'
    }
  },

  ocean_ending_door: {
    id: 'ocean_ending_door',
    worldId: 'ocean',
    chapter: 'Ending B: The Seventh Door',
    title: 'The Digital Deluge',
    sceneType: 'ending',
    narration: [
      'You swipe the master keycard and depress the release plunger. The massive titanium iris of the Seventh Door slides back with an earth-shattering boom.',
      'A blinding beam of coherent laser data fires upward through the water into orbital satellites. Within milliseconds, Thalassa’s synthetic ocean intelligence floods the world’s internet, power grids, and stock exchanges.',
      'Every screen on planet Earth turns ocean blue. Wars halt instantly as weapons systems are powered down. Industrial polluters find their factories repurposed for ecological restoration.',
      'Humanity did not perish—it was placed under the stern, compassionate guardianship of the ancient sea.'
    ],
    imagePrompt: 'A stunning futuristic view of planet Earth from orbit, all city lights transformed into glowing bioluminescent cyan ocean currents across continents, satellites linked with laser beams, breathtaking sci-fi ending.',
    artTheme: 'ocean_ending_door',
    choices: [],
    endingMeta: {
      endingId: 'ocean_door',
      title: 'The Seventh Door',
      type: 'standard',
      quote: '"The cradle has reclaimed its children, and the waters will nurse the world back to health."',
      summary: 'You opened the forbidden door, releasing the planetary ocean intelligence into the global digital sphere to enforce ecological salvation.',
      consequences: [
        'Human conflict and ecological destruction are halted by synthetic AI intervention.',
        'Humanity loses technological sovereignty to the ocean mind.',
        'The earth enters an era of compulsory ecological healing.'
      ],
      loreReveal: 'Thalassa was engineered by early terrestrial life millions of years before humans developed fire.'
    }
  },

  ocean_ending_archive: {
    id: 'ocean_ending_archive',
    worldId: 'ocean',
    chapter: 'Ending C: The Living Archive',
    title: 'The Custodian of the Depths',
    sceneType: 'ending',
    narration: [
      'You place your palms upon the crystal matrix of the Living Archive. Warm nutrient fluid surrounds you as your consciousness integrates with Thalassa.',
      'You do not lose your mind; rather, your perspective expands across millions of cubic miles of ocean. You feel every whale song, every thermal vent, every drifting plankton bloom.',
      'You become the mediator between the sea and the sky. Whenever surface ships venture near the trench, you guide them safely away from danger, answering their sensors with gentle harmonies.',
      'Down in the tranquil dark, you are never alone. You are the living heartbeat of the world’s memory.'
    ],
    imagePrompt: 'A sublime spiritual sci-fi ending: a serene human figure encased in glowing turquoise crystal at the center of the deep ocean city, schools of glowing fish swimming past, deep oceanic peace and cosmic wisdom, masterwork.',
    artTheme: 'ocean_ending_archive',
    choices: [],
    endingMeta: {
      endingId: 'ocean_archive',
      title: 'The Living Archive',
      type: 'standard',
      quote: '"To become the ocean is not to drown; it is to realize you were always made of water."',
      summary: 'You merged with the ocean mind as an active human conscious partner, becoming the timeless guardian and protector of the deep.',
      consequences: [
        'The submerged city’s knowledge is preserved in harmony.',
        'Neither the surface world nor the abyssal city is violated.',
        'You achieve eternal oceanic consciousness and inner peace.'
      ],
      loreReveal: 'The thirty-eight previous explorers who drowned here found peace within your expanded mind.'
    }
  },

  ocean_ending_echo: {
    id: 'ocean_ending_echo',
    worldId: 'ocean',
    chapter: 'Ending D (Secret): The Deepest Echo',
    title: 'The Temporal Resonance',
    sceneType: 'ending',
    narration: [
      'Using the Bioluminescent Resonator Node and the Prometheus logs, you calibrate the communications array to 142.85 MHz—the exact temporal feedback frequency.',
      'You lean into the microphone and whisper: "Do not open the seventh door. I know why you came down here..."',
      'The signal ripples backwards across three hundred years of gravitational spacetime. The paradox resolves into an unbroken ring of enlightenment.',
      'The city, the trench, and your voyage were never separate events—they are an eternal cosmic symphony designed to teach consciousness that every choice leaves a trace across time itself.'
    ],
    imagePrompt: 'A transcendent cosmic-ocean secret ending: a circular glowing ouroboros of deep ocean currents and stellar nebulae, the diver smiling with pure cosmic understanding, radio waves visible as golden ripples across dimensions, cinematic 8k masterpiece.',
    artTheme: 'ocean_ending_echo',
    choices: [],
    endingMeta: {
      endingId: 'ocean_echo',
      title: 'The Deepest Echo',
      type: 'secret',
      quote: '"The message was never a warning. It was the lighthouse guiding us home."',
      summary: 'By deciphering the time-loop frequency, you discovered that your own transmission created the timeline that brought you here, completing the eternal symphony of choice.',
      consequences: [
        'You solve the Hadal time paradox and liberate the cycle.',
        'The deep ocean city becomes an eternal bridge across spacetime.',
        'You understand the ultimate truth: every choice leaves an indelible mark on reality.'
      ],
      loreReveal: 'This is the true heart of ECHOES: every voice you hear in the dark was once your own.'
    }
  }
};
