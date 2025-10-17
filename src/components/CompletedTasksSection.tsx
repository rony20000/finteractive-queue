import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Task } from '../types/task';
import { getPriorityColor, getPriorityLabel } from '../types/task';
import { formatDate } from '../utils/taskUtils';
import { CheckCircle, Trash2 } from 'lucide-react';
import { useAnimationSpeed } from '../hooks/useAnimationSpeed';

interface CompletedTasksSectionProps {
  tasks: Task[];
  onClearAll?: () => void;
  onRemoveTask?: (id: string) => void;
}

export const CompletedTasksSection: React.FC<CompletedTasksSectionProps> = ({
  tasks,
  onClearAll,
  onRemoveTask,
}) => {
  const { duration, delay } = useAnimationSpeed();

  if (tasks.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: duration(0.3) }}
      className="rounded-lg border border-slate-700 bg-slate-800 p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <h2 className="text-xl font-semibold text-white">
            Completed Tasks ({tasks.length})
          </h2>
        </div>
        {onClearAll && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClearAll}
            className="rounded-lg bg-red-600/20 px-3 py-1 text-sm font-medium text-red-400 hover:bg-red-600/30"
          >
            Clear All
          </motion.button>
        )}
      </div>

      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: duration(0.3), delay: delay(index * 0.05) }}
              className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-900/50 p-3 transition-all hover:bg-slate-900"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <p className="font-medium text-white">{task.name}</p>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span
                    className="inline-block rounded px-2 py-0.5 text-xs font-medium text-white"
                    style={{ backgroundColor: getPriorityColor(task.priority) }}
                  >
                    {getPriorityLabel(task.priority)}
                  </span>
                  <span className="text-xs text-slate-500">
                    Completed at {formatDate(task.createdAt)}
                  </span>
                </div>
              </div>

              {onRemoveTask && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onRemoveTask(task.id)}
                  className="ml-2 rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </motion.button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

