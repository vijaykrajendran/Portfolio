import SocialIcons from '@/components/SocialIcons';
import React, { memo } from 'react';

function Footer(): React.ReactElement {
  const year: number = new Date().getFullYear();

  return (
    <div className='mt-6 flex flex-col items-center py-6 font-mono text-term-dim'>
      <SocialIcons />
      <span className='mt-4 text-xs'>
        <span className='term-prompt-user'>vijay@portfolio</span>
        <span>:</span>
        <span className='term-prompt-path'>~</span>
        <span>$ echo </span>
        <span className='text-term-text'>
          &quot;&copy; {year} Vijay Rajendran&quot;
        </span>
      </span>
      <span className='mt-1 text-[0.7rem] text-term-border'>
        built with next.js · deployed on vercel
      </span>
    </div>
  );
}

export default memo(Footer);
