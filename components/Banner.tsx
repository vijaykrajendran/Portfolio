import Link from '@/components/Link';
import { memo } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { AuthorFrontMatter } from 'types/AuthorFrontMatter';

interface BannerProps {
  frontMatter: AuthorFrontMatter;
}

function Prompt() {
  return (
    <>
      <span className='term-prompt-user'>vijay@portfolio</span>
      <span className='text-term-text'>:</span>
      <span className='term-prompt-path'>~</span>
      <span className='text-term-text'>$ </span>
    </>
  );
}

function Banner(props: BannerProps): React.ReactElement {
  const { frontMatter } = props;

  return (
    <div className='fade-in mx-auto max-w-2xl font-mono text-sm leading-7 sm:text-base'>
      {/* whoami */}
      <p>
        <Prompt />
        <span className='text-term-cyan'>whoami</span>
      </p>
      <p className='text-term-text'>
        Hola, I am{' '}
        <span className='font-bold text-term-green'>
          {frontMatter.shortname || frontMatter.name}
        </span>
      </p>

      {/* role --list */}
      <p className='mt-3'>
        <Prompt />
        <span className='text-term-cyan'>cat</span>{' '}
        <span className='text-term-amber'>role.txt</span>
      </p>
      <p className='text-term-text'>
        <span className='text-term-purple'>&gt;</span>{' '}
        <TypeAnimation
          sequence={[
            'Sr. DevOps Engineer',
            2000,
            'Kubernetes Expert',
            2000,
            'Cloud Architect',
            2000,
            'KubeAstronaut 🚀',
            2000,
            'CI/CD Specialist',
            2000,
          ]}
          wrapper='span'
          speed={50}
          repeat={Infinity}
          className='text-term-green'
        />
      </p>

      {/* links */}
      <p className='mt-3'>
        <Prompt />
        <span className='text-term-cyan'>ls</span>{' '}
        <span className='text-term-dim'>./links</span>
      </p>
      <div className='mt-1 flex flex-wrap gap-x-4 gap-y-1 text-term-text'>
        <Link href='/about' className='term-navlink'>
          <span className='text-term-blue'>▸</span> about-me
        </Link>
        <Link href='/contact' className='term-navlink'>
          <span className='text-term-blue'>▸</span> contact-me
        </Link>
        <Link href='/blog' className='term-navlink'>
          <span className='text-term-blue'>▸</span> latest-blogs
        </Link>
        <Link href='/projects' className='term-navlink'>
          <span className='text-term-blue'>▸</span> projects
        </Link>
      </div>

      {/* blinking prompt */}
      <p className='mt-4'>
        <Prompt />
        <span className='term-cursor' />
      </p>
    </div>
  );
}

export default memo(Banner);
