import Conditional from '@/components/Conditional';
import Link from '@/components/Link';
import type { Course, CourseContent } from 'config/courses';
import React from 'react';
import { BsDot as DotIcon } from 'react-icons/bs';

interface CourseContentProps {
  course: Course;
}

function getSlug(course: string, slug: string): string {
  return `/courses/${course}/${slug}`;
}

export default function CourseContent(
  props: CourseContentProps,
): React.ReactElement {
  const { course } = props;
  const { content } = course;

  function renderCourseList(item: CourseContent): React.ReactNode {
    const { name, description, content } = item;

    return (
      <details
        key={name}
        className='course-disclosure rounded-md border border-gray-200 p-3 dark:border-gray-700'
      >
        <summary className='cursor-pointer list-none'>
          <span className='font-bold dark:text-white'>{name}</span>
          {description && (
            <span className='ml-2 text-sm text-gray-500 dark:text-gray-400'>
              {description}
            </span>
          )}
        </summary>
        <div className='mt-2'>
          <Conditional condition={!!content}>
            {content?.map(({ name, slug }) => (
              <Link key={name} href={getSlug(course.slug, slug)}>
                <h3 className='my-1 ml-2 flex items-center text-lg text-gray-500 dark:text-gray-400'>
                  <DotIcon className='text-4xl' /> {name}
                </h3>
              </Link>
            ))}
          </Conditional>
        </div>
      </details>
    );
  }

  return (
    <div className='space-y-3 pt-4 md:pt-8 xl:pt-12'>
      {React.Children.toArray(content.map(renderCourseList))}
    </div>
  );
}
