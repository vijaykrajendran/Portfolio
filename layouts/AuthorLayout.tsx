import { Header } from '@/components/Form';
import Link from '@/components/Link';
import SocialIcons from '@/components/SocialIcons';
import StackList from '@/components/list/StackList';
import Reveal from '@/components/motion/Reveal';
import { PageSEO } from '@/components/SEO';
import { WorkStack } from 'config/stack';
import Image from 'next/image';
import { ReactNode } from 'react';
import { AuthorFrontMatter } from 'types/AuthorFrontMatter';

interface Props {
  children: ReactNode;
  frontMatter: AuthorFrontMatter;
}

export default function AuthorLayout({ children, frontMatter }: Props) {
  const { name, avatar, occupation, company, resume } = frontMatter;

  return (
    <>
      <PageSEO title={`About - ${name}`} description={`About me - ${name}`} />
      <div className='fade-in divide-y-2 divide-term-border/60'>
        <Header title='About' />
        <div className='items-start space-y-8 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0'>
          {/* Profile card */}
          <Reveal>
            <div className='motion-card flex flex-col items-center p-6 pt-8 text-center xl:sticky xl:top-24'>
              <div className='astro-float'>
                <Image
                  src={avatar}
                  alt={name}
                  width={176}
                  height={176}
                  className='h-44 w-44 rounded-full object-cover ring-2 ring-term-green/40'
                />
              </div>
              <h3 className='pt-4 text-2xl font-bold tracking-tight text-term-text'>
                {name}
              </h3>
              <div className='mt-1 font-mono text-sm text-term-green'>
                {occupation}
              </div>
              <div className='text-sm text-term-dim'>{company}</div>

              <div className='mt-4'>
                <SocialIcons className='justify-center' />
              </div>

              {resume && (
                <Link
                  href={resume}
                  className='btn-solid mt-6 inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold'
                >
                  📄 Resume
                </Link>
              )}
            </div>
          </Reveal>

          {/* Bio + skills */}
          <div className='xl:col-span-2'>
            <Reveal delay={0.1}>
              <div className='prose max-w-none pt-2 pb-8 dark:prose-dark'>
                {children}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <h2 className='mb-4 mt-4 text-2xl font-bold text-term-text'>
                <span className='font-mono text-term-green'>$</span> Skills
              </h2>
              <StackList stack={WorkStack} />
            </Reveal>
          </div>
        </div>
      </div>
    </>
  );
}
