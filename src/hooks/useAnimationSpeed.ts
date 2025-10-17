import { useSettings } from '../context/SettingsContext';
import { getAnimationDuration, getAnimationDelayMultiplier } from '../utils/animationUtils';

export const useAnimationSpeed = () => {
  const { settings } = useSettings();

  const duration = (baseSpeed: number = 0.3) => getAnimationDuration(baseSpeed, settings.animationSpeed);
  const delayMultiplier = () => getAnimationDelayMultiplier(settings.animationSpeed);
  const delay = (baseDelay: number = 0.1) => baseDelay * delayMultiplier();

  return { duration, delay, delayMultiplier };
};

