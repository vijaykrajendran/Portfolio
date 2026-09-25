import Link from '@/components/Link';
import Particles from '@/components/motion/Particles';
import Magnetic from '@/components/motion/Magnetic';
import LottieAstronaut from '@/components/motion/LottieAstronaut';
import LottiePlayer from '@/components/motion/LottiePlayer';
import { motion, useScroll, useTransform } from 'framer-motion';
import { memo, useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { AuthorFrontMatter } from 'types/AuthorFrontMatter';

interface BannerProps {
  frontMatter: AuthorFrontMatter;
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function Banner(props: BannerProps): React.ReactElement {
  const { frontMatter } = props;
  const name = frontMatter.shortname || frontMatter.name || 'Vijay Rajendran';

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className='relative -mx-4 flex min-h-[82vh] items-center justify-center overflow-hidden px-4 sm:-mx-6 sm:px-6'
    >
      {/* Aurora background */}
      <div className='aurora-bg'>
        <div className='aurora-blob' />
      </div>
      <div className='aurora-grid' />
      <Particles count={26} />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        variants={container}
        initial='hidden'
        animate='show'
        className='relative z-10 mx-auto max-w-3xl text-center'
      >
        <motion.div variants={item} className='mb-2 flex justify-center'>
          <LottieAstronaut />
        </motion.div>

        <motion.p
          variants={item}
          className='mb-4 font-mono text-sm text-term-green sm:text-base'
        >
          $ whoami
        </motion.p>

        <motion.h1
          variants={item}
          className='text-4xl font-extrabold leading-tight tracking-tight text-term-text sm:text-6xl lg:text-7xl'
        >
          <span className='gradient-text'>{name}</span>
          <span className='ml-2 inline-flex translate-y-1 align-middle'>
            <LottiePlayer
              src='/static/lottie/hello.json'
              sizeClass='h-20 w-20 sm:h-28 sm:w-28 lg:h-32 lg:w-32'
              float={false}
              delay={0.4}
            />
          </span>
        </motion.h1>

        <motion.div
          variants={item}
          className='mt-4 h-8 font-mono text-lg text-term-dim sm:text-2xl'
        >
          <span className='text-term-green'>&gt;</span>{' '}
          <TypeAnimation
            sequence={[
              'Sr. DevOps Engineer',
              2000,
              'Kubernetes Expert ☸️',
              2000,
              'Cloud Architect ☁️',
              2000,
              'KubeAstronaut 🚀',
              2000,
              'CI/CD Specialist',
              2000,
            ]}
            wrapper='span'
            speed={50}
            repeat={Infinity}
            className='text-term-text'
          />
        </motion.div>

        <motion.p
          variants={item}
          className='mx-auto mt-6 max-w-xl text-base leading-relaxed text-term-dim sm:text-lg'
        >
          I build and scale resilient cloud infrastructure — Kubernetes, CI/CD,
          and automation that ships fast and stays up.
        </motion.p>

        <motion.div
          variants={item}
          className='mt-8 flex flex-wrap items-center justify-center gap-4'
        >
          <Magnetic>
            <Link
              href='/projects'
              className='btn-solid inline-block px-6 py-2.5 text-sm font-semibold'
            >
              View Work
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href='/contact'
              className='btn-glow inline-block px-6 py-2.5 text-sm font-semibold'
            >
              Get in touch
            </Link>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* Inviting scroll cue */}
      <motion.a
        href='#explore'
        className='scroll-cue absolute bottom-6 left-1/2 -translate-x-1/2 hover:text-term-red'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        aria-label='Scroll to explore'
      >
        <span className='scroll-cue-text'>Scroll to explore</span>
        <span className='scroll-mouse'>
          <span className='scroll-wheel' />
        </span>
        <motion.span
          className='text-lg leading-none'
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          ⌄
        </motion.span>
      </motion.a>
    </section>
  );
}

export default memo(Banner);
