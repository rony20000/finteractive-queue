import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, ListTodo, Zap } from 'lucide-react';
import { useAnimationSpeed } from '../hooks/useAnimationSpeed';

interface StatsPanelProps {
  totalTasks: number;
  activeTasks: number;
  completedTasks: number;
  currentProgress: number;
}

export const StatsPanel: React.FC<StatsPanelProps> = React.memo(({
  totalTasks,
  activeTasks,
  completedTasks,
  currentProgress,
}) => {
  const { duration, delay } = useAnimationSpeed();
  const stats = useMemo(() => [
    {
      label: 'Total Tasks',
      value: totalTasks,
      icon: ListTodo,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: 'Active Tasks',
      value: activeTasks,
      icon: Clock,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-500/10',
    },
    {
      label: 'Completed',
      value: completedTasks,
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
    },
    {
      label: 'Progress',
      value: `${Math.round(currentProgress)}%`,
      icon: Zap,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
    },
  ], [totalTasks, activeTasks, completedTasks, currentProgress]);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration(0.3), delay: delay(index * 0.1) }}
            whileHover={{ scale: 1.05, y: -4 }}
            className={`rounded-lg border border-slate-700 ${stat.bgColor} p-6 transition-all duration-200 hover:shadow-lg hover:shadow-slate-900/50`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">{stat.label}</p>
                <motion.p
                  key={stat.value}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: duration(0.3) }}
                  className={`mt-2 text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                >
                  {stat.value}
                </motion.p>
              </div>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Icon className="h-8 w-8 text-slate-400" />
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
});

StatsPanel.displayName = 'StatsPanel';

