import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export const LoadingSpinner = React.memo(function LoadingSpinner({ size = 'md', text }: LoadingSpinnerProps) {
  const sizeClasses = useMemo(() => ({
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }), []);

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className={`${sizeClasses[size]} border-2 border-slate-700 border-t-blue-500 rounded-full`}
      />
      {text && <p className="text-sm text-slate-400">{text}</p>}
    </div>
  );
});

