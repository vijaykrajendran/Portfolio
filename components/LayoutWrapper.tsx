import headerNavLinks from '@/data/headerNavLinks';
import Spotlight from '@/components/motion/Spotlight';
import ScrollProgress from '@/components/motion/ScrollProgress';
import ScrollToTop from '@/components/motion/ScrollToTop';
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

  // Show the reading-progress percentage only on individual blog articles
  const isArticle = router.pathname.startsWith('/blog/');

  return (
    <>
      <IntroSplash />
      <ScrollProgress showPercent={isArticle} />
      <ScrollToTop />
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
                  {headerNavLinks.map(link =>
                    link.children ? (
                      <div key={link.title} className='group relative'>
                        <button
                          type='button'
                          className='nav-link inline-flex items-center gap-1'
                          aria-haspopup='true'
                        >
                          {link.title}
                          <span className='text-xs'>▾</span>
                        </button>
                        <div className='invisible absolute left-1/2 top-full z-30 mt-2 min-w-[10rem] -translate-x-1/2 rounded-md border border-term-border/60 bg-term-bg/95 p-2 opacity-0 shadow-lg backdrop-blur-md transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100'>
                          {link.children.map(child => (
                            <Link
                              key={child.title}
                              href={child.href}
                              className={`block rounded px-3 py-2 text-sm hover:bg-term-border/30 ${
                                isActive(child.href)
                                  ? 'text-term-green'
                                  : 'text-term-text'
                              }`}
                            >
                              {child.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        key={link.title}
                        href={link.href}
                        className={`nav-link ${isActive(link.href) ? 'active' : ''}`}
                      >
                        {link.title}
                      </Link>
                    ),
                  )}
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
