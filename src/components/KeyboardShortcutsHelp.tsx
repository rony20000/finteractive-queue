import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Keyboard } from 'lucide-react';

interface KeyboardShortcutsHelpProps {
  isOpen: boolean;
  onClose: () => void;
}

const shortcuts = [
  { keys: ['Ctrl', 'Enter'], description: 'Add new task' },
  { keys: ['Ctrl', 'Z'], description: 'Undo last action' },
  { keys: ['Ctrl', 'Y'], description: 'Redo last action' },
  { keys: ['Ctrl', ','], description: 'Open settings' },
  { keys: ['?'], description: 'Show this help' },
  { keys: ['Escape'], description: 'Close dialogs' },
];

export function KeyboardShortcutsHelp({ isOpen, onClose }: KeyboardShortcutsHelpProps) {
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
              <div className="flex items-center gap-2">
                <Keyboard className="h-5 w-5 text-blue-400" />
                <h2 className="text-xl font-bold text-white">Keyboard Shortcuts</h2>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 transition-colors hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              {shortcuts.map((shortcut, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">{shortcut.description}</span>
                  <div className="flex gap-1">
                    {shortcut.keys.map((key, keyIndex) => (
                      <React.Fragment key={keyIndex}>
                        <kbd className="rounded-lg border border-slate-600 bg-slate-700 px-2 py-1 text-xs font-semibold text-slate-200">
                          {key}
                        </kbd>
                        {keyIndex < shortcut.keys.length - 1 && (
                          <span className="text-slate-500">+</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-slate-700 pt-4 text-xs text-slate-400">
              <p>Press ? to toggle this help anytime</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

