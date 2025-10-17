import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Moon, Sun, Volume2, VolumeX, Save, RotateCcw } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const { settings, updateSettings, resetSettings } = useSettings();

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
            transition={{ duration: 0.3 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border border-slate-700 bg-slate-800 p-6 shadow-xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Settings</h2>
              <button
                onClick={onClose}
                className="text-slate-400 transition-colors hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-300">Theme</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateSettings({ theme: 'dark' })}
                      className={`rounded-lg p-2 transition-colors ${
                        settings.theme === 'dark'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                      }`}
                    >
                      <Moon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => updateSettings({ theme: 'light' })}
                      className={`rounded-lg p-2 transition-colors ${
                        settings.theme === 'light'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                      }`}
                    >
                      <Sun className="h-4 w-4" />
                    </button>
                  </div>
                </label>
              </div>

              <div>
                <label className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-300">Animation Speed</span>
                  <select
                    value={settings.animationSpeed}
                    onChange={e => updateSettings({ animationSpeed: e.target.value as any })}
                    className="rounded-lg border border-slate-600 bg-slate-700 px-3 py-1 text-sm text-white"
                  >
                    <option value="slow">Slow</option>
                    <option value="normal">Normal</option>
                    <option value="fast">Fast</option>
                  </select>
                </label>
              </div>

              <div>
                <label className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-300">Sound Notifications</span>
                  <button
                    onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
                    className={`rounded-lg p-2 transition-colors ${
                      settings.soundEnabled
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700 text-slate-400'
                    }`}
                  >
                    {settings.soundEnabled ? (
                      <Volume2 className="h-4 w-4" />
                    ) : (
                      <VolumeX className="h-4 w-4" />
                    )}
                  </button>
                </label>
              </div>

              <div>
                <label className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-300">Auto-save</span>
                  <input
                    type="checkbox"
                    checked={settings.autoSave}
                    onChange={e => updateSettings({ autoSave: e.target.checked })}
                    className="h-4 w-4 cursor-pointer rounded border-slate-600 bg-slate-700"
                  />
                </label>
              </div>

              <div className="border-t border-slate-700 pt-6">
                <button
                  onClick={resetSettings}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-600"
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

