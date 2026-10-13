import React, { useMemo } from 'react';
import { WorldId } from '../types/story';

interface CinematicArtworkProps {
  worldId: WorldId;
  artTheme: string;
  sceneId: string;
  imagePrompt?: string;
  reducedMotion?: boolean;
}

export const CinematicArtwork: React.FC<CinematicArtworkProps> = ({
  worldId,
  artTheme,
  sceneId,
  reducedMotion = false,
}) => {
  // World palettes for procedural depth rendering
  const palette = useMemo(() => {
    switch (worldId) {
      case 'forest':
        return {
          sky: ['#03120e', '#06261d', '#0b4334'],
          haze: 'rgba(16, 185, 129, 0.18)',
          accentGlow: '#10b981',
          cyanGlow: '#22d3ee',
          ground: '#020b08',
          particleColor: '#34d399',
        };
      case 'castle':
        return {
          sky: ['#12070e', '#230b17', '#4c1229'],
          haze: 'rgba(245, 158, 11, 0.15)',
          accentGlow: '#f59e0b',
          cyanGlow: '#fef08a',
          ground: '#0a0307',
          particleColor: '#f97316',
        };
      case 'ember':
        return {
          sky: ['#140703', '#2d0c04', '#591605'],
          haze: 'rgba(249, 115, 22, 0.22)',
          accentGlow: '#f97316',
          cyanGlow: '#fbbf24',
          ground: '#080201',
          particleColor: '#f59e0b',
        };
      case 'ocean':
        return {
          sky: ['#020617', '#031733', '#06305a'],
          haze: 'rgba(6, 182, 212, 0.2)',
          accentGlow: '#06b6d4',
          cyanGlow: '#a855f7',
          ground: '#010512',
          particleColor: '#38bdf8',
        };
    }
  }, [worldId]);

  // Procedural SVG composition tailored to the theme
  const renderThemeIllustration = () => {
    const isEnding = artTheme.includes('ending');

    return (
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`grad-sky-${sceneId}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={palette.sky[0]} />
            <stop offset="50%" stopColor={palette.sky[1]} />
            <stop offset="100%" stopColor={palette.sky[2]} />
          </linearGradient>

          <radialGradient id={`grad-sun-${sceneId}`} cx="50%" cy="35%" r="45%">
            <stop offset="0%" stopColor={palette.cyanGlow} stopOpacity="0.8" />
            <stop offset="40%" stopColor={palette.accentGlow} stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>

          <filter id={`blur-glow-${sceneId}`}>
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Sky / Deep Void */}
        <rect width="1600" height="900" fill={`url(#grad-sky-${sceneId})`} />

        {/* Atmosphere & Celestial Source */}
        <circle cx="800" cy="300" r="380" fill={`url(#grad-sun-${sceneId})`} />

        {/* World-Specific Backdrop Layers */}
        {worldId === 'forest' && (
          <g>
            {/* Distant Misty Mountain Ridges */}
            <path
              d="M0,600 Q400,480 800,560 T1600,520 L1600,900 L0,900 Z"
              fill="#062017"
              opacity="0.6"
            />
            {/* Midground Giant Trees Silhouettes */}
            <path
              d="M120,900 L160,350 Q180,240 220,150 Q160,260 120,400 L80,900 Z"
              fill="#041510"
            />
            <path
              d="M1400,900 L1360,320 Q1320,200 1260,110 Q1330,240 1380,450 L1440,900 Z"
              fill="#041510"
            />
            <path
              d="M750,900 L770,280 Q800,120 830,50 Q780,180 740,400 L710,900 Z"
              fill="#020d09"
            />

            {/* Glowing Runes on Trees */}
            <g filter={`url(#blur-glow-${sceneId})`}>
              <circle cx="760" cy="420" r="5" fill={palette.cyanGlow} opacity="0.9" />
              <path
                d="M755,440 L765,455 L755,470 M765,440 L755,455 L765,470"
                stroke={palette.cyanGlow}
                strokeWidth="2.5"
                fill="none"
              />
              <circle cx="170" cy="380" r="4" fill={palette.cyanGlow} opacity="0.8" />
              <path
                d="M165,395 L175,410 L165,425"
                stroke={palette.cyanGlow}
                strokeWidth="2"
                fill="none"
              />
            </g>

            {/* Forest Floor with Moss & Roots */}
            <path
              d="M0,740 Q400,710 800,750 T1600,720 L1600,900 L0,900 Z"
              fill={palette.ground}
            />

            {/* Floating Spores */}
            {!reducedMotion && (
              <g className="animate-pulse">
                <circle cx="450" cy="480" r="3" fill="#6ee7b7" opacity="0.7" />
                <circle cx="920" cy="380" r="4" fill="#a7f3d0" opacity="0.6" />
                <circle cx="620" cy="290" r="2.5" fill="#34d399" opacity="0.8" />
                <circle cx="1150" cy="520" r="3.5" fill="#6ee7b7" opacity="0.6" />
                <circle cx="310" cy="620" r="4" fill="#22d3ee" opacity="0.7" />
              </g>
            )}
          </g>
        )}

        {worldId === 'castle' && (
          <g>
            {/* Distant Alpine Peaks */}
            <polygon points="0,550 300,320 600,580" fill="#1e0c15" opacity="0.7" />
            <polygon points="500,580 900,280 1300,620" fill="#270f1c" opacity="0.6" />
            <polygon points="1100,600 1450,350 1600,500" fill="#1e0c15" opacity="0.7" />

            {/* Cliffside Plateau */}
            <path
              d="M0,640 Q350,620 700,650 L850,720 L1100,630 L1600,660 L1600,900 L0,900 Z"
              fill="#0d0409"
            />

            {/* Gothic Castle Spires & Buttresses */}
            <rect x="520" y="380" width="120" height="270" fill="#14060d" />
            <polygon points="510,380 580,210 650,380" fill="#190912" />

            <rect x="680" y="320" width="180" height="330" fill="#0f040a" />
            <polygon points="670,320 770,140 870,320" fill="#1a0812" />

            <rect x="900" y="410" width="110" height="240" fill="#15060e" />
            <polygon points="890,410 955,240 1020,410" fill="#190912" />

            {/* Stained Glass Lantern Glows */}
            <g filter={`url(#blur-glow-${sceneId})`}>
              <rect x="745" y="380" width="16" height="42" rx="8" fill={palette.accentGlow} />
              <rect x="775" y="380" width="16" height="42" rx="8" fill={palette.accentGlow} />
              <circle cx="580" cy="450" r="12" fill={palette.accentGlow} opacity="0.9" />
              <circle cx="955" cy="460" r="10" fill={palette.accentGlow} opacity="0.9" />
            </g>

            {/* Autumn Red Leaves Drifting */}
            {!reducedMotion && (
              <g opacity="0.85">
                <ellipse cx="420" cy="530" rx="8" ry="4" fill="#e11d48" transform="rotate(25 420 530)" />
                <ellipse cx="680" cy="470" rx="10" ry="5" fill="#f43f5e" transform="rotate(-35 680 470)" />
                <ellipse cx="1020" cy="560" rx="7" ry="4" fill="#fb7185" transform="rotate(45 1020 560)" />
                <ellipse cx="880" cy="620" rx="9" ry="5" fill="#be123c" transform="rotate(-15 880 620)" />
                <ellipse cx="310" cy="420" rx="6" ry="3" fill="#fbbf24" transform="rotate(10 310 420)" />
              </g>
            )}
          </g>
        )}

        {worldId === 'ember' && (
          <g>
            {/* Volcanic Crags & Ash Clouds */}
            <polygon points="0,620 420,290 850,680" fill="#240803" />
            <polygon points="700,680 1150,220 1600,640" fill="#1c0502" />

            {/* Magma Fissure Veins */}
            <g filter={`url(#blur-glow-${sceneId})`}>
              <path
                d="M420,600 Q600,680 750,720 T1100,780 T1600,820"
                stroke={palette.accentGlow}
                strokeWidth="12"
                fill="none"
                opacity="0.95"
              />
              <path
                d="M750,720 Q700,810 650,900"
                stroke={palette.cyanGlow}
                strokeWidth="8"
                fill="none"
              />
              <circle cx="1150" cy="220" r="18" fill={palette.cyanGlow} opacity="0.9" />
            </g>

            {/* Obsidian Spires */}
            <polygon points="260,900 320,410 380,900" fill="#080201" />
            <polygon points="1280,900 1340,360 1410,900" fill="#080201" />

            {/* Floating Molten Sparks */}
            {!reducedMotion && (
              <g opacity="0.9">
                <circle cx="480" cy="450" r="4" fill="#fdba74" />
                <circle cx="620" cy="380" r="3" fill="#fb923c" />
                <circle cx="980" cy="420" r="5" fill="#f97316" />
                <circle cx="830" cy="510" r="3.5" fill="#fed7aa" />
                <circle cx="1200" cy="490" r="4.5" fill="#f59e0b" />
              </g>
            )}
          </g>
        )}

        {worldId === 'ocean' && (
          <g>
            {/* Trench Abyss & Seabed Spire Architecture */}
            <polygon points="0,580 400,740 0,900" fill="#031024" />
            <polygon points="1600,540 1200,720 1600,900" fill="#031024" />

            {/* Titanic Submerged Spire */}
            <polygon points="720,900 800,160 880,900" fill="#041a3a" />
            <polygon points="620,900 680,320 740,900" fill="#03142e" />
            <polygon points="860,900 920,290 980,900" fill="#03142e" />

            {/* Bioluminescent Nodes & Sonar Rings */}
            <g filter={`url(#blur-glow-${sceneId})`}>
              <circle cx="800" cy="180" r="14" fill={palette.accentGlow} />
              <line x1="800" y1="180" x2="800" y2="900" stroke={palette.accentGlow} strokeWidth="3" opacity="0.8" />
              <circle cx="680" cy="340" r="8" fill={palette.cyanGlow} />
              <circle cx="920" cy="310" r="8" fill={palette.cyanGlow} />

              <ellipse cx="800" cy="450" rx="160" ry="24" stroke={palette.accentGlow} strokeWidth="2" fill="none" opacity="0.5" />
              <ellipse cx="800" cy="620" rx="280" ry="38" stroke={palette.accentGlow} strokeWidth="2" fill="none" opacity="0.4" />
            </g>

            {/* Floating Deep-Sea Organisms / Bubbles */}
            {!reducedMotion && (
              <g opacity="0.75">
                <circle cx="520" cy="420" r="6" fill="#38bdf8" />
                <circle cx="640" cy="560" r="4" fill="#a5f3fc" />
                <circle cx="960" cy="470" r="5" fill="#67e8f9" />
                <circle cx="1120" cy="380" r="7" fill="#c084fc" />
                <circle cx="430" cy="610" r="4.5" fill="#38bdf8" />
              </g>
            )}
          </g>
        )}

        {/* Ending Radiance if ending scene */}
        {isEnding && (
          <g filter={`url(#blur-glow-${sceneId})`}>
            <circle cx="800" cy="350" r="160" fill={palette.cyanGlow} opacity="0.45" />
            <path
              d="M600,0 L800,450 L1000,0 M400,0 L800,450 L1200,0"
              stroke={palette.cyanGlow}
              strokeWidth="4"
              opacity="0.3"
            />
          </g>
        )}

        {/* Cinematic Vignette Overlay */}
        <radialGradient id={`vignette-${sceneId}`} cx="50%" cy="50%" r="70%">
          <stop offset="40%" stopColor="transparent" stopOpacity="0" />
          <stop offset="90%" stopColor="#000000" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.95" />
        </radialGradient>
        <rect width="1600" height="900" fill={`url(#vignette-${sceneId})`} />

        {/* Readability Bottom Scrim Gradient */}
        <linearGradient id={`scrim-${sceneId}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="45%" stopColor="rgba(0,0,0,0.4)" />
          <stop offset="75%" stopColor="rgba(0,0,0,0.85)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.98)" />
        </linearGradient>
        <rect width="1600" height="900" fill={`url(#scrim-${sceneId})`} />
      </svg>
    );
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {renderThemeIllustration()}
    </div>
  );
};
