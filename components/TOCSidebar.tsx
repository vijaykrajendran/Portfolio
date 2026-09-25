import { useEffect, useState } from 'react';
import { Toc } from 'types/Toc';

interface TOCSidebarProps {
  toc: Toc;
  fromHeading?: number;
  toHeading?: number;
}

/**
 * Sticky table-of-contents sidebar with scroll-spy: highlights the heading
 * currently in view. Hidden on smaller screens (the inline TOC covers those).
 */
export default function TOCSidebar({
  toc,
  fromHeading = 1,
  toHeading = 3,
}: TOCSidebarProps): React.ReactElement | null {
  const headings = toc.filter(
    h => h.depth >= fromHeading && h.depth <= toHeading,
  );

  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (!headings.length) return;

    const ids = headings.map(h => h.url.replace(/^#/, '')).filter(Boolean);

    const elements = ids
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      entries => {
        // Pick the topmost heading currently intersecting
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // trigger when heading is in the upper portion of the viewport
        rootMargin: '0px 0px -70% 0px',
        threshold: 0,
      },
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav aria-label='Table of contents' className='hidden xl:block'>
      <p className='mb-3 font-mono text-xs uppercase tracking-wider text-term-dim'>
        On this page
      </p>
      <ul className='space-y-2 border-l border-term-border/60 text-sm'>
        {headings.map(heading => {
          const id = heading.url.replace(/^#/, '');
          const isActive = id === activeId;
          return (
            <li
              key={heading.url}
              style={{
                paddingLeft: `${(heading.depth - fromHeading) * 0.75 + 0.75}rem`,
              }}
            >
              <a
                href={heading.url}
                className={`-ml-px block border-l-2 pl-3 no-underline transition-colors ${
                  isActive
                    ? 'border-term-green font-medium text-term-green'
                    : 'border-transparent text-term-dim hover:text-term-text'
                }`}
              >
                {heading.value.replace(/^#+\s*\d*\s*/, '').trim() ||
                  heading.value}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
