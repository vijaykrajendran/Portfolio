import { memo } from 'react';

const items = [
  'Kubernetes',
  'Docker',
  'AWS',
  'Terraform',
  'Jenkins',
  'GitHub Actions',
  'Prometheus',
  'Grafana',
  'ArgoCD',
  'Helm',
  'Linux',
  'Python',
  'CI/CD',
  'GitOps',
  'Observability',
  'Cloud Native',
];

function Row({ reverse = false }: { reverse?: boolean }) {
  return (
    <div
      className={`marquee-track flex shrink-0 items-center gap-8 pr-8 ${
        reverse ? 'marquee-reverse' : ''
      }`}
    >
      {items.map((item, i) => (
        <span
          key={`${item}-${i}`}
          className='flex items-center gap-8 whitespace-nowrap font-mono text-lg font-semibold text-term-dim sm:text-2xl'
        >
          {item}
          <span className='text-term-red'>✦</span>
        </span>
      ))}
    </div>
  );
}

function Marquee(): React.ReactElement {
  return (
    <section
      className='marquee relative mt-20 overflow-hidden border-y border-term-border/60 py-5'
      aria-hidden='true'
    >
      <div className='marquee-inner flex w-max'>
        <Row />
        <Row />
      </div>
      {/* fade edges */}
      <div className='pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-term-bg to-transparent' />
      <div className='pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-term-bg to-transparent' />
    </section>
  );
}

export default memo(Marquee);
