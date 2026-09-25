import { motion, useScroll, useSpring } from 'framer-motion';

/** Fixed gradient progress bar tied to page scroll. */
export default function ScrollProgress(): React.ReactElement {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className='fixed left-0 top-0 z-[60] h-1 w-full origin-left'
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #d4af6a, #e8c988 50%, #6366f1)',
      }}
      aria-hidden='true'
    />
  );
}
