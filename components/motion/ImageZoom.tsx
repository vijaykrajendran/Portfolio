import { useEffect } from 'react';

/**
 * Enables click-to-zoom (lightbox) on images inside the article prose.
 * Dependency-free: toggles a CSS class and a backdrop on click.
 * Respects keyboard users (Escape closes) and cleans up on unmount.
 */
export default function ImageZoom(): null {
  useEffect(() => {
    let backdrop: HTMLDivElement | null = null;
    let zoomed: HTMLElement | null = null;

    const close = () => {
      if (zoomed) zoomed.classList.remove('img-zoomed');
      if (backdrop) {
        backdrop.remove();
        backdrop = null;
      }
      zoomed = null;
      document.body.style.overflow = '';
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || target.tagName !== 'IMG') return;
      if (!target.closest('.prose')) return;

      if (target.classList.contains('img-zoomed')) {
        close();
        return;
      }

      backdrop = document.createElement('div');
      backdrop.className = 'img-zoom-backdrop';
      backdrop.addEventListener('click', close);
      document.body.appendChild(backdrop);

      zoomed = target;
      target.classList.add('img-zoomed');
      document.body.style.overflow = 'hidden';
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
      close();
    };
  }, []);

  return null;
}
