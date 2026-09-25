import { useMemo } from 'react';

interface ParticlesProps {
  count?: number;
}

/**
 * Lightweight floating "stars" rendered with CSS animation.
 * Purely decorative; hidden from assistive tech.
 */
export default function Particles({
  count = 22,
}: ParticlesProps): React.ReactElement {
  const stars = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const size = 2 + Math.random() * 4;
        return {
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          size,
          duration: 6 + Math.random() * 8,
          delay: Math.random() * 8,
          gold: Math.random() > 0.5,
        };
      }),
    [count],
  );

  return (
    <div
      className='pointer-events-none absolute inset-0 z-0 overflow-hidden'
      aria-hidden='true'
    >
      {stars.map(s => (
        <span
          key={s.id}
          className='hero-star'
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: s.gold ? '#e8c988' : '#d4af6a',
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
