import headerNavLinks from '@/data/headerNavLinks';
import siteMetadata from '@/data/siteMetadata';
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
    <SectionContainer>
      <div className='flex min-h-dvh flex-col justify-between py-4 sm:py-6'>
        <div className='terminal-window'>
          {/* Title bar */}
          <div className='terminal-titlebar'>
            <span className='terminal-dot red' />
            <span className='terminal-dot amber' />
            <span className='terminal-dot green' />
            <span className='terminal-title truncate'>
              vijay@portfolio: ~{router.pathname === '/' ? '' : router.pathname}
            </span>
            <div className='ml-auto flex items-center'>
              <ThemeSwitch />
              <MobileNav />
            </div>
          </div>

          {/* Command-line nav (desktop) */}
          <nav className='hidden border-b border-term-border bg-term-bg px-4 py-2 text-xs sm:block'>
            <span className='term-comment'># nav:</span>{' '}
            {headerNavLinks.map((link, i) => (
              <span key={link.title}>
                <Link
                  href={link.href}
                  className={`term-navlink font-mono ${
                    isActive(link.href) ? 'active font-bold' : ''
                  }`}
                >
                  {link.title.toLowerCase().replace(/\s+/g, '-')}
                </Link>
                {i < headerNavLinks.length - 1 && (
                  <span className='text-term-border'> · </span>
                )}
              </span>
            ))}
          </nav>

          {/* Terminal body / page content */}
          <main className='terminal-body min-h-[60vh]'>
            <p className='mb-4 hidden text-xs text-term-dim sm:block'>
              <span className='term-prompt-user'>vijay@portfolio</span>
              <span className='text-term-text'>:</span>
              <span className='term-prompt-path'>~</span>
              <span className='text-term-text'>$ </span>
              cat{' '}
              {router.pathname === '/'
                ? 'welcome.md'
                : `${router.pathname.slice(1).replace(/\//g, '_')}.md`}
            </p>
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </SectionContainer>
  );
};

export default LayoutWrapper;
