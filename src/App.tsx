import { useState } from 'react';
import { TaskProvider } from './context/TaskContext';
import { useTaskContext } from './context/TaskContext';
import { ToastProvider } from './context/ToastContext';
import { SettingsProvider } from './context/SettingsContext';
import { TaskForm } from './components/TaskForm';
import { StatsPanel } from './components/StatsPanel';
import { QueueDisplay } from './components/QueueDisplay';
import { CompletedTasksSection } from './components/CompletedTasksSection';
import { ToastContainer } from './components/Toast';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SettingsPanel } from './components/SettingsPanel';
import { KeyboardShortcutsHelp } from './components/KeyboardShortcutsHelp';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { Settings } from 'lucide-react';
import { motion } from 'framer-motion';

function AppContent() {
  const { tasks, activeTasks, completedTasks, currentTask, addTask, removeTask, clearCompleted } =
    useTaskContext();
  const [showSettings, setShowSettings] = useState(false);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);

  useKeyboardShortcuts([
    {
      key: 'Enter',
      ctrlKey: true,
      callback: () => {
        const input = document.querySelector('input[placeholder="Enter task name..."]') as HTMLInputElement;
        if (input) input.focus();
      },
    },
    {
      key: ',',
      ctrlKey: true,
      callback: () => setShowSettings(prev => !prev),
    },
    {
      key: '?',
      callback: () => setShowKeyboardHelp(prev => !prev),
    },
    {
      key: 'Escape',
      callback: () => {
        setShowSettings(false);
        setShowKeyboardHelp(false);
      },
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold text-white sm:text-5xl">Task Queue</h1>
            <p className="mt-2 text-slate-400">
              Manage and process tasks with priority-based queuing
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSettings(true)}
            className="rounded-lg bg-slate-700 p-3 text-slate-300 transition-colors hover:bg-slate-600 hover:text-white"
            title="Settings (Ctrl+,)"
          >
            <Settings className="h-5 w-5" />
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <StatsPanel
            totalTasks={tasks.length}
            activeTasks={activeTasks.length}
            completedTasks={completedTasks.length}
            currentProgress={currentTask?.progress ?? 0}
          />
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <TaskForm onAddTask={addTask} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8 lg:col-span-2"
          >
            <div>
              <h2 className="mb-4 text-xl font-semibold text-white">Active Queue</h2>
              <QueueDisplay
                tasks={activeTasks}
                currentTask={currentTask}
                onRemoveTask={removeTask}
              />
            </div>

            {completedTasks.length > 0 && (
              <CompletedTasksSection
                tasks={completedTasks}
                onClearAll={clearCompleted}
                onRemoveTask={removeTask}
              />
            )}
          </motion.div>
        </div>

        <SettingsPanel isOpen={showSettings} onClose={() => setShowSettings(false)} />
        <KeyboardShortcutsHelp isOpen={showKeyboardHelp} onClose={() => setShowKeyboardHelp(false)} />
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <SettingsProvider>
          <TaskProvider>
            <AppContent />
            <ToastContainer />
          </TaskProvider>
        </SettingsProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;

