import { useEffect, useRef, useCallback } from 'react';
import { Task } from '../types/task';
import { updateTaskProgress, getCurrentTask } from '../utils/taskUtils';

const PROCESSING_INTERVAL = 5000;
const MIN_PROGRESS_INCREMENT = 10;
const MAX_PROGRESS_INCREMENT = 20;

export const useTaskProcessing = (
  tasks: Task[],
  onTaskUpdate: (id: string, updates: Partial<Task>) => void,
  onTaskCompleted?: () => void
) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const processNextTask = useCallback(() => {
    const currentTask = getCurrentTask(tasks);
    if (!currentTask) return;

    const increment =
      Math.floor(Math.random() * (MAX_PROGRESS_INCREMENT - MIN_PROGRESS_INCREMENT + 1)) +
      MIN_PROGRESS_INCREMENT;

    const updatedTask = updateTaskProgress(currentTask, increment);

    if (updatedTask.status === 'completed' && onTaskCompleted) {
      onTaskCompleted();
    }

    onTaskUpdate(currentTask.id, updatedTask);
  }, [tasks, onTaskUpdate, onTaskCompleted]);

  useEffect(() => {
    intervalRef.current = setInterval(processNextTask, PROCESSING_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [processNextTask]);
};

