import { motion, useMotionValue, useSpring } from 'framer-motion';
import Lottie from 'lottie-react';
import { useEffect, useRef, useState } from 'react';

interface LottieAstronautProps {
  className?: string;
  /** path to the lottie json in /public */
  src?: string;
}

/**
 * Renders a professional Lottie astronaut animation, wrapped in extra motion:
 * a gentle floating bob, an entrance reveal, and a subtle cursor parallax.
 * Loads the JSON at runtime from /public so the asset can be swapped without
 * a rebuild. Renders nothing until a valid animation is available, so the
 * page never breaks if the file is missing.
 */
export default function LottieAstronaut({
  className,
  src = '/static/lottie/astronaut.json',
}: LottieAstronautProps): React.ReactElement | null {
  const [data, setData] = useState<object | null>(null);
  const [reduced, setReduced] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // cursor parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 120, damping: 18 });
  const py = useSpring(my, { stiffness: 120, damping: 18 });

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    let active = true;
    fetch(src)
      .then(r => (r.ok ? r.json() : null))
      .then(json => {
        // basic validity check: a Lottie has layers + dimensions
        if (active && json && Array.isArray(json.layers) && json.w) {
          setData(json);
        }
      })
      .catch(() => {
        /* file not present yet — render nothing */
      });
    return () => {
      active = false;
    };
  }, [src]);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mx.set(((e.clientX - cx) / rect.width) * 20);
      my.set(((e.clientY - cy) / rect.height) * 20);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [reduced, mx, my]);

  if (!data) return null;

  return (
    <motion.div
      ref={wrapRef}
      className={className}
      style={{ x: reduced ? 0 : px, y: reduced ? 0 : py }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      aria-hidden='true'
    >
      <div className={reduced ? '' : 'lottie-float'}>
        <Lottie
          animationData={data}
          loop
          autoplay={!reduced}
          className='h-48 w-48 sm:h-64 sm:w-64'
        />
      </div>
    </motion.div>
  );
}
