import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
  type?: 'inline' | 'banner';
}

export const ErrorMessage = React.memo(function ErrorMessage({ message, onDismiss, type = 'inline' }: ErrorMessageProps) {
  if (type === 'banner') {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="mb-4 flex items-center gap-3 rounded-lg border border-red-700 bg-red-900/20 px-4 py-3 text-red-100"
      >
        <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-400" />
        <p className="flex-1 text-sm">{message}</p>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="ml-2 text-red-400 transition-colors hover:text-red-300"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex items-center gap-2 rounded-lg border border-red-700 bg-red-900/20 px-3 py-2 text-sm text-red-100"
    >
      <AlertCircle className="h-4 w-4 flex-shrink-0 text-red-400" />
      <span>{message}</span>
    </motion.div>
  );
});

