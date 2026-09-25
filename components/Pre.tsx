import { useState, useRef, ReactNode, isValidElement } from 'react';

interface Props {
  children: ReactNode;
}

const Pre = ({ children }: Props) => {
  const textInput = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  // Extract the language from the child <code className="language-xxx">
  let language = '';
  if (isValidElement(children)) {
    const className: string = (children.props as any)?.className || '';
    const match = /language-(\w+)/.exec(className);
    if (match) language = match[1];
  }

  const onEnter = () => {
    setHovered(true);
  };
  const onExit = () => {
    setHovered(false);
    setCopied(false);
  };
  const onCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(textInput.current.textContent);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div
      ref={textInput}
      onMouseEnter={onEnter}
      onMouseLeave={onExit}
      className='relative'
    >
      {language && (
        <span className='absolute right-12 top-0 z-10 rounded-b px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-term-dim'>
          {language}
        </span>
      )}
      {hovered && (
        <button
          aria-label='Copy code'
          type='button'
          className={`absolute right-2 top-2 h-8 w-8 rounded border bg-term-bg/80 p-1 backdrop-blur ${
            copied
              ? 'border-term-green focus:border-term-green focus:outline-none'
              : 'border-term-border hover:border-term-green'
          }`}
          onClick={onCopy}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            stroke='currentColor'
            fill='none'
            className={copied ? 'text-term-green' : 'text-term-dim'}
          >
            {copied ? (
              <>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
                />
              </>
            ) : (
              <>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
                />
              </>
            )}
          </svg>
        </button>
      )}

      <pre>{children}</pre>
    </div>
  );
};

export default Pre;
