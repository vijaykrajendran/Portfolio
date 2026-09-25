import Reveal from '@/components/motion/Reveal';
import LottiePlayer from '@/components/motion/LottiePlayer';
import { motion } from 'framer-motion';
import { memo } from 'react';

interface TechItem {
  name: string;
  icon: string;
}

const techStack: TechItem[] = [
  { name: 'Kubernetes', icon: '☸️' },
  { name: 'Docker', icon: '🐳' },
  { name: 'AWS', icon: '☁️' },
  { name: 'Terraform', icon: '🏗️' },
  { name: 'Jenkins', icon: '🔧' },
  { name: 'GitHub Actions', icon: '⚡' },
  { name: 'Prometheus', icon: '📊' },
  { name: 'Grafana', icon: '📈' },
  { name: 'ArgoCD', icon: '🔄' },
  { name: 'Helm', icon: '⛵' },
  { name: 'Linux', icon: '🐧' },
  { name: 'Python', icon: '🐍' },
];

function TechStack(): React.ReactElement {
  return (
    <section className='mx-auto mt-20 max-w-3xl px-2 text-center'>
      <Reveal>
        <div className='mb-2 flex justify-center'>
          <LottiePlayer
            src='/static/lottie/coding.json'
            sizeClass='h-32 w-32 sm:h-40 sm:w-40'
          />
        </div>
        <h2 className='text-2xl font-bold text-term-text sm:text-3xl'>
          Tech I work with
        </h2>
        <p className='mt-2 text-sm text-term-dim'>
          The cloud-native toolkit I use to ship and scale.
        </p>
      </Reveal>

      <motion.div
        className='mt-8 flex flex-wrap justify-center gap-3'
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.05 } },
        }}
      >
        {techStack.map(tech => (
          <motion.span
            key={tech.name}
            className='motion-chip flex cursor-default items-center gap-2 px-4 py-2 text-sm font-medium'
            variants={{
              hidden: { opacity: 0, y: 16, scale: 0.9 },
              show: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            <span>{tech.icon}</span>
            {tech.name}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}

export default memo(TechStack);
