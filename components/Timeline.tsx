import Reveal from '@/components/motion/Reveal';
import LottiePlayer from '@/components/motion/LottiePlayer';
import { motion } from 'framer-motion';
import { memo } from 'react';

interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  type: 'work' | 'education';
  tags: string[];
}

const timelineData: TimelineItem[] = [
  {
    year: 'Present',
    title: 'Sr. DevOps Engineer',
    company: 'SITA',
    description:
      'Leading cloud infrastructure, Kubernetes deployments, and CI/CD pipelines for aviation technology.',
    type: 'work',
    tags: ['Kubernetes', 'AWS', 'CI/CD', 'Terraform'],
  },
  {
    year: '2023',
    title: 'DevOps Engineer',
    company: 'Bidgely Technologies',
    description:
      'Security enhancements, CI/CD improvements, and migrated Node.js apps from Heroku to AWS.',
    type: 'work',
    tags: ['AWS', 'Node.js', 'Security', 'CI/CD'],
  },
  {
    year: '2022',
    title: 'MSc DevOps',
    company: 'Atlantic Technological University',
    description:
      'Master of Science in DevOps with a focus on cloud-native technologies and automation.',
    type: 'education',
    tags: ['Cloud-Native', 'Automation'],
  },
  {
    year: '2021',
    title: 'Linux Administrator & Jr. DevOps',
    company: 'Optit Technologies',
    description:
      'Open-source solutions, data migrations (P2V, V2V, V2P, V2C), and cost optimization.',
    type: 'work',
    tags: ['Linux', 'Migrations', 'Open Source'],
  },
];

function TimelineEntry({
  item,
  index,
}: {
  item: TimelineItem;
  index: number;
}): React.ReactElement {
  return (
    <div className='relative pl-10 pb-10'>
      {/* Animated dot */}
      <motion.span
        className='absolute left-[11px] top-1.5 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-term-bg bg-term-green'
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.4, delay: index * 0.08 }}
        style={{ boxShadow: '0 0 12px rgba(45,212,191,0.7)' }}
      />
      <Reveal direction='right' delay={index * 0.08}>
        <div className='motion-card p-5'>
          <div className='mb-2 flex flex-wrap items-center gap-x-3 gap-y-1'>
            <span className='rounded-full bg-term-green/15 px-2.5 py-0.5 font-mono text-xs font-semibold text-term-green'>
              {item.year}
            </span>
            <span className='text-xs uppercase tracking-wide text-term-dim'>
              {item.type}
            </span>
          </div>
          <h3 className='text-lg font-bold text-term-text'>
            {item.title}{' '}
            <span className='text-term-green'>· {item.company}</span>
          </h3>
          <p className='mt-1 text-sm leading-relaxed text-term-dim'>
            {item.description}
          </p>
          <div className='mt-3 flex flex-wrap gap-2'>
            {item.tags.map(tag => (
              <span
                key={tag}
                className='rounded-md border border-term-border bg-term-panel px-2 py-0.5 font-mono text-[0.7rem] text-term-dim'
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function Timeline(): React.ReactElement {
  return (
    <section className='mx-auto mt-20 max-w-3xl px-2'>
      <Reveal className='mb-10 text-center'>
        <div className='mb-2 flex justify-center'>
          <LottiePlayer
            src='/static/lottie/server-data.json'
            sizeClass='h-28 w-28 sm:h-36 sm:w-36'
          />
        </div>
        <h2 className='text-2xl font-bold text-term-text sm:text-3xl'>
          My Journey
        </h2>
        <p className='mt-2 text-sm text-term-dim'>
          Career highlights and milestones.
        </p>
      </Reveal>

      <div className='relative'>
        {/* Vertical line */}
        <div className='absolute left-[11px] top-0 h-full w-0.5 bg-gradient-to-b from-term-green via-term-cyan to-term-purple opacity-40' />
        {timelineData.map((item, index) => (
          <TimelineEntry key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}

export default memo(Timeline);
