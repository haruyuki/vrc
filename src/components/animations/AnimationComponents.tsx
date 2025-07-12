import React, { ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';

interface FadeInProps extends MotionProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  y?: number;
  role?: string;
  'aria-label'?: string;
}

// FadeIn: Animates children with a fade and optional vertical movement
export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  className = '',
  y = 0,
  ...motionProps
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

interface ScaleOnHoverProps extends MotionProps {
  children: ReactNode;
  scale?: number;
  className?: string;
}

// ScaleOnHover: Scales children on hover and tap
export const ScaleOnHover: React.FC<ScaleOnHoverProps> = ({
  children,
  scale = 1.05,
  className = '',
  ...motionProps
}) => {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.95 }}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

interface AnimatedContainerProps extends MotionProps {
  children: ReactNode;
  staggerChildren?: number;
  delayChildren?: number;
  className?: string;
}

// AnimatedContainer: Animates a group of children with staggered entrance
export const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  staggerChildren = 0.1,
  delayChildren = 0.2,
  className = '',
  ...motionProps
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren,
            delayChildren,
          },
        },
      }}
      initial="hidden"
      animate="visible"
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

interface AnimatedItemProps extends MotionProps {
  children: ReactNode;
  className?: string;
}

// AnimatedItem: Animates a single child with fade and upward movement
export const AnimatedItem: React.FC<AnimatedItemProps> = ({
  children,
  className = '',
  ...motionProps
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};
