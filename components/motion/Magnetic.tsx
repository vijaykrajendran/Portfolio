import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface MagneticProps {
  children: ReactNode;
  /** how strongly it follows the cursor (0-1) */
  strength?: number;
  className?: string;
}

/**
 * Pulls its child toward the cursor while hovered. Disabled automatically
 * on touch / coarse-pointer devices via CSS-less guard (pointer events still
 * fire, but effect is subtle and resets on leave).
 */
export default function Magnetic({
  children,
  strength = 0.35,
  className,
}: MagneticProps): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY, display: 'inline-block' }}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  );
}
