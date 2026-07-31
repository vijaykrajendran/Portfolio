import { memo } from 'react';
import { useInView } from 'react-intersection-observer';

interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  type: 'work' | 'education' | 'achievement';
}

const timelineData: TimelineItem[] = [
  {
    year: 'Present',
    title: 'Sr. DevOps Engineer',
    company: 'SITA',
    description: 'Leading cloud infrastructure, Kubernetes deployments, and CI/CD pipelines for aviation technology.',
    type: 'work',
  },
  {
    year: '2023',
    title: 'DevOps Engineer',
    company: 'Bidgely Technologies',
    description: 'Security enhancements, CI/CD improvements, and migrated Node.js apps from Heroku to AWS.',
    type: 'work',
  },
  {
    year: '2022',
    title: 'MSc DevOps',
    company: 'Atlantic Technological University',
    description: 'Master of Science in DevOps with focus on cloud-native technologies and automation.',
    type: 'education',
  },
  {
    year: '2021',
    title: 'Linux Administrator & Jr. DevOps',
    company: 'Optit Technologies',
    description: 'Open-source solutions, data migrations (P2V, V2V, V2P, V2C), and cost optimization.',
    type: 'work',
  },
];

const typeIcons = {
  work: '💼',
  education: '🎓',
  achievement: '🏆',
};

const typeColors = {
  work: 'from-blue-500 to-purple-500',
  education: 'from-green-500 to-teal-500',
  achievement: 'from-yellow-500 to-orange-500',
};

function TimelineEntry({ item, index }: { item: TimelineItem; index: number }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`
        relative flex items-center w-full
        ${isLeft ? 'justify-start' : 'justify-end'}
        md:justify-center
      `}
    >
      {/* Content Card */}
      <div
        className={`
          w-full md:w-5/12 p-4 sm:p-5
          rounded-xl border border-gray-200 dark:border-gray-700
          bg-white dark:bg-gray-900
          card-hover
          transform transition-all duration-500
          ${inView ? 'opacity-100 translate-x-0' : `opacity-0 ${isLeft ? '-translate-x-8' : 'translate-x-8'}`}
          ${isLeft ? 'md:mr-auto' : 'md:ml-auto'}
        `}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        {/* Year Badge */}
        <div className={`
          inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white mb-3
          bg-gradient-to-r ${typeColors[item.type]}
        `}>
          <span>{typeIcons[item.type]}</span>
          <span>{item.year}</span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
          {item.title}
        </h3>
        <p className="text-sm font-medium text-primary-500 dark:text-primary-400 mb-2">
          {item.company}
        </p>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          {item.description}
        </p>
      </div>

      {/* Timeline Dot - Hidden on mobile, shown on md+ */}
      <div className={`
        hidden md:flex absolute left-1/2 transform -translate-x-1/2
        w-4 h-4 rounded-full bg-gradient-to-r ${typeColors[item.type]}
        border-4 border-white dark:border-gray-900
        shadow-lg z-10
        transition-all duration-500
        ${inView ? 'scale-100' : 'scale-0'}
      `} />
    </div>
  );
}

function Timeline(): React.ReactElement {
  return (
    <section className="py-8 sm:py-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          My Journey
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Career highlights and milestones
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto px-4">
        {/* Vertical Line - Hidden on mobile */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 rounded-full" />

        {/* Timeline Items */}
        <div className="space-y-6 sm:space-y-8">
          {timelineData.map((item, index) => (
            <TimelineEntry key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(Timeline);
