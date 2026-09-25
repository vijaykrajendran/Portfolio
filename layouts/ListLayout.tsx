import { Header } from '@/components/Form';
import Link from '@/components/Link';
import Pagination from '@/components/Pagination';
import Tag from '@/components/Tag';
import Reveal from '@/components/motion/Reveal';
import formatDate from '@/lib/utils/formatDate';
import { ComponentProps, useState } from 'react';
import { BsFilterLeft as FilterIcon } from 'react-icons/bs';
import { PostFrontMatter } from 'types/PostFrontMatter';

interface Props {
  posts: PostFrontMatter[];
  title: string;
  initialDisplayPosts?: PostFrontMatter[];
  pagination?: ComponentProps<typeof Pagination>;
}

export default function ListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: Props) {
  const [searchValue, setSearchValue] = useState('');
  const filteredBlogPosts = posts.filter(frontMatter => {
    const searchContent =
      frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ');
    return searchContent.toLowerCase().includes(searchValue.toLowerCase());
  });

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue
      ? initialDisplayPosts
      : filteredBlogPosts;

  return (
    <>
      <div className='fade-in divide-y-2 divide-term-border/60'>
        <Header title={title}>
          <div className='relative max-w-lg'>
            <span className='pointer-events-none absolute left-3 top-2.5 font-mono text-sm text-term-green'>
              $
            </span>
            <input
              aria-label='Search articles'
              type='text'
              onChange={({ target }) => setSearchValue(target.value)}
              placeholder='grep posts...'
              className='block w-full rounded-md border border-term-border bg-term-bg/60 py-2 pl-8 pr-16 font-mono text-sm text-term-text placeholder:text-term-dim focus:border-term-green focus:outline-none focus:ring-1 focus:ring-term-green'
            />
            <Link
              href='/tags'
              aria-label='Browse tags'
              className='absolute right-3 top-2 text-term-dim hover:text-term-green'
            >
              <FilterIcon size={26} />
            </Link>
          </div>
        </Header>

        <ul className='divide-y divide-term-border/40'>
          {!filteredBlogPosts.length && (
            <p className='mt-8 text-center font-mono text-sm text-term-dim'>
              {'// no posts found'}
            </p>
          )}
          {displayPosts.map((frontMatter, i) => {
            const { slug, date, title, summary, tags } = frontMatter;
            return (
              <li key={slug} className='py-4'>
                <Reveal delay={Math.min(i * 0.06, 0.3)}>
                  <Link
                    href={`/blog/${slug}`}
                    className='motion-card group block p-5 no-underline'
                  >
                    <div className='flex flex-col gap-2 xl:flex-row xl:items-baseline xl:gap-6'>
                      <time
                        dateTime={date}
                        className='shrink-0 font-mono text-xs text-term-green xl:w-32'
                      >
                        {formatDate(date)}
                      </time>
                      <div className='flex-1 space-y-2'>
                        <h3 className='text-xl font-bold leading-7 tracking-tight text-term-text group-hover:text-term-green'>
                          {title}
                        </h3>
                        <div className='flex flex-wrap gap-1'>
                          {tags.map(tag => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                        <p className='text-sm leading-relaxed text-term-dim'>
                          {summary}
                        </p>
                        <span className='inline-block font-mono text-xs text-term-green opacity-0 transition-opacity group-hover:opacity-100'>
                          read more →
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
        />
      )}
    </>
  );
}
