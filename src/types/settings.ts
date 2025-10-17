export type Theme = 'dark' | 'light';
export type AnimationSpeed = 'slow' | 'normal' | 'fast';

export interface Settings {
  theme: Theme;
  animationSpeed: AnimationSpeed;
  soundEnabled: boolean;
  showKeyboardHelp: boolean;
}

export interface SettingsContextType {
  settings: Settings;
  updateSettings: (settings: Partial<Settings>) => void;
  resetSettings: () => void;
}

export const DEFAULT_SETTINGS: Settings = {
  theme: 'dark',
  animationSpeed: 'normal',
  soundEnabled: true,
  showKeyboardHelp: true,
};

