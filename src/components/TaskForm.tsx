import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { validateTaskName, validatePriority } from '../utils/taskUtils';
import { Plus } from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface TaskFormProps {
  onAddTask: (name: string, priority: number) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const { addToast } = useToast();
  const [name, setName] = useState('');
  const [priority, setPriority] = useState(5);
  const [errors, setErrors] = useState<{ name?: string; priority?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setErrors({});

      const nameValid = validateTaskName(name);
      const priorityValid = validatePriority(priority);

      if (!nameValid) {
        setErrors(prev => ({
          ...prev,
          name: 'Task name must be 1-100 characters',
        }));
        addToast('Task name must be 1-100 characters', 'error');
      }

      if (!priorityValid) {
        setErrors(prev => ({
          ...prev,
          priority: 'Priority must be between 1 and 10',
        }));
        addToast('Priority must be between 1 and 10', 'error');
      }

      if (nameValid && priorityValid) {
        setIsSubmitting(true);
        onAddTask(name, priority);
        addToast(`Task "${name}" added successfully!`, 'success');
        setName('');
        setPriority(5);
        setTimeout(() => setIsSubmitting(false), 300);
      }
    },
    [name, priority, onAddTask, addToast]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-lg border border-slate-700 bg-slate-800 p-6"
    >
      <h2 className="mb-4 text-xl font-semibold text-white">Add New Task</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="taskName" className="block text-sm font-medium text-slate-300">
            Task Name
          </label>
          <input
            id="taskName"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter task name..."
            className={`mt-1 w-full rounded-lg border bg-slate-900 px-4 py-2 text-white placeholder-slate-500 transition-colors focus:outline-none focus:ring-2 ${
              errors.name
                ? 'border-red-500 focus:ring-red-500'
                : 'border-slate-600 focus:border-blue-500 focus:ring-blue-500'
            }`}
            maxLength={100}
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          <p className="mt-1 text-xs text-slate-400">{name.length}/100</p>
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-slate-300">
            Priority (1-10)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              id="priority"
              type="range"
              min="1"
              max="10"
              value={priority}
              onChange={e => setPriority(parseInt(e.target.value))}
              className="flex-1 cursor-pointer"
            />
            <div className="flex h-10 w-12 items-center justify-center rounded-lg bg-slate-900 font-semibold text-white">
              {priority}
            </div>
          </div>
          {errors.priority && <p className="mt-1 text-sm text-red-500">{errors.priority}</p>}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isSubmitting}
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          <div className="flex items-center justify-center gap-2">
            <Plus className="h-5 w-5" />
            Add Task
          </div>
        </motion.button>
      </form>
    </motion.div>
  );
};

