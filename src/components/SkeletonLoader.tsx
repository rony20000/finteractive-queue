import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface SkeletonLoaderProps {
  count?: number;
  type?: 'task' | 'stat' | 'form';
}

export const SkeletonLoader = React.memo(function SkeletonLoader({ count = 1, type = 'task' }: SkeletonLoaderProps) {
  const shimmer = useMemo(() => ({
    initial: { backgroundPosition: '200% center' },
    animate: { backgroundPosition: '-200% center' },
    transition: { duration: 2, repeat: Infinity, ease: 'linear' },
  }), []);

  if (type === 'stat') {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            {...shimmer}
            className="h-24 rounded-lg bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-[length:200%_100%]"
          />
        ))}
      </div>
    );
  }

  if (type === 'form') {
    return (
      <div className="space-y-4 rounded-lg border border-slate-700 bg-slate-800/50 p-6">
        <motion.div
          {...shimmer}
          className="h-10 rounded-lg bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-[length:200%_100%]"
        />
        <motion.div
          {...shimmer}
          className="h-10 rounded-lg bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-[length:200%_100%]"
        />
        <motion.div
          {...shimmer}
          className="h-10 rounded-lg bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-[length:200%_100%]"
        />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          {...shimmer}
          className="h-20 rounded-lg bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-[length:200%_100%]"
        />
      ))}
    </div>
  );
});

