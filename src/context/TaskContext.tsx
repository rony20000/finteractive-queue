import React, { createContext, useContext, ReactNode } from 'react';
import { Task } from '../types/task';
import { useTaskQueue } from '../hooks/useTaskQueue';
import { useTaskProcessing } from '../hooks/useTaskProcessing';

interface TaskContextType {
  tasks: Task[];
  activeTasks: Task[];
  completedTasks: Task[];
  currentTask: Task | null;
  addTask: (name: string, priority: number) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  removeTask: (id: string) => void;
  clearCompleted: () => void;
  resetQueue: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const {
    tasks,
    activeTasks,
    completedTasks,
    currentTask,
    addTask,
    updateTask,
    removeTask,
    clearCompleted,
    resetQueue,
  } = useTaskQueue();

  useTaskProcessing(tasks, updateTask);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        activeTasks,
        completedTasks,
        currentTask,
        addTask,
        updateTask,
        removeTask,
        clearCompleted,
        resetQueue,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within TaskProvider');
  }
  return context;
};

