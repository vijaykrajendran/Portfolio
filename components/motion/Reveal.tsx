import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  /** delay in seconds */
  delay?: number;
  /** slide direction */
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  /** distance to travel in px */
  distance?: number;
  once?: boolean;
}

const offsets = (direction: string, distance: number) => {
  switch (direction) {
    case 'down':
      return { x: 0, y: -distance };
    case 'left':
      return { x: distance, y: 0 };
    case 'right':
      return { x: -distance, y: 0 };
    case 'up':
    default:
      return { x: 0, y: distance };
  }
};

export default function Reveal({
  children,
  delay = 0,
  direction = 'up',
  className,
  distance = 24,
  once = true,
}: RevealProps): React.ReactElement {
  const initial = offsets(direction, distance);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...initial }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
