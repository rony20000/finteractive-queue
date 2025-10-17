import { useState, useCallback } from 'react';
import { Task } from '../types/task';
import {
  createTask,
  sortTasksByPriority,
  getActiveTasks,
  getCompletedTasks,
  getCurrentTask,
} from '../utils/taskUtils';

export const useTaskQueue = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = useCallback((name: string, priority: number) => {
    const newTask = createTask(name, priority);
    setTasks(prev => sortTasksByPriority([...prev, newTask]));
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks(prev =>
      sortTasksByPriority(
        prev.map(task => (task.id === id ? { ...task, ...updates } : task))
      )
    );
  }, []);

  const removeTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTasks(prev => prev.filter(task => task.status !== 'completed'));
  }, []);

  const resetQueue = useCallback(() => {
    setTasks([]);
  }, []);

  const activeTasks = getActiveTasks(tasks);
  const completedTasks = getCompletedTasks(tasks);
  const currentTask = getCurrentTask(tasks);

  return {
    tasks,
    activeTasks,
    completedTasks,
    currentTask,
    addTask,
    updateTask,
    removeTask,
    clearCompleted,
    resetQueue,
  };
};

