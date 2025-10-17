import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Moon, Sun, Volume2, VolumeX, Save, RotateCcw } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { useAnimationSpeed } from '../hooks/useAnimationSpeed';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const { settings, updateSettings, resetSettings } = useSettings();
  const { duration } = useAnimationSpeed();

  const bgClass = settings.theme === 'light' ? 'bg-white' : 'bg-slate-800';
  const borderClass = settings.theme === 'light' ? 'border-slate-300' : 'border-slate-700';
  const textClass = settings.theme === 'light' ? 'text-slate-900' : 'text-white';
  const labelClass = settings.theme === 'light' ? 'text-slate-700' : 'text-slate-300';
  const buttonBgClass = settings.theme === 'light' ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-slate-700 text-slate-400 hover:bg-slate-600';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: duration(0.3) }}
            className={`fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border ${borderClass} ${bgClass} p-6 shadow-xl`}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className={`text-xl font-bold ${textClass}`}>Settings</h2>
              <button
                onClick={onClose}
                className={`transition-colors ${settings.theme === 'light' ? 'text-slate-500 hover:text-slate-700' : 'text-slate-400 hover:text-white'}`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className={`text-sm font-medium ${labelClass}`}>Theme</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateSettings({ theme: 'dark' })}
                      className={`rounded-lg p-2 transition-colors pointer-events-auto ${
                        settings.theme === 'dark'
                          ? 'bg-blue-600 text-white'
                          : buttonBgClass
                      }`}
                    >
                      <Moon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => updateSettings({ theme: 'light' })}
                      className={`rounded-lg p-2 transition-colors pointer-events-auto ${
                        settings.theme === 'light'
                          ? 'bg-blue-600 text-white'
                          : buttonBgClass
                      }`}
                    >
                      <Sun className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-3 flex items-center justify-between">
                  <span className={`text-sm font-medium ${labelClass}`}>Animation Speed</span>
                  <select
                    value={settings.animationSpeed}
                    onChange={e => updateSettings({ animationSpeed: e.target.value as any })}
                    className={`rounded-lg border px-3 py-1 text-sm ${
                      settings.theme === 'light'
                        ? 'border-slate-300 bg-slate-100 text-slate-900'
                        : 'border-slate-600 bg-slate-700 text-white'
                    }`}
                  >
                    <option value="slow">Slow</option>
                    <option value="normal">Normal</option>
                    <option value="fast">Fast</option>
                  </select>
                </label>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${labelClass}`}>Sound Notifications</span>
                  <button
                    onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
                    className={`rounded-lg p-2 transition-colors pointer-events-auto ${
                      settings.soundEnabled
                        ? 'bg-blue-600 text-white'
                        : buttonBgClass
                    }`}
                  >
                    {settings.soundEnabled ? (
                      <Volume2 className="h-4 w-4" />
                    ) : (
                      <VolumeX className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className={`border-t ${borderClass} pt-6`}>
                <button
                  onClick={resetSettings}
                  className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    settings.theme === 'light'
                      ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset to Defaults
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

