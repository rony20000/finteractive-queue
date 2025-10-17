import React from 'react';
import { motion } from 'framer-motion';
import { Task } from '../types/task';
import { getPriorityColor, getPriorityLabel } from '../types/task';
import { ProgressBar } from './ProgressBar';
import { Trash2, CheckCircle, Clock } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  isCurrentTask?: boolean;
  onRemove?: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = React.memo(
  ({ task, isCurrentTask = false, onRemove }) => {
    const priorityColor = getPriorityColor(task.priority);
    const priorityLabel = getPriorityLabel(task.priority);

    const getStatusIcon = () => {
      if (task.status === 'completed') {
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      }
      if (isCurrentTask) {
        return <Clock className="h-5 w-5 text-blue-500 animate-pulse" />;
      }
      return null;
    };

    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        whileHover={!isCurrentTask && task.status !== 'completed' ? { scale: 1.02, y: -2 } : {}}
        className={`rounded-lg p-4 transition-all duration-200 ${
          isCurrentTask
            ? 'border-2 border-blue-500 bg-slate-800 shadow-lg shadow-blue-500/20'
            : task.status === 'completed'
              ? 'border border-slate-700 bg-slate-900 opacity-75'
              : 'border border-slate-700 bg-slate-800 hover:bg-slate-700 hover:shadow-lg hover:shadow-slate-900/50'
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              {getStatusIcon()}
              <h3 className="font-semibold text-white">{task.name}</h3>
            </div>

            <div className="mt-2 flex items-center gap-3">
              <span
                className="inline-block rounded-full px-2 py-1 text-xs font-medium text-white"
                style={{ backgroundColor: priorityColor }}
              >
                {priorityLabel} ({task.priority})
              </span>
              <span className="text-xs text-slate-400">
                {task.status === 'completed' ? 'Completed' : 'Processing'}
              </span>
            </div>
          </div>

          {onRemove && task.status !== 'completed' && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onRemove(task.id)}
              className="ml-2 rounded p-1 text-slate-400 hover:bg-slate-700 hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </motion.button>
          )}
        </div>

        <div className="mt-3">
          <ProgressBar progress={task.progress} size="md" />
        </div>

        {isCurrentTask && (
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-2 text-xs text-blue-400"
          >
            Currently processing...
          </motion.div>
        )}
      </motion.div>
    );
  }
);

TaskCard.displayName = 'TaskCard';

