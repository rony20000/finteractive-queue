export type TaskStatus = 'pending' | 'processing' | 'completed';

export interface Task {
  id: string;
  name: string;
  priority: number;
  progress: number;
  createdAt: Date;
  status: TaskStatus;
}

export type PriorityLevel = 'high' | 'medium' | 'low';

export const getPriorityLevel = (priority: number): PriorityLevel => {
  if (priority >= 8) return 'high';
  if (priority >= 5) return 'medium';
  return 'low';
};

export const getPriorityColor = (priority: number): string => {
  const level = getPriorityLevel(priority);
  const colors: Record<PriorityLevel, string> = {
    high: '#ef4444',
    medium: '#f59e0b',
    low: '#10b981',
  };
  return colors[level];
};

export const getPriorityLabel = (priority: number): string => {
  const level = getPriorityLevel(priority);
  const labels: Record<PriorityLevel, string> = {
    high: 'High',
    medium: 'Medium',
    low: 'Low',
  };
  return labels[level];
};

