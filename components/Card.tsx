import Image from 'next/image';
import Link from './Link';

function Card({ title, description, banner, href }): React.ReactElement {
  const image = (
    <Image
      alt={title}
      src={banner}
      className='object-cover object-center md:h-36 lg:h-48 transition-transform duration-500 group-hover:scale-105'
      width={544}
      height={306}
    />
  );

  return (
    <div className='md p-4 md:w-1/2' style={{ maxWidth: '544px' }}>
      <div
        className={`${
          banner && 'h-full'
        } card-hover group overflow-hidden rounded-md border-2 border-gray-100 border-opacity-60 dark:border-gray-800 hover:border-primary-400 dark:hover:border-primary-500`}
      >
        {banner &&
          (href ? (
            <Link href={href} aria-label={`Link to ${title}`} className="block overflow-hidden">
              {image}
            </Link>
          ) : (
            <div className="overflow-hidden">{image}</div>
          ))}
        <div className='p-6'>
          <h2 className='mb-3 text-2xl font-bold leading-8 tracking-tight'>
            {href ? (
              <Link href={href} aria-label={`Link to ${title}`} className="link-underline">
                {title}
              </Link>
            ) : (
              title
            )}
          </h2>
          <p className='prose mb-3 max-w-none text-gray-500 line-clamp-2 dark:text-gray-400'>
            {description}
          </p>
          {href && (
            <Link
              href={href}
              className='inline-flex items-center text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200'
              aria-label={`Link to ${title}`}
            >
              Learn more 
              <svg className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
