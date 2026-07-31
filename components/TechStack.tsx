import { memo } from 'react';
import { useInView } from 'react-intersection-observer';

interface TechItem {
  name: string;
  icon: string;
  color: string;
}

const techStack: TechItem[] = [
  { name: 'Kubernetes', icon: '☸️', color: 'from-blue-500 to-blue-600' },
  { name: 'Docker', icon: '🐳', color: 'from-cyan-500 to-blue-500' },
  { name: 'AWS', icon: '☁️', color: 'from-orange-400 to-orange-500' },
  { name: 'Terraform', icon: '🏗️', color: 'from-purple-500 to-purple-600' },
  { name: 'Jenkins', icon: '🔧', color: 'from-red-500 to-red-600' },
  { name: 'GitHub Actions', icon: '⚡', color: 'from-gray-600 to-gray-700' },
  { name: 'Prometheus', icon: '📊', color: 'from-orange-500 to-red-500' },
  { name: 'Grafana', icon: '📈', color: 'from-orange-400 to-yellow-500' },
  { name: 'ArgoCD', icon: '🔄', color: 'from-orange-500 to-orange-600' },
  { name: 'Helm', icon: '⛵', color: 'from-blue-400 to-blue-500' },
  { name: 'Linux', icon: '🐧', color: 'from-yellow-500 to-yellow-600' },
  { name: 'Python', icon: '🐍', color: 'from-green-500 to-blue-500' },
];

function TechStack(): React.ReactElement {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className="py-6 sm:py-8">
      <h3 className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 mb-4 sm:mb-6">
        Technologies I work with
      </h3>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-2xl mx-auto px-4">
        {techStack.map((tech, index) => (
          <div
            key={tech.name}
            className={`
              group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 
              rounded-full bg-gradient-to-r ${tech.color}
              text-white text-xs sm:text-sm font-medium
              transform transition-all duration-300
              hover:scale-105 hover:shadow-lg
              ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
            style={{
              transitionDelay: inView ? `${index * 50}ms` : '0ms',
            }}
          >
            <span className="text-sm sm:text-base">{tech.icon}</span>
            <span>{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(TechStack);
