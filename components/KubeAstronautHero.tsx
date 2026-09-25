import Image from 'next/image';
import Link from '@/components/Link';
import Reveal from '@/components/motion/Reveal';
import Tilt from '@/components/motion/Tilt';
import Counter from '@/components/motion/Counter';
import { motion } from 'framer-motion';
import { memo, useRef } from 'react';

interface KubeAstronautHeroProps {
  badge: string;
  credentialUrl: string;
  awardDate: string;
  certifications: string[];
}

// Fixed sparkle positions around the badge (percent within badge box)
const sparkles = [
  { top: '4%', left: '12%', delay: '0s' },
  { top: '10%', left: '82%', delay: '0.6s' },
  { top: '46%', left: '-4%', delay: '1.1s' },
  { top: '70%', left: '90%', delay: '0.3s' },
  { top: '86%', left: '20%', delay: '1.5s' },
  { top: '30%', left: '96%', delay: '0.9s' },
];

function KubeAstronautHero({
  badge,
  credentialUrl,
  awardDate,
  certifications,
}: KubeAstronautHeroProps): React.ReactElement {
  const formattedDate = new Date(awardDate).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const cardRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <section className='mx-auto mt-20 max-w-4xl px-2'>
      <Reveal>
        <Tilt max={6} className='badge-shine astro-card relative p-6 sm:p-10'>
          {/* Cursor-following card spotlight */}
          <div
            ref={cardRef}
            className='card-spotlight'
            onMouseMove={onMove}
            aria-hidden='true'
          />

          <div className='relative z-10 flex flex-col items-center gap-8 text-center sm:flex-row sm:text-left'>
            {/* Badge with spotlight, sonar, sparkles, orbit */}
            <div className='relative shrink-0'>
              {/* Spotlight beam + light pool */}
              <span className='astro-spotlight' aria-hidden='true' />
              <span className='astro-lightpool' aria-hidden='true' />

              {/* Sonar pulse rings */}
              <span className='sonar-ring' aria-hidden='true' />
              <span className='sonar-ring d1' aria-hidden='true' />
              <span className='sonar-ring d2' aria-hidden='true' />

              {/* Sparkles */}
              {sparkles.map((s, i) => (
                <span
                  key={i}
                  className='sparkle'
                  style={{ top: s.top, left: s.left, animationDelay: s.delay }}
                  aria-hidden='true'
                />
              ))}

              <div className='orbit-wrap'>
                <div className='orbit-ring' aria-hidden='true'>
                  <span className='orbit-dot' />
                </div>
                <div className='orbit-ring reverse' aria-hidden='true'>
                  <span
                    className='orbit-dot'
                    style={{
                      background: '#6366f1',
                      boxShadow: '0 0 10px 2px rgba(99,102,241,0.8)',
                    }}
                  />
                </div>
                <div className='astro-float relative flex h-32 w-32 items-center justify-center sm:h-40 sm:w-40'>
                  <span className='astro-glow' aria-hidden='true' />
                  <Image
                    src={badge}
                    alt='KubeAstronaut badge'
                    width={150}
                    height={150}
                    className='relative z-10 object-contain drop-shadow-2xl'
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className='relative z-10 flex-1'>
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className='inline-flex items-center gap-1.5 rounded-full border border-term-amber/40 bg-term-amber/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-term-amber'
              >
                ⭐ CNCF Elite Achievement
              </motion.span>

              <h2 className='mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl'>
                <span className='shimmer-text'>KubeAstronaut</span>
              </h2>

              <p className='mt-2 text-sm text-term-dim sm:text-base'>
                Earned{' '}
                <span className='font-bold text-term-amber'>
                  all <Counter to={certifications.length} duration={1.2} />
                </span>{' '}
                Kubernetes certifications — a rare, elite CNCF distinction.
              </p>

              {/* Cert pills — light up in sequence */}
              <div className='mt-4 flex flex-wrap justify-center gap-2 sm:justify-start'>
                {certifications.map((cert, i) => (
                  <motion.span
                    key={cert}
                    initial={{
                      opacity: 0,
                      y: 10,
                      boxShadow: '0 0 0 rgba(212,175,106,0)',
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      boxShadow: [
                        '0 0 0 rgba(212,175,106,0)',
                        '0 0 14px rgba(212,175,106,0.7)',
                        '0 0 0 rgba(212,175,106,0)',
                      ],
                    }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.3 + i * 0.18,
                      duration: 0.7,
                    }}
                    className='inline-flex items-center gap-1 rounded-md border border-term-red/40 bg-term-red/10 px-2.5 py-1 font-mono text-xs font-semibold text-term-text'
                  >
                    <span className='text-term-red'>✦</span> {cert}
                  </motion.span>
                ))}
              </div>

              {/* Footer */}
              <div className='mt-6 flex flex-col items-center gap-3 sm:flex-row sm:gap-4'>
                {credentialUrl && (
                  <Link
                    href={credentialUrl}
                    className='btn-solid inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold'
                  >
                    🛡️ Verify credential
                  </Link>
                )}
                <span className='text-xs text-term-dim'>
                  Awarded{' '}
                  <span className='text-term-text'>{formattedDate}</span>
                </span>
              </div>
            </div>
          </div>
        </Tilt>
      </Reveal>
    </section>
  );
}

export default memo(KubeAstronautHero);
