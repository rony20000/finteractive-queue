import { useCallback } from 'react';
import { Task } from '../types/task';
import {
  createTask,
  sortTasksByPriority,
  getActiveTasks,
  getCompletedTasks,
  getCurrentTask,
} from '../utils/taskUtils';
import { useLocalStorage } from './useLocalStorage';

export const useTaskQueue = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('finteractive_tasks', []);

  const addTask = useCallback((name: string, priority: number) => {
    const newTask = createTask(name, priority);
    setTasks(sortTasksByPriority([...tasks, newTask]));
  }, [tasks, setTasks]);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks(
      sortTasksByPriority(
        tasks.map(task => (task.id === id ? { ...task, ...updates } : task))
      )
    );
  }, [tasks, setTasks]);

  const removeTask = useCallback((id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  }, [tasks, setTasks]);

  const clearCompleted = useCallback(() => {
    setTasks(tasks.filter(task => task.status !== 'completed'));
  }, [tasks, setTasks]);

  const resetQueue = useCallback(() => {
    setTasks([]);
  }, [setTasks]);

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

