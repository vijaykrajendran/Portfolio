import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/** Floating scroll-to-top button that appears after scrolling down. */
export default function ScrollToTop(): React.ReactElement {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toTop = () =>
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    });

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type='button'
          aria-label='Scroll to top'
          onClick={toTop}
          initial={{ opacity: 0, scale: 0.6, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 10 }}
          transition={{ duration: 0.2 }}
          className='fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-term-border bg-term-bg/80 text-term-green backdrop-blur-md transition-colors hover:border-term-green hover:text-term-cyan'
        >
          <span className='text-lg leading-none'>↑</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
