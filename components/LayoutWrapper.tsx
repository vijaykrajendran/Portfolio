import headerNavLinks from '@/data/headerNavLinks';
import Spotlight from '@/components/motion/Spotlight';
import ScrollProgress from '@/components/motion/ScrollProgress';
import IntroSplash from '@/components/motion/IntroSplash';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import Footer from './Footer';
import Link from './Link';
import MobileNav from './MobileNav';
import SectionContainer from './SectionContainer';
import ThemeSwitch from './ThemeSwitch';

interface Props {
  children: ReactNode;
}

const LayoutWrapper = ({ children }: Props) => {
  const router = useRouter();

  const isActive = (href: string) =>
    href === '/' ? router.pathname === '/' : router.pathname.startsWith(href);

  return (
    <>
      <IntroSplash />
      <ScrollProgress />
      <Spotlight />
      <SectionContainer>
        <div className='flex min-h-dvh flex-col justify-between'>
          <header className='sticky top-0 z-20 -mx-4 mb-4 border-b border-term-border/60 bg-term-bg/70 px-4 py-4 backdrop-blur-md sm:-mx-6 sm:px-6'>
            <div className='flex items-center justify-between'>
              <Link
                href='/'
                className='font-mono text-sm font-bold text-term-text'
              >
                <span className='text-term-green'>~/</span>vijay
              </Link>
              <div className='flex items-center'>
                <nav className='hidden items-center gap-6 text-sm font-medium sm:flex'>
                  {headerNavLinks.map(link => (
                    <Link
                      key={link.title}
                      href={link.href}
                      className={`nav-link ${isActive(link.href) ? 'active' : ''}`}
                    >
                      {link.title}
                    </Link>
                  ))}
                </nav>
                <ThemeSwitch />
                <MobileNav />
              </div>
            </div>
          </header>
          <main className='relative z-10 mb-auto'>{children}</main>
          <Footer />
        </div>
      </SectionContainer>
    </>
  );
};

export default LayoutWrapper;
