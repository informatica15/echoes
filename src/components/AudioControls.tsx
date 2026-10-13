import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Volume1, Sliders } from 'lucide-react';
import { soundscape } from '../utils/audioEngine';

interface AudioControlsProps {
  onVolumeChange?: (vol: number) => void;
  onMuteToggle?: (muted: boolean) => void;
}

export const AudioControls: React.FC<AudioControlsProps> = ({
  onVolumeChange,
  onMuteToggle,
}) => {
  const [volume, setVolume] = useState<number>(soundscape.getVolume());
  const [isMuted, setIsMuted] = useState<boolean>(soundscape.getIsMuted());
  const [showSlider, setShowSlider] = useState<boolean>(false);

  useEffect(() => {
    setVolume(soundscape.getVolume());
    setIsMuted(soundscape.getIsMuted());
  }, []);

  const handleMuteToggle = () => {
    soundscape.initContext();
    const nextMuted = soundscape.toggleMute();
    setIsMuted(nextMuted);
    if (onMuteToggle) onMuteToggle(nextMuted);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    soundscape.initContext();
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundscape.setVolume(val);
    if (isMuted && val > 0) {
      soundscape.setMuted(false);
      setIsMuted(false);
    }
    if (onVolumeChange) onVolumeChange(val);
  };

  const setPreset = (presetVal: number) => {
    soundscape.initContext();
    setVolume(presetVal);
    soundscape.setVolume(presetVal);
    if (presetVal === 0) {
      soundscape.setMuted(true);
      setIsMuted(true);
    } else {
      soundscape.setMuted(false);
      setIsMuted(false);
    }
    if (onVolumeChange) onVolumeChange(presetVal);
  };

  const percent = Math.round(volume * 100);

  return (
    <div className="relative inline-flex items-center">
      {/* Quick Mute Toggle Button */}
      <button
        onClick={handleMuteToggle}
        onMouseEnter={() => setShowSlider(true)}
        className={`p-2 rounded-xl border transition-all flex items-center justify-center ${
          isMuted
            ? 'bg-rose-950/40 border-rose-800/80 text-rose-400 hover:bg-rose-900/50'
            : 'bg-slate-900/80 border-slate-750 text-emerald-400 hover:bg-slate-800 hover:text-emerald-300'
        }`}
        title={isMuted ? 'Unmute Audio' : `Mute Audio (Current: ${percent}%)`}
      >
        {isMuted || volume === 0 ? (
          <VolumeX className="w-4 h-4" />
        ) : volume < 0.4 ? (
          <Volume1 className="w-4 h-4" />
        ) : (
          <Volume2 className="w-4 h-4" />
        )}
      </button>

      {/* Floating Volume Slider Popover */}
      {showSlider && (
        <div
          onMouseLeave={() => setShowSlider(false)}
          className="absolute right-0 top-full mt-2 z-50 p-3 rounded-2xl bg-slate-950/95 border border-slate-800 shadow-2xl backdrop-blur-xl w-60 space-y-3 animate-fade-in"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              Soundtrack Volume
            </span>
            <span className={`font-mono font-bold ${isMuted ? 'text-rose-400' : 'text-amber-400'}`}>
              {isMuted ? 'Muted' : `${percent}%`}
            </span>
          </div>

          {/* Range Slider */}
          <div className="space-y-1">
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleSliderChange}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          {/* Quick Presets */}
          <div className="flex items-center justify-between gap-1 pt-1 border-t border-slate-850">
            <button
              onClick={() => setPreset(0)}
              className="px-2 py-1 text-[10px] rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white"
            >
              Mute
            </button>
            <button
              onClick={() => setPreset(0.4)}
              className="px-2 py-1 text-[10px] rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white"
            >
              40%
            </button>
            <button
              onClick={() => setPreset(0.75)}
              className="px-2 py-1 text-[10px] rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white"
            >
              75%
            </button>
            <button
              onClick={() => setPreset(1.0)}
              className="px-2 py-1 text-[10px] rounded bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-bold"
            >
              Max
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
