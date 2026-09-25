import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Branded intro splash. Plays once per browser session (sessionStorage),
 * and is skipped entirely for users who prefer reduced motion.
 */
export default function IntroSplash(): React.ReactElement | null {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const seen = sessionStorage.getItem('introSeen');
    if (reduced || seen) return;

    setShow(true);
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem('introSeen', '1');
      document.body.style.overflow = '';
    }, 2200);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className='fixed inset-0 z-[100] flex items-center justify-center bg-term-bg'
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* pulsing glow */}
          <motion.div
            className='absolute h-64 w-64 rounded-full'
            style={{
              background:
                'radial-gradient(circle, rgba(212,175,106,0.5), transparent 65%)',
              filter: 'blur(40px)',
            }}
            initial={{ scale: 0.6, opacity: 0.3 }}
            animate={{ scale: [0.6, 1.2, 0.9], opacity: [0.3, 0.7, 0.4] }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
          />

          <div className='relative text-center'>
            <motion.div
              className='mx-auto mb-4 h-14 w-14 rounded-full border-2 border-term-red border-t-term-amber'
              animate={{ rotate: 360 }}
              transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
            />
            <motion.p
              className='font-mono text-lg font-bold tracking-widest'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <span className='gradient-text'>~/vijay</span>
            </motion.p>
            <motion.p
              className='mt-2 font-mono text-xs text-term-dim'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              initializing portfolio<span className='animate-pulse'>_</span>
            </motion.p>
          </div>

          {/* wipe reveal */}
          <motion.div
            className='absolute inset-x-0 bottom-0 origin-bottom bg-gradient-to-t from-term-red/20 to-transparent'
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            style={{ height: '100%' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
