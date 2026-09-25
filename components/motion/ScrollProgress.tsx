import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from 'framer-motion';
import { useState } from 'react';

interface ScrollProgressProps {
  /** show a small live percentage badge (useful on long articles) */
  showPercent?: boolean;
}

/** Fixed gradient progress bar tied to page scroll. */
export default function ScrollProgress({
  showPercent = false,
}: ScrollProgressProps): React.ReactElement {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const [percent, setPercent] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', latest => {
    if (showPercent) setPercent(Math.round(latest * 100));
  });

  return (
    <>
      <motion.div
        className='fixed left-0 top-0 z-[60] h-1 w-full origin-left'
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #d4af6a, #e8c988 50%, #6366f1)',
        }}
        aria-hidden='true'
      />
      {showPercent && (
        <div
          className='fixed right-3 top-3 z-[60] rounded-full border border-term-border/60 bg-term-bg/80 px-2 py-0.5 font-mono text-xs text-term-green backdrop-blur-md'
          aria-hidden='true'
        >
          {percent}%
        </div>
      )}
    </>
  );
}
