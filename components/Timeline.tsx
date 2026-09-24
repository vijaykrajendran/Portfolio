import { memo } from 'react';
import { useInView } from 'react-intersection-observer';

interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  type: 'work' | 'education';
}

const timelineData: TimelineItem[] = [
  {
    year: 'Present',
    title: 'Sr. DevOps Engineer',
    company: 'SITA',
    description:
      'Leading cloud infrastructure, Kubernetes deployments, and CI/CD pipelines for aviation technology.',
    type: 'work',
  },
  {
    year: '2023',
    title: 'DevOps Engineer',
    company: 'Bidgely Technologies',
    description:
      'Security enhancements, CI/CD improvements, and migrated Node.js apps from Heroku to AWS.',
    type: 'work',
  },
  {
    year: '2022',
    title: 'MSc DevOps',
    company: 'Atlantic Technological University',
    description:
      'Master of Science in DevOps with focus on cloud-native technologies and automation.',
    type: 'education',
  },
  {
    year: '2021',
    title: 'Linux Administrator & Jr. DevOps',
    company: 'Optit Technologies',
    description:
      'Open-source solutions, data migrations (P2V, V2V, V2P, V2C), and cost optimization.',
    type: 'work',
  },
];

function shortHash(index: number): string {
  // deterministic pseudo hash for a git-log look
  return ['a1f3c9d', '7e2b04a', 'c58d1f2', '9b3e7a6'][index] || '0000000';
}

function TimelineEntry({ item, index }: { item: TimelineItem; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`relative pl-6 transition-all duration-500 ${
        inView ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* commit dot on the line */}
      <span className='absolute left-[-5px] top-1.5 h-2.5 w-2.5 rounded-full border border-term-bg bg-term-green' />

      <p className='text-xs'>
        <span className='text-term-amber'>commit {shortHash(index)}</span>{' '}
        <span className='text-term-dim'>
          ({item.type === 'education' ? 'edu' : 'work'})
        </span>
      </p>
      <p className='text-sm font-bold text-term-text'>
        {item.title} <span className='text-term-cyan'>@ {item.company}</span>
      </p>
      <p className='text-xs text-term-dim'>Date: {item.year}</p>
      <p className='mt-1 mb-4 text-xs leading-6 text-term-text'>
        {item.description}
      </p>
    </div>
  );
}

function Timeline(): React.ReactElement {
  return (
    <section className='mx-auto mt-10 max-w-2xl font-mono'>
      <p className='text-sm text-term-dim'>
        <span className='term-prompt-user'>vijay@portfolio</span>
        <span>:</span>
        <span className='term-prompt-path'>~</span>
        <span>$ </span>
        <span className='text-term-cyan'>git</span> log --oneline --career
      </p>
      <div className='relative mt-4 border-l border-term-border pl-2'>
        {timelineData.map((item, index) => (
          <TimelineEntry key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}

export default memo(Timeline);
