import { Header } from '@/components/Form';
import Link from '@/components/Link';
import StackList from '@/components/list/StackList';
import Reveal from '@/components/motion/Reveal';
import { PageSEO } from '@/components/SEO';
import siteMetadata from '@/data/siteMetadata';
import config from 'config';

const { projects } = config;

export default function Projects(): React.ReactElement {
  const hasProjects = projects.length > 0;

  return (
    <>
      <PageSEO
        title={`Projects - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <div className='fade-in divide-y-2 divide-term-border/60'>
        <Header title='Projects' />
        <div className='container py-12'>
          {hasProjects ? (
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
              {projects.map((project, i) => (
                <Reveal key={project.slug} delay={i * 0.1}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className='motion-card group flex h-full flex-col p-6 no-underline'
                  >
                    <h3 className='text-lg font-bold text-term-text group-hover:text-term-green'>
                      {project.title}
                    </h3>
                    <p className='mt-2 flex-1 text-sm text-term-dim'>
                      {project.shortDescription || project.description}
                    </p>
                    <div className='mt-4'>
                      <StackList stack={project.stack} />
                    </div>
                    <span className='mt-2 font-mono text-xs text-term-green'>
                      view project →
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center py-16 text-center'>
              <h3 className='mb-2 text-xl font-semibold text-term-text'>
                Projects Coming Soon
              </h3>
              <p className='max-w-md text-term-dim'>
                I&apos;m working on some exciting projects. Check back soon to
                see what I&apos;ve been building!
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
