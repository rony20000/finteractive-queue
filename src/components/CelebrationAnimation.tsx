import React from 'react';
import { motion } from 'framer-motion';

interface CelebrationAnimationProps {
  isVisible: boolean;
}

const confetti = Array.from({ length: 30 }, (_, i) => i);

export function CelebrationAnimation({ isVisible }: CelebrationAnimationProps) {
  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {confetti.map(i => (
        <motion.div
          key={i}
          initial={{
            opacity: 1,
            x: Math.random() * window.innerWidth,
            y: -10,
            rotate: 0,
          }}
          animate={{
            opacity: 0,
            y: window.innerHeight + 10,
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: 2 + Math.random() * 1,
            ease: 'easeIn',
          }}
          className="absolute h-2 w-2 rounded-full"
          style={{
            backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][
              Math.floor(Math.random() * 5)
            ],
          }}
        />
      ))}

      <motion.div
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 1, opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl"
      >
        🎉
      </motion.div>
    </div>
  );
}

