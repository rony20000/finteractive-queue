import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  label?: string;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ProgressBar: React.FC<ProgressBarProps> = React.memo(({
  progress,
  label,
  animated = true,
  size = 'md',
}) => {
  const sizeClasses = useMemo(() => ({
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  }), []);

  const progressColor = useMemo(() => {
    if (progress < 33) return 'bg-red-500';
    if (progress < 66) return 'bg-yellow-500';
    return 'bg-green-500';
  }, [progress]);

  const roundedProgress = useMemo(() => Math.round(progress), [progress]);

  return (
    <div className="w-full">
      {label && <p className="mb-1 text-xs font-medium text-slate-400">{label}</p>}
      <div className={`relative w-full rounded-full bg-slate-700 overflow-hidden ${sizeClasses[size]}`}>
        <motion.div
          className={`h-full rounded-full ${progressColor} shadow-lg`}
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={animated ? { duration: 0.5, ease: 'easeOut' } : { duration: 0 }}
        />
      </div>
      {label && (
        <p className="mt-1 text-right text-xs font-semibold text-white">
          {roundedProgress}%
        </p>
      )}
    </div>
  );
});

ProgressBar.displayName = 'ProgressBar';

