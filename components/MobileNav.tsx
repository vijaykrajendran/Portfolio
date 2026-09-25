import headerNavLinks from '@/data/headerNavLinks';
import { useEffect, useState } from 'react';
import Link from './Link';

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false);

  const onToggleNav = () => {
    setNavShow(status => {
      document.body.style.overflow = status ? 'auto' : 'hidden';
      return !status;
    });
  };

  // Close on Escape for keyboard users
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && navShow) {
        setNavShow(false);
        document.body.style.overflow = 'auto';
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [navShow]);

  return (
    <div className='sm:hidden'>
      <button
        type='button'
        className='ml-2 flex h-9 w-9 items-center justify-center rounded-md border border-term-border text-term-text hover:border-term-green hover:text-term-green'
        aria-label='Toggle menu'
        aria-expanded={navShow}
        onClick={onToggleNav}
      >
        <span className='text-lg leading-none'>{navShow ? '✕' : '☰'}</span>
      </button>

      <div
        className={`fixed inset-0 z-40 transform bg-term-bg/95 backdrop-blur duration-300 ease-in-out ${
          navShow ? 'translate-x-0' : 'translate-x-full'
        }`}
        role='dialog'
        aria-modal='true'
        aria-hidden={!navShow}
      >
        <div className='flex items-center justify-between border-b border-term-border px-6 py-5'>
          <span className='font-mono text-sm font-bold text-term-text'>
            <span className='text-term-green'>~/</span>vijay
          </span>
          <button
            type='button'
            aria-label='Close menu'
            className='text-2xl text-term-dim hover:text-term-green'
            onClick={onToggleNav}
          >
            ✕
          </button>
        </div>
        <nav className='mt-6 px-6'>
          {headerNavLinks.map(link =>
            link.children ? (
              <div key={link.title} className='py-3'>
                <span className='font-mono text-xs uppercase tracking-wider text-term-dim'>
                  {link.title}
                </span>
                <div className='mt-2 space-y-2 border-l border-term-border/60 pl-4'>
                  {link.children.map(child => (
                    <div key={child.title}>
                      <Link
                        href={child.href}
                        className='text-lg font-semibold text-term-text hover:text-term-green'
                        onClick={onToggleNav}
                      >
                        {child.title}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div key={link.title} className='py-3'>
                <Link
                  href={link.href}
                  className='text-xl font-semibold text-term-text hover:text-term-green'
                  onClick={onToggleNav}
                >
                  {link.title}
                </Link>
              </div>
            ),
          )}
        </nav>
      </div>
    </div>
  );
};

export default MobileNav;
