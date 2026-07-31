import { Header } from '@/components/Form';
import { PageSEO } from '@/components/SEO';
import siteMetadata from '@/data/siteMetadata';

export default function Projects() {
  return (
    <>
      <PageSEO
        title={`Projects - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <div className='fade-in divide-y-2 divide-gray-100 dark:divide-gray-800'>
        <Header title='Projects' />
        <div className='container py-12'>
          <div className='flex flex-col items-center justify-center py-16 text-center'>
            <div className='mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800'>
              <svg className='h-10 w-10 text-gray-400 dark:text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' />
              </svg>
            </div>
            <h3 className='mb-2 text-xl font-semibold text-gray-900 dark:text-white'>
              Projects Coming Soon
            </h3>
            <p className='max-w-md text-gray-600 dark:text-gray-400'>
              I'm working on some exciting projects. Check back soon to see what I've been building!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
