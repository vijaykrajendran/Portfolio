import React from 'react';
import CourseContent from '@/components/CourseContent';
import { Header } from '@/components/Form';
import { PageSEO } from '@/components/SEO';
import config from 'config';
import { InferGetStaticPropsType, GetStaticProps } from 'next';

// Must match the course slug defined in config/courses.ts
const SLUG = 'learn-mysql';

export const getStaticProps: GetStaticProps = () => {
  const course = config.courses.find(c => c.slug === SLUG) || null;

  if (!course) {
    return { notFound: true };
  }

  return { props: { course } };
};

export default function LearnMysqlCourse(
  props: InferGetStaticPropsType<typeof getStaticProps>,
): React.ReactElement {
  const { course } = props;
  const { title, description, banner } = course;

  return (
    <>
      <PageSEO title={title} description={description} imageUrl={banner} />
      <div className='fade-in divide-y-2 divide-gray-100 dark:divide-gray-800'>
        <Header title={title} subtitle={description} />
        <CourseContent course={course} />
      </div>
    </>
  );
}
