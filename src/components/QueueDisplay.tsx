import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Task } from '../types/task';
import { TaskCard } from './TaskCard';
import { useAnimationSpeed } from '../hooks/useAnimationSpeed';
import { AlertCircle } from 'lucide-react';

interface QueueDisplayProps {
  tasks: Task[];
  currentTask: Task | null;
  onRemoveTask?: (id: string) => void;
}

export const QueueDisplay: React.FC<QueueDisplayProps> = ({
  tasks,
  currentTask,
  onRemoveTask,
}) => {
  const { duration, delay } = useAnimationSpeed();

  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: duration(0.3) }}
        className="rounded-lg border border-slate-700 bg-slate-800 p-8 text-center"
      >
        <AlertCircle className="mx-auto h-12 w-12 text-slate-500" />
        <p className="mt-4 text-slate-400">No active tasks. Add a task to get started!</p>
      </motion.div>
    );
  }

  const currentTaskId = currentTask?.id;
  const otherTasks = tasks.filter(task => task.id !== currentTaskId);

  return (
    <div className="space-y-4">
      {currentTask && (
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
            Currently Processing
          </h3>
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <TaskCard
              task={currentTask}
              isCurrentTask={true}
              onRemove={onRemoveTask}
            />
          </motion.div>
        </div>
      )}

      {otherTasks.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
            Waiting in Queue ({otherTasks.length})
          </h3>
          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {otherTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: duration(0.3), delay: delay(index * 0.05) }}
                >
                  <TaskCard
                    task={task}
                    isCurrentTask={false}
                    onRemove={onRemoveTask}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};

