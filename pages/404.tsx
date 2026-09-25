import Link from '@/components/Link';
import LottiePlayer from '@/components/motion/LottiePlayer';

export default function FourZeroFour(): React.ReactElement {
  return (
    <section className='fade-in mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 text-center'>
      {/* Lost astronaut, drifting in space */}
      <div className='mb-2'>
        <LottiePlayer
          src='/static/lottie/astronaut.json'
          sizeClass='h-44 w-44 sm:h-56 sm:w-56'
        />
      </div>

      {/* Terminal-style error line */}
      <p className='font-mono text-sm text-term-green sm:text-base'>
        $ cd /page
      </p>
      <p className='mt-1 font-mono text-sm text-term-red sm:text-base'>
        bash: cd: /page: No such file or directory
      </p>

      <h1 className='mt-6 text-6xl font-extrabold tracking-tight sm:text-8xl'>
        <span className='gradient-text'>404</span>
      </h1>

      <p className='mt-4 text-lg font-semibold text-term-text sm:text-xl'>
        Houston, we&apos;ve lost this page.
      </p>
      <p className='mt-2 max-w-md text-sm text-term-dim sm:text-base'>
        The route drifted off into deep space. Let&apos;s get you back to
        mission control.
      </p>

      <div className='mt-8 flex flex-wrap items-center justify-center gap-4'>
        <Link
          href='/'
          className='btn-solid inline-block px-6 py-2.5 text-sm font-semibold'
        >
          🏠 Back to homepage
        </Link>
        <Link
          href='/projects'
          className='btn-glow inline-block px-6 py-2.5 text-sm font-semibold'
        >
          View my work
        </Link>
      </div>
    </section>
  );
}
