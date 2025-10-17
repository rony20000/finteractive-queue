import { Task, TaskStatus } from '../types/task';

export const generateTaskId = () => {
  return `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const createTask = (name: string, priority: number): Task => {
  return {
    id: generateTaskId(),
    name,
    priority,
    progress: 0,
    createdAt: new Date(),
    status: 'pending',
  };
};

export const sortTasksByPriority = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a, b) => b.priority - a.priority);
};

export const getCurrentTask = (tasks: Task[]): Task | null => {
  const activeTasks = tasks.filter(t => t.status !== 'completed');
  if (activeTasks.length === 0) return null;
  return sortTasksByPriority(activeTasks)[0];
};

export const updateTaskProgress = (task: Task, increment: number): Task => {
  const newProgress = Math.min(task.progress + increment, 100);
  const newStatus: TaskStatus = newProgress === 100 ? 'completed' : 'processing';
  return {
    ...task,
    progress: newProgress,
    status: newStatus,
  };
};

export const validateTaskName = (name: string): boolean => {
  return name.trim().length > 0 && name.trim().length <= 100;
};

export const validatePriority = (priority: number): boolean => {
  return Number.isInteger(priority) && priority >= 1 && priority <= 10;
};

export const getActiveTasks = (tasks: Task[]): Task[] => {
  return tasks.filter(t => t.status !== 'completed');
};

export const getCompletedTasks = (tasks: Task[]): Task[] => {
  return tasks.filter(t => t.status === 'completed');
};

export const formatDate = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

