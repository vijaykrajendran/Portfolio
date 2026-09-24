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
        className='ml-1 flex h-8 w-8 items-center justify-center rounded text-term-green'
        aria-label='Toggle menu'
        aria-expanded={navShow}
        onClick={onToggleNav}
      >
        <span className='font-mono text-lg leading-none'>
          {navShow ? '✕' : '≡'}
        </span>
      </button>

      <div
        className={`fixed inset-0 z-40 transform bg-term-bg/95 backdrop-blur duration-300 ease-in-out ${
          navShow ? 'translate-x-0' : 'translate-x-full'
        }`}
        role='dialog'
        aria-modal='true'
        aria-hidden={!navShow}
      >
        <div className='flex items-center justify-between border-b border-term-border px-6 py-4'>
          <span className='font-mono text-xs text-term-dim'>~/nav $ ls</span>
          <button
            type='button'
            aria-label='Close menu'
            className='font-mono text-lg text-term-red'
            onClick={onToggleNav}
          >
            ✕
          </button>
        </div>
        <nav className='mt-4 px-6'>
          {headerNavLinks.map(link => (
            <div key={link.title} className='py-3'>
              <Link
                href={link.href}
                className='font-mono text-lg text-term-text'
                onClick={onToggleNav}
              >
                <span className='text-term-green'>▸</span>{' '}
                {link.title.toLowerCase().replace(/\s+/g, '-')}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default MobileNav;
