import { memo } from 'react';
import { useInView } from 'react-intersection-observer';

const techStack: string[] = [
  'kubernetes',
  'docker',
  'aws',
  'terraform',
  'jenkins',
  'github-actions',
  'prometheus',
  'grafana',
  'argocd',
  'helm',
  'linux',
  'python',
];

function TechStack(): React.ReactElement {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div ref={ref} className='mx-auto mt-8 max-w-2xl font-mono text-sm'>
      <p className='text-term-dim'>
        <span className='term-prompt-user'>vijay@portfolio</span>
        <span>:</span>
        <span className='term-prompt-path'>~</span>
        <span>$ </span>
        <span className='text-term-cyan'>kubectl</span> get stack
      </p>
      <div className='mt-3 flex flex-wrap gap-2'>
        {techStack.map((tech, index) => (
          <span
            key={tech}
            className={`term-chip px-2.5 py-1 text-xs transition-all duration-300 ${
              inView ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
            }`}
            style={{ transitionDelay: inView ? `${index * 40}ms` : '0ms' }}
          >
            <span className='text-term-green'>●</span> {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export default memo(TechStack);
