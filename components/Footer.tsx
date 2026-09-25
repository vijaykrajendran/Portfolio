import SocialIcons from '@/components/SocialIcons';
import React, { memo } from 'react';

function Footer(): React.ReactElement {
  const year: number = new Date().getFullYear();

  return (
    <div className='mt-16 flex flex-col items-center border-t border-term-border/60 py-8 text-term-dim'>
      <SocialIcons />
      <span className='mt-4 text-sm'>
        &copy; {year} <span className='text-term-text'>Vijay Rajendran</span>
      </span>
      <span className='mt-1 font-mono text-xs text-term-border'>
        built with Next.js &amp; Tailwind · deployed on Vercel
      </span>
    </div>
  );
}

export default memo(Footer);
