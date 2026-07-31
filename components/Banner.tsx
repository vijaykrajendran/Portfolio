import Link from '@/components/Link';
import { useRandomColorPair } from '@/lib/hooks/useRandomColorPair';
import { memo } from 'react';
import { RoughNotation } from 'react-rough-notation';
import { AuthorFrontMatter } from 'types/AuthorFrontMatter';
import { TypeAnimation } from 'react-type-animation';

interface BannerProps {
  frontMatter: AuthorFrontMatter;
}

function Banner(props: BannerProps): React.ReactElement {
  const { frontMatter } = props;
  const [aboutColor, contactColor] = useRandomColorPair();

  return (
      <div className='fade-in flex flex-col justify-center items-center px-4 py-8 sm:py-12 dark:text-white lg:px-10'>
        <h1 className='text-3xl sm:text-4xl font-bold dark:text-white lg:text-5xl text-center'>
          Hola, I am{' '}
          <span className='bg-gradient-to-r from-primary-500 to-purple-500 bg-clip-text text-transparent'>
            {frontMatter.shortname}
          </span>
      </h1>
      <div className='my-2 text-lg lg:my-4 lg:text-2xl text-gray-600 dark:text-gray-300 h-8'>
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
          wrapper="span"
          speed={50}
          repeat={Infinity}
          className="font-medium"
        />
      </div>
      <p className='font-light lg:text-xl text-center'>
        Read more
        <Link className='ml-3 mr-3 font-normal text-black dark:text-white btn-press' href='/about'>
          <RoughNotation
            show
            type='highlight'
            animationDelay={250}
            animationDuration={2000}
            color={aboutColor}
          >
            about me
          </RoughNotation>
        </Link>
        or
        <Link className='ml-2 font-normal text-black dark:text-white btn-press' href='/contact'>
          <RoughNotation
            show
            type='highlight'
            animationDelay={250}
            animationDuration={2000}
            color={contactColor}
          >
            contact me
          </RoughNotation>
        </Link>
      </p>

      <p className='my-4 text-lg lg:my-3 lg:text-xl'>
        Checkout my latest
        <Link className='ml-3 mr-3 font-normal text-black dark:text-white btn-press' href='/blog'>
          <RoughNotation
            show
            type='circle'
            animationDelay={250}
            animationDuration={2000}
            color={contactColor}
          >
            blogs
          </RoughNotation>
        </Link>
      </p>
    </div>
  );
}

export default memo(Banner);
