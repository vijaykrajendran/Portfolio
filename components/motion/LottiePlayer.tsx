import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { useEffect, useRef, useState } from 'react';

interface LottiePlayerProps {
  /** path to the lottie json in /public */
  src: string;
  className?: string;
  /** tailwind sizing classes for the lottie canvas */
  sizeClass?: string;
  loop?: boolean;
  /** delay (s) before the entrance reveal */
  delay?: number;
  /** add a gentle floating bob */
  float?: boolean;
}

/**
 * Reusable Lottie renderer. Loads the JSON at runtime from /public so assets
 * can be swapped without a rebuild, validates the file, respects
 * prefers-reduced-motion, and renders nothing until a valid animation loads —
 * so the page never breaks if a file is missing.
 */
export default function LottiePlayer({
  src,
  className,
  sizeClass = 'h-40 w-40 sm:h-48 sm:w-48',
  loop = true,
  delay = 0.2,
  float = true,
}: LottiePlayerProps): React.ReactElement | null {
  const [data, setData] = useState<object | null>(null);
  const [reduced, setReduced] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

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

  if (!data) return null;

  return (
    <motion.div
      ref={wrapRef}
      className={className}
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      aria-hidden='true'
    >
      <div className={float && !reduced ? 'lottie-float' : ''}>
        <Lottie
          animationData={data}
          loop={loop}
          autoplay={!reduced}
          className={sizeClass}
        />
      </div>
    </motion.div>
  );
}
