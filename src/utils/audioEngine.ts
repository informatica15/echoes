// Web Audio API Cinematic Soundtrack & Ambient Synthesizer for ECHOES
import type { WorldId } from '../types/story';

export type RealmMusicId = WorldId | 'nexus';

class SoundscapeEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private currentRealm: RealmMusicId | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.8; // Default 80% volume
  private isPlaying: boolean = false;
  private activeNodes: Array<{ stop?: () => void; disconnect?: () => void }> = [];
  private intervalIds: number[] = [];

  constructor() {
    // Read saved audio settings if available
    try {
      if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem('echoes_save_v1');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed?.settings?.volume !== undefined) {
            this.volume = parsed.settings.volume;
          }
          if (parsed?.settings?.muted !== undefined) {
            this.isMuted = parsed.settings.muted;
          }
        }
      }
    } catch {}
  }

  public initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        // Master Dynamics Compressor prevents clipping & gives warm, loud cinematic punch
        this.compressor = this.ctx.createDynamicsCompressor();
        this.compressor.threshold.setValueAtTime(-18, this.ctx.currentTime);
        this.compressor.knee.setValueAtTime(12, this.ctx.currentTime);
        this.compressor.ratio.setValueAtTime(4, this.ctx.currentTime);
        this.compressor.attack.setValueAtTime(0.005, this.ctx.currentTime);
        this.compressor.release.setValueAtTime(0.25, this.ctx.currentTime);

        this.masterGain = this.ctx.createGain();
        const currentGain = this.isMuted ? 0 : this.volume * 0.85;
        this.masterGain.gain.setValueAtTime(currentGain, this.ctx.currentTime);

        this.masterGain.connect(this.compressor);
        this.compressor.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.ctx && this.masterGain && !this.isMuted) {
      this.masterGain.gain.setTargetAtTime(this.volume * 0.85, this.ctx.currentTime, 0.05);
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.ctx && this.masterGain) {
      const targetGain = this.isMuted ? 0 : this.volume * 0.85;
      this.masterGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.05);
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  public startRealmMusic(realmId: RealmMusicId) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    if (this.currentRealm === realmId && this.isPlaying) return;

    this.stopMusic();
    this.currentRealm = realmId;
    this.isPlaying = true;

    try {
      switch (realmId) {
        case 'forest':
          this.playForestSoundtrack();
          break;
        case 'castle':
          this.playCastleSoundtrack();
          break;
        case 'ember':
          this.playEmberSoundtrack();
          break;
        case 'ocean':
          this.playOceanSoundtrack();
          break;
        case 'nexus':
          this.playNexusSoundtrack();
          break;
      }
    } catch {
      // Audio fallback gracefully handled
    }
  }

  // Backwards compatibility alias
  public startWorldAmbience(worldId: WorldId) {
    this.startRealmMusic(worldId);
  }

  public stopMusic() {
    this.intervalIds.forEach((id) => clearInterval(id));
    this.intervalIds = [];

    this.activeNodes.forEach((node) => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch {}
    });
    this.activeNodes = [];
    this.isPlaying = false;
    this.currentRealm = null;
  }

  public stopAmbience() {
    this.stopMusic();
  }

  // --- 1. TITLE SCREEN / NEXUS SOUNDTRACK: Ethereal Cosmic Wonder ---
  private playNexusSoundtrack() {
    if (!this.ctx || !this.masterGain) return;

    // Chords: Fm9 (F, Ab, C, Eb, G) -> Dbmaj7 (Db, F, Ab, C) -> Bbm7 -> C7
    const chordProgressions = [
      [174.61, 207.65, 261.63, 311.13, 392.00], // Fm9
      [138.59, 174.61, 207.65, 261.63, 329.63], // Dbmaj7
      [116.54, 174.61, 207.65, 233.08, 277.18], // Bbm7
      [130.81, 164.81, 196.00, 246.94, 293.66], // C7
    ];
    let chordIndex = 0;

    const playNexusStep = () => {
      if (!this.ctx || !this.masterGain || this.isMuted) return;
      const now = this.ctx.currentTime;
      const chord = chordProgressions[chordIndex % chordProgressions.length];
      chordIndex++;

      // Lush warm pad synth
      chord.forEach((freq, i) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = i === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600, now);
        filter.frequency.exponentialRampToValueAtTime(1100, now + 2.5);
        filter.frequency.exponentialRampToValueAtTime(500, now + 5.5);

        const padVol = (i === 0 ? 0.28 : 0.18);
        g.gain.setValueAtTime(0.001, now);
        g.gain.linearRampToValueAtTime(padVol, now + 1.2);
        g.gain.exponentialRampToValueAtTime(0.001, now + 5.8);

        osc.connect(filter);
        filter.connect(g);
        g.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 6.0);
      });

      // Melodic high celesta note
      const leadNote = chord[Math.floor(Math.random() * chord.length)] * 2;
      const leadOsc = this.ctx.createOscillator();
      const leadGain = this.ctx.createGain();
      leadOsc.type = 'sine';
      leadOsc.frequency.setValueAtTime(leadNote, now + 0.8);

      leadGain.gain.setValueAtTime(0.001, now + 0.8);
      leadGain.gain.linearRampToValueAtTime(0.12, now + 0.95);
      leadGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);

      leadOsc.connect(leadGain);
      leadGain.connect(this.masterGain);
      leadOsc.start(now + 0.8);
      leadOsc.stop(now + 3.6);
    };

    playNexusStep();
    const timer = window.setInterval(playNexusStep, 5500);
    this.intervalIds.push(timer);
  }

  // --- 2. WORLD A: THE FOREST OF FORGOTTEN NAMES: Mystical Celtic Fantasy ---
  private playForestSoundtrack() {
    if (!this.ctx || !this.masterGain) return;

    // Filtered woodland wind & gentle leaves
    const bufferSize = this.ctx.sampleRate * 3;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      output[i] = (b0 + b1 + b2) * 0.15;
    }

    const windSource = this.ctx.createBufferSource();
    windSource.buffer = noiseBuffer;
    windSource.loop = true;

    const windFilter = this.ctx.createBiquadFilter();
    windFilter.type = 'lowpass';
    windFilter.frequency.setValueAtTime(380, this.ctx.currentTime);

    const windGain = this.ctx.createGain();
    windGain.gain.setValueAtTime(0.25, this.ctx.currentTime);

    windSource.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(this.masterGain);
    windSource.start();

    this.activeNodes.push(windSource, windFilter, windGain);

    // Forest Chord Progression: D minor -> Bb major -> G minor -> A7sus4
    const forestChords = [
      [146.83, 220.00, 261.63, 293.66, 349.23], // Dm9
      [116.54, 174.61, 233.08, 293.66, 349.23], // Bbmaj7
      [98.00, 146.83, 196.00, 220.00, 293.66],  // Gm7
      [110.00, 164.81, 220.00, 293.66, 329.63], // Asus4
    ];
    let step = 0;

    const playForestStep = () => {
      if (!this.ctx || !this.masterGain || this.isMuted) return;
      const now = this.ctx.currentTime;
      const chord = forestChords[step % forestChords.length];
      step++;

      // Lush strings pad
      chord.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = idx === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, now);

        const v = idx === 0 ? 0.32 : 0.18;
        g.gain.setValueAtTime(0.001, now);
        g.gain.linearRampToValueAtTime(v, now + 1.4);
        g.gain.exponentialRampToValueAtTime(0.001, now + 5.2);

        osc.connect(g);
        g.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 5.4);
      });

      // Ethereal harp / flute arpeggio
      const arpNotes = [chord[2] * 2, chord[3] * 2, chord[4] * 2, chord[1] * 3];
      arpNotes.forEach((n, i) => {
        if (!this.ctx || !this.masterGain) return;
        const delay = 0.6 + i * 0.45;
        const o = this.ctx.createOscillator();
        const og = this.ctx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(n, now + delay);

        og.gain.setValueAtTime(0.001, now + delay);
        og.gain.linearRampToValueAtTime(0.12, now + delay + 0.08);
        og.gain.exponentialRampToValueAtTime(0.0001, now + delay + 1.8);

        o.connect(og);
        og.connect(this.masterGain);
        o.start(now + delay);
        o.stop(now + delay + 2.0);
      });
    };

    playForestStep();
    const chordTimer = window.setInterval(playForestStep, 4800);
    this.intervalIds.push(chordTimer);
  }

  // --- 3. WORLD B: THE CASTLE THAT REMEMBERS: Regal Dark Gothic Symphony ---
  private playCastleSoundtrack() {
    if (!this.ctx || !this.masterGain) return;

    // Deep cathedral stone acoustics / choir pad
    // Chords: C minor -> Ab major -> F minor -> G major (G7)
    const castleChords = [
      [65.41, 130.81, 196.00, 233.08, 311.13], // Cm7
      [51.91, 103.83, 155.56, 207.65, 261.63], // Abmaj7
      [87.31, 174.61, 207.65, 261.63, 311.13], // Fm7
      [98.00, 146.83, 196.00, 246.94, 293.66], // G7
    ];
    let step = 0;

    const playCastleStep = () => {
      if (!this.ctx || !this.masterGain || this.isMuted) return;
      const now = this.ctx.currentTime;
      const chord = castleChords[step % castleChords.length];
      step++;

      // Heavy regal organ / brass drone
      chord.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = idx === 0 ? 'sawtooth' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, now);

        const v = idx === 0 ? 0.35 : 0.20;
        g.gain.setValueAtTime(0.001, now);
        g.gain.linearRampToValueAtTime(v, now + 1.5);
        g.gain.exponentialRampToValueAtTime(0.001, now + 5.6);

        osc.connect(filter);
        filter.connect(g);
        g.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 5.8);
      });

      // Distant tolling cathedral bell (every other measure)
      if (step % 2 === 0) {
        const bellBase = 220; // A3
        [1, 2.01, 3.02, 4.2].forEach((h, bi) => {
          if (!this.ctx || !this.masterGain) return;
          const bOsc = this.ctx.createOscillator();
          const bGain = this.ctx.createGain();
          bOsc.type = 'sine';
          bOsc.frequency.setValueAtTime(bellBase * h, now + 0.3);

          const bVol = (0.16 / (bi + 1));
          bGain.gain.setValueAtTime(bVol, now + 0.3);
          bGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

          bOsc.connect(bGain);
          bGain.connect(this.masterGain);
          bOsc.start(now + 0.3);
          bOsc.stop(now + 4.8);
        });
      }
    };

    playCastleStep();
    const timer = window.setInterval(playCastleStep, 5200);
    this.intervalIds.push(timer);
  }

  // --- 4. WORLD C: THE LAST EMBER: Post-Apocalyptic Tension & Molten Fire ---
  private playEmberSoundtrack() {
    if (!this.ctx || !this.masterGain) return;

    // Volcanic drone + analog saw sweep (Em -> C -> D -> Bm)
    const emberChords = [
      [82.41, 164.81, 196.00, 246.94, 329.63], // Em7
      [65.41, 130.81, 196.00, 261.63, 329.63], // Cmaj7
      [73.42, 146.83, 220.00, 293.66, 369.99], // D
      [61.74, 123.47, 185.00, 246.94, 293.66], // Bm
    ];
    let step = 0;

    const playEmberStep = () => {
      if (!this.ctx || !this.masterGain || this.isMuted) return;
      const now = this.ctx.currentTime;
      const chord = emberChords[step % emberChords.length];
      step++;

      // Heavy analog synth pad
      chord.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(250, now);
        filter.frequency.exponentialRampToValueAtTime(750, now + 1.6);
        filter.frequency.exponentialRampToValueAtTime(220, now + 4.2);

        const v = idx === 0 ? 0.38 : 0.16;
        g.gain.setValueAtTime(0.001, now);
        g.gain.linearRampToValueAtTime(v, now + 0.8);
        g.gain.exponentialRampToValueAtTime(0.001, now + 4.4);

        osc.connect(filter);
        filter.connect(g);
        g.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 4.6);
      });

      // Cinematic low percussive anvil strike
      const impactOsc = this.ctx.createOscillator();
      const impactGain = this.ctx.createGain();
      impactOsc.type = 'sine';
      impactOsc.frequency.setValueAtTime(95, now);
      impactOsc.frequency.exponentialRampToValueAtTime(32, now + 0.35);

      impactGain.gain.setValueAtTime(0.45, now);
      impactGain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

      impactOsc.connect(impactGain);
      impactGain.connect(this.masterGain);
      impactOsc.start(now);
      impactOsc.stop(now + 1.0);
    };

    // Granular fire crackle generator
    const crackleTimer = window.setInterval(() => {
      if (!this.ctx || !this.masterGain || this.isMuted) return;
      if (Math.random() > 0.35) {
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600 + Math.random() * 1400, this.ctx.currentTime);

        g.gain.setValueAtTime(0.06, this.ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.08);

        osc.connect(g);
        g.connect(this.masterGain);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.09);
      }
    }, 220);
    this.intervalIds.push(crackleTimer);

    playEmberStep();
    const chordTimer = window.setInterval(playEmberStep, 4200);
    this.intervalIds.push(chordTimer);
  }

  // --- 5. WORLD D: THE OCEAN BENEATH THE OCEAN: Deep Sub-Bass Sci-Fi Symphony ---
  private playOceanSoundtrack() {
    if (!this.ctx || !this.masterGain) return;

    // Aquatic chords: Am9 -> Fmaj7 -> Dm9 -> Em7
    const oceanChords = [
      [110.00, 164.81, 220.00, 261.63, 329.63], // Am9
      [87.31, 130.81, 174.61, 261.63, 329.63],  // Fmaj7
      [73.42, 146.83, 220.00, 261.63, 329.63],  // Dm9
      [82.41, 164.81, 196.00, 246.94, 293.66],  // Em7
    ];
    let step = 0;

    const playOceanStep = () => {
      if (!this.ctx || !this.masterGain || this.isMuted) return;
      const now = this.ctx.currentTime;
      const chord = oceanChords[step % oceanChords.length];
      step++;

      // Ethereal underwater sine pad with resonance
      chord.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(freq * 1.5, now);
        filter.Q.setValueAtTime(2.5, now);

        const v = idx === 0 ? 0.36 : 0.22;
        g.gain.setValueAtTime(0.001, now);
        g.gain.linearRampToValueAtTime(v, now + 1.8);
        g.gain.exponentialRampToValueAtTime(0.001, now + 5.8);

        osc.connect(filter);
        filter.connect(g);
        g.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 6.0);
      });

      // High futuristic sonar ping
      const pingFreq = 960;
      const pingOsc = this.ctx.createOscillator();
      const pingGain = this.ctx.createGain();
      pingOsc.type = 'sine';
      pingOsc.frequency.setValueAtTime(pingFreq, now + 1.2);
      pingOsc.frequency.exponentialRampToValueAtTime(840, now + 2.4);

      pingGain.gain.setValueAtTime(0.001, now + 1.2);
      pingGain.gain.linearRampToValueAtTime(0.18, now + 1.25);
      pingGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

      pingOsc.connect(pingGain);
      pingGain.connect(this.masterGain);
      pingOsc.start(now + 1.2);
      pingOsc.stop(now + 4.0);
    };

    playOceanStep();
    const timer = window.setInterval(playOceanStep, 5600);
    this.intervalIds.push(timer);
  }

  // --- UI Sound Effects ---
  public playChoiceClick() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(380, now);
      osc.frequency.exponentialRampToValueAtTime(680, now + 0.09);

      g.gain.setValueAtTime(0.24, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(g);
      g.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch {}
  }

  public playItemPickup() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const notes = [587.33, 739.99, 880, 1174.66]; // D5, F#5, A5, D6
      notes.forEach((f, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + idx * 0.08);

        g.gain.setValueAtTime(0.18, now + idx * 0.08);
        g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.45);

        osc.connect(g);
        g.connect(this.masterGain);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.48);
      });
    } catch {}
  }

  public playEndingTriumph() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const chord = [261.63, 329.63, 392.00, 523.25, 659.25]; // C Major
      chord.forEach((f) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now);

        g.gain.setValueAtTime(0.25, now);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 3.4);

        osc.connect(g);
        g.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 3.5);
      });
    } catch {}
  }
}

export const soundscape = new SoundscapeEngine();
