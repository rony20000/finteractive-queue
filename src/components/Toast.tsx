import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const ToastContainer = React.memo(function ToastContainer() {
  const { toasts, removeToast } = useToast();

  const getIcon = useMemo(() => (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5" />;
      case 'error':
        return <AlertCircle className="h-5 w-5" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5" />;
      case 'info':
      default:
        return <Info className="h-5 w-5" />;
    }
  }, []);

  const getColors = useMemo(() => (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-900/80 border-emerald-700 text-emerald-100';
      case 'error':
        return 'bg-red-900/80 border-red-700 text-red-100';
      case 'warning':
        return 'bg-amber-900/80 border-amber-700 text-amber-100';
      case 'info':
      default:
        return 'bg-blue-900/80 border-blue-700 text-blue-100';
    }
  }, []);

  const getIconColor = useMemo(() => (type: string) => {
    switch (type) {
      case 'success':
        return 'text-emerald-400';
      case 'error':
        return 'text-red-400';
      case 'warning':
        return 'text-amber-400';
      case 'info':
      default:
        return 'text-blue-400';
    }
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 sm:bottom-6 sm:right-6">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, x: 100 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, x: 100 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center gap-3 rounded-lg border px-4 py-3 backdrop-blur-sm ${getColors(toast.type)}`}
          >
            <div className={getIconColor(toast.type)}>{getIcon(toast.type)}</div>
            <p className="flex-1 text-sm font-medium">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-2 text-current opacity-70 transition-opacity hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
});

