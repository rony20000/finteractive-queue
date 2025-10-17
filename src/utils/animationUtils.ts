import { AnimationSpeed } from '../types/settings';

export const getAnimationDuration = (baseSpeed: number, animationSpeed: AnimationSpeed): number => {
  switch (animationSpeed) {
    case 'slow':
      return baseSpeed * 1.5;
    case 'fast':
      return baseSpeed * 0.5;
    case 'normal':
    default:
      return baseSpeed;
  }
};

export const getAnimationDelayMultiplier = (animationSpeed: AnimationSpeed): number => {
  switch (animationSpeed) {
    case 'slow':
      return 1.5;
    case 'fast':
      return 0.5;
    case 'normal':
    default:
      return 1;
  }
};

