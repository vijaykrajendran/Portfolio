import Link from '@/components/Link';
import { useRandomColorPair } from '@/lib/hooks/useRandomColorPair';
import { memo } from 'react';
import { RoughNotation } from 'react-rough-notation';
import { AuthorFrontMatter } from 'types/AuthorFrontMatter';

interface BannerProps {
  frontMatter: AuthorFrontMatter;
}

function Banner(props: BannerProps): React.ReactElement {
  const { frontMatter } = props;
  const [aboutColor, contactColor] = useRandomColorPair();

  return (
   // <div className='fade-in  flex flex-2 flex-col justify-center px-2 py-6 dark:text-white lg:px-10'>
   // <div className='fade-in flex flex-3 flex-col justify-bottom items-center px-2 py-6 dark:text-white lg:px-10'>
   //   <h1 className='text-3xl font-bold dark:text-white lg:text-5xl'>
   //<div className='fade-in flex items-center justify-center h-screen'>
      <div className='fade-in flex flex-3 flex-col justify-center items-center px-2 py-6 dark:text-white lg:px-10 '>
        <h1 className='text-3xl font-bold dark:text-white lg:text-5xl'>
        Hola, I am {frontMatter.shortname}
      </h1>
      <p className='my-2 text-lg lg:my-4 lg:text-2xl'>
        {frontMatter.occupation}
      </p>
      <p className='font-light lg:text-xl'>
        Read more
        <Link className='ml-4 mr-4 font-normal text-black' href='/about'>
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
        <Link className='ml-2 font-normal text-black' href='/contact'>
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

      <p className='my-3 text-lg lg:my-2 lg:text-1xl'>
        Checkout my latest
        <Link className='ml-4 mr-4 font-normal text-red' href='/blog'>
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
  //</div>
  );
}

export default memo(Banner);
