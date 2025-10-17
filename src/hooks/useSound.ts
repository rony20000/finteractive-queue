import { useCallback } from 'react';
import { useSettings } from '../context/SettingsContext';
import { playSound } from '../utils/soundUtils';

export const useSound = () => {
  const { settings } = useSettings();

  const play = useCallback((type: 'success' | 'error' | 'notification') => {
    if (settings.soundEnabled) {
      try {
        playSound(type);
      } catch {
        // Silently fail if audio context is not available
      }
    }
  }, [settings.soundEnabled]);

  return { play };
};

