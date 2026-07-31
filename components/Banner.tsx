import Link from '@/components/Link';
import { useRandomColorPair } from '@/lib/hooks/useRandomColorPair';
import { memo } from 'react';
import { RoughNotation } from 'react-rough-notation';
import { AuthorFrontMatter } from 'types/AuthorFrontMatter';
import { TypeAnimation } from 'react-type-animation';

interface BannerProps {
  frontMatter: AuthorFrontMatter;
}

// Animated walking character component
function WalkingCharacter() {
  return (
    <div className="walking-character-container">
      <div className="walking-character">
        {/* Speech bubble */}
        <div className="speech-bubble">Hi!</div>
        {/* Character SVG */}
        <svg viewBox="0 0 50 80" className="character-svg">
          {/* Head */}
          <circle cx="25" cy="12" r="10" fill="#FFD93D" stroke="#333" strokeWidth="1.5"/>
          {/* Eyes */}
          <circle cx="22" cy="10" r="2" fill="#333"/>
          <circle cx="28" cy="10" r="2" fill="#333"/>
          {/* Smile */}
          <path d="M20 15 Q25 20 30 15" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
          {/* Body */}
          <rect x="18" y="22" width="14" height="20" rx="3" fill="#6366F1"/>
          {/* Left arm (waving) */}
          <g className="waving-arm">
            <rect x="8" y="24" width="12" height="5" rx="2" fill="#FFD93D" transform="rotate(-45, 18, 26)"/>
            {/* Hand */}
            <circle cx="6" cy="20" r="4" fill="#FFD93D" stroke="#333" strokeWidth="1"/>
          </g>
          {/* Right arm */}
          <rect x="30" y="26" width="10" height="5" rx="2" fill="#FFD93D"/>
          {/* Left leg */}
          <rect x="19" y="42" width="5" height="18" rx="2" fill="#333" className="left-leg"/>
          {/* Right leg */}
          <rect x="26" y="42" width="5" height="18" rx="2" fill="#333" className="right-leg"/>
          {/* Shoes */}
          <ellipse cx="21" cy="62" rx="4" ry="3" fill="#EF4444" className="left-foot"/>
          <ellipse cx="29" cy="62" rx="4" ry="3" fill="#EF4444" className="right-foot"/>
        </svg>
      </div>
    </div>
  );
}

function Banner(props: BannerProps): React.ReactElement {
  const { frontMatter } = props;
  const [aboutColor, contactColor] = useRandomColorPair();

  return (
      <div className='fade-in flex flex-col justify-center items-center px-4 py-8 sm:py-12 dark:text-white lg:px-10'>
        <h1 className='text-3xl sm:text-4xl font-bold dark:text-white lg:text-5xl text-center relative'>
          <span className="relative inline-block">
            <WalkingCharacter />
            Hola
          </span>
          , I am{' '}
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
