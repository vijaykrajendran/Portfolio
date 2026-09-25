import Counter from '@/components/motion/Counter';
import Reveal from '@/components/motion/Reveal';
import LottiePlayer from '@/components/motion/LottiePlayer';
import { memo } from 'react';

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: 25, suffix: ' TB', label: 'Data migrated to AWS' },
  { value: 5, suffix: '', label: 'Kubernetes certifications' },
  { value: 4, suffix: '+', label: 'Years in DevOps' },
  { value: 99.9, suffix: '%', label: 'Uptime maintained' },
];

function Stats(): React.ReactElement {
  return (
    <section className='mx-auto mt-16 max-w-4xl px-2'>
      <div className='mb-4 flex justify-center'>
        <LottiePlayer
          src='/static/lottie/cloud-server.json'
          sizeClass='h-28 w-28 sm:h-32 sm:w-32'
        />
      </div>
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6'>
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.1}>
            <div className='motion-card px-4 py-6 text-center'>
              <div className='text-3xl font-extrabold text-term-green sm:text-4xl'>
                <Counter
                  to={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.value % 1 !== 0 ? 1 : 0}
                />
              </div>
              <p className='mt-2 text-xs text-term-dim sm:text-sm'>
                {stat.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default memo(Stats);
